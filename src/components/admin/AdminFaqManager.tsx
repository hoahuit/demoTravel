import React from 'react';
import { RefreshCw, Plus, Edit2, Trash2 } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import './AdminFaqManager.css';

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
    <div className="admin-faq-root">
      <div className="admin-faq-header">
        <div>
          <div className="admin-faq-meta-row">
            <span className="admin-faq-tag">
              4U RETREAT • HỖ TRỢ KHÁCH HÀNG
            </span>
            <span className="admin-faq-dot" />
            <span className="admin-faq-subtag">
              Hỏi Đáp & Trợ Giúp
            </span>
          </div>
          <h1 className="admin-faq-title">
            Câu Hỏi Thường Gặp FAQ ({filtered.length})
          </h1>
          <p className="admin-faq-desc">
            Quản lý các câu hỏi phổ biến và hướng dẫn trải nghiệm tour tĩnh dưỡng 4U Retreat.
          </p>
        </div>
        <div className="admin-faq-btn-group">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="admin-faq-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => openCreateModal('faq')}
            className="admin-faq-add-btn"
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      <div className="admin-faq-search-wrap">
        <input
          type="text"
          placeholder="Tìm câu hỏi..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="admin-faq-search-input"
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
        <div className="admin-faq-list">
          {filtered.map((item) => (
            <div key={item.id} className="admin-faq-card">
              <div>
                <span className="admin-faq-category">{item.category}</span>
                <h3 className="admin-faq-card-question">{item.question}</h3>
                <p className="admin-faq-card-answer">{item.answer}</p>
              </div>
              <div className="admin-faq-card-actions">
                <button
                  onClick={() => openEditModal('faq', item)}
                  className="admin-faq-edit-btn"
                  title="Chỉnh sửa"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem('faq', item.id)}
                  className="admin-faq-delete-btn"
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
