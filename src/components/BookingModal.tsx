import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './BookingModal.css';
import { QrCode, ShieldCheck, CheckCircle, X, Sparkles, Plus, Check, Gift, Minus, Tag } from 'lucide-react';
import { createTourBookingApi, validateCouponCodeApi, CouponValidationResult, fetchProductsApi, KollectionProduct, getImageUrl } from '../services/apiService';
import {
  calculateTotal,
  calculateTotalWithCoupon,
  calculateAdultPrice,
  calculateListPrice,
  calculateChildPrice,
  calculateInfantPrice,
  formatVnd as pricingFormatVnd,
  buildPricingInputFromTour,
  type PricingFormulaInput,
  type TotalBreakdown,
} from '../lib/pricingCalculator';

export interface BookingModalProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
  selectedTour?: {
    id?: number | string;
    title?: string;
    price?: number;
    originalPrice?: number;
    childPrice?: number;
    infantPrice?: number;
    city?: string;
    slug?: string;
    category?: string;
    categories?: string[];
    duration?: string;
    selectedDate?: string;
    guests?: any;
    recommendedProductIds?: (string | number)[];
    addonDiscountPercent?: number;
    notes?: string;
    travelTips?: string;
    // Pricing Formula Fields (Danny @260825)
    cost?: number;
    marginPercent?: number;
    promotionPercent?: number;
    group3Percent?: number;
    group5Percent?: number;
    childDiscountPercent?: number;
    infantDiscountPercent?: number;
    vatPercent?: number;
    listPrice?: number;
    group3Price?: number;
    group5Price?: number;
  } | null;
}

interface OrderFormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

interface AddonEquipment {
  id: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  price: number;
  originalPrice: number;
  heroImage: string;
  reasonBadge: string;
  reasonText: string;
  matchedTags: string[];
}

const ADDON_CATALOG: AddonEquipment[] = [

];

