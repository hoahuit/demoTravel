import {
  getMockTours,
  getMockDestinations,
  getMockProducts,
  getMockBlogs,
  getMockFaqs,
  getMockPartners,
  getMockServices,
  getMockTeam,
  getMockTestimonials,
  getMockAbout,
  getMockCategories,
  getMockConsultations,
  getMockBookings,
  getMockShopOrders,
  addMockConsultation,
  addMockBooking,
  addMockTour,
  updateMockTour,
  deleteMockTour,
  addMockShopOrder,
  updateMockShopOrder,
  deleteMockShopOrder
} from '../data/mockData';
import {
  LandingSectionTemplate,
  DEFAULT_LANDING_SECTION_TEMPLATES,
  getAllLandingSectionTemplates,
  saveAllLandingSectionTemplates
} from '../data/landingSectionData';
import { getStoredToken } from './authService';

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://127.0.0.1:3001';

export function getAuthHeader(): string {
  const token = getStoredToken();
  return token ? `Bearer ${token}` : '';
}

// Toggle mock data mode via .env (VITE_USE_MOCK_DATA=true)
export const USE_MOCK_DATA = String((import.meta as any).env?.VITE_USE_MOCK_DATA || '').toLowerCase() === 'true';

// Format image URL: if relative filename like 'a.jpg' is provided, load using API_BASE_URL/uploads/a.jpg
export function getImageUrl(imagePath?: string): string {
  const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

  if (!imagePath || typeof imagePath !== 'string' || !imagePath.trim()) {
    return DEFAULT_PLACEHOLDER;
  }
  const trimmed = imagePath.trim();
  const lower = trimmed.toLowerCase();

  // Security Sanitization: Prevent XSS / malicious script pseudo-protocols
  if (lower.startsWith('javascript:') || lower.startsWith('vbscript:')) {
    return DEFAULT_PLACEHOLDER;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `${API_BASE_URL}${trimmed}`;
  }
  return `${API_BASE_URL}/uploads/${trimmed}`;
}

// Helper to compress large image files client-side before upload
async function compressImageFile(file: File, maxDimension = 1920, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(mimeType, quality));
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Helper to extract descriptive error message from LoopBack 4 or Express REST API response
export async function getApiErrorMessage(response: Response): Promise<string> {
  try {
    const json = await response.json();
    if (json) {
      if (json.error && typeof json.error === 'object' && json.error.message) {
        return json.error.message;
      }
      if (json.error && typeof json.error === 'string') {
        return json.error;
      }
      if (json.message && typeof json.message === 'string') {
        return json.message;
      }
      if (json.details && Array.isArray(json.details) && json.details.length > 0) {
        return json.details[0].message || JSON.stringify(json.details);
      }
    }
  } catch (e) {
    // If response body is not JSON
  }
  return `Lỗi HTTP ${response.status}: ${response.statusText || 'Yêu cầu thất bại'}`;
}

// Upload image file or base64 to backend server
export async function uploadImageApi(
  fileInput: File | { filename: string; data: string }
): Promise<{ success: boolean; filename: string; url: string; fileUrl: string }> {
  let payload: { filename: string; data: string };

  if (fileInput instanceof File) {
    const base64 = await compressImageFile(fileInput);
    payload = { filename: fileInput.name, data: base64 };
  } else {
    payload = fileInput;
  }


  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  return await response.json();
}


// Helper to map frontend section keys to LoopBack 4 endpoint paths
export function getLb4Endpoint(section: string): string {
  const mapping: Record<string, string> = {
    tours: '/tours',
    bookings: '/tour-bookings',
    'tour-bookings': '/tour-bookings',
    blog: '/blogs',
    destinations: '/destinations',
    faq: '/faqs',
    partners: '/partners',
    promotions: '/promotions',
    services: '/services',
    team: '/team-members',
    testimonials: '/testimonials',
    about: '/about',
    settings: '/settings',
    categories: '/menu-categories',
    'menu-categories': '/menu-categories',
    consultations: '/consultations',
    'custom-tours': '/custom-tour-requests',
    'custom-tour-requests': '/custom-tour-requests',
    'shop-orders': '/shop-orders',
    products: '/products',
    'landing-page': '/landing-section-templates',
    yoga3d: '/landing-section-templates',
    'landing-section-templates': '/landing-section-templates',
  };
  return mapping[section] || `/${section}`;
}

