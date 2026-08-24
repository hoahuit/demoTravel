import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
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
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • QUẢN TRỊ KHÁCH HÀNG
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Lịch Hẹn Gọi Tư Vấn
            </span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Quản Lý Lịch Hẹn Tư Vấn Tour
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Theo dõi danh sách khách hàng đăng ký nhận tư vấn lộ trình và khung giờ hẹn gọi lại.
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

      {/* METRICS 4-CARDS ROW (RULE 85) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
            Tổng Lịch Hẹn
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>
            {metrics.total}
          </div>
          <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '4px' }}>Cuộc hẹn từ website</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', marginBottom: '6px' }}>
            Chưa Tư Vấn
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#b45309' }}>
            {metrics.pending}
          </div>
          <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '4px' }}>Cần liên hệ sớm</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginBottom: '6px' }}>
            Đang Xử Lý
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0369a1' }}>
            {metrics.processing}
          </div>
          <div style={{ fontSize: '11.5px', color: '#0369a1', marginTop: '4px' }}>Đang chăm sóc khách</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', marginBottom: '6px' }}>
            Đã Hoàn Tất
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d' }}>
            {metrics.completed}
          </div>
          <div style={{ fontSize: '11.5px', color: '#15803d', marginTop: '4px' }}>Tư vấn thành công</div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `Tất Cả (${metrics.total})` },
            { id: 'pending', label: `Chờ Tư Vấn (${metrics.pending})` },
            { id: 'processing', label: `Đang Liên Hệ (${metrics.processing})` },
            { id: 'completed', label: `Đã Hoàn Tất (${metrics.completed})` }
          ].map(tab => (
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
            placeholder="Tìm theo tên, SĐT, tour..."
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
        {filteredConsultations.length === 0 ? (
          <EmptyState
            title="Không tìm thấy lịch hẹn tư vấn nào"
            description="Chưa có khách hàng đăng ký hoặc không có dữ liệu phù hợp với bộ lọc hiện tại."
          />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Khách Hàng
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Tour Quan Tâm
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Khung Giờ Hẹn
                </th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Ghi Chú Nhu Cầu
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
              {filteredConsultations.map((item, idx) => {
                const badge = getStatusBadge(item.status);
                const BadgeIcon = badge.icon;
                const custName = item.customerName || item.name || 'Khách hàng 4U';
                const custPhone = item.customerPhone || item.phone || 'Chưa cung cấp';
                const custEmail = item.customerEmail || item.email || '';
                const tourName = item.tourName || item.tour || 'Tư vấn lộ trình tổng thể';
                const callTime = item.preferredCallTime || 'Sáng (8h - 12h)';
                const note = item.note || item.message || '';

                return (
                  <tr
                    key={item.id || idx}
                    style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Customer Info */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                        {custName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                        <a
                          href={`tel:${custPhone}`}
                          style={{ fontSize: '12px', color: '#0f766e', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Phone size={12} />
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
                      {custEmail && (
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                          {custEmail}
                        </div>
                      )}
                    </td>

                    {/* Tour Name */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Compass size={14} color="#0f766e" style={{ flexShrink: 0 }} />
                        <span>{tourName}</span>
                      </div>
                    </td>

                    {/* Preferred Call Time */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#475569', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                        <Clock size={12} />
                        <span>{callTime}</span>
                      </div>
                    </td>

                    {/* Customer Notes */}
                    <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                      {note ? (
                        <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {note}
                        </div>
                      ) : (
                        <span style={{ fontSize: '11.5px', color: '#94a3b8', fontStyle: 'italic' }}>Không có ghi chú thêm</span>
                      )}
                    </td>

                    {/* Status Dropdown / Badge */}
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={item.status || 'Chưa tư vấn'}
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
                        <option value="Chưa tư vấn">Chưa tư vấn</option>
                        <option value="Đang xử lý">Đang liên hệ</option>
                        <option value="Đã hoàn tất">Đã tư vấn xong</option>
                        <option value="Đã hủy">Đã hủy hẹn</option>
                      </select>
                    </td>

                    {/* ACTION BUTTONS (RULE 85: 50px x 32px) */}
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết cuộc hẹn"
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
                          onClick={() => handleDeleteItem('consultations', item.id)}
                          title="Xóa lịch hẹn"
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

      {/* DETAIL MODAL FOR CONSULTATION */}
      {selectedDetailItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '540px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                  Chi Tiết Lịch Hẹn Tư Vấn
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Mã cuộc hẹn: #{selectedDetailItem.id || 'N/A'}
                </span>
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
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Thông Tin Khách Hàng
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
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
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>
                    Tour Quan Tâm
                  </span>
                  <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Compass size={15} color="#0f766e" />
                    <span>{selectedDetailItem.tourName || selectedDetailItem.tour || 'Tư vấn lộ trình tổng thể'}</span>
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>
                    Khung Giờ Hẹn Gọi Lại
                  </span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#334155', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                    <Clock size={13} color="#0f766e" />
                    <span>{selectedDetailItem.preferredCallTime || 'Sáng (8h - 12h)'}</span>
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '11.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2px' }}>
                    Ghi Chú Nhu Cầu Của Khách
                  </span>
                  <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', color: '#334155', lineHeight: 1.5, minHeight: '60px' }}>
                    {selectedDetailItem.note || selectedDetailItem.message || 'Khách hàng không để lại ghi chú thêm.'}
                  </div>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div style={{ paddingTop: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 700, color: '#0f172a', outline: 'none' }}
                >
                  <option value="Chưa tư vấn">Chưa tư vấn</option>
                  <option value="Đang xử lý">Đang liên hệ</option>
                  <option value="Đã hoàn tất">Đã tư vấn xong</option>
                  <option value="Đã hủy">Đã hủy hẹn</option>
                </select>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{ padding: '14px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedDetailItem(null)}
                style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Đóng
              </button>
              <a
                href={`tel:${selectedDetailItem.customerPhone || selectedDetailItem.phone}`}
                style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#0f766e', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
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