export default function BookingModal({ externalOpen, onExternalClose, selectedTour }: BookingModalProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hasTransferred, setHasTransferred] = useState<boolean>(false);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [lastBookingCode, setLastBookingCode] = useState<string>('');
  const [liveProducts, setLiveProducts] = useState<KollectionProduct[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchProductsApi()
      .then(products => {
        if (isMounted && Array.isArray(products) && products.length > 0) {
          setLiveProducts(products);
        }
      })
      .catch(err => {
        console.warn('[BookingModal] Failed to load published Kollection products:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const tourRecommendedIds: string[] = useMemo(() => {
    if (!selectedTour) return [];
    const ids: string[] = [];
    if (Array.isArray(selectedTour.recommendedProductIds)) {
      selectedTour.recommendedProductIds.forEach(id => {
        if (id !== undefined && id !== null && String(id).trim()) {
          ids.push(String(id).trim());
        }
      });
    }
    if (ids.length === 0 && selectedTour.notes && typeof selectedTour.notes === 'string') {
      const match = selectedTour.notes.match(/__kollections__:\[(.*?)\]/);
      if (match && match[1]) {
        match[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean).forEach(id => ids.push(id));
      }
    }
    return ids;
  }, [selectedTour]);

  useEffect(() => {
    if (externalOpen !== undefined) {
      setModalOpen(externalOpen);
    }
  }, [externalOpen]);

  const isOpen = Boolean(externalOpen || modalOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const defaultTourTitle = selectedTour?.title || 'Retreat May Đo Tĩnh Dưỡng Độc Bản';

  const parsePrice = (priceVal: any): number => {
    if (typeof priceVal === 'number' && !isNaN(priceVal)) return priceVal;
    if (typeof priceVal === 'string') {
      const cleaned = priceVal.replace(/\D/g, '');
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 1850000;
  };

  const tourPriceVND = parsePrice(selectedTour?.price);

  // Guest counters — 3 categories
  const [adultCount, setAdultCount] = useState<number>(() => {
    const fromGuests = Number(selectedTour?.guests?.adults || selectedTour?.guests?.adult || 0);
    return fromGuests > 0 ? fromGuests : 1;
  });
  const [childCount, setChildCount] = useState<number>(() => Number(selectedTour?.guests?.children || 0));
  const [infantCount, setInfantCount] = useState<number>(() => Number(selectedTour?.guests?.infants || 0));

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponLoading, setCouponLoading] = useState<boolean>(false);
  const [couponResult, setCouponResult] = useState<CouponValidationResult | null>(null);

  // Build pricing input from tour data (null = legacy tour without cost formula)
  const pricingInput: PricingFormulaInput | null = useMemo(() => {
    if (!selectedTour) return null;
    return buildPricingInputFromTour(selectedTour as Record<string, any>);
  }, [selectedTour]);

  // Calculate pricing breakdown
  const pricingBreakdown: TotalBreakdown = useMemo(() => {
    const guests = { adults: adultCount, children: childCount, infants: infantCount };
    const couponDiscount = (couponResult?.valid && couponResult.discountPercent > 0) ? couponResult.discountPercent : 0;

    if (pricingInput) {
      // Cost-based formula tour
      if (couponDiscount > 0) {
        return calculateTotalWithCoupon(pricingInput, guests, couponDiscount);
      }
      return calculateTotal(pricingInput, guests);
    }

    // Legacy tour — use stored prices directly
    const adultPrice = tourPriceVND;
    const childPriceLegacy = selectedTour?.childPrice || Math.round(adultPrice * 0.5);
    const infantPriceLegacy = selectedTour?.infantPrice || Math.round(adultPrice * 0.2);
    const vatPercent = selectedTour?.vatPercent ?? 8;

    let effectiveAdultPrice = adultPrice;
    if (couponDiscount > 0) {
      effectiveAdultPrice = Math.round(adultPrice * (1 - couponDiscount / 100));
    }
    const effectiveChildPrice = couponDiscount > 0 ? Math.round(childPriceLegacy * (1 - couponDiscount / 100)) : childPriceLegacy;
    const effectiveInfantPrice = couponDiscount > 0 ? Math.round(infantPriceLegacy * (1 - couponDiscount / 100)) : infantPriceLegacy;

    const subtotal = (effectiveAdultPrice * Math.max(1, guests.adults))
      + (effectiveChildPrice * Math.max(0, guests.children))
      + (effectiveInfantPrice * Math.max(0, guests.infants));
    const vatAmount = Math.round(subtotal * vatPercent / 100);
    return {
      subtotal,
      vatAmount,
      totalAmount: subtotal + vatAmount,
      adultPrice: effectiveAdultPrice,
      childPrice: effectiveChildPrice,
      infantPrice: effectiveInfantPrice,
    };
  }, [pricingInput, tourPriceVND, adultCount, childCount, infantCount, couponResult, selectedTour]);

  const guestCount = adultCount + childCount + infantCount;

  // Coupon validation handler
  const handleValidateCoupon = useCallback(async () => {
    const trimmed = couponCode.trim();
    if (!trimmed) return;
    setCouponLoading(true);
    try {
      const tourSlug = selectedTour?.slug || '';
      const tourTitle = selectedTour?.title || '';
      const result = await validateCouponCodeApi(trimmed, tourSlug, tourTitle);
      setCouponResult(result);
    } catch {
      setCouponResult({ valid: false, discountPercent: 0, title: '', code: trimmed, message: 'Lỗi kiểm tra mã giảm giá' });
    } finally {
      setCouponLoading(false);
    }
  }, [couponCode, selectedTour]);

  const handleClearCoupon = () => {
    setCouponCode('');
    setCouponResult(null);
  };

  const addonDiscountPercent = useMemo(() => {
    if (typeof selectedTour?.addonDiscountPercent === 'number' && !isNaN(selectedTour.addonDiscountPercent)) {
      return selectedTour.addonDiscountPercent;
    }
    if (selectedTour?.notes && typeof selectedTour.notes === 'string') {
      const match = selectedTour.notes.match(/__addon_discount__:(\d+)/);
      if (match && match[1]) {
        const parsed = parseInt(match[1], 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return 10;
  }, [selectedTour]);

  const convertProductToAddon = useCallback((product: KollectionProduct): AddonEquipment => {
    const rawPrice = Number(product.price) || 0;
    const discountedPrice = addonDiscountPercent > 0
      ? Math.round(rawPrice * (1 - addonDiscountPercent / 100))
      : rawPrice;
    const rawOrigPrice = Number(product.originalPrice) || 0;
    const finalOrigPrice = rawOrigPrice > rawPrice ? rawOrigPrice : rawPrice;

    return {
      id: String(product.id || product.slug),
      title: product.title || product.name || 'Vật phẩm Kollection 4U',
      subtitle: product.subtitle || product.category || 'Kollection Chữa Lành & Dưỡng Thân',
      categoryTag: product.category || 'Trang bị',
      price: discountedPrice,
      originalPrice: finalOrigPrice,
      heroImage: getImageUrl(product.heroImage || product.image),
      reasonBadge: product.badge || (product.isFeatured ? '⭐ Khuyên Dùng Cho Tour' : 'Trang Bị Tuyển Chọn'),
      reasonText: product.description && product.description.length > 10
        ? (product.description.length > 85 ? product.description.slice(0, 85) + '...' : product.description)
        : 'Vật phẩm thiết yếu đồng hành cùng bạn trên mọi nẻo đường retreat.',
      matchedTags: []
    };
  }, [addonDiscountPercent]);

  // Dynamic Matching for Addons: prioritize real Kollection products published on the web and configured in Backend
  const matchedAddons = useMemo<AddonEquipment[]>(() => {
    if (liveProducts.length > 0) {
      // Priority 1: Specific Kollection products set for this Tour in Admin Back-end
      if (tourRecommendedIds.length > 0) {
        const specificMatches = liveProducts.filter(p =>
          tourRecommendedIds.includes(String(p.id)) ||
          tourRecommendedIds.includes(String(p.slug))
        );
        if (specificMatches.length > 0) {
          return specificMatches.slice(0, 3).map(convertProductToAddon);
        }
      }

      // Priority 2: Products tagged as featured / recommend for tours in Admin Back-end
      const featuredMatches = liveProducts.filter(p =>
        p.isFeatured === true ||
        p.isNewArrival === true ||
        (p.badge && /recommend|khuyên|nổi bật/i.test(p.badge))
      );
      if (featuredMatches.length > 0) {
        return featuredMatches.slice(0, 2).map(convertProductToAddon);
      }

      // Priority 3: Fallback to the top published Kollection products on the web
      return liveProducts.slice(0, 2).map(convertProductToAddon);
    }

    // Fallback while products are loading or if offline
    const tourKeywords = [
      selectedTour?.category || '',
      ...(selectedTour?.categories || []),
      selectedTour?.title || '',
      selectedTour?.city || '',
      selectedTour?.slug || ''
    ].join(' ').toLowerCase();

    const scored = ADDON_CATALOG.map(item => {
      let score = 0;
      item.matchedTags.forEach(tag => {
        if (tourKeywords.includes(tag.toLowerCase())) {
          score += 1;
        }
      });
      return { item, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 2).map(s => s.item);
  }, [liveProducts, tourRecommendedIds, convertProductToAddon, selectedTour]);

  const addonsTotalPrice = useMemo(() => {
    return selectedAddonIds.reduce((total, id) => {
      const item = matchedAddons.find(a => a.id === id);
      return total + (item ? item.price : 0);
    }, 0);
  }, [selectedAddonIds, matchedAddons]);

  const finalTotalAmount = useMemo(() => {
    return pricingBreakdown.totalAmount + addonsTotalPrice;
  }, [pricingBreakdown.totalAmount, addonsTotalPrice]);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const [orderForm, setOrderForm] = useState<OrderFormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const formatVnd = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const resetAndClose = () => {
    setModalOpen(false);
    setSubmitted(false);
    setHasTransferred(false);
    setSelectedAddonIds([]);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (onExternalClose) onExternalClose();
    setOrderForm({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || !orderForm.phone.trim() || !orderForm.email.trim()) {
      alert('Vui lòng nhập họ tên, số điện thoại và email nhận vé điện tử!');
      return;
    }

    if (!orderForm.email.includes('@') || !orderForm.email.includes('.')) {
      alert('Vui lòng nhập địa chỉ email hợp lệ để nhận xác nhận đặt tour!');
      return;
    }

    const bookingCode = 'BK-' + Date.now().toString().slice(-6);
    setLastBookingCode(bookingCode);

    const chosenAddons = selectedAddonIds
      .map(id => matchedAddons.find(a => a.id === id))
      .filter(Boolean);

    try {
      await createTourBookingApi({
        bookingCode,
        customerName: orderForm.fullName.trim(),
        customerPhone: orderForm.phone.trim(),
        customerEmail: orderForm.email.trim(),
        shippingAddress: orderForm.address.trim() || undefined,
        tourTitle: defaultTourTitle,
        tourSlug: selectedTour?.slug || undefined,
        tourPrice: tourPriceVND,
        departureDate: selectedTour?.selectedDate || 'Thỏa thuận theo yêu cầu',
        numberOfGuests: guestCount,
        addonItems: chosenAddons,
        totalAmount: finalTotalAmount,
        paymentMethod: hasTransferred ? 'Chuyển khoản QR (Đã xác nhận)' : 'Chuyển khoản QR (Chờ xác nhận)',
        notes: orderForm.notes.trim() || undefined,
        status: hasTransferred ? 'Đã thanh toán' : 'Chờ xác nhận',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('[BACKEND BOOKING SYNC WARNING]', err);
    }

    try {
      const currentBookings = JSON.parse(localStorage.getItem('4u_tour_bookings') || '[]');
      currentBookings.push({
        id: bookingCode,
        tour: defaultTourTitle,
        tourPrice: tourPriceVND,
        guests: guestCount,
        selectedDate: selectedTour?.selectedDate || 'Thỏa thuận theo yêu cầu',
        addonItems: chosenAddons,
        totalAmount: finalTotalAmount,
        customer: orderForm,
        hasTransferred,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('4u_tour_bookings', JSON.stringify(currentBookings));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const cleanPhone = orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'TOUR';

  return (
    <>
      {isOpen && (
        <div
          className="bm-drawer-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
        >
          <div className="bm-drawer-container">
            {/* STICKY DRAWER HEADER */}
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 20
              }}
            >
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#081f13', margin: 0, letterSpacing: '-0.01em' }}>
                  {submitted ? 'Xác Nhận Đặt Tour Thành Công' : 'Xác Nhận Đặt Tour & Vật Phẩm'}
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0 0' }}>
                  {submitted ? '4U Wellness Retreats & Travel' : 'Hành trình tĩnh dưỡng & chăm sóc độc bản'}
                </p>
              </div>

              <button
                onClick={resetAndClose}
                type="button"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* SCROLLABLE DRAWER BODY */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'clamp(18px, 2.5vh, 24px) clamp(18px, 2.5vw, 28px)',
                boxSizing: 'border-box'
              }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 0 }}>

                  {/* Tour Summary + Guest Picker + Pricing Breakdown */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Hành Trình Đã Chọn
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '2px 0' }}>
                          {defaultTourTitle}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Khởi hành: <strong>{selectedTour?.selectedDate || 'Theo yêu cầu'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Guest Counter — 3 categories */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '8px' }}>Số lượng khách</div>
                      {[
                        { label: 'Người lớn (từ 12 tuổi)', count: adultCount, setCount: setAdultCount, minCount: 1, price: pricingBreakdown.adultPrice },
                        { label: 'Trẻ em (6-12 tuổi)', count: childCount, setCount: setChildCount, minCount: 0, price: pricingBreakdown.childPrice },
                        { label: 'Em bé (dưới 6 tuổi)', count: infantCount, setCount: setInfantCount, minCount: 0, price: pricingBreakdown.infantPrice },
                      ].map((guest, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <div>
                            <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{guest.label}</span>
                            <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '6px' }}>{formatVnd(guest.price)}/người</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                              type="button"
                              onClick={() => guest.setCount(Math.max(guest.minCount, guest.count - 1))}
                              disabled={guest.count <= guest.minCount}
                              style={{
                                width: '28px', height: '28px', borderRadius: '6px',
                                border: '1px solid #cbd5e1', backgroundColor: '#f8fafc',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: guest.count <= guest.minCount ? 'not-allowed' : 'pointer',
                                opacity: guest.count <= guest.minCount ? 0.4 : 1,
                              }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ width: '28px', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{guest.count}</span>
                            <button
                              type="button"
                              onClick={() => guest.setCount(Math.min(20, guest.count + 1))}
                              style={{
                                width: '28px', height: '28px', borderRadius: '6px',
                                border: '1px solid #059669', backgroundColor: '#ecfdf5',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#059669',
                              }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {adultCount >= 3 && (
                        <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '4px', padding: '4px 8px', backgroundColor: '#ecfdf5', borderRadius: '6px' }}>
                          ✨ Đã áp dụng giá {adultCount >= 5 ? 'Nhóm 5+ Người lớn' : 'Nhóm 3-4 Người lớn'}!
                        </div>
                      )}
                    </div>

                    {/* Coupon Input */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px' }}>Mã ưu đãi (Coupon)</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                          type="text"
                          placeholder="Nhập mã VD: 4URe123"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value); setCouponResult(null); }}
                          style={{
                            flex: 1, padding: '8px 12px', borderRadius: '6px',
                            border: '1px solid #cbd5e1', fontSize: '13px',
                            boxSizing: 'border-box', outline: 'none',
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleValidateCoupon}
                          disabled={couponLoading || !couponCode.trim()}
                          style={{
                            padding: '8px 14px', borderRadius: '6px',
                            border: 'none', backgroundColor: '#059669',
                            color: '#ffffff', fontSize: '12px', fontWeight: 700,
                            cursor: couponLoading ? 'wait' : 'pointer',
                            opacity: (!couponCode.trim() || couponLoading) ? 0.5 : 1,
                          }}
                        >
                          {couponLoading ? 'Đang kiểm...' : 'Áp dụng'}
                        </button>
                      </div>
                      {couponResult && (
                        <div style={{
                          marginTop: '6px', padding: '6px 10px', borderRadius: '6px',
                          backgroundColor: couponResult.valid ? '#ecfdf5' : '#fff1f2',
                          border: `1px solid ${couponResult.valid ? '#a7f3d0' : '#fecdd3'}`,
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                          <span style={{ fontSize: '12px', color: couponResult.valid ? '#065f46' : '#be123c', fontWeight: 600 }}>
                            {couponResult.valid
                              ? `✅ Giảm ${couponResult.discountPercent}% — ${couponResult.title}`
                              : `❌ ${couponResult.message || 'Mã không hợp lệ hoặc đã hết hạn'}`}
                          </span>
                          {couponResult.valid && (
                            <button
                              type="button"
                              onClick={handleClearCoupon}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '11px', color: '#64748b', textDecoration: 'underline' }}
                            >Xóa</button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pricing Breakdown */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: '6px' }}>Chi tiết thanh toán</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#475569', marginBottom: '3px' }}>
                        <span>Người lớn × {adultCount}</span>
                        <span>{formatVnd(pricingBreakdown.adultPrice * adultCount)}</span>
                      </div>
                      {childCount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#475569', marginBottom: '3px' }}>
                          <span>Trẻ em × {childCount}</span>
                          <span>{formatVnd(pricingBreakdown.childPrice * childCount)}</span>
                        </div>
                      )}
                      {infantCount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#475569', marginBottom: '3px' }}>
                          <span>Em bé × {infantCount}</span>
                          <span>{formatVnd(pricingBreakdown.infantPrice * infantCount)}</span>
                        </div>
                      )}
                      {couponResult?.valid && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#059669', marginBottom: '3px' }}>
                          <span>🎁 Giảm giá Tri ân (-{couponResult.discountPercent}%)</span>
                          <span>-</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#475569', marginBottom: '3px', paddingTop: '4px', borderTop: '1px dashed #e2e8f0' }}>
                        <span>Tạm tính</span>
                        <span>{formatVnd(pricingBreakdown.subtotal)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#475569', marginBottom: '3px' }}>
                        <span>VAT ({selectedTour?.vatPercent ?? 8}%)</span>
                        <span>+{formatVnd(pricingBreakdown.vatAmount)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#004532', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #059669' }}>
                        <span>Tổng Thanh toán</span>
                        <span>{formatVnd(pricingBreakdown.totalAmount)}</span>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '4px', textAlign: 'right' }}>
                        Giá đã bao gồm Thuế
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Responsive Inputs: Họ và tên + Số điện thoại */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(8px, 1.2vh, 14px)' }}>
                    {/* Họ và tên */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                        Họ và tên quý khách *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={orderForm.fullName}
                        onChange={(e) => setOrderForm({ ...orderForm, fullName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: 'clamp(8px, 1.2vh, 11px) 12px',
                          borderRadius: '6px',
                          border: '1px solid #bec9c2',
                          fontSize: '13.5px',
                          boxSizing: 'border-box',
                          outline: 'none',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                        Số điện thoại nhận tư vấn & giao đồ *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0987 654 321"
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: 'clamp(8px, 1.2vh, 11px) 12px',
                          borderRadius: '6px',
                          border: '1px solid #bec9c2',
                          fontSize: '13.5px',
                          boxSizing: 'border-box',
                          outline: 'none',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* 2-Column Responsive Inputs: Email + Địa chỉ */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(8px, 1.2vh, 14px)' }}>
                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                        Email nhận xác nhận & vé điện tử *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={orderForm.email}
                        onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: 'clamp(8px, 1.2vh, 11px) 12px',
                          borderRadius: '6px',
                          border: '1px solid #bec9c2',
                          fontSize: '13.5px',
                          boxSizing: 'border-box',
                          outline: 'none',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                    </div>

                    {/* Địa chỉ */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                        Địa chỉ nhận trang bị / tài liệu hành trình (nếu có)
                      </label>
                      <input
                        type="text"
                        placeholder="Số nhà, Tên đường, Phường/Xã, Tỉnh/Thành"
                        value={orderForm.address}
                        onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                        style={{
                          width: '100%',
                          padding: 'clamp(8px, 1.2vh, 11px) 12px',
                          borderRadius: '6px',
                          border: '1px solid #bec9c2',
                          fontSize: '13.5px',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* SMART CROSS-SELL ADDON EQUIPMENT RECOMMENDATION SECTION */}
                  {matchedAddons.length > 0 && (
                    <div className="bm-addon-section">
                      <div className="bm-addon-header">
                        <span className="bm-addon-header-title">
                          Trang bị khuyên dùng cho Chuyến đi này
                        </span>
                        <span className="bm-addon-badge">
                          {addonDiscountPercent > 0 ? `Ưu Đãi Mua Kèm -${addonDiscountPercent}%` : 'Vật Phẩm Mua Kèm'}
                        </span>
                      </div>

                      <div className="bm-addon-list">
                        {matchedAddons.map(addon => {
                          const isSelected = selectedAddonIds.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => toggleAddon(addon.id)}
                              className={`bm-addon-item ${isSelected ? 'selected' : ''}`}
                            >
                              <div className="bm-addon-item-left">
                                <div className="bm-addon-img-box">
                                  <img
                                    src={addon.heroImage}
                                    alt={addon.title}
                                    className="bm-addon-img"
                                  />
                                </div>
                                <div className="bm-addon-text-box">
                                  <div className="bm-addon-cat">
                                    {addon.reasonBadge}
                                  </div>
                                  <div className="bm-addon-name">
                                    {addon.title}
                                  </div>
                                  <div className="bm-addon-desc">
                                    {addon.reasonText}
                                  </div>
                                </div>
                              </div>

                              <div className="bm-addon-price-box">
                                <div>
                                  <div className="bm-addon-price-sale">
                                    {formatVnd(addon.price)}
                                  </div>
                                  <div className="bm-addon-price-orig">
                                    {formatVnd(addon.originalPrice)}
                                  </div>
                                </div>
                                <div className={`bm-addon-action-btn ${isSelected ? 'selected' : ''}`}>
                                  {isSelected ? <Check size={14} /> : <Plus size={14} />}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Ghi chú */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                      Ghi chú đặc biệt cho hành trình
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Chế độ ăn chay, dị ứng, yêu cầu phòng riêng hoặc thời gian nhận vật phẩm..."
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 'clamp(7px, 1vh, 10px) 12px',
                        borderRadius: '6px',
                        border: '1px solid #bec9c2',
                        fontSize: '13.5px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Price Summary Box */}
                  <div style={{ backgroundColor: '#f8f9fa', padding: 'clamp(10px, 1.5vh, 14px) 16px', borderRadius: '8px', border: '1px solid #edeeef' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                      <span>Chi phí tour ({guestCount} khách):</span>
                      <strong>{formatVnd(tourPriceVND * Math.max(1, guestCount))}</strong>
                    </div>
                    {selectedAddonIds.length > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#059669', marginBottom: '4px' }}>
                        <span>Trang bị mua kèm ({selectedAddonIds.length} món):</span>
                        <strong>+{formatVnd(addonsTotalPrice)}</strong>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(15px, 2vh, 17px)', fontWeight: 800, color: '#004532', borderTop: '1px dashed #cbd5e1', paddingTop: '6px', marginTop: '4px' }}>
                      <span>Tổng thanh toán:</span>
                      <span>{formatVnd(finalTotalAmount)}</span>
                    </div>
                  </div>

                  {/* QR Code VietQR Section */}
                  <div
                    style={{
                      backgroundColor: '#f4f7f5',
                      border: '1px solid #cce3d4',
                      borderRadius: '12px',
                      padding: 'clamp(10px, 1.5vh, 14px) 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'clamp(6px, 1vh, 10px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <QrCode size={18} style={{ color: '#065f46' }} />
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#081f13', textTransform: 'uppercase' }}>
                          QUÉT MÃ QR CHUYỂN KHOẢN NHANH
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: '#dcfce7',
                          color: '#15803d',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          border: '1px solid #bbf7d0'
                        }}
                      >
                        VietQR 24/7
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {/* QR Image */}
                      <div
                        style={{
                          width: 'clamp(100px, 13vh, 120px)',
                          height: 'clamp(100px, 13vh, 120px)',
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={`https://api.vietqr.io/image/970416-59584569-compact.png?amount=${finalTotalAmount}&addInfo=${encodeURIComponent('4U ' + (orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'TOUR'))}&accountName=CONG%20TY%20CP%20THUONG%20MAI%20DU%20LICH%20BON%20TOI%20UU`}
                          alt="Mã QR Chuyển Khoản ACB"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>

                      {/* Bank Transfer Info */}
                      <div style={{ flex: 1, minWidth: '170px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div>
                          <span style={{ color: '#64748b' }}>Ngân hàng:</span>{' '}
                          <strong style={{ color: '#081f13' }}>Ngân hàng TMCP Á Châu (ACB)</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Chi nhánh:</span>{' '}
                          <strong style={{ color: '#081f13' }}>ACB - PGD NGUYEN DU</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Số tài khoản:</span>{' '}
                          <strong style={{ color: '#065f46', fontFamily: 'monospace', fontSize: '13px' }}>5958 4569</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>{' '}
                          <strong style={{ color: '#081f13' }}>CONG TY CP THUONG MAI DU LICH BON TOI UU</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Số tiền:</span>{' '}
                          <strong style={{ color: '#065f46', fontSize: '13px' }}>{formatVnd(finalTotalAmount)}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Nội dung CK:</span>{' '}
                          <code style={{ backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 700, color: '#081f13' }}>
                            4U {orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'TOUR'}
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Button to confirm transfer */}
                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !hasTransferred;
                        setHasTransferred(nextState);
                        const transferTag = `[ĐÃ CHUYỂN KHOẢN QR ${formatVnd(finalTotalAmount)}]`;
                        if (nextState) {
                          if (!orderForm.notes.includes(transferTag)) {
                            setOrderForm((prev) => ({
                              ...prev,
                              notes: prev.notes ? `${prev.notes} - ${transferTag}` : transferTag
                            }));
                          }
                        } else {
                          setOrderForm((prev) => ({
                            ...prev,
                            notes: prev.notes.replace(` - ${transferTag}`, '').replace(transferTag, '').trim()
                          }));
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: 'clamp(7px, 1.1vh, 10px) 12px',
                        borderRadius: '8px',
                        border: hasTransferred ? '2px solid #059669' : '1px solid #94a3b8',
                        backgroundColor: hasTransferred ? '#ecfdf5' : '#ffffff',
                        color: hasTransferred ? '#065f46' : '#1e293b',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        marginTop: '2px'
                      }}
                    >
                      {hasTransferred ? (
                        <>
                          <CheckCircle size={15} style={{ color: '#059669' }} />
                          <span>ĐÃ XÁC NHẬN: BẠN ĐÃ CHUYỂN KHOẢN THÀNH CÔNG!</span>
                        </>
                      ) : (
                        <>
                          <span>💳</span>
                          <span>👉 Bấm vào đây sau khi bạn ĐÃ CHUYỂN TIỀN</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: 'clamp(11px, 1.6vh, 14px) 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#004532',
                      color: '#ffffff',
                      fontSize: 'clamp(13.5px, 1.6vh, 15px)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(0, 69, 50, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005a41')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#004532')}
                  >
                    <ShieldCheck size={18} />
                    <span>Hoàn tất đặt tour & trang bị</span>
                  </button>
                </form>
              ) : (
                /* Success confirmation */
                <div style={{ textAlign: 'center', padding: '20px 6px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#dcfce7',
                      color: '#15803d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.2)'
                    }}
                  >
                    <CheckCircle size={34} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: '#dcfce7', padding: '3px 10px', borderRadius: '999px' }}>
                    {lastBookingCode ? `Mã Đặt Tour: ${lastBookingCode}` : 'Đặt Tour Thành Công'}
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '8px 0 6px 0' }}>
                    Đặt Hành Trình Thành Công!
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                    Cảm ơn <strong>{orderForm.fullName}</strong>. Chuyên viên 4U Wellness sẽ liên hệ số điện thoại <strong>{orderForm.phone}</strong> trong vòng 15-30 phút để xác nhận chi tiết lịch trình và chuẩn bị trang bị cho bạn.
                  </p>

                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      padding: '14px 16px',
                      border: '1px solid #e2e8f0',
                      textAlign: 'left',
                      fontSize: '12.5px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '20px'
                    }}
                  >
                    <div>
                      <span style={{ color: '#64748b' }}>Hành trình:</span>{' '}
                      <strong style={{ color: '#0f172a' }}>{defaultTourTitle}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Khởi hành:</span>{' '}
                      <strong style={{ color: '#0f172a' }}>{selectedTour?.selectedDate || 'Theo yêu cầu'}</strong> • {guestCount} khách
                    </div>
                    {selectedAddonIds.length > 0 && (
                      <div>
                        <span style={{ color: '#64748b' }}>Trang bị mua kèm:</span>{' '}
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {selectedAddonIds.map(id => {
                            const item = ADDON_CATALOG.find(a => a.id === id);
                            if (!item) return null;
                            return (
                              <div key={id} style={{ color: '#059669', fontWeight: 600, fontSize: '12px' }}>
                                • {item.title} ({formatVnd(item.price)})
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '6px', marginTop: '2px' }}>
                      <span style={{ color: '#64748b' }}>Tổng thanh toán:</span>{' '}
                      <strong style={{ color: '#004532', fontSize: '15px' }}>{formatVnd(finalTotalAmount)}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetAndClose}
                    style={{
                      padding: '12px 32px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#004532',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 69, 50, 0.2)'
                    }}
                  >
                    Đóng & Hoàn Tất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
