import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { Star, Sparkles, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
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

  // Filter unmissable HOT tours (excluding exclusive-only tours)
  const unmissableTours = tours.filter((tour) => tour.isHot && !tour.isExclusive);
  const visibleTours = showAll ? unmissableTours : unmissableTours.slice(0, 4);

  return (
    <section
      id="khong-the-bo-lo"
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
        .ktbl-card {
          background: #dce7df;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(45, 90, 54, 0.18);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
        }
        .ktbl-card:hover {
          transform: translateY(-8px);
          background: #d2e2d6;
          box-shadow: 0 24px 48px -12px rgba(20, 38, 25, 0.16);
          border-color: rgba(45, 90, 54, 0.35);
        }
        .ktbl-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.8;
          overflow: hidden;
        }
        .ktbl-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ktbl-card:hover .ktbl-image-wrap img {
          transform: scale(1.08);
        }
        .ktbl-badge-top {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(45, 90, 54, 0.92);
          backdrop-filter: blur(12px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 99px;
          text-transform: uppercase;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .ktbl-rating-top {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(16, 32, 27, 0.85);
          backdrop-filter: blur(12px);
          color: #facc15;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 99px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ktbl-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .ktbl-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #2d5a36;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
        }
        .ktbl-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 24px;
          font-weight: 600;
          color: #10201B;
          line-height: 1.25;
          margin: 0 0 12px 0;
          min-height: 62px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .ktbl-card:hover .ktbl-title {
          color: #1E4A3D;
        }
        .ktbl-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          margin-bottom: 24px;
          min-height: 32px;
        }
        .ktbl-chip {
          font-size: 12px;
          background: #cbe0d0;
          color: #2d5a36;
          padding: 4px 12px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .ktbl-footer {
          padding-top: 18px;
          border-top: 1px solid rgba(45, 90, 54, 0.18);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ktbl-price-val {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #1E4A3D;
        }
        .ktbl-btn {
          background: #1E4A3D;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 99px;
          font-weight: 700;
          font-size: 12.5px;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .ktbl-card:hover .ktbl-btn {
          background: #2d5a36;
          box-shadow: 0 8px 20px rgba(45, 90, 54, 0.28);
        }
        .xem-them-ktbl-btn {
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
        .xem-them-ktbl-btn:hover {
          background: #1E4A3D;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(30, 74, 61, 0.2);
        }
        @media (max-width: 860px) {
          .ktbl-grid {
            grid-template-columns: 1fr !important;
          }
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
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2d5a36',
                  marginBottom: '12px'
                }}
              >
                ✦ KHÔNG THỂ BỎ LỠ
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 'clamp(32px, 4vw, 46px)',
                  lineHeight: 1.15,
                  color: '#10201B',
                  margin: 0
                }}
              >
                Trải Nghiệm Retreat Không Thể Bỏ Lỡ
              </h2>
            </div>

            <p style={{ maxWidth: '440px', fontSize: '14.5px', color: '#527059', margin: 0, lineHeight: 1.6 }}>
              Tuyển tập những hành trình chữa lành được yêu thích nhất với những trải nghiệm mang dấu ấn độc bản của 4U.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-COLUMN CARD GRID (4 ITEMS INITIAL) */}
        {unmissableTours.length === 0 ? (
          <EmptyState
            title="Chưa có tour thuộc mục KHÔNG THỂ BỎ LỠ"
            description="Hiện tại chưa có hành trình nào được đánh dấu Không Thể Bỏ Lỡ. Hãy quay lại sau để trải nghiệm!"
            transparent={true}
          />
        ) : (
          <div
            className="ktbl-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              alignItems: 'stretch'
            }}
          >
            {visibleTours.map((tour, idx) => (
            <ScrollReveal key={tour.id} delay={idx * 120} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div
                className="ktbl-card"
                onClick={() => {
                  if (onNavigate) onNavigate(`/sanpham/${tour.slug}`);
                  else if (onOpenBooking) onOpenBooking(tour);
                }}
              >
                <div className="ktbl-image-wrap">
                  <div className="ktbl-badge-top">Không thể bỏ lỡ</div>
                  <div className="ktbl-rating-top">
                    <Star size={13} fill="#facc15" color="#facc15" />
                    <span>{tour.rating}</span>
                  </div>
                  <img src={getImageUrl(tour.heroImage)} alt={tour.title} />

                </div>

                <div className="ktbl-body">
                  <div className="ktbl-meta">
                    <MapPin size={13} />
                    <span>{tour.city} • {tour.duration}</span>
                  </div>

                  <h3 className="ktbl-title">{tour.title}</h3>

                  <div className="ktbl-highlights">
                    {(Array.isArray(tour.highlights) ? tour.highlights : []).slice(0, 2).map((hl, i) => (
                      <span key={i} className="ktbl-chip">
                        <Sparkles size={11} /> {hl}
                      </span>
                    ))}
                  </div>

                  <div className="ktbl-footer">
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#738d7a', display: 'block', fontWeight: 600 }}>Giá trọn gói</span>
                      <span className="ktbl-price-val">{tour.price.toLocaleString('vi-VN')} ₫</span>
                    </div>

                    <button
                      className="ktbl-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenBooking) onOpenBooking(tour);
                        else if (onNavigate) onNavigate(`/sanpham/${tour.slug}`);
                      }}
                    >
                      <span>Đặt Ngay</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        )}

        {/* XEM THÊM BUTTON */}
        {unmissableTours.length > 4 && (
          <ScrollReveal delay={200}>
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <button
                className="xem-them-ktbl-btn"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu gọn sản phẩm' : 'Xem thêm sản phẩm không thể bỏ lỡ'}</span>
                <ChevronDown size={18} style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
