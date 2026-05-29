import Shuffle from '@/Reactbits_Components/Shuffletext';
import Hero_Section from '@/components/Hero_Section_Image';

export default function Hero_Section_Text() {
  return (
    <div className="w-full font-press-start text-[#fcf4f4]">

      {/* Name */}
      <div className="mb-6 md:ml-90">
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
      </div>

      {/* Main row: left content + right image */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">

        {/* Left: intro + experience + leadership + buttons */}
        <div className="flex flex-col order-2 md:order-1 md:max-w-[55%]">

          {/* Experience */}
          <div className="mt-3 border-t border-[#a6b6e4]/20 pt-6">
            <h1 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
              <span className="block w-1 h-6 rounded-full bg-[#a6b6e4]" />
              Experience
            </h1>
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-[#a6b6e4]/30 pl-4">
                <p className="text-lg font-medium text-slate-100"><span className="text-[#a6b6e4db] font-bold">SWE Intern · Wabtec</span></p>
                <p className="text-lg font-medium text-slate-300"> Modular Control Architecture(MCA) team. Working in data distribution services(DDS) projects</p>
              </div>
              <div className="border-l-2 border-[#a6b6e4]/30 pl-4">
                <p className="text-lg font-medium text-slate-100"><span className="text-[#a6b6e4db] font-bold">Undergraduate Researcher · AQM Lab</span></p>
                <p className="text-lg font-medium text-slate-300">ML for Extraordinary Magnetoresistance devices &amp; Computational MoS2 Synthesis Platform</p>
              </div>
            </div>
          </div>



          {/* Leadership */}
          <div className="mt-3 border-t border-[#a6b6e4]/20 pt-6">
            <h1 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
              <span className="block w-1 h-6 rounded-full bg-[#a6b6e4]" />
              Leadership
            </h1>
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-[#a6b6e4]/30 pl-4">
                <p className="text-lg font-medium text-slate-100"><span className="text-[#a6b6e4db] font-bold">Stevens ColorStack</span></p>
                <p className="text-lg font-medium text-slate-300">Vice President</p>
              </div>
              <div className="border-l-2 border-[#a6b6e4]/30 pl-4">
                <p className="text-lg font-medium text-slate-100"><span className="text-[#a6b6e4db] font-bold">Stevens SHPE</span></p>
                <p className="text-lg font-medium text-slate-300">Chief Web Officer</p>
              </div>
              <div className="border-l-2 border-[#a6b6e4]/30 pl-4">
                <p className="text-lg font-medium text-slate-100"><span className="text-[#a6b6e4db] font-bold">TCRA · Stevens STEP Bridge Summer Program</span></p>
                <p className="text-lg font-medium text-slate-300">Mentored 50+ students (Summer 2025)</p>
              </div>
            </div>
          </div>





          {/* Buttons */}
          <div className="mt-8 flex flex-row gap-4">
            <a
              href="mailto:matiaspfreire@gmail.com"
              className="text-center px-6 py-3 rounded-lg bg-[#a6b6e4] text-[#101624] text-base font-semibold
                         transition-all duration-200 ease-out hover:bg-[#92a6de] hover:scale-105 hover:shadow-lg">
              Contact Me
            </a>
            <a
              href="/Matias_Freire.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center px-6 py-3 rounded-lg border border-[#a6b6e4] text-[#a6b6e4] text-base
                         transition-all duration-200 ease-out hover:bg-[#a6b6e4]/10 hover:scale-105 hover:shadow-lg">
              Resume
            </a>
          </div>
        </div>



        {/* Right: image */}
        <div className="shrink-0 order-1 md:order-2 w-full md:w-auto flex justify-center md:items-center md:self-center">
          <Hero_Section />
        </div>

      </div>

    </div>
  );
}