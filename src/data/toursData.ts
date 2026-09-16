export interface TourItineraryDay {
  day?: number;
  dayNumber?: number;
  title: string;
  description: string;
  image?: string;
  activities: string[] | string;
  transport?: string;
  transportAndCulinary?: string[];
  attractions?: string[] | string;
  orderIndex?: number;
}

export interface TourReview {
  id?: string | number;
  userName?: string;
  name?: string;
  authorName?: string;
  avatar?: string;
  rating?: number;
  date?: string;
  createdAt?: string;
  title?: string;
  comment?: string;
  travelerType?: string;
  orderIndex?: number;
}

export interface TourPackage {
  id: string | number;
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

  // Pricing Formula Fields (Danny @260825)
  cost?: number;
  marginPercent?: number;
  promotionPercent?: number;
  group3Percent?: number;
  group5Percent?: number;
  childDiscountPercent?: number;
  infantDiscountPercent?: number;
  vatPercent?: number;

  // Computed group prices (from backend enrichTourResponse)
  listPrice?: number;
  group3Price?: number;
  group5Price?: number;

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
  seriesType?: string | null;
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
  tourDepartureDates?: any[];
  tourItineraries?: any[];
  tourFaqs?: any[];
  tourReviews?: any[];
  tourCategoryMappings?: any[];
  tourImages?: any[];
}

// 100% REAL DATA STORE (LOADED INSTANTLY FROM PERSISTENT CACHE OR BACKEND API)
function getInitialToursFromStorage(): TourPackage[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem('4u_real_cache_tours');
      if (raw) {
        const entry = JSON.parse(raw);
        if (entry && Array.isArray(entry.data) && entry.data.length > 0) {
          // Verify TTL 10 mins
          if (Date.now() - (entry.timestamp || 0) < 10 * 60 * 1000) {
            return entry.data;
          }
        }
      }
    }
  } catch {}
  return [];
}

export let TOURS_DATA: TourPackage[] = getInitialToursFromStorage();

export function syncToursDataFromApi(liveTours: TourPackage[]) {
  if (Array.isArray(liveTours)) {
    TOURS_DATA.splice(0, TOURS_DATA.length, ...liveTours);
  }
}

// Global Event Listener: Automatically keep in-memory TOURS_DATA synchronized with background revalidation
if (typeof window !== 'undefined') {
  window.addEventListener('tours-data-updated', (event: any) => {
    if (event && Array.isArray(event.detail)) {
      syncToursDataFromApi(event.detail);
    }
  });
}

