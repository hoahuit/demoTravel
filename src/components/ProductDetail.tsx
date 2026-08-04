import React, { useState } from 'react';
import { Clock, Star, Compass, ChevronDown, CheckCircle, MapPin, ArrowRight, Navigation } from 'lucide-react';
import { productsData } from '../data/productsData';
import ScrollExpandMedia from './ui/scroll-expansion-hero';

export interface ProductDetailProps {
  productSlug?: string;
  onBackHome?: () => void;
  onOpenBooking?: () => void;
}

export default function ProductDetail({ productSlug = 'retreat-chua-lanh', onBackHome, onOpenBooking }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<string>('Highlight');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('1 Khách');

  // Load product dynamic mock data (Fallback to 'retreat-chua-lanh' if slug not found)
  const product = productsData[productSlug] || productsData['retreat-chua-lanh'];

  const tabs = [
    { id: 'Highlight', label: 'ĐIỂM NỔI BẬT' },
    { id: 'Itinerary', label: 'LỊCH TRÌNH' },
    { id: 'PriceDescription', label: 'CHI TIẾT BẢNG GIÁ' },
    { id: 'MapsArea', label: 'BẢN ĐỒ & KHU VỰC' },
    { id: 'Reviews', label: 'ĐÁNH GIÁ THỰC TẾ' },
  ];

  // Video or image media sources for hero scroll expansion animation
  const mediaSrc = product.heroVideo || 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const bgImageSrc = product.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop';

  return (
    <div style={{ background: '#f8faf9', color: '#191c1c', minHeight: '100vh', fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif' }}>

      {/* ── 1. HERO SECTION WITH SCROLL EXPANSION ANIMATION ── */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={mediaSrc}
        posterSrc={product.heroImage}
        bgImageSrc={bgImageSrc}
        title={product.title}
        date={product.duration || '3 Ngày 2 Đêm'}
        scrollToExpand="Cuộn xuống để mở rộng & khám phá"
        textBlend={false}
      >
        {/* Badges & Subtitle inside Hero container */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '24px 20px 8px', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(0, 109, 54, 0.1)',
                color: '#006d36',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: '30px',
                border: '1px solid rgba(0, 109, 54, 0.25)',
              }}
            >
              {product.badge1 || 'RETREAT CHỮA LÀNH'}
            </span>
            <span
              style={{
                background: 'rgba(45, 90, 54, 0.08)',
                color: '#2d5a36',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: '30px',
                border: '1px solid rgba(45, 90, 54, 0.22)',
              }}
            >
              {product.badge2 || 'ĐỘC QUYỀN'}
            </span>
          </div>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#142619', fontWeight: '700', maxWidth: '760px', margin: '0 auto 16px', lineHeight: '1.55' }}>
            {product.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', fontSize: '0.9rem', color: '#415a47', flexWrap: 'wrap', fontWeight: '600' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: '#006d36' }} /> {product.location}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: '#006d36' }} /> {product.duration}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} style={{ color: '#e5a100', fill: '#e5a100' }} /> <strong style={{ color: '#142619' }}>{product.rating}</strong>
            </span>
          </div>
        </div>

        {/* ── 2. STICKY SUB-NAVIGATION BAR ── */}
        <div className="pd-sticky-subnav">
          <div className="pd-subnav-container">
            <div className="pd-subnav-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '0.8rem',
                    fontWeight: activeTab === tab.id ? '800' : '600',
                    color: activeTab === tab.id ? '#006d36' : '#5b6561',
                    borderBottom: activeTab === tab.id ? '2px solid #006d36' : '2px solid transparent',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    padding: '0 4px',
                    height: '100%',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pd-subnav-cta">
              <div className="pd-subnav-price-box" style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: '#5b6561', textTransform: 'uppercase' }}>Giá Trọn Gói</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#006d36' }}>{product.priceText}</div>
              </div>
              <button
                className="pd-subnav-cta-btn"
                onClick={onOpenBooking}
                style={{
                  background: '#062c23',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(6, 44, 35, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                Đặt Ngay
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. MAIN CONTENT BODY (RESPONSIVE GRID) ── */}
        <section className="pd-section-container">
          <div className="pd-main-grid">

            {/* LEFT MAIN CONTENT */}
            <div>
              {/* Highlight Section */}
              <div style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#191c1c', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                  {product.experienceTitle}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#414845', marginBottom: '16px' }}>
                  {product.experiencePara1}
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#414845', marginBottom: '32px' }}>
                  {product.experiencePara2}
                </p>

                {/* Photo Gallery Grid */}
                <div className="pd-gallery-grid">
                  {product.galleryImages?.map((imgUrl: string, idx: number) => (
                    <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', height: '180px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                      <img src={imgUrl} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Section */}
              <div style={{ marginBottom: '56px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#191c1c', marginBottom: '24px' }}>
                  Lịch Trình Trải Nghiệm Chi Tiết
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {product.itinerary?.map((item: any, idx: number) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #e1e3e2', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ background: '#e8f5e9', color: '#006d36', fontWeight: '800', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '8px' }}>
                          {item.day}
                        </span>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#191c1c', margin: 0 }}>
                          {item.title}
                        </h4>
                      </div>
                      <ul style={{ paddingLeft: '20px', margin: 0, color: '#414845', fontSize: '0.95rem', lineHeight: '1.7' }}>
                        {item.events?.map((evt: string, eIdx: number) => (
                          <li key={eIdx}>{evt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Policies */}
              <div style={{ background: '#ffffff', border: '1px solid #e1e3e2', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#191c1c', marginBottom: '20px' }}>
                  Dịch Vụ Bao Gồm Trong Chuyến Đi
                </h3>
                <div className="pd-inclusions-grid">
                  {product.inclusions?.map((inc: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: '#414845' }}>
                      <CheckCircle size={18} style={{ color: '#006d36', flexShrink: 0, marginTop: '2px' }} />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: BOOKING CARD */}
            <div>
              <div className="pd-sidebar-card">
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#5b6561', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
                  GIÁ CHUYẾN ĐỊNH
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: '#006d36' }}>{product.priceText}</span>
                  <span style={{ fontSize: '0.85rem', color: '#5b6561' }}>/ Khách</span>
                </div>

                {/* Booking Form Selectors */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#191c1c', display: 'block', marginBottom: '6px' }}>
                      Chọn Ngày Khởi Hành Dự Kiến
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid #c1c8c5',
                        fontSize: '0.9rem',
                        color: '#191c1c',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#191c1c', display: 'block', marginBottom: '6px' }}>
                      Số Lượng Tham Gia
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: '1px solid #c1c8c5',
                        fontSize: '0.9rem',
                        color: '#191c1c',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#ffffff'
                      }}
                    >
                      <option value="1 Khách">1 Khách (Tự Túc)</option>
                      <option value="2 Khách">2 Khách (Cặp Đôi)</option>
                      <option value="3-5 Khách">3 - 5 Khách (Gia Đình)</option>
                      <option value="Nhóm >5 Khách">Nhóm &gt; 5 Khách</option>
                    </select>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  onClick={onOpenBooking}
                  style={{
                    width: '100%',
                    background: '#062c23',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '30px',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(6, 44, 35, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#006d36'}
                  onMouseLeave={e => e.currentTarget.style.background = '#062c23'}
                >
                  <span>Đặt Hành Trình Ngay</span>
                  <ArrowRight size={18} />
                </button>

                {/* Why choose us */}
                <div style={{ borderTop: '1px solid #e1e3e2', paddingTop: '24px', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', margin: 0 }}>
                    VÌ SAO CHỌN 4U TOURS
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#414845', fontSize: '0.9rem', fontWeight: '500' }}>
                    <CheckCircle size={18} style={{ color: '#006d36', flexShrink: 0 }} />
                    <span>Hướng dẫn viên & Chuyên gia bản địa am hiểu</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#414845', fontSize: '0.9rem', fontWeight: '500' }}>
                    <CheckCircle size={18} style={{ color: '#006d36', flexShrink: 0 }} />
                    <span>Xe di chuyển riêng tư cao cấp suốt tuyến</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#414845', fontSize: '0.9rem', fontWeight: '500' }}>
                    <CheckCircle size={18} style={{ color: '#006d36', flexShrink: 0 }} />
                    <span>Quy mô nhóm nhỏ ấm cúng, thiết kế riêng</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </ScrollExpandMedia>

    </div>
  );
}
