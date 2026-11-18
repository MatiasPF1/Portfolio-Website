import Image from "next/image";

import AnimatedSprite from "@/components/AnimatedSprite";
import PixelSprite from "@/components/PixelSprite";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { about, moments, music } from "@/lib/content";

// Each photo leans a different way when you point at it, like nudging a print.
const nudge = ["hover:-rotate-2", "hover:rotate-2", "hover:-rotate-1", "hover:rotate-1"];

export default function About_Me() {
  return (
    <section id="about" className="mx-auto w-full max-w-4xl px-6 py-10 md:py-14">
      <Reveal>
        <SectionHeading index="03" eyebrow="About" title="A little more" />
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-6 grid gap-6 md:mt-7 md:grid-cols-2 md:gap-10">
          <p className="text-base leading-relaxed text-paper-dim">{about.lead}</p>
          <p className="text-base leading-relaxed text-paper-mute">{about.body}</p>
        </div>
      </Reveal>

      {/* ------------------------------------------------------- photos -- */}
      <Reveal delay={80}>
        <h3 className="pixel mt-9 flex items-center gap-2.5 border-t border-white/8 pt-5 text-paper-mute md:mt-10">
          <PixelSprite name="twinkle" scale={2} className="twinkle" />
          Moments
        </h3>
      </Reveal>

      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {moments.map((moment, index) => (
          <Reveal key={moment.image} delay={index * 90} as="article">
            <figure className="group">
              <div
                className={`relative aspect-square overflow-hidden rounded-xl border border-white/8 bg-ink-800/40 transition-transform duration-500 ease-out-soft hover:-translate-y-1 ${nudge[index % nudge.length]}`}
              >
                <Image
                  src={moment.image}
                  alt={moment.caption}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-cover transition-transform duration-900 ease-out-soft group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink-900/50 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30"
                />
              </div>
              <figcaption className="mt-3 text-[0.75rem] leading-relaxed text-paper-mute">
                {moment.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* -------------------------------------------------------- music -- */}
      <Reveal>
        <h3 className="pixel relative mt-9 flex items-center gap-2.5 border-t border-white/8 pt-5 text-paper-mute md:mt-10">
          <PixelSprite name="heart" scale={2} className="bob" />
          Fav Artists
          {/* A frog sitting on the divider, listening along. */}
          <span aria-hidden="true" className="absolute -top-[21px] right-4">
            <PixelSprite
              name="note"
              scale={2}
              className="note-float absolute -top-4 left-1"
            />
            <PixelSprite
              name="note"
              scale={2}
              className="note-float absolute -top-5 left-5"
              style={{ ["--note-delay" as string]: "-1.6s" }}
            />
            <AnimatedSprite frames={["frog", "frogBlink"]} mode="blink" scale={3} duration={5} delay={-2.5} />
          </span>
        </h3>
      </Reveal>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5">
        {music.map((artist, index) => (
          <Reveal key={artist.image} delay={(index % 4) * 80} as="article">
            <figure className="group">
              <div
                className={`relative aspect-square overflow-hidden rounded-xl border border-white/8 bg-ink-800/40 transition-transform duration-500 ease-out-soft hover:-translate-y-1 ${nudge[(index + 1) % nudge.length]}`}
              >
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 640px) 45vw, 22vw"
                  className="object-cover grayscale-[0.35] transition-all duration-900 ease-out-soft group-hover:scale-[1.05] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-3 text-[0.75rem] text-paper-mute transition-colors duration-300 group-hover:text-paper-dim">
                {artist.name}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
