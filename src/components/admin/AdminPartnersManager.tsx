import React from 'react';
import { RefreshCw, Plus, Edit2, Trash2 } from 'lucide-react';
import './AdminPartnersManager.css';

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
    <div className="admin-partners-root">
      <div className="admin-partners-header">
        <div>
          <div className="admin-partners-meta-row">
            <span className="admin-partners-tag">
              4U RETREAT • MẠNG LƯỚI ĐỐI TÁC
            </span>
            <span className="admin-partners-dot" />
            <span className="admin-partners-subtag">
              Hệ Sinh Thái B2B
            </span>
          </div>
          <h1 className="admin-partners-title">
            Quản Lý Đối Tác Doanh Nghiệp ({filtered.length})
          </h1>
          <p className="admin-partners-desc">
            Danh sách đối tác khách sạn, resort, vận chuyển và liên minh du lịch nghỉ dưỡng cao cấp.
          </p>
        </div>
        <div className="admin-partners-btn-group">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="admin-partners-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => openCreateModal('partners')}
            className="admin-partners-add-btn"
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      <div className="admin-partners-grid">
        {filtered.map((partner) => (
          <div key={partner.id} className="admin-partners-card">
            <h3 className="admin-partners-card-name">{partner.name}</h3>
            <span className="admin-partners-card-category">{partner.category}</span>
            <div className="admin-partners-actions">
              <button
                onClick={() => openEditModal('partners', partner)}
                className="admin-partners-edit-btn"
                title="Chỉnh sửa"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDeleteItem('partners', partner.id)}
                className="admin-partners-delete-btn"
                title="Xóa"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
