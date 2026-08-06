import React from 'react';
import ScrollReveal from './ScrollReveal';

export interface BentoGridProps {
  onOpenBooking?: () => void;
}

export default function BentoGrid({ onOpenBooking }: BentoGridProps) {
  const items = [
    {
      id: 1,
      image: '/images/dest_danang.png',
      location: 'Nam Cát Tiên, Đồng Nai',
      category: 'Gói Chữa Lành 1:1',
      title: 'Bình Yên Trên Cao Nguyên',
      desc: 'Tận hưởng không khí trong lành giữa đại ngàn, xe luxury đưa đón riêng tư và lộ trình yoga, thiền định thực hành 1:1 cùng chuyên gia.',
      price: '4.990.000 ₫',
      action: 'Nhận tư vấn'
    },
    {
      id: 2,
      image: '/images/tour_2.png',
      location: 'Bảo Lộc, Lâm Đồng',
      category: 'Hành Trình Rừng Xanh',
      title: 'Tĩnh Lặng Giữa Đại Ngàn',
      desc: 'Hành trình kết nối sâu sắc cùng rừng già và suối khoáng tự nhiên, len lỏi qua tán cây cổ thụ trăm năm ngàn tuổi.',
      price: '3.890.000 ₫',
      action: 'Nhận tư vấn'
    },
    {
      id: 3,
      image: '/images/dest_dalat.png',
      location: 'Đà Lạt, Lâm Đồng',
      category: 'Gia Đình & Tái Tạo',
      title: 'Tìm Lại Kết Nối',
      desc: 'Chuyến đi tái tạo năng lượng cho gia đình — lối sống chậm cùng thực đơn hữu cơ từ nông trại và workshop nghệ thuật.',
      price: '4.250.000 ₫',
      action: 'Nhận tư vấn'
    },
    {
      id: 4,
      image: '/images/dest_halong.png',
      location: 'Vườn Quốc Gia Cát Tiên',
      category: 'Bảo Tồn & Sinh Thái',
      title: 'Hành Trình Xanh Bảo Tồn',
      desc: 'Tham gia hoạt động trồng cây, khám phá hệ sinh thái rừng nguyên sinh & dùng bữa tối lãng mạn giữa vườn tre tự nhiên.',
      price: '5.100.000 ₫',
      action: 'Nhận tư vấn'
    }
  ];

  return (
    <section
      id="signatures"
      style={{
        background: '#f3f7f4',
        padding: '110px 0 130px',
        color: '#10201B',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .editorial-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          background: transparent;
          border-radius: 0;
          padding: 0;
          border: none;
          box-shadow: none;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-card:hover {
          transform: translateY(-6px);
        }
        .editorial-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.8;
          border-radius: 20px;
          overflow: hidden;
          background: #e2ebe4;
          box-shadow: 0 16px 40px -14px rgba(16, 32, 27, 0.14);
        }
        .editorial-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        }
        .editorial-card:hover .editorial-image-wrapper img {
          transform: scale(1.06);
          filter: brightness(1.03);
        }
        .editorial-tag-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          margin-bottom: 8px;
        }
        .editorial-location {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2d5a36;
        }
        .editorial-dot {
          opacity: 0.4;
          font-size: 10px;
          color: #2d5a36;
        }
        .editorial-category {
          font-size: 11.5px;
          font-weight: 600;
          color: #527059;
          letter-spacing: 0.04em;
        }
        .editorial-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(24px, 2.4vw, 30px);
          line-height: 1.18;
          color: #10201B;
          margin: 0 0 10px 0;
          transition: color 0.3s ease;
        }
        .editorial-card:hover .editorial-title {
          color: #1E4A3D;
        }
        .editorial-desc {
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(16, 32, 27, 0.75);
          margin: 0 0 22px 0;
          min-height: 48px;
        }
        .editorial-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(16, 32, 27, 0.08);
        }
        .editorial-price-wrap {
          display: flex;
          flex-direction: column;
        }
        .editorial-price-label {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(16, 32, 27, 0.5);
          margin-bottom: 3px;
          font-weight: 600;
        }
        .editorial-price {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: 22px;
          color: #1E4A3D;
        }
        .editorial-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1E4A3D;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 10px 22px;
          border-radius: 999px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 18px rgba(30, 74, 61, 0.18);
        }
        .editorial-card:hover .editorial-cta-btn {
          background: #2d5a36;
          box-shadow: 0 10px 24px rgba(45, 90, 54, 0.3);
          transform: translateY(-1px);
        }
        @media (max-width: 860px) {
          .editorial-grid-wrapper {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .bento-full-container {
            padding: 0 20px !important;
          }
          .editorial-desc {
            min-height: auto;
          }
        }
      `}</style>

      {/* ── FULL SCREEN CONTAINER ── */}
      <div style={{ width: '100%', maxWidth: '100%', padding: '0 48px' }} className="bento-full-container">

        {/* ── 1. SECTION HEADER ── */}
        <ScrollReveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '28px',
              marginBottom: '52px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(16, 32, 27, 0.12)'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2d5a36',
                  marginBottom: '12px'
                }}
              >
                Bộ sưu tập retreat 2026
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 500,
                  fontStyle: 'italic',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.1,
                  color: '#10201B',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}
              >
                Tìm về những khoảng lặng giữa thiên nhiên
              </h2>
            </div>

            <p
              style={{
                maxWidth: '420px',
                margin: 0,
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#527059'
              }}
            >
              Bốn hành trình chữa lành độc bản được tuyển chọn riêng cho mùa này — trình bày tinh tế bên dưới ảnh theo phong cách nghệ thuật Zannier.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. BALANCED 2x2 GRID (4 ITEMS TOTAL) ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '52px 38px',
            width: '100%'
          }}
          className="editorial-grid-wrapper"
        >
          {items.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 120}>
              <div
                onClick={() => {
                  if (onOpenBooking) onOpenBooking();
                }}
                className="editorial-card"
              >
              {/* TOP: PURE PHOTO FRAME */}
              <div className="editorial-image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>

              {/* BOTTOM: EDITORIAL TEXT CONTENT */}
              <div className="editorial-content-box">
                <div className="editorial-tag-row">
                  <span className="editorial-location">{item.location}</span>
                  <span className="editorial-dot">•</span>
                  <span className="editorial-category">{item.category}</span>
                </div>
                <h3 className="editorial-title">{item.title}</h3>
                <p className="editorial-desc">{item.desc}</p>

                <div className="editorial-bottom">
                  <div className="editorial-price-wrap">
                    <span className="editorial-price-label">Giá trọn gói từ</span>
                    <span className="editorial-price">{item.price}</span>
                  </div>
                  <span className="editorial-cta-btn">{item.action}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>

      </div>
    </section>
  );
}
