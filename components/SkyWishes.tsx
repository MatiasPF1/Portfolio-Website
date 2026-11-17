"use client";

import { useEffect, useRef, useState } from "react";

import PixelSprite from "@/components/PixelSprite";

type Wish = { id: number; x: number; y: number; angle: number; length: number };

// Anything people click on purpose: a wish there would get in the way.
const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button'], nav";
const MAX_WISHES = 6;

/**
 * Click an empty patch of sky and a shooting star streaks away from that
 * spot, with a pixel sparkle where you clicked. Purely decorative: nothing
 * is announced, and it stays off for reduced-motion users.
 */
export default function SkyWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (event: MouseEvent) => {
      if (reduced.matches || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(INTERACTIVE)) return;
      // Clicking to finish a text selection shouldn't throw stars around.
      if (window.getSelection()?.toString()) return;

      const wish: Wish = {
        id: nextId.current++,
        x: event.clientX,
        y: event.clientY,
        // Mostly down and to the left, the way the ambient one falls.
        angle: 140 + Math.random() * 40,
        length: 110 + Math.random() * 90,
      };
      setWishes((current) => [...current.slice(-(MAX_WISHES - 1)), wish]);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const remove = (id: number) => setWishes((current) => current.filter((wish) => wish.id !== id));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-3 overflow-hidden">
      {wishes.map((wish) => (
        <div key={wish.id} className="absolute" style={{ left: wish.x, top: wish.y }}>
          <PixelSprite name="sparkle" scale={3} className="wish-pop absolute -left-[10.5px] -top-[10.5px]" />
          <span
            className="wish-trail absolute right-0 top-0 h-0.5 rounded-full"
            style={{
              width: wish.length,
              ["--wish-angle" as string]: `${wish.angle}deg`,
              ["--wish-dist" as string]: `${wish.length * 2.2}px`,
            }}
            onAnimationEnd={() => remove(wish.id)}
          />
        </div>
      ))}
    </div>
  );
}
