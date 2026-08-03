import React from 'react';
import { CircularGallery } from './ui/circular-gallery';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function AudienceBento() {
  const galleryData = [
    {
      common: 'Solo Travelers',
      binomial: 'Inbound & Independent Explorers',
      photo: {
        url: 'images/tour_3.png',
        text: 'Solo traveler trekking in Sapa',
        pos: '50% 35%',
        by: '4U Independent Journey'
      }
    },
    {
      common: 'Couples',
      binomial: 'Romance & Sunset Coastal Retreats',
      photo: {
        url: 'images/tour_2.png',
        text: 'Couples walking in Hoi An ancient town',
        pos: '50% 50%',
        by: '4U Romantic Getaway'
      }
    },
    {
      common: 'Families',
      binomial: 'Cozy Stays & Safe Private Van',
      photo: {
        url: 'images/tour_1.png',
        text: 'Family island hopping in Phu Quoc',
        pos: '50% 60%',
        by: '4U Family Adventure'
      }
    },
    {
      common: 'Expats & Small Groups',
      binomial: 'Weekend Escapes & Tailored Itineraries',
      photo: {
        url: 'images/dest_danang.png',
        text: 'Small group tour in Da Nang',
        pos: '50% 40%',
        by: '4U Expat Collection'
      }
    },
    {
      common: 'Wellness Seekers',
      binomial: 'Tranquility & Organic Healing Retreats',
      photo: {
        url: 'images/dest_dalat.png',
        text: 'Healing retreat in Da Lat highlands',
        pos: '50% 50%',
        by: '4U Healing Retreat'
      }
    },
    {
      common: 'Culture Lovers',
      binomial: 'Off The Beaten Track Heritage Gems',
      photo: {
        url: 'images/dest_halong.png',
        text: 'Ha Long Bay junk boat cruise',
        pos: '50% 50%',
        by: '4U Heritage Experience'
      }
    }
  ];

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

  const duplicatedBrands = [...brandPartners, ...brandPartners, ...brandPartners];

  return (
    <section style={{ padding: '260px 0 100px', background: '#f5f5f7', overflow: 'visible' }} id="audience">
      <div className="apple-container">

        {/* 1. 3D COVERFLOW CAROUSEL AT THE TOP (With 40px Top Safety Spacing) */}
        <div style={{ position: 'relative', width: '100%', height: '460px', paddingTop: '40px', marginBottom: '40px' }}>
          <CircularGallery items={galleryData} radius={480} autoRotateSpeed={0.015} />
        </div>

        {/* 2. HEADING + SUBTEXT BLOCK BELOW THE CARDS */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: '#c9a050',
            letterSpacing: '0.12em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px'
          }}>
            <Sparkles size={16} /> 3D Interactive Showcase
          </div>

          <h2 className="apple-section-title">
            Whom are <span style={{ color: '#0066cc' }}>4U Tours</span> for?
          </h2>

          <p className="apple-subtitle" style={{ maxWidth: '620px', margin: '14px auto 0', fontSize: '1.05rem', color: '#86868b' }}>
            Specially designed for Inbound travelers, Expats in Vietnam & discerning adventurers.
          </p>
        </div>

        {/* 3. TRUSTED BY GLOBAL TRAVEL & ENTERPRISE LEADERS MARQUEE AT BOTTOM */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
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

          {/* Outer Marquee Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '20px 0',
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid var(--apple-border)',
            boxShadow: 'var(--apple-shadow-subtle)'
          }}>
            {/* Left Fade Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '100px',
              background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
              zIndex: 3,
              pointerEvents: 'none'
            }}></div>

            {/* Right Fade Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '100px',
              background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
              zIndex: 3,
              pointerEvents: 'none'
            }}></div>

            {/* Marquee Track */}
            <div className="infinite-slider-track" style={{ gap: '32px', alignItems: 'center' }}>
              {duplicatedBrands.map((brand, idx) => (
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
                  <span style={{ fontSize: '1.2rem' }}>{brand.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
                      {brand.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', fontWeight: '600', color: '#0066cc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {brand.badge}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
