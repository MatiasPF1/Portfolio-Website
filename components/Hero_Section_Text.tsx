"use client";

import { CiLocationOn } from "react-icons/ci";
import { LuGraduationCap, LuSparkles } from "react-icons/lu";

import Shuffle from "@/Reactbits_Components/Shuffletext";
import Hero_Section from "@/components/Hero_Section_Image";
import Reveal from "@/components/Reveal";

const experience = [
  {
    role: "Software Engineering Intern",
    org: "GE Transportation, a Wabtec company",
    detail:
      "Built a real-time locomotive monitoring system on RTI Connext DDS, FastAPI and Docker, with condition-boundary and scikit-learn diagnostics cached in Redis.",
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Advanced Quantum Materials Lab",
    detail:
      "Machine learning for extraordinary magnetoresistance geometry optimization, and a Dockerized MoS₂ image synthesis and analysis platform.",
  },
];

const leadership = [
  { role: "Vice President", org: "Stevens ColorStack" },
  { role: "Chief Web Officer", org: "Stevens SHPE" },
  {
    role: "Tutor-Counselor / Resident Assistant",
    org: "STEP Bridge Summer Program",
    detail: "Led recitations and tutoring for 52+ incoming freshmen, Summer 2025.",
  },
];

const meta = [
  { icon: CiLocationOn, label: "New York Metropolitan Area" },
  { icon: LuGraduationCap, label: "B.S. Computer Science, Stevens Institute of Technology, 2028" },
  { icon: LuSparkles, label: "Cornell Tech Break Through Tech ML Fellow, Summer 2026" },
];

export default function Hero_Section_Text() {
  return (
    <div className="w-full">
      {/* ---------------------------------------------- intro + portrait -- */}
      {/* The portrait track is sized explicitly — an `auto` track next to a
          width:100% figure is a circular dependency and collapses to nothing. */}
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_290px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <Reveal className="order-2 md:order-1">
          <div className="flex items-center gap-3">
            <span className="pixel text-peri-500/70">01</span>
            <span aria-hidden="true" className="h-px w-6 bg-peri-400/30" />
            <Shuffle
              text="Hi, I'm Matias"
              tag="span"
              className="font-pixel text-peri-400"
              style={{ fontSize: "0.625rem", letterSpacing: "0.18em" }}
              shuffleDirection="left"
              ease="power2.out"
              duration={0.8}
              shuffleTimes={1}
              stagger={0.02}
              textAlign="left"
            />
          </div>

          <h1 className="display mt-6 text-[2.6rem] leading-[0.98] text-paper sm:text-6xl md:text-[4.1rem]">
            Matias
            <br />
            Freire
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-dim">
            Computer science student at Stevens. I&apos;ve worked on real-time
            systems and machine learning applications, and I&apos;m most
            interested in building complex things.
          </p>

          <ul className="mt-7 flex flex-col gap-2.5">
            {meta.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3 text-sm text-paper-mute">
                <Icon className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:matiaspfreire@gmail.com"
              className="rounded-full bg-peri-400 px-6 py-3 text-sm font-medium text-ink-900 transition-all duration-300 ease-out-soft hover:bg-peri-300 hover:shadow-[0_8px_30px_-12px] hover:shadow-peri-400/60 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-peri-300"
            >
              Contact me
            </a>
            <a
              href="/MatiasFreire_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-peri-400/35 px-6 py-3 text-sm font-medium text-peri-300 transition-all duration-300 ease-out-soft hover:border-peri-400/70 hover:bg-peri-400/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-peri-300"
            >
              Résumé
            </a>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2" delay={120}>
          <Hero_Section />
        </Reveal>
      </div>

      {/* --------------------------------------- experience + leadership -- */}
      <Reveal delay={80}>
        <div className="mt-12 grid gap-x-14 gap-y-8 border-t border-white/8 pt-8 md:mt-16 md:grid-cols-2">
          <div>
            <h3 className="pixel text-paper-mute">Experience</h3>
            <ul className="mt-5 flex flex-col">
              {experience.map((item) => (
                <li
                  key={item.org}
                  className="group border-b border-white/6 py-4 first:pt-0 last:border-b-0"
                >
                  {/* Stacked rather than inline: org names here run long
                      enough that a middot separator ends up orphaned. */}
                  <div className="flex flex-col gap-1">
                    <span className="display text-xl leading-tight text-paper">{item.role}</span>
                    <span className="text-sm font-medium text-peri-400">{item.org}</span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-mute">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="pixel text-paper-mute">Leadership</h3>
            <ul className="mt-5 flex flex-col">
              {leadership.map((item) => (
                <li key={item.org} className="border-b border-white/6 py-4 first:pt-0 last:border-b-0">
                  {/* Stacked rather than inline: org names here run long
                      enough that a middot separator ends up orphaned. */}
                  <div className="flex flex-col gap-1">
                    <span className="display text-xl leading-tight text-paper">{item.role}</span>
                    <span className="text-sm font-medium text-peri-400">{item.org}</span>
                  </div>
                  {item.detail ? (
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-mute">
                      {item.detail}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
