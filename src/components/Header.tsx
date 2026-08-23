import React, { useState, useEffect, useMemo } from 'react';
import { Search, Menu, X, Phone, ChevronDown, ChevronRight, Crown, Zap, Flame, Heart, Leaf, Shield, Sparkles, Compass, BookOpen, Star, HelpCircle, Calendar, Briefcase, ArrowRight, MapPin, LucideIcon } from 'lucide-react';
import { fetchMenuCategoriesApi, MenuCategoryItem } from '../services/apiService';

export interface HeaderProps {
  onOpenSearch?: () => void;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
  onOpenCalendar?: () => void;
  onOpenCustomTour?: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Shield, Leaf, Sparkles, Compass, BookOpen, Star, HelpCircle, Calendar, Briefcase, Crown, Zap, Flame, MapPin
};

export const SERIES_RETREAT_COLUMNS = [
  {
    id: 'chua-lanh',
    title: 'Retreat Chữa Lành',
    subtitle: 'Phục hồi Thân · Tâm · Trí',
    color: '#4ade80',
    bgColor: 'rgba(74, 222, 128, 0.12)',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    items: [
      { label: 'Retreat Hot', href: '/series-retreat/chua-lanh/hot', badge: 'HOT', badgeColor: '#f97316' },
      { label: 'Retreat Mới', href: '/series-retreat/chua-lanh/moi', badge: 'NEW', badgeColor: '#38bdf8' },
      { label: 'Retreat Last Minute', href: '/series-retreat/chua-lanh/last-minute', badge: 'ƯU ĐÃI', badgeColor: '#facc15' },
      { label: 'Miền Bắc', href: '/series-retreat/chua-lanh/bac' },
      { label: 'Miền Trung', href: '/series-retreat/chua-lanh/trung' },
      { label: 'Miền Nam', href: '/series-retreat/chua-lanh/nam' },
    ]
  },
  {
    id: 'bao-ton',
    title: 'Retreat Bảo Tồn',
    subtitle: 'Gìn giữ rừng & đa dạng sinh học',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    items: [
      { label: 'Retreat Hot', href: '/series-retreat/bao-ton/hot', badge: 'HOT', badgeColor: '#f97316' },
      { label: 'Retreat Mới', href: '/series-retreat/bao-ton/moi', badge: 'NEW', badgeColor: '#38bdf8' },
      { label: 'Retreat Last Minute', href: '/series-retreat/bao-ton/last-minute', badge: 'ƯU ĐÃI', badgeColor: '#facc15' },
      { label: 'Miền Bắc', href: '/series-retreat/bao-ton/bac' },
      { label: 'Miền Trung', href: '/series-retreat/bao-ton/trung' },
      { label: 'Miền Nam', href: '/series-retreat/bao-ton/nam' },
    ]
  },
  {
    id: 'thien-nhien',
    title: 'Retreat Thiên Nhiên',
    subtitle: 'Hòa mình giữa đại ngàn nguyên sơ',
    color: '#facc15',
    bgColor: 'rgba(250, 204, 21, 0.12)',
    borderColor: 'rgba(250, 204, 21, 0.3)',
    items: [
      { label: 'Retreat Hot', href: '/series-retreat/thien-nhien/hot', badge: 'HOT', badgeColor: '#f97316' },
      { label: 'Retreat Mới', href: '/series-retreat/thien-nhien/moi', badge: 'NEW', badgeColor: '#38bdf8' },
      { label: 'Retreat Last Minute', href: '/series-retreat/thien-nhien/last-minute', badge: 'ƯU ĐÃI', badgeColor: '#facc15' },
      { label: 'Miền Bắc', href: '/series-retreat/thien-nhien/bac' },
      { label: 'Miền Trung', href: '/series-retreat/thien-nhien/trung' },
      { label: 'Miền Nam', href: '/series-retreat/thien-nhien/nam' },
    ]
  },
  {
    id: 'thien-nguyen',
    title: 'Retreat Thiện Nguyện',
    subtitle: 'Gắn kết sẻ chia vì cộng đồng',
    color: '#f472b6',
    bgColor: 'rgba(244, 114, 182, 0.12)',
    borderColor: 'rgba(244, 114, 182, 0.3)',
    items: [
      { label: 'Retreat Hot', href: '/series-retreat/thien-nguyen/hot', badge: 'HOT', badgeColor: '#f97316' },
      { label: 'Retreat Mới', href: '/series-retreat/thien-nguyen/moi', badge: 'NEW', badgeColor: '#38bdf8' },
      { label: 'Retreat Last Minute', href: '/series-retreat/thien-nguyen/last-minute', badge: 'ƯU ĐÃI', badgeColor: '#facc15' },
      { label: 'Miền Bắc', href: '/series-retreat/thien-nguyen/bac' },
      { label: 'Miền Trung', href: '/series-retreat/thien-nguyen/trung' },
      { label: 'Miền Nam', href: '/series-retreat/thien-nguyen/nam' },
    ]
  }
];

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
            gap: '24px',
          }}
        >
          {/* 1. Left Column: Logo */}
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
              src="/Logo-4U-Wellness.png"
              alt="4U Wellness Logo"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </a>

          {/* 2. Middle Column: Centered between Logo and Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minWidth: 0,
              gap: '6px',
            }}
          >
            {/* Row 1: Badges centered between Logo and Buttons */}
            <div
              className="hide-mobile"
              onMouseEnter={() => setActiveCategory(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                gap: '34px',
                fontSize: '0.94rem',
                fontWeight: '700',
                letterSpacing: '0.01em',
                minHeight: '34px',
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

            {/* Row 2: Main Nav centered between Logo and Buttons */}
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
                minHeight: row2Visible ? '34px' : '0px',
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
                  gap: '28px',
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

          {/* 3. Right Column: Action Buttons (1 Luxury Button + 1 Calendar Icon) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexShrink: 0,
              gap: '10px',
            }}
          >
            {/* Button Lịch Khởi Hành (Warm Amber Gold - Nổi Bật & Sang Trọng) */}
            <button
              type="button"
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
                gap: '7px',
                height: '38px',
                padding: '0 18px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #c27803 0%, #854d0e 100%)',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '700',
                letterSpacing: '0.01em',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                boxShadow: '0 6px 20px rgba(133, 77, 14, 0.45)',
                border: '1px solid rgba(254, 240, 138, 0.45)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={e => {
                setActiveCategory(null);
                e.currentTarget.style.background = 'linear-gradient(135deg, #d97706 0%, #9a3412 100%)';
                e.currentTarget.style.borderColor = '#fef08a';
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #c27803 0%, #854d0e 100%)';
                e.currentTarget.style.borderColor = 'rgba(254, 240, 138, 0.45)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(133, 77, 14, 0.45)';
              }}
            >
              <Calendar size={15} style={{ color: '#fef08a' }} />
              <span>Lịch khởi hành</span>
            </button>

            {/* Single Luxury CTA Button: Đặt Lịch & Tư Vấn (Moss Green - Xanh Rêu) */}
            <button
              type="button"
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '38px',
                padding: '0 20px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #436e55 0%, #284c39 100%)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.88rem',
                letterSpacing: '0.01em',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                boxShadow: '0 6px 20px rgba(40, 76, 57, 0.4)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid rgba(163, 184, 153, 0.45)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                setActiveCategory(null);
                e.currentTarget.style.background = 'linear-gradient(135deg, #4f8064 0%, #305842 100%)';
                e.currentTarget.style.borderColor = '#86efac';
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(67, 110, 85, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #436e55 0%, #284c39 100%)';
                e.currentTarget.style.borderColor = 'rgba(163, 184, 153, 0.45)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(40, 76, 57, 0.4)';
              }}
            >
              <Sparkles size={15} style={{ color: '#fde047' }} />
              <span style={{ whiteSpace: 'nowrap' }}>Đặt Lịch & Tư Vấn</span>
            </button>

            {/* Mobile Toggle */}
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
              background: 'rgba(13, 23, 16, 0.94)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              borderBottom: '1px solid rgba(74, 124, 89, 0.28)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.55)',
              zIndex: 9995,
              animation: 'fadeInFlyout 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {activeCategory === 'series-retreat' ? (
              /* SPECIFIC 4-COLUMN LUXURY GRID FOR SERIES RETREAT */
              <div
                style={{
                  maxWidth: '1280px',
                  margin: '0 auto',
                  padding: '24px 36px 28px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px',
                  }}
                >
                  {SERIES_RETREAT_COLUMNS.map((col) => {
                    return (
                      <div
                        key={col.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${col.borderColor}`,
                          borderRadius: '16px',
                          padding: '16px 16px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.borderColor = col.color;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = col.borderColor;
                        }}
                      >
                        {/* Group Header: NON-CLICKABLE as requested */}
                        <div
                          style={{
                            paddingBottom: '10px',
                            marginBottom: '10px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            cursor: 'default',
                            userSelect: 'none',
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: '1rem',
                              fontWeight: 800,
                              color: col.color,
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {col.title}
                          </h4>
                        </div>

                        {/* 6 Submenu Clickable Links */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {col.items.map((sub, sIdx) => {
                            return (
                              <a
                                key={sIdx}
                                href={sub.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (onNavigate) onNavigate(sub.href);
                                  setActiveCategory(null);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '5px 0',
                                  color: 'rgba(255, 255, 255, 0.92)',
                                  textDecoration: 'none',
                                  fontSize: '0.92rem',
                                  fontWeight: 600,
                                  transition: 'all 0.2s ease',
                                  background: 'transparent',
                                  border: 'none',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.color = col.color;
                                  e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                }}
                              >
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span
                                    style={{
                                      fontSize: '0.62rem',
                                      fontWeight: 800,
                                      padding: '1px 6px',
                                      borderRadius: '999px',
                                      backgroundColor: `${sub.badgeColor || col.color}22`,
                                      color: sub.badgeColor || col.color,
                                      border: `1px solid ${sub.badgeColor || col.color}44`,
                                      letterSpacing: '0.04em',
                                    }}
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* STANDARD MENU FOR OTHER MEGA MENUS (HORIZONTAL ROW) */
              <div
                style={{
                  maxWidth: '1280px',
                  margin: '0 auto',
                  padding: '22px 36px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {activeCategoryData.items?.map((sub, sIdx) => {
                    return (
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
                          fontSize: '1.05rem',
                          fontWeight: '600',
                          color: '#ffffff',
                          textDecoration: 'none',
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                          padding: '6px 0',
                          background: 'transparent',
                          border: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          letterSpacing: '-0.01em',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#4ade80';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <span>{sub.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
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
                    <div style={{ padding: '0 0 14px 10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cat.id === 'series-retreat' ? (
                        SERIES_RETREAT_COLUMNS.map((col) => {
                          return (
                            <div key={col.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px', border: `1px solid ${col.borderColor}` }}>
                              <div style={{ marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <span style={{ fontWeight: 800, color: col.color, fontSize: '0.92rem' }}>{col.title}</span>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                {col.items.map((sub, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (onNavigate) onNavigate(sub.href);
                                      setMobileMenuOpen(false);
                                    }}
                                    style={{
                                      color: 'rgba(255,255,255,0.85)',
                                      textDecoration: 'none',
                                      fontSize: '0.82rem',
                                      padding: '4px 6px',
                                      display: 'block',
                                    }}
                                  >
                                    <span>{sub.label}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        cat.items?.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            onClick={(e) => {
                              if (sub.href && sub.href.startsWith('/')) {
                                e.preventDefault();
                                if (onNavigate) onNavigate(sub.href);
                              }
                              setMobileMenuOpen(false);
                            }}
                            style={{
                              color: 'rgba(255,255,255,0.85)',
                              textDecoration: 'none',
                              fontSize: '0.92rem',
                              display: 'block',
                              padding: '4px 0',
                            }}
                          >
                            {sub.label}
                          </a>
                        ))
                      )}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={cat.href}
                  onClick={(e) => {
                    if (cat.href && cat.href.startsWith('/')) {
                      e.preventDefault();
                      if (onNavigate) onNavigate(cat.href);
                    }
                    setMobileMenuOpen(false);
                  }}
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
