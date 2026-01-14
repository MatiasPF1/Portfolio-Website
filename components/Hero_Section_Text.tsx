import Shuffle from '@/Reactbits_Components/Shuffletext';

export default function Hero_Section_Text() {
  return (
    // Left Section - Text Content  
    <div className="text-[#fcf4f4] font-press-start max-w-lg mt-2 mx-auto md:mx-0 text-center md:text-left">
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

      {/* About Me*/}
      <div>
        <p className="text-lg text-slate-100 leading-relaxed font-medium max-w-lg mt-6">
      Currently a Sophomore at{" "}<span className="text-[#a6b6e4db] font-bold">Stevens Institute of Technology</span>, studying Computer
      Science with a focus in{" "} Machine Learning. I aim to pursue a career in{" "}
      <span className="text-[#a6b6e4db] font-bold">Software Engineering</span>,{" "}
      <span className="text-[#a6b6e4db] font-bold">Machine Learning Engineering</span>, or  <span className="text-[#a6b6e4db] font-bold"> R&amp;D.</span>
        </p>

        <p className="text-lg text-slate-100 leading-relaxed font-medium max-w-lg mt-5 hidden md:block">
        Regarding my campus involvement and leadership, I am a member of the{" "}
        <span className="text-[#a6b6e4db] font-bold">Advanced Quantum Materials Lab</span>.
        I serve on the{" "}
        <span className="text-[#a6b6e4db] font-bold">E-Board of Stevens ColorStack {" "}</span> .
        I previously served as a{" "}
        <span className="text-[#a6b6e4db] font-bold">Tutor–Counselor–Resident Assistant for STEP</span>, supporting{" "}
        50+ students through mentoring, tutoring in calculus/physics , and residential life supervision.
        </p>
      </div>

      {/* Buttons for Contact me and Cv */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-5">
        <a 
          href="mailto:matiaspfreire@gmail.com"
          className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-[#a6b6e4] text-[#101624] text-base font-semibold 
                   transition-all duration-200 ease-out
                   hover:bg-[#92a6de] hover:scale-105 hover:shadow-lg">
          Contact Me
        </a>

        <a
          href="/MatiasFreire_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-6 py-3 rounded-lg border border-[#a6b6e4] text-[#a6b6e4] text-base
                   transition-all duration-200 ease-out
                   hover:bg-[#a6b6e4]/10 hover:scale-105 hover:shadow-lg">
          Resume
        </a>
      </div>
    </div>
  );
}