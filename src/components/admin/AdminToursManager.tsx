import React, { useMemo, useState, useEffect, useRef } from 'react';
import { RefreshCw, Plus, Trash2, Edit2 } from 'lucide-react';
import { TOURS_DATA, TourPackage, TourItineraryDay } from '../../data/toursData';
import {
  saveTourApi,
  createTourApi,
  fetchToursApi,
  deleteTourApi,
  getImageUrl,
  uploadImageApi,
  fetchMenuCategoriesApi,
  fetchLandingSectionTemplatesApi,
  MenuCategoryItem
} from '../../services/apiService';
import { getAllLandingSectionTemplates } from '../../data/landingSectionData';
import ProductDetail from '../ProductDetail';
import EmptyState from '../ui/EmptyState';
import AdminPriceInput from './AdminPriceInput';
import {
  calculateAllPrices,
  formatVnd as pricingFormatVnd,
  type PricingFormulaInput,
  type PricingResult,
} from '../../lib/pricingCalculator';

interface AdminToursManagerProps {
  onNavigate?: (path: string) => void;
  toast: any;
}

const findTourBySlug = (slug: string) => {
  return TOURS_DATA.find((tour) => tour.slug === slug) || null;
};

const buildDraft = (tour: TourPackage | null): TourPackage | null => {
  if (!tour) return null;

  let cost = tour.cost || 0;
  let marginPercent = tour.marginPercent || 0;
  let promotionPercent = tour.promotionPercent || 0;
  let group3Percent = tour.group3Percent || 0;
  let group5Percent = tour.group5Percent || 0;
  let childDiscountPercent = tour.childDiscountPercent || 0;
  let infantDiscountPercent = tour.infantDiscountPercent || 0;

  // Auto-populate formula defaults for legacy tours where cost was not set
  if (cost === 0) {
    const listP = tour.originalPrice || tour.price || 0;
    const specialP = tour.price || listP;
    if (listP > 0) {
      marginPercent = 40;
      cost = Math.round((listP * (1 - marginPercent / 100)) / 1000) * 1000;
      promotionPercent = listP > specialP ? Number((((listP - specialP) / listP) * 100).toFixed(2)) : 20;
      group3Percent = Number((promotionPercent + 3.64).toFixed(2));
      group5Percent = Number((promotionPercent + 6.64).toFixed(2));
      childDiscountPercent = 50;
      infantDiscountPercent = 80;
    } else {
      // Default to Danny standard template for brand new tours
      cost = 5472000;
      marginPercent = 40;
      promotionPercent = 23.36;
      group3Percent = 27;
      group5Percent = 30;
      childDiscountPercent = 50;
      infantDiscountPercent = 80;
    }
  }

  return {
    ...tour,
    cost,
    marginPercent,
    promotionPercent,
    group3Percent,
    group5Percent,
    childDiscountPercent,
    infantDiscountPercent,
    vatPercent: tour.vatPercent ?? 8,
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

export default function AdminToursManager({ onNavigate, toast }: AdminToursManagerProps) {
  const [toursList, setToursList] = useState<TourPackage[]>([]);
  const [availableCategories, setAvailableCategories] = useState<MenuCategoryItem[]>([]);
  const [availableLandingTemplates, setAvailableLandingTemplates] = useState<any[]>(() => getAllLandingSectionTemplates());
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [tourDraft, setTourDraft] = useState<TourPackage | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('basic-info');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const coverFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const loadLiveToursAndCategories = async (isManual = false) => {
    try {
      const [liveData, catsData, tplsData] = await Promise.all([
        fetchToursApi(isManual),
        fetchMenuCategoriesApi(isManual),
        fetchLandingSectionTemplatesApi(isManual)
      ]);
      if (Array.isArray(liveData) && liveData.length > 0) {
        setToursList(liveData);
      } else {
        setToursList(TOURS_DATA);
      }
      if (Array.isArray(catsData) && catsData.length > 0) {
        setAvailableCategories(catsData);
      }
      if (Array.isArray(tplsData) && tplsData.length > 0) {
        setAvailableLandingTemplates(tplsData);
      }
      if (isManual) {
        toast?.success?.('Đã làm mới danh sách tour!');
      }
    } catch (err) {
      console.warn('[TOURS API LOAD WARNING]', err);
      setToursList(TOURS_DATA);
    }
  };

  useEffect(() => {
    loadLiveToursAndCategories();
  }, []);

  const checkIsExclusive = (t: TourPackage) => {
    const cats = Array.isArray(t.categories) ? t.categories : (typeof t.categories === 'string' ? JSON.parse(t.categories || '[]') : []);
    return t.isExclusive === true || cats.includes('doc-quyen') || cats.includes('Doc-Quyen');
  };

  const checkIsFeatured = (t: TourPackage) => {
    const cats = Array.isArray(t.categories) ? t.categories : (typeof t.categories === 'string' ? JSON.parse(t.categories || '[]') : []);
    return t.isFeatured === true || cats.includes('sap-khoi-hanh') || cats.includes('featured');
  };

  const checkIsHot = (t: TourPackage) => {
    const cats = Array.isArray(t.categories) ? t.categories : (typeof t.categories === 'string' ? JSON.parse(t.categories || '[]') : []);
    return t.isHot === true || cats.includes('khong-the-bo-lo') || cats.includes('hot');
  };

  const checkIsDeal = (t: TourPackage) => {
    const cats = Array.isArray(t.categories) ? t.categories : (typeof t.categories === 'string' ? JSON.parse(t.categories || '[]') : []);
    return (t.originalPrice || 0) > (t.price || 0) || t.isPromotion === true || cats.includes('uu-dai-gio-chot') || cats.includes('last-minute');
  };

  const filteredTours = useMemo(() => {
    return toursList.filter((tour) => {
      const matchSearch =
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (categoryFilter === 'Exclusive') return checkIsExclusive(tour);
      if (categoryFilter === 'Featured') return checkIsFeatured(tour);
      if (categoryFilter === 'Hot') return checkIsHot(tour);
      if (categoryFilter === 'Deals') return checkIsDeal(tour);

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

  const handleUploadDayImage = async (dayIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !tourDraft) return;

    try {
      toast.info(`Đang tải ảnh cho Ngày ${dayIdx + 1}...`);
      const res = await uploadImageApi(file);
      const uploadedUrl = typeof res === 'string' ? res : (res?.url || res?.fileUrl || '');
      const updated = [...(tourDraft.itinerary || [])];
      updated[dayIdx].image = uploadedUrl;
      setTourDraft({ ...tourDraft, itinerary: updated });
      toast.success(`Đã tải ảnh cho Ngày ${dayIdx + 1} thành công!`);
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f766e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  4U RETREAT • QUẢN LÝ GÓI TOUR
                </span>
                <span style={{ height: '4px', width: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                  Hệ thống hành trình
                </span>
              </div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: '24px', margin: 0, color: '#0f172a', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                Danh Sách Gói Tour Retreat ({filteredTours.length})
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>
                Quản lý, biên tập và kiểm duyệt các gói tour tĩnh dưỡng cao cấp của 4U Retreat.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => loadLiveToursAndCategories(true)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              >
                <RefreshCw size={14} color="#64748b" />
                <span>Làm Mới</span>
              </button>

              <button
                type="button"
                onClick={handleCreateNewTour}
                style={{
                  backgroundColor: '#0f766e',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 1px 3px rgba(15, 118, 110, 0.2)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#115e59')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
              >
                <Plus size={15} />
                <span>Thêm Mới</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
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

          {/* 4 Bento Overview Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Retreats Độc Quyền</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#059669', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(checkIsExclusive).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Sắp Khởi Hành</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#2563eb', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(checkIsFeatured).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Không Thể Bỏ Lỡ</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#dc2626', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(checkIsHot).length}</p>
            </div>
            <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.04)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', margin: 0 }}>Ưu Đãi Giờ Chót</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#d97706', margin: '4px 0 0 0', fontWeight: 700 }}>{toursList.filter(checkIsDeal).length}</p>
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
                    {tour.isPromotion && (
                      <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#fffbeb', color: '#d97706', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        GIỜ CHÓT
                      </span>
                    )}
                    {tour.isNew && (
                      <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#dcfce7', color: '#16a34a', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        MỚI
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
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>{tour.city} • {(tour.categories && tour.categories[0]) || tour.category || 'Retreat'}</span>
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
                        style={{
                          width: '50px',
                          height: '32px',
                          backgroundColor: '#081f13',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Chỉnh sửa tour"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteTour(tour); }}
                        style={{
                          width: '50px',
                          height: '32px',
                          backgroundColor: '#fff1f2',
                          color: '#e11d48',
                          border: '1px solid #fecdd3',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Xóa tour"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )
      }

      {/* ── TOUR DETAIL EDITOR FORM ── */}
      {
        selectedSlug && tourDraft && (
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
                  { id: 'basic-info', label: 'Thông Tin & Phân Phối' },
                  { id: 'pricing-status', label: 'Bảng Giá & Dịch Vụ' },
                  { id: 'highlights', label: 'Điểm Nổi Bật' },
                  { id: 'itinerary', label: 'Lịch Trình Chi Tiết' },
                  { id: 'gallery', label: 'Bộ Sưu Tập Ảnh' },
                  { id: 'live-preview', label: 'Xem Trước Chi Tiết' },
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
                        {(tourDraft.categories && tourDraft.categories[0]) || tourDraft.category || 'Retreat'} • {tourDraft.city}
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

                    <div style={{ gridColumn: 'span 2', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '16px 18px', boxShadow: '0 2px 8px rgba(22, 101, 52, 0.04)' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <label style={{ fontSize: '12.5px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>Landing Page </span>
                        </label>
                      </div>

                      <select
                        value={(tourDraft as any).landingSectionTemplateId || tourDraft.yoga3dTemplateId || ''}
                        onChange={(e) => {
                          const selectedVal = e.target.value;
                          setTourDraft({
                            ...tourDraft,
                            landingSectionTemplateId: selectedVal,
                            yoga3dTemplateId: selectedVal
                          } as any);
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #86efac',
                          fontSize: '13.5px',
                          fontWeight: 600,
                          color: '#081f13',
                          backgroundColor: '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">-- Mặc Định: Dùng Loại 1 (Vận Động 3Đ • Chia tay Đau Cổ, Vai, Gáy) --</option>
                        {availableLandingTemplates.map((tpl) => (
                          <option key={tpl.id} value={tpl.id}>
                            {tpl.name} {tpl.isDefault ? '(★ Mặc Định Hệ Thống)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* UNIFIED RETREAT CATEGORIES & HOMEPAGE DISTRIBUTION */}
                    <div style={{ gridColumn: '1 / -1', backgroundColor: '#fcfdfc', borderRadius: '18px', padding: '22px', border: '1px solid rgba(8, 31, 19, 0.14)', boxShadow: '0 2px 12px rgba(8, 31, 19, 0.04)' }}>

                      {/* Header & Selected Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid #eef2ef', paddingBottom: '12px' }}>
                        <div>
                          <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', color: '#081f13', margin: 0, fontWeight: 700 }}>
                            Phân Loại Series Retreat & Vị Trí Hiển Thị Website
                          </h4>
                          <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                            Tự động đồng bộ Menu điều hướng và các khu vực ghim nổi bật trên Website
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11.5px', color: '#059669', backgroundColor: '#e6f4ea', padding: '3px 10px', borderRadius: '12px', fontWeight: 700 }}>
                            {(tourDraft.categories || []).length} mục đã kích hoạt
                          </span>
                        </div>
                      </div>

                      {/* Quick Selected Tags Pill Bar */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px', minHeight: '26px' }}>
                        {(tourDraft.categories || []).length === 0 ? (
                          <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                            ⚠️ Chưa chọn chủ đề Series nào (hãy chọn ít nhất 1 Series ở Mục 1 bên dưới)
                          </span>
                        ) : (
                          (tourDraft.categories || []).map((catSlug) => {
                            const tagLabels: Record<string, { name: string; color: string }> = {
                              'chua-lanh': { name: '🌿 Retreat Chữa Lành', color: '#16a34a' },
                              'bao-ton': { name: '🛡️ Retreat Bảo Tồn', color: '#0284c7' },
                              'thien-nhien': { name: '🌲 Retreat Thiên Nhiên', color: '#ca8a04' },
                              'thien-nguyen': { name: '💖 Retreat Thiện Nguyện', color: '#db2777' },
                              'doc-quyen': { name: '👑 Độc Quyền', color: '#eab308' },
                              'sap-khoi-hanh': { name: '📅 Sắp Khởi Hành', color: '#2563eb' },
                              'khong-the-bo-lo': { name: '🔥 Không Thể Bỏ Lỡ', color: '#dc2626' },
                              'hot': { name: '🔥 HOT', color: '#dc2626' },
                              'uu-dai-gio-chot': { name: '⚡ Giờ Chót', color: '#ea580c' },
                              'last-minute': { name: '⚡ Flash Sale', color: '#ea580c' },
                              'moi': { name: '🌟 Mới (NEW)', color: '#16a34a' },
                              'new': { name: '🌟 NEW', color: '#16a34a' },
                              'bac': { name: '🏔️ Miền Bắc', color: '#475569' },
                              'trung': { name: '🌊 Miền Trung', color: '#475569' },
                              'nam': { name: '🌴 Miền Nam', color: '#475569' },
                            };
                            const info = tagLabels[catSlug] || { name: catSlug, color: '#059669' };
                            return (
                              <span
                                key={catSlug}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  backgroundColor: '#ffffff',
                                  border: `1px solid ${info.color}50`,
                                  color: '#081f13',
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  padding: '3px 8px',
                                  borderRadius: '16px',
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                                }}
                              >
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: info.color }} />
                                {info.name}
                              </span>
                            );
                          })
                        )}
                      </div>

                      {/* MỤC 1: MENU CỐ ĐỊNH HÀNG TRÊN (TOP FIXED BADGES & HOMEPAGE SECTIONS) */}
                      <div style={{ marginBottom: '18px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                          <strong style={{ fontSize: '13px', color: '#081f13', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>⭐ 1. Menu Cố Định Hàng Trên & Ghim Trang Chủ</span>
                          </strong>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                            4 nút menu cố định trên thanh Header & các khu vực ghim lớn trên Trang chủ
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>

                          {/* 1. Retreats ĐỘC QUYỀN */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', backgroundColor: tourDraft.isExclusive || (tourDraft.categories || []).includes('doc-quyen') ? '#fefce8' : '#ffffff', border: tourDraft.isExclusive || (tourDraft.categories || []).includes('doc-quyen') ? '2px solid #facc15' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13.5px', color: '#854d0e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>👑 Retreats ĐỘC QUYỀN</span>
                              </strong>
                              <p style={{ fontSize: '11.5px', color: '#64748b', margin: '2px 0 0 0' }}>Hiển thị ở Menu Độc Quyền & Slider 3D Trang Chủ</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isExclusive || (tourDraft.categories || []).includes('doc-quyen')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'doc-quyen'])) : current.filter((s) => s !== 'doc-quyen');
                                setTourDraft({ ...tourDraft, isExclusive: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#eab308', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 2. Sắp Khởi hành */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', backgroundColor: tourDraft.isFeatured || (tourDraft.categories || []).includes('sap-khoi-hanh') ? '#eff6ff' : '#ffffff', border: tourDraft.isFeatured || (tourDraft.categories || []).includes('sap-khoi-hanh') ? '2px solid #93c5fd' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13.5px', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>📅 Sắp Khởi hành</span>
                              </strong>
                              <p style={{ fontSize: '11.5px', color: '#64748b', margin: '2px 0 0 0' }}>Hiển thị ở Menu Sắp Khởi Hành & Mục Bento Grid Trang Chủ</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isFeatured || (tourDraft.categories || []).includes('sap-khoi-hanh')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'sap-khoi-hanh'])) : current.filter((s) => s !== 'sap-khoi-hanh');
                                setTourDraft({ ...tourDraft, isFeatured: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#2563eb', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 3. KHÔNG THỂ BỎ LỠ */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', backgroundColor: tourDraft.isHot || (tourDraft.categories || []).includes('khong-the-bo-lo') ? '#fff1f2' : '#ffffff', border: tourDraft.isHot || (tourDraft.categories || []).includes('khong-the-bo-lo') ? '2px solid #fda4af' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13.5px', color: '#9f1239', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>🔥 KHÔNG THỂ BỎ LỠ</span>
                              </strong>
                              <p style={{ fontSize: '11.5px', color: '#64748b', margin: '2px 0 0 0' }}>Hiển thị ở Menu Không Thể Bỏ Lỡ & Mục Khám Phá Nổi Bật</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isHot || (tourDraft.categories || []).includes('khong-the-bo-lo')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'khong-the-bo-lo', 'hot'])) : current.filter((s) => s !== 'khong-the-bo-lo');
                                setTourDraft({ ...tourDraft, isHot: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#dc2626', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 4. Ưu đãi GIỜ CHÓT */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', backgroundColor: tourDraft.isPromotion || (tourDraft.categories || []).includes('uu-dai-gio-chot') ? '#fffbeb' : '#ffffff', border: tourDraft.isPromotion || (tourDraft.categories || []).includes('uu-dai-gio-chot') ? '2px solid #fde68a' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13.5px', color: '#9a3412', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>⚡ Ưu đãi GIỜ CHÓT</span>
                              </strong>
                              <p style={{ fontSize: '11.5px', color: '#64748b', margin: '2px 0 0 0' }}>Hiển thị ở Menu Giờ Chót & Mục Flash Sale Trang Chủ</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isPromotion || (tourDraft.categories || []).includes('uu-dai-gio-chot')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'uu-dai-gio-chot', 'last-minute'])) : current.filter((s) => s !== 'uu-dai-gio-chot');
                                setTourDraft({ ...tourDraft, isPromotion: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#ea580c', cursor: 'pointer' }}
                            />
                          </label>

                        </div>
                      </div>

                      {/* MỤC 2: CHỦ ĐỀ SERIES RETREAT (4 CỘT CHÍNH) */}
                      <div style={{ marginBottom: '18px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                          <strong style={{ fontSize: '13px', color: '#081f13', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>🌿 2. Chủ Đề Series Retreat Chính (4 Cột Mega Menu)</span>
                            <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 600 }}>*bắt buộc chọn</span>
                          </strong>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                            Xác định tour thuộc 1 trong 4 cột Series Retreat trên Menu
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                          {[
                            {
                              slug: 'chua-lanh',
                              categoryName: 'Healing',
                              title: 'Retreat Chữa Lành',
                              desc: 'Phục hồi Thân · Tâm · Trí (Wellness & Spa)',
                              activeBg: '#f0fdf4',
                              activeBorder: '#86efac',
                              activeColor: '#166534',
                              badgeColor: '#16a34a',
                              icon: '🌿'
                            },
                            {
                              slug: 'bao-ton',
                              categoryName: 'Conservation',
                              title: 'Retreat Bảo Tồn',
                              desc: 'Bảo tồn rừng già & Đa dạng sinh học',
                              activeBg: '#f0f9ff',
                              activeBorder: '#7dd3fc',
                              activeColor: '#075985',
                              badgeColor: '#0284c7',
                              icon: '🛡️'
                            },
                            {
                              slug: 'thien-nhien',
                              categoryName: 'Nature',
                              title: 'Retreat Thiên Nhiên',
                              desc: 'Hòa mình giữa đại ngàn & Tắm rừng nguyên sơ',
                              activeBg: '#fefce8',
                              activeBorder: '#fde047',
                              activeColor: '#854d0e',
                              badgeColor: '#ca8a04',
                              icon: '🌲'
                            },
                            {
                              slug: 'thien-nguyen',
                              categoryName: 'Volunteer',
                              title: 'Retreat Thiện Nguyện',
                              desc: 'Gắn kết sẻ chia & Giá trị cộng đồng',
                              activeBg: '#fdf2f8',
                              activeBorder: '#f472b6',
                              activeColor: '#9d174d',
                              badgeColor: '#db2777',
                              icon: '💖'
                            },
                          ].map((series) => {
                            const isSelected = (tourDraft.categories || []).includes(series.slug) || (tourDraft.categories || []).includes(series.categoryName) || tourDraft.category === series.categoryName;
                            return (
                              <label
                                key={series.slug}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                  padding: '12px 14px',
                                  borderRadius: '12px',
                                  backgroundColor: isSelected ? series.activeBg : '#ffffff',
                                  border: isSelected ? `2px solid ${series.activeBorder}` : '1px solid #e2e8f0',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                  boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const current = tourDraft.categories || [];
                                    let next = e.target.checked
                                      ? [...current, series.slug]
                                      : current.filter((s) => s !== series.slug && s !== series.categoryName);
                                    next = Array.from(new Set(next));
                                    setTourDraft({
                                      ...tourDraft,
                                      categories: next,
                                      category: next[0] || series.categoryName || 'Healing'
                                    });
                                  }}
                                  style={{ marginTop: '2px', accentColor: series.badgeColor, cursor: 'pointer', width: '16px', height: '16px' }}
                                />
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '15px' }}>{series.icon}</span>
                                    <strong style={{ fontSize: '13.5px', color: isSelected ? series.activeColor : '#081f13' }}>
                                      {series.title}
                                    </strong>
                                  </div>
                                  <p style={{ fontSize: '11.5px', color: '#64748b', margin: '3px 0 0 0', lineHeight: 1.3 }}>
                                    {series.desc}
                                  </p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* MỤC 3: PHÂN LOẠI CON TRONG SERIES (6 DÒNG CON) */}
                      <div style={{ marginBottom: '18px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                          <strong style={{ fontSize: '13px', color: '#081f13', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>🏷️ 3. Phân Loại Danh Mục Con Trong Series (6 Dòng Con)</span>
                          </strong>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                            Khớp chính xác với 6 dòng con bên dưới từng cột Series Retreat trên Menu
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>

                          {/* 1. Retreat Hot [HOT] */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: tourDraft.isHot || (tourDraft.categories || []).includes('hot') ? '#fff1f2' : '#ffffff', border: tourDraft.isHot || (tourDraft.categories || []).includes('hot') ? '2px solid #fda4af' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ fontSize: '13px', color: '#9f1239' }}>🔥 Retreat Hot</strong>
                                <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#f97316', color: '#ffffff', padding: '1px 6px', borderRadius: '6px' }}>HOT</span>
                              </div>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Đang được yêu thích & đặt nhiều nhất</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isHot || (tourDraft.categories || []).includes('hot')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'hot', 'retreat-hot'])) : current.filter((s) => s !== 'hot' && s !== 'retreat-hot');
                                setTourDraft({ ...tourDraft, isHot: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#dc2626', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 2. Retreat Mới [NEW] */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: tourDraft.isNew || (tourDraft.categories || []).includes('moi') ? '#f0fdf4' : '#ffffff', border: tourDraft.isNew || (tourDraft.categories || []).includes('moi') ? '2px solid #86efac' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ fontSize: '13px', color: '#166534' }}>🌟 Retreat Mới</strong>
                                <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#38bdf8', color: '#ffffff', padding: '1px 6px', borderRadius: '6px' }}>NEW</span>
                              </div>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Sản phẩm hành trình mới ra mắt</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isNew || (tourDraft.categories || []).includes('moi')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'moi', 'new'])) : current.filter((s) => s !== 'moi' && s !== 'new');
                                setTourDraft({ ...tourDraft, isNew: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#16a34a', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 3. Retreat Last Minute [ƯU ĐÃI] */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: tourDraft.isPromotion || (tourDraft.categories || []).includes('last-minute') ? '#fffbeb' : '#ffffff', border: tourDraft.isPromotion || (tourDraft.categories || []).includes('last-minute') ? '2px solid #fde68a' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <strong style={{ fontSize: '13px', color: '#9a3412' }}>⚡ Retreat Last Minute</strong>
                                <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: '#facc15', color: '#854d0e', padding: '1px 6px', borderRadius: '6px' }}>ƯU ĐÃI</span>
                              </div>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Gói ưu đãi giờ chót / flash sale</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isPromotion || (tourDraft.categories || []).includes('last-minute')}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'last-minute', 'uu-dai-gio-chot'])) : current.filter((s) => s !== 'last-minute' && s !== 'uu-dai-gio-chot');
                                setTourDraft({ ...tourDraft, isPromotion: checked, categories: next });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#ea580c', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 4. Miền Bắc */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: (tourDraft.categories || []).includes('bac') || tourDraft.region === 'bac' ? '#f1f5f9' : '#ffffff', border: (tourDraft.categories || []).includes('bac') || tourDraft.region === 'bac' ? '2px solid #94a3b8' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13px', color: '#1e293b' }}>🏔️ Miền Bắc</strong>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Sa Pa, Hà Giang, Yên Tử, Ninh Bình...</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={(tourDraft.categories || []).includes('bac') || tourDraft.region === 'bac'}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'bac'])) : current.filter((s) => s !== 'bac');
                                setTourDraft({ ...tourDraft, categories: next, region: checked ? 'bac' : tourDraft.region });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#475569', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 5. Miền Trung */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: (tourDraft.categories || []).includes('trung') || tourDraft.region === 'trung' ? '#f1f5f9' : '#ffffff', border: (tourDraft.categories || []).includes('trung') || tourDraft.region === 'trung' ? '2px solid #94a3b8' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13px', color: '#1e293b' }}>🌊 Miền Trung</strong>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Đà Lạt, Phú Yên, Huế, Hội An, Nha Trang...</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={(tourDraft.categories || []).includes('trung') || tourDraft.region === 'trung'}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'trung'])) : current.filter((s) => s !== 'trung');
                                setTourDraft({ ...tourDraft, categories: next, region: checked ? 'trung' : tourDraft.region });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#475569', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 6. Miền Nam */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', backgroundColor: (tourDraft.categories || []).includes('nam') || tourDraft.region === 'nam' ? '#f1f5f9' : '#ffffff', border: (tourDraft.categories || []).includes('nam') || tourDraft.region === 'nam' ? '2px solid #94a3b8' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13px', color: '#1e293b' }}>🌴 Miền Nam</strong>
                              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Nam Cát Tiên, Hồ Lắk, Phú Quốc, Côn Đảo...</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={(tourDraft.categories || []).includes('nam') || tourDraft.region === 'nam'}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const current = tourDraft.categories || [];
                                const next = checked ? Array.from(new Set([...current, 'nam'])) : current.filter((s) => s !== 'nam');
                                setTourDraft({ ...tourDraft, categories: next, region: checked ? 'nam' : tourDraft.region });
                              }}
                              style={{ width: '18px', height: '18px', accentColor: '#475569', cursor: 'pointer' }}
                            />
                          </label>

                        </div>
                      </div>

                      {/* MỤC 4: PHÂN LOẠI KHÁCH & PHÊ DUYỆT XUẤT BẢN */}
                      <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                          <strong style={{ fontSize: '13px', color: '#081f13', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>🛡️ 4. Phân Loại Khách & Phê Duyệt Xuất Bản Website</span>
                          </strong>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>

                          {/* 1. Tour Do Khách Hàng Yêu Cầu/Tạo (isCustomer) */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', backgroundColor: tourDraft.isCustomer ? '#fef3c7' : '#ffffff', border: tourDraft.isCustomer ? '2px solid #fde68a' : '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '13.5px', color: '#92400e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>👤 Tour Khách Hàng Đặt Riêng (isCustomer)</span>
                              </strong>
                              <p style={{ fontSize: '11.5px', color: '#b45309', margin: '2px 0 0 0' }}>Đánh dấu tour tạo theo yêu cầu của khách</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isCustomer || false}
                              onChange={(e) => setTourDraft({ ...tourDraft, isCustomer: e.target.checked })}
                              style={{ width: '18px', height: '18px', accentColor: '#d97706', cursor: 'pointer' }}
                            />
                          </label>

                          {/* 2. Đã Được Admin Duyệt Hiển Thị */}
                          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: '12px', backgroundColor: (tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false) ? '#dcfce7' : '#fee2e2', border: (tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false) ? '2px solid #86efac' : '2px solid #fca5a5', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                            <div>
                              <strong style={{ fontSize: '14px', color: (tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false) ? '#14532d' : '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>🛡️ Đã Được Admin Duyệt Hiển Thị (isAdminApproved)</span>
                              </strong>
                              <p style={{ fontSize: '12px', color: (tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false) ? '#166534' : '#b91c1c', margin: '3px 0 0 0' }}>
                                {(tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false) ? '✓ Tour đang được phép hiển thị công khai trên Website' : '✕ Tour đang ẨN (chỉ Admin nhìn thấy)'}
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              checked={tourDraft.isAdminApproved !== false && (tourDraft as any).isAdminAprove !== false}
                              onChange={(e) => setTourDraft({ ...tourDraft, isAdminApproved: e.target.checked, isAdminAprove: e.target.checked } as any)}
                              style={{ width: '20px', height: '20px', accentColor: '#16a34a', cursor: 'pointer' }}
                            />
                          </label>

                        </div>
                      </div>

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
                          value={
                            [
                              'Vịnh Hạ Long', 'Hạ Long', 'Yên Tử', 'Sa Pa', 'Hà Giang', 'Ninh Bình', 'Thanh Hóa', 'Cao Bằng', 'Hòa Bình', 'Hà Nội',
                              'Phú Yên', 'Đà Lạt', 'Huế', 'Hội An', 'Đà Nẵng', 'Nha Trang', 'Quy Nhơn', 'Quảng Bình', 'Ninh Thuận',
                              'Đắk Lắk', 'Gia Lai', 'Kon Tum',
                              'Phú Quốc', 'Côn Đảo', 'Nam Cát Tiên', 'Cần Thơ', 'Sóc Trăng', 'Tiền Giang', 'Bến Tre', 'TP. Hồ Chí Minh',
                              'Chiang Mai', 'Ubud', 'Kyoto', 'Thụy Sĩ', 'Nepal', 'Ấn Độ'
                            ].some(c => (tourDraft.city || '').toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes((tourDraft.city || '').toLowerCase()))
                              ? tourDraft.city
                              : 'custom'
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val !== 'custom') {
                              let autoRegion = tourDraft.region;
                              let autoCountry = tourDraft.country || 'Vietnam';

                              // Auto detect region & country based on city
                              if (['Vịnh Hạ Long', 'Hạ Long', 'Yên Tử', 'Sa Pa', 'Hà Giang', 'Ninh Bình', 'Thanh Hóa', 'Cao Bằng', 'Hòa Bình', 'Hà Nội'].includes(val)) {
                                autoRegion = 'bac';
                                autoCountry = 'Vietnam';
                              } else if (['Phú Yên', 'Đà Lạt', 'Huế', 'Hội An', 'Đà Nẵng', 'Nha Trang', 'Quy Nhơn', 'Quảng Bình', 'Ninh Thuận'].includes(val)) {
                                autoRegion = 'trung';
                                autoCountry = 'Vietnam';
                              } else if (['Đắk Lắk', 'Gia Lai', 'Kon Tum'].includes(val)) {
                                autoRegion = 'tay-nguyen';
                                autoCountry = 'Vietnam';
                              } else if (['Phú Quốc', 'Côn Đảo', 'Nam Cát Tiên', 'Cần Thơ', 'Sóc Trăng', 'Tiền Giang', 'Bến Tre', 'TP. Hồ Chí Minh'].includes(val)) {
                                autoRegion = 'nam';
                                autoCountry = 'Vietnam';
                              } else if (val === 'Chiang Mai') {
                                autoRegion = 'international';
                                autoCountry = 'Thailand';
                              } else if (val === 'Ubud') {
                                autoRegion = 'international';
                                autoCountry = 'Indonesia';
                              } else if (val === 'Kyoto') {
                                autoRegion = 'international';
                                autoCountry = 'Japan';
                              }

                              const currentCats = (tourDraft.categories || []).filter(c => c !== 'bac' && c !== 'trung' && c !== 'nam' && c !== 'tay-nguyen');
                              const nextCats = (autoRegion === 'bac' || autoRegion === 'trung' || autoRegion === 'nam' || autoRegion === 'tay-nguyen')
                                ? Array.from(new Set([...currentCats, autoRegion]))
                                : currentCats;

                              setTourDraft({
                                ...tourDraft,
                                city: val,
                                region: autoRegion as any,
                                country: autoCountry,
                                categories: nextCats
                              });
                            }
                          }}
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', backgroundColor: '#ffffff', outline: 'none' }}
                        >
                          <option value="">-- Chọn Điểm Đến Có Sẵn --</option>
                          <optgroup label="🏔️ Miền Bắc">
                            <option value="Vịnh Hạ Long">Vịnh Hạ Long (Quảng Ninh)</option>
                            <option value="Yên Tử">Yên Tử (Quảng Ninh)</option>
                            <option value="Sa Pa">Sa Pa (Lào Cai)</option>
                            <option value="Hà Giang">Hà Giang</option>
                            <option value="Ninh Bình">Ninh Bình (Tràng An)</option>
                            <option value="Thanh Hóa">Thanh Hóa (Pù Luông)</option>
                            <option value="Cao Bằng">Cao Bằng (Bản Giốc)</option>
                            <option value="Hòa Bình">Hòa Bình (Mai Châu)</option>
                            <option value="Hà Nội">Hà Nội</option>
                          </optgroup>
                          <optgroup label="🌊 Miền Trung">
                            <option value="Phú Yên">Phú Yên (Bãi San Hô)</option>
                            <option value="Đà Lạt">Đà Lạt (Lâm Đồng)</option>
                            <option value="Huế">Huế (Cố Đô)</option>
                            <option value="Hội An">Hội An (Quảng Nam)</option>
                            <option value="Đà Nẵng">Đà Nẵng (Sơn Trà)</option>
                            <option value="Nha Trang">Nha Trang (Khánh Hòa)</option>
                            <option value="Quy Nhơn">Quy Nhơn (Bình Định)</option>
                            <option value="Quảng Bình">Quảng Bình (Phong Nha)</option>
                            <option value="Ninh Thuận">Ninh Thuận (Vĩnh Hy)</option>
                          </optgroup>
                          <optgroup label="🌲 Tây Nguyên">
                            <option value="Đắk Lắk">Đắk Lắk (Hồ Lắk / Buôn Ma Thuột)</option>
                            <option value="Gia Lai">Gia Lai (Pleiku / Biển Hồ)</option>
                            <option value="Kon Tum">Kon Tum (Măng Đen)</option>
                          </optgroup>
                          <optgroup label="🌴 Miền Nam">
                            <option value="Phú Quốc">Phú Quốc (Kiên Giang)</option>
                            <option value="Côn Đảo">Côn Đảo (Bà Rịa - Vũng Tàu)</option>
                            <option value="Nam Cát Tiên">Nam Cát Tiên (Đồng Nai)</option>
                            <option value="Cần Thơ">Cần Thơ (Tây Đô)</option>
                            <option value="Sóc Trăng">Sóc Trăng (Chùa Khmer)</option>
                            <option value="Tiền Giang">Tiền Giang (Mỹ Tho)</option>
                            <option value="Bến Tre">Bến Tre (Miệt Vườn)</option>
                          </optgroup>
                          <optgroup label="🌏 Quốc Tế">
                            <option value="Chiang Mai">Chiang Mai (Thái Lan)</option>
                            <option value="Ubud">Ubud (Bali, Indonesia)</option>
                            <option value="Kyoto">Kyoto (Nhật Bản)</option>
                          </optgroup>
                          <option value="custom">-- Nhập địa danh khác --</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Hoặc tự gõ địa danh..."
                          value={tourDraft.city || ''}
                          onChange={(e) => setTourDraft({ ...tourDraft, city: e.target.value })}
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#4d6453', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Phân Vùng Miền (Region)</label>
                      <select
                        value={tourDraft.region || 'bac'}
                        onChange={(e) => {
                          const newRegion = e.target.value;
                          const currentCats = (tourDraft.categories || []).filter(c => c !== 'bac' && c !== 'trung' && c !== 'nam' && c !== 'tay-nguyen');
                          const nextCats = (newRegion === 'bac' || newRegion === 'trung' || newRegion === 'nam' || newRegion === 'tay-nguyen')
                            ? Array.from(new Set([...currentCats, newRegion]))
                            : currentCats;
                          setTourDraft({ ...tourDraft, region: newRegion as any, categories: nextCats });
                        }}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', backgroundColor: '#ffffff', outline: 'none', fontWeight: 600 }}
                      >
                        <option value="bac">🏔️ Miền Bắc (Đông Bắc Bộ, Tây Bắc, Đồng Bằng Sông Hồng)</option>
                        <option value="trung">🌊 Miền Trung (Bắc Trung Bộ, Duyên Hải Nam Trung Bộ)</option>
                        <option value="tay-nguyen">🌲 Tây Nguyên (Đại Ngàn Tây Nguyên)</option>
                        <option value="nam">🌴 Miền Nam (Đông Nam Bộ, Đồng Bằng Sông Cửu Long)</option>
                        <option value="international">🌏 Quốc Tế (Thái Lan, Bali, Nhật Bản, Thụy Sĩ...)</option>
                      </select>
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
                          { name: '📍 Vịnh Hạ Long Quảng Ninh', loc: 'Vịnh Hạ Long Quảng Ninh' },
                          { name: '📍 Bãi San Hô Phú Yên', loc: 'Zannier Hotels Bãi San Hô Phú Yên' },
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
                        value={(tourDraft as any)._departureDatesText !== undefined ? (tourDraft as any)._departureDatesText : (tourDraft.departureDates ? tourDraft.departureDates.join(', ') : 'Hằng tuần')}
                        onChange={(e) => {
                          const raw = e.target.value;
                          setTourDraft({
                            ...tourDraft,
                            departureDates: raw.split(',').map((s) => s.trim()).filter(Boolean),
                            _departureDatesText: raw
                          } as any);
                        }}
                        onBlur={() => {
                          const next = { ...tourDraft };
                          delete (next as any)._departureDatesText;
                          setTourDraft(next);
                        }}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
                  <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#081f13', margin: '0 0 6px 0', fontWeight: 700 }}>
                        Cài Đặt Giá Bán Tự Động (Theo Công Thức Danny @260825)
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                        Nhập giá vốn và tỷ lệ chiết khấu bên dưới. Hệ thống sẽ tự động tính toán Giá niêm yết, Giá khuyến mãi theo nhóm khách, Giá trẻ em và Em bé trên Website.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setTourDraft({
                            ...tourDraft,
                            cost: 5472000,
                            marginPercent: 40,
                            promotionPercent: 23.36,
                            group3Percent: 27,
                            group5Percent: 30,
                            childDiscountPercent: 50,
                            infantDiscountPercent: 80,
                            vatPercent: 8
                          });
                          toast.success('Đã nạp công thức mẫu Danny @260825 (Vốn: 5.472.000đ, Margin: 40%, Khuyến mãi: 23.36%)!');
                        }}
                        style={{
                          backgroundColor: '#ecfdf5',
                          color: '#065f46',
                          border: '1px solid #a7f3d0',
                          borderRadius: '8px',
                          padding: '8px 14px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>✨ Nạp Mẫu Chuẩn Danny @260825</span>
                      </button>

                      {((tourDraft.originalPrice || 0) > 0 || (tourDraft.price || 0) > 0) && (tourDraft.cost || 0) === 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const orig = tourDraft.originalPrice || tourDraft.price || 28500000;
                            const cur = tourDraft.price || orig;
                            const margin = 40;
                            const costEst = Math.round((orig * (1 - margin / 100)) / 1000) * 1000;
                            const promoEst = orig > 0 ? Number((((orig - cur) / orig) * 100).toFixed(2)) : 20;
                            setTourDraft({
                              ...tourDraft,
                              cost: costEst,
                              marginPercent: margin,
                              promotionPercent: promoEst > 0 ? promoEst : 20,
                              group3Percent: Math.min(99, Math.round(promoEst + 4)),
                              group5Percent: Math.min(99, Math.round(promoEst + 7)),
                              childDiscountPercent: 50,
                              infantDiscountPercent: 80,
                              vatPercent: 8
                            });
                            toast.success(`Đã tự động tính Giá Vốn (${costEst.toLocaleString('vi-VN')} đ) từ giá niêm yết hiện tại!`);
                          }}
                          style={{
                            backgroundColor: '#eff6ff',
                            color: '#1e40af',
                            border: '1px solid #bfdbfe',
                            borderRadius: '8px',
                            padding: '8px 14px',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>⚡ Quy Đổi Nhanh Từ Giá Tour Hiện Tại</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                    {/* CỘT TRÁI: DỮ LIỆU ĐẦU VÀO */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#006d36', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          1. Dữ Liệu Giá Vốn & Tỷ Suất Lợi Nhuận
                        </span>
                      </div>

                      {/* Giá vốn */}
                      <AdminPriceInput
                        id="tour-cost"
                        label="Giá Vốn Đầu Vào Cho 01 Người Lớn (Cost)"
                        value={tourDraft.cost || 0}
                        onChange={(val) => setTourDraft({ ...tourDraft, cost: val })}
                        placeholder="Ví dụ: 5.472.000"
                        hint="Tổng chi phí tour trực tiếp trên mỗi khách người lớn."
                        presets={[1000000, 3000000, 5000000, 10000000]}
                        required
                      />

                      {/* % Lợi nhuận & % Khuyến mãi */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Tỷ Suất Lợi Nhuận Mong Muốn (% Margin)
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={99}
                              step={0.01}
                              placeholder="40"
                              value={tourDraft.marginPercent || 0}
                              onChange={(e) => setTourDraft({ ...tourDraft, marginPercent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 32px 10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>%</span>
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                            Ví dụ: 40% (dùng tính Trị giá)
                          </span>
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Khuyến Mãi Cho 1 - 2 Khách (% Promotion)
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={99}
                              step={0.01}
                              placeholder="23.36"
                              value={tourDraft.promotionPercent || 0}
                              onChange={(e) => setTourDraft({ ...tourDraft, promotionPercent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 32px 10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>%</span>
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                            Ví dụ: 23.36% (tính Giá Đặc Biệt)
                          </span>
                        </div>
                      </div>

                      {/* Ưu đãi nhóm */}
                      <div style={{ paddingBottom: '6px', borderBottom: '1px dashed #e2e8f0', marginTop: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                          2. Chính Sách Ưu Đãi Đặt Theo Nhóm
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Giảm Nhóm 3 - 4 Người Lớn
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={99}
                              step={0.01}
                              placeholder="27"
                              value={tourDraft.group3Percent || 0}
                              onChange={(e) => setTourDraft({ ...tourDraft, group3Percent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 32px 10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>%</span>
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>Ví dụ: 27%</span>
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Giảm Nhóm Từ 5 Người Lớn
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={99}
                              step={0.01}
                              placeholder="30"
                              value={tourDraft.group5Percent || 0}
                              onChange={(e) => setTourDraft({ ...tourDraft, group5Percent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 32px 10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>%</span>
                          </div>
                          <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>Ví dụ: 30%</span>
                        </div>
                      </div>

                      {/* Trẻ em, Em bé & VAT */}
                      <div style={{ paddingBottom: '6px', borderBottom: '1px dashed #e2e8f0', marginTop: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                          3. Chính Sách Trẻ Em & Thuế VAT
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Giảm Trẻ Em (6 - 11 tuổi)
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={99}
                              step={0.01}
                              placeholder="50"
                              value={tourDraft.childDiscountPercent || 0}
                              onChange={(e) => setTourDraft({ ...tourDraft, childDiscountPercent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 28px 10px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '12px' }}>%</span>
                          </div>
                          <span style={{ fontSize: '10.5px', color: '#64748b', marginTop: '3px', display: 'block' }}>50% = nửa giá NL</span>
                        </div>

                        <div>
                          <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Giảm Em Bé (Dưới 6 tuổi)
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={99}
                              step={0.01}
                              placeholder="80"
                              value={tourDraft.infantDiscountPercent || 0}
                              onChange={(e) => setTourDraft({ ...tourDraft, infantDiscountPercent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 28px 10px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '12px' }}>%</span>
                          </div>
                          <span style={{ fontSize: '10.5px', color: '#64748b', marginTop: '3px', display: 'block' }}>80% = thu 20% giá</span>
                        </div>

                        <div>
                          <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', display: 'block' }}>
                            % Thuế VAT
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="number"
                              min={0}
                              max={50}
                              step={0.5}
                              placeholder="8"
                              value={tourDraft.vatPercent ?? 8}
                              onChange={(e) => setTourDraft({ ...tourDraft, vatPercent: parseFloat(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '10px 28px 10px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', boxSizing: 'border-box' }}
                            />
                            <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '12px' }}>%</span>
                          </div>
                          <span style={{ fontSize: '10.5px', color: '#64748b', marginTop: '3px', display: 'block' }}>Mặc định: 8%</span>
                        </div>
                      </div>
                    </div>

                    {/* CỘT PHẢI: BẢNG XEM TRƯỚC GIÁ HIỂN THỊ */}
                    <div>
                      <div style={{ paddingBottom: '8px', borderBottom: '2px solid #059669', marginBottom: '16px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Bảng Xem Trước Giá Bán Trên Website
                        </span>
                      </div>

                      {(() => {
                        const costVal = tourDraft.cost || 0;
                        const marginVal = tourDraft.marginPercent || 0;
                        const hasCostInput = costVal > 0 && marginVal > 0;

                        if (!hasCostInput) {
                          return (
                            <div style={{
                              padding: '32px 24px',
                              backgroundColor: '#f8fafc',
                              borderRadius: '16px',
                              border: '1.5px dashed #cbd5e1',
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '12px'
                            }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                                📊
                              </div>
                              <div>
                                <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', margin: '0 0 6px 0' }}>
                                  Chưa Có Đủ Dữ Liệu Tính Giá
                                </h5>
                                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.5, maxWidth: '320px' }}>
                                  Vui lòng nhập <strong>Giá Vốn Đầu Vào</strong> và <strong>% Lợi Nhuận Mong Muốn</strong> ở cột bên trái để hệ thống tự động tính toàn bộ bảng giá.
                                </p>
                              </div>
                            </div>
                          );
                        }

                        const pricingInput: PricingFormulaInput = {
                          cost: costVal,
                          marginPercent: marginVal,
                          promotionPercent: tourDraft.promotionPercent || 0,
                          group3Percent: tourDraft.group3Percent || 0,
                          group5Percent: tourDraft.group5Percent || 0,
                          childDiscountPercent: tourDraft.childDiscountPercent || 0,
                          infantDiscountPercent: tourDraft.infantDiscountPercent || 0,
                          vatPercent: tourDraft.vatPercent ?? 8,
                        };
                        const preview: PricingResult = calculateAllPrices(pricingInput);

                        const previewRows = [
                          { label: 'Trị giá niêm yết (Hiển thị gạch ngang)', note: '= Roundup(Cost / (1 - %Margin), -4)', value: preview.listPrice, color: '#64748b', strikethrough: true, bg: '#f8fafc' },
                          { label: 'Giá ĐẶC BIỆT trong tháng (1 - 2 Khách)', note: '= Trị giá × (1 - %Promotion)', value: preview.specialPrice, color: '#059669', strikethrough: false, bg: '#ecfdf5', highlight: true },
                          { label: 'Giá Ưu đãi nhóm 3 - 4 Người lớn', note: '= Trị giá × (1 - %Nhóm 3+)', value: preview.group3Price, color: '#2563eb', strikethrough: false, bg: '#eff6ff' },
                          { label: 'Giá Ưu đãi nhóm từ 5 Người lớn', note: '= Trị giá × (1 - %Nhóm 5+)', value: preview.group5Price, color: '#7c3aed', strikethrough: false, bg: '#faf5ff' },
                          { label: 'Giá vé Trẻ em (6 đến dưới 12 tuổi)', note: '= Giá Người lớn × (1 - %Giảm TE)', value: preview.childPrice, color: '#d97706', strikethrough: false, bg: '#fffbeb' },
                          { label: 'Giá vé Em bé (Dưới 6 tuổi)', note: '= Giá Người lớn × (1 - %Giảm EB)', value: preview.infantPrice, color: '#dc2626', strikethrough: false, bg: '#fef2f2' },
                        ];

                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                              {previewRows.map((row, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    backgroundColor: row.bg,
                                    borderBottom: idx < previewRows.length - 1 ? '1px solid #e2e8f0' : 'none',
                                  }}
                                >
                                  <div>
                                    <div style={{ fontSize: '13px', color: '#0f172a', fontWeight: row.highlight ? 700 : 600 }}>
                                      {row.label}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                                      {row.note}
                                    </div>
                                  </div>
                                  <div style={{
                                    fontSize: row.highlight ? '16px' : '14px',
                                    fontWeight: 800,
                                    color: row.color,
                                    fontFamily: 'monospace',
                                    textDecoration: row.strikethrough ? 'line-through' : 'none',
                                    textAlign: 'right'
                                  }}>
                                    {pricingFormatVnd(row.value)}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div style={{ padding: '12px 16px', backgroundColor: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                              <p style={{ fontSize: '12px', color: '#15803d', margin: 0, fontWeight: 600 }}>
                                💡 Quy định hiển thị: Luôn có ghi chú "Giá chưa bao gồm Thuế" trên mọi trang sản phẩm. Thuế VAT ({tourDraft.vatPercent ?? 8}%) sẽ được tự động tính vào Tổng thanh toán ở bước Đặt tour.
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Card 2: Ghi Chú Quyền Lợi & Chính Sách Bảo Lưu */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid rgba(8, 31, 19, 0.06)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)' }}>
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
                            style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Xóa dịch vụ"
                          >
                            <Trash2 size={14} />
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
                        style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Xóa điểm nổi bật"
                      >
                        <Trash2 size={14} />
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
                      const nextDayNum = (tourDraft.itinerary?.length || 0) + 1;
                      const newDay: TourItineraryDay = {
                        day: nextDayNum,
                        title: `Ngày ${nextDayNum}`,
                        description: '',
                        activities: [],
                        transportAndCulinary: [],
                        attractions: []
                      };
                      setTourDraft({ ...tourDraft, itinerary: [...(tourDraft.itinerary || []), newDay] });
                    }}
                    style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    + Thêm Ngày Mới
                  </button>
                </div>

                {(tourDraft.itinerary || []).map((dayItem, dayIdx) => (
                  <div key={dayIdx} style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '24px', border: '1px solid rgba(8, 31, 19, 0.08)', boxShadow: '0 4px 20px -2px rgba(8, 31, 19, 0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#059669', backgroundColor: '#dcfce7', padding: '4px 12px', borderRadius: '999px' }}>
                        NGÀY {dayItem.day}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (tourDraft.itinerary || [])
                            .filter((_, i) => i !== dayIdx)
                            .map((item, idx) => ({ ...item, day: idx + 1 }));
                          setTourDraft({ ...tourDraft, itinerary: updated });
                        }}
                        style={{ backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        title="Xóa ngày này"
                      >
                        <Trash2 size={13} />
                        <span>Xóa ngày</span>
                      </button>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                        Tiêu Đề Ngày
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Ngày 1: Đón Khách tại Sân Bay & Khám Phá Vịnh"
                        value={dayItem.title || ''}
                        onChange={(e) => {
                          const updated = [...(tourDraft.itinerary || [])];
                          updated[dayIdx].title = e.target.value;
                          setTourDraft({ ...tourDraft, itinerary: updated });
                        }}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '14px', fontWeight: 700, boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                        Mô Tả Tổng Quan
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả chi tiết các hoạt động tĩnh dưỡng, liệu trình phục hồi Thân - Tâm - Trí..."
                        value={dayItem.description || ''}
                        onChange={(e) => {
                          const updated = [...(tourDraft.itinerary || [])];
                          updated[dayIdx].description = e.target.value;
                          setTourDraft({ ...tourDraft, itinerary: updated });
                        }}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(8, 31, 19, 0.15)', fontSize: '13.5px', resize: 'vertical', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* ACTIVITIES LIST */}
                    <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                          Hoạt Động Chi Tiết ({dayItem.activities?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(tourDraft.itinerary || [])];
                            const acts = [...(updated[dayIdx].activities || [])];
                            acts.push('');
                            updated[dayIdx].activities = acts;
                            setTourDraft({ ...tourDraft, itinerary: updated });
                          }}
                          style={{ backgroundColor: '#0f766e', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          + Thêm Hoạt Động
                        </button>
                      </div>

                      {(dayItem.activities || []).map((act, actIdx) => (
                        <div key={actIdx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <input
                            type="text"
                            placeholder="Ví dụ: 07:00 - Thiền định bình minh trên bãi biển"
                            value={act}
                            onChange={(e) => {
                              const updated = [...(tourDraft.itinerary || [])];
                              const acts = [...(updated[dayIdx].activities || [])];
                              acts[actIdx] = e.target.value;
                              updated[dayIdx].activities = acts;
                              setTourDraft({ ...tourDraft, itinerary: updated });
                            }}
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(tourDraft.itinerary || [])];
                              updated[dayIdx].activities = (updated[dayIdx].activities || []).filter((_, i) => i !== actIdx);
                              setTourDraft({ ...tourDraft, itinerary: updated });
                            }}
                            style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Xóa hoạt động"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {(!dayItem.activities || dayItem.activities.length === 0) && (
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>
                          Chưa có mốc hoạt động chi tiết (tùy chọn).
                        </p>
                      )}
                    </div>

                    {/* TRANSPORT & CULINARY TAGS */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Phương Tiện & Ẩm Thực (Ngăn cách bằng dấu phẩy)
                        </label>
                        <input
                          type="text"
                          placeholder="Xe Limousine, Bữa sáng thực dưỡng..."
                          value={(dayItem as any)._transportText !== undefined ? (dayItem as any)._transportText : (Array.isArray(dayItem.transportAndCulinary) ? dayItem.transportAndCulinary.join(', ') : '')}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const updated = [...(tourDraft.itinerary || [])];
                            (updated[dayIdx] as any)._transportText = raw;
                            updated[dayIdx].transportAndCulinary = raw.split(',').map((s) => s.trim()).filter(Boolean);
                            setTourDraft({ ...tourDraft, itinerary: updated });
                          }}
                          onBlur={() => {
                            const updated = [...(tourDraft.itinerary || [])];
                            delete (updated[dayIdx] as any)._transportText;
                            setTourDraft({ ...tourDraft, itinerary: updated });
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Điểm Đến & Danh Lam (Ngăn cách bằng dấu phẩy)
                        </label>
                        <input
                          type="text"
                          placeholder="Vịnh Hạ Long, Hang Sửng Sốt..."
                          value={(dayItem as any)._attractionsText !== undefined ? (dayItem as any)._attractionsText : (Array.isArray(dayItem.attractions) ? dayItem.attractions.join(', ') : '')}
                          onChange={(e) => {
                            const raw = e.target.value;
                            const updated = [...(tourDraft.itinerary || [])];
                            (updated[dayIdx] as any)._attractionsText = raw;
                            updated[dayIdx].attractions = raw.split(',').map((s) => s.trim()).filter(Boolean);
                            setTourDraft({ ...tourDraft, itinerary: updated });
                          }}
                          onBlur={() => {
                            const updated = [...(tourDraft.itinerary || [])];
                            delete (updated[dayIdx] as any)._attractionsText;
                            setTourDraft({ ...tourDraft, itinerary: updated });
                          }}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* DAY MOMENT IMAGE */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                        Ảnh Khoảnh Khắc Trong Ngày (Tùy chọn)
                      </label>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {dayItem.image ? (
                          <img
                            src={getImageUrl(dayItem.image)}
                            alt={`Khoảnh khắc Ngày ${dayItem.day}`}
                            style={{ width: '40px', height: '38px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #cbd5e1', flexShrink: 0 }}
                          />
                        ) : null}

                        <input
                          type="text"
                          placeholder="Nhập đường dẫn hoặc tải ảnh lên..."
                          value={dayItem.image || ''}
                          onChange={(e) => {
                            const updated = [...(tourDraft.itinerary || [])];
                            updated[dayIdx].image = e.target.value;
                            setTourDraft({ ...tourDraft, itinerary: updated });
                          }}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                        />

                        <input
                          type="file"
                          id={`day-moment-file-${dayIdx}`}
                          accept="image/*"
                          onChange={(e) => handleUploadDayImage(dayIdx, e)}
                          style={{ display: 'none' }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById(`day-moment-file-${dayIdx}`);
                            if (el) el.click();
                          }}
                          style={{
                            backgroundColor: '#081f13',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '12.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          Chọn ảnh
                        </button>

                        {dayItem.image ? (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(tourDraft.itinerary || [])];
                              updated[dayIdx].image = '';
                              setTourDraft({ ...tourDraft, itinerary: updated });
                            }}
                            style={{
                              backgroundColor: '#fff1f2',
                              color: '#e11d48',
                              border: '1px solid #fecdd3',
                              borderRadius: '8px',
                              padding: '8px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="Xóa ảnh khoảnh khắc"
                          >
                            <Trash2 size={14} />
                          </button>
                        ) : null}
                      </div>
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
                        title="Xóa ảnh"
                      >
                        <Trash2 size={14} />
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
        )
      }
    </div >
  );
}
