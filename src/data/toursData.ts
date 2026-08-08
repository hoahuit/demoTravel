export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  image: string;
  activities: string[];
  transportAndCulinary?: string[];
  attractions?: string[];
}

export interface TourReview {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  travelerType: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Wellness' | 'Luxury' | 'Honeymoon' | 'Family' | 'Promotion' | 'New' | 'Domestic' | 'International';
  country: string;
  city: string;
  duration: string;
  durationDays: number;
  departureDates: string[];
  airline: string;
  hotel: string;
  transportation: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  isHot?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isPromotion?: boolean;
  isExclusive?: boolean;
  highlights: string[];
  itinerary: TourItineraryDay[];
  included: string[];
  excluded: string[];
  notes: string[];
  heroImage: string;
  gallery: string[];
  destinationMap: string;
  travelTips: string[];
  faq: { question: string; answer: string }[];
  reviews: TourReview[];
  blogReadTime?: string;
  blogAuthor?: string;
  blogAuthorRole?: string;
  blogStorySnippet?: string;
  seriesType?: 'chua-lanh' | 'bao-ton' | 'thien-nhien' | 'thien-nguyen';
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let TOURS_DATA: TourPackage[] = [];

export function syncToursDataFromApi(liveTours: TourPackage[]) {
  if (Array.isArray(liveTours)) {
    TOURS_DATA.splice(0, TOURS_DATA.length, ...liveTours);
  }
}
