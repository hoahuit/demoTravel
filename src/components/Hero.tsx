import React from 'react';
import { TOURS_DATA } from '../data/toursData';

export interface HeroProps {
  onOpenBooking?: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps = {}) {
  // Use the primary featured retreat package directly from TOURS_DATA
  const heroTour = TOURS_DATA.find(t => t.slug === 'tinh-lang-giua-dai-ngan') || TOURS_DATA[0];

  return (
    <section style={{ padding: 0, margin: 0, width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* ── APPLE TV+ HERO TILE WRAPPER (theme-dark) ── */}
      <div
        className="tile-wrapper theme-dark animate-fade-in"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          background: '#000000',
          color: '#f5f5f7',
          paddingBottom: '88px'
        }}
      >
        {/* ── 1. BACKGROUND MEDIA IMAGE ── */}
        <div className="tile-image-wrapper" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <img
            src={heroTour.heroImage}
            alt={heroTour.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              filter: 'none'
            }}
          />
        </div>

        {/* ── 2. SOFT ELEGANT SHADOW GRADIENT BEHIND TEXT ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'radial-gradient(ellipse at 25% 82%, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0.22) 50%, transparent 80%)',
            pointerEvents: 'none'
          }}
        />

        {/* ── 3. HERO EDITORIAL LUXURY TYPOGRAPHY ── */}
        <div
          className="tile-content content-bottom"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '840px',
            margin: '0 0 40px 64px',
            padding: '0',
            background: 'transparent'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(74, 222, 128, 0.18)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              backdropFilter: 'blur(10px)',
              color: '#4ade80',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              padding: '6px 18px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              marginBottom: '18px',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            {heroTour.city}, {heroTour.country} • {heroTour.duration}
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
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #ffffff 0%, #4ade80 50%, #22c55e 100%)',
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
            “{heroTour.title}” — {heroTour.subtitle}. Phục hồi Thân · Tâm · Trí giữa đại ngàn nguyên sơ — nơi bạn buông bỏ âu lo và lắng nghe câu trả lời từ chính tâm hồn mình.
          </p>
        </div>
      </div>
    </section>
  );
}
