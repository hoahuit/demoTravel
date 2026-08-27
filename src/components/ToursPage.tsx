import React, { useState, useMemo, useEffect } from 'react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import EmptyState from './ui/EmptyState';
import './ToursPage.css';

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

  // Parse structured URL segments (e.g. /series-retreat/chua-lanh/hot, /series-retreat/bac/hot, etc.)
  const parsedRoute = useMemo(() => {
    const cleanPath = currentPath.split(/[?#]/)[0].replace(/\/+$/, '');
    const segments = cleanPath.split('/').filter(Boolean);

    let series = 'All';
    let subFilter = 'all';
    let region = 'all';

    if (segments[0] === 'series-retreat') {
      if (segments.length >= 2) {
        if (['bac', 'trung', 'nam'].includes(segments[1])) {
          region = segments[1];
          series = 'All';
          if (segments.length >= 3) {
            subFilter = segments[2]; // 'hot' | 'moi' | 'last-minute'
          }
        } else {
          series = segments[1]; // 'chua-lanh' | 'bao-ton' | 'thien-nhien' | 'thien-nguyen'
          if (segments.length >= 3) {
            subFilter = segments[2]; // 'hot' | 'moi' | 'last-minute' | 'bac' | 'trung' | 'nam'
          }
        }
      }
    } else if (segments[0] === 'diem-den' || segments[0] === 'kham-pha-diem-den') {
      series = 'All';
      if (segments.length >= 2) {
        region = segments[1]; // 'bac' | 'trung' | 'nam'
        if (segments.length >= 3) {
          subFilter = segments[2]; // 'hot' | 'moi' | 'last-minute'
        } else {
          subFilter = segments[1];
        }
      }
    } else if (segments.length >= 2 && ['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(segments[0])) {
      series = segments[0];
      subFilter = segments[1];
    } else if (segments.length === 1 && ['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(segments[0])) {
      series = segments[0];
    }

    return { series, subFilter, region, segments };
  }, [currentPath]);

  // Compute Page Header details dynamically based on active route path
  const pageHeader = useMemo(() => {
    const { series, subFilter, region } = parsedRoute;

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

    const REGION_NAMES: Record<string, { label: string; tag: string; hero: string }> = {
      'bac': {
        label: 'Miền Bắc',
        tag: 'MIỀN BẮC',
        hero: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop'
      },
      'trung': {
        label: 'Miền Trung',
        tag: 'MIỀN TRUNG',
        hero: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=85&w=2560&auto=format&fit=crop'
      },
      'nam': {
        label: 'Miền Nam',
        tag: 'MIỀN NAM',
        hero: 'https://images.unsplash.com/photo-1511497584788-876761c119ef?q=85&w=2560&auto=format&fit=crop'
      }
    };

    // Region + SubFilter (e.g. /series-retreat/bac/hot or /diem-den/bac/hot)
    if (region !== 'all' && REGION_NAMES[region]) {
      const regInfo = REGION_NAMES[region];
      if (subFilter !== 'all' && SUB_NAMES[subFilter]) {
        const subInfo = SUB_NAMES[subFilter];
        return {
          badge: `KHÁM PHÁ ĐIỂM ĐẾN · ${regInfo.tag} · ${subInfo.tag}`,
          title: `Retreat ${subInfo.tag} — ${regInfo.label}`,
          subtitle: `Tuyển tập các hành trình nghỉ dưỡng ${subInfo.label.toLowerCase()} tại các tọa độ danh thắng ${regInfo.label}.`,
          heroImage: regInfo.hero
        };
      }
      return {
        badge: `KHÁM PHÁ ĐIỂM ĐẾN · ${regInfo.tag}`,
        title: `Điểm Đến Retreat — ${regInfo.label}`,
        subtitle: `Tuyển tập các tọa độ nghỉ dưỡng & tĩnh dưỡng chữa lành độc bản tại ${regInfo.label}.`,
        heroImage: regInfo.hero
      };
    }

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
    const { series: routeSeries, subFilter, region } = parsedRoute;
    const targetSeries = selectedSeries !== 'All' ? selectedSeries : routeSeries;

    const list = tours.filter(tour => {
      // 1. Match Series
      const matchesSeries = matchSeriesType(tour, targetSeries);

      // 2. Match Region
      let matchesRegion = true;
      if (region && region !== 'all') {
        if (region === 'bac') {
          matchesRegion = tour.region === 'bac' || isNorthCity(tour.city) || (Array.isArray(tour.categories) && (tour.categories.includes('bac') || tour.categories.includes('mien-bac')));
        } else if (region === 'trung') {
          matchesRegion = tour.region === 'trung' || isCentralCity(tour.city) || (Array.isArray(tour.categories) && (tour.categories.includes('trung') || tour.categories.includes('mien-trung')));
        } else if (region === 'nam') {
          matchesRegion = tour.region === 'nam' || isSouthCity(tour.city) || (Array.isArray(tour.categories) && (tour.categories.includes('nam') || tour.categories.includes('mien-nam')));
        }
      }

      // 3. Match Sub Filter
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
        matchesLegacy = tour.isFeatured === true || (Array.isArray(tour.categories) && tour.categories.includes('sap-khoi-hanh'));
      } else if (currentPath.includes('/retreat/khongthebolo') || currentPath.includes('/khong-the-khong-co')) {
        matchesLegacy = tour.isHot === true || (Array.isArray(tour.categories) && (tour.categories.includes('khong-the-bo-lo') || tour.categories.includes('hot')));
      } else if (currentPath.includes('/retreat/uudaigiochot') || currentPath.includes('/uu-dai-gio-chot') || currentPath.includes('/uu-dai') || currentPath.includes('/promotions')) {
        matchesLegacy = tour.isPromotion === true || ((tour.originalPrice || 0) > (tour.price || 0)) || (Array.isArray(tour.categories) && (tour.categories.includes('uu-dai-gio-chot') || tour.categories.includes('last-minute')));
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
    <div className="tours-page-root">

      {/* ── LIGHTBOX MODAL ── */}
      {activeGalleryTour && (
        <div
          className="tours-lightbox-overlay"
          onClick={() => setActiveGalleryTour(null)}
        >
          <button
            onClick={() => setActiveGalleryTour(null)}
            className="tours-lightbox-close-btn"
          >
            <X size={20} />
          </button>

          <div onClick={e => e.stopPropagation()} className="tours-lightbox-content">
            <img
              src={getImageUrl(activeGalleryTour.gallery[activePhotoIndex] || activeGalleryTour.heroImage)}
              alt={activeGalleryTour.title}
              className="tours-lightbox-main-img"
            />
            <p className="tours-lightbox-caption">
              {activeGalleryTour.title} — Ảnh danh lam {activePhotoIndex + 1} / {activeGalleryTour.gallery.length}
            </p>
            <div className="tours-lightbox-thumbs">
              {activeGalleryTour.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt="Thumb"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`tours-lightbox-thumb ${activePhotoIndex === idx ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── EDITORIAL FULL-WIDTH HERO BANNER ── */}
      <section className="tours-hero-section">
        <img
          src={getImageUrl(pageHeader.heroImage || featuredTour?.heroImage || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=2560&auto=format&fit=crop")}
          alt={pageHeader.title}
          className="tours-hero-bg-img"
        />
        <div className="tours-hero-gradient" />

        <div className="tours-hero-content">
          <div className="tours-hero-badge">
            <span>{pageHeader.badge}</span>
          </div>

          <h1 className="tours-hero-title">
            {pageHeader.title}
          </h1>

          <p className="tours-hero-subtitle">
            {pageHeader.subtitle}
          </p>

        </div>
      </section>

      {/* ── 100% FULL-WIDTH FILTER & NAVIGATION BAR ── */}
      <div className="tours-filter-container">

        {/* Sub-Filter Quick Selection Bar */}
        <div className="tours-filter-row">
          {/* Submenu Criteria Pills */}
          <div className="tours-criteria-wrap">
            <span className="tours-criteria-label">
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
                  className={`tours-filter-pill ${isSelected ? 'active' : ''}`}
                >
                  <span>{subItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div className="tours-view-mode-group">
            <button
              onClick={() => setViewMode('blog')}
              title="Dạng Blog Tạp Chí"
              className={`tours-view-mode-btn ${viewMode === 'blog' ? 'active' : ''}`}
            >
              Dạng Blog
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Dạng Thẻ Du Lịch"
              className={`tours-view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              Dạng Thẻ
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN 100% TRUE EDGE-TO-EDGE SERIES RETREAT BLOG FEED ── */}
      <main className="tours-feed-main">

        <div className="tours-feed-header">
          <div>
            <h2 className="tours-feed-title">
              {selectedSeries === 'All' ? 'Tất cả bài viết danh lam Series Retreat' : `Danh sách — ${seriesCategories.find(s => s.id === selectedSeries)?.label}`}
            </h2>
            <p className="tours-feed-desc">
              Mỗi bài viết giới thiệu một danh lam thắng cảnh hoang sơ kết hợp nghệ thuật phục hồi sức khỏe Thân · Tâm · Trí.
            </p>
          </div>
          <span className="tours-feed-count-badge">
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
          <div className="tours-blog-view-wrap">
            {/* FEATURED POST (FIRST TOUR) - TRUE 100% EDGE TO EDGE COVER */}
            {filteredTours.length > 0 && (() => {
              const feat = filteredTours[0];
              return (
                <section className="tours-featured-section">
                  {/* Hero Cover Image (100% Edge-to-Edge) */}
                  <div className="tours-featured-cover-wrap">
                    <div
                      onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                      className="tours-featured-cover-inner"
                    >
                      <img
                        src={getImageUrl(feat.heroImage)}
                        alt={feat.title}
                        className="tours-featured-img"
                      />
                    </div>
                  </div>

                  {/* 2-Column Details Grid */}
                  <div className="tours-featured-grid">
                    <div>
                      <div className="tours-featured-meta">
                        {feat.city} • {feat.duration} • Rating: {feat.rating}
                      </div>
                      <h2
                        onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                        className="tours-featured-title"
                      >
                        {feat.title}
                      </h2>
                      <div className="tours-featured-dep">
                        Khởi hành gần nhất: <strong>{feat.departureDates ? feat.departureDates[0] : 'Hàng tuần'}</strong>
                      </div>
                    </div>

                    <div>
                      <p className="tours-featured-snippet">
                        {feat.blogStorySnippet || feat.subtitle}
                      </p>

                      <div className="tours-featured-footer">
                        <div className="tours-author-wrap">
                          <img
                            src={getImageUrl(feat.gallery && feat.gallery[0] ? feat.gallery[0] : feat.heroImage)}
                            alt={feat.blogAuthor || 'Guide'}
                            className="tours-author-avatar"
                          />
                          <div>
                            <div className="tours-author-name">{feat.blogAuthor || '4U Wellness Team'}</div>
                            <div className="tours-author-role">{feat.blogReadTime || '5 phút đọc'} • Biên tập viên</div>
                          </div>
                        </div>

                        <div className="tours-featured-price-group">
                          <span className="tours-featured-price">{feat.price.toLocaleString('vi-VN')} VNĐ</span>
                          <button
                            onClick={() => onNavigate(`/sanpham/${feat.slug}`)}
                            className="tours-featured-cta-btn"
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
              <section className="tours-more-section">
                <h2 className="tours-more-title">
                  Hành trình tiếp theo (More Retreats)
                </h2>

                <div className="tours-more-grid">
                  {filteredTours.slice(1).map((tour) => (
                    <article key={tour.id} className="tours-post-card">
                      {/* Image aspect-video */}
                      <div
                        onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                        className="tours-post-img-wrap"
                      >
                        <img
                          src={getImageUrl(tour.heroImage)}
                          alt={tour.title}
                          className="tours-post-img"
                        />
                      </div>

                      <h3
                        onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                        className="tours-post-title"
                      >
                        {tour.title}
                      </h3>

                      <div className="tours-post-meta">
                        {tour.city} • {tour.duration} • Rating: {tour.rating}
                      </div>

                      <p className="tours-post-snippet">
                        {tour.blogStorySnippet || tour.subtitle}
                      </p>

                      {/* Author + CTA */}
                      <div className="tours-post-footer">
                        <div className="tours-post-author-box">
                          <img
                            src={getImageUrl(tour.gallery && tour.gallery[0] ? tour.gallery[0] : tour.heroImage)}
                            alt={tour.blogAuthor || 'Guide'}
                            className="tours-post-author-avatar"
                          />

                          <div className="tours-post-author-name">
                            {tour.blogAuthor || '4U Editorial'}
                          </div>
                        </div>

                        <div className="tours-post-price-box">
                          <span className="tours-post-price">
                            {tour.price.toLocaleString('vi-VN')} VNĐ
                          </span>
                          <button
                            onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                            className="tours-post-cta-btn"
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
          <div className="tours-grid-layout">
            {filteredTours.map(tour => (
              <article key={tour.id} className="tours-grid-card">

                {/* Photo Frame (Scenic Landscape) */}
                <div className="tours-grid-photo-frame" onClick={() => onNavigate(`/sanpham/${tour.slug}`)}>
                  <img src={getImageUrl(tour.heroImage)} alt={tour.title} className="tours-grid-img" />
                  <div className="tours-grid-city-badge">
                    {tour.city}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setActiveGalleryTour(tour); setActivePhotoIndex(0); }}
                    className="tours-grid-gallery-btn"
                  >
                    Bộ Ảnh
                  </button>
                </div>

                {/* Card Content */}
                <div className="tours-grid-body">
                  <div>
                    <div className="tours-grid-meta-row">
                      <span>{tour.duration}</span>
                      <span className="tours-grid-rating">Rating: {tour.rating}</span>
                    </div>

                    <h3
                      onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                      className="tours-grid-title"
                    >
                      {tour.title}
                    </h3>

                    <p className="tours-grid-subtitle">
                      {tour.subtitle}
                    </p>
                  </div>

                  <div className="tours-grid-footer">
                    <span className="tours-grid-price">
                      {tour.price.toLocaleString('vi-VN')} VNĐ
                    </span>

                    <button
                      onClick={() => onNavigate(`/sanpham/${tour.slug}`)}
                      className="tours-grid-cta-btn"
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
      <section className="tours-tips-section">
        <div className="tours-tips-container">
          <span className="tours-tips-eyebrow">
            ✦ CẨM NANG & KINH NGHIỆM RETREAT
          </span>
          <h2 className="tours-tips-title">
            Kinh nghiệm & lời khuyên cho chuyến đi retreat đầu tiên
          </h2>
          <p className="tours-tips-desc">
            Tổng hợp chia sẻ từ các chuyên gia chăm sóc sức khỏe & biên tập viên du lịch 4U giúp bạn có sự chuẩn bị trọn vẹn nhất khi về với thiên nhiên.
          </p>

          <div className="tours-tips-grid">
            <div className="tours-tips-card">
              <h3 className="tours-tips-card-title">
                Thiền chuông xoay tác dụng thế nào?
              </h3>
              <p className="tours-tips-card-text">
                Tần số âm thanh 432Hz từ chuông xoay Tây Tạng tác động trực tiếp lên hệ thần kinh, giúp đưa não bộ về trạng thái thư giãn sâu và giải tỏa căng thẳng sau vài phút.
              </p>
            </div>

            <div className="tours-tips-card">
              <h3 className="tours-tips-card-title">
                Nghệ thuật tắm rừng Shinrin-Yoku
              </h3>
              <p className="tours-tips-card-text">
                Đi bộ chậm rãi giữa rừng đại ngàn, hít thở Phytoncides (hợp chất kháng sinh tự nhiên do thực vật tiết ra) giúp tăng cường sức đề kháng và thanh lọc lá phổi.
              </p>
            </div>

            <div className="tours-tips-card">
              <h3 className="tours-tips-card-title">
                Chuẩn bị tâm lý buông bỏ digital
              </h3>
              <p className="tours-tips-card-text">
                Để đạt hiệu quả phục hồi cao nhất, hãy tạm gác các thông báo công việc, dành trọn 100% sự hiện diện cho thiên nhiên, bản thân và những người đồng hành.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
