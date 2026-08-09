import React, { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { fetchSectionItemsApi, getImageUrl } from '../services/apiService';
import { TESTIMONIALS_DATA, syncTestimonialsDataFromApi } from '../data/testimonialsData';
import './Testimonials.css';


const DEFAULT_TESTIMONIALS = [
  { name: "Trần Bích Ngọc", role: "Gia Đình Nhiều Thế Hệ", text: "Chuyến đi trọn vẹn niềm vui cho cả 3 thế hệ gia đình tôi. Resort có không gian tĩnh lặng, đồ ăn hữu cơ tươi ngon và hỗ trợ xe nôi chu đáo.", color: "#1E4A3D" },
  { name: "Chị Telesia Phạm", role: "Gói Combo Gia Đình Phú Quốc", text: "4U Retreat lo từng chi tiết nhỏ nhất cho gia đình tôi. Mọi thủ tục nhanh chóng, tinh tế và riêng tư tuyệt đối.", color: "#B08A46" },
  { name: "Elena R.", role: "Du Khách Tự Túc (Solo Traveler)", text: "Tour trekking Sapa bản địa chân thực và rất an toàn cho nữ du khách đi một mình. Rất tiến cử 4U Retreat cho các bạn du lịch tự túc!", color: "#2E86AB" },
  { name: "Hassan Ali", role: "Khách Hàng Expat", text: "Trải nghiệm vượt xa mong đợi của khách nước ngoài như tôi. Mọi thủ tục nhanh chóng, tinh tế và riêng tư tuyệt đối.", color: "#0C2620" }
];

export default function Testimonials() {
  const [list, setList] = useState<any[]>(TESTIMONIALS_DATA.length > 0 ? TESTIMONIALS_DATA : DEFAULT_TESTIMONIALS);

  useEffect(() => {
    fetchSectionItemsApi('testimonials').then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        syncTestimonialsDataFromApi(res);
        const mapped = res.map((item: any) => ({
          name: item.name || 'Khách hàng 4U',
          role: item.role || item.occupation || 'Hành khách Retreat',
          text: item.text || item.comment || 'Dịch vụ vô cùng tuyệt vời!',
          color: item.color || '#1E4A3D'
        }));
        setList(mapped);
      }
    });
  }, []);

  const normalizedList = React.useMemo(() => {
    return list.map((item: any) => ({
      ...item,
      name: item?.name || 'Khách Hàng 4U',
      role: item?.role || item?.occupation || 'Thành Viên Retreat',
      text: item?.text || item?.comment || 'Trải nghiệm vô cùng tuyệt vời!',
      color: item?.color || '#1E4A3D',
    }));
  }, [list]);

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

  const doubleTestimonials = [...normalizedList, ...normalizedList];
  const speed = 0.55;

  const getInitials = (name?: string) => {
    if (!name || typeof name !== 'string' || !name.trim()) return '4U';
    const parts = name.trim().split(' ').filter(w => w.length > 0);
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0] ? parts[0][0].toUpperCase() : '4U';
  };

  useEffect(() => {
    const measure = () => {
      if (cardsRef.current[0] && cardsRef.current[normalizedList.length]) {
        const first = cardsRef.current[0];
        const midCard = cardsRef.current[normalizedList.length];
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
  }, [list.length]);

  return (
    <section
      id="testimonials"
      style={{
        background: '#e5efe8',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#10201B',
        padding: '90px 0 100px 0',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
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
            Khách hàng nói gì về <span style={{ color: '#2D5A36', fontWeight: 700, fontStyle: 'italic' }}>chúng tôi</span>?
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
                    {t.avatar ? (
                      <img src={getImageUrl(t.avatar)} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div className="testimonial-avatar" style={{ background: t.color }}>
                        {getInitials(t.name)}
                      </div>
                    )}

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
    </section>
  );
}
