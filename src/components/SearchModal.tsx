import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickSearchItem {
  title: string;
  category: string;
  price: string;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickSearches: QuickSearchItem[] = [
    { title: 'Series Retreat Chữa Lành Thân Tâm Trí', category: 'Series Retreat', price: 'HOT' },
    { title: '"Bình Yên trên Cao Nguyên"', category: 'Retreat HOT', price: 'Trending' },
    { title: '"Tĩnh Lặng Giữa Đại Ngàn"', category: 'Retreat Bảo tồn', price: 'Mới' },
    { title: 'A Tip A Day - Cẩm Nang Tĩnh Tâm', category: '101 Điều HAY', price: 'Miễn Phí' },
    { title: 'Thiết Kế Lịch Trình Retreat 1:1', category: 'Vì sao chọn 4U?', price: 'Đặc Quyền' }
  ];

  const filtered = quickSearches.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
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
    }} onClick={onClose}>
      <div style={{
        width: '100%',
        maxWidth: '640px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(22, 48, 29, 0.4)',
        overflow: 'hidden',
        border: '1px solid rgba(74, 124, 89, 0.2)'
      }} onClick={e => e.stopPropagation()}>
        {/* Search Header Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(74, 124, 89, 0.15)',
          gap: '12px'
        }}>
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
              background: 'rgba(74, 124, 89, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#142619'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div style={{ padding: '24px', maxHeight: '420px', overflowY: 'auto' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#527059',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={14} color="#2d5a36" /> Gợi Ý Tìm Kiếm Phổ Biến
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map((item, idx) => (
              <a
                key={idx}
                href="#signatures"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '16px',
                  textDecoration: 'none',
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
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#527059', marginTop: '2px' }}>
                    {item.category}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#2d5a36',
                    background: 'rgba(45, 90, 54, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>
                    {item.price}
                  </span>
                  <ArrowRight size={16} color="#527059" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
