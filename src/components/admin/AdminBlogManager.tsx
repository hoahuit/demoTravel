import React from 'react';
import { RefreshCw, Plus, Edit2, Trash2 } from 'lucide-react';
import { getImageUrl } from '../../services/apiService';
import EmptyState from '../ui/EmptyState';
import './AdminBlogManager.css';

interface AdminBlogManagerProps {
  blogsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminBlogManager({
  blogsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminBlogManagerProps) {
  const filtered = (blogsList || []).filter(
    (b) =>
      String(b.title || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(b.category || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="admin-blog-root">
      <div className="admin-blog-header">
        <div>
          <div className="admin-blog-meta-row">
            <span className="admin-blog-tag">
              4U RETREAT • TIN TỨC & CẨM NANG
            </span>
            <span className="admin-blog-dot" />
            <span className="admin-blog-subtag">
              Điều Hay & Chữa Lành
            </span>
          </div>
          <h1 className="admin-blog-title">
            Quản Lý Bài Viết ({filtered.length})
          </h1>
          <p className="admin-blog-desc">
            Biên tập, phân loại và quản lý các bài viết cẩm nang, lối sống tĩnh dưỡng của 4U Retreat.
          </p>
        </div>
        <div className="admin-blog-btn-group">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="admin-blog-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => openCreateModal('blog')}
            className="admin-blog-add-btn"
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      <div className="admin-blog-search-wrap">
        <input
          type="text"
          placeholder="Tìm bài viết theo tiêu đề, danh mục..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="admin-blog-search-input"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Chưa có bài viết blog nào"
          description="Không tìm thấy bài viết phù hợp với tiêu đề hoặc danh mục bạn tìm kiếm."
          actionLabel="+ Thêm Bài Viết Mới"
          onAction={() => openCreateModal('blog')}
          transparent={true}
        />
      ) : (
        <div className="admin-blog-grid">
          {filtered.map((blog) => (
            <div key={blog.id} className="admin-blog-card">
              <div className="admin-blog-card-img-wrap">
                <img src={getImageUrl(blog.heroImage)} alt={blog.title} className="admin-blog-card-img" />
              </div>
              <div className="admin-blog-card-body">
                <div>
                  <span className="admin-blog-card-category">{blog.category}</span>
                  <h3 className="admin-blog-card-title">{blog.title}</h3>
                  <p className="admin-blog-card-sub">{blog.subtitle}</p>
                </div>
                <div className="admin-blog-card-actions">
                  <button
                    onClick={() => openEditModal('blog', blog)}
                    className="admin-blog-edit-btn"
                    title="Chỉnh sửa"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem('blog', blog.id)}
                    className="admin-blog-delete-btn"
                    title="Xóa"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
