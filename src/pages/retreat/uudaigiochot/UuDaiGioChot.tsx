import React, { useState } from 'react';
import { TOURS_DATA, TourPackage } from '../../../data/toursData';
import { Star, Clock, Zap, Images, X, ArrowRight } from 'lucide-react';
import './UuDaiGioChot.css';

interface UuDaiGioChotProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function UuDaiGioChot({ onNavigate, onOpenBooking }: UuDaiGioChotProps) {
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const uuDaiGioChotTours = TOURS_DATA.filter(
    t => t.isPromotion === true || (t.discountPercentage !== undefined && t.discountPercentage > 0)
  );

  return (
    <div className="uudai-giochot-container">
      {/* ── LIGHTBOX ── */}
      {activeGalleryTour && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(26,23,20,0.95)', backdropFilter: 'blur(24px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px'
          }}
          onClick={() => setActiveGalleryTour(null)}
        >
          <button
            onClick={() => setActiveGalleryTour(null)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'rgba(245,243,238,0.15)', border: '1px solid rgba(245,243,238,0.3)',
              color: '#f5f3ee', width: '44px', height: '44px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>

          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '1100px', width: '100%', textAlign: 'center' }}>
            <img
              src={activeGalleryTour.gallery[activePhotoIndex] || activeGalleryTour.heroImage}
              alt={activeGalleryTour.title}
              style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain', marginBottom: '20px' }}
            />
            <p style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,243,238,0.6)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              {activeGalleryTour.city} — Ảnh {activePhotoIndex + 1} / {activeGalleryTour.gallery.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', overflowX: 'auto', padding: '8px' }}>
              {activeGalleryTour.gallery.map((img, idx) => (
                <img
                  key={idx} src={img} alt="Thumb"
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
      <section className="uudai-giochot-hero">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=85&w=2560&auto=format&fit=crop"
          alt="Ưu Đãi Giờ Chót"
        />
        <div className="uudai-giochot-hero-overlay" />
        <div className="uudai-giochot-hero-content">
          <p className="uudai-giochot-badge">
            <Zap size={13} /> Ưu Đãi Giờ Chót
          </p>
          <h1 className="uudai-giochot-title">Săn Special Deals Hấp Dẫn</h1>
          <p className="uudai-giochot-subtitle">
            Cơ hội sở hữu các gói Retreat du lịch nghỉ dưỡng thượng lưu với giá ưu đãi tốt nhất
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <div className="uudai-giochot-grid-container">
        <div className="uudai-giochot-section-header">
          <h2 className="uudai-giochot-section-title">Ưu Đãi Giờ Chót</h2>
          <span className="uudai-giochot-section-count">{uuDaiGioChotTours.length} Sản Phẩm</span>
        </div>

        <div className="uudai-giochot-grid">
          {uuDaiGioChotTours.map(tour => (
            <article key={tour.id} className="uudai-giochot-card">
              {/* Photo */}
              <div className="uudai-giochot-card-photo-frame" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                <img src={tour.heroImage} alt={tour.title} />
                <div className="uudai-giochot-location-badge">{tour.city}, {tour.country}</div>
                {tour.discountPercentage && tour.discountPercentage > 0 && (
                  <div className="uudai-giochot-discount-badge">−{tour.discountPercentage}%</div>
                )}
                <button
                  className="uudai-giochot-lightbox-btn"
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
              <div className="uudai-giochot-card-body">
                <p className="uudai-giochot-card-location-label">{tour.city}, {tour.country}</p>
                <h3 className="uudai-giochot-card-title" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  {tour.title}
                </h3>
                <p className="uudai-giochot-card-excerpt">{tour.subtitle}</p>

                <div className="uudai-giochot-card-meta">
                  <span className="uudai-giochot-card-meta-item">
                    <Clock size={13} />{tour.duration}
                  </span>
                  <span className="uudai-giochot-card-meta-item">
                    <Star size={13} fill="currentColor" />{tour.rating}
                  </span>
                </div>

                <div className="uudai-giochot-card-price-wrapper">
                  <div className="uudai-giochot-card-price">
                    {tour.price.toLocaleString('vi-VN')} VND
                    {tour.originalPrice && (
                      <span className="uudai-giochot-card-original-price">
                        {tour.originalPrice.toLocaleString('vi-VN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="uudai-giochot-card-footer">
                  <button className="uudai-giochot-detail-btn" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                    Khám Phá {tour.title} <ArrowRight size={13} />
                  </button>
                  <button className="uudai-giochot-book-btn" onClick={onOpenBooking}>
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
