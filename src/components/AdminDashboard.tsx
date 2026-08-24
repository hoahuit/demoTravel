import React, { useEffect, useMemo, useState } from 'react';
import { LogOut, ShieldCheck, User as UserIcon, Lock, AlertTriangle } from 'lucide-react';
import AdminToursManager from './admin/AdminToursManager';
import AdminBookingsManager from './admin/AdminBookingsManager';
import AdminConsultationsManager from './admin/AdminConsultationsManager';
import AdminCustomToursManager from './admin/AdminCustomToursManager';
import AdminShopOrdersManager from './admin/AdminShopOrdersManager';
import AdminAnalyticsManager from './admin/AdminAnalyticsManager';
import AdminAboutManager from './admin/AdminAboutManager';
import AdminBlogManager from './admin/AdminBlogManager';
import AdminDestinationsManager from './admin/AdminDestinationsManager';
import AdminFaqManager from './admin/AdminFaqManager';
import AdminPartnersManager from './admin/AdminPartnersManager';
import AdminPromotionsManager from './admin/AdminPromotionsManager';
import AdminServicesManager from './admin/AdminServicesManager';
import AdminTeamManager from './admin/AdminTeamManager';
import AdminTestimonialsManager from './admin/AdminTestimonialsManager';
import AdminSettingsManager from './admin/AdminSettingsManager';
import AdminCategoriesManager from './admin/AdminCategoriesManager';
import AdminProductsManager from './admin/AdminProductsManager';
import AdminUsersManager from './admin/AdminUsersManager';
import AdminLandingSectionManager from './admin/AdminLandingSectionManager';
import AdminLoginPage from './admin/AdminLoginPage';

import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../services/authService';

import { BLOGS_DATA, BlogArticle } from '../data/blogsData';
import { DESTINATIONS_DATA, Destination } from '../data/destinationsData';
import { FAQ_DATA, FAQItem } from '../data/faqData';
import { PARTNERS_DATA, PartnerItem } from '../data/partnersData';
import { PROMOTIONS_DATA, PromotionItem } from '../data/promotionsData';
import { SERVICES_DATA, TravelService } from '../data/servicesData';
import { TEAM_DATA, TeamMember } from '../data/teamData';
import { TESTIMONIALS_DATA, CustomerReviewItem } from '../data/testimonialsData';
import { ABOUT_DATA } from '../data/aboutData';
import { TOURS_DATA } from '../data/toursData';
import { saveSectionItemApi, fetchSectionItemsApi } from '../services/apiService';
import { ToastProvider, useToast } from './ui/Toast';

import './Admin.css';

export const ADMIN_SECTIONS = [
  { id: 'tours', label: 'Quản Lý Tour' },
  { id: 'bookings', label: 'Quản Lý Đơn Đặt Tour' },
  { id: 'landing-page', label: 'Quản Lý Section Landing Page' },
  { id: 'products', label: 'Sản Phẩm (Kollection 4U)' },
  { id: 'blog', label: 'Quản Lý Bài Viết' },
  { id: 'destinations', label: 'Quản Lý Điểm Đến' },
  { id: 'partners', label: 'Quản Lý Đối Tác Doanh Nghiệp' },
  { id: 'consultations', label: 'Quản Lý Lịch Hẹn Tư Vấn' },
  { id: 'custom-tours', label: 'Thiết Kế Lịch Trình Riêng' },
  { id: 'shop-orders', label: 'Đơn Hàng Kollection 4U' },
  { id: 'categories', label: 'Danh Mục Menu' },
  { id: 'users', label: 'Quản Lý Người Dùng & Phân Quyền' },
  { id: 'settings', label: 'Cấu Hình Hệ Thống' },
] as const;

export type AdminSectionId = typeof ADMIN_SECTIONS[number]['id'] | string;

interface AdminDashboardProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function AdminDashboard(props: AdminDashboardProps) {
  return (
    <ToastProvider>
      <AdminDashboardContent {...props} />
    </ToastProvider>
  );
}

