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
  category: 'Retreat' | 'Culture' | 'Tips' | 'Food' | 'Luxury';
  author: { name: string; role: string; avatar: string };
  publishedDate: string;
  readTime: string;
  heroImage: string;
  tableOfContents: string[];
  introduction: string;
  sections: BlogArticleSection[];
  travelTips: string[];
  foodGuide: string[];
  budgetGuide: string;
  packingTips: string[];
  relatedToursSlugs: string[];
  conclusion: string;
}

// 3 SAMPLE BLOG ARTICLES
export const BLOGS_DATA: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'nghe-thuat-tam-rung-shinrin-yoku-cat-tien',
    title: 'Nghệ Thuật "Tắm Rừng" Shinrin-Yoku: Liệu Pháp Chữa Lành Tự Nhiên Giữa Ngàn Xanh Cát Tiên',
    subtitle: 'Khám phá bí quyết buông bỏ muộn phiền đô thị và kết nối lại với chính mình qua từng nhịp thở thiên nhiên',
    category: 'Retreat',
    author: {
      name: 'TS. Nguyễn Hoàng Anh',
      role: 'Chuyên gia Tâm lý & Cố vấn Thân Tâm 4U Retreat',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    publishedDate: '02/08/2026',
    readTime: '8 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop',
    tableOfContents: [
      '1. Khái niệm Tắm Rừng Shinrin-Yoku là gì?',
      '2. Lợi ích sinh học đã được khoa học chứng minh'
    ],
    introduction: 'Trong nhịp sống hiện đại hối hả, hệ thần kinh của con người liên tục rơi vào trạng thái quá tải thông tin. Khái niệm Shinrin-yoku ra đời tại Nhật Bản như một chiếc chìa khóa thanh lọc tâm trí.',
    sections: [
      {
        title: '1. Khái niệm Tắm Rừng Shinrin-Yoku là gì?',
        text: 'Shinrin-yoku không phải là một chuyến đi leo núi chinh phục. Đó đơn giản là hành động đắm mình vào bầu không khí của rừng già bằng cả 5 giác quan.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
        imageCaption: 'Không gian tĩnh lặng nguyên sơ tại Vườn Quốc Gia Cát Tiên.'
      }
    ],
    travelTips: ['Hít thở sâu nhịp 4-7-8', 'Tắt thiết bị di động trong quá trình tắm rừng'],
    foodGuide: ['Thực dưỡng rau củ hữu cơ', 'Trà thảo mộc bản địa'],
    budgetGuide: 'Trọn gói trải nghiệm trong chuyến Retreat 4U',
    packingTips: ['Trang phục vải lanh thoáng mát', 'Giày đi bộ êm chân'],
    relatedToursSlugs: ['tinh-lang-giua-dai-ngan', 'binh-yen-tren-cao-nguyen'],
    conclusion: 'Tắm rừng là món quà tuyệt vời dành tặng bản thân để khôi phục năng lượng sống.'
  },
  {
    id: 'blog-2',
    slug: 'am-thuc-thuc-duong-phuc-hoi-nang-luong',
    title: 'Ẩm Thực Thực Dưỡng Farm-To-Table: Hành Trình Nuôi Dưỡng Cơ Thể Từ Nguồn Năng Lượng Hữu Cơ',
    subtitle: 'Tìm hiểu triết lý ăn lành uống sạch chuẩn y khoa kết hợp nông sản cao nguyên',
    category: 'Food',
    author: {
      name: 'Chef Trần Văn Nam',
      role: 'Bếp Trưởng Thực Dưỡng 4U Retreat',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    publishedDate: '28/07/2026',
    readTime: '6 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=85&w=2560&auto=format&fit=crop',
    tableOfContents: ['1. Triết lý Farm-to-Table trong dưỡng sinh', '2. Lựa chọn thực phẩm mùa nào thức nấy'],
    introduction: 'Thức ăn không chỉ cung cấp calo mà còn mang lại nguồn năng lượng chữa lành cho từng tế bào.',
    sections: [
      {
        title: '1. Triết lý Farm-to-Table trong dưỡng sinh',
        text: 'Nguồn rau củ hữu cơ hái trực tiếp tại vườn cao nguyên giúp giữ trọn dưỡng chất và hương vị nguyên bản.'
      }
    ],
    travelTips: ['Uống nước ấm mỗi sáng', 'Nhai kỹ thức ăn'],
    foodGuide: ['Trà mầm gạo lứt', 'Rau củ hấp nướng'],
    budgetGuide: 'Gồm sẵn trong các gói tour Retreat',
    packingTips: ['Bình nước cá nhân giữ nhiệt'],
    relatedToursSlugs: ['binh-yen-tren-cao-nguyen'],
    conclusion: 'Ẩm thực lành mạnh là khởi đầu cho một tâm trí sáng suốt.'
  },
  {
    id: 'blog-3',
    slug: 'nghe-thuat-thien-dinh-chuong-xoay',
    title: 'Sức Mạnh Âm Thanh Trị Liệu: Thiền Định Chuông Xoay Tây Tạng Cho Giấc Ngủ Sâu',
    subtitle: 'Giải mã tần số sóng âm khôi phục sự cân bằng sóng não và xua tan căng thẳng',
    category: 'Retreat',
    author: {
      name: 'Master Lê Thị Hương',
      role: 'Chuyên gia Trị liệu Sound Healing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    },
    publishedDate: '15/07/2026',
    readTime: '7 phút đọc',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=2560&auto=format&fit=crop',
    tableOfContents: ['1. Chuông xoay Tây Tạng tác động đến sóng não ra sao?', '2. Các bước thực hành thiền âm thanh'],
    introduction: 'Sóng âm tần số 432Hz từ chuông xoay giúp đưa não bộ về trạng thái alpha thư giãn sâu.',
    sections: [
      {
        title: '1. Chuông xoay Tây Tạng tác động đến sóng não ra sao?',
        text: 'Độ rung và độ ngân kéo dài của chuông tác động trực tiếp lên hệ thần kinh, giải phóng hormone endorphin.'
      }
    ],
    travelTips: ['Thả lỏng cơ thể khi nghe âm thanh', 'Nhắm mắt và tập trung vào hơi thở'],
    foodGuide: ['Nước suối khoáng kiềm', 'Trà hoa cúc'],
    budgetGuide: 'Trải nghiệm trong không gian tĩnh lặng 4U',
    packingTips: ['Quần áo thiền rộng rãi'],
    relatedToursSlugs: ['tinh-lang-giua-dai-ngan'],
    conclusion: 'Hãy dành cho mình những phút giây bình an cùng âm thanh trị liệu.'
  }
];
