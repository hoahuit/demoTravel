export interface DestinationAttraction {
  name: string;
  image: string;
  description: string;
}

export interface Destination {
  id?: number;
  slug: string;
  name: string;
  country: string;
  region: string;
  heroImage: string;
  overview: string;
  tags?: string[];
  history?: string;
  bestTime?: string;
  currency?: string;
  language?: string;
  visaInfo?: string;
  transportation?: string;
  popularAttractions?: DestinationAttraction[];
  weather?: string;
  food?: string[];
  shopping?: string[];
  culture?: string;
  gallery?: string[];
  tourCount?: number;
}

// 20 CURATED DESTINATIONS (SYNCHRONIZED WITH MS SQL SERVER VIA LOOPBACK 4)
export let DESTINATIONS_DATA: Destination[] = [
  {
    id: 1,
    slug: 'vinh-ha-long',
    name: 'Vịnh Hạ Long',
    country: 'Việt Nam',
    region: 'Đông Bắc Bộ',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1600&auto=format&fit=crop',
    overview: 'Kỳ quan thiên nhiên thế giới với hàng ngàn đảo đá vôi nhấp nhô trên làn nước ngọc bích, nơi lý tưởng cho các hành trình du thuyền tĩnh dưỡng.'
  },
  {
    id: 2,
    slug: 'soc-trang',
    name: 'Sóc Trăng',
    country: 'Việt Nam',
    region: 'Đồng Bằng Sông Cửu Long',
    heroImage: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=85&w=1200&auto=format&fit=crop',
    overview: 'Miền đất an yên với những ngôi chùa Khmer cổ kính hàng trăm năm tuổi mang nét kiến trúc độc đáo và không gian thiền tịnh linh thiêng.'
  },
  {
    id: 3,
    slug: 'tien-giang',
    name: 'Tiền Giang',
    country: 'Việt Nam',
    region: 'Đồng Bằng Sông Cửu Long',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=85&w=1200&auto=format&fit=crop',
    overview: 'Thủ phủ miệt vườn Nam Bộ với những vườn cây trái xanh mướt, kênh rạch rợp bóng dừa nước và nhịp sống chợ nổi bình dị lúc sớm mai.'
  },
  {
    id: 4,
    slug: 'da-lat',
    name: 'Đà Lạt',
    country: 'Việt Nam',
    region: 'Tây Nguyên',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=1200&auto=format&fit=crop',
    overview: 'Thành phố ngàn hoa giữa rừng thông bạt ngàn, khí hậu se lạnh trong lành quanh năm — thánh địa của các khóa thiền và retreat tái tạo năng lượng.'
  },
  {
    id: 5,
    slug: 'yen-tu',
    name: 'Yên Tử',
    country: 'Việt Nam',
    region: 'Đông Bắc Bộ',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=1200&auto=format&fit=crop',
    overview: 'Cái nôi Thiền phái Trúc Lâm Đại Việt, ẩn mình giữa mây ngàn và rừng trúc cổ thụ, mang đến cảm giác thanh tịnh và giải thoát tâm hồn.'
  },
  {
    id: 6,
    slug: 'phu-quoc',
    name: 'Phú Quốc',
    country: 'Việt Nam',
    region: 'Kiên Giang',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1200&auto=format&fit=crop',
    overview: 'Hòn đảo ngọc phía Nam với bờ cát trắng mịn như kem, làn nước trong vắt và những khu nghỉ dưỡng 5 sao tách biệt tuyệt đối.'
  },
  {
    id: 7,
    slug: 'sa-pa',
    name: 'Sa Pa',
    country: 'Việt Nam',
    region: 'Tây Bắc Bộ',
    heroImage: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=85&w=1200&auto=format&fit=crop',
    overview: 'Thung lũng ruộng bậc thang kỳ vĩ dưới chân đỉnh Fansipan, nơi mây bồng bềnh ôm trọn bản làng và những đồi trà cổ thụ ngút ngàn.'
  },
  {
    id: 8,
    slug: 'ninh-binh',
    name: 'Ninh Bình',
    country: 'Việt Nam',
    region: 'Đồng Bằng Sông Hồng',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=85&w=1200&auto=format&fit=crop',
    overview: 'Di sản thế giới kép Tràng An - Tam Cốc với non xanh nước biếc, hang động huyền ảo và không gian thiền tĩnh giữa thung lũng đá vôi.'
  },
  {
    id: 9,
    slug: 'ha-giang',
    name: 'Hà Giang',
    country: 'Việt Nam',
    region: 'Đông Bắc Bộ',
    heroImage: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=85&w=1200&auto=format&fit=crop',
    overview: 'Công viên địa chất toàn cầu Cao nguyên đá Đồng Văn hùng vĩ, dòng sông Nho Quế xanh như ngọc và cung đèo Mã Pí Lèng ngoạn mục.'
  },
  {
    id: 10,
    slug: 'hoi-an',
    name: 'Hội An',
    country: 'Việt Nam',
    region: 'Duyên Hải Nam Trung Bộ',
    heroImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=85&w=1200&auto=format&fit=crop',
    overview: 'Đô thị cổ bên dòng sông Hoài thơ mộng, rực rỡ đèn lồng lung linh và không gian văn hóa di sản mộc mạc lắng đọng thời gian.'
  },
  {
    id: 11,
    slug: 'hue',
    name: 'Cố Đô Huế',
    country: 'Việt Nam',
    region: 'Bắc Trung Bộ',
    heroImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=85&w=1200&auto=format&fit=crop',
    overview: 'Vùng đất kinh kỳ trầm mặc bên dòng sông Hương và núi Ngự, cái nôi của ẩm thực cung đình, trà sen thanh khiết và văn hóa thiền định.'
  },
  {
    id: 12,
    slug: 'con-dao',
    name: 'Côn Đảo',
    country: 'Việt Nam',
    region: 'Bà Rịa - Vũng Tàu',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1200&auto=format&fit=crop',
    overview: 'Quần đảo thiên đường nguyên sơ biệt lập giữa biển khơi, bảo tồn rùa biển quý hiếm và rừng nhiệt đới trù phú đầy linh khí đất trời.'
  },
  {
    id: 13,
    slug: 'vinh-hy',
    name: 'Vịnh Vĩnh Hy',
    country: 'Việt Nam',
    region: 'Ninh Thuận',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=1200&auto=format&fit=crop',
    overview: 'Một trong những vịnh biển đẹp nhất Việt Nam được bao bọc bởi Vườn quốc gia Núi Chúa, nơi tọa lạc resort siêu sang Amanoi đẳng cấp quốc tế.'
  },
  {
    id: 14,
    slug: 'quy-nhon',
    name: 'Quy Nhơn',
    country: 'Việt Nam',
    region: 'Bình Định',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=85&w=1200&auto=format&fit=crop',
    overview: 'Vùng đất biển hoang sơ Eo Gió - Kỳ Co với những vách đá hùng vĩ đón bình minh rực rỡ và những khu nghỉ dưỡng wellness đẳng cấp.'
  },
  {
    id: 15,
    slug: 'phong-nha',
    name: 'Phong Nha - Kẻ Bàng',
    country: 'Việt Nam',
    region: 'Quảng Bình',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1200&auto=format&fit=crop',
    overview: 'Vương quốc hang động thế giới với Sơn Đoòng, động Thiên Đường và những dòng sông ngầm màu xanh ngọc bích kỳ ảo.'
  },
  {
    id: 16,
    slug: 'moc-chau',
    name: 'Mộc Châu',
    country: 'Việt Nam',
    region: 'Tây Bắc Bộ',
    heroImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?q=85&w=1200&auto=format&fit=crop',
    overview: 'Cao nguyên xanh mướt với những đồi chè trái tim bát ngát, rừng mận trắng muốt và không khí cao nguyên se lạnh trong lành.'
  },
  {
    id: 17,
    slug: 'pu-luong',
    name: 'Pù Luông',
    country: 'Việt Nam',
    region: 'Thanh Hóa',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=1200&auto=format&fit=crop',
    overview: 'Khu bảo tồn thiên nhiên hoang sơ với ruộng bậc thang uốn lượn, guồng nước mộc mạc và những eco-resort ẩn mình giữa thung lũng xanh.'
  },
  {
    id: 18,
    slug: 'mai-chau',
    name: 'Mai Châu',
    country: 'Việt Nam',
    region: 'Hòa Bình',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=1200&auto=format&fit=crop',
    overview: 'Thung lũng thanh bình của đồng bào người Thái với nếp nhà sàn xinh xắn, cánh đồng lúa xanh ngút ngàn và âm nhạc cồng chiêng ấm áp.'
  },
  {
    id: 19,
    slug: 'can-tho',
    name: 'Cần Thơ',
    country: 'Việt Nam',
    region: 'Đồng Bằng Sông Cửu Long',
    heroImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=85&w=1200&auto=format&fit=crop',
    overview: 'Tây Đô phồn hoa giữa sông Hậu mênh mông, nổi tiếng với chợ nổi Cái Răng, vườn cây ăn trái sum sê và vẻ đẹp hào sảng của con người phương Nam.'
  },
  {
    id: 20,
    slug: 'buon-ma-thuot',
    name: 'Buôn Ma Thuột',
    country: 'Việt Nam',
    region: 'Đắk Lắk',
    heroImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=85&w=1200&auto=format&fit=crop',
    overview: 'Thủ phủ cà phê đại ngàn với những thác nước Dray Nur hùng vĩ, hồ Lắk phẳng lặng và không gian văn hóa cồng chiêng Tây Nguyên linh thiêng.'
  }
];

export function syncDestinationsDataFromApi(liveDestinations: Destination[]) {
  if (Array.isArray(liveDestinations) && liveDestinations.length > 0) {
    DESTINATIONS_DATA.splice(0, DESTINATIONS_DATA.length, ...liveDestinations);
  }
}
