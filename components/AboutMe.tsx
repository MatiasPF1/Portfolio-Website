'use client';

import Shuffle from '@/Reactbits_Components/Shuffletext';

export default function About_Me() {
  const lifeMoments = [
    {
      image: '/First-Gen.jpeg',
      caption: "First Generation Ecuadorean CS Student "
    },
    {
      image: '/STEP.jpeg',
      caption: 'My Students During STEP 2025 Bridge Summer Program'
    },
    {
      image: '/SHPE2025.jpeg',
      caption: 'At SHPE National Conference 2025 in Philadelphia, PA'
    },
    {
      image: '/Hackru.jpeg',
      caption: 'Me and my Team during HackRu 2025'
    }
  ];

  return (
    <section className="w-full min-h-screen mt-24 text-[#fcf4f4] font-press-start">

      {/* About Me */}
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

      {/* A Piece Of My Life*/}
      <div className="flex justify-center mb-8 mr-[84rem]">
        <Shuffle
          text="A Piece Of My Life"
          shuffleDirection="left"
          ease="power2.out"
          duration={1.4}
          shuffleTimes={1}
          stagger={0.03}
          loop
          loopDelay={2}
        />
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-4 gap-18 px-15 max-w-440 mx-auto mb-7">
        {lifeMoments.map((moment, index) => (
          <div key={index} className="relative group pt-10">
            <div className="overflow-hidden rounded-lg  transition-transform hover:scale-105 mb-5">
              <img
                src={moment.image}
                alt={moment.caption}
                className="w-full aspect-square object-cover"
              />
            </div>
            <p className="text-m mt-4 text-center leading-relaxed">{moment.caption}</p>
          </div>
        ))}
      </div>

      {/* Music */}
      <div className="flex justify-center mt-24 mr-408">
        <Shuffle
          text="Music"
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