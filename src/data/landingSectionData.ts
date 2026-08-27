export interface LandingSectionStatItem {
  number: string;
  label: string;
}

export interface LandingSectionFeatureItem {
  title: string;
  description: string;
}

export interface LandingSectionSignalItem {
  title: string;
  description: string;
  quote: string;
}

export interface LandingSectionMethodItem {
  point: string;
  title: string;
  sanskrit: string;
  description: string;
}

export interface LandingSectionBenefitItem {
  title: string;
  description: string;
  icon?: string;
}

export interface LandingSectionStepItem {
  step: string;
  title: string;
  description: string;
}

export interface LandingSectionFaqItem {
  question: string;
  answer: string;
}

export interface LandingSectionData {
  hero: {
    badge: string;
    title: string;
    titleItalic: string;
    description: string;
    ctaText: string;
    subInfo: string;
  };
  signals: {
    eyebrow: string;
    heading: string;
    description: string;
    items: LandingSectionSignalItem[];
  };
  about: {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    para1: string;
    para2: string;
    image: string;
  };
  method: {
    eyebrow: string;
    heading: string;
    description: string;
    items: LandingSectionMethodItem[];
  };
  benefits: {
    eyebrow: string;
    heading: string;
    description: string;
    items: LandingSectionBenefitItem[];
  };
  trust: {
    eyebrow: string;
    heading: string;
    description: string;
    stats: LandingSectionStatItem[];
    features: LandingSectionFeatureItem[];
    teacher: {
      badge: string;
      title: string;
      bio: string;
      image: string;
    };
    organization: {
      badge: string;
      title: string;
      bio: string;
      logo: string;
    };
  };
  steps: {
    eyebrow: string;
    heading: string;
    items: LandingSectionStepItem[];
  };
  pricing: {
    eyebrow: string;
    heading: string;
    originalPrice: string;
    discountedPrice: string;
    badge: string;
    inclusions: string[];
    ctaText: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: LandingSectionFaqItem[];
  };
}

export interface LandingSectionTemplate {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  status: 'active' | 'draft';
  createdAt?: string;
  updatedAt?: string;
  data: LandingSectionData;
}

