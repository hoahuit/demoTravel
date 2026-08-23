import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { ArrowRight, ChevronDown, Calendar, MapPin } from 'lucide-react';
import EmptyState from './ui/EmptyState';

export interface BentoGridProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function BentoGrid({ onOpenBooking, onNavigate }: BentoGridProps) {
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

  // Tours assigned to "Sắp Khởi Hành" (isFeatured = true or category 'sap-khoi-hanh')
  const featuredTours = tours.filter((t) =>
    t.isFeatured === true ||
    (Array.isArray(t.categories) && t.categories.includes('sap-khoi-hanh'))
  );

  const items = featuredTours.map((tour) => ({
    id: tour.id,
    slug: tour.slug,
    image: getImageUrl(tour.heroImage),
    location: tour.city,
    category: tour.category,
    title: tour.title,
    desc: tour.subtitle,
    price: `${tour.price?.toLocaleString('vi-VN')} ₫`,
    departureDates: tour.departureDates?.length ? tour.departureDates.join(' • ') : 'Hàng tuần',
    action: 'Khám phá hành trình',
    tourObj: tour
  }));

  const visibleItems = showAll ? items : items.slice(0, 4);

  return (
    <section
      id="sap-khoi-hanh"
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
        .dest-editorial-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          background: transparent;
        }
        .dest-editorial-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #d8e5dc;
        }
        .dest-editorial-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dest-editorial-card:hover .dest-editorial-img-wrap img {
          transform: scale(1.05);
        }
        .dest-editorial-link {
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
        .dest-editorial-card:hover .dest-editorial-link {
          color: #006d36;
          border-bottom-color: #006d36;
        }
        .dest-editorial-btn-more {
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
        .dest-editorial-btn-more:hover {
          background: #10201B;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(16, 32, 27, 0.18);
        }
        @media (max-width: 900px) {
          .dest-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .dest-full-container {
            padding: 0 20px !important;
          }
        }
      `}</style>

      {/* ── 100% FULL WIDTH CONTAINER ── */}
      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px', boxSizing: 'border-box' }} className="dest-full-container">

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
                Upcoming Journeys 2026
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
                Sản Phẩm Sắp Khởi Hành
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
              Những chuyến đi tĩnh dưỡng gần nhất đã sẵn sàng lịch trình may đo, mang lại không gian tái tạo năng lượng hoàn hảo.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL 2-COLUMN GRID (AS DESTINATION STYLE) ── */}
        {items.length === 0 ? (
          <EmptyState
            title="Chưa có sản phẩm sắp khởi hành"
            description="Hiện tại chưa có tour nào phù hợp ở danh mục Sắp khởi hành. Hãy quay lại sau để cập nhật mới nhất!"
            transparent={true}
          />
        ) : (
          <div
            className="dest-editorial-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 44px'
            }}
          >
            {visibleItems.map((item, index) => (
              <ScrollReveal key={item.id || index} delay={index * 100}>
                <div
                  className="dest-editorial-card"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(`/tour/${item.slug}`);
                    } else if (onOpenBooking) {
                      onOpenBooking(item.tourObj);
                    }
                  }}
                >
                  {/* Photo Frame */}
                  <div className="dest-editorial-img-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />

                    {/* Top Right Category Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, #007a3d 0%, #0d2b1d 100%)',
                        backdropFilter: 'blur(10px)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        padding: '6px 14px',
                        textTransform: 'uppercase',
                        borderRadius: '6px',
                        border: '1px solid rgba(74, 222, 128, 0.45)',
                        boxShadow: '0 6px 20px rgba(0, 122, 61, 0.35)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        zIndex: 2
                      }}
                    >
                      Sắp Khởi Hành
                    </div>

                    {/* Bottom Left Minimalist Departure Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        maxWidth: 'calc(100% - 32px)',
                        background: 'rgba(16, 32, 27, 0.88)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        padding: '6px 14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textTransform: 'uppercase',
                        borderRadius: '6px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        zIndex: 2
                      }}
                    >
                      <Calendar size={13} color="#ffffff" style={{ flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.departureDates}
                      </span>
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
                      {item.location} • {item.category}
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
                    {item.title}
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
                    {item.desc}
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
                        {item.price}
                      </span>
                    </div>

                    <span className="dest-editorial-link">
                      <span>{item.action}</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* ── 3. VIEW ALL / COLLAPSE BUTTON ── */}
        {items.length > 4 && (
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <button
                className="dest-editorial-btn-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu Gọn Lịch Trình' : `Xem Thêm Tất Cả (${items.length})`}</span>
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
