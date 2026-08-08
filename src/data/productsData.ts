export interface ProductItineraryDay {
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
  itinerary: ProductItineraryDay[];
  inclusions: string[];
  mapLocation: string;
  mapCoords: string;
  reviewScore: string;
  reviewCount: number;
  reviewQuote: string;
}

export const productsData: Record<string, ProductItem> = {
  // 1. BÌNH YÊN TRÊN CAO NGUYÊN
  'binh-yen-tren-cao-nguyen': {
    slug: 'binh-yen-tren-cao-nguyen',
    badge1: 'RETREAT CHỮA LÀNH',
    badge2: 'ĐỘC QUYỀN',
    title: 'Bình Yên Trên Cao Nguyên',
    subtitle: 'Tìm Lại Sự Tĩnh Lặng Giữa Cao Nguyên Mờ Sương',
    location: 'Hồ Lắk, Đắk Lắk',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    duration: '3 Ngày 2 Đêm',
    rating: '4.98 / 5.0 (184 Đánh giá)',
    type: 'Nghỉ Dưỡng & Chữa Lành',
    priceText: '6.500.000 VNĐ',
    priceAdult: 6500000,
    priceChild: 3250000,
    experienceTitle: 'Trải Nghiệm Độc Bản',
    experiencePara1: 'Rời xa nhịp sống hối hả nơi đô thị để hòa mình vào không gian tĩnh lặng nguyên sơ của vùng Cao Nguyên. Hành trình được thiết kế tỉ mỉ dành cho những ai đang tìm kiếm sự phục hồi sâu sắc từ bên trong.',
    experiencePara2: 'Hành trình đưa bạn đi qua những rừng thông cổ thụ mờ sương và những hồ nước tĩnh lặng, cùng sự đồng hành của đội ngũ chuyên gia am hiểu về nghệ thuật chăm sóc thân tâm.',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=85'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Chạm Vào Tĩnh Lặng & Khởi Đầu',
        events: [
          'Sáng: Đón quý khách tại Buôn Ma Thuột. Xe đưa đón riêng sang trọng về khu nghỉ dưỡng Lak Tented Camp.',
          'Trải nghiệm trà chiều thảo mộc cao nguyên bản địa.',
          'Chiều: Thiền hành đi bộ hướng dẫn qua rừng thông tĩnh lặng.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Hòa Mình & Trải Nghiệm Sâu',
        events: [
          'Đón bình minh với buổi tập Yoga thiền định hướng ra thung lũng mờ sương.',
          'Trek Thác Bìm Bịp Buôn Ma Thuột & thưởng thức bữa trưa thực dưỡng bên dòng suối.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Tích Tụ Năng Lượng & Trở Về',
        events: [
          'Bữa sáng chia tay với các món ăn mang hương vị vùng cao.',
          'Xe riêng đưa quý khách ra sân bay kết thúc hành trình.'
        ]
      }
    ],
    inclusions: [
      'Toàn bộ chi phí lưu trú cao cấp Lak Tented Camp',
      'Chuyên gia & Huấn luyện viên luyện thiền 1:1 suốt hành trình',
      'Thực đơn thuần chay thực dưỡng 100% hữu cơ',
      'Xe Limousine VIP đưa đón trọn gói'
    ],
    mapLocation: 'Lak Tented Camp',
    mapCoords: 'Hồ Lắk, Đắk Lắk',
    reviewScore: '4.98 / 5.0',
    reviewCount: 184,
    reviewQuote: '"Chuyến đi mang lại cảm giác tĩnh lặng thật sự giữa thiên nhiên hoang sơ. Dịch vụ tận tâm chuẩn 5 sao."'
  },

  // 2. TĨNH LẶNG GIỮA ĐẠI NGÀN
  'tinh-lang-giua-dai-ngan': {
    slug: 'tinh-lang-giua-dai-ngan',
    badge1: 'RETREAT BẢO TỒN',
    badge2: 'SINH THÁI 5 STAR',
    title: 'Tĩnh Lặng Giữa Đại Ngàn',
    subtitle: 'Lắng Nghe Nhịp Thở Của Rừng Già Nam Cát Tiên',
    location: 'Nam Cát Tiên, Đồng Nai',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-bamboo-forest-in-japan-41544-large.mp4',
    duration: '2 Ngày 1 Đêm',
    rating: '4.99 / 5.0 (240 Đánh giá)',
    type: 'Bảo Tồn & Sinh Thái',
    priceText: '3.450.000 VNĐ',
    priceAdult: 3450000,
    priceChild: 1725000,
    experienceTitle: 'Bảo Tồn & Kết Nối Rừng Già',
    experiencePara1: 'Đến với Nam Cát Tiên Retreat, bạn không chỉ nghỉ dưỡng mà còn trực tiếp hòa mình vào thiên nhiên, thiền định và tắm rừng giải tỏa căng thẳng.',
    experiencePara2: 'Đêm đến, bạn sẽ trải nghiệm chuyến đi ngắm thú đêm hoang dã duy nhất tại Nam Cát Tiên và thức giấc trong tiếng chim hót bên sông Đồng Nai.',
    galleryImages: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=85'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Băng Sông Vào Rừng Già',
        events: [
          'Vượt sông Đồng Nai tiến vào vùng lõi rừng Nam Cát Tiên.',
          'Nhận phòng Ecolodge ven sông tĩnh lặng.',
          'Hành trình ngắm thú đêm hoang dã bằng xe mui trần chuyên dụng.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Trek Bàu Sấu & Thiền Định',
        events: [
          'Trek xuyên rừng cổ thụ ngàn năm Bằng Lăng Cổ Thụ & Cây Tung.',
          'Chèo thuyền Kayak ngắm hồ Bàu Sấu hoang sơ tuyệt đẹp.',
          'Xe tiễn đoàn trở về TP. Hồ Chí Minh.'
        ]
      }
    ],
    inclusions: [
      'Lưu trú Ecolodge ven sông Nam Cát Tiên cao cấp',
      'Chuyến ngắm thú đêm mui trần & Chèo Kayak Bàu Sấu',
      'Toàn bộ bữa ăn thực dưỡng hữu cơ'
    ],
    mapLocation: 'Vườn Quốc Gia Nam Cát Tiên',
    mapCoords: 'Nam Cát Tiên, Đồng Nai',
    reviewScore: '4.99 / 5.0',
    reviewCount: 240,
    reviewQuote: '"Trải nghiệm ngắm thú đêm và tắm rừng ngàn năm khiến tôi thực sự thư thái."'
  },

  // 3. DI SẢN VỊNH HẠ LONG
  'di-san-vinh-ha-long': {
    slug: 'di-san-vinh-ha-long',
    badge1: 'RETREAT KỲ QUAN',
    badge2: 'DU THUYỀN 5 STAR',
    title: 'Di Sản Vịnh Hạ Long',
    subtitle: 'Du Thuyền VIP 5 Sao Ngắm Hoàng Hôn & Thưởng Trà',
    location: 'Vịnh Hạ Long, Quảng Ninh',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-ocean-waves-clearing-41537-large.mp4',
    duration: '3 Ngày 2 Đêm',
    rating: '4.97 / 5.0 (210 Đánh giá)',
    type: 'Nghỉ Dưỡng Thượng Lưu',
    priceText: '4.850.000 VNĐ',
    priceAdult: 4850000,
    priceChild: 2425000,
    experienceTitle: 'Trải Nghiệm Thượng Lưu Trên Biển',
    experiencePara1: 'Thưởng thức trà đạo ngắm hoàng hôn giữa kỳ quan thiên nhiên thế giới. Phục hồi năng lượng trong không gian du thuyền 5 sao đẳng cấp.',
    experiencePara2: 'Tận hưởng chuyến chèo thuyền Kayak xuyên hang động nguyên sơ và tham gia lớp tập Tai Chi đón bình minh.',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Check-in Du Thuyền 5 Sao',
        events: [
          'Lên du thuyền Paradise Elegance 5 sao.',
          'Thưởng thức tiệc trà đạo ngắm hoàng hôn trên biển.'
        ]
      },
      {
        day: 'NGÀY 2',
        title: 'Chèo Kayak Hang Luồn & Tai Chi',
        events: [
          'Tập Tai Chi đón bình minh trên sundeck.',
          'Chèo thuyền kayak khám phá Hang Luồn kỳ vĩ.'
        ]
      },
      {
        day: 'NGÀY 3',
        title: 'Ngắm Cảnh Đỉnh Ti Tốp & Trở Về',
        events: [
          'Tham quan đảo Ti Tốp ngắm toàn cảnh Vịnh Hạ Long.',
          'Tiễn đoàn trở về Hà Nội.'
        ]
      }
    ],
    inclusions: [
      'Lưu trú du thuyền Paradise Elegance 5*',
      'Toàn bộ bữa ăn thực dưỡng hải sản cao cấp',
      'Vé tham quan & chèo thuyền Kayak'
    ],
    mapLocation: 'Vịnh Hạ Long',
    mapCoords: 'Vịnh Hạ Long, Quảng Ninh',
    reviewScore: '4.97 / 5.0',
    reviewCount: 210,
    reviewQuote: '"Kỳ nghỉ du thuyền 5 sao vô cùng ấn tượng. Cảnh hoàng hôn trên vịnh tuyệt đẹp."'
  },

  // 4. HƠI THỞ YÊN TỬ
  'hoi-tho-yen-tu': {
    slug: 'hoi-tho-yen-tu',
    badge1: 'RETREAT CHỮA LÀNH',
    badge2: 'TÂM LINH 5 STAR',
    title: 'Hơi Thở Yên Tử',
    subtitle: 'Tái Tạo Thần Khí & Thiền Định Nơi Danh Sơn Trúc Lâm',
    location: 'Yên Tử, Quảng Ninh',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-fog-over-the-mountains-in-a-valley-41541-large.mp4',
    duration: '2 Ngày 1 Đêm',
    rating: '4.96 / 5.0 (156 Đánh giá)',
    type: 'Chữa Lành & Thần Khí',
    priceText: '4.200.000 VNĐ',
    priceAdult: 4200000,
    priceChild: 2100000,
    experienceTitle: 'Tái Tạo Tâm Khí Giữa Cổ Tự',
    experiencePara1: 'Rời xa chốn phồn hoa, bước chân vào Legacy Yên Tử MGallery mang kiến trúc triều Trần độc bản. Trải nghiệm không gian thanh tịnh và nghệ thuật thiền trầm.',
    experiencePara2: 'Tận hưởng khoảnh khắc tắm khoáng nóng Onsen thảo dược và thực dưỡng chay thuần thanh lọc cơ thể.',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Hành Hương Legacy & Thiền Trầm',
        events: ['Nhận phòng Legacy Yên Tử 5*', 'Trà thiền Trúc Lâm & Thiền trầm hương đêm.']
      },
      {
        day: 'NGÀY 2',
        title: 'Khí Công Đón Bình Minh & Onsen',
        events: ['Tập khí công đón hừng đông', 'Tắm Onsen khoáng nóng thảo mộc']
      }
    ],
    inclusions: ['Lưu trú Legacy Yên Tử 5*', 'Suất tắm Onsen khoáng nóng', 'Ăn sáng thực dưỡng'],
    mapLocation: 'Legacy Yên Tử', mapCoords: 'Yên Tử, Quảng Ninh', reviewScore: '4.96 / 5.0', reviewCount: 156,
    reviewQuote: '"Không gian linh thiêng tĩnh mịch giúp tôi hoàn toàn cân bằng tâm trí."'
  },

  // 5. CHỐN BỒNG LAI SAPA
  'chon-bong-lai-sapa': {
    slug: 'chon-bong-lai-sapa',
    badge1: 'RETREAT THIÊN NHIÊN',
    badge2: 'ECOLODGE 5 STAR',
    title: 'Chốn Bồng Lai Mờ Sương',
    subtitle: 'Sapa Eco Valley Retreat & Ngắm Ruộng Bậc Thang',
    location: 'Sapa, Lào Cai',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-sun-shining-through-the-trees-in-a-forest-41484-large.mp4',
    duration: '3 Ngày 2 Đêm',
    rating: '4.99 / 5.0 (310 Đánh giá)',
    type: 'Thiên Nhiên & Nghỉ Dưỡng',
    priceText: '7.200.000 VNĐ',
    priceAdult: 7200000,
    priceChild: 3600000,
    experienceTitle: 'Thiên Đường Nghỉ Dưỡng Mây Ngàn',
    experiencePara1: 'Đến Topas Ecolodge - resort nằm trong top đẹp nhất thế giới do National Geographic bình chọn. Ngâm mình tại hồ bơi vô cực ngắm mây vờn đỉnh thung lũng.',
    experiencePara2: 'Trải nghiệm ngâm tắm lá thuốc truyền thống của người Dao Đỏ và thưởng thức ẩm thực Tây Bắc hữu cơ cao cấp.',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=85'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Check-in Topas Ecolodge & Tắm Lá Thuốc',
        events: ['Limousine VIP đón quý khách lên Sapa', 'Thưởng trà mây & tắm lá thuốc Dao Đỏ']
      },
      {
        day: 'NGÀY 2',
        title: 'Trek Bản Lao Chải & Yoga Vô Cực',
        events: ['Trek qua các bản làng nguyên sơ', 'Yoga đón hoàng hôn tại hồ bơi vô cực']
      },
      {
        day: 'NGÀY 3',
        title: 'Bữa Sáng Thực Dưỡng & Trở Về',
        events: ['Thưởng thức bữa sáng hữu cơ', 'Xe tiễn đoàn trở về Hà Nội']
      }
    ],
    inclusions: ['Lưu trú Topas Ecolodge 5*', 'Xe Limousine VIP đưa đón', 'Tắm lá thuốc người Dao Đỏ'],
    mapLocation: 'Topas Ecolodge Sapa', mapCoords: 'Sapa, Lào Cai', reviewScore: '4.99 / 5.0', reviewCount: 310,
    reviewQuote: '"Hồ bơi vô cực ngắm thung lũng Mường Hoa tuyệt vời nhất tôi từng đến."'
  },

  // 6. MÙA HOA TRÊN ĐÁ HÀ GIANG
  'mua-hoa-tren-da-ha-giang': {
    slug: 'mua-hoa-tren-da-ha-giang',
    badge1: 'RETREAT THIỆN NGƯỆN',
    badge2: 'KẾT NỐI CỘNG ĐỒNG',
    title: 'Mùa Hoa Trên Đá',
    subtitle: 'Retreat Thiện Nguyện & Khám Phá Cao Nguyên Đá Hà Giang',
    location: 'Đồng Văn, Hà Giang',
    heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=2000&q=80',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-waterfalls-in-forest-2213-large.mp4',
    duration: '4 Ngày 3 Đêm',
    rating: '4.95 / 5.0 (142 Đánh giá)',
    type: 'Thiện Nguyện & Văn Hóa',
    priceText: '5.200.000 VNĐ',
    priceAdult: 5200000,
    priceChild: 2600000,
    experienceTitle: 'Hành Trình Kết Nối & Lan Tỏa Yêu Thương',
    experiencePara1: 'Kết hợp nghỉ dưỡng tại H’Mong Village Resort độc đáo và trực tiếp tham gia hoạt động trao tặng tủ sách, áo ấm cho các em nhỏ bản cao.',
    experiencePara2: 'Chinh phục đèo Mã Pí Lèng hùng vĩ và chèo thuyền Kayak xanh biếc trên dòng sông Nho Quế.',
    galleryImages: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=85'
    ],
    itinerary: [
      {
        day: 'NGÀY 1',
        title: 'Hà Nội — Quản Bạ — H’Mong Village',
        events: ['Di chuyển Limousine VIP', 'Check-in H’Mong Village Resort & giao lưu văn hóa']
      },
      {
        day: 'NGÀY 2',
        title: 'Chương Trình Thiện Nguyện Bản Cao',
        events: ['Trao học bổng & áo ấm cho học sinh vùng cao', 'Tổ chức ngày hội đọc sách']
      },
      {
        day: 'NGÀY 3',
        title: 'Đèo Mã Pí Lèng & Kayak Nho Quế',
        events: ['Đi thuyền ngắm Hẻm Tu Sản', 'Chèo kayak sông Nho Quế']
      },
      {
        day: 'NGÀY 4',
        title: 'Trở Về Hà Nội',
        events: ['Bữa sáng biệt lập', 'Tiễn đoàn về lại Hà Nội']
      }
    ],
    inclusions: ['Lưu trú H’Mong Village Resort', 'Toàn bộ kinh phí quà tặng thiện nguyện', 'Xe Limousine VIP trọn gói'],
    mapLocation: 'Đồng Văn, Hà Giang', mapCoords: 'Đồng Văn, Hà Giang', reviewScore: '4.95 / 5.0', reviewCount: 142,
    reviewQuote: '"Một hành trình vừa giàu cảm xúc vừa ý nghĩa nhân văn sâu sắc."'
  }
};
