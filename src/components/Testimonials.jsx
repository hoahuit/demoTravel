import React from 'react';
import { Quote, Star, UserCheck, Heart } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "The group enthusiastically experienced vegetable picking and a cooking class in Cu Chi. Highly professional team!",
      author: "Flow Traders Company",
      type: "Corporate Group Retreat",
      stars: 5
    },
    {
      quote: "I have a Wonderful trip with my family. Sometimes tired, but so Refreshing in the end. Everything was seamless.",
      author: "Mrs. Telesia",
      type: "Family Travel Package",
      stars: 5
    },
    {
      quote: "I thought Tours were just about relaxing, but Retreats are something DIFFERENT. Not only they helped me release Stress, but also taught me how to regain energy and see that Life is Beautiful.",
      author: "Mr. Danny",
      type: "Tranquility & Purity Retreat",
      stars: 5
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#ffffff' }}>
      <div className="apple-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: '#c9a050',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            Real Stories
          </div>
          <h2 className="apple-section-title">
            What travelers are saying about <span style={{ color: '#0066cc' }}>4U Tours</span>?
          </h2>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="apple-squircle apple-squircle-hover"
              style={{
                background: '#f9f9fb',
                border: '1px solid var(--apple-border)',
                borderRadius: '28px',
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--apple-shadow-subtle)'
              }}
            >
              <div>
                {/* Quote Icon & Stars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Quote size={32} color="#c9a050" style={{ opacity: 0.6 }} />
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} size={15} color="#d4af37" fill="#d4af37" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: '1.65',
                  color: '#1d1d1f',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-editorial)',
                  marginBottom: '28px'
                }}>
                  “{rev.quote}”
                </p>
              </div>

              {/* Author Footer */}
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0066cc 0%, #1d1d1f 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.9rem'
                }}>
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1d1d1f' }}>{rev.author}</div>
                  <div style={{ fontSize: '0.8rem', color: '#86868b' }}>{rev.type}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
