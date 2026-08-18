"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// WebGL only exists in the browser, and the scene is a large chunk of the
// bundle, so there is no reason to ship it into the server render.
const Scene = dynamic(() => import("./three/Scene"), { ssr: false });

let cachedSupport: boolean | null = null;

/**
 * Probing first keeps three from constructing a renderer it can't use and
 * throwing, where a plain gradient is a perfectly good answer. The result is
 * cached because getSnapshot must return a stable value.
 */
function getWebglSupport() {
  if (cachedSupport !== null) return cachedSupport;

  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    cachedSupport = gl !== null;
    // Hand the context straight back; browsers cap how many can exist at once.
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cachedSupport = false;
  }

  return cachedSupport;
}

// Support never changes for the life of the document, so there is nothing to
// subscribe to; useSyncExternalStore is here for its server snapshot, which
// keeps the canvas out of the SSR output without a hydration mismatch.
const subscribe = () => () => {};
const getServerSnapshot = () => false;

/**
 * Sits behind everything. The static gradient underneath is not just a
 * loading state: it's the fallback when WebGL is unavailable or blocked, so
 * the page still reads correctly with the canvas entirely absent.
 */
export default function BackgroundScene() {
  const webglSupported = useSyncExternalStore(subscribe, getWebglSupport, getServerSnapshot);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 76% 26%, #131c39 0%, transparent 58%)," +
            "linear-gradient(180deg, #05070f 0%, #070b16 42%, #0b1224 74%, #131c33 100%)",
        }}
      />
      {webglSupported ? <Scene /> : null}
    </>
  );
}
