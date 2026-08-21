import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchModal from './components/SearchModal';
import BookingModal from './components/BookingModal';
import ConsultationModal from './components/ConsultationModal';
import CreateCustomTourModal from './components/CreateCustomTourModal';
import ProductDetail from './components/ProductDetail';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import AudienceBento from './components/AudienceBento';
import Testimonials from './components/Testimonials';
import PartnerLogos from './components/PartnerLogos';
import Footer from './components/Footer';

import ToursPage from './components/ToursPage';
import DestinationsPage from './components/DestinationsPage';
import ServicesPage from './components/ServicesPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import PromotionsPage from './components/PromotionsPage';
import FAQPage from './components/FAQPage';
import KollectionShopPage from './components/KollectionShopPage';


import RetreatDocQuyen from './pages/retreat/retreatdocquyen/RetreatDocQuyen';
import SapKhoiHanh from './pages/retreat/sapkhoihanh/SapKhoiHanh';
import KhongTheBoLo from './pages/retreat/khongthebolo/KhongTheBoLo';
import UuDaiGioChot from './pages/retreat/uudaigiochot/UuDaiGioChot';
import RetreatHot from './pages/retreat/retreathot/RetreatHot';
import KhongTheBoLoSection from './components/KhongTheBoLoSection';
import UuDaiGioChotSection from './components/UuDaiGioChotSection';
import KhamPhaDiemDenSection from './components/KhamPhaDiemDenSection';
import KollectionSection from './components/KollectionSection';
import DepartureCalendarModal from './components/DepartureCalendarModal';
import AdminDashboard from './components/AdminDashboard';
import AdminTourEditor from './components/AdminTourEditor';
import { fetchToursApi, fetchSectionItemsApi } from './services/apiService';
import { syncToursDataFromApi } from './data/toursData';
import { syncBlogsDataFromApi } from './data/blogsData';
import { syncDestinationsDataFromApi } from './data/destinationsData';
import { syncFaqDataFromApi } from './data/faqData';
import { syncPartnersDataFromApi } from './data/partnersData';
import { syncPromotionsDataFromApi } from './data/promotionsData';
import { syncServicesDataFromApi } from './data/servicesData';
import { syncTeamDataFromApi } from './data/teamData';
import { syncTestimonialsDataFromApi } from './data/testimonialsData';
import { syncAboutDataFromApi } from './data/aboutData';

