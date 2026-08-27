import React, { useState } from 'react';
import './AboutPage.css';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Compass,
  Leaf,
  Smile,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Users,
  ChevronRight,
  Star,
  Quote,
  Clock,
  ArrowRight
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export interface AboutPageProps {
  onNavigate?: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
}

export default function AboutPage({ onNavigate, onOpenBooking }: AboutPageProps) {
  const [activePillarTab, setActivePillarTab] = useState<number>(0);

  const pillars = [
    {
      id: 'than',
      title: 'Thân Thư Giãn',
      sub: 'Physical Restoration',
      icon: '🌿',
      summary: 'Giải phóng căng thẳng, tái tạo từng tế bào sống và phục hồi thể trạng thông qua chuyển động nhẹ nhàng và thực dưỡng.',
      points: [
        'Dinh dưỡng Organic tươi lành từ nông trại hữu cơ bản địa, không chất bảo quản.',
        'Thực đơn chay thực dưỡng & nước ép detox được tư vấn theo thể trạng từng du khách.',
        'Yoga bình minh trên sundeck du thuyền 5 sao hoặc giữa rừng thông nguyên sơ.',
        'Trải nghiệm suối khoáng nóng onsen tự nhiên và tắm thảo dược người Dao đỏ.'
      ],
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=1600&auto=format&fit=crop'
    },
    {
      id: 'tam',
      title: 'Tâm Bình An',
      sub: 'Mental Peace & Silence',
      icon: '🪷',
      summary: 'Tách biệt khỏi nhịp sống ồn ào và áp lực công nghệ để tìm lại khoảng lặng tĩnh tại trong sâu thẳm tâm trí.',
      points: [
        'Liệu pháp tắm rừng (Shinrin-yoku) - kết nối các giác quan cùng cây cỏ cổ thụ.',
        'Thực hành Thiền chuông xoay Himalaya thanh lọc năng lượng và giải tỏa âu lo.',
        'Khu nghỉ dưỡng biệt lập không sóng ồn, khuyến khích Digital Detox (buông bỏ thiết bị).',
        'Âm nhạc chữa lành và hương trầm tự nhiên trong toàn bộ không gian sinh hoạt.'
      ],
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=1600&auto=format&fit=crop'
    },
    {
      id: 'tri',
      title: 'Trí Khai Phóng',
      sub: 'Soul Awakening & Wisdom',
      icon: '✨',
      summary: 'Khai mở góc nhìn mới về cuộc sống, tự do chiêm nghiệm và đối thoại chân thành cùng bản thân.',
      points: [
        'Trà đạo đàm đạo cùng các chuyên gia tâm lý, master thiền định giàu trải nghiệm.',
        'Không gian viết nhật ký tĩnh lặng (Journaling) giữa núi mây hùng vĩ.',
        'Workshop thủ công mỹ nghệ bản địa: gốm mộc, thêu tay, pha chế tinh dầu.',
        'Đọc sách và thưởng ngoạn hoàng hôn biển đảo không vướng bận lịch trình xô bồ.'
      ],
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=1600&auto=format&fit=crop'
    },
    {
      id: 'thien',
      title: 'Bảo Tồn & Gắn Kết',
      sub: 'Eco-Conscious & Giving',
      icon: '🌱',
      summary: 'Tạo tác giá trị bền vững cho tự nhiên và lan tỏa yêu thương ấm áp đến cộng đồng địa phương nơi ta đi qua.',
      points: [
        'Mỗi du khách đồng hành trồng 1 cây xanh bản địa lưu dấu hành trình xanh.',
        'Trích 5% doanh thu vào quỹ Nước Sạch & Học Bổng cho trẻ em vùng cao nguyên.',
        'Hạn chế 100% rác thải nhựa một lần trong toàn bộ chuỗi cung ứng dịch vụ 4U.',
        'Tôn trọng và hỗ trợ sinh kế bền vững cho người dân bản địa.'
      ],
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?q=85&w=1600&auto=format&fit=crop'
    }
  ];

  const reasons = [
    {
      num: '01',
      title: 'Hành Trình May Đo Giới Hạn',
      desc: 'Nói không với tour công nghiệp đông đúc. Mỗi đoàn tối đa 8 - 12 thành viên để đảm bảo sự riêng tư, tĩnh lặng và phục vụ chu đáo nhất.',
      icon: <Users size={24} color="#006d36" />
    },
    {
      num: '02',
      title: 'Tọa Độ Nghỉ Dưỡng Biệt Lập',
      desc: 'Tuyển chọn các resort 5 sao ẩn mình giữa thiên nhiên kiệt tác: Six Senses, Amanoi, Legacy Yên Tử, du thuyền Paradise Elegance Hạ Long.',
      icon: <Compass size={24} color="#006d36" />
    },
    {
      num: '03',
      title: 'Chuyên Gia Chữa Lành Đồng Hành',
      desc: 'Đội ngũ Huấn luyện viên Yoga, Bác sĩ dinh dưỡng & Master Thiền tận tâm hướng dẫn bạn từng nhịp thở, từng bữa ăn thực dưỡng an lành.',
      icon: <Heart size={24} color="#006d36" />
    },
    {
      num: '04',
      title: 'Dịch Vụ Hậu Cần VIP Trọn Gói',
      desc: 'Xe VIP Limousine đưa đón tận nhà, thủ tục check-in đặc quyền không chờ đợi, dịch vụ chăm sóc hành lý và hỗ trợ 24/7 suốt chuyến đi.',
      icon: <ShieldCheck size={24} color="#006d36" />
    },
    {
      num: '05',
      title: 'Ẩm Thực Thực Dưỡng Cao Cấp',
      desc: 'Mỗi món ăn là một vị thuốc tự nhiên từ nông trại hữu cơ chuẩn VietGAP/GlobalGAP, mang lại hương vị thanh khiết và năng lượng sống tích cực.',
      icon: <Leaf size={24} color="#006d36" />
    },
    {
      num: '06',
      title: 'Uy Tín Pháp Lý & Cam Kết Hoàn Hảo',
      desc: 'Giấy phép Lữ Hành Quốc Tế số 79-367/2012/TCDL-GP LHQT, bảo hiểm du lịch quốc tế hạn mức 2.000.000.000 VNĐ bảo chứng sự an tâm tuyệt đối.',
      icon: <Award size={24} color="#006d36" />
    }
  ];

  const testimonials = [
    {
      quote: 'Sau 5 ngày tham gia retreat tại Yên Tử cùng 4U, tôi như được tái sinh. Sự chăm sóc tỉ mỉ từ bữa ăn đến không gian thiền định giúp tôi buông bỏ hoàn toàn stress từ công việc quản trị.',
      author: 'Nguyễn Thanh Hà',
      role: 'CEO & Founder Chuỗi Bán Lẻ Công Nghệ',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      trip: 'Series Retreat Chữa Lành — Yên Tử 3N2Đ'
    },
    {
      quote: 'Một hành trình du thuyền Hạ Long hoàn toàn khác biệt. Không ồn ào xô bồ, mỗi sáng thức dậy ngắm bình minh tập Tai Chi, thưởng trà đạo và lắng nghe tiếng sóng biển thật kỳ diệu.',
      author: 'Trần Minh Trí',
      role: 'Kiến Trúc Sư Trưởng — TP. HCM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      trip: 'Retreat Độc Quyền — Du Thuyền Hạ Long 3N2Đ'
    },
    {
      quote: 'Gia đình tôi đã có những giây phút gắn kết chưa từng có. 4U tổ chức tinh tế đến từng chi tiết nhỏ, ba mẹ tôi lớn tuổi nhưng đi lại rất thoải mái nhờ sự chăm sóc chu đáo của hướng dẫn viên.',
      author: 'Lê Hoàng Yến',
      role: 'Bác Sĩ Trưởng Khoa Nhi — Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      rating: 5,
      trip: 'Retreat Thiên Nhiên — Măng Đen 4N3Đ'
    }
  ];

  return (
    <div className="about-page-root">

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <ScrollReveal>
            <div className="about-hero-badge">
              ✦ TRIẾT LÝ NGHỈ DƯỠNG MAY ĐO ĐỘC BẢN
            </div>

            <h1 className="about-hero-title">
              Vì Sao Chọn <span className="about-hero-title-highlight">4U Retreat</span>?
            </h1>

            <p className="about-hero-desc">
              Không chỉ là một chuyến đi du lịch thông thường, mỗi hành trình của 4U là một liệu pháp phục hồi năng lượng sống nguyên bản, may đo độc bản và đánh thức những giá trị bình yên nhất trong tâm hồn.
            </p>

            <div className="about-hero-btn-group">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : (onNavigate && onNavigate('/retreats-doc-quyen'))}
                className="about-primary-btn"
              >
                <span>Nhận Tư Vấn May Đo 1:1</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('triet-ly-4u');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="about-secondary-btn"
              >
                Khám Phá Triết Lý 4U
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STATS FLOATING BANNER */}
      <div className="about-stats-wrap">
        <div className="about-stats-grid">
          <div>
            <div className="about-stat-number">14+</div>
            <div className="about-stat-label">Năm Kinh Nghiệm Lữ Hành</div>
          </div>
          <div>
            <div className="about-stat-number">100%</div>
            <div className="about-stat-label">Điểm Đến Biệt Lập Nguyên Sơ</div>
          </div>
          <div>
            <div className="about-stat-number">4.98 / 5</div>
            <div className="about-stat-label">Mức Độ Hài Lòng Tuyệt Đối</div>
          </div>
          <div>
            <div className="about-stat-number">1 : 1</div>
            <div className="about-stat-label">Thiết Kế May Đo Chuyên Sâu</div>
          </div>
        </div>
      </div>

      {/* 3. CORE PILLARS SECTION (THÂN - TÂM - TRÍ - BẢO TỒN) */}
      <section id="triet-ly-4u" className="about-pillars-section">
        <div className="about-pillars-container">
          <ScrollReveal>
            <div className="about-section-header">
              <div className="about-section-pill">
                ✦ 4 TRỤ CỘT CHĂM SÓC
              </div>
              <h2 className="about-section-title">
                Nền Tảng Trải Nghiệm Tại 4U Retreat
              </h2>
              <p className="about-section-desc">
                Mỗi hành trình được kiến tạo xung quanh 4 trụ cột cốt lõi nhằm đem lại sự chuyển hóa toàn diện và năng lượng sống tích cực.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillar Tabs */}
          <div className="about-pillar-tabs">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillarTab(idx)}
                className={`about-pillar-tab-btn ${activePillarTab === idx ? 'active' : ''}`}
              >
                <span>{pillar.icon}</span>
                <span>{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <ScrollReveal>
            <div className="about-pillar-card">
              <div className="about-pillar-info">
                <div className="about-pillar-sub">
                  {pillars[activePillarTab].sub}
                </div>
                <h3 className="about-pillar-heading">
                  {pillars[activePillarTab].title}
                </h3>
                <p className="about-pillar-summary">
                  {pillars[activePillarTab].summary}
                </p>

                <div className="about-pillar-points">
                  {pillars[activePillarTab].points.map((pt, pIdx) => (
                    <div key={pIdx} className="about-pillar-point-item">
                      <CheckCircle2 size={18} color="#006d36" className="about-pillar-point-icon" />
                      <span className="about-pillar-point-text">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-pillar-img-wrap">
                <img
                  src={pillars[activePillarTab].image}
                  alt={pillars[activePillarTab].title}
                  className="about-pillar-img"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. WHY WE STAND OUT — 6 REASONS BENTO GRID */}
      <section className="about-reasons-section">
        <div className="about-pillars-container">
          <ScrollReveal>
            <div className="about-section-header">
              <div className="about-section-pill">
                ✦ GIÁ TRỊ VƯỢT TRỘI
              </div>
              <h2 className="about-section-title">
                6 Đặc Quyền Khác Biệt Tại 4U
              </h2>
              <p className="about-section-desc">
                Những tiêu chuẩn khắt khe tạo nên đẳng cấp và sự hài lòng trọn vẹn trong từng chuyến đi.
              </p>
            </div>
          </ScrollReveal>

          <div className="about-reasons-grid">
            {reasons.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div className="about-reason-card">
                  <div className="about-reason-top">
                    <div className="about-reason-icon-box">
                      {item.icon}
                    </div>
                    <span className="about-reason-num">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="about-reason-title">
                    {item.title}
                  </h3>

                  <p className="about-reason-desc">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS (TIẾNG NÓI KHÁCH HÀNG) */}
      <section className="about-testimonials-section">
        <div className="about-pillars-container">
          <ScrollReveal>
            <div className="about-section-header">
              <div className="about-section-pill">
                ✦ CẢM NHẬN KHÁCH HÀNG
              </div>
              <h2 className="about-section-title">
                Hành Trình Tái Sinh Qua Lời Kể
              </h2>
            </div>
          </ScrollReveal>

          <div className="about-testimonials-grid">
            {testimonials.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="about-testimonial-card">
                  <div className="about-testimonial-stars">
                    {[...Array(item.rating)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#facc15" color="#facc15" />
                    ))}
                  </div>

                  <p className="about-testimonial-quote">
                    "{item.quote}"
                  </p>

                  <div className="about-testimonial-trip">
                    {item.trip}
                  </div>

                  <div className="about-testimonial-author">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="about-testimonial-avatar"
                    />
                    <div>
                      <div className="about-author-name">{item.author}</div>
                      <div className="about-author-role">{item.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEGAL CERTIFICATION & STRATEGIC PARTNERS */}
      <section className="about-legal-section">
        <div className="about-legal-header">
          <h3 className="about-legal-title">
            Bảo Chứng Pháp Lý & An Toàn Tuyệt Đối
          </h3>
          <p className="about-legal-desc">
            Công Ty Cổ Phần Lữ Hành & Nghỉ Dưỡng 4U Tours hoạt động theo Giấy phép Kinh Doanh Lữ Hành Quốc Tế số <strong>79-367 / 2012 / TCDL-GP LHQT</strong> do Cục Du Lịch Quốc Gia Việt Nam cấp phép.
          </p>
        </div>

        <div className="about-partners-logos">
          <span className="about-partner-name">SIX SENSES</span>
          <span className="about-partner-name">PARADISE CRUISES</span>
          <span className="about-partner-name">LEGACY YÊN TỬ</span>
          <span className="about-partner-name">VIETNAM AIRLINES</span>
          <span className="about-partner-name">BIC INSURANCE</span>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="about-cta-section">
        <div className="about-cta-inner">
          <ScrollReveal>
            <h2 className="about-cta-title">
              Sẵn Sàng Cho Hành Trình Tái Sinh Của Bạn?
            </h2>
            <p className="about-cta-desc">
              Hãy để chuyên gia 4U thiết kế một kỳ nghỉ may đo dành riêng cho bạn và người thân. Trải nghiệm tĩnh dưỡng đẳng cấp bắt đầu từ đây.
            </p>

            <div className="about-hero-btn-group">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : (onNavigate && onNavigate('/retreats-doc-quyen'))}
                className="about-cta-white-btn"
              >
                Đặt Lịch Tư Vấn May Đo 1:1
              </button>

              <button
                onClick={() => onNavigate ? onNavigate('/tours') : null}
                className="about-cta-outline-btn"
              >
                Xem Toàn Bộ Hành Trình
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
