import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi } from '../services/apiService';
import { ChevronDown, ArrowRight } from 'lucide-react';
import EmptyState from './ui/EmptyState';

export interface BentoGridProps {
  onOpenBooking?: () => void;
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

  // Filter for Sản Phẩm Sắp Khởi Hành (isFeatured === true AND NOT isExclusive)
  let featuredTours = tours.filter((t) => t.isFeatured && !t.isExclusive);
  if (featuredTours.length === 0) {
    featuredTours = tours.filter((t) => !t.isExclusive);
  }

  const items = featuredTours.map((tour) => ({
    id: tour.id,
    slug: tour.slug,
    image: tour.heroImage,
    location: tour.city,
    category: tour.category,
    title: tour.title,
    desc: tour.subtitle,
    price: `${tour.price?.toLocaleString('vi-VN')} ₫`,
    departureDates: tour.departureDates?.length ? tour.departureDates.join(' • ') : 'Hàng tuần',
    action: 'Khám phá ngay'
  }));

  const visibleItems = showAll ? items : items.slice(0, 4);

  return (
    <section
      id="sap-khoi-hanh"
      style={{
        background: '#e5efe8',
        padding: '110px 0 130px',
        color: '#10201B',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .editorial-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          background: transparent;
          border-radius: 0;
          padding: 0;
          border: none;
          box-shadow: none;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-card:hover {
          transform: translateY(-6px);
        }
        .editorial-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.8;
          border-radius: 20px;
          overflow: hidden;
          background: #e2ebe4;
          box-shadow: 0 16px 40px -14px rgba(16, 32, 27, 0.14);
        }
        .editorial-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        }
        .editorial-card:hover .editorial-image-wrapper img {
          transform: scale(1.06);
          filter: brightness(1.03);
        }
        .editorial-departure-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(16, 32, 27, 0.82);
          backdrop-filter: blur(10px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 6px 14px;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 2;
        }
        .editorial-tag-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          margin-bottom: 8px;
        }
        .editorial-location {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #2d5a36;
        }
        .editorial-dot {
          opacity: 0.4;
          font-size: 10px;
          color: #2d5a36;
        }
        .editorial-category {
          font-size: 11.5px;
          font-weight: 600;
          color: #527059;
          letter-spacing: 0.04em;
        }
        .editorial-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(24px, 2.4vw, 30px);
          line-height: 1.18;
          color: #10201B;
          margin: 0 0 10px 0;
          transition: color 0.3s ease;
        }
        .editorial-card:hover .editorial-title {
          color: #1E4A3D;
        }
        .editorial-desc {
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(16, 32, 27, 0.75);
          margin: 0 0 22px 0;
          min-height: 48px;
        }
        .editorial-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(16, 32, 27, 0.08);
        }
        .editorial-price-wrap {
          display: flex;
          flex-direction: column;
        }
        .editorial-price-label {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(16, 32, 27, 0.5);
          margin-bottom: 3px;
          font-weight: 600;
        }
        .editorial-price {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: 22px;
          color: #1E4A3D;
        }
        .editorial-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1E4A3D;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 10px 22px;
          border-radius: 99px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 18px rgba(30, 74, 61, 0.18);
        }
        .editorial-card:hover .editorial-cta-btn {
          background: #2d5a36;
          box-shadow: 0 10px 24px rgba(45, 90, 54, 0.3);
          transform: translateY(-1px);
        }
        .xem-them-btn {
          padding: 14px 34px;
          border-radius: 99px;
          border: 1.5px solid #1E4A3D;
          background: transparent;
          color: #1E4A3D;
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .xem-them-btn:hover {
          background: #1E4A3D;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(30, 74, 61, 0.2);
        }
        @media (max-width: 860px) {
          .editorial-grid-wrapper {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .bento-full-container {
            padding: 0 20px !important;
          }
          .editorial-desc {
            min-height: auto;
          }
        }
      `}</style>

      {/* ── FULL SCREEN CONTAINER ── */}
      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px' }} className="bento-full-container">

        {/* ── 1. SECTION HEADER ── */}
        <ScrollReveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '28px',
              marginBottom: '52px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(16, 32, 27, 0.12)'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2d5a36',
                  marginBottom: '12px'
                }}
              >
                ✦ LỊCH KHỞI HÀNH GẦN NHẤT 2026
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.1,
                  color: '#10201B',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}
              >
                Sản Phẩm Sắp Khởi Hành
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 2. BALANCED 2-COLUMN GRID (4 ITEMS INITIAL) ── */}
        {items.length === 0 ? (
          <EmptyState
            title="Chưa có sản phẩm sắp khởi hành"
            description="Hiện tại chưa có tour nào phù hợp ở danh mục Sắp khởi hành. Hãy quay lại sau để cập nhật mới nhất!"
            transparent={true}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '52px 38px',
              width: '100%'
            }}
            className="editorial-grid-wrapper"
          >
            {visibleItems.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 120} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(`/sanpham/${item.slug}`);
                  } else if (onOpenBooking) {
                    onOpenBooking();
                  }
                }}
                className="editorial-card"
              >
                {/* TOP: PURE PHOTO FRAME */}
                <div className="editorial-image-wrapper">
                  <div className="editorial-departure-badge">
                    <span>📅 Khởi hành:</span>
                    <span>{item.departureDates}</span>
                  </div>
                  <img src={item.image} alt={item.title} />
                </div>

                {/* BOTTOM: EDITORIAL TEXT CONTENT */}
                <div className="editorial-content-box">
                  <div className="editorial-tag-row">
                    <span className="editorial-location">{item.location}</span>
                    <span className="editorial-dot">•</span>
                    <span className="editorial-category">{item.category}</span>
                  </div>
                  <h3 className="editorial-title">{item.title}</h3>
                  <p className="editorial-desc">{item.desc}</p>

                  <div className="editorial-bottom">
                    <div className="editorial-price-wrap">
                      <span className="editorial-price-label">Giá trọn gói từ</span>
                      <span className="editorial-price">{item.price}</span>
                    </div>
                    <span className="editorial-cta-btn">{item.action}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        )}

        {/* XEM THÊM BUTTON */}
        {items.length > 4 && (
          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                className="xem-them-btn"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu gọn sản phẩm' : 'Xem thêm sản phẩm sắp khởi hành'}</span>
                <ChevronDown size={18} style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
