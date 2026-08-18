import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const groups = [
  { label: "Languages", items: ["Python", "TypeScript", "Java", "C/C++", "SQL"] },
  { label: "Web", items: ["React", "Next.js", "Tailwind CSS", "FastAPI", "Supabase"] },
  { label: "ML & Data", items: ["PyTorch", "scikit-learn", "NumPy", "Pandas"] },
  { label: "Systems & Data", items: ["RTI Connext DDS", "Docker", "Redis", "SQLite"] },
  { label: "Tooling", items: ["Git", "Linux"] },
];

export default function Skill_Section() {
  return (
    <section id="skills" className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <Reveal>
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="What I build with"
          description="The tools I reach for across systems work, web engineering, and research."
        />
      </Reveal>

      <div className="mt-7 md:mt-8">
        {groups.map((group, index) => (
          <Reveal key={group.label} delay={index * 80}>
            {/* A labelled row per group rather than a wall of identical tiles —
                it says more with less and stays readable at any width. */}
            <div className="grid gap-3 border-t border-white/8 py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8 md:py-6">
              {/* leading-loose because .pixel sets line-height:1, which
                  collapses a label that wraps onto two lines. */}
              <h3 className="pixel pt-1 leading-loose text-paper-mute">{group.label}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-ink-800/50 px-4 py-2 text-sm text-paper-dim backdrop-blur-sm transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-sage-400/40 hover:bg-sage-400/8 hover:text-paper"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
