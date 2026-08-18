"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { sceneInput, useSceneInputListeners } from "@/lib/sceneInput";
import SkyPainting from "./SkyPainting";
import Starfield from "./Starfield";
import Spores from "./Spores";

/** Slides the camera a little with the pointer, and sinks it as you scroll. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const camera = state.camera;

    const targetX = sceneInput.reducedMotion ? 0 : sceneInput.pointerX * 0.75;
    const targetY = sceneInput.reducedMotion ? 0 : -sceneInput.pointerY * 0.45;

    camera.position.x += (targetX - camera.position.x) * Math.min(1, step * 1.6);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, step * 1.6);

    // The particle field drifts down as the page descends, so the motes and
    // stars travel with the sky rather than sitting pinned to the glass.
    if (group.current) {
      group.current.position.y = sceneInput.scrollEased * 4.5;
    }
  });

  return <group ref={group}>{children}</group>;
}

export default function Scene() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useSceneInputListeners();

  // Nothing is animating while the tab is hidden, so stop drawing entirely.
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        // `flat linear` keeps tone mapping and colour conversion out of the
        // pipeline: every colour in these shaders is a final display value.
        flat
        linear
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 120 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x070b16), 1);
          setReady(true);
        }}
      >
        <SkyPainting />
        <ParallaxRig>
          <Starfield />
          <Spores />
        </ParallaxRig>
      </Canvas>
    </div>
  );
}
