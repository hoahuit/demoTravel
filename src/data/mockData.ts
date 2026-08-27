import { DESTINATIONS_DATA } from './destinationsData';
import { BLOGS_DATA } from './blogsData';
import { FAQ_DATA } from './faqData';
import { PARTNERS_DATA } from './partnersData';
import { SERVICES_DATA } from './servicesData';
import { TEAM_DATA } from './teamData';
import { TESTIMONIALS_DATA } from './testimonialsData';
import { ABOUT_DATA } from './aboutData';
import { TourPackage } from './toursData';

// --------------------------------------------------------------------------
// 1. ALL 10 LUXURY RETREAT TOURS (FULL SEED DATA)
// --------------------------------------------------------------------------
export const MOCK_TOURS: TourPackage[] = [
  {
    id: 'tour-1',
    slug: 'zannier-bai-san-ho-phu-yen-retreat',
    title: 'Hành Trình Tĩnh Dưỡng Zannier Bãi San Hô',
    subtitle: 'Nghỉ dưỡng biệt lập giữa 98 hecta thiên nhiên hoang sơ và liệu trình spa thảo mộc truyền thống.',
    category: 'Doc-Quyen',
    categories: ['chua-lanh', 'doc-quyen', 'hot', 'trung', 'last-minute', 'sap-khoi-hanh', 'khong-the-bo-lo', 'uu-dai-gio-chot', 'Wellness'],
    country: 'Việt Nam',
    city: 'Phú Yên',
    region: 'trung',
    duration: '4 Ngày 3 Đêm',
    durationDays: 4,
    departureDates: ['15/09/2026', '01/10/2026', '20/10/2026'],
    airline: 'Vietnam Airlines (Business)',
    hotel: 'Zannier Hotels Bãi San Hô 5* Ultra Luxury',
    transportation: 'Xe Limousine riêng đưa đón',
    price: 28500000,
    originalPrice: 34000000,
    childPrice: 14000000,
    infantPrice: 0,
    rating: 5.0,
    reviewsCount: 24,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isPromotion: true,
    isAdminApproved: true,
    highlights: [
      'Nghỉ dưỡng tại Hill Pool Villa view biển trọn vẹn',
      'Liệu trình phục hồi thân tâm Hoa Sen 90 phút',
      'Ăn tối thực dưỡng 5 món riêng tư bên bãi biển'
    ],
    included: [
      'Vé máy bay khứ hồi hạng thương gia',
      'Villa riêng tư bao gồm bữa sáng hàng ngày',
      'Xe riêng đưa đón sân bay Tuy Hòa',
      'Gói trị liệu spa và thiền trà sáng'
    ],
    excluded: [
      'Chi phí cá nhân ngoài chương trình',
      'Đồ uống có cồn ngoài gói ẩm thực'
    ],
    notes: [
      'Phù hợp cho các cặp đôi và khách tìm kiếm sự tĩnh lặng',
      'Trang phục lịch sự, thoải mái khi tham gia thiền'
    ],
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&auto=format&fit=crop&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đón Tuy Hòa - Check-in Đồi San Hô',
        description: 'Xe đón quý khách tại sân bay Tuy Hòa về resort nhận phòng Villa hướng đồi.',
        activities: ['Đón sân bay bằng Limousine', 'Thưởng trà chào mừng', 'Bữa tối ẩm thực Làng Chài']
      },
      {
        day: 2,
        title: 'Yoga Bình Minh - Trị Liệu Thảo Dược',
        description: 'Khởi đầu ngày mới với bài tập hít thở ven biển và liệu trình spa thảo dược cổ truyền.',
        activities: ['Yoga bãi biển', 'Spa Hoa Sen 90 phút', 'Chèo thuyền Kayak vịnh san hô']
      },
      {
        day: 3,
        title: 'Thưởng Ngoạn Hoàng Hôn - Bữa Tối Lãng Mạn',
        description: 'Tận hưởng ngày thư giãn tuyệt đối bên hồ bơi vô cực và tiệc tối BBQ hải sản riêng tư.',
        activities: ['Thiền chuông xoay', 'Ngắm hoàng hôn trên vách đá', 'Bữa tối bãi biển riêng biệt']
      },
      {
        day: 4,
        title: 'Trà Sáng Tĩnh Tâm - Tiễn Sân Bay',
        description: 'Dùng bữa sáng chậm rãi, tĩnh tâm trước khi xe tiễn quý khách ra sân bay.',
        activities: ['Bữa sáng thực dưỡng', 'Mua quà đặc sản bản địa', 'Tiễn sân bay']
      }
    ]
  },
  {
    id: 'tour-2',
    slug: 'dau-an-di-san-thien-dinh-yen-tu',
    title: 'Dấu Ấn Di Sản & Thiền Định Yên Tử',
    subtitle: 'Hành trình trở về cội nguồn tâm linh tại Legacy Yên Tử - Mgallery kiến trúc thời Trần thế kỷ 13.',
    category: 'Heritage',
    categories: ['chua-lanh', 'bao-ton', 'bac', 'hot', 'khong-the-bo-lo', 'Heritage', 'Wellness', 'sap-khoi-hanh'],
    country: 'Việt Nam',
    city: 'Yên Tử',
    region: 'bac',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['18/09/2026', '08/10/2026', '25/10/2026'],
    airline: 'Xe Limousine Dcar cao cấp từ Hà Nội',
    hotel: 'Legacy Yên Tử - MGallery 5 sao',
    transportation: 'Xe Limousine riêng suốt tuyến',
    price: 14800000,
    originalPrice: 18500000,
    childPrice: 7500000,
    infantPrice: 0,
    rating: 4.9,
    reviewsCount: 38,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isAdminApproved: true,
    highlights: [
      'Lưu trú tại cung điện thời Trần Legacy Yên Tử',
      'Khóa thiền định thở & Trải nghiệm tắm thảo dược Dao Đỏ',
      'Thưởng thức ẩm thực chay cung đình thanh tịnh'
    ],
    included: [
      'Xe Limousine 9 chỗ đón trả tận nơi tại Hà Nội',
      '2 đêm phòng Junior Suite Legacy Yên Tử',
      'Toàn bộ các bữa ăn chay & thực dưỡng theo chương trình',
      'Vé cáp treo Yên Tử khứ hồi 2 chặng'
    ],
    excluded: [
      'Chi phí chi tiêu cá nhân ngoài thực đơn',
      'VAT 8%'
    ],
    notes: [
      'Nên chuẩn bị giày đi bộ êm ái khi tham quan chùa Đồng',
      'Giữ không gian thanh tịnh khi tham gia các buổi thiền'
    ],
    heroImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Đất Phật Yên Tử',
        description: 'Khởi hành từ Hà Nội đến Yên Tử, check-in Legacy Yên Tử kiến trúc gỗ đồng độc đáo.',
        activities: ['Đón tại Hà Nội', 'Thưởng thức trà sen', 'Ăn tối chay cung đình Thọ Quang']
      },
      {
        day: 2,
        title: 'Chiêm Bái Đỉnh Phù Vân - Thiền Trầm',
        description: 'Đi cáp treo lên chùa Hoa Yên, tượng Phật Hoàng Trần Nhân Tông và đỉnh chùa Đồng.',
        activities: ['Cáp treo ngắm mây ngàn', 'Chiêm bái chùa Đồng', 'Liệu trình tắm lá thuốc Dao Đỏ']
      },
      {
        day: 3,
        title: 'Thiền Hành Buổi Sáng - Về Lại Thủ Đô',
        description: 'Tập thở và thiền hành trong rừng trúc trước khi trở về Hà Nội.',
        activities: ['Thiền hành rừng trúc', 'Bữa trưa thực dưỡng', 'Xe đưa về Hà Nội']
      }
    ]
  },
  {
    id: 'tour-3',
    slug: 'du-thuyen-sieu-sang-vinh-lan-ha',
    title: 'Du Thuyền Siêu Sang & Tĩnh Lặng Vịnh Lan Hạ',
    subtitle: 'Nghỉ dưỡng thượng lưu trên du thuyền Boutique 6 sao giữa miền di sản kỳ vĩ.',
    category: 'Luxury',
    categories: ['thien-nhien', 'bao-ton', 'bac', 'last-minute', 'uu-dai-gio-chot', 'khong-the-bo-lo', 'Luxury', 'hot'],
    country: 'Việt Nam',
    city: 'Vịnh Hạ Long',
    region: 'bac',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['22/09/2026', '05/10/2026', '19/10/2026'],
    airline: 'Xe Limousine đưa đón Hải Phòng / Hà Nội',
    hotel: 'Grand Boutique Cruise 6 sao (Executive Suite)',
    transportation: 'Xe Limousine cao cấp & Tàu cano cao tốc',
    price: 19500000,
    originalPrice: 26000000,
    childPrice: 9500000,
    infantPrice: 0,
    rating: 5.0,
    reviewsCount: 42,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isPromotion: true,
    isAdminApproved: true,
    highlights: [
      'Suite rộng 65m² với ban công riêng và bồn tắm hướng vịnh',
      'Chèo thuyền kayak khám phá hang Sáng Tối bí ẩn',
      'Tiệc canapé hoàng hôn và ẩm thực Michelin Selected'
    ],
    included: [
      'Phòng Executive Suite trên du thuyền 6 sao',
      'Trọn gói 4 bữa ăn cao cấp chuẩn Fine Dining',
      'Chèo thuyền kayak, chèo sup và câu mực đêm',
      'Xe Limousine đưa đón tận nơi'
    ],
    excluded: [
      'Dịch vụ massage spa trên tàu',
      'Rượu vang cao cấp gọi ngoài menu'
    ],
    notes: [
      'Ưu đãi giờ chót tiết kiệm 25% duy nhất trong tháng',
      'Vui lòng mang theo CMND/CCCD hoặc Hộ chiếu'
    ],
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Hải Phòng - Lên Tàu - Khám Phá Vịnh Lan Hạ',
        description: 'Cano đưa quý khách lên du thuyền, thưởng thức welcome drink và ngắm cảnh vịnh.',
        activities: ['Check-in du thuyền', 'Ăn trưa Fine Dining', 'Chèo kayak hang Sáng Tối', 'Sunset Party']
      },
      {
        day: 2,
        title: 'Làng Chài Cổ Việt Hải - Bãi Biển Ba Trái Đào',
        description: 'Đạp xe xuyên rừng nguyên sinh đến làng cổ Việt Hải và tắm biển bãi Ba Trái Đào.',
        activities: ['Thái Cực Quyền sáng sớm', 'Đạp xe làng Việt Hải', 'Tắm biển bãi cát tự nhiên']
      },
      {
        day: 3,
        title: 'Đón Bình Minh Trên Vịnh - Cập Bến',
        description: 'Tận hưởng bữa sáng trên boong tàu trong ánh bình minh kỳ ảo trước khi cập bến.',
        activities: ['Ngắm bình minh tầng thượng', 'Brunch cao cấp', 'Cập cảng tiễn đoàn']
      }
    ]
  },
  {
    id: 'tour-4',
    slug: 'nghi-duong-thao-moc-rung-thong-da-lat',
    title: 'Nghỉ Dưỡng Thảo Mộc Rừng Thông Đà Lạt',
    subtitle: 'Thanh lọc cơ thể và tìm lại sự cân bằng giữa rừng thông nguyên sinh bên hồ Tuyền Lâm.',
    category: 'Wellness',
    categories: ['chua-lanh', 'thien-nhien', 'nam', 'moi', 'sap-khoi-hanh', 'Wellness', 'Nature'],
    country: 'Việt Nam',
    city: 'Đà Lạt',
    region: 'nam',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['12/09/2026', '26/09/2026', '15/10/2026'],
    airline: 'Vietnam Airlines',
    hotel: 'Bình An Village Resort / Ana Mandara Villas',
    transportation: 'Xe riêng cao cấp suốt tuyến',
    price: 16900000,
    originalPrice: 21000000,
    childPrice: 8000000,
    infantPrice: 0,
    rating: 4.8,
    reviewsCount: 19,
    isHot: false,
    isNew: true,
    isFeatured: true,
    isExclusive: false,
    isAdminApproved: true,
    highlights: [
      'Biệt thự Pháp cổ ẩn mình giữa rừng thông xanh ngắt',
      'Liệu trình xông hơi tinh dầu thông & massage đá ấm',
      'Thưởng thức ẩm thực nông trại hữu cơ Farm-to-Table'
    ],
    included: [
      'Vé máy bay khứ hồi Đà Lạt',
      '2 đêm nghỉ tại biệt thự di sản Pháp',
      'Toàn bộ bữa ăn organic bổ dưỡng',
      'Gói trị liệu spa toàn thân 90 phút'
    ],
    excluded: [
      'Chi phí giặt ủi và các dịch vụ cá nhân khác'
    ],
    notes: [
      'Đà Lạt buổi tối se lạnh, quý khách nên chuẩn bị áo khoác nhẹ'
    ],
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đón Sân Bay Liên Khương - Về Miền Thông Xanh',
        description: 'Đón khách về resort, thưởng trà atiso nóng và ngắm hồ Tuyền Lâm.',
        activities: ['Check-in villa di sản', 'Thưởng trà chiều bên hồ', 'Bữa tối ấm cúng bên lò sưởi']
      },
      {
        day: 2,
        title: 'Tắm Rừng Shinrin-yoku - Trị Liệu Thảo Mộc',
        description: 'Đi bộ thở sâu giữa rừng thông cổ thụ, giải phóng căng thẳng với liệu trình thảo mộc.',
        activities: ['Đi bộ tắm rừng thông', 'Liệu trình đá nóng & tinh dầu thông', 'Ăn tối nông trại hữu cơ']
      },
      {
        day: 3,
        title: 'Thu Hái Nông Trại - Tiễn Sân Bay',
        description: 'Thăm vườn dâu tây và hoa thảo dược trước khi xe tiễn ra sân bay Liên Khương.',
        activities: ['Thăm nông trại sạch', 'Mua quà mứt thảo mộc', 'Xe tiễn sân bay']
      }
    ]
  },
  {
    id: 'tour-5',
    slug: 'thien-tra-di-san-song-hoai-hoi-an',
    title: 'Thiền Trà & Di Sản Sông Hoài Hội An',
    subtitle: 'Trải nghiệm không gian hoài cổ, chèo thuyền ngắm hoàng hôn và tĩnh dưỡng bên sông Thu Bồn.',
    category: 'Doc-Quyen',
    categories: ['chua-lanh', 'thien-nguyen', 'trung', 'hot', 'khong-the-bo-lo', 'sap-khoi-hanh', 'Doc-Quyen'],
    country: 'Việt Nam',
    city: 'Hội An',
    region: 'trung',
    duration: '4 Ngày 3 Đêm',
    durationDays: 4,
    departureDates: ['16/09/2026', '30/09/2026', '14/10/2026'],
    airline: 'Vietnam Airlines',
    hotel: 'Four Seasons Resort The Nam Hai / Anantara Hoi An 5*',
    transportation: 'Xe Limousine riêng & Thuyền gỗ riêng biệt',
    price: 22000000,
    originalPrice: 27500000,
    childPrice: 11000000,
    infantPrice: 0,
    rating: 5.0,
    reviewsCount: 31,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isAdminApproved: true,
    highlights: [
      'Biệt thự ven sông cổ kính với hồ bơi riêng biệt',
      'Buổi thưởng trà đạo sớm cùng nghệ nhân Hội An',
      'Du thuyền gỗ ngắm hoàng hôn sông Hoài và thả đèn hoa đăng'
    ],
    included: [
      'Vé máy bay khứ hồi Đà Nẵng',
      '3 đêm nghỉ dưỡng tại resort 5 sao chuẩn quốc tế',
      'Tất cả bữa ăn đặc sản di sản Hội An tinh tế',
      'Thuyền riêng du ngoạn sông Hoài'
    ],
    excluded: [
      'Chi tiêu cá nhân ngoài lịch trình'
    ],
    notes: [
      'Trải nghiệm tuyệt vời nhất vào các ngày rằm hoặc đầu tháng'
    ],
    heroImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đón Đà Nẵng - Về Với Phố Hội',
        description: 'Đón tại sân bay Đà Nẵng về nhận phòng tại resort ven sông Thu Bồn.',
        activities: ['Đón sân bay bằng Limousine', 'Check-in phòng hướng sông', 'Thưởng thức ẩm thực Cao Lầu']
      },
      {
        day: 2,
        title: 'Trà Sáng Di Sản - Dạo Bước Phố Cổ',
        description: 'Thưởng trà thiền tại quán trà cổ và dạo phố cổ sáng sớm khi chưa đông đúc.',
        activities: ['Thiền trà nghệ nhân', 'Tham quan nhà cổ & Chùa Cầu', 'Spa thảo dược truyền thống']
      },
      {
        day: 3,
        title: 'Làng Gốm Thanh Hà - Thuyền Hoàng Hôn',
        description: 'Trải nghiệm nặn gốm mộc mạc và lên thuyền gỗ ngắm hoàng hôn buông trên sông.',
        activities: ['Thăm làng gốm di sản', 'Thuyền ngắm hoàng hôn', 'Thả đèn hoa đăng cầu an']
      },
      {
        day: 4,
        title: 'Chợ Sớm Phố Cổ - Tiễn Đoàn',
        description: 'Dạo chợ mua quà lưu niệm tinh xảo trước khi xe đưa ra sân bay Đà Nẵng.',
        activities: ['Dạo chợ mua lụa Hội An', 'Bữa trưa chia tay', 'Xe tiễn sân bay']
      }
    ]
  },
  {
    id: 'tour-6',
    slug: 'an-cu-biet-lap-vinh-vinh-hy',
    title: 'Ẩn Cư Biệt Lập Vịnh Vĩnh Hy',
    subtitle: 'Tuyệt tác nghỉ dưỡng giữa vườn quốc gia Núi Chúa và bờ vịnh san hô ngọc bích.',
    category: 'Luxury',
    categories: ['thien-nhien', 'bao-ton', 'trung', 'last-minute', 'hot', 'Doc-Quyen', 'Luxury', 'uu-dai-gio-chot'],
    country: 'Việt Nam',
    city: 'Vịnh Vĩnh Hy',
    region: 'trung',
    duration: '4 Ngày 3 Đêm',
    durationDays: 4,
    departureDates: ['20/09/2026', '10/10/2026', '28/10/2026'],
    airline: 'Vietnam Airlines (Business Class)',
    hotel: 'Amanoi Resort 6* / Vĩnh Hy Sanctuary Pavilion',
    transportation: 'Xe Limousine riêng đưa đón từ sân bay Cam Ranh',
    price: 38000000,
    originalPrice: 48000000,
    childPrice: 19000000,
    infantPrice: 0,
    rating: 5.0,
    reviewsCount: 16,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isPromotion: true,
    isAdminApproved: true,
    highlights: [
      'Ocean Pool Pavilion với tầm nhìn 180 độ ôm trọn vịnh biển',
      'Liệu trình thủy liệu pháp Hydrotherapy độc quyền',
      'Du thuyền riêng khám phá rạn san hô hoang sơ'
    ],
    included: [
      'Vé máy bay khứ hồi hạng thương gia',
      '3 đêm nghỉ dưỡng tại Ocean Pavilion đẳng cấp nhất châu Á',
      'Toàn bộ bữa ăn 5 sao thiết kế riêng theo khẩu vị',
      'Xe riêng đưa đón sân bay Cam Ranh'
    ],
    excluded: [
      'Các loại rượu vang vintage quý hiếm ngoài gói'
    ],
    notes: [
      'Suất ưu đãi giờ chót tiết kiệm 10 triệu đồng dành cho 2 khách đầu tiên'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đón Cam Ranh - Cung Đường Biển Vĩnh Hy',
        description: 'Xe Limousine đón quý khách qua cung đường ven biển đẹp nhất Việt Nam.',
        activities: ['Đón sân bay', 'Check-in Pavilion hướng biển', 'Tiệc cocktail hoàng hôn trên vách đá']
      },
      {
        day: 2,
        title: 'Yoga Vách Đá - Liệu Pháp Thủy Trị Liệu',
        description: 'Tập yoga đón bình minh trên đài sen trên hồ và trải nghiệm Hydrotherapy.',
        activities: ['Yoga bình minh', 'Liệu trình Hydrotherapy 120 phút', 'Ăn tối hải sản tươi sống']
      },
      {
        day: 3,
        title: 'Trekking Vườn Quốc Gia Núi Chúa - Lặn San Hô',
        description: 'Khám phá thảm thực vật bán khô hạn độc đáo và lặn ngắm san hô bằng du thuyền.',
        activities: ['Trekking nhẹ nhàng', 'Du thuyền riêng vịnh Vĩnh Hy', 'Tiệc BBQ bãi biển riêng']
      },
      {
        day: 4,
        title: 'Thưởng Trà Sáng - Tiễn Sân Bay Cam Ranh',
        description: 'Tận hưởng khoảnh khắc bình yên cuối cùng trước khi xe tiễn ra sân bay.',
        activities: ['Bữa sáng ngắm vịnh', 'Tĩnh tâm', 'Xe tiễn sân bay']
      }
    ]
  },
  {
    id: 'tour-7',
    slug: 'tri-lieu-khoang-nong-co-do-hue',
    title: 'Trị Liệu Khoáng Nóng Suối Nguồn Cố Đô',
    subtitle: 'Nghỉ dưỡng Onsen khoáng nóng tự nhiên kết hợp tinh hoa dưỡng sinh cung đình Huế.',
    category: 'Wellness',
    categories: ['chua-lanh', 'trung', 'moi', 'last-minute', 'uu-dai-gio-chot', 'Wellness', 'khong-the-bo-lo', 'Heritage'],
    country: 'Việt Nam',
    city: 'Cố Đô Huế',
    region: 'trung',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['14/09/2026', '28/09/2026', '12/10/2026'],
    airline: 'Vietnam Airlines',
    hotel: 'Kawakin Onsen Resort & Spa 5*',
    transportation: 'Xe riêng cao cấp suốt hành trình',
    price: 15500000,
    originalPrice: 19000000,
    childPrice: 7000000,
    infantPrice: 0,
    rating: 4.9,
    reviewsCount: 22,
    isHot: false,
    isNew: true,
    isPromotion: true,
    isFeatured: true,
    isExclusive: false,
    isAdminApproved: true,
    highlights: [
      'Tắm khoáng nóng Onsen Nhật Bản giữa núi rừng Cố Đô',
      'Liệu trình châm cứu bấm huyệt ngự y hoàng gia',
      'Thưởng thức yến tiệc cung đình Huế thanh tao'
    ],
    included: [
      'Vé máy bay khứ hồi Huế',
      '2 đêm phòng Onsen Villa cao cấp',
      'Toàn bộ dịch vụ tắm khoáng không giới hạn',
      'Gói trị liệu dưỡng sinh ngự y 90 phút'
    ],
    excluded: [
      'Chi tiêu cá nhân ngoài chương trình'
    ],
    notes: [
      'Phù hợp tái tạo năng lượng cho người bận rộn và người lớn tuổi'
    ],
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đón Phú Bài - Check-in Onsen Sanctuary',
        description: 'Xe đón về khu nghỉ dưỡng suối khoáng nóng, ngâm mình thư giãn.',
        activities: ['Đón sân bay', 'Thưởng trà thảo dược Cố Đô', 'Ngâm khoáng nóng Onsen']
      },
      {
        day: 2,
        title: 'Dưỡng Sinh Ngự Y - Thưởng Ngoạn Lăng Tự',
        description: 'Liệu trình bấm huyệt ngự y buổi sáng và viếng thăm lăng Tự Đức u tịch.',
        activities: ['Liệu trình bấm huyệt ngự y', 'Viếng thăm lăng Tự Đức', 'Yến tiệc cung đình']
      },
      {
        day: 3,
        title: 'Thưởng Trà Sen Hồ Tịnh Tâm - Tiễn Sân Bay',
        description: 'Tận hưởng trà sen sớm và mua quà mè xửng, tinh dầu tràm trước khi bay.',
        activities: ['Trà sen sáng', 'Mua quà đặc sản Huế', 'Xe tiễn sân bay']
      }
    ]
  },
  {
    id: 'tour-8',
    slug: 'thien-nhien-nguyen-ban-bien-con-dao',
    title: 'Thiên Nhiên Nguyên Bản & Spa Bên Biển Côn Đảo',
    subtitle: 'Nghỉ dưỡng Six Senses 5 sao tách biệt, nơi rùa biển đẻ trứng và thiên nhiên kỳ thú.',
    category: 'Doc-Quyen',
    categories: ['bao-ton', 'thien-nhien', 'thien-nguyen', 'nam', 'last-minute', 'uu-dai-gio-chot', 'Doc-Quyen', 'sap-khoi-hanh'],
    country: 'Việt Nam',
    city: 'Côn Đảo',
    region: 'nam',
    duration: '4 Ngày 3 Đêm',
    durationDays: 4,
    departureDates: ['25/09/2026', '15/10/2026', '02/11/2026'],
    airline: 'Bamboo Airways / Vietnam Airlines',
    hotel: 'Six Senses Côn Đảo 5* Ocean View Villa',
    transportation: 'Xe riêng đưa đón tại sân bay Cỏ Ống',
    price: 32500000,
    originalPrice: 42000000,
    childPrice: 16000000,
    infantPrice: 0,
    rating: 5.0,
    reviewsCount: 28,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isPromotion: true,
    isAdminApproved: true,
    highlights: [
      'Biệt thự gỗ mộc mạc hướng biển có hồ bơi vô cực riêng',
      'Trải nghiệm thả rùa con về đại dương lúc rạng đông',
      'Liệu trình spa thảo mộc hữu cơ Six Senses'
    ],
    included: [
      'Vé máy bay khứ hồi Côn Đảo',
      '3 đêm nghỉ dưỡng tại Ocean View Villa',
      'Bữa sáng buffet thượng hạng mỗi ngày',
      'Dịch vụ quản gia riêng biệt (GEM)'
    ],
    excluded: [
      'Chi phí tour tâm linh ban đêm ngoài chương trình'
    ],
    notes: [
      'Ưu đãi giờ chót giảm trực tiếp 9.5 triệu đồng khi đặt trong tuần'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Đón Cỏ Ống - Thiên Đường Biển Vắng',
        description: 'Xe đón về Six Senses Côn Đảo, nhận villa bên bãi biển Đất Dốc cát trắng mịn.',
        activities: ['Đón sân bay', 'Welcome drink dừa tươi', 'Ăn tối hải sản nướng bên bờ biển']
      },
      {
        day: 2,
        title: 'Thả Rùa Con Về Biển - Spa Hữu Cơ',
        description: 'Thức dậy cùng bình minh tham gia hoạt động thả rùa và thư giãn tại spa.',
        activities: ['Thả rùa con về biển', 'Liệu trình massage Six Senses 90 phút', 'Xem phim ngoài trời']
      },
      {
        day: 3,
        title: 'Khám Phá Di Tích Lịch Sử - Thuyền Vịnh Côn Sơn',
        description: 'Viếng nghĩa trang Hàng Dương và đi cano khám phá vịnh Côn Sơn ngắm san hô.',
        activities: ['Viếng nghĩa trang Hàng Dương', 'Cano ngắm san hô', 'Tiệc tối riêng tư']
      },
      {
        day: 4,
        title: 'Chào Buổi Sáng Côn Đảo - Tiễn Sân Bay',
        description: 'Tận hưởng khoảnh khắc thư thái bên hồ bơi trước khi xe tiễn ra sân bay Cỏ Ống.',
        activities: ['Bữa sáng thịnh soạn', 'Mua hạt bàng đặc sản', 'Tiễn sân bay']
      }
    ]
  },
  {
    id: 'tour-9',
    slug: 'huong-sac-may-ngan-tinh-tam-sa-pa',
    title: 'Hương Sắc Mây Ngàn & Tĩnh Tâm Sa Pa',
    subtitle: 'Nghỉ dưỡng biệt lập trên đỉnh đồi nhìn ra thung lũng Mường Hoa và dãy Hoàng Liên Sơn.',
    category: 'Nature',
    categories: ['thien-nhien', 'thien-nguyen', 'bac', 'moi', 'sap-khoi-hanh', 'Nature', 'Wellness'],
    country: 'Việt Nam',
    city: 'Sa Pa',
    region: 'bac',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['17/09/2026', '01/10/2026', '16/10/2026'],
    airline: 'Xe Limousine Dcar cao cấp từ Hà Nội',
    hotel: 'Topas Ecolodge / Hotel de la Coupole 5*',
    transportation: 'Xe riêng cao cấp đón tận nơi',
    price: 18200000,
    originalPrice: 23000000,
    childPrice: 8500000,
    infantPrice: 0,
    rating: 4.9,
    reviewsCount: 35,
    isHot: false,
    isNew: true,
    isFeatured: true,
    isExclusive: true,
    isAdminApproved: true,
    highlights: [
      'Bungalow đá tự nhiên view biển mây bồng bềnh 360 độ',
      'Hồ bơi vô cực nước ấm nhìn thẳng ra ruộng bậc thang Mường Hoa',
      'Tắm lá thuốc người Dao đỏ gia truyền trên đỉnh núi'
    ],
    included: [
      'Xe Limousine đưa đón khứ hồi Hà Nội - Sa Pa',
      '2 đêm nghỉ dưỡng tại Topas Ecolodge',
      'Toàn bộ bữa ăn Tây Bắc tinh chế',
      'Gói tắm lá thuốc Dao đỏ và spa chân thảo mộc'
    ],
    excluded: [
      'Vé cáp treo Fansipan (nếu có nhu cầu)'
    ],
    notes: [
      'Thời điểm lý tưởng nhất ngắm mùa lúa chín vàng óng ả'
    ],
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Đỉnh Đồi Topas Sa Pa',
        description: 'Xe Limousine đưa quý khách vượt cao tốc lên Sa Pa, nhận phòng đồi view mây.',
        activities: ['Đón tại Hà Nội', 'Check-in đồi Topas', 'Bữa tối ẩm thực Tây Bắc cao cấp']
      },
      {
        day: 2,
        title: 'Săn Mây Bình Minh - Tắm Lá Thuốc Dao Đỏ',
        description: 'Thức dậy trong biển mây, bơi hồ bơi vô cực và ngâm bồn lá thuốc người Dao.',
        activities: ['Bơi hồ nước ấm ngắm mây', 'Ngâm bồn lá thuốc Dao đỏ', 'Dạo bản làng Nậm Cang']
      },
      {
        day: 3,
        title: 'Thung Lũng Mường Hoa - Về Lại Hà Nội',
        description: 'Dạo bước qua thung lũng ruộng bậc thang trước khi lên xe về lại thủ đô.',
        activities: ['Check-in thung lũng Mường Hoa', 'Mua quà thổ cẩm', 'Xe đưa về Hà Nội']
      }
    ]
  },
  {
    id: 'tour-10',
    slug: 'tinh-duong-mien-xanh-pu-luong',
    title: 'Tĩnh Dưỡng Miền Xanh Thung Lũng Pù Luông',
    subtitle: 'Hành trình chữa lành giữa núi rừng Tây Bắc, ruộng bậc thang tầng tầng lớp lớp và suối trong.',
    category: 'Nature',
    categories: ['thien-nhien', 'chua-lanh', 'thien-nguyen', 'bac', 'hot', 'last-minute', 'khong-the-bo-lo', 'uu-dai-gio-chot', 'Nature'],
    country: 'Việt Nam',
    city: 'Pù Luông',
    region: 'bac',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    departureDates: ['19/09/2026', '03/10/2026', '24/10/2026'],
    airline: 'Xe Limousine đưa đón từ Hà Nội',
    hotel: 'Pù Luông Retreat / Bocbandi Eco Resort 4*',
    transportation: 'Xe Limousine cao cấp suốt tuyến',
    price: 11500000,
    originalPrice: 15000000,
    childPrice: 5500000,
    infantPrice: 0,
    rating: 4.8,
    reviewsCount: 20,
    isHot: true,
    isFeatured: true,
    isExclusive: false,
    isPromotion: true,
    isAdminApproved: true,
    highlights: [
      'Khu nghỉ dưỡng sinh thái nhìn thẳng ra thung lũng Pù Luông hùng vĩ',
      'Chèo bè tre trên dòng suối Chàm êm đềm',
      'Thưởng thức vịt Cổ Lũng và mâm cỗ cơm lam người Thái'
    ],
    included: [
      'Xe Limousine khứ hồi Hà Nội - Pù Luông',
      '2 đêm nghỉ dưỡng tại Pù Luông Retreat',
      'Toàn bộ các bữa ăn đặc sản vùng cao',
      'Chèo bè tre suối Chàm và vé tham quan'
    ],
    excluded: [
      'Chi tiêu cá nhân ngoài chương trình'
    ],
    notes: [
      'Không gian nguyên sơ thanh bình, rất thích hợp phục hồi năng lượng'
    ],
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&auto=format&fit=crop'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Hà Nội - Về Miền Thung Lũng Xanh',
        description: 'Xe đón tại Hà Nội qua cung đường đèo Thung Khe tuyệt đẹp đến Pù Luông.',
        activities: ['Đón tại Hà Nội', 'Check-in bungalow nhìn thung lũng', 'Thưởng thức mâm cỗ người Thái']
      },
      {
        day: 2,
        title: 'Chèo Bè Tre Suối Chàm - Bản Đôn',
        description: 'Trải nghiệm chèo bè tre ngắm cọn nước khổng lồ và dạo bước qua bản Đôn.',
        activities: ['Chèo bè tre suối Chàm', 'Ngắm cọn nước truyền thống', 'Thư giãn hồ bơi vô cực']
      },
      {
        day: 3,
        title: 'Bình Minh Ruộng Bậc Thang - Về Hà Nội',
        description: 'Ngắm sương sớm lãng đãng trên ruộng bậc thang trước khi xe đưa về Hà Nội.',
        activities: ['Ngắm bình minh thung lũng', 'Mua quà nếp nương', 'Xe đưa về Hà Nội']
      }
    ]
  }
];

