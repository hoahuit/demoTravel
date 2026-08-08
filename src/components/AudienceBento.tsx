import React from 'react';
import Carousel3D from './Carousel3D';
import ScrollReveal from './ScrollReveal';

export interface AudienceBentoProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function AudienceBento({ onOpenBooking, onNavigate }: AudienceBentoProps) {
  return (
    <section className="audience-section" style={{ background: '#e5efe8', overflow: 'hidden', position: 'relative', zIndex: 5, padding: '90px 0 100px 0' }} id="audience">
      <div className="apple-container">

        {/* HEADING BLOCK */}
        <ScrollReveal>
          <div className="audience-heading-block" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '99px',
                background: 'rgba(45, 90, 54, 0.1)',
                color: '#2d5a36',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}
            >
              ✦ RETREATS ĐỘC QUYỀN
            </div>
            <h2 className="apple-section-title" style={{ color: '#142619' }}>
              Sản Phẩm Retreat <span style={{ color: '#2d5a36' }}>Độc Quyền</span>
            </h2>

            <p className="apple-subtitle" style={{ maxWidth: '640px', margin: '10px auto 0', fontSize: '1.05rem', color: '#527059' }}>
              Bộ sưu tập các hành trình nghỉ dưỡng may đo độc bản, chăm sóc Thân - Tâm - Trí giữa những miền thiên nhiên kiệt tác.
            </p>
          </div>
        </ScrollReveal>

      </div>

      {/* NEW 3D CAROUSEL COMPONENT — FULL SCREEN WIDTH */}
      <ScrollReveal delay={150}>
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <Carousel3D onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
        </div>
      </ScrollReveal>

      {/* XEM THÊM BUTTON */}
      <ScrollReveal delay={200}>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => {
              if (onNavigate) onNavigate('/retreat/docquyen');
            }}
            style={{
              padding: '14px 34px',
              borderRadius: '99px',
              border: '1.5px solid #2d5a36',
              background: 'transparent',
              color: '#2d5a36',
              fontWeight: 700,
              fontSize: '13.5px',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2d5a36';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#2d5a36';
            }}
          >
            <span>Xem thêm sản phẩm độc quyền</span>
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
