import Image from "next/image";

import AnimatedSprite from "@/components/AnimatedSprite";
import PixelSprite from "@/components/PixelSprite";

/**
 * Portrait card. The frame is doing the work here: a hairline ring, a warm
 * lit top edge picked up from the scene's moonlight, and a gradient foot so
 * the photo dissolves into the panel instead of ending on a hard rectangle.
 *
 * It sits a touch crooked, like a print stuck on a wall, and straightens up
 * when you point at it.
 */
export default function Hero_Section() {
  return (
    <figure className="group relative mx-auto w-full max-w-[300px] rotate-2 transition-transform duration-700 ease-out-soft hover:rotate-0 md:max-w-none">
      {/* Offset outline — gives the card depth without a drop shadow. */}
      <div
        aria-hidden="true"
        className="absolute -inset-px translate-x-2 translate-y-2 rounded-[1.25rem] border border-peri-400/15 transition-transform duration-700 ease-out-soft group-hover:translate-x-3 group-hover:translate-y-3"
      />

      <div className="lit-edge relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-ink-800/60">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/me.jpeg"
            alt="Matias Freire"
            fill
            sizes="(max-width: 768px) 300px, 330px"
            className="object-cover transition-transform duration-1200 ease-out-soft group-hover:scale-[1.04]"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink-900/70 via-transparent to-transparent"
          />
        </div>
      </div>

      {/* A sticker on the corner of the print, and an owl perched on its
          top edge. The owl's feet sit exactly on the frame. */}
      <PixelSprite name="sparkle" scale={4} className="twinkle absolute -left-4 -top-4" />
      <AnimatedSprite
        frames={["owl", "owlBlink"]}
        mode="blink"
        scale={4}
        className="absolute -top-11 right-8"
      />
    </figure>
  );
}
