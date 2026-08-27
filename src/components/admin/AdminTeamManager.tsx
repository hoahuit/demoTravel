import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { getImageUrl } from '../../services/apiService';
import './AdminTeamManager.css';

interface AdminTeamManagerProps {
  teamList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminTeamManager({
  teamList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminTeamManagerProps) {
  const filtered = (teamList || []).filter(
    (m) => String(m.name || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar admin-team-sticky-bar">
        <div>
          <p className="admin-team-tag">
            Nhân Sự & Chuyên Gia
          </p>
          <h1 className="admin-team-title">
            Đội Ngũ Nhân Sự ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('team')}
          className="admin-team-add-btn"
        >
          + Thêm Thành Viên Mới
        </button>
      </div>

      <div className="admin-team-grid">
        {filtered.map((member) => (
          <div key={member.id} className="admin-team-card">
            <div className="admin-team-avatar-wrap">
              <img src={getImageUrl(member.portrait)} alt={member.name} className="admin-team-avatar-img" />
            </div>
            <h3 className="admin-team-member-name">{member.name}</h3>
            <p className="admin-team-member-role">{member.role}</p>
            <div className="admin-team-action-row">
              <button
                onClick={() => openEditModal('team', member)}
                className="admin-team-edit-btn"
                title="Chỉnh sửa"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDeleteItem('team', member.id)}
                className="admin-team-delete-btn"
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
