import React, { useEffect, useMemo, useState } from 'react';
import AdminToursManager from './admin/AdminToursManager';
import AdminBookingsManager from './admin/AdminBookingsManager';
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
  { id: 'tours', label: 'Tours Du Lịch' },
  { id: 'bookings', label: 'Đơn Đặt Tour' },
  { id: 'analytics', label: 'Thống Kê & Báo Cáo' },
  { id: 'about', label: 'Giới Thiệu 4U' },
  { id: 'blog', label: 'Bài Viết Blog' },
  { id: 'destinations', label: 'Điểm Đến Tĩnh Dưỡng' },
  { id: 'faq', label: 'Câu Hỏi Thường Gặp' },
  { id: 'partners', label: 'Đối Tác Doanh Nghiệp' },
  { id: 'promotions', label: 'Mã Ưu Đãi & Voucher' },
  { id: 'services', label: 'Dịch Vụ Retreat' },
  { id: 'team', label: 'Đội Ngũ Nhân Sự' },
  { id: 'testimonials', label: 'Đánh Giá Khách Hàng' },
  { id: 'settings', label: 'Cấu Hình Hệ Thống' },
] as const;

export type AdminSectionId = typeof ADMIN_SECTIONS[number]['id'];

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
  const effectiveSection = useMemo<AdminSectionId>(() => {
    const match = currentPath.replace(/^\/admin\/?/, '').split('/')[0];
    const found = ADMIN_SECTIONS.find((item) => item.id === match || (match === 'destination' && item.id === 'destinations') || (match === 'partner' && item.id === 'partners') || (match === 'promotion' && item.id === 'promotions') || (match === 'service' && item.id === 'services') || (match === 'testimonial' && item.id === 'testimonials'));
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

  const handleSelectSection = (sectionId: AdminSectionId) => {
    setActiveSection(sectionId);
    onNavigate(`/admin/${sectionId}`);
  };

  const openCreateModal = (section: AdminSectionId) => {
    let newItem: any = {};
    let title = 'Tạo Mới';

    switch (section) {
      case 'bookings':
        title = 'Thêm Đơn Đặt Tour Mới';
        newItem = { id: `BK-${Date.now()}`, customer: '', email: '', phone: '', tour: TOURS_DATA[0]?.title || 'Retreat Tour', date: '20/08/2026', guests: 2, amount: 6500000, status: 'Confirmed' };
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

  return (
    <div className="serene-admin-layout">
      {/* UNIFIED TOP BRAND HEADER BAR */}
      <header className="serene-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', backgroundColor: '#081f13', color: '#ffffff', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, letterSpacing: '0.08em', color: '#ffffff' }}>
            4U RETREAT ADMIN
          </span>
          <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: 'rgba(255,255,255,0.12)', color: '#d1fae5', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Hệ Thống Quản Trị Trung Tâm
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '13px', color: '#a1bfa9' }}>
            Đang quản lý: <strong style={{ color: '#ffffff' }}>{ADMIN_SECTIONS.find(s => s.id === activeSection)?.label}</strong>
          </span>
          <button
            onClick={() => onNavigate('/')}
            style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
          >
            Về Trang Chủ Client
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* UNIFIED SINGLE SIDEBAR MENU */}
        <aside className="serene-sidebar" style={{ width: '250px', backgroundColor: '#06170e', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '6px', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ padding: '0 12px 16px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#819986', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Danh Mục Quản Trị
            </p>
          </div>

          {ADMIN_SECTIONS.map((sec) => (
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
                fontSize: '14px',
                fontWeight: activeSection === sec.id ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{sec.label}</span>
            </button>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#a1bfa9', fontSize: '12px' }}>
            Hệ Thống Quản Trị 4U Retreat v2.5
          </div>
        </aside>

        {/* MAIN WORKSPACE AREA RENDERING MODULAR TSX COMPONENTS */}
        <main className="serene-main" style={{ flex: 1, backgroundColor: '#f4f5f3', padding: '28px', minHeight: 'calc(100vh - 64px)' }}>
          {activeSection === 'tours' && <AdminToursManager toast={toast} onNavigate={onNavigate} />}
          {activeSection === 'bookings' && <AdminBookingsManager bookingsList={bookingsList} searchFilter={searchFilter} setSearchFilter={setSearchFilter} openCreateModal={openCreateModal} openEditModal={openEditModal} handleDeleteItem={handleDeleteItem} />}
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

                return (
                  <div key={key}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>{key}</label>
                    <input
                      type="text"
                      value={val ?? ''}
                      onChange={(e) => {
                        setEditingTarget({
                          ...editingTarget,
                          item: { ...editingTarget.item, [key]: e.target.value }
                        });
                      }}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(6, 27, 14, 0.15)', fontSize: '14px' }}
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