export const DEFAULT_LANDING_SECTION_DATA: LandingSectionData = {
  hero: {
    badge: 'Chương trình Thực Hành 3Đ 21 ngày liên tục',
    title: 'Thể Dục ĐÚNG',
    titleItalic: '"Chia tay Đau Cổ, Vai, Gáy"',
    description: 'Phương pháp Vận Động & Hít Thở Cổ điển từ Sivananda, giúp Ta thoát khỏi Đau nhức Cơ thể, cải thiện Giấc ngủ và phục hồi Năng lượng. Chỉ 60 phút mỗi sáng, liên tục 21 ngày.',
    ctaText: 'Tham gia Info Session để tìm hiểu thêm',
    subInfo: 'Khai giảng 16 / 9 · 07:00 Sáng · 60 phút mỗi ngày · Online qua ZOOM'
  },
  signals: {
    eyebrow: 'Cơ thể đang gửi Tín hiệu',
    heading: 'Ta có đang "sống chung với Đau"?',
    description: '8 giờ ngồi máy tính mỗi ngày, ít vận động, căng thẳng kéo dài. Cơ thể không nói được, nhưng đang lên tiếng theo cách riêng của nó.',
    items: [
      {
        title: '"Đau Cổ, Vai, Gáy không dứt"',
        description: 'Cứng cổ mỗi sáng. Nhức vai cuối ngày. Đau đầu thường xuyên. Đã đi massage, châm cứu, dán cao..., cứ vài tuần lại quay lại. Đó là tín hiệu cột sống đang "kêu cứu".',
        quote: 'Đau Cổ, Vai, Gáy không dứt'
      },
      {
        title: '"Giấc ngủ không trọn vẹn"',
        description: 'Khó vào giấc, hay trằn trọc. Đêm thức giấc 2 - 3 lần rồi khó ngủ lại. Sáng dậy uể oải, người nặng nề dù đã "nằm trên giường 8 tiếng".',
        quote: 'Giấc ngủ không trọn vẹn'
      },
      {
        title: '"Đau Thắt lưng, Cột sống kêu cứu"',
        description: 'Ngồi lâu đứng dậy thấy ê buốt. Thỉnh thoảng nhói buốt xuống hông hoặc chân. Đi khám được chẩn đoán "thoái hoá nhẹ", nhưng không biết làm gì ngoài uống thuốc giảm đau.',
        quote: 'Đau Thắt lưng, Cột sống kêu cứu'
      },
      {
        title: '"Mệt mỏi mãn tính, thiếu năng lượng"',
        description: 'Luôn thấy thiếu sức sống dù không làm gì nặng. Cần Cà phê để "khởi động" buổi sáng và "cầm cự" buổi chiều. Cảm giác Cơ thể đang già đi nhanh hơn tuổi thật.',
        quote: 'Mệt mỏi mãn tính, thiếu năng lượng'
      }
    ]
  },
  about: {
    eyebrow: 'Phương pháp 3Đ là gì',
    heading: 'Không phải vận động uốn dẻo, mà là Phương pháp tác động đồng thời vào Thân thể, Hơi thở và Tâm trí',
    headingHighlight: 'uốn dẻo',
    para1: 'Phương pháp 3Đ là 3 Điểm Vàng đã được Truyền thống Sivananda gìn giữ hơn 5,000 năm: Thể Dục ĐÚNG, Hít Thở ĐÚNG, Thư Giãn ĐÚNG.',
    para2: 'KHÔNG cần dẻo dai, KHÔNG cần thuộc Kinh sách. Chỉ cần 60 phút mỗi sáng, liên tục 21 ngày, để thấy Cơ thể và Tâm trí thay đổi rõ rệt.',
    image: '/images/yoga-practice-guide.jpg'
  },
  method: {
    eyebrow: 'Phương pháp Cổ điển từ Sivananda',
    heading: 'Sự kết hợp 3 Điểm Vàng Thân - Tâm - Trí',
    description: 'Không phải để khoe những tư thế khó. Phương pháp 3Đ là 3 Yếu tố Nền tảng gìn giữ hơn 5,000 năm, tác động đồng thời vào Cơ thể, Hơi thở và Tâm trí.',
    items: [
      {
        point: 'Điểm 01 · Vận Động',
        title: 'Thể Dục ĐÚNG',
        sanskrit: 'Asana, Tư thế & Vận động',
        description: 'Các tư thế vận động kéo giãn và giải tỏa áp lực đĩa đệm, giải phóng tắc nghẽn vùng cổ vai gáy và cột sống nhẹ nhàng.'
      },
      {
        point: 'Điểm 02 · Hơi Thở',
        title: 'Hơi Thở ĐÚNG',
        sanskrit: 'Pranayama, Hơi thở sâu',
        description: 'Kỹ thuật Hơi thở sử dụng tối đa dung tích Phổi, cung cấp đủ Oxy, giảm Stress trong vài phút, tăng Tập trung và cải thiện Giấc ngủ ngay tuần đầu.'
      },
      {
        point: 'Điểm 03 · Thư Giãn',
        title: 'Thư Giãn ĐÚNG',
        sanskrit: 'Savasana, Buông xả trọn vẹn',
        description: 'Kỹ thuật Thư giãn sâu giải toả Căng thẳng tích tụ, chữa lành tổn thương Thể chất và Tinh thần, cảm nhận sự Tĩnh lặng và Kết nối với Bản thân.'
      }
    ]
  },
  benefits: {
    eyebrow: '21 ngày liên tục sẽ thay đổi điều gì?',
    heading: 'Cơ thể dẻo dai hơn, chỉ sau 21 ngày liên tục',
    description: 'Kết quả không phải phép màu, mà là Phản ứng tự nhiên khi Cơ thể được vận động đúng, Hít Thở ĐÚNG, và nghỉ ngơi đúng mỗi ngày.',
    items: [
      {
        title: 'Ngủ ngon trở lại',
        description: 'Đi vào giấc nhanh hơn, ít trở mình ban đêm. Sáng thức dậy thấy thật sự nghỉ ngơi, không còn uể oải.'
      },
      {
        title: 'Giảm đau Cổ, Vai, Gáy rõ rệt',
        description: 'Cứng cổ buổi sáng giảm rõ. Vai bớt nhức. Có thể xoay đầu thoải mái mà không "kêu cộp".'
      },
      {
        title: 'Lưng đỡ đau, Tiêu hoá tốt',
        description: 'Đau Thắt lưng giảm hẳn. Bụng nhẹ hơn, đi vệ sinh đều đặn. Ăn ngon miệng, no đúng lúc.'
      },
      {
        title: 'Năng lượng dồi dào',
        description: 'Không còn "tụt mood" 3h chiều. Làm việc tập trung sâu hơn. Ít cần Cà phê hơn để duy trì sức bền.'
      },
      {
        title: 'Tâm trí an yên',
        description: 'Bớt cáu gắt, bớt over thinking. Có khả năng "tắt đầu" khi về nhà. Cảm xúc ổn định hơn.'
      },
      {
        title: 'Sống Không Bệnh',
        description: 'Hệ Miễn dịch khoẻ mạnh, ít ốm vặt. Cột sống thẳng, dáng đẹp, đi lại linh hoạt, kể cả khi 60+.'
      }
    ]
  },
  trust: {
    eyebrow: 'Vì sao tin tưởng',
    heading: 'Truyền thống Sivananda hơn 5,000 năm Lịch sử',
    description: 'Không phải Phương pháp thử nghiệm. Là Truyền thống đã được giảng dạy tại 80+ Quốc gia, hướng dẫn bởi Đội ngũ Chuyên gia được truyền thừa chính thống.',
    stats: [
      { number: '21', label: 'Ngày thực hành\nliên tục' },
      { number: "60'", label: 'Mỗi buổi sáng\n07:00 đến 08:00' },
      { number: '80+', label: 'Quốc gia đã áp dụng\nPhương pháp Sivananda' },
      { number: '100+', label: 'Năm Lịch sử\nTruyền thống Sivananda' }
    ],
    features: [
      {
        title: 'Phương pháp Cổ điển từ Sivananda',
        description: 'Truyền thừa từ Swami Sivananda, không phải vận động thương mại, không tự sáng tạo. Là phương pháp đã kiểm chứng qua hàng triệu người.'
      },
      {
        title: 'Phù hợp cả Người mới hoàn toàn',
        description: 'Info Session hoàn toàn Không thu Phí, không Hợp đồng dài hạn, không ép buộc. Tham gia khi thật sự thấy phù hợp.'
      },
      {
        title: 'Linh hoạt Online hoặc Trực tiếp',
        description: 'Học qua ZOOM tại nhà hoặc tới CLB tại 07 Đặng Dung, Tân Định. Nhóm 10+ người có thể yêu cầu khung giờ riêng.'
      },
      {
        title: 'Tham gia Không thu Học phí, không ràng buộc',
        description: 'Info Session hoàn toàn Không thu Học phí, không hợp đồng dài hạn, không ép upsell. Tham gia khi thật sự thấy phù hợp.'
      }
    ],
    teacher: {
      badge: 'CHUYÊN GIA HƯỚNG DẪN · PHƯƠNG PHÁP 3Đ',
      title: 'Chuyên gia hướng dẫn',
      bio: 'Được đào tạo và truyền thừa trực tiếp từ Hệ phái Sivananda, chuyên sâu về Vận động Asana, Hít thở Pranayama và Thư giãn Savasana. Hơn 10 năm Kinh nghiệm hướng dẫn Học viên Văn phòng và Người có Bệnh nền tại Việt Nam.',
      image: '/images/yoga-teacher-portrait.jpg'
    },
    organization: {
      badge: 'WELLNESS · MEDITATION · HEALTH',
      title: '4U Wellness · Tổ chức Phi Lợi nhuận',
      bio: 'Tổ chức Phi Lợi nhuận thực hành Sống Không Bệnh. Đồng hành cùng hàng ngàn Học viên tại Tp. HCM và Toàn quốc.',
      logo: '/Logo-4U-Wellness.png'
    }
  },
  steps: {
    eyebrow: 'Quy trình ĐƠN GIẢN',
    heading: 'Bắt đầu Hành trình trong 04 bước',
    items: [
      {
        step: 'Bước 01',
        title: 'Đăng ký Info Session Miễn phí',
        description: 'Điền Form trong 60 giây. Chọn hình thức Online qua ZOOM hoặc Trực tiếp tại CLB Tân Định.'
      },
      {
        step: 'Bước 02',
        title: 'Tham gia Info Session 30 phút',
        description: 'Nghe giải thích Phương pháp, trải nghiệm thử 1 Kỹ thuật Thở, đặt câu hỏi cho Chuyên gia.'
      },
      {
        step: 'Bước 03',
        title: 'Nhận Lịch tập & Link ZOOM',
        description: 'Sau Info Session, nhận Lịch chi tiết 21 ngày, Link ZOOM cố định và Hướng dẫn chuẩn bị.'
      },
      {
        step: 'Bước 04',
        title: 'Bắt đầu 21 ngày Sống Không Bệnh',
        description: '60 phút mỗi sáng, có Hướng dẫn từng Động tác và Hơi thở, Chào ngày mới tràn đầy Năng lượng.'
      }
    ]
  },
  pricing: {
    eyebrow: 'Học Phí Ưu Đãi',
    heading: 'Khóa Thực Hành 3Đ 21 Ngày Khởi Đầu',
    originalPrice: '3.500.000đ',
    discountedPrice: '1.990.000đ',
    badge: 'ƯU ĐÃI KHÓA SẮP KHAI GIẢNG',
    inclusions: [
      '21 Buổi học trực tiếp qua Zoom cùng Chuyên gia',
      'Giáo trình Vận Động & Hít Thở chuẩn Sivananda',
      'Tham gia cộng đồng thực hành Sống Không Bệnh',
      'Tư vấn trực tiếp 1-1 về tình trạng Cổ Vai Gáy'
    ],
    ctaText: 'Đăng Ký Tham Gia Info Session'
  },
  faq: {
    eyebrow: 'Giải đáp thắc mắc',
    heading: 'Câu hỏi thường gặp',
    items: [
      {
        question: 'Tôi chưa từng tập vận động bao giờ, có theo được không?',
        answer: 'Hoàn toàn được. Phương pháp 3Đ được thiết kế đặc biệt cho người mới bắt đầu hoặc người chưa từng vận động thể chất. Giáo viên sẽ chỉnh sửa từng tư thế an toàn.'
      },
      {
        question: 'Tôi bị đau cổ vai gáy nặng hoặc thoái hóa cột sống có tập được không?',
        answer: 'Chính xác là lớp học này dành cho bạn. Các bài tập trị liệu Sivananda tập trung giải tỏa áp lực đĩa đệm và thư giãn cơ bắp sâu mà không gây chấn thương.'
      },
      {
        question: 'Nếu tôi bận một buổi sáng thì có video xem lại không?',
        answer: 'Mỗi buổi học đều có bản ghi lại (Record) chất lượng cao gửi riêng cho học viên để bạn có thể ôn tập bất cứ lúc nào trong ngày.'
      }
    ]
  }
};

