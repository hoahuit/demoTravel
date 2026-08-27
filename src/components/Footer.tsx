import React, { useState } from 'react';
import './Footer.css';

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
    <footer className="footer-root" id="about">
      <div className="footer-inner-card footer-card">
        <div className="footer-container">
          <div className="footer-grid">

            {/* Col 1: Brand & Bio */}
            <div className="footer-brand-col">
              <div className="footer-logo-wrap">
                <img
                  src="/Logo-4U-Wellness.png"
                  alt="4U Wellness Logo"
                  className="footer-logo-img"
                />
              </div>

              <p className="footer-bio-text">
                Chuỗi sản phẩm Series Retreat độc quyền, chữa lành & hành trình tĩnh lặng tại Việt Nam. Mang lại trải nghiệm thư thái tuyệt đối cho du khách.
              </p>

              <div className="footer-license-info">
                <div className="footer-nowrap">
                  <strong className="footer-white-bold">Công ty TNHH THƯƠNG MẠI DU LỊCH BỐN TIỆN ÍCH</strong>
                </div>
                <div className="footer-nowrap">
                  Giấy phép: <strong className="footer-white-bold">79-367 / 2012</strong> (Lữ hành quốc tế)
                </div>
                <div className="footer-nowrap">
                  Mã số thuế: <strong className="footer-white-bold">030 807 8390</strong>
                </div>
              </div>
            </div>

            {/* Col 2: About Us */}
            <div>
              <h4 className="footer-col-title">
                Về 4U Retreat
              </h4>
              <ul className="footer-links-list">
                {['Lịch Sử Phát Triển', 'Đội Ngũ Chuyên Gia', 'Giấy Phép Quốc Tế'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="footer-link-item">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Helpful Links */}
            <div>
              <h4 className="footer-col-title">
                Liên Kết Hữu Ích
              </h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#" className="footer-link-item">Câu Hỏi Thường Gặp</a>
                </li>
                <li>
                  <a href="#" className="footer-link-item">Series & Deal Mới</a>
                </li>

                <li className="footer-status-pill">
                  <a href="#" className="footer-link-item">Hỗ Trợ Trực Tuyến 24/7</a>
                  <span className="footer-online-dot"></span>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div>
              <h4 className="footer-col-title">
                Liên Hệ Với 4U
              </h4>
              <ul className="footer-contact-list">
                <li className="footer-contact-row">
                  <a href="mailto:customercare@4utours.com" className="footer-link-white">
                    customercare@4utours.com
                  </a>
                </li>

                <li className="footer-contact-row">
                  <div>
                    <div><a href="tel:0896472601" className="footer-link-white footer-bold-text">076 488 6877</a></div>
                  </div>
                </li>

                <li className="footer-contact-row">
                  <span>07 Đặng Dung, P. Tân Định, TP. HCM, Việt Nam</span>
                </li>
              </ul>
            </div>

          </div>



          {/* Divider Line */}
          <div className="footer-divider"></div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <div>© 2026 4U Tours. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
