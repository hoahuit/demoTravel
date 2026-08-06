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
  // 1. BÌNH YÊN TRÊN CAO NGUYÊN
  'binh-yen-tren-cao-nguyen': {
    slug: 'binh-yen-tren-cao-nguyen',
    badge1: 'RETREAT CHỮA LÀNH',
    badge2: 'ĐỘC QUYỀN',
    title: 'Bình Yên Trên Cao Nguyên',
    subtitle: 'Tìm Lại Sự Tĩnh Lặng Giữa Cao Nguyên Mờ Sương',
    location: 'Hồ Lắk, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=80',
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
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85'
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
    mapCoords: 'Hồ Lắk, Việt Nam',
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
    location: 'Nam Cát Tiên, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80',
    duration: '2 Ngày 1 Đêm',
    rating: '4.99 / 5.0 (240 Đánh giá)',
    type: 'Bảo Tồn & Sinh Thái',
    priceText: '3.450.000 VNĐ',
    priceAdult: 3450000,
    priceChild: 1725000,
    experienceTitle: 'Bảo Tồn & Kết Nối Rừng Già',
    experiencePara1: 'Đến với Nam Cát Tiên Retreat, bạn không chỉ nghỉ dưỡng mà còn trực tiếp hòa mình vào thiên nhiên, thiền định và tắm rừng giải tỏa căng thẳng.',
    experiencePara2: 'Đêm đến, bạn sẽ trải nghiệm chuyến đi ngắm thú đêm hoang dã duy nhất tại Việt Nam và thức giấc trong tiếng chim hót bên sông Đồng Nai.',
    galleryImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85'
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
    mapCoords: 'Nam Cát Tiên, Việt Nam',
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
    location: 'Vịnh Hạ Long, Việt Nam',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=80',
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
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85'
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
    mapCoords: 'Vịnh Hạ Long, Việt Nam',
    reviewScore: '4.97 / 5.0',
    reviewCount: 210,
    reviewQuote: '"Kỳ nghỉ du thuyền 5 sao vô cùng ấn tượng. Cảnh hoàng hôn trên vịnh tuyệt đẹp."'
  }
};
