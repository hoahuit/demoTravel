import React from 'react';
import './AdminAboutManager.css';

interface AdminAboutManagerProps {
  aboutState: any;
  setAboutState: (val: any) => void;
  toast: any;
}

export default function AdminAboutManager({ aboutState, setAboutState, toast }: AdminAboutManagerProps) {
  const handleSaveAbout = () => {
    toast.success('Đã cập nhật thông tin Giới Thiệu 4U!');
  };

  return (
    <div className="serene-container-inner">
      <div className="admin-about-header-row">
        <div>
          <p className="admin-about-category-tag">
            Nội Dung Thương Hiệu
          </p>
          <h1 className="admin-about-title">
            Quản Lý Trang Giới Thiệu 4U Retreat
          </h1>
        </div>
        <button
          onClick={handleSaveAbout}
          className="admin-about-save-btn"
        >
          Lưu Nội Dung
        </button>
      </div>

      <div className="admin-about-card-box">
        <div className="admin-about-form-stack">
          <div>
            <label className="admin-about-label">Tiêu Đề Thương Hiệu</label>
            <input
              type="text"
              value={aboutState.title || ''}
              onChange={(e) => setAboutState({ ...aboutState, title: e.target.value })}
              className="admin-about-input"
            />
          </div>

          <div>
            <label className="admin-about-label">Câu Chuyện Thương Hiệu (Story)</label>
            <textarea
              rows={4}
              value={aboutState.story || ''}
              onChange={(e) => setAboutState({ ...aboutState, story: e.target.value })}
              className="admin-about-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
