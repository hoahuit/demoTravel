import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
import './AdminShopOrdersManager.css';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Search,
  Trash2,
  Edit2,
  Eye,
  X,
  Copy,
  Check,
  CreditCard,
  Package,
  MapPin,
  Truck,
  DollarSign,
  RefreshCw
} from 'lucide-react';

interface AdminShopOrdersManagerProps {
  shopOrdersList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal?: (section: any) => void;
  openEditModal?: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  handleStatusUpdate?: (item: any, newStatus: string) => void;
  onReload?: () => void;
  isReloading?: boolean;
}

export default function AdminShopOrdersManager({
  shopOrdersList,
  searchFilter,
  setSearchFilter,
  openEditModal,
  handleDeleteItem,
  handleStatusUpdate,
  onReload,
  isReloading
}: AdminShopOrdersManagerProps) {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [selectedDetailItem, setSelectedDetailItem] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredItems = useMemo(() => {
    return shopOrdersList.filter((item) => {
      const q = searchFilter.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.customerName && item.customerName.toLowerCase().includes(q)) ||
        (item.customerPhone && item.customerPhone.includes(q)) ||
        (item.orderCode && item.orderCode.toLowerCase().includes(q)) ||
        (item.shippingAddress && item.shippingAddress.toLowerCase().includes(q));

      const matchStatus =
        selectedStatusTab === 'all' ||
        (selectedStatusTab === 'pending' && (!item.status || item.status === 'Chờ xác nhận')) ||
        (selectedStatusTab === 'paid' && item.status && item.status.includes('Đã thanh toán')) ||
        (selectedStatusTab === 'delivering' && item.status === 'Đang giao hàng') ||
        (selectedStatusTab === 'completed' && item.status === 'Đã hoàn tất') ||
        (selectedStatusTab === 'cancelled' && item.status === 'Đã hủy');

      return matchSearch && matchStatus;
    });
  }, [shopOrdersList, searchFilter, selectedStatusTab]);

  const stats = useMemo(() => {
    const total = shopOrdersList.length;
    const pending = shopOrdersList.filter((i) => !i.status || i.status === 'Chờ xác nhận').length;
    const delivering = shopOrdersList.filter((i) => i.status === 'Đang giao hàng' || (i.status && i.status.includes('Đã thanh toán'))).length;
    const completed = shopOrdersList.filter((i) => i.status === 'Đã hoàn tất').length;
    const totalRevenue = shopOrdersList
      .filter((i) => i.status !== 'Đã hủy')
      .reduce((sum, cur) => sum + (Number(cur.totalAmount) || 0), 0);
    return { total, pending, delivering, completed, totalRevenue };
  }, [shopOrdersList]);

  return (
    <div className="admin-shop-orders-root">
      {/* HEADER BAR */}
      <div className="admin-shop-orders-header">
        <div>
          <div className="admin-shop-orders-meta-row">
            <span className="admin-shop-orders-tag">
              4U RETREAT • KOLLECTION SHOP
            </span>
            <span className="admin-shop-orders-dot" />
            <span className="admin-shop-orders-subtag">
              Đơn Mua Sắm Vật Phẩm
            </span>
          </div>
          <h1 className="admin-shop-orders-title">
            Quản Lý Đơn Hàng Kollection 4U ({filteredItems.length})
          </h1>
          <p className="admin-shop-orders-desc">
            Theo dõi danh sách đơn mua trang bị, vật phẩm tĩnh dưỡng và tiến độ giao hàng cho khách.
          </p>
        </div>

        {onReload && (
          <button
            type="button"
            onClick={onReload}
            disabled={isReloading}
            className="admin-shop-orders-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" className={isReloading ? 'animate-spin' : ''} />
            <span>{isReloading ? 'Đang tải...' : 'Làm Mới'}</span>
          </button>
        )}
      </div>

      {/* 4 Metrics Cards */}
      <div className="admin-shop-stats-grid">
        <div className="admin-shop-stat-card">
          <div className="admin-shop-stat-top">
            <span className="admin-shop-stat-label">Tổng Đơn Hàng</span>
            <ShoppingBag size={18} color="#059669" />
          </div>
          <div className="admin-shop-stat-val">{stats.total}</div>
        </div>

        <div className="admin-shop-stat-card pending">
          <div className="admin-shop-stat-top">
            <span className="admin-shop-stat-label pending">Chờ Xác Nhận</span>
            <Clock size={18} color="#ea580c" />
          </div>
          <div className="admin-shop-stat-val pending">{stats.pending}</div>
        </div>

        <div className="admin-shop-stat-card delivering">
          <div className="admin-shop-stat-top">
            <span className="admin-shop-stat-label delivering">Đang Xử Lý / Giao</span>
            <Truck size={18} color="#0284c7" />
          </div>
          <div className="admin-shop-stat-val delivering">{stats.delivering}</div>
        </div>

        <div className="admin-shop-stat-card revenue">
          <div className="admin-shop-stat-top">
            <span className="admin-shop-stat-label revenue">Doanh Thu Kollection</span>
            <DollarSign size={18} color="#16a34a" />
          </div>
          <div className="admin-shop-stat-val revenue">
            {stats.totalRevenue.toLocaleString('vi-VN')} ₫
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-shop-filter-row">
        <div className="admin-shop-tab-group">
          {[
            { id: 'all', label: 'Tất Cả', count: stats.total },
            { id: 'pending', label: 'Chờ Xác Nhận', count: stats.pending },
            { id: 'delivering', label: 'Đang Xử Lý / Giao', count: stats.delivering },
            { id: 'completed', label: 'Đã Hoàn Tất', count: stats.completed }
          ].map((tab) => {
            const isActive = selectedStatusTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusTab(tab.id)}
                className={`admin-shop-tab-btn ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                <span className="admin-shop-tab-badge">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="admin-shop-search-wrap">
          <Search size={16} className="admin-shop-search-icon" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, tên khách, SĐT..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="admin-shop-search-input"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="admin-shop-table-container">
        {filteredItems.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <EmptyState
              title="Không tìm thấy đơn hàng nào"
              description="Hiện chưa có đơn hàng mua sắm Kollection 4U nào phù hợp với bộ lọc tìm kiếm."
              icon={<ShoppingBag size={40} color="#059669" />}
            />
          </div>
        ) : (
          <table className="admin-shop-table">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="admin-shop-th code">MÃ ĐƠN</th>
                <th className="admin-shop-th">KHÁCH HÀNG</th>
                <th className="admin-shop-th">SẢN PHẨM / SỐ LƯỢNG</th>
                <th className="admin-shop-th">TỔNG TIỀN & THANH TOÁN</th>
                <th className="admin-shop-th">TRẠNG THÁI</th>
                <th className="admin-shop-th actions">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const statusType =
                  item.status === 'Đã hoàn tất'
                    ? 'completed'
                    : item.status === 'Đang giao hàng' || (item.status && item.status.includes('Đã thanh toán'))
                    ? 'delivering'
                    : 'pending';

                const itemsCount = item.items?.length || 1;

                return (
                  <tr key={item.id || idx} className="admin-shop-tr">
                    <td className="admin-shop-td code">
                      {item.orderCode || `ORD-#${item.id}`}
                    </td>
                    <td className="admin-shop-td">
                      <div style={{ fontWeight: 700, color: '#111827' }}>{item.customerName}</div>
                      <div style={{ fontSize: '12.5px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <PhoneCall size={12} color="#059669" />
                        <span>{item.customerPhone}</span>
                        <button
                          onClick={(e) => handleCopyText(item.customerPhone, `phone-${item.id}`, e)}
                          title="Sao chép SĐT"
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                        >
                          {copiedKey === `phone-${item.id}` ? <Check size={12} color="#16a34a" /> : <Copy size={12} color="#9ca3af" />}
                        </button>
                      </div>
                    </td>
                    <td className="admin-shop-td">
                      <div style={{ fontWeight: 600, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Package size={14} color="#059669" />
                        {itemsCount} sản phẩm
                      </div>
                      {item.items && item.items[0] && (
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.items[0].productTitle} (x{item.items[0].quantity}) {itemsCount > 1 ? `và ${itemsCount - 1} món khác` : ''}
                        </div>
                      )}
                    </td>
                    <td className="admin-shop-td">
                      <div style={{ fontWeight: 800, color: '#081f13', fontSize: '14.5px' }}>
                        {(Number(item.totalAmount) || 0).toLocaleString('vi-VN')} ₫
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>
                        {item.paymentMethod || 'COD'}
                      </div>
                    </td>
                    <td className="admin-shop-td">
                      <select
                        value={item.status || 'Chờ xác nhận'}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        className={`admin-shop-status-select ${statusType}`}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã thanh toán (Chờ giao)">Đã thanh toán (Chờ giao)</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã hoàn tất">Đã hoàn tất</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </td>
                    <td className="admin-shop-td actions">
                      <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết đơn"
                          className="admin-shop-btn-view"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('shop-orders', String(item.id))}
                          title="Xóa đơn hàng"
                          className="admin-shop-btn-delete"
                        >
                          <Trash2 size={14} />
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

      {/* Order Detail Modal */}
      {selectedDetailItem && (
        <div
          className="admin-shop-modal-backdrop"
          onClick={() => setSelectedDetailItem(null)}
        >
          <div
            className="admin-shop-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-shop-modal-header">
              <div>
                <span className="admin-shop-modal-code">
                  {selectedDetailItem.orderCode || `ORD-#${selectedDetailItem.id}`}
                </span>
                <h2 className="admin-shop-modal-title">
                  Chi Tiết Đơn Hàng Kollection 4U
                </h2>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-shop-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-shop-modal-grid">
              <div>
                <span className="admin-shop-modal-field-label">Khách hàng</span>
                <strong style={{ fontSize: '15px', color: '#111827' }}>{selectedDetailItem.customerName}</strong>
              </div>
              <div>
                <span className="admin-shop-modal-field-label">Số điện thoại</span>
                <strong style={{ fontSize: '15px', color: '#059669' }}>{selectedDetailItem.customerPhone}</strong>
              </div>
              <div className="admin-shop-modal-full-col">
                <span className="admin-shop-modal-field-label">Địa chỉ giao hàng</span>
                <strong style={{ fontSize: '14px', color: '#111827' }}>{selectedDetailItem.shippingAddress || 'Chưa cung cấp'}</strong>
              </div>
              <div>
                <span className="admin-shop-modal-field-label">Phương thức thanh toán</span>
                <strong style={{ fontSize: '14px', color: '#111827' }}>{selectedDetailItem.paymentMethod || 'COD'}</strong>
              </div>
              <div>
                <span className="admin-shop-modal-field-label">Ngày đặt hàng</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  {selectedDetailItem.createdAt ? new Date(selectedDetailItem.createdAt).toLocaleString('vi-VN') : '--'}
                </span>
              </div>
            </div>

            {/* Ordered Items Table */}
            <div className="admin-shop-modal-items-wrap">
              <h4 className="admin-shop-modal-items-title">
                Danh Sách Sản Phẩm Đặt Mua
              </h4>
              <div className="admin-shop-modal-items-box">
                {Array.isArray(selectedDetailItem.items) && selectedDetailItem.items.length > 0 ? (
                  selectedDetailItem.items.map((prod: any, pIdx: number) => (
                    <div
                      key={prod.id || pIdx}
                      className="admin-shop-modal-item-row"
                      style={{
                        borderBottom: pIdx < selectedDetailItem.items.length - 1 ? '1px solid #e2e8f0' : 'none'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{prod.productTitle}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Số lượng: {prod.quantity} x {Number(prod.price).toLocaleString('vi-VN')} ₫
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#059669', fontSize: '14px' }}>
                        {(Number(prod.subtotal) || Number(prod.price) * Number(prod.quantity)).toLocaleString('vi-VN')} ₫
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{selectedDetailItem.orderNotes || 'Không có chi tiết sản phẩm'}</div>
                )}

                <div className="admin-shop-modal-total-row">
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Tổng Tiền Đơn Hàng:</strong>
                  <strong style={{ fontSize: '18px', color: '#059669' }}>
                    {(Number(selectedDetailItem.totalAmount) || 0).toLocaleString('vi-VN')} ₫
                  </strong>
                </div>
              </div>
            </div>

            <div className="admin-shop-modal-footer">
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-shop-modal-dismiss-btn"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
