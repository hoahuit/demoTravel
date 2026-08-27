import React, { useState, useMemo, useEffect } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import './DepartureCalendarModal.css';

export interface DepartureCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

interface DepartureEvent {
  dateStr: string; // 'DD/MM/YYYY'
  day: number;
  month: number; // 1-12
  year: number;
  tour: TourPackage;
}

// Robust helper to parse various date formats (DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY, etc.)
function parseDateParts(dateInput: string): { day: number; month: number; year: number; formatted: string } | null {
  if (!dateInput || typeof dateInput !== 'string') return null;
  const trimmed = dateInput.trim();
  if (!trimmed || trimmed.toLowerCase().includes('tuần') || trimmed.toLowerCase().includes('tuan')) {
    return null; // Skip non-date labels like 'Hàng tuần'
  }

  // Format 1: DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10);
    const year = parseInt(dmyMatch[3], 10);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 2020 && year <= 2050) {
      const pad = (n: number) => (n < 10 ? '0' + n : String(n));
      return {
        day,
        month,
        year,
        formatted: `${pad(day)}/${pad(month)}/${year}`
      };
    }
  }

  // Format 2: YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = trimmed.match(/^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10);
    const day = parseInt(ymdMatch[3], 10);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 2020 && year <= 2050) {
      const pad = (n: number) => (n < 10 ? '0' + n : String(n));
      return {
        day,
        month,
        year,
        formatted: `${pad(day)}/${pad(month)}/${year}`
      };
    }
  }

  return null;
}

