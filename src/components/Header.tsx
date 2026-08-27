import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Crown,
  Zap,
  Flame,
  Heart,
  Leaf,
  Shield,
  Sparkles,
  Compass,
  BookOpen,
  Star,
  HelpCircle,
  Calendar,
  Briefcase,
  MapPin,
  Gift,
  Truck,
  Feather,
  Users,
  LucideIcon
} from 'lucide-react';
import { fetchMenuCategoriesApi, MenuCategoryItem } from '../services/apiService';

export interface HeaderProps {
  currentPath?: string;
  onOpenSearch?: () => void;
  onNavigate?: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
  onOpenCalendar?: () => void;
  onOpenCustomTour?: () => void;
}

export const LANDING_PAGE_SUBMENUS = [
  { id: 'signals', label: 'Vì sao cần?', targetId: 'signals' },
  { id: 'benefits', label: 'Lợi ích', targetId: 'benefits' },
  { id: 'method', label: 'Phương pháp', targetId: 'method' },
  { id: 'faq', label: 'Hỏi · Đáp', targetId: 'faq' }
];

const DEFAULT_FIXED_PARENT_MENUS = [
  { label: 'Retreats ĐỘC QUYỀN', href: '/retreat/docquyen', isHighlight: true, icon: Crown },
  { label: 'Sắp Khởi Hành', href: '/retreat/sapkhoihanh', isHighlight: false, icon: Calendar },
  { label: 'KHÔNG THỂ BỎ LỠ', href: '/retreat/khongthebolo', isHighlight: false, icon: Flame },
  { label: 'Ưu Đãi GIỜ CHÓT', href: '/retreat/uudaigiochot', isHighlight: false, icon: Zap }
];

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Shield,
  Leaf,
  Sparkles,
  Compass,
  BookOpen,
  Star,
  HelpCircle,
  Calendar,
  Briefcase,
  Crown,
  Zap,
  Flame,
  MapPin,
  Gift,
  Truck,
  Feather,
  Users
};