export const DEFAULT_LANDING_SECTION_TEMPLATES: LandingSectionTemplate[] = [
  {
    id: 'van-dong-co-vai-gay',
    name: 'Vận Động 3Đ • Chia tay Đau Cổ, Vai, Gáy (Loại 1 - Mặc Định)',
    description: 'Chương trình 21 ngày liên tục trị liệu Cổ Vai Gáy & Cải thiện Giấc ngủ theo phương pháp Cổ điển Sivananda',
    isDefault: true,
    status: 'active',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-24',
    data: DEFAULT_LANDING_SECTION_DATA
  },
  {
    id: 'van-dong-tri-lieu-cot-song',
    name: 'Vận Động Trị Liệu • Phục Hồi Cột Sống & Thắt Lưng (Loại 2)',
    description: 'Phương pháp giải phóng áp lực đĩa đệm cột sống thắt lưng, cân chỉnh dáng đi & tăng độ dẻo dai',
    isDefault: false,
    status: 'active',
    createdAt: '2026-08-10',
    updatedAt: '2026-08-24',
    data: {
      ...DEFAULT_LANDING_SECTION_DATA,
      hero: {
        ...DEFAULT_LANDING_SECTION_DATA.hero,
        title: 'Trị Liệu Cột Sống',
        titleItalic: '"Giải Tỏa Đau Thắt Lưng & Thoái Hóa"',
        description: 'Chương trình chuyên sâu 21 ngày phục hồi cấu trúc cột sống tự nhiên, giải phóng chèn ép dây thần kinh tọa và tái tạo năng lượng nguyên bản.',
        ctaText: 'Đăng Ký Tư Vấn Lộ Trình Cột Sống'
      },
      about: {
        ...DEFAULT_LANDING_SECTION_DATA.about,
        heading: 'Phục hồi đường cong sinh lý Cột Sống bằng các tư thế định tuyến chuẩn xác',
        para1: 'Tập trung kéo giãn và củng cố nhóm cơ lõi (Core) nâng đỡ khung xương sống vững chắc.',
        para2: 'Phù hợp người ngồi văn phòng lâu, người có dấu hiệu thoái hóa hoặc thoát vị đĩa đệm nhẹ.'
      },
      pricing: {
        ...DEFAULT_LANDING_SECTION_DATA.pricing,
        heading: 'Khóa Vận Động Trị Liệu Cột Sống 21 Ngày',
        discountedPrice: '2.290.000đ',
        originalPrice: '3.900.000đ'
      }
    }
  },
  {
    id: 'hit-tho-thien-dinh',
    name: 'Hít Thở & Thiền Định • Pranayama Chữa Lành Thân Tâm (Loại 3)',
    description: 'Khơi thông dòng chảy sinh khí Prana, giải tỏa căng thẳng tâm trí và nuôi dưỡng giấc ngủ sâu',
    isDefault: false,
    status: 'active',
    createdAt: '2026-08-15',
    updatedAt: '2026-08-24',
    data: {
      ...DEFAULT_LANDING_SECTION_DATA,
      hero: {
        ...DEFAULT_LANDING_SECTION_DATA.hero,
        title: 'Hít Thở ĐÚNG',
        titleItalic: '"Đánh Thức Sinh Khí & An Yên Tâm Trí"',
        description: 'Thực hành các kỹ thuật thở Pranayama cổ xưa giúp thanh lọc độc tố, giảm stress tức thì và tái tạo sinh lực tràn đầy.',
        ctaText: 'Tham Gia Trải Nghiệm Hơi Thở'
      },
      about: {
        ...DEFAULT_LANDING_SECTION_DATA.about,
        heading: 'Kiểm soát hơi thở là làm chủ tâm trí và sinh lực cơ thể',
        para1: 'Khoa học thở Pranayama điều hòa hệ thần kinh giao cảm, đưa tâm trí về trạng thái tĩnh lặng tuyệt đối.',
        para2: 'Giúp ngủ sâu không mộng mị, tăng khả năng tập trung cao độ trong công việc và cuộc sống.'
      },
      pricing: {
        ...DEFAULT_LANDING_SECTION_DATA.pricing,
        heading: 'Khóa Huấn Luyện Pranayama & Hơi Thở 21 Ngày',
        discountedPrice: '1.890.000đ',
        originalPrice: '3.200.000đ'
      }
    }
  }
];