// --------------------------------------------------------------------------
// JSON ARRAY PARSER & SANITIZER FOR MS SQL SERVER
// --------------------------------------------------------------------------

export function parseTourJsonFields(tour: any) {
  if (!tour) return tour;

  const arrayFields = [
    'categories', 'highlights', 'itinerary', 'gallery', 'included', 'excluded',
    'departureDates', 'notes', 'travelTips', 'faq', 'reviews'
  ];

  for (let i = 0; i < arrayFields.length; i++) {
    const field = arrayFields[i];
    const val = tour[field];

    if (Array.isArray(val)) {
      continue; // 0ms Fast-path: already an array, skip parsing completely!
    }

    if (typeof val === 'string' && val.length > 0) {
      const trimmed = val.trim();
      if (trimmed.startsWith('[')) {
        try {
          tour[field] = JSON.parse(trimmed);
        } catch {
          tour[field] = [];
        }
      } else if (trimmed.includes(',')) {
        tour[field] = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
      } else if (trimmed !== 'undefined' && trimmed !== 'null' && trimmed !== '[object Object]') {
        tour[field] = [trimmed];
      } else {
        tour[field] = [];
      }
    } else {
      tour[field] = [];
    }
  }

  // Fast itinerary fallback if empty
  if (!tour.itinerary || tour.itinerary.length === 0) {
    tour.itinerary = [
      {
        day: 1,
        title: 'Đón Đoàn & Check-in',
        description: tour.subtitle || tour.title || 'Hành trình nghỉ dưỡng phục hồi năng lượng.',
        image: '',
        activities: ['Thưởng trà đón tiếp', 'Check-in nghỉ ngơi', 'Bữa tối cao cấp']
      },
      {
        day: 2,
        title: 'Tĩnh Dưỡng & Kết Nối Thiên Nhiên',
        description: 'Tham gia các hoạt động chăm sóc Thân - Tâm - Trí.',
        image: '',
        activities: ['Thiền định bình minh', 'Tắm rừng / Kayak', 'Trà đạo ngắm hoàng hôn']
      },
      {
        day: 3,
        title: 'Thư Giãn & Trở Về',
        description: 'Nạp đầy năng lượng tươi mới và trở về.',
        image: '',
        activities: ['Trải nghiệm bữa sáng', 'Lưu niệm & Tiễn đoàn']
      }
    ];
  }

  // Unified Category Consolidation: Primary category is categories[0]
  if (Array.isArray(tour.categories) && tour.categories.length > 0) {
    tour.category = tour.categories[0];
  } else if (tour.category) {
    tour.categories = [tour.category];
  } else {
    tour.category = 'Retreat';
    tour.categories = ['Retreat'];
  }

  return tour;
}

function safeParseToArray(val: any): any[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    }
    if (trimmed.includes(',')) {
      return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return trimmed !== 'null' && trimmed !== 'undefined' ? [trimmed] : [];
  }
  return [val];
}

