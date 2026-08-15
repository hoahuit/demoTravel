import React, { useState } from 'react';
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
    <div style={{ backgroundColor: '#ffffff', color: '#10201B', fontFamily: "'Plus Jakarta Sans', sans-serif", width: '100%', overflowX: 'hidden' }}>

      {/* 1. CINEMATIC HERO SECTION */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        backgroundImage: `linear-gradient(180deg, rgba(16, 32, 27, 0.7) 0%, rgba(16, 32, 27, 0.85) 100%), url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=2560&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 100px',
        boxSizing: 'border-box',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              color: '#a7f3d0',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              ✦ TRIẾT LÝ NGHỈ DƯỠNG MAY ĐO ĐỘC BẢN
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 600,
              lineHeight: 1.15,
              margin: '0 0 24px 0',
              letterSpacing: '-0.02em',
              fontStyle: 'italic'
            }}>
              Vì Sao Chọn <span style={{ color: '#6ee7b7', fontStyle: 'normal', fontWeight: 800 }}>4U Retreat</span>?
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '820px',
              margin: '0 auto 36px',
              fontWeight: 400
            }}>
              Không chỉ là một chuyến đi du lịch thông thường, mỗi hành trình của 4U là một liệu pháp phục hồi năng lượng sống nguyên bản, may đo độc bản và đánh thức những giá trị bình yên nhất trong tâm hồn.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : (onNavigate && onNavigate('/retreats-doc-quyen'))}
                style={{
                  background: '#006d36',
                  color: '#ffffff',
                  border: 'none',
                  padding: '15px 36px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0, 109, 54, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>Nhận Tư Vấn May Đo 1:1</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('triet-ly-4u');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  padding: '15px 32px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                Khám Phá Triết Lý 4U
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STATS FLOATING BANNER */}
      <div style={{ maxWidth: '1240px', margin: '-50px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 20px 60px rgba(16, 32, 27, 0.08)',
          border: '1px solid rgba(16, 32, 27, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '44px', fontWeight: 800, color: '#006d36', lineHeight: 1 }}>14+</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Năm Kinh Nghiệm Lữ Hành</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '44px', fontWeight: 800, color: '#006d36', lineHeight: 1 }}>100%</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Điểm Đến Biệt Lập Nguyên Sơ</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '44px', fontWeight: 800, color: '#006d36', lineHeight: 1 }}>4.98 / 5</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mức Độ Hài Lòng Tuyệt Đối</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '44px', fontWeight: 800, color: '#006d36', lineHeight: 1 }}>1 : 1</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thiết Kế May Đo Chuyên Sâu</div>
          </div>
        </div>
      </div>

      {/* 3. CORE PILLARS SECTION (THÂN - TÂM - TRÍ - BẢO TỒN) */}
      <section id="triet-ly-4u" style={{ padding: '120px 0 100px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(0, 109, 54, 0.08)',
                color: '#006d36',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                ✦ 4 TRỤ CỘT CHĂM SÓC
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#10201B',
                margin: '0 0 16px 0'
              }}>
                Nền Tảng Trải Nghiệm Tại 4U Retreat
              </h2>
              <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '16px', color: '#525a54', lineHeight: 1.7 }}>
                Mỗi hành trình được kiến tạo xung quanh 4 trụ cột cốt lõi nhằm đem lại sự chuyển hóa toàn diện và năng lượng sống tích cực.
              </p>
            </div>
          </ScrollReveal>

          {/* Pillar Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillarTab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  border: activePillarTab === idx ? '2px solid #006d36' : '1px solid #e2e8f0',
                  background: activePillarTab === idx ? '#006d36' : '#ffffff',
                  color: activePillarTab === idx ? '#ffffff' : '#334155',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>{pillar.icon}</span>
                <span>{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <ScrollReveal>
            <div style={{
              background: '#f8faf9',
              borderRadius: '28px',
              border: '1px solid rgba(0, 109, 54, 0.12)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              boxShadow: '0 12px 36px rgba(16, 32, 27, 0.05)'
            }}>
              <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#006d36', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {pillars[activePillarTab].sub}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#10201B',
                  margin: '0 0 16px 0'
                }}>
                  {pillars[activePillarTab].title}
                </h3>
                <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, margin: '0 0 28px 0' }}>
                  {pillars[activePillarTab].summary}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {pillars[activePillarTab].points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <CheckCircle2 size={18} color="#006d36" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ minHeight: '380px', position: 'relative' }}>
                <img
                  src={pillars[activePillarTab].image}
                  alt={pillars[activePillarTab].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. WHY WE STAND OUT — 6 REASONS BENTO GRID */}
      <section style={{ padding: '110px 0 120px', background: '#e5efe8' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(45, 90, 54, 0.1)',
                color: '#2d5a36',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                ✦ GIÁ TRỊ VƯỢT TRỘI
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#10201B',
                margin: '0 0 16px 0'
              }}>
                6 Đặc Quyền Khác Biệt Tại 4U
              </h2>
              <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '16px', color: '#527059', lineHeight: 1.7 }}>
                Những tiêu chuẩn khắt khe tạo nên đẳng cấp và sự hài lòng trọn vẹn trong từng chuyến đi.
              </p>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}>
            {reasons.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '36px 30px',
                  border: '1px solid rgba(16, 32, 27, 0.08)',
                  boxShadow: '0 6px 20px rgba(16, 32, 27, 0.03)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxSizing: 'border-box',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(16, 32, 27, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 32, 27, 0.03)';
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: 'rgba(0, 109, 54, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.icon}
                    </div>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 800, color: 'rgba(0, 109, 54, 0.25)' }}>
                      {item.num}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#10201B',
                    margin: '0 0 12px 0',
                    lineHeight: 1.35
                  }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '14.5px', color: '#525a54', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GUEST TESTIMONIALS (TIẾNG NÓI KHÁCH HÀNG) */}
      <section style={{ padding: '120px 0 110px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(0, 109, 54, 0.08)',
                color: '#006d36',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                ✦ CẢM NHẬN KHÁCH HÀNG
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#10201B',
                margin: '0 0 16px 0'
              }}>
                Hành Trình Tái Sinh Qua Lời Kể
              </h2>
            </div>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            {testimonials.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div style={{
                  background: '#fcfdfc',
                  border: '1px solid rgba(0, 109, 54, 0.12)',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[...Array(item.rating)].map((_, sIdx) => (
                      <Star key={sIdx} size={16} fill="#facc15" color="#facc15" />
                    ))}
                  </div>

                  <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 24px 0', flexGrow: 1 }}>
                    "{item.quote}"
                  </p>

                  <div style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#006d36',
                    background: 'rgba(0, 109, 54, 0.08)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    marginBottom: '18px',
                    width: 'fit-content'
                  }}>
                    {item.trip}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <img
                      src={item.avatar}
                      alt={item.author}
                      style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#10201B' }}>{item.author}</div>
                      <div style={{ fontSize: '12.5px', color: '#64748b' }}>{item.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEGAL CERTIFICATION & STRATEGIC PARTNERS */}
      <section style={{ padding: '80px 0 100px', background: '#f8faf9', borderTop: '1px solid rgba(16, 32, 27, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto 48px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#10201B', margin: '0 0 12px 0' }}>
              Bảo Chứng Pháp Lý & An Toàn Tuyệt Đối
            </h3>
            <p style={{ fontSize: '14.5px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Công Ty Cổ Phần Lữ Hành & Nghỉ Dưỡng 4U Tours hoạt động theo Giấy phép Kinh Doanh Lữ Hành Quốc Tế số <strong>79-367 / 2012 / TCDL-GP LHQT</strong> do Cục Du Lịch Quốc Gia Việt Nam cấp phép.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            opacity: 0.85
          }}>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a29', letterSpacing: '0.05em' }}>SIX SENSES</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a29', letterSpacing: '0.05em' }}>PARADISE CRUISES</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a29', letterSpacing: '0.05em' }}>LEGACY YÊN TỬ</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a29', letterSpacing: '0.05em' }}>VIETNAM AIRLINES</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a29', letterSpacing: '0.05em' }}>BIC INSURANCE</span>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #006d36 0%, #142619 100%)',
        color: '#ffffff',
        padding: '90px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 50px)',
              fontStyle: 'italic',
              fontWeight: 600,
              margin: '0 0 20px 0'
            }}>
              Sẵn Sàng Cho Hành Trình Tái Sinh Của Bạn?
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7, margin: '0 0 36px 0' }}>
              Hãy để chuyên gia 4U thiết kế một kỳ nghỉ may đo dành riêng cho bạn và người thân. Trải nghiệm tĩnh dưỡng đẳng cấp bắt đầu từ đây.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : (onNavigate && onNavigate('/retreats-doc-quyen'))}
                style={{
                  background: '#ffffff',
                  color: '#006d36',
                  border: 'none',
                  padding: '16px 36px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Đặt Lịch Tư Vấn May Đo 1:1
              </button>

              <button
                onClick={() => onNavigate ? onNavigate('/tours') : null}
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  padding: '16px 32px',
                  borderRadius: '999px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                }}
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
