import React, { useState, useMemo } from 'react';
import EmptyState from '../ui/EmptyState';
import {
  Compass,
  Clock,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Mail,
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

  const formatGuestsDisplay = (item: any): string => {
    if (!item) return '2 người (Cặp đôi)';

    // 1. Direct guestCount string if available
    if (item.guestCount && typeof item.guestCount === 'string' && item.guestCount.trim()) {
      return item.guestCount.trim();
    }

    // 2. Extract [Quy mô đoàn: ...] from specialRequests
    if (item.specialRequests && typeof item.specialRequests === 'string') {
      const match = item.specialRequests.match(/\[Quy mô đoàn:\s*([^\]]+)\]/i);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // 3. Match based on numeric numberOfGuests
    const n = Number(item.numberOfGuests);
    if (!isNaN(n) && n > 0) {
      if (n === 1) return '1 người (Cá nhân / Solo)';
      if (n === 2) return '2 người (Cặp đôi)';
      if (n >= 3 && n <= 5) return `${n} người (Gia đình)`;
      if (n >= 6 && n <= 10) return `${n} người (Nhóm bạn)`;
      if (n > 10) return `${n} người (Doanh nghiệp / Đoàn thể)`;
      return `${n} khách`;
    }

    // 4. Heuristics from specialRequests for legacy items
    if (item.specialRequests && typeof item.specialRequests === 'string') {
      const lower = item.specialRequests.toLowerCase();
      if (lower.includes('gia đình')) return '3 - 5 người (Gia đình)';
      if (lower.includes('doanh nghiệp') || lower.includes('đoàn thể') || lower.includes('công ty')) return 'Đoàn trên 10 người (Doanh nghiệp)';
      if (lower.includes('nhóm bạn')) return '6 - 10 người (Nhóm bạn)';
      if (lower.includes('1 người') || lower.includes('cá nhân') || lower.includes('solo')) return '1 người (Cá nhân / Solo)';
    }

    return '2 người (Cặp đôi)';
  };

  const getCleanSpecialRequests = (notes?: string): string => {
    if (!notes) return 'Không có ghi chú thêm';
    const cleaned = notes.replace(/\[Quy mô đoàn:\s*[^\]]+\]\n?/i, '').trim();
    return cleaned || notes;
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
        (item.requestCode && item.requestCode.toLowerCase().includes(q)) ||
        (item.specialRequests && item.specialRequests.toLowerCase().includes(q)) ||
        (item.guestCount && item.guestCount.toLowerCase().includes(q));

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
    const completed = customToursList.filter((i) => i.status === 'Đã hoàn tất' || i.status === 'Đã chốt tour').length;
    return { total, pending, processing, completed };
  }, [customToursList]);

  return (
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              4U RETREAT • MAY ĐO LỊCH TRÌNH
            </span>
            <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              Thiết Kế Tour Riêng Biệt
            </span>
          </div>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            Quản Lý lịch trình thiết kế ({filteredItems.length})
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
            Tổng hợp các hồ sơ yêu cầu may đo tour riêng, điểm đến mong muốn và ngân sách dự kiến của khách.
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>Tổng Yêu Cầu May Đo</span>
            <Compass size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{stats.total}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #fed7aa', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#9a3412' }}>Chờ Tiếp Nhận</span>
            <Clock size={18} color="#ea580c" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#c2410c' }}>{stats.pending}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #bae6fd', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0369a1' }}>Đang Lên Lịch Trình</span>
            <Sparkles size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#0284c7' }}>{stats.processing}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #bbf7d0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>Đã Chốt & Hoàn Tất</span>
            <CheckCircle2 size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#16a34a' }}>{stats.completed}</div>
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
            { id: 'pending', label: 'Chờ Tiếp Nhận', count: stats.pending, color: '#c2410c' },
            { id: 'processing', label: 'Đang Thiết Kế', count: stats.processing, color: '#0284c7' },
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
            placeholder="Tìm theo tên khách, SĐT, điểm đến..."
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
              title="Không tìm thấy yêu cầu may đo nào"
              description="Hiện chưa có yêu cầu thiết kế lịch trình nào phù hợp với bộ lọc tìm kiếm."
              icon={<Compass size={40} color="#059669" />}
            />
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', width: '110px' }}>MÃ YÊU CẦU</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>KHÁCH HÀNG</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ĐIỂM ĐẾN & THỜI LƯỢNG</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SỐ KHÁCH / NGÂN SÁCH</th>
                <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TRẠNG THÁI</th>
                <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right', width: '160px' }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => {
                const statusColor =
                  item.status === 'Đã hoàn tất' || item.status === 'Đã chốt tour'
                    ? '#16a34a'
                    : item.status === 'Đang thiết kế'
                      ? '#0284c7'
                      : '#ea580c';
                const statusBg =
                  item.status === 'Đã hoàn tất' || item.status === 'Đã chốt tour'
                    ? '#f0fdf4'
                    : item.status === 'Đang thiết kế'
                      ? '#f0f9ff'
                      : '#fff7ed';

                return (
                  <tr
                    key={item.id || idx}
                    style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    <td style={{ padding: '14px 20px', verticalAlign: 'middle', fontWeight: 700, color: '#059669' }}>
                      {item.requestCode || `CTR-#${item.id}`}
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
                      {item.customerEmail ? (
                        <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                          <a
                            href={`mailto:${item.customerEmail}`}
                            style={{ color: '#4b5563', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', minWidth: 0 }}
                            title={`Gửi email: ${item.customerEmail}`}
                          >
                            <Mail size={11} color="#6b7280" style={{ flexShrink: 0 }} />
                            <span style={{ maxWidth: '175px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.customerEmail}
                            </span>
                          </a>
                          <button
                            onClick={(e) => handleCopyText(item.customerEmail, `email-${item.id}`, e)}
                            title="Sao chép Email"
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                          >
                            {copiedKey === `email-${item.id}` ? <Check size={12} color="#16a34a" /> : <Copy size={12} color="#9ca3af" />}
                          </button>
                        </div>
                      ) : (
                        <div style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic', marginTop: '2px' }}>
                          Chưa có email
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: '#1f2937' }}>
                        <MapPin size={14} color="#ea580c" />
                        {item.destination || 'Theo tư vấn của 4U'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                        Thời lượng: {item.durationDays || 3} ngày {item.durationDays ? item.durationDays - 1 : 2} đêm
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1f2937' }}>
                        <Users size={14} color="#0d9488" style={{ flexShrink: 0 }} />
                        <strong style={{ fontSize: '13px', color: '#111827' }}>{formatGuestsDisplay(item)}</strong>
                      </div>
                      {item.budgetPerPerson && (
                        <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                          Ngân sách: {Number(item.budgetPerPerson).toLocaleString('vi-VN')} ₫/khách
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <select
                        value={item.status || 'Chưa tư vấn'}
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
                        <option value="Chưa tư vấn">Chưa tư vấn</option>
                        <option value="Đang thiết kế">Đang thiết kế</option>
                        <option value="Đã chốt tour">Đã chốt tour</option>
                        <option value="Hủy yêu cầu">Hủy yêu cầu</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 20px', verticalAlign: 'middle', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setSelectedDetailItem(item)}
                          title="Xem chi tiết"
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
                          onClick={() => handleDeleteItem('custom-tours', String(item.id))}
                          title="Xóa yêu cầu"
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

      {/* Detail Modal */}
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
              maxWidth: '600px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              boxSizing: 'border-box'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                  {selectedDetailItem.requestCode || `CTR-#${selectedDetailItem.id}`}
                </span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#111827' }}>
                  Yêu Cầu Thiết Kế Lịch Trình
                </h2>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Khách hàng</span>
                <strong style={{ fontSize: '15px', color: '#111827' }}>{selectedDetailItem.customerName}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Số điện thoại</span>
                <strong style={{ fontSize: '15px', color: '#059669' }}>{selectedDetailItem.customerPhone}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Email liên hệ</span>
                {selectedDetailItem.customerEmail ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <a
                      href={`mailto:${selectedDetailItem.customerEmail}`}
                      style={{ fontSize: '14px', color: '#059669', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Mail size={13} color="#059669" />
                      <span style={{ wordBreak: 'break-all' }}>{selectedDetailItem.customerEmail}</span>
                    </a>
                    <button
                      onClick={(e) => handleCopyText(selectedDetailItem.customerEmail, 'modal-email', e)}
                      title="Sao chép Email"
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                    >
                      {copiedKey === 'modal-email' ? <Check size={12} color="#16a34a" /> : <Copy size={12} color="#9ca3af" />}
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>Chưa cung cấp</span>
                )}
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Điểm đến mong muốn</span>
                <strong style={{ fontSize: '14px', color: '#111827' }}>{selectedDetailItem.destination || 'Theo tư vấn'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Số lượng khách / Quy mô đoàn</span>
                <strong style={{ fontSize: '14px', color: '#0f766e', fontWeight: 700 }}>{formatGuestsDisplay(selectedDetailItem)}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Thời gian gọi thuận tiện</span>
                <strong style={{ fontSize: '14px', color: '#111827' }}>{selectedDetailItem.preferredCallTime || 'Linh hoạt'}</strong>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Ngày tạo</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  {selectedDetailItem.createdAt ? new Date(selectedDetailItem.createdAt).toLocaleString('vi-VN') : '--'}
                </span>
              </div>
            </div>

            {selectedDetailItem.specialRequests && (
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Yêu Cầu & Ghi Chú Đặc Biệt:
                </span>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', whiteSpace: 'pre-wrap' }}>
                  {getCleanSpecialRequests(selectedDetailItem.specialRequests)}
                </p>
              </div>
            )}

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
