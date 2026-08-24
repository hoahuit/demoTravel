import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
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
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • ĐẶT TOUR & TRANG BỊ
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Hệ Thống Booking Trực Tuyến
            </span>
          </div>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Quản Lý Đơn Đặt Tour ({filteredBookings.length})
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Theo dõi chi tiết đơn đặt chỗ tour tĩnh dưỡng, lịch khởi hành và các món vật phẩm mua kèm.
          </p>
        </div>

        {onReload && (
          <button
            type="button"
            onClick={onReload}
            disabled={isReloading}
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: isReloading ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              opacity: isReloading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isReloading) e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            onMouseLeave={(e) => {
              if (!isReloading) e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <RefreshCw size={14} color="#64748b" className={isReloading ? 'animate-spin' : ''} />
            <span>{isReloading ? 'Đang tải...' : 'Làm Mới'}</span>
          </button>
        )}
      </div>

      {/* 4 METRICS CARDS (RULE 85) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Tổng Đơn Đặt Tour</span>
            <Compass size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{stats.total}</div>
          <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>Toàn bộ lượt đặt tour</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Chờ Xác Nhận</span>
            <Clock size={18} color="#b45309" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#b45309' }}>{stats.pending}</div>
          <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '4px' }}>Cần gọi xác nhận giữ chỗ</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>Đã Thanh Toán QR</span>
            <CheckCircle2 size={18} color="#15803d" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d' }}>{stats.paid}</div>
          <div style={{ fontSize: '11.5px', color: '#15803d', marginTop: '4px' }}>Đã đối soát tiền vào TK</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase' }}>Doanh Thu Tour</span>
            <CreditCard size={18} color="#0f766e" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f766e' }}>{formatVnd(stats.revenue)}</div>
          <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>Bao gồm tour & vật phẩm</div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `Tất Cả (${stats.total})` },
            { id: 'pending', label: `Chờ Xác Nhận (${stats.pending})` },
            { id: 'paid', label: `Đã Thanh Toán (${stats.paid})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: selectedStatusTab === tab.id ? '1px solid #0f766e' : '1px solid #e2e8f0',
                backgroundColor: selectedStatusTab === tab.id ? '#0f766e' : '#ffffff',
                color: selectedStatusTab === tab.id ? '#ffffff' : '#475569',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Tìm mã đơn, tên khách, tour..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* TABLE CONTAINER & CARD (RULE 85) */}
      <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
        {filteredBookings.length === 0 ? (
          <EmptyState
            title="Không tìm thấy đơn đặt tour nào"
            description="Chưa có đơn đặt tour nào trong cơ sở dữ liệu hoặc không khớp với từ khóa tìm kiếm."
          />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Mã Đơn & Khách Hàng
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hành Trình Đặt Chỗ
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Trang Bị Mua Kèm
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tổng Thanh Toán
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Trạng Thái
                </th>
                <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', width: '130px' }}>
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
                  <tr
                    key={item.id || idx}
                    style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Booking Code & Customer */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px', marginBottom: '4px' }}>
                        <span>{code}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>{custName}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <a href={`tel:${custPhone}`} style={{ fontSize: '12px', color: '#0f766e', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                          <Phone size={11} />
                          <span>{custPhone}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopyText(custPhone, `phone-${item.id || idx}`, e)}
                          title="Sao chép SĐT"
                          style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer', color: '#94a3b8' }}
                        >
                          {copiedKey === `phone-${item.id || idx}` ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </td>

                    {/* Tour Info */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Compass size={14} color="#059669" style={{ flexShrink: 0 }} />
                        <span>{tourTitle}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Khởi hành: <strong>{departureDate}</strong></span>
                        <span>•</span>
                        <span><strong>{guests}</strong> khách</span>
                      </div>
                    </td>

                    {/* Addons */}
                    <td style={{ padding: '14px 16px' }}>
                      {addons.length > 0 ? (
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Sparkles size={12} />
                            <span>{addons.length} món mua kèm</span>
                          </span>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                            {addons.map((a: any) => a.title).join(', ')}
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Không chọn mua kèm</span>
                      )}
                    </td>

                    {/* Total Amount */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#004532' }}>
                        {formatVnd(totalAmt)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                        {item.paymentMethod || 'Chuyển khoản QR'}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={item.status || 'Chờ xác nhận'}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: `1px solid ${badge.border}`,
                          backgroundColor: badge.bg,
                          color: badge.text,
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã thanh toán">Đã thanh toán QR</option>
                        <option value="Đã hoàn tất">Đã hoàn tất tour</option>
                        <option value="Đã hủy">Đã hủy đơn</option>
                      </select>
                    </td>

                    {/* ACTION BUTTONS (RULE 85: 50px x 32px) */}
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết đơn đặt tour"
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            color: '#374151',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                            e.currentTarget.style.borderColor = '#d1d5db';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9fafb';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                          }}
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteItem('bookings', item.id)}
                          title="Xóa đơn đặt tour"
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #fecaca',
                            background: '#fff1f2',
                            color: '#b91c1c',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff1f2')}
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', boxSizing: 'border-box' }}>
            {/* Header */}
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', position: 'sticky', top: 0, zIndex: 10 }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {selectedDetailItem.bookingCode || selectedDetailItem.id || 'ĐƠN ĐẶT TOUR'}
                </span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                  Hồ Sơ Đơn Đặt Tour & Trang Bị
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#e2e8f0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Customer Box */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '14px 18px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Thông Tin Khách Hàng
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
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
              <div style={{ backgroundColor: '#f4fbf7', borderRadius: '12px', padding: '14px 18px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Hành Trình Đặt Chỗ
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#081f13', marginBottom: '6px' }}>
                  {selectedDetailItem.tourTitle || selectedDetailItem.tour || 'Retreat Tour'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '12.5px' }}>
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
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {addon.heroImage && (
                            <img src={addon.heroImage} alt={addon.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
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
                  <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                    {selectedDetailItem.notes}
                  </div>
                </div>
              )}

              {/* Total Amount & Payment Breakdown */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px 18px', border: '1px solid #e2e8f0' }}>
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
              <div style={{ paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 700, color: '#0f172a', outline: 'none' }}
                >
                  <option value="Chờ xác nhận">Chờ xác nhận</option>
                  <option value="Đã thanh toán">Đã thanh toán QR</option>
                  <option value="Đã hoàn tất">Đã hoàn tất tour</option>
                  <option value="Đã hủy">Đã hủy đơn</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedDetailItem(null)}
                style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Đóng
              </button>
              <a
                href={`tel:${selectedDetailItem.customerPhone || (typeof selectedDetailItem.customer === 'object' ? selectedDetailItem.customer.phone : selectedDetailItem.phone)}`}
                style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#004532', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
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
