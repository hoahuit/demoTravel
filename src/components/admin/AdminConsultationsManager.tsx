import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
import './AdminConsultationsManager.css';
import {
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Search,
  Trash2,
  Eye,
  X,
  Copy,
  Check,
  Compass,
  FileText,
  Calendar,
  User,
  MessageSquare,
  RefreshCw
} from 'lucide-react';

interface AdminConsultationsManagerProps {
  consultationsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  handleStatusUpdate?: (item: any, newStatus: string) => void;
  onReload?: () => void;
  isReloading?: boolean;
}

export default function AdminConsultationsManager({
  consultationsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem,
  handleStatusUpdate,
  onReload,
  isReloading
}: AdminConsultationsManagerProps) {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [selectedDetailItem, setSelectedDetailItem] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (text: string, key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter consultations
  const filteredConsultations = useMemo(() => {
    return (consultationsList || []).filter((item) => {
      const q = searchFilter.toLowerCase().trim();
      const matchSearch =
        !q ||
        String(item.customerName || item.name || '').toLowerCase().includes(q) ||
        String(item.customerPhone || item.phone || '').toLowerCase().includes(q) ||
        String(item.tourName || item.tour || '').toLowerCase().includes(q) ||
        String(item.note || item.message || '').toLowerCase().includes(q);

      const status = item.status || 'Chưa tư vấn';
      const matchStatus =
        selectedStatusTab === 'all' ||
        (selectedStatusTab === 'pending' && (status === 'Chưa tư vấn' || status === 'Chờ xử lý')) ||
        (selectedStatusTab === 'processing' && (status === 'Đang xử lý' || status === 'Đang liên hệ')) ||
        (selectedStatusTab === 'completed' && (status === 'Đã hoàn tất' || status === 'Đã tư vấn' || status === 'Thành công')) ||
        (selectedStatusTab === 'cancelled' && (status === 'Đã hủy' || status === 'Không liên lạc được'));

      return matchSearch && matchStatus;
    });
  }, [consultationsList, searchFilter, selectedStatusTab]);

  // Metrics
  const metrics = useMemo(() => {
    const total = consultationsList.length;
    const pending = consultationsList.filter((c) => (c.status || 'Chưa tư vấn') === 'Chưa tư vấn' || c.status === 'Chờ xử lý').length;
    const processing = consultationsList.filter((c) => c.status === 'Đang xử lý' || c.status === 'Đang liên hệ').length;
    const completed = consultationsList.filter((c) => c.status === 'Đã hoàn tất' || c.status === 'Đã tư vấn' || c.status === 'Thành công').length;
    return { total, pending, processing, completed };
  }, [consultationsList]);

  const getStatusBadge = (status?: string) => {
    const s = status || 'Chưa tư vấn';
    if (s === 'Chưa tư vấn' || s === 'Chờ xử lý') {
      return { bg: '#fef3c7', text: '#92400e', border: '#fde68a', label: 'Chưa tư vấn', icon: AlertCircle };
    }
    if (s === 'Đang xử lý' || s === 'Đang liên hệ') {
      return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', label: 'Đang liên hệ', icon: PhoneCall };
    }
    if (s === 'Đã hoàn tất' || s === 'Đã tư vấn' || s === 'Thành công') {
      return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', label: 'Đã tư vấn xong', icon: CheckCircle2 };
    }
    return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', label: s, icon: Clock };
  };

  return (
    <div className="admin-consult-root">
      {/* HEADER BAR */}
      <div className="admin-consult-header">
        <div>
          <div className="admin-consult-meta-row">
            <span className="admin-consult-tag">
              4U RETREAT • QUẢN TRỊ KHÁCH HÀNG
            </span>
            <span className="admin-consult-dot" />
            <span className="admin-consult-subtag">
              Lịch Hẹn Gọi Tư Vấn
            </span>
          </div>
          <h1 className="admin-consult-title">
            Quản Lý Lịch Hẹn Tư Vấn Tour
          </h1>
          <p className="admin-consult-desc">
            Theo dõi danh sách khách hàng đăng ký nhận tư vấn lộ trình và khung giờ hẹn gọi lại.
          </p>
        </div>

        {onReload && (
          <button
            type="button"
            onClick={onReload}
            disabled={isReloading}
            className="admin-consult-refresh-btn"
          >
            <RefreshCw size={14} color="#64748b" className={isReloading ? 'animate-spin' : ''} />
            <span>{isReloading ? 'Đang tải...' : 'Làm Mới'}</span>
          </button>
        )}
      </div>

      {/* METRICS 4-CARDS ROW (RULE 85) */}
      <div className="admin-consult-metrics-grid">
        <div className="admin-consult-metric-card">
          <div className="admin-consult-metric-label">
            Tổng Lịch Hẹn
          </div>
          <div className="admin-consult-metric-val">
            {metrics.total}
          </div>
          <div className="admin-consult-metric-sub">Cuộc hẹn từ website</div>
        </div>

        <div className="admin-consult-metric-card">
          <div className="admin-consult-metric-label pending">
            Chưa Tư Vấn
          </div>
          <div className="admin-consult-metric-val pending">
            {metrics.pending}
          </div>
          <div className="admin-consult-metric-sub pending">Cần liên hệ sớm</div>
        </div>

        <div className="admin-consult-metric-card">
          <div className="admin-consult-metric-label processing">
            Đang Xử Lý
          </div>
          <div className="admin-consult-metric-val processing">
            {metrics.processing}
          </div>
          <div className="admin-consult-metric-sub processing">Đang chăm sóc khách</div>
        </div>

        <div className="admin-consult-metric-card">
          <div className="admin-consult-metric-label completed">
            Đã Hoàn Tất
          </div>
          <div className="admin-consult-metric-val completed">
            {metrics.completed}
          </div>
          <div className="admin-consult-metric-sub completed">Tư vấn thành công</div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="admin-consult-filter-row">
        <div className="admin-consult-tabs">
          {[
            { id: 'all', label: `Tất Cả (${metrics.total})` },
            { id: 'pending', label: `Chờ Tư Vấn (${metrics.pending})` },
            { id: 'processing', label: `Đang Liên Hệ (${metrics.processing})` },
            { id: 'completed', label: `Đã Hoàn Tất (${metrics.completed})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id)}
              className={`admin-consult-tab-btn ${selectedStatusTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-consult-search-wrap">
          <Search size={15} color="#94a3b8" className="admin-consult-search-icon" />
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT, tour..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="admin-consult-search-input"
          />
        </div>
      </div>

      {/* TABLE CONTAINER & CARD (RULE 85) */}
      <div className="admin-consult-table-wrap">
        {filteredConsultations.length === 0 ? (
          <EmptyState
            title="Không tìm thấy lịch hẹn tư vấn nào"
            description="Chưa có khách hàng đăng ký hoặc không có dữ liệu phù hợp với bộ lọc hiện tại."
          />
        ) : (
          <table className="admin-consult-table">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th className="admin-consult-th customer">
                  Khách Hàng
                </th>
                <th className="admin-consult-th">
                  Tour Quan Tâm
                </th>
                <th className="admin-consult-th">
                  Khung Giờ Hẹn
                </th>
                <th className="admin-consult-th">
                  Ghi Chú Nhu Cầu
                </th>
                <th className="admin-consult-th">
                  Trạng Thái
                </th>
                <th className="admin-consult-th actions">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.map((item, idx) => {
                const badge = getStatusBadge(item.status);
                const custName = item.customerName || item.name || 'Khách hàng 4U';
                const custPhone = item.customerPhone || item.phone || 'Chưa cung cấp';
                const custEmail = item.customerEmail || item.email || '';
                const tourName = item.tourName || item.tour || 'Tư vấn lộ trình tổng thể';
                const callTime = item.preferredCallTime || 'Sáng (8h - 12h)';
                const note = item.note || item.message || '';

                return (
                  <tr key={item.id || idx} className="admin-consult-tr">
                    {/* Customer Info */}
                    <td className="admin-consult-td customer">
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                        {custName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                        <a
                          href={`tel:${custPhone}`}
                          className="admin-consult-phone-link"
                        >
                          <Phone size={12} />
                          <span>{custPhone}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopyText(custPhone, `phone-${item.id || idx}`, e)}
                          title="Sao chép SĐT"
                          className="admin-consult-copy-btn"
                        >
                          {copiedKey === `phone-${item.id || idx}` ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                        </button>
                      </div>
                      {custEmail && (
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                          {custEmail}
                        </div>
                      )}
                    </td>

                    {/* Tour Name */}
                    <td className="admin-consult-td">
                      <div className="admin-consult-tour-badge">
                        <Compass size={14} color="#0f766e" style={{ flexShrink: 0 }} />
                        <span>{tourName}</span>
                      </div>
                    </td>

                    {/* Preferred Call Time */}
                    <td className="admin-consult-td">
                      <div className="admin-consult-time-tag">
                        <Clock size={12} />
                        <span>{callTime}</span>
                      </div>
                    </td>

                    {/* Customer Notes */}
                    <td className="admin-consult-td" style={{ maxWidth: '240px' }}>
                      {note ? (
                        <div className="admin-consult-note-text">
                          {note}
                        </div>
                      ) : (
                        <span className="admin-consult-note-empty">Không có ghi chú thêm</span>
                      )}
                    </td>

                    {/* Status Dropdown / Badge */}
                    <td className="admin-consult-td">
                      <select
                        value={item.status || 'Chưa tư vấn'}
                        onChange={(e) => handleStatusUpdate && handleStatusUpdate(item, e.target.value)}
                        className="admin-consult-status-select"
                        style={{
                          border: `1px solid ${badge.border}`,
                          backgroundColor: badge.bg,
                          color: badge.text
                        }}
                      >
                        <option value="Chưa tư vấn">Chưa tư vấn</option>
                        <option value="Đang xử lý">Đang liên hệ</option>
                        <option value="Đã hoàn tất">Đã tư vấn xong</option>
                        <option value="Đã hủy">Đã hủy hẹn</option>
                      </select>
                    </td>

                    {/* ACTION BUTTONS (RULE 85: 50px x 32px) */}
                    <td className="admin-consult-td actions">
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết cuộc hẹn"
                          className="admin-consult-btn-view"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteItem('consultations', item.id)}
                          title="Xóa lịch hẹn"
                          className="admin-consult-btn-delete"
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

      {/* DETAIL MODAL FOR CONSULTATION */}
      {selectedDetailItem && (
        <div className="admin-consult-modal-backdrop">
          <div className="admin-consult-modal-box">
            {/* Header */}
            <div className="admin-consult-modal-header">
              <div>
                <h3 className="admin-consult-modal-title">
                  Chi Tiết Lịch Hẹn Tư Vấn
                </h3>
                <span className="admin-consult-modal-code">
                  Mã cuộc hẹn: #{selectedDetailItem.id || 'N/A'}
                </span>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-consult-modal-close-btn"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="admin-consult-modal-body">
              {/* Customer Box */}
              <div className="admin-consult-modal-cust-box">
                <div className="admin-consult-modal-cust-tag">
                  Thông Tin Khách Hàng
                </div>
                <div className="admin-consult-modal-cust-name">
                  {selectedDetailItem.customerName || selectedDetailItem.name || 'Khách hàng 4U'}
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#475569' }}>
                  <div>
                    <span style={{ color: '#94a3b8' }}>SĐT:</span>{' '}
                    <strong style={{ color: '#0f766e' }}>{selectedDetailItem.customerPhone || selectedDetailItem.phone || 'Chưa có'}</strong>
                  </div>
                  {selectedDetailItem.customerEmail && (
                    <div>
                      <span style={{ color: '#94a3b8' }}>Email:</span> {selectedDetailItem.customerEmail}
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div>
                  <span className="admin-consult-modal-field-title">
                    Tour Quan Tâm
                  </span>
                  <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Compass size={15} color="#0f766e" />
                    <span>{selectedDetailItem.tourName || selectedDetailItem.tour || 'Tư vấn lộ trình tổng thể'}</span>
                  </div>
                </div>

                <div>
                  <span className="admin-consult-modal-field-title">
                    Khung Giờ Hẹn Gọi Lại
                  </span>
                  <div className="admin-consult-time-tag">
                    <Clock size={13} color="#0f766e" />
                    <span>{selectedDetailItem.preferredCallTime || 'Sáng (8h - 12h)'}</span>
                  </div>
                </div>

                <div>
                  <span className="admin-consult-modal-field-title">
                    Ghi Chú Nhu Cầu Của Khách
                  </span>
                  <div className="admin-consult-modal-note-box">
                    {selectedDetailItem.note || selectedDetailItem.message || 'Khách hàng không để lại ghi chú thêm.'}
                  </div>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="admin-consult-modal-status-row">
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Cập nhật trạng thái:</span>
                <select
                  value={selectedDetailItem.status || 'Chưa tư vấn'}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (handleStatusUpdate) {
                      handleStatusUpdate(selectedDetailItem, newStatus);
                    }
                    setSelectedDetailItem({ ...selectedDetailItem, status: newStatus });
                  }}
                  className="admin-consult-modal-status-select"
                >
                  <option value="Chưa tư vấn">Chưa tư vấn</option>
                  <option value="Đang xử lý">Đang liên hệ</option>
                  <option value="Đã hoàn tất">Đã tư vấn xong</option>
                  <option value="Đã hủy">Đã hủy hẹn</option>
                </select>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="admin-consult-modal-footer">
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="admin-consult-modal-dismiss-btn"
              >
                Đóng
              </button>
              <a
                href={`tel:${selectedDetailItem.customerPhone || selectedDetailItem.phone}`}
                className="admin-consult-modal-call-btn"
              >
                <PhoneCall size={14} />
                <span>Gọi Khách Ngay</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
