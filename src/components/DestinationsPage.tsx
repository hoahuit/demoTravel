import React, { useState, useEffect, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import { DESTINATIONS_DATA, syncDestinationsDataFromApi, Destination } from '../data/destinationsData';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchSectionItemsApi, fetchToursApi, getImageUrl } from '../services/apiService';
import { Search, Compass, MapPin, Sparkles, ArrowRight, Calendar, SlidersHorizontal, CheckCircle2, Star, ArrowLeft } from 'lucide-react';

interface DestinationsPageProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
  onOpenCustomTour?: (destinationName: string) => void;
}

interface RegionCategory {
  id: string;
  label: string;
  icon: string;
  match?: string[];
}

const REGION_CATEGORIES: RegionCategory[] = [
  { id: 'all', label: 'Tất Cả Điểm Đến', icon: '🌐' },
  { id: 'north', label: 'Bắc Bộ & Tây Bắc', icon: '⛰️', match: ['Đông Bắc Bộ', 'Tây Bắc Bộ', 'Đồng Bằng Sông Hồng', 'Hòa Bình', 'Thanh Hóa', 'Bắc', 'bac', 'Miền Bắc', 'North', 'Sa Pa', 'Lào Cai', 'Hà Giang', 'Ninh Bình', 'Yên Tử', 'Quảng Ninh', 'Hạ Long'] },
  { id: 'central', label: 'Miền Trung Di Sản', icon: '🏛️', match: ['Bắc Trung Bộ', 'Duyên Hải Nam Trung Bộ', 'Quảng Bình', 'Bình Định', 'Ninh Thuận', 'Trung', 'trung', 'Miền Trung', 'Central', 'Đà Lạt', 'Phú Yên', 'Huế', 'Hội An', 'Nha Trang', 'Đà Nẵng'] },
  { id: 'highland', label: 'Tây Nguyên Đại Ngàn', icon: '🌲', match: ['Tây Nguyên', 'Đắk Lắk', 'Gia Lai', 'Kon Tum', 'Lâm Đồng', 'Buôn Ma Thuột'] },
  { id: 'south', label: 'Nam Bộ & Biển Đảo', icon: '🏝️', match: ['Đồng Bằng Sông Cửu Long', 'Kiên Giang', 'Bà Rịa - Vũng Tàu', 'Nam', 'nam', 'Miền Nam', 'South', 'Phú Quốc', 'Côn Đảo', 'Cần Thơ', 'Bến Tre', 'Sóc Trăng', 'Tiền Giang'] },
];

