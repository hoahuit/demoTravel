import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { TestimonialsColumn } from './ui/testimonials-columns-1';

export const testimonials = [
  {
    text: "Đoàn doanh nghiệp của chúng tôi đã có trải nghiệm tuyệt vời với hoạt động hái rau và nấu ăn tại Củ Chi. Đội ngũ 4U Retreat phục vụ cực kỳ chuyên nghiệp!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    name: "Flow Traders Company",
    role: "Khách hàng Doanh Nghiệp (Corporate Retreat)",
  },
  {
    text: "Chuyến nghỉ dưỡng Đà Nẵng cuối tuần qua 4U Retreat quá hoàn hảo. Xe riêng đưa đón êm ái, concierge nói tiếng Pháp lưu khoát và villa rất đẹp.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "Sophie & Marc",
    role: "Gia đình Expat tại TP.HCM",
  },
  {
    text: "Tôi từng nghĩ Tour chỉ là đi ngắm cảnh, nhưng 4U Retreat thực sự KHÁC BIỆT. Không chỉ giải tỏa căng thẳng mà còn giúp tôi tái tạo năng lượng sống.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    name: "Anh Danny Trần",
    role: "Gói Retreat Tĩnh Tâm & Sức Khỏe",
  },
  {
    text: "Chuyến đi trọn vẹn niềm vui cho cả 3 thế hệ gia đình tôi. Resort có không gian tĩnh lặng, đồ ăn hữu cơ tươi ngon và hỗ trợ xe nôi chu đáo.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    name: "Trần Bích Ngọc",
    role: "Gia Đình Nhiều Thế Hệ",
  },
  {
    text: "Du thuyền Hạ Long kết hợp xe đón tiễn nhanh VIP tại sân bay. Dịch vụ đạt điểm 10/10 từ lúc đón đến lúc chia tay cho gia đình tôi!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    name: "David L.",
    role: "Du khách quốc tế từ Anh Quốc",
  },
  {
    text: "Một chuyến đi gia đình tuyệt vời tại Phú Quốc. Dù lịch trình phong phú nhưng ai cũng cảm thấy thư thái và tràn đầy năng lượng sau chuyến đi.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    name: "Chị Telesia Phạm",
    role: "Gói Combo Gia Đình Phú Quốc",
  },
  {
    text: "Tour trekking Sapa bản địa chân thực và rất an toàn cho nữ du khách đi một mình. Rất tiến cử 4U Retreat cho các bạn du lịch tự túc!",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    name: "Elena R.",
    role: "Du khách tự túc (Solo Traveler)",
  },
  {
    text: "Hành trình di sản Hội An - Huế thiết kế riêng với hướng dẫn viên kiến thức am hiểu và phương tiện di chuyển hiện đại, tiện nghi bậc nhất.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    name: "Marcus & Emma",
    role: "Du Khách Đức (Inbound Travelers)",
  },
  {
    text: "Xe Limousine 9 chỗ đưa đón tận nơi rất êm ái cho người già và trẻ nhỏ. Tài xế lịch sự, cẩn thận và đúng giờ từng phút.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    name: "Hoàng Minh Trí",
    role: "Khách hàng thân thiết",
  },
  {
    text: "Biệt thự tại Đà Lạt có view rừng thông mê đắm. Đội ngũ hỗ trợ 24/7 nhiệt tình chuẩn bị tiệc BBQ ngoài trời cho nhóm bạn chúng tôi.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    name: "Nguyễn Hà My",
    role: "Nhóm Bạn Trẻ Nghỉ Dưỡng",
  },
  {
    text: "4U Retreat hiểu rõ từng mong muốn nhỏ nhất của du khách nước ngoài. Mọi thủ tục nhanh chóng, tinh tế và riêng tư tuyệt đối.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
    name: "Hassan Ali",
    role: "Khách hàng Expat",
  },
  {
    text: "Được tận hưởng những ngày ngắt kết nối với công nghệ giữa thiên nhiên ngập tràn năng lượng. Cảm ơn 4U Retreat vì trải nghiệm tuyệt vời!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "Lê Anh Tuấn",
    role: "Giám Đốc Sáng Tạo",
  }
];

const firstColumn = testimonials.slice(0, 4);
const secondColumn = testimonials.slice(4, 8);
const thirdColumn = testimonials.slice(8, 12);

