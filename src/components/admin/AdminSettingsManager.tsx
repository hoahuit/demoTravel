import React from 'react';
import { RefreshCw, Save } from 'lucide-react';
import './AdminSettingsManager.css';

interface AdminSettingsManagerProps {
  settingsState: any;
  setSettingsState: (val: any) => void;
  toast: any;
}

export default function AdminSettingsManager({ settingsState, setSettingsState, toast }: AdminSettingsManagerProps) {
  const handleSaveSettings = () => {
    toast.success('Đã lưu cấu hình hệ thống!');
  };

  return (
    <div className="admin-settings-root">
      <div className="admin-settings-header">
        <div>
          <div className="admin-settings-meta-row">
            <span className="admin-settings-tag">
              4U RETREAT • HỆ THỐNG & CẤU HÌNH
            </span>
            <span className="admin-settings-dot" />
            <span className="admin-settings-subtag">
              Thiết Lập Chung
            </span>
          </div>
          <h1 className="admin-settings-title">
            Cấu Hình Hệ Thống
          </h1>
          <p className="admin-settings-desc">
            Thiết lập thông tin liên hệ, hotline hỗ trợ, email quản trị và cấu hình SEO cho toàn bộ website.
          </p>
        </div>
        <div className="admin-settings-btn-group">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="admin-settings-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="admin-settings-save-btn"
          >
            <Save size={14} />
            <span>Lưu Cấu Hình</span>
          </button>
        </div>
      </div>

      <div className="admin-settings-card">
        <div className="admin-settings-form-stack">
          <div>
            <label className="admin-settings-label">Hotline Hỗ Trợ Khách Hàng</label>
            <input
              type="text"
              value={settingsState.supportHotline || ''}
              onChange={(e) => setSettingsState({ ...settingsState, supportHotline: e.target.value })}
              className="admin-settings-input"
            />
          </div>

          <div>
            <label className="admin-settings-label">Email Liên Hệ Admin</label>
            <input
              type="email"
              value={settingsState.adminEmail || ''}
              onChange={(e) => setSettingsState({ ...settingsState, adminEmail: e.target.value })}
              className="admin-settings-input"
            />
          </div>

          <div>
            <label className="admin-settings-label">SEO Title Mặc Định</label>
            <input
              type="text"
              value={settingsState.seoTitle || ''}
              onChange={(e) => setSettingsState({ ...settingsState, seoTitle: e.target.value })}
              className="admin-settings-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
