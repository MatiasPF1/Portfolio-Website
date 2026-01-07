import Shuffle from '@/Reactbits_Components/Shuffletext';

export default function Hero_Section_Text() {
  return (
    // Left Section - Text Content  

                                 // Shuffle Main Text
    <div className="ml-97 -mt-103.5 text-[#fcf4f4] font-press-start ">
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

      <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-medium max-w-xl mt-7">
      Currently a Sophomore at{" "}<span className="text-[#a6b6e4db] font-bold">Stevens Institute of Technology</span>, studying Computer
      Science with a focus in{" "} Machine Learning. I aim to pursue a career in{" "}
      <span className="text-[#a6b6e4db] font-bold">Software Engineering</span>,{" "}
      <span className="text-[#a6b6e4db] font-bold">Machine Learning Engineering</span>, or  <span className="text-[#a6b6e4db] font-bold"> R&amp;D.</span>
      </p>


    <p className="text-lg md:text-xl text-slate-100 leading-relaxed font-medium max-w-xl mt-6">
        Regarding my campus involvement and leadership, I am a member of the{" "}
        <span className="text-[#a6b6e4db] font-bold">Advanced Quantum Materials Lab</span>.
        I serve on the{" "}
        <span className="text-[#a6b6e4db] font-bold">E-Board of Stevens ColorStack {" "}</span> .
        I previously served as a{" "}
        <span className="text-[#a6b6e4db] font-bold">Tutor–Counselor–Resident Assistant for STEP</span>, supporting{" "}
        50+ students through mentoring, tutoring in calculus/physics , and residential life supervision.
    </p>
    </div>

                                    {/*Buttons for Contact me and Cv*/}
    <div className="flex gap-6 mt-10 ml-28">

    <a 
      href="mailto:matiaspfreire@gmail.com"
      className="px-6 py-3 rounded-lg bg-[#a6b6e4] text-[#101624] font-semibold 
               transition-all duration-200 ease-out
               hover:bg-[#92a6de] hover:scale-105 hover:shadow-lg">
              Contact Me
    </a>

    <a
    href="/MatiasFreire_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="px-6 py-3 rounded-lg border border-[#a6b6e4] text-[#a6b6e4]
               transition-all duration-200 ease-out
               hover:bg-[#a6b6e4]/10 hover:scale-105 hover:shadow-lg">
               Resume
  </a>

</div>


    </div>
  );
}