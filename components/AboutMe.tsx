import Image from "next/image";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const moments = [
  { image: "/First-Gen.jpeg", caption: "First-generation Ecuadorian CS student" },
  { image: "/STEP.jpeg", caption: "My students during the STEP 2025 Bridge Summer Program" },
  { image: "/SHPE2025.jpeg", caption: "SHPE National Convention 2025, Philadelphia" },
  { image: "/Hackru.jpeg", caption: "My team at HackRU 2025" },
];

const music = [
  { image: "/Malcom.jpeg", name: "Malcolm Todd" },
  { image: "/bruno-mars.jpg", name: "Bruno Mars" },
  { image: "/Enanitos_verdes.jpg", name: "Enanitos Verdes" },
  { image: "/Tame_Impala.jpg", name: "Tame Impala" },
  { image: "/Grent.jpeg", name: "grentperez" },
  { image: "/Jane_Remover.jpg", name: "Jane Remover" },
  { image: "/Laufey1.jpg", name: "Laufey" },
  { image: "/TheMarias.jpg", name: "The Marías" },
];

export default function About_Me() {
  return (
    <section id="about" className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
      <Reveal>
        <SectionHeading index="03" eyebrow="About" title="A little more" />
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-10">
          <p className="text-base leading-relaxed text-paper-dim">
            I&apos;m a first-generation Ecuadorian computer science student at
            Stevens. I like working where software meets something physical, like
            real-time telemetry streaming off a locomotive and microscopy images
            of two-dimensional materials.
          </p>
          <p className="text-base leading-relaxed text-paper-mute">
            Most of my time outside class goes to the communities that got me
            here: leading ColorStack and SHPE on campus, building their sites,
            and mentoring incoming students through STEP Bridge.
          </p>
        </div>
      </Reveal>

      {/* ------------------------------------------------------- photos -- */}
      <Reveal delay={80}>
        <h3 className="pixel mt-12 border-t border-white/8 pt-6 text-paper-mute md:mt-16">
          Moments
        </h3>
      </Reveal>

      <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {moments.map((moment, index) => (
          <Reveal key={moment.image} delay={index * 90} as="article">
            <figure className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/8 bg-ink-800/40">
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
        <h3 className="pixel mt-12 border-t border-white/8 pt-6 text-paper-mute md:mt-16">
          Fav Artists
        </h3>
      </Reveal>

      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-5">
        {music.map((artist, index) => (
          <Reveal key={artist.image} delay={(index % 4) * 80} as="article">
            <figure className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/8 bg-ink-800/40">
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
