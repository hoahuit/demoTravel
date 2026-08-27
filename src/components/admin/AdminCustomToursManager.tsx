import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
import './AdminCustomToursManager.css';
import {
  Compass,
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
  Calendar,
  Users,
  MapPin,
  Sparkles,
  RefreshCw,
  FileText
} from 'lucide-react';

interface AdminCustomToursManagerProps {
  customToursList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal?: (section: any) => void;
  openEditModal?: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  handleStatusUpdate?: (item: any, newStatus: string) => void;
  onReload?: () => void;
  isReloading?: boolean;
}

export default function AdminCustomToursManager({
  customToursList,
  searchFilter,
  setSearchFilter,
  openEditModal,
  handleDeleteItem,
  handleStatusUpdate,
  onReload,
  isReloading
}: AdminCustomToursManagerProps) {
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
    return customToursList.filter((item) => {
      const q = searchFilter.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.customerName && item.customerName.toLowerCase().includes(q)) ||
        (item.customerPhone && item.customerPhone.includes(q)) ||
        (item.customerEmail && item.customerEmail.toLowerCase().includes(q)) ||
        (item.destination && item.destination.toLowerCase().includes(q)) ||
        (item.requestCode && item.requestCode.toLowerCase().includes(q));

      const matchStatus =
        selectedStatusTab === 'all' ||
        (selectedStatusTab === 'pending' && (!item.status || item.status === 'Chưa tư vấn')) ||
        (selectedStatusTab === 'processing' && item.status === 'Đang thiết kế') ||
        (selectedStatusTab === 'completed' && (item.status === 'Đã hoàn tất' || item.status === 'Đã chốt tour')) ||
        (selectedStatusTab === 'cancelled' && item.status === 'Hủy yêu cầu');

      return matchSearch && matchStatus;
    });
  }, [customToursList, searchFilter, selectedStatusTab]);

  const stats = useMemo(() => {
    const total = customToursList.length;
    const pending = customToursList.filter((i) => !i.status || i.status === 'Chưa tư vấn').length;
    const processing = customToursList.filter((i) => i.status === 'Đang thiết kế').length;
    const completed = customToursList.filter(
      (i) => i.status === 'Đã hoàn tất' || i.status === 'Đã chốt tour'
    ).length;
    return { total, pending, processing, completed };
  }, [customToursList]);

  return (
    <div className="admin-custom-tours-root">
      {/* HEADER BAR */}
      <div className="admin-custom-tours-header">
        <div>
          <div className="admin-custom-tours-meta-row">
            <span className="admin-custom-tours-tag">
              4U RETREAT • MAY ĐO LỊCH TRÌNH
            </span>
            <span className="admin-custom-tours-dot" />
            <span className="admin-custom-tours-subtag">
              Thiết Kế Tour Riêng Biệt
            </span>
          </div>
          <h1 className="admin-custom-tours-title">
            Quản Lý Yêu Cầu Thiết Kế Lịch Trình ({filteredItems.length})
          </h1>
          <p className="admin-custom-tours-desc">
            Tổng hợp các hồ sơ yêu cầu may đo tour riêng, điểm đến mong muốn và ngân sách dự kiến của khách.
          </p>
        </div>

        {onReload && (
          <button
            type="button"
            onClick={onReload}
            disabled={isReloading}
            className="admin-custom-tours-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" className={isReloading ? 'animate-spin' : ''} />
            <span>{isReloading ? 'Đang tải...' : 'Làm Mới'}</span>
          </button>
        )}
      </div>

      {/* 4 Metrics Cards */}
      <div className="admin-custom-tours-stats-grid">
        <div className="admin-custom-stat-card">
          <div className="admin-custom-stat-top">
            <span className="admin-custom-stat-label">Tổng Yêu Cầu May Đo</span>
            <Compass size={18} color="#059669" />
          </div>
          <div className="admin-custom-stat-val">{stats.total}</div>
        </div>

        <div className="admin-custom-stat-card pending">
          <div className="admin-custom-stat-top">
            <span className="admin-custom-stat-label pending">Chờ Tiếp Nhận</span>
            <Clock size={18} color="#ea580c" />
          </div>
          <div className="admin-custom-stat-val pending">{stats.pending}</div>
        </div>

        <div className="admin-custom-stat-card processing">
          <div className="admin-custom-stat-top">
            <span className="admin-custom-stat-label processing">Đang Lên Lịch Trình</span>
            <Sparkles size={18} color="#0284c7" />
          </div>
          <div className="admin-custom-stat-val processing">{stats.processing}</div>
        </div>

        <div className="admin-custom-stat-card completed">
          <div className="admin-custom-stat-top">
            <span className="admin-custom-stat-label completed">Đã Chốt & Hoàn Tất</span>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>
          <div className="admin-custom-stat-val completed">{stats.completed}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-custom-filter-row">
        <div className="admin-custom-tab-group">
          {[
            { id: 'all', label: 'Tất Cả', count: stats.total },
            { id: 'pending', label: 'Chờ Tiếp Nhận', count: stats.pending },
            { id: 'processing', label: 'Đang Thiết Kế', count: stats.processing },
            { id: 'completed', label: 'Đã Hoàn Tất', count: stats.completed }
          ].map((tab) => {
            const isActive = selectedStatusTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusTab(tab.id)}
                className={`admin-custom-tab-btn ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                <span className="admin-custom-tab-badge">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="admin-custom-search-wrap">
          <Search size={16} className="admin-custom-search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên khách, SĐT, điểm đến..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="admin-custom-search-input"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="admin-custom-table-container">
        {filteredItems.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <EmptyState
              title="Không tìm thấy yêu cầu may đo nào"
              description="Hiện chưa có yêu cầu thiết kế lịch trình nào phù hợp với bộ lọc tìm kiếm."
              icon={<Compass size={40} color="#059669" />}
            />
          </div>
        ) : (
          <table className="admin-custom-table">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="admin-custom-th code">MÃ YÊU CẦU</th>
                <th className="admin-custom-th">KHÁCH HÀNG</th>
                <th className="admin-custom-th">ĐIỂM ĐẾN & THỜI LƯỢNG</th>
                <th className="admin-custom-th">SỐ KHÁCH / NGÂN SÁCH</th>
                <th className="admin-custom-th">TRẠNG THÁI</th>
                <th className="admin-custom-th actions">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const statusType =
                  item.status === 'Đã hoàn tất' || item.status === 'Đã chốt tour'
                    ? 'completed'
                    : item.status === 'Đang thiết kế'
                    ? 'processing'
                    : 'pending';

                return (
                  <tr key={item.id || idx} className="admin-custom-tr">
                    <td className="admin-custom-td code">
                      {item.requestCode || `CTR-#${item.id}`}
                    </td>
                    <td className="admin-custom-td">
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
                    <td className="admin-custom-td">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: '#1f2937' }}>
                        <MapPin size={14} color="#ea580c" />
                        {item.destination || 'Theo tư vấn của 4U'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                        Thời lượng: {item.durationDays || 3} ngày {item.durationDays ? item.durationDays - 1 : 2} đêm
                      </div>
                    </td>
                    <td className="admin-custom-td">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#374151' }}>
                        <Users size={14} color="#6b7280" />
                        <strong>{item.numberOfGuests || 2} khách</strong>
                      </div>
                      {item.budgetPerPerson && (
                        <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                          Ngân sách: {Number(item.budgetPerPerson).toLocaleString('vi-VN')} ₫/khách
                        </div>
                      )}
                    </td>
                    <td className="admin-custom-td">
                      <select
                        value={item.status || 'Chưa tư vấn'}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        className={`admin-custom-status-select ${statusType}`}
                      >
                        <option value="Chưa tư vấn">Chưa tư vấn</option>
                        <option value="Đang thiết kế">Đang thiết kế</option>
                        <option value="Đã chốt tour">Đã chốt tour</option>
                        <option value="Hủy yêu cầu">Hủy yêu cầu</option>
                      </select>
                    </td>
                    <td className="admin-custom-td actions">
                      <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết"
                          className="admin-custom-btn-view"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('custom-tours', String(item.id))}
                          title="Xóa yêu cầu"
                          className="admin-custom-btn-delete"
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

      {/* Detail Modal */}
      {selectedDetailItem && (
        <div
          className="admin-custom-modal-backdrop"
          onClick={() => setSelectedDetailItem(null)}
        >
          <div
            className="admin-custom-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-custom-modal-header">
              <div>
                <span className="admin-custom-modal-code">
                  {selectedDetailItem.requestCode || `CTR-#${selectedDetailItem.id}`}
                </span>
                <h2 className="admin-custom-modal-title">
                  Yêu Cầu Thiết Kế Lịch Trình
                </h2>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-custom-modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-custom-modal-grid">
              <div>
                <span className="admin-custom-modal-field-label">Khách hàng</span>
                <strong style={{ fontSize: '15px', color: '#111827' }}>{selectedDetailItem.customerName}</strong>
              </div>
              <div>
                <span className="admin-custom-modal-field-label">Số điện thoại</span>
                <strong style={{ fontSize: '15px', color: '#059669' }}>{selectedDetailItem.customerPhone}</strong>
              </div>
              <div>
                <span className="admin-custom-modal-field-label">Điểm đến mong muốn</span>
                <strong className="admin-custom-modal-field-val">{selectedDetailItem.destination || 'Theo tư vấn'}</strong>
              </div>
              <div>
                <span className="admin-custom-modal-field-label">Số lượng khách</span>
                <strong className="admin-custom-modal-field-val">{selectedDetailItem.numberOfGuests || 2} người</strong>
              </div>
              <div>
                <span className="admin-custom-modal-field-label">Thời gian gọi thuận tiện</span>
                <strong className="admin-custom-modal-field-val">{selectedDetailItem.preferredCallTime || 'Linh hoạt'}</strong>
              </div>
              <div>
                <span className="admin-custom-modal-field-label">Ngày tạo</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  {selectedDetailItem.createdAt ? new Date(selectedDetailItem.createdAt).toLocaleString('vi-VN') : '--'}
                </span>
              </div>
            </div>

            {selectedDetailItem.specialRequests && (
              <div className="admin-custom-modal-notes">
                <span className="admin-custom-modal-notes-label">
                  Yêu Cầu & Ghi Chú Đặc Biệt:
                </span>
                <p className="admin-custom-modal-notes-text">
                  {selectedDetailItem.specialRequests}
                </p>
              </div>
            )}

            <div className="admin-custom-modal-footer">
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-custom-modal-dismiss-btn"
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
