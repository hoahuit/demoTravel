// MOCK DATABASE CHO TOÀN BỘ CÁC SẢN PHẨM & RETREAT & TRANG MENU CON 4U (DỄ DÀNG TÍCH HỢP API BACKEND SAU NÀY)

export interface ItineraryItem {
  day: string;
  title: string;
  events: string[];
}

export interface ProductItem {
  slug: string;
  badge1: string;
  badge2: string;
  title: string;
  subtitle: string;
  location: string;
  heroImage: string;
  heroVideo?: string;
  duration: string;
  rating: string;
  type: string;
  priceText: string;
  priceAdult: number;
  priceChild: number;
  experienceTitle: string;
  experiencePara1: string;
  experiencePara2: string;
  galleryImages: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  mapLocation: string;
  mapCoords: string;
  reviewScore: string;
  reviewCount: number;
  reviewQuote: string;
}

export const productsData: Record<string, ProductItem> = {
  // ─────────────────────────────────────────────────────────────
  // 1. SERIES RETREAT
  // ─────────────────────────────────────────────────────────────
  'retreat-chua-lanh': {
    slug: 'retreat-chua-lanh',
    badge1: 'RETREAT CHỮA LÀNH',
    badge2: 'ĐỘC QUYỀN',
    title: 'Bình Yên Trên Cao Nguyên',
    subtitle: 'Tìm Lại Sự Tĩnh Lặng Giữa Cao Nguyên Mờ Sương',
    location: 'Đắk Lắk & Đà Lạt, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.9 / 5.0 (24 Đánh giá)',
    type: 'Nghỉ Dưỡng & Thiên Nhiên',
    priceText: '12.500.000 VNĐ',
    priceAdult: 12500000,
    priceChild: 5000000,
    experienceTitle: 'Trải Nghiệm Độc Bản',
    experiencePara1: 'Rời xa nhịp sống hối hả nơi đô thị để hòa mình vào không gian tĩnh lặng nguyên sơ của vùng Cao Nguyên. Hành trình "Bình Yên Trên Cao Nguyên" được thiết kế tỉ mỉ dành cho những ai đang tìm kiếm sự phục hồi sâu sắc từ bên trong.',
    experiencePara2: 'Hành trình đưa bạn đi qua những rừng thông cổ thụ mờ sương và những hồ nước tĩnh lặng, cùng sự đồng hành của đội ngũ chuyên gia am hiểu về nghệ thuật chăm sóc thân tâm. Mỗi khoảnh khắc là một lời mời gọi bạn sống chậm lại, hít thở sâu và kết nối lại với chính bản thân mình.',
    galleryImages: [
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Chạm Vào Tĩnh Lặng & Khởi Đầu',
        events: [
          'Sáng: Đón quý khách tại Buôn Ma Thuột. Xe đưa đón riêng sang trọng về khu nghỉ dưỡng sinh thái Lak Tented Camp.',
          'Trải nghiệm trà chiều thảo mộc cao nguyên bản địa đặc sắc.',
          'Chiều: Thiền hành đi bộ hướng dẫn qua rừng thông cổ thụ tĩnh lặng.',
          'Tối: Thưởng thức ẩm thực hữu cơ Farm-to-Table từ nông sản địa phương.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Hòa Mình & Trải Nghiệm Sâu',
        events: [
          'Đón bình minh với buổi tập Yoga thiền định hướng ra thung lũng mờ sương.',
          'Trải nghiệm đặc quyền tham quan đồi cà phê bền vững cùng chủ trang trại bản địa.',
          'Trek Thác Bìm Bịp Buôn Ma Thuột & thưởng thức bữa trưa thực dưỡng bên dòng suối.',
          'Tối: Đốt lửa trại ngắm bầu trời sao riêng tư và chia sẻ cảm xúc.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Tích Tụ Năng Lượng & Tạm Biệt',
        events: [
          'Bữa sáng chia tay với các món ăn mang hương vị vùng cao đặc trưng.',
          'Lễ kết nối mục tiêu sống & gieo hạt hạnh phúc bên hồ tĩnh lặng.',
          'Xe riêng đưa quý khách ra sân bay kết thúc hành trình chữa lành.'
        ]
      }
    ],
    inclusions: [
      'Toàn bộ chi phí lưu trú cao cấp Lak Tented Camp Cao Nguyên',
      'Chuyên gia & Huấn luyện viên luyện thiền 1:1 suốt hành trình',
      'Thực đơn thuần chay / Fasting thanh lọc cơ thể chuẩn y khoa',
      'Xe đưa đón cao cấp suốt tuyến Buôn Ma Thuột - Đà Lạt',
      'Xe đạp địa hình, vé tham quan làng gốm M\'nông & Thác Bìm Bịp'
    ],
    mapLocation: 'Lak Tented Camp & Thác Bìm Bịp',
    mapCoords: 'Buôn Ma Thuột, Đắk Lắk, Việt Nam',
    reviewScore: '4.9 / 5.0',
    reviewCount: 24,
    reviewQuote: '"Chuyến đi mang lại cảm giác tĩnh lặng thật sự giữa thiên nhiên hoang sơ. Dịch vụ tận tâm chuẩn 5 sao."'
  },

  'retreat-bao-ton': {
    slug: 'retreat-bao-ton',
    badge1: 'RETREAT BẢO TỒN',
    badge2: 'SINH THÁI 5 STAR',
    title: 'Hành Trình Bảo Tồn Rừng Nguyên Sinh',
    subtitle: 'Lắng Nghe Nhịp Thở Của Rừng Già Nam Cát Tiên',
    location: 'Nam Cát Tiên, Đồng Nai, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.95 / 5.0 (32 Đánh giá)',
    type: 'Bảo Tồn & Sinh Thái',
    priceText: '14.800.000 VNĐ',
    priceAdult: 14800000,
    priceChild: 6000000,
    experienceTitle: 'Bảo Tồn & Kết Nối Rừng Già',
    experiencePara1: 'Đến với Retreat Bảo tồn Nam Cát Tiên, bạn không chỉ nghỉ dưỡng mà còn trực tiếp tham gia vào các hoạt động trồng cây gieo mầm bảo tồn đa dạng sinh học cùng các kiểm lâm viên.',
    experiencePara2: 'Đêm đến, bạn sẽ trải nghiệm chuyến đi ngắm thú đêm hoang dã duy nhất tại Việt Nam và thức giấc trong tiếng chim hót bên sông Đồng Nai tĩnh lặng.',
    galleryImages: [
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Băng Sông Vào Rừng Già Nam Cát Tiên',
        events: [
          'Di chuyển xe điện riêng vượt sông Đồng Nai tiến vào vùng lõi rừng Nam Cát Tiên.',
          'Nhận phòng Ecolodge view bờ sông tĩnh lặng.',
          'Hành trình ngắm thú đêm hoang dã bằng xe mui trần chuyên dụng.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Khám Phá Bàu Sấu & Trồng Cây Gieo Mầm',
        events: [
          'Trek xuyên rừng cổ thụ ngàn năm Bằng Lăng Cổ Thụ & Cây Tung.',
          'Chèo thuyền Kayak ngắm hồ Bàu Sấu hoang sơ tuyệt đẹp.',
          'Tham gia hoạt động gieo mầm bảo tồn cây gỗ quý cùng chuyên gia lâm nghiệp.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Thiền Định Bên Sông & Trở Về',
        events: [
          'Buổi thiền định âm thanh tiếng rừng lúc hừng đông.',
          'Thưởng thức bữa sáng thảo mộc & quà tặng chứng nhận bảo tồn rừng.',
          'Xe tiễn đoàn trở về TP. Hồ Chí Minh.'
        ]
      }
    ],
    inclusions: [
      'Lưu trú Ecolodge ven sông Nam Cát Tiên cao cấp',
      'Chuyến ngắm thú đêm độc quyền & Chèo Kayak Bàu Sấu',
      'Toàn bộ bữa ăn thực dưỡng rừng xanh hữu cơ',
      'Chứng nhận đóng góp quỹ bảo tồn đa dạng sinh học 4U'
    ],
    mapLocation: 'Vườn Quốc Gia Nam Cát Tiên & Bàu Sấu',
    mapCoords: 'Tân Phú, Đồng Nai, Việt Nam',
    reviewScore: '4.95 / 5.0',
    reviewCount: 32,
    reviewQuote: '"Trải nghiệm ngắm thú đêm và trồng cây rừng ngàn năm khiến cả gia đình tôi thực sự xúc động."'
  },

  'retreat-thien-nhien': {
    slug: 'retreat-thien-nhien',
    badge1: 'RETREAT THIÊN NHIÊN',
    badge2: 'BIỂN ĐẢO NGUYÊN SƠ',
    title: 'Tĩnh Lặng Giữa Đại Ngàn Côn Đảo',
    subtitle: 'Chạm Vào Đại Dương Hoang Sơ & Rừng Trầm Tích',
    location: 'Côn Đảo, Bà Rịa - Vũng Tàu, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    duration: '4 Ngày 3 Đêm',
    rating: '5.0 / 5.0 (18 Đánh giá)',
    type: 'Biển Đảo & Tĩnh Tâm',
    priceText: '16.200.000 VNĐ',
    priceAdult: 16200000,
    priceChild: 7500000,
    experienceTitle: 'Đại Dương & Tĩnh Thức',
    experiencePara1: 'Nằm biệt lập giữa bãi biển xanh ngọc và rừng nguyên sinh Côn Đảo, hành trình hòa mình vào sóng biển, rạn san hô nguyên sơ và chuỗi bài tập thở Pranayama giữa lòng đại dương.',
    experiencePara2: 'Tận hưởng khoảnh khắc hoàng hôn lặn trên Đỉnh Tình Yêu và lắng nghe tiếng sóng vỗ về giải tỏa mọi mệt mỏi.',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Chào Đảo Ngọc & Hoàng Hôn Bãi Nhát',
        events: [
          'Đón chuyến bay đến Côn Đảo, xe riêng đón về Six Senses / Poulo Condor Resort.',
          'Thư giãn trà biển & Lễ kết nối nước đại dương.',
          'Ngắm hoàng hôn lãng mạn tại Bãi Nhát.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Lặn Biển San Hô Hòn Bảy Cạnh & Thả Rùa',
        events: [
          'Cano riêng đến Hòn Bảy Cạnh ngắm san hô & khám phá rừng ngập mặn.',
          'Trải nghiệm thả rùa con về biển (Theo mùa bãi đẻ).',
          'Thiền định chuông xoay bên bãi cát trắng.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Trek Rừng Ông Đụng & Thanh Lọc Thân Tâm',
        events: [
          'Trek rừng nguyên sinh Vườn Quốc Gia Côn Đảo đến Bãi Ông Đụng.',
          'Liệu trình Massage đá nóng muối biển detox cơ thể.',
          'Tối: Bữa tối hải sản nướng hữu cơ dưới hàng dừa.'
        ]
      },
      {
        day: 'NGÀY 4',
        title: 'Bình Minh Đỉnh Tình Yêu & Bay Về',
        events: [
          'Tập Yoga hít thở khí biển lúc hừng đông.',
          'Tự do dạo chợ hải sản địa phương.',
          'Xe tiễn sân bay Cỏ Ống.'
        ]
      }
    ],
    inclusions: [
      'Vé máy bay khứ hồi Côn Đảo & Lưu trú Resort 5 sao',
      'Cano riêng lặn ngắm san hô Hòn Bảy Cạnh',
      'Liệu trình Thiền chuông xoay & Massage đá nóng',
      'Thực đơn hải sản hữu cơ nguyên tươi mỗi ngày'
    ],
    mapLocation: 'Vườn Quốc Gia Côn Đảo & Bãi Nhát',
    mapCoords: 'Côn Đảo, Bà Rịa - Vũng Tàu, Việt Nam',
    reviewScore: '5.0 / 5.0',
    reviewCount: 18,
    reviewQuote: '"Côn Đảo hoang sơ và thiêng liêng đến lạ kỳ. Buổi thiền chuông bên bãi biển thực sự đắt giá."'
  },

  'retreat-thien-nguyen': {
    slug: 'retreat-thien-nguyen',
    badge1: 'RETREAT THIỆN NGUYỆN',
    badge2: 'GIEO HẠT HẠNH PHÚC',
    title: 'Hành Trình Gieo Hạt Hạnh Phúc Hà Giang',
    subtitle: 'Chia Sẻ Yêu Thương Giữa Hùng Vĩ Mèo Vạc & Lũng Cú',
    location: 'Hà Giang, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80',
    duration: '4 Ngày 3 Đêm',
    rating: '4.98 / 5.0 (40 Đánh giá)',
    type: 'Thiện Nguyện & Văn Hóa',
    priceText: '11.500.000 VNĐ',
    priceAdult: 11500000,
    priceChild: 5500000,
    experienceTitle: 'Gieo Hạt Yêu Thương Vùng Cao',
    experiencePara1: 'Chuyến đi trao tặng tủ sách, trang thiết bị học tập và áo ấm cho trẻ em đồng bào H’Mông tại các điểm trường nghèo Mèo Vạc.',
    experiencePara2: 'Được hòa mình vào nhịp sống yên bình của bản làng, thưởng thức thắng dền, rượu ngô và nghe tiếng khèn môi giữa núi đá đơm hoa.',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Hà Nội - Hà Giang - Cổng Trời Quản Bạ',
        events: [
          'Xe Limousine đón tại Hà Nội đi Hà Giang.',
          'Dừng chân Cổng Trời Quản Bạ & Dốc Thẩm Mã.',
          'Nghỉ đêm Homestay dân tộc H’Mông Đồng Văn.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Trao Quà Thiện Nguyện Điểm Trường Mèo Vạc',
        events: [
          'Tham gia buổi lợp lại mái trường & trao tặng 100 suất quà áo ấm, sách vở cho em nhỏ.',
          'Tổ chức gian hàng trò chơi dân gian & nấu cơm thịt cho học sinh vùng cao.',
          'Chinh phục Đèo Mã Pí Lèng & Đi thuyền sông Nho Quế.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Cột Cờ Lũng Cú & Làng Lô Lô Chải',
        events: [
          'Lễ chào cờ thiêng liêng tại Cột Cờ Lũng Cú.',
          'Giao lưu văn hóa uống trà tại Làng cổ Lô Lô Chải.',
          'Đêm nhạc guitar ngẫu hứng bên lửa trại bản làng.'
        ]
      },
      {
        day: 'NGÀY 4',
        title: 'Chợ Phiên Vùng Cao & Về Hà Nội',
        events: [
          'Trải nghiệm Chợ phiên Đồng Văn rực rỡ sắc màu thổ cẩm.',
          'Mua đặc sản hoa tam giác mạch & mật chiết bạc hà.',
          'Xe đưa đoàn trở về Hà Nội.'
        ]
      }
    ],
    inclusions: [
      'Toàn bộ ngân sách quà tặng thiện nguyện 4U gieo hạt',
      'Xe Limousine giường nằm cao cấp Hà Nội - Hà Giang',
      'Thuyền du ngoạn Hẻm Tu Sản Sông Nho Quế',
      'Lưu trú Homestay bản địa xanh sạch 5 sao'
    ],
    mapLocation: 'Mèo Vạc, Lũng Cú & Sông Nho Quế',
    mapCoords: 'Đồng Văn, Hà Giang, Việt Nam',
    reviewScore: '4.98 / 5.0',
    reviewCount: 40,
    reviewQuote: '"Nụ cười của các bé ở Mèo Vạc khi nhận tủ sách mới là món quà chữa lành nhất cuộc đời tôi."'
  },

  'cao-nguyen': {
    slug: 'cao-nguyen',
    badge1: 'RETREAT HOT',
    badge2: 'TRENDING 2026',
    title: 'Bình Yên Trên Cao Nguyên Lak Tented Camp',
    subtitle: 'Gói Trải Nghiệm Thân Tâm Trí Cao Nguyên Đắk Lắk',
    location: 'Đắk Lắk, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.9 / 5.0 (56 Đánh giá)',
    type: 'Nghỉ Dưỡng & Thiên Nhiên',
    priceText: '12.500.000 VNĐ',
    priceAdult: 12500000,
    priceChild: 5000000,
    experienceTitle: 'Bình Yên Cao Nguyên',
    experiencePara1: 'Tận hưởng không gian lều gỗ sinh thái cao cấp sát mặt hồ Lắk phẳng lặng như gương. Trải nghiệm hái trà mầm, chèo kayak đón hừng đông và nghe tiếng chuông thiền ngân vang.',
    experiencePara2: 'Được thiết kế trọn gói riêng tư cho cặp đôi và gia đình muốn tái tạo năng lượng sống.',
    galleryImages: [
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Check-in Lak Tented Camp & Thiền Hoàng Hôn',
        events: [
          'Đón sân bay Buôn Ma Thuột về Lak Tented Camp bằng thuyền gỗ.',
          'Nhận phòng lều gỗ Bungalow view hồ ngút ngàn.',
          'Buổi thiền hoàng hôn bên bến thuyền.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Chèo Kayak Hồ Lắk & Thác Bìm Bịp',
        events: [
          'Chèo thuyền Kayak đón ánh bình minh đầu tiên trên hồ.',
          'Trek suối thác Bìm Bịp ăn trưa thực dưỡng giữa rừng.',
          'Đốt lửa trại nướng khoai & uống trà thảo mộc.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Làng Gốm M\'nông & Tiễn Sân Bay',
        events: [
          'Đạp xe tham quan làng gốm cổ truyền thống M\'nông.',
          'Thưởng thức cà phê voi bản địa thanh vị.',
          'Xe đưa tiễn sân bay.'
        ]
      }
    ],
    inclusions: [
      'Lưu trú lều gỗ Lak Tented Camp cao cấp',
      'Toàn bộ bữa ăn organic farm-to-table',
      'Hoạt động chèo Kayak & Đạp xe làng cổ'
    ],
    mapLocation: 'Hồ Lắk & Lak Tented Camp',
    mapCoords: 'Đắk Lắk, Việt Nam',
    reviewScore: '4.9 / 5.0',
    reviewCount: 56,
    reviewQuote: '"Cảnh hoàng hôn ở Hồ Lắk thơ mộng tuyệt vời. Phòng ở vô cùng ấm cúng và chỉn chu."'
  },

  'dai-ngan': {
    slug: 'dai-ngan',
    badge1: 'RETREAT HOT',
    badge2: 'TĨNH LẶNG MĂNG ĐEN',
    title: 'Tĩnh Lặng Giữa Đại Ngàn Măng Đen',
    subtitle: 'Chữa Lành Trong Lòng Thị Trấn Sương Mờ Kon Tum',
    location: 'Măng Đen, Kon Tum, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.92 / 5.0 (29 Đánh giá)',
    type: 'Rừng Thông & Tĩnh Tâm',
    priceText: '13.900.000 VNĐ',
    priceAdult: 13900000,
    priceChild: 5500000,
    experienceTitle: 'Đại Ngàn Măng Đen',
    experiencePara1: 'Được mệnh danh là Đà Lạt thứ 2 của Tây Nguyên, Măng Đen mang vẻ đẹp hoang sơ tĩnh mịch với 7 hồ 3 thác huyền thoại. Khí hậu quanh năm 18°C vô cùng dễ chịu.',
    experiencePara2: 'Tận hưởng liệu trình tắm rừng Shinrin-yoku của Nhật Bản và thưởng thức gà nướng cơm lam thơm nức mũi.',
    galleryImages: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Đón Đoàn Pleiku - Về Măng Đen Mờ Sương',
        events: [
          'Đón sân bay Pleiku di chuyển về Măng Đen qua cung đường đèo thông.',
          'Nghỉ tại Villa biệt thự rợp bóng thông xanh.',
          'Thưởng thức lẩu xuyên tiêu thực dưỡng.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Thăm 7 Hồ 3 Thác & Tắm Rừng Shinrin-Yoku',
        events: [
          'Tản bộ hít thở tinh dầu thông tự nhiên (Shinrin-yoku).',
          'Vãn cảnh Thác Pa Sỹ & Hồ Đăk Ke.',
          'Tối: Thiền nến và lắng nghe giai điệu nhạc acoustic.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Tự Do Hái Cam Hữu Cơ & Trở Về',
        events: [
          'Ghé thăm trang trại rau hoa nông nghiệp sạch Măng Đen.',
          'Uống cà phê ngắm đồi thông tĩnh lặng.',
          'Xe tiễn Pleiku đáp chuyến bay về.'
        ]
      }
    ],
    inclusions: [
      'Biệt thự Villa Măng Đen giữa rừng thông',
      'Liệu trình Tắm rừng Shinrin-yoku Nhật Bản',
      'Xe di chuyển riêng đón tiễn sân bay Pleiku'
    ],
    mapLocation: 'Thác Pa Sỹ & Hồ Đăk Ke',
    mapCoords: 'Măng Đen, Kon Tum, Việt Nam',
    reviewScore: '4.92 / 5.0',
    reviewCount: 29,
    reviewQuote: '"Măng Đen yên bình và không xô xát chút nào. Không khí trong lành tuyệt đối."'
  },

  'ket-noi': {
    slug: 'ket-noi',
    badge1: 'RETREAT HOT',
    badge2: 'BIỂN NẮNG PHÚ QUỐC',
    title: 'Tìm Lại Kết Nối Phú Quốc Đảo Ngọc',
    subtitle: 'Gắn Kết Gia Đình & Tái Tạo Năng Lượng Đột Phá',
    location: 'Phú Quốc, Kiên Giang, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.96 / 5.0 (45 Đánh giá)',
    type: 'Nghỉ Dưỡng Biển & Gắn Kết',
    priceText: '15.500.000 VNĐ',
    priceAdult: 15500000,
    priceChild: 6500000,
    experienceTitle: 'Kết Nối Yêu Thương',
    experiencePara1: 'Trải nghiệm retreat thiết kế riêng cho các cặp đôi và gia đình muốn hàn gắn tình cảm, trò chuyện sâu sắc cùng chuyên gia tâm lý gia đình trong không gian Resort 5 sao mặt biển Phú Quốc.',
    experiencePara2: 'Tận hưởng bữa tối lãng mạn dưới ánh nến hoàng hôn ngón tay và các bài tập chữa lành mối quan hệ.',
    galleryImages: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Chào Đảo Ngọc & Tiệc Trà Hoàng Hôn',
        events: [
          'Đón tiễn VIP sân bay Phú Quốc về Regent / InterContinental Resort.',
          'Tiệc trà chiều gắn kết gia đình bên bãi biển Bãi Trường.',
          'Bữa tối hải sản nướng riêng tư.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Workshop Chữa Lành Mối Quan Hệ & Du Thuyền Sunset',
        events: [
          'Tọa đàm chuyên gia "Lắng Nghe & Thấu Hiểu Cùng Người Thương".',
          'Trải nghiệm du thuyền ngắm hoàng hôn và câu cá ngoài khơi.',
          'Tối: Tiệc nến lãng mạn lồng tiếng sóng biển.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Tĩnh Tâm Sáng & Tạm Biệt Phú Quốc',
        events: [
          'Tập Yoga đôi bên bờ cát mịn.',
          'Thư giãn Spa thảo dược biển.',
          'Xe VIP tiễn sân bay Phú Quốc.'
        ]
      }
    ],
    inclusions: [
      'Beachfront Resort 5 sao cao cấp Phú Quốc',
      'Chuyên gia cố vấn tâm lý gia đình 1:1',
      'Chuyến du ngoạn du thuyền hoàng hôn độc quyền'
    ],
    mapLocation: 'Bãi Trường & Sunset Town',
    mapCoords: 'Phú Quốc, Kiên Giang, Việt Nam',
    reviewScore: '4.96 / 5.0',
    reviewCount: 45,
    reviewQuote: '"Chuyến đi đã giúp vợ chồng tôi tìm lại ngọn lửa yêu thương sau 10 năm kết hôn."'
  }
};