export function sanitizeTourPayload(tourData: any, isUpdate = false) {
  const payload: any = {};
  const arrayKeys = new Set([
    'categories', 'departureDates', 'highlights', 'itinerary',
    'gallery', 'included', 'excluded', 'notes', 'travelTips',
    'faq', 'reviews'
  ]);

  const validKeys = [
    'slug', 'title', 'subtitle', 'category', 'categories', 'country', 'city', 'duration', 'durationDays',
    'heroImage', 'price', 'originalPrice', 'childPrice', 'infantPrice',
    'adultNote', 'childNote', 'infantNote', 'bookingPolicyNotes',
    'isHot', 'isFeatured', 'isExclusive', 'isCustomer', 'isAdminApproved', 'isAdminAprove',
    'departureDates', 'airline', 'hotel', 'transportation', 'rating', 'reviewsCount',
    'highlights', 'itinerary', 'gallery', 'included', 'excluded', 'notes', 'destinationMap',
    'travelTips', 'faq', 'reviews', 'landingSectionTemplateId', 'yoga3dTemplateId'
  ];

  // If region is specified in draft, ensure it is added to categories
  let categoriesArr = safeParseToArray(tourData.categories);
  if (tourData.region && !categoriesArr.includes(tourData.region)) {
    categoriesArr.push(tourData.region);
  }

  const mergedData = {
    ...tourData,
    categories: categoriesArr,
    category: categoriesArr[0] || tourData.category || 'Retreat'
  };

  validKeys.forEach((key) => {
    if (mergedData[key] !== undefined) {
      if (arrayKeys.has(key)) {
        // Send pure native arrays matching the normalized backend schema
        payload[key] = safeParseToArray(mergedData[key]);
      } else {
        payload[key] = mergedData[key];
      }
    }
  });

  return payload;
}

export function sanitizeConsultationPayload(data: any, isUpdate = false) {
  const payload: any = {};
  if (isUpdate && data.id !== undefined) {
    payload.id = Number(data.id) || data.id;
  }

  payload.customerName = String(data.customerName || data.fullName || data.name || 'Khách hàng').trim();
  payload.customerPhone = String(data.customerPhone || data.phone || '').trim();

  if (data.customerEmail || data.email) {
    payload.customerEmail = String(data.customerEmail || data.email).trim();
  }

  const callTime = data.preferredCallTime || data.preferredTime;
  if (callTime) {
    const timeMap: Record<string, string> = {
      morning: 'Sáng (8h - 12h)',
      afternoon: 'Chiều (13h30 - 17h30)',
      evening: 'Tối (18h - 21h)',
      anytime: 'Linh hoạt (Bất kỳ lúc nào)'
    };
    payload.preferredCallTime = timeMap[callTime] || String(callTime);
  } else {
    payload.preferredCallTime = 'Sáng (8h - 12h)';
  }

  payload.tourName = String(data.tourName || data.tour || data.tourTitle || 'Tư vấn hành trình').trim();
  payload.note = String(data.note || data.message || data.notes || '').trim();
  payload.status = String(data.status || 'Chưa tư vấn');

  if (data.createdAt) {
    payload.createdAt = String(data.createdAt);
  }

  return payload;
}

// --------------------------------------------------------------------------
// QUERY CACHE ENGINE (Memory TTL & Smart Invalidation System)
// --------------------------------------------------------------------------
interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
}

const queryCache: Map<string, CacheEntry> = new Map();
const DEFAULT_CACHE_TTL = 10 * 60 * 1000; // 10 minutes memory TTL

