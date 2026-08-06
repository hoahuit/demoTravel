export interface TravelService {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  iconName: string;
  description: string;
  features: string[];
  processSteps: { step: number; title: string; description: string }[];
  pricingExamples: { title: string; price: string; note: string }[];
  benefits: string[];
  faq: { question: string; answer: string }[];
}

// 3 SAMPLE SERVICES
export const SERVICES_DATA: TravelService[] = [
  {
    id: 's-1',
    slug: 'dich-vu-retreat-tailor-made',
    title: 'Thiết Thiết Kế Chuyến Đi Retreat Tailor-Made (Cá Nhân Hóa 1:1)',
    subtitle: 'Lộ trình chăm sóc Thân - Tâm - Trí thiết kế riêng biệt theo nhu cầu',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop',
    iconName: 'Heart',
    description: '4U Tours cung cấp giải pháp thiết kế tour Retreat cá nhân hóa 1:1 dành riêng cho cá nhân, gia đình hoặc doanh nghiệp.',
    features: [
      'Tư vấn trực tiếp 1:1 cùng chuyên gia chăm sóc thân tâm',
      'Lựa chọn resort 5 sao tĩnh lặng theo sở thích',
      'Thực đơn thực dưỡng dinh dưỡng thiết kế riêng'
    ],
    processSteps: [
      { step: 1, title: 'Khảo Sát Nhu Cầu', description: 'Lắng nghe mong muốn chữa lành & nghỉ dưỡng.' },
      { step: 2, title: 'Lập Lộ Trình 1:1', description: 'Thiết kế lịch trình chi tiết độc bản.' },
      { step: 3, title: 'Trải Nghiệm Thượng Lưu', description: 'Đồng hành & chăm sóc tận tâm suốt chuyến đi.' }
    ],
    pricingExamples: [
      { title: 'Gói Retreat Cá Nhân 3N2Đ', price: 'Từ 12.500.000 VNĐ', note: 'Bao gồm chuyên gia thiền & xe VIP' }
    ],
    benefits: [
      'Sự riêng tư tuyệt đối',
      'Đội ngũ phục vụ chuyên nghiệp 5 sao'
    ],
    faq: [
      { question: 'Có thể thiết kế tour riêng cho gia đình không?', answer: 'Hoàn toàn được, chúng tôi thiết kế lộ trình phù hợp với mọi độ tuổi trong gia đình.' }
    ]
  },
  {
    id: 's-2',
    slug: 'xe-limousine-dua-don-vip',
    title: 'Dịch Vụ Xe Limousine VIP Đưa Đón Tận Nơi',
    subtitle: 'Đưa đón tận nơi xa xỉ, riêng tư tuyệt đối trên mọi hành trình',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=2560&auto=format&fit=crop',
    iconName: 'Compass',
    description: 'Cung cấp các dòng xe Limousine VIP thương gia ghế massage êm ái, WiFi tốc độ cao và nước uống miễn phí.',
    features: [
      'Đội xe Limousine 9 chỗ thương gia đời mới',
      'Tài xế lịch sự, tác phong chuẩn 5 sao',
      'Đưa đón tận nơi từ TP.HCM đi các điểm Retreat'
    ],
    processSteps: [
      { step: 1, title: 'Đặt Xe & Xác Nhận', description: 'Chọn thời gian và địa điểm đón.' },
      { step: 2, title: 'Đón Tận Nơi', description: 'Tài xế đón quý khách đúng giờ.' }
    ],
    pricingExamples: [
      { title: 'Tuyển Limousine Nam Cát Tiên / Lắk', price: 'Từ 1.200.000 VNĐ', note: 'Giá khứ hồi đưa đón tận nơi' }
    ],
    benefits: [
      'Em ái, không say xe',
      'Đúng giờ và riêng tư'
    ],
    faq: [
      { question: 'Xe có ghế massage không?', answer: 'Tất cả các dòng xe Limousine VIP 4U đều trang bị ghế massage cao cấp.' }
    ]
  },
  {
    id: 's-3',
    slug: 'dich-vu-visa-vip',
    title: 'Dịch Vụ Visa VIP Thượng Lưu (Cam Kết Đậu 99.9%)',
    subtitle: 'Thủ tục tối giản, xử lý hồ sơ thần tốc, giao nhận tận nhà miễn phí',
    heroImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=85&w=2560&auto=format&fit=crop',
    iconName: 'ShieldCheck',
    description: '4U Tours cung cấp giải pháp Visa VIP toàn cầu cho các thị trường Schengen, Nhật Bản, Mỹ, Úc với tỷ lệ đậu tuyệt đối.',
    features: [
      'Xử lý hồ sơ cá nhân hóa 1:1',
      'Hỗ trợ lịch hẹn ưu tiên không chờ đợi'
    ],
    processSteps: [
      { step: 1, title: 'Tư Vấn Hồ Sơ', description: 'Phân tích điểm mạnh hồ sơ.' },
      { step: 2, title: 'Nhận Kết Quả Tận Nhà', description: 'Giao passport an toàn tuyệt đối.' }
    ],
    pricingExamples: [
      { title: 'Visa Schengen VIP', price: 'Từ 4.500.000 VNĐ', note: 'Bao gồm trọn gói thủ tục' }
    ],
    benefits: [
      'Tỷ lệ đậu cao 99.9%'
    ],
    faq: [
      { question: 'Thời gian làm Visa bao lâu?', answer: 'Từ 3-7 ngày làm việc.' }
    ]
  }
];
