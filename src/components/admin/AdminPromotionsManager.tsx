import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import './AdminPromotionsManager.css';

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
      <div className="serene-sticky-bar admin-promo-sticky-bar">
        <div>
          <p className="admin-promo-tag">
            Chương Trình Khuyến Mãi
          </p>
          <h1 className="admin-promo-title">
            Mã Ưu Đãi & Voucher ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('promotions')}
          className="admin-promo-add-btn"
        >
          + Thêm Mã Ưu Đãi Mới
        </button>
      </div>

      <div className="admin-promo-grid">
        {filtered.map((promo) => (
          <div key={promo.id} className="admin-promo-card">
            <span className="admin-promo-badge">{promo.discountBadge || 'GIẢM 20%'}</span>
            <h3 className="admin-promo-card-title">{promo.title}</h3>
            <p className="admin-promo-card-desc">Mã: <strong className="admin-promo-code-text">{promo.code}</strong></p>
            <div className="admin-promo-actions">
              <button
                onClick={() => openEditModal('promotions', promo)}
                className="admin-promo-edit-btn"
                title="Chỉnh sửa"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDeleteItem('promotions', promo.id)}
                className="admin-promo-delete-btn"
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