export function getCachedQuery<T = any>(key: string, ttl: number = DEFAULT_CACHE_TTL): T | null {
  const entry = queryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > ttl) {
    queryCache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCachedQuery<T = any>(key: string, data: T): T {
  queryCache.set(key, { data, timestamp: Date.now() });
  return data;
}

export function invalidateQueryCache(keyPattern?: string) {
  if (!keyPattern) {
    queryCache.clear();
    return;
  }
  for (const key of queryCache.keys()) {
    if (key.includes(keyPattern)) {
      queryCache.delete(key);
    }
  }
}

// --------------------------------------------------------------------------
// TOURS MODULE API CALLS (WITH QUERY CACHE)
// --------------------------------------------------------------------------

let inflightToursPromise: Promise<any> | null = null;

export async function fetchToursApi(forceRefresh = false) {
  if (USE_MOCK_DATA) {
    const mockList = getMockTours();
    return setCachedQuery('tours', mockList);
  }

  if (!forceRefresh) {
    const cached = getCachedQuery('tours');
    if (cached) {
      return cached;
    }
  }

  if (inflightToursPromise) {
    return inflightToursPromise;
  }

  inflightToursPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tours`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        console.warn(`[API Service] Failed to fetch live tours (${response.status}), falling back to mock tours.`);
        return setCachedQuery('tours', getMockTours());
      }
      const rawList = await response.json();
      if (Array.isArray(rawList) && rawList.length > 0) {
        const parsedList = rawList.map(parseTourJsonFields);
        return setCachedQuery('tours', parsedList);
      }
      return setCachedQuery('tours', getMockTours());
    } catch (err) {
      console.warn(`[API Service] Backend unreachable at ${API_BASE_URL}, using fallback mock data.`);
      return setCachedQuery('tours', getMockTours());
    } finally {
      setTimeout(() => {
        inflightToursPromise = null;
      }, 500);
    }
  })();

  return inflightToursPromise;
}

export async function saveTourApi(identifier: string | number, tourData: any) {
  let targetId: any = identifier;
  if ((!targetId || targetId === 'new') && tourData) {
    targetId = tourData.id || tourData.slug;
  }

  const isNumeric = typeof targetId === 'number' || (!isNaN(Number(targetId)) && Number(targetId) > 0);
  const url = isNumeric
    ? `${API_BASE_URL}/tours/${targetId}`
    : `${API_BASE_URL}/tours/slug/${encodeURIComponent(String(targetId))}`;

  const method = 'PATCH';
  const payload = sanitizeTourPayload(tourData, true);

  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(payload),
  });

  // Invalidate query cache on mutation so next fetch gets fresh MS SQL data
  invalidateQueryCache('tours');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  if (response.status === 204) return { success: true };
  return await response.json();
}


export async function createTourApi(tourData: any) {
  const payload = sanitizeTourPayload(tourData, false);

  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE_URL}/tours`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  // Invalidate query cache on mutation
  invalidateQueryCache('tours');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  return await response.json();
}

export async function deleteTourApi(id: number | string) {
  const isNumeric = typeof id === 'number' || (!isNaN(Number(id)) && Number(id) > 0);
  const url = isNumeric
    ? `${API_BASE_URL}/tours/${id}`
    : `${API_BASE_URL}/tours/slug/${encodeURIComponent(String(id))}`;

  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {};
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  // Invalidate query cache on mutation
  invalidateQueryCache('tours');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  return response.ok;
}


// --------------------------------------------------------------------------
// GENERIC MODULE CRUD API CALLS WITH QUERY CACHE
// --------------------------------------------------------------------------

// Helper to get fallback mock dataset for any frontend section
export function getSectionMockFallback(section: string): any {
  switch (section) {
    case 'destinations': return getMockDestinations();
    case 'products': return getMockProducts();
    case 'blogs':
    case 'blog': return getMockBlogs();
    case 'faqs':
    case 'faq': return getMockFaqs();
    case 'partners': return getMockPartners();
    case 'services': return getMockServices();
    case 'team':
    case 'team-members': return getMockTeam();
    case 'testimonials': return getMockTestimonials();
    case 'about': return getMockAbout();
    case 'categories':
    case 'menu-categories': return getMockCategories();
    case 'consultations': return getMockConsultations();
    case 'bookings': return getMockBookings();
    case 'shop-orders': return getMockShopOrders();
    default: return [];
  }
}

const inflightSectionPromises: Record<string, Promise<any> | null> = {};

export async function fetchSectionItemsApi(section: string, forceRefresh = false) {
  if (section === 'tours') {
    return fetchToursApi(forceRefresh);
  }

  const cacheKey = `section:${section}`;

  if (USE_MOCK_DATA) {
    const mockData = getSectionMockFallback(section);
    return setCachedQuery(cacheKey, mockData);
  }

  if (!forceRefresh) {
    const cached = getCachedQuery(cacheKey);
    if (cached) {
      return cached;
    }
  }

  if (inflightSectionPromises[section]) {
    return inflightSectionPromises[section];
  }

  inflightSectionPromises[section] = (async () => {
    try {
      const endpoint = getLb4Endpoint(section);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        return setCachedQuery(cacheKey, getSectionMockFallback(section));
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        return setCachedQuery(cacheKey, data);
      }
      if (data && typeof data === 'object') {
        return setCachedQuery(cacheKey, data);
      }
      return setCachedQuery(cacheKey, getSectionMockFallback(section));
    } catch (err) {
      return setCachedQuery(cacheKey, getSectionMockFallback(section));
    } finally {
      setTimeout(() => {
        inflightSectionPromises[section] = null;
      }, 500);
    }
  })();

  return inflightSectionPromises[section];
}


