import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import './circular-gallery.css';

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(' ');

export interface GalleryPhoto {
  url: string;
  fallback?: string;
  text?: string;
  pos?: string;
  by?: string;
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: GalleryPhoto;
}

export interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  className?: string;
  radius?: number;
  autoRotateSpeed?: number;
}

export const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius: radiusProp = 560, autoRotateSpeed = 0.06, ...props }, ref) => {
    const [rotation, setRotation] = useState<number>(0);
    const [isInteracting, setIsInteracting] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef<boolean>(false);
    const startXRef = useRef<number>(0);
    const startRotationRef = useRef<number>(0);
    const animationFrameRef = useRef<number | null>(null);

    // Responsive: detect mobile viewport
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);

    const radius = isMobile ? 280 : radiusProp;
    const cardW = isMobile ? 220 : 300;
    const cardH = isMobile ? 280 : 380;
    const btnSize = isMobile ? 40 : 56;

    // Mouse wheel rotation
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        setIsInteracting(true);
        setRotation((prev) => prev + e.deltaY * 0.18);
      };

      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    // Drag / Touch gestures for Coverflow rotation
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      startXRef.current = clientX || 0;
      startRotationRef.current = rotation;
      setIsInteracting(true);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const diff = clientX - startXRef.current;
      setRotation(startRotationRef.current - diff * 0.35);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 1200);
    };

    // Auto-rotate when idle
    useEffect(() => {
      const autoRotate = () => {
        if (!isInteracting && !isDraggingRef.current) {
          setRotation((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isInteracting, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    const handleNext = () => {
      setIsInteracting(true);
      setRotation((prev) => prev - anglePerItem);
      setTimeout(() => setIsInteracting(false), 1000);
    };

    const handlePrev = () => {
      setIsInteracting(true);
      setRotation((prev) => prev + anglePerItem);
      setTimeout(() => setIsInteracting(false), 1000);
    };

    return (
      <div
        ref={containerRef}
        role="region"
        aria-label="Coverflow 3D Gallery"
        className={cn("circular-gallery-container", className)}
        style={{ '--gallery-height': isMobile ? '360px' : '500px' } as React.CSSProperties}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        {...props}
      >
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Card"
          className="circular-gallery-nav-btn prev"
          style={{ '--btn-size': `${btnSize}px` } as React.CSSProperties}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Card"
          className="circular-gallery-nav-btn next"
          style={{ '--btn-size': `${btnSize}px` } as React.CSSProperties}
        >
          <ChevronRight size={28} />
        </button>

        {/* 3D Coverflow Container */}
        <div
          className={`circular-gallery-3d-stage ${isDraggingRef.current ? 'is-dragging' : ''}`}
          style={{ '--rot-y': `${rotation}deg` } as React.CSSProperties}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);

            const isCenter = normalizedAngle < 30;
            const tilt = relativeAngle > 180 ? 9 : -9;
            const cardRotateY = isCenter ? 0 : tilt;
            const scale = isCenter ? 1.0 : 0.85;
            const opacity = isCenter ? 1.0 : Math.max(0.2, 0.7 - (normalizedAngle / 200));

            return (
              <div
                key={i}
                role="group"
                aria-label={item.common}
                className="circular-gallery-item-slot"
                style={{
                  '--card-w': `${cardW}px`,
                  '--card-h': `${cardH}px`,
                  '--item-angle': `${itemAngle}deg`,
                  '--radius': `${radius}px`,
                  '--card-rotate-y': `${cardRotateY}deg`,
                  '--scale': `${scale}`,
                  '--opacity': `${opacity}`,
                  '--z-idx': `${isCenter ? 30 : 10}`,
                  '--obj-pos': item.photo.pos || 'center',
                  visibility: opacity < 0.05 ? 'hidden' : 'visible'
                } as React.CSSProperties}
              >
                <div
                  className={`apple-squircle circular-gallery-card-squircle ${isCenter ? 'center' : 'non-center'}`}
                >
                  <img
                    src={item.photo.url}
                    alt={item.photo.text || ''}
                    draggable="false"
                    onError={(e) => {
                      if (item.photo.fallback && e.currentTarget.src !== item.photo.fallback) {
                        e.currentTarget.src = item.photo.fallback;
                      }
                    }}
                    className={`circular-gallery-card-img ${isCenter ? 'center' : 'non-center'}`}
                  />

                  {/* Card Vignette */}
                  <div className="circular-gallery-card-vignette"></div>

                  {/* Card Content Overlay */}
                  <div className="circular-gallery-card-overlay">
                    <span className="circular-gallery-badge">
                      4U Collection
                    </span>

                    <h3 className="circular-gallery-card-title">
                      {item.common}
                    </h3>

                    <div className="circular-gallery-card-sub">
                      {item.binomial}
                    </div>

                    <div className="circular-gallery-card-author">
                      <Compass size={13} color="#c9a050" /> {item.photo.by}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
