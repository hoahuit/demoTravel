import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchProductsApi,
  createConsultationApi,
  getImageUrl,
  KollectionProduct
} from '../services/apiService';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Check,
  Star,
  Flame,
  ArrowRight,
  ShieldCheck,
  Truck,
  Gift,
  Feather,
  Heart,
  X,
  Phone,
  User,
  MapPin,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
  Eye,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';
import { useToast } from './ui/Toast';

interface KollectionShopPageProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const FEATURED_CATEGORIES = [
  {
    id: 'souvenirs',
    name: 'Souvenirs',
    subtitle: 'Artisan crafted',
    categoryKey: 'Trà & Thảo Mộc',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    description: 'Vật phẩm thủ công, trà búp cổ thụ và quà lưu niệm tinh tuyển từ các nghệ nhân truyền thống.'
  },
  {
    id: 'gear',
    name: 'Gear',
    subtitle: 'Built to last',
    categoryKey: 'Phụ Kiện Du Lịch',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    description: 'Trang thiết bị & phụ kiện du lịch tĩnh dưỡng chuẩn bền bỉ, đồng hành qua mọi nẻo đường.'
  },
  {
    id: 'essentials',
    name: 'Essentials',
    subtitle: 'Pack smarter',
    categoryKey: 'Nến Thơm & Tinh Dầu',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80',
    description: 'Vật phẩm thiết yếu thanh lọc tâm trí: nến thơm hoàng đàn, tinh dầu và túi chườm thảo mộc.'
  }
];

export const SHOP_NAV_CATEGORIES = [
  { id: 'All', label: 'All Products' },
  { id: 'Accessories', label: 'Accessories', categoryKey: 'Phụ Kiện Du Lịch' },
  { id: 'Souvenirs', label: 'Souvenirs', categoryKey: 'Trà & Thảo Mộc' },
  { id: 'Gear', label: 'Gear', categoryKey: 'Trang Phục Tĩnh Dưỡng' },
  { id: 'Essentials', label: 'Essentials', categoryKey: 'Nến Thơm & Tinh Dầu' }
];