export default function DestinationsPage({ currentPath = '/diem-den', onNavigate, onOpenBooking, onOpenCustomTour }: DestinationsPageProps) {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS_DATA);
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  // Auto-detect region from URL if path is /diem-den/bac, /diem-den/trung, /diem-den/nam
  const initialCategory = useMemo(() => {
    const clean = currentPath.split('?')[0].replace(/^\/+|\/+$/g, '');
    const parts = clean.split('/');
    if (parts.length > 1 && (parts[0] === 'diem-den' || parts[0] === 'destinations')) {
      const slug = parts[1].toLowerCase().trim();
      if (slug === 'bac' || slug === 'north' || slug === 'mien-bac') return 'north';
      if (slug === 'trung' || slug === 'central' || slug === 'mien-trung') return 'central';
      if (slug === 'nam' || slug === 'south' || slug === 'mien-nam') return 'south';
      if (slug === 'tay-nguyen' || slug === 'highland') return 'highland';
    }
    return 'all';
  }, [currentPath]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    // Fetch destinations
    fetchSectionItemsApi('destinations')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          syncDestinationsDataFromApi(data);
          setDestinations([...data]);
        }
      })
      .catch(() => {
        // Fallback to default mock destinations
      });

    // Fetch tours
    fetchToursApi()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          syncToursDataFromApi(data);
          setTours([...data]);
        }
      })
      .catch(() => {
        // Fallback to initial tours
      });
  }, []);

  // Parse destination slug from currentPath (e.g. /diem-den/phu-yen or /destinations/phu-yen)
  const destinationSlug = useMemo(() => {
    const clean = currentPath.split('?')[0].replace(/^\/+|\/+$/g, '');
    const parts = clean.split('/');
    if (parts.length > 1 && (parts[0] === 'diem-den' || parts[0] === 'destinations')) {
      return parts[1].toLowerCase().trim();
    }
    return '';
  }, [currentPath]);

  // Find single destination if slug is present in URL
  const activeSingleDestination = useMemo(() => {
    if (!destinationSlug) return null;
    return destinations.find((d) => {
      const slugNorm = (d.slug || '').toLowerCase();
      const nameNorm = (d.name || '').toLowerCase();
      const target = destinationSlug.replace(/-/g, ' ');
      return (
        slugNorm === destinationSlug ||
        slugNorm.replace(/-/g, '') === destinationSlug.replace(/-/g, '') ||
        nameNorm.includes(target) ||
        target.includes(nameNorm)
      );
    });
  }, [destinations, destinationSlug]);

  const handleDestinationAction = (dest: Destination) => {
    if (onOpenCustomTour) {
      onOpenCustomTour(dest.name);
    } else if (onOpenBooking) {
      onOpenBooking({ city: dest.name, name: `Hành Trình Tĩnh Dưỡng ${dest.name}` });
    } else {
      onNavigate(`/tours?city=${encodeURIComponent(dest.name)}`);
    }
  };

  // Filter destinations for directory index page
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const catObj = REGION_CATEGORIES.find((c) => c.id === selectedCategory);
        if (catObj?.match) {
          matchesCategory = catObj.match.some(
            (r) => dest.region?.toLowerCase().includes(r.toLowerCase()) || r.toLowerCase().includes(dest.region?.toLowerCase() || '')
          );
        }
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = dest.name?.toLowerCase().includes(query);
        const regionMatch = dest.region?.toLowerCase().includes(query);
        const countryMatch = dest.country?.toLowerCase().includes(query);
        const overviewMatch = dest.overview?.toLowerCase().includes(query);
        const attractionMatch = dest.popularAttractions?.some((a: any) => {
          if (typeof a === 'string') return (a as string).toLowerCase().includes(query);
          return a?.name?.toLowerCase().includes(query);
        });
        matchesSearch = Boolean(nameMatch || regionMatch || countryMatch || overviewMatch || attractionMatch);
      }

      return matchesCategory && matchesSearch;
    });
  }, [destinations, selectedCategory, searchQuery]);

  // Tours matching active single destination
  const matchingTours = useMemo(() => {
    if (!activeSingleDestination) return [];
    const destName = (activeSingleDestination.name || '').toLowerCase();
    const destSlug = (activeSingleDestination.slug || '').toLowerCase();
    const destClean = destName.replace(/^(vịnh|núi|đảo|thành phố|tỉnh|huyện|thị xã)\s+/i, '').trim();

    return tours.filter((t) => {
      const city = (t.city || '').toLowerCase();
      const title = (t.title || '').toLowerCase();
      const subtitle = (t.subtitle || '').toLowerCase();
      const slug = (t.slug || '').toLowerCase();
      const cityClean = city.replace(/^(vịnh|núi|đảo|thành phố|tỉnh|huyện|thị xã)\s+/i, '').trim();

      return (
        city.includes(destName) ||
        destName.includes(city) ||
        (cityClean.length >= 2 && destClean.includes(cityClean)) ||
        (destClean.length >= 2 && cityClean.includes(destClean)) ||
        title.includes(destName) ||
        title.includes(destClean) ||
        subtitle.includes(destName) ||
        slug.includes(destSlug)
      );
    });
  }, [tours, activeSingleDestination]);

  return (
    <div
      style={{
        background: '#e5efe8',
        color: '#10201B',
        fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      <style>{`
        .zannier-title-italic {
          font-family: 'Libre Caslon Text', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }

        .hover-lift {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: transparent !important;
          box-shadow: none !important;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          background: transparent !important;
          box-shadow: none !important;
        }

        .zannier-card {
          background: transparent !important;
          box-shadow: none !important;
        }
        .zannier-card:hover {
          background: transparent !important;
          box-shadow: none !important;
        }

        .zannier-img-zoom {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }
        .zannier-card:hover .zannier-img-zoom {
          transform: scale(1.05);
        }

        .zannier-underline-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #10201B;
          text-decoration: none;
          border-bottom: 1.5px solid #10201B;
          padding-bottom: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .zannier-card:hover .zannier-underline-link,
        .zannier-underline-link:hover {
          color: #006d36;
          border-bottom-color: #006d36;
          letter-spacing: 0.16em;
        }

        .destination-search-input:focus {
          outline: none;
          border-color: #006d36 !important;
          box-shadow: 0 0 0 3px rgba(0, 109, 54, 0.15) !important;
        }

        @media (max-width: 992px) {
          .zannier-grid-2col,
          .zannier-2col-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .zannier-stagger-col {
            margin-top: 0 !important;
          }
          .zannier-container {
            padding: 0 24px !important;
          }
          .zannier-hero-inner {
            padding: 0 20px 48px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          CASE A: DEDICATED SINGLE DESTINATION DETAIL VIEW (e.g. /diem-den/phu-yen)
      ══════════════════════════════════════════════════════════════ */}
      {activeSingleDestination ? (
        <div>
          {/* Hero Banner for Single Destination */}
          <section
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              paddingBottom: '70px',
              paddingTop: '175px'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img
                src={getImageUrl(activeSingleDestination.heroImage || '')}
                alt={activeSingleDestination.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                  filter: 'brightness(0.75)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(6, 16, 11, 0.85) 0%, rgba(6, 16, 11, 0.45) 40%, rgba(16, 32, 27, 0.88) 75%, #e5efe8 100%)'
                }}
              />
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '1380px',
                width: '100%',
                margin: '0 auto',
                padding: '0 32px',
                boxSizing: 'border-box'
              }}
            >
              <ScrollReveal>
                <div style={{ maxWidth: '880px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(74, 222, 128, 0.22)',
                      border: '1px solid rgba(74, 222, 128, 0.5)',
                      backdropFilter: 'blur(12px)',
                      color: '#4ade80',
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      padding: '8px 22px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Sparkles size={14} />
                    {activeSingleDestination.region?.toUpperCase()} • {activeSingleDestination.country?.toUpperCase()}
                  </span>

                  <h1
                    className="zannier-title-italic"
                    style={{
                      fontSize: 'clamp(44px, 5.8vw, 76px)',
                      color: '#ffffff',
                      textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                      lineHeight: 1.1,
                      margin: '0 0 20px 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {activeSingleDestination.name}
                  </h1>

                  <p
                    style={{
                      fontSize: 'clamp(16.5px, 1.85vw, 20px)',
                      color: 'rgba(255, 255, 255, 0.94)',
                      textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
                      lineHeight: 1.7,
                      margin: '0 0 32px 0',
                      fontWeight: 400
                    }}
                  >
                    {activeSingleDestination.overview}
                  </p>


                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Section 1: Danh Lam Thắng Cảnh Tại Điểm Đến (Full Screen & 2 items per row) */}
          <section style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '90px 48px' }}>

            {Array.isArray(activeSingleDestination.popularAttractions) && activeSingleDestination.popularAttractions.length > 0 ? (
              <div
                className="zannier-2col-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '64px 48px',
                  width: '100%'
                }}
              >
                {activeSingleDestination.popularAttractions.map((att: any, idx: number) => {
                  const attName = typeof att === 'string' ? att : att?.name || `Điểm đến ${idx + 1}`;
                  const attDesc = typeof att === 'object' && att?.description ? att.description : `Danh lam thắng cảnh nổi tiếng mang đậm dấu ấn tự nhiên và văn hóa bản địa ${activeSingleDestination.name}.`;
                  const attImg = typeof att === 'object' && att?.image ? att.image : activeSingleDestination.heroImage;

                  return (
                    <ScrollReveal key={idx} delay={idx * 60}>
                      <div
                        className="zannier-card hover-lift"
                        style={{
                          background: 'transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (onOpenCustomTour) onOpenCustomTour(`${activeSingleDestination.name} - ${attName}`);
                          else if (onOpenBooking) onOpenBooking({ city: activeSingleDestination.name, name: `Khám phá ${attName}` });
                        }}
                      >
                        {/* Large Full-Bleed Image Frame - Expanded Height */}
                        <div
                          style={{
                            width: '100%',
                            height: 'clamp(440px, 52vh, 580px)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            position: 'relative',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          <img
                            className="zannier-img-zoom"
                            src={getImageUrl(attImg || '')}
                            alt={attName}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px',
                              background: 'rgba(16, 32, 27, 0.85)',
                              backdropFilter: 'blur(12px)',
                              color: '#ffffff',
                              fontSize: '12px',
                              fontWeight: 800,
                              letterSpacing: '0.12em',
                              padding: '8px 20px',
                              borderRadius: '999px'
                            }}
                          >
                            📍 TOP {idx + 1}
                          </div>
                        </div>

                        {/* Editorial Info Directly On Retreat Canvas */}
                        <div style={{ padding: '0 4px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h3
                              className="zannier-title-italic"
                              style={{
                                fontSize: 'clamp(26px, 2.6vw, 36px)',
                                color: '#10201B',
                                margin: '0 0 14px 0',
                                lineHeight: 1.25
                              }}
                            >
                              {attName}
                            </h3>
                            <p style={{ fontSize: '16px', color: '#405246', lineHeight: 1.75, margin: '0 0 22px 0' }}>
                              {attDesc}
                            </p>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(16, 32, 27, 0.12)' }}>
                            <span className="zannier-underline-link">
                              Thêm vào lịch trình tour <ArrowRight size={14} />
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenCustomTour) onOpenCustomTour(`${activeSingleDestination.name} - ${attName}`);
                                else if (onOpenBooking) onOpenBooking({ city: activeSingleDestination.name, name: `Khám phá ${attName}` });
                              }}
                              style={{
                                background: '#006d36',
                                color: '#ffffff',
                                border: 'none',
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontSize: '13px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              Chọn Thắng Cảnh Này
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            ) : null}
          </section>

          {/* Section 2: Gói Tour Tĩnh Dưỡng Tuyển Chọn Tại Điểm Đến (Full Screen & 2 items per row, No White BG) */}
          <section style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '90px 48px', borderTop: '1px solid rgba(16,32,27,0.12)' }}>
            <ScrollReveal>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '52px', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <span style={{ color: '#006d36', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    CURATED EXPERIENCES
                  </span>
                  <h2 className="zannier-title-italic" style={{ fontSize: 'clamp(32px, 3.8vw, 48px)', color: '#10201B', margin: '0 0 10px 0', lineHeight: 1.2 }}>
                    Hành Trình Tĩnh Dưỡng Tuyển Chọn Tại {activeSingleDestination.name}
                  </h2>
                  <p style={{ fontSize: '16px', color: '#405246', margin: 0, lineHeight: 1.6 }}>
                    Gói trải nghiệm cao cấp được thiết kế trọn gói cùng các chuyên gia sức khỏe và hướng dẫn viên riêng.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(`/tours?city=${encodeURIComponent(activeSingleDestination.name)}`)}
                  style={{
                    background: 'transparent',
                    border: '1.5px solid #006d36',
                    color: '#006d36',
                    padding: '12px 26px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#006d36';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#006d36';
                  }}
                >
                  <span>Xem Tất Cả Gói Tour</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </ScrollReveal>

            {matchingTours.length > 0 ? (
              <div
                className="zannier-2col-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '64px 48px',
                  width: '100%'
                }}
              >
                {matchingTours.map((t, tIdx) => (
                  <ScrollReveal key={t.id || tIdx} delay={tIdx * 80}>
                    <div
                      className="zannier-card hover-lift"
                      style={{
                        background: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                      }}
                    >
                      <div>
                        {/* Large Full-Bleed Image Frame - Expanded Height */}
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: 'clamp(440px, 52vh, 580px)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          <img
                            className="zannier-img-zoom"
                            src={getImageUrl(t.heroImage || activeSingleDestination.heroImage || '')}
                            alt={t.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#006d36', color: '#ffffff', fontSize: '12px', fontWeight: 800, padding: '7px 18px', borderRadius: '999px' }}>
                            {t.duration}
                          </div>
                          <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', color: '#facc15', fontSize: '12.5px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Star size={14} fill="#facc15" color="#facc15" />
                            <span>{t.rating || 5.0} ({t.reviewsCount || 18})</span>
                          </div>
                        </div>

                        {/* Tour Info directly on canvas */}
                        <div style={{ padding: '0 4px' }}>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#527059', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
                            {t.hotel || 'Resort 5 Sao Biệt Lập'}
                          </span>
                          <h3
                            className="zannier-title-italic"
                            style={{
                              fontSize: 'clamp(26px, 2.6vw, 36px)',
                              color: '#10201B',
                              margin: '0 0 12px 0',
                              lineHeight: 1.25
                            }}
                          >
                            {t.title}
                          </h3>
                          <p style={{ fontSize: '15.5px', color: '#405246', lineHeight: 1.7, margin: '0 0 18px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {t.subtitle}
                          </p>

                          {/* Highlights bullets */}
                          {Array.isArray(t.highlights) && t.highlights.length > 0 && (
                            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {t.highlights.slice(0, 2).map((hl, hlIdx) => (
                                <div key={hlIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#2d3d34' }}>
                                  <CheckCircle2 size={15} style={{ color: '#006d36', flexShrink: 0 }} />
                                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ padding: '16px 4px 0 4px', borderTop: '1px solid rgba(16,32,27,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: '#527059', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Giá trọn gói / khách</span>
                          <span style={{ fontSize: '24px', fontWeight: 800, color: '#006d36' }}>
                            {typeof t.price === 'number' ? `${t.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => onNavigate(`/tours/${t.slug || t.id}`)}
                            style={{
                              background: '#10201B',
                              color: '#ffffff',
                              border: 'none',
                              padding: '11px 24px',
                              borderRadius: '999px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            Chi Tiết
                          </button>
                          <button
                            onClick={() => {
                              if (onOpenBooking) onOpenBooking(t);
                              else onNavigate(`/tours/${t.slug || t.id}`);
                            }}
                            style={{
                              background: '#006d36',
                              color: '#ffffff',
                              border: 'none',
                              padding: '11px 26px',
                              borderRadius: '999px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 4px 14px rgba(0, 109, 54, 0.3)',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            Đặt Tour
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              /* Fallback showcase card */
              <div style={{ background: 'transparent', borderRadius: '24px', padding: '64px 40px', textAlign: 'center', border: '1px dashed rgba(16,32,27,0.2)' }}>
                <Compass size={48} style={{ color: '#006d36', margin: '0 auto 18px' }} />
                <h3 className="zannier-title-italic" style={{ fontSize: '32px', color: '#10201B', margin: '0 0 14px 0' }}>
                  Hành Trình Tĩnh Dưỡng Signature Tại {activeSingleDestination.name}
                </h3>
                <p style={{ fontSize: '16px', color: '#405246', maxWidth: '680px', margin: '0 auto 30px auto', lineHeight: 1.7 }}>
                  Các hành trình tĩnh dưỡng riêng biệt tại {activeSingleDestination.name} đang được thiết kế độc quyền theo yêu cầu của từng du khách. Hãy để đội ngũ 4U đồng hành cùng bạn.
                </p>
                <button
                  onClick={() => handleDestinationAction(activeSingleDestination)}
                  style={{
                    background: '#006d36',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px 40px',
                    borderRadius: '999px',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 6px 22px rgba(0, 109, 54, 0.35)'
                  }}
                >
                  <span>Yêu Cầu Thiết Kế Tour Tại {activeSingleDestination.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </section>

          {/* Section 3: Gợi ý các điểm đến lân cận (Full Screen & 2 items per row) */}
          <section style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '90px 48px 120px', borderTop: '1px solid rgba(16,32,27,0.12)' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <span style={{ color: '#006d36', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                  MORE TO EXPLORE
                </span>
                <h2 className="zannier-title-italic" style={{ fontSize: 'clamp(32px, 3.8vw, 48px)', color: '#10201B', margin: 0 }}>
                  Khám Phá Các Miền Danh Thắng Tuyệt Mỹ Khác
                </h2>
              </div>
            </ScrollReveal>

            <div
              className="zannier-2col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '64px 48px',
                width: '100%'
              }}
            >
              {destinations
                .filter((d) => d.slug !== activeSingleDestination.slug)
                .slice(0, 4)
                .map((otherDest, oIdx) => (
                  <ScrollReveal key={otherDest.slug || oIdx} delay={oIdx * 60}>
                    <div
                      className="hover-lift zannier-card"
                      style={{
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'space-between'
                      }}
                      onClick={() => onNavigate(`/diem-den/${otherDest.slug}`)}
                    >
                      <div>
                        {/* Large Elevated Image Frame */}
                        <div
                          style={{
                            height: 'clamp(440px, 52vh, 580px)',
                            width: '100%',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          <img
                            className="zannier-img-zoom"
                            src={getImageUrl(otherDest.heroImage || '')}
                            alt={otherDest.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ padding: '0 4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#527059', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
                            {otherDest.region}
                          </span>
                          <h3 className="zannier-title-italic" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', color: '#10201B', margin: '0 0 10px 0', lineHeight: 1.25 }}>
                            {otherDest.name}
                          </h3>
                          <p style={{ fontSize: '15.5px', color: '#405246', lineHeight: 1.75, margin: '0 0 18px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {otherDest.overview}
                          </p>
                        </div>
                      </div>

                      <div style={{ padding: '14px 4px 0', borderTop: '1px solid rgba(16, 32, 27, 0.1)' }}>
                        <span className="zannier-underline-link">
                          Khám phá {otherDest.name} <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
          </section>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════
            CASE B: FULL DESTINATIONS DIRECTORY (INDEX GALLERY VIEW)
        ══════════════════════════════════════════════════════════════ */
        <div>
          {/* 1. EDITORIAL HERO (CINEMATIC PANORAMA BANNER) */}
          <section
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '78vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              paddingBottom: '75px',
              paddingTop: '175px'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=2560&auto=format&fit=crop"
                alt="4U Retreat Destinations"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 35%',
                  filter: 'brightness(0.75)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(6, 16, 11, 0.85) 0%, rgba(6, 16, 11, 0.45) 40%, rgba(16, 32, 27, 0.88) 75%, #e5efe8 100%)'
                }}
              />
            </div>

            <ScrollReveal>
              <div
                className="zannier-hero-inner"
                style={{
                  position: 'relative',
                  zIndex: 10,
                  textAlign: 'center',
                  maxWidth: '940px',
                  padding: '0 32px'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(74, 222, 128, 0.22)',
                    backdropFilter: 'blur(12px)',
                    color: '#4ade80',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    padding: '8px 24px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    border: '1px solid rgba(74, 222, 128, 0.4)',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <Sparkles size={14} />
                  DESTINATIONS COLLECTION • HÀNH TRÌNH DANH THẮNG
                </span>

                <h1
                  className="zannier-title-italic"
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 72px)',
                    color: '#ffffff',
                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                    lineHeight: 1.12,
                    margin: '0 0 20px 0',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Độc Bản Từng Điểm Đến.<br />Hội Tụ Trọn Tinh Hoa Di Sản
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 19.5px)',
                    color: 'rgba(255, 255, 255, 0.94)',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
                    maxWidth: '760px',
                    margin: '0 auto 32px auto',
                    lineHeight: 1.7,
                    fontWeight: 400
                  }}
                >
                  Từ non cao Tây Bắc bảng lảng khói sương, vịnh ngọc di sản Hạ Long đến nét trầm mặc kinh kỳ Cố Đô và thiên đường biển đảo phía Nam — nơi mỗi hành trình là một kiệt tác tái sinh Thân · Tâm · Trí.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* 2. FILTER & SEARCH CONTROL BAR */}
          <section
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              padding: '0 48px 48px',
              position: 'relative',
              zIndex: 15
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '24px 32px',
                boxShadow: '0 16px 45px rgba(16, 32, 27, 0.06)',
                border: '1px solid rgba(16, 32, 27, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Category Pills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                    flex: 1
                  }}
                >
                  {REGION_CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '999px',
                          border: isActive ? '1px solid #006d36' : '1px solid rgba(16, 32, 27, 0.12)',
                          fontSize: '13px',
                          fontWeight: isActive ? 700 : 600,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          background: isActive ? '#006d36' : '#ffffff',
                          color: isActive ? '#ffffff' : '#334155',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: isActive ? '0 6px 20px rgba(0, 109, 54, 0.3)' : 'none'
                        }}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Search Box */}
                <div style={{ position: 'relative', minWidth: '280px', flexShrink: 0 }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b'
                    }}
                  />
                  <input
                    type="text"
                    className="destination-search-input"
                    placeholder="Tìm điểm đến, danh thắng, mùa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 42px',
                      borderRadius: '999px',
                      border: '1px solid rgba(16, 32, 27, 0.15)',
                      fontSize: '13px',
                      background: '#ffffff',
                      color: '#10201B',
                      boxSizing: 'border-box',
                      transition: 'all 0.25s ease'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '13px',
                        color: '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Results stats */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#527059', paddingTop: '12px', borderTop: '1px solid rgba(16, 32, 27, 0.06)' }}>
                <span>
                  Hiển thị <strong style={{ color: '#006d36' }}>{filteredDestinations.length}</strong> điểm đến tuyển chọn
                </span>
                <span style={{ fontStyle: 'italic' }}>
                  Click vào từng điểm đến để xem các thắng cảnh và gói tour độc bản
                </span>
              </div>
            </div>
          </section>

          {/* 3. MAIN GALLERY GRID (Full Screen & 2 items per row) */}
          <main
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              padding: '0 48px 120px'
            }}
          >
            {filteredDestinations.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '100px 24px',
                  background: '#ffffff',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px rgba(16, 32, 27, 0.05)',
                  margin: '40px 0'
                }}
              >
                <Compass size={48} style={{ color: '#006d36', margin: '0 auto 16px', opacity: 0.7 }} />
                <h3 className="zannier-title-italic" style={{ fontSize: '28px', color: '#10201B', margin: '0 0 12px 0' }}>
                  Không tìm thấy điểm đến phù hợp
                </h3>
                <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '480px', margin: '0 auto 24px auto' }}>
                  Không có danh thắng nào khớp với từ khóa "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  style={{
                    background: '#006d36',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Xem Lại Tất Cả Danh Thắng
                </button>
              </div>
            ) : (
              <div
                className="zannier-2col-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '64px 48px',
                  width: '100%'
                }}
              >
                {filteredDestinations.map((dest, idx) => (
                  <ScrollReveal key={dest.slug || dest.id || idx} delay={(idx % 2) * 80}>
                    <div
                      className="zannier-card hover-lift"
                      style={{
                        background: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        cursor: 'pointer'
                      }}
                      onClick={() => onNavigate(`/diem-den/${dest.slug}`)}
                    >
                      <div>
                        {/* Full-Bleed Tall Image Frame */}
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: 'clamp(440px, 52vh, 580px)',
                            overflow: 'hidden',
                            borderRadius: '24px',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          <img
                            className="zannier-img-zoom"
                            src={getImageUrl(dest.heroImage || '')}
                            alt={dest.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px',
                              background: 'rgba(16, 32, 27, 0.85)',
                              backdropFilter: 'blur(12px)',
                              color: '#ffffff',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              letterSpacing: '0.12em',
                              padding: '7px 18px',
                              borderRadius: '999px',
                              textTransform: 'uppercase'
                            }}
                          >
                            {dest.region} • {dest.country}
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '20px',
                              right: '20px',
                              background: '#006d36',
                              color: '#ffffff',
                              fontSize: '12px',
                              fontWeight: 800,
                              padding: '7px 18px',
                              borderRadius: '999px',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                            }}
                          >
                            ✨ {dest.tourCount || 3} Hành Trình Độc Bản
                          </div>
                        </div>

                        {/* Destination Info */}
                        <div style={{ padding: '0 4px' }}>
                          <span
                            style={{
                              display: 'block',
                              fontSize: '12px',
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#527059',
                              marginBottom: '8px'
                            }}
                          >
                            🗓️ Mùa đẹp nhất: <strong style={{ color: '#006d36' }}>{dest.bestTime || 'Quanh năm'}</strong>
                          </span>

                          <h2
                            className="zannier-title-italic"
                            style={{
                              fontSize: 'clamp(28px, 2.8vw, 38px)',
                              color: '#10201B',
                              margin: '0 0 12px 0',
                              lineHeight: 1.25
                            }}
                          >
                            {dest.name}
                          </h2>

                          <p
                            style={{
                              fontSize: '15.5px',
                              lineHeight: 1.75,
                              color: '#405246',
                              margin: '0 0 18px 0',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {dest.overview}
                          </p>

                          {/* Popular Attractions Pills */}
                          {Array.isArray(dest.popularAttractions) && dest.popularAttractions.length > 0 && (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                              {dest.popularAttractions.slice(0, 4).map((att: any, aIdx: number) => {
                                const attName = typeof att === 'string' ? att : att?.name || '';
                                if (!attName) return null;
                                return (
                                  <span
                                    key={aIdx}
                                    style={{
                                      background: 'rgba(255, 255, 255, 0.9)',
                                      color: '#334155',
                                      fontSize: '11.5px',
                                      fontWeight: 600,
                                      padding: '5px 12px',
                                      borderRadius: '999px',
                                      border: '1px solid rgba(16, 32, 27, 0.08)'
                                    }}
                                  >
                                    📍 {attName}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          flexWrap: 'wrap',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(16, 32, 27, 0.1)'
                        }}
                      >
                        <span className="zannier-underline-link">
                          Khám phá {dest.name} <ArrowRight size={13} />
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDestinationAction(dest);
                          }}
                          style={{
                            background: '#006d36',
                            border: 'none',
                            color: '#ffffff',
                            padding: '10px 24px',
                            borderRadius: '999px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 14px rgba(0, 109, 54, 0.25)'
                          }}
                        >
                          Thiết Kế Tour Riêng
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM VIP BESPOKE CUSTOM TOUR INQUIRY BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#10201B',
          color: '#ffffff',
          padding: '100px 32px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >
          <ScrollReveal>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(74, 222, 128, 0.15)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                color: '#4ade80',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.16em',
                padding: '6px 20px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}
            >
              BESPOKE RETREAT CONCIERGE
            </span>

            <h2
              className="zannier-title-italic"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                lineHeight: 1.15,
                margin: '0 0 20px 0',
                color: '#ffffff'
              }}
            >
              {activeSingleDestination
                ? `Thiết Kế Hành Trình Riêng Tại ${activeSingleDestination.name}`
                : 'Chưa Tìm Thấy Điểm Đến Mơ Ước Của Bạn?'}
            </h2>

            <p
              style={{
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
                maxWidth: '720px',
                margin: '0 auto 36px auto'
              }}
            >
              {activeSingleDestination
                ? `Đội ngũ chuyên gia tĩnh dưỡng của 4U sẵn sàng đồng hành cùng bạn để thiết kế riêng một kỳ nghỉ độc bản tại ${activeSingleDestination.name}: từ lựa chọn resort biệt lập, chuyên gia thiền định 1:1, thực đơn thực dưỡng đến xe VIP đưa đón.`
                : 'Đội ngũ chuyên gia tĩnh dưỡng của 4U sẵn sàng đồng hành cùng bạn để thiết kế riêng một kỳ nghỉ độc bản: từ lựa chọn resort ẩn mình, chuyên gia thiền định 1:1, thực đơn thực dưỡng đến chuyên cơ đưa đón.'}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={() => {
                  if (onOpenCustomTour) onOpenCustomTour(activeSingleDestination?.name || 'Hành Trình Tự Chọn');
                  else if (onOpenBooking) onOpenBooking(activeSingleDestination ? { city: activeSingleDestination.name } : undefined);
                }}
                style={{
                  background: '#006d36',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 36px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 109, 54, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>Yêu Cầu Thiết Kế Tour Độc Quyền</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate('/tours')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '16px 32px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Khám Phá Tất Cả Gói Tour
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
