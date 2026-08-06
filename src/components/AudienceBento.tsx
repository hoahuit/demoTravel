import React from 'react';
import Carousel3D from './Carousel3D';
import ScrollReveal from './ScrollReveal';

export interface AudienceBentoProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function AudienceBento({ onOpenBooking, onNavigate }: AudienceBentoProps) {
  return (
    <section className="audience-section" style={{ background: '#f3f7f4', overflow: 'hidden', position: 'relative', zIndex: 5, padding: '90px 0 100px 0' }} id="audience">
      <div className="apple-container">

        {/* HEADING BLOCK */}
        <ScrollReveal>
          <div className="audience-heading-block" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="apple-section-title" style={{ color: '#142619' }}>
              Dành Riêng Cho Ai Tìm Về <span style={{ color: '#2d5a36' }}>4U Retreat</span>?
            </h2>

            <p className="apple-subtitle" style={{ maxWidth: '620px', margin: '10px auto 0', fontSize: '1.05rem', color: '#527059' }}>
              Hành trình được thiết kế may đo cho từng cá nhân, gia đình & nhóm bạn khao khát kết nối sâu sắc cùng thiên nhiên.
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
    </section>
  );
}
