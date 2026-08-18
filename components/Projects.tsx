import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const projects = [
  {
    title: "MoS₂ Image Synthesis & Analysis Platform",
    description:
      "A pipeline for synthesizing realistic computational scanning transmission electron microscopy (STEM) images, built for deep-learning studies of defects in 2D nanomaterials.",
    image: "/STEM.png",
    tech: ["PyTorch", "Dash / Plotly", "CSS"],
    repo: "https://github.com/MatiasPF1/MoS2-Image-Synthesis-Analysis-Platform",
  },
  {
    title: "SHPE Stevens Chapter Website",
    description:
      "Lead developer of the site for the Stevens Institute of Technology chapter of SHPE, supporting Hispanic students in engineering.",
    image: "/SHPE.png",
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    repo: "https://github.com/MatiasPF1/SHPE-Stevens-Chapter",
  },
  {
    title: "ColorStack Stevens Chapter Website",
    description:
      "Lead developer of the site for the Stevens Institute of Technology chapter of ColorStack, supporting Black and Latinx students in tech.",
    image: "/Colorstack.png",
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    repo: "https://github.com/MatiasPF1/Colorstack-StevensChapter",
  },
  {
    title: "Interactive Neural Network Digit Classifier",
    description:
      "A Streamlit app where you draw a digit and watch the network's prediction update in real time, layer activations and all.",
    image: "/Interactive-Neural-Network.png",
    tech: ["PyTorch", "Streamlit", "Pygame"],
    repo: "https://github.com/MatiasPF1/Interactive-Neural-Network-Digit-Classifier",
  },
];

export default function Projects_Section() {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <Reveal>
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Things I've made"
          description="Research tooling and community sites."
        />
      </Reveal>

      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.repo} delay={(index % 2) * 100} as="article">
            <Link
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              // The whole card is the link: one target, no nested interactive
              // elements, and the arrow reads as the affordance.
              className="lit-edge group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-800/62 backdrop-blur-md transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-white/15 hover:bg-ink-800/75 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-peri-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover object-top brightness-[0.78] saturate-[0.85] transition-all duration-900 ease-out-soft group-hover:scale-[1.04] group-hover:brightness-95 group-hover:saturate-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink-800/95 via-ink-800/30 to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                <h3 className="display flex items-start justify-between gap-4 text-xl leading-snug text-paper">
                  <span>{project.title}</span>
                  <LuArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-paper-mute transition-all duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-peri-300"
                  />
                </h3>

                <p className="text-sm leading-relaxed text-paper-dim">{project.description}</p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-sage-400/25 bg-sage-400/6 px-3 py-1.5 text-[0.7rem] text-sage-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
