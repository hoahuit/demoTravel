export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  image: string;
  activities: string[];
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
}

// 3 SAMPLE TOUR PACKAGES
export const TOURS_DATA: TourPackage[] = [
  // 1. “Bình Yên trên Cao Nguyên”
  {
    id: 'tour-1',
    slug: 'binh-yen-tren-cao-nguyen',
    title: '“Bình Yên trên Cao Nguyên” — Retreat Thiên Nhiên Hồ Lắk',
    subtitle: 'Chương trình Kết nối & Chữa lành giữa cao nguyên lộng gió, tĩnh tại tâm hồn',
    category: 'Wellness',
    country: 'Việt Nam',
    city: 'Hồ Lắk',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['10/09/2026', '25/09/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Lắk Tented Camp & Eco Resort (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 6500000, originalPrice: 7500000, discountPercentage: 13,
    rating: 4.98, reviewsCount: 184, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Thiền chuông xoay bên hồ Lắk', 'Tắm rừng Shinrin-Yoku', 'Ăn tối thực dưỡng 100% hữu cơ'],
    itinerary: [
      { day: 1, title: 'Đón Khách & Thiền Hành Rừng Thông', description: 'Đón đoàn tại Buôn Ma Thuột, di chuyển về Lak Tented Camp.', image: '', activities: ['Trà chiều thảo mộc', 'Thiền hành đi bộ qua rừng thông'] },
      { day: 2, title: 'Yoga Bình Minh & Trekking Suối', description: 'Tập yoga đón bình minh và trekking thác nước tự nhiên.', image: '', activities: ['Yoga bình minh bên hồ', 'Trekking suối mát'] },
      { day: 3, title: 'Lễ Kết Nối & Trở Về', description: 'Bữa sáng chia tay và tiễn đoàn ra sân bay.', image: '', activities: ['Bữa sáng thực dưỡng', 'Lễ gieo hạt bình an'] }
    ],
    included: ['Lưu trú Lak Tented Camp 5*', 'Toàn bộ bữa ăn hữu cơ', 'Huấn luyện viên thiền 1:1'], excluded: ['Vé máy bay khứ hồi'], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Hồ Lắk, Việt Nam', travelTips: [], faq: [], reviews: []
  },
  // 2. “Tĩnh Lặng Giữa Đại Ngàn”
  {
    id: 'tour-2',
    slug: 'tinh-lang-giua-dai-ngan',
    title: '“Tĩnh Lặng Giữa Đại Ngàn” — Nam Cát Tiên Retreat',
    subtitle: 'Khôi phục Thân · Tâm · Trí giữa rừng nguyên sinh ngàn năm tuổi',
    category: 'Wellness',
    country: 'Việt Nam',
    city: 'Nam Cát Tiên',
    duration: '2 Ngày 1 Đêm',
    durationDays: 2,
    departureDates: ['10/08/2026', '24/08/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Nam Cát Tiên Eco Lodge (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 3450000, originalPrice: 4200000, discountPercentage: 18,
    rating: 4.99, reviewsCount: 240, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Khám phá rừng Bầu Sấu', 'Thiền định chuông xoay', 'Tắm rừng giải tỏa stress'],
    itinerary: [
      { day: 1, title: 'Băng Sông Vào Rừng Già & Chèo Kayak', description: 'Di chuyển vào rừng Nam Cát Tiên, nhận phòng ven sông.', image: '', activities: ['Chèo Kayak sông Đồng Nai', 'Ngắm thú đêm mui trần'] },
      { day: 2, title: 'Trek Bàu Sấu & Trở Về', description: 'Trek Bàu Sấu hoang sơ và thiền định hừng đông.', image: '', activities: ['Trek cây cổ thụ', 'Thiền âm thanh tiếng rừng'] }
    ],
    included: ['Lưu trú Ecolodge ven sông 5*', 'Xe mui trần ngắm thú đêm', 'Bữa ăn thực dưỡng'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Nam Cát Tiên, Việt Nam', travelTips: [], faq: [], reviews: []
  },
  // 3. “Di Sản Vịnh Hạ Long”
  {
    id: 'tour-3',
    slug: 'di-san-vinh-ha-long',
    title: '“Di Sản Vịnh Hạ Long” — Retreat Kỳ Quan Thiên Nhiên',
    subtitle: 'Hành trình du thuyền VIP 5 sao ngắm hoàng hôn & phục hồi năng lượng giữa biển xanh',
    category: 'Luxury',
    country: 'Việt Nam',
    city: 'Vịnh Hạ Long',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['12/08/2026', '28/08/2026'],
    airline: 'Xe Limousine VIP 4U & Du Thuyền 5 Star',
    hotel: 'Paradise Elegance Cruise 5 Star',
    transportation: 'Du Thuyền VIP & Limousine 9 Chỗ',
    price: 4850000, originalPrice: 5900000, discountPercentage: 18,
    rating: 4.97, reviewsCount: 210, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Du thuyền VIP 5 sao Hạ Long', 'Trà đạo ngắm hoàng hôn biển', 'Kayak hang Luồn & thiền bãi biển'],
    itinerary: [
      { day: 1, title: 'Lên Du Thuyền & Thưởng Trà Hoàng Hôn', description: 'Check-in du thuyền 5 sao, thưởng trà ngắm hoàng hôn.', image: '', activities: ['Thưởng trà đạo trên sundeck', 'Bữa tối hải sản cao cấp'] },
      { day: 2, title: 'Chèo Kayak Hang Luồn & Tai Chi', description: 'Tập Tai Chi đón hừng đông và chèo kayak khám phá hang động.', image: '', activities: ['Thiền Tai Chi', 'Kayak Hang Luồn'] },
      { day: 3, title: 'Tham Quan Đảo Ti Tốp & Trở Về', description: 'Trải nghiệm ngắm toàn cảnh vịnh từ đỉnh Ti Tốp.', image: '', activities: ['Ngắm cảnh đỉnh Ti Tốp', 'Tiễn đoàn'] }
    ],
    included: ['Lưu trú du thuyền Paradise 5*', 'Toàn bộ bữa ăn trên du thuyền', 'Hoạt động Kayak & Tai Chi'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Vịnh Hạ Long, Việt Nam', travelTips: [], faq: [], reviews: []
  }
];
