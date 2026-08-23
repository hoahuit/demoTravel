import React from 'react';
import { RefreshCw, Save } from 'lucide-react';

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
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • HỆ THỐNG & CẤU HÌNH
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Thiết Lập Chung
            </span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Cấu Hình Hệ Thống
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Thiết lập thông tin liên hệ, hotline hỗ trợ, email quản trị và cấu hình SEO cho toàn bộ website.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            <RefreshCw size={14} color="#64748b" />
            <span>Làm Mới</span>
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            style={{
              backgroundColor: '#0f766e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(15, 118, 110, 0.2)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#115e59')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
          >
            <Save size={14} />
            <span>Lưu Cấu Hình</span>
          </button>
        </div>
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
