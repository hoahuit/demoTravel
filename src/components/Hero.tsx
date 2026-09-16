import React, { useEffect, useState } from 'react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import SmartImage from './ui/SmartImage';

export interface HeroProps {
  onOpenBooking?: () => void;
  onOpenCustomTour?: () => void;
}

export default function Hero({ onOpenBooking, onOpenCustomTour }: HeroProps = {}) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setTours([...data]);
      }
    });

    const handleUpdate = (e: any) => {
      if (Array.isArray(e.detail)) {
        setTours([...e.detail]);
      }
    };
    window.addEventListener('tours-data-updated', handleUpdate);
    return () => window.removeEventListener('tours-data-updated', handleUpdate);
  }, []);

  const khoangDungTour = tours.find(
    (t) => String(t.id) === '13' || t.slug?.includes('khoang-dung')
  ) || tours[0];

  const heroImageSrc = khoangDungTour?.heroImage
    ? getImageUrl(khoangDungTour.heroImage)
    : '/images/hero_khoangdung.jpg';

  const destinationTag = khoangDungTour?.city && khoangDungTour?.duration
    ? `${khoangDungTour.city} • ${khoangDungTour.duration}`
    : 'Châu Đốc • 3 Ngày 2 Đêm';

  const subtitleText = khoangDungTour?.subtitle || 'Tạm gác những Xô bồ thường nhật để sống chậm lại giữa Châu Đốc, An Giang an yên';

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
          paddingBottom: '96px',
          paddingTop: '120px'
        }}
      >
        {/* ── DESTINATION BACKGROUND IMAGE WITH SKELETON SHIMMER ── */}
        <div
          className="tile-image-wrapper"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          <SmartImage
            src={heroImageSrc}
            alt="Khoảng Dừng - 4U Retreat"
            aspectRatio="full"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            fallbackSrc="/images/hero_khoangdung.jpg"
            imgClassName="hero-destination-image is-revealed"
            className="w-full h-full"
          />
        </div>

        {/* ── SOFT ELEGANT SHADOW BEHIND TEXT ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'radial-gradient(ellipse at 25% 82%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 80%)',
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
            margin: '0 0 40px 64px',
            padding: '0',
            background: 'transparent',
            opacity: 1,
            visibility: 'visible'
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
            {destinationTag}
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
            “Khoảng Dừng” — {subtitleText}. Đắm mình giữa thiên nhiên nguyên sơ, lướt nhẹ qua những dòng nước tĩnh lặng và tái tạo trọn vẹn năng lượng cho Thân · Tâm · Trí.
          </p>
        </div>
      </div>
    </section>
  );
}
