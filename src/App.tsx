import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchModal from './components/SearchModal';
import BookingModal from './components/BookingModal';
import ProductDetail from './components/ProductDetail';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import AudienceBento from './components/AudienceBento';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

import ToursPage from './components/ToursPage';
import DestinationsPage from './components/DestinationsPage';
import ServicesPage from './components/ServicesPage';
import BlogPage from './components/BlogPage';
import AboutPage from './components/AboutPage';
import PromotionsPage from './components/PromotionsPage';
import FAQPage from './components/FAQPage';

import RetreatDocQuyen from './pages/retreat/retreatdocquyen/RetreatDocQuyen';
import SapKhoiHanh from './pages/retreat/sapkhoihanh/SapKhoiHanh';
import KhongTheBoLo from './pages/retreat/khongthebolo/KhongTheBoLo';
import UuDaiGioChot from './pages/retreat/uudaigiochot/UuDaiGioChot';
import RetreatHot from './pages/retreat/retreathot/RetreatHot';

export default function App() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [bookingState, setBookingState] = useState<{ open: boolean; tour: any }>({ open: false, tour: null });
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  const handleOpenBooking = (tourData?: any) => {
    setBookingState({ open: true, tour: tourData || null });
  };

  const handleCloseBooking = () => {
    setBookingState({ open: false, tour: null });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isProductRoute = currentPath.startsWith('/sanpham/') || currentPath.startsWith('/productdetail');
  const productSlug = currentPath.replace('/sanpham/', '').replace('/productdetail', '').replace(/\//g, '') || 'retreat-chua-lanh';

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

  const isToursRoute =
    currentPath.startsWith('/tours') ||
    currentPath.startsWith('/series-retreat') ||
    currentPath.startsWith('/kollection-4u');

  const isBlogRoute =
    currentPath.startsWith('/101-dieu-hay/blog') ||
    currentPath.startsWith('/101-dieu-hay/a-tip-a-day') ||
    currentPath.startsWith('/101-dieu-hay') ||
    currentPath.startsWith('/blog') ||
    currentPath.startsWith('/tin-tuc');

  const isFaqRoute =
    currentPath.startsWith('/vi-sao-chon-4u/cau-hoi-thuong-gap') ||
    currentPath.startsWith('/faq') ||
    currentPath.startsWith('/hoi-dap');

  const isAboutRoute =
    currentPath.startsWith('/vi-sao-chon-4u') ||
    currentPath.startsWith('/about') ||
    currentPath.startsWith('/ve-chung-toi');

  const isPromotionsRoute =
    currentPath.startsWith('/kollection-4u/promotions') ||
    currentPath.startsWith('/promotions') ||
    currentPath.startsWith('/uu-dai');

  const isDestinationsRoute = currentPath.startsWith('/destinations') || currentPath.startsWith('/diem-den');
  const isServicesRoute = currentPath.startsWith('/services') || currentPath.startsWith('/dich-vu');

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
      return <RetreatHot onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isToursRoute) {
      return <ToursPage currentPath={currentPath} onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isDestinationsRoute) {
      return <DestinationsPage onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isServicesRoute) {
      return <ServicesPage onOpenBooking={handleOpenBooking} />;
    }
    if (isBlogRoute) {
      return <BlogPage onNavigate={navigateTo} />;
    }
    if (isAboutRoute) {
      return <AboutPage />;
    }
    if (isPromotionsRoute) {
      return <PromotionsPage onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />;
    }
    if (isFaqRoute) {
      return <FAQPage />;
    }

    return (
      <main>
        {/* Section 1: Apple Product Feature Hero */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Section 2: Target Audience 3D Carousel */}
        <AudienceBento onOpenBooking={handleOpenBooking} onNavigate={navigateTo} />

        {/* Section 3: 4U Signature Retreats Bento Showcase */}
        <BentoGrid onNavigate={navigateTo} onOpenBooking={handleOpenBooking} />

        {/* Section 4: Testimonials Editorial Section */}
        <Testimonials />
      </main>
    );
  };

  return (
    <div className="apple-app" style={{ minHeight: '100vh', background: 'var(--apple-bg)' }}>
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Booking Calendar & Scroll-to-Top Floating Modal with PayPal Payment */}
      <BookingModal
        externalOpen={bookingState.open}
        onExternalClose={handleCloseBooking}
        selectedTour={bookingState.tour}
      />

      {/* Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onNavigate={navigateTo}
        onOpenBooking={handleOpenBooking}
      />

      {/* Conditional Route Rendering */}
      {renderCurrentRoute()}

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
