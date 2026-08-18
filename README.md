# Matias Freire, Portfolio

Personal site built with Next.js (App Router), Tailwind CSS v4 and Three.js.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## The background scene

The whole page sits on one WebGL scene that reacts to scroll: you start in deep
space and descend into a painted sky, stars fading out as cloud banks and misty
hills rise into frame.

| File | Role |
| --- | --- |
| `components/BackgroundScene.tsx` | Feature-detects WebGL, renders a static gradient fallback, lazy-loads the scene |
| `components/three/Scene.tsx` | The `<Canvas>`, camera parallax rig, visibility-based pausing |
| `components/three/SkyPainting.tsx` | Full-screen fragment shader: sky gradient, cel-lit clouds, moon, hills |
| `components/three/Starfield.tsx` | Twinkling star points, fade out as the sky fills |
| `components/three/Spores.tsx` | Warm drifting motes near the camera |
| `lib/sceneInput.ts` | Scroll and pointer state, read per-frame without re-rendering React |

Notes for future edits:

- **Scroll drives everything** through `uProgress` (0 at the top of the page,
  1 at the bottom). Most of the scene's look lives in `SkyPainting.tsx` as
  pairs of colours mixed by that value.
- **The canvas renders unmanaged** (`flat linear` on `<Canvas>`), so every
  colour in the shaders is a literal display value. No tone mapping or colour
  conversion is applied. Uniform colours are `Vector3`, not `THREE.Color`, for
  the same reason.
- **Keep the backdrop dark.** The entire site is near-white text on top of it;
  `horizonDay` in particular is deliberately dim so the footer stays readable.
- `prefers-reduced-motion` freezes the scene and disables the reveal
  transitions.

## Design system

Tokens live in the `@theme` block in `app/globals.css`.

- **Display**: Fraunces, used for headings and names
- **Body**: IBM Plex Sans
- **Labels**: Press Start 2P, small sizes only (`.pixel`)
- **Accents**: periwinkle (primary), sage (tech tags), lantern cream (warm light)

Font variables are declared on `<html>`, not `<body>`. The `--font-*` theme
tokens that reference them are declared on `:root` and would otherwise resolve
to nothing.
