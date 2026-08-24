import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
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
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • KOLLECTION SHOP
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Đơn Mua Sắm Vật Phẩm
            </span>
          </div>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Quản Lý Đơn Hàng Kollection 4U ({filteredItems.length})
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Theo dõi danh sách đơn mua trang bị, vật phẩm tĩnh dưỡng và tiến độ giao hàng cho khách.
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

      {/* 4 Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Tổng Đơn Hàng</span>
            <ShoppingBag size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{stats.total}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #fed7aa', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#9a3412' }}>Chờ Xác Nhận</span>
            <Clock size={18} color="#ea580c" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#c2410c' }}>{stats.pending}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #bae6fd', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0369a1' }}>Đang Xử Lý / Giao</span>
            <Truck size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0284c7' }}>{stats.delivering}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #bbf7d0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>Doanh Thu Kollection</span>
            <DollarSign size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#16a34a' }}>
            {stats.totalRevenue.toLocaleString('vi-VN')} ₫
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Tất Cả', count: stats.total },
            { id: 'pending', label: 'Chờ Xác Nhận', count: stats.pending, color: '#c2410c' },
            { id: 'delivering', label: 'Đang Xử Lý / Giao', count: stats.delivering, color: '#0284c7' },
            { id: 'completed', label: 'Đã Hoàn Tất', count: stats.completed, color: '#16a34a' }
          ].map((tab) => {
            const isActive = selectedStatusTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusTab(tab.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: isActive ? '1.5px solid #059669' : '1px solid #e5e7eb',
                  background: isActive ? '#ecfdf5' : '#ffffff',
                  color: isActive ? '#065f46' : '#4b5563',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {tab.label}
                <span
                  style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: isActive ? '#059669' : '#f3f4f6',
                    color: isActive ? '#ffffff' : '#6b7280',
                    fontWeight: 700
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', minWidth: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, tên khách, SĐT..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '13.5px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Table Container */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}
      >
        {filteredItems.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <EmptyState
              title="Không tìm thấy đơn hàng nào"
              description="Hiện chưa có đơn hàng mua sắm Kollection 4U nào phù hợp với bộ lọc tìm kiếm."
              icon={<ShoppingBag size={40} color="#059669" />}
            />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', width: '110px' }}>MÃ ĐƠN</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>KHÁCH HÀNG</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SẢN PHẨM / SỐ LƯỢNG</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TỔNG TIỀN & THANH TOÁN</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TRẠNG THÁI</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right', width: '160px' }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const statusColor =
                  item.status === 'Đã hoàn tất'
                    ? '#16a34a'
                    : item.status === 'Đang giao hàng' || (item.status && item.status.includes('Đã thanh toán'))
                    ? '#0284c7'
                    : '#ea580c';
                const statusBg =
                  item.status === 'Đã hoàn tất'
                    ? '#f0fdf4'
                    : item.status === 'Đang giao hàng' || (item.status && item.status.includes('Đã thanh toán'))
                    ? '#f0f9ff'
                    : '#fff7ed';

                const itemsCount = item.items?.length || 1;

                return (
                  <tr
                    key={item.id || idx}
                    style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    <td style={{ padding: '14px 20px', verticalAlign: 'middle', fontWeight: 700, color: '#059669' }}>
                      {item.orderCode || `ORD-#${item.id}`}
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
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
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
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
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 800, color: '#081f13', fontSize: '14.5px' }}>
                        {(Number(item.totalAmount) || 0).toLocaleString('vi-VN')} ₫
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '2px' }}>
                        {item.paymentMethod || 'COD'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <select
                        value={item.status || 'Chờ xác nhận'}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          border: `1px solid ${statusColor}44`,
                          background: statusBg,
                          color: statusColor,
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã thanh toán (Chờ giao)">Đã thanh toán (Chờ giao)</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã hoàn tất">Đã hoàn tất</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', verticalAlign: 'middle', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết đơn"
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('shop-orders', String(item.id))}
                          title="Xóa đơn hàng"
                          style={{
                            width: '50px',
                            height: '32px',
                            borderRadius: '8px',
                            border: '1px solid #fecaca',
                            background: '#fff1f2',
                            color: '#b91c1c',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedDetailItem(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              boxSizing: 'border-box',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                  {selectedDetailItem.orderCode || `ORD-#${selectedDetailItem.id}`}
                </span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#111827' }}>
                  Chi Tiết Đơn Hàng Kollection 4U
                </h2>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Khách hàng</span>
                <strong style={{ fontSize: '15px', color: '#111827' }}>{selectedDetailItem.customerName}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Số điện thoại</span>
                <strong style={{ fontSize: '15px', color: '#059669' }}>{selectedDetailItem.customerPhone}</strong>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Địa chỉ giao hàng</span>
                <strong style={{ fontSize: '14px', color: '#111827' }}>{selectedDetailItem.shippingAddress || 'Chưa cung cấp'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Phương thức thanh toán</span>
                <strong style={{ fontSize: '14px', color: '#111827' }}>{selectedDetailItem.paymentMethod || 'COD'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Ngày đặt hàng</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  {selectedDetailItem.createdAt ? new Date(selectedDetailItem.createdAt).toLocaleString('vi-VN') : '--'}
                </span>
              </div>
            </div>

            {/* Ordered Items Table */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#111827', fontWeight: 700 }}>
                Danh Sách Sản Phẩm Đặt Mua
              </h4>
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px', border: '1px solid #e2e8f0' }}>
                {Array.isArray(selectedDetailItem.items) && selectedDetailItem.items.length > 0 ? (
                  selectedDetailItem.items.map((prod: any, pIdx: number) => (
                    <div
                      key={prod.id || pIdx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
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

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1.5px dashed #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Tổng Tiền Đơn Hàng:</strong>
                  <strong style={{ fontSize: '18px', color: '#059669' }}>
                    {(Number(selectedDetailItem.totalAmount) || 0).toLocaleString('vi-VN')} ₫
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedDetailItem(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#475569',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
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
