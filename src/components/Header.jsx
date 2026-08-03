import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone, ChevronDown } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
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
          padding: scrolled ? '10px 0' : '16px 0',
          background: scrolled
            ? 'rgba(10, 10, 12, 0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'blur(0px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* ── LOGO ── */}
          <a
            href="#"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
          >
            <img
              src="/images/logo.png"
              alt="4U Tours"
              style={{
                height: scrolled ? '36px' : '44px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.3s ease',
                mixBlendMode: 'screen',
                opacity: 0.95,
              }}
            />
          </a>

          {/* ── DESKTOP NAV (pill-style floating) ── */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: scrolled
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(255,255,255,0.08)',
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
                  color: activeItem === idx ? '#ffffff' : 'rgba(255,255,255,0.78)',
                  textDecoration: 'none',
                  background: activeItem === idx
                    ? 'rgba(255,255,255,0.15)'
                    : 'transparent',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Search pill */}
            <button
              onClick={onOpenSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontSize: '0.84rem',
                color: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
              }}
            >
              <Search size={15} color="currentColor" />
              <span className="hide-mobile" style={{ fontWeight: 500 }}>Search</span>
              <kbd
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

            {/* Call CTA – gold gradient */}
            <a
              href="tel:0764886877"
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 20px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #c9a050 0%, #a07030 100%)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.84rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(201, 160, 80, 0.45)',
                transition: 'all 0.25s ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 160, 80, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(201, 160, 80, 0.45)';
              }}
            >
              <Phone size={14} />
              076 488 6877
            </a>

            {/* Mobile hamburger */}
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
                display: 'flex',
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
            top: '68px',
            background: 'rgba(10, 10, 12, 0.97)',
            backdropFilter: 'blur(24px)',
            zIndex: 999,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.25rem',
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
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '16px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #c9a050 0%, #a07030 100%)',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '1rem',
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
