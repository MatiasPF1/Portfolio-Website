'use client';

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-0">
      <video
        className="w-full h-full object-cover"
        src="/Particles.webm"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
