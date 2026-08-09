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

  // Filter promotion tours with discounts (strictly requiring discount or promotion flag and NOT exclusive)
  const promoTours = tours.filter((tour) =>
    (((tour.originalPrice && tour.originalPrice > (tour.price || 0)) || tour.discountPercentage || tour.isPromotion) && !tour.isExclusive)
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
          gap: 52px 38px;
          width: 100%;
        }
        .udgc-card {
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(16, 32, 27, 0.08);
          box-shadow: 0 16px 40px -12px rgba(16, 32, 27, 0.06);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .udgc-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px -16px rgba(16, 32, 27, 0.15);
          border-color: rgba(30, 74, 61, 0.25);
        }
        .udgc-image-wrap {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
        }
        .udgc-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .udgc-card:hover .udgc-image-wrap img {
          transform: scale(1.06);
        }
        .udgc-discount-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 800;
          font-size: 13px;
          padding: 6px 14px;
          border-radius: 99px;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);
          z-index: 2;
        }
        .udgc-body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .udgc-location-tag {
          font-size: 12px;
          font-weight: 700;
          color: #2d5a36;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 10px;
        }
        .udgc-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #10201B;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }
        .udgc-desc {
          font-size: 14px;
          color: #525a54;
          margin: 0 0 20px 0;
          line-height: 1.6;
        }
        .udgc-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(16, 32, 27, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .udgc-orig-price {
          font-size: 13px;
          color: #94a3b8;
          text-decoration: line-through;
          margin-right: 8px;
        }
        .udgc-sale-price {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #10201B;
        }
        .udgc-cta-btn {
          background: #10201B;
          color: #ffffff;
          border: none;
          padding: 10px 22px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .udgc-cta-btn:hover {
          background: #059669;
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px' }} className="bento-full-container">

        {/* SECTION HEADER */}
        <ScrollReveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
              marginBottom: '48px',
              paddingBottom: '28px',
              borderBottom: '1px solid rgba(16, 32, 27, 0.1)'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#dc2626',
                  marginBottom: '12px',
                  background: 'rgba(220, 38, 38, 0.08)',
                  padding: '5px 14px',
                  borderRadius: '99px'
                }}
              >
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
                      <img src={getImageUrl(tour.heroImage)} alt={tour.title} />
                    </div>

                    <div className="udgc-body">
                      <div className="udgc-location-tag">
                        {tour.city} • {tour.duration}
                      </div>

                      <h3 className="udgc-title">{tour.title}</h3>

                      <p className="udgc-desc">{tour.subtitle}</p>

                      <div className="udgc-footer">
                        <div>
                          <span className="udgc-orig-price">{(origPrice || 0).toLocaleString('vi-VN')} ₫</span>
                          <span className="udgc-sale-price">{(tour.price || 0).toLocaleString('vi-VN')} ₫</span>
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
