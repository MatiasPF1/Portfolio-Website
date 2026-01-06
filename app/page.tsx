import Navbar from "@/components/navbar";
import Hero_Section from "@/components/Hero_Section";



export default function Home() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      <Navbar />
      <Hero_Section />

    </main>
  );
}

