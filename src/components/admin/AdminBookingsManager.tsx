import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
import './AdminBookingsManager.css';
import {
  Compass,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Trash2,
  Eye,
  X,
  Copy,
  Check,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  Phone,
  CreditCard,
  Package,
  ShoppingBag,
  Plus,
  RefreshCw
} from 'lucide-react';

interface AdminBookingsManagerProps {
  bookingsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal?: (section: any) => void;
  openEditModal?: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  handleStatusUpdate?: (item: any, newStatus: string) => void;
  onReload?: () => void;
  isReloading?: boolean;
}

export default function AdminBookingsManager({
  bookingsList,
  searchFilter,
  setSearchFilter,
  openEditModal,
  handleDeleteItem,
  handleStatusUpdate,
  onReload,
  isReloading
}: AdminBookingsManagerProps) {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [selectedDetailItem, setSelectedDetailItem] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const formatVnd = (val?: number) => {
    if (!val) return '0 ₫';
    return `${val.toLocaleString('vi-VN')} ₫`;
  };

  const handleCopyText = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Helper to parse addon items from JSON or array
  const getAddonItems = (item: any): any[] => {
    if (Array.isArray(item.addonItems)) return item.addonItems;
    if (item.addonItemsJson) {
      try {
        const parsed = JSON.parse(item.addonItemsJson);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore
      }
    }
    return [];
  };

  const filteredBookings = useMemo(() => {
    return (bookingsList || []).filter((item) => {
      const q = searchFilter.toLowerCase().trim();
      const matchSearch =
        !q ||
        String(item.customerName || item.customer || '').toLowerCase().includes(q) ||
        String(item.customerPhone || item.phone || '').toLowerCase().includes(q) ||
        String(item.tourTitle || item.tour || '').toLowerCase().includes(q) ||
        String(item.bookingCode || item.id || '').toLowerCase().includes(q);

      const status = item.status || 'Chờ xác nhận';
      const matchStatus =
        selectedStatusTab === 'all' ||
        (selectedStatusTab === 'pending' && status === 'Chờ xác nhận') ||
        (selectedStatusTab === 'paid' && (status === 'Đã thanh toán' || status === 'Đã thanh toán (Chờ giao)')) ||
        (selectedStatusTab === 'completed' && (status === 'Đã hoàn tất' || status === 'Thành công')) ||
        (selectedStatusTab === 'cancelled' && status === 'Đã hủy');

      return matchSearch && matchStatus;
    });
  }, [bookingsList, searchFilter, selectedStatusTab]);

  // Metrics
  const stats = useMemo(() => {
    const total = bookingsList.length;
    const pending = bookingsList.filter((b) => (b.status || 'Chờ xác nhận') === 'Chờ xác nhận').length;
    const paid = bookingsList.filter((b) => (b.status || '') === 'Đã thanh toán' || (b.status || '') === 'Đã thanh toán (Chờ giao)').length;
    const revenue = bookingsList.reduce((acc, curr) => {
      const amt = Number(curr.totalAmount || curr.amount || curr.price || 0);
      return acc + (isNaN(amt) ? 0 : amt);
    }, 0);

    return { total, pending, paid, revenue };
  }, [bookingsList]);

  const getStatusBadge = (status?: string) => {
    const s = status || 'Chờ xác nhận';
    if (s === 'Chờ xác nhận') {
      return { bg: '#fef3c7', text: '#92400e', border: '#fde68a', label: 'Chờ xác nhận' };
    }
    if (s === 'Đã thanh toán' || s === 'Đã thanh toán (Chờ giao)') {
      return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', label: 'Đã thanh toán QR' };
    }
    if (s === 'Đã hoàn tất' || s === 'Thành công') {
      return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', label: 'Đã hoàn tất tour' };
    }
    return { bg: '#fee2e2', text: '#991b1b', border: '#fecaca', label: s };
  };

  return (
    <div className="admin-bookings-root">
      {/* HEADER */}
      <div className="admin-bookings-header">
        <div>
          <div className="admin-bookings-meta-row">
            <span className="admin-bookings-tag">
              4U RETREAT • ĐẶT TOUR & TRANG BỊ
            </span>
            <span className="admin-bookings-dot" />
            <span className="admin-bookings-subtag">
              Hệ Thống Booking Trực Tuyến
            </span>
          </div>
          <h1 className="admin-bookings-title">
            Quản Lý Đơn Đặt Tour ({filteredBookings.length})
          </h1>
          <p className="admin-bookings-desc">
            Theo dõi chi tiết đơn đặt chỗ tour tĩnh dưỡng, lịch khởi hành và các món vật phẩm mua kèm.
          </p>
        </div>

        {onReload && (
          <button
            type="button"
            onClick={onReload}
            disabled={isReloading}
            className="admin-bookings-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" className={isReloading ? 'animate-spin' : ''} />
            <span>{isReloading ? 'Đang tải...' : 'Làm Mới'}</span>
          </button>
        )}
      </div>

      {/* 4 METRICS CARDS (RULE 85) */}
      <div className="admin-bookings-metrics-grid">
        <div className="admin-bookings-metric-card">
          <div className="admin-bookings-metric-top">
            <span className="admin-bookings-metric-label">Tổng Đơn Đặt Tour</span>
            <Compass size={18} color="#059669" />
          </div>
          <div className="admin-bookings-metric-val">{stats.total}</div>
          <div className="admin-bookings-metric-sub">Toàn bộ lượt đặt tour</div>
        </div>

        <div className="admin-bookings-metric-card">
          <div className="admin-bookings-metric-top">
            <span className="admin-bookings-metric-label pending">Chờ Xác Nhận</span>
            <Clock size={18} color="#b45309" />
          </div>
          <div className="admin-bookings-metric-val pending">{stats.pending}</div>
          <div className="admin-bookings-metric-sub pending">Cần gọi xác nhận giữ chỗ</div>
        </div>

        <div className="admin-bookings-metric-card">
          <div className="admin-bookings-metric-top">
            <span className="admin-bookings-metric-label paid">Đã Thanh Toán QR</span>
            <CheckCircle2 size={18} color="#15803d" />
          </div>
          <div className="admin-bookings-metric-val paid">{stats.paid}</div>
          <div className="admin-bookings-metric-sub paid">Đã đối soát tiền vào TK</div>
        </div>

        <div className="admin-bookings-metric-card">
          <div className="admin-bookings-metric-top">
            <span className="admin-bookings-metric-label revenue">Doanh Thu Tour</span>
            <CreditCard size={18} color="#0f766e" />
          </div>
          <div className="admin-bookings-metric-val revenue">{formatVnd(stats.revenue)}</div>
          <div className="admin-bookings-metric-sub">Bao gồm tour & vật phẩm</div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="admin-bookings-filter-row">
        <div className="admin-bookings-tabs">
          {[
            { id: 'all', label: `Tất Cả (${stats.total})` },
            { id: 'pending', label: `Chờ Xác Nhận (${stats.pending})` },
            { id: 'paid', label: `Đã Thanh Toán (${stats.paid})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id)}
              className={`admin-bookings-tab-btn ${selectedStatusTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-bookings-search-wrap">
          <Search size={15} color="#94a3b8" className="admin-bookings-search-icon" />
          <input
            type="text"
            placeholder="Tìm mã đơn, tên khách, tour..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="admin-bookings-search-input"
          />
        </div>
      </div>

      {/* TABLE CONTAINER & CARD (RULE 85) */}
      <div className="admin-bookings-table-wrap">
        {filteredBookings.length === 0 ? (
          <EmptyState
            title="Không tìm thấy đơn đặt tour nào"
            description="Chưa có đơn đặt tour nào trong cơ sở dữ liệu hoặc không khớp với từ khóa tìm kiếm."
          />
        ) : (
          <table className="admin-bookings-table">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="admin-bookings-th customer">
                  Mã Đơn & Khách Hàng
                </th>
                <th className="admin-bookings-th">
                  Hành Trình Đặt Chỗ
                </th>
                <th className="admin-bookings-th">
                  Trang Bị Mua Kèm
                </th>
                <th className="admin-bookings-th">
                  Tổng Thanh Toán
                </th>
                <th className="admin-bookings-th">
                  Trạng Thái
                </th>
                <th className="admin-bookings-th actions">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((item, idx) => {
                const badge = getStatusBadge(item.status);
                const code = item.bookingCode || item.id || `BK-${idx + 1}`;
                const custName = item.customerName || (typeof item.customer === 'object' ? item.customer.fullName : item.customer) || 'Khách hàng 4U';
                const custPhone = item.customerPhone || (typeof item.customer === 'object' ? item.customer.phone : item.phone) || 'Chưa cung cấp';
                const tourTitle = item.tourTitle || item.tour || 'Retreat May Đo';
                const departureDate = item.departureDate || item.date || item.selectedDate || 'Theo yêu cầu';
                const guests = item.numberOfGuests || item.guests || 1;
                const totalAmt = item.totalAmount || item.amount || item.price || 0;
                const addons = getAddonItems(item);

                return (
                  <tr key={item.id || idx} className="admin-bookings-tr">
                    {/* Booking Code & Customer */}
                    <td className="admin-bookings-td customer">
                      <div className="admin-bookings-code-badge">
                        <span>{code}</span>
                      </div>
                      <div className="admin-bookings-cust-name">{custName}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <a href={`tel:${custPhone}`} className="admin-bookings-phone-link">
                          <Phone size={11} />
                          <span>{custPhone}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopyText(custPhone, `phone-${item.id || idx}`, e)}
                          title="Sao chép SĐT"
                          className="admin-bookings-copy-btn"
                        >
                          {copiedKey === `phone-${item.id || idx}` ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>

                    {/* Tour Info */}
                    <td className="admin-bookings-td">
                      <div className="admin-bookings-tour-title">
                        <Compass size={14} color="#059669" style={{ flexShrink: 0 }} />
                        <span>{tourTitle}</span>
                      </div>
                      <div className="admin-bookings-tour-meta">
                        <span>Khởi hành: <strong>{departureDate}</strong></span>
                        <span>•</span>
                        <span><strong>{guests}</strong> khách</span>
                      </div>
                    </td>

                    {/* Addons */}
                    <td className="admin-bookings-td">
                      {addons.length > 0 ? (
                        <div>
                          <span className="admin-bookings-addons-badge">
                            <Sparkles size={12} />
                            <span>{addons.length} món mua kèm</span>
                          </span>
                          <div className="admin-bookings-addons-list-preview">
                            {addons.map((a: any) => a.title).join(', ')}
                          </div>
                        </div>
                      ) : (
                        <span className="admin-bookings-addons-empty">Không chọn mua kèm</span>
                      )}
                    </td>

                    {/* Total Amount */}
                    <td className="admin-bookings-td">
                      <div className="admin-bookings-total-amt">
                        {formatVnd(totalAmt)}
                      </div>
                      <div className="admin-bookings-pay-method">
                        {item.paymentMethod || 'Chuyển khoản QR'}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="admin-bookings-td">
                      <select
                        value={item.status || 'Chờ xác nhận'}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        className="admin-bookings-status-select"
                        style={{
                          border: `1px solid ${badge.border}`,
                          backgroundColor: badge.bg,
                          color: badge.text
                        }}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã thanh toán">Đã thanh toán QR</option>
                        <option value="Đã hoàn tất">Đã hoàn tất tour</option>
                        <option value="Đã hủy">Đã hủy đơn</option>
                      </select>
                    </td>

                    {/* ACTION BUTTONS (RULE 85: 50px x 32px) */}
                    <td className="admin-bookings-td actions">
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết đơn đặt tour"
                          className="admin-bookings-btn-view"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteItem('bookings', item.id)}
                          title="Xóa đơn đặt tour"
                          className="admin-bookings-btn-delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* DETAIL MODAL FOR TOUR BOOKING */}
      {selectedDetailItem && (
        <div className="admin-bookings-modal-backdrop">
          <div className="admin-bookings-modal-box">
            {/* Header */}
            <div className="admin-bookings-modal-header">
              <div>
                <span className="admin-bookings-modal-code">
                  {selectedDetailItem.bookingCode || selectedDetailItem.id || 'ĐƠN ĐẶT TOUR'}
                </span>
                <h3 className="admin-bookings-modal-title">
                  Hồ Sơ Đơn Đặt Tour & Trang Bị
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-bookings-modal-close-btn"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="admin-bookings-modal-body">
              {/* Customer Box */}
              <div className="admin-bookings-modal-cust-box">
                <div className="admin-bookings-modal-cust-tag">
                  Thông Tin Khách Hàng
                </div>
                <div className="admin-bookings-modal-cust-name">
                  {selectedDetailItem.customerName || (typeof selectedDetailItem.customer === 'object' ? selectedDetailItem.customer.fullName : selectedDetailItem.customer) || 'Khách hàng 4U'}
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                  <div>
                    <span style={{ color: '#94a3b8' }}>SĐT:</span>{' '}
                    <strong style={{ color: '#0f766e' }}>{selectedDetailItem.customerPhone || (typeof selectedDetailItem.customer === 'object' ? selectedDetailItem.customer.phone : selectedDetailItem.phone)}</strong>
                  </div>
                  {selectedDetailItem.shippingAddress && (
                    <div>
                      <span style={{ color: '#94a3b8' }}>Địa chỉ nhận đồ:</span> {selectedDetailItem.shippingAddress}
                    </div>
                  )}
                </div>
              </div>

              {/* Tour Details */}
              <div className="admin-bookings-modal-tour-box">
                <div className="admin-bookings-modal-tour-tag">
                  Hành Trình Đặt Chỗ
                </div>
                <div className="admin-bookings-modal-tour-title">
                  {selectedDetailItem.tourTitle || selectedDetailItem.tour || 'Retreat Tour'}
                </div>
                <div className="admin-bookings-modal-tour-grid">
                  <div>
                    <span style={{ color: '#64748b' }}>Ngày khởi hành:</span>{' '}
                    <strong style={{ color: '#0f172a' }}>{selectedDetailItem.departureDate || selectedDetailItem.date || selectedDetailItem.selectedDate || 'Theo yêu cầu'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Số lượng khách:</span>{' '}
                    <strong style={{ color: '#0f172a' }}>{selectedDetailItem.numberOfGuests || selectedDetailItem.guests || 1} người</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Giá vé tour / người:</span>{' '}
                    <strong style={{ color: '#0f172a' }}>{formatVnd(selectedDetailItem.tourPrice || selectedDetailItem.price)}</strong>
                  </div>
                </div>
              </div>

              {/* Addon Items List */}
              <div>
                <div className="admin-bookings-modal-addons-header">
                  <Sparkles size={14} color="#059669" />
                  <span>Trang Bị & Vật Phẩm Mua Kèm ({getAddonItems(selectedDetailItem).length})</span>
                </div>

                {getAddonItems(selectedDetailItem).length === 0 ? (
                  <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12.5px', color: '#64748b', fontStyle: 'italic' }}>
                    Khách hàng không chọn thêm vật phẩm mua kèm nào.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {getAddonItems(selectedDetailItem).map((addon: any, aIdx: number) => (
                      <div
                        key={addon.id || aIdx}
                        className="admin-bookings-modal-addon-item"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {addon.heroImage && (
                            <img src={addon.heroImage} alt={addon.title} className="admin-bookings-modal-addon-img" />
                          )}
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{addon.title}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{addon.reasonBadge || addon.subtitle}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#059669' }}>
                          {formatVnd(addon.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Special Notes */}
              {selectedDetailItem.notes && (
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Ghi Chú Đặc Biệt:
                  </span>
                  <div className="admin-bookings-modal-notes-box">
                    {selectedDetailItem.notes}
                  </div>
                </div>
              )}

              {/* Total Amount & Payment Breakdown */}
              <div className="admin-bookings-modal-total-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                  <span>Phương thức thanh toán:</span>
                  <strong>{selectedDetailItem.paymentMethod || 'Chuyển khoản QR'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#004532', borderTop: '1px dashed #cbd5e1', paddingTop: '6px', marginTop: '6px' }}>
                  <span>Tổng thanh toán:</span>
                  <span>{formatVnd(selectedDetailItem.totalAmount || selectedDetailItem.amount || selectedDetailItem.price)}</span>
                </div>
              </div>

              {/* Status Updater */}
              <div className="admin-bookings-modal-status-row">
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Cập nhật trạng thái:</span>
                <select
                  value={selectedDetailItem.status || 'Chờ xác nhận'}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (handleStatusUpdate) {
                      handleStatusUpdate(selectedDetailItem, newStatus);
                    }
                    setSelectedDetailItem({ ...selectedDetailItem, status: newStatus });
                  }}
                  className="admin-bookings-modal-status-select"
                >
                  <option value="Chờ xác nhận">Chờ xác nhận</option>
                  <option value="Đã thanh toán">Đã thanh toán QR</option>
                  <option value="Đã hoàn tất">Đã hoàn tất tour</option>
                  <option value="Đã hủy">Đã hủy đơn</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="admin-bookings-modal-footer">
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-bookings-modal-dismiss-btn"
              >
                Đóng
              </button>
              <a
                href={`tel:${selectedDetailItem.customerPhone || (typeof selectedDetailItem.customer === 'object' ? selectedDetailItem.customer.phone : selectedDetailItem.phone)}`}
                className="admin-bookings-modal-call-btn"
              >
                <Phone size={14} />
                <span>Gọi Xác Nhận Giữ Chỗ</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