const brandLogos = [
  {
    name: 'Apple Music',
    svg: (
      <svg height="55" viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 32c0-6.8 5.5-10.1 5.8-10.3-3.1-4.6-8.1-5.3-9.8-5.4-4.2-.4-8.2 2.5-10.3 2.5-2.1 0-5.4-2.4-8.8-2.3-4.5.1-8.8 2.6-11.1 6.6-4.8 8.3-1.2 20.5 3.4 27.2 2.3 3.2 4.9 6.9 8.5 6.8 3.4-.1 4.8-2.2 8.9-2.2 4.1 0 5.2 2.2 8.8 2.1 3.7-.1 6-3.3 8.3-6.6 2.6-3.8 3.7-7.5 3.8-7.7-.1-.1-7.3-2.8-7.4-10.9z" fill="#1d1d1f" />
        <path d="M33.6 11.9c1.9-2.3 3.2-5.5 2.8-8.7-2.7.1-6.1 1.8-8 4.1-1.8 2.1-3.3 5.4-2.9 8.5 3.1.2 6.2-1.6 8.1-3.9z" fill="#1d1d1f" />
        <text x="64" y="44" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="700" fill="#1d1d1f" letterSpacing="-0.5">Music</text>
      </svg>
    )
  },
  {
    name: 'Chrome',
    svg: (
      <svg height="55" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" fill="#EA4335" />
        <circle cx="32" cy="32" r="18" fill="#FBBC05" />
        <circle cx="32" cy="32" r="12" fill="#34A853" />
        <circle cx="32" cy="32" r="9" fill="#4285F4" />
        <circle cx="32" cy="32" r="5" fill="#FFFFFF" />
        <text x="70" y="42" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="700" fill="#202124" letterSpacing="-0.5">chrome</text>
      </svg>
    )
  },
  {
    name: 'Strava',
    svg: (
      <svg height="55" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 46l10-20h9L22 6 3 46h8.5l3.5-7h14l3.5 7H22zm-3-14l4-8 4 8h-8z" fill="#FC5200" />
        <path d="M38 46l6-12h5.5l-6 12H38z" fill="#FC5200" opacity="0.6" />
        <text x="65" y="42" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="800" fill="#FC5200" letterSpacing="-0.5">STRAVA</text>
      </svg>
    )
  },
  {
    name: 'Nintendo',
    svg: (
      <svg height="55" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="210" height="45" rx="22.5" stroke="#E60012" strokeWidth="4" fill="none" />
        <text x="110" y="42" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="28" fontWeight="800" fill="#E60012" letterSpacing="-0.5">Nintendo</text>
      </svg>
    )
  },
  {
    name: 'jQuery',
    svg: (
      <svg height="55" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 25c4-8 12-12 20-10-3 3-5 7-5 11 0 7 5 12 12 12 5 0 9-3 11-7-1 9-8 16-17 16-10 0-18-8-21-22z" fill="#0769AD" />
        <text x="50" y="42" fontFamily="sans-serif" fontSize="28" fontWeight="800" fill="#0769AD" letterSpacing="-0.5">jQuery</text>
      </svg>
    )
  },
  {
    name: 'Prada',
    svg: (
      <svg height="55" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="95" y="44" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="34" fontWeight="900" fill="#000000" letterSpacing="5">PRADA</text>
      </svg>
    )
  }
];

const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

export default function Testimonials() {
  return (
    <section className="testimonials-section" style={{ background: '#f5f5f7', position: 'relative', overflow: 'hidden', padding: '80px 0 100px 0' }} id="testimonials">
      
      {/* ── 1. TESTIMONIALS GRID (Centered Container) ── */}
      <div className="apple-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(45, 90, 54, 0.08)',
              border: '1px solid rgba(45, 90, 54, 0.25)',
              color: '#2d5a36',
              fontSize: '0.78rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.12em'
            }}>
              Đánh Giá & Cảm Nhận Thực Tế
            </span>
          </div>

          <h2 className="apple-section-title" style={{ color: '#142619' }}>
            Khách hàng nói gì về trải nghiệm <span style={{ color: '#2d5a36' }}>4U Retreat</span>?
          </h2>

          <p className="apple-subtitle" style={{ maxWidth: '720px', margin: '12px auto 0 auto', color: '#527059', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Lắng nghe cảm nhận thực tế từ các gia đình, doanh nghiệp & khách du lịch quốc tế sau chuyến đi.
          </p>
        </motion.div>

        {/* 3-Column Animated Testimonials Grid with 4 Comments Per Column */}
        <div
          className="testimonials-animated-grid"
          style={{
            maxWidth: '1240px',
            margin: '32px auto 0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
            maxHeight: '740px',
            overflow: 'hidden',
            position: 'relative',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} duration={20} />
        </div>
      </div>

      {/* ── 2. FULL SCREEN EDGE-TO-EDGE MARQUEE LOGOS (100% Width) ── */}
      <div style={{ width: '100%', marginTop: '72px', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px', padding: '0 20px' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: '#86868b',
            letterSpacing: '0.14em',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#2d5a36" /> ĐỐI TÁC DOANH NGHIỆP & THƯƠNG HIỆU ĐỒNG HÀNH
          </div>
        </div>

        {/* 100% Full-bleed Edge-to-Edge Marquee Track */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px 0' }}>
          {/* Left Vignette Fade */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '160px',
            background: 'linear-gradient(to right, #f5f5f7 30%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />
          {/* Right Vignette Fade */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '160px',
            background: 'linear-gradient(to right, transparent 0%, #f5f5f7 70%)',
            zIndex: 10,
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div className="infinite-slider-track" style={{ display: 'flex', gap: '60px', alignItems: 'center', width: 'max-content' }}>
                {duplicatedLogos.map((brand, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 24px' }}>
                    {brand.svg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
