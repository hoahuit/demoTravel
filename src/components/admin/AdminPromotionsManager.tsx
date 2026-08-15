import React from 'react';

interface AdminPromotionsManagerProps {
  promotionsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminPromotionsManager({
  promotionsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminPromotionsManagerProps) {
  const filtered = (promotionsList || []).filter(
    (p) =>
      String(p.code || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(p.title || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Chương Trình Khuyến Mãi
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Mã Ưu Đãi & Voucher ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('promotions')}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Thêm Mã Ưu Đãi Mới
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map((promo) => (
          <div key={promo.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '6px' }}>{promo.discountBadge || 'GIẢM 20%'}</span>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#081f13', margin: '10px 0 4px 0' }}>{promo.title}</h3>
            <p style={{ fontSize: '13px', color: '#525a54', margin: '0 0 12px 0' }}>Mã: <strong style={{ color: '#081f13', fontFamily: 'monospace' }}>{promo.code}</strong></p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button onClick={() => openEditModal('promotions', promo)} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Sửa</button>
              <button onClick={() => handleDeleteItem('promotions', promo.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
