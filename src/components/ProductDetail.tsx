import React, { useState } from 'react';
import { Clock, Star, Compass, ChevronDown, CheckCircle, MapPin, ArrowRight, Navigation, ShieldCheck, Tag, Info, UserCheck, Heart, Sparkles } from 'lucide-react';
import { productsData, ProductItem } from '../data/productsData';
import { TOURS_DATA } from '../data/toursData';
import ScrollExpandMedia from './ui/scroll-expansion-hero';
import ElegantCarousel, { SlideData } from './ui/elegant-carousel';

export interface ProductDetailProps {
  productSlug?: string;
  onBackHome?: () => void;
  onOpenBooking?: (tourData?: any) => void;
}

export default function ProductDetail({ productSlug = 'retreat-chua-lanh', onBackHome, onOpenBooking }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState<string>('Highlight');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('1 Khách');

  // Unified Data Lookup: Check productsData first, then TOURS_DATA by slug
  const tourFound = TOURS_DATA.find(t => t.slug === productSlug);

  const product: ProductItem = productsData[productSlug] || (tourFound ? {
    slug: tourFound.slug,
    badge1: tourFound.category.toUpperCase(),
    badge2: tourFound.isExclusive ? 'ĐỘC QUYỀN' : (tourFound.isHot ? 'HOT SELECTION' : '5 STAR'),
    title: tourFound.title,
    subtitle: tourFound.subtitle,
    location: `${tourFound.city}, ${tourFound.country}`,
    heroImage: tourFound.heroImage,
    duration: tourFound.duration,
    rating: `${tourFound.rating} / 5.0 (${tourFound.reviewsCount} Đánh giá)`,
    type: tourFound.category,
    priceText: `${tourFound.price.toLocaleString('vi-VN')} VNĐ`,
    priceAdult: tourFound.price,
    priceChild: Math.round(tourFound.price * 0.5),
    experienceTitle: 'Trải Nghiệm Độc Bản',
    experiencePara1: tourFound.highlights.join('. '),
    experiencePara2: `Hành trình du lịch nghỉ dưỡng tuyệt vời tại ${tourFound.city}, ${tourFound.country} được thiết kế tinh tế giúp tái tạo năng lượng Thân - Tâm - Trí.`,
    galleryImages: tourFound.gallery.length > 0 ? tourFound.gallery : [tourFound.heroImage],
    itinerary: tourFound.itinerary.map(item => ({
      day: `NGÀY ${item.day}`,
      title: item.title,
      events: item.activities && item.activities.length > 0 ? item.activities : [item.description]
    })),
    inclusions: tourFound.included && tourFound.included.length > 0 ? tourFound.included : [
      `Lưu trú cao cấp tại ${tourFound.city}`,
      'Toàn bộ các bữa ăn thực dưỡng & xe đưa đón cao cấp',
      'Hướng dẫn viên & Chuyên gia tư vấn 1:1'
    ],
    mapLocation: tourFound.city,
    mapCoords: `${tourFound.city}, ${tourFound.country}`,
    reviewScore: `${tourFound.rating} / 5.0`,
    reviewCount: tourFound.reviewsCount,
    reviewQuote: tourFound.reviews?.[0]?.comment || '"Chuyến đi mang lại cảm giác tĩnh lặng tuyệt vời giữa thiên nhiên hoang sơ."'
  } : productsData['retreat-chua-lanh']);

  const tabs = [
    { id: 'Highlight', label: 'TRẢI NGHIỆM ĐỘC BẢN' },
    { id: 'Itinerary', label: 'LỊCH TRÌNH' },
    { id: 'PriceDescription', label: 'CHI TIẾT BẢNG GIÁ' },
    { id: 'MapsArea', label: 'BẢN ĐỒ & KHU VỰC' },
    { id: 'Reviews', label: 'ĐÁNH GIÁ THỰC TẾ' },
  ];

  const experienceSlides: SlideData[] = [
    {
      title: product.experienceTitle || 'Trải Nghiệm Độc Bản',
      subtitle: 'Retreat Chăm Sóc Thân Tâm',
      description: product.experiencePara1 || 'Rời xa nhịp sống hối hả nơi đô thị để hòa mình vào không gian tĩnh lặng nguyên sơ của vùng Cao Nguyên.',
      accent: '#006d36',
      imageUrl: product.galleryImages?.[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
    },
    {
      title: 'Hòa Mình Vào Thiên Nhiên',
      subtitle: 'Nghỉ Dưỡng Sinh Thái',
      description: product.experiencePara2 || 'Hành trình đưa bạn đi qua những rừng thông cổ thụ mờ sương và những hồ nước tĩnh lặng cùng sự đồng hành của chuyên gia.',
      accent: '#B08A46',
      imageUrl: product.galleryImages?.[1] || 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=1920&q=85',
    },
    {
      title: 'Ẩm Thực Thực Dưỡng',
      subtitle: 'Farm-To-Table Đặc Quyền',
      description: 'Thưởng thức ẩm thực hữu cơ tươi ngon ngập tràn năng lượng được chế biến tinh tế từ nguồn nông sản địa phương.',
      accent: '#2E86AB',
      imageUrl: product.galleryImages?.[2] || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
    },
    {
      title: 'Khoảnh Khắc Tĩnh Lặng',
      subtitle: 'Chữa Lành & Kết Nối',
      description: 'Mỗi khoảnh khắc là một lời mời gọi bạn sống chậm lại, hít thở sâu và kết nối lại với sự an yên từ chính bên trong.',
      accent: '#C4956A',
      imageUrl: product.heroImage || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=85',
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Video or image media sources for hero scroll expansion animation
  const mediaSrc = product.heroVideo || 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1';
  const bgImageSrc = product.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop';

  return (
    <div style={{ background: '#ffffff', color: '#191c1c', minHeight: '100vh', fontFamily: '"Be Vietnam Pro", "Plus Jakarta Sans", -apple-system, sans-serif' }}>

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
                  onClick={() => handleTabClick(tab.id)}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '0.8rem',
                    fontWeight: activeTab === tab.id ? '800' : '600',
                    color: activeTab === tab.id ? '#006d36' : '#5b6561',
                    borderBottom: activeTab === tab.id ? '2.5px solid #006d36' : '2.5px solid transparent',
                    cursor: 'pointer',
                    letterSpacing: '0.08em',
                    padding: '0 6px',
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

        {/* ── 3. MAIN CONTENT BODY (FULL SCREEN FOR NON-PRICE TABS, SIDEBAR ONLY ON PRICE TAB) ── */}
        <section style={{ padding: activeTab === 'Highlight' ? '40px 16px 80px' : '40px 32px 80px', width: '100%' }}>
          <div
            style={
              activeTab === 'PriceDescription'
                ? {
                    display: 'grid',
                    gridTemplateColumns: '1fr 360px',
                    gap: '36px',
                    maxWidth: '1380px',
                    margin: '0 auto',
                    width: '100%'
                  }
                : activeTab === 'Highlight'
                ? {
                    width: '100%',
                    maxWidth: '100%',
                    margin: '0 auto'
                  }
                : {
                    width: '100%',
                    maxWidth: '1280px',
                    margin: '0 auto'
                  }
            }
          >

            {/* TAB CONTENT PANEL */}
            <div style={{ width: '100%' }}>
              {/* TAB 1: TRẢI NGHIỆM ĐỘC BẢN (ELEGANT CAROUSEL & EDITORIAL TEXT WITHOUT BOXED CARD BACKGROUND) */}
              {activeTab === 'Highlight' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
                  {/* Elegant Carousel component (Transparent Background) */}
                  <ElegantCarousel slides={experienceSlides} />
                  
                  {/* Editorial Text Section (No white card background, pure typography & clean accents) */}
                  <div className="pd-editorial-wrapper">
                    <div className="pd-editorial-header">
                      <span className="pd-editorial-badge">
                        <Sparkles size={14} /> TRẢI NGHIỆM ĐỘC BẢN
                      </span>
                    </div>

                    <h3 className="pd-editorial-title" style={{ marginBottom: '20px' }}>
                      {product.experienceTitle}
                    </h3>

                    <p className="pd-editorial-lead">
                      {product.experiencePara1}
                    </p>
                    <p className="pd-editorial-body">
                      {product.experiencePara2}
                    </p>

                    {/* 4 Core Pillars Highlights */}
                    <div className="pd-highlights-grid">
                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 109, 54, 0.08)', color: '#006d36', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <Heart size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Phục Hồi Thân Tâm</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Liệu trình thiền định & yoga chữa lành chuyên sâu.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(176, 138, 70, 0.1)', color: '#B08A46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <ShieldCheck size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Không Gian Biệt Lập</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Khu nghỉ dưỡng khép kín giữa thiên nhiên nguyên sơ.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(46, 134, 171, 0.1)', color: '#2E86AB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <UserCheck size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Hướng Dẫn Viên 1:1</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Đội ngũ chuyên gia am hiểu bản địa đồng hành.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 109, 54, 0.08)', color: '#006d36', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <Tag size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Thực Dưỡng Bản Địa</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Ẩm thực Farm-to-Table tươi ngon ngập năng lượng.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 2: LỊCH TRÌNH CHUYÊN SÂU */}
              {activeTab === 'Itinerary' && (
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#191c1c', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={28} style={{ color: '#006d36' }} />
                      Lịch Trình Trải Nghiệm Chi Tiết ({product.duration})
                    </h3>
                    <span style={{ background: 'rgba(0, 109, 54, 0.08)', color: '#006d36', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700' }}>
                      Lịch trình có thể linh hoạt theo nguyện vọng
                    </span>
                  </div>

                  <div className="pd-timeline-container">
                    {product.itinerary?.map((item: any, idx: number) => (
                      <div key={idx} className="pd-timeline-card">
                        <div className="pd-timeline-dot">
                          {idx + 1}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                          <span style={{ background: '#006d36', color: '#ffffff', fontWeight: '800', fontSize: '0.85rem', padding: '6px 16px', borderRadius: '12px', letterSpacing: '0.05em' }}>
                            {item.day}
                          </span>
                          <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#191c1c', margin: 0 }}>
                            {item.title}
                          </h4>
                        </div>
                        <ul style={{ paddingLeft: '20px', margin: 0, color: '#333e38', fontSize: '1.05rem', lineHeight: '1.85' }}>
                          {item.events?.map((evt: string, eIdx: number) => (
                            <li key={eIdx} style={{ marginBottom: '10px' }}>{evt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CHI TIẾT BẢNG GIÁ & QUYỀN LỢI */}
              {activeTab === 'PriceDescription' && (
                <div className="pd-price-table-wrapper">
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#191c1c', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Tag size={24} style={{ color: '#006d36' }} />
                    Chi Tiết Bảng Giá & Quyền Lợi Chuyến Đi
                  </h3>

                  {/* Enhanced Price Table */}
                  <div style={{ marginBottom: '36px', overflowX: 'auto' }}>
                    <table className="pd-price-table">
                      <thead>
                        <tr>
                          <th>HẠNG KHÁCH</th>
                          <th>ĐƠN GIÁ CHUẨN</th>
                          <th>GHI CHÚ DỊCH VỤ & QUYỀN LỢI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: '700' }}>Người lớn (Từ 12 tuổi)</td>
                          <td style={{ color: '#006d36', fontWeight: '800', fontSize: '1.15rem' }}>{product.priceText}</td>
                          <td style={{ color: '#5b6561' }}>Bao gồm xe VIP Limousine, Resort cao cấp, 100% bữa ăn & liệu trình thiền định</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: '700' }}>Trẻ em (5 - 11 tuổi)</td>
                          <td style={{ color: '#006d36', fontWeight: '800', fontSize: '1.05rem' }}>5.000.000 VNĐ</td>
                          <td style={{ color: '#5b6561' }}>Hưởng giường riêng & suất ăn trọn gói dành cho trẻ em</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: '700' }}>Em bé (&lt; 5 tuổi)</td>
                          <td style={{ color: '#27ae60', fontWeight: '800', fontSize: '1.05rem' }}>MIỄN PHÍ</td>
                          <td style={{ color: '#5b6561' }}>Ngồi cùng bố mẹ, miễn phí vé tham quan & phụ thu lưu trú</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#191c1c', marginBottom: '20px' }}>
                    Dịch Vụ Bao Gồm Nổi Bật
                  </h4>
                  <div className="pd-inclusions-grid" style={{ marginBottom: '32px' }}>
                    {product.inclusions?.map((inc: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.98rem', color: '#333e38', background: '#f8faf9', padding: '12px 16px', borderRadius: '14px', border: '1px solid #eef2ef' }}>
                        <CheckCircle size={20} style={{ color: '#006d36', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontWeight: '600' }}>{inc}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(0, 109, 54, 0.05)', border: '1px dashed #006d36', borderRadius: '16px', padding: '20px 24px', fontSize: '0.95rem', color: '#062c23', lineHeight: '1.6' }}>
                    <strong>Chính sách bảo lưu & Đổi ngày đặc quyền:</strong> Đổi ngày khởi hành miễn phí 01 lần trước 07 ngày. Đã bao gồm bảo hiểm du lịch trọn gói mức bồi thường tối đa 100.000.000 VNĐ/vụ.
                  </div>
                </div>
              )}

              {/* TAB 4: BẢN ĐỒ & VỊ TRÍ KHU VỰC NGHỈ DƯỠNG */}
              {activeTab === 'MapsArea' && (
                <div className="pd-map-card">
                  <h3 style={{ fontSize: '1.7rem', fontWeight: '800', color: '#191c1c', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={28} style={{ color: '#006d36' }} />
                    Bản Đồ & Vị Trí Khu Vực Nghỉ Dưỡng
                  </h3>
                  <p style={{ fontSize: '1.08rem', color: '#5b6561', marginBottom: '32px', lineHeight: '1.7' }}>
                    {product.location} — Tọa độ biệt lập giữa thiên nhiên nguyên sơ, cách trung tâm thành phố khoảng 45 phút di chuyển bằng xe VIP Limousine.
                  </p>

                  <div className="pd-map-viewport">
                    <img src={product.heroImage} alt="Location Map Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82)' }} />
                    <div style={{ position: 'absolute', background: 'rgba(6, 44, 35, 0.92)', backdropFilter: 'blur(16px)', color: '#ffffff', padding: '28px 40px', borderRadius: '22px', textAlign: 'center', maxWidth: '440px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                      <Navigation size={40} style={{ margin: '0 auto 14px', color: '#4ade80' }} />
                      <div style={{ fontWeight: '800', fontSize: '1.35rem', marginBottom: '8px' }}>{product.location}</div>
                      <div style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.6' }}>Tọa độ tĩnh lặng riêng tư dành riêng cho khách hàng 4U Retreat</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ĐÁNH GIÁ THỰC TẾ TỪ KHÁCH HÀNG */}
              {activeTab === 'Reviews' && (
                <div className="pd-reviews-wrapper">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.7rem', fontWeight: '800', color: '#191c1c', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Star size={28} style={{ color: '#e5a100', fill: '#e5a100' }} />
                        Đánh Giá Thực Tế Từ Khách Hàng
                      </h3>
                      <div style={{ fontSize: '1rem', color: '#5b6561' }}>Xác thực 100% bởi các du khách đã trực tiếp tham gia hành trình</div>
                    </div>

                    <div style={{ background: '#f3f7f4', border: '1.5px solid #006d36', borderRadius: '20px', padding: '16px 28px', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#006d36', lineHeight: 1 }}>4.9 / 5.0</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#5b6561', marginTop: '6px', letterSpacing: '0.05em' }}>24 ĐÁNH GIÁ XÁC THỰC</div>
                    </div>
                  </div>

                  {/* Customer Review Items */}
                  <div>
                    <div className="pd-review-item">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#006d36', color: '#fff', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                            TB
                          </div>
                          <div>
                            <strong style={{ fontSize: '1.1rem', color: '#191c1c', display: 'block' }}>Trần Bích Ngọc</strong>
                            <span style={{ fontSize: '0.85rem', color: '#666' }}>Gia đình 3 thế hệ • Trải nghiệm Tháng 7/2026</span>
                          </div>
                        </div>
                        <div style={{ color: '#e5a100', fontSize: '1.1rem' }}>★★★★★</div>
                      </div>
                      <p style={{ fontSize: '1.08rem', color: '#333e38', lineHeight: '1.75', margin: 0 }}>
                        "Chuyến đi trọn vẹn niềm vui cho cả 3 thế hệ gia đình tôi. Resort có không gian tĩnh lặng, đồ ăn hữu cơ tươi ngon và xe limousine đón tận nhà cực kỳ chu đáo."
                      </p>
                    </div>

                    <div className="pd-review-item">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#2d5a36', color: '#fff', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                            LH
                          </div>
                          <div>
                            <strong style={{ fontSize: '1.1rem', color: '#191c1c', display: 'block' }}>Lê Hoàng Anh</strong>
                            <span style={{ fontSize: '0.85rem', color: '#666' }}>Solo Traveler • Trải nghiệm Tháng 6/2026</span>
                          </div>
                        </div>
                        <div style={{ color: '#e5a100', fontSize: '1.1rem' }}>★★★★★</div>
                      </div>
                      <p style={{ fontSize: '1.08rem', color: '#333e38', lineHeight: '1.75', margin: 0 }}>
                        "Hành trình thiền đi bộ trong rừng thông thực sự giúp mình chữa lành và tái tạo năng lượng sau chuỗi ngày áp lực công việc. Rất tiến cử 4U Retreat!"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: ONLY SHOWS ON PRICE DESCRIPTION TAB */}
            {activeTab === 'PriceDescription' && (
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
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking({
                          title: product.title,
                          price: product.priceAdult,
                          city: product.location,
                          duration: product.duration
                        });
                      }
                    }}
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
            )}

          </div>
        </section>
      </ScrollExpandMedia>

    </div>
  );
}
