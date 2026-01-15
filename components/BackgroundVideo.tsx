'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  //Used to force execution of the video 
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
      <source src="/Particles.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
