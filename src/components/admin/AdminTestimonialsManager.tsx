import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import './AdminTestimonialsManager.css';

interface AdminTestimonialsManagerProps {
  testimonialsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminTestimonialsManager({
  testimonialsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminTestimonialsManagerProps) {
  const filtered = testimonialsList.filter(t =>
    t.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    t.comment?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      <div className="admin-testimonials-header">
        <div>
          <h2 className="admin-testimonials-title">
            Đánh Giá & Trải Nghiệm Khách Hàng (Testimonials)
          </h2>
          <p className="admin-testimonials-desc">
            Quản lý feedback, review và cảm nhận từ các hành khách đã tham gia retreat.
          </p>
        </div>
        <button onClick={() => openCreateModal('testimonials')} className="admin-testimonials-add-btn">+ Thêm Đánh Giá</button>
      </div>

      <div className="admin-testimonials-grid">
        {filtered.map((item) => (
          <div key={item.id} className="admin-testimonials-card">
            <div>
              <div className="admin-testimonials-user-row">
                <img src={item.avatar} alt={item.name} className="admin-testimonials-avatar" />
                <div>
                  <h4 className="admin-testimonials-name">{item.name}</h4>
                  <span className="admin-testimonials-occupation">{item.occupation}</span>
                </div>
              </div>
              <p className="admin-testimonials-comment">"{item.comment}"</p>
            </div>
            <div className="admin-testimonials-actions">
              <button
                onClick={() => openEditModal('testimonials', item)}
                className="admin-testimonials-edit-btn"
                title="Chỉnh sửa"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDeleteItem('testimonials', item.id)}
                className="admin-testimonials-delete-btn"
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
