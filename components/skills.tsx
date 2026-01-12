import Shuffle from '@/Reactbits_Components/Shuffletext';

const skills = [
  'TypeScript',
  'Next.js',
  'React',
  'Tailwind CSS',
  'Python',
  'C/C++',
  'Java',
  'Git',
  'PyTorch',
  'Pandas',
  'Scikit-Learn',
  'NumPy',
];
export default function Skill_Section() {
  return (
    <section className="w-full mt-20 text-[#fcf4f4] font-press-start">
      
      {/* Title */}
      <div className="flex justify-center mb-16">
        <Shuffle
          text="Skills"
          shuffleDirection="left"
          ease="power2.out"
          duration={1.4}
          shuffleTimes={1}
          stagger={0.03}
          loop={true}
          loopDelay={2}
        />
      </div>

      {/* Grid container */}
      <div className="max-w-9xl mx-auto px-10">
        <div className="grid grid-cols-4 gap-x-9 gap-y-10">
          {skills.map((skill) => (
            <div
              key={skill}
              className="
                flex items-center justify-center
                h-20
                rounded-xl
                border border-white/15
                bg-[#0b1220]/60
                text-slate-100 text-base
                backdrop-blur-md
                transition-all duration-200 ease-out
                hover:scale-[1.03]
                hover:border-white/30
                hover:shadow-lg
              "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
