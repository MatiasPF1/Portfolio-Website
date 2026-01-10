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
      <div className="flex justify-center mb-8 mr-336 ">
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
      <p className="text-xl mt-4 text-center leading-relaxed pt-[1rem]"><strong>Some photos I love i took during my First/Second Year of College</strong> </p>


      {/* Photo Grid */}
      <div className="grid grid-cols-4 gap-18 px-15 max-w-440 mx-auto mb-7 pt-[2rem]">
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
      <div className="flex justify-center mr-408 pt-[4rem] ">
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
      <p className="text-xl mt-4 text-center leading-relaxed pt-[1rem]"><strong>Some of the Music I like</strong> </p>

      
      {/* Music Grid */}
      <div className="grid grid-cols-4 gap-10 px-8 max-w-[1500px] mx-auto mb-[24rem] pt-[3rem]">
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/Malcom.jpeg"
              alt="Malcom Todd"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Malcom Todd</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/bruno-mars.jpg"
              alt="Bruno Mars"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Bruno Mars</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/Enanitos_verdes.jpg"
              alt="Enanitos Verdes"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Enanitos Verdes</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/Grent.jpeg"
              alt="Grent Perez"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Grent Perez</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg  transition-transform hover:scale-105 ">
            <img
              src="/Jane_Remover.jpg"
              alt="Jane Remover"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Jane Remover</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/Laufey1.jpg"
              alt="Laufey"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Laufey</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/TheMarias.jpg"
              alt="The Marias"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">The Marias</p>
        </div>
        
        <div className="relative group">
          <div className="overflow-hidden rounded-lg transition-transform hover:scale-105 ">
            <img
              src="/Tame_Impala.jpg"
              alt="Tame Impala"
              className="w-full aspect-square object-cover"
            />
          </div>
          <p className="text-md mt-4 text-center leading-relaxed">Tame Impala</p>
        </div>
      </div>

    </section>
  );
}
