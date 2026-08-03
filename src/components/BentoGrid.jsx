import React from 'react';
import { ArrowRight, Compass, Sparkles, Heart, Sun, MapPin, Anchor, Coffee } from 'lucide-react';

export default function BentoGrid() {
  return (
    <section style={{ padding: '60px 0' }} id="signatures">
      <div className="apple-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: '#c9a050',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            Signatures 4U & Combos
          </div>
          <h2 className="apple-section-title">
            Uniquely Crafted <span style={{ color: '#0066cc' }}>4U Packages</span>
          </h2>
          <p className="apple-subtitle" style={{ maxWidth: '600px', margin: '12px auto 0' }}>
            Handpicked journeys designed with ultimate attention to detail, comfort, and authenticity.
          </p>
        </div>

        {/* Apple Bento Grid Container */}
        <div className="bento-grid">

          {/* Bento Item 1: Smooth Arrival Combos (8 Cols) */}
          <div className="bento-col-8">
            <div 
              className="apple-squircle apple-squircle-hover"
              style={{
                position: 'relative',
                minHeight: '380px',
                height: '100%',
                background: '#ffffff',
                border: '1px solid var(--apple-border)',
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
                <span className="apple-badge" style={{ background: '#f5f5f7', color: '#1d1d1f', marginBottom: '16px' }}>
                  <Anchor size={13} color="#0066cc" /> Transfer & Airport Combos
                </span>
                
                <h3 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.025em', marginBottom: '12px', color: '#1d1d1f' }}>
                  “Smooth Arrival” Combos
                </h3>

                <p style={{ fontSize: '1.05rem', color: '#86868b', lineHeight: '1.6', marginBottom: '24px' }}>
                  Sit back, enjoy and let Us handle All the arrangements. Private luxury vehicle pickup, VIP fast-track & boutique accommodation.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#86868b', textTransform: 'uppercase' }}>Starting from</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1d1d1f' }}>USD 99</div>
                  </div>

                  <a href="#smooth-arrival" className="apple-btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                    Discover MORE <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Da Nang & Hoi An (4 Cols) */}
          <div className="bento-col-4">
            <div 
              className="apple-squircle apple-squircle-hover"
              style={{
                position: 'relative',
                minHeight: '380px',
                height: '100%',
                background: 'linear-gradient(145deg, #1d1d1f 0%, #2c2c2e 100%)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.1)',
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
                <span className="apple-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', marginBottom: '16px' }}>
                  <Sun size={13} color="#c9a050" /> Coastal Journey
                </span>

                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.2', marginBottom: '10px' }}>
                  “A Timeless Coastal Journey”
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>
                  Da Nang & Hoi An Ancient Town
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 2, paddingTop: '20px' }}>
                <a href="#coastal-journey" className="apple-btn-secondary" style={{ width: '100%', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}>
                  Discover MORE <ArrowRight size={16} />
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
                background: 'linear-gradient(135deg, #fbf5e8 0%, #f7ebe0 100%)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
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
                opacity: 0.6,
                maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px' }}>
                <span className="apple-badge" style={{ background: '#d4af37', color: '#ffffff', marginBottom: '12px' }}>
                  <Heart size={13} /> Series "YOU CANNOT MISS"
                </span>

                <h3 style={{ fontSize: '2.1rem', fontStyle: 'italic', fontFamily: 'var(--font-editorial)', fontWeight: '700', color: '#1d1d1f', marginBottom: '8px' }}>
                  “Tranquility & Purity”
                </h3>

                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1d1d1f', marginBottom: '12px' }}>
                  A Healing Retreat for Families & Friends
                </p>

                <p style={{ fontSize: '0.95rem', color: '#86868b', lineHeight: '1.5', marginBottom: '20px' }}>
                  Reconnect with nature through mindfulness, farm-to-table organic dining, and private wellness workshops in mountain sanctuaries.
                </p>

                <a href="#retreat" className="apple-btn-primary apple-btn-gold">
                  Let’s Retreat <ArrowRight size={16} />
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
                border: '1px solid var(--apple-border)',
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
                <span className="apple-badge" style={{ background: '#f5f5f7', color: '#1d1d1f', marginBottom: '16px' }}>
                  <MapPin size={13} color="#e30050" /> Off the Beaten Track
                </span>

                <h3 style={{ fontSize: '1.9rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#1d1d1f', marginBottom: '12px' }}>
                  “The Other Side of Hoi An”
                </h3>

                <p style={{ fontSize: '0.95rem', color: '#86868b', lineHeight: '1.6', marginBottom: '24px' }}>
                  Paddle through nipa palm groves, meet artisan lantern makers, and dine in organic bamboo gardens away from the tourist crowd.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <a href="#hoi-an-hidden" className="apple-btn-secondary" style={{ width: '100%' }}>
                  Explore NOW <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