export async function saveSectionItemApi(
  section: string,
  action: 'create' | 'update' | 'delete',
  data: any
) {
  if (USE_MOCK_DATA) {
    if (section === 'consultations' && action === 'create') {
      const created = addMockConsultation(data);
      invalidateQueryCache(`section:${section}`);
      return created;
    }
    if (section === 'bookings' && action === 'create') {
      const created = addMockBooking(data);
      invalidateQueryCache(`section:${section}`);
      return created;
    }
    if (section === 'shop-orders') {
      if (action === 'create') {
        const created = addMockShopOrder(data);
        invalidateQueryCache(`section:${section}`);
        return created;
      }
      if (action === 'update') {
        const updated = updateMockShopOrder(data.id, data);
        invalidateQueryCache(`section:${section}`);
        return updated;
      }
      if (action === 'delete') {
        deleteMockShopOrder(data.id);
        invalidateQueryCache(`section:${section}`);
        return { success: true };
      }
    }
    if (section === 'tours') {
      if (action === 'create') addMockTour(data);
      if (action === 'update') updateMockTour(data.id || data.slug, data);
      if (action === 'delete') deleteMockTour(data.id || data.slug);
      invalidateQueryCache('tours');
      return { success: true, action, data };
    }
    invalidateQueryCache(`section:${section}`);
    return { success: true, action, data };
  }

  const endpoint = getLb4Endpoint(section);
  let payload: any;
  if (section === 'tours') {
    payload = sanitizeTourPayload(data, action === 'update');
  } else if (section === 'consultations') {
    payload = sanitizeConsultationPayload(data, action === 'update');
    if (action === 'create') {
      delete payload.id;
    }
  } else {
    payload = { ...data };
    if (action === 'create') {
      delete payload.id;
    }
  }

  let method = 'POST';
  let url = `${API_BASE_URL}${endpoint}`;

  const targetId = data.id || data.slug;

  if (action === 'update') {
    method = 'PATCH';
    url = `${API_BASE_URL}${endpoint}/${targetId}`;
  } else if (action === 'delete') {
    method = 'DELETE';
    url = `${API_BASE_URL}${endpoint}/${targetId}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: action !== 'delete' ? JSON.stringify(payload) : undefined,
    });

    // Invalidate query cache for this section on mutation
    invalidateQueryCache(`section:${section}`);

    if (!response.ok) {
      const errMsg = await getApiErrorMessage(response);
      throw new Error(errMsg);
    }

    if (response.status === 204) {
      return { success: true, action };
    }

    return await response.json();
  } catch (err) {
    // Graceful fallback for shop-orders when live endpoint is unavailable
    if (section === 'shop-orders') {
      if (action === 'create') {
        const created = addMockShopOrder(data);
        invalidateQueryCache(`section:${section}`);
        return created;
      }
      if (action === 'update') {
        const updated = updateMockShopOrder(data.id, data);
        invalidateQueryCache(`section:${section}`);
        return updated;
      }
      if (action === 'delete') {
        deleteMockShopOrder(data.id);
        invalidateQueryCache(`section:${section}`);
        return { success: true };
      }
    }
    throw err;
  }
}

// --------------------------------------------------------------------------
// MENU CATEGORIES CRUD API CALLS
// --------------------------------------------------------------------------

export interface MenuSubItemLink {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export interface MenuCategoryItem {
  id?: number | string;
  name: string;
  slug: string;
  parentSlug?: string | null;
  menuType?: string; // 'fixed_top' | 'mega_menu'
  orderIndex?: number;
  icon?: string;
  color?: string;
  iconColor?: string;
  description?: string;
  subItems?: MenuSubItemLink[];
}

export async function fetchMenuCategoriesApi(forceRefresh = false): Promise<MenuCategoryItem[]> {
  const data = await fetchSectionItemsApi('categories', forceRefresh);
  if (Array.isArray(data)) {
    return data.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }
  return [];
}

export async function createMenuCategoryApi(categoryData: Partial<MenuCategoryItem>): Promise<MenuCategoryItem> {
  return await saveSectionItemApi('categories', 'create', categoryData);
}

export async function saveMenuCategoryApi(id: number | string, categoryData: Partial<MenuCategoryItem>): Promise<MenuCategoryItem> {
  return await saveSectionItemApi('categories', 'update', { ...categoryData, id });
}

export async function deleteMenuCategoryApi(id: number | string): Promise<boolean> {
  await saveSectionItemApi('categories', 'delete', { id });
  return true;
}

export async function createConsultationApi(consultationData: any): Promise<any> {
  return await saveSectionItemApi('consultations', 'create', consultationData);
}

export async function fetchConsultationsApi(forceRefresh = false): Promise<any[]> {
  return await fetchSectionItemsApi('consultations', forceRefresh);
}

export async function saveConsultationApi(id: number | string, data: any): Promise<any> {
  return await saveSectionItemApi('consultations', 'update', { ...data, id });
}

export async function deleteConsultationApi(id: number | string): Promise<boolean> {
  await saveSectionItemApi('consultations', 'delete', { id });
  return true;
}

// --------------------------------------------------------------------------
// CUSTOM TOUR PLANNER / TAILOR-MADE TRIP REQUESTS API
// --------------------------------------------------------------------------

export interface CustomTourRequestItem {
  id?: number | string;
  requestCode?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredCallTime?: string;
  destination?: string;
  durationDays?: number;
  numberOfGuests?: number;
  budgetPerPerson?: number;
  travelStyle?: string;
  departureMonth?: string;
  specialRequests?: string;
  status?: string;
  createdAt?: string;
}

export async function fetchCustomTourRequestsApi(forceRefresh = false): Promise<CustomTourRequestItem[]> {
  return await fetchSectionItemsApi('custom-tours', forceRefresh);
}

export async function createCustomTourRequestApi(data: Partial<CustomTourRequestItem>): Promise<CustomTourRequestItem> {
  return await saveSectionItemApi('custom-tours', 'create', data);
}

export async function saveCustomTourRequestApi(id: number | string, data: Partial<CustomTourRequestItem>): Promise<CustomTourRequestItem> {
  return await saveSectionItemApi('custom-tours', 'update', { ...data, id });
}

export async function deleteCustomTourRequestApi(id: number | string): Promise<boolean> {
  await saveSectionItemApi('custom-tours', 'delete', { id });
  return true;
}

// --------------------------------------------------------------------------
// KOLLECTION 4U SHOP ORDERS API
// --------------------------------------------------------------------------

export interface ShopOrderItemData {
  id?: number | string;
  orderId?: number;
  productId?: number;
  productTitle: string;
  productSku?: string;
  price: number;
  quantity: number;
  subtotal: number;
  heroImage?: string;
}

export interface ShopOrderItem {
  id?: number | string;
  orderCode?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  orderNotes?: string;
  totalAmount: number;
  shippingFee?: number;
  status?: string;
  createdAt?: string;
  items?: ShopOrderItemData[];
}

export async function fetchShopOrdersApi(forceRefresh = false): Promise<ShopOrderItem[]> {
  return await fetchSectionItemsApi('shop-orders', forceRefresh);
}

export async function createShopOrderApi(data: Partial<ShopOrderItem>): Promise<ShopOrderItem> {
  return await saveSectionItemApi('shop-orders', 'create', data);
}

export async function saveShopOrderApi(id: number | string, data: Partial<ShopOrderItem>): Promise<ShopOrderItem> {
  return await saveSectionItemApi('shop-orders', 'update', { ...data, id });
}

export async function deleteShopOrderApi(id: number | string): Promise<boolean> {
  await saveSectionItemApi('shop-orders', 'delete', { id });
  return true;
}

// --------------------------------------------------------------------------
// KOLLECTION 4U PHYSICAL PRODUCTS API CALLS
// --------------------------------------------------------------------------

export interface KollectionProduct {
  id?: number | string;
  slug: string;
  title: string;
  name?: string;
  subtitle?: string;
  category: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  stock?: number;
  inStock?: boolean;
  heroImage: string;
  image?: string;
  gallery?: string[] | string;
  description?: string;
  specifications?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isExclusive?: boolean;
  badge?: string;
  rating?: number;
  reviewsCount?: number;
}

export async function fetchProductsApi(forceRefresh = false): Promise<KollectionProduct[]> {
  const data = await fetchSectionItemsApi('products', forceRefresh);
  if (Array.isArray(data)) {
    return data.map((item: any) => {
      let galleryArr: string[] = [];
      const resolvedTitle = item.title || item.name || 'Sản phẩm Kollection 4U';
      const resolvedHero = item.heroImage || item.image || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85';

      if (Array.isArray(item.gallery)) {
        galleryArr = item.gallery;
      } else if (typeof item.gallery === 'string' && item.gallery.trim().startsWith('[')) {
        try {
          galleryArr = JSON.parse(item.gallery);
        } catch {
          galleryArr = [resolvedHero];
        }
      } else if (resolvedHero) {
        galleryArr = [resolvedHero];
      }

      return {
        ...item,
        title: resolvedTitle,
        name: resolvedTitle,
        heroImage: resolvedHero,
        image: resolvedHero,
        gallery: galleryArr
      };
    });
  }
  return [];
}

export async function createProductApi(productData: Partial<KollectionProduct>): Promise<KollectionProduct> {
  const payload = { ...productData };
  return await saveSectionItemApi('products', 'create', payload);
}

export async function saveProductApi(id: number | string, productData: Partial<KollectionProduct>): Promise<KollectionProduct> {
  const payload = { ...productData };
  return await saveSectionItemApi('products', 'update', { ...payload, id });
}

export async function deleteProductApi(id: number | string): Promise<boolean> {
  await saveSectionItemApi('products', 'delete', { id });
  return true;
}

// --------------------------------------------------------------------------
// LANDING SECTION TEMPLATES CRUD API CALLS (WITH DUAL-BRIDGE & QUERY CACHE)
// --------------------------------------------------------------------------

let inflightTemplatesPromise: Promise<LandingSectionTemplate[]> | null = null;

export async function fetchLandingSectionTemplatesApi(forceRefresh = false): Promise<LandingSectionTemplate[]> {
  if (USE_MOCK_DATA) {
    const mockList = getAllLandingSectionTemplates();
    return setCachedQuery('landing-section-templates', mockList);
  }

  if (!forceRefresh) {
    const cached = getCachedQuery<LandingSectionTemplate[]>('landing-section-templates');
    if (cached) {
      return cached;
    }
  }

  if (inflightTemplatesPromise) {
    return inflightTemplatesPromise;
  }

  inflightTemplatesPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/landing-section-templates`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        console.warn(`[API Service] Failed to fetch live landing section templates (${response.status}), falling back to local.`);
        return setCachedQuery('landing-section-templates', getAllLandingSectionTemplates());
      }
      const rawList = await response.json();
      if (Array.isArray(rawList) && rawList.length > 0) {
        saveAllLandingSectionTemplates(rawList);
        return setCachedQuery('landing-section-templates', rawList);
      }
      return setCachedQuery('landing-section-templates', getAllLandingSectionTemplates());
    } catch (err) {
      console.warn(`[API Service] Backend unreachable at ${API_BASE_URL}, using local landing section templates.`);
      return setCachedQuery('landing-section-templates', getAllLandingSectionTemplates());
    } finally {
      setTimeout(() => {
        inflightTemplatesPromise = null;
      }, 500);
    }
  })();

  return inflightTemplatesPromise;
}

