import Image from "next/image";
import { LuArrowUpRight } from "react-icons/lu";

import PixelCover from "@/components/PixelCover";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/content";

export default function Projects_Section() {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <Reveal>
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Things I've made"
          description="AI agents, research tooling and community sites."
        />
      </Reveal>

      <div className="mt-7 grid gap-5 md:mt-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.repo} delay={(index % 2) * 100} as="article">
            {/* The title link is stretched over the whole card (its ::after),
                so the card stays one target for the repo while a project with
                a deployed site can still carry its own "live" link on top. */}
            <div className="lit-edge group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-800/62 backdrop-blur-md transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-white/15 hover:bg-ink-800/75">
              <div className="relative aspect-video overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover object-top brightness-[0.78] saturate-[0.85] transition-all duration-900 ease-out-soft group-hover:scale-[1.04] group-hover:brightness-95 group-hover:saturate-100"
                  />
                ) : (
                  <PixelCover sprite={project.sprite ?? "sparkle"} />
                )}
                {/* Screenshots get a gradient foot so they melt into the card.
                    Pixel covers already end on the card's colour. */}
                {project.image ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-ink-800/95 via-ink-800/30 to-transparent"
                  />
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                <h3 className="display flex items-start justify-between gap-4 text-xl leading-snug text-paper">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peri-300"
                  >
                    {project.title}
                  </a>
                  <LuArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-paper-mute transition-all duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lantern-300"
                  />
                </h3>

                <p className="text-sm leading-relaxed text-paper-dim">{project.description}</p>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-2">
                  <p className="text-[0.8rem] leading-relaxed text-sage-300">
                    {project.tech.join("  ·  ")}
                  </p>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel wavy relative z-10 -m-2 p-2 text-lantern-300 transition-colors duration-300 hover:text-lantern-400 focus-visible:outline-2 focus-visible:outline-lantern-300"
                    >
                      Visit site
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
