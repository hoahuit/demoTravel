export interface PromotionItem {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  discountBadge: string;
  category: string;
  expiryDate: string;
  bannerImage?: string;
  applicableToursSlugs?: string[];
  terms?: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let PROMOTIONS_DATA: PromotionItem[] = [];

export function syncPromotionsDataFromApi(livePromos: PromotionItem[]) {
  if (Array.isArray(livePromos)) {
    PROMOTIONS_DATA.splice(0, PROMOTIONS_DATA.length, ...livePromos);
  }
}
