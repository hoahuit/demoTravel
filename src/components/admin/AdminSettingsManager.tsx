import React from 'react';

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
    <div className="serene-container-inner">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Hệ Thống & SEO
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Cấu Hình Hệ Thống 4U Retreat
          </h1>
        </div>
        <button
          onClick={handleSaveSettings}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          Lưu Cấu Hình
        </button>
      </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>Hotline Hỗ Trợ Khách Hàng</label>
            <input
              type="text"
              value={settingsState.supportHotline || ''}
              onChange={(e) => setSettingsState({ ...settingsState, supportHotline: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>Email Liên Hệ Admin</label>
            <input
              type="email"
              value={settingsState.adminEmail || ''}
              onChange={(e) => setSettingsState({ ...settingsState, adminEmail: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>SEO Title Mặc Định</label>
            <input
              type="text"
              value={settingsState.seoTitle || ''}
              onChange={(e) => setSettingsState({ ...settingsState, seoTitle: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
