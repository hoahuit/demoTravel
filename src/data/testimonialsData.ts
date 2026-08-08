export interface CustomerReviewItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  text?: string;
  color?: string;
  rating?: number;
  visitedTour?: string;
  occupation?: string;
  avatar?: string;
  country?: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let TESTIMONIALS_DATA: CustomerReviewItem[] = [];

export function syncTestimonialsDataFromApi(liveReviews: CustomerReviewItem[]) {
  if (Array.isArray(liveReviews)) {
    TESTIMONIALS_DATA.splice(0, TESTIMONIALS_DATA.length, ...liveReviews);
  }
}
