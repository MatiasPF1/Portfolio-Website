"use client";

import { CiLocationOn } from "react-icons/ci";
import { LuGraduationCap } from "react-icons/lu";

import Shuffle from "@/Reactbits_Components/Shuffletext";
import Hero_Section from "@/components/Hero_Section_Image";
import PixelSprite from "@/components/PixelSprite";
import Reveal from "@/components/Reveal";
import { experience, leadership, profile } from "@/lib/content";

const meta = [
  { icon: CiLocationOn, label: profile.location },
  { icon: LuGraduationCap, label: profile.school },
];

type Entry = { role: string; org: string; period: string; detail?: string };

function EntryList({ title, items }: { title: string; items: Entry[] }) {
  return (
    <div>
      <h3 className="pixel flex items-center gap-2.5 text-paper-mute">
        <PixelSprite name="twinkle" scale={2} className="twinkle" />
        {title}
      </h3>
      <ul className="mt-5 flex flex-col">
        {items.map((item) => (
          <li key={item.org} className="border-b border-white/6 py-4 first:pt-0 last:border-b-0">
            {/* Stacked rather than inline: org names here run long
                enough that a middot separator ends up orphaned. */}
            <div className="flex flex-col gap-1">
              <span className="display text-xl leading-tight text-paper">{item.role}</span>
              <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
                <span className="text-sm font-medium text-peri-400">{item.org}</span>
                <span className="pixel text-paper-mute/70">{item.period}</span>
              </span>
            </div>
            {item.detail ? (
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-mute">{item.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

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

          {/* w-fit so the sparkles hang off the end of the name, not the column. */}
          <h1 className="display relative mt-6 w-fit text-[2.6rem] leading-[0.98] text-paper sm:text-6xl md:text-[4.1rem]">
            Matias
            <br />
            Freire
            <PixelSprite name="sparkle" scale={3} className="twinkle absolute -right-10 top-0" />
            <PixelSprite
              name="twinkle"
              scale={3}
              className="twinkle absolute -right-4 top-9 md:top-12"
              style={{ animationDelay: "-1.4s" }}
            />
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-dim">
            Computer science student at Stevens. I&apos;ve worked on real-time
            systems, machine learning applications and, lately, AI agents, and
            I&apos;m most interested in building complex things.
          </p>

          <ul className="mt-7 flex flex-col gap-2.5">
            {meta.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3 text-sm text-paper-mute">
                <Icon className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href={`mailto:${profile.email}`}
              style={{ ["--edge" as string]: "var(--color-peri-500)" }}
              className="key bg-peri-400 px-6 py-3 text-sm font-medium text-ink-900 hover:bg-peri-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-peri-300"
            >
              Contact me
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ["--edge" as string]: "rgb(139 157 214 / 0.3)" }}
              className="key border border-peri-400/40 bg-ink-800/60 px-6 py-3 text-sm font-medium text-peri-300 hover:border-peri-400/70 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-peri-300"
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
        <div className="mt-9 grid gap-x-14 gap-y-8 border-t border-white/8 pt-7 md:mt-10 md:grid-cols-2">
          <EntryList title="Experience" items={experience} />
          <EntryList title="Leadership" items={leadership} />
        </div>
      </Reveal>
    </div>
  );
}
