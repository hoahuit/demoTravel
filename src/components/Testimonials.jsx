import React from 'react';
import { Quote, Star, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
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
    <section style={{ padding: '90px 0', background: '#f5f5f7', position: 'relative', overflow: 'hidden' }} id="testimonials">
      <div className="apple-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testimonialsColumn1.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testimonialsColumn2.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

          {/* Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {testimonialsColumn3.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ data }) {
  return (
    <div 
      className="apple-squircle"
      style={{
        background: '#ffffff',
        border: '1px solid var(--apple-border)',
        borderRadius: '24px',
        padding: '28px 24px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)';
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
