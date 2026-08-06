export interface DestinationAttraction {
  name: string;
  image: string;
  description: string;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: string;
  heroImage: string;
  overview: string;
  history: string;
  bestTime: string;
  currency: string;
  language: string;
  visaInfo: string;
  transportation: string;
  popularAttractions: DestinationAttraction[];
  weather: string;
  food: string[];
  shopping: string[];
  culture: string;
  gallery: string[];
  tourCount: number;
}

// 3 SAMPLE DESTINATIONS
export const DESTINATIONS_DATA: Destination[] = [
  {
    slug: 'vietnam',
    name: 'Việt Nam',
    country: 'Việt Nam',
    region: 'Đông Nam Á',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=2560&auto=format&fit=crop',
    overview: 'Đất nước hình chữ S xinh đẹp sở hữu muôn vàn di sản thiên nhiên thế giới từ vịnh Hạ Long kỳ vĩ đến ngàn xanh Nam Cát Tiên.',
    history: 'Hơn 4.000 năm văn hiến rực rỡ với kho tàng văn hóa đậm đà bản sắc dân tộc.',
    bestTime: 'Tháng 9 đến tháng 4 năm sau',
    currency: 'VND (Việt Nam Đồng)',
    language: 'Tiếng Việt',
    visaInfo: 'Nội địa — Không cần Visa',
    transportation: 'Xe Limousine VIP, Du Thuyền 5 Star, Máy Bay Nội Địa',
    popularAttractions: [
      { name: 'Vịnh Hạ Long', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop', description: 'Di sản thiên nhiên thế giới ngọc bích.' },
      { name: 'Vườn Quốc Gia Nam Cát Tiên', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop', description: 'Khu dự trữ sinh quyển thế giới hoang sơ.' }
    ],
    weather: 'Nhiệt đới gió mùa, khí hậu phân hóa đa dạng.',
    food: ['Phở Dưỡng Sinh', 'Trà Thảo Mộc', 'Ẩm Thực Farm-to-Table'],
    shopping: ['Cà Phê Thượng Hạng', 'Thủ Công Mỹ Nghệ'],
    culture: 'Văn hóa mến khách, coi trọng thiên nhiên và an yên.',
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=2560&auto=format&fit=crop'
    ],
    tourCount: 15
  },
  {
    slug: 'japan',
    name: 'Nhật Bản',
    country: 'Nhật Bản',
    region: 'Đông Bắc Á',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2560&auto=format&fit=crop',
    overview: 'Xứ sở hoa anh đào nổi tiếng với văn hóa Onsen khoáng nóng chữa lành và lối sống thiền định tối giản.',
    history: 'Nền văn hóa lâu đời kết hợp tinh tế giữa truyền thống và hiện đại.',
    bestTime: 'Tháng 3-5 (Hoa anh đào) & Tháng 10-11 (Lá đỏ)',
    currency: 'JPY (Yên Nhật)',
    language: 'Tiếng Nhật',
    visaInfo: 'Cần Visa — 4U hỗ trợ dịch vụ VIP',
    transportation: 'Tàu điện ngầm Shinkansen, Xe du lịch hạng sang',
    popularAttractions: [
      { name: 'Núi Phú Sĩ', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop', description: 'Biểu tượng thiên nhiên thiêng liêng của Nhật Bản.' }
    ],
    weather: 'Ôn đới 4 mùa rõ rệt.',
    food: ['Sashimi Tươi Ngon', 'Trà Đạo Matcha', 'Mì Ramen'],
    shopping: ['Mỹ Phẩm Nội Địa', 'Trà Đạo Kyoto'],
    culture: 'Nghệ thuật Omotenashi tận tâm chu đáo.',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2560&auto=format&fit=crop'
    ],
    tourCount: 8
  },
  {
    slug: 'switzerland',
    name: 'Thụy Sĩ',
    country: 'Thụy Sĩ',
    region: 'Châu Âu',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=85&w=2560&auto=format&fit=crop',
    overview: 'Trái tim Châu Âu với những ngọn núi tuyết hùng vĩ và các khu nghỉ dưỡng y khoa cao cấp.',
    history: 'Quốc gia trung lập cổ kính nổi tiếng với ngành đồng hồ và ngân hàng.',
    bestTime: 'Tháng 6 đến tháng 9',
    currency: 'CHF (Franc Thụy Sĩ)',
    language: 'Tiếng Đức, Pháp, Ý',
    visaInfo: 'Visa Schengen — 4U hỗ trợ trọn gói',
    transportation: 'Tàu Panorama ngắm cảnh, Xe riêng VIP',
    popularAttractions: [
      { name: 'Đỉnh Jungfraujoch', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop', description: 'Nóc nhà Châu Âu phủ tuyết quanh năm.' }
    ],
    weather: 'Ôn đới mát mẻ.',
    food: ['Phô Mai Fondue', 'Socola Thủ Công'],
    shopping: ['Đồng Hồ Thụy Sĩ'],
    culture: 'Lối sống văn minh, yêu thiên nhiên.',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=85&w=2560&auto=format&fit=crop'
    ],
    tourCount: 5
  }
];
