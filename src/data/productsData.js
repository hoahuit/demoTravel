// MOCK DATABASE CHO TOÀN BỘ CÁC SẢN PHẨM & RETREAT & TRANG MENU CON 4U (DỄ DÀNG TÍCH HỢP API BACKEND SAU NÀY)

export const productsData = {
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

  // ─────────────────────────────────────────────────────────────
  // 2. RETREAT HOT
  // ─────────────────────────────────────────────────────────────
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
  },

  // ─────────────────────────────────────────────────────────────
  // 3. 101 ĐIỀU HAY
  // ─────────────────────────────────────────────────────────────
  'tip-a-day': {
    slug: 'tip-a-day',
    badge1: '101 ĐIỀU HAY',
    badge2: 'A TIP A DAY',
    title: 'A Tip A Day - 101 Mẹo Chăm Sóc Tinh Thần Mỗi Ngày',
    subtitle: 'Thói Quản Nhỏ Mang Lại Sự Tĩnh Lặng Lớn Trong Tâm Thức',
    location: 'Cẩm Nang Wellness 4U',
    heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80',
    duration: 'Tài Liệu Độc Bản',
    rating: '5.0 / 5.0 (120 Đọc giả)',
    type: 'Tri Thức & Sống Chậm',
    priceText: 'MIỄN PHÍ TRẢI NGHIỆM',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Mẹo Sống Chậm Mỗi Ngày',
    experiencePara1: 'A Tip A Day mang tới cho bạn 101 công thức đơn giản giúp giải tỏa căng thẳng ngay tại bàn làm việc: từ kỹ thuật thở bụng 4-7-8, cách uống một ngụm trà trọn vẹn đến thói quen dời mắt khỏi màn hình điện thoại 15 phút trước khi ngủ.',
    experiencePara2: 'Tất cả các bài tập đều được đúc kết từ nghiên cứu tâm lý học hành vi và các khóa tu tập thiền định uy tín trên thế giới.',
    galleryImages: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'TIP #01',
        title: 'Kỹ Thuật Thở Bụng 4-7-8 Giảm Cortisol',
        events: [
          'Hít vào bằng mũi trong 4 giây nạp oxy sâu.',
          'Giữ hơi thở trong 7 giây lắng tĩnh.',
          'Thở ra từ từ bằng miệng trong 8 giây giải phóng áp lực.'
        ]
      },
      {
        day: 'TIP #02',
        title: 'Nghệ Thuật Thưởng Trà Tĩnh Thức',
        events: [
          'Lắng nghe tiếng nước sôi rói vào tách sứ.',
          'Cảm nhận làn hương trà bốc lên nhẹ nhàng.',
          'Nhấp từng ngụm chậm rãi và cảm nhận vị ngọt hậu.'
        ]
      },
      {
        day: 'TIP #03',
        title: 'Tản Bộ Thiền Hành 10 Phút Buổi Sáng',
        events: [
          'Đặt bàn chân xuống mặt đất cảm nhận sự vững chãi.',
          'Nhìn ngắm lá cây và hít thở không khí trong lành.',
          'Miệng mỉm cười nhẹ lòng bình an.'
        ]
      }
    ],
    inclusions: [
      'Cẩm nang 101 Mẹo Wellness bản Ebook PDF cao cấp',
      'Cộng đồng thực hành thiền định 4U Club hàng tuần',
      'Lịch nhắc nhở sống chậm tự động trên App Mobile'
    ],
    mapLocation: 'Thư Viện Tri Thức 4U Tours',
    mapCoords: 'Hệ Thống Trực Tuyến 4U',
    reviewScore: '5.0 / 5.0',
    reviewCount: 120,
    reviewQuote: '"Những mẹo thở đơn giản này đã giúp tôi vượt qua trạng thái kiệt sức công việc hàng ngày."'
  },

  'blog': {
    slug: 'blog',
    badge1: '101 ĐIỀU HAY',
    badge2: 'BLOG & INSIGHTS',
    title: 'Blog 4U - Hành Trình Nuôi Dưỡng Thân Tâm Trí',
    subtitle: 'Nơi Chia Sẻ Những Góc Nhìn Chữa Lành & Phong Cách Sống Đẳng Cấp',
    location: 'Tạp Chí 4U Editorial',
    heroImage: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=2000&q=80',
    duration: 'Cập Nhật Hàng Tuần',
    rating: '4.95 / 5.0 (89 Bài viết)',
    type: 'Góc Nhìn & Tạp Chí',
    priceText: 'ĐỌC MIỄN PHÍ',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Tạp Chí Sống Chậm',
    experiencePara1: 'Trang Blog 4U là tập hợp các bài viết chuyên sâu về kiến thức y học cổ truyền, liệu pháp thực dưỡng lành mạnh, hành trình bảo tồn rạn san hô cũng như câu chuyện truyền cảm hứng từ những người đi trước.',
    experiencePara2: 'Mỗi bài viết đều được biên tập chỉn chu theo phong cách tạp chí nghệ thuật cao cấp.',
    galleryImages: [
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'CHỦ ĐỀ 1',
        title: 'Chữa Lành Bằng Âm Thanh Chuông Xoay Himalaya',
        events: [
          'Tần số sóng âm 432Hz giúp cân bằng hệ thần kinh.',
          'Ứng dụng chuông xoay Tây Tạng trong giảm mất ngủ.'
        ]
      },
      {
        day: 'CHỦ ĐỀ 2',
        title: 'Nghệ Thuật Ăn Thực Dưỡng Farm-To-Table',
        events: [
          'Tại sao nông sản hữu cơ nguyên mùa lại giàu năng lượng sống?',
          'Thực đơn 7 ngày detox nhẹ nhàng cho cơ thể.'
        ]
      }
    ],
    inclusions: [
      'Bản tin Wellness Newsletter gửi hàng tuần',
      'Podcast chia sẻ âm thanh thiên nhiên miễn phí'
    ],
    mapLocation: 'Tòa Sòa Biên Tập 4U Tours',
    mapCoords: 'Hà Nội & TP. Hồ Chí Minh',
    reviewScore: '4.95 / 5.0',
    reviewCount: 89,
    reviewQuote: '"Các bài viết trên Blog 4U được viết rất sâu sắc, đọc xong thấy tâm hồn vô cùng thư thái."'
  },

  // ─────────────────────────────────────────────────────────────
  // 4. KOLLECTION 4U
  // ─────────────────────────────────────────────────────────────
  'new-arrivals': {
    slug: 'new-arrivals',
    badge1: 'KOLLECTION 4U',
    badge2: 'NEW ARRIVALS 2026',
    title: 'Bộ Sưu Tập Mới - New Arrivals 2026',
    subtitle: 'Những Hành Trình Retreat Mới Nhất Vừa Đón Dòng Dầu Mùa',
    location: 'Sapa & Y Tý, Lào Cai, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '5.0 / 5.0 (12 Đánh giá)',
    type: 'Mới Ra Mắt & Săn Mây',
    priceText: '13.500.000 VNĐ',
    priceAdult: 13500000,
    priceChild: 5500000,
    experienceTitle: 'Mới Ra Mắt 2026',
    experiencePara1: 'Bộ sưu tập New Arrivals mang đến trải nghiệm nghỉ dưỡng săn mây đỉnh Y Tý và ngắm ruộng bậc thang rực rỡ sắc màu Tây Bắc với tiêu chuẩn phục vụ 5 sao khép kín.',
    experiencePara2: 'Tận hưởng khoảnh khắc nhâm nhi tách trà ấm giữa làn mây bồng bềnh và thư giãn liệu trình tắm lá thuốc người Dao Đỏ cổ truyền.',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Chuyến Xe Đón Sapa - Lên Biển Mây Y Tý',
        events: [
          'Đón đoàn tại Sapa di chuyển lên đỉnh biển mây Y Tý.',
          'Check-in Resort Ecolodge kiến trúc nhà trình tường H\'Mông.',
          'Thưởng thức ngọn su su xào & lẩu gà đen thảo dược.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Săn Mây Đỉnh Ngải Thấu & Tắm Lá Thuốc Dao Đỏ',
        events: [
          'Dậy sớm ngắm bình minh trên đại dương mây Ngải Thấu.',
          'Trải nghiệm tắm lá thuốc 18 vị thảo mộc người Dao Đỏ bí truyền.',
          'Tối: Thiền nến thơm thảo mộc cao nguyên.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Thăm Bản Ngải Chồ & Trở Về',
        events: [
          'Giao lưu văn hóa cùng đồng bào dân tộc Hà Nhì.',
          'Mua trà cổ thụ Shan Tuyết làm quà.',
          'Xe tiễn đoàn về Sapa kết thúc hành trình.'
        ]
      }
    ],
    inclusions: [
      'Lưu trú Ecolodge view mây Y Tý cao cấp',
      'Liệu trình tắm lá thuốc 18 vị Dao Đỏ nguyên bản',
      'Xe di chuyển chuyên dụng đèo dốc cao nguyên'
    ],
    mapLocation: 'Y Tý & Đỉnh Ngải Thấu',
    mapCoords: 'Bát Xát, Lào Cai, Việt Nam',
    reviewScore: '5.0 / 5.0',
    reviewCount: 12,
    reviewQuote: '"Biển mây Y Tý đẹp mê hồn. Trải nghiệm tắm lá thuốc xong thấy cơ thể nhẹ nhõm vô cùng."'
  },

  'must-have': {
    slug: 'must-have',
    badge1: 'KOLLECTION 4U',
    badge2: 'MUST-HAVE EXPERIENCES',
    title: 'Trải Nghiệm Phải Có - A Must-Have Wellness',
    subtitle: 'Những Tuyệt Tác Hành Trình Ai Cũng Nên Trải Nghiệm Một Lần Trong Đời',
    location: 'Tràng An & Ninh Bình, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.97 / 5.0 (68 Đánh giá)',
    type: 'Di Sản & Thần Thức',
    priceText: '13.800.000 VNĐ',
    priceAdult: 13800000,
    priceChild: 5800000,
    experienceTitle: 'Must-Have Collection',
    experiencePara1: 'Hành trình tĩnh lặng chèo thuyền ngoạn cảnh Di sản thiên nhiên thế giới Tràng An - Tam Cốc giữa núi đá vôi uốn lượn và cánh đồng lúa chín vàng.',
    experiencePara2: 'Được hòa mình vào các buổi tọa đàm thiền định cùng các thiền sư am hiểu triết lý sống an nhiên.',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Về Cố Đô Hoa Lư - Check-in Emeralda Resort',
        events: [
          'Đón xe riêng tại Hà Nội về Ninh Bình.',
          'Check-in Emeralda Ninh Bình Resort phong cách làng quê Bắc Bộ.',
          'Thưởng thức ẩm thực dê núi & cơm cháy đặc sản.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Chèo Thuyền Tràng An & Đỉnh Múa',
        events: [
          'Thuyền nan riêng ngoạn cảnh dòng Sào Khê & các hang động Tràng An.',
          'Leo 500 bậc đá Đỉnh Múa ngắm toàn cảnh thung lũng Tam Cốc.',
          'Tối: Thiền trà hoa sen thanh lọc.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Vãn Cảnh Chùa Bái Đính & Trở Về',
        events: [
          'Vãn cảnh không gian tâm linh Bái Đính tự.',
          'Tập bài khí công dưỡng sinh buổi sáng.',
          'Xe tiễn đoàn trở về Hà Nội.'
        ]
      }
    ],
    inclusions: [
      'Resort 5 sao Emeralda Ninh Bình',
      'Thuyền nan riêng tham quan Di sản Tràng An',
      'Thực đơn thực dưỡng ẩm thực Cố Đô đặc sắc'
    ],
    mapLocation: 'Di Sản Tràng An & Hang Múa',
    mapCoords: 'Ninh Bình, Việt Nam',
    reviewScore: '4.97 / 5.0',
    reviewCount: 68,
    reviewQuote: '"Cảnh sắc Tràng An như chốn tiên cảnh. Bữa ăn thực dưỡng thanh nhẹ tuyệt vời."'
  },

  'exclusive': {
    slug: 'exclusive',
    badge1: 'KOLLECTION 4U',
    badge2: 'SUPER VIP 5 STAR',
    title: 'Hành Trình Độc Quyền - EXCLUSIVE Collection',
    subtitle: 'Đẳng Cấp Thượng Lưu Khép Kín Dành Cho 8 Khách Hàng',
    location: 'Amanoi & Vĩnh Hy, Ninh Thuận, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
    duration: '4 Ngày 3 Đêm',
    rating: '5.0 / 5.0 (15 Đánh giá)',
    type: 'Luxury Super VIP',
    priceText: '28.500.000 VNĐ',
    priceAdult: 28500000,
    priceChild: 12000000,
    experienceTitle: 'Luxury Exclusive 5 Star',
    experiencePara1: 'Trải nghiệm xa xỉ hàng đầu Châu Á tại Amanoi Vĩnh Hy - resort siêu sang ẩn mình giữa Vườn Quốc Gia Nước Chúa. Phục vụ quản gia 24/7 và trực thăng di chuyển theo yêu cầu.',
    experiencePara2: 'Chuỗi liệu trình Wellness chuyên sâu được cá nhân hóa hoàn toàn theo chỉ số sinh học cơ thể.',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Đón VIP Cam Ranh - Nhận Biệt Thự Amanoi',
        events: [
          'Đón xe Alphard VIP tại sân bay Cam Ranh về Amanoi Vĩnh Hy.',
          'Nhận Biệt Thự Ocean Pavilion view Vịnh Vĩnh Hy.',
          'Tiệc champagne đón mừng cùng quản gia riêng.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Trực Thăng Ngoạn Cảnh & Liệu Trình Wellness House',
        events: [
          'Bay trực thăng ngoạn cảnh Vịnh Vĩnh Hy & Vườn Quốc Gia Núi Chúa.',
          'Trải nghiệm liệu trình Wellness Spa House 180 phút.',
          'Tiệc tối Michelin ẩm thực hải sản thượng hạng.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Du Thuyền Riêng & Chèo Sup Biển',
        events: [
          'Du thuyền riêng khám phá các hang động hoang sơ Vĩnh Hy.',
          'Chèo Sup & Lặn ngắm san hô riêng tư.',
          'Tối: Thiền chuông xoay bên hồ bơi vô cực.'
        ]
      },
      {
        day: 'NGÀY 4',
        title: 'Tĩnh Tâm Sáng & Tiễn Sân Bay Cam Ranh',
        events: [
          'Tập Yoga đón bình minh trên đài quan sát.',
          'Xe Alphard VIP tiễn đoàn ra sân bay.'
        ]
      }
    ],
    inclusions: [
      'Biệt thự Amanoi Ocean Pavilion siêu sang',
      'Quản gia riêng 24/7 & Xe Alphard VIP đưa đón',
      'Toàn bộ tiệc tối chuẩn Michelin & Trực thăng ngoạn cảnh'
    ],
    mapLocation: 'Amanoi Resort & Vịnh Vĩnh Hy',
    mapCoords: 'Ninh Thuận, Việt Nam',
    reviewScore: '5.0 / 5.0',
    reviewCount: 15,
    reviewQuote: '"Trải nghiệm hoàn hảo không một vết xước. Quản gia và liệu trình spa đẳng cấp thế giới."'
  },

  'promotions': {
    slug: 'promotions',
    badge1: 'KOLLECTION 4U',
    badge2: 'SPECIAL PROMO -25%',
    title: 'Ưu Đãi Đặc Biệt - Special Promotions 4U',
    subtitle: 'Săn Deal Khởi Hành Mùa Thu Xanh Giảm Tới 25%',
    location: 'Huế & Hội An, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
    duration: '3 Ngày 2 Đêm',
    rating: '4.91 / 5.0 (52 Đánh giá)',
    type: 'Ưu Đãi Hot & Di Sản',
    priceText: '9.900.000 VNĐ',
    priceAdult: 9900000,
    priceChild: 4500000,
    experienceTitle: 'Ưu Đãi Mùa Giảm Giá',
    experiencePara1: 'Gói ưu đãi tri ân khách hàng giảm ngay 25% cho các chuyến đi Huế - Hội An lưu trú An Villa / Pilgrim Village 5 sao hòa mình vào không gian cổ kính thanh tịnh.',
    experiencePara2: 'Tận hưởng chuyến đi thả hoa đăng trên sông Hương và thưởng thức chè cung đình Huế thượng hạng.',
    galleryImages: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Chào Cố Đô Huế - Pilgrim Village Resort',
        events: [
          'Đón sân bay Phú Bài về Pilgrim Village Resort 5 sao.',
          'Thưởng thức bún bò Huế thanh vị & Trà sen cung đình.',
          'Du thuyền Rồng ngắm hoàng hôn Sông Hương.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Vẫn Cảnh Chùa Thiên Mụ & Phố Cổ Hội An',
        events: [
          'Vãn cảnh Chùa Thiên Mụ & Đại Nội Huế.',
          'Xe đưa đoàn qua Đèo Hải Vân đến Phố cổ Hội An.',
          'Tối: Thả hoa đăng cầu bình an trên sông Hoài.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Thư Giãn Rừng Dừa Bảy Mẫu & Trở Về',
        events: [
          'Chèo thuyền thúng ngắm rừng dừa Bảy Mẫu.',
          'Mua quà bánh tổ, kẹo dừa bản địa.',
          'Xe tiễn sân bay Đà Nẵng.'
        ]
      }
    ],
    inclusions: [
      'Lưu trú Pilgrim Village Resort 5 sao',
      'Vé du thuyền Rồng Sông Hương & Thuyền thúng Hội An',
      'Thực đơn ẩm thực Cung đình Huế chuẩn vị'
    ],
    mapLocation: 'Sông Hương Huế & Phố Cổ Hội An',
    mapCoords: 'Thừa Thiên Huế & Quảng Nam, Việt Nam',
    reviewScore: '4.91 / 5.0',
    reviewCount: 52,
    reviewQuote: '"Giá ưu đãi cực tốt cho một gói retreat 5 sao trọn gói từ Huế đến Hội An."'
  },

  // ─────────────────────────────────────────────────────────────
  // 5. VÌ SAO CHỌN 4U?
  // ─────────────────────────────────────────────────────────────
  'vi-sao-4u': {
    slug: 'vi-sao-4u',
    badge1: 'VÌ SAO CHỌN 4U?',
    badge2: 'TRIẾT LÝ DẪN ĐẦU',
    title: 'Vì Sao Chọn 4U Tours?',
    subtitle: 'Hệ Sinh Thái Chăm Sóc Thân Tâm Trí Chuẩn 5 Sao Độc Bản Tại Việt Nam',
    location: '4U Tours Headquarters',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    duration: 'Cam Kết Chất Lượng',
    rating: '5.0 / 5.0 (2,500+ Khách Hàng)',
    type: 'Triết Lý & Sứ Mệnh',
    priceText: 'TƯ VẤN MIỄN PHÍ',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Sự Khác Biệt Mang Tên 4U Tours',
    experiencePara1: '4U Tours không chỉ đơn thuần là đơn vị lữ hành. Chúng tôi là nhà kiến tạo những hành trình phục hồi Thân - Tâm - Trí khép kín, nơi mọi chi tiết từ món ăn, giấc ngủ, chuyên gia thiền định đến địa điểm bảo tồn đều được may đo tỉ mỉ.',
    experiencePara2: 'Với triết lý "Trân trọng từng nhịp thở của khách hàng", chúng tôi cam kết quy mô nhóm tối đa 8 - 12 người để bảo tồn sự tĩnh lặng tuyệt đối.',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'GIÁ TRỊ 1',
        title: 'Chuyên Gia Luyện Tâm & Bác Sĩ Đồng Hành 1:1',
        events: [
          'Đội ngũ huấn luyện viên thiền định & chuyên gia dinh dưỡng thực dưỡng quốc tế.',
          'Theo dõi và đánh giá sức khỏe sinh học trước & sau chuyến đi.'
        ]
      },
      {
        day: 'GIÁ TRỊ 2',
        title: '100% Địa Điểm Nghỉ Dưỡng Sinh Thái Bảo Tồn',
        events: [
          'Chỉ lựa chọn các Eco-resort tiêu chuẩn 5 sao có cam kết bảo vệ môi trường.',
          'Trải nghiệm ẩm thực thuần chay Farm-to-table nguyên mùa.'
        ]
      }
    ],
    inclusions: [
      'Đội ngũ chăm sóc khách hàng 24/7 khép kín',
      'Bảo hiểm du lịch cao cấp lên tới 1.000.000.000 VNĐ'
    ],
    mapLocation: 'Văn Phòng Đại Diện 4U Tours',
    mapCoords: 'Hà Nội & TP. Hồ Chí Minh',
    reviewScore: '5.0 / 5.0',
    reviewCount: 2500,
    reviewQuote: '"4U Tours đã làm thay đổi hoàn toàn góc nhìn của tôi về một chuyến nghỉ dưỡng đích thực."'
  },

  'chuyen-di-an-tuong': {
    slug: 'chuyen-di-an-tuong',
    badge1: 'VÌ SAO CHỌN 4U?',
    badge2: 'THƯ VIỆN KÝ ỨC',
    title: 'Những Chuyến Đi Ấn Tượng - 4U Memory Book',
    subtitle: 'Những Khoảnh Khắc Chữa Lành Rực Rỡ Được Ghi Lại Từ Thực Tế',
    location: 'Toàn Quốc & Quốc Tế',
    heroImage: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=2000&q=80',
    duration: 'Thư Viện Ảnh',
    rating: '5.0 / 5.0 (500+ Chuyến đi)',
    type: 'Ký Ức & Cảm Xúc',
    priceText: 'KHÁM PHÁ NGAY',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Thư Viện Hành Trình',
    experiencePara1: 'Nơi lưu giữ những nụ cười tỏa sáng, những giọt nước mắt hạnh phúc khi buông bỏ được áp lực tâm lý và những buổi hoàng hôn lãng mạn bên bếp lửa vùng cao của hàng ngàn đoàn khách 4U Tours.',
    experiencePara2: 'Mỗi bức ảnh là một câu chuyện riêng biệt về tình thân, sự gắn kết gia đình và sự nảy mầm của lòng biết ơn.',
    galleryImages: [
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'ALBUM 01',
        title: 'Hành Trình Chữa Lành Hồ Lắc Đắk Lắk Mùa Thu',
        events: [
          'Khoảnh khắc 12 thành viên cùng chèo Kayak đón bình minh.',
          'Đêm lửa trại thiền nến ấm áp tình thân.'
        ]
      },
      {
        day: 'ALBUM 02',
        title: 'Chuyến Thiện Nguyện Gieo Hạt Trường Mèo Vạc',
        events: [
          'Ánh mắt rực rỡ của các em nhỏ khi nhận sách mới.',
          'Hình ảnh đoàn người vượt Đèo Mã Pí Lèng hùng vĩ.'
        ]
      }
    ],
    inclusions: [
      'Tặng nhiếp ảnh gia riêng chụp ảnh thần thái góc nhìn đẹp',
      'Tặng album ảnh lưu niệm in bìa da cao cấp cho cả đoàn'
    ],
    mapLocation: 'Thư Viện Ký Ức 4U Tours',
    mapCoords: 'Hà Nội & TP. Hồ Chí Minh',
    reviewScore: '5.0 / 5.0',
    reviewCount: 500,
    reviewQuote: '"Bộ ảnh do nhiếp ảnh gia 4U chụp đẹp như tranh vẽ. Rất trân trọng từng khoảnh khắc."'
  },

  'faq': {
    slug: 'faq',
    badge1: 'VÌ SAO CHỌN 4U?',
    badge2: 'GIẢI ĐÁP TOÀN BỘ',
    title: 'Câu Hỏi Thường Gặp - FAQ Retreat',
    subtitle: 'Giải Đáp Chi Tiết Toàn Bộ Thắc Mắc Trước Khi Bạn Khởi Hành',
    location: 'Hỗ Trợ Trực Tuyến 24/7',
    heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80',
    duration: 'Giải Đáp Nhanh',
    rating: '5.0 / 5.0 (100% Hài Lòng)',
    type: 'Hỗ Trợ & Tư Vấn',
    priceText: 'HỖ TRỢ 24/7',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Giải Đáp Thắc Mắc',
    experiencePara1: 'Dưới đây là tổng hợp những câu hỏi phổ biến nhất của quý khách hàng về thể trạng sức khỏe, độ tuổi tham gia, chế độ ăn thực dưỡng cũng như các chính sách hoãn hủy chuyến đi tại 4U Tours.',
    experiencePara2: 'Đội ngũ tư vấn viên của chúng tôi luôn sẵn sàng hỗ trợ quý khách mọi lúc.',
    galleryImages: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'CÂU HỎI 1',
        title: 'Người chưa từng tập Yoga hay Thiền có tham gia được không?',
        events: [
          'Hoàn toàn được! Các bài tập thở và thiền định tại 4U Tours được thiết kế riêng cho người mới bắt đầu, vô cùng nhẹ nhàng và dễ áp dụng.'
        ]
      },
      {
        day: 'CÂU HỎI 2',
        title: 'Chế độ ăn trong chuyến đi như thế nào?',
        events: [
          'Chế độ ăn thuần thực dưỡng / hữu cơ Farm-to-table được tính toán lượng calo và dinh dưỡng phù hợp với sức khỏe của từng thành viên.'
        ]
      },
      {
        day: 'CÂU HỎI 3',
        title: 'Chính sách bảo lưu chuyến đi khi có việc đột xuất?',
        events: [
          'Quý khách được bảo lưu 100% chi phí chuyến đi sang lịch khởi hành tiếp theo trước 7 ngày.'
        ]
      }
    ],
    inclusions: [
      'Tổng đài hỗ trợ tư vấn trực tiếp Hotline 24/7',
      'Tài liệu hướng dẫn chuẩn bị hành lý chi tiết trước chuyến đi'
    ],
    mapLocation: 'Bộ Phận Chăm Sóc Khách Hàng 4U',
    mapCoords: 'Hotline 24/7',
    reviewScore: '5.0 / 5.0',
    reviewCount: 1000,
    reviewQuote: '"Đội ngũ tư vấn rất tận tình, giải đáp chi tiết từng thắc mắc của tôi trước khi đăng ký tour."'
  },

  'careers': {
    slug: 'careers',
    badge1: 'VÌ SAO CHỌN 4U?',
    badge2: 'TUYỂN DỤNG 2026',
    title: 'Cơ Hội Nghề Nghiệp - Gia Nhập Đội Ngũ 4U',
    subtitle: 'Cùng 4U Kiến Tạo Những Giá Trị Chữa Lành Nhân Văn Cho Cộng Đồng',
    location: 'Hà Nội & TP. Hồ Chí Minh',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80',
    duration: 'Môi Trường 5 Star',
    rating: '5.0 / 5.0 (Top Employer)',
    type: 'Tuyển Dụng & Phát Triển',
    priceText: 'ỨNG TUYỂN NGAY',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Môi Trường Làm Việc Tại 4U',
    experiencePara1: 'Tại 4U Tours, chúng tôi tin rằng chỉ khi người làm dịch vụ hạnh phúc thì mới có thể lan tỏa hạnh phúc trọn vẹn đến khách hàng. Môi trường làm việc tôn trọng sự khác biệt, đề cao sự bình an nội tại và sáng tạo.',
    experiencePara2: 'Chào đón các Huấn luyện viên thiền, Chuyên gia tâm lý, Nhiếp ảnh gia & Chuyên viên điều hành tour cùng đồng hành.',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'VỊ TRÍ 01',
        title: 'Chuyên Gia Thiền Định & Hướng Dẫn Thân Tâm',
        events: [
          'Yêu cầu: Có chứng chỉ huấn luyện thiền / yoga quốc tế.',
          'Mô tả: Đồng hành và hỗ trợ khách hàng trong các chuyến retreat.'
        ]
      },
      {
        day: 'VỊ TRÍ 02',
        title: 'Chuyên Viên Điều Hành Tour Wellness Cao Cấp',
        events: [
          'Yêu cầu: 2+ năm kinh nghiệm trong ngành lữ hành 5 sao.',
          'Mô tả: Quản lý và khảo sát các tuyến điểm sinh thái mới.'
        ]
      }
    ],
    inclusions: [
      'Chế độ đãi ngộ hấp dẫn & Du lịch trải nghiệm nghỉ dưỡng 5 sao miễn phí',
      'Các khóa đào tạo chuyên sâu về tâm lý học & phát triển bản thân'
    ],
    mapLocation: 'Phòng Nhân Sự 4U Tours',
    mapCoords: 'Hà Nội & TP. Hồ Chí Minh',
    reviewScore: '5.0 / 5.0',
    reviewCount: 50,
    reviewQuote: '"Môi trường làm việc vô cùng văn minh, đồng nghiệp yêu thương và chia sẻ."'
  },

  'lich-khai-giang': {
    slug: 'lich-khai-giang',
    badge1: 'VÌ SAO CHỌN 4U?',
    badge2: 'LỊCH KHỞI HÀNH 2026',
    title: 'Lịch Khai Giảng & Khởi Hành Series Retreat',
    subtitle: 'Cập Nhật Lịch Khởi Hành Hàng Tháng Cho Tất Cả Các Tuyến Đi 4U',
    location: 'Toàn Quốc',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    duration: 'Lịch Khởi Hành',
    rating: '5.0 / 5.0 (Cập nhật liên tục)',
    type: 'Lịch Trình & Đặt Chỗ',
    priceText: 'GIỮ CHỖ NGAY',
    priceAdult: 0,
    priceChild: 0,
    experienceTitle: 'Lịch Khởi Hành Series 2026',
    experiencePara1: 'Các chuyến đi Retreat của 4U Tours được ấn định khởi hành cố định vào thứ 6 hàng tuần để quý khách dễ dàng sắp xếp công việc và dành trọn vẹn 3 ngày cuối tuần cho bản thân.',
    experiencePara2: 'Quy mô nhóm giới hạn 12 khách / chuyến. Hãy đăng ký giữ chỗ sớm để chọn được ngày khởi hành ưng ý nhất.',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
    ],
    itinerary: [
      {
        day: 'THÁNG 8/2026',
        title: 'Khởi Hành Ngày 15/08, 22/08 & 29/08',
        events: [
          'Retreat Chữa Lành Hồ Lắc Đắk Lắk (15/08 - 17/08)',
          'Retreat Bảo Tồn Rừng Già Nam Cát Tiên (22/08 - 24/08)',
          'Retreat Thiên Nhiên Đại Ngàn Côn Đảo (29/08 - 01/09)'
        ]
      },
      {
        day: 'THÁNG 9/2026',
        title: 'Khởi Hành Ngày 05/09, 12/09 & 19/09',
        events: [
          'Retreat Thiện Nguyện Gieo Hạt Hà Giang (05/09 - 08/09)',
          'Retreat Tĩnh Lặng Măng Đen Kon Tum (12/09 - 14/09)',
          'Retreat Kết Nối Đảo Ngọc Phú Quốc (19/09 - 21/09)'
        ]
      }
    ],
    inclusions: [
      'Tự do chọn ngày và giữ chỗ không mất phí trong 48 giờ',
      'Ưu đãi giảm 10% khi đăng ký nhóm từ 3 thành viên'
    ],
    mapLocation: 'Văn Phòng Đặt Chỗ 4U Tours',
    mapCoords: 'Hà Nội & TP. Hồ Chí Minh',
    reviewScore: '5.0 / 5.0',
    reviewCount: 300,
    reviewQuote: '"Lịch khởi hành vào cuối tuần rất tiện lợi. Đăng ký trước 1 tháng là an tâm nhận chỗ đẹp."'
  }
};
