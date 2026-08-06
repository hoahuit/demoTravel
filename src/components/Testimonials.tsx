import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface TestimonialData {
  name: string;
  role: string;
  text: string;
  color: string;
}

const TESTIMONIALS_DATA: TestimonialData[] = [
  { name: "Trần Bích Ngọc", role: "Gia Đình Nhiều Thế Hệ", text: "Chuyến đi trọn vẹn niềm vui cho cả 3 thế hệ gia đình tôi. Resort có không gian tĩnh lặng, đồ ăn hữu cơ tươi ngon và hỗ trợ xe nôi chu đáo.", color: "#1E4A3D" },
  { name: "Chị Telesia Phạm", role: "Gói Combo Gia Đình Phú Quốc", text: "4U Retreat lo từng chi tiết nhỏ nhất cho gia đình tôi. Mọi thủ tục nhanh chóng, tinh tế và riêng tư tuyệt đối.", color: "#B08A46" },
  { name: "Elena R.", role: "Du Khách Tự Túc (Solo Traveler)", text: "Tour trekking Sapa bản địa chân thực và rất an toàn cho nữ du khách đi một mình. Rất tiến cử 4U Retreat cho các bạn du lịch tự túc!", color: "#2E86AB" },
  { name: "Hassan Ali", role: "Khách Hàng Expat", text: "Trải nghiệm vượt xa mong đợi của khách nước ngoài như tôi. Mọi thủ tục nhanh chóng, tinh tế và riêng tư tuyệt đối.", color: "#0C2620" },
  { name: "Lê Anh Tuấn", role: "Giám Đốc Sáng Tạo", text: "Được tận hưởng những ngày ngắt kết nối với công nghệ giữa thiên nhiên ngập tràn năng lượng. Cảm ơn 4U Retreat vì trải nghiệm tuyệt vời!", color: "#B7C9AE" },
  { name: "Đoàn DN Củ Chi", role: "Team Building Doanh Nghiệp", text: "Đoàn doanh nghiệp của chúng tôi đã có trải nghiệm tuyệt vời với hoạt động hái rau và nấu ăn tại Củ Chi. Đội ngũ 4U phục vụ cực kỳ chu đáo.", color: "#1E4A3D" },
  { name: "Nguyễn Hải Yến", role: "Hành Trình Di Sản Hội An – Huế", text: "Hành trình di sản Hội An – Huế được thiết kế riêng với hướng dẫn viên kiến thức uyên thâm và những góc nhìn rất khác biệt.", color: "#2E86AB" },
  { name: "Minh Khuê", role: "Cặp Đôi Honeymoon Đà Lạt", text: "Không gian riêng tư, lãng mạn giữa đồi thông. Từng chi tiết nhỏ đều được chăm chút khiến chuyến đi trở nên đáng nhớ.", color: "#B08A46" }
];

interface BrandLogo {
  name: string;
  svg: React.ReactNode;
}

const brandLogos: BrandLogo[] = [
  {
    name: 'Apple Music',
    svg: (
      <svg height="50" viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 32c0-6.8 5.5-10.1 5.8-10.3-3.1-4.6-8.1-5.3-9.8-5.4-4.2-.4-8.2 2.5-10.3 2.5-2.1 0-5.4-2.4-8.8-2.3-4.5.1-8.8 2.6-11.1 6.6-4.8 8.3-1.2 20.5 3.4 27.2 2.3 3.2 4.9 6.9 8.5 6.8 3.4-.1 4.8-2.2 8.9-2.2 4.1 0 5.2 2.2 8.8 2.1 3.7-.1 6-3.3 8.3-6.6 2.6-3.8 3.7-7.5 3.8-7.7-.1-.1-7.3-2.8-7.4-10.9z" fill="#1d1d1f" />
        <path d="M33.6 11.9c1.9-2.3 3.2-5.5 2.8-8.7-2.7.1-6.1 1.8-8 4.1-1.8 2.1-3.3 5.4-2.9 8.5 3.1.2 6.2-1.6 8.1-3.9z" fill="#1d1d1f" />
        <text x="64" y="44" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="700" fill="#1d1d1f" letterSpacing="-0.5">Music</text>
      </svg>
    )
  },
  {
    name: 'Chrome',
    svg: (
      <svg height="50" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg height="50" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 46l10-20h9L22 6 3 46h8.5l3.5-7h14l3.5 7H22zm-3-14l4-8 4 8h-8z" fill="#FC5200" />
        <path d="M38 46l6-12h5.5l-6 12H38z" fill="#FC5200" opacity="0.6" />
        <text x="65" y="42" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="800" fill="#FC5200" letterSpacing="-0.5">STRAVA</text>
      </svg>
    )
  },
  {
    name: 'Nintendo',
    svg: (
      <svg height="50" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="210" height="45" rx="22.5" stroke="#E60012" strokeWidth="4" fill="none" />
        <text x="110" y="42" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="28" fontWeight="800" fill="#E60012" letterSpacing="-0.5">Nintendo</text>
      </svg>
    )
  },
  {
    name: 'jQuery',
    svg: (
      <svg height="50" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 25c4-8 12-12 20-10-3 3-5 7-5 11 0 7 5 12 12 12 5 0 9-3 11-7-1 9-8 16-17 16-10 0-18-8-21-22z" fill="#0769AD" />
        <text x="50" y="42" fontFamily="sans-serif" fontSize="28" fontWeight="800" fill="#0769AD" letterSpacing="-0.5">jQuery</text>
      </svg>
    )
  },
  {
    name: 'Prada',
    svg: (
      <svg height="50" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="95" y="44" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="34" fontWeight="900" fill="#000000" letterSpacing="5">PRADA</text>
      </svg>
    )
  }
];

