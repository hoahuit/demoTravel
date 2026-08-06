import React, { useState, useMemo } from 'react';
import { TOURS_DATA, TourPackage } from '../data/toursData';
import { Search, Star, Clock, Images, X, ArrowRight, Sparkles } from 'lucide-react';

interface ToursPageProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function ToursPage({ currentPath = '/tours', onNavigate, onOpenBooking }: ToursPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Compute Page Header Title & Subtitle dynamically based on route path concept
  const pageHeader = useMemo(() => {
    if (currentPath.includes('/series-retreat/chua-lanh') || currentPath.includes('/retreat-chua-lanh')) {
      return {
        badge: 'SERIES RETREAT',
        title: 'Retreat Chữa Lành Thân · Tâm · Trí',
        subtitle: 'Tạm gác buông âu lo, thả mình trong liệu pháp thiền chuông xoay & âm thanh trị liệu'
      };
    }
    if (currentPath.includes('/series-retreat/bao-ton') || currentPath.includes('/retreat-bao-ton')) {
      return {
        badge: 'SERIES RETREAT',
        title: 'Retreat Bảo Tồn & Thiên Nhiên',
        subtitle: 'Thám hiểm hệ sinh thái rừng nguyên sinh & đóng góp bảo tồn thiên nhiên hoang dã'
      };
    }
    if (currentPath.includes('/series-retreat/thien-nhien') || currentPath.includes('/retreat-thien-nhien')) {
      return {
        badge: 'SERIES RETREAT',
        title: 'Retreat Thiên Nhiên Hoang Sơ',
        subtitle: 'Tắm rừng Shinrin-Yoku, hít thở sương sớm giữa đại ngàn cao nguyên'
      };
    }
    if (currentPath.includes('/series-retreat/thien-nguyen') || currentPath.includes('/retreat-thien-nguyen')) {
      return {
        badge: 'SERIES RETREAT',
        title: 'Retreat Thiện Nguyện & Kết Nối',
        subtitle: 'Lao động ý nghĩa, giao lưu văn hóa & lan tỏa tình thương tới cộng đồng'
      };
    }
    if (currentPath.includes('/series-retreat')) {
      return {
        badge: 'SERIES RETREAT',
        title: 'Bộ Sưu Tập Series Retreat',
        subtitle: 'Hành trình chữa lành, bảo tồn và kết nối sâu sắc cùng thiên nhiên nguyên sơ'
      };
    }
    if (currentPath.includes('/kollection-4u')) {
      return {
        badge: 'KOLLECTION 4U',
        title: 'Bộ Sưu Tập Kollection 4U',
        subtitle: 'New Arrivals, Must-Have & Exclusive Luxury Products'
      };
    }
    return {
      badge: 'ALL RETREATS & TOURS',
      title: 'Tất Cả Gói Tour & Retreat Thượng Lưu',
      subtitle: 'Chiêm ngưỡng và trải nghiệm bộ sưu tập hành trình du lịch nghỉ dưỡng độc bản'
    };
  }, [currentPath]);

  const categories = ['All', 'Wellness', 'Luxury', 'Honeymoon', 'Family', 'Promotion', 'Domestic', 'International'];
  const countries = ['All', 'Việt Nam', 'Nhật Bản', 'Thụy Sĩ'];

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter(tour => {
      let matchesPath = true;
      if (currentPath.includes('/series-retreat/chua-lanh')) {
        matchesPath = tour.slug.includes('chua-lanh') || tour.slug.includes('binh-yen');
      } else if (currentPath.includes('/series-retreat/bao-ton')) {
        matchesPath = tour.slug.includes('bao-ton') || tour.slug.includes('tinh-lang');
      } else if (currentPath.includes('/series-retreat/thien-nhien')) {
        matchesPath = tour.category === 'Wellness' || tour.slug.includes('thien-nhien');
      } else if (currentPath.includes('/series-retreat/thien-nguyen')) {
        matchesPath = tour.slug.includes('ket-noi') || tour.category === 'Wellness';
      }

      const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || tour.country === selectedCountry;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPath && matchesCategory && matchesCountry && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [currentPath, selectedCategory, selectedCountry, searchQuery, sortBy]);

  return (
    <div style={{ backgroundColor: '#f5f3ee', color: '#1a1714', minHeight: '100vh', paddingTop: '90px', fontFamily: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      
      {/* ── LIGHTBOX MODAL ── */}
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

      {/* ── HERO BANNER ── */}
      <section style={{ position: 'relative', width: '100%', height: 'clamp(420px, 55vh, 620px)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=2560&auto=format&fit=crop"
          alt="Series Retreat Banner"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.76)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,23,20,0) 25%, rgba(26,23,20,0.78) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '820px', padding: '0 24px 56px' }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.88)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '18px', fontFamily: "'Jost', sans-serif" }}>
            <Sparkles size={13} /> {pageHeader.badge}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(38px, 5.5vw, 72px)', letterSpacing: '-0.01em', lineHeight: 1.08, margin: '0 0 18px 0', color: '#fff' }}>
            {pageHeader.title}
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'rgba(255,255,255,0.78)', margin: 0, fontWeight: 300, lineHeight: 1.65 }}>
            {pageHeader.subtitle}
          </p>
        </div>
      </section>

      {/* ── SEARCH & FILTER BAR ── */}
      <div style={{ width: '100%', padding: '40px 48px 0' }}>
        <div style={{ background: '#eae6df', border: '1px solid rgba(26,23,20,0.1)', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#7a6f63' }} />
            <input
              type="text"
              placeholder="Tìm tên tour, điểm đến..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 16px 10px 42px', border: '1px solid rgba(26,23,20,0.15)', background: '#f5f3ee', color: '#1a1714', fontSize: '13px', outline: 'none', fontFamily: "'Jost', sans-serif" }}
            />
          </div>

          {/* Country Selector */}
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid rgba(26,23,20,0.15)', background: '#f5f3ee', color: '#1a1714', fontSize: '13px', outline: 'none', fontFamily: "'Jost', sans-serif", cursor: 'pointer' }}
          >
            <option value="All">Tất cả Quốc Gia</option>
            {countries.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            style={{ padding: '10px 16px', border: '1px solid rgba(26,23,20,0.15)', background: '#f5f3ee', color: '#1a1714', fontSize: '13px', outline: 'none', fontFamily: "'Jost', sans-serif", cursor: 'pointer' }}
          >
            <option value="featured">Đặc Nổi Bật</option>
            <option value="rating">Đánh Giá Cao Nhất</option>
            <option value="priceAsc">Giá Thấp đến Cao</option>
            <option value="priceDesc">Giá Cao Xuống Thấp</option>
          </select>

        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 16px',
                border: selectedCategory === cat ? '1px solid #1a1714' : '1px solid rgba(26,23,20,0.15)',
                background: selectedCategory === cat ? '#1a1714' : 'transparent',
                color: selectedCategory === cat ? '#f5f3ee' : '#7a6f63',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'Jost', sans-serif",
                transition: 'all 0.2s ease'
              }}
            >
              {cat === 'All' ? 'Tất cả Gói Tour' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── TOURS GRID CONTAINER (FULL WIDTH 100%) ── */}
      <div style={{ width: '100%', padding: '60px 48px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '56px', paddingBottom: '20px', borderBottom: '1px solid rgba(26,23,20,0.12)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(26px, 3vw, 38px)', color: '#1a1714', margin: 0, letterSpacing: '-0.01em' }}>
            Danh Sách Series Retreat
          </h2>
          <span style={{ fontSize: '13px', fontWeight: 400, color: '#7a6f63', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {filteredTours.length} Hành Trình
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '64px 48px' }}>
          {filteredTours.map(tour => (
            <article key={tour.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Photo Frame */}
              <div
                style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', overflow: 'hidden', cursor: 'pointer', background: '#e8e4de' }}
                onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
              >
                <img
                  src={tour.heroImage}
                  alt={tour.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(26,23,20,0.72)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.92)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', padding: '5px 14px', textTransform: 'uppercase', fontFamily: "'Jost', sans-serif" }}>
                  {tour.city}, {tour.country}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGalleryTour(tour);
                    setActivePhotoIndex(0);
                  }}
                  style={{ position: 'absolute', bottom: '14px', right: '14px', zIndex: 2, background: 'rgba(245,243,238,0.85)', backdropFilter: 'blur(10px)', border: 'none', color: '#1a1714', padding: '6px 14px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Jost', sans-serif" }}
                >
                  <Images size={12} /> Bộ Ảnh
                </button>
              </div>

              {/* Text Body Below Image */}
              <div style={{ padding: '22px 0 0 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a6f63', margin: '0 0 10px 0', fontFamily: "'Jost', sans-serif" }}>
                  {tour.city}, {tour.country}
                </p>

                <h3
                  onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px, 2.2vw, 30px)', color: '#1a1714', margin: '0 0 12px 0', lineHeight: 1.2, cursor: 'pointer', transition: 'color 0.2s ease' }}
                >
                  {tour.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#6b5e52', margin: '0 0 18px 0', lineHeight: 1.65, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {tour.subtitle}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px', color: '#7a6f63', fontSize: '13px', fontWeight: 400 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} />{tour.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={13} fill="currentColor" />{tour.rating}
                  </span>
                </div>

                <p style={{ fontSize: '15px', fontWeight: 500, color: '#1a1714', marginBottom: '20px', letterSpacing: '0.02em' }}>
                  {tour.price.toLocaleString('vi-VN')} VND
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingTop: '18px', borderTop: '1px solid rgba(26,23,20,0.1)', marginTop: 'auto' }}>
                  <button
                    onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                    style={{ background: 'transparent', color: '#1a1714', border: 'none', padding: 0, fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    Khám Phá {tour.title} <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={onOpenBooking}
                    style={{ background: 'transparent', color: '#7a6f63', border: '1px solid rgba(26,23,20,0.25)', padding: '9px 20px', fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
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
