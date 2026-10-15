import React from 'react';
import { RefreshCw, Save } from 'lucide-react';

interface AdminSettingsManagerProps {
  settingsState: any;
  setSettingsState: (val: any) => void;
  toast: any;
}

export default function AdminSettingsManager({ settingsState, setSettingsState, toast }: AdminSettingsManagerProps) {
  const handleSaveSettings = () => {
    try {
      localStorage.setItem('4u_app_settings', JSON.stringify(settingsState));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app-settings-updated', { detail: settingsState }));
      }
      toast.success('Đã lưu cấu hình hệ thống thành công!');
    } catch {
      toast.error('Không thể lưu cấu hình vào bộ nhớ!');
    }
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
            Thiết lập thông tin liên hệ, hotline hỗ trợ, email quản trị và chế độ thiết kế lịch trình riêng cho khách.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* CUSTOM TOUR DESIGN TOGGLE */}
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: settingsState.enableCustomTourDesign ? '#f0fdf4' : '#f8fafc',
            border: settingsState.enableCustomTourDesign ? '1.5px solid #86efac' : '1.5px solid #e2e8f0',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: settingsState.enableCustomTourDesign ? '#15803d' : '#64748b',
                    letterSpacing: '0.05em'
                  }}>
                    {settingsState.enableCustomTourDesign ? '✓ Chế Độ Tự Thiết Kế Tour' : '• Chế Độ Form Điền Nhanh'}
                  </span>
                </div>
                <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  Chế Độ Khách Hàng Thiết Kế Lịch Trình Riêng (Custom Tour Builder)
                </strong>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  {settingsState.enableCustomTourDesign ? (
                    <span>
                      <strong>Đang BẬT:</strong> Khi khách hàng vào tab <em>"Thiết Kế Lịch Trình Riêng"</em>, họ sẽ thấy Form tự lên lịch trình độc bản (tên tour, điểm đến, thời lượng, ngân sách, lịch trình theo ngày). Dữ liệu sẽ <strong>lưu trực tiếp vào bảng Tour</strong> với đánh dấu <code style={{ backgroundColor: '#dcfce7', padding: '1px 5px', borderRadius: '4px', color: '#166534' }}>isCustomer=true</code> và ở trạng thái <code style={{ backgroundColor: '#fee2e2', padding: '1px 5px', borderRadius: '4px', color: '#991b1b' }}>isAdminApproved=false</code> (chờ Admin duyệt).
                    </span>
                  ) : (
                    <span>
                      <strong>Đang TẮT (Mặc định):</strong> Khách hàng điền form liên hệ nhanh (Họ tên, SĐT, Vùng miền, Số khách, Ghi chú) lưu vào danh sách yêu cầu tư vấn CRM.
                    </span>
                  )}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', gap: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: settingsState.enableCustomTourDesign ? '#166534' : '#64748b' }}>
                    {settingsState.enableCustomTourDesign ? 'BẬT' : 'TẮT'}
                  </span>
                  <input
                    type="checkbox"
                    checked={Boolean(settingsState.enableCustomTourDesign)}
                    onChange={(e) => setSettingsState({ ...settingsState, enableCustomTourDesign: e.target.checked })}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    width: '46px',
                    height: '24px',
                    borderRadius: '999px',
                    backgroundColor: settingsState.enableCustomTourDesign ? '#16a34a' : '#cbd5e1',
                    position: 'relative',
                    transition: 'background-color 0.2s ease',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#ffffff',
                      position: 'absolute',
                      top: '3px',
                      left: settingsState.enableCustomTourDesign ? '25px' : '3px',
                      transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>Hotline Hỗ Trợ Khách Hàng</label>
            <input
              type="text"
              value={settingsState.supportHotline || ''}
              onChange={(e) => setSettingsState({ ...settingsState, supportHotline: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>Email Liên Hệ Admin</label>
            <input
              type="email"
              value={settingsState.adminEmail || ''}
              onChange={(e) => setSettingsState({ ...settingsState, adminEmail: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', marginBottom: '6px', display: 'block' }}>SEO Title Mặc Định</label>
            <input
              type="text"
              value={settingsState.seoTitle || ''}
              onChange={(e) => setSettingsState({ ...settingsState, seoTitle: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
