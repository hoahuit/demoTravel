import React, { useState, useMemo } from 'react';
import { TOURS_DATA, TourPackage } from '../data/toursData';
import {
  Search, Star, Clock, Images, X, ArrowRight, Sparkles, BookOpen,
  MapPin, Heart, Shield, Leaf, Compass, Calendar, CheckCircle2,
  SlidersHorizontal, LayoutGrid, LayoutList, User, Award, ChevronRight
} from 'lucide-react';

interface ToursPageProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function ToursPage({ currentPath = '/series-retreat', onNavigate, onOpenBooking }: ToursPageProps) {
  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'blog' | 'grid'>('blog');
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Compute Page Header details dynamically based on active route path
  // Compute Page Header details dynamically based on active route path
  const pageHeader = useMemo(() => {
    if (currentPath.includes('/series-retreat/chua-lanh') || currentPath.includes('/retreat-chua-lanh')) {
      return {
        badge: 'SERIES RETREAT · CHỮA LÀNH',
        title: 'Series Retreat Chữa Lành Thân · Tâm · Trí',
        subtitle: 'Nhật ký các hành trình buông bỏ âu lo, nuôi dưỡng năng lượng bình an với thiền chuông xoay & âm thanh trị liệu'
      };
    }
    if (currentPath.includes('/series-retreat/bao-ton') || currentPath.includes('/retreat-bao-ton')) {
      return {
        badge: 'SERIES RETREAT · BẢO TỒN',
        title: 'Series Retreat Bảo Tồn & Thiên Nhiên',
        subtitle: 'Những câu chuyện thám hiểm hệ sinh thái rừng già ngàn năm và đóng góp bảo tồn thiên nhiên hoang dã'
      };
    }
    if (currentPath.includes('/series-retreat/thien-nhien') || currentPath.includes('/retreat-thien-nhien')) {
      return {
        badge: 'SERIES RETREAT · THIÊN NHIÊN',
        title: 'Series Retreat Thiên Nhiên Hoang Sơ',
        subtitle: 'Tắm rừng Shinrin-Yoku, hòa mình giữa mây ngàn cao nguyên và biển hồ xanh ngọc'
      };
    }
    if (currentPath.includes('/series-retreat/thien-nguyen') || currentPath.includes('/retreat-thien-nguyen')) {
      return {
        badge: 'SERIES RETREAT · THIỆN NGƯỆN',
        title: 'Series Retreat Thiện Nguyện & Kết Nối',
        subtitle: 'Hành trình ý nghĩa lan tỏa yêu thương, gieo mầm tri thức và giao lưu văn hóa bản địa'
      };
    }
    if (currentPath.includes('/retreat/docquyen') || currentPath.includes('/retreats-doc-quyen')) {
      return {
        badge: 'RETREATS ĐỘC QUYỀN · EXCLUSIVE',
        title: 'Bộ Sưu Tập Retreat Độc Bản 4U Wellness',
        subtitle: 'Hành trình tĩnh lặng, chăm sóc Thân - Tâm - Trí giữa đại ngàn Nam Cát Tiên & Hồ Lắk'
      };
    }
    if (currentPath.includes('/retreat/retreathot') || currentPath.includes('/retreat-hot')) {
      return {
        badge: 'RETREAT HOT SHOWCASE',
        title: 'Bộ Sưu Tập Retreats Hot & Nổi Bật',
        subtitle: 'Những hành trình đang được đông đảo du khách yêu thích và đặt nhiều nhất'
      };
    }
    if (currentPath.includes('/retreat/sapkhoihanh') || currentPath.includes('/sap-khoi-hanh')) {
      return {
        badge: 'LỊCH KHỞI HÀNH GẦN NHẤT',
        title: 'Các Gói Retreat Sắp Khởi Hành',
        subtitle: 'Nhanh tay giữ chỗ cho những chuyến đi đã có lịch trình ấn định trong tháng'
      };
    }
    if (currentPath.includes('/retreat/khongthebolo') || currentPath.includes('/khong-the-khong-co')) {
      return {
        badge: 'KHÔNG THỂ BỎ LỠ',
        title: 'Trải Nghiệm Retreat Không Thể Bỏ Lỡ',
        subtitle: 'Tuyển tập những tour nghỉ dưỡng chữa lành được đánh giá tuyệt đối từ du khách'
      };
    }
    if (currentPath.includes('/retreat/uudaigiochot') || currentPath.includes('/uu-dai-gio-chot') || currentPath.includes('/uu-dai') || currentPath.includes('/promotions')) {
      return {
        badge: 'ƯU ĐÃI GIỜ CHÓT · PROMOTIONS',
        title: 'Ưu Đãi Giờ Chót — Gói Retreat Đặc Quyền',
        subtitle: 'Cơ hội sở hữu chuyến nghỉ dưỡng 5 sao với mức giá ưu đãi tốt nhất'
      };
    }
    if (currentPath.includes('/kollection-4u')) {
      return {
        badge: 'KOLLECTION 4U · MAGAZINE SHOWCASE',
        title: 'Bộ Sưu Tập Kollection 4U Luxuries',
        subtitle: 'Những trải nghiệm nghỉ dưỡng độc bản được tuyển chọn khắt khe nhất dành cho khách hàng cao cấp'
      };
    }
    return {
      badge: 'SERIES RETREAT · TRAVEL JOURNAL & PRODUCT SHOWCASE',
      title: 'Series Retreat — Tạp Chí Du Lịch & Hành Trình Độc Bản',
      subtitle: 'Mỗi gói Retreat là một câu chuyện du lịch giàu cảm xúc — vừa giới thiệu sản phẩm cao cấp vừa truyền cảm hứng phục hồi Thân · Tâm · Trí.'
    };
  }, [currentPath]);

