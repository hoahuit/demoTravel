import React, { useState, useEffect } from 'react';
import { Clock, Star, Compass, ChevronDown, CheckCircle, MapPin, ArrowRight, Navigation, ShieldCheck, Tag, Info, UserCheck, Heart, Sparkles } from 'lucide-react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import ScrollExpandMedia from './ui/scroll-expansion-hero';
import ElegantCarousel, { SlideData } from './ui/elegant-carousel';
import Testimonials from './Testimonials';
import PartnerLogos from './PartnerLogos';

export interface ProductDetailProps {
  productSlug?: string;
  customTourData?: TourPackage;
  hideTestimonials?: boolean;
  onBackHome?: () => void;
  onOpenBooking?: (tourData?: any) => void;
}

const parseArrayField = (val: any): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(s => String(s || '').trim()).filter(Boolean);
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.map(s => String(s || '').trim()).filter(Boolean);
    } catch (parseErr) {
      // String is comma-delimited rather than JSON
    }
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
};

export default function ProductDetail({ productSlug = 'retreat-chua-lanh', customTourData, hideTestimonials = false, onBackHome, onOpenBooking }: ProductDetailProps) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const [activeTab, setActiveTab] = useState<string>('Highlight');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('1 Khách');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const normalizeSlug = (slug: string) => {
    return slug
      .trim()
      .toLowerCase()
      .split(/[?#]/)[0]
      .replace(/^\/+|\/+$/g, '');
  };

  const normalizedSlug = normalizeSlug(productSlug);
  const tourFound = tours.find(t => t.slug === normalizedSlug) || tours.find(t => t.slug.includes(normalizedSlug) || normalizedSlug.includes(t.slug));

  const product = customTourData || tourFound || tours[0] || null;
  if (!product) {
    return (
      <div style={{ minHeight: '100vh', background: '#f4f5f3', color: '#1b1b1a', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, marginBottom: 16 }}>Tour không tồn tại</h1>
          <p>Không tìm thấy tour với slug: <strong>{normalizedSlug}</strong></p>
        </div>
      </div>
    );
  }

  const parsedInclusions = parseArrayField(product.included).filter(s => !s.includes('Ngăn cách dấu phẩy'));

  const pageData = {
    slug: product.slug,
    badge1: product.category.toUpperCase(),
    badge2: product.isExclusive ? 'ĐỘC QUYỀN' : (product.isHot ? 'HOT SELECTION' : '5 STAR'),
    title: product.title,
    subtitle: product.subtitle,
    location: product.city,
    heroImage: getImageUrl(product.heroImage),
    duration: product.duration,
    rating: `${product.rating} / 5.0 (${product.reviewsCount} Đánh giá)`,
    ratingValue: product.rating,
    type: product.category,
    priceText: `${product.price.toLocaleString('vi-VN')} VNĐ`,
    priceAdult: product.price,
    childPriceText: product.childPrice && product.childPrice > 0
      ? `${product.childPrice.toLocaleString('vi-VN')} VNĐ`
      : `${Math.round(product.price * 0.7).toLocaleString('vi-VN')} VNĐ`,
    infantPriceText: product.infantPrice && product.infantPrice > 0
      ? `${product.infantPrice.toLocaleString('vi-VN')} VNĐ`
      : 'MIỄN PHÍ',
    adultNote: product.adultNote || 'Bao gồm xe VIP Limousine, Resort cao cấp, 100% bữa ăn & liệu trình thiền định',
    childNote: product.childNote || 'Hưởng giường riêng & suất ăn trọn gói dành cho trẻ em',
    infantNote: product.infantNote || 'Ngồi cùng bố mẹ, miễn phí vé tham quan & phụ thu lưu trú',
    bookingPolicyNotes: product.bookingPolicyNotes || (product.notes && product.notes.length > 0 ? product.notes.join('. ') : 'Đổi ngày khởi hành miễn phí 01 lần trước 07 ngày. Đã bao gồm bảo hiểm du lịch trọn gói mức bồi thường tối đa 100.000.000 VNĐ/vụ.'),
    experienceTitle: product.subtitle || `Trải nghiệm ${product.category} tại ${product.city}`,
    experiencePara1: product.highlights && product.highlights.length > 0 ? product.highlights.join('. ') : product.subtitle,
    experiencePara2: product.blogStorySnippet || product.subtitle || `Hành trình ${product.title} tại ${product.city} với trải nghiệm trọn gói đặc sắc.`,
    highlights: product.highlights,
    galleryImages: product.gallery.length > 0 ? product.gallery.map(img => getImageUrl(img)) : [getImageUrl(product.heroImage)],
    itinerary: product.itinerary.map(item => ({
      day: `NGÀY ${item.day}`,
      title: item.title,
      image: getImageUrl(item.image),
      description: item.description,
      activities: item.activities ?? [],
      transportAndCulinary: item.transportAndCulinary ?? [],
      attractions: item.attractions ?? []
    })),
    inclusions: parsedInclusions.length > 0
      ? parsedInclusions
      : [
        `Lưu trú cao cấp tại ${product.city || 'Resort 5 sao'}`,
        'Toàn bộ các bữa ăn thực dưỡng & xe đưa đón cao cấp',
        'Hướng dẫn viên & Chuyên gia tư vấn 1:1'
      ],
    mapLocation: product.destinationMap || product.city,
    mapCoords: product.destinationMap || product.city,
    reviewScore: `${product.rating} / 5.0`,
    reviewCount: product.reviewsCount,
    reviewQuote: product.reviews?.[0]?.comment || product.blogStorySnippet || 'Hành trình đánh thức cảm giác an yên giữa thiên nhiên hoang sơ.'
  };

  const tabs = [
    { id: 'Highlight', label: 'TRẢI NGHIỆM ĐỘC BẢN' },
    { id: 'Itinerary', label: 'LỊCH TRÌNH' },
    { id: 'PriceDescription', label: 'CHI TIẾT BẢNG GIÁ' },
    { id: 'MapsArea', label: 'BẢN ĐỒ & KHU VỰC' },
  ];

  const experienceSlides: SlideData[] = [
    {
      title: pageData.experienceTitle,
      subtitle: pageData.subtitle,
      description: pageData.experiencePara1,
      accent: '#006d36',
      imageUrl: pageData.galleryImages?.[0] || pageData.heroImage,
    },
    {
      title: pageData.highlights?.[0] || `Hành trình ${pageData.location}`,
      subtitle: pageData.type,
      description: pageData.subtitle,
      accent: '#B08A46',
      imageUrl: pageData.galleryImages?.[1] || pageData.galleryImages?.[0] || pageData.heroImage,
    },
    {
      title: pageData.highlights?.[1] || `Trải nghiệm ẩm thực & tinh thần`,
      subtitle: pageData.subtitle,
      description: pageData.experiencePara2,
      accent: '#2E86AB',
      imageUrl: pageData.galleryImages?.[2] || pageData.galleryImages?.[0] || pageData.heroImage,
    },
    {
      title: pageData.title,
      subtitle: pageData.location,
      description: pageData.experiencePara2,
      accent: '#C4956A',
      imageUrl: pageData.galleryImages?.[3] || pageData.heroImage,
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Video or image media sources for hero scroll expansion animation
  const defaultVideos = [
    'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-bamboo-forest-in-japan-41544-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-ocean-waves-clearing-41537-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-mountains-in-a-valley-41541-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-sun-shining-through-the-trees-in-a-forest-41484-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-waterfalls-in-forest-2213-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-view-of-the-sea-from-the-beach-41434-large.mp4'
  ];
  const videoFallback = defaultVideos[Math.abs(productSlug.length) % defaultVideos.length];
  const mediaSrc = videoFallback;
  const bgImageSrc = pageData.heroImage;

  return (
    <div style={{ background: '#e5efe8', color: '#191c1c', minHeight: '100vh', fontFamily: '"Be Vietnam Pro", "Plus Jakarta Sans", -apple-system, sans-serif' }}>

      {/* ── 1. HERO SECTION WITH SCROLL EXPANSION ANIMATION ── */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={mediaSrc}
        posterSrc={pageData.heroImage}
        bgImageSrc={bgImageSrc}
        title={pageData.title}
        date={pageData.duration}
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
              {pageData.badge1}
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
              {pageData.badge2}
            </span>
          </div>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#142619', fontWeight: '700', maxWidth: '760px', margin: '0 auto 16px', lineHeight: '1.55' }}>
            {pageData.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', fontSize: '0.9rem', color: '#415a47', flexWrap: 'wrap', fontWeight: '600' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: '#006d36' }} /> {pageData.location}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: '#006d36' }} /> {pageData.duration}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} style={{ color: '#e5a100', fill: '#e5a100' }} /> <strong style={{ color: '#142619' }}>{pageData.ratingValue}</strong>
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
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#006d36' }}>{pageData.priceText}</div>
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

        {/* ── 3. MAIN CONTENT BODY (FULL SCREEN FOR ALL TABS) ── */}
        <section style={{ padding: '40px 48px 80px', width: '100%', boxSizing: 'border-box' }}>
          <div
            style={
              activeTab === 'PriceDescription'
                ? {
                  display: 'grid',
                  gridTemplateColumns: '1fr 360px',
                  gap: '36px',
                  maxWidth: '100%',
                  margin: '0',
                  width: '100%'
                }
                : {
                  width: '100%',
                  maxWidth: '100%',
                  margin: '0'
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
                      {pageData.experienceTitle}
                    </h3>

                    <p className="pd-editorial-lead">
                      {pageData.experiencePara1}
                    </p>
                    <p className="pd-editorial-body">
                      {pageData.experiencePara2}
                    </p>

                    {/* 4 Core Pillars Highlights */}
                    <div className="pd-highlights-grid">
                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 109, 54, 0.08)', color: '#006d36', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <Heart size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Phục hồi thân tâm</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Liệu trình thiền định & yoga chữa lành chuyên sâu.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(176, 138, 70, 0.1)', color: '#B08A46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <ShieldCheck size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Không gian biệt lập</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Khu nghỉ dưỡng khép kín giữa thiên nhiên nguyên sơ.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(46, 134, 171, 0.1)', color: '#2E86AB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <UserCheck size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Hướng dẫn viên 1:1</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Đội ngũ chuyên gia am hiểu bản địa đồng hành.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 109, 54, 0.08)', color: '#006d36', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <Tag size={20} />
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#191c1c', margin: '0 0 6px' }}>Thực dưỡng bản địa</h4>
                        <p style={{ fontSize: '0.88rem', color: '#5b6561', margin: 0, lineHeight: 1.6 }}>Ẩm thực Farm-to-Table tươi ngon ngập năng lượng.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 2: LỊCH TRÌNH TRẢI NGHIỆM CHUYÊN SÂU (ROVER PLAN CONCEPT) */}
              {activeTab === 'Itinerary' && (
                <div style={{ width: '100%', maxWidth: '100%', margin: '0' }}>

                  {/* Top Cover & Summary Card (Rover Plan Style) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(280px, 340px) 1fr',
                    gap: '32px',
                    background: '#dce7df',
                    borderRadius: '24px',
                    padding: '24px',
                    border: '1px solid rgba(45, 90, 54, 0.18)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    marginBottom: '40px',
                    alignItems: 'center'
                  }}>
                    {/* Left Cover Image */}
                    <div style={{ width: '100%', height: '220px', borderRadius: '18px', overflow: 'hidden' }}>
                      <img
                        src={getImageUrl(pageData.heroImage)}
                        alt={pageData.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                    </div>

                    {/* Right Summary Info */}
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span style={{ background: '#cbe0d0', color: '#1e4a3d', fontWeight: 800, fontSize: '0.78rem', padding: '4px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          🌙 {pageData.duration}
                        </span>
                        <span style={{ background: '#cbe0d0', color: '#1e4a3d', fontWeight: 800, fontSize: '0.78rem', padding: '4px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          🎯 {pageData.location}
                        </span>
                      </div>

                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10201B', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                        {pageData.title}
                      </h2>

                      <p style={{ fontSize: '0.88rem', color: '#415a47', margin: '0 0 16px 0', fontWeight: 500 }}>
                        <strong style={{ color: '#10201B' }}>Lộ trình:</strong> {pageData.location} — {pageData.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '14px', borderTop: '1px solid rgba(45, 90, 54, 0.18)' }}>
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                          alt="Planner"
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#10201B' }}>Chuyên Gia 4U Retreat</div>
                          <div style={{ fontSize: '0.78rem', color: '#527059' }}>Đã đồng hành 180+ chuyến đi thành công</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Two-Column Days Navigation & Content Panel */}
                  <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '48px', alignItems: 'start' }}>

                    {/* Left Days Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10201B', marginBottom: '8px', paddingLeft: '8px' }}>
                        Days
                      </div>

                      {pageData.itinerary?.map((item: any, idx: number) => {
                        const isActive = selectedDayIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedDayIndex(idx)}
                            style={{
                              width: '100%',
                              padding: '12px 20px',
                              borderRadius: '24px',
                              border: isActive ? 'none' : '1px solid rgba(45, 90, 54, 0.18)',
                              fontSize: '0.92rem',
                              fontWeight: isActive ? 800 : 600,
                              textAlign: 'left',
                              cursor: 'pointer',
                              background: isActive ? '#1e4a3d' : '#dce7df',
                              color: isActive ? '#ffffff' : '#10201B',
                              boxShadow: isActive ? '0 8px 20px rgba(30, 74, 61, 0.25)' : 'none',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            Day {idx + 1}
                          </button>
                        );
                      })}

                      {/* Tips Tab */}
                      <button
                        onClick={() => setSelectedDayIndex(pageData.itinerary ? pageData.itinerary.length : 99)}
                        style={{
                          width: '100%',
                          padding: '12px 20px',
                          borderRadius: '24px',
                          border: selectedDayIndex === (pageData.itinerary ? pageData.itinerary.length : 99) ? 'none' : '1px solid rgba(45, 90, 54, 0.18)',
                          fontSize: '0.92rem',
                          fontWeight: selectedDayIndex === (pageData.itinerary ? pageData.itinerary.length : 99) ? 800 : 600,
                          textAlign: 'left',
                          cursor: 'pointer',
                          background: selectedDayIndex === (pageData.itinerary ? pageData.itinerary.length : 99) ? '#1e4a3d' : '#dce7df',
                          color: selectedDayIndex === (pageData.itinerary ? pageData.itinerary.length : 99) ? '#ffffff' : '#10201B',
                          boxShadow: selectedDayIndex === (pageData.itinerary ? pageData.itinerary.length : 99) ? '0 8px 20px rgba(30, 74, 61, 0.25)' : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Tips
                      </button>
                    </div>

                    {/* Right Content Panel for Selected Day */}
                    <div style={{ background: '#dce7df', borderRadius: '24px', padding: '36px', border: '1px solid rgba(45,90,54,0.18)', minHeight: '480px' }}>
                      {selectedDayIndex < (pageData.itinerary ? pageData.itinerary.length : 0) ? (
                        (() => {
                          const currentDay = pageData.itinerary[selectedDayIndex];
                          const dayMoments = (currentDay.image && currentDay.image.trim().length > 0
                            ? [currentDay.image]
                            : (pageData.galleryImages && pageData.galleryImages.length > 0
                              ? pageData.galleryImages
                              : [])).filter((img: string) => img && img.trim().length > 0 && img !== '--');

                          return (
                            <div>
                              {/* Day Title */}
                              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 18px 0' }}>
                                {currentDay.title || '--'}
                              </h3>

                              {/* Day Overview Paragraph */}
                              <div style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.85, marginBottom: '24px' }}>
                                {currentDay.description ? (
                                  <p style={{ margin: '0 0 18px 0' }}>
                                    {currentDay.description}
                                  </p>
                                ) : (
                                  <p style={{ margin: '0 0 18px 0', color: '#64748b' }}>--</p>
                                )}
                                {currentDay.activities && currentDay.activities.length > 0 ? (
                                  currentDay.activities.map((activity: string, activityIdx: number) => (
                                    <p key={activityIdx} style={{ margin: '0 0 12px 0' }}>
                                      • {activity}
                                    </p>
                                  ))
                                ) : null}
                              </div>

                              {/* Moments Section */}
                              <div style={{ marginBottom: '36px' }}>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>
                                  Moments
                                </h4>
                                {dayMoments.length > 0 ? (
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px' }}>
                                    {dayMoments.slice(0, 6).map((imgUrl: string, imgIdx: number) => (
                                      <div key={imgIdx} style={{ width: '100%', height: '88px', borderRadius: '14px', overflow: 'hidden', background: '#f1f5f9' }}>
                                        <img
                                          src={imgUrl}
                                          alt={`Moment ${imgIdx + 1}`}
                                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>--</div>
                                )}
                              </div>

                              {/* Transport Section */}
                              <div style={{ marginBottom: '28px' }}>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10201B', margin: '0 0 12px 0' }}>
                                  Transport & Culinary
                                </h4>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                  {currentDay.transportAndCulinary && currentDay.transportAndCulinary.length > 0 ? (
                                    currentDay.transportAndCulinary.map((tag: string, tagIdx: number) => (
                                      <span key={tagIdx} style={{ background: '#cbe0d0', color: '#1e4a3d', fontSize: '0.82rem', fontWeight: 700, padding: '8px 16px', borderRadius: '12px' }}>
                                        {tag}
                                      </span>
                                    ))
                                  ) : (
                                    <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>--</div>
                                  )}
                                </div>
                              </div>

                              {/* Attractions Section */}
                              <div>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10201B', margin: '0 0 12px 0' }}>
                                  Attractions
                                </h4>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                  {currentDay.attractions && currentDay.attractions.length > 0 ? (
                                    currentDay.attractions.map((attraction: string, attractionIdx: number) => (
                                      <span key={attractionIdx} style={{ background: '#cbe0d0', color: '#1e4a3d', fontSize: '0.82rem', fontWeight: 700, padding: '8px 16px', borderRadius: '12px' }}>
                                        {attraction}
                                      </span>
                                    ))
                                  ) : (
                                    <div style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>--</div>
                                  )}
                                </div>
                              </div>

                            </div>
                          );
                        })()
                      ) : (
                        /* Tips Panel */
                        <div>
                          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: '0 0 18px 0' }}>
                            Tips & Lưu Ý Cho Chuyến Đi
                          </h3>
                          <div style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.85, marginBottom: '24px' }}>
                            <p style={{ marginBottom: '12px' }}>• <strong>Trang phục:</strong> Quý khách nên chuẩn bị quần áo rộng rãi, thoáng mát (vải lanh hoặc cotton) thích hợp cho các buổi tập thiền định & yoga.</p>
                            <p style={{ marginBottom: '12px' }}>• <strong>Giày đi bộ:</strong> Mang theo 01 đôi giày đi bộ êm chân để tham gia hành trình tắm rừng Shinrin-Yoku.</p>
                            <p style={{ marginBottom: '12px' }}>• <strong>Thiết bị điện tử:</strong> Khuyến khích hạn chế sử dụng điện thoại thông minh để tận hưởng sự thanh tĩnh trọn vẹn.</p>
                            <p style={{ marginBottom: '12px' }}>• <strong>Sức khỏe:</strong> Đội ngũ 4U Retreat luôn trang bị đầy đủ dụng cụ sơ cứu y tế và nhân sự đồng hành 1:1.</p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 3: CHI TIẾT BẢNG GIÁ & QUYỀN LỢI */}
              {activeTab === 'PriceDescription' && (
                <div className="pd-price-table-wrapper">
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#191c1c', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Tag size={24} style={{ color: '#006d36' }} />
                    Chi tiết bảng giá & quyền lợi chuyến đi
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
                          <td style={{ color: '#006d36', fontWeight: '800', fontSize: '1.15rem' }}>{pageData.priceText}</td>
                          <td style={{ color: '#5b6561' }}>{pageData.adultNote}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: '700' }}>Trẻ em (5 - 11 tuổi)</td>
                          <td style={{ color: '#006d36', fontWeight: '800', fontSize: '1.05rem' }}>{pageData.childPriceText}</td>
                          <td style={{ color: '#5b6561' }}>{pageData.childNote}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: '700' }}>Em bé (&lt; 5 tuổi)</td>
                          <td style={{ color: '#27ae60', fontWeight: '800', fontSize: '1.05rem' }}>{pageData.infantPriceText}</td>
                          <td style={{ color: '#5b6561' }}>{pageData.infantNote}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#191c1c', marginBottom: '20px' }}>
                    Dịch vụ bao gồm nổi bật
                  </h4>
                  <div className="pd-inclusions-grid" style={{ marginBottom: '32px' }}>
                    {pageData.inclusions?.map((inc: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.98rem', color: '#1e4a3d', background: '#cbe0d0', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(45, 90, 54, 0.18)' }}>
                        <CheckCircle size={20} style={{ color: '#006d36', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontWeight: '700' }}>{inc}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(0, 109, 54, 0.05)', border: '1px dashed #006d36', borderRadius: '16px', padding: '20px 24px', fontSize: '0.95rem', color: '#062c23', lineHeight: '1.6' }}>
                    <strong>Chính sách bảo lưu & Đổi ngày đặc quyền:</strong> {pageData.bookingPolicyNotes}
                  </div>
                </div>
              )}

              {/* TAB 4: BẢN ĐỒ & VỊ TRÍ KHU VỰC NGHỈ DƯỠNG */}
              {activeTab === 'MapsArea' && (
                <div className="pd-map-card">
                  <h3 style={{ fontSize: '1.7rem', fontWeight: '800', color: '#191c1c', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={28} style={{ color: '#006d36' }} />
                    Bản đồ & vị trí khu vực nghỉ dưỡng
                  </h3>
                  <p style={{ fontSize: '1.08rem', color: '#5b6561', marginBottom: '32px', lineHeight: '1.7' }}>
                    {pageData.location} — Tọa độ biệt lập giữa thiên nhiên nguyên sơ, cách trung tâm thành phố khoảng 45 phút di chuyển bằng xe VIP Limousine.
                  </p>

                  <div className="pd-map-viewport">
                    <img src={getImageUrl(pageData.heroImage)} alt="Location Map Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82)' }} />

                    <div style={{ position: 'absolute', background: 'rgba(6, 44, 35, 0.92)', backdropFilter: 'blur(16px)', color: '#ffffff', padding: '28px 40px', borderRadius: '22px', textAlign: 'center', maxWidth: '440px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                      <Navigation size={40} style={{ margin: '0 auto 14px', color: '#4ade80' }} />
                      <div style={{ fontWeight: '800', fontSize: '1.35rem', marginBottom: '8px' }}>{pageData.location}</div>
                      <div style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.6' }}>Tọa độ tĩnh lặng riêng tư dành riêng cho khách hàng 4U Retreat</div>
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
                    <span style={{ fontSize: '2rem', fontWeight: '800', color: '#006d36' }}>{pageData.priceText}</span>
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
                          title: pageData.title,
                          price: pageData.priceAdult,
                          city: pageData.location,
                          duration: pageData.duration
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

      {/* Khách Hàng Nói Gì Về Trải Nghiệm 4U Retreat */}
      {!hideTestimonials && <Testimonials />}
    </ScrollExpandMedia>

    </div>
  );
}
