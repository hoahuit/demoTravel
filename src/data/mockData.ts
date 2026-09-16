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
    id: 13,
    slug: 'khoang-dung-chau-doc-3n2d-retreat',
    title: 'Khoảng Dừng',
    subtitle: 'Tạm gác những Xô bồ thường nhật để sống chậm lại giữa Châu Đốc, An Giang an yên',
    category: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Châu Đốc',
    duration: '3 ngày 2 đêm',
    durationDays: 3,
    airline: 'Không áp dụng (Đường bộ)',
    hotel: 'Victoria Núi Sam Lodge',
    transportation: 'Xe 45 chỗ',
    price: 6990000,
    originalPrice: 9210000,
    childPrice: 6990000,
    infantPrice: 3495000,
    cost: 5474231,
    marginPercent: 40.5,
    promotionPercent: 24.1,
    group3Percent: 27,
    group5Percent: 30,
    childDiscountPercent: 0,
    infantDiscountPercent: 50,
    vatPercent: 8,
    adultNote: 'Áp dụng từ 12 tuổi trở lên, tiêu chuẩn phòng 2 khách',
    childNote: 'Từ 6 đến dưới 12 tuổi (Ngủ chung phòng bố mẹ)',
    infantNote: 'Dưới 6 tuổi (Miễn phí tiền tour)',
    bookingPolicyNotes: 'Được bảo lưu/đổi ngày miễn phí trước 14 ngày, chuyển nhượng không thu phí',
    rating: 5,
    reviewsCount: 3,
    isHot: true,
    isFeatured: true,
    isExclusive: true,
    isCustomer: false,
    isAdminApproved: true,
    seriesType: 'chua-lanh',
    heroImage: '/uploads/4URe___CDC___Hero.jpg',
    destinationMap: 'https://maps.google.com/maps?q=Ch%C3%A2u%20%C4%90%E1%BB%91c&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landingSectionTemplateId: 'khoang-dung-chau-doc-3n2d-retreat',
    highlights: [
      'Đắm mình giữa Thiên nhiên nguyên sơ và tận hưởng sự Bình yên của miền Tây',
      'Lướt nhẹ qua những Dòng nước tĩnh lặng, nơi mọi Nhịp sống dường như chậm lại',
      'Bước chậm giữa Thiên nhiên để đón nhận Khung cảnh rộng mở từ trên cao',
      'Trải nghiệm Thiền tĩnh lặng đón Bình minh và nạp lại Năng lượng',
      'Thưởng thức ẩm thực thanh đạm hữu cơ kết tinh từ tinh hoa văn hóa bản địa',
      'Nghỉ dưỡng biệt lập tại Victoria Núi Sam Lodge với tầm nhìn thung lũng'
    ],
    included: [
      'Phương tiện di chuyển từ Tp. HCM đến Châu Đốc và ngược lại',
      'Chỗ nghỉ nằm trong lòng Thiên nhiên yên bình tại Victoria Núi Sam',
      'Các Bữa ăn thanh đạm đầy đủ Dinh dưỡng',
      'Workshop và Chia sẻ "Chữa lành"',
      'Vé vào cổng tại các điểm Tham quan',
      'Giảng viên thuộc Sivananda Yoga chia sẻ về các Chủ đề Sức khoẻ',
      'Khăn lạnh, nước uống trên xe',
      'Bảo hiểm Du lịch cho Hành trình'
    ],
    excluded: [
      'Chi phí cá nhân ngoài Chương trình (giặt ủi, mua sắm riêng)',
      'Hóa đơn VAT (nếu có nhu cầu xuất hóa đơn công ty)'
    ],
    notes: [
      'Trang phục lịch sự, thoải mái khi tham gia Trải nghiệm Yoga & Thiền định'
    ],
    travelTips: [
      'Trang phục lịch sự, thoải mái khi tham gia Trải nghiệm Yoga & Thiền định'
    ],
    categories: [
      'chua-lanh',
      'thien-nhien',
      'bao-ton',
      'doc-quyen',
      'hot',
      'Wellness'
    ],
    departureDates: [
      '23/10/2026'
    ],
    itinerary: [
      {
        day: 1,
        dayNumber: 1,
        title: 'Khởi hành đến Châu Đốc',
        description: 'Cùng nhau tìm hiểu: "Ta đang cần Khoảng dừng cho điều gì?" trên Hành trình đến Châu Đốc',
        image: '/uploads/1788544654812_day1.jpg',
        activities: [
          'Tham quan Thánh đường Mubarak, Chùa Tây An, Chùa Bà',
          'Tìm hiểu về Giá trị của Vải "Lãnh Mỹ A", được làm bởi Tay nghề Thủ công độc bản',
          'Đón Hoàng hôn tại Victoria Nui Sam',
          'Trải nghiệm Xe lôi dạo quanh các Điểm tham quan nổi tiếng'
        ],
        transport: 'Xe 45 chỗ + Xe lôi',
        transportAndCulinary: [
          'Xe 45 chỗ + Xe lôi'
        ],
        attractions: [
          'Thánh đường Mubarak',
          'Chùa Tây An',
          'Chùa Bà',
          'Victoria Nui Sam'
        ]
      },
      {
        day: 2,
        dayNumber: 2,
        title: 'Khoảng dừng',
        description: 'Đón ngày mới tràn đầy Năng lượng',
        image: '/uploads/day2.jpg',
        activities: [
          'Cảm nhận Bình yên từ bên trong qua Trải nghiệm Thiền tĩnh lặng',
          'Trải nghiệm Kết nối Thiên nhiên qua Hiking Núi Sam',
          'Tham gia Workshop "Làm Sao để Giải Tỏa Stress?"',
          'Dành cho mình Khoảng lặng để chia sẻ "Chữa lành": "Nỗi sợ nào luôn đeo bám Ta mỗi ngày?"'
        ],
        transport: 'Xe 45 chỗ + Hiking Núi Sam',
        transportAndCulinary: [
          'Xe 45 chỗ + Hiking Núi Sam'
        ],
        attractions: [
          'Núi Sam',
          'Victoria Nui Sam Lodge'
        ]
      },
      {
        day: 3,
        dayNumber: 3,
        title: 'Trở về',
        description: 'Về với Tinh thần tươi mới',
        image: '/uploads/day3.jpg',
        activities: [
          'Đón Bình an qua Thiền hành',
          'Trải nghiệm di chuyển bằng Xuồng Ba lá xuyên Rừng Tràm Trà Sư xanh mát',
          'Thưởng thức bữa trưa thanh đạm hữu cơ',
          'Kết thúc chương trình, hẹn gặp lại trong Hành trình tiếp theo.'
        ],
        transport: 'Xuồng ba lá + Xe 45 chỗ',
        transportAndCulinary: [
          'Xuồng ba lá + Xe 45 chỗ'
        ],
        attractions: [
          'Rừng Tràm Trà Sư'
        ]
      }
    ],
    gallery: [
      '/uploads/4URe___CDC___Highlight_1.jpg',
      '/uploads/4URe___CDC___Highlight_2.jpg',
      '/uploads/4URe___CDC___Highlight_3.jpg',
      '/uploads/4URe___CDC___Highlight_4.jpg',
      '/uploads/4URe___CDC___Highlight_5.jpg'
    ],
    faq: [
      {
        question: 'Tôi chưa từng tập Yoga hay Thiền định thì có tham gia được không?',
        answer: 'Hoàn toàn được. Các buổi thực hành Thiền và Yoga tại 4U Retreat được thiết kế với cường độ nhẹ nhàng, dành cho mọi đối tượng từ người mới bắt đầu đến người đã có kinh nghiệm, có sự hướng dẫn tận tình từ chuyên gia Sivananda Yoga.'
      },
      {
        question: 'Chế độ ăn uống trong suốt hành trình như thế nào?',
        answer: 'Chế độ ăn trong hành trình được thiết kế theo hướng thanh đạm, dinh dưỡng thực dưỡng lành mạnh từ nguyên liệu tươi ngon hữu cơ địa phương, hỗ trợ thanh lọc cơ thể tối đa.'
      },
      {
        question: 'Tôi có thể đi một mình được không?',
        answer: 'Chắc chắn rồi! Rất nhiều thành viên tham gia 4U Retreat đi một mình để tìm kiếm không gian tĩnh lặng cho bản thân và kết nối với những người bạn đồng điệu mới.'
      },
      {
        question: 'Cần chuẩn bị những gì trước chuyến đi?',
        answer: 'Quý khách nên chuẩn bị trang phục co giãn thoải mái, lịch sự để thiền/yoga, giày thể thao/hiking êm chân, bình nước cá nhân và một tâm thế rộng mở đón nhận.'
      }
    ],
    reviews: [
      {
        authorName: 'Nguyễn Thanh Hà',
        name: 'Nguyễn Thanh Hà',
        rating: 5,
        comment: 'Chuyến đi tuyệt vời giúp tôi buông bỏ hoàn toàn những áp lực công việc hàng ngày. Không gian Victoria Núi Sam và rừng tràm Trà Sư đem lại cảm giác bình yên khó tả.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop',
        createdAt: '15/08/2026'
      },
      {
        authorName: 'Trần Minh Quân',
        name: 'Trần Minh Quân',
        rating: 5,
        comment: 'Lần đầu tiên trải nghiệm thiền đón bình minh trên đỉnh núi, cảm giác nạp lại trọn vẹn năng lượng cho cả thân và tâm. Cảm ơn đội ngũ 4U Wellness rất chu đáo!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
        createdAt: '20/08/2026'
      },
      {
        authorName: 'Lê Ngọc Bích',
        name: 'Lê Ngọc Bích',
        rating: 5,
        comment: 'Một chuyến đi đúng nghĩa "Khoảng Dừng". Mọi thứ từ chỗ nghỉ, bữa ăn đến các buổi chia sẻ đều rất tinh tế và sâu lắng.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
        createdAt: '28/08/2026'
      }
    ],
    tourDepartureDates: [
      {
        id: 38,
        tourId: 13,
        departureDate: '23/10/2026',
        availableSeats: 25,
        status: 'available',
        priceOverride: null,
        orderIndex: 0
      }
    ],
    tourItineraries: [
      {
        id: 71,
        tourId: 13,
        dayNumber: 1,
        title: 'Khởi hành đến Châu Đốc',
        description: 'Cùng nhau tìm hiểu: "Ta đang cần Khoảng dừng cho điều gì?" trên Hành trình đến Châu Đốc',
        image: '/uploads/1788544654812_day1.jpg',
        activities: '["Tham quan Thánh đường Mubarak, Chùa Tây An, Chùa Bà","Tìm hiểu về Giá trị của Vải \\"Lãnh Mỹ A\\", được làm bởi Tay nghề Thủ công độc bản","Đón Hoàng hôn tại Victoria Nui Sam","Trải nghiệm Xe lôi dạo quanh các Điểm tham quan nổi tiếng"]',
        transport: 'Xe 45 chỗ + Xe lôi',
        attractions: 'Thánh đường Mubarak, Chùa Tây An, Chùa Bà, Victoria Nui Sam',
        orderIndex: 0
      },
      {
        id: 72,
        tourId: 13,
        dayNumber: 2,
        title: 'Khoảng dừng',
        description: 'Đón ngày mới tràn đầy Năng lượng',
        image: '/uploads/day2.jpg',
        activities: '["Cảm nhận Bình yên từ bên trong qua Trải nghiệm Thiền tĩnh lặng","Trải nghiệm Kết nối Thiên nhiên qua Hiking Núi Sam","Tham gia Workshop \\"Làm Sao để Giải Tỏa Stress?\\"","Dành cho mình Khoảng lặng để chia sẻ \\\"Chữa lành\\\": \\\"Nỗi sợ nào luôn đeo bám Ta mỗi ngày?\\""]',
        transport: 'Xe 45 chỗ + Hiking Núi Sam',
        attractions: 'Núi Sam, Victoria Nui Sam Lodge',
        orderIndex: 1
      },
      {
        id: 73,
        tourId: 13,
        dayNumber: 3,
        title: 'Trở về',
        description: 'Về với Tinh thần tươi mới',
        image: '/uploads/day3.jpg',
        activities: '["Đón Bình an qua Thiền hành","Trải nghiệm di chuyển bằng Xuồng Ba lá xuyên Rừng Tràm Trà Sư xanh mát","Thưởng thức bữa trưa thanh đạm hữu cơ","Kết thúc chương trình, hẹn gặp lại trong Hành trình tiếp theo."]',
        transport: 'Xuồng ba lá + Xe 45 chỗ',
        attractions: 'Rừng Tràm Trà Sư',
        orderIndex: 2
      }
    ],
    tourFaqs: [
      {
        id: 37,
        tourId: 13,
        question: 'Tôi chưa từng tập Yoga hay Thiền định thì có tham gia được không?',
        answer: 'Hoàn toàn được. Các buổi thực hành Thiền và Yoga tại 4U Retreat được thiết kế với cường độ nhẹ nhàng, dành cho mọi đối tượng từ người mới bắt đầu đến người đã có kinh nghiệm, có sự hướng dẫn tận tình từ chuyên gia Sivananda Yoga.',
        orderIndex: 0
      },
      {
        id: 38,
        tourId: 13,
        question: 'Chế độ ăn uống trong suốt hành trình như thế nào?',
        answer: 'Chế độ ăn trong hành trình được thiết kế theo hướng thanh đạm, dinh dưỡng thực dưỡng lành mạnh từ nguyên liệu tươi ngon hữu cơ địa phương, hỗ trợ thanh lọc cơ thể tối đa.',
        orderIndex: 1
      },
      {
        id: 39,
        tourId: 13,
        question: 'Tôi có thể đi một mình được không?',
        answer: 'Chắc chắn rồi! Rất nhiều thành viên tham gia 4U Retreat đi một mình để tìm kiếm không gian tĩnh lặng cho bản thân và kết nối với những người bạn đồng điệu mới.',
        orderIndex: 2
      },
      {
        id: 40,
        tourId: 13,
        question: 'Cần chuẩn bị những gì trước chuyến đi?',
        answer: 'Quý khách nên chuẩn bị trang phục co giãn thoải mái, lịch sự để thiền/yoga, giày thể thao/hiking êm chân, bình nước cá nhân và một tâm thế rộng mở đón nhận.',
        orderIndex: 3
      }
    ],
    tourReviews: [
      {
        id: 28,
        tourId: 13,
        authorName: 'Nguyễn Thanh Hà',
        rating: 5,
        comment: 'Chuyến đi tuyệt vời giúp tôi buông bỏ hoàn toàn những áp lực công việc hàng ngày. Không gian Victoria Núi Sam và rừng tràm Trà Sư đem lại cảm giác bình yên khó tả.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop',
        createdAt: '15/08/2026',
        orderIndex: 0
      },
      {
        id: 29,
        tourId: 13,
        authorName: 'Trần Minh Quân',
        rating: 5,
        comment: 'Lần đầu tiên trải nghiệm thiền đón bình minh trên đỉnh núi, cảm giác nạp lại trọn vẹn năng lượng cho cả thân và tâm. Cảm ơn đội ngũ 4U Wellness rất chu đáo!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
        createdAt: '20/08/2026',
        orderIndex: 1
      },
      {
        id: 30,
        tourId: 13,
        authorName: 'Lê Ngọc Bích',
        rating: 5,
        comment: 'Một chuyến đi đúng nghĩa "Khoảng Dừng". Mọi thứ từ chỗ nghỉ, bữa ăn đến các buổi chia sẻ đều rất tinh tế và sâu lắng.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
        createdAt: '28/08/2026',
        orderIndex: 2
      }
    ],
    tourCategoryMappings: [
      {
        id: 151,
        tourId: 13,
        categorySlug: 'chua-lanh'
      },
      {
        id: 152,
        tourId: 13,
        categorySlug: 'thien-nhien'
      },
      {
        id: 153,
        tourId: 13,
        categorySlug: 'bao-ton'
      },
      {
        id: 154,
        tourId: 13,
        categorySlug: 'doc-quyen'
      },
      {
        id: 155,
        tourId: 13,
        categorySlug: 'hot'
      },
      {
        id: 156,
        tourId: 13,
        categorySlug: 'Wellness'
      }
    ],
    tourImages: [
      {
        id: 69,
        tourId: 13,
        imageUrl: '/uploads/4URe___CDC___Highlight_1.jpg',
        caption: 'Khoảng Dừng - Ảnh 1',
        orderIndex: 0
      },
      {
        id: 70,
        tourId: 13,
        imageUrl: '/uploads/4URe___CDC___Highlight_2.jpg',
        caption: 'Khoảng Dừng - Ảnh 2',
        orderIndex: 1
      },
      {
        id: 71,
        tourId: 13,
        imageUrl: '/uploads/4URe___CDC___Highlight_3.jpg',
        caption: 'Khoảng Dừng - Ảnh 3',
        orderIndex: 2
      },
      {
        id: 72,
        tourId: 13,
        imageUrl: '/uploads/4URe___CDC___Highlight_4.jpg',
        caption: 'Khoảng Dừng - Ảnh 4',
        orderIndex: 3
      },
      {
        id: 73,
        tourId: 13,
        imageUrl: '/uploads/4URe___CDC___Highlight_5.jpg',
        caption: 'Khoảng Dừng - Ảnh 5',
        orderIndex: 4
      }
    ],
    group3Price: 6723000,
    group5Price: 6447000,
    listPrice: 9210000
  },
  {
    id: 15,
    slug: 'binh-yen-tren-cao-nguyen-ho-lak-3n2d-retreat',
    title: '"Bình Yên trên Cao Nguyên"',
    subtitle: 'Từ Cao nguyên Buôn Ma Thuột đến Không gian tĩnh lặng tại Hồ Lắk, những Khoảnh khắc Bình yên và Vẻ đẹp nguyên sơ của Thiên nhiên, tất cả trong một Hành trình tái tạo trọn vẹn',
    category: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Đắk Lắk',
    duration: '3 ngày 2 đêm',
    durationDays: 3,
    airline: 'Không áp dụng',
    hotel: 'Lak Tented Camp',
    transportation: 'Không áp dụng',
    price: 6057000,
    originalPrice: 7980000,
    childPrice: 6057000,
    infantPrice: 3029000,
    cost: 4746923,
    marginPercent: 40.5,
    promotionPercent: 24.1,
    group3Percent: 27,
    group5Percent: 30,
    childDiscountPercent: 0,
    infantDiscountPercent: 50,
    vatPercent: 8,
    adultNote: 'Áp dụng từ 12 tuổi trở lên, tiêu chuẩn phòng 2 khách',
    childNote: 'Từ 6 đến dưới 12 tuổi',
    infantNote: 'Dưới 6 tuổi',
    bookingPolicyNotes: '-',
    rating: 5,
    reviewsCount: 0,
    isHot: false,
    isFeatured: false,
    isExclusive: false,
    isCustomer: false,
    isAdminApproved: true,
    seriesType: null,
    heroImage: '/uploads/4URE___LAK___Hero.jpg',
    destinationMap: 'https://maps.google.com/maps?q=%C4%90%E1%BA%AFk%20L%E1%BA%AFk&t=&z=14&ie=UTF8&iwloc=&output=embed',
    landingSectionTemplateId: 'binh-yen-tren-cao-nguyen-ho-lak-3n2d-retreat',
    highlights: [
      'Cảm nhận Thiên nhiên trong lành và yên tĩnh. Lắng nghe “Tiếng hát” của Tự nhiên, tận hưởng “Bình Yên trên Cao Nguyên”',
      'Xua tan Mệt mỏi, Âu lo, chữa lành Tâm hồn, xoa dịu Trái tim, tìm về Hạnh phúc Chân ái qua Trải nghiệm Thiền định & Yoga',
      'Giao lưu Văn hoá Bản địa và Bản sắc Dân tộc độc đáo'
    ],
    included: [
      'Chỗ nghỉ yên bình tại Lak Tented Camp',
      'Các Bữa ăn thanh đạm đầy đủ Dinh dưỡng',
      'Workshop và Chia sẻ "Chữa lành"',
      'Vé vào cổng tại các điểm Tham quan',
      'Giảng viên thuộc Sivananda Yoga chia sẻ về các Chủ đề Sức khoẻ',
      'Bảo hiểm Du lịch cho Hành trình'
    ],
    excluded: [
      'Chi phí Cá nhân ngoài Chương trình',
      '8% Thuế'
    ],
    notes: [],
    travelTips: [],
    categories: [
      'chua-lanh',
      'thien-nhien',
      'bao-ton',
      'doc-quyen',
      'hot',
      'trung'
    ],
    departureDates: [
      'Thu Oct 29 2026 20:00:00 GMT-0400 (Eastern Daylight Time)'
    ],
    itinerary: [
      {
        day: 1,
        dayNumber: 1,
        title: 'Bình yên trên Cao Nguyên',
        description: 'Tìm lại Bình yên nơi Hồ Lắk',
        image: '/uploads/4URE___LAK___Day_1.jpg',
        activities: [
          'Tự do đạp xe, chèo thuyền khám phá Lak Tented Camp',
          'Tìm hiểu Đa dạng Thực vật trong Khung cảnh xanh mát, trong lành',
          'Thư giãn và tận hưởng “Bình Yên trên Cao Nguyên” mộc mạc',
          'Giao lưu giữa các Thành viên trong Đoàn',
          'Tham gia buổi Thiền Tĩnh tâm, tìm về Hạnh phúc và Bình an trong Tâm trí',
          'Chia sẻ về Chủ đề "Điều Tiết"'
        ],
        transport: 'Không có',
        transportAndCulinary: [
          'Không có'
        ],
        attractions: [
          'Lak Tented Camp'
        ]
      },
      {
        day: 2,
        dayNumber: 2,
        title: 'Giá trị Thiên nhiên & Bảo tồn',
        description: 'Gia tăng Năng lượng bên Thác suối',
        image: '/uploads/4URE___LAK___Day_2.jpg',
        activities: [
          'Thiền Tĩnh lặng chuẩn bị cho một ngày tràn đầy Năng lượng Tích cực',
          'Workshop về Năng lượng sống',
          'Trải nghiệm Fasting',
          'Hiking khám phá Danh thắng hùng vĩ, tìm hiểu các Thảm thực vật trên đường đi trước khi đắm mình vào dòng thác mát lạnh',
          'Dùng bữa trưa bên bờ suối, trải nghiệm Cuộc sống dân dã, gần gũi với Thiên nhiên trong lành',
          'Tăng dẻo dai Cơ thể với Trải nghiệm Yoga ghế',
          'Thiền Tĩnh lặng xua tan Âu lo, tái tạo Năng lượng Tích cực'
        ],
        transport: 'Không có',
        transportAndCulinary: [
          'Không có'
        ],
        attractions: [
          'Thác Bìm Bịp',
          'Lak Tented Camp'
        ]
      },
      {
        day: 3,
        dayNumber: 3,
        title: 'Trở về',
        description: 'Trở về "Sống Không Bệnh"',
        image: '/uploads/4URE___LAK___Day_3.jpg',
        activities: [
          'Trải nghiệm Thiền Hành, đúc kết những Nguyên tắc Cốt lõi cho một Lối sống Khỏe mạnh Bền vững',
          'Đạp xe qua các Buôn làng, tìm hiểu Làng nghề Truyền thống và giao lưu Bản sắc Dân tộc độc đáo',
          'Hòa mình vào Vẻ đẹp chân thực Vườn Cacao'
        ],
        transport: 'Xe đạp',
        transportAndCulinary: [
          'Xe đạp'
        ],
        attractions: [
          'Làng Yang Tao',
          'Lak Tented Camp'
        ]
      }
    ],
    gallery: [
      '/uploads/4URE___LAK___Highlight_1.jpg',
      '/uploads/4URE___LAK___Highlight_2.jpg',
      '/uploads/4URE___LAK___Highlight_3.jpg'
    ],
    faq: [],
    reviews: [],
    tourDepartureDates: [
      {
        id: 40,
        tourId: 15,
        departureDate: 'Thu Oct 29 2026 20:00:00 GMT-0400 (Eastern Daylight Time)',
        availableSeats: 0,
        status: 'available',
        priceOverride: null,
        orderIndex: 0
      }
    ],
    tourItineraries: [
      {
        id: 77,
        tourId: 15,
        dayNumber: 1,
        title: 'Bình yên trên Cao Nguyên',
        description: 'Tìm lại Bình yên nơi Hồ Lắk',
        image: '/uploads/4URE___LAK___Day_1.jpg',
        activities: '["Tự do đạp xe, chèo thuyền khám phá Lak Tented Camp","Tìm hiểu Đa dạng Thực vật trong Khung cảnh xanh mát, trong lành","Thư giãn và tận hưởng “Bình Yên trên Cao Nguyên” mộc mạc","Giao lưu giữa các Thành viên trong Đoàn","Tham gia buổi Thiền Tĩnh tâm, tìm về Hạnh phúc và Bình an trong Tâm trí","Chia sẻ về Chủ đề \\"Điều Tiết\\""]',
        transport: 'Không có',
        attractions: 'Lak Tented Camp',
        orderIndex: 0
      },
      {
        id: 78,
        tourId: 15,
        dayNumber: 2,
        title: 'Giá trị Thiên nhiên & Bảo tồn',
        description: 'Gia tăng Năng lượng bên Thác suối',
        image: '/uploads/4URE___LAK___Day_2.jpg',
        activities: '["Thiền Tĩnh lặng chuẩn bị cho một ngày tràn đầy Năng lượng Tích cực","Workshop về Năng lượng sống","Trải nghiệm Fasting","Hiking khám phá Danh thắng hùng vĩ, tìm hiểu các Thảm thực vật trên đường đi trước khi đắm mình vào dòng thác mát lạnh","Dùng bữa trưa bên bờ suối, trải nghiệm Cuộc sống dân dã, gần gũi với Thiên nhiên trong lành","Tăng dẻo dai Cơ thể với Trải nghiệm Yoga ghế","Thiền Tĩnh lặng xua tan Âu lo, tái tạo Năng lượng Tích cực"]',
        transport: 'Không có',
        attractions: 'Thác Bìm Bịp,Lak Tented Camp',
        orderIndex: 1
      },
      {
        id: 79,
        tourId: 15,
        dayNumber: 3,
        title: 'Trở về',
        description: 'Trở về "Sống Không Bệnh"',
        image: '/uploads/4URE___LAK___Day_3.jpg',
        activities: '["Trải nghiệm Thiền Hành, đúc kết những Nguyên tắc Cốt lõi cho một Lối sống Khỏe mạnh Bền vững","Đạp xe qua các Buôn làng, tìm hiểu Làng nghề Truyền thống và giao lưu Bản sắc Dân tộc độc đáo","Hòa mình vào Vẻ đẹp chân thực Vườn Cacao"]',
        transport: 'Xe đạp',
        attractions: 'Làng Yang Tao,Lak Tented Camp',
        orderIndex: 2
      }
    ],
    tourCategoryMappings: [
      {
        id: 163,
        tourId: 15,
        categorySlug: 'chua-lanh'
      },
      {
        id: 164,
        tourId: 15,
        categorySlug: 'thien-nhien'
      },
      {
        id: 165,
        tourId: 15,
        categorySlug: 'bao-ton'
      },
      {
        id: 166,
        tourId: 15,
        categorySlug: 'doc-quyen'
      },
      {
        id: 167,
        tourId: 15,
        categorySlug: 'hot'
      },
      {
        id: 168,
        tourId: 15,
        categorySlug: 'trung'
      }
    ],
    tourImages: [
      {
        id: 74,
        tourId: 15,
        imageUrl: '/uploads/4URE___LAK___Highlight_1.jpg',
        caption: '',
        orderIndex: 0
      },
      {
        id: 75,
        tourId: 15,
        imageUrl: '/uploads/4URE___LAK___Highlight_2.jpg',
        caption: '',
        orderIndex: 1
      },
      {
        id: 76,
        tourId: 15,
        imageUrl: '/uploads/4URE___LAK___Highlight_3.jpg',
        caption: '',
        orderIndex: 2
      }
    ],
    group3Price: 5825000,
    group5Price: 5586000,
    listPrice: 7980000
  },
  {
    id: 16,
    slug: 'tinh-lang-giua-dai-ngan-nam-cat-tien-2n1d-retreat',
    title: '"Tĩnh Lặng giữa Đại Ngàn"',
    subtitle: 'Phục hồi Thân · Tâm · Trí giữa Thiên nhiên Vườn Quốc Gia Cát Tiên, nơi được Buông, được Thở, và tìm lại câu trả lời cho chính mình.',
    category: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Nam Cát Tiên',
    duration: '2 ngày 1 đêm',
    durationDays: 2,
    airline: 'Không áp dụng',
    hotel: 'Alagon Ecolodge',
    transportation: 'Xe 45 chỗ',
    price: 4182000,
    originalPrice: 5510000,
    childPrice: 4182000,
    infantPrice: 2091000,
    cost: 3272692,
    marginPercent: 40.5,
    promotionPercent: 24.1,
    group3Percent: 27,
    group5Percent: 30,
    childDiscountPercent: 0,
    infantDiscountPercent: 50,
    vatPercent: 8,
    adultNote: 'Áp dụng từ 12 tuổi trở lên, tiêu chuẩn phòng 2 khách',
    childNote: 'Từ 6 đến dưới 12 tuổi',
    infantNote: 'Dưới 6 tuổi',
    bookingPolicyNotes: '-',
    rating: 5,
    reviewsCount: 0,
    isHot: false,
    isFeatured: false,
    isExclusive: false,
    isCustomer: false,
    isAdminApproved: true,
    seriesType: null,
    heroImage: '/uploads/4URE___NCT___Hero.jpg',
    destinationMap: 'https://maps.app.goo.gl/bwU5VAVytPeCiLcm6',
    landingSectionTemplateId: 'tinh-lang-giua-dai-ngan-nam-cat-tien-2n1d-retreat',
    highlights: [
      'Trải nghiệm giúp Tái tạo Năng lượng sâu',
      'Giải tỏa Stress và Áp lực tích tụ',
      'Cảm nhận Không gian Thiên nhiên giúp thả lỏng Tâm trí'
    ],
    included: [
      'Phương tiện di chuyển từ Tp. HCM đến Châu Đốc và ngược lại',
      'Chỗ nghỉ yên bình tại Alagon Ecolodge',
      'Các Bữa ăn thanh đạm đầy đủ Dinh dưỡng',
      'Workshop và Chia sẻ "Chữa lành"',
      'Vé vào cổng tại các điểm Tham quan',
      'Giảng viên thuộc Sivananda Yoga chia sẻ về các Chủ đề Sức khoẻ',
      'Khăn lạnh, nước uống trên xe',
      'Bảo hiểm Du lịch cho Hành trình'
    ],
    excluded: [
      'Chi phí Cá nhân ngoài Chương trình',
      '8% Thuế'
    ],
    notes: [],
    travelTips: [],
    categories: [
      'chua-lanh',
      'thien-nhien',
      'bao-ton',
      'doc-quyen',
      'hot',
      'nam'
    ],
    departureDates: [
      'Fri Sep 25 2026 20:00:00 GMT-0400 (Eastern Daylight Time)'
    ],
    itinerary: [
      {
        day: 1,
        dayNumber: 1,
        title: 'Khởi hành đến Nam Cát Tiên',
        description: 'Cùng nhau tìm hiểu về "Điều Tiết" trên Hành trình đến Nam Cát Tiên',
        image: '/uploads/4URE___NCT___Day_1.jpg',
        activities: [
          'Hít thở Bầu không khí trong lành, cảm nhận Thiên nhiên yên tĩnh & xanh mát qua Trải nghiệm đạp xe dạo quanh Đường làng',
          'Trải Thiền Tĩnh lặng buổi tối, cùng nhau chia sẻ "Chữa Lành", giải toả Lo âu trong Cuộc sống, hướng đến sự Cân bằng trong Tâm hồn'
        ],
        transport: 'Xe 45 chỗ + Xe đạp',
        transportAndCulinary: [
          'Xe 45 chỗ + Xe đạp'
        ],
        attractions: [
          'Alagon Ecolodge'
        ]
      },
      {
        day: 2,
        dayNumber: 2,
        title: 'Trở về',
        description: 'Về với Tinh thần tươi mới',
        image: '/uploads/4URE___NCT___Day_2.jpg',
        activities: [
          'Đón Bình minh tràn đầy Năng lượng với Thiền Tĩnh Lặng & Thiền hành',
          'Kết nối Bản thân với Mẹ Thiên nhiên qua Trekking tại Vườn Quốc gia',
          'Tham gia Workshop, hiểu về Nguyên nhân sâu xa của Stress & Giải pháp'
        ],
        transport: 'Xe 45 chỗ',
        transportAndCulinary: [
          'Xe 45 chỗ'
        ],
        attractions: [
          'Alagon Ecolodge',
          'Vườn Quốc gia Nam Cát Tiên'
        ]
      }
    ],
    gallery: [
      '/uploads/4URE___NCT___Highlight_1.jpg',
      '/uploads/4URE___NCT___Highlight_2.jpg',
      '/uploads/4URE___NCT___Highlight_3.jpg'
    ],
    faq: [],
    reviews: [],
    tourDepartureDates: [
      {
        id: 44,
        tourId: 16,
        departureDate: 'Fri Sep 25 2026 20:00:00 GMT-0400 (Eastern Daylight Time)',
        availableSeats: 0,
        status: 'available',
        priceOverride: null,
        orderIndex: 0
      }
    ],
    tourItineraries: [
      {
        id: 88,
        tourId: 16,
        dayNumber: 1,
        title: 'Khởi hành đến Nam Cát Tiên',
        description: 'Cùng nhau tìm hiểu về "Điều Tiết" trên Hành trình đến Nam Cát Tiên',
        image: '/uploads/4URE___NCT___Day_1.jpg',
        activities: '["Hít thở Bầu không khí trong lành, cảm nhận Thiên nhiên yên tĩnh & xanh mát qua Trải nghiệm đạp xe dạo quanh Đường làng","Trải Thiền Tĩnh lặng buổi tối, cùng nhau chia sẻ \\"Chữa Lành\\\", giải toả Lo âu trong Cuộc sống, hướng đến sự Cân bằng trong Tâm hồn"]',
        transport: 'Xe 45 chỗ + Xe đạp',
        attractions: 'Alagon Ecolodge',
        orderIndex: 0
      },
      {
        id: 89,
        tourId: 16,
        dayNumber: 2,
        title: 'Trở về',
        description: 'Về với Tinh thần tươi mới',
        image: '/uploads/4URE___NCT___Day_2.jpg',
        activities: '["Đón Bình minh tràn đầy Năng lượng với Thiền Tĩnh Lặng & Thiền hành","Kết nối Bản thân với Mẹ Thiên nhiên qua Trekking tại Vườn Quốc gia","Tham gia Workshop, hiểu về Nguyên nhân sâu xa của Stress & Giải pháp"]',
        transport: 'Xe 45 chỗ',
        attractions: 'Alagon Ecolodge,Vườn Quốc gia Nam Cát Tiên',
        orderIndex: 1
      }
    ],
    tourCategoryMappings: [
      {
        id: 186,
        tourId: 16,
        categorySlug: 'chua-lanh'
      },
      {
        id: 187,
        tourId: 16,
        categorySlug: 'thien-nhien'
      },
      {
        id: 188,
        tourId: 16,
        categorySlug: 'bao-ton'
      },
      {
        id: 189,
        tourId: 16,
        categorySlug: 'doc-quyen'
      },
      {
        id: 190,
        tourId: 16,
        categorySlug: 'hot'
      },
      {
        id: 191,
        tourId: 16,
        categorySlug: 'nam'
      }
    ],
    tourImages: [
      {
        id: 80,
        tourId: 16,
        imageUrl: '/uploads/4URE___NCT___Highlight_1.jpg',
        caption: '',
        orderIndex: 0
      },
      {
        id: 81,
        tourId: 16,
        imageUrl: '/uploads/4URE___NCT___Highlight_2.jpg',
        caption: '',
        orderIndex: 1
      },
      {
        id: 82,
        tourId: 16,
        imageUrl: '/uploads/4URE___NCT___Highlight_3.jpg',
        caption: '',
        orderIndex: 2
      }
    ],
    group3Price: 4022000,
    group5Price: 3857000,
    listPrice: 5510000
  },
  {
    id: 17,
    slug: 'thanh-tinh-tinh-khiet-hue-4n3d-retreat',
    title: '"Thanh Tịnh & Tinh Khiết"',
    subtitle: 'Hãy tạm gác lại Âu lo chốn Đô thị để tìm thấy sự An nhiên, Thanh tịnh với chuyến đi Retreat tại Huế',
    category: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Huế',
    duration: '4 ngày 3 đêm',
    durationDays: 4,
    airline: 'Không áp dụng',
    hotel: 'aNhill Boutique',
    transportation: 'Xe 45 chỗ',
    price: 15453000,
    originalPrice: 20360000,
    childPrice: 15453000,
    infantPrice: 7727000,
    cost: 12112520,
    marginPercent: 40.5,
    promotionPercent: 24.1,
    group3Percent: 27,
    group5Percent: 30,
    childDiscountPercent: 0,
    infantDiscountPercent: 50,
    vatPercent: 8,
    adultNote: 'Áp dụng từ 12 tuổi trở lên, tiêu chuẩn phòng 2 khách',
    childNote: 'Từ 6 đến dưới 12 tuổi',
    infantNote: 'Dưới 6 tuổi',
    bookingPolicyNotes: '-',
    rating: 5,
    reviewsCount: 0,
    isHot: false,
    isFeatured: false,
    isExclusive: false,
    isCustomer: false,
    isAdminApproved: true,
    seriesType: null,
    heroImage: '/uploads/4URE___HUE___Hero.jpg',
    destinationMap: 'https://maps.app.goo.gl/NvYLtiZsXHHwqmS39',
    landingSectionTemplateId: 'thanh-tinh-tinh-khiet-hue-4n3d-retreat',
    highlights: [
      'Hòa mình vào Thiên nhiên tĩnh lặng của xứ Huế',
      'Cảm nhận yên bình nơi Kim Long xanh mướt và "Nhà Vuờn", Hình mẫu Giá trị Bảo tồn',
      'Trải nghiệm Khoảnh khắc "Me-Time" cho chính mình, từ đó giúp giải tỏa Căng thẳng và hiểu rõ hơn về Lối "Sống Không Bệnh"'
    ],
    included: [
      'Phương tiện di chuyển từ Sân bay Phú Bài đến Khách sạn Huế và ngược lại',
      'Chỗ nghỉ yên bình tại aNhill Boutique',
      'Các Bữa ăn thanh đạm đầy đủ Dinh dưỡng',
      'Workshop và Chia sẻ "Chữa lành"',
      'Vé vào cổng tại các điểm Tham quan',
      'Giảng viên thuộc Sivananda Yoga chia sẻ về các Chủ đề Sức khoẻ',
      'Khăn lạnh, nước uống trên xe',
      'Bảo hiểm Du lịch cho Hành trình'
    ],
    excluded: [
      'Chi phí Cá nhân ngoài Chương trình',
      '8% Thuế'
    ],
    notes: [],
    travelTips: [],
    categories: [
      'chua-lanh',
      'bao-ton',
      'doc-quyen',
      'hot',
      'trung'
    ],
    departureDates: [
      'Wed Nov 04 2026 19:00:00 GMT-0500 (Eastern Standard Time)'
    ],
    itinerary: [
      {
        day: 1,
        dayNumber: 1,
        title: '"Thanh Tịnh & Tinh Khiết"',
        description: 'Thư giãn và tận hưởng Không gian bình yên nơi nghỉ dưỡng',
        image: '/uploads/4URE___HUE___Day_1.jpg',
        activities: [
          'Tham quan Chùa Đức Sơn thanh tịnh, cảm nhận Mái ấm Yêu thương & Cho đi',
          'Cải thiện sự Dẻo dai, Linh hoạt của Cơ thể, đồng thời tái tạo Năng lượng qua Trải nghiệm Yoga',
          'Dành những Khoảng lặng cho chính mình để tìm lại Bình an Tâm trí qua Thiền định buổi tối'
        ],
        transport: 'Xe du lịch',
        transportAndCulinary: [
          'Xe du lịch'
        ],
        attractions: []
      },
      {
        day: 2,
        dayNumber: 2,
        title: 'Kết nối',
        description: 'Cảm nhận Giá trị Bảo tồn',
        image: '/uploads/4URE___HUE___Day_2.jpg',
        activities: [
          'Đón Ngày mới tràn đầy Năng lượng với Thiền Tĩnh lặng',
          'Cảm nhận bầu Không khí xanh mát khi đạp xe quanh Làng Kim Long',
          'Khám phá "Nhà Vườn", Không gian Kiến trúc độc đáo, đời sống Gia đình đặc trưng của Huế vẫn còn tồn tại',
          'Trải nghiệm Thở & Thiền giúp ngủ SÂU, cảm nhận Giá trị Sức khỏe KHÔNG NGỜ TỚI chỉ qua Hít thở, Thiền định & Thư giãn'
        ],
        transport: 'Xe du lịch',
        transportAndCulinary: [
          'Xe du lịch'
        ],
        attractions: []
      },
      {
        day: 3,
        dayNumber: 3,
        title: 'Trải nghiệm',
        description: 'Khám phá Nghệ thuật Việt Nam',
        image: '/uploads/4URE___HUE___Day_3.jpg',
        activities: [
          'Đón ngày mới bình an với Thiền buổi sáng',
          'Khám phá Nghệ thuật đậm chất Việt qua Trải nghiệm làm Bánh tráng'
        ],
        transport: 'Xe du lịch',
        transportAndCulinary: [
          'Xe du lịch'
        ],
        attractions: []
      },
      {
        day: 4,
        dayNumber: 4,
        title: 'Tìm hiểu về "Sống Không Bệnh"',
        description: 'Trở về Tinh thần tươi mới',
        image: '/uploads/4URE___HUE___Day_4.jpg',
        activities: [
          'Đón Bình minh yên tĩnh với Thiền hành',
          'Tham gia chia sẻ về Chủ đề "Làm sao xây dựng Thói quen Sống Không Bệnh?"',
          'Tiếp tục trải nghiệm Yoga để tăng Dẻo dai, Linh hoạt của Cơ thể, giải tỏa Stress, sạc lại Năng lượng cho ngày mới'
        ],
        transport: 'Xe du lịch',
        transportAndCulinary: [
          'Xe du lịch'
        ],
        attractions: []
      }
    ],
    gallery: [
      '/uploads/4URE___HUE___Highlight_1.jpg',
      '/uploads/4URE___HUE___Highlight_2.jpg',
      '/uploads/4URE___HUE___Highlight_3.jpg'
    ],
    faq: [],
    reviews: [],
    tourDepartureDates: [
      {
        id: 45,
        tourId: 17,
        departureDate: 'Wed Nov 04 2026 19:00:00 GMT-0500 (Eastern Standard Time)',
        availableSeats: 0,
        status: 'available',
        priceOverride: null,
        orderIndex: 0
      }
    ],
    tourItineraries: [
      {
        id: 90,
        tourId: 17,
        dayNumber: 1,
        title: '"Thanh Tịnh & Tinh Khiết"',
        description: 'Thư giãn và tận hưởng Không gian bình yên nơi nghỉ dưỡng',
        image: '/uploads/4URE___HUE___Day_1.jpg',
        activities: '["Tham quan Chùa Đức Sơn thanh tịnh, cảm nhận Mái ấm Yêu thương & Cho đi","Cải thiện sự Dẻo dai, Linh hoạt của Cơ thể, đồng thời tái tạo Năng lượng qua Trải nghiệm Yoga","Dành những Khoảng lặng cho chính mình để tìm lại Bình an Tâm trí qua Thiền định buổi tối"]',
        transport: 'Xe du lịch',
        attractions: '',
        orderIndex: 0
      },
      {
        id: 91,
        tourId: 17,
        dayNumber: 2,
        title: 'Kết nối',
        description: 'Cảm nhận Giá trị Bảo tồn',
        image: '/uploads/4URE___HUE___Day_2.jpg',
        activities: '["Đón Ngày mới tràn đầy Năng lượng với Thiền Tĩnh lặng","Cảm nhận bầu Không khí xanh mát khi đạp xe quanh Làng Kim Long","Khám phá \\"Nhà Vườn\\", Không gian Kiến trúc độc đáo, đời sống Gia đình đặc trưng của Huế vẫn còn tồn tại","Trải nghiệm Thở & Thiền giúp ngủ SÂU, cảm nhận Giá trị Sức khỏe KHÔNG NGỜ TỚI chỉ qua Hít thở, Thiền định & Thư giãn"]',
        transport: 'Xe du lịch',
        attractions: '',
        orderIndex: 1
      },
      {
        id: 92,
        tourId: 17,
        dayNumber: 3,
        title: 'Trải nghiệm',
        description: 'Khám phá Nghệ thuật Việt Nam',
        image: '/uploads/4URE___HUE___Day_3.jpg',
        activities: '["Đón ngày mới bình an với Thiền buổi sáng","Khám phá Nghệ thuật đậm chất Việt qua Trải nghiệm làm Bánh tráng"]',
        transport: 'Xe du lịch',
        attractions: '',
        orderIndex: 2
      },
      {
        id: 93,
        tourId: 17,
        dayNumber: 4,
        title: 'Tìm hiểu về "Sống Không Bệnh"',
        description: 'Trở về Tinh thần tươi mới',
        image: '/uploads/4URE___HUE___Day_4.jpg',
        activities: '["Đón Bình minh yên tĩnh với Thiền hành","Tham gia chia sẻ về Chủ đề \\"Làm sao xây dựng Thói quen Sống Không Bệnh?\\"","Tiếp tục trải nghiệm Yoga để tăng Dẻo dai, Linh hoạt của Cơ thể, giải tỏa Stress, sạc lại Năng lượng cho ngày mới"]',
        transport: 'Xe du lịch',
        attractions: '',
        orderIndex: 3
      }
    ],
    tourCategoryMappings: [
      {
        id: 192,
        tourId: 17,
        categorySlug: 'chua-lanh'
      },
      {
        id: 193,
        tourId: 17,
        categorySlug: 'bao-ton'
      },
      {
        id: 194,
        tourId: 17,
        categorySlug: 'doc-quyen'
      },
      {
        id: 195,
        tourId: 17,
        categorySlug: 'hot'
      },
      {
        id: 196,
        tourId: 17,
        categorySlug: 'trung'
      }
    ],
    tourImages: [
      {
        id: 83,
        tourId: 17,
        imageUrl: '/uploads/4URE___HUE___Highlight_1.jpg',
        caption: '',
        orderIndex: 0
      },
      {
        id: 84,
        tourId: 17,
        imageUrl: '/uploads/4URE___HUE___Highlight_2.jpg',
        caption: '',
        orderIndex: 1
      },
      {
        id: 85,
        tourId: 17,
        imageUrl: '/uploads/4URE___HUE___Highlight_3.jpg',
        caption: '',
        orderIndex: 2
      }
    ],
    group3Price: 14863000,
    group5Price: 14252000,
    listPrice: 20360000
  },
  {
    id: 18,
    slug: 'lam-chu-stress-da-lat-5n4d-retreat',
    title: '"Làm CHỦ Stress"',
    subtitle: 'Vì sao mình luôn cảm thấy Áp lực? Tham gia NGAY Tour Retreat Sức Khỏe Toàn Diện',
    category: 'chua-lanh',
    country: 'Việt Nam',
    city: 'Đà Lạt',
    duration: '5 ngày 4 đêm',
    durationDays: 5,
    airline: 'Không áp dụng',
    hotel: 'Nhà Sức Khỏe Sivananda Yoga',
    transportation: 'Không áp dụng',
    price: 10881000,
    originalPrice: 11970000,
    childPrice: 10881000,
    infantPrice: 5441000,
    cost: 7117438,
    marginPercent: 40.5,
    promotionPercent: 9.1,
    group3Percent: 0,
    group5Percent: 0,
    childDiscountPercent: 0,
    infantDiscountPercent: 50,
    vatPercent: 8,
    adultNote: 'Áp dụng từ 12 tuổi trở lên, tiêu chuẩn phòng 2 khách',
    childNote: 'Từ 6 đến dưới 12 tuổi',
    infantNote: 'Dưới 6 tuổi',
    bookingPolicyNotes: '-',
    rating: 5,
    reviewsCount: 0,
    isHot: false,
    isFeatured: false,
    isExclusive: false,
    isCustomer: false,
    isAdminApproved: true,
    seriesType: null,
    heroImage: '/uploads/4URe___DLI___Hero.jpg',
    destinationMap: 'https://maps.app.goo.gl/AU1A5qju3FDKy5BT8',
    landingSectionTemplateId: 'lam-chu-stress-da-lat-5n4d-retreat',
    highlights: [
      'Nhằm giúp mỗi Bản thân có thể tự mình chăm sóc và cải thiện Sức khỏe, Retreat này đã ra đời',
      'Được tư vấn toàn diện về các Vấn đề Sức khỏe đang gặp, từ đó từng bước hình thành Lối sống Khỏe mạnh hơn, Hạnh phúc hơn',
      'Là CƠ HỘI rất tốt để nhìn lại Bản thân, trở thành Phiên bản tốt hơn của chính Ta'
    ],
    included: [
      'Phòng nghỉ dưỡng yên bình tại Sivananda Yoga Resort',
      'Luôn có sẵn Khăn lạnh, Nước khoáng đóng chai',
      'Các Bữa ăn thanh đạm đầy đủ Dinh dưỡng',
      'Workshop',
      'Vé vào cổng tại các điểm Tham quan',
      'Giảng viên thuộc Sivananda Yoga chia sẻ về các Chủ đề Sức khỏe',
      'Bảo hiểm Du lịch cho Hành trình'
    ],
    excluded: [
      'Chi phí Cá nhân ngoài Chương trình',
      '8% Thuế'
    ],
    notes: [],
    travelTips: [],
    categories: [
      'chua-lanh',
      'doc-quyen',
      'hot',
      'trung'
    ],
    departureDates: [
      'Tue Nov 10 2026 19:00:00 GMT-0500 (Eastern Standard Time)'
    ],
    itinerary: [
      {
        day: 1,
        dayNumber: 1,
        title: 'Khởi hành đến Đà Lạt',
        description: 'Cảm nhận Nét đẹp Thiên nhiên nơi Thành phố ngàn hoa',
        image: '/uploads/4URe___DLI___Day_1.jpg',
        activities: [
          'Hít hà Bầu không khí trong lành của Đà Lạt qua Trải nghiệm Trekking, tham quan Khu Du lịch Nam Qua',
          'Đến Nhà Sức Khỏe Sivananda Yoga, bắt đầu Trải nghiệm tìm về niềm Hạnh phúc và Bình an trong Tâm trí'
        ],
        transport: 'Xe 29 chỗ',
        transportAndCulinary: [
          'Xe 29 chỗ'
        ],
        attractions: [
          'Khu Du lịch Nam Qua',
          'Nhà Sức khỏe Sivananda Yoga'
        ]
      },
      {
        day: 2,
        dayNumber: 2,
        title: 'Sinh hoạt tại Sivanada Yoga',
        description: 'Những ngày Bình yên',
        image: '/uploads/4URe___DLI___Day_2.jpg',
        activities: [
          'Đón Bình minh tràn đầy Năng lượng với trải nghiệm Thiền Tĩnh lặng, Yoga & Hít thở',
          'Lan tỏa Giá trị Yêu thương & Cho đi qua Karma Yoga, Phục vụ vô vị lợi',
          'Tham gia Workshop chia sẻ về "Làm CHỦ Stress"',
          'Trải nghiệm mới về Yoga Âm thanh, cho Tâm trí được tinh khiết, phúc lạc và hài hòa'
        ],
        transport: 'Không có',
        transportAndCulinary: [
          'Không có'
        ],
        attractions: [
          'Nhà Sức khỏe Sivananda Yoga'
        ]
      },
      {
        day: 3,
        dayNumber: 3,
        title: 'Sinh hoạt tại Sivanada Yoga',
        description: 'Những ngày Bình yên',
        image: '/uploads/4URe___DLI___Day_3.jpg',
        activities: [
          'Đón Bình minh tràn đầy Năng lượng với trải nghiệm Thiền Tĩnh lặng, Yoga & Hít thở',
          'Lan tỏa Giá trị Yêu thương & Cho đi qua Karma Yoga, Phục vụ vô vị lợi',
          'Tham gia Workshop chia sẻ về "Làm CHỦ Stress"',
          'Trải nghiệm mới về Yoga Âm thanh, cho Tâm trí được tinh khiết, phúc lạc và hài hòa'
        ],
        transport: 'Không có',
        transportAndCulinary: [
          'Không có'
        ],
        attractions: [
          'Nhà Sức khỏe Sivananda Yoga'
        ]
      },
      {
        day: 4,
        dayNumber: 4,
        title: 'Sinh hoạt tại Sivanada Yoga',
        description: 'Những ngày Bình yên',
        image: '/uploads/1789484423352_4URe___DLI___Day_4.jpg',
        activities: [
          'Đón Bình minh tràn đầy Năng lượng với trải nghiệm Thiền Tĩnh lặng, Yoga & Hít thở',
          'Lan tỏa Giá trị Yêu thương & Cho đi qua Karma Yoga, Phục vụ vô vị lợi',
          'Tham gia Workshop chia sẻ về "Làm CHỦ Stress"',
          'Trải nghiệm mới về Yoga Âm thanh, cho Tâm trí được tinh khiết, phúc lạc và hài hòa'
        ],
        transport: 'Không có',
        transportAndCulinary: [
          'Không có'
        ],
        attractions: [
          'Nhà Sức khỏe Sivananda Yoga'
        ]
      },
      {
        day: 5,
        dayNumber: 5,
        title: 'Trở về',
        description: 'Trở về "Sống Không Bệnh"',
        image: '/uploads/4URe___DLI___Day_5.jpg',
        activities: [
          'Đón ngày mới Bình an với trải nghiệm Thiền hành',
          'Sạc lại Năng lượng với Yoga & Hít thở'
        ],
        transport: 'Không có',
        transportAndCulinary: [
          'Không có'
        ],
        attractions: [
          'Nhà Sức khỏe Sivananda Yoga'
        ]
      }
    ],
    gallery: [
      '/uploads/4URe___DLI___Highlight_1.jpg',
      '/uploads/4URe___DLI___Highlight_3.jpg'
    ],
    faq: [],
    reviews: [],
    tourDepartureDates: [
      {
        id: 47,
        tourId: 18,
        departureDate: 'Tue Nov 10 2026 19:00:00 GMT-0500 (Eastern Standard Time)',
        availableSeats: 0,
        status: 'available',
        priceOverride: null,
        orderIndex: 0
      }
    ],
    tourItineraries: [
      {
        id: 99,
        tourId: 18,
        dayNumber: 1,
        title: 'Khởi hành đến Đà Lạt',
        description: 'Cảm nhận Nét đẹp Thiên nhiên nơi Thành phố ngàn hoa',
        image: '/uploads/4URe___DLI___Day_1.jpg',
        activities: '["Hít hà Bầu không khí trong lành của Đà Lạt qua Trải nghiệm Trekking, tham quan Khu Du lịch Nam Qua","Đến Nhà Sức Khỏe Sivananda Yoga, bắt đầu Trải nghiệm tìm về niềm Hạnh phúc và Bình an trong Tâm trí"]',
        transport: 'Xe 29 chỗ',
        attractions: 'Khu Du lịch Nam Qua,Nhà Sức khỏe Sivananda Yoga',
        orderIndex: 0
      },
      {
        id: 100,
        tourId: 18,
        dayNumber: 2,
        title: 'Sinh hoạt tại Sivanada Yoga',
        description: 'Những ngày Bình yên',
        image: '/uploads/4URe___DLI___Day_2.jpg',
        activities: '["Đón Bình minh tràn đầy Năng lượng với trải nghiệm Thiền Tĩnh lặng, Yoga & Hít thở","Lan tỏa Giá trị Yêu thương & Cho đi qua Karma Yoga, Phục vụ vô vị lợi","Tham gia Workshop chia sẻ về \\"Làm CHỦ Stress\\"","Trải nghiệm mới về Yoga Âm thanh, cho Tâm trí được tinh khiết, phúc lạc và hài hòa"]',
        transport: 'Không có',
        attractions: 'Nhà Sức khỏe Sivananda Yoga',
        orderIndex: 1
      },
      {
        id: 101,
        tourId: 18,
        dayNumber: 3,
        title: 'Sinh hoạt tại Sivanada Yoga',
        description: 'Những ngày Bình yên',
        image: '/uploads/4URe___DLI___Day_3.jpg',
        activities: '["Đón Bình minh tràn đầy Năng lượng với trải nghiệm Thiền Tĩnh lặng, Yoga & Hít thở","Lan tỏa Giá trị Yêu thương & Cho đi qua Karma Yoga, Phục vụ vô vị lợi","Tham gia Workshop chia sẻ về \\"Làm CHỦ Stress\\"","Trải nghiệm mới về Yoga Âm thanh, cho Tâm trí được tinh khiết, phúc lạc và hài hòa"]',
        transport: 'Không có',
        attractions: 'Nhà Sức khỏe Sivananda Yoga',
        orderIndex: 2
      },
      {
        id: 102,
        tourId: 18,
        dayNumber: 4,
        title: 'Sinh hoạt tại Sivanada Yoga',
        description: 'Những ngày Bình yên',
        image: '/uploads/1789484423352_4URe___DLI___Day_4.jpg',
        activities: '["Đón Bình minh tràn đầy Năng lượng với trải nghiệm Thiền Tĩnh lặng, Yoga & Hít thở","Lan tỏa Giá trị Yêu thương & Cho đi qua Karma Yoga, Phục vụ vô vị lợi","Tham gia Workshop chia sẻ về \\"Làm CHỦ Stress\\"","Trải nghiệm mới về Yoga Âm thanh, cho Tâm trí được tinh khiết, phúc lạc và hài hòa"]',
        transport: 'Không có',
        attractions: 'Nhà Sức khỏe Sivananda Yoga',
        orderIndex: 3
      },
      {
        id: 103,
        tourId: 18,
        dayNumber: 5,
        title: 'Trở về',
        description: 'Trở về "Sống Không Bệnh"',
        image: '/uploads/4URe___DLI___Day_5.jpg',
        activities: '["Đón ngày mới Bình an với trải nghiệm Thiền hành","Sạc lại Năng lượng với Yoga & Hít thở"]',
        transport: 'Không có',
        attractions: 'Nhà Sức khỏe Sivananda Yoga',
        orderIndex: 4
      }
    ],
    tourCategoryMappings: [
      {
        id: 201,
        tourId: 18,
        categorySlug: 'chua-lanh'
      },
      {
        id: 202,
        tourId: 18,
        categorySlug: 'doc-quyen'
      },
      {
        id: 203,
        tourId: 18,
        categorySlug: 'hot'
      },
      {
        id: 204,
        tourId: 18,
        categorySlug: 'trung'
      }
    ],
    tourImages: [
      {
        id: 86,
        tourId: 18,
        imageUrl: '/uploads/4URe___DLI___Highlight_1.jpg',
        caption: '',
        orderIndex: 0
      },
      {
        id: 87,
        tourId: 18,
        imageUrl: '/uploads/4URe___DLI___Highlight_3.jpg',
        caption: '',
        orderIndex: 1
      }
    ],
    group3Price: 11970000,
    group5Price: 11970000,
    listPrice: 11970000
  }
];

