export interface BlogArticleSection {
  title: string;
  text: string;
  image?: string;
  imageCaption?: string;
  tips?: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug?: string;
  author?: { name: string; role: string; avatar: string };
  authorName?: string;
  authorRole?: string;
  publishedDate: string;
  readTime: string;
  heroImage: string;
  tableOfContents?: string[];
  introduction?: string;
  sections?: BlogArticleSection[];
  travelTips?: string[];
  foodGuide?: string[];
  budgetGuide?: string;
  packingTips?: string[];
  relatedToursSlugs?: string[];
  conclusion?: string;
}

export const INITIAL_BLOGS_DATA: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'cam-nang-tinh-duong',
    title: 'Cẩm Nang Tĩnh Dưỡng & Nghệ Thuật Thiền Trà Giữa Đại Ngàn',
    subtitle: 'Tìm lại sự an yên nguyên bản trong tâm hồn qua từng ngụm trà cổ thụ và thanh âm thiên nhiên nguyên sơ.',
    category: 'Cẩm Nang Tĩnh Dưỡng',
    categorySlug: 'cam-nang-tinh-duong',
    authorName: 'Thiền Sư Minh Đạt & Ban Biên Tập 4U',
    authorRole: 'Master of Mindfulness & Wellness Expert',
    publishedDate: '15/08/2026',
    readTime: '6 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=80',
    tableOfContents: [
      '1. Khởi nguồn của sự tĩnh lặng nội tâm',
      '2. Hương vị Trà Shan Tuyết cổ thụ trăm năm',
      '3. Ba bước thực hành thiền trà mỗi sớm mai',
      '4. Lời kết: Mang bình yên về với đời sống'
    ],
    introduction: 'Giữa nhịp sống hối hả nơi đô thị, một khoảng lặng nhỏ bên tách trà nóng giữa thung lũng sương mai có thể xoa dịu mọi áp lực và tái sinh nguồn năng lượng sáng tạo trong bạn.',
    sections: [
      {
        title: 'Khởi nguồn của sự tĩnh lặng nội tâm',
        text: 'Tĩnh dưỡng không đơn thuần là một chuyến đi nghỉ ngơi thể xác, mà là hành trình quay về kết nối với chính mình. Tại các không gian retreat biệt lập của 4U, từng hơi thở đều được nuôi dưỡng bởi ion âm từ rừng nguyên sinh và không khí tinh khiết.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Khoảnh khắc tĩnh tâm đón ánh bình minh bên thung lũng'
      },
      {
        title: 'Hương vị Trà Shan Tuyết cổ thụ trăm năm',
        text: 'Được thu hái từ những cây trà cổ thụ hàng trăm năm tuổi trên đỉnh núi cao Tây Bắc quanh năm sương phủ, mỗi búp trà đọng trọn tinh hoa của đất trời. Vị chát dịu đầu lưỡi tan dần thành vị ngọt hậu sâu lắng, giúp tĩnh tâm an thần.',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Thưởng trà thảo mộc organic giữa vườn thiền tĩnh mặc'
      },
      {
        title: 'Ba bước thực hành thiền trà mỗi sớm mai',
        text: '1. Thân tĩnh: Ngồi thẳng lưng, thả lỏng toàn bộ cơ bắp.\n2. Tâm định: Cảm nhận làn khói trà bốc lên nhẹ nhàng và hương thơm mộc mạc.\n3. Trí sáng: Uống từng ngụm chậm rãi, trọn vẹn trong hiện tại.',
        tips: [
          'Nhiệt độ nước pha trà lý tưởng từ 85 - 90 độ C',
          'Không sử dụng điện thoại trong suốt 30 phút thưởng trà',
          'Kết hợp lắng nghe tiếng chuông xoay hoặc tiếng suối reo'
        ]
      }
    ],
    travelTips: [
      'Nên thức dậy trước 6h00 sáng để đón năng lượng bình minh tốt nhất',
      'Mang theo trang phục linen hữu cơ thoáng mát và thoải mái'
    ],
    relatedToursSlugs: ['yen-tu-tinh-lang', 'sapa-cloud-healing'],
    conclusion: 'Hãy dành cho mình những khoảnh khắc tĩnh lặng để lắng nghe tiếng nói sâu thẳm bên trong.'
  },
  {
    id: 'blog-2',
    slug: 'ban-do-nang-luong',
    title: 'Bản Đồ Năng Lượng Chữa Lành: 7 Tọa Độ Địa Linh Linh Thiêng Tại Việt Nam',
    subtitle: 'Khám phá các vùng đất sở hữu từ trường tự nhiên an lành, nơi con người dễ dàng phục hồi năng lượng sinh học.',
    category: 'Bản Đồ Năng Lượng',
    categorySlug: 'ban-do-nang-luong',
    authorName: 'TS. Hoàng Vũ',
    authorRole: 'Nhà Nghiên Cứu Địa Sinh Học & Di Sản',
    publishedDate: '12/08/2026',
    readTime: '8 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80',
    tableOfContents: [
      '1. Yên Tử - Thánh địa non thiêng ngút ngàn',
      '2. Côn Đảo - Đảo ngọc chữa lành giữa đại dương',
      '3. Cao nguyên Măng Đen - Thiên đường rừng thông bất tận',
      '4. Vịnh Bái Tử Long - Vịnh ngọc di sản triệu năm'
    ],
    introduction: 'Việt Nam được thiên nhiên ưu đãi những tọa độ địa linh đặc biệt, nơi trường năng lượng Bovis đạt mức cực cao, giúp thanh lọc tâm trí và bồi bổ sinh lực một cách tự nhiên nhất.',
    sections: [
      {
        title: 'Yên Tử - Thánh địa non thiêng ngút ngàn',
        text: 'Nằm ở độ cao trên 1.000m so với mực nước biển, Yên Tử là cái nôi của Thiền phái Trúc Lâm. Nơi đây sở hữu năng lượng trầm tích của rừng xích tùng cổ thụ và làn sương thanh tịnh.',
        image: 'https://images.unsplash.com/photo-1599818816949-c124806a6b57?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Yên Tử - Cội nguồn an yên giữa đại ngàn non nước'
      },
      {
        title: 'Côn Đảo - Đảo ngọc chữa lành giữa đại dương',
        text: 'Với làn nước biển xanh ngọc bích và rạn san hô nguyên sơ, Côn Đảo là nơi ion âm đại dương hòa quyện cùng rừng nguyên sinh, tạo nên bầu không khí chữa lành hoàn hảo.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Hoàng hôn biển Côn Đảo - Khoảnh khắc thời gian ngưng đọng'
      }
    ],
    travelTips: [
      'Nên dành ít nhất 3 ngày 2 đêm tại mỗi tọa độ để cơ thể thích ứng trọn vẹn',
      'Uống đủ nước khoáng tự nhiên trong suốt hành trình'
    ],
    relatedToursSlugs: ['phu-yen-sanctuary', 'con-dao-healing'],
    conclusion: 'Mỗi tọa độ trên bản đồ năng lượng là một món quà vô giá của đất mẹ ban tặng cho tâm hồn bạn.'
  },
  {
    id: 'blog-3',
    slug: 'cau-chuyen-khach-hang',
    title: 'Câu Chuyện Hành Trình: 4 Ngày Tìm Lại Chính Mình Tại Phú Yên & Quy Nhơn',
    subtitle: 'Chia sẻ chân thực từ Chị Minh Hạnh (CEO, TP.HCM) về chuyến retreat độc bản làm mới hoàn toàn năng lượng lãnh đạo.',
    category: 'Câu Chuyện Hành Trình',
    categorySlug: 'cau-chuyen-khach-hang',
    authorName: 'Minh Hạnh & 4U Storyteller',
    authorRole: 'Khách Hàng Signature Retreat',
    publishedDate: '08/08/2026',
    readTime: '5 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
    tableOfContents: [
      '1. Quyết định buông bỏ áp lực công việc',
      '2. Bình minh tĩnh lặng bên bờ biển Phú Yên',
      '3. Những liệu trình trị liệu độc bản bất ngờ',
      '4. Năng lượng trở lại sau chuyến đi'
    ],
    introduction: '"Sau những quý làm việc căng thẳng với hàng trăm quyết định quan trọng, tôi cảm thấy năng lượng của mình cạn kiệt. Chuyến retreat 4U đã đưa tôi trở về với sự tĩnh lặng tinh khiết nhất."',
    sections: [
      {
        title: 'Quyết định buông bỏ áp lực công việc',
        text: 'Tắt hết thông báo điện thoại, trao lại mọi lo toan cho đội ngũ trợ lý riêng của 4U, tôi bắt đầu chuyến đi mà không cần chuẩn bị bất cứ điều gì ngoài một tâm thế cởi mở đón nhận.',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Biển sớm Phú Yên thanh bình không một gợn sóng'
      }
    ],
    travelTips: [
      'Hãy chuẩn bị một cuốn nhật ký nhỏ để ghi lại những chiêm nghiệm cá nhân'
    ],
    relatedToursSlugs: ['phu-yen-sanctuary'],
    conclusion: 'Một hành trình tĩnh dưỡng đúng nghĩa là khoản đầu tư thông minh nhất cho sức khỏe và trí tuệ.'
  },
  {
    id: 'blog-4',
    slug: 'tam-rung-shinrin-yoku',
    title: 'Shinrin-yoku: Liệu Pháp Tắm Rừng & Nghệ Thuật Hồi Sinh Năng Lượng Tự Nhiên',
    subtitle: 'Phương pháp chữa lành tinh thần từ Nhật Bản được 4U ứng dụng độc quyền tại các khu bảo tồn rừng nguyên sinh Việt Nam.',
    category: 'A Tip A Day',
    categorySlug: 'a-tip-a-day',
    authorName: 'Dr. Lê Tuấn Anh',
    authorRole: 'Chuyên Gia Y Học Phục Hồi',
    publishedDate: '05/08/2026',
    readTime: '4 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    tableOfContents: [
      '1. Shinrin-yoku là gì?',
      '2. Tác dụng kỳ diệu của hợp chất Phytoncide',
      '3. Cách thực hành tắm rừng hiệu quả nhất'
    ],
    introduction: 'Hòa mình vào không gian rừng xanh rậm rạp, hít thở mùi hương của vỏ cây và đất ẩm giúp giảm hormone cortisol gây căng thẳng tới 40% chỉ sau 2 giờ.',
    sections: [
      {
        title: 'Shinrin-yoku là gì?',
        text: 'Shinrin-yoku (tắm rừng) không phải là cuộc đi bộ leo núi vội vã, mà là sự đắm chìm mọi giác quan vào không gian rừng cây nguyên sơ.',
        image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Đi dạo thong dong dưới tán thông nguyên sinh'
      }
    ],
    travelTips: [
      'Đi chân trần tiếp đất (Grounding) trên cỏ mềm để giải phóng tĩnh điện cơ thể'
    ],
    relatedToursSlugs: ['sapa-cloud-healing'],
    conclusion: 'Thiên nhiên là người thầy chữa lành vĩ đại nhất mà ta luôn có thể tìm về.'
  },
  {
    id: 'blog-5',
    slug: 'am-thuc-thuc-duong',
    title: 'Ẩm Thực Thực Dưỡng & Trà Thảo Mộc Cổ Thụ: Thức Ăn Nuôi Dưỡng Tinh Thần',
    subtitle: 'Khám phá triết lý ăn uống thuận tự nhiên với thực đơn Organic được may đo riêng bởi các chuyên gia dinh dưỡng 4U.',
    category: 'Ẩm Thực Thực Dưỡng',
    categorySlug: 'am-thuc-thuc-duong',
    authorName: 'Chef Nguyễn Thanh',
    authorRole: 'Master Organic Holistic Chef',
    publishedDate: '01/08/2026',
    readTime: '5 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80',
    tableOfContents: [
      '1. Triết lý thực dưỡng thuận tự nhiên',
      '2. Các nguyên liệu quý từ nông trại bản địa',
      '3. Thực đơn thanh lọc cơ thể trong 3 ngày'
    ],
    introduction: 'Thức ăn không chỉ nuôi dưỡng tế bào thể xác mà còn tác động trực tiếp đến sự thanh nhẹ của tâm trí và cảm xúc mỗi ngày.',
    sections: [
      {
        title: 'Triết lý thực dưỡng thuận tự nhiên',
        text: 'Ưu tiên các món ăn tươi mới, giữ trọn vẹn hương vị nguyên bản của rau củ hữu cơ, nấm rừng và các loại hạt dinh dưỡng không qua chế biến công nghiệp.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Món ăn thực dưỡng thanh tao được bài trí nghệ thuật'
      }
    ],
    travelTips: [
      'Nhai kỹ no lâu, ăn trong chánh niệm và cảm nhận sự biết ơn với từng món ăn'
    ],
    relatedToursSlugs: ['yen-tu-tinh-lang'],
    conclusion: 'Ăn lành - Uống sạch - Sống an là chìa khóa của một thân thể tráng kiện và tâm hồn thảnh thơi.'
  }
];

export let BLOGS_DATA: BlogArticle[] = [...INITIAL_BLOGS_DATA];

export function syncBlogsDataFromApi(liveBlogs: BlogArticle[]) {
  if (Array.isArray(liveBlogs) && liveBlogs.length > 0) {
    BLOGS_DATA.splice(0, BLOGS_DATA.length, ...liveBlogs);
  }
}
