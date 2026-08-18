"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { sceneInput } from "@/lib/sceneInput";

/**
 * The warm drifting motes — the Ghibli half of the scene. They sit close to
 * the camera so they parallax hard against the sky, and they're few and dim
 * on purpose: this should read as air, not as a particle effect.
 */

const COUNT_HIGH = 130;
const COUNT_LOW = 60;

const SPAN_Y = 26.0;

const vertexShader = /* glsl */ `
  attribute float aSize;
  // x: rise speed, y: sway amplitude, z: phase
  attribute vec3 aSeed;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSpanY;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Rise and wrap entirely on the GPU — no per-frame CPU buffer updates.
    pos.y = mod(pos.y + uTime * aSeed.x + uSpanY * 0.5, uSpanY) - uSpanY * 0.5;
    pos.x += sin(uTime * 0.34 + aSeed.z * 6.2831) * aSeed.y;
    pos.z += cos(uTime * 0.27 + aSeed.z * 6.2831) * aSeed.y * 0.6;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Fade at the top and bottom of the wrap band so nothing pops in.
    float edge = 1.0 - smoothstep(uSpanY * 0.30, uSpanY * 0.5, abs(pos.y));
    vAlpha = edge * (0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.5 + aSeed.z * 6.2831)));

    gl_PointSize = aSize * uPixelRatio * (26.0 / max(0.001, -mv.z));
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    // Soft core with a wide falloff — a hard dot looks like dust on the lens.
    float core = smoothstep(0.5, 0.0, d);
    float alpha = core * core * vAlpha * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function createAttributes() {
  const lowPower = typeof window !== "undefined" && window.innerWidth < 820;
  const count = lowPower ? COUNT_LOW : COUNT_HIGH;

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPAN_Y;
    positions[i * 3 + 2] = -1.5 - Math.random() * 11;

    sizes[i] = 0.9 + Math.random() * 2.2;

    seeds[i * 3 + 0] = 0.18 + Math.random() * 0.5;
    seeds[i * 3 + 1] = 0.3 + Math.random() * 1.1;
    seeds[i * 3 + 2] = Math.random();
  }

  return { positions, sizes, seeds };
}

function createMaterialConfig(): THREE.ShaderMaterialParameters {
  return {
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uSpanY: { value: SPAN_Y },
      uOpacity: { value: 0.5 },
      // See Starfield — literal output values, deliberately not a THREE.Color.
      uColor: { value: new THREE.Vector3(0.941, 0.863, 0.706) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  };
}

export default function Spores() {
  const dpr = useThree((state) => state.viewport.dpr);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

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
    // Present throughout, but thicker once there's atmosphere to carry them.
    uniforms.uOpacity.value = 0.34 + 0.42 * sceneInput.scrollEased;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[attributes.sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[attributes.seeds, 3]} />
      </bufferGeometry>
      <shaderMaterial ref={materialRef} args={[materialConfig]} />
    </points>
  );
}
