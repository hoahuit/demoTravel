import React, { useState, useEffect, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import { BLOGS_DATA, syncBlogsDataFromApi, BlogArticle } from '../data/blogsData';
import { TOURS_DATA, TourPackage } from '../data/toursData';
import { fetchSectionItemsApi, getImageUrl } from '../services/apiService';
import {
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Heart,
  Compass,
  Leaf,
  Star,
  Quote,
  Bookmark,
  Coffee,
  Feather
} from 'lucide-react';

interface BlogPageProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
  onOpenCustomTour?: (destinationName: string) => void;
}

interface ArticleCategory {
  id: string;
  label: string;
  icon: string;
  match?: string[];
}

const ARTICLE_CATEGORIES: ArticleCategory[] = [
  { id: 'all', label: 'Tất Cả Bài Viết', icon: '🌐' },
  { id: 'cam-nang-tinh-duong', label: 'Cẩm Nang Tĩnh Dưỡng & Thiền Trà', icon: '🍵', match: ['Cẩm Nang Tĩnh Dưỡng', 'Retreat', 'Thiền Trà'] },
  { id: 'ban-do-nang-luong', label: 'Bản Đồ Năng Lượng Chữa Lành', icon: '🧭', match: ['Bản Đồ Năng Lượng', 'Culture', 'Năng Lượng'] },
  { id: 'cau-chuyen-khach-hang', label: 'Câu Chuyện Hành Trình', icon: '💖', match: ['Câu Chuyện Hành Trình', 'Khách Hàng', 'Story'] },
  { id: 'a-tip-a-day', label: 'A Tip A Day (Mỗi Ngày Một Mẹo)', icon: '🌿', match: ['A Tip A Day', 'Tips', 'Tắm Rừng'] },
  { id: 'am-thuc-thuc-duong', label: 'Ẩm Thực Thực Dưỡng', icon: '🥗', match: ['Ẩm Thực Thực Dưỡng', 'Food', 'Organic'] },
];

