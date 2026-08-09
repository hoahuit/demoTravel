import React from 'react';
import { getImageUrl } from '../../services/apiService';

interface AdminTeamManagerProps {
  teamList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminTeamManager({
  teamList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminTeamManagerProps) {
  const filtered = (teamList || []).filter(
    (m) => String(m.name || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Nhân Sự & Chuyên Gia
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Đội Ngũ Nhân Sự ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('team')}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Thêm Thành Viên Mới
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filtered.map((member) => (
          <div key={member.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid rgba(6, 27, 14, 0.08)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px auto' }}>
              <img src={getImageUrl(member.portrait)} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#081f13', margin: '0 0 4px 0' }}>{member.name}</h3>
            <p style={{ fontSize: '12px', color: '#059669', fontWeight: 600, margin: '0 0 12px 0' }}>{member.role}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button onClick={() => openEditModal('team', member)} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Sửa</button>
              <button onClick={() => handleDeleteItem('team', member.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
