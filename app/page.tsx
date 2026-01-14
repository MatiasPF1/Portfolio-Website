import Navbar from "@/components/navbar";
import Hero_Section from "@/components/Hero_Section_Image";
import Hero_Section_Text from "@/components/Hero_Section_Text";
import Skill_Section from "@/components/skills";
import About_Me from "@/components/AboutMe";
import Projects_Section from "@/components/Projects";


export default function Home() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section Container, This was creates to do a fast */}
      <section id="home" className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-14 px-8 mt-38 mb-15 max-w-[1100px] mx-auto w-full mr-0 md:mr-[14%]">
        <Hero_Section_Text />
        <Hero_Section />
      </section>
      
      <div id="skills">
        <Skill_Section />
      </div>
      <div id="about">
        <About_Me />
      </div>
      <div id="projects">
        <Projects_Section />
      </div>

    </main>
  );
}

