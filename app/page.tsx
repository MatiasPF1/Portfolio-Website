import Navbar from "@/components/navbar";
import Particles from "@/components/Particles";




export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between p-24 overflow-hidden">
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={false}
    alphaParticles={false}
    disableRotation={false}
  />
</div>
      <Navbar />
    </main>
  );
}
