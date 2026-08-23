import React, { useEffect, useState } from 'react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi } from '../services/apiService';

export interface HeroProps {
  onOpenBooking?: () => void;
  onOpenCustomTour?: () => void;
}

export default function Hero({ onOpenBooking, onOpenCustomTour }: HeroProps = {}) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const currentHeroImage = '/images/hero_destination.jpg';

  return (
    <section
      id="hero"
      className="hero-section hero-full-bleed"
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#040d07'
      }}
    >
      {/* ── MAIN HERO WRAPPER ── */}
      <div
        className="tile-wrapper theme-dark"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          color: '#f5f5f7',
          paddingBottom: 'clamp(48px, 8vw, 96px)',
          paddingTop: 'clamp(90px, 14vw, 130px)',
          boxSizing: 'border-box'
        }}
      >
        {/* ── DESTINATION BACKGROUND IMAGE ── */}
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
            className="hero-destination-image is-revealed"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* ── SOFT ELEGANT SHADOW BEHIND TEXT ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'radial-gradient(ellipse at 25% 82%, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 85%)',
            pointerEvents: 'none'
          }}
        />

        {/* ── HERO EDITORIAL CONTENT ── */}
        <div
          className="tile-content content-bottom"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '840px',
            margin: '0 clamp(16px, 4.5vw, 64px) clamp(20px, 4vw, 40px)',
            padding: '0',
            background: 'transparent',
            opacity: 1,
            visibility: 'visible',
            boxSizing: 'border-box'
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
              fontSize: 'clamp(11px, 1.5vw, 12.5px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '5px 16px',
              borderRadius: '999px',
              marginBottom: '14px',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Sa Pa • 3 Ngày 2 Đêm
          </span>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(32px, 7vw, 84px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 16px 0',
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
              fontSize: 'clamp(14.5px, 2vw, 22px)',
              fontWeight: 500,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.94)',
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
