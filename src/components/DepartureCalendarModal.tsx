import React, { useState, useMemo, useEffect } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { TOURS_DATA, TourPackage } from '../data/toursData';

export interface DepartureCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

interface DepartureEvent {
  dateStr: string; // 'DD/MM/YYYY'
  day: number;
  month: number; // 8, 9, 10
  year: number; // 2026
  tour: TourPackage;
}

export default function DepartureCalendarModal({
  isOpen,
  onClose,
  onOpenBooking,
  onNavigate
}: DepartureCalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState<number>(9); // 9 = Sept 2026, 8 = Aug 2026
  const [currentYear] = useState<number>(2026);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  // Extract all departure events from TOURS_DATA
  const allEvents: DepartureEvent[] = useMemo(() => {
    const events: DepartureEvent[] = [];
    TOURS_DATA.forEach((tour) => {
      tour.departureDates?.forEach((dateStr) => {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          events.push({
            dateStr,
            day,
            month,
            year,
            tour
          });
        }
      });
    });
    return events;
  }, []);

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

  // Filtered events for the active month & category
  const activeMonthEvents = allEvents.filter((ev) => {
    const matchMonth = ev.month === currentMonth && ev.year === currentYear;
    const matchCat = selectedCategory === 'All' || ev.tour.category === selectedCategory;
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
    if (currentMonth > 8) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(10);
    }
  };

  const handleNextMonth = () => {
    setSelectedDateFilter(null);
    if (currentMonth < 10) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(8);
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
            <CalendarIcon size={13} /> LỊCH KHỞI HÀNH 2026
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
                          <span>{ev.tour.city.split(',')[0]}</span>
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
                <span>Ngày có chuyến đi</span>
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
                {selectedDateFilter ? `Khởi Hành Ngày ${selectedDateFilter}` : `Chuyến Trong ${monthNames[currentMonth]}`}
              </h3>
              {selectedDateFilter && (
                <button
                  onClick={() => setSelectedDateFilter(null)}
                  style={{ background: 'none', border: 'none', color: '#2d5a36', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Xem tất cả
                </button>
              )}
            </div>

            <div className="cal-tours-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '380px', paddingRight: '4px' }}>
              {displayedTours.length === 0 ? (
                <div style={{ padding: '30px 16px', textAlign: 'center', background: '#ffffff', borderRadius: '14px', border: '1px solid rgba(45, 90, 54, 0.12)' }}>
                  <CalendarIcon size={28} color="#738d7a" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10201B' }}>Chưa có lịch khởi hành</div>
                  <p style={{ fontSize: '11.5px', color: '#527059', margin: '4px 0 0' }}>Chọn ngày có điểm đỏ trên lịch để xem chuyến đi.</p>
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
                      src={ev.tour.heroImage}
                      alt={ev.tour.title}
                      style={{ width: '76px', height: '68px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontWeight: 700, color: '#2d5a36', marginBottom: '2px' }}>
                        <Clock size={11} />
                        <span>{ev.dateStr} • {ev.tour.duration}</span>
                      </div>

                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#10201B', margin: '0 0 4px 0', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                        {ev.tour.title}
                      </h4>

                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e4a3d' }}>
                          {ev.tour.price.toLocaleString('vi-VN')} ₫
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
