import React from 'react';
import EmptyState from '../ui/EmptyState';

interface AdminFaqManagerProps {
  faqList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminFaqManager({
  faqList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminFaqManagerProps) {
  const filtered = (faqList || []).filter(
    (f) =>
      String(f.question || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(f.category || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Hỗ Trợ Khách Hàng
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Câu Hỏi Thường Gặp FAQ ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('faq')}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Thêm Câu Hỏi Mới
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm câu hỏi..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Chưa có câu hỏi FAQ nào"
          description="Không tìm thấy câu hỏi hỗ trợ nào khớp với tìm kiếm của bạn."
          actionLabel="+ Thêm Câu Hỏi Mới"
          onAction={() => openCreateModal('faq')}
          transparent={true}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid rgba(6, 27, 14, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>{item.category}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#081f13', margin: '4px 0 8px 0' }}>{item.question}</h3>
                <p style={{ fontSize: '14px', color: '#525a54', margin: 0 }}>{item.answer}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', minWidth: '140px', justifyContent: 'flex-end' }}>
                <button onClick={() => openEditModal('faq', item)} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Chỉnh Sửa</button>
                <button onClick={() => handleDeleteItem('faq', item.id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
