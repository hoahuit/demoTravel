import React from 'react';
import { Edit2, Trash2, Tag, Search, Plus, Calendar, CheckCircle, AlertCircle, Percent } from 'lucide-react';

interface AdminPromotionsManagerProps {
  promotionsList: any[];
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal: (section: any) => void;
  openEditModal: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
}

export default function AdminPromotionsManager({
  promotionsList,
  searchFilter,
  setSearchFilter,
  openCreateModal,
  openEditModal,
  handleDeleteItem
}: AdminPromotionsManagerProps) {
  const filtered = (promotionsList || []).filter(
    (p) =>
      String(p.code || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
      String(p.title || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  const checkExpired = (expiryDate: string): boolean => {
    if (!expiryDate) return false;
    const trimmed = expiryDate.trim();
    const now = new Date();
    const isoDate = new Date(trimmed);
    if (!isNaN(isoDate.getTime())) return isoDate < now;
    const dmy = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
    if (dmy) {
      const exp = new Date(parseInt(dmy[3], 10), parseInt(dmy[2], 10) - 1, parseInt(dmy[1], 10), 23, 59, 59);
      return exp < now;
    }
    return false;
  };

  const activeCount = (promotionsList || []).filter(p => !checkExpired(p.expiryDate)).length;
  const expiredCount = (promotionsList || []).filter(p => checkExpired(p.expiryDate)).length;
  const maxDiscount = (promotionsList || []).reduce((max, p) => Math.max(max, Number(p.discountPercent) || 0), 0);

  return (
    <div className="serene-container-inner" style={{ padding: '24px 32px' }}>
      {/* STICKY TOP BAR */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 800, color: '#006d36', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px 0' }}>
            Hệ Thống Khuyến Mãi & Tri Ân
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 700 }}>
            Quản Lý Mã Voucher & Coupon ({promotionsList?.length || 0})
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Tìm theo mã hoặc tên voucher..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '260px',
                padding: '9px 12px 9px 34px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <Search size={15} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          </div>

          <button
            onClick={() => openCreateModal('promotions')}
            style={{
              backgroundColor: '#081f13',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 6px rgba(8, 31, 19, 0.2)'
            }}
          >
            <Plus size={16} />
            <span>Thêm Mã Voucher Mới</span>
          </button>
        </div>
      </div>

      {/* 4-CARD METRICS ROW (Rule 85.5) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Tổng Mã Voucher</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#081f13' }}>{promotionsList?.length || 0}</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', marginBottom: '6px' }}>Đang Hoạt Động</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669' }}>{activeCount}</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', marginBottom: '6px' }}>Đã Hết Hạn</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#dc2626' }}>{expiredCount}</div>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '18px 22px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', marginBottom: '6px' }}>Mức Giảm Cao Nhất</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#7c3aed' }}>{maxDiscount}%</div>
        </div>
      </div>

      {/* TABLE CONTAINER & CARD (Rule 85.1) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
          {/* THEAD (Rule 85.2) */}
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                MÃ VOUCHER
              </th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CHƯƠNG TRÌNH / TIÊU ĐỀ
              </th>
              <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                % GIẢM GIÁ (TRI ÂN)
              </th>
              <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                HUY HIỆU HIỂN THỊ
              </th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                HẠN SỬ DỤNG
              </th>
              <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TRẠNG THÁI
              </th>
              <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                THAO TÁC
              </th>
            </tr>
          </thead>

          {/* TBODY (Rule 85.3) */}
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                  Chưa có mã voucher nào phù hợp. Bấm nút <strong>"+ Thêm Mã Voucher Mới"</strong> để tạo voucher đầu tiên.
                </td>
              </tr>
            ) : (
              filtered.map((promo) => {
                const isExp = checkExpired(promo.expiryDate);
                const discountVal = Number(promo.discountPercent) || 0;

                return (
                  <tr
                    key={promo.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      verticalAlign: 'middle',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Mã Voucher */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                        <Tag size={13} style={{ color: '#006d36' }} />
                        <strong style={{ fontFamily: 'monospace', fontSize: '14px', color: '#081f13', letterSpacing: '0.05em' }}>
                          {promo.code}
                        </strong>
                      </div>
                    </td>

                    {/* Tiêu đề chương trình */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{promo.title}</div>
                      {promo.subtitle && (
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{promo.subtitle}</div>
                      )}
                    </td>

                    {/* % Giảm giá */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        backgroundColor: discountVal > 0 ? '#ecfdf5' : '#f1f5f9',
                        color: discountVal > 0 ? '#065f46' : '#64748b',
                        border: `1px solid ${discountVal > 0 ? '#a7f3d0' : '#e2e8f0'}`,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '13px'
                      }}>
                        -{discountVal}%
                      </span>
                    </td>

                    {/* Huy hiệu */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#b45309',
                        border: '1px solid #fde68a',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 700
                      }}>
                        {promo.discountBadge || `GIẢM ${discountVal}%`}
                      </span>
                    </td>

                    {/* Hạn sử dụng */}
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} style={{ color: '#94a3b8' }} />
                        <span>{promo.expiryDate || 'Vô thời hạn'}</span>
                      </div>
                    </td>

                    {/* Trạng thái */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {isExp ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700 }}>
                          <AlertCircle size={11} /> Đã hết hạn
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700 }}>
                          <CheckCircle size={11} /> Hoạt động
                        </span>
                      )}
                    </td>

                    {/* THAO TÁC (Rule 85.4 - 50px x 32px) */}
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => openEditModal('promotions', promo)}
                          style={{
                            width: '50px',
                            height: '32px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb',
                            color: '#374151',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          title="Chỉnh sửa voucher"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('promotions', promo.id)}
                          style={{
                            width: '50px',
                            height: '32px',
                            border: '1px solid #fecaca',
                            backgroundColor: '#fff1f2',
                            color: '#b91c1c',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                          title="Xóa voucher"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