// --------------------------------------------------------------------------
// 2. LUXURY PRODUCTS (KOLLECTION MERCHANDISE)
// --------------------------------------------------------------------------
export const MOCK_PRODUCTS = [
  {
    id: 17,
    slug: 'toa-cu-ngoi-thien',
    title: 'Tọa cụ ngồi Thiền',
    name: 'Tọa cụ ngồi Thiền',
    subtitle: 'Trợ thủ ĐẮC LỰC',
    category: '"Bạn đồng hành" trong Retreat',
    sku: '4URe-KLT-005',
    price: 350000,
    originalPrice: 450000,
    stock: 50,
    heroImage: '/uploads/4URe___Toa_cu_ngoi_Thien___Hero.png',
    image: '/uploads/4URe___Toa_cu_ngoi_Thien___Hero.png',
    description: 'Tọa cụ được làm từ Chất liệu ĐÀN HỒI, ÊM ÁI; thiết kế TIỆN LỢI thành 2 Mảnh có thể gấp lại sau khi sử dụng. Sử dụng Tọa cụ khi ngồi Thiền giúp GIẢM Áp lực lên Cột sống, GIẢM căng Cơ đùi và Cơ chân. Đây là một người Bạn Đồng hành cùng Thiền sinh tận hưởng việc Thiền định SÂU và LÂU mà không phải lo chịu đựng những Cơn đau Cơ, đau Chân kéo dài.',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 0,
    gallery: [
      'https://www.dropbox.com/scl/fo/bj6b9ctaazj8m047rwduk/AMMLfOaa3FLK3S1zy64x9q8?rlkey=sd6jllrhmqacigd3cktd1tmvz&dl=0'
    ]
  },
  {
    id: 16,
    slug: 'ao-thun-yoga',
    title: 'Áo thun Yoga',
    name: 'Áo thun Yoga',
    subtitle: 'THOẢI MÁI, NHẸ NHÀNG cho Cơ thể & Tâm trí',
    category: 'Trang phục',
    sku: '4URe-KLT-004',
    price: 185000,
    originalPrice: 285000,
    stock: 50,
    heroImage: '/uploads/4URe___Ao_thun___Hero.png',
    image: '/uploads/4URe___Ao_thun___Hero.png',
    description: 'Chưa tìm được một Trang phục thích hợp để tập Yoga? Áo thun được thiết kế với Hoạ tiết tối giản, Kiểu dáng phù hợp cho cả Nam và Nữ. Lựa chọn một màu Áo yêu thích với Chất vải Thun THOÁNG MÁT, CO GIÃN và cảm nhận sự Thoải mái, Nhẹ nhàng cho Cơ thể và Tâm trí khi thực hành Yoga hoặc Thiền định.',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 0,
    gallery: [
      'https://www.dropbox.com/scl/fo/ecb53zmo9xbfjoedeg86d/ALDtv929Iwi705mypzv1cZE?rlkey=c8m6dazb8d9afftxtnnen5mpj&dl=0'
    ]
  },
  {
    id: 15,
    slug: 'tui-vai-canvas',
    title: 'Túi vải Canvas',
    name: 'Túi vải Canvas',
    subtitle: 'THÂN THIỆN với Môi trường',
    category: '"Bạn đồng hành" trong Retreat',
    sku: '4URe-KLT-003',
    price: 170000,
    originalPrice: 270000,
    stock: 50,
    heroImage: '/uploads/4URe___Tui_Canvas___Hero.png',
    image: '/uploads/4URe___Tui_Canvas___Hero.png',
    description: 'Túi được làm từ Chất liệu Vải Canvas CHẮC CHẮC với thiết kế TRANG NHÃ. Đây là một Vật dụng TIỆN LỢI, đặc biệt là đối với Chị Em Phụ nữ vì phù hợp cho nhiều Hoạt động khác nhau trong đời sống hàng ngày. Bên cạnh đó, Túi vải có thể tái sử dụng nhiều nên cũng góp phần Bảo vệ Môi trường.',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 0,
    gallery: [
      'https://www.dropbox.com/scl/fo/p49mt1x9zkmu1mk1yau51/ABCR32q3U8emdHNC7YqOJNQ?rlkey=xjef9my0wut6ztmbxhzt469pc&dl=0'
    ]
  },
  {
    id: 14,
    slug: 'dau-me',
    title: 'Dầu Mè',
    name: 'Dầu Mè',
    subtitle: 'KHỎE ĐẸP mỗi ngày',
    category: 'Chăm sóc Sức khỏe',
    sku: '4URe-KLT-002',
    price: 70000,
    originalPrice: 170000,
    stock: 50,
    heroImage: '/uploads/4URe___Dau_me___Hero.png',
    image: '/uploads/4URe___Dau_me___Hero.png',
    description: 'Công dụng thải độc, chữa lành cho Cơ thể, có thể dùng để xoa bóp giúp giảm các Cơn đau Cơ, Xương khớp,… Hãy làm nóng Dầu Mè và lấy một lượng vừa đủ, sau đó thoa đều và xoa bóp vào các vùng Cơ đang mỏi, hoặc đau nhức sẽ giúp Máu huyết lưu thông và giảm đau một cách HIỆU QUẢ.',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    rating: 5,
    reviewsCount: 0,
    gallery: [
      'https://www.dropbox.com/scl/fo/4qgzgjgl9o2o4k50xr1jx/AOgwJV9f2vGJVVSIbJlFAls?rlkey=r8hhkupnqq69wrdubc1b3vgnx&dl=0'
    ]
  },
  {
    id: 13,
    slug: 'goi-mat',
    title: 'Gối Mắt',
    name: 'Gối Mắt',
    subtitle: 'Xua tan Căng thẳng',
    category: '"Bạn đồng hành" trong Retreat',
    sku: '4URe-KLT-001',
    price: 200000,
    originalPrice: 300000,
    stock: 50,
    heroImage: '/uploads/4URe___Goi_mat___Hero.png',
    image: '/uploads/4URe___Goi_mat___Hero.png',
    description: 'Bao gồm Nguyên liệu từ Thiên nhiên là Hoa Oải hương khô và Vỏ Đậu xanh. Hãy chườm Gối đã được làm ấm lên Mắt và cảm nhận sự Thư giãn TUYỆT VỜI cho Mắt và cho toàn bộ Cơ thể.',
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    rating: 5,
    reviewsCount: 0,
    gallery: [
      'https://www.dropbox.com/scl/fo/2uoycdkolibtwibm03agd/AAwnfOhmQv13pmaiT8anTGQ?rlkey=fhl8nue0hc4y8ftivt7ox639m&dl=0'
    ]
  }
];