function AdminDashboardContent({ currentPath, onNavigate }: AdminDashboardProps) {
  const toast = useToast();
  const { user, isAuthenticated, isLoading, logout, canAccess } = useAuth();

  const effectiveSection = useMemo<AdminSectionId>(() => {
    const match = currentPath.replace(/^\/admin\/?/, '').split('/')[0];
    const found = ADMIN_SECTIONS.find(
      (item) =>
        (item.id as string) === match ||
        (match === 'destination' && item.id === 'destinations') ||
        (match === 'partner' && item.id === 'partners') ||
        (match === 'yoga3d' && item.id === 'landing-page') ||
        (match === 'landing-section' && item.id === 'landing-page')
    );
    return (found?.id ?? 'tours') as AdminSectionId;
  }, [currentPath]);

  const [activeSection, setActiveSection] = useState<AdminSectionId>(effectiveSection);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // LIVE API DATA STATES
  const [blogsList, setBlogsList] = useState<BlogArticle[]>([]);
  const [destinationsList, setDestinationsList] = useState<Destination[]>([]);
  const [faqList, setFaqList] = useState<FAQItem[]>([]);
  const [partnersList, setPartnersList] = useState<PartnerItem[]>([]);
  const [promotionsList, setPromotionsList] = useState<PromotionItem[]>([]);
  const [servicesList, setServicesList] = useState<TravelService[]>([]);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<CustomerReviewItem[]>([]);
  const [aboutState, setAboutState] = useState({ ...ABOUT_DATA });
  const [settingsState, setSettingsState] = useState({
    supportHotline: '1900 6868 - 090 123 4567',
    adminEmail: 'booking@4utours.com',
    seoTitle: '4U Tours & Retreats International - Luxury Wellness Travel'
  });
  const [bookingsList, setBookingsList] = useState<any[]>([
    { id: 'BK-178902', customer: 'Nguyễn Văn An', phone: '0901234567', email: 'an.nguyen@gmail.com', tour: 'Hành Trình Chữa Lành Thân Tâm 3D2N', date: '15/08/2026', guests: 2, amount: 13000000, status: 'Confirmed' },
    { id: 'BK-178903', customer: 'Trần Thị Mai', phone: '0988776655', email: 'mai.tran@gmail.com', tour: 'Retreat Bảo Tồn Rừng Nguyên Sinh 4D3N', date: '20/08/2026', guests: 4, amount: 26000000, status: 'Pending' }
  ]);
  const [consultationsList, setConsultationsList] = useState<any[]>([]);
  const [customToursList, setCustomToursList] = useState<any[]>([]);
  const [shopOrdersList, setShopOrdersList] = useState<any[]>([]);

  // MODAL EDITING STATE
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editingTarget, setEditingTarget] = useState<{ section: AdminSectionId; isNew: boolean; item: any } | null>(null);

  useEffect(() => {
    setActiveSection(effectiveSection);
    setSearchFilter('');

    const loadLiveData = async () => {
      if (['analytics', 'about', 'settings'].includes(effectiveSection)) return;
      try {
        const liveItems = await fetchSectionItemsApi(effectiveSection);
        if (Array.isArray(liveItems)) {
          switch (effectiveSection) {
            case 'bookings': setBookingsList(liveItems); break;
            case 'consultations': setConsultationsList(liveItems); break;
            case 'custom-tours': setCustomToursList(liveItems); break;
            case 'shop-orders': setShopOrdersList(liveItems); break;
            case 'blog': setBlogsList(liveItems); break;
            case 'destinations': setDestinationsList(liveItems); break;
            case 'faq': setFaqList(liveItems); break;
            case 'partners': setPartnersList(liveItems); break;
            case 'promotions': setPromotionsList(liveItems); break;
            case 'services': setServicesList(liveItems); break;
            case 'team': setTeamList(liveItems); break;
            case 'testimonials': setTestimonialsList(liveItems); break;
          }
        }
      } catch (err: any) {
        console.warn('[API LOAD WARNING]', err);
      }
    };

    loadLiveData();
  }, [effectiveSection]);

  const openCreateModal = (section: AdminSectionId) => {
    let newItem: any = {};
    let title = 'Tạo Mới';

    switch (section) {
      case 'bookings':
        title = 'Thêm Đơn Đặt Tour Mới';
        newItem = { id: `BK-${Date.now()}`, customer: '', email: '', phone: '', tour: TOURS_DATA[0]?.title || 'Retreat Tour', date: '20/08/2026', guests: 2, amount: 6500000, status: 'Confirmed' };
        break;
      case 'consultations':
        title = 'Thêm Lịch Hẹn Tư Vấn Mới';
        newItem = { customerName: '', customerPhone: '', preferredCallTime: 'Sáng (8h - 12h)', tourName: 'Retreat Tour', status: 'Chưa tư vấn', note: '' };
        break;
      case 'blog':
        title = 'Tạo Bài Viết Blog Mới';
        newItem = { id: `b-${Date.now()}`, slug: `blog-${Date.now()}`, title: '', subtitle: '', category: 'Retreat', author: { name: '4U Editorial', role: 'Editor', avatar: '' }, publishedDate: 'Hôm nay', readTime: '5 min read', heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800' };
        break;
      case 'destinations':
        title = 'Thêm Điểm Đến Tĩnh Dưỡng Mới';
        newItem = { slug: `dest-${Date.now()}`, name: '', country: 'Vietnam', region: 'Đông Nam Bộ', heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800', overview: 'Mô tả chi tiết điểm đến tĩnh dưỡng...' };
        break;
      case 'faq':
        title = 'Thêm Câu Hỏi FAQ Mới';
        newItem = { id: `f-${Date.now()}`, category: 'Visa & Thủ Tục', question: '', answer: '' };
        break;
      case 'partners':
        title = 'Thêm Đối Tác Mới';
        newItem = { id: `p-${Date.now()}`, name: '', category: 'Hotel', logoText: '' };
        break;
      case 'promotions':
        title = 'Tạo Mã Ưu Đãi Voucher';
        newItem = { id: `promo-${Date.now()}`, code: 'DISCOUNT2026', title: '', subtitle: 'Ưu đãi đặc quyền 4U', discountBadge: 'GIẢM 20%', category: 'Flash Sale', expiryDate: '31/12/2026' };
        break;
      case 'services':
        title = 'Thêm Dịch Vụ Retreat Mới';
        newItem = { id: `s-${Date.now()}`, slug: `service-${Date.now()}`, title: '', subtitle: 'Dịch vụ nghỉ dưỡng cao cấp', heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800', iconName: 'Heart', description: 'Mô tả dịch vụ' };
        break;
      case 'team':
        title = 'Thêm Nhân Sự Mới';
        newItem = { id: `m-${Date.now()}`, name: '', role: 'Luxury Travel Specialist', department: 'Executive', portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', bio: 'Chuyên gia thiết kế lộ trình retreat.' };
        break;
      case 'testimonials':
        title = 'Thêm Đánh Giá Khách Hàng Mới';
        newItem = { id: `t-${Date.now()}`, name: '', country: 'Việt Nam', occupation: 'Khách hàng VIP', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', rating: 5, visitedTour: 'Wellness Retreat', travelDate: 'Tháng 8/2026', comment: '' };
        break;
    }

    setEditingTarget({ section, isNew: true, item: newItem });
    setModalTitle(title);
    setModalOpen(true);
  };

  const openEditModal = (section: AdminSectionId, item: any) => {
    setEditingTarget({ section, isNew: false, item: JSON.parse(JSON.stringify(item)) });
    setModalTitle(`Chỉnh Sửa ${section}`);
    setModalOpen(true);
  };

  const handleSaveModal = async () => {
    if (!editingTarget) return;
    const { section, isNew, item } = editingTarget;

    try {
      await saveSectionItemApi(section, isNew ? 'create' : 'update', item);
      toast.success(isNew ? `Đã tạo mới mục thành công!` : `Đã cập nhật thành công!`);
    } catch (e: any) {
      toast.error(`Thao tác thất bại: ${e?.message || e}`);
      return;
    }

    switch (section) {
      case 'bookings':
        if (isNew) setBookingsList([item, ...bookingsList]);
        else setBookingsList(bookingsList.map(b => b.id === item.id ? item : b));
        break;
      case 'consultations':
        if (isNew) setConsultationsList([item, ...consultationsList]);
        else setConsultationsList(consultationsList.map(c => c.id === item.id ? item : c));
        break;
      case 'blog':
        if (isNew) setBlogsList([item, ...blogsList]);
        else setBlogsList(blogsList.map(b => b.id === item.id ? item : b));
        break;
      case 'destinations':
        if (isNew) setDestinationsList([item, ...destinationsList]);
        else setDestinationsList(destinationsList.map(d => d.slug === item.slug ? item : d));
        break;
      case 'faq':
        if (isNew) setFaqList([item, ...faqList]);
        else setFaqList(faqList.map(f => f.id === item.id ? item : f));
        break;
      case 'partners':
        if (isNew) setPartnersList([item, ...partnersList]);
        else setPartnersList(partnersList.map(p => p.id === item.id ? item : p));
        break;
      case 'promotions':
        if (isNew) setPromotionsList([item, ...promotionsList]);
        else setPromotionsList(promotionsList.map(pr => pr.id === item.id ? item : pr));
        break;
      case 'services':
        if (isNew) setServicesList([item, ...servicesList]);
        else setServicesList(servicesList.map(s => s.id === item.id ? item : s));
        break;
      case 'team':
        if (isNew) setTeamList([item, ...teamList]);
        else setTeamList(teamList.map(m => m.id === item.id ? item : m));
        break;
      case 'testimonials':
        if (isNew) setTestimonialsList([item, ...testimonialsList]);
        else setTestimonialsList(testimonialsList.map(t => t.id === item.id ? item : t));
        break;
    }

    setModalOpen(false);
  };

  const handleDeleteItem = async (section: AdminSectionId, identifier: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) return;

    try {
      await saveSectionItemApi(section, 'delete', { id: identifier, slug: identifier });
      toast.success(`Đã xóa thành công mục khỏi ${section}!`);
    } catch (e: any) {
      toast.error(`Xóa thất bại: ${e?.message || e}`);
      return;
    }

    switch (section) {
      case 'bookings':
        setBookingsList(bookingsList.filter(b => b.id !== identifier));
        break;
      case 'consultations':
        setConsultationsList(consultationsList.filter(c => c.id !== identifier));
        break;
      case 'custom-tours':
        setCustomToursList(customToursList.filter(c => c.id !== identifier));
        break;
      case 'shop-orders':
        setShopOrdersList(shopOrdersList.filter(s => s.id !== identifier));
        break;
      case 'blog':
        setBlogsList(blogsList.filter(b => b.id !== identifier));
        break;
      case 'destinations':
        setDestinationsList(destinationsList.filter(d => d.slug !== identifier));
        break;
      case 'faq':
        setFaqList(faqList.filter(f => f.id !== identifier));
        break;
      case 'partners':
        setPartnersList(partnersList.filter(p => p.id !== identifier));
        break;
      case 'promotions':
        setPromotionsList(promotionsList.filter(p => p.id !== identifier));
        break;
      case 'services':
        setServicesList(servicesList.filter(s => s.id !== identifier));
        break;
      case 'team':
        setTeamList(teamList.filter(m => m.id !== identifier));
        break;
      case 'testimonials':
        setTestimonialsList(testimonialsList.filter(t => t.id !== identifier));
        break;
    }
  };

  const permittedSections = useMemo(() => {
    return ADMIN_SECTIONS.filter((sec) => canAccess(sec.id));
  }, [canAccess]);

  useEffect(() => {
    if (permittedSections.length > 0 && !permittedSections.some(s => s.id === activeSection)) {
      setActiveSection(permittedSections[0].id);
    }
  }, [permittedSections, activeSection]);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const refreshSectionData = async (section?: AdminSectionId) => {
    const target = section || activeSection;
    if (['analytics', 'about', 'settings'].includes(target)) return;
    setIsRefreshing(true);
    try {
      const liveItems = await fetchSectionItemsApi(target, true);
      if (Array.isArray(liveItems)) {
        switch (target) {
          case 'bookings': setBookingsList(liveItems); break;
          case 'consultations': setConsultationsList(liveItems); break;
          case 'custom-tours': setCustomToursList(liveItems); break;
          case 'shop-orders': setShopOrdersList(liveItems); break;
          case 'blog': setBlogsList(liveItems); break;
          case 'destinations': setDestinationsList(liveItems); break;
          case 'faq': setFaqList(liveItems); break;
          case 'partners': setPartnersList(liveItems); break;
          case 'promotions': setPromotionsList(liveItems); break;
          case 'services': setServicesList(liveItems); break;
          case 'team': setTeamList(liveItems); break;
          case 'testimonials': setTestimonialsList(liveItems); break;
        }
        toast.success('Đã làm mới dữ liệu thành công!');
      }
    } catch (err: any) {
      toast.error(`Làm mới thất bại: ${err?.message || err}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleBookingStatusUpdate = async (item: any, newStatus: string) => {
    try {
      await saveSectionItemApi('bookings', 'update', { id: item.id, status: newStatus });
      setBookingsList(prev => prev.map(b => b.id === item.id ? { ...b, status: newStatus } : b));
      toast.success(`Đã cập nhật trạng thái đơn đặt tour sang "${newStatus}"!`);
    } catch (e: any) {
      toast.error(`Cập nhật thất bại: ${e?.message || e}`);
    }
  };

  const handleConsultationStatusUpdate = async (item: any, newStatus: string) => {
    try {
      await saveSectionItemApi('consultations', 'update', { id: item.id, status: newStatus });
      setConsultationsList(prev => prev.map(c => c.id === item.id ? { ...c, status: newStatus } : c));
      toast.success(`Đã cập nhật trạng thái lịch tư vấn sang "${newStatus}"!`);
    } catch (e: any) {
      toast.error(`Cập nhật thất bại: ${e?.message || e}`);
    }
  };

  const handleCustomTourStatusUpdate = async (item: any, newStatus: string) => {
    try {
      await saveSectionItemApi('custom-tours', 'update', { id: item.id, status: newStatus });
      setCustomToursList(prev => prev.map(c => c.id === item.id ? { ...c, status: newStatus } : c));
      toast.success(`Đã cập nhật trạng thái yêu cầu thiết kế sang "${newStatus}"!`);
    } catch (e: any) {
      toast.error(`Cập nhật thất bại: ${e?.message || e}`);
    }
  };

  const handleShopOrderStatusUpdate = async (item: any, newStatus: string) => {
    try {
      await saveSectionItemApi('shop-orders', 'update', { id: item.id, status: newStatus });
      setShopOrdersList(prev => prev.map(s => s.id === item.id ? { ...s, status: newStatus } : s));
      toast.success(`Đã cập nhật trạng thái đơn hàng sang "${newStatus}"!`);
    } catch (e: any) {
      toast.error(`Cập nhật thất bại: ${e?.message || e}`);
    }
  };

  const handleSelectSection = (secId: AdminSectionId) => {
    if (!canAccess(secId)) {
      toast.error('Bạn không có quyền truy cập mục này.');
      return;
    }
    setActiveSection(secId);
    onNavigate(`/admin/${secId}`);
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị không?')) {
      logout();
      toast.success('Đã đăng xuất an toàn.');
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#081f13', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #0f766e', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
          <span style={{ fontSize: '13.5px', color: '#94a3b8' }}>Đang xác thực quyền truy cập quản trị...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <AdminLoginPage onNavigateHome={() => onNavigate('/')} />;
  }

  const roleConfig = ROLE_LABELS[user.role] || ROLE_LABELS.consultant;

  return (
    <div className="serene-admin-layout">
      {/* UNIFIED TOP BRAND HEADER BAR */}
      <header className="serene-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', backgroundColor: '#081f13', color: '#ffffff', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="/Logo-4U-Wellness.png"
            alt="4U Wellness Logo"
            style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <span style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '15px', fontWeight: 700, letterSpacing: '0.08em', color: '#ffffff' }}>
            ADMIN CONSOLE
          </span>
          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#34d399',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            {roleConfig.label}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '13px' }}>
            <span style={{ color: '#94a3b8' }}>Xin chào,</span>
            <strong style={{ color: '#ffffff' }}>{user.fullName}</strong>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Đăng xuất khỏi hệ thống"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)')}
          >
            <LogOut size={13} />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* UNIFIED SINGLE SIDEBAR MENU */}
        <aside
          className="serene-sidebar"
          style={{
            width: '260px',
            minWidth: '260px',
            flexShrink: 0,
            backgroundColor: '#06170e',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            position: 'sticky',
            top: '64px',
            height: 'calc(100vh - 64px)',
            alignSelf: 'flex-start',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ padding: '0 12px 16px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Danh Mục Quản Trị
            </p>
          </div>

          {permittedSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSelectSection(sec.id)}
              className={`serene-sidebar-item ${activeSection === sec.id ? 'active' : ''}`}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeSection === sec.id ? '#081f13' : 'transparent',
                color: activeSection === sec.id ? '#ffffff' : '#a1bfa9',
                fontSize: '13.5px',
                fontWeight: activeSection === sec.id ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{sec.label}</span>
            </button>
          ))}

          {/* USER INFO PROFILE CARD AT BOTTOM */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#0f766e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  flexShrink: 0
                }}
              >
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.fullName}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  <span>@{user.username}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE AREA RENDERING MODULAR TSX COMPONENTS */}
        <main className="serene-main" style={{ flex: 1, minWidth: 0, backgroundColor: '#f4f5f3', padding: '28px 36px 120px 36px', minHeight: 'calc(100vh - 64px)', boxSizing: 'border-box' }}>
          {!canAccess(activeSection) ? (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', textAlign: 'center', border: '1px solid #fee2e2' }}>
              <AlertTriangle size={36} color="#dc2626" style={{ margin: '0 auto 12px auto' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#991b1b', margin: '0 0 8px 0' }}>
                403 • Không Có Quyền Truy Cập
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                Vai trò của bạn ({roleConfig.label}) không được cấp quyền xem hoặc chỉnh sửa mục này.
              </p>
            </div>
          ) : (
            <>
              {activeSection === 'tours' && <AdminToursManager toast={toast} onNavigate={onNavigate} />}
              {(activeSection === 'landing-page' || activeSection === 'yoga3d') && <AdminLandingSectionManager toast={toast} />}
              {activeSection === 'products' && <AdminProductsManager toast={toast} onNavigate={onNavigate} />}
              {activeSection === 'categories' && <AdminCategoriesManager toast={toast} />}
              {activeSection === 'users' && <AdminUsersManager toast={toast} />}
              {activeSection === 'bookings' && <AdminBookingsManager bookingsList={bookingsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} handleStatusUpdate={handleBookingStatusUpdate} onReload={() => refreshSectionData('bookings')} isReloading={isRefreshing} />}
              {activeSection === 'consultations' && <AdminConsultationsManager consultationsList={consultationsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} handleStatusUpdate={handleConsultationStatusUpdate} onReload={() => refreshSectionData('consultations')} isReloading={isRefreshing} />}
              {activeSection === 'custom-tours' && <AdminCustomToursManager customToursList={customToursList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} handleStatusUpdate={handleCustomTourStatusUpdate} onReload={() => refreshSectionData('custom-tours')} isReloading={isRefreshing} />}
              {activeSection === 'shop-orders' && <AdminShopOrdersManager shopOrdersList={shopOrdersList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} handleStatusUpdate={handleShopOrderStatusUpdate} onReload={() => refreshSectionData('shop-orders')} isReloading={isRefreshing} />}
              {activeSection === 'analytics' && <AdminAnalyticsManager />}
              {activeSection === 'about' && <AdminAboutManager aboutState={aboutState} setAboutState={setAboutState} toast={toast} />}
              {activeSection === 'blog' && <AdminBlogManager blogsList={blogsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'destinations' && <AdminDestinationsManager destinationsList={destinationsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'faq' && <AdminFaqManager faqList={faqList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'partners' && <AdminPartnersManager partnersList={partnersList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'promotions' && <AdminPromotionsManager promotionsList={promotionsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'services' && <AdminServicesManager servicesList={servicesList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'team' && <AdminTeamManager teamList={teamList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'testimonials' && <AdminTestimonialsManager testimonialsList={testimonialsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
              {activeSection === 'settings' && <AdminSettingsManager settingsState={settingsState} setSettingsState={setSettingsState} toast={toast} />}
            </>
          )}
        </main>
      </div>

      {/* GENERIC MODAL FOR EDITING ITEMS */}
      {modalOpen && editingTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', margin: '0 0 20px 0', color: '#081f13' }}>{modalTitle}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.keys(editingTarget.item).map((key) => {
                if (key === 'id' && !editingTarget.isNew) return null;
                const val = editingTarget.item[key];
                if (typeof val === 'object' && val !== null) return null;

                if (key === 'region') {
                  const REGION_PRESETS = [
                    { group: '🏔️ Miền Bắc', options: ['Đông Bắc Bộ', 'Tây Bắc Bộ', 'Đồng Bằng Sông Hồng', 'Miền Bắc'] },
                    { group: '🏛️ Miền Trung', options: ['Bắc Trung Bộ', 'Duyên Hải Nam Trung Bộ', 'Miền Trung'] },
                    { group: '🌲 Tây Nguyên', options: ['Tây Nguyên'] },
                    { group: '🏝️ Miền Nam', options: ['Đông Nam Bộ', 'Đồng Bằng Sông Cửu Long', 'Miền Nam'] },
                    { group: '🌏 Quốc Tế', options: ['Quốc Tế', 'Đông Nam Á', 'Châu Á', 'Châu Âu'] },
                  ];

                  return (
                    <div key={key}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                        Phân Vùng Miền (Region)
                      </label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select
                          value={val ?? ''}
                          onChange={(e) => {
                            setEditingTarget({
                              ...editingTarget,
                              item: { ...editingTarget.item, [key]: e.target.value }
                            });
                          }}
                          style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.18)', fontSize: '14px', backgroundColor: '#ffffff' }}
                        >
                          <option value="">-- Chọn Phân Vùng Miền --</option>
                          {REGION_PRESETS.map((group) => (
                            <optgroup key={group.group} label={group.group}>
                              {group.options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Hoặc tự nhập tên vùng..."
                          value={val ?? ''}
                          onChange={(e) => {
                            setEditingTarget({
                              ...editingTarget,
                              item: { ...editingTarget.item, [key]: e.target.value }
                            });
                          }}
                          style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.18)', fontSize: '14px' }}
                        />
                      </div>
                    </div>
                  );
                }

                if (['overview', 'history', 'description', 'content', 'culture', 'visaInfo', 'transportation', 'answer'].includes(key)) {
                  return (
                    <div key={key}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                        {key}
                      </label>
                      <textarea
                        rows={4}
                        value={val ?? ''}
                        onChange={(e) => {
                          setEditingTarget({
                            ...editingTarget,
                            item: { ...editingTarget.item, [key]: e.target.value }
                          });
                        }}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.18)', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                    </div>
                  );
                }

                return (
                  <div key={key}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>{key}</label>
                    <input
                      type="text"
                      value={val ?? ''}
                      onChange={(e) => {
                        setEditingTarget({
                          ...editingTarget,
                          item: { ...editingTarget.item, [key]: e.target.value }
                        });
                      }}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
                    />
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setModalOpen(false)} style={{ backgroundColor: '#ffffff', color: '#525a54', border: '1px solid rgba(6,27,14,0.15)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Hủy Bỏ</button>
              <button onClick={handleSaveModal} style={{ backgroundColor: '#081f13', color: '#ffffff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Lưu Thay Đổi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
