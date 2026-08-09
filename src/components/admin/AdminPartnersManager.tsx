import React from 'react';

interface AdminPartnersManagerProps {
  partnersList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminPartnersManager({
  partnersList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminPartnersManagerProps) {
  const filtered = (partnersList || []).filter(
    (p) => String(p.name || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Mạng Lưới Đối Tác
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Đối Tác Doanh Nghiệp ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('partners')}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Thêm Đối Tác Mới
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filtered.map((partner) => (
          <div key={partner.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid rgba(6, 27, 14, 0.08)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#081f13', margin: '0 0 6px 0' }}>{partner.name}</h3>
            <span style={{ fontSize: '12px', color: '#525a54' }}>{partner.category}</span>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button onClick={() => openEditModal('partners', partner)} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDeleteItem('partners', partner.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
