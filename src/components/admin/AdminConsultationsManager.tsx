import React from 'react';
import EmptyState from '../ui/EmptyState';

interface AdminConsultationsManagerProps {
  consultationsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  handleStatusUpdate?: (item: any, newStatus: string) => void;
}

export default function AdminConsultationsManager({
  consultationsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem,
  handleStatusUpdate
}: AdminConsultationsManagerProps) {
  const filtered = (consultationsList || []).filter(
    (c) =>
      String(c.customerName || c.customer || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(c.customerPhone || c.phone || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(c.tourName || c.tour || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(c.id || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Quản Lý CSKH & Lịch Hẹn
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Lịch Đặt Hẹn Tư Vấn Khách Hàng ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('consultations')}
          style={{ backgroundColor: '#1E4A3D', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(30,74,61,0.2)' }}
        >
          + Thêm Lịch Hẹn Mới
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Tìm theo tên khách, số điện thoại, tour..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Chưa có lịch hẹn tư vấn nào"
          description="Không tìm thấy thông tin hẹn tư vấn nào phù hợp với từ khóa tìm kiếm."
          actionLabel="+ Thêm Lịch Hẹn Mới"
          onAction={() => openCreateModal('consultations')}
          transparent={true}
        />
      ) : (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(6, 27, 14, 0.08)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8faf7', borderBottom: '1px solid rgba(6, 27, 14, 0.08)', color: '#525a54' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>ID</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Khách Hàng (SĐT / Zalo)</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Thời Gian Tiện Gọi</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Tour Quan Tâm</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Trạng Thái CSKH</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => {
                const name = item.customerName || item.name || item.customer || 'Khách hàng';
                const phone = item.customerPhone || item.phone || '';
                const email = item.customerEmail || item.email || '';
                const callTime = item.preferredCallTime || 'Sáng (8h - 12h)';
                const tour = item.tourName || item.tour || 'Tư vấn tổng quát';
                const currentStatus = item.status || 'Chưa tư vấn';

                let badgeStyle = { backgroundColor: '#fef3c7', color: '#b45309' };
                if (currentStatus === 'Đã tư vấn') {
                  badgeStyle = { backgroundColor: '#dcfce7', color: '#166534' };
                } else if (currentStatus === 'Hẹn gọi lại') {
                  badgeStyle = { backgroundColor: '#e0f2fe', color: '#0369a1' };
                } else if (currentStatus === 'Không nghe máy') {
                  badgeStyle = { backgroundColor: '#fee2e2', color: '#991b1b' };
                }

                return (
                  <tr key={item.id || idx} style={{ borderBottom: '1px solid rgba(6, 27, 14, 0.05)' }}>
                    <td style={{ padding: '14px 18px', fontWeight: 700, fontFamily: 'monospace', color: '#081f13' }}>
                      #{item.id}
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 600 }}>
                      <div style={{ color: '#0f172a' }}>{name}</div>
                      <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 700 }}>📞 {phone} {email ? `(${email})` : ''}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ backgroundColor: '#f1f5f9', padding: '5px 10px', borderRadius: '6px', fontSize: '12.5px', fontWeight: 600, color: '#1e293b' }}>
                        ⏰ {callTime}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', fontWeight: 500, color: '#334155' }}>
                      {tour}
                      {item.note && <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', marginTop: '2px' }}>💬 {item.note}</div>}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <select
                        value={currentStatus}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(0,0,0,0.1)',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          outline: 'none',
                          ...badgeStyle
                        }}
                      >
                        <option value="Chưa tư vấn">🟡 Chưa tư vấn</option>
                        <option value="Đã tư vấn">🟢 Đã tư vấn</option>
                        <option value="Hẹn gọi lại">🔵 Hẹn gọi lại</option>
                        <option value="Không nghe máy">🔴 Không nghe máy</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => openEditModal('consultations', item)}
                        style={{ border: 'none', background: 'transparent', color: '#1E4A3D', fontWeight: 700, cursor: 'pointer', marginRight: '12px' }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteItem('consultations', item.id)}
                        style={{ border: 'none', background: 'transparent', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
