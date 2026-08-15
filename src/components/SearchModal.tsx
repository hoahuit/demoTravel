import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { TOURS_DATA, TourPackage } from '../data/toursData';
import { fetchToursApi } from '../services/apiService';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export default function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState<string>('');
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setTours(data);
      }
    });
  }, []);

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTours = query.trim()
    ? tours.filter(
        t =>
          (t.title && t.title.toLowerCase().includes(query.toLowerCase())) ||
          (t.city && t.city.toLowerCase().includes(query.toLowerCase())) ||
          (t.category && t.category.toLowerCase().includes(query.toLowerCase())) ||
          (t.subtitle && t.subtitle.toLowerCase().includes(query.toLowerCase()))
      )
    : tours.slice(0, 6);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(5, 12, 7, 0.65)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(22, 48, 29, 0.4)',
          overflow: 'hidden',
          border: '1px solid rgba(74, 124, 89, 0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(74, 124, 89, 0.15)',
            gap: '12px'
          }}
        >
          <Search size={22} color="#2d5a36" />
          <input
            type="text"
            placeholder="Tìm kiếm Retreat, Combo, hoặc điểm đến..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              color: '#142619',
              background: 'transparent'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div style={{ padding: '24px', maxHeight: '420px', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              color: '#527059',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} color="#2d5a36" />{' '}
            {query.trim() ? `Kết Quả Tìm Kiếm (${filteredTours.length})` : 'Gợi Ý Hành Trình Nổi Bật'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredTours.map((tour, idx) => (
              <div
                key={tour.id || tour.slug || idx}
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate(`/tour/${tour.slug}`);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  background: 'rgba(74, 124, 89, 0.04)',
                  transition: 'all 0.2s ease',
                  border: '1px solid transparent'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(74, 124, 89, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(74, 124, 89, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(74, 124, 89, 0.04)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#142619' }}>
                    {tour.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#527059', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={12} color="#2d5a36" />
                    <span>{tour.city} • {tour.duration || '3 Ngày 2 Đêm'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#2d5a36',
                      background: 'rgba(45, 90, 54, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}
                  >
                    {tour.price ? `${tour.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
                  </span>
                  <ArrowRight size={16} color="#527059" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
