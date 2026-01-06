import Navbar from "@/components/navbar";
import Hero_Section from "@/components/Hero_Section_Image";
import Hero_Section_Text from "@/components/Hero_Section_Text";



export default function Home() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      <Navbar />
      <Hero_Section />
      <Hero_Section_Text />

    </main>
  );
}