const TEMPLATES_STORAGE_KEY = '4u_landing_section_templates_list';

export function getAllLandingSectionTemplates(): LandingSectionTemplate[] {
  try {
    const raw = localStorage.getItem(TEMPLATES_STORAGE_KEY) || localStorage.getItem('4u_yoga_3d_templates_list');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[LandingSection] Failed to read templates from localStorage', e);
  }
  return DEFAULT_LANDING_SECTION_TEMPLATES;
}

export function getLandingSectionTemplateById(id?: string): LandingSectionTemplate {
  const templates = getAllLandingSectionTemplates();
  if (!id) {
    const defaultTpl = templates.find((t) => t.isDefault) || templates[0];
    return defaultTpl || DEFAULT_LANDING_SECTION_TEMPLATES[0];
  }
  const found = templates.find((t) => t.id === id || t.id.toLowerCase() === id.toLowerCase());
  if (found) return found;
  const defaultTpl = templates.find((t) => t.isDefault) || templates[0];
  return defaultTpl || DEFAULT_LANDING_SECTION_TEMPLATES[0];
}

export function saveAllLandingSectionTemplates(templates: LandingSectionTemplate[]): void {
  try {
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(templates));
    localStorage.setItem('4u_yoga_3d_templates_list', JSON.stringify(templates));
  } catch (e) {
    console.error('[LandingSection] Failed to save templates list', e);
  }
}

