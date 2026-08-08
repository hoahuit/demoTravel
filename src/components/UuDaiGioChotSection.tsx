import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { ChevronDown } from 'lucide-react';


export interface UuDaiGioChotSectionProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function UuDaiGioChotSection({ onOpenBooking, onNavigate }: UuDaiGioChotSectionProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 4,
    minutes: 59,
    seconds: 50
  });

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter promotion tours with discounts
  const promoTours = tours.filter((tour) => tour.discountPercentage || tour.isPromotion || tours.length <= 4);
  const visiblePromoTours = showAll ? promoTours : promoTours.slice(0, 4);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <section
      id="uu-dai-gio-chot"
      style={{
        background: '#e5efe8',
        padding: '110px 0 130px',
        color: '#10201B',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(16, 32, 27, 0.08)'
      }}
    >
      <style>{`
        .udgc-live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(225, 29, 72, 0.06);
          border: 1px solid rgba(225, 29, 72, 0.18);
          color: #e11d48;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 99px;
          margin-bottom: 14px;
        }

        /* Clean Countdown Timer Box */
        .udgc-countdown-box {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: #d0e0d4;
          border: 1px solid rgba(45, 90, 54, 0.22);
          padding: 10px 24px;
          border-radius: 99px;
        }
        .udgc-timer-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #527059;
        }
        .udgc-timer-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .udgc-timer-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 28px;
        }
        .udgc-timer-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #1e4a3d;
          line-height: 1;
        }
        .udgc-timer-lbl {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #527059;
          margin-top: 3px;
          font-weight: 700;
        }
        .udgc-timer-colon {
          font-size: 18px;
          font-weight: 700;
          color: #e11d48;
          margin-top: -6px;
        }

        /* Card Container - Equal Height */
        .udgc-card {
          background: #dce7df;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(45, 90, 54, 0.18);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          position: relative;
          box-sizing: border-box;
        }
        .udgc-card:hover {
          transform: translateY(-8px);
          background: #d2e2d6;
          border-color: rgba(45, 90, 54, 0.35);
          box-shadow: 0 24px 50px -12px rgba(20, 38, 25, 0.16);
        }
        .udgc-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.8;
          overflow: hidden;
        }
        .udgc-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .udgc-card:hover .udgc-image-wrap img {
          transform: scale(1.08);
        }
        .udgc-discount-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #e11d48;
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 99px;
          box-shadow: 0 4px 14px rgba(225, 29, 72, 0.25);
          z-index: 2;
        }
        .udgc-slots-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(16, 32, 27, 0.88);
          backdrop-filter: blur(10px);
          color: #facc15;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 99px;
          border: 1px solid rgba(250, 204, 21, 0.25);
          z-index: 2;
        }

        .udgc-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .udgc-location-tag {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #2d5a36;
          margin-bottom: 8px;
        }
        .udgc-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 25px;
          font-weight: 600;
          color: #10201B;
          line-height: 1.25;
          margin: 0 0 12px 0;
          min-height: 64px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .udgc-card:hover .udgc-title {
          color: #1e4a3d;
        }
        .udgc-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(16, 32, 27, 0.75);
          margin-bottom: 20px;
          min-height: 46px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Clean Borderless Progress Box */
        .udgc-progress-wrap {
          margin-top: auto;
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .udgc-progress-track {
          width: 100%;
          height: 8px;
          background: rgba(30, 74, 61, 0.12);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }
        .udgc-progress-bar {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #e11d48 0%, #f97316 100%);
          box-shadow: 0 2px 8px rgba(225, 29, 72, 0.35);
        }
        .udgc-progress-text {
          font-size: 12px;
          color: #1e4a3d;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
        }
        .udgc-slots-left {
          background: rgba(225, 29, 72, 0.12);
          color: #e11d48;
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .udgc-footer {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid rgba(16, 32, 27, 0.08);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .udgc-price-block {
          display: flex;
          flex-direction: column;
        }
        .udgc-orig-price {
          font-size: 13px;
          text-decoration: line-through;
          color: rgba(16, 32, 27, 0.45);
          font-weight: 600;
        }
        .udgc-sale-price {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 25px;
          font-weight: 700;
          color: #1e4a3d;
          line-height: 1.1;
        }
        .udgc-save-chip {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 700;
          background: rgba(225, 29, 72, 0.08);
          color: #e11d48;
          padding: 3px 9px;
          border-radius: 6px;
          margin-top: 4px;
          width: fit-content;
        }
        .udgc-cta-btn {
          background: #1e4a3d;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 99px;
          font-weight: 700;
          font-size: 12.5px;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 18px rgba(30, 74, 61, 0.18);
        }
        .udgc-card:hover .udgc-cta-btn {
          background: #2d5a36;
          box-shadow: 0 10px 24px rgba(45, 90, 54, 0.3);
          transform: translateY(-2px);
        }

        .xem-them-udgc-btn {
          padding: 14px 36px;
          border-radius: 99px;
          border: 1.5px solid #1e4a3d;
          background: transparent;
          color: #1e4a3d;
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .xem-them-udgc-btn:hover {
          background: #1e4a3d;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(30, 74, 61, 0.2);
        }

        @media (max-width: 860px) {
          .udgc-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .udgc-header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px' }} className="bento-full-container">

        {/* SECTION HEADER WITH CLEAN LIVE COUNTDOWN */}
        <ScrollReveal>
          <div
            className="udgc-header-flex"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
              marginBottom: '52px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(16, 32, 27, 0.12)'
            }}
          >
            <div>
              <div className="udgc-live-indicator">
                <span>FLASH SALE GIỜ CHÓT</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.12,
                  color: '#10201B',
                  margin: 0
                }}
              >
                Ưu Đãi Giờ Chót
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* 2-COLUMN FLASH SALE GRID (EQUAL HEIGHT CARDS) */}
        <div
          className="udgc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '52px 38px',
            width: '100%'
          }}
        >
          {visiblePromoTours.map((tour, idx) => {
            const disc = tour.discountPercentage || 18;
            const origPrice = tour.originalPrice || Math.round(tour.price * 1.22);
            const savings = origPrice - tour.price;

            return (
              <ScrollReveal key={tour.id} delay={idx * 120} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="udgc-card"
                  onClick={() => {
                    if (onNavigate) onNavigate(`/sanpham/${tour.slug}`);
                    else if (onOpenBooking) onOpenBooking(tour);
                  }}
                >
                  {/* PHOTO FRAME WITH CLEAN BADGES */}
                  <div className="udgc-image-wrap">
                    <div className="udgc-discount-badge">
                      GIẢM {disc}%
                    </div>
                    <div className="udgc-slots-badge">
                      Chỉ còn 2 suất
                    </div>
                    <img src={getImageUrl(tour.heroImage)} alt={tour.title} />

                  </div>

                  {/* BODY CONTENT */}
                  <div className="udgc-body">
                    <div className="udgc-location-tag">
                      {tour.city} • {tour.duration}
                    </div>

                    <h3 className="udgc-title">{tour.title}</h3>

                    <p className="udgc-desc">{tour.subtitle}</p>

                    {/* PROGRESS BAR */}
                    <div className="udgc-progress-wrap">
                      <div className="udgc-progress-track">
                        <div className="udgc-progress-bar" style={{ width: `${80 + (idx % 3) * 6}%` }} />
                      </div>
                      <div className="udgc-progress-text">
                        <span>Đã đăng ký {80 + (idx % 3) * 6}% số chỗ</span>
                        <span className="udgc-slots-left">🔥 Còn 2 chỗ</span>
                      </div>
                    </div>

                    {/* FOOTER: PRICE & BUTTON (EQUAL HEIGHT ALIGNED) */}
                    <div className="udgc-footer">
                      <div className="udgc-price-block">
                        <span className="udgc-orig-price">{origPrice.toLocaleString('vi-VN')} ₫</span>
                        <span className="udgc-sale-price">{tour.price.toLocaleString('vi-VN')} ₫</span>
                        <span className="udgc-save-chip">Tiết kiệm {savings.toLocaleString('vi-VN')} ₫</span>
                      </div>

                      <button
                        className="udgc-cta-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenBooking) onOpenBooking(tour);
                          else if (onNavigate) onNavigate(`/sanpham/${tour.slug}`);
                        }}
                      >
                        <span>Đặt Ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* XEM THÊM BUTTON */}
        {promoTours.length > 4 && (
          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                className="xem-them-udgc-btn"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu gọn sản phẩm ưu đãi' : 'Xem thêm sản phẩm ưu đãi giờ chót'}</span>
                <ChevronDown size={18} style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
