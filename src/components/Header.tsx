import React, { useState, useEffect, useMemo } from 'react';
import { Search, Menu, X, Phone, ChevronDown, Crown, Zap, Flame, Heart, Leaf, Shield, Sparkles, Compass, BookOpen, Star, HelpCircle, Calendar, Briefcase, ArrowRight, LucideIcon } from 'lucide-react';
import { fetchMenuCategoriesApi, MenuCategoryItem } from '../services/apiService';

export interface HeaderProps {
  onOpenSearch?: () => void;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
  onOpenCalendar?: () => void;
  onOpenCustomTour?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Shield, Leaf, Sparkles, Compass, BookOpen, Star, HelpCircle, Calendar, Briefcase, Crown, Zap, Flame
};

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

export default function Header({ onOpenSearch, onNavigate, onOpenBooking, onOpenCalendar, onOpenCustomTour }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [row2Visible, setRow2Visible] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [liveCategories, setLiveCategories] = useState<MenuCategoryItem[]>([]);

  useEffect(() => {
    fetchMenuCategoriesApi().then((cats) => {
      if (Array.isArray(cats) && cats.length > 0) {
        setLiveCategories(cats);
      }
    }).catch(() => { });
  }, []);

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

  const fixedBadges = useMemo(() => {
    const fixedFromDb = liveCategories.filter((c) => c.menuType === 'fixed_top');
    if (fixedFromDb.length > 0) {
      return fixedFromDb.map((c) => ({
        label: c.name,
        href: c.slug === 'doc-quyen' ? '/retreat/docquyen' :
          c.slug === 'sap-khoi-hanh' ? '/retreat/sapkhoihanh' :
            c.slug === 'khong-the-bo-lo' ? '/retreat/khongthebolo' :
              c.slug === 'uu-dai-gio-chot' ? '/retreat/uudaigiochot' :
                `/retreat/${c.slug}`,
        isHighlight: c.slug === 'doc-quyen' || c.slug === 'docquyen' || c.icon === 'Crown',
        icon: (c.icon && ICON_MAP[c.icon]) || null
      }));
    }
    return [];
  }, [liveCategories]);

  const menuData: MenuCategory[] = useMemo(() => {
    const parentCats = liveCategories.filter((c) => c.menuType !== 'fixed_top' && !c.parentSlug);

    if (parentCats.length > 0) {
      return parentCats.map((parent) => {
        const children = liveCategories.filter((c) => c.parentSlug === parent.slug);

        let items: MenuItem[] = [];
        if (children.length > 0) {
          items = children.map((child) => ({
            label: child.name,
            href: `/${parent.slug}/${child.slug}`,
            icon: (child.icon && ICON_MAP[child.icon]) || Leaf,
            color: child.color || '#4ade80'
          }));
        }

        return {
          id: parent.slug,
          title: parent.name,
          hasSubmenu: items.length > 0,
          href: `/${parent.slug}`,
          headerTitle: parent.name.toUpperCase(),
          items
        };
      });
    }

    return [];
  }, [liveCategories]);

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
            ? 'rgba(13, 23, 16, 0.88)'
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
            width: '100%',
            maxWidth: '100%',
            padding: '0 40px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
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
                height: '44px',
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
              gap: '6px',
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              className="hide-mobile"
              onMouseEnter={() => setActiveCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                gap: '36px',
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
                    whiteSpace: 'nowrap',
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
                  <span style={{ whiteSpace: 'nowrap' }}>{b.label}</span>
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
                whiteSpace: 'nowrap',
              }}
            >
              <nav
                className="hide-mobile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                  gap: '32px',
                  paddingTop: '2px',
                }}
              >
                {menuData.map(item => (
                  <div
                    key={item.id}
                    onMouseEnter={() => item.hasSubmenu ? setActiveCategory(item.id) : setActiveCategory(null)}
                    style={{ display: 'flex', alignItems: 'center', position: 'relative', whiteSpace: 'nowrap', flexShrink: 0 }}
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
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0',
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                        onMouseLeave={e => {
                          if (activeCategory !== item.id) e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap' }}>{item.title}</span>
                        <ChevronDown
                          size={14}
                          style={{
                            transform: activeCategory === item.id ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.25s ease',
                            opacity: 0.85,
                            color: activeCategory === item.id ? '#4ade80' : 'currentColor',
                            flexShrink: 0
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
                          display: 'inline-flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
                        onMouseLeave={e => {
                          if (activeCategory !== item.id) e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap' }}>{item.title}</span>
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Right CTA - Compact & Balanced */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Lịch khởi hành Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onOpenCalendar) {
                  onOpenCalendar();
                } else if (onNavigate) {
                  onNavigate('/retreat/sapkhoihanh');
                }
              }}
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '36px',
                padding: '0 14px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                setActiveCategory(null);
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.borderColor = '#4ade80';
                e.currentTarget.style.color = '#4ade80';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <Calendar size={16} style={{ color: '#4ade80' }} />
            </button>

            {/* Thiết Kế Lịch Trình Button */}
            <button
              onClick={() => {
                if (onOpenCustomTour) onOpenCustomTour();
              }}
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '36px',
                padding: '0 16px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.86rem',
                letterSpacing: '0.01em',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.12)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                setActiveCategory(null);
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.borderColor = '#4ade80';
                e.currentTarget.style.color = '#4ade80';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Thiết kế lịch trình</span>
            </button>

            {/* Nhận tư vấn Button */}
            <button
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '36px',
                padding: '0 18px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                color: '#09150c',
                fontWeight: '800',
                fontSize: '0.88rem',
                letterSpacing: '0.01em',
                boxShadow: '0 6px 22px rgba(74, 222, 128, 0.4)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                setActiveCategory(null);
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 8px 26px rgba(74, 222, 128, 0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(74, 222, 128, 0.4)';
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Nhận tư vấn</span>
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
              background: 'rgba(13, 23, 16, 0.88)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderBottom: '1px solid rgba(74, 124, 89, 0.28)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
              zIndex: 9995,
              animation: 'fadeInFlyout 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                maxWidth: '1080px',
                margin: '0 auto',
                padding: '28px 32px 36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    color: '#4ade80',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
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

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCalendar) {
                  onOpenCalendar();
                } else if (onNavigate) {
                  onNavigate('/retreat/sapkhoihanh');
                }
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px 16px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.88rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              <Calendar size={16} style={{ color: '#4ade80' }} />
              <span>Lịch khởi hành</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '12px 16px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                color: '#09150c',
                fontWeight: '800',
                fontSize: '0.88rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Nhận tư vấn
            </button>
          </div>
        </div>
      )}
    </>
  );
}
