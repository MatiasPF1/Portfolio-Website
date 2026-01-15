'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  //Used to force execution of the video 
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/Particles.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        webkit-playsinline="true"
      />
    </div>
  );
}
