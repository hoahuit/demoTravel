import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { fetchProductsApi, KollectionProduct, getImageUrl } from '../services/apiService';
import { DEFAULT_NOMAD_PRODUCTS } from './KollectionShopPage';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export interface KollectionSectionProps {
  onNavigate?: (path: string) => void;
}

export default function KollectionSection({ onNavigate }: KollectionSectionProps) {
  const [products, setProducts] = useState<KollectionProduct[]>(DEFAULT_NOMAD_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProductsApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    }).catch(() => {
      setProducts(DEFAULT_NOMAD_PRODUCTS);
    });
  }, []);

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'tea', label: 'Trà & Thảo Mộc', match: ['Trà', 'Thảo mộc', 'Quà lưu niệm'] },
    { id: 'scent', label: 'Nến Thơm & Trầm', match: ['Nến', 'Tinh dầu', 'Thiết yếu'] },
    { id: 'clothes', label: 'Thiền Phục Linen', match: ['Thiền phục', 'Linen', 'Trang bị'] },
    { id: 'accessories', label: 'Phụ Kiện Du Lịch', match: ['Phụ kiện', 'Bình giữ nhiệt', 'Balo'] }
  ];

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    const catObj = categories.find(c => c.id === selectedCategory);
    if (!catObj || !catObj.match) return true;
    const catStr = (p.category || '') + ' ' + (p.title || '') + ' ' + (p.description || '');
    return catObj.match.some(m => catStr.toLowerCase().includes(m.toLowerCase()));
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleProductClick = (product: KollectionProduct) => {
    if (onNavigate) {
      onNavigate(`/kollection-4u?product=${product.slug || product.id}`);
    }
  };

  return (
    <section
      id="kollection-4u-section"
      style={{
        background: '#e5efe8',
        color: '#10201B',
        padding: '120px 0 130px',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        borderTop: '1px solid rgba(16, 32, 27, 0.08)',
        fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif"
      }}
    >
      <style>{`
        .kollection-title-italic {
          font-family: 'Libre Caslon Text', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }

        .kollection-lift {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease;
        }
        .kollection-lift:hover {
          transform: translateY(-6px);
        }

        .kollection-img-zoom {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kollection-card:hover .kollection-img-zoom {
          transform: scale(1.05);
        }

        .kollection-underline-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #10201B;
          text-decoration: none;
          border-bottom: 1.5px solid #10201B;
          padding-bottom: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .kollection-card:hover .kollection-underline-link,
        .kollection-underline-link:hover {
          color: #006d36;
          border-bottom-color: #006d36;
          letter-spacing: 0.18em;
        }

        .kollection-filter-btn {
          background: rgba(16, 32, 27, 0.05);
          color: #405246;
          border: 1px solid rgba(16, 32, 27, 0.12);
          padding: 9px 24px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .kollection-filter-btn:hover,
        .kollection-filter-btn.active {
          background: #10201B;
          color: #ffffff;
          border-color: #10201B;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(16, 32, 27, 0.18);
          transform: translateY(-1px);
        }

        .kollection-grid-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 64px 48px;
          width: 100%;
        }

        @media (max-width: 900px) {
          .kollection-grid-2col {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .kollection-full-container {
            padding: 0 20px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          100% FULL WIDTH EDGE-TO-EDGE CONTAINER
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="kollection-full-container"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: 0,
          padding: '0 48px',
          boxSizing: 'border-box'
        }}
      >
        {/* Header Title & Subtitle */}
        <ScrollReveal>
          <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px auto' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 109, 54, 0.1)',
                border: '1px solid rgba(0, 109, 54, 0.25)',
                color: '#006d36',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.18em',
                padding: '6px 22px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}
            >
              <Sparkles size={14} />
              KOLLECTION 4U · VẬT PHẨM TĨNH DƯỠNG ĐỘC BẢN
            </span>

            <h2
              className="kollection-title-italic"
              style={{
                fontSize: 'clamp(34px, 4.4vw, 56px)',
                color: '#10201B',
                lineHeight: 1.18,
                margin: '0 0 16px 0',
                letterSpacing: '-0.02em'
              }}
            >
              Kollection 4U — Đánh Thức Mọi Giác Quan
            </h2>

            <p
              style={{
                fontSize: 'clamp(15px, 1.4vw, 17.5px)',
                color: '#405246',
                lineHeight: 1.7,
                margin: '0 auto',
                fontWeight: 400
              }}
            >
              Tuyển tập những vật phẩm tĩnh dưỡng cao cấp, trà cổ thụ Shan Tuyết, thiền phục linen tự nhiên và trang bị dã ngoại thủ công được thiết kế để nâng niu Thân · Tâm · Trí.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Category Tabs */}
        <ScrollReveal delay={60}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '64px'
            }}
          >
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`kollection-filter-btn ${selectedCategory === c.id ? 'active' : ''}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 2-COLUMN FULL WIDTH GRID */}
        <div className="kollection-grid-2col">
          {filteredProducts.map((p, idx) => {
            const hasDiscount = p.originalPrice && p.originalPrice > p.price;
            const discountPercent = hasDiscount
              ? Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100)
              : 0;

            return (
              <ScrollReveal key={p.id || idx} delay={(idx % 2) * 80}>
                <div
                  className="kollection-card"
                  onClick={() => handleProductClick(p)}
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Image Box */}
                  <div
                    className="kollection-lift"
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 10',
                      overflow: 'hidden',
                      borderRadius: '10px',
                      marginBottom: '24px',
                      boxShadow: '0 14px 40px rgba(16,32,27,0.08)',
                      position: 'relative',
                      background: '#d8e5dc'
                    }}
                  >
                    <img
                      src={getImageUrl(p.heroImage || p.image || '')}
                      alt={p.title || p.name || 'Kollection 4U'}
                      className="kollection-img-zoom"
                      loading="lazy"
                    />

                    {/* Top Floating Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pointerEvents: 'none'
                      }}
                    >
                      {p.isBestSeller ? (
                        <span
                          style={{
                            background: '#c9a050',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 12px',
                            borderRadius: '999px',
                            letterSpacing: '0.06em',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}
                        >
                          BEST SELLER
                        </span>
                      ) : p.isExclusive ? (
                        <span
                          style={{
                            background: '#006d36',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 12px',
                            borderRadius: '999px',
                            letterSpacing: '0.06em',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}
                        >
                          ĐỘC BẢN 4U
                        </span>
                      ) : p.isNewArrival ? (
                        <span
                          style={{
                            background: '#10201B',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 12px',
                            borderRadius: '999px',
                            letterSpacing: '0.06em',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}
                        >
                          MỚI RA MẮT
                        </span>
                      ) : <span />}

                      {hasDiscount && (
                        <span
                          style={{
                            background: 'rgba(220, 38, 38, 0.92)',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '999px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}
                        >
                          -{discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div style={{ padding: '0 4px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059'
                        }}
                      >
                        {p.category || 'Vật phẩm 4U'}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#c9a050', fontSize: '12px', fontWeight: 700 }}>
                        <Star size={12} fill="#c9a050" />
                        <span>5.0</span>
                      </div>
                    </div>

                    <h3
                      className="kollection-title-italic"
                      style={{
                        fontSize: '30px',
                        color: '#10201B',
                        margin: '0 0 12px 0',
                        lineHeight: 1.25
                      }}
                    >
                      {p.title || p.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.65,
                        color: '#405246',
                        margin: '0 0 18px 0',
                        fontWeight: 400
                      }}
                    >
                      {p.subtitle || p.description}
                    </p>

                    {/* Price and Link */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 800, color: '#006d36' }}>
                          {formatPrice(p.price)}
                        </span>
                        {hasDiscount && (
                          <span style={{ fontSize: '13px', color: '#8c9e92', textDecoration: 'line-through' }}>
                            {formatPrice(p.originalPrice!)}
                          </span>
                        )}
                      </div>

                      <span className="kollection-underline-link">
                        Xem chi tiết & Đặt mua
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <ScrollReveal delay={100}>
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('/kollection-4u');
              }}
              style={{
                background: '#1E4A3D',
                color: '#ffffff',
                border: 'none',
                padding: '16px 42px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(30, 74, 61, 0.25)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Khám phá toàn bộ Cửa Hàng Kollection 4U</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
