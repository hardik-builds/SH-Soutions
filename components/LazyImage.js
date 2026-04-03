'use client';
import { useState, useRef, useEffect } from 'react';

export default function LazyImage({ src, alt, className, style }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div 
      ref={imgRef}
      className={className}
      style={{
        ...style,
        backgroundColor: isLoaded ? 'transparent' : '#E5E7EB',
        backgroundImage: isLoaded ? 'none' : `linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%)`,
        backgroundSize: '200% 100%',
        animation: !isLoaded ? 'shimmer 1.5s infinite' : 'none'
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        />
      )}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}