import React, { useState } from 'react';

interface SeoLink {
  title: string;
  desc: string;
  url: string;
}

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps = {}) {
  const [showPartners, setShowPartners] = useState<boolean>(false);

  const seoLinks: SeoLink[] = [
    { title: 'Kursus SEO Medan', desc: 'Ingin Mencari Kursus SEO Terbaik Di Kota Medan', url: 'https://4utours.com/' },
    { title: 'Mitsubishi Medan', desc: 'Jika kamu mencari mobil mitsubishi di medan', url: 'https://4utours.com/' },
    { title: 'Honda Medan', desc: 'Ingin Membeli mobil baru honda di kota medan', url: 'https://4utours.com/' },
    { title: 'Toyota Medan', desc: 'Butuh Armada Mobil Toyota Baru Di kota Medan', url: 'https://4utours.com/' },
    { title: 'Daihatsu Medan', desc: 'Ingin tìm kiếm rekomendasi Mobil Daihatsu Baru', url: 'https://4utours.com/' },
    { title: 'Wuling Medan', desc: 'Rekomendasi Mobil wuling Baru Di Kota Medan', url: 'https://4utours.com/' },
    { title: 'Hyundai Medan', desc: 'Ingin tìm kiếm rekomendasi Mobil Hyundai Baru', url: 'https://4utours.com/' },
    { title: 'Suzuki Medan', desc: 'Ingin tìm kiếm rekomendasi Mobil Suzuki Baru', url: 'https://4utours.com/' },
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
          background: 'linear-gradient(180deg, #142619 0%, #0d1a11 100%)',
          borderRadius: '0',
          padding: '64px 5vw 40px',
          borderTop: '1px solid rgba(74, 124, 89, 0.2)',
          color: '#e5ebe6'
        }}
      >
        {/* Main Footer Content Grid */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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

              <p style={{ fontSize: '17px', color: '#a3b899', lineHeight: '1.65', margin: 0 }}>
                Chuỗi sản phẩm Series Retreat độc quyền, chữa lành & hành trình tĩnh lặng tại Việt Nam. Mang lại trải nghiệm thư thái tuyệt đối cho du khách.
              </p>

              <div style={{ fontSize: '14px', color: 'rgba(235, 245, 237, 0.85)', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <div style={{ whiteSpace: 'nowrap' }}>
                  Giấy phép: <strong style={{ color: '#ffffff' }}>79-367 / 2012</strong> (Lữ hành quốc tế)
                </div>
                <div style={{ whiteSpace: 'nowrap' }}>
                  Mã số thuế: <strong style={{ color: '#ffffff' }}>030 807 8390</strong>
                </div>
              </div>
            </div>

            {/* Col 2: About Us */}
            <div>
              <h4 style={{ fontSize: '30px', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Về 4U Retreat
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['Lịch Sử Phát Triển', 'Đội Ngũ Chuyên Gia', 'Giấy Phép Quốc Tế', 'Đội Xe Luxury', 'Cơ Hội Nghề Nghiệp'].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      style={{ color: '#a3b899', textDecoration: 'none', fontSize: '17px', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#a3b899')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Helpful Links */}
            <div>
              <h4 style={{ fontSize: '30px', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Liên Kết Hữu Ích
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '17px' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')} onMouseLeave={(e) => (e.currentTarget.style.color = '#a3b899')}>Câu Hỏi Thường Gặp</a>
                </li>
                <li>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '17px' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')} onMouseLeave={(e) => (e.currentTarget.style.color = '#a3b899')}>Series & Deal Mới</a>
                </li>
                <li>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '17px' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')} onMouseLeave={(e) => (e.currentTarget.style.color = '#a3b899')}>Tư Vấn Thiết Kế 1:1</a>
                </li>
                <li style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <a href="#" style={{ color: '#a3b899', textDecoration: 'none', fontSize: '17px' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')} onMouseLeave={(e) => (e.currentTarget.style.color = '#a3b899')}>Hỗ Trợ Trực Tuyến 24/7</a>
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
              <h4 style={{ fontSize: '30px', fontWeight: '700', color: '#ffffff', marginBottom: '22px' }}>
                Liên Hệ Với 4U
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '17px' }}>
                  <a href="mailto:customercare@4utours.com" style={{ color: '#ffffff', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4ade80')} onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}>
                    customercare@4utours.com
                  </a>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '17px' }}>
                  <div>
                    <div><a href="tel:0764886877" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>076 488 6877</a></div>
                    <div><a href="tel:+842871028048" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>(+84.28) 7102 8048</a> (Ext: 1)</div>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '17px', color: '#a3b899' }}>
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
                fontSize: '17px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <span>Đối Tác & Mạng Lưới Điểm Đến Retreat</span>
              <span style={{ fontWeight: 'bold' }}>{showPartners ? '[-]' : '[+]'}</span>
            </button>

            {showPartners && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                {seoLinks.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(74, 124, 89, 0.12)', padding: '10px 14px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{item.title}</div>
                    <div style={{ fontSize: '14px', color: '#a3b899' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider Line */}
          <div style={{ borderTop: '1px solid rgba(74, 124, 89, 0.2)', margin: '16px 0 28px' }}></div>

          {/* Bottom Bar */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '14px',
            color: '#a3b899'
          }}>
            <div>© 2026 4U Tours. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