  // Series Categories List
  const seriesCategories = [
    { id: 'All', label: 'Tất Cả Series', icon: Sparkles },
    { id: 'chua-lanh', label: 'Retreat Chữa Lành', icon: Heart },
    { id: 'bao-ton', label: 'Retreat Bảo Tồn', icon: Shield },
    { id: 'thien-nhien', label: 'Retreat Thiên Nhiên', icon: Leaf },
    { id: 'thien-nguyen', label: 'Retreat Thiện Nguyện', icon: Sparkles }
  ];

  // Cities List
  const cities = ['All', 'Hồ Lắk', 'Nam Cát Tiên', 'Vịnh Hạ Long', 'Yên Tử, Quảng Ninh', 'Sapa, Lao Cai', 'Hà Giang'];

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter(tour => {
      let matchesPath = true;
      if (currentPath.includes('/series-retreat/chua-lanh')) {
        matchesPath = tour.seriesType === 'chua-lanh' || tour.category === 'Wellness';
      } else if (currentPath.includes('/series-retreat/bao-ton')) {
        matchesPath = tour.seriesType === 'bao-ton';
      } else if (currentPath.includes('/series-retreat/thien-nhien')) {
        matchesPath = tour.seriesType === 'thien-nhien' || tour.category === 'Luxury';
      } else if (currentPath.includes('/series-retreat/thien-nguyen')) {
        matchesPath = tour.seriesType === 'thien-nguyen';
      } else if (currentPath.includes('/retreat/docquyen') || currentPath.includes('/retreats-doc-quyen')) {
        matchesPath = tour.isExclusive === true || ['binh-yen-tren-cao-nguyen', 'tinh-lang-giua-dai-ngan', 'tim-lai-ket-noi'].includes(tour.slug);
      } else if (currentPath.includes('/retreat/retreathot') || currentPath.includes('/retreat-hot')) {
        matchesPath = tour.isHot === true || ['binh-yen-tren-cao-nguyen', 'tinh-lang-giua-dai-ngan', 'tim-lai-ket-noi'].includes(tour.slug);
      } else if (currentPath.includes('/retreat/sapkhoihanh') || currentPath.includes('/sap-khoi-hanh')) {
        matchesPath = tour.departureDates && tour.departureDates.length > 0;
      } else if (currentPath.includes('/retreat/khongthebolo') || currentPath.includes('/khong-the-khong-co')) {
        matchesPath = tour.rating >= 4.9;
      } else if (currentPath.includes('/retreat/uudaigiochot') || currentPath.includes('/uu-dai-gio-chot') || currentPath.includes('/uu-dai') || currentPath.includes('/promotions')) {
        matchesPath = tour.isPromotion === true || (tour.discountPercentage && tour.discountPercentage > 0);
      }

      const matchesSeries = selectedSeries === 'All' || tour.seriesType === selectedSeries;
      const matchesCity = selectedCity === 'All' || tour.city.includes(selectedCity);
      const matchesSearch =
        searchQuery.trim() === '' ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tour.blogStorySnippet && tour.blogStorySnippet.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesPath && matchesSeries && matchesCity && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [currentPath, selectedSeries, selectedCity, searchQuery, sortBy]);

  // Featured Hero Tour (Editor's Pick)
  const featuredTour = useMemo(() => {
    return filteredTours.find(t => t.isFeatured) || filteredTours[0] || TOURS_DATA[0];
  }, [filteredTours]);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1a1714', minHeight: '100vh', paddingTop: '0', fontFamily: "'Be Vietnam Pro', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", width: '100%', overflowX: 'hidden' }}>

      {/* ── LIGHTBOX MODAL ── */}
      {activeGalleryTour && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(20, 18, 15, 0.96)', backdropFilter: 'blur(24px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px'
          }}
          onClick={() => setActiveGalleryTour(null)}
        >
          <button
            onClick={() => setActiveGalleryTour(null)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'rgba(245,243,238,0.15)', border: '1px solid rgba(245,243,238,0.3)',
              color: '#f5f3ee', width: '44px', height: '44px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>

          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '1200px', textAlign: 'center' }}>
            <img
              src={activeGalleryTour.gallery[activePhotoIndex] || activeGalleryTour.heroImage}
              alt={activeGalleryTour.title}
              style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '8px', marginBottom: '20px' }}
            />
            <p style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,243,238,0.7)', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              {activeGalleryTour.title} — Ảnh danh lam {activePhotoIndex + 1} / {activeGalleryTour.gallery.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', overflowX: 'auto', padding: '8px' }}>
              {activeGalleryTour.gallery.map((img, idx) => (
                <img
                  key={idx} src={img} alt="Thumb"
                  onClick={() => setActivePhotoIndex(idx)}
                  style={{
                    width: '90px', height: '64px', objectFit: 'cover', cursor: 'pointer', borderRadius: '6px',
                    opacity: activePhotoIndex === idx ? 1 : 0.45,
                    outline: activePhotoIndex === idx ? '2px solid #e2c077' : 'none',
                    outlineOffset: '2px',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── EDITORIAL FULL-WIDTH HERO BANNER ── */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop"
          alt="Series Retreat Scenic Landscape"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.62)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,12,9,0.25) 0%, rgba(15,12,9,0.88) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '1200px', padding: '80px 4vw 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '30px', padding: '6px 20px', color: '#ffffff', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '22px' }}>
            <BookOpen size={14} style={{ color: '#4ade80' }} /> <span style={{ color: '#ffffff' }}>{pageHeader.badge}</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', 'Be Vietnam Pro', Georgia, serif", fontWeight: 800, fontSize: 'clamp(32px, 5.5vw, 76px)', letterSpacing: '-0.02em', lineHeight: 1.08, margin: '0 0 20px 0', color: '#ffffff', textShadow: '0 4px 30px rgba(0,0,0,0.6)', wordBreak: 'break-word' }}>
            {pageHeader.title}
          </h1>

          <p style={{ fontSize: 'clamp(14px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.92)', margin: '0 auto 28px', fontWeight: 400, lineHeight: 1.7, maxWidth: '860px' }}>
            {pageHeader.subtitle}
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', background: 'transparent', border: 'none', padding: 0, fontSize: '14px', color: '#ffffff', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
            <span>🏞️ <strong>{TOURS_DATA.length}</strong> Danh Lam Thắng Cảnh</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>🌱 <strong>100%</strong> Lưu Trú Eco Resort 5★</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>⭐ <strong>4.98 / 5.0</strong> Trải Nghiệm Độc Bản</span>
          </div>
        </div>
      </section>

      {/* ── 90% FULL-WIDTH FILTER & NAVIGATION BAR ── */}
      <div style={{ width: '90%', maxWidth: '90vw', margin: '0 auto', padding: '40px 0 0' }}>

        {/* Control Bar: ONLY Layout View Switcher (Dạng Blog & Dạng Thẻ) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f2eee7', borderRadius: '14px', padding: '4px', border: '1px solid rgba(26,23,20,0.08)' }}>
            <button
              onClick={() => setViewMode('blog')}
              title="Dạng Blog Tạp Chí"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '10px', border: 'none',
                background: viewMode === 'blog' ? '#1a1714' : 'transparent',
                color: viewMode === 'blog' ? '#f7f5f0' : '#7a6f63',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: "'Be Vietnam Pro', sans-serif"
              }}
            >
              <LayoutList size={16} /> 📰 Dạng Blog
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Dạng Thẻ Du Lịch"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '10px', border: 'none',
                background: viewMode === 'grid' ? '#1a1714' : 'transparent',
                color: viewMode === 'grid' ? '#f7f5f0' : '#7a6f63',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: "'Be Vietnam Pro', sans-serif"
              }}
            >
              <LayoutGrid size={16} /> 🎴 Dạng Thẻ
            </button>
          </div>
        </div>
      </div>



      {/* ── MAIN 90% FULL-WIDTH SERIES RETREAT BLOG FEED ── */}
      <main style={{ width: '90%', maxWidth: '90vw', margin: '0 auto', padding: '40px 0 100px' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '44px', paddingBottom: '18px', borderBottom: '1px solid rgba(26,23,20,0.1)' }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(30px, 3.2vw, 44px)', color: '#1a1714', margin: 0, letterSpacing: '-0.01em' }}>
              {selectedSeries === 'All' ? 'Tất Cả Bài Viết Danh Lam Series Retreat' : `Danh Sách — ${seriesCategories.find(s => s.id === selectedSeries)?.label}`}
            </h2>
            <p style={{ fontSize: '14px', color: '#7a6f63', margin: '6px 0 0 0', fontWeight: 300 }}>
              Mỗi bài viết giới thiệu một danh lam thắng cảnh hoang sơ kết hợp nghệ thuật phục hồi sức khỏe Thân · Tâm · Trí.
            </p>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#c89d54', background: '#faf3e6', padding: '7px 20px', borderRadius: '20px' }}>
            {filteredTours.length} Hành Trình & Danh Lam
          </span>
        </div>

        {/* IF NO RESULTS */}
        {filteredTours.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(26,23,20,0.08)' }}>
            <Compass size={48} style={{ color: '#c89d54', margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '24px', color: '#1a1714', margin: '0 0 8px 0' }}>
              Không tìm thấy điểm đến phù hợp
            </h3>
            <p style={{ fontSize: '14px', color: '#7a6f63', margin: '0 0 24px 0' }}>
              Rất tiếc, chưa có bài viết nào phù hợp với bộ lọc của bạn. Hãy thử chọn danh mục hoặc tìm kiếm khác.
            </p>
            <button
              onClick={() => { setSelectedSeries('All'); setSelectedCity('All'); setSearchQuery(''); }}
              style={{ background: '#1a1714', color: '#f7f5f0', border: 'none', padding: '12px 28px', borderRadius: '24px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Đặt Lại Bộ Lọc
            </button>
          </div>
        )}

        {/* ── LAYOUT MODE A: DẠNG BLOG V0 / BASEHUB EDITORIAL (FEATURED + MORE POSTS GRID + NEWSLETTER) ── */}
        {viewMode === 'blog' && (
          <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '0 2vw' }}>
            {/* FEATURED POST (FIRST TOUR) */}
            {filteredTours.length > 0 && (() => {
              const feat = filteredTours[0];
              return (
                <section style={{ marginBottom: '80px', width: '100%' }}>
                  {/* Hero Cover Image */}
                  <div style={{ marginBottom: '32px', width: '100%' }}>
                    <div
                      onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                      style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', width: '100%' }}
                    >
                      <img
                        src={feat.heroImage}
                        alt={feat.title}
                        style={{
                          width: '100%',
                          maxHeight: '68vh',
                          minHeight: '380px',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>

                  {/* 2-Column Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px 36px', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#8c8275', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        📍 {feat.city}, {feat.country} • ⏱️ {feat.duration} • ⭐ {feat.rating}
                      </div>
                      <h2
                        onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                        style={{
                          fontSize: 'clamp(26px, 4vw, 52px)',
                          fontWeight: 800,
                          letterSpacing: '-0.04em',
                          lineHeight: 1.15,
                          color: '#1E4A3D',
                          margin: '0 0 16px 0',
                          cursor: 'pointer',
                          wordBreak: 'break-word'
                        }}
                      >
                        {feat.title}
                      </h2>
                      <div style={{ fontSize: '15px', color: '#7a6f63', marginBottom: '16px' }}>
                        Khởi hành gần nhất: <strong style={{ color: '#1a1714' }}>{feat.departureDates ? feat.departureDates[0] : 'Hàng tuần'}</strong>
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#4a4238', marginBottom: '24px', fontWeight: 400 }}>
                        {feat.blogStorySnippet || feat.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(26,23,20,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img
                            src={feat.gallery && feat.gallery[0] ? feat.gallery[0] : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                            alt={feat.blogAuthor || 'Guide'}
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1714' }}>{feat.blogAuthor || '4U Wellness Team'}</div>
                            <div style={{ fontSize: '12px', color: '#8c8275' }}>{feat.blogReadTime || '5 phút đọc'} • Biên tập viên</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '18px', fontWeight: 800, color: '#006d36' }}>{feat.price.toLocaleString('vi-VN')} VNĐ</span>
                          <button
                            onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                            style={{ background: '#1a1714', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            Xem Chi Tiết <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* MORE POSTS SECTION (GRID OF OTHER TOURS) */}
            {filteredTours.length > 1 && (
              <section>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#1a1714', marginBottom: '32px' }}>
                  Hành Trình Tiếp Theo (More Retreats)
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px 32px', marginBottom: '80px' }}>
                  {filteredTours.slice(1).map((tour) => (
                    <article key={tour.id} style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Image aspect-video */}
                      <div
                        onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                        style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', aspectRatio: '16 / 9' }}
                      >
                        <img
                          src={tour.heroImage}
                          alt={tour.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>

                      <h3
                        onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                        style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, color: '#1a1714', margin: '0 0 12px 0', cursor: 'pointer', wordBreak: 'break-word' }}
                      >
                        {tour.title}
                      </h3>

                      <div style={{ fontSize: '13px', color: '#8c8275', marginBottom: '14px', fontWeight: 500 }}>
                        📍 {tour.city} • ⏱️ {tour.duration} • ⭐ {tour.rating}
                      </div>

                      <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#574e44', marginBottom: '20px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {tour.blogStorySnippet || tour.subtitle}
                      </p>

                      {/* Author + CTA */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={tour.gallery && tour.gallery[0] ? tour.gallery[0] : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                            alt={tour.blogAuthor || 'Guide'}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1714' }}>
                            {tour.blogAuthor || '4U Editorial'}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '15px', fontWeight: 800, color: '#006d36', display: 'block' }}>
                            {tour.price.toLocaleString('vi-VN')} VNĐ
                          </span>
                          <button
                            onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                            style={{ background: 'transparent', color: '#1a1714', border: 'none', padding: 0, fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}
                          >
                            Khám Phá <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}


          </div>
        )}

        {/* ── LAYOUT MODE B: DẠNG LƯỚI THẺ DU LỊCH (GRID VIEW FULL-WIDTH) ── */}
        {viewMode === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', width: '100%' }}>
            {filteredTours.map(tour => (
              <article key={tour.id} style={{ background: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(26,23,20,0.06)', border: '1px solid rgba(26,23,20,0.08)', display: 'flex', flexDirection: 'column' }}>

                {/* Photo Frame (Scenic Landscape) */}
                <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  <img src={tour.heroImage} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(26,23,20,0.85)', color: '#f7f5f0', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', padding: '5px 14px', borderRadius: '16px', textTransform: 'uppercase' }}>
                    {tour.city}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveGalleryTour(tour); setActivePhotoIndex(0); }}
                    style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(255,255,255,0.9)', border: 'none', color: '#1a1714', padding: '6px 14px', borderRadius: '16px', fontSize: '11px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                  >
                    <Images size={12} /> Bộ Ảnh
                  </button>
                </div>

                {/* Card Content */}
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#8c8275', marginBottom: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {tour.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c89d54', fontWeight: 600 }}><Star size={13} fill="currentColor" /> {tour.rating}</span>
                    </div>

                    <h3
                      onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                      style={{
                        fontSize: 'clamp(20px, 2.2vw, 26px)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.25,
                        color: '#1E4A3D',
                        margin: '0 0 12px 0',
                        cursor: 'pointer'
                      }}
                    >
                      {tour.title}
                    </h3>

                    <p style={{ fontSize: '14px', color: '#6b5e52', margin: '0 0 18px 0', lineHeight: 1.6, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {tour.subtitle}
                    </p>
                  </div>

                  <div style={{ paddingTop: '18px', borderTop: '1px solid rgba(26,23,20,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '18px', fontWeight: 600, color: '#1a1714' }}>
                      {tour.price.toLocaleString('vi-VN')} VNĐ
                    </span>

                    <button
                      onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                      style={{ background: '#1a1714', color: '#f7f5f0', border: 'none', padding: '9px 18px', borderRadius: '20px', fontSize: '11px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                    >
                      Chi Tiết <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

      </main>

      {/* ── TRAVELER TIPS & EXPERT EDITORIAL NOTES FULL-WIDTH SECTION ── */}
      <section style={{ background: '#ffffff', padding: '88px 4vw', borderTop: '1px solid rgba(26,23,20,0.08)', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c89d54', marginBottom: '12px', display: 'block' }}>
            EDITORIAL JOURNAL GUIDES
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 'clamp(30px, 3.2vw, 44px)', color: '#1a1714', margin: '0 0 16px 0' }}>
            Kinh Nghiệm & Lời Khuyên Cho Chuyến Đi Retreat Đầu Tiên
          </h2>
          <p style={{ fontSize: '15px', color: '#6b5e52', maxWidth: '780px', margin: '0 auto 52px', fontWeight: 300, lineHeight: 1.65 }}>
            Tổng hợp chia sẻ từ các chuyên gia chăm sóc sức khỏe & biên tập viên du lịch 4U giúp bạn có sự chuẩn bị trọn vẹn nhất khi về với thiên nhiên.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', textAlign: 'left', width: '100%' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', border: '1px solid rgba(26,23,20,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', background: '#ffffff', border: '1px solid rgba(200,157,84,0.3)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c89d54', marginBottom: '22px' }}>
                <Heart size={22} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#1a1714', margin: '0 0 12px 0' }}>
                Thiền Chuông Xoay Tác Dụng Thế Nào?
              </h3>
              <p style={{ fontSize: '14px', color: '#6b5e52', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                Tần số âm thanh 432Hz từ chuông xoay Tây Tạng tác động trực tiếp lên hệ thần kinh, giúp đưa não bộ về trạng thái thư giãn sâu và giải tỏa căng thẳng sau vài phút.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', border: '1px solid rgba(26,23,20,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', background: '#ffffff', border: '1px solid rgba(200,157,84,0.3)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c89d54', marginBottom: '22px' }}>
                <Leaf size={22} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#1a1714', margin: '0 0 12px 0' }}>
                Nghệ Thuật Tắm Rừng Shinrin-Yoku
              </h3>
              <p style={{ fontSize: '14px', color: '#6b5e52', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                Đi bộ chậm rãi giữa rừng đại ngàn, hít thở Phytoncides (hợp chất kháng sinh tự nhiên do thực vật tiết ra) giúp tăng cường sức đề kháng và thanh lọc lá phổi.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', border: '1px solid rgba(26,23,20,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', background: '#ffffff', border: '1px solid rgba(200,157,84,0.3)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c89d54', marginBottom: '22px' }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '22px', color: '#1a1714', margin: '0 0 12px 0' }}>
                Chuẩn Bị Tâm Lý Buông Bỏ Digital
              </h3>
              <p style={{ fontSize: '14px', color: '#6b5e52', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                Để đạt hiệu quả phục hồi cao nhất, hãy tạm gác các thông báo công việc, dành trọn 100% sự hiện diện cho thiên nhiên, bản thân và những người đồng hành.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