// --------------------------------------------------------------------------
// 3. MENU CATEGORIES
// --------------------------------------------------------------------------
export const MOCK_MENU_CATEGORIES = [
  // 1. Fixed Top Badges (Hàng trên menu cố định)
  { id: 1, name: 'Retreats ĐỘC QUYỀN', slug: 'doc-quyen', parentSlug: null, menuType: 'fixed_top', orderIndex: 1, icon: 'Crown', color: '#00ff15ff', iconColor: '#facc15' },
  { id: 2, name: 'Sắp Khởi hành', slug: 'sap-khoi-hanh', parentSlug: null, menuType: 'fixed_top', orderIndex: 2, icon: 'none', color: '#ffffff', iconColor: '' },
  { id: 3, name: 'KHÔNG THỂ BỎ LỠ', slug: 'khong-the-bo-lo', parentSlug: null, menuType: 'fixed_top', orderIndex: 3, icon: 'none', color: '#ffffff', iconColor: '' },
  { id: 4, name: 'Ưu đãi GIỜ CHÓT', slug: 'uu-dai-gio-chot', parentSlug: null, menuType: 'fixed_top', orderIndex: 4, icon: 'none', color: '#ffffff', iconColor: '' },

  // 2. Main Mega Menu Categories (Hàng dưới)
  { id: 5, name: 'Series Retreat', slug: 'series-retreat', parentSlug: null, menuType: 'mega_menu', orderIndex: 1, icon: 'none', color: '#ffffff', iconColor: '' },
  { id: 6, name: 'Khám Phá Điểm Đến', slug: 'diem-den', parentSlug: null, menuType: 'mega_menu', orderIndex: 2, icon: 'none', color: '#ffffff', iconColor: '' },
  { id: 7, name: '101 Điều Hay', slug: 'dieu-hay', parentSlug: null, menuType: 'mega_menu', orderIndex: 3, icon: 'none', color: '#ffffff', iconColor: '' },
  { id: 8, name: 'Kollection 4U', slug: 'kollection-4u', parentSlug: null, menuType: 'mega_menu', orderIndex: 4, icon: 'none', color: '#ffffff', iconColor: '' },
  { id: 9, name: 'Vì Sao Chọn 4U?', slug: 'vi-sao-chon-4u', parentSlug: null, menuType: 'mega_menu', orderIndex: 5, icon: 'none', color: '#ffffff', iconColor: '' },

  // 3. Submenu Items for Series Retreat
  { id: 10, name: 'Retreat Chữa Lành', slug: 'chua-lanh', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 1, icon: 'none', color: '#4ade80', iconColor: '', description: 'Chữa lành Thân - Tâm - Trí giữa thiên nhiên' },
  { id: 11, name: 'Retreat Bảo Tồn', slug: 'bao-ton', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 2, icon: 'none', color: '#38bdf8', iconColor: '', description: 'Bảo tồn rừng nguyên sinh & hệ sinh thái' },
  { id: 12, name: 'Retreat Thiên Nhiên', slug: 'thien-nhien', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 3, icon: 'none', color: '#facc15', iconColor: '', description: 'Hòa mình cùng non xanh nước biếc' },
  { id: 13, name: 'Retreat Thiện Nguyện', slug: 'thien-nguyen', parentSlug: 'series-retreat', menuType: 'mega_menu', orderIndex: 4, icon: 'none', color: '#f472b6', iconColor: '', description: 'Gắn kết yêu thương và sẻ chia cộng đồng' },

  // 4. Submenu Items for Khám Phá Điểm Đến
  { id: 14, name: 'Miền Bắc', slug: 'bac', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 1, icon: 'none', color: '#4ade80', iconColor: '', description: 'Vẻ đẹp hùng vĩ ngút ngàn non nước miền Bắc' },
  { id: 15, name: 'Miền Trung', slug: 'trung', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 2, icon: 'none', color: '#38bdf8', iconColor: '', description: 'Di sản cổ kính và bãi biển nguyên sơ miền Trung' },
  { id: 16, name: 'Miền Nam', slug: 'nam', parentSlug: 'diem-den', menuType: 'mega_menu', orderIndex: 3, icon: 'none', color: '#facc15', iconColor: '', description: 'Miền sông nước thanh bình & đảo ngọc phương Nam' },

  // 5. Submenu Items for 101 Điều Hay
  { id: 17, name: 'Cẩm Nang Tĩnh Dưỡng & Thiền Trà', slug: 'cam-nang-tinh-duong', parentSlug: 'dieu-hay', menuType: 'mega_menu', orderIndex: 1, icon: 'none', color: '#38bdf8', iconColor: '', description: 'Bí quyết phục hồi năng lượng thân tâm' },
  { id: 18, name: 'Bản Đồ Năng Lượng Chữa Lành', slug: 'ban-do-nang-luong', parentSlug: 'dieu-hay', menuType: 'mega_menu', orderIndex: 2, icon: 'none', color: '#facc15', iconColor: '', description: 'Khám phá các tọa độ địa linh Việt Nam' },
  { id: 19, name: 'Câu Chuyện Hành Trình Khách Hàng', slug: 'cau-chuyen-khach-hang', parentSlug: 'dieu-hay', menuType: 'mega_menu', orderIndex: 3, icon: 'none', color: '#f472b6', iconColor: '', description: 'Chia sẻ chân thực từ những chuyến đi' },

  // 6. Submenu Items for Kollection 4U
  { id: 20, name: '"Bạn đồng hành" trong Retreat', slug: 'goi-mat', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 1, icon: 'none', color: '#4ade80', iconColor: '', description: 'Vật dụng thiết yếu, tọa cụ, túi canvas đồng hành' },
  { id: 21, name: 'Chăm sóc Sức khỏe', slug: 'dau-me', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 2, icon: 'none', color: '#facc15', iconColor: '', description: 'Liệu pháp thảo mộc, dầu mè và chăm sóc thân tâm' },
  { id: 22, name: 'Trang phục', slug: 'ao-thun-yoga', parentSlug: 'kollection-4u', menuType: 'mega_menu', orderIndex: 3, icon: 'none', color: '#38bdf8', iconColor: '', description: 'Trang phục yoga & thiền định thoáng mát tự nhiên' },

  // 7. Submenu Items for Vì Sao Chọn 4U?
  { id: 24, name: 'Triết Lý Thiết Kế Hành Trình', slug: 'triet-ly-thiet-ke', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 1, icon: 'none', color: '#e5c158', iconColor: '', description: 'Định nghĩa chuẩn mực nghỉ dưỡng thượng lưu' },
  { id: 25, name: 'Đội Ngũ Chuyên Gia & Trợ Lý Riêng', slug: 'doi-ngu-chuyen-gia', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 2, icon: 'none', color: '#4ade80', iconColor: '', description: 'Đồng hành tận tâm trên mọi cung đường' },
  { id: 26, name: 'Cam Kết Bảo Tồn & Bền Vững', slug: 'cam-ket-ben-vung', parentSlug: 'vi-sao-chon-4u', menuType: 'mega_menu', orderIndex: 3, icon: 'none', color: '#38bdf8', iconColor: '', description: 'Chung tay gìn giữ thiên nhiên và di sản' }
];

// --------------------------------------------------------------------------
// 4. LOCAL STORAGE MOCK DATA PERSISTENCE HELPERS
// --------------------------------------------------------------------------
const STORAGE_KEYS = {
  TOURS: 'mock_4u_tours_v3',
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
      tourTitle: 'Khoảng Dừng',
      tourSlug: 'khoang-dung-chau-doc-3n2d-retreat',
      customerName: 'Trần Thị Mai',
      phone: '0988776655',
      email: 'mai.tran@example.com',
      numberOfAdults: 2,
      numberOfChildren: 0,
      totalPrice: 13980000,
      departureDate: '23/10/2026',
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