export default function App() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [bookingState, setBookingState] = useState<{ open: boolean; tour: any }>({ open: false, tour: null });
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [customTourState, setCustomTourState] = useState<{ open: boolean; destination?: string }>({ open: false });
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // PayPal Booking Modal — triggered by "Đặt Ngay" buttons
  const handleOpenBooking = (tourData?: any) => {
    setBookingState({ open: true, tour: tourData || null });
  };

  const handleCloseBooking = () => {
    setBookingState({ open: false, tour: null });
  };

  // Custom Tour Builder Modal — triggered by "Tạo lịch trình đến [Điểm đến] ngay"
  const handleOpenCustomTour = (destination?: string) => {
    setCustomTourState({ open: true, destination });
  };

  const handleCloseCustomTour = () => {
    setCustomTourState({ open: false });
  };

  // Consultation Modal — triggered by "Nhận tư vấn" button & floating button
  const handleOpenConsultation = () => {
    setConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setConsultationOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    // Fetch initial tours data from Backend API once on startup
    const loadInitialData = async () => {
      try {
        const tours = await fetchToursApi();
        if (Array.isArray(tours) && tours.length > 0) {
          syncToursDataFromApi(tours);
        }
      } catch (err) {
        console.warn('[CLIENT INIT DATA WARNING]', err);
      }
    };

    loadInitialData();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const normalizeSlug = (path: string) => {
    return path
      .trim()
      .toLowerCase()
      .replace(/^\/+/, '')
      .replace(/^(sanpham|san-pham|productdetail|tours|tour|detail)\/?/, '')
      .split(/[?#]/)[0]
      .replace(/\/$/, '');
  };

  const isProductRoute =
    currentPath.startsWith('/tour/') ||
    currentPath.startsWith('/sanpham/') ||
    currentPath.startsWith('/san-pham/') ||
    currentPath.startsWith('/productdetail') ||
    currentPath.startsWith('/detail/') ||
    (currentPath.startsWith('/tours/') && currentPath !== '/tours' && currentPath !== '/tours/' && !currentPath.startsWith('/tours?'));
  const productSlug = normalizeSlug(currentPath) || 'retreat-chua-lanh';

  const isRetreatDocQuyenRoute = currentPath.startsWith('/retreat/docquyen') || currentPath.startsWith('/retreats-doc-quyen');
  const isSapKhoiHanhRoute = currentPath.startsWith('/retreat/sapkhoihanh') || currentPath.startsWith('/sap-khoi-hanh');
  const isKhongTheBoLoRoute = currentPath.startsWith('/retreat/khongthebolo') || currentPath.startsWith('/khong-the-khong-co');
  const isUuDaiGioChotRoute =
    currentPath.startsWith('/retreat/uudaigiochot') ||
    currentPath.startsWith('/uu-dai-gio-chot') ||
    currentPath.startsWith('/kollection-4u/promotions') ||
    currentPath.startsWith('/promotions') ||
    currentPath.startsWith('/uu-dai');

  const isRetreatHotRoute = currentPath.startsWith('/retreat/retreathot') || currentPath.startsWith('/retreat/hot') || currentPath.startsWith('/retreat-hot') || currentPath === '/retreat';

  const isKollectionRoute =
    currentPath.startsWith('/kollection-4u') ||
    currentPath.startsWith('/kollection') ||
    currentPath.startsWith('/san-pham-vat-ly') ||
    currentPath.startsWith('/shop') ||
    currentPath.startsWith('/store');

  const isToursRoute =
    currentPath === '/tours' ||
    currentPath === '/tours/' ||
    currentPath.startsWith('/tours?') ||
    currentPath.startsWith('/series-retreat') ||
    currentPath.startsWith('/chua-lanh') ||
    currentPath.startsWith('/bao-ton') ||
    currentPath.startsWith('/thien-nhien') ||
    currentPath.startsWith('/thien-nguyen');

  const isBlogRoute =
    currentPath.startsWith('/101-dieu-hay/blog') ||
    currentPath.startsWith('/101-dieu-hay/a-tip-a-day') ||
    currentPath.startsWith('/101-dieu-hay') ||
    currentPath.startsWith('/dieu-hay') ||
    currentPath.startsWith('/blog') ||
    currentPath.startsWith('/tin-tuc') ||
    currentPath.startsWith('/bai-viet');

  const isFaqRoute =
    currentPath.startsWith('/vi-sao-chon-4u/cau-hoi-thuong-gap') ||
    currentPath.startsWith('/cau-hoi-thuong-gap') ||
    currentPath.startsWith('/faq') ||
    currentPath.startsWith('/hoi-dap');

  const isAboutRoute =
    currentPath.startsWith('/vi-sao-chon-4u') ||
    currentPath.startsWith('/about') ||
    currentPath.startsWith('/ve-chung-toi') ||
    currentPath.startsWith('/gioi-thieu');

  const isPromotionsRoute =
    currentPath.startsWith('/kollection-4u/promotions') ||
    currentPath.startsWith('/promotions') ||
    currentPath.startsWith('/uu-dai') ||
    currentPath.startsWith('/khuyen-mai');

  const isDestinationsRoute =
    currentPath.startsWith('/destinations') ||
    currentPath.startsWith('/diem-den') ||
    currentPath.startsWith('/kham-pha-diem-den');
  const isServicesRoute = currentPath.startsWith('/services') || currentPath.startsWith('/dich-vu');
  const isAdminRoute = currentPath.startsWith('/admin');

  const renderCurrentRoute = () => {
    if (isProductRoute) {
      return <ProductDetail productSlug={productSlug} onBackHome={() => navigateTo('/')} onOpenBooking={handleOpenBooking} />;
    }
    if (isRetreatDocQuyenRoute) {
      return <RetreatDocQuyen onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isSapKhoiHanhRoute) {
      return <SapKhoiHanh onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isKhongTheBoLoRoute) {
      return <KhongTheBoLo onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isUuDaiGioChotRoute) {
      return <UuDaiGioChot onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isRetreatHotRoute) {
      return <RetreatHot currentPath={currentPath} onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isKollectionRoute) {
      return <KollectionShopPage currentPath={currentPath} onNavigate={navigateTo} />;
    }
    if (isDestinationsRoute) {
      return <DestinationsPage currentPath={currentPath} onNavigate={navigateTo} onOpenBooking={handleOpenBooking} onOpenCustomTour={handleOpenCustomTour} />;
    }
    if (isBlogRoute) {
      return <BlogPage currentPath={currentPath} onNavigate={navigateTo} onOpenBooking={handleOpenBooking} onOpenCustomTour={handleOpenCustomTour} />;
    }
    if (isToursRoute) {
      return <ToursPage currentPath={currentPath} onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isAdminRoute) {
      return <AdminDashboard currentPath={currentPath} onNavigate={navigateTo} />;
    }
    if (isServicesRoute) {
      return <ServicesPage onOpenBooking={handleOpenBooking} />;
    }
    if (isAboutRoute) {
      return <AboutPage onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isPromotionsRoute) {
      return <PromotionsPage onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isFaqRoute) {
      return <FAQPage />;
    }

    return (
      <main>
        {/* Section 1: Hero */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenCustomTour={handleOpenCustomTour}
        />

        {/* Section 2: Sản Phẩm Retreat Độc Quyền (3D Carousel) */}
        <AudienceBento onOpenBooking={handleOpenBooking} onNavigate={navigateTo} />

        {/* Section 3: Sản Phẩm Sắp Khởi Hành (Bento Grid) */}
        <BentoGrid onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />

        {/* Section 4: Trải Nghiệm Không Thể Bỏ Lỡ */}
        <KhongTheBoLoSection onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />

        {/* Section 5: Ưu Đãi Giờ Chót */}
        <UuDaiGioChotSection onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />

        {/* Section 6: Khám Phá Những Điểm Đến Tuyệt Vời (5 Items) */}
        <KhamPhaDiemDenSection
          onNavigate={navigateTo}
          onOpenBooking={handleOpenBooking}
          onOpenCustomTour={handleOpenCustomTour}
        />

        {/* Section 7: Kollection 4U (Vật Phẩm Tĩnh Dưỡng Độc Bản) */}
        <KollectionSection onNavigate={navigateTo} />

        {/* Section 8: Đối Tác Doanh Nghiệp & Thương Hiệu Đồng Hành */}
        <PartnerLogos />
      </main>
    );
  };

  return (
    <div className="apple-app" style={{ minHeight: '100vh', background: 'var(--apple-bg)' }}>
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigateTo} />

      {/* PayPal Checkout Modal — only for "Đặt Ngay" */}
      <BookingModal
        externalOpen={bookingState.open}
        onExternalClose={handleCloseBooking}
        selectedTour={bookingState.tour}
      />

      {/* Consultation Lead Form Modal — for "Nhận tư vấn" + Floating button */}
      <ConsultationModal
        externalOpen={consultationOpen}
        onExternalClose={handleCloseConsultation}
      />

      {/* Interactive Departure Calendar Modal — opened by "Lịch khởi hành" button */}
      <DepartureCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onOpenBooking={handleOpenBooking}
        onNavigate={navigateTo}
      />

      {/* Create Custom Tour Modal — opened by "Tạo Lịch Trình Đến ... Ngay" button */}
      <CreateCustomTourModal
        isOpen={customTourState.open}
        onClose={handleCloseCustomTour}
        initialDestination={customTourState.destination}
      />

      {/* Header — "Nhận tư vấn" opens Consultation Modal, "Lịch khởi hành" opens Departure Calendar */}
      {!isAdminRoute && (
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onNavigate={navigateTo}
          onOpenBooking={handleOpenConsultation}
          onOpenCalendar={() => setCalendarOpen(true)}
          onOpenCustomTour={handleOpenCustomTour}
        />
      )}

      {/* Conditional Route Rendering */}
      {renderCurrentRoute()}

      {/* Footer */}
      {!isAdminRoute && <Footer onNavigate={navigateTo} />}
    </div>
  );
}
