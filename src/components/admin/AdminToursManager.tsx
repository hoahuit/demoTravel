import React, { useMemo, useState, useEffect, useRef } from 'react';
import { TOURS_DATA, TourPackage, TourItineraryDay } from '../../data/toursData';
import {
  saveTourApi,
  createTourApi,
  fetchToursApi,
  deleteTourApi,
  getImageUrl,
  uploadImageApi,
  fetchMenuCategoriesApi,
  MenuCategoryItem
} from '../../services/apiService';
import ProductDetail from '../ProductDetail';
import EmptyState from '../ui/EmptyState';

interface AdminToursManagerProps {
  onNavigate?: (path: string) => void;
  toast: any;
}

const findTourBySlug = (slug: string) => {
  return TOURS_DATA.find((tour) => tour.slug === slug) || null;
};

const buildDraft = (tour: TourPackage | null): TourPackage | null => {
  if (!tour) return null;

  return {
    ...tour,
    categories: Array.isArray(tour.categories)
      ? [...tour.categories]
      : tour.category
        ? [tour.category.toLowerCase()]
        : [],
    highlights: tour.highlights ? [...tour.highlights] : [],
    itinerary: tour.itinerary
      ? tour.itinerary.map((day) => ({
        ...day,
        activities: day.activities ? [...day.activities] : [],
      }))
      : [],
    departureDates: tour.departureDates ? [...tour.departureDates] : [],
    gallery: tour.gallery ? [...tour.gallery] : [],
    included: tour.included ? [...tour.included] : [],
    excluded: tour.excluded ? [...tour.excluded] : [],
    notes: tour.notes ? [...tour.notes] : [],
    travelTips: tour.travelTips ? [...tour.travelTips] : [],
  };
};

interface DynamicTourCategoryPickerProps {
  categories: MenuCategoryItem[];
  selectedSlugs: string[];
  onChange: (slugs: string[]) => void;
}