export async function getLandingSectionTemplateByIdApi(id: string): Promise<LandingSectionTemplate> {
  try {
    const response = await fetch(`${API_BASE_URL}/landing-section-templates/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn(`[API Service] Error fetching template by ID ${id}:`, err);
  }
  const all = getAllLandingSectionTemplates();
  return all.find((t) => t.id === id) || all.find((t) => t.isDefault) || DEFAULT_LANDING_SECTION_TEMPLATES[0];
}

export async function saveLandingSectionTemplateApi(template: LandingSectionTemplate): Promise<LandingSectionTemplate> {
  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE_URL}/landing-section-templates/${encodeURIComponent(template.id)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(template),
  });

  invalidateQueryCache('landing-section-templates');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  const updated = await response.json();
  return updated;
}

export async function createLandingSectionTemplateApi(template: LandingSectionTemplate): Promise<LandingSectionTemplate> {
  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE_URL}/landing-section-templates`, {
    method: 'POST',
    headers,
    body: JSON.stringify(template),
  });

  invalidateQueryCache('landing-section-templates');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  const created = await response.json();
  return created;
}

export async function deleteLandingSectionTemplateApi(id: string): Promise<boolean> {
  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {};
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE_URL}/landing-section-templates/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers,
  });

  invalidateQueryCache('landing-section-templates');

  if (!response.ok && response.status !== 204) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  return true;
}

