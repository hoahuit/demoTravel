import React from 'react';
import { ArrowRight, Compass, Sparkles, Heart, Sun, MapPin, Anchor, Coffee } from 'lucide-react';

export default function BentoGrid() {
  return (
    <section style={{ padding: '100px 0' }} id="signatures">
      <div className="apple-container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: '#2d5a36',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            Signatures 4U & Series Retreat
          </div>
          <h2 className="apple-section-title" style={{ color: '#142619' }}>
            Hành Trình Độc Quyền <span style={{ color: '#2d5a36' }}>4U Retreat</span>
          </h2>
          <p className="apple-subtitle" style={{ maxWidth: '600px', margin: '12px auto 0', color: '#527059' }}>
            Những chuyến đi tĩnh lặng được may đo tỉ mỉ từng chi tiết, đưa bạn trở về với sự thư thái trọn vẹn.
          </p>
        </div>

        {/* Apple Bento Grid Container */}
        <div className="bento-grid">

          {/* Bento Item 1: Series Retreat Chữa Lành (8 Cols) */}
          <div className="bento-col-8">
            <div
              className="apple-squircle apple-squircle-hover"
              style={{
                position: 'relative',
                minHeight: '380px',
                height: '100%',
                background: '#ffffff',
                border: '1px solid rgba(74, 124, 89, 0.2)',
                boxShadow: 'var(--apple-shadow-card)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px'
              }}
            >
              {/* Card Image Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '55%',
                height: '100%',
                backgroundImage: `url('images/dest_danang.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                opacity: 0.85
              }}></div>

              {/* Card Text Content */}
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px' }}>
                <span className="apple-badge" style={{ background: 'rgba(74, 124, 89, 0.12)', color: '#2d5a36', marginBottom: '16px' }}>
                  <Anchor size={13} color="#2d5a36" /> Retreat Chữa Lành Thân Tâm Trí
                </span>

                <h3 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '12px', color: '#142619' }}>
                  “Bình Yên Trên Cao Nguyên”
                </h3>

                <p style={{ fontSize: '1.05rem', color: '#527059', lineHeight: '1.6', marginBottom: '24px' }}>
                  Tận hưởng không khí trong lành giữa đại ngàn, xe luxury đưa đón riêng tư & liệu trình yoga, thiền định thực hành 1:1.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#527059', textTransform: 'uppercase' }}>Giá trọn gói từ</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#2d5a36' }}>4.990.000 VNĐ</div>
                  </div>

                  <a href="#smooth-arrival" className="apple-btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                    Khám Phá Ngay <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Tĩnh Lặng Giữa Đại Ngàn (4 Cols) */}
          <div className="bento-col-4">
            <div
              className="apple-squircle apple-squircle-hover"
              style={{
                position: 'relative',
                minHeight: '380px',
                height: '100%',
                background: 'linear-gradient(145deg, #0d1710 0%, #16281c 100%)',
                color: '#ffffff',
                border: '1px solid rgba(74, 222, 128, 0.25)',
                boxShadow: 'var(--apple-shadow-card)',
                overflow: 'hidden',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('images/tour_2.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.35
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span className="apple-badge" style={{ background: 'rgba(74, 222, 128, 0.18)', color: '#4ade80', marginBottom: '16px' }}>
                  <Sun size={13} color="#e5c158" /> Hành Trình Rừng Xanh
                </span>

                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '10px' }}>
                  “Tĩnh Lặng Giữa Đại Ngàn”
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(235, 245, 237, 0.75)' }}>
                  Hành trình kết nối sâu sắc cùng rừng già & suối khoáng tự nhiên
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 2, paddingTop: '20px' }}>
                <a href="#coastal-journey" className="apple-btn-secondary" style={{ width: '100%', background: 'rgba(74, 222, 128, 0.2)', color: '#ffffff', border: '1px solid rgba(74, 222, 128, 0.4)' }}>
                  Khám Phá Chi Tiết <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Healing Retreat Series (7 Cols) */}
          <div className="bento-col-7" id="retreats">
            <div
              className="apple-squircle apple-squircle-hover"
              style={{
                position: 'relative',
                minHeight: '360px',
                background: 'linear-gradient(135deg, #eaf2eb 0%, #d8e6db 100%)',
                border: '1px solid rgba(74, 124, 89, 0.3)',
                boxShadow: 'var(--apple-shadow-card)',
                overflow: 'hidden',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                backgroundImage: `url('images/dest_dalat.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.65,
                maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px' }}>
                <span className="apple-badge" style={{ background: '#2d5a36', color: '#ffffff', marginBottom: '12px' }}>
                  <Heart size={13} /> Series Nổi Bật 2026
                </span>

                <h3 style={{ fontSize: '2.1rem', fontStyle: 'italic', fontFamily: 'var(--font-editorial)', fontWeight: '700', color: '#142619', marginBottom: '8px' }}>
                  “Tìm Lại Kết Nối”
                </h3>

                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d5a36', marginBottom: '12px' }}>
                  Chuyến Đi Tái Tạo Năng Lượng Cho Gia Đình
                </p>

                <p style={{ fontSize: '0.95rem', color: '#527059', lineHeight: '1.5', marginBottom: '20px' }}>
                  Lối sống chậm cùng thực đơn hữu cơ từ nông trại, tham gia workshop nghệ thuật & tận hưởng không gian riêng tư giữa thiên nhiên.
                </p>

                <a href="#retreat" className="apple-btn-primary" style={{ background: 'linear-gradient(135deg, #2d5a36 0%, #16301d 100%)' }}>
                  Trải Nghiệm Ngay <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Bento Item 4: The Other Side of Hoi An (5 Cols) */}
          <div className="bento-col-5">
            <div
              className="apple-squircle apple-squircle-hover"
              style={{
                position: 'relative',
                minHeight: '360px',
                background: '#ffffff',
                border: '1px solid rgba(74, 124, 89, 0.2)',
                boxShadow: 'var(--apple-shadow-card)',
                overflow: 'hidden',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('images/dest_halong.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.25
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span className="apple-badge" style={{ background: 'rgba(74, 124, 89, 0.12)', color: '#2d5a36', marginBottom: '16px' }}>
                  <MapPin size={13} color="#2d5a36" /> Retreat Bảo Tồn & Thiên Nhiên
                </span>

                <h3 style={{ fontSize: '1.9rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#142619', marginBottom: '12px' }}>
                  “Hành Trình Xanh Bảo Tồn”
                </h3>

                <p style={{ fontSize: '0.95rem', color: '#527059', lineHeight: '1.6', marginBottom: '24px' }}>
                  Tham gia hoạt động trồng cây, khám phá hệ sinh thái rừng nguyên sinh & dùng bữa tối lãng mạn giữa vườn tre tự nhiên.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <a href="#hoi-an-hidden" className="apple-btn-secondary" style={{ width: '100%', borderColor: 'rgba(74, 124, 89, 0.3)' }}>
                  Xem Chi Tiết <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
