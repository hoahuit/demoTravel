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
          background: '#0d0d12',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
          paddingTop: '80px'
        }}
      >
          {/* Ambient Soothing Ocean Waves Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero_phuquoc.png"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.65) contrast(1.08)'
            }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-waves-moving-towards-the-shore-41551-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4" type="video/mp4" />
          </video>

          {/* Dark Glassmorphic Vignette Overlay for Readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(13,13,18,0.92) 0%, rgba(13,13,18,0.65) 50%, rgba(13,13,18,0.35) 100%)'
          }}></div>

          {/* Hero Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '640px',
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
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: '400',
              marginBottom: '28px',
              lineHeight: '1.6'
            }}>
              Smooth arrival for Expat families & Inbound travelers. Tailored retreats with private van concierges & 24/7 dedicated support.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                className="apple-button-primary"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #aa820a 100%)',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(212,175,55,0.3)',
                  padding: '14px 28px',
                  fontSize: '0.95rem'
                }}
              >
                Book Your Combo <ArrowRight size={18} />
              </button>

              <button 
                className="apple-button-secondary"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  padding: '14px 28px',
                  fontSize: '0.95rem'
                }}
              >
                Explore Destinations
              </button>
            </div>

            {/* Key Trust Signals */}
            <div style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                <ShieldCheck size={16} color="#d4af37" />
                <span>International License: <strong>79-367 / 2012</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                <Star size={16} color="#d4af37" />
                <span>4.9/5 Rating (500+ Expats)</span>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
