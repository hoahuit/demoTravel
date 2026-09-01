/**
 * Pricing Calculator — Danny @260825
 *
 * Shared utility for computing website display prices from backend cost-based inputs.
 * Used by both Admin preview and Booking checkout flow.
 *
 * Formulas:
 *   Trị giá       = ROUNDUP(Cost / (1 - %Margin), -4)      (round up to nearest 10,000)
 *   Giá ĐẶC BIỆT = Trị giá × (1 - %Promotion)             (depends on group size)
 *   Giá Trẻ em    = Giá Người lớn × (1 - %ChildDiscount)
 *   Giá Em bé     = Giá Người lớn × (1 - %InfantDiscount)
 *   Tổng          = [(NL × SL_NL) + (TE × SL_TE) + (EB × SL_EB)] × (1 + %VAT)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PricingFormulaInput {
  /** Giá vốn (Cost) */
  cost: number;
  /** % Lợi nhuận (VD: 40 = 40%) */
  marginPercent: number;
  /** % Khuyến mãi thường (VD: 23.36 = 23.36%) */
  promotionPercent: number;
  /** % Khuyến mãi nhóm 3-4 Người lớn */
  group3Percent: number;
  /** % Khuyến mãi nhóm 5+ Người lớn */
  group5Percent: number;
  /** % Giảm giá Trẻ em (6 đến dưới 12 tuổi) so với Giá Người lớn */
  childDiscountPercent: number;
  /** % Giảm giá Em bé (dưới 6 tuổi) so với Giá Người lớn */
  infantDiscountPercent: number;
  /** % Thuế VAT (VD: 8 = 8%) */
  vatPercent: number;
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

export interface PricingResult {
  /** Trị giá — Giá niêm yết (gạch ngang trên FE) */
  listPrice: number;
  /** Giá ĐẶC BIỆT trong tháng (1-2 NL) */
  specialPrice: number;
  /** Giá nhóm 3-4 NL */
  group3Price: number;
  /** Giá nhóm 5+ NL */
  group5Price: number;
  /** Giá Người lớn hiện hành (phụ thuộc SL NL) */
  adultPrice: number;
  /** Giá Trẻ em */
  childPrice: number;
  /** Giá Em bé */
  infantPrice: number;
}

export interface TotalBreakdown {
  /** Tổng trước thuế */
  subtotal: number;
  /** Tiền thuế VAT */
  vatAmount: number;
  /** Tổng Thanh toán (sau thuế) */
  totalAmount: number;
  /** Giá Người lớn đang áp dụng */
  adultPrice: number;
  /** Giá Trẻ em đang áp dụng */
  childPrice: number;
  /** Giá Em bé đang áp dụng */
  infantPrice: number;
}

export interface CouponResult {
  /** Giá Tri ân (sau coupon) */
  couponPrice: number;
  /** % discount áp dụng */
  discountPercent: number;
}

// ---------------------------------------------------------------------------
// Core Calculation Functions
// ---------------------------------------------------------------------------

/**
 * Trị giá = ROUNDUP(Cost / (1 - %Margin), -4)
 * Làm tròn LÊN đến bội 10.000 gần nhất.
 */
export function calculateListPrice(cost: number, marginPercent: number): number {
  if (cost <= 0 || marginPercent <= 0 || marginPercent >= 100) return 0;
  const marginDecimal = marginPercent / 100;
  const rawPrice = cost / (1 - marginDecimal);
  return Math.ceil(rawPrice / 10000) * 10000;
}

/**
 * Xác định Giá Người lớn theo số lượng Người lớn:
 * - 1-2 NL: Giá ĐẶC BIỆT = Trị giá × (1 - %Promotion)
 * - 3-4 NL: Giá Group 3+  = Trị giá × (1 - %Group3)
 * - 5+  NL: Giá Group 5+  = Trị giá × (1 - %Group5)
 */
export function calculateAdultPrice(
  listPrice: number,
  adultsCount: number,
  promotionPercent: number,
  group3Percent: number,
  group5Percent: number,
): number {
  if (listPrice <= 0) return 0;

  if (adultsCount >= 5 && group5Percent > 0) {
    return Math.round((listPrice * (1 - group5Percent / 100)) / 1000) * 1000;
  }
  if (adultsCount >= 3 && group3Percent > 0) {
    return Math.round((listPrice * (1 - group3Percent / 100)) / 1000) * 1000;
  }
  return Math.round((listPrice * (1 - promotionPercent / 100)) / 1000) * 1000;
}

/**
 * Giá Trẻ em = Giá Người lớn × (1 - %ChildDiscount)
 */
export function calculateChildPrice(adultPrice: number, childDiscountPercent: number): number {
  if (adultPrice <= 0) return 0;
  return Math.round((adultPrice * (1 - childDiscountPercent / 100)) / 1000) * 1000;
}

/**
 * Giá Em bé = Giá Người lớn × (1 - %InfantDiscount)
 */
export function calculateInfantPrice(adultPrice: number, infantDiscountPercent: number): number {
  if (adultPrice <= 0) return 0;
  return Math.round((adultPrice * (1 - infantDiscountPercent / 100)) / 1000) * 1000;
}

// ---------------------------------------------------------------------------
// Composite Functions
// ---------------------------------------------------------------------------

