import Shuffle from '@/Reactbits_Components/Shuffletext';

export default function Hero_Section_Text() {
  return (
    // Left Section - Text Content  

                                 // Shuffle Main Text
    <div className="ml-97 -mt-103.5 text-white font-press-start ">
      <Shuffle
        text="Hi!, I'm Matias!"
        shuffleDirection="left"
        ease="power2.out"
        duration={1.4}
        shuffleTimes={1}
        stagger={0.03}
        loop={true}
        loopDelay={2}
      />

                                  {/* Introduction */}
    <div>

    </div>

    </div>
  );
}