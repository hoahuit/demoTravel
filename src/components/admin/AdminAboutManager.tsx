import React from 'react';

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Nội Dung Thương Hiệu
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Quản Lý Trang Giới Thiệu 4U Retreat
          </h1>
        </div>
        <button
          onClick={handleSaveAbout}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          Lưu Nội Dung
        </button>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>Tiêu Đề Thương Hiệu</label>
            <input
              type="text"
              value={aboutState.title || ''}
              onChange={(e) => setAboutState({ ...aboutState, title: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '16px', fontWeight: 600 }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>Câu Chuyện Thương Hiệu (Story)</label>
            <textarea
              rows={4}
              value={aboutState.story || ''}
              onChange={(e) => setAboutState({ ...aboutState, story: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
