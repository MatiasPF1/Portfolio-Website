import Navbar from "@/components/navbar";
import Hero_Section_Text from "@/components/Hero_Section_Text";
import Skill_Section from "@/components/skills";
import About_Me from "@/components/AboutMe";
import Projects_Section from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* z-10 keeps the whole document above the WebGL backdrop, grain and
          vignette layers rendered in the root layout. */}
      <main className="relative z-10 flex min-h-screen flex-col">
        <section id="home" className="mx-auto w-full max-w-5xl px-6 pb-8 pt-28 md:pb-10 md:pt-32">
          <Hero_Section_Text />
        </section>

        <Skill_Section />
        <About_Me />
        <Projects_Section />
        <Footer />
      </main>
    </>
  );
}
