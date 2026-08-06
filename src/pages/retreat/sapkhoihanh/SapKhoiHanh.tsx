import React, { useState } from 'react';
import { TOURS_DATA, TourPackage } from '../../../data/toursData';
import { Star, Clock, Calendar, Images, X, ArrowRight, Compass } from 'lucide-react';
import './SapKhoiHanh.css';

interface SapKhoiHanhProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function SapKhoiHanh({ onNavigate, onOpenBooking }: SapKhoiHanhProps) {
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const sapKhoiHanhTours = TOURS_DATA.filter(t => t.departureDates && t.departureDates.length > 0);

  return (
    <div className="sap-khoihanh-container">
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
      <section className="sap-khoihanh-hero">
        <img
          src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=2560&auto=format&fit=crop"
          alt="Sắp Khởi Hành"
        />
        <div className="sap-khoihanh-hero-overlay" />
        <div className="sap-khoihanh-hero-content">
          <p className="sap-khoihanh-badge">
            <Compass size={13} /> Sắp Khởi Hành Gần Nhất
          </p>
          <h1 className="sap-khoihanh-title">Lịch Khởi Hành Sẵn Sàng</h1>
          <p className="sap-khoihanh-subtitle">
            Những chuyến đi đã chuẩn bị sẵn sàng cho hành trình chữa lành và trải nghiệm tuyệt vời của bạn
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <div className="sap-khoihanh-grid-container">
        <div className="sap-khoihanh-section-header">
          <h2 className="sap-khoihanh-section-title">Hành Trình Sắp Khởi Hành</h2>
          <span className="sap-khoihanh-section-count">{sapKhoiHanhTours.length} Chuyến Đi</span>
        </div>

        <div className="sap-khoihanh-grid">
          {sapKhoiHanhTours.map(tour => (
            <article key={tour.id} className="sap-khoihanh-card">
              {/* Photo */}
              <div className="sap-khoihanh-card-photo-frame" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                <img src={tour.heroImage} alt={tour.title} />
                <div className="sap-khoihanh-location-badge">{tour.city}, {tour.country}</div>
                <button
                  className="sap-khoihanh-lightbox-btn"
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
              <div className="sap-khoihanh-card-body">
                <p className="sap-khoihanh-card-location-label">{tour.city}, {tour.country}</p>
                <h3 className="sap-khoihanh-card-title" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  {tour.title}
                </h3>
                <p className="sap-khoihanh-card-excerpt">{tour.subtitle}</p>

                <div className="sap-khoihanh-departure-dates">
                  <Calendar size={13} />
                  Khởi hành: {tour.departureDates.join(' · ')}
                </div>

                <div className="sap-khoihanh-card-meta">
                  <span className="sap-khoihanh-card-meta-item">
                    <Clock size={13} />{tour.duration}
                  </span>
                  <span className="sap-khoihanh-card-meta-item">
                    <Star size={13} fill="currentColor" />{tour.rating}
                  </span>
                </div>

                <p className="sap-khoihanh-card-price">
                  {tour.price.toLocaleString('vi-VN')} VND
                </p>

                <div className="sap-khoihanh-card-footer">
                  <button className="sap-khoihanh-detail-btn" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                    Khám Phá {tour.title} <ArrowRight size={13} />
                  </button>
                  <button className="sap-khoihanh-book-btn" onClick={onOpenBooking}>
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
