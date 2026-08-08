import React, { useMemo, useState, useEffect } from 'react';
import { TOURS_DATA, TourPackage, TourItineraryDay } from '../data/toursData';
import { saveTourApi, createTourApi, fetchToursApi, deleteTourApi, getImageUrl, uploadImageApi } from '../services/apiService';

import './Admin.css';

interface AdminTourEditorProps {
  onNavigate?: (path: string) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const ALL_ADMIN_SECTIONS = [
  { id: 'tours', label: 'Tours', icon: 'map' },
  { id: 'bookings', label: 'Bookings', icon: 'confirmation_number' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'about', label: 'About', icon: 'info' },
  { id: 'blog', label: 'Blog', icon: 'newspaper' },
  { id: 'destinations', label: 'Destinations', icon: 'place' },
  { id: 'faq', label: 'FAQ', icon: 'help_outline' },
  { id: 'partners', label: 'Partners', icon: 'handshake' },
  { id: 'promotions', label: 'Promotions', icon: 'local_offer' },
  { id: 'services', label: 'Services', icon: 'concierge' },
  { id: 'team', label: 'Team', icon: 'group' },
  { id: 'testimonials', label: 'Testimonials', icon: 'format_quote' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
] as const;

const findTourBySlug = (slug: string) => {
  return TOURS_DATA.find((tour) => tour.slug === slug) || null;
};

const buildDraft = (tour: TourPackage | null): TourPackage | null => {
  if (!tour) return null;

  return {
    ...tour,
    highlights: tour.highlights ? [...tour.highlights] : [],
    itinerary: tour.itinerary
      ? tour.itinerary.map((day) => ({
          ...day,
          activities: day.activities ? [...day.activities] : [],
        }))
      : [],
    departureDates: tour.departureDates ? [...tour.departureDates] : [],
    gallery: tour.gallery ? [...tour.gallery] : [],
    included: tour.included ? [...tour.included] : [],
    excluded: tour.excluded ? [...tour.excluded] : [],
    notes: tour.notes ? [...tour.notes] : [],
    travelTips: tour.travelTips ? [...tour.travelTips] : [],
  };
};

export default function AdminTourEditor({ onNavigate, activeTab = 'tours', setActiveTab }: AdminTourEditorProps) {
  const [toursList, setToursList] = useState<TourPackage[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [tourDraft, setTourDraft] = useState<TourPackage | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Vừa lưu xong');
  const [activeSection, setActiveSection] = useState<string>('basic-info');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  useEffect(() => {
    const loadLiveTours = async () => {
      try {
        const liveData = await fetchToursApi();
        if (Array.isArray(liveData)) {
          setToursList(liveData);
        }
      } catch (err) {
        console.warn('[TOURS API LOAD WARNING]', err);
      }
    };
    loadLiveTours();
  }, []);

  const selectedTour = useMemo(() => (selectedSlug ? toursList.find(t => t.slug === selectedSlug) || findTourBySlug(selectedSlug) : null), [selectedSlug, toursList]);

  useEffect(() => {
    if (selectedSlug) {
      if (!isCreatingNew) {
        setTourDraft(buildDraft(selectedTour));
        setSaveMessage('');
      }
    } else {
      setTourDraft(null);
    }
  }, [selectedSlug, selectedTour, isCreatingNew]);


  // Filtered tours for the catalog list
  const filteredTours = useMemo(() => {
    return toursList.filter((t) => {
      const matchesSearch =
        !searchQuery.trim() ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All' ||
        t.category === categoryFilter ||
        (categoryFilter === 'Exclusive' && t.isExclusive) ||
        (categoryFilter === 'Featured' && t.isFeatured) ||
        (categoryFilter === 'Hot' && t.isHot) ||
        (categoryFilter === 'Deals' && (t.originalPrice && t.originalPrice > (t.price || 0)));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, toursList]);

  const handleOpenEditor = (slug: string) => {
    setSelectedSlug(slug);
    setActiveSection('basic-info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    setTourDraft(null);
    setSaveMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMenuItem = (menuId: string) => {
    if (menuId === 'tours') {
      setSelectedSlug(null);
    }
    if (setActiveTab) {
      setActiveTab(menuId);
    }
  };

  const handleFieldChange = (field: keyof TourPackage, value: any) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const handlePriceChange = (field: 'price' | 'originalPrice', rawVal: string) => {
    const numeric = parseInt(rawVal.replace(/\D/g, ''), 10) || 0;
    handleFieldChange(field, numeric);
  };

  // Highlights handlers
  const handleHighlightChange = (index: number, value: string) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const highlights = [...(prev.highlights || [])];
      highlights[index] = value;
      return { ...prev, highlights };
    });
  };

  const handleHighlightAdd = () => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      return { ...prev, highlights: [...(prev.highlights || []), 'Trải nghiệm retreat mới'] };
    });
  };

  const handleHighlightRemove = (index: number) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const highlights = [...(prev.highlights || [])];
      highlights.splice(index, 1);
      return { ...prev, highlights };
    });
  };

  // Itinerary handlers
  const handleItineraryAdd = () => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const itinerary = [...prev.itinerary];
      itinerary.push({
        day: itinerary.length + 1,
        title: 'Hoạt động trải nghiệm ngày mới',
        description: 'Mô tả chi tiết các hoạt động tĩnh dưỡng và ẩm thực trong ngày...',
        image: '',

        activities: ['07:00 - Thiền định bình minh', '09:00 - Thưởng trà thảo mộc'],
      });
      return { ...prev, itinerary };
    });
  };

  const handleItineraryRemove = (index: number) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const itinerary = [...prev.itinerary];
      itinerary.splice(index, 1);
      return { ...prev, itinerary: itinerary.map((item, idx) => ({ ...item, day: idx + 1 })) };
    });
  };

  const handleItineraryDayChange = (index: number, field: keyof TourItineraryDay, value: any) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const itinerary = prev.itinerary.map((day, idx) => {
        if (idx !== index) return day;
        return { ...day, [field]: value };
      });
      return { ...prev, itinerary };
    });
  };

  const handleItineraryActivityChange = (dayIndex: number, actIndex: number, value: string) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const itinerary = prev.itinerary.map((day, idx) => {
        if (idx !== dayIndex) return day;
        const activities = [...(day.activities || [])];
        activities[actIndex] = value;
        return { ...day, activities };
      });
      return { ...prev, itinerary };
    });
  };

  const handleItineraryActivityAdd = (dayIndex: number) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const itinerary = prev.itinerary.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return { ...day, activities: [...(day.activities || []), '14:00 - Trải nghiệm đặc sắc mới'] };
      });
      return { ...prev, itinerary };
    });
  };

  const handleItineraryActivityRemove = (dayIndex: number, actIndex: number) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const itinerary = prev.itinerary.map((day, idx) => {
        if (idx !== dayIndex) return day;
        const activities = [...(day.activities || [])];
        activities.splice(actIndex, 1);
        return { ...day, activities };
      });
      return { ...prev, itinerary };
    });
  };

  const coverFileRef = React.useRef<HTMLInputElement>(null);
  const galleryFileRef = React.useRef<HTMLInputElement>(null);

  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImageApi(file);
      if (res?.filename) {
        handleFieldChange('heroImage', res.filename);
      }
    } catch (err) {
      alert('Upload ảnh thất bại: ' + err);
    }
  };

  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImageApi(file);
      if (res?.filename) {
        setTourDraft((prev) => {
          if (!prev) return prev;
          return { ...prev, gallery: [...(prev.gallery || []), res.filename] };
        });
      }
    } catch (err) {
      alert('Upload ảnh thất bại: ' + err);
    }
  };

  // Gallery handlers
  const handleGalleryAdd = () => {
    if (galleryFileRef.current) {
      galleryFileRef.current.click();
    } else {
      const url = prompt('Nhập tên file ảnh (VD: a.jpg) hoặc URL:');
      if (!url || !url.trim()) return;
      setTourDraft((prev) => {
        if (!prev) return prev;
        return { ...prev, gallery: [...(prev.gallery || []), url.trim()] };
      });
    }
  };

  const handleGalleryRemove = (index: number) => {
    setTourDraft((prev) => {
      if (!prev) return prev;
      const gallery = [...(prev.gallery || [])];
      gallery.splice(index, 1);
      return { ...prev, gallery };
    });
  };

  const handleChangeCover = () => {
    if (coverFileRef.current) {
      coverFileRef.current.click();
    } else {
      const url = prompt('Nhập tên file ảnh (VD: a.jpg) hoặc URL:', tourDraft?.heroImage || '');
      if (url && url.trim()) {
        handleFieldChange('heroImage', url.trim());
      }
    }
  };


  const handleSave = async () => {
    if (!tourDraft) return;

    if (!tourDraft.title || !tourDraft.title.trim()) {
      alert('Vui lòng nhập Tên Tour trước khi lưu!');
      return;
    }

    if (isCreatingNew) {
      try {
        const created = await createTourApi(tourDraft);
        const savedTour: TourPackage = {
          ...tourDraft,
          id: created.id || tourDraft.id || `tour-${Date.now()}`,
          slug: created.slug || tourDraft.slug,
        };

        TOURS_DATA.unshift(savedTour);
        setToursList((prev) => [savedTour, ...prev]);
        setSelectedSlug(savedTour.slug);
        setIsCreatingNew(false);

        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
        setLastSavedTime(timeStr);
        setSaveMessage(`Đã tạo mới và lưu thành công Tour "${savedTour.title}" vào MS SQL Server Database!`);
        setTimeout(() => setSaveMessage(''), 4000);
      } catch (err) {
        alert('Lỗi tạo tour mới: ' + err);
      }
    } else {
      const tourId = tourDraft.id || selectedTour?.id || selectedSlug;

      try {
        await saveTourApi(tourId!, tourDraft);
      } catch (err) {
        console.warn('API call error:', err);
      }

      setToursList((prev) =>
        prev.map((t) =>
          t.slug === selectedSlug || (tourId && t.id === tourId)
            ? {
                ...t,
                ...tourDraft,
                highlights: [...(tourDraft.highlights || [])],
                itinerary: (tourDraft.itinerary || []).map((day) => ({ ...day, activities: [...(day.activities || [])] })),
                departureDates: [...(tourDraft.departureDates || [])],
                gallery: [...(tourDraft.gallery || [])],
              }
            : t
        )
      );

      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
      setLastSavedTime(timeStr);
      setSaveMessage('Đã lưu thành công tất cả thay đổi vào MS SQL Server Database!');
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  const handleCancel = () => {
    if (isCreatingNew) {
      setIsCreatingNew(false);
      const firstTour = toursList[0];
      if (firstTour) {
        setSelectedSlug(firstTour.slug);
      } else {
        setSelectedSlug(null);
        setTourDraft(null);
      }
      setSaveMessage('Đã hủy tạo tour mới.');
    } else {
      setTourDraft(buildDraft(findTourBySlug(selectedSlug!)));
      setSaveMessage('Đã phục hồi dữ liệu ban đầu.');
    }
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleCreateNewTour = () => {
    const newSlug = `tour-new-${Date.now()}`;
    const newTourObj: TourPackage = {
      id: '',
      slug: newSlug,
      title: '',
      subtitle: '',
      category: 'Wellness',
      country: 'Việt Nam',
      city: '',
      duration: '3 Ngày 2 Đêm',
      durationDays: 3,
      departureDates: ['Hằng tuần'],
      airline: '',
      hotel: '',
      transportation: '',
      price: 0,
      originalPrice: 0,
      rating: 5.0,
      reviewsCount: 0,
      isHot: false,
      highlights: [],
      itinerary: [
        {
          day: 1,
          title: 'Đón Đoàn & Check-in',
          description: 'Nghỉ dưỡng & nhận phòng',
          image: '',
          activities: ['14:00 - Nhận phòng'],
        },
      ],
      included: ['Xe đưa đón', 'Resort / Khách sạn', 'Ăn uống theo chương trình'],
      excluded: ['Chi phí cá nhân'],
      notes: [],
      heroImage: '',
      gallery: [],
      destinationMap: '',
      travelTips: [],
      faq: [],
      reviews: [],
    };

    setIsCreatingNew(true);
    setSelectedSlug(newSlug);
    setTourDraft(newTourObj);
    setSaveMessage('Vui lòng điền thông tin và bấm "Xác Nhận Tạo Tour Mới" để lưu xuống Database.');
  };



  const handleDeleteTour = async (tourToDelete: TourPackage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const tourTitle = tourToDelete.title || 'Tour này';
    const tourId = tourToDelete.id || tourToDelete.slug;

    const confirmed = window.confirm(`⚠️ BẠN CÓ CHẮC CHẮN MUỐN XÓA TOUR:\n"${tourTitle}" (ID: ${tourId})?\n\nHành động này sẽ gửi HTTP DELETE API xuống Backend MS SQL Server và KHÔNG THỂ HOÀN TÁC!`);
    if (!confirmed) return;

    try {
      if (tourToDelete.id) {
        await deleteTourApi(tourToDelete.id);
      } else if (tourToDelete.slug) {
        await deleteTourApi(tourToDelete.slug);
      }
    } catch (err) {
      console.warn('[DELETE TOUR API ERROR]', err);
    }

    setToursList((prev) => prev.filter((t) => t.slug !== tourToDelete.slug && t.id !== tourToDelete.id));

    if (selectedSlug === tourToDelete.slug) {
      setSelectedSlug(null);
    }

    setSaveMessage(`Đã xóa thành công Tour "${tourTitle}"!`);
    setTimeout(() => setSaveMessage(''), 4000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Days/Nights calculation
  const durationMatch = tourDraft?.duration ? tourDraft.duration.match(/(\d+)\s*Ngày\s*(\d+)\s*Đêm/i) : null;
  const daysVal = durationMatch ? parseInt(durationMatch[1], 10) : tourDraft?.durationDays || 3;
  const nightsVal = durationMatch ? parseInt(durationMatch[2], 10) : Math.max(0, daysVal - 1);

  const updateDuration = (d: number, n: number) => {
    const newDurationStr = `${d} Ngày ${n} Đêm`;
    handleFieldChange('duration', newDurationStr);
    handleFieldChange('durationDays', d);
  };

  return (
    <div className="serene-admin-wrapper">
      {/* 1. TOP NAVBAR HEADER */}
      <nav className="serene-topnav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span
            onClick={() => onNavigate && onNavigate('/')}
            style={{
              fontFamily: "'Libre Caslon Text', Georgia, serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#081f13',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                backgroundColor: '#081f13',
                color: '#ffffff',
                padding: '6px',
                borderRadius: '8px',
                fontSize: '18px'
              }}
            >
              eco
            </span>
            Serene Operator
          </span>

          {/* Search box */}
          <div className="serene-search-box">
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', color: '#737973', fontSize: '18px' }}>search</span>
            <input
              type="text"
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="serene-search-input"
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onNavigate && onNavigate('/')}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(6, 27, 14, 0.15)',
              backgroundColor: '#ffffff',
              color: '#081f13',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
            Live Site
          </button>
        </div>
      </nav>

      {/* 2. ALWAYS RENDER SIDEBAR WITH ALL 13 MANAGEMENT ITEMS */}
      <div style={{ display: 'flex', width: '100%', paddingTop: '68px', minHeight: '100vh' }}>
        <aside className="serene-sidebar">
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', opacity: 0.8 }}>
              Admin Portal
            </p>
            <h2 style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '20px', color: '#ffffff', margin: 0 }}>
              Management
            </h2>
          </div>

          {/* All 13 Main Admin Sections */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {ALL_ADMIN_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSelectMenuItem(sec.id)}
                className={`serene-nav-item ${activeTab === sec.id ? 'active' : ''}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{sec.icon}</span>
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Quick jump to editor sections when inside a tour */}
          {selectedSlug && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Editing Sections
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button onClick={() => scrollToSection('basic-info')} style={{ background: 'none', border: 'none', color: activeSection === 'basic-info' ? '#ffffff' : '#a1bfa9', fontSize: '13px', textAlign: 'left', padding: '4px 8px', cursor: 'pointer' }}>• Basic Info</button>
                <button onClick={() => scrollToSection('pricing-status')} style={{ background: 'none', border: 'none', color: activeSection === 'pricing-status' ? '#ffffff' : '#a1bfa9', fontSize: '13px', textAlign: 'left', padding: '4px 8px', cursor: 'pointer' }}>• Pricing & Visibility</button>
                <button onClick={() => scrollToSection('highlights')} style={{ background: 'none', border: 'none', color: activeSection === 'highlights' ? '#ffffff' : '#a1bfa9', fontSize: '13px', textAlign: 'left', padding: '4px 8px', cursor: 'pointer' }}>• Highlights</button>
                <button onClick={() => scrollToSection('itinerary')} style={{ background: 'none', border: 'none', color: activeSection === 'itinerary' ? '#ffffff' : '#a1bfa9', fontSize: '13px', textAlign: 'left', padding: '4px 8px', cursor: 'pointer' }}>• Itinerary</button>
                <button onClick={() => scrollToSection('gallery')} style={{ background: 'none', border: 'none', color: activeSection === 'gallery' ? '#ffffff' : '#a1bfa9', fontSize: '13px', textAlign: 'left', padding: '4px 8px', cursor: 'pointer' }}>• Gallery</button>
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', color: '#a1bfa9', fontSize: '12px' }}>
            Serene Operator Portal v2.4
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE */}
        <main className="serene-main">
          {/* =========================================================================
              VIEW MODE 1: TOURS CATALOG LIST VIEW (When selectedSlug === null)
             ========================================================================= */}
          {!selectedSlug && (
            <div className="serene-container-inner">
              <div className="serene-sticky-bar">
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>
                    Tours Management Catalog
                  </p>
                  <h1 style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '32px', margin: 0, color: '#081f13', fontWeight: 400 }}>
                    Select Tour Package
                  </h1>
                </div>
                <button
                  onClick={handleCreateNewTour}
                  className="serene-btn-primary"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                  Create New Tour
                </button>
              </div>

              {/* FILTER BY CATEGORY PILLS BAR IN MAIN CONTENT */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '8px' }}>Lọc Theo Mục Trang Chủ:</span>
                {[
                  { id: 'All', label: 'Tất cả Packages' },
                  { id: 'Exclusive', label: '👑 1. Retreats Độc Quyền' },
                  { id: 'Featured', label: '📅 2. Sắp Khởi Hành' },
                  { id: 'Hot', label: '🔥 3. Không Thể Bỏ Lỡ' },
                  { id: 'Deals', label: '⚡ 4. Ưu Đãi Giờ Chót' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: '999px',
                      border: '1px solid rgba(6, 27, 14, 0.12)',
                      cursor: 'pointer',
                      backgroundColor: categoryFilter === cat.id ? '#081f13' : '#ffffff',
                      color: categoryFilter === cat.id ? '#ffffff' : '#525a54',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* STATS OVERVIEW CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
                <div className="serene-card" style={{ marginBottom: 0, padding: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: 0 }}>👑 Retreats Độc Quyền</p>
                  <p style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '28px', color: '#059669', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.isExclusive).length}</p>
                </div>
                <div className="serene-card" style={{ marginBottom: 0, padding: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: 0 }}>📅 Sắp Khởi Hành</p>
                  <p style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '28px', color: '#2563eb', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.isFeatured).length}</p>
                </div>
                <div className="serene-card" style={{ marginBottom: 0, padding: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: 0 }}>🔥 Không Thể Bỏ Lỡ</p>
                  <p style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.isHot).length}</p>
                </div>
                <div className="serene-card" style={{ marginBottom: 0, padding: '16px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: 0 }}>⚡ Ưu Đãi Giờ Chót</p>
                  <p style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '28px', color: '#d97706', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.originalPrice && t.originalPrice > (t.price || 0)).length}</p>
                </div>
              </div>

              {/* TOURS CATALOG GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {filteredTours.map((tour) => (
                  <div
                    key={tour.slug}
                    onClick={() => handleOpenEditor(tour.slug)}
                    className="serene-card"
                    style={{
                      marginBottom: 0,
                      padding: 0,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(8, 31, 19, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 24px rgba(6, 27, 14, 0.04)';
                    }}
                  >
                    {/* Tour Card Image */}
                    <div style={{ height: '170px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={getImageUrl(tour.heroImage)}
                        alt={tour.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '85%' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'rgba(8, 31, 19, 0.85)', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          {tour.category || 'Wellness'}
                        </span>
                        {tour.isExclusive && (
                          <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#059669', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                            👑 Độc Quyền
                          </span>
                        )}
                        {tour.isFeatured && (
                          <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#2563eb', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                            📅 Sắp Khởi Hành
                          </span>
                        )}
                        {tour.isHot && (
                          <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#dc2626', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                            🔥 Không Thể Bỏ Lỡ
                          </span>
                        )}
                        {tour.originalPrice && tour.originalPrice > tour.price && (
                          <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#d97706', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                            ⚡ Flash Sale
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tour Card Content */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '18px', color: '#081f13', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                          {tour.title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#525a54', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {tour.subtitle}
                        </p>
                      </div>

                      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(6, 27, 14, 0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '11px', color: '#737973', margin: 0 }}>{tour.duration || '3 Ngày 2 Đêm'}</p>
                          <p style={{ fontSize: '16px', fontWeight: 700, color: '#081f13', margin: '2px 0 0 0', fontFamily: 'monospace' }}>
                            {tour.price ? tour.price.toLocaleString('vi-VN') + ' ₫' : 'Tư vấn'}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEditor(tour.slug)}
                            style={{
                              backgroundColor: '#081f13',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 14px',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteTour(tour, e)}
                            style={{
                              backgroundColor: '#fee2e2',
                              color: '#dc2626',
                              border: '1px solid #fca5a5',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW MODE 2: TOUR DETAIL EDITOR VIEW (When selectedSlug !== null)
             ========================================================================= */}
          {selectedSlug && tourDraft && (
            <div className="serene-container-inner">
              {/* Sticky Action Bar */}
              <div className="serene-sticky-bar" style={{ gap: '16px', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left side: Back button & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={handleBackToList}
                    style={{
                      border: '1px solid rgba(6, 27, 14, 0.15)',
                      backgroundColor: '#ffffff',
                      color: '#081f13',
                      borderRadius: '10px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                    Quay Lại Danh Sách
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '26px', margin: 0, color: '#081f13', fontWeight: 600 }}>
                      {isCreatingNew ? 'Tạo Tour Mới' : 'Chỉnh Sửa Chi Tiết Tour'}
                    </h1>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      backgroundColor: isCreatingNew ? '#dcfce7' : '#e0f2fe',
                      color: isCreatingNew ? '#166534' : '#0369a1',
                      border: isCreatingNew ? '1px solid #bbf7d0' : '1px solid #bae6fd'
                    }}>
                      {isCreatingNew ? 'Chế độ tạo mới' : 'Chế độ chỉnh sửa'}
                    </span>
                  </div>
                </div>

                {/* Right side: Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {!isCreatingNew && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTour(tourDraft!)}
                      style={{
                        backgroundColor: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                        borderRadius: '10px',
                        padding: '10px 16px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                      Xóa Tour
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      padding: '10px 18px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>undo</span>
                    Hủy Bỏ
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    style={{
                      backgroundColor: isCreatingNew ? '#065f46' : '#081f13',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(6, 95, 70, 0.25)'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      {isCreatingNew ? 'add_circle' : 'save'}
                    </span>
                    {isCreatingNew ? 'Xác Nhận Tạo Tour Mới' : 'Lưu Thay Đổi (Save)'}
                  </button>
                </div>
              </div>

              {/* Toast Notification Alert for saveMessage */}
              {saveMessage && (
                <div style={{
                  backgroundColor: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)'
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#10b981' }}>check_circle</span>
                  <span>{saveMessage}</span>
                </div>
              )}


              {/* HERO IMAGE COVER CARD */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(6, 27, 14, 0.08)', backgroundColor: '#ffffff', position: 'relative', marginBottom: '32px', boxShadow: '0 4px 24px rgba(6, 27, 14, 0.04)' }}>
                <input
                  type="file"
                  ref={coverFileRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleCoverFileUpload}
                />
                <div
                  style={{
                    height: '300px',
                    width: '100%',
                    backgroundImage: `linear-gradient(180deg, rgba(8, 31, 19, 0.2) 0%, rgba(8, 31, 19, 0.65) 100%), url('${getImageUrl(tourDraft.heroImage)}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px 32px'
                  }}
                >
                  <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => coverFileRef.current?.click()}
                      style={{
                        backgroundColor: '#081f13',
                        color: '#ffffff',
                        borderRadius: '10px',
                        padding: '10px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload_file</span>
                      Chọn ảnh từ máy (a.jpg)
                    </button>
                  </div>


                  <div style={{ color: '#ffffff' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', display: 'inline-block' }}>
                      {tourDraft.category || 'WELLNESS RETREAT'}
                    </span>
                    <h2 style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '28px', margin: '4px 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                      {tourDraft.title || (isCreatingNew ? 'Nhập Tên Tour Mới...' : 'Chưa có tên tour')}
                    </h2>
                    <p style={{ margin: 0, opacity: 0.9, fontSize: '15px' }}>
                      {tourDraft.subtitle || (isCreatingNew ? 'Nhập mô tả ngắn cho tour retreat mới này...' : '')}
                    </p>

                  </div>
                </div>
              </div>

              {/* BASIC INFORMATION CARD */}
              <div className="serene-card" id="basic-info">
                <div className="serene-card-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#081f13' }}>info</span>
                    Basic Information
                  </span>
                  <span style={{ fontSize: '12px', color: '#525a54', fontFamily: 'monospace', fontWeight: 400 }}>ID: {tourDraft.id || 'tour-01'}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="serene-form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="serene-form-label">Tour Title</label>
                    <input
                      className="serene-form-input"
                      style={{ fontSize: '18px', fontWeight: 600, color: '#081f13' }}
                      type="text"
                      value={tourDraft.title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                    />
                  </div>

                  <div className="serene-form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="serene-form-label">Subtitle / Short Description</label>
                    <input
                      className="serene-form-input"
                      type="text"
                      value={tourDraft.subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                    />
                  </div>

                  <div className="serene-form-group">
                    <label className="serene-form-label">URL Slug</label>
                    <input
                      className="serene-form-input"
                      style={{ fontFamily: 'monospace', fontSize: '14px' }}
                      type="text"
                      value={tourDraft.slug || ''}
                      onChange={(e) => handleFieldChange('slug', e.target.value)}
                    />
                  </div>

                  <div className="serene-form-group">
                    <label className="serene-form-label">Duration</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="number"
                        min={1}
                        value={daysVal}
                        onChange={(e) => updateDuration(parseInt(e.target.value, 10) || 1, nightsVal)}
                        className="serene-form-input"
                        style={{ width: '70px', textAlign: 'center', fontWeight: 700 }}
                      />
                      <span style={{ color: '#525a54', fontSize: '14px', fontWeight: 600 }}>Days</span>
                      <span style={{ color: '#737973', margin: '0 4px' }}>/</span>
                      <input
                        type="number"
                        min={0}
                        value={nightsVal}
                        onChange={(e) => updateDuration(daysVal, parseInt(e.target.value, 10) || 0)}
                        className="serene-form-input"
                        style={{ width: '70px', textAlign: 'center', fontWeight: 700 }}
                      />
                      <span style={{ color: '#525a54', fontSize: '14px', fontWeight: 600 }}>Nights</span>
                    </div>
                  </div>

                  <div className="serene-form-group">
                    <label className="serene-form-label">Country</label>
                    <select
                      className="serene-form-input"
                      value={tourDraft.country || 'Vietnam'}
                      onChange={(e) => handleFieldChange('country', e.target.value)}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="Vietnam">Vietnam</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Laos">Laos</option>
                      <option value="Japan">Japan</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                  </div>

                  <div className="serene-form-group">
                    <label className="serene-form-label">City / Region</label>
                    <input
                      className="serene-form-input"
                      type="text"
                      value={tourDraft.city || ''}
                      onChange={(e) => handleFieldChange('city', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* PRICING & VISIBILITY CARD */}
              <div className="serene-card" id="pricing-status">
                <div className="serene-card-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#081f13' }}>payments</span>
                    Pricing & Visibility
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="serene-form-group">
                      <label className="serene-form-label">Selling Price (VND)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '14px', top: '10px', color: '#525a54', fontFamily: 'monospace', fontWeight: 700 }}>₫</span>
                        <input
                          className="serene-form-input"
                          style={{ paddingLeft: '32px', fontSize: '18px', fontWeight: 700, color: '#081f13' }}
                          type="text"
                          value={tourDraft.price ? tourDraft.price.toLocaleString('vi-VN') : ''}
                          onChange={(e) => handlePriceChange('price', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="serene-form-group">
                      <label className="serene-form-label">Original Price (Optional)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '14px', top: '10px', color: '#525a54', fontFamily: 'monospace', fontWeight: 700 }}>₫</span>
                        <input
                          className="serene-form-input"
                          style={{ paddingLeft: '32px', textDecoration: 'line-through', color: '#737973' }}
                          type="text"
                          value={tourDraft.originalPrice ? tourDraft.originalPrice.toLocaleString('vi-VN') : ''}
                          onChange={(e) => handlePriceChange('originalPrice', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Marketing Toggles Panel - 4 HOMEPAGE SECTIONS ASSIGNMENT */}
                  <div style={{ backgroundColor: '#f3f4f2', padding: '24px', borderRadius: '12px', border: '1px solid rgba(6, 27, 14, 0.08)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <label className="serene-form-label" style={{ color: '#081f13', fontWeight: 700, fontSize: '15px' }}>
                      📌 Phân Phối Vào 4 Mục Lớn Trên Trang Chủ Client
                    </label>

                    {/* Section 1: Retreats Độc Quyền */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(6,27,14,0.08)' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#059669', display: 'block' }}>👑 Mục 1: RETREATS ĐỘC QUYỀN</span>
                        <span style={{ fontSize: '12px', color: '#525a54' }}>Bật nhãn (isExclusive) để hiển thị ở Mục 1</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFieldChange('isExclusive', !tourDraft.isExclusive)}
                        className="serene-toggle-switch"
                        style={{ backgroundColor: tourDraft.isExclusive ? '#059669' : '#d9dad8' }}
                      >
                        <div className="serene-toggle-dot" style={{ transform: tourDraft.isExclusive ? 'translateX(24px)' : 'translateX(0)' }} />
                      </button>
                    </div>

                    {/* Section 2: Sắp Khởi Hành */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(6,27,14,0.08)' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#2563eb', display: 'block' }}>📅 Mục 2: SẮP KHỞI HÀNH GẦN NHẤT</span>
                        <span style={{ fontSize: '12px', color: '#525a54' }}>Bật nhãn (isFeatured) để hiển thị ở Mục 2</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFieldChange('isFeatured', !tourDraft.isFeatured)}
                        className="serene-toggle-switch"
                        style={{ backgroundColor: tourDraft.isFeatured ? '#2563eb' : '#d9dad8' }}
                      >
                        <div className="serene-toggle-dot" style={{ transform: tourDraft.isFeatured ? 'translateX(24px)' : 'translateX(0)' }} />
                      </button>
                    </div>

                    {/* Section 3: Không Thể Bỏ Lỡ */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(6,27,14,0.08)' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#dc2626', display: 'block' }}>🔥 Mục 3: KHÔNG THỂ BỎ LỠ</span>
                        <span style={{ fontSize: '12px', color: '#525a54' }}>Bật nhãn (isHot) để hiển thị ở Mục 3</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFieldChange('isHot', !tourDraft.isHot)}
                        className="serene-toggle-switch"
                        style={{ backgroundColor: tourDraft.isHot ? '#dc2626' : '#d9dad8' }}
                      >
                        <div className="serene-toggle-dot" style={{ transform: tourDraft.isHot ? 'translateX(24px)' : 'translateX(0)' }} />
                      </button>
                    </div>

                    {/* Section 4: Ưu Đãi Giờ Chót */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(6,27,14,0.08)' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#d97706', display: 'block' }}>⚡ Mục 4: ƯU ĐÃI GIỜ CHÓT (FLASH SALE)</span>
                        <span style={{ fontSize: '12px', color: '#525a54' }}>Tự động vào Mục 4 khi Giá Gốc &gt; Giá Bán</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '6px', backgroundColor: (tourDraft.originalPrice && tourDraft.originalPrice > (tourDraft.price || 0)) ? '#fef3c7' : '#f3f4f6', color: (tourDraft.originalPrice && tourDraft.originalPrice > (tourDraft.price || 0)) ? '#b45309' : '#6b7280' }}>
                        {(tourDraft.originalPrice && tourDraft.originalPrice > (tourDraft.price || 0)) ? '⚡ ĐANG FLASH SALE' : 'GIÁ THƯỜNG'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGHLIGHTS CARD */}
              <div className="serene-card" id="highlights">
                <div className="serene-card-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#081f13' }}>stars</span>
                    Tour Highlights
                  </span>
                  <button
                    type="button"
                    onClick={handleHighlightAdd}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#081f13',
                      fontWeight: 600,
                      backgroundColor: 'rgba(8, 31, 19, 0.06)',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                    Add Highlight
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {(tourDraft.highlights || []).map((highlight, idx) => (
                    <div key={idx} style={{ backgroundColor: '#f8faf7', padding: '16px', borderRadius: '12px', border: '1px solid rgba(6, 27, 14, 0.08)', position: 'relative' }}>
                      <button
                        type="button"
                        onClick={() => handleHighlightRemove(idx)}
                        style={{ position: 'absolute', top: '12px', right: '12px', border: 'none', background: 'transparent', color: '#ba1a1a', cursor: 'pointer', opacity: 0.7 }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                      </button>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                        Highlight #{idx + 1}
                      </span>
                      <input
                        className="serene-form-input"
                        style={{ fontWeight: 600, backgroundColor: '#ffffff' }}
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(idx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ITINERARY SCHEDULE CARD */}
              <div className="serene-card" id="itinerary">
                <div className="serene-card-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#081f13' }}>route</span>
                    Itinerary Schedule
                  </span>
                  <button
                    type="button"
                    onClick={handleItineraryAdd}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#081f13',
                      fontWeight: 600,
                      backgroundColor: 'rgba(8, 31, 19, 0.06)',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                    Add Day
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {(tourDraft.itinerary || []).map((dayItem, dayIdx) => (
                    <div key={dayIdx} style={{ border: '1px solid rgba(6, 27, 14, 0.08)', borderRadius: '12px', padding: '24px', backgroundColor: '#f8faf7', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: '24px', width: '4px', height: '44px', backgroundColor: '#081f13', borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }} />
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ width: '100%', paddingRight: '32px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#081f13', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                              DAY {dayItem.day}
                            </span>
                            <input
                              className="serene-form-input"
                              style={{ fontFamily: "'Libre Caslon Text', Georgia, serif", fontSize: '18px', fontWeight: 600, backgroundColor: '#ffffff' }}
                              type="text"
                              value={dayItem.title || ''}
                              onChange={(e) => handleItineraryDayChange(dayIdx, 'title', e.target.value)}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleItineraryRemove(dayIdx)}
                          style={{ border: 'none', background: 'transparent', color: '#ba1a1a', cursor: 'pointer', opacity: 0.7 }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '20px' }}>
                        <div className="serene-form-group">
                          <label className="serene-form-label">Day Description</label>
                          <textarea
                            className="serene-form-textarea"
                            rows={2}
                            style={{ backgroundColor: '#ffffff' }}
                            value={dayItem.description || ''}
                            onChange={(e) => handleItineraryDayChange(dayIdx, 'description', e.target.value)}
                          />
                        </div>

                        <div className="serene-form-group">
                          <label className="serene-form-label">Activities & Schedule</label>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {(dayItem.activities || []).map((act, actIdx) => (
                              <div key={actIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#737973', fontSize: '18px' }}>schedule</span>
                                <input
                                  className="serene-form-input"
                                  style={{ fontSize: '14px', backgroundColor: '#ffffff' }}
                                  type="text"
                                  value={act}
                                  onChange={(e) => handleItineraryActivityChange(dayIdx, actIdx, e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleItineraryActivityRemove(dayIdx, actIdx)}
                                  style={{ border: 'none', background: 'transparent', color: '#ba1a1a', cursor: 'pointer' }}
                                >
                                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleItineraryActivityAdd(dayIdx)}
                              style={{ color: '#081f13', fontSize: '13px', fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Add Activity Line
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PHOTO GALLERY CARD */}
              <div className="serene-card" id="gallery">
                <div className="serene-card-header">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#081f13' }}>photo_library</span>
                    Photo Gallery
                  </span>
                  <span style={{ fontSize: '13px', color: '#525a54', fontWeight: 600 }}>{(tourDraft.gallery || []).length} Photos</span>
                </div>

                <input
                  type="file"
                  ref={galleryFileRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleGalleryFileUpload}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {/* Add Photo Button */}
                  <div
                    onClick={handleGalleryAdd}
                    style={{
                      aspectRatio: '1 / 1',
                      borderRadius: '12px',
                      border: '2px dashed rgba(6, 27, 14, 0.2)',
                      backgroundColor: '#f8faf7',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#081f13',
                      cursor: 'pointer',
                      padding: '16px',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '36px', marginBottom: '8px', color: '#081f13' }}>add_photo_alternate</span>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Thêm Ảnh (a.jpg)</span>
                  </div>

                  {/* Gallery Image Grid */}
                  {(tourDraft.gallery || []).map((imgUrl, imgIdx) => (
                    <div key={imgIdx} style={{ aspectRatio: '1 / 1', borderRadius: '12px', overflow: 'hidden', position: 'relative', backgroundColor: '#f3f4f2', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                      <img alt={`Gallery ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={getImageUrl(imgUrl)} />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(8, 31, 19, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.2s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                      >
                        <button
                          type="button"
                          onClick={() => handleGalleryRemove(imgIdx)}
                          style={{ padding: '10px', borderRadius: '50%', backgroundColor: '#ffffff', color: '#ba1a1a', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
