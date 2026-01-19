'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
      
      {/* Mobile Background Image - less than (768px) */}
      <div className="block md:hidden w-full h-full">
        <Image
          src="/MobileBackGround.png"
          alt="Mobile Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Desktop Background Video - visible on screens md (768px) and larger */}
      <video
        ref={videoRef}
        className="hidden md:block w-full h-full object-cover"
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
