import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { ChevronDown } from 'lucide-react';
import EmptyState from './ui/EmptyState';

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

  // Only tours assigned to the "Ưu Đãi Giờ Chót" category appear here.
  const promoTours = tours.filter((tour) =>
    Array.isArray(tour.categories) && tour.categories.includes('uu-dai-gio-chot')
  );
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
        borderTop: '1px solid rgba(16, 32, 27, 0.06)'
      }}
    >
      <style>{`
        .udgc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px 32px;
          width: 100%;
        }
        @media (max-width: 860px) {
          .udgc-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .udgc-card {
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          position: relative;
        }
        .udgc-card:hover {
          transform: translateY(-6px);
          background: #d2e2d6;
          box-shadow: 0 24px 48px -12px rgba(20, 38, 25, 0.16);
          border-color: rgba(45, 90, 54, 0.35);
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
          transform: scale(1.06);
        }
        .udgc-discount-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #ff1f3d;
          color: #ffffff;
          font-weight: 800;
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 99px;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(255, 31, 61, 0.35);
          z-index: 2;
        }
        .udgc-seats-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(16, 32, 27, 0.88);
          backdrop-filter: blur(10px);
          color: #facc15;
          font-weight: 800;
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 99px;
          z-index: 2;
        }
        .udgc-body {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .udgc-location-tag {
          font-size: 11.5px;
          font-weight: 700;
          color: #2d5a36;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .udgc-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-style: italic;
          font-weight: 700;
          color: #10201B;
          margin: 0 0 8px 0;
          line-height: 1.25;
        }
        .udgc-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #475569;
          margin: 0 0 16px 0;
        }
        .udgc-progress-wrapper {
          margin-bottom: 20px;
        }
        .udgc-progress-bar {
          width: 100%;
          height: 6px;
          background: #cbd5e1;
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 6px;
        }
        .udgc-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff4500, #ff1f3d);
          border-radius: 99px;
        }
        .udgc-progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          font-weight: 700;
          color: #475569;
        }
        .udgc-seats-left-tag {
          background: #fecdd3;
          color: #e11d48;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 99px;
        }
        .udgc-footer {
          margin-top: auto;
          padding-top: 16px;
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
          font-size: 12px;
          color: #64748b;
          text-decoration: line-through;
          margin-bottom: 2px;
        }
        .udgc-sale-price {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 26px;
          font-weight: 800;
          color: #10201B;
          line-height: 1;
        }
        .udgc-savings-badge {
          display: inline-block;
          margin-top: 4px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 99px;
          width: fit-content;
        }
        .udgc-cta-btn {
          background: #1e4a3d;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(30, 74, 61, 0.2);
        }
        .udgc-cta-btn:hover {
          background: #2d5a36;
          box-shadow: 0 6px 18px rgba(45, 90, 54, 0.35);
        }
        .udgc-header-flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 48px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(16, 32, 27, 0.1);
        }
        .udgc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #dc2626;
          background: rgba(220, 38, 38, 0.08);
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 12px;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }
        .udgc-action-footer {
          text-align: center;
          margin-top: 60px;
        }
      `}</style>

      <div className="bento-full-container">

        {/* SECTION HEADER */}
        <ScrollReveal>
          <div className="udgc-header-flex">
            <div>
              <div className="udgc-badge">
                <span>⚡ FLASH SALE GIỜ CHÓT</span>
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

        {/* 2-COLUMN FLASH SALE GRID */}
        {promoTours.length === 0 ? (
          <EmptyState
            title="Chưa có ưu đãi giờ chót"
            description="Hiện tại tất cả các gói tour đang áp dụng mức giá tiêu chuẩn. Hãy quay lại sau để cập nhật flash sale mới nhất!"
            transparent={true}
          />
        ) : (
          <div className="udgc-grid">
            {visiblePromoTours.map((tour, idx) => {
              const disc = tour.discountPercentage || 18;
              const origPrice = tour.originalPrice || Math.round((tour.price || 0) * 1.22);
              const savings = origPrice - (tour.price || 0);

              return (
                <ScrollReveal key={tour.id} delay={idx * 120} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div
                    className="udgc-card"
                    onClick={() => {
                      if (onNavigate) onNavigate(`/sanpham/${tour.slug}`);
                      else if (onOpenBooking) onOpenBooking(tour);
                    }}
                  >
                    <div className="udgc-image-wrap">
                      <div className="udgc-discount-badge">
                        GIẢM {disc}%
                      </div>
                      <div className="udgc-seats-badge">
                        Chỉ còn 2 suất
                      </div>
                      <img src={getImageUrl(tour.heroImage)} alt={tour.title} />
                    </div>

                    <div className="udgc-body">
                      <div className="udgc-location-tag">
                        {tour.city} • {tour.duration}
                      </div>

                      <h3 className="udgc-title">“{tour.title}”</h3>

                      <p className="udgc-desc">{tour.subtitle}</p>

                      {/* Progress Bar & Seat Status */}
                      <div className="udgc-progress-wrapper">
                        <div className="udgc-progress-bar">
                          <div className="udgc-progress-fill" style={{ width: '80%' }}></div>
                        </div>
                        <div className="udgc-progress-info">
                          <span>Đã đăng ký 80% số chỗ</span>
                          <span className="udgc-seats-left-tag">🔥 Còn 2 chỗ</span>
                        </div>
                      </div>

                      <div className="udgc-footer">
                        <div className="udgc-price-block">
                          <span className="udgc-orig-price">{(origPrice || 0).toLocaleString('vi-VN')} ₫</span>
                          <span className="udgc-sale-price">{(tour.price || 0).toLocaleString('vi-VN')} ₫</span>
                          {savings > 0 && (
                            <span className="udgc-savings-badge">
                              Tiết kiệm {savings.toLocaleString('vi-VN')} đ
                            </span>
                          )}
                        </div>

                        <button
                          className="udgc-cta-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenBooking) onOpenBooking(tour);
                            else if (onNavigate) onNavigate(`/sanpham/${tour.slug}`);
                          }}
                        >
                          Đặt Ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

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
