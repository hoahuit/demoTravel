import React, { useState } from 'react';
import { TOURS_DATA, TourPackage } from '../../../data/toursData';
import { Star, Clock, Sparkles, Images, X, ArrowRight } from 'lucide-react';
import './KhongTheBoLo.css';

interface KhongTheBoLoProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function KhongTheBoLo({ onNavigate, onOpenBooking }: KhongTheBoLoProps) {
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const khongTheBoLoTours = TOURS_DATA.filter(t => t.rating >= 4.95 || t.isFeatured === true);

  return (
    <div className="khongthe-bolo-container">
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
      <section className="khongthe-bolo-hero">
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=2560&auto=format&fit=crop"
          alt="KHÔNG THỂ BỎ LỠ"
        />
        <div className="khongthe-bolo-hero-overlay" />
        <div className="khongthe-bolo-hero-content">
          <p className="khongthe-bolo-badge">
            <Sparkles size={13} /> Không Thể Bỏ Lỡ
          </p>
          <h1 className="khongthe-bolo-title">Trải Nghiệm Thượng Lưu 5 Sao</h1>
          <p className="khongthe-bolo-subtitle">
            Các gói Retreat và Tour du lịch cao cấp được đông đảo du khách đánh giá hàng đầu
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <div className="khongthe-bolo-grid-container">
        <div className="khongthe-bolo-section-header">
          <h2 className="khongthe-bolo-section-title">Không Thể Bỏ Lỡ</h2>
          <span className="khongthe-bolo-section-count">{khongTheBoLoTours.length} Sản Phẩm</span>
        </div>

        <div className="khongthe-bolo-grid">
          {khongTheBoLoTours.map(tour => (
            <article key={tour.id} className="khongthe-bolo-card">
              {/* Photo */}
              <div className="khongthe-bolo-card-photo-frame" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                <img src={tour.heroImage} alt={tour.title} />
                <div className="khongthe-bolo-location-badge">{tour.city}, {tour.country}</div>
                <button
                  className="khongthe-bolo-lightbox-btn"
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
              <div className="khongthe-bolo-card-body">
                <p className="khongthe-bolo-card-location-label">{tour.city}, {tour.country}</p>
                <h3 className="khongthe-bolo-card-title" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  {tour.title}
                </h3>
                <p className="khongthe-bolo-card-excerpt">{tour.subtitle}</p>

                <div className="khongthe-bolo-card-meta">
                  <span className="khongthe-bolo-card-meta-item">
                    <Clock size={13} />{tour.duration}
                  </span>
                  <span className="khongthe-bolo-card-meta-item">
                    <Star size={13} fill="currentColor" />{tour.rating}
                  </span>
                </div>

                <p className="khongthe-bolo-card-price">
                  {tour.price.toLocaleString('vi-VN')} VND
                </p>

                <div className="khongthe-bolo-card-footer">
                  <button className="khongthe-bolo-detail-btn" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                    Khám Phá {tour.title} <ArrowRight size={13} />
                  </button>
                  <button className="khongthe-bolo-book-btn" onClick={onOpenBooking}>
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
