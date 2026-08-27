import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { fetchProductsApi, KollectionProduct, getImageUrl } from '../services/apiService';
import { DEFAULT_NOMAD_PRODUCTS } from './KollectionShopPage';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import './KollectionSection.css';

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
    <section id="kollection-4u-section" className="kollection-section-root">
      {/* ══════════════════════════════════════════════════════════════
          100% FULL WIDTH EDGE-TO-EDGE CONTAINER
      ══════════════════════════════════════════════════════════════ */}
      <div className="kollection-full-container">
        {/* Header Title & Subtitle */}
        <ScrollReveal>
          <div className="kollection-header-center">
            <span className="kollection-header-badge">
              <Sparkles size={14} />
              KOLLECTION 4U · VẬT PHẨM TĨNH DƯỠNG ĐỘC BẢN
            </span>

            <h2 className="kollection-title-italic kollection-headline">
              Kollection 4U — Đánh Thức Mọi Giác Quan
            </h2>

            <p className="kollection-subdesc">
              Tuyển tập những vật phẩm tĩnh dưỡng cao cấp, trà cổ thụ Shan Tuyết, thiền phục linen tự nhiên và trang bị dã ngoại thủ công được thiết kế để nâng niu Thân · Tâm · Trí.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Category Tabs */}
        <ScrollReveal delay={60}>
          <div className="kollection-tabs-flex">
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
                >
                  {/* Image Box */}
                  <div className="kollection-lift">
                    <img
                      src={getImageUrl(p.heroImage || p.image || '')}
                      alt={p.title || p.name || 'Kollection 4U'}
                      className="kollection-img-zoom"
                      loading="lazy"
                    />

                    {/* Top Floating Badges */}
                    <div className="kollection-badge-overlay">
                      {p.isBestSeller ? (
                        <span className="kollection-pill-bestseller">
                          BEST SELLER
                        </span>
                      ) : p.isExclusive ? (
                        <span className="kollection-pill-exclusive">
                          ĐỘC BẢN 4U
                        </span>
                      ) : p.isNewArrival ? (
                        <span className="kollection-pill-new">
                          MỚI RA MẮT
                        </span>
                      ) : <span />}

                      {hasDiscount && (
                        <span className="kollection-pill-discount">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div className="kollection-card-body">
                    <div className="kollection-card-meta-row">
                      <span className="kollection-card-category">
                        {p.category || 'Vật phẩm 4U'}
                      </span>

                      <div className="kollection-card-rating">
                        <Star size={12} fill="#c9a050" />
                        <span>5.0</span>
                      </div>
                    </div>

                    <h3 className="kollection-title-italic kollection-card-title">
                      {p.title || p.name}
                    </h3>

                    <p className="kollection-card-desc">
                      {p.subtitle || p.description}
                    </p>

                    {/* Price and Link */}
                    <div className="kollection-card-footer">
                      <div className="kollection-price-row">
                        <span className="kollection-price-current">
                          {formatPrice(p.price)}
                        </span>
                        {hasDiscount && (
                          <span className="kollection-price-original">
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
          <div className="kollection-cta-wrap">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('/kollection-4u');
              }}
              className="kollection-main-cta-btn"
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
