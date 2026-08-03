import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Signatures 4U', href: '#signatures' },
    { label: 'Just Released', href: '#just-released' },
    { label: "Today's Deal", href: '#todays-deal', badge: 'HOT' },
    { label: 'Last Minute', href: '#last-minute' },
    { label: 'Retreat Series', href: '#retreats' },
    { label: 'About 4U', href: '#about' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: scrolled ? '10px 0' : '14px 0',
          background: scrolled ? 'rgba(10, 10, 12, 0.88)' : 'rgba(10, 10, 12, 0.65)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="apple-container header-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            width: '100%'
          }}
        >
          {/* ── LOGO ── */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/images/logo.png"
              alt="4U Tours"
              style={{
                height: scrolled ? '34px' : '40px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 0.3s ease',
                filter: 'brightness(0) invert(1)',
                opacity: 0.95,
              }}
            />
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav
            className="desktop-nav"
            style={{
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '999px',
              padding: '6px 8px',
              backdropFilter: 'blur(12px)',
            }}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onMouseEnter={() => setActiveItem(idx)}
                onMouseLeave={() => setActiveItem(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  color: activeItem === idx ? '#ffffff' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                  background: activeItem === idx ? 'rgba(255,255,255,0.15)' : 'transparent',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ff3b5c 0%, #c9003a 100%)',
                      color: '#fff',
                      fontSize: '0.58rem',
                      fontWeight: '800',
                      padding: '2px 6px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      lineHeight: 1,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Search button */}
            <button
              onClick={onOpenSearch}
              className="search-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontSize: '0.84rem',
                color: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
              }}
            >
              <Search size={15} />
              <span className="hide-mobile" style={{ fontWeight: 500 }}>Search</span>
              <kbd
                className="hide-mobile"
                style={{
                  background: 'rgba(255,255,255,0.16)',
                  color: 'rgba(255,255,255,0.85)',
                  padding: '1px 6px',
                  borderRadius: '5px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Call CTA */}
            <a
              href="tel:0764886877"
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 18px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #c9a050 0%, #a07030 100%)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.84rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(201, 160, 80, 0.45)',
                transition: 'all 0.25s ease',
              }}
            >
              <Phone size={14} />
              076 488 6877
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '10px',
                cursor: 'pointer',
                padding: '8px',
                color: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN DRAWER ── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '60px',
            background: 'rgba(10, 10, 12, 0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 999,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {item.label}
              {item.badge && (
                <span
                  style={{
                    background: '#ff3b5c',
                    color: '#fff',
                    fontSize: '0.6rem',
                    fontWeight: '800',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <a
            href="tel:0764886877"
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #c9a050 0%, #a07030 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(201, 160, 80, 0.4)',
            }}
          >
            <Phone size={18} /> Call Hotline: 076 488 6877
          </a>
        </div>
      )}
    </>
  );
}
