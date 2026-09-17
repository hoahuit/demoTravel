import React from 'react';
import { RefreshCw, Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import { getImageUrl } from '../../services/apiService';

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
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • MẠNG LƯỚI ĐỐI TÁC
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Hệ Sinh Thái B2B
            </span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Quản Lý Đối Tác Doanh Nghiệp ({filtered.length})
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Danh sách đối tác khách sạn, resort, vận chuyển và liên minh du lịch nghỉ dưỡng cao cấp.
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
            onClick={() => openCreateModal('partners')}
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
            <span>Thêm Đối Tác</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '20px' }}>
        {filtered.map((partner) => {
          const logoSrc = partner.logoText || partner.logo || partner.imageUrl;
          const isImage = typeof logoSrc === 'string' && (
            logoSrc.startsWith('http') ||
            logoSrc.startsWith('/uploads') ||
            logoSrc.startsWith('data:image') ||
            /\.(png|jpe?g|svg|webp|gif)$/i.test(logoSrc)
          );

          return (
            <div
              key={partner.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Logo Display Box - Standardized uniform dimension */}
              <div
                style={{
                  width: '100%',
                  height: '84px',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  padding: '8px',
                  boxSizing: 'border-box',
                  overflow: 'hidden'
                }}
              >
                {isImage ? (
                  <img
                    src={getImageUrl(logoSrc)}
                    alt={partner.name}
                    style={{ width: '140px', height: '56px', objectFit: 'contain', display: 'block' }}
                  />
                ) : logoSrc ? (
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f766e', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{logoSrc}</span>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px', fontWeight: 500 }}>
                    <Building2 size={18} />
                    <span>Chưa có ảnh logo</span>
                  </div>
                )}
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                {partner.name}
              </h3>
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#0f766e', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
                {partner.category || 'Đối tác'}
              </span>

              {/* Action buttons unified per Rule 85.4 */}
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px', width: '100%' }}>
                <button
                  type="button"
                  onClick={() => openEditModal('partners', partner)}
                  style={{
                    width: '50px',
                    height: '32px',
                    border: '1px solid #e5e7eb',
                    background: '#f9fafb',
                    color: '#374151',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  title="Chỉnh sửa logo & thông tin"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteItem('partners', partner.id)}
                  style={{
                    width: '50px',
                    height: '32px',
                    border: '1px solid #fecaca',
                    background: '#fff1f2',
                    color: '#b91c1c',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  title="Xóa đối tác"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