export function saveLandingSectionTemplate(template: LandingSectionTemplate): void {
  const templates = getAllLandingSectionTemplates();
  const index = templates.findIndex((t) => t.id === template.id);

  let updatedTemplates = templates.map((t) => {
    if (template.isDefault && t.id !== template.id) {
      return { ...t, isDefault: false };
    }
    return t;
  });

  if (index >= 0) {
    updatedTemplates[index] = { ...template, updatedAt: new Date().toISOString().split('T')[0] };
  } else {
    updatedTemplates.push({
      ...template,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });
  }

  saveAllLandingSectionTemplates(updatedTemplates);
}

export function deleteLandingSectionTemplate(id: string): boolean {
  const templates = getAllLandingSectionTemplates();
  if (templates.length <= 1) {
    return false;
  }
  const filtered = templates.filter((t) => t.id !== id);
  if (!filtered.some((t) => t.isDefault) && filtered.length > 0) {
    filtered[0].isDefault = true;
  }
  saveAllLandingSectionTemplates(filtered);
  return true;
}

export function duplicateLandingSectionTemplate(id: string): LandingSectionTemplate | null {
  const source = getLandingSectionTemplateById(id);
  if (!source) return null;

  const newId = `${source.id}-copy-${Date.now().toString().slice(-4)}`;
  const duplicated: LandingSectionTemplate = {
    ...JSON.parse(JSON.stringify(source)),
    id: newId,
    name: `${source.name} (Bản Sao)`,
    isDefault: false,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };

  saveLandingSectionTemplate(duplicated);
  return duplicated;
}

// Backward Compatibility aliases
export type Yoga3DData = LandingSectionData;
export type Yoga3DTemplate = LandingSectionTemplate;
export const DEFAULT_YOGA_3D_DATA = DEFAULT_LANDING_SECTION_DATA;
export const DEFAULT_YOGA_3D_TEMPLATES = DEFAULT_LANDING_SECTION_TEMPLATES;
export const getAllYoga3DTemplates = getAllLandingSectionTemplates;
export const getYoga3DTemplateById = getLandingSectionTemplateById;
export const saveAllYoga3DTemplates = saveAllLandingSectionTemplates;
export const saveYoga3DTemplate = saveLandingSectionTemplate;
export const deleteYoga3DTemplate = deleteLandingSectionTemplate;
export const duplicateYoga3DTemplate = duplicateLandingSectionTemplate;
export const getStoredYoga3DData = () => getLandingSectionTemplateById().data;
export const saveStoredYoga3DData = (data: LandingSectionData) => {
  const def = getLandingSectionTemplateById();
  saveLandingSectionTemplate({ ...def, data });
};
