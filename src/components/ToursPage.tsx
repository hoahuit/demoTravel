import React, { useState, useMemo, useEffect } from 'react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import EmptyState from './ui/EmptyState';

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
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'blog' | 'grid'>('blog');
  const [activeGalleryTour, setActiveGalleryTour] = useState<TourPackage | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Region recognition helpers
  const NORTH_CITIES = ['Yên Tử', 'Sa Pa', 'Pù Luông', 'Vịnh Lan Hạ', 'Hải Phòng', 'Hà Giang', 'Ninh Bình', 'Hà Nội', 'Quảng Ninh', 'Ba Bể', 'Cao Bằng', 'Thanh Hóa', 'Lào Cai', 'Bắc'];
  const CENTRAL_CITIES = ['Hội An', 'Huế', 'Phú Yên', 'Vịnh Vĩnh Hy', 'Ninh Thuận', 'Đà Nẵng', 'Nha Trang', 'Khánh Hòa', 'Quy Nhơn', 'Bình Định', 'Quảng Nam', 'Quảng Trị', 'Quảng Bình', 'Cam Ranh', 'Trung'];
  const SOUTH_CITIES = ['Côn Đảo', 'Nam Cát Tiên', 'Đà Lạt', 'Hồ Lắk', 'Phú Quốc', 'TP.HCM', 'Sài Gòn', 'Đồng Nai', 'Bà Rịa - Vũng Tàu', 'Kiên Giang', 'Cần Thơ', 'Tây Ninh', 'Lâm Đồng', 'Đắk Lắk', 'Nam'];

  const isNorthCity = (city?: string): boolean => {
    if (!city) return false;
    return NORTH_CITIES.some(c => city.toLowerCase().includes(c.toLowerCase()));
  };
  const isCentralCity = (city?: string): boolean => {
    if (!city) return false;
    return CENTRAL_CITIES.some(c => city.toLowerCase().includes(c.toLowerCase()));
  };
  const isSouthCity = (city?: string): boolean => {
    if (!city) return false;
    return SOUTH_CITIES.some(c => city.toLowerCase().includes(c.toLowerCase()));
  };

  // Parse structured URL segments (e.g. /series-retreat/chua-lanh/hot, /series-retreat/bao-ton/bac, etc.)
  const parsedRoute = useMemo(() => {
    const cleanPath = currentPath.split(/[?#]/)[0].replace(/\/+$/, '');
    const segments = cleanPath.split('/').filter(Boolean);

    let series = 'All';
    let subFilter = 'all';

    if (segments[0] === 'series-retreat') {
      if (segments.length >= 2) {
        series = segments[1]; // 'chua-lanh' | 'bao-ton' | 'thien-nhien' | 'thien-nguyen'
      }
      if (segments.length >= 3) {
        subFilter = segments[2]; // 'hot' | 'moi' | 'last-minute' | 'bac' | 'trung' | 'nam'
      }
    } else if (segments[0] === 'diem-den' || segments[0] === 'kham-pha-diem-den') {
      series = 'All';
      if (segments.length >= 2) {
        subFilter = segments[1]; // 'bac' | 'trung' | 'nam'
      }
    } else if (segments.length >= 2 && ['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(segments[0])) {
      series = segments[0];
      subFilter = segments[1];
    } else if (segments.length === 1 && ['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(segments[0])) {
      series = segments[0];
    }

    return { series, subFilter, segments };
  }, [currentPath]);

  // Compute Page Header details dynamically based on active route path
  const pageHeader = useMemo(() => {
    const { series, subFilter } = parsedRoute;

    const SERIES_NAMES: Record<string, { name: string; hero: string; desc: string }> = {
      'chua-lanh': {
        name: 'Retreat Chữa Lành',
        hero: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=85&w=2560&auto=format&fit=crop',
        desc: 'Hành trình buông bỏ âu lo, nuôi dưỡng năng lượng bình an và phục hồi Thân · Tâm · Trí.'
      },
      'bao-ton': {
        name: 'Retreat Bảo Tồn',
        hero: 'https://images.unsplash.com/photo-1511497584788-876761c119ef?q=85&w=2560&auto=format&fit=crop',
        desc: 'Những chuyến thám hiểm rừng già nguyên sinh và chung tay bảo tồn hệ sinh thái tự nhiên.'
      },
      'thien-nhien': {
        name: 'Retreat Thiên Nhiên',
        hero: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop',
        desc: 'Tắm rừng Shinrin-Yoku, hòa mình giữa non xanh nước biếc và biển hồ ngọc bích.'
      },
      'thien-nguyen': {
        name: 'Retreat Thiện Nguyện',
        hero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=2560&auto=format&fit=crop',
        desc: 'Hành trình ý nghĩa lan tỏa yêu thương, gieo mầm tri thức và giao lưu văn hóa bản địa.'
      }
    };

    const SUB_NAMES: Record<string, { label: string; tag: string }> = {
      'hot': { label: 'Đang Được Yêu Thích Nhất (HOT)', tag: 'RETREAT HOT' },
      'moi': { label: 'Mới Ra Mắt (NEW)', tag: 'RETREAT MỚI' },
      'new': { label: 'Mới Ra Mắt (NEW)', tag: 'RETREAT MỚI' },
      'last-minute': { label: 'Ưu Đãi Giờ Chót (Last Minute)', tag: 'GIỜ CHÓT' },
      'uu-dai-gio-chot': { label: 'Ưu Đãi Giờ Chót (Last Minute)', tag: 'GIỜ CHÓT' },
      'bac': { label: 'Khu Vực Miền Bắc', tag: 'MIỀN BẮC' },
      'trung': { label: 'Khu Vực Miền Trung', tag: 'MIỀN TRUNG' },
      'nam': { label: 'Khu Vực Miền Nam', tag: 'MIỀN NAM' },
    };

    if (series !== 'All' && SERIES_NAMES[series]) {
      const sInfo = SERIES_NAMES[series];
      if (subFilter !== 'all' && SUB_NAMES[subFilter]) {
        const subInfo = SUB_NAMES[subFilter];
        return {
          badge: `SERIES RETREAT · ${sInfo.name.toUpperCase()} · ${subInfo.tag}`,
          title: `${sInfo.name} — ${subInfo.label}`,
          subtitle: sInfo.desc,
          heroImage: sInfo.hero
        };
      }
      return {
        badge: `SERIES RETREAT · ${sInfo.name.toUpperCase()}`,
        title: sInfo.name,
        subtitle: sInfo.desc,
        heroImage: sInfo.hero
      };
    }

    if (subFilter !== 'all' && SUB_NAMES[subFilter]) {
      const subInfo = SUB_NAMES[subFilter];
      return {
        badge: `KHÁM PHÁ ĐIỂM ĐẾN · ${subInfo.tag}`,
        title: `Điểm Đến Retreat — ${subInfo.label}`,
        subtitle: `Tuyển tập các tọa độ nghỉ dưỡng & tĩnh dưỡng chữa lành độc bản tại ${subInfo.label}.`,
        heroImage: subFilter === 'bac'
          ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop'
          : subFilter === 'trung'
          ? 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=85&w=2560&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1511497584788-876761c119ef?q=85&w=2560&auto=format&fit=crop'
      };
    }

    if (currentPath.includes('/retreat/docquyen') || currentPath.includes('/retreats-doc-quyen')) {
      return {
        badge: 'RETREATS ĐỘC QUYỀN · EXCLUSIVE',
        title: 'Bộ Sưu Tập Retreat Độc Bản 4U Wellness',
        subtitle: 'Hành trình tĩnh lặng, chăm sóc Thân - Tâm - Trí giữa đại ngàn Nam Cát Tiên & Hồ Lắk',
        heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=2560&auto=format&fit=crop'
      };
    }
    if (currentPath.includes('/retreat/retreathot') || currentPath.includes('/retreat-hot')) {
      return {
        badge: 'RETREAT HOT SHOWCASE',
        title: 'Bộ Sưu Tập Retreats Hot & Nổi Bật',
        subtitle: 'Những hành trình đang được đông đảo du khách yêu thích và đặt nhiều nhất',
        heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=85&w=2560&auto=format&fit=crop'
      };
    }
    if (currentPath.includes('/retreat/sapkhoihanh') || currentPath.includes('/sap-khoi-hanh')) {
      return {
        badge: 'LỊCH KHỞI HÀNH GẦN NHẤT',
        title: 'Các Gói Retreat Sắp Khởi Hành',
        subtitle: 'Nhanh tay giữ chỗ cho những chuyến đi đã có lịch trình ấn định trong tháng',
        heroImage: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=85&w=2560&auto=format&fit=crop'
      };
    }
    if (currentPath.includes('/retreat/khongthebolo') || currentPath.includes('/khong-the-khong-co')) {
      return {
        badge: 'KHÔNG THỂ BỎ LỠ',
        title: 'Trải Nghiệm Retreat Không Thể Bỏ Lỡ',
        subtitle: 'Tuyển tập những tour nghỉ dưỡng chữa lành được đánh giá tuyệt đối từ du khách',
        heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=85&w=2560&auto=format&fit=crop'
      };
    }
    if (currentPath.includes('/retreat/uudaigiochot') || currentPath.includes('/uu-dai-gio-chot') || currentPath.includes('/uu-dai') || currentPath.includes('/promotions')) {
      return {
        badge: 'ƯU ĐÃI GIỜ CHÓT · PROMOTIONS',
        title: 'Ưu Đãi Giờ Chót — Gói Retreat Đặc Quyền',
        subtitle: 'Cơ hội sở hữu chuyến nghỉ dưỡng 5 sao với mức giá ưu đãi tốt nhất',
        heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=85&w=2560&auto=format&fit=crop'
      };
    }
    if (currentPath.includes('/kollection-4u')) {
      return {
        badge: 'KOLLECTION 4U · MAGAZINE SHOWCASE',
        title: 'Bộ Sưu Tập Kollection 4U Luxuries',
        subtitle: 'Những trải nghiệm nghỉ dưỡng độc bản được tuyển chọn khắt khe nhất dành cho khách hàng cao cấp',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2560&auto=format&fit=crop'
      };
    }
    return {
      badge: 'SERIES RETREAT · TRAVEL JOURNAL & PRODUCT SHOWCASE',
      title: 'Series Retreat — Tạp Chí Du Lịch & Hành Trình Độc Bản',
      subtitle: 'Mỗi gói Retreat là một câu chuyện du lịch giàu cảm xúc — vừa giới thiệu sản phẩm cao cấp vừa truyền cảm hứng phục hồi Thân · Tâm · Trí.',
      heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=85&w=2560&auto=format&fit=crop'
    };
  }, [parsedRoute, currentPath]);

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

  // Match Series Type Helper
  const matchSeriesType = (tour: any, targetType: string): boolean => {
    if (!targetType || targetType === 'All' || targetType === 'all') return true;
    const cats = Array.isArray(tour.categories) ? tour.categories : [];
    if (cats.includes(targetType)) return true;
    if (tour.category && tour.category.toLowerCase().includes(targetType)) return true;
    if (targetType === 'chua-lanh' && (tour.category === 'Healing' || tour.category === 'Wellness' || cats.includes('Wellness'))) return true;
    if (targetType === 'bao-ton' && (tour.category === 'Conservation' || cats.includes('Conservation') || cats.includes('Heritage'))) return true;
    if (targetType === 'thien-nhien' && (tour.category === 'Nature' || cats.includes('Nature'))) return true;
    if (targetType === 'thien-nguyen' && (tour.category === 'Volunteer' || cats.includes('Volunteer'))) return true;
    return false;
  };

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    const { series: routeSeries, subFilter } = parsedRoute;
    const targetSeries = selectedSeries !== 'All' ? selectedSeries : routeSeries;

    const list = tours.filter(tour => {
      // 1. Match Series
      const matchesSeries = matchSeriesType(tour, targetSeries);

      // 2. Match Sub Filter
      let matchesSub = true;
      if (subFilter !== 'all' && subFilter !== 'All') {
        if (subFilter === 'hot') {
          matchesSub = tour.isHot === true || (Array.isArray(tour.categories) && (tour.categories.includes('hot') || tour.categories.includes('retreat-hot')));
        } else if (subFilter === 'moi' || subFilter === 'new') {
          matchesSub = tour.isNew === true || (Array.isArray(tour.categories) && (tour.categories.includes('moi') || tour.categories.includes('new')));
        } else if (subFilter === 'last-minute' || subFilter === 'uu-dai-gio-chot') {
          matchesSub = tour.isPromotion === true || ((tour.originalPrice || 0) > (tour.price || 0)) || (Array.isArray(tour.categories) && (tour.categories.includes('last-minute') || tour.categories.includes('uu-dai-gio-chot')));
        } else if (subFilter === 'bac') {
          matchesSub = tour.region === 'bac' || isNorthCity(tour.city) || (Array.isArray(tour.categories) && (tour.categories.includes('bac') || tour.categories.includes('mien-bac')));
        } else if (subFilter === 'trung') {
          matchesSub = tour.region === 'trung' || isCentralCity(tour.city) || (Array.isArray(tour.categories) && (tour.categories.includes('trung') || tour.categories.includes('mien-trung')));
        } else if (subFilter === 'nam') {
          matchesSub = tour.region === 'nam' || isSouthCity(tour.city) || (Array.isArray(tour.categories) && (tour.categories.includes('nam') || tour.categories.includes('mien-nam')));
        }
      }

      // 3. Match specific legacy routes
      let matchesLegacy = true;
      if (currentPath.includes('/retreat/docquyen') || currentPath.includes('/retreats-doc-quyen')) {
        matchesLegacy = tour.isExclusive === true || (Array.isArray(tour.categories) && tour.categories.includes('doc-quyen'));
      } else if (currentPath.includes('/retreat/retreathot') || currentPath.includes('/retreat-hot')) {
        matchesLegacy = tour.isHot === true || (Array.isArray(tour.categories) && (tour.categories.includes('retreat-hot') || tour.categories.includes('hot')));
      } else if (currentPath.includes('/retreat/sapkhoihanh') || currentPath.includes('/sap-khoi-hanh')) {
        matchesLegacy = (Array.isArray(tour.departureDates) && tour.departureDates.length > 0) || (Array.isArray(tour.categories) && tour.categories.includes('sap-khoi-hanh'));
      } else if (currentPath.includes('/retreat/khongthebolo') || currentPath.includes('/khong-the-khong-co')) {
        matchesLegacy = tour.isFeatured === true || (Array.isArray(tour.categories) && tour.categories.includes('khong-the-bo-lo'));
      } else if (currentPath.includes('/retreat/uudaigiochot') || currentPath.includes('/uu-dai-gio-chot') || currentPath.includes('/uu-dai') || currentPath.includes('/promotions')) {
        matchesLegacy = tour.isPromotion === true || ((tour.originalPrice || 0) > (tour.price || 0)) || (Array.isArray(tour.categories) && tour.categories.includes('uu-dai-gio-chot'));
      }

      const matchesCity = selectedCity === 'All' || (tour.city && tour.city.includes(selectedCity));
      const matchesSearch =
        searchQuery.trim() === '' ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tour.blogStorySnippet && tour.blogStorySnippet.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSeries && matchesSub && matchesLegacy && matchesCity && matchesSearch;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [tours, currentPath, parsedRoute, selectedSeries, selectedCity, searchQuery, sortBy]);

  const featuredTour = useMemo(() => {
    return filteredTours.find(t => t.isFeatured) || filteredTours[0] || tours[0];
  }, [filteredTours, tours]);

  const activeSeriesKey = parsedRoute.series !== 'All' ? parsedRoute.series : (selectedSeries !== 'All' ? selectedSeries : null);

  return (
    <div style={{ backgroundColor: '#e5efe8', color: '#1a1714', minHeight: '100vh', paddingTop: '0', fontFamily: "'Be Vietnam Pro', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", width: '100%', overflowX: 'hidden' }}>

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
              src={getImageUrl(activeGalleryTour.gallery[activePhotoIndex] || activeGalleryTour.heroImage)}
              alt={activeGalleryTour.title}
              style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '8px', marginBottom: '20px' }}
            />
            <p style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,243,238,0.7)', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              {activeGalleryTour.title} — Ảnh danh lam {activePhotoIndex + 1} / {activeGalleryTour.gallery.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', overflowX: 'auto', padding: '8px' }}>
              {activeGalleryTour.gallery.map((img, idx) => (
                <img
                  key={idx} src={getImageUrl(img)} alt="Thumb"
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
          src={getImageUrl(pageHeader.heroImage || featuredTour?.heroImage || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop")}
          alt={pageHeader.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.62)', transition: 'src 0.5s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,12,9,0.25) 0%, rgba(15,12,9,0.88) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '1200px', padding: '110px 4vw 0' }}>
          {/* Badge: PURE YELLOW TEXT WITHOUT DARK BACKGROUND BOX */}
          <div style={{ display: 'inline-block', color: '#facc15', fontSize: '14px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '22px', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
            <span>{pageHeader.badge}</span>
          </div>

          {/* Title: HIGH CONTRAST GOLDEN GRADIENT */}
          <h1 style={{
            fontWeight: 800,
            fontSize: '40px',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 20px 0',
            color: '#facc15',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffe066 40%, #facc15 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.95))',
            wordBreak: 'break-word'
          }}>
            {pageHeader.title}
          </h1>

          <p style={{ fontSize: '17px', color: '#ffffff', margin: '0 auto 28px', fontWeight: 400, lineHeight: 1.7, maxWidth: '860px', textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}>
            {pageHeader.subtitle}
          </p>

        </div>
      </section>

      {/* ── 100% FULL-WIDTH FILTER & NAVIGATION BAR ── */}
      <div style={{ width: '100%', margin: '0', padding: '40px 48px 0', boxSizing: 'border-box' }}>

        {/* Sub-Filter Quick Selection Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', width: '100%' }}>
          {/* Submenu Criteria Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1714', marginRight: '4px' }}>
              Tiêu chí:
            </span>
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'hot', label: 'Retreat Hot' },
              { id: 'moi', label: 'Retreat Mới' },
              { id: 'last-minute', label: 'Ưu Đãi Giờ Chót' },
              { id: 'bac', label: 'Miền Bắc' },
              { id: 'trung', label: 'Miền Trung' },
              { id: 'nam', label: 'Miền Nam' },
            ].map((subItem) => {
              const currentSub = parsedRoute.subFilter || 'all';
              const isSelected = currentSub === subItem.id || (subItem.id === 'all' && (currentSub === 'all' || !currentSub));
              const targetSeries = parsedRoute.series !== 'All' ? parsedRoute.series : (selectedSeries !== 'All' ? selectedSeries : 'chua-lanh');
              const targetUrl = subItem.id === 'all' ? `/series-retreat/${targetSeries}` : `/series-retreat/${targetSeries}/${subItem.id}`;

              return (
                <button
                  key={subItem.id}
                  onClick={() => {
                    onNavigate(targetUrl);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: isSelected ? '1.5px solid #059669' : '1px solid rgba(26,23,20,0.12)',
                    background: isSelected ? '#059669' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1a1714',
                    fontSize: '13px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(5,150,105,0.28)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.color = '#059669';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(26,23,20,0.12)';
                      e.currentTarget.style.color = '#1a1714';
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                >
                  <span>{subItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f2eee7', borderRadius: '14px', padding: '4px', border: '1px solid rgba(26,23,20,0.08)' }}>
            <button
              onClick={() => setViewMode('blog')}
              title="Dạng Blog Tạp Chí"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '10px', border: 'none',
                background: viewMode === 'blog' ? '#1a1714' : 'transparent',
                color: viewMode === 'blog' ? '#f7f5f0' : '#7a6f63',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              Dạng Blog
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Dạng Thẻ Du Lịch"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '10px', border: 'none',
                background: viewMode === 'grid' ? '#1a1714' : 'transparent',
                color: viewMode === 'grid' ? '#f7f5f0' : '#7a6f63',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              Dạng Thẻ
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN 100% TRUE EDGE-TO-EDGE SERIES RETREAT BLOG FEED ── */}
      <main style={{ width: '100%', margin: '0', padding: '20px 0 100px', boxSizing: 'border-box' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '44px', padding: '0 48px 18px 48px', borderBottom: '1px solid rgba(26,23,20,0.1)' }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(30px, 3.2vw, 44px)', color: '#1a1714', margin: 0, letterSpacing: '-0.01em' }}>
              {selectedSeries === 'All' ? 'Tất cả bài viết danh lam Series Retreat' : `Danh sách — ${seriesCategories.find(s => s.id === selectedSeries)?.label}`}
            </h2>
            <p style={{ fontSize: '14px', color: '#7a6f63', margin: '6px 0 0 0', fontWeight: 300 }}>
              Mỗi bài viết giới thiệu một danh lam thắng cảnh hoang sơ kết hợp nghệ thuật phục hồi sức khỏe Thân · Tâm · Trí.
            </p>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#c89d54', background: '#faf3e6', padding: '7px 20px', borderRadius: '20px' }}>
            {filteredTours.length} hành trình & danh lam
          </span>
        </div>

        {/* IF NO RESULTS */}
        {filteredTours.length === 0 && (
          <EmptyState
            title="Không tìm thấy điểm đến phù hợp"
            description="Rất tiếc, chưa có bài viết hoặc tour retreat nào phù hợp với bộ lọc của bạn. Hãy thử chọn danh mục hoặc tìm kiếm khác."
            actionLabel="Đặt Lại Bộ Lọc"
            onAction={() => { setSelectedSeries('All'); setSelectedCity('All'); setSearchQuery(''); }}
            transparent={true}
          />
        )}

        {/* ── LAYOUT MODE A: DẠNG BLOG V0 / BASEHUB EDITORIAL (FEATURED + MORE POSTS GRID + NEWSLETTER) ── */}
        {viewMode === 'blog' && (
          <div style={{ width: '100%', margin: '0' }}>
            {/* FEATURED POST (FIRST TOUR) - TRUE 100% EDGE TO EDGE COVER */}
            {filteredTours.length > 0 && (() => {
              const feat = filteredTours[0];
              return (
                <section style={{ marginBottom: '80px', width: '100%' }}>
                  {/* Hero Cover Image (100% Edge-to-Edge) */}
                  <div style={{ marginBottom: '32px', width: '100%' }}>
                    <div
                      onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                      style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '0px', width: '100%' }}
                    >
                      <img
                        src={getImageUrl(feat.heroImage)}
                        alt={feat.title}
                        style={{
                          width: '100%',
                          maxHeight: '75vh',
                          minHeight: '420px',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>

                  {/* 2-Column Details Grid (Padding 48px) */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px 36px', alignItems: 'start', padding: '0 48px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#8c8275', marginBottom: '12px', letterSpacing: '0.04em' }}>
                        {feat.city} • {feat.duration} • Rating: {feat.rating}
                      </div>
                      <h2
                        onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                        style={{
                          fontSize: '30px',
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
                      <div style={{ fontSize: '17px', color: '#7a6f63', marginBottom: '16px' }}>
                        Khởi hành gần nhất: <strong style={{ color: '#1a1714' }}>{feat.departureDates ? feat.departureDates[0] : 'Hàng tuần'}</strong>
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#4a4238', marginBottom: '24px', fontWeight: 400 }}>
                        {feat.blogStorySnippet || feat.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(26,23,20,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <img
                            src={getImageUrl(feat.gallery && feat.gallery[0] ? feat.gallery[0] : feat.heroImage)}
                            alt={feat.blogAuthor || 'Guide'}
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontSize: '17px', fontWeight: 700, color: '#1a1714' }}>{feat.blogAuthor || '4U Wellness Team'}</div>
                            <div style={{ fontSize: '14px', color: '#8c8275' }}>{feat.blogReadTime || '5 phút đọc'} • Biên tập viên</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '18px', fontWeight: 800, color: '#006d36' }}>{feat.price.toLocaleString('vi-VN')} VNĐ</span>
                          <button
                            onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                            style={{ background: '#1a1714', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                          >
                            Xem Chi Tiết
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
              <section style={{ padding: '0 48px', marginTop: '72px', paddingTop: '48px', borderTop: '1px solid rgba(26, 23, 20, 0.12)' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1714', marginBottom: '36px' }}>
                  Hành trình tiếp theo (More Retreats)
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px 36px', marginBottom: '80px' }}>
                  {filteredTours.slice(1).map((tour) => (
                    <article key={tour.id} style={{ display: 'flex', flexDirection: 'column' }}>
                      {/* Image aspect-video */}
                      <div
                        onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                        style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', aspectRatio: '16 / 9' }}
                      >
                        <img
                          src={getImageUrl(tour.heroImage)}
                          alt={tour.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>

                      <h3
                        onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                        style={{ fontSize: '30px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, color: '#1a1714', margin: '0 0 12px 0', cursor: 'pointer', wordBreak: 'break-word' }}
                      >
                        {tour.title}
                      </h3>

                      <div style={{ fontSize: '14px', color: '#8c8275', marginBottom: '14px', fontWeight: 500 }}>
                        {tour.city} • {tour.duration} • Rating: {tour.rating}
                      </div>

                      <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#574e44', marginBottom: '20px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {tour.blogStorySnippet || tour.subtitle}
                      </p>

                      {/* Author + CTA */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(26,23,20,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={getImageUrl(tour.gallery && tour.gallery[0] ? tour.gallery[0] : tour.heroImage)}
                            alt={tour.blogAuthor || 'Guide'}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                          />

                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1714' }}>
                            {tour.blogAuthor || '4U Editorial'}
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '17px', fontWeight: 800, color: '#006d36', display: 'block' }}>
                            {tour.price.toLocaleString('vi-VN')} VNĐ
                          </span>
                          <button
                            onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                            style={{ background: 'transparent', color: '#1a1714', border: 'none', padding: 0, fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', marginTop: '2px' }}
                          >
                            Khám Phá
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px 36px', padding: '0 48px', width: '100%', boxSizing: 'border-box' }}>
            {filteredTours.map(tour => (
              <article key={tour.id} style={{ background: '#dce7df', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(26,23,20,0.06)', border: '1px solid rgba(45,90,54,0.18)', display: 'flex', flexDirection: 'column' }}>

                {/* Photo Frame (Scenic Landscape) */}
                <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  <img src={getImageUrl(tour.heroImage)} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(26,23,20,0.85)', color: '#f7f5f0', fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em', padding: '5px 14px', borderRadius: '16px' }}>

                    {tour.city}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveGalleryTour(tour); setActivePhotoIndex(0); }}
                    style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'rgba(255,255,255,0.9)', border: 'none', color: '#1a1714', padding: '6px 14px', borderRadius: '16px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    Bộ Ảnh
                  </button>
                </div>

                {/* Card Content */}
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', color: '#8c8275', marginBottom: '12px' }}>
                      <span>{tour.duration}</span>
                      <span style={{ color: '#c89d54', fontWeight: 600 }}>Rating: {tour.rating}</span>
                    </div>

                    <h3
                      onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                      style={{
                        fontSize: '30px',
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

                    <p style={{ fontSize: '17px', color: '#6b5e52', margin: '0 0 18px 0', lineHeight: 1.6, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {tour.subtitle}
                    </p>
                  </div>

                  <div style={{ paddingTop: '18px', borderTop: '1px solid rgba(26,23,20,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '18px', fontWeight: 600, color: '#1a1714' }}>
                      {tour.price.toLocaleString('vi-VN')} VNĐ
                    </span>

                    <button
                      onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                      style={{ background: '#1a1714', color: '#f7f5f0', border: 'none', padding: '9px 18px', borderRadius: '20px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      Chi Tiết
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

      </main>

      {/* ── TRAVELER TIPS & EXPERT EDITORIAL NOTES FULL-WIDTH SECTION ── */}
      <section style={{ background: '#e5efe8', padding: '88px 4vw', borderTop: '1px solid rgba(26,23,20,0.08)', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1e4a3d', marginBottom: '12px', display: 'block' }}>
            ✦ CẨM NANG & KINH NGHIỆM RETREAT
          </span>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1a1714', margin: '0 0 16px 0' }}>
            Kinh nghiệm & lời khuyên cho chuyến đi retreat đầu tiên
          </h2>
          <p style={{ fontSize: '17px', color: '#6b5e52', maxWidth: '780px', margin: '0 auto 52px', fontWeight: 300, lineHeight: 1.65 }}>
            Tổng hợp chia sẻ từ các chuyên gia chăm sóc sức khỏe & biên tập viên du lịch 4U giúp bạn có sự chuẩn bị trọn vẹn nhất khi về với thiên nhiên.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', textAlign: 'left', width: '100%' }}>
            <div style={{ background: '#dce7df', borderRadius: '20px', padding: '36px', border: '1px solid rgba(45,90,54,0.18)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '30px', fontWeight: 700, color: '#1a1714', margin: '0 0 12px 0' }}>
                Thiền chuông xoay tác dụng thế nào?
              </h3>
              <p style={{ fontSize: '17px', color: '#6b5e52', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                Tần số âm thanh 432Hz từ chuông xoay Tây Tạng tác động trực tiếp lên hệ thần kinh, giúp đưa não bộ về trạng thái thư giãn sâu và giải tỏa căng thẳng sau vài phút.
              </p>
            </div>

            <div style={{ background: '#dce7df', borderRadius: '20px', padding: '36px', border: '1px solid rgba(45,90,54,0.18)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '30px', fontWeight: 700, color: '#1a1714', margin: '0 0 12px 0' }}>
                Nghệ thuật tắm rừng Shinrin-Yoku
              </h3>
              <p style={{ fontSize: '17px', color: '#6b5e52', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                Đi bộ chậm rãi giữa rừng đại ngàn, hít thở Phytoncides (hợp chất kháng sinh tự nhiên do thực vật tiết ra) giúp tăng cường sức đề kháng và thanh lọc lá phổi.
              </p>
            </div>

            <div style={{ background: '#dce7df', borderRadius: '20px', padding: '36px', border: '1px solid rgba(45,90,54,0.18)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '30px', fontWeight: 700, color: '#1a1714', margin: '0 0 12px 0' }}>
                Chuẩn bị tâm lý buông bỏ digital
              </h3>
              <p style={{ fontSize: '17px', color: '#6b5e52', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                Để đạt hiệu quả phục hồi cao nhất, hãy tạm gác các thông báo công việc, dành trọn 100% sự hiện diện cho thiên nhiên, bản thân và những người đồng hành.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
