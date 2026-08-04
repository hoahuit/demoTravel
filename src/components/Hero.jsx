import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/hero_phuquoc.png',
    location: 'ĐẢO PHÚ QUỐC',
    tagline: 'Biệt thự nhiệt đới riêng tư & Hoàng hôn ngắm biển'
  },
  {
    id: 2,
    image: '/images/hero_halong.png',
    location: 'VỊNH HẠ LONG',
    tagline: 'Làn nước xanh ngọc bích & Du thuyền nghỉ dưỡng xa xỉ'
  },
  {
    id: 3,
    image: '/images/hero_banahill.png',
    location: 'ĐÀ NẴNG & BÀ NÀ HILLS',
    tagline: 'Cầu Vàng biểu tượng & Dịch vụ đưa đón nghỉ dưỡng VIP'
  },
  {
    id: 4,
    image: '/images/dest_nhatrang.png',
    location: 'VỊNH NHA TRANG',
    tagline: 'Khu nghỉ dưỡng mặt biển nguyên sơ & Thư thái'
  },
  {
    id: 5,
    image: '/images/dest_dalat.png',
    location: 'CAO NGUYÊN ĐÀ LẠT',
    tagline: 'Biệt thự giữa rừng thông & Không khí mát lành'
  }
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500); // 3.5s slideshow cycle (3s display + 0.5s fade overlap)

    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIdx];

  return (
    <section style={{ padding: 0, margin: 0, width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Main Hero Edge-to-Edge Full Screen Banner */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          background: '#0d0d12',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
          paddingTop: '80px'
        }}
      >
        {/* ── 1. KEN BURNS CROSSFADE SLIDESHOW LAYER ── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeIdx;
            const isZoomIn = index % 2 === 0; // Alternating direction: even = zoom in (scale 1 -> 1.08), odd = zoom out (scale 1.08 -> 1)

            return (
              <div
                key={slide.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)', // ~1s crossfade duration
                  pointerEvents: 'none',
                  willChange: 'opacity'
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.location}
                  key={`${slide.id}-${isActive ? 'active' : 'inactive'}`}
                  className={isActive ? (isZoomIn ? 'kenburns-zoom-in' : 'kenburns-zoom-out') : ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'brightness(0.75) contrast(1.05)'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── 2. STATIC DARK GRADIENT OVERLAY (Always readable, fixed) ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(90deg, rgba(13,13,18,0.95) 0%, rgba(13,13,18,0.72) 48%, rgba(13,13,18,0.35) 100%)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(13,13,18,0.45) 0%, transparent 40%, rgba(13,13,18,0.85) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* ── 3. HERO CONTENT ── */}
        <div
          className="hero-content-container"
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '660px',
            padding: '60px 48px'
          }}
        >
          {/* Editorial Destination Eyebrow */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              {/* Mint Accent Line */}
              <span style={{ width: '28px', height: '1.5px', background: '#12ad6dff', display: 'inline-block' }} />
              
              {/* Serial & Destination Name */}
              <span style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#34d399'
              }}>
                ĐIỂM ĐẾN 0{activeIdx + 1} — {currentSlide.location}
              </span>
            </div>

            {/* Editorial Tagline */}
            <p style={{
              fontSize: '0.9rem',
              letterSpacing: '0.03em',
              color: 'rgba(255, 255, 255, 0.72)',
              fontWeight: '400',
              margin: 0,
              paddingLeft: '40px'
            }}>
              {currentSlide.tagline}
            </p>
          </div>

          <h1 className="apple-hero-title" style={{ color: '#ffffff', marginBottom: '16px' }}>
            Xe đưa đón riêng. <br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #12ad6dff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Nghỉ dưỡng ấm cúng.
            </span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: '400',
            marginBottom: '28px',
            lineHeight: '1.6'
          }}>
            Đón tiễn chu đáo cho gia đình Chuyên gia & Du khách quốc tế. Hành trình thiết kế riêng với xe VIP & hỗ trợ 24/7.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              className="apple-btn-primary"
              style={{
                background: 'linear-gradient(135deg, #12ad6dff 0%, #12ad6dff 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(18,173,109,0.3)',
                padding: '14px 28px',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Đặt Combo Ngay <ArrowRight size={18} />
            </button>

            <button
              className="apple-btn-secondary"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                padding: '14px 28px',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Khám Phá Điểm Đến
            </button>
          </div>

          {/* Key Trust Signals */}
          <div style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <ShieldCheck size={16} color="#d4af37" />
              <span>Giấy phép lữ hành quốc tế: <strong>79-367 / 2012</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <Star size={16} color="#d4af37" />
              <span>Đánh giá 4.9/5 (500+ Khách Quốc Tế)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
