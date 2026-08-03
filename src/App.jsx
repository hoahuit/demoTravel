import React, { useState } from 'react';
import Header from './components/Header';
import SearchModal from './components/SearchModal';
import Hero from './components/Hero';
import InfiniteSlider from './components/InfiniteSlider';
import BentoGrid from './components/BentoGrid';
import AudienceBento from './components/AudienceBento';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="apple-app" style={{ minHeight: '100vh', background: 'var(--apple-bg)' }}>
      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Header */}
      <Header onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Sections */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