export default function KollectionShopPage({ currentPath = '/kollection-4u', onNavigate }: KollectionShopPageProps) {
  const toast = useToast();
  const [products, setProducts] = useState<KollectionProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNavCategory, setSelectedNavCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Cart State (stored locally)
  const [cartItems, setCartItems] = useState<{ product: KollectionProduct; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // Selected Product for Detail Modal
  const [activeProduct, setActiveProduct] = useState<KollectionProduct | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [orderSubmitting, setOrderSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsApi();
      setProducts(data);
    } catch (err: any) {
      toast?.show?.('Không thể tải danh sách sản phẩm: ' + (err?.message || err), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Update active image index when activeProduct changes
  useEffect(() => {
    setActiveImageIndex(0);
    setDetailQuantity(1);
  }, [activeProduct]);

  // Cart Total Count
  const cartTotalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const handleAddToCart = (product: KollectionProduct, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id || item.product.slug === product.slug);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id || item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    toast?.show?.(`Đã thêm "${product.title}" vào giỏ hàng!`, 'success');
  };

  const handleUpdateCartQty = (productId: number | undefined, slug: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId || item.product.slug === slug) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: KollectionProduct; quantity: number }[]
    );
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchCat = true;
      if (selectedNavCategory !== 'All') {
        const foundCat = SHOP_NAV_CATEGORIES.find(c => c.id === selectedNavCategory);
        if (foundCat && foundCat.categoryKey) {
          matchCat = p.category === foundCat.categoryKey;
        } else {
          matchCat = p.category.toLowerCase().includes(selectedNavCategory.toLowerCase());
        }
      }

      return matchSearch && matchCat;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (b.id || 0) - (a.id || 0));
    } else {
      result = [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedNavCategory, sortBy]);

  const formatVnd = (amount?: number) => {
    if (!amount) return '0 ₫';
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const handleOpenCheckout = () => {
    if (cartItems.length === 0 && !activeProduct) {
      toast?.show?.('Giỏ hàng của bạn đang trống', 'error');
      return;
    }
    setOrderSuccess(false);
    setCheckoutModalOpen(true);
    setCartOpen(false);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || !orderForm.phone.trim()) {
      toast?.show?.('Vui lòng nhập họ tên và số điện thoại nhận hàng', 'error');
      return;
    }

    setOrderSubmitting(true);
    try {
      const itemsListStr = cartItems.length > 0
        ? cartItems.map(i => `${i.product.title} (x${i.quantity})`).join(', ')
        : `${activeProduct?.title} (x${detailQuantity})`;

      const totalVal = cartItems.length > 0
        ? cartTotalPrice
        : ((activeProduct?.price || 0) * detailQuantity);

      const notesCombined = `[ĐƠN HÀNG NOMADSTORE / KOLLECTION 4U] Sản phẩm: ${itemsListStr}. Tổng tiền: ${formatVnd(totalVal)}. Địa chỉ nhận hàng: ${orderForm.address || 'Chưa cung cấp'}. Ghi chú: ${orderForm.notes || 'Không'}`;

      await createConsultationApi({
        fullName: orderForm.fullName,
        phone: orderForm.phone,
        email: orderForm.email || 'customer@4uretreat.vn',
        destination: `Shop Đơn Hàng: ${itemsListStr.slice(0, 80)}`,
        status: 'pending',
        notes: notesCombined
      });

      setOrderSuccess(true);
      setCartItems([]);
      toast?.show?.('Gửi đơn đặt hàng thành công! Đội ngũ NomadStore sẽ liên hệ sớm nhất.', 'success');
    } catch (err: any) {
      toast?.show?.('Lỗi đặt hàng: ' + (err?.message || err), 'error');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const getProductGallery = (product: KollectionProduct): string[] => {
    if (Array.isArray(product.gallery) && product.gallery.length > 0) {
      return product.gallery;
    }
    if (typeof product.gallery === 'string' && product.gallery.startsWith('[')) {
      try {
        return JSON.parse(product.gallery);
      } catch {
        return [product.heroImage];
      }
    }
    return [product.heroImage];
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: '#111827' }}>

      {/* Floating Shopping Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 99,
          backgroundColor: '#006d36',
          color: '#ffffff',
          border: 'none',
          borderRadius: '999px',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 24px rgba(0, 109, 54, 0.35)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '14px',
          transition: 'transform 0.2s ease, background 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <ShoppingCart size={18} />
        <span>Giỏ Hàng</span>
        {cartTotalItems > 0 && (
          <span style={{
            backgroundColor: '#ffffff',
            color: '#006d36',
            fontSize: '12px',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '999px',
            marginLeft: '2px'
          }}>
            {cartTotalItems}
          </span>
        )}
      </button>

      {/* 2. CINEMATIC HERO SECTION (NOMADSTORE CONCEPT) */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '620px',
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.1) 100%), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff'
      }}>
        <div style={{ maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '580px' }}>
            <h1 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              margin: '0 0 20px 0',
              color: '#ffffff',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Equip Your Next Great Adventure
            </h1>

            <p style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: '#e5e7eb',
              margin: '0 0 32px 0',
              fontWeight: 400
            }}>
              Curated travel gear, artisan souvenirs, and essentials designed for the modern explorer. Quality you can trust, wherever the map takes you.
            </p>

            <button
              onClick={() => scrollToSection('featured-categories')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '999px',
                backgroundColor: '#006d36',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, background 0.2s ease',
                boxShadow: '0 4px 14px rgba(0, 109, 54, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#005429'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#006d36'}
            >
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATEGORIES SECTION (3-COLUMN BENTO CARDS) */}
      <section id="featured-categories" style={{ maxWidth: '1240px', margin: '0 auto', padding: '80px 24px 60px 24px' }}>

        {/* Section Header with View All */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Featured Categories
          </h2>

          <button
            onClick={() => { setSelectedNavCategory('All'); scrollToSection('product-catalog'); }}
            style={{
              background: 'none',
              border: 'none',
              color: '#006d36',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        {/* 3 Category Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {FEATURED_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                const navMatch = SHOP_NAV_CATEGORIES.find(c => c.label.toLowerCase() === cat.name.toLowerCase());
                if (navMatch) {
                  setSelectedNavCategory(navMatch.id);
                } else {
                  setSelectedNavCategory(cat.categoryKey);
                }
                scrollToSection('product-catalog');
              }}
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
              }}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Gradient Scrim Overlay at Bottom */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '28px'
              }}>
                <h3 style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 4px 0',
                  letterSpacing: '-0.01em'
                }}>
                  {cat.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#d1d5db',
                  margin: 0,
                  fontWeight: 500
                }}>
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT CATALOG GRID */}
      <section id="product-catalog" style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px 24px 100px 24px' }}>

        {/* Category Pills & Search Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '36px',
          paddingBottom: '20px',
          borderBottom: '1px solid #f1f5f9'
        }}>
          {/* Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {SHOP_NAV_CATEGORIES.map((cat) => {
              const isActive = selectedNavCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedNavCategory(cat.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: isActive ? '1px solid #006d36' : '1px solid #e5e7eb',
                    backgroundColor: isActive ? '#006d36' : '#ffffff',
                    color: isActive ? '#ffffff' : '#374151',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <option value="featured">✨ Nổi Bật</option>
              <option value="newest">🆕 Mới Về</option>
              <option value="price-asc">💵 Giá Tăng Dần</option>
              <option value="price-desc">💎 Giá Giảm Dần</option>
            </select>
          </div>
        </div>

        {/* Product Cards List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <RefreshCw size={36} className="spin" style={{ color: '#006d36', marginBottom: '16px' }} />
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#6b7280' }}>Đang nạp danh mục sản phẩm...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#f9fafb', borderRadius: '16px' }}>
            <ShoppingBag size={44} style={{ color: '#9ca3af', marginBottom: '14px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>Không tìm thấy sản phẩm</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 16px 0' }}>Hãy thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.</p>
            <button
              onClick={() => { setSelectedNavCategory('All'); setSearchQuery(''); }}
              style={{ padding: '8px 18px', borderRadius: '8px', backgroundColor: '#006d36', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Xem Tất Cả
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
            {filteredProducts.map((product) => {
              const discountPercent = product.originalPrice && product.originalPrice > product.price
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
                  }}
                >
                  {/* Image Frame */}
                  <div
                    style={{ position: 'relative', width: '100%', height: '260px', backgroundColor: '#f8fafc', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => setActiveProduct(product)}
                  >
                    <img
                      src={getImageUrl(product.heroImage)}
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />

                    {/* Badges */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                      {discountPercent > 0 && (
                        <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#dc2626', color: '#ffffff', fontSize: '11px', fontWeight: 800 }}>
                          -{discountPercent}%
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span style={{ padding: '3px 8px', borderRadius: '6px', backgroundColor: '#f97316', color: '#ffffff', fontSize: '11px', fontWeight: 800 }}>
                          Bán chạy
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                      {product.category}
                    </div>

                    <h3
                      onClick={() => setActiveProduct(product)}
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#111827',
                        margin: '0 0 6px 0',
                        cursor: 'pointer',
                        lineHeight: 1.35,
                        minHeight: '44px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {product.title}
                    </h3>

                    {/* Price & Add to Cart */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto',
                      paddingTop: '12px',
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <div>
                        <div style={{ fontSize: '17px', fontWeight: 800, color: '#006d36' }}>
                          {formatVnd(product.price)}
                        </div>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <div style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>
                            {formatVnd(product.originalPrice)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#006d36',
                          color: '#ffffff',
                          fontSize: '13px',
                          fontWeight: 700,
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Plus size={14} /> Thêm
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. SLIDE-OVER SHOPPING CART DRAWER */}
      {cartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: '#ffffff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
            padding: '24px'
          }}>
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 800, color: '#111827' }}>
                <ShoppingCart size={20} style={{ color: '#006d36' }} /> Giỏ Hàng Của Bạn ({cartTotalItems})
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
                  <ShoppingBag size={40} style={{ margin: '0 auto 12px auto' }} />
                  <p style={{ fontSize: '14px', margin: 0 }}>Chưa có sản phẩm nào trong giỏ</p>
                </div>
              ) : (
                cartItems.map(({ product, quantity }) => (
                  <div key={product.id || product.slug} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '10px', border: '1px solid #f0f0f0' }}>
                    <img src={getImageUrl(product.heroImage)} alt="" style={{ width: '54px', height: '54px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{product.title}</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#006d36', marginTop: '2px' }}>{formatVnd(product.price)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
                      <button onClick={() => handleUpdateCartQty(product.id, product.slug, -1)} style={{ padding: '4px 8px', background: '#ffffff', border: 'none', cursor: 'pointer' }}><Minus size={12} /></button>
                      <span style={{ padding: '0 8px', fontSize: '12px', fontWeight: 700 }}>{quantity}</span>
                      <button onClick={() => handleUpdateCartQty(product.id, product.slug, 1)} style={{ padding: '4px 8px', background: '#ffffff', border: 'none', cursor: 'pointer' }}><Plus size={12} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>
                  <span>Tổng tiền thanh toán:</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#006d36' }}>{formatVnd(cartTotalPrice)}</span>
                </div>
                <button
                  onClick={handleOpenCheckout}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#006d36',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <ShoppingBag size={18} /> Tiến Hành Đặt Hàng
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 6. PRODUCT DETAIL MODAL */}
      {activeProduct && !checkoutModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '860px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1.3fr',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={18} />
            </button>

            <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderRight: '1px solid #f0f0f0' }}>
              <div style={{ width: '100%', height: '320px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', backgroundColor: '#ffffff' }}>
                <img src={getImageUrl(getProductGallery(activeProduct)[activeImageIndex] || activeProduct.heroImage)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {getProductGallery(activeProduct).length > 1 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {getProductGallery(activeProduct).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{ width: '56px', height: '56px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', border: activeImageIndex === idx ? '2px solid #006d36' : '1px solid #e5e7eb' }}
                    >
                      <img src={getImageUrl(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#006d36', textTransform: 'uppercase', marginBottom: '4px' }}>
                {activeProduct.category}
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                {activeProduct.title}
              </h2>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#006d36', marginBottom: '14px' }}>
                {formatVnd(activeProduct.price)}
              </div>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                {activeProduct.description || activeProduct.subtitle}
              </p>
              {activeProduct.specifications && (
                <div style={{ padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px', color: '#475569', marginBottom: '20px' }}>
                  <strong>Quy cách: </strong>{activeProduct.specifications}
                </div>
              )}

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    handleAddToCart(activeProduct, detailQuantity);
                    setActiveProduct(null);
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #006d36', backgroundColor: '#ffffff', color: '#006d36', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                  + Thêm Vào Giỏ
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(activeProduct, detailQuantity);
                    setCheckoutModalOpen(true);
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#006d36', color: '#ffffff', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                >
                  Mua Ngay
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 7. CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 11000,
          padding: '20px'
        }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', width: '100%', maxWidth: '520px', padding: '30px', position: 'relative' }}>
            <button onClick={() => setCheckoutModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
              <X size={20} />
            </button>

            {orderSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} style={{ color: '#006d36', margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>Đặt Hàng Thành Công!</h3>
                <p style={{ fontSize: '14px', color: '#4b5563', margin: '0 0 20px 0' }}>Chuyên viên NomadStore sẽ liên hệ số điện thoại <strong>{orderForm.phone}</strong> để giao hàng.</p>
                <button onClick={() => { setCheckoutModalOpen(false); setActiveProduct(null); }} style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#006d36', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Đóng</button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>Thông Tin Giao Hàng</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0' }}>Điền thông tin để NomadStore gửi gói hàng đến tận tay bạn.</p>

                <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Họ và tên *</label>
                    <input type="text" required placeholder="Nguyễn Văn An" value={orderForm.fullName} onChange={e => setOrderForm({ ...orderForm, fullName: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Số điện thoại *</label>
                      <input type="tel" required placeholder="0912 345 678" value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Email</label>
                      <input type="email" placeholder="an@gmail.com" value={orderForm.email} onChange={e => setOrderForm({ ...orderForm, email: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Địa chỉ nhận hàng</label>
                    <input type="text" placeholder="Số nhà, tên đường, tỉnh thành..." value={orderForm.address} onChange={e => setOrderForm({ ...orderForm, address: e.target.value })} style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '4px' }}>Ghi chú</label>
                    <textarea rows={2} placeholder="Ghi chú thêm..." value={orderForm.notes} onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>

                  <button type="submit" disabled={orderSubmitting} style={{ marginTop: '6px', padding: '12px', borderRadius: '8px', backgroundColor: '#006d36', color: '#ffffff', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                    {orderSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Hàng'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. MINIMAL CLEAN FOOTER (NOMADSTORE CONCEPT) */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f0f0f0',
        padding: '36px 24px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#006d36', fontSize: '16px', marginBottom: '4px' }}>
              NomadStore
            </div>
            <div>© 2026 NomadStore Travel Gear · 4U Retreat. All rights reserved.</div>
          </div>

          <div style={{ display: 'flex', gap: '28px', fontWeight: 500, color: '#4b5563' }}>
            <span style={{ cursor: 'pointer' }}>Shipping</span>
            <span style={{ cursor: 'pointer' }}>Returns</span>
            <span style={{ cursor: 'pointer' }}>About Us</span>
            <span style={{ cursor: 'pointer' }}>Newsletter</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
