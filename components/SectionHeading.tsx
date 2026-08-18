"use client";

import Shuffle from "@/Reactbits_Components/Shuffletext";

type SectionHeadingProps = {
  /** Two-digit section index, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * One heading recipe for every section: a pixel eyebrow (the old site's
 * signature, kept small), a serif title, and a hairline that runs to the edge.
 *
 * The Shuffle effect moved off the big titles and onto the eyebrow — it still
 * greets you, but a looping scramble on a 48px headline fights the reading.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "flex flex-col items-center text-center" : ""}>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="pixel text-peri-500/70">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-peri-400/30" />
        <Shuffle
          text={eyebrow}
          tag="span"
          className="font-pixel text-peri-400"
          style={{ fontSize: "0.625rem", letterSpacing: "0.18em" }}
          shuffleDirection="left"
          ease="power2.out"
          duration={0.7}
          shuffleTimes={1}
          stagger={0.02}
          textAlign="left"
        />
      </div>

      <h2 className="display mt-4 text-[2.1rem] leading-[1.05] text-paper sm:text-5xl md:text-[3.4rem]">
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-4 max-w-xl text-[0.95rem] leading-relaxed text-paper-mute ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