// --------------------------------------------------------------------------
// 2. LUXURY PRODUCTS (KOLLECTION MERCHANDISE)
// --------------------------------------------------------------------------
export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Bình giữ nhiệt Alpine',
    name: 'Bình giữ nhiệt Alpine',
    slug: 'binh-giu-nhiet-alpine',
    category: 'Phụ kiện du lịch',
    price: 850000,
    originalPrice: 1000000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjTRcfdF6_yplK4VT-RChhxc_dz4gKf_iF0t-dDv6SZypoAbltGUIxc3lRHFKv4nZMF8Tsgu9Ba9S-MWfpU_W1_iDsxBoKe7dTpT1ogIu35me-nmxxS1IuybSM54_lEQKNizMTQX-K7xK8F-BBqBu6VbChNnNZNrY7fEoNsFJ75b1abxFjuX1yoWrrAdSUPEtpWd6tu5Wz8ul1E4qEvYXYbASQwPiWN4yvaxn9oLlfQZdQjR7y9O2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjTRcfdF6_yplK4VT-RChhxc_dz4gKf_iF0t-dDv6SZypoAbltGUIxc3lRHFKv4nZMF8Tsgu9Ba9S-MWfpU_W1_iDsxBoKe7dTpT1ogIu35me-nmxxS1IuybSM54_lEQKNizMTQX-K7xK8F-BBqBu6VbChNnNZNrY7fEoNsFJ75b1abxFjuX1yoWrrAdSUPEtpWd6tu5Wz8ul1E4qEvYXYbASQwPiWN4yvaxn9oLlfQZdQjR7y9O2',
    subtitle: 'Giữ nhiệt hoàn hảo trên mọi chặng đường',
    description: 'Bình giữ nhiệt thép không gỉ 304 hai lớp chân không màu xanh rêu Alpine, giữ nóng 12h và giữ lạnh 24h, kèm quai xách công thái học bền bỉ.',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 38
  },
  {
    id: 2,
    title: 'Dụng cụ đa năng Explorer',
    name: 'Dụng cụ đa năng Explorer',
    slug: 'dung-cu-da-nang-explorer',
    category: 'Trang bị',
    price: 1200000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl2RytbicQSz-WIZdQH-PivcpvDy2Awo_yBLeSkqUrh-Pk8fThJJFSNjrqEdKPEZzjJk2FyOXoQZnHffSjs-MybP0WsMRPyua9rr3KYevhuE80GhbDQqNj26IdKplnl0fqBnBig3L_s8rL5ppSreTiWolguuT0VVj8oLfEJT2018Tf7zB8mg7A_RMmv2EYUf66AvUcRN0PRV63NUHmHkRKYm574-XAcX5mOHyNkds6e_qGRtxMtRho',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl2RytbicQSz-WIZdQH-PivcpvDy2Awo_yBLeSkqUrh-Pk8fThJJFSNjrqEdKPEZzjJk2FyOXoQZnHffSjs-MybP0WsMRPyua9rr3KYevhuE80GhbDQqNj26IdKplnl0fqBnBig3L_s8rL5ppSreTiWolguuT0VVj8oLfEJT2018Tf7zB8mg7A_RMmv2EYUf66AvUcRN0PRV63NUHmHkRKYm574-XAcX5mOHyNkds6e_qGRtxMtRho',
    subtitle: 'Tiện ích tối đa trong thiết kế nhỏ gọn',
    description: 'Bộ kìm đa năng 18 trong 1 bằng thép siêu cứng chống rỉ, thiết kế xếp gọn tiện lợi cho mọi hành trình dã ngoại và leo núi.',
    isNewArrival: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 25
  },
  {
    id: 3,
    title: 'Set túi phân loại hành lý',
    name: 'Set túi phân loại hành lý',
    slug: 'set-tui-phan-loai-hanh-ly',
    category: 'Thiết yếu',
    price: 680000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2KcU5rhNDPLymv81SVNzvhlWhBkB6-B-EJcP40aT9gTUcsZ62E73wO_GdxI6PZlG6jPv4cJqquEUFRZZI3pnRUdpBsitzoyhPUpioKYxUUFE58LnPHzQTDY8I0BT0O4G39IJcaxZKjBZpektsdVRT410YvQCOfpupbH3Fzl2jQN4smIUosHWVWNVA-B3rFK6kEo_fqzlS7P5Hw-26FFqxElBWlZHQ_S0hmseFhJTrwOm6F3zaNsd9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2KcU5rhNDPLymv81SVNzvhlWhBkB6-B-EJcP40aT9gTUcsZ62E73wO_GdxI6PZlG6jPv4cJqquEUFRZZI3pnRUdpBsitzoyhPUpioKYxUUFE58LnPHzQTDY8I0BT0O4G39IJcaxZKjBZpektsdVRT410YvQCOfpupbH3Fzl2jQN4smIUosHWVWNVA-B3rFK6kEo_fqzlS7P5Hw-26FFqxElBWlZHQ_S0hmseFhJTrwOm6F3zaNsd9',
    subtitle: 'Ngăn nắp và khoa học cho mọi chuyến đi',
    description: 'Set 5 túi nén hành lý chống thấm nước siêu nhẹ, tối ưu 60% diện tích vali và phân loại trang phục khoa học.',
    isNewArrival: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: 4,
    title: 'Balo Canvas Sáp Ong Alpine',
    name: 'Balo Canvas Sáp Ong Alpine',
    slug: 'balo-canvas-sap-ong-alpine',
    category: 'Trang bị',
    price: 1850000,
    originalPrice: 2200000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyoRRMDdrEh1tEdYk_hR089ATUbOba9k2ZLY4EEOt7vStwznpSaiyIxKVKJPaLLya2UilfXbxnjGpi3yvXvBjeMczyjijEQ3PPzRZlxNWPoJlS3FhCQwy5_dACe_mP_T60HyDUUQvhJX_zQ8OwwJhx4vuZQunPrrw4HoVWGq6U1Nz3l55gqrSDP8QZWu6xaHPvIJHqNxGuG4SOYKVnHBRpnPuwBd_zcicEI79s2MGlZl4FfJmLNNy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyoRRMDdrEh1tEdYk_hR089ATUbOba9k2ZLY4EEOt7vStwznpSaiyIxKVKJPaLLya2UilfXbxnjGpi3yvXvBjeMczyjijEQ3PPzRZlxNWPoJlS3FhCQwy5_dACe_mP_T60HyDUUQvhJX_zQ8OwwJhx4vuZQunPrrw4HoVWGq6U1Nz3l55gqrSDP8QZWu6xaHPvIJHqNxGuG4SOYKVnHBRpnPuwBd_zcicEI79s2MGlZl4FfJmLNNy',
    subtitle: 'Bền bỉ vượt thời gian, chống nước tự nhiên',
    description: 'Vải canvas dệt dày phủ sáp ong tự nhiên kết hợp da bò thuộc thảo mộc, sức chứa 28L lý tưởng cho chuyến đi 2-4 ngày.',
    isBestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 42
  },
  {
    id: 5,
    title: 'Sổ Da Du Ký Thủ Công Vintage',
    name: 'Sổ Da Du Ký Thủ Công Vintage',
    slug: 'so-da-du-ky-thu-cong-vintage',
    category: 'Quà lưu niệm',
    price: 450000,
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3VFpWr8SwWK1opXwuR34WlEa_pEUzTOZOz8bEvmPcmZ6tN8x6eAPxZJIyzTd4d_EMB3NGcdNfosZigQb9e5wsoWCOgklW0ZHZwU2WXFyN814powhrVfOdI0ADpb7YphPJvid6U8YHEkrRCnN9U4rh7JOx8E3ZtPpppulAo3fYK83rAvN9ZLCJ85yh_iGf31IukX-u_afPkbmdz-jTKk12fLzicU97kTtyXtsep-XZw1vLA6TWIr',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVR3VFpWr8SwWK1opXwuR34WlEa_pEUzTOZOz8bEvmPcmZ6tN8x6eAPxZJIyzTd4d_EMB3NGcdNfosZigQb9e5wsoWCOgklW0ZHZwU2WXFyN814powhrVfOdI0ADpb7YphPJvid6U8YHEkrRCnN9U4rh7JOx8E3ZtPpppulAo3fYK83rAvN9ZLCJ85yh_iGf31IukX-u_afPkbmdz-jTKk12fLzicU97kTtyXtsep-XZw1vLA6TWIr',
    subtitle: 'Lưu giữ những khoảnh khắc khám phá vô giá',
    description: 'Chế tác thủ công từ da bò mộc tự nhiên và 200 trang giấy mỹ thuật không axit, kèm dây buộc phong cách vintage cổ điển.',
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 19
  },
  {
    id: 6,
    title: 'Trà Búp Cổ Thụ Shan Tuyết Suối Giàng',
    name: 'Trà Búp Cổ Thụ Shan Tuyết Suối Giàng',
    slug: 'tra-shan-tuyet-co-thu-suoi-giang',
    category: 'Quà lưu niệm',
    price: 1450000,
    originalPrice: 1800000,
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85',
    subtitle: 'Búp trà phủ lông tơ bạc từ cây chè 300 năm tuổi',
    description: 'Búp trà Shan Tuyết phủ lông tơ bạc thu hái từ cây chè cổ thụ trên đỉnh núi mây mù Yên Bái, hương thơm mật ong rừng và vị ngọt hậu sâu lắng.',
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 38
  },
  {
    id: 7,
    title: 'Nến Thơm Hoàng Đàn & Trầm Hương',
    name: 'Nến Thơm Hoàng Đàn & Trầm Hương',
    slug: 'nen-thom-hoang-dan-tram-huong',
    category: 'Thiết yếu',
    price: 890000,
    originalPrice: 1100000,
    heroImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85',
    subtitle: 'Sáp đậu nành thiên nhiên hòa quyện tinh dầu trầm',
    description: 'Sáp đậu nành thiên nhiên hòa quyện cùng tinh dầu hoàng đàn Lạng Sơn và trầm hương nguyên chất, giúp thanh lọc không gian và an định tinh thần.',
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 52
  },
  {
    id: 8,
    title: 'Bộ Thiền Phục Linen Tự Nhiên',
    name: 'Bộ Thiền Phục Linen Tự Nhiên',
    slug: 'bo-thien-phuc-linen-tu-nhien',
    category: 'Trang bị',
    price: 1850000,
    originalPrice: 2200000,
    heroImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85',
    subtitle: 'Chất liệu sợi lanh hữu cơ mềm mại thoáng khí',
    description: 'Chất liệu sợi lanh hữu cơ tự nhiên thoáng mát, đường may thủ công tối giản mang lại sự nhẹ nhàng, thanh thoát tối đa khi thiền định hay dạo mát.',
    isBestSeller: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 44
  }
];

