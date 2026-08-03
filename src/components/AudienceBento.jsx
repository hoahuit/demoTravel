import React from 'react';
import { CircularGallery } from './ui/circular-gallery';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function AudienceBento() {
  const galleryData = [
    {
      common: 'Solo Travelers',
      binomial: 'Inbound & Independent Explorers',
      photo: {
        url: '/images/tour_3.png',
        fallback: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1000&auto=format&fit=crop',
        text: 'Solo traveler trekking in Sapa',
        pos: '50% 35%',
        by: '4U Independent Journey'
      }
    },
    {
      common: 'Couples',
      binomial: 'Romance & Sunset Coastal Retreats',
      photo: {
        url: '/images/tour_2.png',
        fallback: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop',
        text: 'Couples walking in Hoi An ancient town',
        pos: '50% 50%',
        by: '4U Romantic Getaway'
      }
    },
    {
      common: 'Families',
      binomial: 'Cozy Stays & Safe Private Van',
      photo: {
        url: '/images/tour_1.png',
        fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
        text: 'Family island hopping in Phu Quoc',
        pos: '50% 60%',
        by: '4U Family Adventure'
      }
    },
    {
      common: 'Expats & Small Groups',
      binomial: 'Weekend Escapes & Tailored Itineraries',
      photo: {
        url: '/images/dest_danang.png',
        fallback: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop',
        text: 'Small group tour in Da Nang',
        pos: '50% 40%',
        by: '4U Expat Collection'
      }
    },
    {
      common: 'Wellness Seekers',
      binomial: 'Tranquility & Organic Healing Retreats',
      photo: {
        url: '/images/dest_dalat.png',
        fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
        text: 'Healing retreat in Da Lat highlands',
        pos: '50% 50%',
        by: '4U Healing Retreat'
      }
    },
    {
      common: 'Culture Lovers',
      binomial: 'Off The Beaten Track Heritage Gems',
      photo: {
        url: '/images/dest_halong.png',
        fallback: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop',
        text: 'Ha Long Bay junk boat cruise',
        pos: '50% 50%',
        by: '4U Heritage Experience'
      }
    }
  ];

  const brandLogos = [
    {
      name: 'Apple Music',
      svg: (
        <svg height="65" viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 32c0-6.8 5.5-10.1 5.8-10.3-3.1-4.6-8.1-5.3-9.8-5.4-4.2-.4-8.2 2.5-10.3 2.5-2.1 0-5.4-2.4-8.8-2.3-4.5.1-8.8 2.6-11.1 6.6-4.8 8.3-1.2 20.5 3.4 27.2 2.3 3.2 4.9 6.9 8.5 6.8 3.4-.1 4.8-2.2 8.9-2.2 4.1 0 5.2 2.2 8.8 2.1 3.7-.1 6-3.3 8.3-6.6 2.6-3.8 3.7-7.5 3.8-7.7-.1-.1-7.3-2.8-7.4-10.9z" fill="#1d1d1f"/>
          <path d="M33.6 11.9c1.9-2.3 3.2-5.5 2.8-8.7-2.7.1-6.1 1.8-8 4.1-1.8 2.1-3.3 5.4-2.9 8.5 3.1.2 6.2-1.6 8.1-3.9z" fill="#1d1d1f"/>
          <text x="64" y="44" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="700" fill="#1d1d1f" letterSpacing="-0.5">Music</text>
        </svg>
      )
    },
    {
      name: 'Chrome',
      svg: (
        <svg height="65" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="26" fill="#EA4335" />
          <circle cx="32" cy="32" r="18" fill="#FBBC05" />
          <circle cx="32" cy="32" r="12" fill="#34A853" />
          <circle cx="32" cy="32" r="9" fill="#4285F4" />
          <circle cx="32" cy="32" r="5" fill="#FFFFFF" />
          <text x="70" y="42" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="700" fill="#202124" letterSpacing="-0.5">chrome</text>
        </svg>
      )
    },
    {
      name: 'Strava',
      svg: (
        <svg height="65" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 50L32 30H42L32 50H22Z" fill="#FC4C02" opacity="0.6"/>
          <path d="M12 50L26 20L40 50H30L26 40L22 50H12Z" fill="#FC4C02"/>
          <text x="52" y="43" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="900" fontStyle="italic" fill="#FC4C02" letterSpacing="-1">STRAVA</text>
        </svg>
      )
    },
    {
      name: 'Nintendo',
      svg: (
        <svg height="65" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="208" height="40" rx="20" stroke="#E60012" strokeWidth="5" fill="none"/>
          <text x="110" y="41" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="24" fontWeight="900" fill="#E60012" letterSpacing="1">Nintendo</text>
        </svg>
      )
    },
    {
      name: 'jQuery',
      svg: (
        <svg height="65" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 20C18 14 23 11 30 11C37 11 42 14 42 20V45C42 52 35 57 27 57C21 57 16 54 15 49L21 47C22 50 24 51 27 51C32 51 35 48 35 43V36C33 39 29 41 25 41C17 41 12 34 12 26V20H18ZM26 35C30 35 34 32 34 26C34 20 30 17 26 17C22 17 18 20 18 26C18 32 22 35 26 35Z" fill="#0769AD"/>
          <text x="50" y="42" fontFamily="sans-serif" fontSize="28" fontWeight="800" fill="#0769AD" letterSpacing="-0.5">jQuery</text>
        </svg>
      )
    },
    {
      name: 'Prada',
      svg: (
        <svg height="65" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="95" y="44" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="34" fontWeight="900" fill="#000000" letterSpacing="5">PRADA</text>
        </svg>
      )
    }
  ];

  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section style={{ padding: '260px 0 100px', background: '#f5f5f7', overflow: 'visible' }} id="audience">
      <div className="apple-container">

        {/* 1. 3D COVERFLOW CAROUSEL AT THE TOP */}
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

        {/* 3. MOTION PRIMITIVES LAB STYLE MARQUEE (EXACT 6 BRAND VECTOR SVGs, NO WHITE BOX) */}
        <div style={{ marginTop: '30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              color: '#86868b',
              letterSpacing: '0.14em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={16} color="#0066cc" /> TRUSTED BY GLOBAL TRAVEL & ENTERPRISE LEADERS
            </div>
          </div>

          {/* Seamless Radial Dot Background Area */}
          <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            background: 'transparent',
            padding: '24px 0'
          }}>
            {/* Radial Dot Grid Pattern overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#00000021 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              opacity: 0.5,
              pointerEvents: 'none'
            }}></div>

            {/* Left Edge Vignette Fade */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '120px',
              background: 'linear-gradient(to right, #f5f5f7 30%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none'
            }}></div>

            {/* Right Edge Vignette Fade */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '120px',
              background: 'linear-gradient(to left, #f5f5f7 30%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none'
            }}></div>

            {/* Continuous Marquee Track */}
            <div className="flex w-full justify-center relative">
              <div className="overflow-hidden w-full h-full">
                <div 
                  className="infinite-slider-track"
                  style={{ 
                    display: 'flex', 
                    gap: '48px', 
                    alignItems: 'center',
                    width: 'max-content'
                  }}
                >
                  {duplicatedLogos.map((brand, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px 24px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.06)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                      }}
                    >
                      {brand.svg}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
