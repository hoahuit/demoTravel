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
import './Header.css';

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

        const sectionIds = ['signals', 'benefits', 'method', 'faq'];
        const scrollPosition = scrollY + 180;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const top = el.getBoundingClientRect().top + scrollY;
            if (scrollPosition >= top) {
              setActiveLandingSection(sectionIds[i]);
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

    // Fallback alias lookup
    const aliasMap: Record<string, string[]> = {
      'signals': ['signals', 'tin-hieu', 'chuong-trinh', 'vi-sao-can'],
      'benefits': ['benefits', 'loi-ich'],
      'method': ['method', 'phuong-phap', 'about-3d'],
      'faq': ['faq', 'hoi-dap']
    };

    const candidates = aliasMap[targetId] || [targetId];
    let targetElement: HTMLElement | null = null;
    for (const cid of candidates) {
      const el = document.getElementById(cid);
      if (el) {
        targetElement = el;
        break;
      }
    }
    if (!targetElement) {
      targetElement = document.querySelector(`[id*="${targetId}"]`);
    }

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
    return (
    <>
      <div
        className={`apple-header-wrapper ${scrolled ? 'is-scrolled' : ''} ${activeCategory ? 'has-active-menu' : ''}`}
        onMouseEnter={() => {
          if (!row2Visible) setRow2Visible(true);
        }}
        onMouseLeave={() => {
          setActiveCategory(null);
          if (!isDetailPage && window.scrollY > 50) {
            setRow2Visible(false);
          }
        }}
      >
        <div className="apple-header-container">
          {/* 1. Left Column: Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/');
            }}
            className="apple-header-logo-link"
            onMouseEnter={() => setActiveCategory(null)}
          >
            <img
              src="/Logo-4U-Wellness.png"
              alt="4U Wellness Logo"
              className="apple-header-logo-img"
            />
          </a>

          {/* 2. Middle Column: Navigation */}
          <div className="apple-header-nav-col">
            {/* Row 1: Fixed Badges */}
            <div
              className="apple-header-row1 hide-mobile"
              onMouseEnter={() => setActiveCategory(null)}
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
                  className={`apple-header-badge-link ${b.isHighlight ? 'is-highlight' : ''}`}
                  onMouseEnter={() => setActiveCategory(null)}
                >
                  {b.isHighlight && (
                    <Crown
                      size={15}
                      className="apple-header-crown-icon"
                    />
                  )}
                  <span className="apple-nowrap-text">{b.label}</span>
                </a>
              ))}
            </div>

            {/* Row 2: Main Navigation Items / Landing Page Submenus on Detail Page */}
            <div
              className={`apple-header-row2 ${row2Visible ? 'is-open' : ''}`}
            >
              {isDetailPage ? (
                <nav className="apple-landing-subnav-wrap hide-mobile">
                  <div className="apple-landing-pill-container">
                    {LANDING_PAGE_SUBMENUS.map((item) => {
                      const isActive = activeLandingSection === item.targetId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleScrollToLandingSection(item.targetId)}
                          className={`apple-landing-pill-btn ${isActive ? 'is-active' : ''}`}
                        >
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </nav>
              ) : (
                <nav className="apple-header-main-nav hide-mobile">
                  {menuData.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() =>
                        item.hasSubmenu
                          ? setActiveCategory(item.id)
                          : setActiveCategory(null)
                      }
                      className="apple-nav-item-wrap"
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
                          className={`apple-nav-btn ${activeCategory === item.id ? 'is-active' : ''}`}
                        >
                          <span className="apple-nowrap-text">
                            {item.title}
                          </span>
                          <ChevronDown
                            size={14}
                            className={`apple-chevron-arrow ${activeCategory === item.id ? 'rotated' : ''}`}
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
                          className="apple-nav-link"
                        >
                          <span className="apple-nowrap-text">
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
          <div className="apple-header-actions-col">
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
              className="apple-btn-calendar hide-mobile"
              onMouseEnter={() => setActiveCategory(null)}
            >
              <Calendar size={15} color="#fef08a" />
              <span>Lịch khởi hành</span>
            </button>

            {/* Single Luxury CTA Button: Đặt Lịch & Tư Vấn */}
            <button
              type="button"
              onClick={() => {
                if (onOpenBooking) onOpenBooking();
              }}
              className="apple-btn-consultation hide-mobile"
              onMouseEnter={() => setActiveCategory(null)}
            >
              <Sparkles size={15} color="#fde047" />
              <span className="apple-nowrap-text">Đặt Lịch & Tư Vấn</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="apple-mobile-toggle-btn mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Column Luxury Card Mega Menu */}
        {activeCategory && activeCategoryData && activeCategoryData.hasSubmenu && (
          <div className="apple-megamenu-panel">
            <div className="apple-megamenu-inner">
              {activeCategoryData.columns && activeCategoryData.columns.length > 0 && (
                <div
                  className="apple-megamenu-grid"
                  style={{ '--cols': activeCategoryData.columns.length } as React.CSSProperties}
                >
                  {activeCategoryData.columns.map((col) => {
                    return (
                      <div
                        key={col.id}
                        className="apple-megamenu-col-card"
                        style={{
                          '--col-border': col.borderColor,
                          '--col-color': col.color,
                          '--col-cursor': col.directHref ? 'pointer' : 'default'
                        } as React.CSSProperties}
                        onClick={() => {
                          if (col.directHref) {
                            if (onNavigate) onNavigate(col.directHref);
                            setActiveCategory(null);
                          }
                        }}
                      >
                        {/* Column Header */}
                        <div className={`apple-megamenu-col-header ${col.items.length > 0 ? 'has-divider' : ''}`}>
                          <h4 className="apple-megamenu-col-title">
                            {col.title}
                          </h4>
                          {col.subtitle && (
                            <p className="apple-megamenu-col-subtitle">
                              {col.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Sub-items if present */}
                        {col.items.length > 0 && (
                          <div className="apple-megamenu-subitems-list">
                            {col.items.map((sub, sIdx) => (
                              <a
                                key={sIdx}
                                href={sub.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (onNavigate) onNavigate(sub.href);
                                  setActiveCategory(null);
                                }}
                                className="apple-megamenu-sublink"
                              >
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span
                                    className="apple-megamenu-badge"
                                    style={{
                                      '--badge-bg': `${sub.badgeColor || col.color}22`,
                                      '--badge-color': sub.badgeColor || col.color,
                                      '--badge-border': `${sub.badgeColor || col.color}44`
                                    } as React.CSSProperties}
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
          className="apple-megamenu-backdrop"
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="apple-mobile-drawer">
          {/* Top 4 Parent Menus in Mobile Drawer */}
          <div className="apple-mobile-fixed-grid">
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
                className={`apple-mobile-fixed-link ${b.isHighlight ? 'is-highlight' : ''}`}
              >
                {b.isHighlight && <Crown size={14} color="#facc15" />}
                <span>{b.label}</span>
              </a>
            ))}
          </div>

          {/* If on Detail Page: Display the 4 Landing Page Submenus in Mobile Drawer */}
          {isDetailPage && (
            <div className="apple-mobile-landing-card">
              <div className="apple-mobile-landing-title">
                Mục nổi bật trong trang
              </div>
              <div className="apple-mobile-landing-grid">
                {LANDING_PAGE_SUBMENUS.map((item) => {
                  const isActive = activeLandingSection === item.targetId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleScrollToLandingSection(item.targetId)}
                      className={`apple-mobile-landing-btn ${isActive ? 'is-active' : ''}`}
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
              className="apple-mobile-cat-row"
            >
              {cat.hasSubmenu ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpandedCat(
                        mobileExpandedCat === cat.id ? null : cat.id
                      )
                    }
                    className="apple-mobile-cat-toggle"
                  >
                    <span>{cat.title}</span>
                    <ChevronDown
                      size={16}
                      className={`apple-chevron-arrow ${mobileExpandedCat === cat.id ? 'rotated' : ''}`}
                    />
                  </button>

                  {mobileExpandedCat === cat.id && (
                    <div className="apple-mobile-subcols-wrap">
                      {cat.columns &&
                        cat.columns.map((col) => (
                          <div
                            key={col.id}
                            className="apple-mobile-subcol-card"
                            style={{
                              border: `1px solid ${col.borderColor}`
                            }}
                          >
                            <div className={`apple-mobile-subcol-header ${col.items.length > 0 ? 'has-divider' : ''}`}>
                              <span
                                className="apple-mobile-subcol-title"
                                style={{ color: col.color }}
                              >
                                {col.title}
                              </span>
                            </div>
                            {col.items.length > 0 && (
                              <div className="apple-mobile-subitems-grid">
                                {col.items.map((sub, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={sub.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (onNavigate) onNavigate(sub.href);
                                      setMobileMenuOpen(false);
                                    }}
                                    className="apple-mobile-subitem-link"
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
                  className="apple-mobile-cat-link"
                >
                  {cat.title}
                </a>
              )}
            </div>
          ))}

          <div className="apple-mobile-bottom-actions">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCalendar) {
                  onOpenCalendar();
                } else if (onNavigate) {
                  onNavigate('/retreat/sapkhoihanh');
                }
              }}
              className="apple-mobile-action-calendar"
            >
              <Calendar size={16} color="#4ade80" />
              <span>Lịch khởi hành</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="apple-mobile-action-consult"
            >
              Nhận tư vấn
            </button>
          </div>
        </div>
      )}
    </>
  );
}
