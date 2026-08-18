"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { sceneInput } from "@/lib/sceneInput";

const COUNT_HIGH = 900;
const COUNT_LOW = 380;

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;

  uniform float uTime;
  uniform float uFade;
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    // Slow, uneven twinkle — a fixed period across the field reads as a pulse.
    float twinkle = 0.55 + 0.45 * sin(uTime * 0.7 + aPhase * 6.2831);
    vAlpha = twinkle * uFade;

    gl_PointSize = aSize * uPixelRatio * (18.0 / max(0.001, -mv.z));
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha * vAlpha);
  }
`;

/** Generated once in a useState initializer, then never mutated. */
function createAttributes() {
  const lowPower = typeof window !== "undefined" && window.innerWidth < 820;
  const count = lowPower ? COUNT_LOW : COUNT_HIGH;

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 78;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 54;
    // Spread across depth so the pointer parallax actually separates them.
    positions[i * 3 + 2] = -8 - Math.random() * 34;

    // Mostly faint pinpricks with a handful of brighter anchors.
    sizes[i] = Math.random() < 0.9 ? 0.5 + Math.random() * 0.9 : 1.8 + Math.random() * 1.4;
    phases[i] = Math.random();
  }

  return { positions, sizes, phases };
}

function createMaterialConfig(): THREE.ShaderMaterialParameters {
  return {
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uFade: { value: 1 },
      uPixelRatio: { value: 1 },
      // Vector3 rather than THREE.Color: the canvas renders unmanaged, so
      // these are literal output values and must not be colour-converted.
      uColor: { value: new THREE.Vector3(0.859, 0.894, 1.0) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  };
}

export default function Starfield() {
  const dpr = useThree((state) => state.viewport.dpr);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Both are built once and passed to R3F, which owns disposal on unmount.
  const [attributes] = useState(createAttributes);
  const [materialConfig] = useState(createMaterialConfig);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const uniforms = material.uniforms;
    const step = Math.min(delta, 0.05);

    uniforms.uPixelRatio.value = dpr;
    if (!sceneInput.reducedMotion) {
      uniforms.uTime.value += step;
    }
    // Stars burn off as the sky fills with atmosphere.
    uniforms.uFade.value = 1.0 - smoothstep(0.12, 0.62, sceneInput.scrollEased);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[attributes.sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[attributes.phases, 1]} />
      </bufferGeometry>
      <shaderMaterial ref={materialRef} args={[materialConfig]} />
    </points>
  );
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
