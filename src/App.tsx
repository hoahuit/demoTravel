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

export default function App() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

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

  const isProductRoute = currentPath.startsWith('/sanpham/') || currentPath.startsWith('/productdetail') || currentPath === '/productdetail';
  const productSlug = currentPath.replace('/sanpham/', '').replace('/productdetail', '').replace(/\//g, '') || 'retreat-chua-lanh';

  return (
    <div className="apple-app" style={{ minHeight: '100vh', background: 'var(--apple-bg)' }}>
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Booking Calendar & Scroll-to-Top Floating Modal */}
      <BookingModal externalOpen={bookingOpen} onExternalClose={() => setBookingOpen(false)} />

      {/* Header */}
      <Header onOpenSearch={() => setSearchOpen(true)} onNavigate={navigateTo} />

      {/* Conditional Route Rendering */}
      {isProductRoute ? (
        <ProductDetail
          productSlug={productSlug}
          onBackHome={() => navigateTo('/')}
          onOpenBooking={() => setBookingOpen(true)}
        />
      ) : (
        <main>
          {/* Section 1: Apple Product Feature Hero */}
          <Hero />

          {/* Section 2: 4U Bento Grid Signature Combos & Deals */}
          <BentoGrid />

          {/* Section 3: Target Audience Bento Grid & Trusted By Marquee ("Whom are 4U for?") */}
          <AudienceBento />

          {/* Section 4: Testimonials Editorial Section */}
          <Testimonials />
        </main>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