const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

export default function Testimonials() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const offsetRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);
  const hoverLockedRef = useRef<boolean>(false);
  const activeCardIndexRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);

  const doubleTestimonials = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];
  const speed = 0.55;

  const getInitials = (name: string) => {
    const parts = name.split(' ').filter(w => w.length > 1);
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  useEffect(() => {
    const measure = () => {
      if (cardsRef.current[0] && cardsRef.current[TESTIMONIALS_DATA.length]) {
        const first = cardsRef.current[0];
        const midCard = cardsRef.current[TESTIMONIALS_DATA.length];
        if (first && midCard) {
          singleSetWidthRef.current = midCard.offsetLeft - first.offsetLeft;
        }
      }
    };

    measure();
    window.addEventListener('resize', measure);

    let animationFrameId: number;

    const updateActiveStates = () => {
      if (!viewportRef.current) return;
      const vpRect = viewportRef.current.getBoundingClientRect();
      const center = vpRect.left + vpRect.width / 2;
      const halfRange = vpRect.width * 0.32;

      let closestIdx = 0;
      let closestDist = Infinity;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(cardCenter - center);
        card.style.setProperty('--t', Math.min(dist / halfRange, 1).toFixed(3));

        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      if (!hoverLockedRef.current && activeCardIndexRef.current !== closestIdx) {
        activeCardIndexRef.current = closestIdx;
        setActiveIdx(closestIdx);
      }
    };

    const frame = () => {
      if (!pausedRef.current && trackRef.current && singleSetWidthRef.current > 0) {
        offsetRef.current -= speed;
        if (Math.abs(offsetRef.current) >= singleSetWidthRef.current) {
          offsetRef.current += singleSetWidthRef.current;
        }
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      updateActiveStates();
      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(animationFrameId);
    };
  }, [TESTIMONIALS_DATA.length]);

  return (
    <section
      id="testimonials"
      style={{
        background: '#f3f7f4',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#10201B',
        padding: '90px 0 100px 0',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        .testimonials-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(30,74,61,0.25);
          padding: 8px 18px;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1E4A3D;
          margin-bottom: 22px;
        }
        .testimonials-header-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2E86AB;
        }
        .testimonials-marquee-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 40px 0 56px;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .testimonials-marquee-viewport::before {
          content: "";
          position: absolute;
          inset: -20% -5%;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 32% 60% at 15% 30%, rgba(46,134,171,0.14), transparent 70%),
            radial-gradient(ellipse 30% 55% at 85% 70%, rgba(140,163,102,0.16), transparent 70%),
            radial-gradient(ellipse 26% 50% at 50% 90%, rgba(176,138,70,0.10), transparent 70%);
        }
        .testimonial-card {
          --t: 1;
          flex: 0 0 340px;
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(16,32,27,0.14);
          border-radius: 18px;
          padding: 28px 26px 24px;
          cursor: pointer;
          transform-origin: center bottom;
          filter: blur(calc(var(--t) * 4.5px));
          opacity: calc(1 - var(--t) * 0.55);
          transform: translateY(calc(var(--t) * 14px - 2px)) scale(calc(1.04 - var(--t) * 0.12));
          transition: background .5s ease, border-color .5s ease, box-shadow .5s ease, filter .5s ease, opacity .5s ease, transform .5s cubic-bezier(.22,.61,.36,1);
          position: relative;
          z-index: 1;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .testimonial-card .stars {
          display: flex;
          gap: 3px;
          margin-bottom: 16px;
        }
        .testimonial-card .stars svg {
          width: 14px;
          height: 14px;
          fill: #B08A46;
          transition: fill .45s ease;
        }
        .testimonial-card blockquote {
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(16,32,27,0.78);
          margin-bottom: 22px;
          min-height: 96px;
          transition: color .45s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .testimonial-card .person {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(16,32,27,0.08);
          transition: border-color .45s ease;
        }
        .testimonial-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          flex-shrink: 0;
        }
        .testimonial-card .person .who strong {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: #10201B;
          transition: color .45s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .testimonial-card .person .who span {
          font-size: 12px;
          color: rgba(16,32,27,0.55);
          transition: color .45s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .testimonial-verified {
          width: 13px;
          height: 13px;
          fill: #2E86AB;
          transition: fill .45s ease;
        }

        /* ---------- ACTIVE STATE (Glass Moss Glow) ---------- */
        .testimonial-card.is-active {
          background: rgba(255,255,255,0.75);
          border-color: #8CA366;
          box-shadow:
            0 0 0 1px #8CA366,
            0 0 32px 4px rgba(140,163,102,0.35),
            0 22px 40px -18px rgba(16,32,27,0.35);
          filter: none !important;
          opacity: 1 !important;
          transform: translateY(-14px) scale(1.08) !important;
          z-index: 4;
        }
        .testimonial-card.is-active .stars svg {
          fill: #8CA366;
        }
        .testimonial-card.is-active .person {
          border-top-color: rgba(88,107,63,0.22);
        }
        .testimonial-card.is-active .testimonial-verified {
          fill: #8CA366;
        }

        .testimonial-card.is-hovered {
          filter: none !important;
          opacity: 1 !important;
          transform: translateY(-16px) scale(1.1) !important;
          z-index: 5;
        }

        @media(max-width:640px) {
          .testimonial-card {
            flex: 0 0 280px;
            padding: 22px 20px 20px;
          }
          .testimonial-card blockquote {
            min-height: auto;
            font-size: 14px;
          }
        }
      `}</style>

      {/* ── 1. SECTION HEADER ── */}
      <ScrollReveal>
        <div style={{ maxWidth: '640px', margin: '0 auto 64px', textAlign: 'center', padding: '0 24px' }}>
          <div className="testimonials-header-badge">
            <span className="dot" /> Đánh Giá & Cảm Nhận Thực Tế
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.15,
              marginBottom: '18px',
              color: '#10201B',
              letterSpacing: '-0.01em'
            }}
          >
            Khách hàng nói gì về trải nghiệm <span style={{ color: '#2D5A36', fontWeight: 700 }}>4U Retreat</span>?
          </h2>
          <p style={{ fontSize: '15.5px', color: 'rgba(16,32,27,0.6)', lineHeight: 1.6, margin: 0 }}>
            Lắng nghe cảm nhận thực tế từ các gia đình, doanh nghiệp & khách du lịch quốc tế sau chuyến đi.
          </p>
        </div>
      </ScrollReveal>

      {/* ── 2. INFINITE MARQUEE VIEWPORT WITH RADIAL GLOW ── */}
      <ScrollReveal delay={150}>
        <div
          ref={viewportRef}
          className="testimonials-marquee-viewport"
        >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {doubleTestimonials.map((t, idx) => {
            const isActive = activeIdx === idx;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className={`testimonial-card ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => {
                  pausedRef.current = true;
                  hoverLockedRef.current = true;
                  setHoveredIdx(idx);
                  setActiveIdx(idx);
                  activeCardIndexRef.current = idx;
                }}
                onMouseLeave={() => {
                  pausedRef.current = false;
                  hoverLockedRef.current = false;
                  setHoveredIdx(null);
                }}
              >
                {/* 5 Stars SVG */}
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20">
                      <path d="M10 1l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 14.8 4.5 17.6l1.4-6.1L1.2 7.3l6.2-.6z" />
                    </svg>
                  ))}
                </div>

                {/* Blockquote */}
                <blockquote>"{t.text}"</blockquote>

                {/* Person Profile */}
                <div className="person">
                  <div className="testimonial-avatar" style={{ background: t.color }}>
                    {getInitials(t.name)}
                  </div>
                  <div className="who">
                    <strong>
                      {t.name}
                      <svg className="testimonial-verified" viewBox="0 0 20 20">
                        <path d="M10 1l2.2 1.3 2.5-.3 1 2.3 2.3 1-.3 2.5L19 10l-1.3 2.2.3 2.5-2.3 1-1 2.3-2.5-.3L10 19l-2.2-1.3-2.5.3-1-2.3-2.3-1 .3-2.5L1 10l1.3-2.2-.3-2.5 2.3-1 1-2.3 2.5.3z" />
                        <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </ScrollReveal>

      {/* ── 3. MARQUEE BRAND LOGOS ── */}
      <div style={{ width: '100%', marginTop: '48px', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px', padding: '0 20px' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: 'rgba(16,32,27,0.5)',
            letterSpacing: '0.14em',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#1E4A3D" /> ĐỐI TÁC DOANH NGHIỆP & THƯƠNG HIỆU ĐỒNG HÀNH
          </div>
        </div>

        {/* Marquee Track */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '16px 0' }}>
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0, width: '160px',
            background: 'linear-gradient(to right, #f3f7f4 30%, transparent 100%)',
            zIndex: 10, pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0, width: '160px',
            background: 'linear-gradient(to right, transparent 0%, #f3f7f4 70%)',
            zIndex: 10, pointerEvents: 'none'
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
