import React, { useState } from 'react';
import { TOURS_DATA, TourPackage } from '../../../data/toursData';
import { Star, Clock, Flame, Images, X, ArrowRight } from 'lucide-react';
import './RetreatHot.css';

interface RetreatHotProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function RetreatHot({ onNavigate, onOpenBooking }: RetreatHotProps) {
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const hotTours = TOURS_DATA.filter(
    t => t.isHot === true || ['binh-yen-tren-cao-nguyen', 'tinh-lang-giua-dai-ngan', 'tim-lai-ket-noi'].includes(t.slug)
  );

  return (
    <div className="retreat-hot-container">
      {/* ── LIGHTBOX MODAL ── */}
      {activeGalleryTour && (
        <div
          className="retreat-hot-lightbox-overlay"
          onClick={() => setActiveGalleryTour(null)}
        >
          <button
            onClick={() => setActiveGalleryTour(null)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'rgba(245,243,238,0.15)', border: '1px solid rgba(245,243,238,0.3)',
              color: '#f5f3ee', width: '44px', height: '44px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Jost, sans-serif'
            }}
          >
            <X size={20} />
          </button>

          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '1100px', width: '100%', textAlign: 'center' }}>
            <img
              src={activeGalleryTour.gallery[activePhotoIndex] || activeGalleryTour.heroImage}
              alt={activeGalleryTour.title}
              style={{
                width: '100%', maxHeight: '68vh', objectFit: 'contain',
                marginBottom: '20px',
              }}
            />
            <p style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,243,238,0.6)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              {activeGalleryTour.city} — Ảnh {activePhotoIndex + 1} / {activeGalleryTour.gallery.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', overflowX: 'auto', padding: '8px' }}>
              {activeGalleryTour.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Thumb"
                  onClick={() => setActivePhotoIndex(idx)}
                  style={{
                    width: '72px', height: '54px', objectFit: 'cover', cursor: 'pointer',
                    opacity: activePhotoIndex === idx ? 1 : 0.45,
                    outline: activePhotoIndex === idx ? '1px solid rgba(245,243,238,0.8)' : 'none',
                    outlineOffset: '3px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="retreat-hot-hero">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=2560&auto=format&fit=crop"
          alt="Retreat HOT"
        />
        <div className="retreat-hot-hero-overlay" />
        <div className="retreat-hot-hero-content">
          <p className="retreat-hot-badge">
            <Flame size={13} /> Hot Selection
          </p>
          <h1 className="retreat-hot-title">Những Chuyến Đi Nổi Bật Nhất</h1>
          <p className="retreat-hot-subtitle">
            Hành trình được lựa chọn nhiều nhất — bình yên, tĩnh lặng, và sự kết nối sâu sắc
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <div className="retreat-hot-grid-container">
        <div className="retreat-hot-section-header">
          <h2 className="retreat-hot-section-title">Retreat Hot Selection</h2>
          <span className="retreat-hot-section-count">{hotTours.length} Hành Trình</span>
        </div>

        <div className="retreat-hot-grid">
          {hotTours.map(tour => (
            <article key={tour.id} className="retreat-hot-card">
              {/* Photo */}
              <div className="retreat-hot-card-photo-frame" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                <img src={tour.heroImage} alt={tour.title} />
                <div className="retreat-hot-location-badge">{tour.city}, {tour.country}</div>
                <button
                  className="retreat-hot-lightbox-btn"
                  onClick={e => {
                    e.stopPropagation();
                    setActiveGalleryTour(tour);
                    setActivePhotoIndex(0);
                  }}
                >
                  <Images size={12} /> Bộ Ảnh
                </button>
              </div>

              {/* Text below image */}
              <div className="retreat-hot-card-body">
                <p className="retreat-hot-card-location">{tour.city}, {tour.country}</p>
                <h3 className="retreat-hot-card-title" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  {tour.title}
                </h3>
                <p className="retreat-hot-card-excerpt">{tour.subtitle}</p>

                <div className="retreat-hot-card-meta">
                  <span className="retreat-hot-card-meta-item">
                    <Clock size={13} />{tour.duration}
                  </span>
                  <span className="retreat-hot-card-meta-item">
                    <Star size={13} fill="currentColor" />{tour.rating}
                  </span>
                </div>

                <p className="retreat-hot-card-price">
                  {tour.price.toLocaleString('vi-VN')} VND
                </p>

                <div className="retreat-hot-card-footer">
                  <button className="retreat-hot-detail-btn" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                    Khám Phá {tour.title} <ArrowRight size={13} />
                  </button>
                  <button className="retreat-hot-book-btn" onClick={onOpenBooking}>
                    Đặt Ngay
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
