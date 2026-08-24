export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: string;
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
  category: 'Nature' | 'Healing' | 'Conservation' | 'Volunteer' | 'Highland' | 'DeepForest' | 'Reconnection' | 'Wellness' | 'Exclusive' | 'Hot' | 'Luxury' | 'Family' | 'Promotion' | 'New' | 'Domestic' | 'International' | string;
  categories?: string[];
  country: string;
  city: string;
  region?: 'bac' | 'trung' | 'nam' | string;
  duration: string;
  durationDays: number;
  departureDates: string[];
  airline: string;
  hotel: string;
  transportation: string;
  price: number;
  originalPrice?: number;
  childPrice?: number;
  infantPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  isHot?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isPromotion?: boolean;
  isExclusive?: boolean;
  isCustomer?: boolean;
  isAdminApproved?: boolean;
  isAdminAprove?: boolean;
  highlights: string[];
  itinerary: TourItineraryDay[];
  included?: string[];
  excluded?: string[];
  notes?: string[];
  bookingPolicyNotes?: string;
  adultNote?: string;
  childNote?: string;
  infantNote?: string;
  heroImage: string;
  gallery: string[];
  destinationMap?: string;
  travelTips?: string[];
  faq?: { question: string; answer: string }[];
  reviews?: TourReview[];
  blogReadTime?: string;
  blogAuthor?: string;
  blogAuthorRole?: string;
  blogStorySnippet?: string;
  landingSectionTemplateId?: string;
  yoga3dTemplateId?: string;
}

// 100% REAL DATA STORE (EMPTY UNTIL LOADED FROM LOOPBACK 4 / SQL SERVER)
export let TOURS_DATA: TourPackage[] = [];

export function syncToursDataFromApi(liveTours: TourPackage[]) {
  if (Array.isArray(liveTours)) {
    TOURS_DATA.splice(0, TOURS_DATA.length, ...liveTours);
  }
}
