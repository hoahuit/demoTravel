import React from 'react';
import EmptyState from '../ui/EmptyState';

interface AdminBookingsManagerProps {
  bookingsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminBookingsManager({
  bookingsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminBookingsManagerProps) {
  const filtered = (bookingsList || []).filter(
    (b) =>
      String(b.customer || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(b.tour || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(b.id || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="serene-container-inner">
      <div className="serene-sticky-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
            Quản Lý Đơn Hàng
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
            Danh Sách Đơn Đặt Tour ({filtered.length})
          </h1>
        </div>
        <button
          onClick={() => openCreateModal('bookings')}
          style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
        >
          + Thêm Đơn Hàng Mới
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm theo tên khách, tour, mã đơn..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Chưa có đơn đặt tour nào"
          description="Không tìm thấy đơn hàng nào phù hợp với từ khóa hoặc bộ lọc của bạn."
          actionLabel="+ Thêm Đơn Hàng Mới"
          onAction={() => openCreateModal('bookings')}
          transparent={true}
        />
      ) : (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8faf7', borderBottom: '1px solid rgba(6, 27, 14, 0.08)', color: '#525a54' }}>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Mã Đơn</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Khách Hàng</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Tên Tour</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Ngày Đi</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Số Khách</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Tổng Tiền</th>
                <th style={{ padding: '14px 18px', fontWeight: 700 }}>Trạng Thái</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, idx) => (
                <tr key={b.id || idx} style={{ borderBottom: '1px solid rgba(6, 27, 14, 0.05)' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700, fontFamily: 'monospace', color: '#081f13' }}>{b.id}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 600 }}>
                    <div>{b.customer}</div>
                    <div style={{ fontSize: '12px', color: '#525a54' }}>{b.phone || b.email}</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>{b.tour}</td>
                  <td style={{ padding: '14px 18px' }}>{b.date}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 600 }}>{b.guests} người</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, fontFamily: 'monospace' }}>{(b.amount || 0).toLocaleString('vi-VN')} ₫</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', backgroundColor: b.status === 'Confirmed' ? '#dcfce7' : '#fef3c7', color: b.status === 'Confirmed' ? '#166534' : '#b45309' }}>
                      {b.status === 'Confirmed' ? 'Đã Xác Nhận' : 'Chờ Xử Lý'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button onClick={() => openEditModal('bookings', b)} style={{ border: 'none', background: 'transparent', color: '#081f13', fontWeight: 700, cursor: 'pointer', marginRight: '12px' }}>Chỉnh Sửa</button>
                    <button onClick={() => handleDeleteItem('bookings', b.id)} style={{ border: 'none', background: 'transparent', color: '#dc2626', fontWeight: 700, cursor: 'pointer' }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