export default function DepartureCalendarModal({
  isOpen,
  onClose,
  onOpenBooking,
  onNavigate
}: DepartureCalendarModalProps) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);
  const [currentMonth, setCurrentMonth] = useState<number>(() => new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(() => new Date().getFullYear());
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (isOpen) {
      fetchToursApi().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          syncToursDataFromApi(data);
          setTours([...data]);
        }
      });
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Extract all departure events from tours
  const allEvents: DepartureEvent[] = useMemo(() => {
    const events: DepartureEvent[] = [];
    tours.forEach((tour) => {
      let datesArr: string[] = [];
      if (Array.isArray(tour.departureDates)) {
        datesArr = tour.departureDates;
      } else if (typeof tour.departureDates === 'string') {
        const rawStr = tour.departureDates as string;
        if (rawStr.startsWith('[')) {
          try {
            datesArr = JSON.parse(rawStr);
          } catch {
            datesArr = rawStr.split(',').map((s) => s.trim()).filter(Boolean);
          }
        } else {
          datesArr = rawStr.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }

      datesArr.forEach((dateStr) => {
        const parsed = parseDateParts(dateStr);
        if (parsed) {
          events.push({
            dateStr: parsed.formatted,
            day: parsed.day,
            month: parsed.month,
            year: parsed.year,
            tour
          });
        }
      });
    });
    return events;
  }, [tours]);

  // Smart auto-focus: if current month has 0 events but allEvents has data, focus on the first available event month
  useEffect(() => {
    if (allEvents.length > 0) {
      const hasEventsInCurrent = allEvents.some((ev) => ev.month === currentMonth && ev.year === currentYear);
      if (!hasEventsInCurrent) {
        const firstEv = allEvents[0];
        if (firstEv) {
          setCurrentMonth(firstEv.month);
          setCurrentYear(firstEv.year);
        }
      }
    }
  }, [allEvents]);

  if (!isOpen) return null;

  // Month names
  const monthNames = [
    '', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  // Helper to get total days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  // Helper to get starting day index (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const getFirstDayIndex = (month: number, year: number) => {
    const day = new Date(year, month - 1, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0
  };

  const daysInMonthCount = getDaysInMonth(currentMonth, currentYear);
  const startOffset = getFirstDayIndex(currentMonth, currentYear);

  // Category matching helper
  const matchTourCategory = (tour: TourPackage, selectedCat: string): boolean => {
    if (selectedCat === 'All') return true;
    const tourCat = (tour.category || '').toLowerCase();
    const cats = Array.isArray(tour.categories) ? tour.categories.map((c) => c.toLowerCase()) : [];

    if (selectedCat === 'Wellness') {
      return (
        tourCat === 'wellness' ||
        tourCat === 'healing' ||
        tourCat === 'chua-lanh' ||
        cats.includes('wellness') ||
        cats.includes('chua-lanh') ||
        cats.includes('healing')
      );
    }
    if (selectedCat === 'Conservation') {
      return (
        tourCat === 'conservation' ||
        tourCat === 'heritage' ||
        tourCat === 'bao-ton' ||
        cats.includes('conservation') ||
        cats.includes('heritage') ||
        cats.includes('bao-ton')
      );
    }
    if (selectedCat === 'Nature') {
      return tourCat === 'nature' || tourCat === 'thien-nhien' || cats.includes('nature') || cats.includes('thien-nhien');
    }
    if (selectedCat === 'Doc-Quyen') {
      return (
        tourCat === 'doc-quyen' ||
        tourCat === 'exclusive' ||
        tour.isExclusive === true ||
        cats.includes('doc-quyen') ||
        cats.includes('exclusive')
      );
    }
    if (selectedCat === 'Luxury') {
      return tourCat === 'luxury' || tourCat === 'cao-cap' || cats.includes('luxury') || cats.includes('cao-cap');
    }
    return tourCat.includes(selectedCat.toLowerCase()) || cats.includes(selectedCat.toLowerCase());
  };

  // Filtered events for the active month & category
  const activeMonthEvents = allEvents.filter((ev) => {
    const matchMonth = ev.month === currentMonth && ev.year === currentYear;
    const matchCat = matchTourCategory(ev.tour, selectedCategory);
    return matchMonth && matchCat;
  });

  // Map day -> events
  const dayEventsMap: { [day: number]: DepartureEvent[] } = {};
  activeMonthEvents.forEach((ev) => {
    if (!dayEventsMap[ev.day]) {
      dayEventsMap[ev.day] = [];
    }
    dayEventsMap[ev.day].push(ev);
  });

  // Tours departing on selected day, or all tours in active month
  const displayedTours = selectedDateFilter
    ? activeMonthEvents.filter((ev) => ev.dateStr === selectedDateFilter)
    : activeMonthEvents;

  const handlePrevMonth = () => {
    setSelectedDateFilter(null);
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDateFilter(null);
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(10, 18, 12, 0.84)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .compact-calendar-modal {
          animation: modalScaleIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cal-day-cell {
          height: 48px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid rgba(45, 90, 54, 0.12);
          padding: 4px 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
        }
        .cal-day-cell:hover {
          border-color: #2d5a36;
          box-shadow: 0 4px 12px rgba(45, 90, 54, 0.12);
          transform: translateY(-1px);
        }
        .cal-day-cell.is-selected {
          border-color: #1e4a3d;
          background: #edf5ef;
          box-shadow: 0 0 0 2px #1e4a3d;
        }
        .cal-day-cell.has-events {
          background: #f5f9f6;
        }
        .cal-event-pill {
          font-size: 9px;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 4px;
          background: #1e4a3d;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 2px;
          line-height: 1.1;
        }
        .cal-tour-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid rgba(45, 90, 54, 0.14);
          overflow: hidden;
          display: flex;
          gap: 12px;
          padding: 10px;
          transition: all 0.25s ease;
          cursor: pointer;
          flex-shrink: 0;
          min-height: 76px;
          box-sizing: border-box;
        }
        .cal-tour-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 32, 27, 0.08);
          border-color: #2d5a36;
        }
        .cal-tours-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(45, 90, 54, 0.4) transparent;
        }
        .cal-tours-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .cal-tours-scroll::-webkit-scrollbar-track {
          background: rgba(45, 90, 54, 0.05);
          border-radius: 99px;
        }
        .cal-tours-scroll::-webkit-scrollbar-thumb {
          background: rgba(45, 90, 54, 0.35);
          border-radius: 99px;
        }
        .cal-tours-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 90, 54, 0.6);
        }
        @media (max-width: 900px) {
          .cal-main-layout {
            grid-template-columns: 1fr !important;
          }
          .cal-day-cell {
            height: 40px;
            padding: 2px 4px;
          }
        }
      `}</style>

      <div
        className="compact-calendar-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#f8faf8',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '92vh',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          position: 'relative',
          padding: '24px 28px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#ef4444',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>

        {/* MODAL COMPACT HEADER */}
        <div style={{ marginBottom: '16px', flexShrink: 0 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '99px',
              background: 'rgba(45, 90, 54, 0.1)',
              color: '#2d5a36',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}
          >
            <CalendarIcon size={13} /> LỊCH KHỞI HÀNH {currentYear}
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              fontWeight: 600,
              color: '#10201B',
              margin: '0 0 2px 0'
            }}
          >
            Lịch Khởi Hành Các Chuyến Retreat
          </h2>
          <p style={{ fontSize: '13px', color: '#527059', margin: 0 }}>
            Chọn ngày khởi hành trên lịch để xem các chuyến đi ấn định trong tháng.
          </p>
        </div>

        {/* MAIN LAYOUT: CALENDAR GRID ON LEFT, DETAILED TOURS ON RIGHT */}
        <div
          className="cal-main-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '24px',
            alignItems: 'start',
            overflow: 'hidden',
            flexGrow: 1
          }}
        >
          {/* LEFT: CALENDAR VIEW */}
          <div style={{ background: '#ffffff', borderRadius: '18px', padding: '16px', border: '1px solid rgba(45, 90, 54, 0.12)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            
            {/* MONTH SWITCHER & FILTER BAR */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handlePrevMonth}
                  style={{
                    background: '#f0f4f1',
                    border: 'none',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#1e4a3d',
                    fontWeight: 700
                  }}
                  title="Tháng trước"
                >
                  <ChevronLeft size={16} />
                </button>

                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: 700, color: '#1e4a3d' }}>
                  {monthNames[currentMonth]} {currentYear}
                </span>

                <button
                  onClick={handleNextMonth}
                  style={{
                    background: '#f0f4f1',
                    border: 'none',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#1e4a3d',
                    fontWeight: 700
                  }}
                  title="Tháng sau"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Category Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Filter size={13} color="#527059" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    background: '#f4f8f5',
                    border: '1px solid rgba(45, 90, 54, 0.2)',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#1e4a3d',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="All">Tất cả loại hình</option>
                  <option value="Wellness">Retreat Chữa Lành</option>
                  <option value="Conservation">Retreat Bảo Tồn</option>
                  <option value="Nature">Retreat Thiên Nhiên</option>
                  <option value="Doc-Quyen">Retreat Độc Quyền</option>
                  <option value="Luxury">Retreat Cao Cấp 5★</option>
                </select>
              </div>
            </div>

            {/* WEEKDAY HEADERS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '6px' }}>
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((dayName, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: idx >= 5 ? '#e11d48' : '#2d5a36',
                    padding: '2px 0'
                  }}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* DAYS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
              {/* Empty leading offset cells */}
              {Array.from({ length: startOffset }).map((_, idx) => (
                <div key={`empty-${idx}`} style={{ height: '48px', background: 'transparent' }} />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonthCount }).map((_, idx) => {
                const dayNum = idx + 1;
                const dayDateStr = `${dayNum < 10 ? '0' + dayNum : dayNum}/${currentMonth < 10 ? '0' + currentMonth : currentMonth}/${currentYear}`;
                const events = dayEventsMap[dayNum] || [];
                const hasEvents = events.length > 0;
                const isSelected = selectedDateFilter === dayDateStr;

                return (
                  <div
                    key={dayNum}
                    className={`cal-day-cell ${hasEvents ? 'has-events' : ''} ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      if (hasEvents) {
                        setSelectedDateFilter(isSelected ? null : dayDateStr);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: hasEvents ? 800 : 600, color: hasEvents ? '#1e4a3d' : '#88998c' }}>
                        {dayNum}
                      </span>
                      {hasEvents && (
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e11d48' }} />
                      )}
                    </div>

                    {/* Event pills inside day cell */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {events.slice(0, 1).map((ev, eIdx) => (
                        <div key={eIdx} className="cal-event-pill">
                          <Sparkles size={8} />
                          <span>{(ev.tour.city || 'Việt Nam').split(',')[0]}</span>
                        </div>
                      ))}
                      {events.length > 1 && (
                        <span style={{ fontSize: '8.5px', color: '#1e4a3d', fontWeight: 700, lineHeight: 1 }}>+{events.length - 1} chuyến</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: 'auto', paddingTop: '12px', fontSize: '11.5px', color: '#527059' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1e4a3d' }} />
                <span>Ngày có chuyến đi ({activeMonthEvents.length})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48' }} />
                <span>Số chỗ hạn chế</span>
              </div>
            </div>

          </div>

          {/* RIGHT: TOURS LIST FOR SELECTED DATE OR ACTIVE MONTH */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(45, 90, 54, 0.14)', flexShrink: 0 }}>
              <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#10201B', margin: 0 }}>
                {selectedDateFilter ? `Khởi Hành Ngày ${selectedDateFilter}` : `Chuyến Trong ${monthNames[currentMonth]} (${displayedTours.length})`}
              </h3>
              {selectedDateFilter && (
                <button
                  onClick={() => setSelectedDateFilter(null)}
                  style={{ background: 'none', border: 'none', color: '#2d5a36', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Xem tất cả ({activeMonthEvents.length})
                </button>
              )}
            </div>

            <div className="cal-tours-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '380px', paddingRight: '4px' }}>
              {displayedTours.length === 0 ? (
                <div style={{ padding: '30px 16px', textAlign: 'center', background: '#ffffff', borderRadius: '14px', border: '1px solid rgba(45, 90, 54, 0.12)' }}>
                  <CalendarIcon size={28} color="#738d7a" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10201B' }}>Chưa có lịch khởi hành trong tháng {currentMonth}/{currentYear}</div>
                  <p style={{ fontSize: '11.5px', color: '#527059', margin: '4px 0 0' }}>Dùng mũi tên để chuyển tháng hoặc chọn loại hình khác.</p>
                </div>
              ) : (
                displayedTours.map((ev, idx) => (
                  <div
                    key={`${ev.tour.id}-${ev.dateStr}-${idx}`}
                    className="cal-tour-card"
                    onClick={() => {
                      onClose();
                      if (onNavigate) {
                        onNavigate(`/sanpham/${ev.tour.slug}`);
                      } else if (onOpenBooking) {
                        onOpenBooking(ev.tour);
                      }
                    }}
                  >
                    <img
                      src={getImageUrl(ev.tour.heroImage)}
                      alt={ev.tour.title}
                      style={{ width: '76px', height: '68px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontWeight: 700, color: '#2d5a36', marginBottom: '2px' }}>
                        <Clock size={11} />
                        <span>{ev.dateStr} • {ev.tour.duration || '3N2Đ'}</span>
                      </div>

                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#10201B', margin: '0 0 4px 0', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                        {ev.tour.title}
                      </h4>

                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e4a3d' }}>
                          {(ev.tour.price || 0).toLocaleString('vi-VN')} ₫
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                            if (onOpenBooking) {
                              onOpenBooking(ev.tour);
                            } else if (onNavigate) {
                              onNavigate(`/sanpham/${ev.tour.slug}`);
                            }
                          }}
                          style={{
                            background: '#1e4a3d',
                            color: '#ffffff',
                            border: 'none',
                            padding: '5px 12px',
                            borderRadius: '99px',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>Giữ chỗ</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

