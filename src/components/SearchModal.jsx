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
    { title: 'Summer Promo in Saigon', category: 'Promotions', price: 'From USD 85' },
    { title: '"Smooth Arrival" Combos', category: 'Transfers & Stay', price: 'From USD 99' },
    { title: 'A Timeless Coastal Journey', category: 'Da Nang & Hoi An', price: 'Popular' },
    { title: 'Tranquility & Purity Retreat', category: 'Healing & Wellness', price: 'Featured' },
    { title: 'The Other Side of Hoi An', category: 'Cultural Exploration', price: 'Must-Try' }
  ];

  const filtered = quickSearches.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.4)',
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
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }} onClick={e => e.stopPropagation()}>

        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Search size={22} color="#86868b" />
          <input
            type="text"
            placeholder="Search tours, retreats, destinations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.1rem',
              fontFamily: 'inherit',
              color: '#1d1d1f'
            }}
          />
          <button 
            onClick={onClose}
            style={{
              background: '#f5f5f7',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#86868b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div style={{ padding: '20px 24px', maxHeight: '400px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: '#86868b', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {query ? 'Search Results' : 'Suggested Experiences'}
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
                  background: '#f9f9fb',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f5'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#f9f9fb'}
                onClick={() => { alert(`Opening ${item.title}`); onClose(); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#1d1d1f',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Compass size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1d1d1f' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#86868b' }}>{item.category}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0066cc' }}>{item.price}</span>
                  <ArrowRight size={16} color="#86868b" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info in Modal */}
        <div style={{
          padding: '12px 24px',
          background: '#f5f5f7',
          fontSize: '0.8rem',
          color: '#86868b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Press <strong>ESC</strong> to close</span>
          <span>4U Tours Search Engine</span>
        </div>
      </div>
    </div>
  );
}
