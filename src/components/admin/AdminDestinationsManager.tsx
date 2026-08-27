import React from 'react';
import { RefreshCw, Plus, Edit2, Trash2 } from 'lucide-react';
import { getImageUrl } from '../../services/apiService';
import EmptyState from '../ui/EmptyState';
import './AdminDestinationsManager.css';

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
    <div className="admin-dest-root">
      <div className="admin-dest-header">
        <div>
          <div className="admin-dest-meta-row">
            <span className="admin-dest-tag">
              4U RETREAT • ĐỊA ĐIỂM NGHỈ DƯỠNG
            </span>
            <span className="admin-dest-dot" />
            <span className="admin-dest-subtag">
              Danh Thắng & Kỳ Quan
            </span>
          </div>
          <h1 className="admin-dest-title">
            Quản Lý Điểm Đến ({filtered.length})
          </h1>
          <p className="admin-dest-desc">
            Quản lý thông tin các vùng danh thắng, kỳ quan và trung tâm tĩnh dưỡng khắp Việt Nam.
          </p>
        </div>
        <div className="admin-dest-btn-group">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="admin-dest-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={() => openCreateModal('destinations')}
            className="admin-dest-add-btn"
          >
            <Plus size={15} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      <div className="admin-dest-search-wrap">
        <input
          type="text"
          placeholder="Tìm điểm đến theo tên, quốc gia..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="admin-dest-search-input"
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
        <div className="admin-dest-grid">
          {filtered.map((dest) => (
            <div key={dest.slug} className="admin-dest-card">
              <div className="admin-dest-card-img-wrap">
                <img src={getImageUrl(dest.heroImage)} alt={dest.name} className="admin-dest-card-img" />
              </div>
              <div className="admin-dest-card-body">
                <div>
                  <span className="admin-dest-card-country">{dest.country}</span>
                  <h3 className="admin-dest-card-name">{dest.name}</h3>
                  <p className="admin-dest-card-overview">{dest.overview}</p>
                </div>
                <div className="admin-dest-card-actions">
                  <button onClick={() => openEditModal('destinations', dest)} className="admin-dest-edit-btn" title="Chỉnh sửa"><Edit2 size={14} /></button>
                  <button onClick={() => handleDeleteItem('destinations', dest.slug)} className="admin-dest-delete-btn" title="Xóa"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
