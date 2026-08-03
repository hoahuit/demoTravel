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
        className="footer-inner-card"
        style={{
          position: 'relative',
          width: '100%',
          background: '#0d1710',
          boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.4)',
          borderTop: '1px solid rgba(74, 124, 89, 0.25)',
          color: '#ffffff'
        }}
      >
        {/* Radial Ambient Glow Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(125% 125% at 50% 10%, rgba(13, 23, 16, 0.8) 35%, rgba(45, 90, 54, 0.35) 100%)',
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

              <p style={{ fontSize: '0.92rem', color: '#a3b899', lineHeight: '1.65', margin: 0 }}>
                Chuỗi sản phẩm Series Retreat độc quyền, chữa lành & hành trình tĩnh lặng tại Việt Nam. Mang lại trải nghiệm thư thái tuyệt đối cho du khách.
              </p>

              <div style={{ fontSize: '0.82rem', color: 'rgba(235, 245, 237, 0.7)', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={15} color="#4ade80" /> Giấy phép: <strong>79-367 / 2012</strong> (Lữ hành quốc tế)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={15} color="#4ade80" /> Mã số thuế: <strong>030 807 8390</strong>
                </div>
              </div>
            </div>

            {/* Col 2: About Us */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Về 4U Retreat
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['Lịch Sử Phát Triển', 'Đội Ngũ Chuyên Gia', 'Giấy Phép Quốc Tế', 'Đội Xe Luxury', 'Cơ Hội Nghề Nghiệp'].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      style={{ color: '#a3b899', textDecoration: 'none', fontSize: '0.92rem', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => e.target.style.color = '#4ade80'}
                      onMouseLeave={(e) => e.target.style.color = '#a3b899'}
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
                Liên Kết Hữu Ích
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#4ade80'} onMouseLeave={(e) => e.target.style.color = '#a3b899'}>Câu Hỏi Thường Gặp</a>
                </li>
                <li>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#4ade80'} onMouseLeave={(e) => e.target.style.color = '#a3b899'}>Series & Deal Mới</a>
                </li>
                <li>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#4ade80'} onMouseLeave={(e) => e.target.style.color = '#a3b899'}>Tư Vấn Thiết Kế 1:1</a>
                </li>
                <li style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '0.92rem' }} onMouseEnter={(e) => e.target.style.color = '#4ade80'} onMouseLeave={(e) => e.target.style.color = '#a3b899'}>Hỗ Trợ Trực Tuyến 24/7</a>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 12px #4ade80',
                    display: 'inline-block'
                  }}></span>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Liên Hệ Với 4U
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem' }}>
                  <Mail size={18} color="#4ade80" />
                  <a href="mailto:customercare@4utours.com" style={{ color: '#ffffff', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#4ade80'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                    customercare@4utours.com
                  </a>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem' }}>
                  <Phone size={18} color="#4ade80" style={{ marginTop: '2px' }} />
                  <div>
                    <div><a href="tel:0764886877" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>076 488 6877</a></div>
                    <div><a href="tel:+842871028048" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>(+84.28) 7102 8048</a> (Ext: 1)</div>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.92rem', color: '#a3b899' }}>
                  <MapPin size={18} color="#4ade80" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>07 Đặng Dung, P. Tân Định, TP. HCM, Việt Nam</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Accordion Partner Directory */}
          <div style={{ borderTop: '1px solid rgba(74, 124, 89, 0.2)', paddingTop: '24px', paddingBottom: '24px' }}>
            <button
              onClick={() => setShowPartners(!showPartners)}
              style={{
                background: 'none',
                border: 'none',
                color: '#a3b899',
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <span>Đối Tác & Mạng Lưới Điểm Đến Retreat</span>
              {showPartners ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showPartners && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {seoLinks.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(74, 124, 89, 0.12)', padding: '10px 14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ffffff' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#a3b899' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider Line */}
          <div style={{ borderTop: '1px solid rgba(74, 124, 89, 0.2)', margin: '16px 0 28px' }}></div>

          {/* Bottom Bar: Social Icons & Copyright */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '0.88rem',
            color: '#a3b899'
          }}>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" aria-label="Facebook" style={{ color: '#a3b899', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b899'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram" style={{ color: '#a3b899', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b899'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Twitter" style={{ color: '#a3b899', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b899'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="Globe" style={{ color: '#a3b899', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'} onMouseLeave={(e) => e.currentTarget.style.color = '#a3b899'}>
                <Globe size={20} />
              </a>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
}
