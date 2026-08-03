import React from 'react';
import { ShieldCheck, Award, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export default function InfiniteSlider() {
  const brandPartners = [
    { name: 'Google Travel', badge: 'Verified Partner', icon: '🌐' },
    { name: 'Amazon AWS', badge: 'Cloud Infrastructure', icon: '☁️' },
    { name: 'Apache Kafka', badge: 'Realtime Data Sync', icon: '⚡' },
    { name: 'TripAdvisor', badge: "Travelers' Choice 2026", icon: '🏆' },
    { name: 'Booking.com', badge: 'Premier Partner', icon: '🏨' },
    { name: 'Forbes Travel', badge: 'Featured Luxury', icon: '💎' },
    { name: 'Airbnb', badge: 'Superhost Certified', icon: '🏡' },
    { name: 'Singapore Airlines', badge: 'Global Aviation', icon: '✈️' },
    { name: 'Condé Nast', badge: 'Top Inbound Operator', icon: '⭐' }
  ];

  // Quadruple items for seamless smooth infinite loop
  const duplicated = [...brandPartners, ...brandPartners, ...brandPartners, ...brandPartners];

  return (
    <section style={{ padding: '60px 0', background: '#f5f5f7', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="apple-container">
        
        {/* Section Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: '#86868b',
            letterSpacing: '0.12em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#0066cc" /> TRUSTED BY GLOBAL TRAVEL & ENTERPRISE LEADERS
          </div>
        </div>

        {/* Outer Marquee Wrapper with Vignette Edge Gradients */}
        <div style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '24px 0',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid var(--apple-border)',
          boxShadow: 'var(--apple-shadow-subtle)'
        }}>
          
          {/* Left Fade Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '120px',
            background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none'
          }}></div>

          {/* Right Fade Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '120px',
            background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none'
          }}></div>

          {/* Infinite Scroll Marquee Track */}
          <div className="infinite-slider-track" style={{ gap: '36px', alignItems: 'center' }}>
            {duplicated.map((brand, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 20px',
                  borderRadius: '16px',
                  background: '#f9f9fb',
                  border: '1px solid rgba(0,0,0,0.04)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>{brand.icon}</span>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                    {brand.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {brand.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
