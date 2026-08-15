import React, { useEffect, useState } from 'react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import HeroSvgSketch from './HeroSvgSketch';
import { Compass, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export interface HeroProps {
  onOpenBooking?: () => void;
  onOpenCustomTour?: () => void;
}

export default function Hero({ onOpenBooking, onOpenCustomTour }: HeroProps = {}) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  // Animation timeline state
  const [showSketch, setShowSketch] = useState<boolean>(true);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShowSketch(false);
      setIsRevealed(true);
      return;
    }

    // 2. Fetch tours data from API
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });

    // 3. Preload high-res destination photograph in memory
    const targetImageSrc = '/images/hero_destination.jpg';
    const preloader = new Image();
    preloader.src = targetImageSrc;

    // 4. Multi-Stage Animation Flow (Fast 2.0s Drawing Sequence)
    // Frame 01 - 07: Hand-drawing sketch (0ms - 1950ms)
    // Frame 08: Soft dissolve into Real Photo (2000ms - 3000ms)
    // Frame 09: Complete Home reveal (3000ms+)
    const dissolveTimer = setTimeout(() => {
      setIsDissolving(true);
    }, 2000);

    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 2050);

    const cleanupTimer = setTimeout(() => {
      setShowSketch(false);
    }, 3200);

    return () => {
      clearTimeout(dissolveTimer);
      clearTimeout(revealTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  const defaultHero = {
    title: 'Hành Trình Tĩnh Dưỡng 4U',
    subtitle: 'Nghỉ dưỡng & Phục hồi Thân · Tâm · Trí giữa thiên nhiên tuyệt tác',
    heroImage: '/images/hero_destination.jpg',
    city: '4U Retreat Sanctuary',
    duration: 'Signature Journey',
  };

  const heroTour = tours[0] || defaultHero;
  const currentHeroImage = '/images/hero_destination.jpg';

  const handleExploreClick = () => {
    const nextSection = document.getElementById('retreat-tours') || document.querySelector('.apple-bento-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <section
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#040d07'
      }}
    >
      {/* ── 1. SVG DRAWING ANIMATION LAYER (Pre-reveal Sketch) ── */}
      {showSketch && <HeroSvgSketch isDissolving={isDissolving} />}

      {/* ── 2. MAIN HERO WRAPPER ── */}
      <div
        className="tile-wrapper theme-dark"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          color: '#f5f5f7',
          paddingBottom: '96px',
          paddingTop: '120px'
        }}
      >
        {/* ── 3. DESTINATION BACKGROUND IMAGE (Cinematic Reveal) ── */}
        <div
          className="tile-image-wrapper"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <img
            src={currentHeroImage}
            alt="4U Travel Destination"
            className={`hero-destination-image ${isRevealed ? 'is-revealed' : ''}`}
          />
        </div>

        {/* ── 4. SOFT ELEGANT SHADOW BEHIND TEXT ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'radial-gradient(ellipse at 25% 82%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 80%)',
            pointerEvents: 'none'
          }}
        />

        {/* ── 5. HERO EDITORIAL CONTENT (Reveals in Frame 9) ── */}
        <div
          className="tile-content content-bottom"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '840px',
            margin: '0 0 40px 64px',
            padding: '0',
            background: 'transparent',
            opacity: isRevealed ? 1 : 0,
            visibility: isRevealed ? 'visible' : 'hidden',
            pointerEvents: isRevealed ? 'auto' : 'none',
            transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, visibility 1.0s'
          }}
        >
          {/* Micro-Tag */}
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(74, 222, 128, 0.18)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              backdropFilter: 'blur(10px)',
              color: '#4ade80',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '6px 18px',
              borderRadius: '999px',
              marginBottom: '18px',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Sa Pa • 3 Ngày 2 Đêm
          </span>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(48px, 6.4vw, 84px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 20px 0',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Trở Về Với{' '}
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 800,
                color: '#facc15',
                background: 'linear-gradient(135deg, #fff7ed 0%, #facc15 50%, #eab308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Chính Mình
            </span>
          </h1>

          {/* Subhead Paragraph */}
          <p
            style={{
              fontSize: 'clamp(18px, 2.1vw, 23px)',
              fontWeight: 500,
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.96)',
              maxWidth: '760px',
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            “Hương Sắc Mây Ngàn & Tĩnh Tâm Sa Pa” — Nghỉ dưỡng biệt lập trên đỉnh đồi nhìn ra thung lũng Mường Hoa và dãy Hoàng Liên Sơn.. Phục hồi Thân · Tâm · Trí giữa đại ngàn nguyên sơ — nơi bạn buông bỏ âu lo và lắng nghe câu trả lời từ chính tâm hồn mình.
          </p>
        </div>
      </div>
    </section>
  );
}
