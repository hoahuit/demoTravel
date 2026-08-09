import React from 'react';
import { getImageUrl } from '../../services/apiService';
import EmptyState from '../ui/EmptyState';

interface AdminDestinationsManagerProps {
  destinationsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminDestinationsManager({
  destinationsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminDestinationsManagerProps) {
  const filtered = (destinationsList || []).filter(
    (d) =>
      String(d.name || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(d.country || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Địa Điểm Nghỉ Dưỡng
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Điểm Đến Tĩnh Dưỡng ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('destinations')}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Thêm Điểm Đến Mới
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm điểm đến theo tên, quốc gia..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Chưa có điểm đến tĩnh dưỡng nào"
          description="Không tìm thấy địa điểm nào phù hợp với tìm kiếm của bạn."
          actionLabel="+ Thêm Điểm Đến Mới"
          onAction={() => openCreateModal('destinations')}
          transparent={true}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filtered.map((dest) => (
            <div key={dest.slug} style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(6, 27, 14, 0.08)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '160px', width: '100%', overflow: 'hidden' }}>
                <img src={getImageUrl(dest.heroImage)} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>{dest.country}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#081f13', margin: '4px 0 6px 0' }}>{dest.name}</h3>
                  <p style={{ fontSize: '13px', color: '#525a54', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{dest.overview}</p>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button onClick={() => openEditModal('destinations', dest)} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Chỉnh Sửa</button>
                  <button onClick={() => handleDeleteItem('destinations', dest.slug)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
