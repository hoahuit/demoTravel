import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, MapPin, Star, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{ padding: 0, margin: 0, width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Main Hero Edge-to-Edge Full Screen Banner */}
      <div 
        className="animate-fade-in"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(135deg, #0d0d12 0%, #161622 100%)',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
          paddingTop: '80px'
        }}
      >
          {/* Background Image Overlay with subtle gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('images/hero_phuquoc.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.45,
            filter: 'contrast(1.1) brightness(0.95)'
          }}></div>

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(17,17,21,0.95) 0%, rgba(17,17,21,0.65) 50%, rgba(17,17,21,0.2) 100%)'
          }}></div>

          {/* Hero Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '620px',
            padding: '60px 48px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(212, 175, 55, 0.18)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#d4af37',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '20px'
            }}>
              <Sparkles size={14} /> Summer Promo in Saigon
            </div>

            <h1 className="apple-hero-title" style={{ color: '#ffffff', marginBottom: '16px' }}>
              Private transfer. <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #c9a050 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                Cozy stay.
              </span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '400',
              marginBottom: '28px',
              lineHeight: '1.6'
            }}>
              Experience seamless urban luxury in Saigon. Enjoy private airport pickup, curated boutique hotel stays, and personalized concierge services.
            </p>

            {/* Price Tag & CTA */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting from</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  USD 85 <span style={{ fontSize: '0.9rem', fontWeight: '400', color: 'rgba(255,255,255,0.7)' }}>/ Person</span>
                </div>
              </div>

              <a 
                href="#summer-promo" 
                className="apple-btn-primary apple-btn-gold" 
                style={{ padding: '16px 36px', fontSize: '1rem', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}
              >
                Discover MORE <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Floating Feature Badges (Apple Glass Style) */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            zIndex: 3,
            display: 'flex',
            gap: '16px'
          }} className="hide-mobile">
            <div className="apple-glass-card apple-squircle" style={{
              padding: '16px 20px',
              borderRadius: '20px',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                <ShieldCheck size={16} color="#c9a050" /> Fully Private & Safe
              </div>
            </div>

            <div className="apple-glass-card apple-squircle" style={{
              padding: '16px 20px',
              borderRadius: '20px',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                <Star size={16} color="#c9a050" fill="#c9a050" /> 4.98 Rating (500+ Travelers)
              </div>
            </div>
          </div>

        </div>
    </section>
  );
}
