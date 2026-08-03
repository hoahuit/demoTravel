import React, { useState } from 'react';
import { MapPin, Mail, Phone, ShieldCheck, FileText, Compass, ChevronDown, ChevronUp } from 'lucide-react';

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
    <footer style={{ background: '#1d1d1f', color: '#f5f5f7', paddingTop: '64px', paddingBottom: '32px' }} id="about">
      <div className="apple-container">
        
        {/* Main Footer 3 Columns Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Col 1: Brand & License */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#ffffff',
                color: '#1d1d1f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Compass size={20} color="#c9a050" />
              </div>
              <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#ffffff' }}>4U Tours</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#86868b', lineHeight: '1.6', marginBottom: '20px' }}>
              Uniquely crafted inbound tours, retreats, and luxury transfers in Vietnam. Dedicated to creating memorable journeys.
            </p>

            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#c9a050" /> License: <strong>79-367 / 2012</strong> (International Tour Operator)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={14} color="#c9a050" /> Tax Code: <strong>030 807 8390</strong>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Signatures 4U', 'Just Released', "Today's Deal", 'Last Minute', 'Kollections 4U', 'Work Opportunities', 'About 4U Tours'].map((link, i) => (
                <li key={i}>
                  <a 
                    href="#" 
                    style={{ color: '#86868b', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#c9a050'}
                    onMouseLeave={(e) => e.target.style.color = '#86868b'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contact 4U Tours
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#86868b' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="#c9a050" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Address: 07 Đặng Dung, P. Tân Định, Tp. HCM, Vietnam</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="#c9a050" style={{ flexShrink: 0 }} />
                <a href="mailto:customercare@4utours.com" style={{ color: '#ffffff', textDecoration: 'none' }}>customercare@4utours.com</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="#c9a050" style={{ flexShrink: 0 }} />
                <div>
                  <div>Hotline 1: <a href="tel:0764886877" style={{ color: '#ffffff', fontWeight: '600' }}>076 488 6877</a></div>
                  <div>Hotline 2: <a href="tel:+842871028048" style={{ color: '#ffffff', fontWeight: '600' }}>(+84.28) 7102 8048</a> (Ext: 1)</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Accordion Partner Network Section */}
        <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={() => setShowPartners(!showPartners)}
            style={{
              background: 'none',
              border: 'none',
              color: '#86868b',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <span>Partner Directory & Regional Services</span>
            {showPartners ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showPartners && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginTop: '16px' }}>
              {seoLinks.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ffffff' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#86868b' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Copyright */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '24px',
          fontSize: '0.8rem',
          color: '#86868b'
        }}>
          <div>Copyright 2026 © - <strong>4U Tours</strong>. All Rights Reserved.</div>
          <div>Designed with <strong>Apple Design System</strong></div>
        </div>

      </div>
    </footer>
  );
}
