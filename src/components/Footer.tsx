import React from 'react';
import { Mail, Phone, MapPin, Building2, ExternalLink } from 'lucide-react';
import './Footer.css';

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer({ onNavigate }: FooterProps = {}) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const retreatProducts = [
    {
      title: 'Retreat “Khoảng Dừng”',
      path: '/tour/khoang-dung-chau-doc-3n2d-retreat'
    },
    {
      title: 'Retreat “Bình Yên trên Cao Nguyên”',
      path: '/tour/binh-yen-tren-cao-nguyen-ho-lak-3n2d-retreat'
    },
    {
      title: 'Retreat “Tĩnh Lặng giữa Đại Ngàn”',
      path: '/tour/tinh-lang-giua-dai-ngan-nam-cat-tien-2n1d-retreat'
    }
  ];

  return (
    <footer className="footer-root" id="about">
      <div className="footer-inner-card">
        <div className="footer-container">
          
          {/* Main 3 Columns Grid */}
          <div className="footer-main-grid">

            {/* Col 1: Brand Logo & Contact Information */}
            <div className="footer-col footer-col-brand">
              <div className="footer-logo-wrap">
                <a 
                  href="/" 
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="footer-logo-link"
                  aria-label="4U Retreats Home"
                >
                  <img
                    src="/images/white-logo-4u-retreats.png"
                    alt="4U Retreats Logo"
                    className="footer-logo-img"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = '/Logo-4U-Wellness.png';
                      }
                    }}
                  />
                </a>
              </div>

              <div className="footer-company-name">
                Công ty Cổ phần Thương mại Du lịch Bốn Tối Ưu
              </div>

              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <Mail className="footer-icon" />
                  </span>
                  <a href="mailto:customercare@4uretreats.com.vn" className="footer-contact-link">
                    customercare@4uretreats.com.vn
                  </a>
                </li>

                <li className="footer-contact-item">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <Phone className="footer-icon" />
                  </span>
                  <a href="tel:0848180826" className="footer-contact-link footer-hotline-bold">
                    084 818 0826
                  </a>
                </li>

                <li className="footer-contact-item">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <MapPin className="footer-icon" />
                  </span>
                  <span className="footer-contact-text">
                    07 Đặng Dung, P. Tân Định, Tp. HCM
                  </span>
                </li>

                <li className="footer-contact-item">
                  <span className="footer-contact-icon-box" aria-hidden="true">
                    <Building2 className="footer-icon" />
                  </span>
                  <span className="footer-contact-text">
                    Mã số thuế: <span className="footer-tax-code">030 807 8390</span>
                  </span>
                </li>
              </ul>

              {/* Social Channels */}
              <div className="footer-social-wrap">
                <a
                  href="https://www.facebook.com/4URetreats.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook Fanpage"
                >
                  <FacebookIcon className="footer-social-icon" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="footer-social-icon" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn"
                  aria-label="Youtube"
                >
                  <YoutubeIcon className="footer-social-icon" />
                </a>
              </div>
            </div>

            {/* Col 2: KHÔNG THỂ BỎ LỠ (Featured Retreats) */}
            <div className="footer-col footer-col-links">
              <a
                href="/retreat/khongthebolo"
                onClick={(e) => handleLinkClick(e, '/retreat/khongthebolo')}
                className="footer-col-title-link"
              >
                KHÔNG THỂ BỎ LỠ
              </a>

              <ul className="footer-products-list">
                {retreatProducts.map((prod) => (
                  <li key={prod.path} className="footer-product-item">
                    <a
                      href={prod.path}
                      onClick={(e) => handleLinkClick(e, prod.path)}
                      className="footer-product-link"
                    >
                      {prod.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Fanpage 4U Retreats Facebook Frame */}
            <div className="footer-col footer-col-fanpage">
              <div className="footer-fanpage-card">
                <div className="footer-fanpage-header">
                  <div className="footer-fanpage-brand">
                    <FacebookIcon className="footer-fb-badge-icon" />
                    <span className="footer-fanpage-title">4U Retreats Fanpage</span>
                  </div>
                  <a
                    href="https://www.facebook.com/4URetreats.com.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-fanpage-visit-btn"
                  >
                    <span>Ghé thăm</span>
                    <ExternalLink className="footer-external-icon" />
                  </a>
                </div>

                <div className="footer-fb-iframe-container">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F4URetreats.com.vn&tabs=timeline&width=360&height=220&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                    title="4U Retreats Facebook Fanpage"
                    className="footer-fb-iframe"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Centered Brand Belonging Section */}
          <div className="footer-brand-belong-wrap">
            <img
              src="/images/white-logo-4u-retreats.png"
              alt="4U Retreats Logo"
              className="footer-belong-logo footer-belong-retreats"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true';
                  target.src = 'https://www.dropbox.com/scl/fi/dakkuol9aytf03i0s3i1o/White-Logo-4U-Retreats_260831-Ming.png?rlkey=h9ozs8l49ybkeshi34qgbejv8&raw=1';
                }
              }}
            />
            <span className="footer-belong-text">là một Thương hiệu của</span>
            <img
              src="/images/white-logo-4u-group.png"
              alt="4U Group Logo"
              className="footer-belong-logo footer-belong-group"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true';
                  target.src = 'https://www.dropbox.com/scl/fi/qpjmlftz6hxsf2gparnlv/White-Logo-4U-Group-B-H-R_260831-Ming.png?rlkey=rrcy5onzshx1il8xepbszdcca&raw=1';
                }
              }}
            />
          </div>

          {/* Divider Line */}
          <div className="footer-divider" />

          {/* Centered Copyright */}
          <div className="footer-bottom-bar">
            <p className="footer-copyright-text">
              © 2026 4U Retreats. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
