'use client';

import Shuffle from '@/Reactbits_Components/Shuffletext';

export default function About_Me() {
  return (
    <section className="w-full min-h-screen mt-24  text-[#fcf4f4] font-press-start">
      <div className="flex justify-center mb-16">
        <Shuffle
          text="About Me"
          shuffleDirection="left"
          ease="power2.out"
          duration={1.4}
          shuffleTimes={1}
          stagger={0.03}
          loop
          loopDelay={2}
        />
      </div>
    </section>
  );
}