export default function BlogPage({
  currentPath = '/dieu-hay',
  onNavigate,
  onOpenBooking,
  onOpenCustomTour
}: BlogPageProps) {
  const [blogs, setBlogs] = useState<BlogArticle[]>(BLOGS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchSectionItemsApi('blog')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          syncBlogsDataFromApi(data);
          setBlogs([...data]);
        }
      })
      .catch(() => {
        // Fallback to local default blogs
      });
  }, []);

  // Parse blog slug from currentPath (e.g. /dieu-hay/cam-nang-tinh-duong or /101-dieu-hay/ban-do-nang-luong)
  const pathSlug = useMemo(() => {
    const clean = currentPath.split('?')[0].replace(/^\/+|\/+$/g, '');
    const parts = clean.split('/');
    if (
      parts.length > 1 &&
      (parts[0] === 'dieu-hay' || parts[0] === '101-dieu-hay' || parts[0] === 'blog' || parts[0] === 'tin-tuc')
    ) {
      return parts[1].toLowerCase().trim();
    }
    return '';
  }, [currentPath]);

  // Determine active article (either from URL or local state)
  const activeArticle = useMemo(() => {
    const targetSlug = pathSlug || selectedSlug;
    if (!targetSlug) return null;
    return blogs.find(
      (b) =>
        b.slug?.toLowerCase() === targetSlug.toLowerCase() ||
        b.categorySlug?.toLowerCase() === targetSlug.toLowerCase() ||
        targetSlug.toLowerCase().includes(b.slug?.toLowerCase() || '')
    );
  }, [blogs, pathSlug, selectedSlug]);

  const getAuthorName = (article?: BlogArticle) => article?.author?.name || article?.authorName || 'Ban Biên Tập 4U';
  const getAuthorRole = (article?: BlogArticle) => article?.author?.role || article?.authorRole || 'Senior Wellness Editor';
  const getAuthorAvatar = (article?: BlogArticle) =>
    article?.author?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

  // Filtered blogs for directory view
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const catObj = ARTICLE_CATEGORIES.find((c) => c.id === selectedCategory);
        if (catObj?.match) {
          matchesCategory = catObj.match.some(
            (m) =>
              b.category?.toLowerCase().includes(m.toLowerCase()) ||
              b.categorySlug?.toLowerCase().includes(m.toLowerCase()) ||
              b.title?.toLowerCase().includes(m.toLowerCase())
          );
        }
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = b.title?.toLowerCase().includes(q);
        const subMatch = b.subtitle?.toLowerCase().includes(q);
        const introMatch = b.introduction?.toLowerCase().includes(q);
        const catMatch = b.category?.toLowerCase().includes(q);
        matchesSearch = Boolean(titleMatch || subMatch || introMatch || catMatch);
      }

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Related tours for active article
  const relatedTours = useMemo(() => {
    if (!activeArticle) return [];
    if (Array.isArray(activeArticle.relatedToursSlugs) && activeArticle.relatedToursSlugs.length > 0) {
      return TOURS_DATA.filter((t) =>
        activeArticle.relatedToursSlugs?.some(
          (slug) => t.slug?.toLowerCase().includes(slug.toLowerCase()) || slug.toLowerCase().includes(t.slug?.toLowerCase() || '')
        )
      );
    }
    return TOURS_DATA.slice(0, 2);
  }, [activeArticle]);

  return (
    <div
      style={{
        background: '#e5efe8',
        color: '#10201B',
        fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden'
      }}
    >
      <style>{`
        .zannier-title-italic {
          font-family: 'Libre Caslon Text', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }

        .hover-lift {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: transparent !important;
          box-shadow: none !important;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          background: transparent !important;
          box-shadow: none !important;
        }

        .zannier-card {
          background: transparent !important;
          box-shadow: none !important;
        }
        .zannier-card:hover {
          background: transparent !important;
          box-shadow: none !important;
        }

        .zannier-img-zoom {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }
        .zannier-card:hover .zannier-img-zoom {
          transform: scale(1.05);
        }

        .zannier-underline-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #10201B;
          text-decoration: none;
          border-bottom: 1.5px solid #10201B;
          padding-bottom: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .zannier-card:hover .zannier-underline-link,
        .zannier-underline-link:hover {
          color: #006d36;
          border-bottom-color: #006d36;
          letter-spacing: 0.16em;
        }

        .destination-search-input:focus {
          outline: none;
          border-color: #006d36 !important;
          box-shadow: 0 0 0 3px rgba(0, 109, 54, 0.15) !important;
        }

        .drop-cap::first-letter {
          font-family: 'Libre Caslon Text', Georgia, serif;
          float: left;
          font-size: 4.8rem;
          line-height: 0.85;
          padding-top: 4px;
          padding-right: 14px;
          padding-bottom: 4px;
          color: #006d36;
          font-weight: 700;
        }

        @media (max-width: 992px) {
          .zannier-grid-2col,
          .zannier-2col-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .zannier-full-container {
            padding: 0 20px !important;
          }
          .editorial-body {
            padding: 40px 16px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          CASE A: DEDICATED SINGLE ARTICLE DETAIL VIEW (1 HERO IMAGE ONLY, ELEGANT EDITORIAL CONTENT LAYOUT)
      ══════════════════════════════════════════════════════════════ */}
      {activeArticle ? (
        <div style={{ width: '100%', maxWidth: '100%' }}>
          {/* 1 SINGLE HERO IMAGE (100% Full Screen Width Banner) */}
          <section
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '82vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              paddingBottom: '75px',
              paddingTop: '160px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img
                src={getImageUrl(activeArticle.heroImage)}
                alt={activeArticle.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 35%',
                  filter: 'brightness(0.68)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(6, 16, 11, 0.85) 0%, rgba(6, 16, 11, 0.4) 40%, rgba(16, 32, 27, 0.88) 75%, #e5efe8 100%)'
                }}
              />
            </div>

            <div
              className="zannier-full-container"
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '100%',
                padding: '0 48px',
                boxSizing: 'border-box'
              }}
            >

              <ScrollReveal>
                <div style={{ maxWidth: '1080px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(74, 222, 128, 0.22)',
                      border: '1px solid rgba(74, 222, 128, 0.5)',
                      backdropFilter: 'blur(12px)',
                      color: '#4ade80',
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      padding: '8px 22px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Sparkles size={14} />
                    {activeArticle.category?.toUpperCase()} • {activeArticle.readTime}
                  </span>

                  <h1
                    className="zannier-title-italic"
                    style={{
                      fontSize: 'clamp(34px, 4.8vw, 68px)',
                      color: '#ffffff',
                      textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                      lineHeight: 1.16,
                      margin: '0 0 20px 0',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {activeArticle.title}
                  </h1>

                  <p
                    style={{
                      fontSize: 'clamp(17px, 1.9vw, 21px)',
                      color: 'rgba(255, 255, 255, 0.94)',
                      textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
                      lineHeight: 1.7,
                      margin: '0 0 28px 0',
                      fontWeight: 400
                    }}
                  >
                    {activeArticle.subtitle}
                  </p>

                  {/* Author Card Info */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      background: 'rgba(229, 239, 232, 0.95)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(16, 32, 27, 0.15)',
                      padding: '10px 22px',
                      borderRadius: '999px',
                      width: 'fit-content',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <img
                      src={getImageUrl(getAuthorAvatar(activeArticle))}
                      alt={getAuthorName(activeArticle)}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ fontSize: '13px' }}>
                      <strong style={{ color: '#10201B', display: 'block' }}>{getAuthorName(activeArticle)}</strong>
                      <span style={{ color: '#527059', fontSize: '11.5px' }}>
                        {getAuthorRole(activeArticle)} • {activeArticle.publishedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* EDITORIAL CONTENT BODY (Pure Serene Typography, Spacious & Beautiful Layout) */}
          <main
            className="zannier-full-container"
            style={{
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              padding: '60px 48px 100px',
              boxSizing: 'border-box'
            }}
          >
            <div
              className="editorial-body"
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                padding: '0'
              }}
            >
              {/* Introduction Quote / Lead paragraph with Drop-cap styling */}
              {activeArticle.introduction && (
                <div
                  style={{
                    position: 'relative',
                    background: 'rgba(16, 32, 27, 0.04)',
                    borderRadius: '24px',
                    padding: '36px 40px',
                    border: '1px solid rgba(16, 32, 27, 0.08)',
                    borderLeft: '5px solid #006d36',
                    marginBottom: '54px',
                    boxShadow: '0 12px 35px rgba(16, 32, 27, 0.03)'
                  }}
                >
                  <Quote size={32} style={{ color: '#006d36', opacity: 0.35, marginBottom: '12px' }} />
                  <p
                    className="drop-cap"
                    style={{
                      margin: 0,
                      fontSize: 'clamp(18px, 1.85vw, 21px)',
                      color: '#10201B',
                      lineHeight: '1.85',
                      fontWeight: 500,
                      fontStyle: 'italic'
                    }}
                  >
                    {activeArticle.introduction}
                  </p>
                </div>
              )}

              {/* Numbered Structured Editorial Sections */}
              {(activeArticle.sections || []).map((sec, sIdx) => (
                <article
                  key={sIdx}
                  style={{
                    marginBottom: '56px',
                    paddingBottom: '44px',
                    borderBottom: sIdx < (activeArticle.sections?.length || 0) - 1 ? '1px solid rgba(16, 32, 27, 0.1)' : 'none'
                  }}
                >
                  {/* Chapter Number Badge & Section Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <span
                      style={{
                        background: '#006d36',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: '999px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}
                    >
                      CHƯƠNG {sIdx + 1 > 9 ? sIdx + 1 : `0${sIdx + 1}`}
                    </span>
                    <div style={{ height: '1px', flex: 1, background: 'rgba(16, 32, 27, 0.1)' }} />
                  </div>

                  <h2
                    className="zannier-title-italic"
                    style={{
                      fontSize: 'clamp(26px, 2.8vw, 36px)',
                      color: '#10201B',
                      margin: '0 0 20px 0',
                      lineHeight: 1.28
                    }}
                  >
                    {sec.title}
                  </h2>

                  {/* Section Paragraphs with Generous Editorial Line-Height */}
                  <div
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.9',
                      color: '#1e2d25',
                      whiteSpace: 'pre-line',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {sec.text}
                  </div>

                  {/* Curated Expert Tips Box */}
                  {Array.isArray(sec.tips) && sec.tips.length > 0 && (
                    <div
                      style={{
                        background: 'rgba(229, 239, 232, 0.95)',
                        borderRadius: '20px',
                        padding: '24px 28px',
                        border: '1px solid rgba(16, 32, 27, 0.12)',
                        marginTop: '28px',
                        boxShadow: '0 8px 25px rgba(16, 32, 27, 0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <Leaf size={18} style={{ color: '#006d36' }} />
                        <strong style={{ color: '#006d36', fontSize: '14.5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Lời Khuyên & Bí Quyết Thực Hành
                        </strong>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {sec.tips.map((tip, tIdx) => (
                          <div key={tIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <CheckCircle2 size={16} style={{ color: '#006d36', flexShrink: 0, marginTop: '5px' }} />
                            <span style={{ fontSize: '15.5px', color: '#2d3d34', lineHeight: 1.65 }}>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}

              {/* Travel / Practical Tips Section if available */}
              {Array.isArray(activeArticle.travelTips) && activeArticle.travelTips.length > 0 && (
                <div
                  style={{
                    background: 'rgba(16, 32, 27, 0.04)',
                    borderRadius: '20px',
                    padding: '28px 32px',
                    border: '1px solid rgba(16, 32, 27, 0.08)',
                    marginBottom: '48px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <Compass size={20} style={{ color: '#006d36' }} />
                    <h3 className="zannier-title-italic" style={{ fontSize: '22px', color: '#10201B', margin: 0 }}>
                      Cẩm Nang Hành Trang Cho Chuyến Đi
                    </h3>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeArticle.travelTips.map((tip, ttIdx) => (
                      <li key={ttIdx} style={{ fontSize: '16px', color: '#2d3d34', lineHeight: 1.7 }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Conclusion Box */}
              {activeArticle.conclusion && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 109, 54, 0.08) 0%, rgba(16, 32, 27, 0.04) 100%)',
                    borderRadius: '24px',
                    padding: '36px 40px',
                    border: '1px solid rgba(0, 109, 54, 0.2)',
                    marginTop: '20px',
                    textAlign: 'center'
                  }}
                >
                  <Feather size={28} style={{ color: '#006d36', margin: '0 auto 12px' }} />
                  <h3 className="zannier-title-italic" style={{ fontSize: '26px', color: '#10201B', margin: '0 0 14px' }}>
                    Lời Kết Từ Ban Biên Tập
                  </h3>
                  <p style={{ margin: 0, color: '#304237', lineHeight: 1.85, fontSize: '17.5px', fontStyle: 'italic' }}>
                    "{activeArticle.conclusion}"
                  </p>
                </div>
              )}
            </div>

            {/* Related Tours Matching Section (Full Screen Width) */}
            {relatedTours.length > 0 && (
              <section style={{ marginTop: '90px', paddingTop: '70px', borderTop: '1px solid rgba(16, 32, 27, 0.1)', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                  <span
                    style={{
                      color: '#006d36',
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    HÀNH TRÌNH ĐỀ XUẤT
                  </span>
                  <h3 className="zannier-title-italic" style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', color: '#10201B', margin: 0 }}>
                    Trải Nghiệm Các Gói Retreat Liên Quan
                  </h3>
                </div>

                <div
                  className="zannier-2col-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '64px 48px',
                    width: '100%'
                  }}
                >
                  {relatedTours.map((t, idx) => (
                    <div
                      key={idx}
                      className="zannier-card hover-lift"
                      style={{
                        background: 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                      }}
                    >
                      <div>
                        <div
                          style={{
                            height: 'clamp(440px, 52vh, 580px)',
                            width: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: '24px',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          <img
                            className="zannier-img-zoom"
                            src={getImageUrl(t.heroImage || '')}
                            alt={t.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '16px',
                              left: '16px',
                              background: '#006d36',
                              color: '#ffffff',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              padding: '5px 14px',
                              borderRadius: '999px'
                            }}
                          >
                            {t.duration}
                          </div>
                        </div>

                        <div style={{ padding: '0 4px' }}>
                          <span
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: '#527059',
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              display: 'block',
                              marginBottom: '6px'
                            }}
                          >
                            {t.city} • {t.hotel || 'Resort Biệt Lập'}
                          </span>
                          <h4
                            className="zannier-title-italic"
                            style={{ fontSize: '24px', color: '#10201B', margin: '0 0 10px', lineHeight: 1.3 }}
                          >
                            {t.title}
                          </h4>
                          <p style={{ fontSize: '14.5px', color: '#405246', margin: 0, lineHeight: 1.6 }}>{t.subtitle}</p>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '16px 4px 0 4px',
                          borderTop: '1px solid rgba(16, 32, 27, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '16px'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '11px', color: '#527059', display: 'block', textTransform: 'uppercase' }}>Giá trọn gói</span>
                          <strong style={{ fontSize: '20px', color: '#006d36' }}>
                            {typeof t.price === 'number' ? `${t.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ'}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={() => onNavigate(`/tours/${t.slug || t.id}`)}
                            style={{
                              background: '#10201B',
                              color: '#ffffff',
                              border: 'none',
                              padding: '10px 22px',
                              borderRadius: '999px',
                              fontSize: '12.5px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Chi Tiết
                          </button>
                          <button
                            onClick={() => {
                              if (onOpenBooking) onOpenBooking(t);
                              else onNavigate(`/tours/${t.slug || t.id}`);
                            }}
                            style={{
                              background: '#006d36',
                              color: '#ffffff',
                              border: 'none',
                              padding: '10px 24px',
                              borderRadius: '999px',
                              fontSize: '12.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 4px 14px rgba(0, 109, 54, 0.3)'
                            }}
                          >
                            Đặt Tour
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════
           CASE B: DIRECTORY GALLERY LIST VIEW (100% Full Screen Width)
        ══════════════════════════════════════════════════════════════ */
        <div style={{ width: '100%', maxWidth: '100%' }}>
          {/* 1. HERO SECTION */}
          <section
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '62vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              overflow: 'hidden',
              padding: '140px 24px 60px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
                alt="101 Điều Hay"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                  filter: 'brightness(0.65)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(6, 16, 11, 0.85) 0%, rgba(6, 16, 11, 0.45) 45%, rgba(16, 32, 27, 0.85) 75%, #e5efe8 100%)'
                }}
              />
            </div>

            <ScrollReveal>
              <div style={{ position: 'relative', zIndex: 10, maxWidth: '960px', padding: '0 24px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(74, 222, 128, 0.2)',
                    border: '1px solid rgba(74, 222, 128, 0.45)',
                    backdropFilter: 'blur(12px)',
                    color: '#4ade80',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    padding: '8px 22px',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <Sparkles size={14} />
                  101 ĐIỀU HAY • TẠP CHÍ TĨNH DƯỠNG & CHỮA LÀNH
                </span>

                <h1
                  className="zannier-title-italic"
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 72px)',
                    color: '#ffffff',
                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.6)',
                    lineHeight: 1.12,
                    margin: '0 0 20px 0',
                    letterSpacing: '-0.02em'
                  }}
                >
                  101 Điều Hay.<br />Cẩm Nang Sống Tĩnh Lặng & Chữa Lành
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 19.5px)',
                    color: 'rgba(255, 255, 255, 0.94)',
                    textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
                    maxWidth: '820px',
                    margin: '0 auto 32px auto',
                    lineHeight: 1.7,
                    fontWeight: 400
                  }}
                >
                  Khám phá các bí quyết phục hồi Thân · Tâm · Trí, câu chuyện hành trình thực tế, cẩm nang thiền trà và bản đồ năng lượng chữa lành trên khắp dải đất hình chữ S.
                </p>
              </div>
            </ScrollReveal>
          </section>

          {/* 2. FILTER & SEARCH CONTROL BAR (100% Full Screen Width) */}
          <section
            className="zannier-full-container"
            style={{
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              padding: '0 48px 48px',
              position: 'relative',
              zIndex: 15,
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                background: 'rgba(229, 239, 232, 0.95)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '24px 32px',
                boxShadow: '0 16px 45px rgba(16, 32, 27, 0.06)',
                border: '1px solid rgba(16, 32, 27, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                {/* Category Pills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                    flex: 1
                  }}
                >
                  {ARTICLE_CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '999px',
                          border: isActive ? '1px solid #006d36' : '1px solid rgba(16, 32, 27, 0.15)',
                          fontSize: '13px',
                          fontWeight: isActive ? 700 : 600,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          background: isActive ? '#006d36' : 'rgba(229, 239, 232, 0.85)',
                          color: isActive ? '#ffffff' : '#10201B',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: isActive ? '0 6px 20px rgba(0, 109, 54, 0.3)' : 'none'
                        }}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Search Box */}
                <div style={{ position: 'relative', minWidth: '300px', flexShrink: 0 }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#527059'
                    }}
                  />
                  <input
                    type="text"
                    className="destination-search-input"
                    placeholder="Tìm chuyên đề, bí quyết, câu chuyện..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 16px 11px 44px',
                      borderRadius: '999px',
                      border: '1px solid rgba(16, 32, 27, 0.2)',
                      fontSize: '13.5px',
                      background: 'rgba(229, 239, 232, 0.95)',
                      color: '#10201B',
                      boxSizing: 'border-box',
                      transition: 'all 0.25s ease'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '13px',
                        color: '#527059',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Results stats */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  color: '#527059',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(16, 32, 27, 0.08)'
                }}
              >
                <span>
                  Hiển thị <strong style={{ color: '#006d36' }}>{filteredBlogs.length}</strong> bài viết tuyển chọn
                </span>
                <span style={{ fontStyle: 'italic' }}>
                  Click vào từng bài viết để đọc nội dung chuyên sâu và cẩm nang chi tiết
                </span>
              </div>
            </div>
          </section>

          {/* 3. MAIN GALLERY GRID (100% Full Screen Width & 2 items per row) */}
          <main
            className="zannier-full-container"
            style={{
              width: '100%',
              maxWidth: '100%',
              margin: '0 auto',
              padding: '0 48px 120px',
              boxSizing: 'border-box'
            }}
          >
            {filteredBlogs.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '100px 24px',
                  background: 'rgba(229, 239, 232, 0.95)',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px rgba(16, 32, 27, 0.05)',
                  margin: '40px 0',
                  border: '1px solid rgba(16, 32, 27, 0.1)'
                }}
              >
                <BookOpen size={48} style={{ color: '#006d36', margin: '0 auto 16px', opacity: 0.7 }} />
                <h3 className="zannier-title-italic" style={{ fontSize: '28px', color: '#10201B', margin: '0 0 12px 0' }}>
                  Không tìm thấy bài viết phù hợp
                </h3>
                <p style={{ fontSize: '15px', color: '#527059', maxWidth: '480px', margin: '0 auto 24px auto' }}>
                  Không có chuyên đề nào khớp với từ khóa "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  style={{
                    background: '#006d36',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Xem Lại Tất Cả Bài Viết
                </button>
              </div>
            ) : (
              <div
                className="zannier-2col-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '64px 48px',
                  width: '100%'
                }}
              >
                {filteredBlogs.map((b, bIdx) => (
                  <ScrollReveal key={b.slug || b.id || bIdx} delay={(bIdx % 2) * 80}>
                    <div
                      className="hover-lift zannier-card"
                      style={{
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                      }}
                      onClick={() => {
                        setSelectedSlug(b.slug);
                        onNavigate(`/dieu-hay/${b.slug}`);
                      }}
                    >
                      <div>
                        {/* Image Frame */}
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: 'clamp(440px, 52vh, 580px)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            marginBottom: '26px',
                            boxShadow: '0 20px 50px rgba(16, 32, 27, 0.12)'
                          }}
                        >
                          <img
                            className="zannier-img-zoom"
                            src={getImageUrl(b.heroImage)}
                            alt={b.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '20px',
                              left: '20px',
                              background: '#006d36',
                              color: '#ffffff',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              padding: '7px 18px',
                              borderRadius: '999px',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase'
                            }}
                          >
                            {b.category}
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '20px',
                              right: '20px',
                              background: 'rgba(0, 0, 0, 0.75)',
                              backdropFilter: 'blur(8px)',
                              color: '#ffffff',
                              fontSize: '12px',
                              fontWeight: 600,
                              padding: '6px 16px',
                              borderRadius: '999px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Clock size={13} />
                            <span>{b.readTime}</span>
                          </div>
                        </div>

                        {/* Article Info */}
                        <div style={{ padding: '0 4px' }}>
                          <span
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: '#527059',
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              display: 'block',
                              marginBottom: '8px'
                            }}
                          >
                            {getAuthorName(b)} • {b.publishedDate}
                          </span>

                          <h3
                            className="zannier-title-italic"
                            style={{
                              fontSize: 'clamp(26px, 2.6vw, 36px)',
                              color: '#10201B',
                              margin: '0 0 12px 0',
                              lineHeight: 1.25
                            }}
                          >
                            {b.title}
                          </h3>

                          <p
                            style={{
                              fontSize: '15.5px',
                              color: '#405246',
                              lineHeight: 1.75,
                              margin: '0 0 18px 0',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {b.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Underline Link Action */}
                      <div style={{ padding: '14px 4px 0 4px', borderTop: '1px solid rgba(16, 32, 27, 0.1)' }}>
                        <span className="zannier-underline-link">
                          <span>Đọc Bài Viết</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
