import Shuffle from '@/Reactbits_Components/Shuffletext';

export default function Hero_Section_Text() {
  return (
    // Left Section - Text Content  
    <div className="ml-50 text-white">
      <Shuffle
        text="Hi!, I'm Matias"
        shuffleDirection="left"
        ease="power2.out"
        duration={0.35}
        shuffleTimes={1}
        stagger={0.03}
        loop={false}
        loopDelay={0}
      
        />
    </div>

 
  );
}