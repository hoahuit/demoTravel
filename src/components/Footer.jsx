import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, ShieldCheck, FileText, Globe, ChevronDown, ChevronUp } from 'lucide-react';

export default function Footer() {
  const [showPartners, setShowPartners] = useState(false);

  const seoLinks = [
    { title: 'Kursus SEO Medan', desc: 'Ingin Mencari Kursus SEO Terbaik Di Kota Medan', url: 'https://4utours.com/' },
    { title: 'Mitsubishi Medan', desc: 'Jika kamu mencari mobil mitsubishi di medan', url: 'https://4utours.com/' },
    { title: 'Honda Medan', desc: 'Ingin Membeli mobil baru honda di kota medan', url: 'https://4utours.com/' },
    { title: 'Toyota Medan', desc: 'Butuh Armada Mobil Toyota Baru Di kota Medan', url: 'https://4utours.com/' },
    { title: 'Daihatsu Medan', desc: 'Ingin mencari rekomendasi Mobil Daihatsu Baru', url: 'https://4utours.com/' },
    { title: 'Wuling Medan', desc: 'Rekomendasi Mobil wuling Baru Di Kota Medan', url: 'https://4utours.com/' },
    { title: 'Hyundai Medan', desc: 'Ingin mencari rekomendasi Mobil Hyundai Baru', url: 'https://4utours.com/' },
    { title: 'Suzuki Medan', desc: 'Ingin mencari rekomendasi Mobil Suzuki Baru', url: 'https://4utours.com/' },
    { title: 'Toyota Batam', desc: 'Buat warga batam yang bingung mencari mobil toyota', url: 'https://4utours.com/' },
    { title: 'Daihatsu Batam', desc: 'Rekomendasi mobil daihatsu kota batam', url: 'https://4utours.com/' },
    { title: 'Rental Mobil Medan', desc: 'Rental mobil hemat di kota medan', url: 'https://4utours.com/' },
    { title: 'Toyota Pekanbaru', desc: 'Mobil baru toyota di pekanbaru', url: 'https://4utours.com/' },
    { title: 'Honda Batam', desc: 'Rekomendasi mobil honda terbaru batam', url: 'https://4utours.com/' },
    { title: 'Rumah Kost Medan', desc: 'Kost Medan Elite Termurah', url: 'https://www.rumahkostmedan.com/' },
    { title: 'HK Lotto 88', desc: 'Situs Resmi Website Keluaran HK', url: 'https://hklotto88.com/' },
    { title: 'Bola Suara', desc: 'Situs Resmi Website bola terpercaya', url: 'https://bolasuara.com/' }
  ];

  return (
    <footer style={{ padding: 0, margin: 0, width: '100%', position: 'relative', overflow: 'hidden' }} id="about">
      
      {/* 100% Full-Width Edge-to-Edge Glassmorphic Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          background: 'rgba(15, 15, 17, 0.98)',
          padding: '64px 60px 40px',
          boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff'
        }}
      >
        {/* Radial Ambient Glow Background */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(125% 125% at 50% 10%, rgba(15, 15, 17, 0.7) 35%, rgba(0, 102, 204, 0.3) 100%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        ></div>

        {/* Main Footer Content Grid */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            paddingBottom: '48px'
          }}>
            
            {/* Col 1: Brand & Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src="/images/logo.png" 
                  alt="4U Tours Logo" 
                  style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
                />
              </div>

              <p style={{ fontSize: '0.92rem', color: '#a1a1a6', lineHeight: '1.65', margin: 0 }}>
                Uniquely crafted inbound tours, retreats, and luxury transfers in Vietnam. Creating unforgettable journeys for expat families and international explorers.
              </p>

              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={15} color="#0066cc" /> License: <strong>79-367 / 2012</strong> (International Operator)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={15} color="#0066cc" /> Tax Code: <strong>030 807 8390</strong>
                </div>
              </div>
            </div>

            {/* Col 2: About Us */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                About Us
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['Company History', 'Meet the Team', 'International License', 'Private Van Fleet', 'Careers'].map((item, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => e.target.style.color = '#3ca2fa'}
                      onMouseLeave={(e) => e.target.style.color = '#a1a1a6'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Helpful Links */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Helpful Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li>
                  <a href="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#3ca2fa'} onMouseLeave={(e) => e.target.style.color = '#a1a1a6'}>FAQs</a>
                </li>
                <li>
                  <a href="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#3ca2fa'} onMouseLeave={(e) => e.target.style.color = '#a1a1a6'}>Combos & Deals</a>
                </li>
                <li>
                  <a href="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#3ca2fa'} onMouseLeave={(e) => e.target.style.color = '#a1a1a6'}>Support Concierge</a>
                </li>
                <li style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <a href="#" style={{ color: '#a1a1a6', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#3ca2fa'} onMouseLeave={(e) => e.target.style.color = '#a1a1a6'}>Live Chat 24/7</a>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3ca2fa',
                    boxShadow: '0 0 12px #3ca2fa',
                    display: 'inline-block'
                  }}></span>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Contact Us
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem' }}>
                  <Mail size={18} color="#3ca2fa" />
                  <a href="mailto:customercare@4utours.com" style={{ color: '#ffffff', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#3ca2fa'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                    customercare@4utours.com
                  </a>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem' }}>
                  <Phone size={18} color="#3ca2fa" style={{ marginTop: '2px' }} />
                  <div>
                    <div><a href="tel:0764886877" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>076 488 6877</a></div>
                    <div><a href="tel:+842871028048" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>(+84.28) 7102 8048</a> (Ext: 1)</div>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#a1a1a6' }}>
                  <MapPin size={18} color="#3ca2fa" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>07 Đặng Dung, P. Tân Định, TP. HCM, Vietnam</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Accordion Partner Directory */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', paddingBottom: '24px' }}>
            <button 
              onClick={() => setShowPartners(!showPartners)}
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1a6',
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <span>Partner Directory & Regional Network</span>
              {showPartners ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showPartners && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {seoLinks.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ffffff' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#86868b' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider Line */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '16px 0 28px' }}></div>

          {/* Bottom Bar: Social Icons & Copyright */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '0.88rem',
            color: '#a1a1a6'
          }}>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" aria-label="Facebook" style={{ color: '#a1a1a6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram" style={{ color: '#a1a1a6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Twitter" style={{ color: '#a1a1a6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="Globe" style={{ color: '#a1a1a6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3ca2fa'} onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a6'}>
                <Globe size={20} />
              </a>
            </div>

            <div>
              © 2026 <strong>4U Tours</strong>. All rights reserved. International Tour Operator License No. 79-367 / 2012.
            </div>
          </div>

          {/* ULTRA PROMINENT ANIMATED STROKE LIGHT WATERMARK "4U TOURS" */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '56px', 
            marginBottom: '-20px', 
            position: 'relative',
            cursor: 'pointer'
          }}>
            <svg width="100%" height="160" viewBox="0 0 600 160" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="textLightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3ca2fa" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0066cc" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Layer 1: Base Outline */}
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
                fontSize="115" 
                fontWeight="900" 
                stroke="rgba(255, 255, 255, 0.18)" 
                strokeWidth="1.5" 
                fill="none" 
                letterSpacing="16"
              >
                4U TOURS
              </text>

              {/* Layer 2: Animated Continuous Light Beam Stroke Along Letters */}
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
                fontSize="115" 
                fontWeight="900" 
                stroke="#3ca2fa" 
                strokeWidth="3" 
                fill="none" 
                letterSpacing="16"
                className="animate-stroke-beam animate-glow-pulse"
              >
                4U TOURS
              </text>

              {/* Layer 3: High Density Glowing Fill Text */}
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
                fontSize="115" 
                fontWeight="900" 
                fill="url(#textLightGradient)" 
                letterSpacing="16"
                style={{ opacity: 0.15, filter: 'blur(1px)' }}
              >
                4U TOURS
              </text>
            </svg>
          </div>

        </div>
      </div>

    </footer>
  );
}