export interface ColumnSubItem {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export interface DynamicColumn {
  id: string;
  title: string;
  subtitle?: string;
  color: string;
  borderColor: string;
  items: ColumnSubItem[];
  directHref?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  hasSubmenu: boolean;
  href: string;
  headerTitle: string;
  columns?: DynamicColumn[];
}

export default function Header({
  currentPath = '',
  onNavigate,
  onOpenBooking,
  onOpenCalendar
}: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [row2Visible, setRow2Visible] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [liveCategories, setLiveCategories] = useState<MenuCategoryItem[]>([]);
  const [activeLandingSection, setActiveLandingSection] = useState<string>('signals');

  const isDetailPage = useMemo(() => {
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
    return (
      path.startsWith('/productdetail') ||
      path.startsWith('/sanpham') ||
      path.startsWith('/san-pham') ||
      path.startsWith('/tour/') ||
      path.startsWith('/tours/') ||
      (path.startsWith('/retreat/') &&
        !['/retreat/docquyen', '/retreat/sapkhoihanh', '/retreat/khongthebolo', '/retreat/uudaigiochot', '/retreat/hot'].includes(path))
    );
  }, [currentPath]);

  useEffect(() => {
    fetchMenuCategoriesApi()
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setLiveCategories(cats);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setScrolled(true);
        if (!isDetailPage) {
          setRow2Visible(false);
        } else {
          setRow2Visible(true); // Trên trang detail khi cuộn xuống, Row 2 luôn hiển thị cứng 4 menu landing page
        }
      } else {
        setScrolled(false);
        setRow2Visible(true);
      }

      // Track active landing page section when on detail page
      if (isDetailPage) {
        if (scrollY < 120) {
          setActiveLandingSection('signals');
          return;
        }

        const sectionIds = ['signals', 'about-3d', 'benefits', 'method', 'trust', 'faq'];
        const scrollPosition = scrollY + 220;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const top = el.getBoundingClientRect().top + scrollY;
            if (scrollPosition >= top) {
              if (sectionIds[i] === 'about-3d') {
                setActiveLandingSection('signals');
              } else if (sectionIds[i] === 'trust') {
                setActiveLandingSection('method');
              } else {
                setActiveLandingSection(sectionIds[i]);
              }
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDetailPage]);

  const handleScrollToLandingSection = (targetId: string) => {
    setActiveCategory(null);
    setMobileMenuOpen(false);
    setActiveLandingSection(targetId);
    const targetElement = document.getElementById(targetId) || document.querySelector(`[id*="${targetId}"]`);
    if (targetElement) {
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  // 1. Fixed Top Badges (Retreats Độc Quyền, Sắp Khởi Hành, Không Thể Bỏ Lỡ, Ưu Đãi Giờ Chót)
  const fixedBadges = useMemo(() => {
    const fixedFromDb = liveCategories.filter((c) => c.menuType === 'fixed_top');
    if (fixedFromDb.length > 0) {
      return fixedFromDb.map((c) => ({
        label: c.name,
        href:
          c.slug === 'doc-quyen'
            ? '/retreat/docquyen'
            : c.slug === 'sap-khoi-hanh'
              ? '/retreat/sapkhoihanh'
              : c.slug === 'khong-the-bo-lo'
                ? '/retreat/khongthebolo'
                : c.slug === 'uu-dai-gio-chot'
                  ? '/retreat/uudaigiochot'
                  : `/retreat/${c.slug}`,
        isHighlight:
          c.slug === 'doc-quyen' || c.slug === 'docquyen' || c.icon === 'Crown',
        icon: (c.icon && ICON_MAP[c.icon]) || (c.slug === 'doc-quyen' ? Crown : null)
      }));
    }
    return DEFAULT_FIXED_PARENT_MENUS;
  }, [liveCategories]);

  // 2. Dynamic Menu Data built directly from liveCategories
  const menuData: MenuCategory[] = useMemo(() => {
    const parentCats = liveCategories.filter(
      (c) => c.menuType !== 'fixed_top' && !c.parentSlug
    );

    if (parentCats.length === 0) {
      return [];
    }

    return parentCats.map((parent) => {
      const children = liveCategories.filter((c) => c.parentSlug === parent.slug);

      // Rule: Nếu không có con thì chỉ hiện cha
      if (children.length === 0) {
        return {
          id: parent.slug,
          title: parent.name,
          hasSubmenu: false,
          href: `/${parent.slug}`,
          headerTitle: parent.name.toUpperCase(),
          columns: []
        };
      }

      // If parent is "series-retreat"
      if (parent.slug === 'series-retreat') {
        const columns: DynamicColumn[] = children.map((child) => ({
          id: child.slug,
          title: child.name,
          subtitle: child.description,
          color: child.color || '#4ade80',
          borderColor: child.color ? `${child.color}55` : 'rgba(74, 222, 128, 0.3)',
          items: [
            { label: 'Retreat Hot', href: `/series-retreat/${child.slug}/hot`, badge: 'HOT', badgeColor: '#f97316' },
            { label: 'Retreat Mới', href: `/series-retreat/${child.slug}/moi`, badge: 'NEW', badgeColor: '#38bdf8' },
            { label: 'Retreat Last Minute', href: `/series-retreat/${child.slug}/last-minute`, badge: 'ƯU ĐÃI', badgeColor: '#facc15' },
            { label: 'Miền Bắc', href: `/series-retreat/${child.slug}/bac` },
            { label: 'Miền Trung', href: `/series-retreat/${child.slug}/trung` },
            { label: 'Miền Nam', href: `/series-retreat/${child.slug}/nam` }
          ]
        }));

        return {
          id: parent.slug,
          title: parent.name,
          hasSubmenu: true,
          href: `/${parent.slug}`,
          headerTitle: parent.name.toUpperCase(),
          columns
        };
      }

      // If parent is "diem-den" (Khám Phá Điểm Đến)
      if (parent.slug === 'diem-den') {
        const columns: DynamicColumn[] = children.map((child) => ({
          id: child.slug,
          title: child.name,
          subtitle: child.description,
          color: child.color || '#38bdf8',
          borderColor: child.color ? `${child.color}55` : 'rgba(56, 189, 248, 0.3)',
          items: [
            { label: 'Retreat Hot', href: `/series-retreat/${child.slug}/hot`, badge: 'HOT', badgeColor: '#f97316' },
            { label: 'Retreat Mới', href: `/series-retreat/${child.slug}/moi`, badge: 'NEW', badgeColor: '#38bdf8' },
            { label: 'Retreat Last Minute', href: `/series-retreat/${child.slug}/last-minute`, badge: 'ƯU ĐÃI', badgeColor: '#facc15' }
          ]
        }));

        return {
          id: parent.slug,
          title: parent.name,
          hasSubmenu: true,
          href: `/${parent.slug}`,
          headerTitle: parent.name.toUpperCase(),
          columns
        };
      }

      // For other categories with children (101 Điều Hay, Kollection 4U, Vì Sao Chọn 4U, etc.)
      const columns: DynamicColumn[] = children.map((child) => ({
        id: child.slug,
        title: child.name,
        subtitle: child.description,
        color: child.color || '#4ade80',
        borderColor: child.color ? `${child.color}55` : 'rgba(74, 222, 128, 0.3)',
        directHref: `/${parent.slug}/${child.slug}`,
        items: []
      }));

      return {
        id: parent.slug,
        title: parent.name,
        hasSubmenu: true,
        href: `/${parent.slug}`,
        headerTitle: parent.name.toUpperCase(),
        columns
      };
    });
  }, [liveCategories]);

  const activeCategoryData = menuData.find((m) => m.id === activeCategory);
  const showLandingSubmenu = isDetailPage && scrolled;
  const isRow2Open = showLandingSubmenu || row2Visible;

  return (
    <>
      <div
        className="apple-header-wrapper"
        onMouseEnter={() => {
          if (!row2Visible) setRow2Visible(true);
        }}
        onMouseLeave={() => {
          setActiveCategory(null);
          if (!isDetailPage && window.scrollY > 50) {
            setRow2Visible(false);
          }
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: activeCategory
            ? 'rgba(13, 23, 16, 0.88)'
            : scrolled
              ? 'rgba(13, 23, 16, 0.88)'
              : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter:
            activeCategory || scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter:
            activeCategory || scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(74, 124, 89, 0.28)'
            : 'none',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.45)' : 'none',
          padding: scrolled ? '12px 44px' : '16px 44px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", sans-serif',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
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
            gap: '24px'
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
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => {
              setActiveCategory(null);
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.92')}
          >
            <img
              src="/Logo-4U-Wellness.png"
              alt="4U Wellness Logo"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </a>

          {/* 2. Middle Column: Navigation */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minWidth: 0,
              gap: '6px'
            }}
          >
            {/* Row 1: Fixed Badges */}
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
                minHeight: '34px'
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
                    color:
                      b.isHighlight && !activeCategory ? '#4ade80' : '#ffffff',
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
                  onMouseEnter={(e) => {
                    setActiveCategory(null);
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.color = '#4ade80';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.color =
                      b.isHighlight && !activeCategory ? '#4ade80' : '#ffffff';
                  }}
                >
                  {b.isHighlight && (
                    <Crown
                      size={15}
                      style={{
                        color: '#facc15',
                        fill: '#facc15',
                        marginRight: '5px'
                      }}
                    />
                  )}
                  <span style={{ whiteSpace: 'nowrap' }}>{b.label}</span>
                </a>
              ))}
            </div>

            {/* Row 2: Main Navigation Items / Landing Page Submenus on Detail Page */}
            <div
              style={{
                maxHeight: isRow2Open ? '48px' : '0px',
                opacity: isRow2Open ? 1 : 0,
                overflow: 'hidden',
                pointerEvents: isRow2Open ? 'auto' : 'none',
                transition:
                  'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                minHeight: isRow2Open ? '34px' : '0px'
              }}
            >
              {showLandingSubmenu ? (
                <nav
                  className="hide-mobile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'rgba(16, 26, 20, 0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '9999px',
                      padding: '3px 5px',
                      gap: '4px',
                      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {LANDING_PAGE_SUBMENUS.map((item) => {
                      const isActive = activeLandingSection === item.targetId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleScrollToLandingSection(item.targetId)}
                          style={{
                            background: isActive
                              ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.22) 0%, rgba(34, 197, 94, 0.15) 100%)'
                              : 'transparent',
                            border: isActive
                              ? '1px solid rgba(74, 222, 128, 0.45)'
                              : '1px solid transparent',
                            borderRadius: '9999px',
                            color: isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.72)',
                            fontSize: '0.88rem',
                            fontWeight: isActive ? 700 : 500,
                            letterSpacing: '0.01em',
                            padding: '5px 18px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            outline: 'none',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: isActive ? '0 2px 10px rgba(74, 222, 128, 0.2)' : 'none'
                          }}
                        >
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </nav>
              ) : (
                <nav
                  className="hide-mobile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                    whiteSpace: 'nowrap',
                    gap: '28px'
                  }}
                >
                  {menuData.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() =>
                        item.hasSubmenu
                          ? setActiveCategory(item.id)
                          : setActiveCategory(null)
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {item.hasSubmenu ? (
                        <button
                          onClick={(e) => {
                            if (item.href && item.href.startsWith('/')) {
                              e.preventDefault();
                              if (onNavigate) onNavigate(item.href);
                              setActiveCategory(null);
                            } else {
                              setActiveCategory(
                                activeCategory === item.id ? null : item.id
                              );
                            }
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color:
                              activeCategory === item.id ? '#4ade80' : '#ffffff',
                            fontSize: '1.02rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '0',
                            whiteSpace: 'nowrap',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = '#4ade80')
                          }
                          onMouseLeave={(e) => {
                            if (activeCategory !== item.id)
                              e.currentTarget.style.color = '#ffffff';
                          }}
                        >
                          <span style={{ whiteSpace: 'nowrap' }}>
                            {item.title}
                          </span>
                          <ChevronDown
                            size={14}
                            style={{
                              transform:
                                activeCategory === item.id
                                  ? 'rotate(180deg)'
                                  : 'none',
                              transition: 'transform 0.25s ease',
                              opacity: 0.85,
                              color:
                                activeCategory === item.id
                                  ? '#4ade80'
                                  : 'currentColor',
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
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = '#4ade80')
                          }
                          onMouseLeave={(e) => {
                            if (activeCategory !== item.id)
                              e.currentTarget.style.color = '#ffffff';
                          }}
                        >
                          <span style={{ whiteSpace: 'nowrap' }}>
                            {item.title}
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              )}
            </div>
          </div>

          {/* 3. Right Column: Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexShrink: 0,
              gap: '10px'
            }}
          >
            {/* Button Lịch Khởi Hành */}
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
              onMouseEnter={(e) => {
                setActiveCategory(null);
                e.currentTarget.style.background =
                  'linear-gradient(135deg, #d97706 0%, #9a3412 100%)';
                e.currentTarget.style.borderColor = '#fef08a';
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow =
                  '0 8px 24px rgba(217, 119, 6, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, #c27803 0%, #854d0e 100%)';
                e.currentTarget.style.borderColor = 'rgba(254, 240, 138, 0.45)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(133, 77, 14, 0.45)';
              }}
            >
              <Calendar size={15} style={{ color: '#fef08a' }} />
              <span>Lịch khởi hành</span>
            </button>

            {/* Single Luxury CTA Button: Đặt Lịch & Tư Vấn */}
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
              onMouseEnter={(e) => {
                setActiveCategory(null);
                e.currentTarget.style.background =
                  'linear-gradient(135deg, #4f8064 0%, #305842 100%)';
                e.currentTarget.style.borderColor = '#86efac';
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow =
                  '0 8px 24px rgba(67, 110, 85, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, #436e55 0%, #284c39 100%)';
                e.currentTarget.style.borderColor =
                  'rgba(163, 184, 153, 0.45)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(40, 76, 57, 0.4)';
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
                justifyContent: 'center'
              }}
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Column Luxury Card Mega Menu */}
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
              animation: 'fadeInFlyout 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '24px 36px 28px'
              }}
            >
              {activeCategoryData.columns && activeCategoryData.columns.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${activeCategoryData.columns.length}, 1fr)`,
                    gap: '20px'
                  }}
                >
                  {activeCategoryData.columns.map((col) => {
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
                          cursor: col.directHref ? 'pointer' : 'default'
                        }}
                        onClick={() => {
                          if (col.directHref) {
                            if (onNavigate) onNavigate(col.directHref);
                            setActiveCategory(null);
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.background =
                            'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.borderColor = col.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.background =
                            'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = col.borderColor;
                        }}
                      >
                        {/* Column Header */}
                        <div
                          style={{
                            paddingBottom: col.items.length > 0 ? '10px' : '0',
                            marginBottom: col.items.length > 0 ? '10px' : '0',
                            borderBottom:
                              col.items.length > 0
                                ? '1px solid rgba(255, 255, 255, 0.08)'
                                : 'none',
                            userSelect: 'none'
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: '1rem',
                              fontWeight: 800,
                              color: col.color,
                              letterSpacing: '-0.01em'
                            }}
                          >
                            {col.title}
                          </h4>
                          {col.subtitle && (
                            <p
                              style={{
                                margin: '4px 0 0',
                                fontSize: '0.78rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontWeight: 400,
                                lineHeight: 1.35
                              }}
                            >
                              {col.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Sub-items if present */}
                        {col.items.length > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px'
                            }}
                          >
                            {col.items.map((sub, sIdx) => (
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
                                  border: 'none'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = col.color;
                                  e.currentTarget.style.transform =
                                    'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color =
                                    'rgba(255, 255, 255, 0.92)';
                                  e.currentTarget.style.transform =
                                    'translateX(0)';
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
                                      backgroundColor: `${sub.badgeColor || col.color
                                        }22`,
                                      color: sub.badgeColor || col.color,
                                      border: `1px solid ${sub.badgeColor || col.color
                                        }44`,
                                      letterSpacing: '0.04em'
                                    }}
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
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
            zIndex: 9990
          }}
        />
      )}

      {/* Mobile Drawer */}
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
            gap: '10px',
            overflowY: 'auto'
          }}
        >
          {/* Top 4 Parent Menus in Mobile Drawer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            paddingBottom: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            {fixedBadges.map((b, idx) => (
              <a
                key={idx}
                href={b.href}
                onClick={(e) => {
                  if (b.href && b.href.startsWith('/')) {
                    e.preventDefault();
                    if (onNavigate) onNavigate(b.href);
                  }
                  setMobileMenuOpen(false);
                }}
                style={{
                  backgroundColor: b.isHighlight ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: b.isHighlight ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  color: b.isHighlight ? '#4ade80' : '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {b.isHighlight && <Crown size={14} style={{ color: '#facc15' }} />}
                <span>{b.label}</span>
              </a>
            ))}
          </div>

          {/* If on Detail Page: Display the 4 Landing Page Submenus in Mobile Drawer */}
          {isDetailPage && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', paddingLeft: '4px' }}>
                Mục nổi bật trong trang
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {LANDING_PAGE_SUBMENUS.map((item) => {
                  const isActive = activeLandingSection === item.targetId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleScrollToLandingSection(item.targetId)}
                      style={{
                        background: isActive ? 'rgba(74, 222, 128, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                        border: isActive ? '1px solid rgba(74, 222, 128, 0.45)' : '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '10px',
                        padding: '9px 12px',
                        color: isActive ? '#4ade80' : 'rgba(255, 255, 255, 0.75)',
                        fontSize: '0.85rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {menuData.map((cat, idx) => (
            <div
              key={idx}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              {cat.hasSubmenu ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpandedCat(
                        mobileExpandedCat === cat.id ? null : cat.id
                      )
                    }
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
                      cursor: 'pointer'
                    }}
                  >
                    <span>{cat.title}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform:
                          mobileExpandedCat === cat.id
                            ? 'rotate(180deg)'
                            : 'none',
                        transition: 'transform 0.2s',
                        color: '#4ade80'
                      }}
                    />
                  </button>

                  {mobileExpandedCat === cat.id && (
                    <div
                      style={{
                        padding: '0 0 14px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      {cat.columns &&
                        cat.columns.map((col) => (
                          <div
                            key={col.id}
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              borderRadius: '12px',
                              padding: '12px',
                              border: `1px solid ${col.borderColor}`
                            }}
                          >
                            <div
                              style={{
                                marginBottom: col.items.length > 0 ? '8px' : '0',
                                paddingBottom: col.items.length > 0 ? '6px' : '0',
                                borderBottom:
                                  col.items.length > 0
                                    ? '1px solid rgba(255,255,255,0.08)'
                                    : 'none'
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 800,
                                  color: col.color,
                                  fontSize: '0.92rem'
                                }}
                              >
                                {col.title}
                              </span>
                            </div>
                            {col.items.length > 0 && (
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr',
                                  gap: '6px'
                                }}
                              >
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
                                      display: 'block'
                                    }}
                                  >
                                    <span>{sub.label}</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
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
                    display: 'block'
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
