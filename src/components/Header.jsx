import React, { useState, useEffect } from 'react';
import { Search, Compass, Menu, X, Phone, ShieldCheck, Tag } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Signatures 4U', href: '#signatures' },
    { label: 'Just Released', href: '#just-released' },
    { label: "Today's Deal", href: '#todays-deal', badge: 'Hot' },
    { label: 'Last Minute', href: '#last-minute' },
    { label: 'Retreat Series', href: '#retreats' },
    { label: 'About 4U', href: '#about' },
  ];

  return (
    <>
      <header className={`apple-glass ${scrolled ? 'scrolled' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.35s ease',
        padding: scrolled ? '12px 0' : '18px 0',
        background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none'
      }}>
        <div className="apple-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: scrolled ? '#1d1d1f' : '#ffffff' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: scrolled ? 'linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)' : 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              backdropFilter: scrolled ? 'none' : 'blur(10px)'
            }}>
              <Compass size={22} color="#c9a050" />
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.3rem', letterSpacing: '-0.03em' }}>4U</span>
              <span style={{ fontWeight: '400', fontSize: '1.3rem', color: scrolled ? '#86868b' : 'rgba(255,255,255,0.8)', marginLeft: '4px' }}>Tours</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: scrolled ? '#1d1d1f' : '#ffffff',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.target.style.color = scrolled ? '#0066cc' : '#c9a050'}
                onMouseLeave={(e) => e.target.style.color = scrolled ? '#1d1d1f' : '#ffffff'}
              >
                {item.label}
                {item.badge && (
                  <span style={{
                    background: '#e30050',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '8px',
                    textTransform: 'uppercase'
                  }}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Controls: Search & Contact */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                border: scrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.3)',
                background: scrolled ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: scrolled ? '#86868b' : 'rgba(255,255,255,0.9)',
                backdropFilter: scrolled ? 'none' : 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
            >
              <Search size={16} color={scrolled ? '#1d1d1f' : '#ffffff'} />
              <span className="hide-mobile">Search...</span>
              <kbd style={{
                background: scrolled ? '#ffffff' : 'rgba(255,255,255,0.25)',
                color: scrolled ? '#1d1d1f' : '#ffffff',
                padding: '2px 6px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>⌘K</kbd>
            </button>

            <a 
              href="tel:0764886877" 
              className="apple-btn-primary hide-mobile" 
              style={{ 
                padding: '8px 18px', 
                fontSize: '0.85rem',
                background: scrolled ? '#1d1d1f' : '#c9a050',
                color: '#ffffff'
              }}
            >
              <Phone size={15} /> 076 488 6877
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                color: scrolled ? '#1d1d1f' : '#ffffff'
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          top: '70px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1d1d1f',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '12px'
              }}
            >
              {item.label}
            </a>
          ))}
          <a href="tel:0764886877" className="apple-btn-primary" style={{ marginTop: '20px', width: '100%' }}>
            <Phone size={18} /> Call Hotline: 076 488 6877
          </a>
        </div>
      )}
    </>
  );
}
