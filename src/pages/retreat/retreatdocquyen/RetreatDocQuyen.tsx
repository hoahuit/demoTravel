import React, { useState } from 'react';
import { TOURS_DATA, TourPackage } from '../../../data/toursData';
import { Star, Clock, Crown, Images, X, ArrowRight } from 'lucide-react';
import './RetreatDocQuyen.css';

interface RetreatDocQuyenProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function RetreatDocQuyen({ onNavigate, onOpenBooking }: RetreatDocQuyenProps) {
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const docQuyenTours = TOURS_DATA.filter(
    t => t.isExclusive === true || ['binh-yen-tren-cao-nguyen', 'tinh-lang-giua-dai-ngan', 'tim-lai-ket-noi', 'retreat-chua-lanh'].includes(t.slug)
  );

  return (
    <div className="retreat-docquyen-container">
      {/* ── LIGHTBOX ── */}
      {activeGalleryTour && (
        <div
          className="retreat-lightbox-overlay"
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
      <section className="retreat-docquyen-hero">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop"
          alt="Retreats Độc Quyền"
        />
        <div className="retreat-docquyen-hero-overlay" />
        <div className="retreat-docquyen-hero-content">
          <p className="retreat-docquyen-badge">
            <Crown size={13} /> Retreats Độc Quyền
          </p>
          <h1 className="retreat-docquyen-title">Bộ Sưu Tập Retreat Độc Bản</h1>
          <p className="retreat-docquyen-subtitle">
            Hành trình tĩnh lặng, chăm sóc Thân - Tâm - Trí giữa đại ngàn Nam Cát Tiên & Hồ Lắk
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <div className="retreat-docquyen-grid-container">
        <div className="retreat-docquyen-section-header">
          <h2 className="retreat-docquyen-section-title">Retreats Độc Quyền 4U Wellness</h2>
          <span className="retreat-docquyen-section-count">{docQuyenTours.length} Hành Trình</span>
        </div>

        <div className="retreat-docquyen-grid">
          {docQuyenTours.map(tour => (
            <article key={tour.id} className="retreat-card">
              {/* Photo */}
              <div className="retreat-card-photo-frame" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                <img src={tour.heroImage} alt={tour.title} />
                <div className="retreat-location-badge">{tour.city}, {tour.country}</div>
                <button
                  className="retreat-lightbox-btn"
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
              <div className="retreat-card-body">
                <p className="retreat-card-location-label">{tour.city}, {tour.country}</p>
                <h3 className="retreat-card-title" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  {tour.title}
                </h3>
                <p className="retreat-card-excerpt">{tour.subtitle}</p>

                <div className="retreat-card-meta">
                  <span className="retreat-card-meta-item">
                    <Clock size={13} />{tour.duration}
                  </span>
                  <span className="retreat-card-meta-item">
                    <Star size={13} fill="currentColor" />{tour.rating}
                  </span>
                </div>

                <p className="retreat-card-price">
                  {tour.price.toLocaleString('vi-VN')} VND
                </p>

                <div className="retreat-card-footer">
                  <button className="retreat-detail-btn" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                    Khám Phá {tour.title} <ArrowRight size={13} />
                  </button>
                  <button className="retreat-book-btn" onClick={onOpenBooking}>
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