function DynamicTourCategoryPicker({ categories, selectedSlugs, onChange }: DynamicTourCategoryPickerProps) {
  const fixedTop = categories.filter((category) => category.menuType === 'fixed_top');
  const parents = categories.filter((category) => category.menuType !== 'fixed_top' && !category.parentSlug);
  const parentSlugs = new Set(parents.map((parent) => parent.slug));
  const orphanChildren = categories.filter((category) => category.parentSlug && !parentSlugs.has(category.parentSlug));

  const groups = [
    ...(fixedTop.length > 0 ? [{ id: 'fixed-top', title: '⭐ Menu Cố Định Hàng Trên', color: '#e5a50a', items: fixedTop }] : []),
    ...parents.map((parent) => {
      const children = categories.filter((category) => category.parentSlug === parent.slug);
      return {
        id: parent.slug,
        title: `✦ ${parent.name}`,
        color: parent.color || '#059669',
        // A parent without children can still be assigned to a tour.
        items: children.length > 0 ? children : [parent]
      };
    }),
    ...(orphanChildren.length > 0 ? [{ id: 'orphaned', title: 'Danh Mục Chưa Có Menu Cha', color: '#64748b', items: orphanChildren }] : [])
  ];

  const toggle = (slug: string) => {
    onChange(selectedSlugs.includes(slug)
      ? selectedSlugs.filter((item) => item !== slug)
      : [...selectedSlugs, slug]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', backgroundColor: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #eef2ef' }}>
      {groups.map((group) => (
        <div key={group.id}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: group.color, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
            {group.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {group.items.map((category) => {
              const isChecked = selectedSlugs.includes(category.slug);
              return (
                <label key={category.slug} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: isChecked ? '#081f13' : '#475569', fontWeight: isChecked ? 700 : 500, cursor: 'pointer', padding: '4px 6px', borderRadius: '6px', backgroundColor: isChecked ? '#f0fdf4' : 'transparent' }}>
                  <input type="checkbox" checked={isChecked} onChange={() => toggle(category.slug)} style={{ accentColor: group.color, cursor: 'pointer' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: category.color || group.color }} />
                  <span>{category.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminToursManager({ onNavigate, toast }: AdminToursManagerProps) {
  const [toursList, setToursList] = useState<TourPackage[]>([]);
  const [availableCategories, setAvailableCategories] = useState<MenuCategoryItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [tourDraft, setTourDraft] = useState<TourPackage | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('basic-info');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const coverFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadLiveToursAndCategories = async () => {
      try {
        const [liveData, catsData] = await Promise.all([
          fetchToursApi(),
          fetchMenuCategoriesApi()
        ]);
        if (Array.isArray(liveData) && liveData.length > 0) {
          setToursList(liveData);
        } else {
          setToursList(TOURS_DATA);
        }
        if (Array.isArray(catsData) && catsData.length > 0) {
          setAvailableCategories(catsData);
        }
      } catch (err) {
        console.warn('[TOURS API LOAD WARNING]', err);
        setToursList(TOURS_DATA);
      }
    };
    loadLiveToursAndCategories();
  }, []);

  const filteredTours = useMemo(() => {
    return toursList.filter((tour) => {
      const matchSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (categoryFilter === 'Exclusive') return tour.isExclusive === true;
      if (categoryFilter === 'Featured') return tour.isFeatured === true && !tour.isExclusive;
      if (categoryFilter === 'Hot') return tour.isHot === true && !tour.isExclusive;
      if (categoryFilter === 'Deals') return (tour.originalPrice || 0) > (tour.price || 0) && !tour.isExclusive;

      return true;
    });
  }, [toursList, searchQuery, categoryFilter]);

  const handleOpenEditor = (slug: string) => {
    const found = toursList.find((t) => t.slug === slug) || findTourBySlug(slug);
    if (found) {
      setSelectedSlug(slug);
      setTourDraft(buildDraft(found));
      setIsCreatingNew(false);
      setActiveSection('basic-info');
    }
  };

  const handleCreateNewTour = () => {
    const timestamp = Date.now();
    const newTour: TourPackage = {
      id: String(timestamp),
      slug: `tour-${timestamp}`,
      title: '',
      subtitle: '',
      category: 'Healing',
      categories: ['chua-lanh', 'doc-quyen'],
      country: 'Vietnam',
      city: '',
      duration: '',
      durationDays: 1,
      departureDates: [],
      airline: '',
      hotel: '',
      transportation: '',
      price: 0,
      originalPrice: 0,
      rating: 5,
      reviewsCount: 0,
      isHot: false,
      isFeatured: false,
      isExclusive: true,
      highlights: [],
      itinerary: [],
      included: [],
      excluded: [],
      notes: [],
      heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
      gallery: [],
      destinationMap: '',
      travelTips: [],
      faq: [],
      reviews: []
    };

    setSelectedSlug(newTour.slug);
    setTourDraft(newTour);
    setIsCreatingNew(true);
    setActiveSection('basic-info');
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    setTourDraft(null);
    setIsCreatingNew(false);
  };

  const handleSave = async () => {
    if (!tourDraft) return;

    try {
      if (isCreatingNew) {
        await createTourApi(tourDraft);
        setToursList((prev) => [tourDraft, ...prev]);
        toast.success(`Đã tạo mới tour "${tourDraft.title}" thành công!`);
      } else {
        await saveTourApi(tourDraft.slug, tourDraft);
        setToursList((prev) => prev.map((t) => (t.slug === tourDraft.slug ? tourDraft : t)));
        toast.success(`Đã lưu thay đổi tour "${tourDraft.title}"!`);
      }
      setIsCreatingNew(false);
    } catch (err: any) {
      toast.error(`Lỗi khi lưu tour: ${err?.message || err}`);
    }
  };

  const handleDeleteTour = async (tour: TourPackage) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tour "${tour.title}" không?`)) return;

    try {
      await deleteTourApi(tour.id || tour.slug);
      setToursList((prev) => prev.filter((t) => t.slug !== tour.slug));
      if (selectedSlug === tour.slug) handleBackToList();
      toast.success(`Đã xóa tour thành công!`);
    } catch (err: any) {
      toast.error(`Lỗi khi xóa tour: ${err?.message || err}`);
    }
  };

  const handleToggleApproval = async (tour: TourPackage) => {
    const currentApproved = tour.isAdminApproved !== false && (tour as any).isAdminAprove !== false;
    const newApprovedState = !currentApproved;

    try {
      const updatedTour = {
        ...tour,
        isAdminApproved: newApprovedState,
        isAdminAprove: newApprovedState,
      };

      await saveTourApi(tour.id || tour.slug, updatedTour);
      setToursList((prev) =>
        prev.map((t) => (t.slug === tour.slug ? { ...t, isAdminApproved: newApprovedState, isAdminAprove: newApprovedState } : t))
      );

      toast.success(
        newApprovedState
          ? `Đã duyệt hiển thị tour "${tour.title}" lên hệ thống!`
          : `Đã tạm ẩn / hủy duyệt hiển thị tour "${tour.title}"!`
      );
    } catch (err: any) {
      toast.error(`Cập nhật duyệt tour thất bại: ${err?.message || err}`);
    }
  };

  const handleCancel = () => {
    if (selectedSlug && !isCreatingNew) {
      const original = toursList.find((t) => t.slug === selectedSlug) || findTourBySlug(selectedSlug);
      if (original) setTourDraft(buildDraft(original));
      toast.info('Đã hoàn tác các thay đổi.');
    } else {
      handleBackToList();
    }
  };

  const handleUploadHeroCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !tourDraft) return;

    try {
      toast.info('Đang tải ảnh bìa mới...');
      const res = await uploadImageApi(file);
      const uploadedUrl = typeof res === 'string' ? res : (res?.url || res?.fileUrl || '');
      setTourDraft({ ...tourDraft, heroImage: uploadedUrl });
      toast.success('Tải ảnh bìa thành công!');
    } catch (err: any) {
      toast.error(`Lỗi tải ảnh: ${err?.message || err}`);
    }
  };

  const handleUploadGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !tourDraft) return;

    try {
      toast.info('Đang tải ảnh bộ sưu tập...');
      const res = await uploadImageApi(file);
      const uploadedUrl = typeof res === 'string' ? res : (res?.url || res?.fileUrl || '');
      setTourDraft({ ...tourDraft, gallery: [...(tourDraft.gallery || []), uploadedUrl] });
      toast.success('Đã thêm ảnh vào bộ sưu tập!');
    } catch (err: any) {
      toast.error(`Lỗi tải ảnh: ${err?.message || err}`);
    }
  };

  const handleSwitchTab = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: '#191c1b' }}>
      {/* ── CATALOG LIST VIEW ── */}
      {!selectedSlug && (
        <>
          {/* Header Title & Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px 0' }}>
                Serene Operator Console
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
                Danh Sách Gói Tour Retreat ({filteredTours.length})
              </h1>
            </div>
            <button
              onClick={handleCreateNewTour}
              style={{
                backgroundColor: '#081f13',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 22px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              + Tạo Tour Mới
            </button>
          </div>

          {/* Search & Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <input
                type="text"
                placeholder="Tìm tour theo tên, địa danh, loại hình..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(8, 31, 19, 0.12)',
                  backgroundColor: '#f3f4f1',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'All', label: 'Tất cả Packages' },
                { id: 'Exclusive', label: '1. Retreats Độc Quyền' },
                { id: 'Featured', label: '2. Sắp Khởi Hành' },
                { id: 'Hot', label: '3. Không Thể Bỏ Lỡ' },
                { id: 'Deals', label: '4. Ưu Đãi Giờ Chót' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '7px 16px',
                    borderRadius: '999px',
                    border: '1px solid rgba(8, 31, 19, 0.1)',
                    cursor: 'pointer',
                    backgroundColor: categoryFilter === cat.id ? '#081f13' : '#ffffff',
                    color: categoryFilter === cat.id ? '#ffffff' : '#4d6453',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Bento Overview Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Retreats Độc Quyền</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#059669', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.isExclusive).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Sắp Khởi Hành</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#2563eb', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.isFeatured && !t.isExclusive).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Không Thể Bỏ Lỡ</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => t.isHot && !t.isExclusive).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Ưu Đãi Giờ Chót</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#d97706', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(t => (t.originalPrice || 0) > (t.price || 0) && !t.isExclusive).length}</p>
            </div>
          </div>

          {/* Empty state if zero search results */}
          {filteredTours.length === 0 && (
            <EmptyState
              title="Chưa có tour retreat nào"
              description="Không tìm thấy gói tour nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn."
              actionLabel="+ Tạo Tour Mới"
              onAction={handleCreateNewTour}
              transparent={true}
            />
          )}

          {/* Catalog Grid View Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredTours.map((tour) => (
              <div
                key={tour.slug}
                onClick={() => handleOpenEditor(tour.slug)}
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid rgba(8, 31, 19, 0.06)',
                  boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={getImageUrl(tour.heroImage)}
                    alt={tour.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tour.isExclusive && (
                      <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#081f13', color: '#ffffff', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        ĐỘC QUYỀN
                      </span>
                    )}
                    {tour.isHot && (
                      <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        HOT
                      </span>
                    )}
                    {tour.isFeatured && (
                      <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        SẮP KHỞI HÀNH
                      </span>
                    )}
                    {tour.isCustomer && (
                      <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        👤 KHÁCH TẠO
                      </span>
                    )}
                    {tour.isAdminApproved === false || (tour as any).isAdminAprove === false ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleApproval(tour);
                        }}
                        style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '999px', border: '1px solid #fca5a5', cursor: 'pointer' }}
                      >
                        ⏳ CHỜ DUYỆT (CLICK DUYỆT)
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleApproval(tour);
                        }}
                        style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '999px', border: '1px solid #86efac', cursor: 'pointer' }}
                      >
                        ✓ ĐÃ DUYỆT HIỂN THỊ
                      </button>
                    )}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>{tour.city} • {tour.category}</span>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#081f13', margin: '4px 0 6px 0', fontWeight: 600 }}>{tour.title}</h3>
                    <p style={{ fontSize: '13px', color: '#525a54', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{tour.subtitle}</p>
                  </div>

                  <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid rgba(8,31,19,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#525a54', display: 'block' }}>Giá từ</span>
                      <strong style={{ fontSize: '16px', color: '#081f13', fontFamily: 'monospace' }}>{(tour.price || 0).toLocaleString('vi-VN')} ₫</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenEditor(tour.slug); }}
                        style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteTour(tour); }}
                        style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── TOUR DETAIL EDITOR FORM ── */}
      {selectedSlug && tourDraft && (
        <>
          {/* Top Sticky Header Bar (Serene Operator Glassmorphism Style) */}
          <div style={{
            position: 'sticky',
            top: '64px',
            zIndex: 90,
            backgroundColor: 'rgba(249, 250, 247, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(8, 31, 19, 0.08)',
            padding: '12px 24px',
            margin: '-28px -28px 24px -28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)'
          }}>
            {/* Left side: Back Icon Button & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                title="Quay lại danh sách"
                onClick={handleBackToList}
                style={{
                  border: '1px solid rgba(8, 31, 19, 0.15)',
                  backgroundColor: '#ffffff',
                  color: '#081f13',
                  borderRadius: '10px',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', margin: 0, color: '#081f13', fontWeight: 600 }}>
                  {isCreatingNew ? 'Tạo Tour Retreat Mới' : 'Chỉnh Sửa Chi Tiết Tour'}
                </h2>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: isCreatingNew ? '#dcfce7' : '#e0f2fe',
                  color: isCreatingNew ? '#15803d' : '#0369a1',
                  border: isCreatingNew ? '1px solid #bbf7d0' : '1px solid #bae6fd'
                }}>
                  {isCreatingNew ? '✨ Chế độ tạo mới' : '🟢 Chế độ chỉnh sửa'}
                </span>
              </div>
            </div>

            {/* Right side: Action Icon Buttons pushed to far right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
              {!isCreatingNew && (
                <button
                  type="button"
                  title="Xóa Tour"
                  onClick={() => handleDeleteTour(tourDraft!)}
                  style={{
                    backgroundColor: '#fff1f2',
                    color: '#e11d48',
                    border: '1px solid #fecdd3',
                    borderRadius: '10px',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              )}

              <button
                type="button"
                title="Hủy Bỏ / Hoàn Tác"
                onClick={handleCancel}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  border: '1px solid rgba(8, 31, 19, 0.12)',
                  borderRadius: '10px',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>

              <button
                type="button"
                title="Lưu Thay Đổi"
                onClick={handleSave}
                style={{
                  backgroundColor: isCreatingNew ? '#059669' : '#081f13',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  height: '38px',
                  padding: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isCreatingNew ? '0 4px 14px rgba(5, 150, 105, 0.25)' : '0 4px 14px rgba(8, 31, 19, 0.2)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Lưu Thay Đổi</span>
              </button>
            </div>
          </div>

          {/* Sleek Segmented Tab Bar (Serene Operator Style) */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              backgroundColor: '#edeeeb',
              padding: '4px',
              borderRadius: '14px',
              gap: '3px'
            }}>
              {[
                { id: 'basic-info', label: 'Thông Tin Cơ Bản' },
                { id: 'pricing-status', label: 'Giá Bán & Phân Phối' },
                { id: 'highlights', label: 'Điểm Nổi Bật' },
                { id: 'itinerary', label: 'Lịch Trình Chi Tiết' },
                { id: 'gallery', label: 'Bộ Sưu Tập Ảnh' },
                { id: 'live-preview', label: 'Xem Trực Tiếp Detail' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleSwitchTab(tab.id)}
                  style={{
                    border: 'none',
                    backgroundColor: activeSection === tab.id ? '#ffffff' : 'transparent',
                    color: activeSection === tab.id ? '#081f13' : '#4d6453',
                    borderRadius: '10px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: activeSection === tab.id ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: activeSection === tab.id ? '0 2px 8px rgba(8,31,19,0.08)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: BASIC INFORMATION */}
          {activeSection === 'basic-info' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Hero Banner Cover Upload Card */}
              <div style={{
                position: 'relative',
                height: '240px',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#081f13',
                boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.1)'
              }}>
                <img
                  src={getImageUrl(tourDraft.heroImage)}
                  alt={tourDraft.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8,31,19,0.9), transparent 60%)',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      {tourDraft.category} • {tourDraft.city}
                    </span>
                    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', color: '#ffffff', margin: '4px 0 0 0', fontWeight: 600 }}>
                      {tourDraft.title}
                    </h1>
                  </div>

                  <input
                    ref={coverFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadHeroCover}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => coverFileRef.current?.click()}
                    style={{
                      backgroundColor: 'rgba(8, 31, 19, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '10px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Tải Ảnh Bìa Mới (JPG/PNG)
                  </button>
                </div>
              </div>

              {/* Form Input Squircle Card */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: '0 0 20px 0', fontWeight: 600 }}>
                  Thông Tin Chi Tiết Tour
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Tên Tour Retreat</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Hành Trình Tĩnh Tại & Phục Hồi Thân Tâm 3N2Đ"
                      value={tourDraft.title || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, title: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Subtitle / Tagline Mới</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Phục hồi Thân - Tâm - Trí giữa đại ngàn nguyên sơ bạt ngàn..."
                      value={tourDraft.subtitle || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, subtitle: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1', backgroundColor: '#fcfdfc', padding: '16px', borderRadius: '12px', border: '1px solid rgba(8, 31, 19, 0.12)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#081f13', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Danh Mục Tour Tham Gia (Categories)</span>
                        <span style={{ fontSize: '11px', color: '#059669', backgroundColor: '#e6f4ea', padding: '2px 8px', borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}>
                          {(tourDraft.categories || []).length} danh mục đã chọn
                        </span>
                      </label>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        💡 1 Tour có thể xuất hiện tại nhiều Menu / Danh Mục cùng lúc
                      </span>
                    </div>

                    {/* Selected Tags Preview */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px', minHeight: '28px' }}>
                      {(tourDraft.categories || []).length === 0 ? (
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                          Chưa chọn danh mục nào (hãy tick chọn bên dưới)
                        </span>
                      ) : (
                        (tourDraft.categories || []).map((catSlug) => {
                          const foundCat = availableCategories.find((c) => c.slug === catSlug);
                          const name = foundCat ? foundCat.name : catSlug;
                          const color = foundCat?.color || '#059669';
                          return (
                            <span
                              key={catSlug}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#ffffff',
                                border: `1px solid ${color}40`,
                                color: '#081f13',
                                fontSize: '12px',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '20px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                              }}
                            >
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                              {name}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = (tourDraft.categories || []).filter((s) => s !== catSlug);
                                  setTourDraft({
                                    ...tourDraft,
                                    categories: updated,
                                    category: updated[0] || tourDraft.category || 'Healing'
                                  });
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#94a3b8',
                                  cursor: 'pointer',
                                  fontSize: '14px',
                                  fontWeight: 800,
                                  lineHeight: 1,
                                  padding: 0,
                                  marginLeft: '2px'
                                }}
                              >
                                ×
                              </button>
                            </span>
                          );
                        })
                      )}
                    </div>

                    {/* Grouped Checkboxes */}
                    {availableCategories.length > 0 ? (
                      <DynamicTourCategoryPicker
                        categories={availableCategories}
                        selectedSlugs={tourDraft.categories || []}
                        onChange={(categories) => setTourDraft({
                          ...tourDraft,
                          categories,
                          category: categories[0] || tourDraft.category || 'Healing'
                        })}
                      />
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', backgroundColor: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #eef2ef' }}>
                        {/* Fixed Top Badges Group */}
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#e5a50a', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                            ⭐ Menu Cố Định Hàng Trên
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {(availableCategories.filter((c) => c.menuType === 'fixed_top').length > 0
                              ? availableCategories.filter((c) => c.menuType === 'fixed_top')
                              : [
                                { name: 'Retreats ĐỘC QUYỀN', slug: 'doc-quyen', color: '#facc15' },
                                { name: 'Sắp Khởi hành', slug: 'sap-khoi-hanh', color: '#38bdf8' },
                                { name: 'KHÔNG THỂ BỎ LỠ', slug: 'khong-the-bo-lo', color: '#f97316' },
                                { name: 'Ưu đãi GIỜ CHÓT', slug: 'uu-dai-gio-chot', color: '#4ade80' },
                              ]
                            ).map((cat) => {
                              const isChecked = (tourDraft.categories || []).includes(cat.slug);
                              return (
                                <label
                                  key={cat.slug}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '13px',
                                    color: isChecked ? '#081f13' : '#475569',
                                    fontWeight: isChecked ? 700 : 500,
                                    cursor: 'pointer',
                                    padding: '4px 6px',
                                    borderRadius: '6px',
                                    backgroundColor: isChecked ? '#fefce8' : 'transparent',
                                    transition: 'background 0.15s ease'
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const current = tourDraft.categories || [];
                                      const next = e.target.checked
                                        ? [...current, cat.slug]
                                        : current.filter((s) => s !== cat.slug);
                                      setTourDraft({
                                        ...tourDraft,
                                        categories: next,
                                        category: next[0] || tourDraft.category || 'Healing'
                                      });
                                    }}
                                    style={{ accentColor: '#081f13', cursor: 'pointer' }}
                                  />
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cat.color || '#e5a50a' }} />
                                  <span>{cat.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Series Retreat & Subcategories Group */}
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                            🌿 Danh Mục Series Retreat
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {(availableCategories.filter((c) => c.parentSlug === 'series-retreat' || ['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(c.slug)).length > 0
                              ? availableCategories.filter((c) => c.parentSlug === 'series-retreat' || ['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(c.slug))
                              : [
                                { name: 'Retreat Chữa lành', slug: 'chua-lanh', color: '#4ade80' },
                                { name: 'Retreat Bảo tồn', slug: 'bao-ton', color: '#38bdf8' },
                                { name: 'Retreat Thiên nhiên', slug: 'thien-nhien', color: '#facc15' },
                                { name: 'Retreat Thiện nguyện', slug: 'thien-nguyen', color: '#f472b6' },
                              ]
                            ).map((cat) => {
                              const isChecked = (tourDraft.categories || []).includes(cat.slug);
                              return (
                                <label
                                  key={cat.slug}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '13px',
                                    color: isChecked ? '#081f13' : '#475569',
                                    fontWeight: isChecked ? 700 : 500,
                                    cursor: 'pointer',
                                    padding: '4px 6px',
                                    borderRadius: '6px',
                                    backgroundColor: isChecked ? '#f0fdf4' : 'transparent',
                                    transition: 'background 0.15s ease'
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const current = tourDraft.categories || [];
                                      const next = e.target.checked
                                        ? [...current, cat.slug]
                                        : current.filter((s) => s !== cat.slug);
                                      setTourDraft({
                                        ...tourDraft,
                                        categories: next,
                                        category: next[0] || tourDraft.category || 'Healing'
                                      });
                                    }}
                                    style={{ accentColor: '#059669', cursor: 'pointer' }}
                                  />
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cat.color || '#059669' }} />
                                  <span>{cat.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Other Mega Menus Group */}
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
                            ✨ Menu Chủ Đề Khác
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {(availableCategories.filter((c) => c.menuType !== 'fixed_top' && c.parentSlug !== 'series-retreat' && !['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(c.slug)).length > 0
                              ? availableCategories.filter((c) => c.menuType !== 'fixed_top' && c.parentSlug !== 'series-retreat' && !['chua-lanh', 'bao-ton', 'thien-nhien', 'thien-nguyen'].includes(c.slug))
                              : [
                                { name: 'Retreat HOT', slug: 'retreat-hot', color: '#f97316' },
                                { name: 'Kollection 4U', slug: 'kollection-4u', color: '#facc15' },
                                { name: '101 Điều HAY', slug: 'dieu-hay', color: '#38bdf8' },
                                { name: 'Vì sao chọn 4U?', slug: 'vi-sao-chon-4u', color: '#e5c158' },
                              ]
                            ).map((cat) => {
                              const isChecked = (tourDraft.categories || []).includes(cat.slug);
                              return (
                                <label
                                  key={cat.slug}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '13px',
                                    color: isChecked ? '#081f13' : '#475569',
                                    fontWeight: isChecked ? 700 : 500,
                                    cursor: 'pointer',
                                    padding: '4px 6px',
                                    borderRadius: '6px',
                                    backgroundColor: isChecked ? '#f0f9ff' : 'transparent',
                                    transition: 'background 0.15s ease'
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const current = tourDraft.categories || [];
                                      const next = e.target.checked
                                        ? [...current, cat.slug]
                                        : current.filter((s) => s !== cat.slug);
                                      setTourDraft({
                                        ...tourDraft,
                                        categories: next,
                                        category: next[0] || tourDraft.category || 'Healing'
                                      });
                                    }}
                                    style={{ accentColor: '#0369a1', cursor: 'pointer' }}
                                  />
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cat.color || '#0369a1' }} />
                                  <span>{cat.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Quốc Gia (Country)</label>
                    <select
                      value={tourDraft.country || 'Vietnam'}
                      onChange={(e) => setTourDraft({ ...tourDraft, country: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', backgroundColor: '#ffffff', outline: 'none' }}
                    >
                      <option value="Vietnam">Việt Nam (Vietnam)</option>
                      <option value="Thailand">Thái Lan (Thailand)</option>
                      <option value="Japan">Nhật Bản (Japan)</option>
                      <option value="Indonesia">Indonesia (Bali)</option>
                      <option value="Switzerland">Thụy Sĩ (Switzerland)</option>
                      <option value="India">Ấn Độ (India)</option>
                      <option value="Nepal">Nepal</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Thành Phố / Điểm Đến (City)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select
                        value={['Đà Lạt', 'Thanh Hóa', 'Sa Pa', 'Phú Quốc', 'Ninh Bình', 'Huế', 'Hội An', 'Yên Tử', 'Côn Đảo', 'Hà Giang', 'Chiang Mai', 'Ubud'].includes(tourDraft.city || '') ? tourDraft.city : 'custom'}
                        onChange={(e) => {
                          if (e.target.value !== 'custom') {
                            setTourDraft({ ...tourDraft, city: e.target.value });
                          }
                        }}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', backgroundColor: '#ffffff', outline: 'none' }}
                      >
                        <option value="Đà Lạt">Đà Lạt (Lâm Đồng)</option>
                        <option value="Thanh Hóa">Thanh Hóa (Pù Luông)</option>
                        <option value="Sa Pa">Sa Pa (Lào Cai)</option>
                        <option value="Phú Quốc">Phú Quốc (Kiên Giang)</option>
                        <option value="Ninh Bình">Ninh Bình (Tràng An)</option>
                        <option value="Huế">Huế (Cố Đô)</option>
                        <option value="Hội An">Hội An (Quảng Nam)</option>
                        <option value="Yên Tử">Yên Tử (Quảng Ninh)</option>
                        <option value="Côn Đảo">Côn Đảo (Bà Rịa - Vũng Tàu)</option>
                        <option value="Hà Giang">Hà Giang</option>
                        <option value="Chiang Mai">Chiang Mai (Thái Lan)</option>
                        <option value="Ubud">Ubud (Bali, Indonesia)</option>
                        <option value="custom">-- Nhập địa danh khác --</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Nhập địa danh khác..."
                        value={tourDraft.city || ''}
                        onChange={(e) => setTourDraft({ ...tourDraft, city: e.target.value })}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {/* INTERACTIVE MAP PICKER COMPONENT */}
                  <div style={{ gridColumn: 'span 2', backgroundColor: '#f9faf7', padding: '20px', borderRadius: '16px', border: '1px solid rgba(8, 31, 19, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 700, color: '#081f13', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                        📍 Vị Trí Bản Đồ Tương Tác (Destination Map Picker)
                      </label>
                      <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>🗺️ Live Google Maps Preview</span>
                    </div>

                    {/* Quick Presets */}
                    <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#525a54', alignSelf: 'center' }}>Ghim nhanh:</span>
                      {[
                        { name: '📍 Hồ Tuyền Lâm Đà Lạt', loc: 'Hồ Tuyền Lâm Đà Lạt' },
                        { name: '📍 Pù Luông Thanh Hóa', loc: 'Pù Luông Thanh Hóa' },
                        { name: '📍 Thung Lũng Sa Pa', loc: 'Thung lũng Sa Pa Lào Cai' },
                        { name: '📍 Bãi Dài Phú Quốc', loc: 'Bãi Dài Phú Quốc Kiên Giang' },
                        { name: '📍 Tràng An Ninh Bình', loc: 'Tràng An Ninh Bình' },
                        { name: '📍 Yên Tử Quảng Ninh', loc: 'Núi Yên Tử Quảng Ninh' },
                        { name: '📍 Chiang Mai Thái Lan', loc: 'Chiang Mai Thailand' },
                        { name: '📍 Ubud Bali', loc: 'Ubud Bali Indonesia' },
                      ].map((preset) => (
                        <button
                          key={preset.loc}
                          type="button"
                          onClick={() => {
                            const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(preset.loc)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
                            setTourDraft({ ...tourDraft, destinationMap: mapUrl });
                          }}
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: '999px',
                            backgroundColor: '#ffffff',
                            color: '#081f13',
                            border: '1px solid rgba(8,31,19,0.15)',
                            cursor: 'pointer'
                          }}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>

                    {/* Search & Custom Address Input */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                      <input
                        type="text"
                        placeholder="Nhập tên resort, địa chỉ hoặc tọa độ vị trí (Ví dụ: Edensee Resort Đà Lạt)..."
                        value={tourDraft.destinationMap || ''}
                        onChange={(e) => setTourDraft({ ...tourDraft, destinationMap: e.target.value })}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', backgroundColor: '#ffffff' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const query = tourDraft.destinationMap || tourDraft.city || 'Đà Lạt';
                          if (!query.startsWith('http')) {
                            const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
                            setTourDraft({ ...tourDraft, destinationMap: mapUrl });
                          }
                        }}
                        style={{
                          backgroundColor: '#081f13',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '0 18px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        🔍 Ghim Lên Bản Đồ
                      </button>
                    </div>

                    {/* Live Interactive Map Iframe Preview */}
                    <div style={{ width: '100%', height: '240px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(8, 31, 19, 0.12)', backgroundColor: '#e2e8f0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                      <iframe
                        title="Destination Map Live Preview"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={
                          tourDraft.destinationMap && tourDraft.destinationMap.startsWith('http')
                            ? tourDraft.destinationMap
                            : `https://maps.google.com/maps?q=${encodeURIComponent(tourDraft.destinationMap || tourDraft.city || 'Đà Lạt')}&t=&z=13&ie=UTF8&iwloc=&output=embed`
                        }
                      ></iframe>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Thời Lượng (Ví dụ: 3 Ngày 2 Đêm)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 3 Ngày 2 Đêm"
                      value={tourDraft.duration || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, duration: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Lịch Khởi Hành (Ví dụ: Hằng tuần)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Hằng tuần, Thứ 6 Hằng Tuần, Ngày 15 Mỗi Tháng"
                      value={tourDraft.departureDates ? tourDraft.departureDates.join(', ') : 'Hằng tuần'}
                      onChange={(e) => setTourDraft({ ...tourDraft, departureDates: e.target.value.split(',').map(s => s.trim()) })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Khách Sạn / Resort</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Edensee Lake Resort & Spa 5 Sao"
                      value={tourDraft.hotel || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, hotel: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Phương Tiện Di Chuyển</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Xe Limousine VIP 4U 9 chỗ cao cấp"
                      value={tourDraft.transportation || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, transportation: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Hãng Hàng Không</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Vietnam Airlines / Bamboo Airways"
                      value={tourDraft.airline || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, airline: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                    />
                  </div>

                  {/* Dynamic Included List Editor */}
                  <div style={{ gridColumn: 'span 2', backgroundColor: '#f9faf7', padding: '16px', borderRadius: '16px', border: '1px solid rgba(8, 31, 19, 0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>
                        Dịch Vụ Bao Gồm Nổi Bật ({tourDraft.included?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(tourDraft.included || []), ''];
                          setTourDraft({ ...tourDraft, included: updated });
                        }}
                        style={{
                          backgroundColor: '#081f13',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        + Thêm Dịch Vụ Bao Gồm
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(tourDraft.included || []).map((incItem, incIdx) => (
                        <div key={incIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', minWidth: '24px' }}>#{incIdx + 1}</span>
                          <input
                            type="text"
                            placeholder="Ví dụ: Xe VIP Limousine đưa đón tận nơi..."
                            value={incItem}
                            onChange={(e) => {
                              const updated = [...(tourDraft.included || [])];
                              updated[incIdx] = e.target.value;
                              setTourDraft({ ...tourDraft, included: updated });
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13px', backgroundColor: '#ffffff' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (tourDraft.included || []).filter((_, i) => i !== incIdx);
                              setTourDraft({ ...tourDraft, included: updated });
                            }}
                            style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                      {(!tourDraft.included || tourDraft.included.length === 0) && (
                        <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', margin: '4px 0' }}>Chưa có dịch vụ bao gồm. Bấm nút "+ Thêm Dịch Vụ Bao Gồm" ở trên để thêm từng mục.</p>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Excluded List Editor */}
                  <div style={{ gridColumn: 'span 2', backgroundColor: '#f9faf7', padding: '16px', borderRadius: '16px', border: '1px solid rgba(8, 31, 19, 0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>
                        Dịch Vụ Không Bao Gồm ({tourDraft.excluded?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(tourDraft.excluded || []), ''];
                          setTourDraft({ ...tourDraft, excluded: updated });
                        }}
                        style={{
                          backgroundColor: '#475569',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        + Thêm Dịch Vụ Không Bao Gồm
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(tourDraft.excluded || []).map((excItem, excIdx) => (
                        <div key={excIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', minWidth: '24px' }}>#{excIdx + 1}</span>
                          <input
                            type="text"
                            placeholder="Ví dụ: Vé máy bay khứ hồi, Chi phí giặt ủi mua sắm cá nhân..."
                            value={excItem}
                            onChange={(e) => {
                              const updated = [...(tourDraft.excluded || [])];
                              updated[excIdx] = e.target.value;
                              setTourDraft({ ...tourDraft, excluded: updated });
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13px', backgroundColor: '#ffffff' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (tourDraft.excluded || []).filter((_, i) => i !== excIdx);
                              setTourDraft({ ...tourDraft, excluded: updated });
                            }}
                            style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                      {(!tourDraft.excluded || tourDraft.excluded.length === 0) && (
                        <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', margin: '4px 0' }}>Chưa có dịch vụ không bao gồm. Bấm nút "+ Thêm Dịch Vụ Không Bao Gồm" để thêm mục.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRICING & DISTRIBUTION */}
          {activeSection === 'pricing-status' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: '0 0 20px 0', fontWeight: 600 }}>
                  Thiết Lập Giá Bán
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Giá Người Lớn (Từ 12 tuổi) - VNĐ</label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 6500000"
                      value={tourDraft.price || 0}
                      onChange={(e) => setTourDraft({ ...tourDraft, price: Number(e.target.value) })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Giá Trẻ Em (5 - 11 tuổi) - VNĐ</label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 5000000 (Để 0 nếu miễn phí hoặc áp dụng giá mặc định)"
                      value={tourDraft.childPrice || 0}
                      onChange={(e) => setTourDraft({ ...tourDraft, childPrice: Number(e.target.value) })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Giá Em Bé (&lt; 5 tuổi) - VNĐ</label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 0 (Để 0 nếu MIỄN PHÍ)"
                      value={tourDraft.infantPrice || 0}
                      onChange={(e) => setTourDraft({ ...tourDraft, infantPrice: Number(e.target.value) })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Giá Gốc Niêm Yết / Flash Sale (VNĐ)</label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 8500000 (Nhập 0 nếu không áp dụng Flash Sale)"
                      value={tourDraft.originalPrice || 0}
                      onChange={(e) => setTourDraft({ ...tourDraft, originalPrice: Number(e.target.value) })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>
              </div>

              {/* Section Flags Switches */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: '0 0 20px 0', fontWeight: 600 }}>
                  Phân Phối Mục Hiển Thị Trang Chủ
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#f9faf7', cursor: 'pointer' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#081f13' }}>1. Retreats Độc Quyền</strong>
                      <p style={{ fontSize: '12px', color: '#525a54', margin: '2px 0 0 0' }}>Hiển thị ở Slider 3D Độc Quyền</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isExclusive || false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isExclusive: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#081f13', cursor: 'pointer' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#f9faf7', cursor: 'pointer' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#081f13' }}>2. Sắp Khởi Hành</strong>
                      <p style={{ fontSize: '12px', color: '#525a54', margin: '2px 0 0 0' }}>Hiển thị ở danh mục Sắp khởi hành 2026</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isFeatured || false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isFeatured: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#081f13', cursor: 'pointer' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#f9faf7', cursor: 'pointer' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#081f13' }}>3. Không Thể Bỏ Lỡ (HOT)</strong>
                      <p style={{ fontSize: '12px', color: '#525a54', margin: '2px 0 0 0' }}>Gắn nhãn HOT trải nghiệm không thể bỏ lỡ</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isHot || false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isHot: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#081f13', cursor: 'pointer' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#f9faf7', cursor: 'pointer' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#081f13' }}>4. Ưu Đãi Giờ Chót (Flash Sale)</strong>
                      <p style={{ fontSize: '12px', color: '#525a54', margin: '2px 0 0 0' }}>Hiển thị ở mục Ưu đãi Giờ Chót trên trang chủ</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isPromotion || false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isPromotion: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#081f13', cursor: 'pointer' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#f9faf7', cursor: 'pointer' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#081f13' }}>5. Sản Phẩm Mới (NEW)</strong>
                      <p style={{ fontSize: '12px', color: '#525a54', margin: '2px 0 0 0' }}>Gắn nhãn NEW sản phẩm mới ra mắt</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isNew || false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isNew: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#081f13', cursor: 'pointer' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#fef3c7', cursor: 'pointer', border: '1px solid #fde68a' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#92400e' }}>👤 6. Tour Do Khách Hàng Yêu Cầu/Tạo (isCustomer)</strong>
                      <p style={{ fontSize: '12px', color: '#b45309', margin: '2px 0 0 0' }}>Đánh dấu tour này được tạo hoặc đề xuất bởi khách hàng</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isCustomer || false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isCustomer: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#d97706', cursor: 'pointer' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#dcfce7', cursor: 'pointer', border: '1px solid #86efac' }}>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#14532d' }}>🛡️ 7. Đã Được Admin Duyệt Hiển Thị (isAdminApproved / isAdminAprove)</strong>
                      <p style={{ fontSize: '12px', color: '#166534', margin: '2px 0 0 0' }}>Khi tích chọn, Tour mới được phép xuất hiện công khai trên Website</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false}
                      onChange={(e) => setTourDraft({ ...tourDraft, isAdminApproved: e.target.checked, isAdminAprove: e.target.checked } as any)}
                      style={{ width: '18px', height: '18px', accentColor: '#16a34a', cursor: 'pointer' }}
                    />
                  </label>
                </div>
              </div>

              {/* Card 3: Ghi Chú Quyền Lợi & Chính Sách Bảo Lưu */}
              <div style={{ gridColumn: 'span 2', backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: '0 0 20px 0', fontWeight: 600 }}>
                  Ghi Chú Quyền Lợi Các Hạng Khách & Chính Sách Đổi Ngày
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Ghi Chú Người Lớn</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Bao gồm xe VIP, Resort cao cấp, 100% bữa ăn & liệu trình thiền"
                      value={tourDraft.adultNote || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, adultNote: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Ghi Chú Trẻ Em (5-11t)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Hưởng giường riêng & suất ăn trọn gói dành cho trẻ em"
                      value={tourDraft.childNote || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, childNote: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Ghi Chú Em Bé (&lt;5t)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Ngồi cùng bố mẹ, miễn phí vé tham quan & phụ thu lưu trú"
                      value={tourDraft.infantNote || ''}
                      onChange={(e) => setTourDraft({ ...tourDraft, infantNote: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Dynamic Included List Editor in Tab 2 */}
                <div style={{ marginBottom: '20px', backgroundColor: '#f9faf7', padding: '16px', borderRadius: '16px', border: '1px solid rgba(8, 31, 19, 0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>
                      Dịch Vụ Bao Gồm Nổi Bật ({tourDraft.included?.length || 0})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(tourDraft.included || []), ''];
                        setTourDraft({ ...tourDraft, included: updated });
                      }}
                      style={{
                        backgroundColor: '#081f13',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      + Thêm Dịch Vụ Bao Gồm
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(tourDraft.included || []).map((incItem, incIdx) => (
                      <div key={incIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', minWidth: '24px' }}>#{incIdx + 1}</span>
                        <input
                          type="text"
                          placeholder="Ví dụ: Xe VIP Limousine đưa đón tận nơi..."
                          value={incItem}
                          onChange={(e) => {
                            const updated = [...(tourDraft.included || [])];
                            updated[incIdx] = e.target.value;
                            setTourDraft({ ...tourDraft, included: updated });
                          }}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13px', backgroundColor: '#ffffff' }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (tourDraft.included || []).filter((_, i) => i !== incIdx);
                            setTourDraft({ ...tourDraft, included: updated });
                          }}
                          style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                    {(!tourDraft.included || tourDraft.included.length === 0) && (
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', margin: '4px 0' }}>Chưa có dịch vụ bao gồm. Bấm nút "+ Thêm Dịch Vụ Bao Gồm" ở trên để thêm từng mục.</p>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Chính Sách Bảo Lưu & Đổi Ngày Đặc Quyền</label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Đổi ngày khởi hành miễn phí 01 lần trước 07 ngày. Đã bao gồm bảo hiểm du lịch trọn gói mức bồi thường tối đa 100.000.000 VNĐ/vụ."
                    value={tourDraft.bookingPolicyNotes || ''}
                    onChange={(e) => setTourDraft({ ...tourDraft, bookingPolicyNotes: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HIGHLIGHTS */}
          {activeSection === 'highlights' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: 0, fontWeight: 600 }}>
                  Danh Sách Điểm Nổi Bật (Highlights)
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const newHighlights = [...(tourDraft.highlights || []), 'Điểm nổi bật trải nghiệm mới...'];
                    setTourDraft({ ...tourDraft, highlights: newHighlights });
                  }}
                  style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  + Thêm Điểm Nổi Bật
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(tourDraft.highlights || []).map((hl, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: '#f9faf7', borderRadius: '12px', border: '1px solid rgba(8, 31, 19, 0.08)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>#{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Nhập nội dung điểm nổi bật (Ví dụ: Thiền định bình minh giữa rừng thông nguyên sơ...)"
                      value={hl}
                      onChange={(e) => {
                        const updated = [...(tourDraft.highlights || [])];
                        updated[idx] = e.target.value;
                        setTourDraft({ ...tourDraft, highlights: updated });
                      }}
                      style={{ flex: 1, border: '1px solid rgba(8, 31, 19, 0.12)', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', backgroundColor: '#ffffff' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (tourDraft.highlights || []).filter((_, i) => i !== idx);
                        setTourDraft({ ...tourDraft, highlights: updated });
                      }}
                      style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ITINERARY */}
          {activeSection === 'itinerary' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', color: '#081f13', margin: 0, fontWeight: 600 }}>
                  Lịch Trình Chi Tiết ({tourDraft.itinerary?.length || 0} Ngày)
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const newDay: TourItineraryDay = {
                      day: (tourDraft.itinerary?.length || 0) + 1,
                      title: `Ngày ${(tourDraft.itinerary?.length || 0) + 1}: Hoạt Động Trải Nghiệm Mới`,
                      description: 'Mô tả chi tiết các hoạt động tĩnh dưỡng và ẩm thực...',
                      activities: ['07:00 - Thiền định bình minh', '09:00 - Thưởng trà thảo mộc']
                    };
                    setTourDraft({ ...tourDraft, itinerary: [...(tourDraft.itinerary || []), newDay] });
                  }}
                  style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  + Thêm Ngày Mới
                </button>
              </div>

              {(tourDraft.itinerary || []).map((dayItem, dayIdx) => (
                <div key={dayIdx} style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#059669', backgroundColor: '#dcfce7', padding: '4px 12px', borderRadius: '999px' }}>
                      NGÀY {dayItem.day}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (tourDraft.itinerary || []).filter((_, i) => i !== dayIdx);
                        setTourDraft({ ...tourDraft, itinerary: updated });
                      }}
                      style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Xóa Ngày Này
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input
                      type="text"
                      placeholder="Tiêu đề ngày (Ví dụ: Ngày 1: Đón Khách tại Sân Bay & Thiền Trà Chiều)"
                      value={dayItem.title || ''}
                      onChange={(e) => {
                        const updated = [...(tourDraft.itinerary || [])];
                        updated[dayIdx].title = e.target.value;
                        setTourDraft({ ...tourDraft, itinerary: updated });
                      }}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '15px', fontWeight: 700 }}
                    />

                    <textarea
                      rows={3}
                      placeholder="Mô tả chi tiết các hoạt động tĩnh dưỡng, chuỗi liệu trình phục hồi Thân - Tâm - Trí..."
                      value={dayItem.description || ''}
                      onChange={(e) => {
                        const updated = [...(tourDraft.itinerary || [])];
                        updated[dayIdx].description = e.target.value;
                        setTourDraft({ ...tourDraft, itinerary: updated });
                      }}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', resize: 'vertical' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeSection === 'gallery' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: 0, fontWeight: 600 }}>
                  Bộ Sưu Tập Ảnh Tour ({tourDraft.gallery?.length || 0} Ảnh)
                </h3>

                <input
                  ref={galleryFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUploadGalleryImage}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => galleryFileRef.current?.click()}
                  style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  + Upload Ảnh Mới
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {(tourDraft.gallery || []).map((imgUrl, imgIdx) => (
                  <div key={imgIdx} style={{ position: 'relative', height: '140px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(8,31,19,0.1)' }}>
                    <img src={getImageUrl(imgUrl)} alt="Gallery Item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (tourDraft.gallery || []).filter((_, i) => i !== imgIdx);
                        setTourDraft({ ...tourDraft, gallery: updated });
                      }}
                      style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(225, 29, 72, 0.9)', color: '#ffffff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LIVE PREVIEW */}
          {activeSection === 'live-preview' && (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '24px', border: '1px solid rgba(8, 31, 19, 0.08)' }}>
              <div style={{ marginBottom: '16px', padding: '10px 16px', backgroundColor: '#e0f2fe', borderRadius: '12px', color: '#0369a1', fontSize: '13px', fontWeight: 600 }}>
                💡 Xem trước trực tiếp giao diện hiển thị cho khách hàng (Client Detail View)
              </div>
              <ProductDetail productSlug={tourDraft.slug} customTourData={tourDraft} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
