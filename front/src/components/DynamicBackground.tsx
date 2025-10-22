'use client'

import { useRef, useState, useEffect } from "react";

interface DynamicBackgroundProps {
  videoSrc: string;
  imageSrc: string;
  fallBackOnMobile?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  // children: ReactNode
}

export default function DynamicBackground({
  videoSrc,
  imageSrc,
  fallBackOnMobile = true,
  overlay = true,
  overlayOpacity = 0.4
}: DynamicBackgroundProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useVideoBack, setUseVideoBack] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (fallBackOnMobile && typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setUseVideoBack(false);
      }
    }
  }, [fallBackOnMobile]);

  const handleVideoLoad = () => {
    setLoading(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, falling back to image');
    setError(true);
    setUseVideoBack(false);
  };

  return (
    <div className="fixed inset-0 z-0">
      {useVideoBack && !error ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          
          {!loading && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageSrc})` }}
            />
          )}
        </>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      )}

      {overlay && (
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` 
          }}
        />
      )}
    </div>
  );
}