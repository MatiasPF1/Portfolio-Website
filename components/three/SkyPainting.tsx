"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { sceneInput } from "@/lib/sceneInput";

/**
 * The backdrop is a single full-screen fragment shader rather than a stack of
 * meshes: sky gradient, aurora, cloud banks, moon, hills and the village on
 * them all share the same noise field, which is both cheaper and easier to
 * keep tonally consistent than compositing separate textured planes.
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
  uniform vec2  uPointer;
  uniform float uPointerOn;

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

  // --------------------------------------------------------------- aurora --
  // Three ribbons, each a curtain with a sharp lower hem that fades upward,
  // combed into vertical rays. Green at the hem, periwinkle through the body,
  // a blush of pink at the very top: the palette the rest of the site uses.
  vec3 aurora(vec2 uv, vec2 p) {
    vec3 acc = vec3(0.0);
    float t = uTime;

    for (int i = 0; i < 3; i++) {
      float fi = float(i);

      float wander = sin(p.x * 1.25 + t * 0.09 + fi * 1.9) * 0.065
                   + (valueNoise(vec2(p.x * 1.6 - t * 0.04, fi * 3.7)) - 0.5) * 0.10;
      float hem = 0.60 + fi * 0.08 + wander;
      float d = uv.y - hem;

      float curtain = smoothstep(-0.012, 0.004, d) * exp(-max(d, 0.0) * (5.0 + fi * 2.5));

      // Rays shimmer sideways; patches let whole stretches of ribbon thin out.
      float rays = 0.45 + 0.55 * valueNoise(vec2(p.x * 24.0 + fi * 11.0 - t * 0.6, t * 0.25 + fi));
      float patchy = smoothstep(0.15, 0.65, valueNoise(vec2(p.x * 0.85 + t * 0.025, fi * 5.3 + 2.0)));

      vec3 tint = mix(vec3(0.32, 0.86, 0.64), vec3(0.52, 0.58, 1.00), smoothstep(0.0, 0.10, d));
      tint = mix(tint, vec3(0.96, 0.56, 0.78), smoothstep(0.05, 0.18, d) * 0.8);

      acc += tint * curtain * rays * patchy * (0.60 - fi * 0.15);
    }
    return acc;
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

    // Nebula wash in two inks, periwinkle and plum, while we're out in space.
    float nebula = fbm(p * 1.6 + vec2(uTime * 0.004, 0.0));
    nebula = smoothstep(0.46, 0.95, nebula) * smoothstep(0.12, 0.9, uv.y);
    float ink = valueNoise(p * 0.9 + vec2(3.1, uTime * 0.003));
    vec3 nebulaCol = mix(vec3(0.10, 0.12, 0.30), vec3(0.24, 0.10, 0.25), smoothstep(0.3, 0.75, ink));
    col += nebulaCol * nebula * 0.55 * (1.0 - 0.75 * prog);

    // ----------------------------------------------------------- aurora ---
    // Present from the first screen, fullest in the middle of the page, and
    // gone by the time the footer lands on the hills.
    float auroraAmt = mix(0.80, 1.0, smoothstep(0.05, 0.35, prog)) * (1.0 - smoothstep(0.62, 0.92, prog));
    col += aurora(uv, p) * 0.42 * auroraAmt;

    // ------------------------------------------------------------ moon ----
    // Placed to land in the gap between the headline and the portrait on wide
    // screens, and above the stacked hero on tall ones.
    float moonFade = 1.0 - 0.30 * prog;
    float portraitMode = smoothstep(1.10, 0.70, uAspect);
    vec2 moonUv = mix(vec2(0.580, 0.800), vec2(0.800, 0.880), portraitMode);
    vec2 moonPos = vec2(moonUv.x * uAspect, moonUv.y + 0.06 * prog);
    vec2 toMoon = p - moonPos;
    float dm = length(toMoon);

    float halo = exp(-dm * 9.0) * 0.30 + exp(-dm * 26.0) * 0.28;
    col += mix(vec3(0.62, 0.69, 0.92), vec3(0.95, 0.88, 0.74), prog) * halo * moonFade;

    // A faint moon ring, warm inside and cool outside like the real thing.
    float ringD = (dm - 0.135) / 0.016;
    float ring = exp(-ringD * ringD);
    vec3 ringCol = mix(vec3(0.42, 0.34, 0.30), vec3(0.30, 0.38, 0.62), smoothstep(-1.0, 1.0, ringD));
    col += ringCol * ring * 0.13 * moonFade;

    float disc = smoothstep(0.049, 0.044, dm);
    float mare = fbm(toMoon * 26.0) * 0.16;
    // Soft terminator so the disc reads as a lit sphere, not a sticker: shade
    // with the sphere's surface normal, lit from the upper left.
    vec2 moonXY = toMoon / 0.049;
    vec3 moonNormal = vec3(moonXY, sqrt(max(0.0, 1.0 - dot(moonXY, moonXY))));
    float moonLit = clamp(dot(moonNormal, normalize(vec3(-0.45, 0.55, 0.70))), 0.0, 1.0);
    vec3 moonCol = mix(vec3(0.86, 0.89, 0.97), vec3(0.98, 0.95, 0.88), prog) - mare;
    moonCol *= 0.80 + 0.20 * moonLit;
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
    // against dark silhouette rather than the pale mist above it. Painted far
    // to near, so each nearer ridge overlaps the one behind it.
    float hillsFade = smoothstep(0.28, 0.78, prog);
    float rise = -0.34 + 0.54 * prog;
    vec3 lantern = vec3(1.00, 0.80, 0.50);

    for (int i = 0; i < 3; i++) {
      float fi = 2.0 - float(i);
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

      // A village on the middle ridge: square, pixel-sized lit windows tucked
      // just under the crest, each flickering on its own clock.
      if (i == 1) {
        float cells = 30.0;
        float cell = floor(p.x * cells);
        float occupied = step(0.68, hash21(vec2(cell, 7.0)));
        float cx = (cell + 0.5) / cells;
        float wy = h - 0.016 - hash21(vec2(cell, 3.0)) * 0.026;
        vec2 q = vec2(p.x - cx, uv.y - wy);
        float pane = step(abs(q.x), 0.0034) * step(abs(q.y), 0.0034);
        float flicker = 0.78 + 0.22 * sin(uTime * (1.3 + hash21(vec2(cell, 9.0))) + cell * 1.7);
        float glow = exp(-length(q * vec2(1.0, 1.4)) * 95.0) * 0.30;
        col += lantern * (pane * 0.85 + glow) * occupied * flicker * m * hillsFade;
      }
    }

    // Warm sliver of light sitting on the horizon once we arrive.
    float horizonGlow = exp(-abs(uv.y - (rise + 0.20)) * 9.0);
    col += vec3(0.24, 0.21, 0.16) * horizonGlow * hillsFade * 0.55;

    // ------------------------------------------------------- lantern ------
    // A little warm light that follows the pointer around the sky.
    vec2 toPointer = (vUv - uPointer) * vec2(uAspect, 1.0);
    float pointerGlow = exp(-length(toPointer) * 6.5);
    col += vec3(0.10, 0.085, 0.11) * pointerGlow * uPointerOn;

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
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerOn: { value: 0 },
    },
    depthTest: false,
    depthWrite: false,
  };
}

// Only a real mouse gets the lantern; on touch it would sit stuck in the
// middle of the screen.
const hasHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function SkyPainting() {
  const size = useThree((state) => state.size);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [materialConfig] = useState(createMaterialConfig);
  const [pointerEnabled] = useState(hasHover);

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

    // sceneInput's pointer is -1..1 with y pointing down; uv is 0..1, y up.
    const pointer = uniforms.uPointer.value as THREE.Vector2;
    const px = sceneInput.pointerX * 0.5 + 0.5;
    const py = 0.5 - sceneInput.pointerY * 0.5;
    pointer.x += (px - pointer.x) * Math.min(1, step * 5.0);
    pointer.y += (py - pointer.y) * Math.min(1, step * 5.0);
    const on = pointerEnabled && !sceneInput.reducedMotion ? 1 : 0;
    uniforms.uPointerOn.value += (on - uniforms.uPointerOn.value) * Math.min(1, step * 2.0);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} args={[materialConfig]} />
    </mesh>
  );
}
