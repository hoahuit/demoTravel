import React from 'react';
import { RefreshCw, Plus, Edit2, Trash2 } from 'lucide-react';
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
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • HỖ TRỢ KHÁCH HÀNG
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Hỏi Đáp & Trợ Giúp
            </span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Câu Hỏi Thường Gặp FAQ ({filtered.length})
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Quản lý các câu hỏi phổ biến và hướng dẫn trải nghiệm tour tĩnh dưỡng 4U Retreat.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => openCreateModal('faq')}
            style={{
              backgroundColor: '#0f766e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(15, 118, 110, 0.2)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#115e59')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
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
              <div style={{ display: 'flex', gap: '8px', minWidth: '110px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => openEditModal('faq', item)}
                  style={{
                    width: '50px',
                    height: '32px',
                    backgroundColor: '#081f13',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Chỉnh sửa"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem('faq', item.id)}
                  style={{
                    width: '50px',
                    height: '32px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: '1px solid #fca5a5',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Xóa"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
