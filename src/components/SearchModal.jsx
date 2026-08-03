import React, { useState, useEffect } from 'react';
import { Search, X, Compass, MapPin, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickSearches = [
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
        border: '1px solid rgba(74, 124, 89, 0.25)'
      }} onClick={e => e.stopPropagation()}>

        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(74, 124, 89, 0.15)'
        }}>
          <Search size={22} color="#2d5a36" />
          <input
            type="text"
            placeholder="Tìm kiếm tour retreat, điểm đến, kinh nghiệm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              fontFamily: 'inherit',
              color: '#142619'
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: '#f2f6f3',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#527059'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div style={{ padding: '20px 24px', maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#527059', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {query ? 'Kết quả tìm kiếm' : 'Gợi ý tìm kiếm nổi bật'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map((item, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: '#f5f9f6',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#eaf2eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f9f6'}
                onClick={() => { alert(`Mở ${item.title}`); onClose(); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #2d5a36 0%, #16301d 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Compass size={18} style={{ color: '#4ade80' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#142619' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#527059' }}>{item.category}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2d5a36' }}>{item.price}</span>
                  <ArrowRight size={16} color="#527059" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info in Modal */}
        <div style={{
          padding: '12px 24px',
          background: '#f2f6f3',
          fontSize: '0.8rem',
          color: '#527059',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Nhấn <strong>ESC</strong> để đóng</span>
          <span>4U Retreat Search Engine</span>
        </div>
      </div>
    </div>
  );
}
