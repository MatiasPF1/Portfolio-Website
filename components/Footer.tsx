import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Reveal from "@/components/Reveal";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8 md:pb-24">
      <Reveal>
        <div className="flex flex-col gap-8 border-t border-white/8 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="pixel text-paper-mute">Get in touch</p>
            <a
              href="mailto:matiaspfreire@gmail.com"
              className="display mt-4 inline-block text-2xl text-paper transition-colors duration-300 hover:text-peri-300 md:text-3xl"
            >
              matiaspfreire@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="https://github.com/MatiasPF1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-paper-mute transition-colors duration-300 hover:text-paper"
            >
              <FaGithub className="size-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/matias43/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-paper-mute transition-colors duration-300 hover:text-paper"
            >
              <FaLinkedin className="size-5" />
            </Link>
            <a
              href="/MatiasFreire_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel text-paper-mute transition-colors duration-300 hover:text-paper"
            >
              Résumé
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-[0.75rem] text-paper-dim md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Matias Freire</p>
          <p>Built with Next.js, Three.js and Tailwind CSS.</p>
        </div>
      </Reveal>
    </footer>
  );
}
