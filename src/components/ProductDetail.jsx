import React, { useState } from 'react';
import { Clock, Star, Compass, ChevronDown, CheckCircle, MapPin, ArrowRight, Navigation } from 'lucide-react';
import { productsData } from '../data/productsData';
import ScrollExpandMedia from './ui/scroll-expansion-hero';

export default function ProductDetail({ productSlug = 'retreat-chua-lanh', onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('Highlight');
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState('1 Khách');

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
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '16px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
            <span
              style={{
                background: 'rgba(6, 44, 35, 0.85)',
                backdropFilter: 'blur(12px)',
                color: '#6dfe9c',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '6px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(109, 254, 156, 0.3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {product.badge1 || 'RETREAT CHỮA LÀNH'}
            </span>
            <span
              style={{
                background: 'rgba(6, 44, 35, 0.85)',
                backdropFilter: 'blur(12px)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '6px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {product.badge2 || 'ĐỘC QUYỀN'}
            </span>
          </div>
          <p style={{ fontSize: '1.25rem', color: '#062c23', fontWeight: '600', marginBottom: '8px' }}>
            {product.subtitle}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#527059', fontSize: '1rem', fontWeight: '500' }}>
            <MapPin size={18} style={{ color: '#006d36' }} />
            <span>{product.location}</span>
          </div>
        </div>

        {/* ── 2. QUICK INFO BAR ── */}
        <div
          style={{
            width: '100%',
            background: '#ffffff',
            borderTop: '1px solid #e1e3e2',
            borderBottom: '1px solid #e1e3e2',
            position: 'relative',
            zIndex: 10,
            boxShadow: '0 10px 40px -10px rgba(6, 44, 35, 0.04)',
            marginTop: '16px',
            borderRadius: '16px',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            {/* Duration */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#062c23',
                  color: '#c4ebdd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                  THỜI GIAN
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#191c1c', margin: 0 }}>
                  {product.duration}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#062c23',
                  color: '#c4ebdd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={22} style={{ fill: '#c4ebdd' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                  ĐÁNH GIÁ
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#191c1c', margin: 0 }}>
                  {product.rating}
                </p>
              </div>
            </div>

            {/* Type */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#062c23',
                  color: '#c4ebdd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                  LOẠI HÌNH
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#191c1c', margin: 0 }}>
                  {product.type}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. STICKY TAB BAR ── */}
        <div
          style={{
            position: 'sticky',
            top: '76px',
            zIndex: 40,
            background: '#ffffff',
            borderBottom: '1px solid #e1e3e2',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
            width: '100%',
            marginTop: '24px',
            borderRadius: '12px',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', overflowX: 'auto' }}>
            <nav style={{ display: 'flex', gap: '32px', whitespace: 'nowrap' }}>
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    padding: '16px 0',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === t.id ? '2px solid #006d36' : '2px solid transparent',
                    color: activeTab === t.id ? '#006d36' : '#414845',
                    fontWeight: activeTab === t.id ? '700' : '600',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ── 4. MAIN CONTENT AREA (DYNAMIC TAB RENDERING) ── */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 0 100px 0', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', position: 'relative' }}>

            {/* ── LEFT COLUMN: TAB CONTENTS ── */}
            <div>
              {/* HIGHLIGHT TAB */}
              {activeTab === 'Highlight' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', animation: 'fadeInUp 0.3s ease' }}>
                  <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#191c1c', margin: '0 0 24px 0', letterSpacing: '-0.01em' }}>
                      {product.experienceTitle}
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: '#414845', margin: '0 0 20px 0' }}>
                      {product.experiencePara1}
                    </p>
                    <p style={{ fontSize: '1.02rem', lineHeight: '1.85', color: '#414845', margin: 0 }}>
                      {product.experiencePara2}
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#191c1c', margin: '0 0 24px 0' }}>
                      Hình Ảnh Nổi Bật
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                      {product.galleryImages.map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`Gallery ${idx + 1}`}
                          style={{ width: '100%', height: '190px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 10px 40px -10px rgba(6, 44, 35, 0.08)' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ITINERARY TAB */}
              {activeTab === 'Itinerary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeInUp 0.3s ease' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#191c1c', margin: '0 0 20px 0' }}>
                    Lịch Trình Chi Tiết
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {product.itinerary.map((dayItem, idx) => (
                      <details key={idx} open={idx === 0} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e1e3e2', boxShadow: '0 10px 40px -10px rgba(6, 44, 35, 0.04)', overflow: 'hidden' }}>
                        <summary style={{ padding: '24px', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', fontSize: '1.1rem', color: '#191c1c' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ background: '#062c23', color: '#c4ebdd', fontSize: '0.72rem', fontWeight: '800', padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.08em' }}>{dayItem.day}</span>
                            {dayItem.title}
                          </span>
                          <ChevronDown size={20} style={{ color: '#717975' }} />
                        </summary>
                        <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid #e1e3e2', color: '#414845', fontSize: '0.98rem', lineHeight: '1.7' }}>
                          <ul style={{ margin: '16px 0 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {dayItem.events.map((ev, eIdx) => (
                              <li key={eIdx}>{ev}</li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* PRICE DESCRIPTION TAB */}
              {activeTab === 'PriceDescription' && (
                <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#191c1c', margin: '0 0 20px 0' }}>
                    Chi Tiết Bảng Giá & Dịch Vụ
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: '#ffffff', border: '1px solid #e1e3e2', padding: '20px', borderRadius: '14px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase' }}>GÓI NGƯỜI LỚN</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#062c23', marginTop: '4px' }}>{product.priceText} <span style={{ fontSize: '0.85rem', color: '#717975', fontWeight: 'normal' }}>/ khách</span></div>
                    </div>
                    <div style={{ background: '#ffffff', border: '1px solid #e1e3e2', padding: '20px', borderRadius: '14px' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase' }}>GÓI TRẺ EM</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#062c23', marginTop: '4px' }}>{(product.priceChild || 5000000).toLocaleString('vi-VN')} VNĐ <span style={{ fontSize: '0.85rem', color: '#717975', fontWeight: 'normal' }}>/ trẻ</span></div>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#191c1c', marginBottom: '12px' }}>Dịch Vụ Bao Gồm Trọn Gói:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#414845', fontSize: '0.98rem', lineHeight: '1.7' }}>
                    {product.inclusions.map((inc, iIdx) => (
                      <li key={iIdx}>{inc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MAPS & AREA TAB */}
              {activeTab === 'MapsArea' && (
                <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#191c1c', margin: '0 0 20px 0' }}>
                    Bản Đồ & Vị Trí Khu Vực
                  </h3>
                  <div style={{ height: '340px', borderRadius: '16px', background: '#062c23', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                    <div style={{ textAlign: 'center' }}>
                      <Navigation size={48} style={{ color: '#6dfe9c', marginBottom: '12px' }} />
                      <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>{product.mapLocation}</div>
                      <div style={{ fontSize: '0.9rem', color: '#c4ebdd', marginTop: '6px' }}>{product.mapCoords}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === 'Reviews' && (
                <div style={{ animation: 'fadeInUp 0.3s ease' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#191c1c', margin: '0 0 20px 0' }}>
                    Đánh Giá Từ Khách Hàng
                  </h3>
                  <div style={{ borderTop: '1px solid #e1e3e2', paddingTop: '20px' }}>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: '#191c1c' }}>{product.reviewScore} ({product.reviewCount} Đánh giá thực tế)</div>
                    <p style={{ color: '#414845', fontSize: '0.98rem', marginTop: '8px', fontStyle: 'italic' }}>
                      {product.reviewQuote}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: STICKY BOOKING PANEL ── */}
            <div>
              <div
                style={{
                  position: 'sticky',
                  top: '160px',
                  background: 'rgba(248, 250, 249, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 10px 40px -10px rgba(6, 44, 35, 0.08)',
                }}
              >
                <p style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px 0' }}>
                  GIÁ CHỈ TỪ
                </p>

                <p style={{ fontSize: '2.1rem', fontWeight: '700', color: '#191c1c', margin: '0 0 24px 0', lineHeight: 1.1 }}>
                  {product.priceText} <span style={{ fontSize: '0.9rem', color: '#414845', fontWeight: '400' }}>/ khách</span>
                </p>

                {/* Select Dates */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    CHỌN NGÀY KHỞI HÀNH
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #c1c8c4',
                      color: '#191c1c',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Guests */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: '700', color: '#414845', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    SỐ LƯỢNG KHÁCH
                  </label>
                  <select
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #c1c8c4',
                      color: '#191c1c',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="1 Khách">1 Khách (Cá nhân)</option>
                    <option value="2 Khách">2 Khách (Đôi)</option>
                    <option value="3+ Khách">3+ Khách (Nhóm / Gia đình)</option>
                  </select>
                </div>

                {/* CTA Book Button */}
                <button
                  onClick={onOpenBooking}
                  style={{
                    width: '100%',
                    background: '#062c23',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    padding: '16px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 6px 20px rgba(6, 44, 35, 0.2)',
                    transition: 'all 0.25s ease',
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
