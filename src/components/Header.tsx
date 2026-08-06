import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Phone, ChevronDown, Crown, Zap, Flame, Heart, Leaf, Shield, Sparkles, Compass, BookOpen, Star, HelpCircle, Calendar, Briefcase, ArrowRight, LucideIcon } from 'lucide-react';

export interface HeaderProps {
  onOpenSearch?: () => void;
  onNavigate?: (path: string) => void;
  onOpenBooking?: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  color?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  hasSubmenu: boolean;
  href: string;
  headerTitle: string;
  items?: MenuItem[];
}

export default function Header({ onOpenSearch, onNavigate, onOpenBooking }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [row2Visible, setRow2Visible] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 60) {
        setRow2Visible(false);
      } else {
        setRow2Visible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fixedBadges = [
    { label: 'Retreats ĐỘC QUYỀN', href: '/retreat/docquyen', isHighlight: true },
    { label: 'Sắp Khởi hành', href: '/retreat/sapkhoihanh', isHighlight: false },
    { label: 'KHÔNG THỂ BỎ LỠ', href: '/retreat/khongthebolo', isHighlight: false },
    { label: 'Ưu đãi GIỜ CHÓT', href: '/retreat/uudaigiochot', isHighlight: false },
  ];

  const menuData: MenuCategory[] = [
    {
      id: 'series-retreat',
      title: 'Series Retreat',
      hasSubmenu: true,
      href: '/series-retreat',
      headerTitle: 'Series Retreat',
      items: [
        { label: 'Retreat Chữa lành', href: '/series-retreat/chua-lanh', icon: Heart, color: '#4ade80' },
        { label: 'Retreat Bảo tồn', href: '/series-retreat/bao-ton', icon: Shield, color: '#38bdf8' },
        { label: 'Retreat Thiên nhiên', href: '/series-retreat/thien-nhien', icon: Leaf, color: '#facc15' },
        { label: 'Retreat Thiện nguyện', href: '/series-retreat/thien-nguyen', icon: Sparkles, color: '#f472b6' },
      ]
    },
    {
      id: 'retreat-hot',
      title: 'Retreat HOT',
      hasSubmenu: true,
      href: '/retreat',
      headerTitle: 'Retreat HOT',
      items: [
        { label: '"Bình Yên trên Cao Nguyên"', href: '/retreat/hot/binh-yen-tren-cao-nguyen', icon: Compass, color: '#f97316' },
        { label: '"Tĩnh Lặng Giữa Đại Ngàn"', href: '/retreat/hot/tinh-lang-giua-dai-ngan', icon: Leaf, color: '#4ade80' },
        { label: '"Tìm Lại Kết Nối"', href: '/retreat/hot/tim-lai-ket-noi', icon: Heart, color: '#fb7185' },
      ]
    },
    {
      id: 'dieu-hay',
      title: '101 Điều HAY',
      hasSubmenu: true,
      href: '/101-dieu-hay',
      headerTitle: '101 Điều HAY',
      items: [
        { label: 'A Tip A Day', href: '/101-dieu-hay/a-tip-a-day', icon: Sparkles, color: '#e5c158' },
        { label: 'Blog Magazine', href: '/101-dieu-hay/blog', icon: BookOpen, color: '#38bdf8' },
      ]
    },
    {
      id: 'kollection-4u',
      title: 'Kollection 4U',
      hasSubmenu: true,
      href: '/kollection-4u',
      headerTitle: 'Kollection 4U',
      items: [
        { label: 'New Arrivals', href: '/kollection-4u/new-arrivals', icon: Sparkles, color: '#38bdf8' },
        { label: 'A Must-Have', href: '/kollection-4u/must-have', icon: Flame, color: '#f97316' },
        { label: 'EXCLUSIVE', href: '/kollection-4u/exclusive', icon: Crown, color: '#facc15' },
        { label: 'Promotions', href: '/kollection-4u/promotions', icon: Zap, color: '#4ade80' },
      ]
    },
    {
      id: 'vi-sao-chon-4u',
      title: 'Vì sao chọn 4U?',
      hasSubmenu: true,
      href: '/vi-sao-chon-4u',
      headerTitle: 'Vì sao chọn 4U?',
      items: [
        { label: 'Giới Thiệu 4U', href: '/vi-sao-chon-4u/gioi-thieu', icon: Star, color: '#e5c158' },
        { label: 'Những Chuyến đi Ấn tượng', href: '/vi-sao-chon-4u/nhung-chuyen-di-an-tuong', icon: Compass, color: '#4ade80' },
        { label: 'Câu hỏi Thường gặp', href: '/vi-sao-chon-4u/cau-hoi-thuong-gap', icon: HelpCircle, color: '#38bdf8' },
        { label: 'Cơ hội Nghề nghiệp', href: '/vi-sao-chon-4u/co-hoi-nghe-nghiep', icon: Briefcase, color: '#a78bfa' },
        { label: 'Lịch Khai giảng', href: '/vi-sao-chon-4u/lich-khai-giang', icon: Calendar, color: '#f472b6' },
      ]
    }
  ];

  const activeCategoryData = menuData.find(m => m.id === activeCategory);

  return (
    <>
      <div
        className="apple-header-wrapper"
        onMouseEnter={() => {
          if (!row2Visible) setRow2Visible(true);
        }}
        onMouseLeave={() => {
          setActiveCategory(null);
          if (window.scrollY > 50) setRow2Visible(false);
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: activeCategory
            ? 'rgba(10, 15, 11, 0.98)'
            : (scrolled
              ? 'rgba(13, 23, 16, 0.88)'
              : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)'),
          backdropFilter: (activeCategory || scrolled) ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: (activeCategory || scrolled) ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(74, 124, 89, 0.28)' : 'none',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.45)' : 'none',
          padding: scrolled ? '12px 44px' : '16px 44px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", sans-serif',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '28px',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => {
              setActiveCategory(null);
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.92'}
          >
            <img
              src="/images/logo.png"
              alt="4U Tours Logo"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </a>

          {/* Center section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flex: 1,
            }}
          >
            <div
              className="hide-mobile"
              onMouseEnter={() => setActiveCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '48px',
                fontSize: '0.96rem',
                fontWeight: '700',
                letterSpacing: '0.01em',
              }}
            >
              {fixedBadges.map((b, idx) => (
                <a
                  key={idx}
                  href={b.href}
                  onClick={(e) => {
                    if (b.href && b.href.startsWith('/')) {
                      e.preventDefault();
                      if (onNavigate) onNavigate(b.href);
                    }
                    setActiveCategory(null);
                  }}
                  style={{
                    color: (b.isHighlight && !activeCategory) ? '#4ade80' : '#ffffff',
                    background: 'transparent',
                    border: 'none',
                    padding: '0',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    opacity: 1,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontWeight: b.isHighlight ? 800 : 700
                  }}
                  onMouseEnter={e => {
                    setActiveCategory(null);
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.color = '#4ade80';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.color = (b.isHighlight && !activeCategory) ? '#4ade80' : '#ffffff';
                  }}
                >
                  {b.isHighlight && <Crown size={15} style={{ color: '#facc15', fill: '#facc15', marginRight: '5px' }} />}
                  {b.label}
                </a>
              ))}
            </div>

            <div
              style={{
                maxHeight: row2Visible ? '48px' : '0px',
                opacity: row2Visible ? 1 : 0,
                overflow: 'hidden',
                pointerEvents: row2Visible ? 'auto' : 'none',
                transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <nav
                className="hide-mobile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '44px',
                  paddingTop: '4px',
                }}
              >
                {menuData.map(item => (
                  <div
                    key={item.id}
                    onMouseEnter={() => item.hasSubmenu ? setActiveCategory(item.id) : setActiveCategory(null)}
                    style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
                  >
                    {item.hasSubmenu ? (
                      <button
                        onClick={(e) => {
                          if (item.href && item.href.startsWith('/')) {
                            e.preventDefault();
                            if (onNavigate) onNavigate(item.href);
                            setActiveCategory(null);
                          } else {
                            setActiveCategory(activeCategory === item.id ? null : item.id);
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: activeCategory === item.id ? '#4ade80' : '#ffffff',
                          fontSize: '1.02rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                        onMouseLeave={e => {
                          if (activeCategory !== item.id) e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          size={14}
                          style={{
                            transform: activeCategory === item.id ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.25s ease',
                            opacity: 0.85,
                            color: activeCategory === item.id ? '#4ade80' : 'currentColor',
                          }}
                        />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (item.href && item.href.startsWith('/')) {
                            e.preventDefault();
                            if (onNavigate) onNavigate(item.href);
                          }
                          setActiveCategory(null);
                        }}
                        style={{
                          color: '#ffffff',
                          fontSize: '1.02rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          padding: '0',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                        onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
                      >
                        {item.title}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Right CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 28px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                color: '#09150c',
                fontWeight: '800',
                fontSize: '0.96rem',
                letterSpacing: '0.02em',
                boxShadow: '0 6px 22px rgba(74, 222, 128, 0.45)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                setActiveCategory(null);
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 26px rgba(74, 222, 128, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(74, 222, 128, 0.45)';
              }}
            >
              Nhận tư vấn
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Flyout panel */}
        {activeCategory && activeCategoryData && activeCategoryData.hasSubmenu && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(10, 15, 11, 0.98)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.85)',
              zIndex: 9995,
              animation: 'fadeInFlyout 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                maxWidth: '1080px',
                margin: '0 auto',
                padding: '36px 32px 42px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    color: '#a3b899',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  DANH MỤC THUỘC {activeCategoryData.headerTitle}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'flex-start',
                    paddingLeft: '4px'
                  }}
                >
                  {activeCategoryData.items?.map((sub, sIdx) => (
                    <a
                      key={sIdx}
                      href={sub.href}
                      onClick={(e) => {
                        if (sub.href && sub.href.startsWith('/')) {
                          e.preventDefault();
                          if (onNavigate) onNavigate(sub.href);
                        }
                        setActiveCategory(null);
                      }}
                      style={{
                        fontSize: '1.02rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        padding: '4px 0',
                        border: 'none',
                        background: 'none',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#4ade80';
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {activeCategory && (
        <div
          onClick={() => setActiveCategory(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9990,
          }}
        />
      )}

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '84px',
            background: 'rgba(10, 15, 11, 0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 9999,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
          }}
        >
          {menuData.map((cat, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {cat.hasSubmenu ? (
                <>
                  <button
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === cat.id ? null : cat.id)}
                    style={{
                      width: '100%',
                      padding: '14px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '1.05rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{cat.title}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: mobileExpandedCat === cat.id ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                        color: '#4ade80',
                      }}
                    />
                  </button>

                  {mobileExpandedCat === cat.id && (
                    <div style={{ padding: '0 0 14px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {cat.items?.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            color: 'rgba(255,255,255,0.85)',
                            textDecoration: 'none',
                            fontSize: '0.92rem',
                            display: 'block',
                          }}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '14px 0',
                    display: 'block',
                  }}
                >
                  {cat.title}
                </a>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenBooking) onOpenBooking();
            }}
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              color: '#09150c',
              fontWeight: '800',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Nhận tư vấn
          </button>
        </div>
      )}
    </>
  );
}
