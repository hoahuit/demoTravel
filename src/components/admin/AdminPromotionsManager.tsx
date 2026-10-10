import React, { useState, useEffect, useMemo } from 'react';
import {
  Edit2,
  Trash2,
  Tag,
  Search,
  Plus,
  Calendar,
  CheckCircle,
  AlertCircle,
  Percent,
  Globe,
  CheckSquare,
  Square,
  X,
  Compass,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { fetchToursApi, saveSectionItemApi } from '../../services/apiService';
import { TOURS_DATA, TourPackage } from '../../data/toursData';
import { PromotionItem } from '../../data/promotionsData';

interface AdminPromotionsManagerProps {
  promotionsList: any[];
  setPromotionsList?: React.Dispatch<React.SetStateAction<any[]>>;
  searchFilter: string;
  setSearchFilter: (val: string) => void;
  openCreateModal?: (section: any) => void;
  openEditModal?: (section: any, item: any) => void;
  handleDeleteItem: (section: any, id: string) => void;
  onReload?: () => void;
  toast?: any;
}

export const parseApplicableSlugs = (applicableTourSlugs?: string | string[]): string[] => {
  if (!applicableTourSlugs) return [];
  if (Array.isArray(applicableTourSlugs)) return applicableTourSlugs;
  const raw = String(applicableTourSlugs).trim();
  if (!raw || raw === 'all' || raw === 'ALL') return [];
  try {
    if (raw.startsWith('[') && raw.endsWith(']')) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // Fallback if not valid JSON
  }
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
};

export default function AdminPromotionsManager({
  promotionsList,
  setPromotionsList,
  searchFilter,
  setSearchFilter,
  handleDeleteItem,
  onReload,
  toast
}: AdminPromotionsManagerProps) {
  // Available tours for selective voucher application
  const [availableTours, setAvailableTours] = useState<TourPackage[]>(TOURS_DATA);
  const [toursLoading, setToursLoading] = useState<boolean>(false);

  // Dedicated Voucher Editor Modal State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState<boolean>(false);
  const [isNewVoucher, setIsNewVoucher] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [tourSearchKeyword, setTourSearchKeyword] = useState<string>('');

  const [formData, setFormData] = useState<{
    id: string | number;
    code: string;
    title: string;
    subtitle: string;
    discountPercent: number;
    discountBadge: string;
    category: string;
    expiryDate: string;
    scope: 'all' | 'specific';
    selectedTourSlugs: string[];
  }>({
    id: '',
    code: '',
    title: '',
    subtitle: '',
    discountPercent: 10,
    discountBadge: 'GIẢM 10%',
    category: 'Tri Ân',
    expiryDate: '',
    scope: 'all',
    selectedTourSlugs: []
  });

  // Fetch live tours on mount
  useEffect(() => {
    let isMounted = true;
    setToursLoading(true);
    fetchToursApi()
      .then((tours) => {
        if (isMounted && Array.isArray(tours) && tours.length > 0) {
          setAvailableTours(tours);
        }
      })
      .catch(() => {
        if (isMounted) setAvailableTours(TOURS_DATA);
      })
      .finally(() => {
        if (isMounted) setToursLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const tourSlugMap = useMemo(() => {
    const map = new Map<string, TourPackage>();
    availableTours.forEach((t) => {
      if (t.slug) map.set(t.slug, t);
      if (t.id) map.set(String(t.id), t);
    });
    return map;
  }, [availableTours]);

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

  const filtered = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    return (promotionsList || []).filter(
      (p) =>
        !q ||
        String(p.code || '').toLowerCase().includes(q) ||
        String(p.title || '').toLowerCase().includes(q) ||
        String(p.subtitle || '').toLowerCase().includes(q) ||
        String(p.category || '').toLowerCase().includes(q)
    );
  }, [promotionsList, searchFilter]);

  const activeCount = (promotionsList || []).filter((p) => !checkExpired(p.expiryDate)).length;
  const expiredCount = (promotionsList || []).filter((p) => checkExpired(p.expiryDate)).length;
  const maxDiscount = (promotionsList || []).reduce((max, p) => Math.max(max, Number(p.discountPercent) || 0), 0);

  // Open Modal for Creating
  const handleOpenCreateModal = () => {
    setIsNewVoucher(true);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 45);
    const formattedExpiry = futureDate.toISOString().split('T')[0];

    setFormData({
      id: `promo-${Date.now()}`,
      code: '',
      title: '',
      subtitle: 'Ưu đãi đặt tour đặc quyền tại 4U Retreat',
      discountPercent: 10,
      discountBadge: 'GIẢM 10%',
      category: 'Tri Ân',
      expiryDate: formattedExpiry,
      scope: 'all',
      selectedTourSlugs: []
    });
    setTourSearchKeyword('');
    setIsEditorModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEditModal = (promo: any) => {
    setIsNewVoucher(false);
    const slugs = parseApplicableSlugs(promo.applicableTourSlugs || promo.applicableToursSlugs);
    const hasSpecific = slugs.length > 0;

    setFormData({
      id: promo.id,
      code: promo.code || '',
      title: promo.title || '',
      subtitle: promo.subtitle || '',
      discountPercent: Number(promo.discountPercent) || 0,
      discountBadge: promo.discountBadge || `GIẢM ${Number(promo.discountPercent) || 0}%`,
      category: promo.category || 'Tri Ân',
      expiryDate: promo.expiryDate || '',
      scope: hasSpecific ? 'specific' : 'all',
      selectedTourSlugs: slugs
    });
    setTourSearchKeyword('');
    setIsEditorModalOpen(true);
  };

  // Toggle tour selection
  const handleToggleTourSlug = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.selectedTourSlugs.includes(slug);
      const nextSlugs = exists
        ? prev.selectedTourSlugs.filter((s) => s !== slug)
        : [...prev.selectedTourSlugs, slug];
      return { ...prev, selectedTourSlugs: nextSlugs };
    });
  };

  // Select all / Deselect all tours
  const handleSelectAllTours = () => {
    const allSlugs = availableTours.map((t) => t.slug).filter(Boolean) as string[];
    setFormData((prev) => ({ ...prev, selectedTourSlugs: allSlugs }));
  };

  const handleDeselectAllTours = () => {
    setFormData((prev) => ({ ...prev, selectedTourSlugs: [] }));
  };

  // Save handler
  const handleSaveVoucher = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCode = formData.code.trim().toUpperCase();
    if (!cleanCode) {
      alert('Vui lòng nhập Mã Voucher (Ví dụ: RETREAT10, TRIANVIP...)!');
      return;
    }
    if (!formData.title.trim()) {
      alert('Vui lòng nhập Tên chương trình ưu đãi!');
      return;
    }
    if (formData.discountPercent <= 0) {
      alert('Mức giảm giá (%) phải lớn hơn 0!');
      return;
    }

    if (formData.scope === 'specific' && formData.selectedTourSlugs.length === 0) {
      alert('Bạn đang chọn "Chỉ áp dụng cho Tour nhất định". Vui lòng chọn ít nhất 1 Tour hoặc chuyển sang tùy chọn "Áp dụng cho tất cả Tour"!');
      return;
    }

    setIsSaving(true);
    try {
      const applicableValue = formData.scope === 'all'
        ? 'all'
        : JSON.stringify(formData.selectedTourSlugs);

      const payload: any = {
        id: formData.id,
        code: cleanCode,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        discountPercent: Number(formData.discountPercent) || 0,
        discountBadge: formData.discountBadge.trim() || `GIẢM ${formData.discountPercent}%`,
        category: formData.category.trim() || 'Tri Ân',
        expiryDate: formData.expiryDate.trim(),
        applicableTourSlugs: applicableValue,
        applicableToursSlugs: formData.scope === 'all' ? [] : formData.selectedTourSlugs
      };

      await saveSectionItemApi('promotions', isNewVoucher ? 'create' : 'update', payload);

      if (setPromotionsList) {
        setPromotionsList((prev) => {
          if (isNewVoucher) {
            return [payload, ...prev];
          } else {
            return prev.map((item) => (item.id === payload.id ? payload : item));
          }
        });
      }

      if (onReload) onReload();

      if (toast) {
        toast.success(isNewVoucher ? 'Đã tạo mã Voucher mới thành công!' : 'Đã cập nhật Voucher thành công!');
      } else {
        alert(isNewVoucher ? 'Đã tạo mã Voucher mới thành công!' : 'Đã cập nhật Voucher thành công!');
      }

      setIsEditorModalOpen(false);
    } catch (err: any) {
      console.error('Lỗi khi lưu Voucher:', err);
      alert(`Thao tác lưu Voucher thất bại: ${err?.message || err}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered tours in the picker modal
  const filteredToursInPicker = useMemo(() => {
    const kw = tourSearchKeyword.toLowerCase().trim();
    if (!kw) return availableTours;
    return availableTours.filter(
      (t) =>
        t.title.toLowerCase().includes(kw) ||
        ((t.city || t.country || t.destinationMap || '').toLowerCase().includes(kw)) ||
        (t.slug && t.slug.toLowerCase().includes(kw))
    );
  }, [availableTours, tourSearchKeyword]);

  const renderScopeBadge = (promo: any) => {
    const slugs = parseApplicableSlugs(promo.applicableTourSlugs || promo.applicableToursSlugs);
    const isAll = slugs.length === 0;

    if (isAll) {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700
          }}
          title="Áp dụng cho toàn bộ các tour trong hệ thống"
        >
          <Globe size={13} style={{ color: '#059669' }} />
          Tất cả Tour
        </span>
      );
    }

    const tourTitles = slugs
      .map((s) => tourSlugMap.get(s)?.title || s)
      .join(', ');

    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: '#f5f3ff',
            color: '#6d28d9',
            border: '1px solid #ddd6fe',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700
          }}
          title={`Áp dụng riêng cho ${slugs.length} tour: ${tourTitles}`}
        >
          <CheckSquare size={13} style={{ color: '#7c3aed' }} />
          {slugs.length} Tour được chọn
        </span>
        <span
          style={{
            fontSize: '11px',
            color: '#64748b',
            marginTop: '3px',
            maxWidth: '180px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          title={tourTitles}
        >
          {tourTitles}
        </span>
      </div>
    );
  };

  return (
    <div className="serene-container-inner" style={{ padding: '24px 32px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* STICKY TOP BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
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
            onClick={handleOpenCreateModal}
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
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
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}
        >
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
                % GIẢM GIÁ
              </th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ĐIỀU KIỆN ÁP DỤNG
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
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#f1f5f9',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1'
                        }}
                      >
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
                      <span
                        style={{
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
                        }}
                      >
                        -{discountVal}%
                      </span>
                    </td>

                    {/* Điều kiện áp dụng (Core Requirement) */}
                    <td style={{ padding: '14px 16px' }}>
                      {renderScopeBadge(promo)}
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
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 700
                          }}
                        >
                          <AlertCircle size={11} /> Đã hết hạn
                        </span>
                      ) : (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#ecfdf5',
                            color: '#059669',
                            border: '1px solid #a7f3d0',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 700
                          }}
                        >
                          <CheckCircle size={11} /> Hoạt động
                        </span>
                      )}
                    </td>

                    {/* THAO TÁC (Rule 85.4 - 50px x 32px) */}
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => handleOpenEditModal(promo)}
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
                          onClick={() => handleDeleteItem('promotions', String(promo.id))}
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

      {/* DEDICATED VOUCHER EDITOR MODAL (RULE 85.6 & CORE FEATURE) */}
      {isEditorModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                backgroundColor: '#ffffff',
                zIndex: 10
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#006d36', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {isNewVoucher ? 'Tạo mới khuyến mãi' : 'Cập nhật cấu hình'}
                </span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                  {isNewVoucher ? 'Thêm Mã Voucher Mới' : `Chỉnh Sửa Voucher: ${formData.code}`}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorModalOpen(false)}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveVoucher} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* SECTION 1: THÔNG TIN CƠ BẢN VOUCHER */}
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={15} color="#059669" />
                  <span>1. Thông Tin Mã Giảm Giá</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  {/* Mã Voucher */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Mã Voucher (Code) <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: RETREAT15, TRIAN2026..."
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Tên chương trình */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Tên Chương Trình (Title) <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Ưu Đãi Tri Ân Khách Hàng VIP"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Mức giảm % */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      % Giảm Giá (Discount %) <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      step={0.5}
                      value={formData.discountPercent}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setFormData({
                          ...formData,
                          discountPercent: val,
                          discountBadge: `GIẢM ${val}%`
                        });
                      }}
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Huy hiệu hiển thị */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Huy Hiệu (Badge Tag)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: GIẢM 15%, HOT DEAL..."
                      value={formData.discountBadge}
                      onChange={(e) => setFormData({ ...formData, discountBadge: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Danh mục */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Danh Mục Voucher
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        backgroundColor: '#ffffff',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Tri Ân">Tri Ân Khách Hàng</option>
                      <option value="Mùa Hè">Mùa Hè & Lễ Hội</option>
                      <option value="Flash Sale">Flash Sale & Giờ Chót</option>
                      <option value="VIP">Đặc Quyền VIP</option>
                      <option value="Nhóm">Đoàn Thể & Nhóm Bạn</option>
                      <option value="Đặc Biệt">Khác / Đặc Biệt</option>
                    </select>
                  </div>

                  {/* Hạn sử dụng */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      Hạn Sử Dụng (YYYY-MM-DD)
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13.5px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Mô tả phụ */}
                <div style={{ marginTop: '12px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                    Mô Tả / Điều Khoản Ngắn
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Áp dụng khi đặt phòng trước 30 ngày hoặc dành cho khách hội viên."
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13.5px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* SECTION 2: ĐIỀU KIỆN ÁP DỤNG TOUR (YÊU CẦU CỐT LÕI) */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '18px 20px'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={15} color="#2563eb" />
                  <span>2. Điều Kiện Phạm Vi Áp Dụng Cho Sản Phẩm Tour</span>
                </div>

                {/* 2 Lựa chọn Scope (All vs Specific) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  {/* Option 1: Áp dụng TẤT CẢ TOUR */}
                  <div
                    onClick={() => setFormData({ ...formData, scope: 'all' })}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: formData.scope === 'all' ? '2px solid #059669' : '1px solid #cbd5e1',
                      backgroundColor: formData.scope === 'all' ? '#ecfdf5' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <input
                        type="radio"
                        id="scope-all"
                        name="voucher-scope"
                        checked={formData.scope === 'all'}
                        onChange={() => setFormData({ ...formData, scope: 'all' })}
                        style={{ accentColor: '#059669', cursor: 'pointer' }}
                      />
                      <label htmlFor="scope-all" style={{ fontWeight: 800, fontSize: '13.5px', color: '#065f46', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Globe size={15} color="#059669" />
                        Áp Dụng Cho Tất Cả Tour
                      </label>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#475569', paddingLeft: '24px', lineHeight: 1.4 }}>
                      Voucher có hiệu lực với mọi sản phẩm Tour trong hệ thống (bao gồm cả các tour tạo mới).
                    </p>
                  </div>

                  {/* Option 2: CHỈ ÁP DỤNG CHO TOUR ĐƯỢC CHỌN */}
                  <div
                    onClick={() => setFormData({ ...formData, scope: 'specific' })}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      border: formData.scope === 'specific' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                      backgroundColor: formData.scope === 'specific' ? '#f5f3ff' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <input
                        type="radio"
                        id="scope-specific"
                        name="voucher-scope"
                        checked={formData.scope === 'specific'}
                        onChange={() => setFormData({ ...formData, scope: 'specific' })}
                        style={{ accentColor: '#7c3aed', cursor: 'pointer' }}
                      />
                      <label htmlFor="scope-specific" style={{ fontWeight: 800, fontSize: '13.5px', color: '#6d28d9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckSquare size={15} color="#7c3aed" />
                        Chỉ Áp Dụng Cho Tour Nhất Định
                      </label>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#475569', paddingLeft: '24px', lineHeight: 1.4 }}>
                      Chỉ cho phép khách nhập mã giảm giá khi đặt các Tour do bạn chọn dưới đây.
                    </p>
                  </div>
                </div>

                {/* DANH SÁCH CHỌN TOUR (HIỂN THỊ KHI CHỌN SPECIFIC) */}
                {formData.scope === 'specific' && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      padding: '16px',
                      marginTop: '12px'
                    }}
                  >
                    {/* Header chọn Tour */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px',
                        marginBottom: '12px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#334155' }}>
                          Chọn các Tour áp dụng Voucher:
                        </span>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 800,
                            backgroundColor: formData.selectedTourSlugs.length > 0 ? '#ede9fe' : '#f1f5f9',
                            color: formData.selectedTourSlugs.length > 0 ? '#6d28d9' : '#64748b',
                            padding: '2px 8px',
                            borderRadius: '999px'
                          }}
                        >
                          Đã chọn {formData.selectedTourSlugs.length} / {availableTours.length} Tour
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={handleSelectAllTours}
                          style={{
                            border: '1px solid #cbd5e1',
                            backgroundColor: '#f8fafc',
                            color: '#334155',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Chọn tất cả ({availableTours.length})
                        </button>
                        <button
                          type="button"
                          onClick={handleDeselectAllTours}
                          style={{
                            border: '1px solid #cbd5e1',
                            backgroundColor: '#f8fafc',
                            color: '#dc2626',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Bỏ chọn tất cả
                        </button>
                      </div>
                    </div>

                    {/* Ô tìm kiếm Tour */}
                    <div style={{ position: 'relative', marginBottom: '12px' }}>
                      <input
                        type="text"
                        placeholder="Tìm kiếm tour theo tên hoặc địa điểm..."
                        value={tourSearchKeyword}
                        onChange={(e) => setTourSearchKeyword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px 8px 32px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          fontSize: '12.5px',
                          boxSizing: 'border-box'
                        }}
                      />
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    </div>

                    {/* Danh sách Tour dạng scrollable cards */}
                    <div
                      style={{
                        maxHeight: '280px',
                        overflowY: 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '8px',
                        paddingRight: '4px'
                      }}
                    >
                      {filteredToursInPicker.map((tour) => {
                        const isSelected = formData.selectedTourSlugs.includes(tour.slug || '');

                        return (
                          <div
                            key={tour.slug || tour.id}
                            onClick={() => handleToggleTourSlug(tour.slug || '')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border: isSelected ? '1.5px solid #7c3aed' : '1px solid #e2e8f0',
                              backgroundColor: isSelected ? '#faf5ff' : '#ffffff',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // Handled by div onClick
                              style={{ accentColor: '#7c3aed', cursor: 'pointer', width: '16px', height: '16px' }}
                            />

                            <img
                              src={tour.heroImage || (tour.gallery && tour.gallery[0]) || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200'}
                              alt={tour.title}
                              style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                            />

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: '12.5px',
                                  fontWeight: 700,
                                  color: isSelected ? '#581c87' : '#1e293b',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {tour.title}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', gap: '6px', marginTop: '2px' }}>
                                <span>{tour.duration || 'Theo lịch trình'}</span>
                                {(tour.city || tour.country) && <span>• {tour.city || tour.country}</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  paddingTop: '12px',
                  borderTop: '1px solid #e2e8f0'
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  disabled={isSaving}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#006d36',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: isSaving ? 'wait' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 6px rgba(0, 109, 54, 0.25)'
                  }}
                >
                  {isSaving ? 'Đang lưu...' : isNewVoucher ? 'Tạo Mã Voucher' : 'Cập Nhật Voucher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
