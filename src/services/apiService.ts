// 4U RETREAT FRONTEND - REAL BACKEND API INTEGRATION SERVICE (100% Direct LoopBack 4 + MS SQL Server)

export const API_BASE_URL = 'http://127.0.0.1:3001';

// Format image URL: if relative filename like 'a.jpg' is provided, load using API_BASE_URL/uploads/a.jpg
export function getImageUrl(imagePath?: string): string {
  if (!imagePath || typeof imagePath !== 'string' || !imagePath.trim()) {
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
  }
  const trimmed = imagePath.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
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
    throw new Error('Upload failed');
  }

  return await response.json();
}


// Helper to map frontend section keys to LoopBack 4 endpoint paths
export function getLb4Endpoint(section: string): string {
  const mapping: Record<string, string> = {
    tours: '/tours',
    bookings: '/bookings',
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
  };
  return mapping[section] || `/${section}`;
}

// --------------------------------------------------------------------------
// JSON ARRAY PARSER & SANITIZER FOR MS SQL SERVER
// --------------------------------------------------------------------------

export function parseTourJsonFields(tour: any) {
  if (!tour) return tour;
  const arrayFields = [
    'highlights', 'itinerary', 'gallery', 'included', 'excluded',
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


  return tour;
}

export function sanitizeTourPayload(tourData: any, isUpdate = false) {
  const payload: any = {};
  const validKeys = [
    'slug', 'title', 'subtitle', 'category', 'country', 'city', 'duration', 'durationDays',
    'heroImage', 'price', 'originalPrice', 'isHot', 'isFeatured', 'isExclusive',
    'departureDates', 'airline', 'hotel', 'transportation', 'rating', 'reviewsCount',
    'highlights', 'itinerary', 'gallery', 'included', 'excluded', 'notes', 'destinationMap',
    'travelTips', 'faq', 'reviews'
  ];

  validKeys.forEach((key) => {
    if (tourData[key] !== undefined) {
      if (Array.isArray(tourData[key]) || (typeof tourData[key] === 'object' && tourData[key] !== null)) {
        payload[key] = JSON.stringify(tourData[key]);
      } else if (typeof tourData[key] === 'string' && (key === 'departureDates' || key === 'highlights' || key === 'gallery' || key === 'included') && tourData[key].includes(',')) {
        const arr = tourData[key].split(',').map((s: string) => s.trim()).filter(Boolean);
        payload[key] = JSON.stringify(arr);
      } else {
        payload[key] = tourData[key];
      }
    }
  });

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
      if (!response.ok) return getCachedQuery('tours') || [];
      const rawList = await response.json();
      if (Array.isArray(rawList)) {
        const parsedList = rawList.map(parseTourJsonFields);
        return setCachedQuery('tours', parsedList);
      }
      return getCachedQuery('tours') || [];
    } catch (err) {
      return getCachedQuery('tours') || [];
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

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 4u_admin_jwt_token_sample_2026',
    },
    body: JSON.stringify(payload),
  });

  // Invalidate query cache on mutation so next fetch gets fresh MS SQL data
  invalidateQueryCache('tours');

  if (response.status === 204) return { success: true };
  return await response.json();
}


export async function createTourApi(tourData: any) {
  const payload = sanitizeTourPayload(tourData, false);

  const response = await fetch(`${API_BASE_URL}/tours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 4u_admin_jwt_token_sample_2026',
    },
    body: JSON.stringify(payload),
  });

  // Invalidate query cache on mutation
  invalidateQueryCache('tours');

  return await response.json();
}

export async function deleteTourApi(id: number | string) {
  const isNumeric = typeof id === 'number' || (!isNaN(Number(id)) && Number(id) > 0);
  const url = isNumeric
    ? `${API_BASE_URL}/tours/${id}`
    : `${API_BASE_URL}/tours/slug/${encodeURIComponent(String(id))}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer 4u_admin_jwt_token_sample_2026',
    },
  });

  // Invalidate query cache on mutation
  invalidateQueryCache('tours');

  return response.ok;
}


// --------------------------------------------------------------------------
// GENERIC MODULE CRUD API CALLS WITH QUERY CACHE
// --------------------------------------------------------------------------

const inflightSectionPromises: Record<string, Promise<any> | null> = {};

export async function fetchSectionItemsApi(section: string, forceRefresh = false) {
  if (section === 'tours') {
    return fetchToursApi(forceRefresh);
  }

  const cacheKey = `section:${section}`;

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
      if (!response.ok) return getCachedQuery(cacheKey) || [];
      const data = await response.json();
      return setCachedQuery(cacheKey, data);
    } catch (err) {
      return getCachedQuery(cacheKey) || [];
    } finally {
      setTimeout(() => {
        inflightSectionPromises[section] = null;
      }, 500);
    }
  })();

  return inflightSectionPromises[section];
}

export async function saveSectionItemApi(section: string, action: 'create' | 'update' | 'delete', data: any) {
  const endpoint = getLb4Endpoint(section);
  let method = 'POST';
  let url = `${API_BASE_URL}${endpoint}`;

  const payload = { ...data };
  if (action === 'create' || typeof payload.id === 'string') {
    delete payload.id;
  }

  const targetId = data.id || data.slug;

  if (action === 'update') {
    method = 'PATCH';
    url = `${API_BASE_URL}${endpoint}/${targetId}`;
  } else if (action === 'delete') {
    method = 'DELETE';
    url = `${API_BASE_URL}${endpoint}/${targetId}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 4u_admin_jwt_token_sample_2026',
    },
    body: action !== 'delete' ? JSON.stringify(payload) : undefined,
  });

  // Invalidate query cache for this section on mutation
  invalidateQueryCache(`section:${section}`);


  if (response.status === 204) {
    return { success: true, action };
  }

  return await response.json();
}
