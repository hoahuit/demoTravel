import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { getImageUrl } from '../../services/apiService';
import './AdminServicesManager.css';

interface AdminServicesManagerProps {
  servicesList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminServicesManager({
  servicesList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminServicesManagerProps) {
  const filtered = (servicesList || []).filter(
    (s) => String(s.title || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar admin-services-sticky-bar">
        <div>
          <p className="admin-services-tag">
            Dịch Vụ Cao Cấp
          </p>
          <h1 className="admin-services-title">
            Dịch Vụ Retreat ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('services')}
          className="admin-services-add-btn"
        >
          + Thêm Dịch Vụ Mới
        </button>
      </div>

      <div className="admin-services-grid">
        {filtered.map((service) => (
          <div key={service.id} className="admin-services-card">
            <div className="admin-services-card-img-wrap">
              <img src={getImageUrl(service.heroImage)} alt={service.title} className="admin-services-card-img" />
            </div>
            <div className="admin-services-card-body">
              <h3 className="admin-services-card-title">{service.title}</h3>
              <p className="admin-services-card-sub">{service.subtitle}</p>
              <div className="admin-services-actions">
                <button
                  onClick={() => openEditModal('services', service)}
                  className="admin-services-edit-btn"
                  title="Chỉnh sửa"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteItem('services', service.id)}
                  className="admin-services-delete-btn"
                  title="Xóa"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
