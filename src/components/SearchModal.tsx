import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { TOURS_DATA, TourPackage } from '../data/toursData';
import { fetchToursApi } from '../services/apiService';
import './SearchModal.css';

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
          (Array.isArray(t.categories) && t.categories.some((c: string) => c.toLowerCase().includes(query.toLowerCase()))) ||
          (t.subtitle && t.subtitle.toLowerCase().includes(query.toLowerCase()))
      )
    : tours.slice(0, 6);

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="search-modal-box"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="search-modal-header">
          <Search size={22} color="#2d5a36" />
          <input
            type="text"
            placeholder="Tìm kiếm Retreat, Combo, hoặc điểm đến..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="search-modal-input"
          />
          <button
            onClick={onClose}
            className="search-modal-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div className="search-modal-results">
          <div className="search-results-title">
            <Sparkles size={14} color="#2d5a36" />{' '}
            {query.trim() ? `Kết Quả Tìm Kiếm (${filteredTours.length})` : 'Gợi Ý Hành Trình Nổi Bật'}
          </div>

          <div className="search-results-list">
            {filteredTours.map((tour, idx) => (
              <div
                key={tour.id || tour.slug || idx}
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate(`/tour/${tour.slug}`);
                  }
                }}
                className="search-result-item"
              >
                <div>
                  <div className="search-result-title">
                    {tour.title}
                  </div>
                  <div className="search-result-meta">
                    <MapPin size={12} color="#2d5a36" />
                    <span>{tour.city} • {tour.duration || '3 Ngày 2 Đêm'}</span>
                  </div>
                </div>

                <div className="search-result-action">
                  <span className="search-result-price">
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
