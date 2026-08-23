import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { Star, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import EmptyState from './ui/EmptyState';

export interface KhongTheBoLoSectionProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function KhongTheBoLoSection({ onOpenBooking, onNavigate }: KhongTheBoLoSectionProps) {
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

  // Tours assigned to "Không Thể Bỏ Lỡ" (isHot = true or category 'khong-the-bo-lo' / 'hot')
  const unmissableTours = tours.filter((tour) =>
    tour.isHot === true ||
    (Array.isArray(tour.categories) && (tour.categories.includes('khong-the-bo-lo') || tour.categories.includes('hot')))
  );
  const visibleTours = showAll ? unmissableTours : unmissableTours.slice(0, 4);

  return (
    <section
      id="khong-the-bo-lo"
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
        .ktbl-editorial-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          background: transparent;
        }
        .ktbl-editorial-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #d8e5dc;
        }
        .ktbl-editorial-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ktbl-editorial-card:hover .ktbl-editorial-img-wrap img {
          transform: scale(1.05);
        }
        .ktbl-editorial-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Work Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: '#10201B';
          text-decoration: none;
          border-bottom: 1.5px solid #10201B;
          padding-bottom: 4px;
          transition: all 0.25s ease;
          margin-top: auto;
        }
        .ktbl-editorial-card:hover .ktbl-editorial-link {
          color: #006d36;
          border-bottom-color: #006d36;
        }
        .ktbl-editorial-btn-more {
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
        .ktbl-editorial-btn-more:hover {
          background: #10201B;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(16, 32, 27, 0.18);
        }
        @media (max-width: 900px) {
          .ktbl-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .ktbl-full-container {
            padding: 0 20px !important;
          }
        }
      `}</style>

      {/* ── 100% FULL WIDTH CONTAINER ── */}
      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px', boxSizing: 'border-box' }} className="ktbl-full-container">

        {/* ── 1. SECTION HEADER (DESTINATION FORMAT) ── */}
        <ScrollReveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
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
                Signature Retreats 2026
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
                Trải Nghiệm Retreat Không Thể Bỏ Lỡ
              </h2>
            </div>

            <p
              style={{
                fontFamily: "'Work Sans', sans-serif",
                fontSize: '15px',
                color: '#405246',
                margin: 0,
                maxWidth: '480px',
                lineHeight: 1.65,
                fontWeight: 400
              }}
            >
              Tuyển tập những hành trình được tinh tuyển khắt khe, kết hợp nghệ thuật trị liệu thiên nhiên và dịch vụ chuẩn mực.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL 2-COLUMN GRID (AS DESTINATION STYLE) ── */}
        {unmissableTours.length === 0 ? (
          <EmptyState
            title="Chưa có tour nổi bật"
            description="Hiện tại chưa có tour nào phù hợp ở mục Trải nghiệm không thể bỏ lỡ. Hãy quay lại sau để cập nhật mới nhất!"
            transparent={true}
          />
        ) : (
          <div
            className="ktbl-editorial-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 44px'
            }}
          >
            {visibleTours.map((tour, index) => {
              const heroImg = getImageUrl(tour.heroImage);
              const priceText = tour.price ? `${tour.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ';
              const highlights = Array.isArray(tour.highlights) ? tour.highlights.slice(0, 2) : [];

              return (
                <ScrollReveal key={tour.id || tour.slug || index} delay={index * 100}>
                  <div
                    className="ktbl-editorial-card"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/tour/${tour.slug}`);
                      } else if (onOpenBooking) {
                        onOpenBooking(tour);
                      }
                    }}
                  >
                    {/* Photo Frame */}
                    <div className="ktbl-editorial-img-wrap">
                      <img src={heroImg} alt={tour.title} loading="lazy" />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          background: 'rgba(16, 32, 27, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          padding: '6px 14px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          textTransform: 'uppercase'
                        }}
                      >
                        <Sparkles size={13} color="#facc15" />
                        <span>Đặc Tuyển</span>
                      </div>

                      {/* Top Right Category Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'linear-gradient(135deg, #b45309 0%, #451a03 100%)',
                          backdropFilter: 'blur(10px)',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          padding: '6px 14px',
                          textTransform: 'uppercase',
                          borderRadius: '6px',
                          border: '1px solid rgba(251, 191, 36, 0.45)',
                          boxShadow: '0 6px 20px rgba(180, 83, 9, 0.35)',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        Không Thể Bỏ Lỡ
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
                        margin: '0 0 18px 0',
                        fontWeight: 400,
                        minHeight: '46px'
                      }}
                    >
                      {tour.subtitle || 'Hành trình được chăm chút tỉ mỉ từ không gian lưu trú đến các liệu trình chữa lành nguyên bản.'}
                    </p>

                    {/* Highlights chips */}
                    {highlights.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            style={{
                              fontSize: '12px',
                              backgroundColor: '#d8e5dc',
                              color: '#10201B',
                              padding: '4px 12px',
                              borderRadius: '4px',
                              fontWeight: 500
                            }}
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    )}

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
                        <span
                          style={{
                            display: 'block',
                            fontSize: '10.5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#527059',
                            fontWeight: 700,
                            marginBottom: '2px'
                          }}
                        >
                          Giá trải nghiệm
                        </span>
                        <span
                          style={{
                            fontFamily: "'Libre Caslon Text', Georgia, serif",
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#10201B'
                          }}
                        >
                          {priceText}
                        </span>
                      </div>

                      <span className="ktbl-editorial-link">
                        <span>Khám phá ngay</span>
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
        {unmissableTours.length > 4 && (
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <button
                className="ktbl-editorial-btn-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu Gọn Lịch Trình' : `Xem Thêm Tất Cả (${unmissableTours.length})`}</span>
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
