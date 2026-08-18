"use client";

import { useEffect } from "react";

/**
 * Shared input state for the WebGL scene.
 *
 * Kept as a plain module-level object on purpose: the scene reads this every
 * frame inside useFrame, and routing scroll/pointer through React state would
 * re-render the tree 60x a second for no reason.
 */
export const sceneInput = {
  /** 0 at the top of the document, 1 at the bottom. */
  scroll: 0,
  /** Smoothed scroll, eased toward `scroll` by the scene each frame. */
  scrollEased: 0,
  /** Pointer position in -1..1, origin at the centre of the viewport. */
  pointerX: 0,
  pointerY: 0,
  /** Set when the user prefers reduced motion — freezes drift and parallax. */
  reducedMotion: false,
};

/** Attaches the global listeners. Mount exactly once, from the scene root. */
export function useSceneInputListeners() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      sceneInput.reducedMotion = motionQuery.matches;
    };
    syncMotion();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sceneInput.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();

    const onPointerMove = (event: PointerEvent) => {
      sceneInput.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      sceneInput.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    // Touch devices have no hover, so let scroll alone drive the parallax.
    const onPointerLeave = () => {
      sceneInput.pointerX = 0;
      sceneInput.pointerY = 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    motionQuery.addEventListener("change", syncMotion);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      motionQuery.removeEventListener("change", syncMotion);
    };
  }, []);
}