// --------------------------------------------------------------------------
// 3. MENU CATEGORIES
// --------------------------------------------------------------------------
export const MOCK_MENU_CATEGORIES = [
  // 1. Fixed Top Badges (Hàng trên menu cố định)
  { id: 1, name: 'Retreats ĐỘC QUYỀN', slug: 'doc-quyen', parentSlug: null, menuType: 'fixed_top', orderIndex: 1, icon: 'Crown', color: '#facc15' },
  { id: 2, name: 'Sắp Khởi hành', slug: 'sap-khoi-hanh', parentSlug: null, menuType: 'fixed_top', orderIndex: 2, icon: 'Calendar', color: '#ffffff' },
  { id: 3, name: 'KHÔNG THỂ BỎ LỠ', slug: 'khong-the-bo-lo', parentSlug: null, menuType: 'fixed_top', orderIndex: 3, icon: 'Flame', color: '#ffffff' },
  { id: 4, name: 'Ưu đãi GIỜ CHÓT', slug: 'uu-dai-gio-chot', parentSlug: null, menuType: 'fixed_top', orderIndex: 4, icon: 'Zap', color: '#ffffff' },

  // 2. Main Mega Menu Categories (Hàng dưới)
  { id: 5, name: 'Series Retreat', slug: 'series-retreat', parentSlug: null, menuType: 'mega_menu', orderIndex: 1, icon: 'Leaf', color: '#4ade80' },
  { id: 6, name: 'Khám Phá Điểm Đến', slug: 'diem-den', parentSlug: null, menuType: 'mega_menu', orderIndex: 2, icon: 'Compass', color: '#f97316' },
  { id: 7, name: '101 Điều Hay', slug: 'dieu-hay', parentSlug: null, menuType: 'mega_menu', orderIndex: 3, icon: 'BookOpen', color: '#38bdf8' },
  { id: 8, name: 'Kollection 4U', slug: 'kollection-4u', parentSlug: null, menuType: 'mega_menu', orderIndex: 4, icon: 'Sparkles', color: '#facc15' },
  { id: 9, name: 'Vì Sao Chọn 4U?', slug: 'vi-sao-chon-4u', parentSlug: null, menuType: 'mega_menu', orderIndex: 5, icon: 'Star', color: '#e5c158' },

  // 3. Submenu Items for Series Retreat
  { id: 10, name: 'Retreat Chữa Lành', slug: 'chua-lanh', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 1, icon: 'Heart', color: '#4ade80', description: 'Chữa lành Thân - Tâm - Trí giữa thiên nhiên' },
  { id: 11, name: 'Retreat Bảo Tồn', slug: 'bao-ton', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 2, icon: 'Shield', color: '#38bdf8', description: 'Bảo tồn rừng nguyên sinh & hệ sinh thái' },
  { id: 12, name: 'Retreat Thiên Nhiên', slug: 'thien-nhien', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 3, icon: 'Leaf', color: '#facc15', description: 'Hòa mình cùng non xanh nước biếc' },
  { id: 13, name: 'Retreat Thiện Nguyện', slug: 'thien-nguyen', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 4, icon: 'Sparkles', color: '#f472b6', description: 'Gắn kết yêu thương và sẻ chia cộng đồng' },

  // 4. Submenu Items for Khám Phá Điểm Đến
  { id: 14, name: 'Miền Bắc', slug: 'bac', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 1, color: '#4ade80', description: 'Vẻ đẹp hùng vĩ ngút ngàn non nước miền Bắc' },
  { id: 15, name: 'Miền Trung', slug: 'trung', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 2, color: '#38bdf8', description: 'Di sản cổ kính và bãi biển nguyên sơ miền Trung' },
  { id: 16, name: 'Miền Nam', slug: 'nam', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 3, color: '#facc15', description: 'Miền sông nước thanh bình & đảo ngọc phương Nam' },

  // 5. Submenu Items for 101 Điều Hay
  { id: 23, name: 'Cẩm Nang Tĩnh Dưỡng & Thiền Trà', slug: 'cam-nang-tinh-duong', parentSlug: 'dieu-hay', menuType: 'mega_menu', orderIndex: 1, icon: 'BookOpen', color: '#38bdf8', description: 'Bí quyết phục hồi năng lượng thân tâm' },
  { id: 24, name: 'Bản Đồ Năng Lượng Chữa Lành', slug: 'ban-do-nang-luong', parentSlug: 'dieu-hay', menuType: 'mega_menu', orderIndex: 2, icon: 'Compass', color: '#facc15', description: 'Khám phá các tọa độ địa linh Việt Nam' },
  { id: 25, name: 'Câu Chuyện Hành Trình Khách Hàng', slug: 'cau-chuyen-khach-hang', parentSlug: 'dieu-hay', menuType: 'mega_menu', orderIndex: 3, icon: 'Heart', color: '#f472b6', description: 'Chia sẻ chân thực từ những chuyến đi' },

  // 6. Submenu Items for Kollection 4U
  { id: 26, name: 'Trà & Thảo Mộc Cổ Thụ', slug: 'tra-thao-moc', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 1, icon: 'Gift', color: '#4ade80', description: 'Trà Shan Tuyết, Trà Sen Tây Hồ' },
  { id: 27, name: 'Nến Thơm & Tinh Dầu Trầm', slug: 'nen-thom-tinh-dau', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 2, icon: 'Sparkles', color: '#facc15', description: 'Hương thơm an định tinh thần' },
  { id: 28, name: 'Thiền Phục Linen Hữu Cơ', slug: 'thien-phuc-linen', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 3, icon: 'Feather', color: '#38bdf8', description: 'Trang phục thoáng mát tự nhiên' },
  { id: 29, name: 'Phụ Kiện Du Lịch Thủ Công', slug: 'phu-kien-du-lich', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 4, icon: 'Truck', color: '#f472b6', description: 'Túi da canvas, bình giữ nhiệt gốm sứ' },

  // 7. Submenu Items for Vì Sao Chọn 4U?
  { id: 30, name: 'Triết Lý Thiết Kế Hành Trình', slug: 'triet-ly-thiet-ke', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 1, icon: 'Star', color: '#e5c158', description: 'Định nghĩa chuẩn mực nghỉ dưỡng thượng lưu' },
  { id: 31, name: 'Đội Ngũ Chuyên Gia & Trợ Lý Riêng', slug: 'doi-ngu-chuyen-gia', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 2, icon: 'Users', color: '#4ade80', description: 'Đồng hành tận tâm trên mọi cung đường' },
  { id: 32, name: 'Cam Kết Bảo Tồn & Bền Vững', slug: 'cam-ket-ben-vung', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 3, icon: 'Shield', color: '#38bdf8', description: 'Chung tay gìn giữ thiên nhiên và di sản' }
];

