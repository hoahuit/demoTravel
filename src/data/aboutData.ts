export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  email: string;
}

export const ABOUT_DATA = {
  companyName: '4U Tours & Retreats International',
  tagline: 'Kiến Tạo Những Hành Trình Phục Hồi Thân Tâm & Nghỉ Dưỡng Xa Xỉ',
  story: 'Được thành lập từ năm 2012, 4U Tours đã không ngừng định hình lại chuẩn mực của ngành lữ hành thượng lưu tại Việt Nam và Đông Nam Á. Chúng tôi thiết kế những hành trình trở về với chính mình — nơi mỗi du khách tìm lại sự cân bằng và phục hồi thân tâm.',
  vision: 'Trở thành tập đoàn lữ hành nghỉ dưỡng & Wellness Retreat biểu tượng Châu Á.',
  mission: 'Phục vụ du khách bằng lòng mến khách omotenashi chân thành nhất, tôn trọng di sản thiên nhiên bản địa.',
  coreValues: [
    { title: 'Tận Tâm (Omotenashi)', description: 'Chăm sóc chu đáo từng chi tiết nhỏ nhất như phụng sự người thân.' },
    { title: 'Độc Bản (Exclusivity)', description: 'Thiết kế hành trình riêng biệt không trùng lặp cho từng vị khách.' },
    { title: 'Bền Vững (Sustainability)', description: 'Bảo tồn sinh thái thiên nhiên và tôn vinh văn hóa địa phương.' }
  ],
  stats: [
    { label: 'Du Khách Phục Hồi Thân Tâm', value: '45.000+' },
    { label: 'Hành Trình Retreat Độc Bản', value: '180+' },
    { label: 'Đánh Giá Hài Lòng Tuyệt Đối', value: '99.8%' }
  ],
  timeline: [
    { year: '2012', title: 'Thành Lập 4U Tours', description: 'Khởi đầu với các hành trình trải nghiệm di sản văn hóa cao cấp.' },
    { year: '2020', title: 'Tiên Phong Ra Mắt 4U Retreat', description: 'Định hình phân khúc Wellness Retreat phục hồi Thân - Tâm - Trí giữa thiên nhiên.' },
    { year: '2026', title: 'Vươn Tầm Tập Đoàn Thượng Lưu', description: 'Ra mắt bộ sưu tập hành trình xa xỉ trên khắp 5 châu lục.' }
  ],
  awards: [
    { year: '2025', title: 'Best Wellness Retreat Operator Asia', organization: 'World Luxury Travel Awards' },
    { year: '2024', title: 'Top 10 Vietnam Luxury Travel Brand', organization: 'Vietnam Tourism Association' },
    { year: '2023', title: 'Excellence in Sustainable Eco-Tourism', organization: 'Asia Eco Travel Forum' }
  ],
  offices: [
    { city: 'TP. Hồ Chí Minh (Trụ Sở Chính)', address: 'Tòa nhà Bitexco Financial Tower, Q.1', phone: '+84 28 7300 4U4U', email: 'vip@4utours.vn' },
    { city: 'Hà Nội', address: 'Tòa nhà Pacific Place, Q. Hoàn Kiếm', phone: '+84 24 7300 4U4U', email: 'hanoi@4utours.vn' },
    { city: 'Singapore Regional Office', address: 'Marina Bay Financial Centre Tower 1', phone: '+65 6800 4U4U', email: 'singapore@4utours.com' }
  ]
};
