import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import AnimatedSprite from "@/components/AnimatedSprite";
import PixelSprite from "@/components/PixelSprite";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pb-10 pt-12 md:pb-14">
      <Reveal>
        {/* An Andean night on the divider line: a condor riding the air
            above, a llama in a woven blanket, and the cat asleep. Every
            animal's box ends exactly where the border begins. */}
        <div aria-hidden="true" className="relative flex items-end justify-between px-4 md:px-10">
          <div className="condor-soar absolute -top-16 left-[18%]">
            <AnimatedSprite frames={["condorGlide", "condorFlap"]} mode="blink" scale={3} duration={3.2} />
          </div>

          <AnimatedSprite frames={["llama", "llamaChew"]} mode="blink" scale={3} duration={2.6} delay={-0.8} />

          <div className="relative">
            <span className="pixel zzz absolute -top-3 right-9 text-peri-300">z</span>
            <span
              className="pixel zzz absolute -top-6 right-6 text-peri-300"
              style={{ ["--zzz-delay" as string]: "-1.2s" }}
            >
              z
            </span>
            <span
              className="pixel zzz absolute -top-9 right-3 text-peri-300"
              style={{ ["--zzz-delay" as string]: "-2.4s" }}
            >
              z
            </span>
            <PixelSprite name="cat" scale={3} className="snooze block" />
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-white/8 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="pixel text-paper-mute">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              className="display wavy mt-4 inline-block text-2xl text-paper transition-colors duration-300 hover:text-peri-300 md:text-3xl"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-paper-mute transition-all duration-300 hover:-translate-y-0.5 hover:text-paper"
            >
              <FaGithub className="size-5" />
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-paper-mute transition-all duration-300 hover:-translate-y-0.5 hover:text-paper"
            >
              <FaLinkedin className="size-5" />
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel wavy text-paper-mute transition-colors duration-300 hover:text-paper"
            >
              Résumé
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-[0.75rem] text-paper-dim md:flex-row md:justify-between">
          <p className="flex items-center gap-2.5">
            © {new Date().getFullYear()} {profile.name}
            <span title="Ecuador" className="inline-flex">
              <PixelSprite name="flag" scale={2} />
              <span className="sr-only">, from Ecuador</span>
            </span>
          </p>
          <p className="flex items-center gap-2">
            Built with
            <PixelSprite name="heart" scale={2} />
            <span className="sr-only">love,</span>
            Next.js, Three.js and Tailwind CSS.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
