"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Several sections can straddle the band at once; take whichever is
        // showing the most so the indicator never flickers between two.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-3 z-50 w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 rounded-full border transition-all duration-500 ease-out-soft md:top-5 ${
        scrolled
          ? "border-white/10 bg-ink-900/70 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-white/6 bg-ink-900/40 backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-center gap-2 px-4 py-4 sm:justify-between sm:px-5 md:px-7 md:py-5">
        <Link
          href="#home"
          className="display hidden text-lg text-paper transition-colors duration-300 hover:text-peri-300 sm:block"
        >
          Matias Freire
        </Link>

        <ul className="flex items-center gap-1 md:absolute md:left-1/2 md:-translate-x-1/2">
          {links.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`pixel relative block rounded-full px-2 py-2 transition-colors duration-300 sm:px-2.5 md:px-3.5 ${
                    isActive ? "text-paper" : "text-paper-mute hover:text-paper-dim"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2 -bottom-0.5 h-px bg-peri-400 transition-all duration-500 ease-out-soft sm:inset-x-2.5 md:inset-x-3.5 ${
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hidden on the narrowest screens — the four nav labels alone fill the
            pill there, and both links repeat in the footer. */}
        <ul className="hidden items-center gap-3 sm:flex md:gap-4">
          <li>
            <Link
              href="https://github.com/MatiasPF1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="block text-paper-mute transition-colors duration-300 hover:text-paper"
            >
              <FaGithub className="size-4.5 md:size-5" />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/matias43/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="block text-paper-mute transition-colors duration-300 hover:text-paper"
            >
              <FaLinkedin className="size-4.5 md:size-5" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
