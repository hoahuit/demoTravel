import React, { useState, useEffect } from 'react';
import { Clock, Star, Compass, ChevronDown, CheckCircle, MapPin, ArrowRight, Navigation, ShieldCheck, Tag, Info, UserCheck, Heart, Sparkles } from 'lucide-react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import ScrollExpandMedia from './ui/scroll-expansion-hero';
import ElegantCarousel, { SlideData } from './ui/elegant-carousel';
import Testimonials from './Testimonials';
import PartnerLogos from './PartnerLogos';
import SectionLandingPage from './SectionLandingPage';
import './ProductDetail.css';

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

const getMapEmbedUrl = (destinationMap?: string, city?: string, country?: string): string => {
  if (destinationMap && destinationMap.trim().length > 0) {
    const trimmed = destinationMap.trim();
    // If user pasted an iframe tag
    if (trimmed.includes('<iframe') && trimmed.includes('src=')) {
      const match = trimmed.match(/src=["']([^"']+)["']/);
      if (match && match[1]) {
        return match[1];
      }
    }
    // If it's already an embed URL or Google Maps URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      if (trimmed.includes('output=embed') || trimmed.includes('/embed')) {
        return trimmed;
      }
      if (trimmed.includes('google.com/maps')) {
        return trimmed.includes('?') ? `${trimmed}&output=embed` : `${trimmed}?output=embed`;
      }
      return trimmed;
    }
    // If it's a location text / address
    return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  }

  // Fallback to city and country
  const locationQuery = [city, country || 'Việt Nam'].filter(Boolean).join(', ');
  return `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery || 'Việt Nam')}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
};

export default function ProductDetail({ productSlug = 'retreat-chua-lanh', customTourData, hideTestimonials = false, onBackHome, onOpenBooking }: ProductDetailProps) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(!customTourData);

  useEffect(() => {
    let isMounted = true;
    fetchToursApi()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          syncToursDataFromApi(data);
          setTours([...data]);
        }
      })
      .catch((err) => {
        console.error('Error loading tours:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
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

  const tourFound =
    tours.find(t => t.slug === normalizedSlug || t.id === normalizedSlug) ||
    tours.find(t => (t.slug && normalizedSlug && (t.slug.includes(normalizedSlug) || normalizedSlug.includes(t.slug))));

  // If data is still loading from API and we don't have customTourData or cached tour, show loading spinner
  if (isLoading && !customTourData && !tourFound) {
    return (
      <div className="pd-loading-container">
        <div className="pd-loading-spinner" />
        <div className="pd-loading-text-wrap">
          <h3 className="pd-loading-title">
            Đang tải dữ liệu tour...
          </h3>
          <p className="pd-loading-desc">
            4U Retreat • Vui lòng đợi trong giây lát
          </p>
        </div>
      </div>
    );
  }

  const product = customTourData || tourFound || null;
  if (!product) {
    return (
      <div className="pd-notfound-container">
        <div className="pd-notfound-card">
          <h2 className="pd-notfound-title">
            Tour Chưa Sẵn Sàng Hoặc Không Tồn Tại
          </h2>
          <p className="pd-notfound-desc">
            Không tìm thấy thông tin tour với định danh: <strong className="pd-strong-dark">{normalizedSlug}</strong>
          </p>
          {onBackHome && (
            <button
              onClick={onBackHome}
              className="pd-notfound-btn"
            >
              Về Trang Chủ
            </button>
          )}
        </div>
      </div>
    );
  }

  const parsedInclusions = parseArrayField(product.included).filter(s => !s.includes('Ngăn cách dấu phẩy'));
  const primaryCategory = (product.categories && product.categories[0]) || product.category || 'Retreat';

  const pageData = {
    slug: product.slug,
    badge1: primaryCategory.toUpperCase(),
    badge2: product.isExclusive ? 'ĐỘC QUYỀN' : (product.isHot ? 'HOT SELECTION' : '5 STAR'),
    title: product.title,
    subtitle: product.subtitle,
    location: product.city,
    heroImage: getImageUrl(product.heroImage),
    duration: product.duration,
    departureDates: product.departureDates || [],
    rating: `${product.rating} / 5.0 (${product.reviewsCount} Đánh giá)`,
    ratingValue: product.rating,
    type: primaryCategory,
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
    experienceTitle: product.subtitle || `Trải nghiệm ${primaryCategory} tại ${product.city}`,
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
    mapEmbedUrl: getMapEmbedUrl(product.destinationMap, product.city, product.country),
    destinationMap: product.destinationMap,
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
      title: pageData.highlights?.[0] || pageData.experienceTitle || pageData.title,
      subtitle: pageData.subtitle,
      description: pageData.experiencePara1,
      accent: '#006d36',
      imageUrl: pageData.galleryImages?.[0] || pageData.heroImage,
    },
    {
      title: pageData.highlights?.[1] || `Trải nghiệm ẩm thực & tinh thần`,
      subtitle: pageData.type || pageData.subtitle,
      description: pageData.experiencePara2,
      accent: '#B08A46',
      imageUrl: pageData.galleryImages?.[1] || pageData.galleryImages?.[0] || pageData.heroImage,
    },
    {
      title: pageData.highlights?.[2] || `Liệu trình phục hồi chuyên sâu`,
      subtitle: pageData.subtitle,
      description: pageData.experiencePara2,
      accent: '#2E86AB',
      imageUrl: pageData.galleryImages?.[2] || pageData.galleryImages?.[0] || pageData.heroImage,
    },
    {
      title: pageData.title,
      subtitle: pageData.location,
      description: pageData.experiencePara1,
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
    <div className="pd-page-root">

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
        {/* ── SECTION LANDING PAGE SHOWCASE (100% FULL SCREEN EDGE-TO-EDGE) ── */}
        <div className="pd-landing-showcase-wrap">
          <SectionLandingPage
            onOpenBooking={() => onOpenBooking ? onOpenBooking(product) : undefined}
            retreatTitle={product.title}
            templateId={(product as any).landingSectionTemplateId || product.yoga3dTemplateId}
          />
        </div>

        {/* Subtitle inside Hero container */}
        <div className="pd-hero-summary-wrap">
          <p className="pd-hero-subtitle">
            {pageData.subtitle}
          </p>

          <div className="pd-hero-meta-row">
            <span className="pd-hero-meta-item">
              <MapPin size={16} className="pd-icon-green" /> {pageData.location}
            </span>
            <span>•</span>
            <span className="pd-hero-meta-item">
              <Clock size={16} className="pd-icon-green" /> {pageData.duration}
            </span>
            <span>•</span>
            <span className="pd-hero-meta-item">
              <Star size={16} className="pd-icon-gold" /> <strong className="pd-rating-bold">{pageData.ratingValue}</strong>
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
                  className={`pd-subnav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pd-subnav-cta">
              <div className="pd-subnav-price-box">
                <div className="pd-subnav-price-label">Giá Trọn Gói</div>
                <div className="pd-subnav-price-val">{pageData.priceText}</div>
              </div>
              <button
                className="pd-subnav-cta-btn"
                onClick={onOpenBooking}
              >
                Đặt Ngay
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. MAIN CONTENT BODY (FULL SCREEN FOR ALL TABS) ── */}
        <section className="pd-main-section">
          <div className={activeTab === 'PriceDescription' ? 'pd-content-grid-price' : 'pd-content-grid-default'}>

            {/* TAB CONTENT PANEL */}
            <div className="pd-tab-panel">
              {/* TAB 1: TRẢI NGHIỆM ĐỘC BẢN (ELEGANT CAROUSEL & EDITORIAL TEXT WITHOUT BOXED CARD BACKGROUND) */}
              {activeTab === 'Highlight' && (
                <div className="pd-editorial-stack">
                  {/* Elegant Carousel component (Transparent Background) */}
                  <ElegantCarousel slides={experienceSlides} />

                  {/* Editorial Text Section (No white card background, pure typography & clean accents) */}
                  <div className="pd-editorial-wrapper">
                    <div className="pd-editorial-header">
                      <span className="pd-editorial-badge">
                        <Sparkles size={14} /> TRẢI NGHIỆM ĐỘC BẢN
                      </span>
                    </div>

                    <h3 className="pd-editorial-title">
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
                        <div className="pd-highlight-icon-wrap green">
                          <Heart size={20} />
                        </div>
                        <h4 className="pd-highlight-item-title">Phục hồi thân tâm</h4>
                        <p className="pd-highlight-item-desc">Liệu trình thiền định & yoga chữa lành chuyên sâu.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div className="pd-highlight-icon-wrap gold">
                          <ShieldCheck size={20} />
                        </div>
                        <h4 className="pd-highlight-item-title">Không gian biệt lập</h4>
                        <p className="pd-highlight-item-desc">Khu nghỉ dưỡng khép kín giữa thiên nhiên nguyên sơ.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div className="pd-highlight-icon-wrap blue">
                          <UserCheck size={20} />
                        </div>
                        <h4 className="pd-highlight-item-title">Hướng dẫn viên 1:1</h4>
                        <p className="pd-highlight-item-desc">Đội ngũ chuyên gia am hiểu bản địa đồng hành.</p>
                      </div>

                      <div className="pd-highlight-item">
                        <div className="pd-highlight-icon-wrap green">
                          <Tag size={20} />
                        </div>
                        <h4 className="pd-highlight-item-title">Thực dưỡng bản địa</h4>
                        <p className="pd-highlight-item-desc">Ẩm thực Farm-to-Table tươi ngon ngập năng lượng.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LỊCH TRÌNH TRẢI NGHIỆM CHUYÊN SÂU (ROVER PLAN CONCEPT) */}
              {activeTab === 'Itinerary' && (
                <div className="pd-tab-full-wrap">

                  {/* Top Cover & Summary Card (Rover Plan Style) */}
                  <div className="pd-itinerary-top-card">
                    {/* Left Cover Image */}
                    <div className="pd-itinerary-cover-wrap">
                      <img
                        src={getImageUrl(pageData.heroImage)}
                        alt={pageData.title}
                        className="pd-itinerary-cover-img"
                      />
                    </div>

                    {/* Right Summary Info */}
                    <div>
                      <div className="pd-itinerary-pills-row">
                        <span className="pd-itinerary-badge-pill">
                          🌙 {pageData.duration}
                        </span>
                        <span className="pd-itinerary-badge-pill">
                          🎯 {pageData.location}
                        </span>
                      </div>

                      <h2 className="pd-itinerary-card-title">
                        {pageData.title}
                      </h2>

                      <p className="pd-itinerary-route-text">
                        <strong className="pd-strong-darkest">Lộ trình:</strong> {pageData.location} — {pageData.subtitle}
                      </p>

                      <div className="pd-itinerary-author-box">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                          alt="Planner"
                          className="pd-itinerary-author-avatar"
                        />
                        <div>
                          <div className="pd-itinerary-author-name">Chuyên Gia 4U Retreat</div>
                          <div className="pd-itinerary-author-sub">Đã đồng hành 180+ chuyến đi thành công</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Two-Column Days Navigation & Content Panel */}
                  <div className="pd-itinerary-days-grid">

                    {/* Left Days Sidebar */}
                    <div className="pd-days-sidebar">
                      <div className="pd-days-label">
                        Days
                      </div>

                      {pageData.itinerary?.map((item: any, idx: number) => {
                        const isActive = selectedDayIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedDayIndex(idx)}
                            className={`pd-day-btn ${isActive ? 'active' : ''}`}
                          >
                            Ngày {idx + 1}
                          </button>
                        );
                      })}

                      {/* Tips Tab */}
                      <button
                        onClick={() => setSelectedDayIndex(pageData.itinerary ? pageData.itinerary.length : 99)}
                        className={`pd-day-btn ${selectedDayIndex === (pageData.itinerary ? pageData.itinerary.length : 99) ? 'active' : ''}`}
                      >
                        Lưu Ý & Mẹo
                      </button>
                    </div>

                    {/* Right Content Panel for Selected Day */}
                    <div className="pd-day-detail-panel">
                      {selectedDayIndex < (pageData.itinerary ? pageData.itinerary.length : 0) ? (
                        (() => {
                          const currentDay = pageData.itinerary[selectedDayIndex];
                          const rawImages = (currentDay.image && currentDay.image.trim().length > 0 && currentDay.image !== '--'
                            ? [currentDay.image]
                            : (Array.isArray((currentDay as any).images) && (currentDay as any).images.length > 0
                              ? (currentDay as any).images
                              : []));

                          const dayMoments = rawImages
                            .map((img: string) => getImageUrl(img))
                            .filter((img: string) => img && img.trim().length > 0);

                          return (
                            <div>
                              {/* Day Title */}
                              <h3 className="pd-day-detail-title">
                                {currentDay.title || `Ngày ${selectedDayIndex + 1}`}
                              </h3>

                              {/* Day Overview Paragraph */}
                              <div className="pd-day-detail-body">
                                {currentDay.description && (
                                  <p>
                                    {currentDay.description}
                                  </p>
                                )}
                                {currentDay.activities && currentDay.activities.length > 0 && (
                                  currentDay.activities.map((activity: string, activityIdx: number) => (
                                    <p key={activityIdx}>
                                      • {activity}
                                    </p>
                                  ))
                                )}
                              </div>

                              {/* Moments Section - Only shown when images exist */}
                              {dayMoments.length > 0 && (
                                <div className="pd-moments-section">
                                  <h4 className="pd-moments-title">
                                    Khoảnh Khắc Trong Ngày
                                  </h4>
                                  <div className="pd-moments-grid">
                                    {dayMoments.slice(0, 6).map((imgUrl: string, imgIdx: number) => (
                                      <div key={imgIdx} className="pd-moment-thumb-box">
                                        <img
                                          src={imgUrl}
                                          alt={`Khoảnh khắc ${imgIdx + 1}`}
                                          className="pd-moment-thumb-img"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Transport Section - Only shown when transport/culinary tags exist */}
                              {currentDay.transportAndCulinary && currentDay.transportAndCulinary.length > 0 && (
                                <div className="pd-transport-section">
                                  <h4 className="pd-transport-title">
                                    Phương Tiện & Ẩm Thực
                                  </h4>
                                  <div className="pd-tags-wrap">
                                    {currentDay.transportAndCulinary.map((tag: string, tagIdx: number) => (
                                      <span key={tagIdx} className="pd-tag-pill">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Attractions Section - Only shown when attractions exist */}
                              {currentDay.attractions && currentDay.attractions.length > 0 && (
                                <div>
                                  <h4 className="pd-transport-title">
                                    Điểm Đến Nổi Bật
                                  </h4>
                                  <div className="pd-tags-wrap">
                                    {currentDay.attractions.map((attraction: string, attractionIdx: number) => (
                                      <span key={attractionIdx} className="pd-tag-pill">
                                        {attraction}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </div>
                          );
                        })()
                      ) : (
                        /* Tips Panel */
                        <div>
                          <h3 className="pd-day-detail-title">
                            Lưu Ý & Mẹo Cho Chuyến Đi
                          </h3>
                          <div className="pd-day-detail-body">
                            <p>• <strong>Trang phục:</strong> Quý khách nên chuẩn bị quần áo rộng rãi, thoáng mát (vải lanh hoặc cotton) thích hợp cho các buổi tập thiền định & yoga.</p>
                            <p>• <strong>Giày đi bộ:</strong> Mang theo 01 đôi giày đi bộ êm chân để tham gia hành trình tắm rừng Shinrin-Yoku.</p>
                            <p>• <strong>Thiết bị điện tử:</strong> Khuyến khích hạn chế sử dụng điện thoại thông minh để tận hưởng sự thanh tĩnh trọn vẹn.</p>
                            <p>• <strong>Sức khỏe:</strong> Đội ngũ 4U Retreat luôn trang bị đầy đủ dụng cụ sơ cứu y tế và nhân sự đồng hành 1:1.</p>
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
                  <h3 className="pd-price-table-heading">
                    <Tag size={24} className="pd-icon-green" />
                    Chi tiết bảng giá & quyền lợi chuyến đi
                  </h3>

                  {/* Enhanced Price Table */}
                  <div className="pd-price-table-scroll">
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
                          <td className="bold">Người lớn (Từ 12 tuổi)</td>
                          <td className="price-green">{pageData.priceText}</td>
                          <td className="note">{pageData.adultNote}</td>
                        </tr>
                        <tr>
                          <td className="bold">Trẻ em (5 - 11 tuổi)</td>
                          <td className="price-sub">{pageData.childPriceText}</td>
                          <td className="note">{pageData.childNote}</td>
                        </tr>
                        <tr>
                          <td className="bold">Em bé (&lt; 5 tuổi)</td>
                          <td className="price-free">{pageData.infantPriceText}</td>
                          <td className="note">{pageData.infantNote}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="pd-inclusions-title">
                    Dịch vụ bao gồm nổi bật
                  </h4>
                  <div className="pd-inclusions-grid">
                    {pageData.inclusions?.map((inc: string, idx: number) => (
                      <div key={idx} className="pd-inclusion-card">
                        <CheckCircle size={20} className="pd-icon-green pd-shrink-0 pd-mt-2" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pd-policy-box">
                    <strong>Chính sách bảo lưu & Đổi ngày đặc quyền:</strong> {pageData.bookingPolicyNotes}
                  </div>
                </div>
              )}

              {/* TAB 4: BẢN ĐỒ & VỊ TRÍ KHU VỰC NGHỈ DƯỠNG */}
              {activeTab === 'MapsArea' && (
                <div className="pd-tab-full-wrap">
                  <div className="pd-maps-header-row">
                    <div>
                      <div className="pd-maps-badge">
                        <Compass size={14} /> TỌA ĐỘ NGHỈ DƯỠNG
                      </div>
                      <h3 className="pd-maps-title">
                        <MapPin size={28} className="pd-icon-moss-dark" />
                        Vị Trí & Bản Đồ Tọa Độ {pageData.location}
                      </h3>
                      <p className="pd-maps-desc">
                        {pageData.title} — {pageData.location} ({product.country || 'Việt Nam'}). Di chuyển thuận tiện với xe đưa đón VIP riêng biệt.
                      </p>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pageData.destinationMap && !pageData.destinationMap.startsWith('http') ? pageData.destinationMap : `${pageData.location}, ${product.country || 'Việt Nam'}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-maps-btn"
                    >
                      <Navigation size={16} color="#4ade80" />
                      <span>Mở Chỉ Đường Google Maps</span>
                    </a>
                  </div>

                  {/* Interactive Google Maps Iframe */}
                  <div className="pd-maps-iframe-wrap">
                    <iframe
                      title={`Bản đồ ${pageData.location}`}
                      src={pageData.mapEmbedUrl}
                      className="pd-maps-iframe"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Location Quick Facts Info Box */}
                  <div className="pd-facts-grid">
                    <div className="pd-fact-card">
                      <div className="pd-fact-label">Điểm đến</div>
                      <div className="pd-fact-val">{pageData.location}</div>
                    </div>
                    <div className="pd-fact-card">
                      <div className="pd-fact-label">Phương tiện vận chuyển</div>
                      <div className="pd-fact-val">{product.transportation || 'Xe VIP Limousine 4U'}</div>
                    </div>
                    <div className="pd-fact-card">
                      <div className="pd-fact-label">Khách sạn / Resort</div>
                      <div className="pd-fact-val">{product.hotel || 'Resort 5 Sao Cao Cấp'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: ONLY SHOWS ON PRICE DESCRIPTION TAB */}
            {activeTab === 'PriceDescription' && (
              <div>
                <div className="pd-sidebar-card">
                  <div className="pd-sidebar-label">
                    GIÁ CHUYẾN ĐỊNH
                  </div>
                  <div className="pd-sidebar-price-row">
                    <span className="pd-sidebar-price-val">{pageData.priceText}</span>
                    <span className="pd-sidebar-price-unit">/ Khách</span>
                  </div>

                  {/* Booking Form Selectors */}
                  <div className="pd-booking-form-group">
                    <div>
                      <label className="pd-form-label">
                        Chọn Ngày Khởi Hành Dự Kiến
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="pd-form-input"
                      />
                    </div>

                    <div>
                      <label className="pd-form-label">
                        Số Lượng Tham Gia
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="pd-form-select"
                      >
                        <option value="1 Khách">1 Khách (Tự Túc)</option>
                        <option value="2 Khách">2 Khách (Cặp Đôi)</option>
                        <option value="3-5 Khách">3 - 5 Khách (Gia Đình)</option>
                        <option value="Nhóm >5 Khách">Nhóm &gt; 5 Khách</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Booking Button — Opens BookingModal (Xác Nhận Đơn Hàng) */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking({
                          title: pageData.title,
                          price: pageData.priceAdult,
                          city: pageData.location,
                          duration: pageData.duration,
                          category: product.category,
                          categories: product.categories,
                          selectedDate: selectedDate || (pageData.departureDates && pageData.departureDates[0]),
                          guests: guests
                        });
                      }
                    }}
                    className="pd-sidebar-submit-btn"
                  >
                    <span>Đặt Ngay</span>
                    <ArrowRight size={18} />
                  </button>

                  {/* Why choose us */}
                  <div className="pd-why-choose-box">
                    <p className="pd-why-choose-title">
                      VÌ SAO CHỌN 4U TOURS
                    </p>

                    <div className="pd-why-choose-item">
                      <CheckCircle size={18} className="pd-icon-green pd-shrink-0" />
                      <span>Hướng dẫn viên & Chuyên gia bản địa am hiểu</span>
                    </div>
                    <div className="pd-why-choose-item">
                      <CheckCircle size={18} className="pd-icon-green pd-shrink-0" />
                      <span>Xe di chuyển riêng tư cao cấp suốt tuyến</span>
                    </div>
                    <div className="pd-why-choose-item">
                      <CheckCircle size={18} className="pd-icon-green pd-shrink-0" />
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
      {/* Mobile Floating Sticky Bar */}
      <div className="pd-mobile-floating-bar">
        <div>
          <div className="pd-mobile-price-lbl">Giá trọn gói từ</div>
          <div className="pd-mobile-price-val">{pageData.priceAdult}</div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (onOpenBooking) {
              onOpenBooking({
                title: pageData.title,
                price: pageData.priceAdult,
                city: pageData.location,
                duration: pageData.duration,
                selectedDate: selectedDate || (pageData.departureDates && pageData.departureDates[0]),
                guests: guests
              });
            }
          }}
          className="pd-mobile-cta-btn"
        >
          <span>Đặt Ngay</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
