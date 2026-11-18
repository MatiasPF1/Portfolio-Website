import AnimatedSprite from "@/components/AnimatedSprite";
import PixelSprite from "@/components/PixelSprite";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/lib/content";

export default function Skill_Section() {
  return (
    <section id="skills" className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <Reveal>
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="What I build with"
          description="The tools I reach for across systems work, AI and ML, and web engineering."
        />
      </Reveal>

      <div className="relative mt-7 md:mt-8">
        {/* A bunny sitting on the first divider line. */}
        <AnimatedSprite
          frames={["bunny", "bunnyFlop"]}
          mode="blink"
          scale={3}
          duration={3.6}
          delay={-1.2}
          className="absolute -top-[27px] right-4"
        />
        {skillGroups.map((group, index) => (
          <Reveal key={group.label} delay={index * 80}>
            {/* A labelled row per group, set as a line of type with pixel
                stars between the words rather than a wall of boxed tags. */}
            <div className="grid gap-3 border-t border-white/8 py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-6">
              <h3 className="pixel text-paper-mute">{group.label}</h3>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {group.items.map((item, itemIndex) => (
                  <li key={item} className="flex items-center gap-4">
                    {itemIndex > 0 ? (
                      <PixelSprite
                        name="twinkle"
                        scale={2}
                        className="twinkle opacity-70"
                        style={{ animationDelay: `${-((index * 3 + itemIndex) % 7) * 0.45}s` }}
                      />
                    ) : null}
                    <span className="display hop cursor-default text-xl text-paper-dim md:text-[1.4rem]">
                      {item}
                    </span>
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
