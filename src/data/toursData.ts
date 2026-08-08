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
  // Travel Blog Editorial Properties
  blogReadTime?: string;
  blogAuthor?: string;
  blogAuthorRole?: string;
  blogStorySnippet?: string;
  seriesType?: 'chua-lanh' | 'bao-ton' | 'thien-nhien' | 'thien-nguyen';
}

export const TOURS_DATA: TourPackage[] = [
  // 1. “Bình Yên trên Cao Nguyên” — Hồ Lắk
  {
    id: 'tour-1',
    slug: 'binh-yen-tren-cao-nguyen',
    title: '“Bình Yên trên Cao Nguyên” — Retreat Thiên Nhiên Hồ Lắk',
    subtitle: 'Chương trình Kết nối & Chữa lành giữa cao nguyên lộng gió, tĩnh tại tâm hồn',
    category: 'Wellness',
    seriesType: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Hồ Lắk, Đắk Lắk',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['10/09/2026', '25/09/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Lắk Tented Camp & Eco Resort (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 6500000, originalPrice: 7500000, discountPercentage: 13,
    rating: 4.98, reviewsCount: 184, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Thiền chuông xoay bên hồ Lắk', 'Tắm rừng Shinrin-Yoku', 'Ăn tối thực dưỡng 100% hữu cơ'],
    blogReadTime: '5 phút đọc',
    blogAuthor: 'Lê Ngọc Minh',
    blogAuthorRole: 'Senior Travel Editor',
    blogStorySnippet: 'Rời xa tiếng còi xe đô thị, tôi đứng trước hồ Lắk mờ sương khi hừng đông vừa hé. Tiếng chuông xoay ngân vang dịu nhẹ hòa cùng làn gió cao nguyên khiến mọi mệt mỏi tích tụ bấy lâu dường như tan biến...',
    itinerary: [
      { day: 1, title: 'Đón Khách & Thiền Hành Rừng Thông', description: 'Đón đoàn tại Buôn Ma Thuột, di chuyển về Lak Tented Camp.', image: '', activities: ['Trà chiều thảo mộc', 'Thiền hành đi bộ qua rừng thông'] },
      { day: 2, title: 'Yoga Bình Minh & Trekking Suối', description: 'Tập yoga đón bình minh và trekking thác nước tự nhiên.', image: '', activities: ['Yoga bình minh bên hồ', 'Trekking suối mát'] },
      { day: 3, title: 'Lễ Kết Nối & Trở Về', description: 'Bữa sáng chia tay và tiễn đoàn ra sân bay.', image: '', activities: ['Bữa sáng thực dưỡng', 'Lễ gieo hạt bình an'] }
    ],
    included: ['Lưu trú Lak Tented Camp 5*', 'Toàn bộ bữa ăn hữu cơ', 'Huấn luyện viên thiền 1:1'], excluded: ['Vé máy bay khứ hồi'], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Hồ Lắk, Đắk Lắk', travelTips: [], faq: [], reviews: []
  },
  // 2. “Tĩnh Lặng Giữa Đại Ngàn” — Nam Cát Tiên
  {
    id: 'tour-2',
    slug: 'tinh-lang-giua-dai-ngan',
    title: 'Tĩnh Lặng Giữa Đại Ngàn — Nam Cát Tiên Retreat',
    subtitle: 'Khôi phục Thân · Tâm · Trí giữa rừng nguyên sinh ngàn năm tuổi',
    category: 'Wellness',
    seriesType: 'bao-ton',
    country: 'Việt Nam',
    city: 'Nam Cát Tiên, Đồng Nai',
    duration: '2 Ngày 1 Đêm',
    durationDays: 2,
    departureDates: ['10/08/2026', '24/08/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Nam Cát Tiên Eco Lodge (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 3450000, originalPrice: 4200000, discountPercentage: 18,
    rating: 4.99, reviewsCount: 240, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Khám phá rừng Bầu Sấu hoang sơ', 'Thiền định chuông xoay Tây Tạng', 'Tắm rừng giải tỏa độc tố căng thẳng'],
    blogReadTime: '6 phút đọc',
    blogAuthor: 'Trần Hoài Anh',
    blogAuthorRole: 'Eco-Tourism Blogger',
    blogStorySnippet: 'Hít căng lồng ngực mùi nhựa cây tươi mới của rừng Nam Cát Tiên ngàn năm tuổi. Bạn sẽ bất ngờ khi thấy nhịp tim chậm lại, đầu óc nhẹ nhõm đến lạ kỳ sau chuyến xe mui trần ngắm thú đêm hoang dã...',
    itinerary: [
      { day: 1, title: 'Băng Sông Vào Rừng Già & Chèo Kayak', description: 'Di chuyển vào rừng Nam Cát Tiên, nhận phòng ven sông.', image: '', activities: ['Chèo Kayak sông Đồng Nai', 'Ngắm thú đêm mui trần'] },
      { day: 2, title: 'Trek Bàu Sấu & Trở Về', description: 'Trek Bàu Sấu hoang sơ và thiền định hừng đông.', image: '', activities: ['Trek cây cổ thụ', 'Thiền âm thanh tiếng rừng'] }
    ],
    included: ['Lưu trú Ecolodge ven sông 5*', 'Xe mui trần ngắm thú đêm', 'Bữa ăn thực dưỡng'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511497584788-8767611136f6?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Nam Cát Tiên, Đồng Nai', travelTips: [], faq: [], reviews: []
  },
  // 3. “Di Sản Vịnh Hạ Long”
  {
    id: 'tour-3',
    slug: 'di-san-vinh-ha-long',
    title: '“Di Sản Vịnh Hạ Long” — Retreat Kỳ Quan Thiên Nhiên',
    subtitle: 'Hành trình du thuyền VIP 5 sao ngắm hoàng hôn & phục hồi năng lượng giữa biển xanh',
    category: 'Luxury',
    seriesType: 'thien-nhien',
    country: 'Việt Nam',
    city: 'Vịnh Hạ Long, Quảng Ninh',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['12/08/2026', '28/08/2026'],
    airline: 'Xe Limousine VIP 4U & Du Thuyền 5 Star',
    hotel: 'Paradise Elegance Cruise 5 Star',
    transportation: 'Du Thuyền VIP & Limousine 9 Chỗ',
    price: 4850000, originalPrice: 5900000, discountPercentage: 18,
    rating: 4.97, reviewsCount: 210, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Du thuyền VIP 5 sao Hạ Long', 'Trà đạo ngắm hoàng hôn biển', 'Kayak hang Luồn & thiền bãi biển'],
    blogReadTime: '4 phút đọc',
    blogAuthor: 'Đặng Vũ Hải',
    blogAuthorRole: 'Luxury Lifestyle Writer',
    blogStorySnippet: 'Đứng trên sundeck du thuyền 5 sao nhìn từng khối núi đá vôi ẩn hiện giữa làn sương chiều Hạ Long. Ly trà ô long ấm áp trên tay và bài tập Tai Chi đón bình minh là liều thuốc dưỡng tâm hảo hạng...',
    itinerary: [
      { day: 1, title: 'Lên Du Thuyền & Thưởng Trà Hoàng Hôn', description: 'Check-in du thuyền 5 sao, thưởng trà ngắm hoàng hôn.', image: '', activities: ['Thưởng trà đạo trên sundeck', 'Bữa tối hải sản cao cấp'] },
      { day: 2, title: 'Chèo Kayak Hang Luồn & Tai Chi', description: 'Tập Tai Chi đón bình minh và chèo kayak khám phá hang động.', image: '', activities: ['Thiền Tai Chi', 'Kayak Hang Luồn'] },
      { day: 3, title: 'Tham Quan Đảo Ti Tốp & Trở Về', description: 'Trải nghiệm ngắm toàn cảnh vịnh từ đỉnh Ti Tốp.', image: '', activities: ['Ngắm cảnh đỉnh Ti Tốp', 'Tiễn đoàn'] }
    ],
    included: ['Lưu trú du thuyền Paradise 5*', 'Toàn bộ bữa ăn trên du thuyền', 'Hoạt động Kayak & Tai Chi'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Vịnh Hạ Long, Quảng Ninh', travelTips: [], faq: [], reviews: []
  },
  // 4. “Hơi Thở Yên Tử”
  {
    id: 'tour-4',
    slug: 'hoi-tho-yen-tu',
    title: '“Hơi Thở Yên Tử” — Retreat Thần Khí & Thiền Trúc Lâm',
    subtitle: 'Tìm về cội nguồn tâm linh, tái tạo thần khí nơi danh sơn Trúc Lâm Yên Tử',
    category: 'Wellness',
    seriesType: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Yên Tử, Quảng Ninh',
    duration: '2 Ngày 1 Đêm',
    durationDays: 2,
    departureDates: ['15/09/2026', '29/09/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Legacy Yên Tử — MGallery (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 4200000, originalPrice: 4900000, discountPercentage: 14,
    rating: 4.96, reviewsCount: 156, isHot: false, isFeatured: true, isExclusive: true, isPromotion: false,
    highlights: ['Lưu trú Legacy Yên Tử kiến trúc triều Trần', 'Thiền trầm & ngâm chân thảo dược', 'Tắm khoáng nóng Onsen thảo mộc'],
    blogReadTime: '5 phút đọc',
    blogAuthor: 'Nguyễn Thanh Vân',
    blogAuthorRole: 'Wellness Journal Editor',
    blogStorySnippet: 'Dưới chân núi Yên Tử linh thiêng, tiếng chuông chùa thanh tĩnh ngấm sâu vào từng mạch máu. Không gian kiến trúc gỗ cổ kính của Legacy Yên Tử mang lại cảm giác bình an vô trùng...',
    itinerary: [
      { day: 1, title: 'Hành Hương Chân Núi & Thiền Trầm', description: 'Đón đoàn về Legacy Yên Tử, trải nghiệm trà thiền.', image: '', activities: ['Trà thiền Trúc Lâm', 'Thiền trầm hương'] },
      { day: 2, title: 'Đón Bình Minh Đỉnh Tháp & Onsen', description: 'Tập khí công hừng đông và ngâm tắm khoáng Onsen.', image: '', activities: ['Khí công bình minh', 'Tắm Onsen thảo dược'] }
    ],
    included: ['Lưu trú Legacy Yên Tử MGallery 5*', 'Suất tắm khoáng Onsen & Trà thiền', 'Ăn sáng thực dưỡng'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Yên Tử, Quảng Ninh', travelTips: [], faq: [], reviews: []
  },
  // 5. “Chốn Bồng Lai Mờ Sương” — Sapa
  {
    id: 'tour-5',
    slug: 'chon-bong-lai-sapa',
    title: '“Chốn Bồng Lai Mờ Sương” — Sapa Eco Valley Retreat',
    subtitle: 'Thả mình giữa ruộng bậc thang ngút ngàn & săn mây đỉnh Fansipan',
    category: 'Wellness',
    seriesType: 'thien-nhien',
    country: 'Việt Nam',
    city: 'Sapa, Lào Cai',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['05/09/2026', '20/09/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Topas Ecolodge Sapa (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 7200000, originalPrice: 8500000, discountPercentage: 15,
    rating: 4.99, reviewsCount: 310, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Hồ bơi vô cực ngắm thung lũng Mường Hoa', 'Tắm lá thuốc người Dao Đỏ bản địa', 'Thưởng thức ẩm thực Tây Bắc hữu cơ'],
    blogReadTime: '7 phút đọc',
    blogAuthor: 'Lê Ngọc Minh',
    blogAuthorRole: 'Senior Travel Editor',
    blogStorySnippet: 'Sáng thức dậy ở Topas Ecolodge, ngắm biển mây bồng bềnh cuộn trôi dưới thung lũng Mường Hoa. Trải nghiệm ngâm mình trong bồn tắm lá thuốc của người Dao Đỏ khiến mọi mệt mỏi trong người dịu bớt...',
    itinerary: [
      { day: 1, title: 'Đón Đoàn & Check-in Topas Ecolodge', description: 'Di chuyển Limousine lên Sapa, nhận phòng bungalo ngắm thung lũng.', image: '', activities: ['Thưởng trà mây', 'Ngâm lá thuốc Dao Đỏ'] },
      { day: 2, title: 'Trek Bản Lao Chải & Yoga Hồ Bơi', description: 'Trek nhẹ nhàng qua làng bản và tập Yoga vô cực.', image: '', activities: ['Trek Lao Chải Ta Van', 'Yoga hoàng hôn'] },
      { day: 3, title: 'Trải Nghiệm Trái Cây Bản Địa & Trở Về', description: 'Bữa sáng thực dưỡng & tiễn đoàn về Hà Nội.', image: '', activities: ['Trở về Hà Nội'] }
    ],
    included: ['Lưu trú Topas Ecolodge 5*', 'Xe Limousine VIP khứ hồi', 'Tắm lá thuốc người Dao Đỏ'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Sapa, Lào Cai', travelTips: [], faq: [], reviews: []
  },
  // 6. “Mùa Hoa Trên Đá” — Hà Giang
  {
    id: 'tour-6',
    slug: 'mua-hoa-tren-da-ha-giang',
    title: '“Mùa Hoa Trên Đá” — Retreat Thiện Nguyện & Văn Hóa Hà Giang',
    subtitle: 'Gieo mầm tri thức, chia sẻ yêu thương & chinh phục cao nguyên đá kỳ vĩ',
    category: 'Wellness',
    seriesType: 'thien-nguyen',
    country: 'Việt Nam',
    city: 'Đồng Văn, Hà Giang',
    duration: '4 Ngày 3 Đêm',
    durationDays: 4,
    departureDates: ['18/09/2026', '02/10/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'H’Mong Village Resort (4 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 5200000, originalPrice: 6200000, discountPercentage: 16,
    rating: 4.95, reviewsCount: 142, isHot: false, isFeatured: true, isExclusive: false, isPromotion: true,
    highlights: ['Tặng quà & trao học bổng trẻ em bản cao', 'Chèo kayak sông Nho Quế & đèo Mã Pí Lèng', 'Đốt lửa trại & giao lưu văn hóa H’Mông'],
    blogReadTime: '6 phút đọc',
    blogAuthor: 'Đào Thu Trang',
    blogAuthorRole: 'Social Impact Blogger',
    blogStorySnippet: 'Không chỉ là chuyến đi thưởng ngoạn cảnh quan kỳ vĩ của Mã Pí Lèng, chuyến retreat thiện nguyện mang lại nụ cười trong trẻo của các em nhỏ vùng cao khi nhận sách vở và trang phục ấm...',
    itinerary: [
      { day: 1, title: 'Hà Nội — Quản Bạ — H’Mong Village', description: 'Đón đoàn di chuyển lên Quản Bạ, trải nghiệm resort kiến trúc Quẩy Tấu.', image: '', activities: ['Giao lưu văn hóa H’Mông', 'Ăn tối thắng cố nướng'] },
      { day: 2, title: 'Chương Trình Thiện Nguyện Bản Cao', description: 'Đến điểm trường trao tặng quà & tủ sách cầu nối tri thức.', image: '', activities: ['Trao học bổng & sách vở', 'Tổ chức trò chơi dân gian'] },
      { day: 3, title: 'Chinh Phục Mã Pí Lèng & Kayak Nho Quế', description: 'Đi thuyền sông Nho Quế ngắm Hẻm Tu Sản.', image: '', activities: ['Kayak Nho Quế', 'Đèo Mã Pí Lèng'] },
      { day: 4, title: 'Trở Về Hà Nội', description: 'Tiễn đoàn về Hà Nội.', image: '', activities: ['Bữa sáng chia tay'] }
    ],
    included: ['Lưu trú H’Mong Village Resort', 'Kinh phí hỗ trợ hoạt động thiện nguyện', 'Xe Limousine VIP'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=85&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Đồng Văn, Hà Giang', travelTips: [], faq: [], reviews: []
  },
  // 7. “Hoàng Hôn Đảo Ngọc” — Phú Quốc
  {
    id: 'tour-7',
    slug: 'hoang-hon-dao-ngoc-phu-quoc',
    title: '“Hoàng Hôn Đảo Ngọc” — Phú Quốc Coastal Wellness Retreat',
    subtitle: 'Hòa mình cùng tiếng sóng biển đêm & thực hành yoga bãi biển đón bình minh',
    category: 'Wellness',
    seriesType: 'thien-nhien',
    country: 'Việt Nam',
    city: 'Phú Quốc, Kiên Giang',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['08/09/2026', '22/09/2026'],
    airline: 'Xe Limousine & Canô VIP',
    hotel: 'JW Marriott Phu Quoc Emerald Bay (5 Stars)',
    transportation: 'Limousine & Canô Riêng',
    price: 6200000, originalPrice: 7500000, discountPercentage: 17,
    rating: 4.98, reviewsCount: 198, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Yoga bình minh trên cát trắng', 'Thiền sóng biển ban đêm', 'Tiệc tối thực dưỡng hải sản tươi'],
    blogReadTime: '5 phút đọc',
    blogAuthor: 'Lê Ngọc Minh',
    blogAuthorRole: 'Senior Travel Editor',
    blogStorySnippet: 'Đón làn gió biển trong lành của bãi Kem, trải thảm tập yoga khi hừng đông vừa chớm nở. Tiếng sóng biển thì sầm dịu nhẹ đưa tâm trí trở về trạng thái thư giãn tuyệt đối...',
    itinerary: [
      { day: 1, title: 'Đón Sân Bay & Trà Chiều Biển', description: 'Đón đoàn về resort, thưởng trà ngắm hoàng hôn.', image: '', activities: ['Thưởng trà hoàng hôn', 'Thiền sóng biển'] },
      { day: 2, title: 'Yoga Bình Minh & Khai Thấu Năng Lượng', description: 'Tập yoga biển & đi canô riêng ngắm san hô.', image: '', activities: ['Yoga bình minh', 'Lặn ngắm san hô'] },
      { day: 3, title: 'Bữa Sáng Thực Dưỡng & Tiễn Đoàn', description: 'Tiễn đoàn ra sân bay Phú Quốc.', image: '', activities: ['Bữa sáng thực dưỡng'] }
    ],
    included: ['Lưu trú resort 5*', 'Toàn bộ bữa ăn thực dưỡng', 'Hoạt động Canô & Yoga'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Phú Quốc, Kiên Giang', travelTips: [], faq: [], reviews: []
  },
  // 8. “Tĩnh Lặng Tràng An” — Ninh Bình
  {
    id: 'tour-8',
    slug: 'tinh-lang-trang-an-ninh-binh',
    title: '“Tĩnh Lặng Tràng An” — Ninh Bình Eco Legacy Retreat',
    subtitle: 'Chèo thuyền ngoạn cảnh di sản & thiền định giữa thung lũng đá vôi',
    category: 'Wellness',
    seriesType: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Tràng An, Ninh Bình',
    duration: '2 Ngày 1 Đêm',
    durationDays: 2,
    departureDates: ['14/09/2026', '28/09/2026'],
    airline: 'Xe Limousine VIP 4U',
    hotel: 'Emeralda Resort Ninh Bình (5 Stars)',
    transportation: 'Limousine VIP 9 Chỗ',
    price: 3950000, originalPrice: 4800000, discountPercentage: 18,
    rating: 4.97, reviewsCount: 165, isHot: true, isFeatured: true, isExclusive: true, isPromotion: true,
    highlights: ['Chèo thuyền Tràng An riêng tư', 'Thiền chuông xoay Tây Tạng', 'Tắm ngâm khoáng bồn gỗ cổ truyền'],
    blogReadTime: '4 phút đọc',
    blogAuthor: 'Trần Hoài Anh',
    blogAuthorRole: 'Eco-Tourism Blogger',
    blogStorySnippet: 'Thuyền nhẹ trôi trên dòng sông sào Tràng An, phản chiếu những vách núi đá vôi phủ rêu xanh ngàn năm. Không gian tĩnh lặng chỉ còn tiếng mái chèo khua nước...',
    itinerary: [
      { day: 1, title: 'Hà Nội — Tràng An & Trà Thiền', description: 'Đón đoàn di chuyển Ninh Bình, thưởng trà thiền.', image: '', activities: ['Thuyền Tràng An', 'Trà thiền chiều'] },
      { day: 2, title: 'Tập Khí Công & Ngâm Khoáng', description: 'Khí công bình minh & ngâm tắm bồn gỗ thảo mộc.', image: '', activities: ['Khí công bình minh', 'Trở về Hà Nội'] }
    ],
    included: ['Lưu trú Emeralda Resort 5*', 'Vé tham quan di sản Tràng An', 'Xe Limousine VIP'], excluded: [], notes: [],
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1920&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1920&auto=format&fit=crop'
    ],
    destinationMap: 'Tràng An, Ninh Bình', travelTips: [], faq: [], reviews: []
  }
];
