import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const CircularGallery = React.forwardRef(
  ({ items, className, radius: radiusProp = 560, autoRotateSpeed = 0.06, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const containerRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startRotationRef = useRef(0);
    const animationFrameRef = useRef(null);

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

    // Mouse wheel rotation (prevents outer page scroll when mouse is inside carousel)
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const handleWheel = (e) => {
        e.preventDefault();
        setIsInteracting(true);
        setRotation((prev) => prev + e.deltaY * 0.18);
      };

      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    // Drag / Touch gestures for Coverflow rotation
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      startRotationRef.current = rotation;
      setIsInteracting(true);
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const diff = currentX - startXRef.current;
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
        className={cn("relative w-full flex items-center justify-center overflow-visible select-none", className)}
        style={{ perspective: '1800px', paddingTop: '0px', paddingBottom: '0px', height: isMobile ? '300px' : '420px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        {...props}
      >
        {/* Fixed Prev Button at Left Edge */}
        <button
          onClick={handlePrev}
          aria-label="Previous Card"
          style={{
            position: 'absolute',
            left: '24px',
            top: '38%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            width: btnSize + 'px',
            height: btnSize + 'px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#1d1d1f',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Fixed Next Button at Right Edge */}
        <button
          onClick={handleNext}
          aria-label="Next Card"
          style={{
            position: 'absolute',
            right: '24px',
            top: '38%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            width: btnSize + 'px',
            height: btnSize + 'px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#1d1d1f',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
        >
          <ChevronRight size={28} />
        </button>

        {/* 3D Coverflow Container */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
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
                style={{
                  position: 'absolute',
                  width: cardW + 'px',
                  height: cardH + 'px',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) rotateY(${cardRotateY}deg) scale(${scale})`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -(cardW / 2) + 'px',
                  marginTop: -(cardH / 2) + 'px',
                  opacity: opacity,
                  visibility: opacity < 0.05 ? 'hidden' : 'visible',
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  backfaceVisibility: 'hidden',
                  cursor: 'grab',
                  zIndex: isCenter ? 30 : 10
                }}
              >
                <div
                  className="apple-squircle"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '28px',
                    boxShadow: isCenter ? '0 30px 70px rgba(0, 0, 0, 0.35)' : '0 12px 30px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                    background: '#ffffff',
                    border: isCenter ? '2px solid rgba(212, 175, 55, 0.7)' : '1px solid rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    draggable="false"
                    onError={(e) => {
                      if (item.photo.fallback && e.currentTarget.src !== item.photo.fallback) {
                        e.currentTarget.src = item.photo.fallback;
                      }
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.photo.pos || 'center',
                      filter: isCenter ? 'none' : 'brightness(0.85)'
                    }}
                  />

                  {/* Card Vignette */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(13,13,18,0.92) 0%, rgba(13,13,18,0.3) 55%, transparent 100%)'
                  }}></div>

                  {/* Card Content Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    color: '#ffffff'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #d4af37 0%, #aa820a 100%)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '8px'
                    }}>
                      4U Collection
                    </span>

                    <h3 style={{ fontSize: '1.45rem', fontWeight: '800', margin: 0, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                      {item.common}
                    </h3>

                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', marginTop: '3px' }}>
                      {item.binomial}
                    </div>

                    <div style={{
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
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
