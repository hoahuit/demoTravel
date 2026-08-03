import React from 'react';
import { Star, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const brandLogos = [
    {
      name: 'Apple Music',
      svg: (
        <svg height="65" viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 32c0-6.8 5.5-10.1 5.8-10.3-3.1-4.6-8.1-5.3-9.8-5.4-4.2-.4-8.2 2.5-10.3 2.5-2.1 0-5.4-2.4-8.8-2.3-4.5.1-8.8 2.6-11.1 6.6-4.8 8.3-1.2 20.5 3.4 27.2 2.3 3.2 4.9 6.9 8.5 6.8 3.4-.1 4.8-2.2 8.9-2.2 4.1 0 5.2 2.2 8.8 2.1 3.7-.1 6-3.3 8.3-6.6 2.6-3.8 3.7-7.5 3.8-7.7-.1-.1-7.3-2.8-7.4-10.9z" fill="#1d1d1f" />
          <path d="M33.6 11.9c1.9-2.3 3.2-5.5 2.8-8.7-2.7.1-6.1 1.8-8 4.1-1.8 2.1-3.3 5.4-2.9 8.5 3.1.2 6.2-1.6 8.1-3.9z" fill="#1d1d1f" />
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
          <path d="M22 46l10-20h9L22 6 3 46h8.5l3.5-7h14l3.5 7H22zm-3-14l4-8 4 8h-8z" fill="#FC5200" />
          <path d="M38 46l6-12h5.5l-6 12H38z" fill="#FC5200" opacity="0.6" />
          <text x="65" y="42" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="800" fill="#FC5200" letterSpacing="-0.5">STRAVA</text>
        </svg>
      )
    },
    {
      name: 'Nintendo',
      svg: (
        <svg height="65" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10" width="210" height="45" rx="22.5" stroke="#E60012" strokeWidth="4" fill="none" />
          <text x="110" y="42" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="28" fontWeight="800" fill="#E60012" letterSpacing="-0.5">Nintendo</text>
        </svg>
      )
    },
    {
      name: 'jQuery',
      svg: (
        <svg height="65" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 25c4-8 12-12 20-10-3 3-5 7-5 11 0 7 5 12 12 12 5 0 9-3 11-7-1 9-8 16-17 16-10 0-18-8-21-22z" fill="#0769AD" />
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

  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];
  const testimonialsColumn1 = [
    {
      quote: "The group enthusiastically experienced vegetable picking and a cooking class in Cu Chi. Highly professional team!",
      author: "Flow Traders Company",
      role: "Corporate Group Retreat",
      avatar: "FT",
      stars: 5,
      verified: true
    },
    {
      quote: "Booking our Da Nang weekend escape through 4U Tours was effortless. Private van, fluent French concierge, and gorgeous boutique stay.",
      author: "Sophie & Marc",
      role: "Saigon Expats",
      avatar: "SM",
      stars: 5,
      verified: true
    }
  ];

  const testimonialsColumn2 = [
    {
      quote: "I thought Tours were just about relaxing, but Retreats are something DIFFERENT. Not only did they help me release stress, but also taught me how to regain energy.",
      author: "Mr. Danny",
      role: "Tranquility & Purity Retreat",
      avatar: "MD",
      stars: 5,
      verified: true
    },
    {
      quote: "Ha Long Bay cruise booked with VIP fast-track airport transfer. 10/10 service from start to finish for our family!",
      author: "David L.",
      role: "Inbound Traveler from UK",
      avatar: "DL",
      stars: 5,
      verified: true
    }
  ];

  const testimonialsColumn3 = [
    {
      quote: "I have a Wonderful trip with my family. Sometimes tired, but so Refreshing in the end. Everything was seamless.",
      author: "Mrs. Telesia",
      role: "Family Travel Package",
      avatar: "MT",
      stars: 5,
      verified: true
    },
    {
      quote: "Sapa trekking tour was authentic and safe for a solo female traveler. Highly recommend 4U Tours for inbound journeys!",
      author: "Elena R.",
      role: "Independent Traveler",
      avatar: "ER",
      stars: 5,
      verified: true
    }
  ];

  return (
    <section className="testimonials-section" style={{ background: '#f5f5f7', position: 'relative', overflow: 'hidden' }} id="testimonials">
      <div className="apple-container">

        {/* Section Header */}
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
            marginBottom: '10px'
          }}>
            <Sparkles size={16} /> Verified Traveler Reviews
          </div>

          <h2 className="apple-section-title">
            What travelers are saying about <span style={{ color: '#0066cc' }}>4U Tours</span>?
          </h2>

          <p className="apple-subtitle" style={{ maxWidth: '620px', margin: '12px auto 0', color: '#86868b', fontSize: '1.05rem' }}>
            Hear from our corporate partners, expat families, and discerning international explorers.
          </p>
        </div>

        {/* 21st.dev Testimonials Columns 3-Column Grid */}
        <div className="testimonials-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>

          {/* Column 1 */}
          <div className="testimonials-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testimonialsColumn1.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="testimonials-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testimonialsColumn2.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="testimonials-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testimonialsColumn3.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

        </div>

        {/* MARQUEE SECTION BELOW TESTIMONIAL CARDS */}
        <div style={{ marginTop: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              color: '#86868b',
              letterSpacing: '0.14em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap'
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
            <div className="vignette-left" style={{
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
            <div className="vignette-right" style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '120px',
              background: 'linear-gradient(to right, transparent 0%, #f5f5f7 70%)',
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
                        padding: '12px 20px'
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

function TestimonialCard({ data }) {
  return (
    <div
      className="apple-squircle testimonial-card-item"
      style={{
        background: '#ffffff',
        border: '1px solid var(--apple-border)',
        borderRadius: '24px',
        padding: '28px 24px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
    >
      {/* 5 Star Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
        {[...Array(data.stars)].map((_, i) => (
          <Star key={i} size={15} color="#d4af37" fill="#d4af37" />
        ))}
      </div>

      {/* Testimonial Quote Text */}
      <p style={{
        fontSize: '0.98rem',
        lineHeight: '1.65',
        color: '#1d1d1f',
        fontWeight: '400',
        marginBottom: '24px'
      }}>
        “{data.quote}”
      </p>

      {/* Author Info Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(0,0,0,0.06)'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0066cc 0%, #1d1d1f 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          fontSize: '0.85rem',
          flexShrink: 0
        }}>
          {data.avatar}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.92rem',
            fontWeight: '700',
            color: '#1d1d1f',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {data.author}
            {data.verified && <CheckCircle2 size={14} color="#0066cc" />}
          </div>

          <div style={{ fontSize: '0.78rem', color: '#86868b' }}>
            {data.role}
          </div>
        </div>
      </div>
    </div>
  );
}