// --------------------------------------------------------------------------
// 4. LOCAL STORAGE MOCK DATA PERSISTENCE HELPERS
// --------------------------------------------------------------------------
const STORAGE_KEYS = {
  TOURS: 'mock_4u_tours',
  BOOKINGS: 'mock_4u_bookings',
  CONSULTATIONS: 'mock_4u_consultations',
  PRODUCTS: 'mock_4u_products',
  SHOP_ORDERS: 'mock_4u_shop_orders'
};

function getStoredOrInitial<T>(key: string, initial: T): T {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
    }
  } catch (e) {
    // Ignore localStorage read errors
  }
  return initial;
}

function saveToStorage<T>(key: string, data: T) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (e) {
    // Ignore localStorage write errors
  }
}

// Read methods
export function getMockTours(): TourPackage[] {
  return getStoredOrInitial<TourPackage[]>(STORAGE_KEYS.TOURS, MOCK_TOURS);
}

export function getMockDestinations() {
  return DESTINATIONS_DATA;
}

export function getMockProducts() {
  return getStoredOrInitial(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
}

export function getMockBlogs() {
  return BLOGS_DATA;
}

export function getMockFaqs() {
  return FAQ_DATA;
}

export function getMockPartners() {
  return PARTNERS_DATA;
}

export function getMockServices() {
  return SERVICES_DATA;
}

export function getMockTeam() {
  return TEAM_DATA;
}

export function getMockTestimonials() {
  return TESTIMONIALS_DATA;
}

export function getMockAbout() {
  return ABOUT_DATA;
}

export function getMockCategories() {
  return MOCK_MENU_CATEGORIES;
}

export function getMockConsultations() {
  return getStoredOrInitial<any[]>(STORAGE_KEYS.CONSULTATIONS, [
    {
      id: 'cons-1',
      name: 'Nguyễn Văn An',
      phone: '0901234567',
      email: 'an.nguyen@example.com',
      destination: 'Hội An',
      duration: '4 ngày 3 đêm',
      groupSize: 2,
      budget: '30,000,000đ - 50,000,000đ',
      notes: 'Muốn thiết kế kỳ nghỉ tĩnh dưỡng kết hợp thiền trà và yoga bên sông.',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ]);
}

export function getMockBookings() {
  return getStoredOrInitial<any[]>(STORAGE_KEYS.BOOKINGS, [
    {
      id: 'book-1',
      tourTitle: 'Hành Trình Tĩnh Dưỡng Zannier Bãi San Hô',
      tourSlug: 'zannier-bai-san-ho-phu-yen-retreat',
      customerName: 'Trần Thị Mai',
      phone: '0988776655',
      email: 'mai.tran@example.com',
      numberOfAdults: 2,
      numberOfChildren: 0,
      totalPrice: 57000000,
      departureDate: '15/09/2026',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }
  ]);
}

// Write/Mutate methods for Mock mode
export function addMockConsultation(data: any) {
  const current = getMockConsultations();
  const newItem = {
    id: `cons-${Date.now()}`,
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const updated = [newItem, ...current];
  saveToStorage(STORAGE_KEYS.CONSULTATIONS, updated);
  return newItem;
}

export function addMockBooking(data: any) {
  const current = getMockBookings();
  const newItem = {
    id: `book-${Date.now()}`,
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const updated = [newItem, ...current];
  saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
  return newItem;
}

export function addMockTour(data: any) {
  const current = getMockTours();
  const newItem = {
    id: `tour-${Date.now()}`,
    slug: data.slug || `tour-${Date.now()}`,
    ...data
  };
  const updated = [newItem, ...current];
  saveToStorage(STORAGE_KEYS.TOURS, updated);
  return newItem;
}

export function updateMockTour(id: string, data: any) {
  const current = getMockTours();
  const updated = current.map(t => (t.id === id || t.slug === id ? { ...t, ...data } : t));
  saveToStorage(STORAGE_KEYS.TOURS, updated);
  return updated.find(t => t.id === id || t.slug === id);
}

export function deleteMockTour(id: string) {
  const current = getMockTours();
  const updated = current.filter(t => t.id !== id && t.slug !== id);
  saveToStorage(STORAGE_KEYS.TOURS, updated);
  return { success: true };
}

// --------------------------------------------------------------------------
// 5. MOCK SHOP ORDERS CRUD
// --------------------------------------------------------------------------
export function getMockShopOrders() {
  return getStoredOrInitial<any[]>(STORAGE_KEYS.SHOP_ORDERS, [
    {
      id: 1,
      orderCode: 'ORD-789012',
      customerName: 'Hoàng Anh Tuấn',
      customerPhone: '0912345678',
      customerEmail: 'tuan.hoang@example.com',
      shippingAddress: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
      paymentMethod: 'Chuyển khoản QR (Đã quét)',
      orderNotes: 'Đóng gói hộp quà sang trọng giúp tôi',
      totalAmount: 2330000,
      shippingFee: 0,
      status: 'Đã thanh toán (Chờ giao)',
      createdAt: new Date().toISOString(),
      items: [
        {
          productId: 1,
          productTitle: 'Bình Giữ Nhiệt Khắc Laser 4U',
          productSku: 'BG-4U-01',
          price: 480000,
          quantity: 1,
          subtotal: 480000,
          heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAjTRcfdF6_yplK4VT-RChhxc_dz4gKf_iF0t-dDv6SZypoAbltGUIxc3lRHFKv4nZMF8Tsgu9Ba9S-MWfpU_W1_iDsxBoKe7dTpT1ogIu35me-nmxxS1IuybSM54_lEQKNizMTQX-K7xK8F-BBqBu6VbChNnNZNrY7fEoNsFJ75b1abxFjuX1yoWrrAdSUPEtpWd6tu5Wz8ul1E4qEvYXYbASQwPiWN4yvaxn9oLlfQZdQjR7y9O2'
        },
        {
          productId: 4,
          productTitle: 'Balo Canvas Sáp Ong Alpine',
          productSku: 'BL-ALP-04',
          price: 1850000,
          quantity: 1,
          subtotal: 1850000,
          heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyoRRMDdrEh1tEdYk_hR089ATUbOba9k2ZLY4EEOt7vStwznpSaiyIxKVKJPaLLya2UilfXbxnjGpi3yvXvBjeMczyjijEQ3PPzRZlxNWPoJlS3FhCQwy5_dACe_mP_T60HyDUUQvhJX_zQ8OwwJhx4vuZQunPrrw4HoVWGq6U1Nz3l55gqrSDP8QZWu6xaHPvIJHqNxGuG4SOYKVnHBRpnPuwBd_zcicEI79s2MGlZl4FfJmLNNy'
        }
      ]
    }
  ]);
}

export function addMockShopOrder(data: any) {
  const current = getMockShopOrders();
  const newItem = {
    id: data.id || Date.now(),
    orderCode: data.orderCode || `ORD-${Date.now().toString().slice(-6)}`,
    ...data,
    status: data.status || 'Chờ xác nhận',
    createdAt: data.createdAt || new Date().toISOString()
  };
  const updated = [newItem, ...current];
  saveToStorage(STORAGE_KEYS.SHOP_ORDERS, updated);
  return newItem;
}

export function updateMockShopOrder(id: number | string, data: any) {
  const current = getMockShopOrders();
  const updated = current.map(o => (String(o.id) === String(id) ? { ...o, ...data } : o));
  saveToStorage(STORAGE_KEYS.SHOP_ORDERS, updated);
  return updated.find(o => String(o.id) === String(id));
}

export function deleteMockShopOrder(id: number | string) {
  const current = getMockShopOrders();
  const updated = current.filter(o => String(o.id) !== String(id));
  saveToStorage(STORAGE_KEYS.SHOP_ORDERS, updated);
  return { success: true };
}

