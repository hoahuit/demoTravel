import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { Star, ArrowRight, ChevronDown, Clock, Flame } from 'lucide-react';
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

  // Filter tours for Ưu Đãi Giờ Chót (isPromotion = true, discount, or category 'uu-dai-gio-chot' / 'last-minute')
  const promoTours = tours.filter((tour) =>
    tour.isPromotion === true ||
    (Array.isArray(tour.categories) && (tour.categories.includes('uu-dai-gio-chot') || tour.categories.includes('last-minute'))) ||
    ((tour.originalPrice || 0) > (tour.price || 0))
  );

  const visiblePromoTours = showAll ? promoTours : promoTours.slice(0, 4);
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <section
      id="uu-dai-gio-chot"
      style={{
        background: '#e5efe8',
        padding: '120px 0 130px',
        color: '#10201B',
        fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid rgba(16, 32, 27, 0.08)'
      }}
    >
      <style>{`
        .udgc-editorial-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          background: transparent;
        }
        .udgc-editorial-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #d8e5dc;
        }
        .udgc-editorial-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .udgc-editorial-card:hover .udgc-editorial-img-wrap img {
          transform: scale(1.05);
        }
        .udgc-editorial-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Work Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #10201B;
          text-decoration: none;
          border-bottom: 1.5px solid #10201B;
          padding-bottom: 4px;
          transition: all 0.25s ease;
          margin-top: auto;
        }
        .udgc-editorial-card:hover .udgc-editorial-link {
          color: #006d36;
          border-bottom-color: #006d36;
        }
        .udgc-editorial-btn-more {
          padding: 14px 38px;
          border: 1.5px solid #10201B;
          background: transparent;
          color: #10201B;
          font-family: 'Work Sans', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .udgc-editorial-btn-more:hover {
          background: #10201B;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(16, 32, 27, 0.18);
        }
        @media (max-width: 900px) {
          .udgc-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .udgc-full-container {
            padding: 0 20px !important;
          }
        }
      `}</style>

      {/* ── 100% FULL WIDTH CONTAINER ── */}
      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px', boxSizing: 'border-box' }} className="udgc-full-container">

        {/* ── 1. SECTION HEADER WITH DESTINATION COUNTDOWN TIMER ── */}
        <ScrollReveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '28px',
              marginBottom: '64px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(16, 32, 27, 0.12)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#527059',
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                Limited Sanctuary Offers
              </span>
              <h2
                style={{
                  fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.15,
                  color: '#10201B',
                  margin: 0
                }}
              >
                Ưu Đãi Giờ Chót
              </h2>
            </div>

            {/* MINIMALIST LUXURY COUNTDOWN TIMER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10201B' }}>
                <Clock size={16} color="#10201B" />
                <span
                  style={{
                    fontFamily: "'Work Sans', sans-serif",
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#10201B'
                  }}
                >
                  Ưu đãi kết thúc sau:
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    backgroundColor: '#d8e5dc',
                    border: '1px solid rgba(16, 32, 27, 0.15)',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontFamily: "'Libre Caslon Text', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#10201B'
                  }}
                >
                  {formatNumber(timeLeft.hours)}h
                </div>
                <span style={{ fontWeight: 700, color: '#10201B' }}>:</span>
                <div
                  style={{
                    backgroundColor: '#d8e5dc',
                    border: '1px solid rgba(16, 32, 27, 0.15)',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontFamily: "'Libre Caslon Text', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#10201B'
                  }}
                >
                  {formatNumber(timeLeft.minutes)}m
                </div>
                <span style={{ fontWeight: 700, color: '#10201B' }}>:</span>
                <div
                  style={{
                    backgroundColor: '#10201B',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontFamily: "'Libre Caslon Text', Georgia, serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}
                >
                  {formatNumber(timeLeft.seconds)}s
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL 2-COLUMN GRID (AS DESTINATION STYLE) ── */}
        {promoTours.length === 0 ? (
          <EmptyState
            title="Chưa có tour ưu đãi giờ chót"
            description="Hiện tại chưa có tour nào có khuyến mãi giờ chót. Hãy quay lại sau để săn ưu đãi hấp dẫn!"
            transparent={true}
          />
        ) : (
          <div
            className="udgc-editorial-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 44px'
            }}
          >
            {visiblePromoTours.map((tour, index) => {
              const heroImg = getImageUrl(tour.heroImage);
              const priceVal = tour.price || 0;
              const origVal = tour.originalPrice || 0;
              const hasDiscount = origVal > priceVal;
              const discountPercent = hasDiscount ? Math.round(((origVal - priceVal) / origVal) * 100) : 0;

              return (
                <ScrollReveal key={tour.id || tour.slug || index} delay={index * 100}>
                  <div
                    className="udgc-editorial-card"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/tour/${tour.slug}`);
                      } else if (onOpenBooking) {
                        onOpenBooking(tour);
                      }
                    }}
                  >
                    {/* Photo Frame */}
                    <div className="udgc-editorial-img-wrap">
                      <img src={heroImg} alt={tour.title} loading="lazy" />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {hasDiscount && (
                          <div
                            style={{
                              background: '#ba1a1a',
                              color: '#ffffff',
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              padding: '6px 14px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              textTransform: 'uppercase'
                            }}
                          >
                            <Flame size={13} />
                            <span>Giảm {discountPercent}%</span>
                          </div>
                        )}

                        <div
                          style={{
                            background: 'rgba(16, 32, 27, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            padding: '6px 14px',
                            borderRadius: '4px'
                          }}
                        >
                          Giờ Chót
                        </div>
                      </div>

                      {/* Top Right Category Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
                          backdropFilter: 'blur(10px)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          padding: '6px 14px',
                          textTransform: 'uppercase',
                          borderRadius: '6px',
                          border: '1px solid rgba(254, 202, 202, 0.45)',
                          boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        Ưu Đãi Giờ Chót
                      </div>
                    </div>

                    {/* Meta Label */}
                    <div style={{ marginTop: '24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#527059'
                        }}
                      >
                        {tour.city || 'Việt Nam'} • {tour.duration || 'Nghỉ Dưỡng'}
                      </span>
                    </div>

                    {/* Title Serif */}
                    <h3
                      style={{
                        fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(22px, 2.2vw, 28px)',
                        fontWeight: 400,
                        lineHeight: 1.25,
                        color: '#10201B',
                        margin: '0 0 12px 0'
                      }}
                    >
                      {tour.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '14.5px',
                        color: '#405246',
                        lineHeight: 1.65,
                        margin: '0 0 24px 0',
                        fontWeight: 400,
                        minHeight: '46px'
                      }}
                    >
                      {tour.subtitle || 'Cơ hội trải nghiệm kỳ nghỉ dưỡng thượng lưu với mức giá đặc quyền giới hạn trong ngày.'}
                    </p>

                    {/* Bottom: Price & Underline Action */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '16px',
                        marginTop: 'auto',
                        paddingTop: '18px',
                        borderTop: '1px solid rgba(16, 32, 27, 0.1)'
                      }}
                    >
                      <div>
                        {hasDiscount && (
                          <span
                            style={{
                              display: 'block',
                              fontSize: '12px',
                              textDecoration: 'line-through',
                              color: 'rgba(16, 32, 27, 0.45)',
                              marginBottom: '2px'
                            }}
                          >
                            {origVal.toLocaleString('vi-VN')} ₫
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: "'Libre Caslon Text', Georgia, serif",
                            fontSize: '22px',
                            fontWeight: 700,
                            color: hasDiscount ? '#ba1a1a' : '#10201B'
                          }}
                        >
                          {priceVal ? `${priceVal.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            fontSize: '10px',
                            color: 'rgba(16, 32, 27, 0.55)',
                            marginTop: '2px'
                          }}
                        >
                          Giá chưa bao gồm Thuế
                        </span>
                      </div>

                      <span className="udgc-editorial-link">
                        <span>Nhận ưu đãi ngay</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ── 3. VIEW ALL / COLLAPSE BUTTON ── */}
        {promoTours.length > 4 && (
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <button
                className="udgc-editorial-btn-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu Gọn Lịch Trình' : `Xem Thêm Tất Cả (${promoTours.length})`}</span>
                <ChevronDown
                  size={15}
                  style={{
                    transform: showAll ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