/**
 * Tính toàn bộ bảng giá từ input backend.
 */
export function calculateAllPrices(input: PricingFormulaInput): PricingResult {
  const listPrice = calculateListPrice(input.cost, input.marginPercent);
  const specialPrice = Math.round((listPrice * (1 - input.promotionPercent / 100)) / 1000) * 1000;
  const group3Price = Math.round((listPrice * (1 - input.group3Percent / 100)) / 1000) * 1000;
  const group5Price = Math.round((listPrice * (1 - input.group5Percent / 100)) / 1000) * 1000;

  // Default adult price (1-2 NL) = specialPrice
  const childPrice = calculateChildPrice(specialPrice, input.childDiscountPercent);
  const infantPrice = calculateInfantPrice(specialPrice, input.infantDiscountPercent);

  return {
    listPrice,
    specialPrice,
    group3Price,
    group5Price,
    adultPrice: specialPrice,
    childPrice,
    infantPrice,
  };
}

/**
 * Tổng Thanh toán = [(NL × SL_NL) + (TE × SL_TE) + (EB × SL_EB)] × (1 + %VAT)
 *
 * Giá Người lớn tự động switch theo nhóm:
 *   1-2 NL → specialPrice
 *   3-4 NL → group3Price
 *   5+  NL → group5Price
 */
export function calculateTotal(
  input: PricingFormulaInput,
  guests: GuestCounts,
): TotalBreakdown {
  const listPrice = calculateListPrice(input.cost, input.marginPercent);

  const adultPrice = calculateAdultPrice(
    listPrice,
    guests.adults,
    input.promotionPercent,
    input.group3Percent,
    input.group5Percent,
  );

  const childPrice = calculateChildPrice(adultPrice, input.childDiscountPercent);
  const infantPrice = calculateInfantPrice(adultPrice, input.infantDiscountPercent);

  const subtotal = (adultPrice * Math.max(1, guests.adults))
    + (childPrice * Math.max(0, guests.children))
    + (infantPrice * Math.max(0, guests.infants));

  const vatDecimal = (input.vatPercent || 0) / 100;
  const vatAmount = Math.round(subtotal * vatDecimal);
  const totalAmount = subtotal + vatAmount;

  return {
    subtotal,
    vatAmount,
    totalAmount,
    adultPrice,
    childPrice,
    infantPrice,
  };
}

/**
 * Áp dụng mã coupon: Giá Tri ân = Giá ĐẶC BIỆT × (1 - %Coupon)
 */
export function applyCoupon(specialPrice: number, couponDiscountPercent: number): CouponResult {
  if (couponDiscountPercent <= 0 || couponDiscountPercent > 100) {
    return { couponPrice: specialPrice, discountPercent: 0 };
  }
  const couponPrice = Math.round(specialPrice * (1 - couponDiscountPercent / 100));
  return { couponPrice, discountPercent: couponDiscountPercent };
}

/**
 * Tổng Thanh toán khi có coupon — tính lại từ Giá Tri ân
 */
export function calculateTotalWithCoupon(
  input: PricingFormulaInput,
  guests: GuestCounts,
  couponDiscountPercent: number,
): TotalBreakdown {
  const listPrice = calculateListPrice(input.cost, input.marginPercent);

  let adultPrice = calculateAdultPrice(
    listPrice,
    guests.adults,
    input.promotionPercent,
    input.group3Percent,
    input.group5Percent,
  );

  // Apply coupon on top of the group-adjusted adult price
  if (couponDiscountPercent > 0 && couponDiscountPercent <= 100) {
    adultPrice = Math.round(adultPrice * (1 - couponDiscountPercent / 100));
  }

  const childPrice = calculateChildPrice(adultPrice, input.childDiscountPercent);
  const infantPrice = calculateInfantPrice(adultPrice, input.infantDiscountPercent);

  const subtotal = (adultPrice * Math.max(1, guests.adults))
    + (childPrice * Math.max(0, guests.children))
    + (infantPrice * Math.max(0, guests.infants));

  const vatDecimal = (input.vatPercent || 0) / 100;
  const vatAmount = Math.round(subtotal * vatDecimal);
  const totalAmount = subtotal + vatAmount;

  return {
    subtotal,
    vatAmount,
    totalAmount,
    adultPrice,
    childPrice,
    infantPrice,
  };
}

// ---------------------------------------------------------------------------
// Formatting Helpers
// ---------------------------------------------------------------------------

/** Format VND currency */
export function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

/**
 * Build PricingFormulaInput from a tour object (API response or draft).
 * Falls back gracefully when pricing formula fields are absent (legacy tours).
 */
export function buildPricingInputFromTour(tour: Record<string, any>): PricingFormulaInput | null {
  const cost = Number(tour.cost) || 0;
  const marginPercent = Number(tour.marginPercent) || 0;

  if (cost <= 0 || marginPercent <= 0) return null;

  return {
    cost,
    marginPercent,
    promotionPercent: Number(tour.promotionPercent) || 0,
    group3Percent: Number(tour.group3Percent) || 0,
    group5Percent: Number(tour.group5Percent) || 0,
    childDiscountPercent: Number(tour.childDiscountPercent) || 0,
    infantDiscountPercent: Number(tour.infantDiscountPercent) || 0,
    vatPercent: Number(tour.vatPercent) ?? 8,
  };
}