export async function duplicateLandingSectionTemplateApi(id: string): Promise<LandingSectionTemplate> {
  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE_URL}/landing-section-templates/${encodeURIComponent(id)}/duplicate`, {
    method: 'POST',
    headers,
  });

  invalidateQueryCache('landing-section-templates');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  const duplicated = await response.json();
  return duplicated;
}

export async function resetLandingSectionTemplatesApi(): Promise<boolean> {
  const authHeader = getAuthHeader();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${API_BASE_URL}/landing-section-templates/reset-defaults`, {
    method: 'POST',
    headers,
  });

  invalidateQueryCache('landing-section-templates');

  if (!response.ok) {
    const errMsg = await getApiErrorMessage(response);
    throw new Error(errMsg);
  }

  return true;
}

// -------------------------------------------------------------
// TOUR BOOKINGS API (QUẢN LÝ ĐƠN ĐẶT TOUR & TRANG BỊ)
// -------------------------------------------------------------
export async function fetchTourBookingsApi(): Promise<any[]> {
  return fetchSectionItemsApi('tour-bookings');
}

export async function createTourBookingApi(payload: any): Promise<any> {
  return saveSectionItemApi('tour-bookings', 'create', payload);
}

export async function saveTourBookingApi(action: 'create' | 'update' | 'delete', payload: any): Promise<any> {
  return saveSectionItemApi('tour-bookings', action, payload);
}

export async function deleteTourBookingApi(id: string | number): Promise<any> {
  return saveSectionItemApi('tour-bookings', 'delete', { id });
}

// ============================================================================
// COUPON / PROMOTION VALIDATION (Danny @260825)
// ============================================================================

export interface CouponValidationResult {
  valid: boolean;
  discountPercent: number;
  title: string;
  code: string;
}

export async function validateCouponCodeApi(code: string): Promise<CouponValidationResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/promotions/validate-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) {
      return { valid: false, discountPercent: 0, title: '', code };
    }
    return await response.json();
  } catch {
    return { valid: false, discountPercent: 0, title: '', code };
  }
}
