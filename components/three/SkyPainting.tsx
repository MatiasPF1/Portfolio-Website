"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { sceneInput } from "@/lib/sceneInput";

/**
 * The backdrop is a single full-screen fragment shader rather than a stack of
 * meshes: sky gradient, cloud banks, moon and hills all share the same noise
 * field, which is both cheaper and easier to keep tonally consistent than
 * compositing separate textured planes.
 *
 * Everything is tuned to stay in the lower quarter of the luminance range —
 * the whole site sits on top of this in near-white text.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    // Draw straight to clip space; the geometry is a unit quad and the mesh
    // renders first with depth off, so it always covers exactly the viewport.
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform float uAspect;
  uniform vec2  uParallax;

  varying vec2 vUv;

  // ---------------------------------------------------------------- noise --
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < OCTAVES; i++) {
      v += a * valueNoise(p);
      p = rot * p * 2.03;
      a *= 0.5;
    }
    return v;
  }

  // --------------------------------------------------------------- clouds --
  // Density plus a cel-shaded rim: sampling the field slightly toward the
  // light and subtracting gives a hard band of lit edge just inside the
  // silhouette, which is what makes painted clouds read as painted.
  float cloudBand(vec2 p, float scale, float drift, out float rim) {
    vec2 q = p * scale;
    q.x += uTime * drift;

    float warp = fbm(q * 0.55);
    vec2 w = q + warp * 0.85;

    float d  = fbm(w);
    float du = fbm(w + vec2(0.06, 0.16));

    float m = smoothstep(0.44, 0.68, d);
    rim = clamp(m - smoothstep(0.44, 0.68, du), 0.0, 1.0);
    return m;
  }

  // ---------------------------------------------------------------- hills --
  float ridgeLine(float x, float seed, float amp, float freq) {
    float n = fbm(vec2(x * freq + seed * 13.7, seed * 4.3));
    return (n - 0.5) * amp;
  }

  void main() {
    vec2 uv = vUv + uParallax;
    vec2 p  = vec2(uv.x * uAspect, uv.y);

    float prog = uProgress;

    // ------------------------------------------------------------- sky ----
    // Both ends of the scroll stay dark. The "sky" end is blue hour, not
    // daylight — it keeps the space mood while letting warm light in.
    vec3 topSpace     = vec3(0.020, 0.028, 0.059);
    vec3 midSpace     = vec3(0.039, 0.063, 0.129);
    vec3 horizonSpace = vec3(0.075, 0.110, 0.220);

    vec3 topDay       = vec3(0.043, 0.086, 0.180);
    vec3 midDay       = vec3(0.098, 0.169, 0.294);
    // Kept deliberately dim: the footer sits on this band in near-white text.
    vec3 horizonDay   = vec3(0.290, 0.330, 0.380);

    vec3 top     = mix(topSpace, topDay, prog);
    vec3 mid     = mix(midSpace, midDay, prog);
    vec3 horizon = mix(horizonSpace, horizonDay, prog);

    vec3 col = mix(horizon, mid, smoothstep(-0.05, 0.52, uv.y));
    col = mix(col, top, smoothstep(0.45, 1.05, uv.y));

    // Faint nebula wash, only while we are still out in space.
    float nebula = fbm(p * 1.6 + vec2(uTime * 0.004, 0.0));
    nebula = smoothstep(0.48, 0.95, nebula) * smoothstep(0.15, 0.9, uv.y);
    col += vec3(0.10, 0.11, 0.26) * nebula * 0.42 * (1.0 - prog);

    // ------------------------------------------------------------ moon ----
    // Placed to land in the gap between the headline and the portrait on wide
    // screens, and above the stacked hero on tall ones.
    float moonFade = 1.0 - 0.30 * prog;
    float portraitMode = smoothstep(1.10, 0.70, uAspect);
    vec2 moonUv = mix(vec2(0.580, 0.800), vec2(0.800, 0.880), portraitMode);
    vec2 moonPos = vec2(moonUv.x * uAspect, moonUv.y + 0.06 * prog);
    float dm = length(p - moonPos);

    float halo = exp(-dm * 9.0) * 0.30 + exp(-dm * 26.0) * 0.28;
    col += mix(vec3(0.62, 0.69, 0.92), vec3(0.95, 0.88, 0.74), prog) * halo * moonFade;

    float disc = smoothstep(0.049, 0.044, dm);
    float mare = fbm((p - moonPos) * 26.0) * 0.16;
    vec3 moonCol = mix(vec3(0.86, 0.89, 0.97), vec3(0.98, 0.95, 0.88), prog) - mare;
    col = mix(col, moonCol, disc * moonFade);

    // ---------------------------------------------------------- clouds ----
    // The whole cloud field rises as the page scrolls, so the reader descends
    // from open space into weather.
    float lift = 0.52 * (1.0 - prog);
    vec2 cp = vec2(p.x, uv.y + lift);

    // Far band — thin, high, barely there.
    float rimA;
    float a = cloudBand(cp + vec2(0.0, -0.28), 3.1, 0.010, rimA);
    float maskA = smoothstep(1.02, 0.52, cp.y) * smoothstep(0.10, 0.34, cp.y);
    vec3 bodyA = mix(vec3(0.055, 0.082, 0.157), vec3(0.184, 0.243, 0.376), prog);
    vec3 rimColA = mix(vec3(0.42, 0.47, 0.70), vec3(0.78, 0.76, 0.70), prog);
    col = mix(col, mix(bodyA, rimColA, rimA * 0.85), a * maskA * 0.34);

    // Mid band — the main silhouette.
    float rimB;
    float b = cloudBand(cp + vec2(4.0, -0.10), 1.85, 0.017, rimB);
    float maskB = smoothstep(0.86, 0.34, cp.y) * smoothstep(-0.06, 0.18, cp.y);
    vec3 bodyB = mix(vec3(0.047, 0.071, 0.141), vec3(0.169, 0.227, 0.361), prog);
    vec3 rimColB = mix(vec3(0.48, 0.54, 0.78), vec3(0.87, 0.82, 0.71), prog);
    col = mix(col, mix(bodyB, rimColB, rimB * 0.90), b * maskB * 0.52);

    // Near band — heavy, low, drifts fastest.
    float rimC;
    float c = cloudBand(cp + vec2(9.0, 0.06), 1.12, 0.026, rimC);
    float maskC = smoothstep(0.62, 0.10, cp.y) * smoothstep(-0.22, 0.02, cp.y);
    vec3 bodyC = mix(vec3(0.035, 0.055, 0.110), vec3(0.129, 0.180, 0.294), prog);
    vec3 rimColC = mix(vec3(0.40, 0.46, 0.68), vec3(0.83, 0.79, 0.70), prog);
    col = mix(col, mix(bodyC, rimColC, rimC * 0.80), c * maskC * 0.60);

    // ----------------------------------------------------------- hills ----
    // The ridges climb far enough by the end of the page that the footer lands
    // against dark silhouette rather than the pale mist above it.
    float hillsFade = smoothstep(0.28, 0.78, prog);
    float rise = -0.34 + 0.54 * prog;

    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float seed = 1.0 + fi * 2.0;
      float base = rise + fi * 0.075;
      float h = base + ridgeLine(p.x, seed, 0.10 - fi * 0.022, 0.55 + fi * 0.42);

      // Mist gathering in front of each ridge — the layered depth cue that
      // does most of the work in Ghibli landscape backgrounds.
      float mist = exp(-max(0.0, uv.y - h) * 30.0) * 0.30;
      col += mix(vec3(0.30, 0.36, 0.52), vec3(0.48, 0.51, 0.56), prog) * mist * hillsFade;

      float m = smoothstep(h + 0.003, h - 0.003, uv.y);
      vec3 hillCol = mix(vec3(0.020, 0.031, 0.063), vec3(0.043, 0.063, 0.090), fi / 2.0);
      col = mix(col, hillCol, m * hillsFade);
    }

    // Warm sliver of light sitting on the horizon once we arrive.
    float horizonGlow = exp(-abs(uv.y - (rise + 0.20)) * 9.0);
    col += vec3(0.24, 0.21, 0.16) * horizonGlow * hillsFade * 0.55;

    // ---------------------------------------------------------- finish ----
    float vig = smoothstep(1.25, 0.30, length((vUv - 0.5) * vec2(1.15, 1.0)));
    col *= mix(0.62, 1.0, vig);

    // Ordered-ish dither: large smooth gradients band badly in 8-bit.
    col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Mobile GPUs choke on a full-screen 5-octave fbm; fold the loop count into
// the shader at compile time instead of branching per fragment.
function createMaterialConfig(): THREE.ShaderMaterialParameters {
  const lowPower =
    typeof window !== "undefined" &&
    (window.innerWidth < 820 || window.devicePixelRatio > 2.5);

  return {
    vertexShader,
    fragmentShader,
    defines: { OCTAVES: lowPower ? 3 : 5 },
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uAspect: { value: 1 },
      uParallax: { value: new THREE.Vector2() },
    },
    depthTest: false,
    depthWrite: false,
  };
}

export default function SkyPainting() {
  const size = useThree((state) => state.size);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [materialConfig] = useState(createMaterialConfig);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const uniforms = material.uniforms;
    const step = Math.min(delta, 0.05);

    if (!sceneInput.reducedMotion) {
      uniforms.uTime.value += step;
    }

    // Ease toward the raw scroll value so flicking the wheel doesn't snap the
    // sky; the eased value is shared with the particle layers.
    sceneInput.scrollEased += (sceneInput.scroll - sceneInput.scrollEased) * Math.min(1, step * 2.4);
    uniforms.uProgress.value = sceneInput.scrollEased;

    uniforms.uAspect.value = size.width / size.height;

    const parallax = uniforms.uParallax.value as THREE.Vector2;
    const targetX = sceneInput.reducedMotion ? 0 : -sceneInput.pointerX * 0.012;
    const targetY = sceneInput.reducedMotion ? 0 : sceneInput.pointerY * 0.012;
    parallax.x += (targetX - parallax.x) * Math.min(1, step * 2.0);
    parallax.y += (targetY - parallax.y) * Math.min(1, step * 2.0);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} args={[materialConfig]} />
    </mesh>
  );
}
