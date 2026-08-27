import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { fetchSectionItemsApi } from '../services/apiService';
import { PARTNERS_DATA, syncPartnersDataFromApi } from '../data/partnersData';
import './PartnerLogos.css';

interface BrandLogo {
  name: string;
  svg?: React.ReactNode;
}

const brandLogos: BrandLogo[] = [
  {
    name: 'Apple Music',
    svg: (
      <svg height="45" viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 32c0-6.8 5.5-10.1 5.8-10.3-3.1-4.6-8.1-5.3-9.8-5.4-4.2-.4-8.2 2.5-10.3 2.5-2.1 0-5.4-2.4-8.8-2.3-4.5.1-8.8 2.6-11.1 6.6-4.8 8.3-1.2 20.5 3.4 27.2 2.3 3.2 4.9 6.9 8.5 6.8 3.4-.1 4.8-2.2 8.9-2.2 4.1 0 5.2 2.2 8.8 2.1 3.7-.1 6-3.3 8.3-6.6 2.6-3.8 3.7-7.5 3.8-7.7-.1-.1-7.3-2.8-7.4-10.9z" fill="#1d1d1f" />
        <path d="M33.6 11.9c1.9-2.3 3.2-5.5 2.8-8.7-2.7.1-6.1 1.8-8 4.1-1.8 2.1-3.3 5.4-2.9 8.5 3.1.2 6.2-1.6 8.1-3.9z" fill="#1d1d1f" />
        <text x="64" y="44" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="700" fill="#1d1d1f" letterSpacing="-0.5">Music</text>
      </svg>
    )
  },
  {
    name: 'Chrome',
    svg: (
      <svg height="45" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg height="45" viewBox="0 0 200 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 46l10-20h9L22 6 3 46h8.5l3.5-7h14l3.5 7H22zm-3-14l4-8 4 8h-8z" fill="#FC5200" />
        <path d="M38 46l6-12h5.5l-6 12H38z" fill="#FC5200" opacity="0.6" />
        <text x="65" y="42" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="30" fontWeight="800" fill="#FC5200" letterSpacing="-0.5">STRAVA</text>
      </svg>
    )
  },
  {
    name: 'Nintendo',
    svg: (
      <svg height="45" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="210" height="45" rx="22.5" stroke="#E60012" strokeWidth="4" fill="none" />
        <text x="110" y="42" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="28" fontWeight="800" fill="#E60012" letterSpacing="-0.5">Nintendo</text>
      </svg>
    )
  },
  {
    name: 'jQuery',
    svg: (
      <svg height="45" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 25c4-8 12-12 20-10-3 3-5 7-5 11 0 7 5 12 12 12 5 0 9-3 11-7-1 9-8 16-17 16-10 0-18-8-21-22z" fill="#0769AD" />
        <text x="50" y="42" fontFamily="sans-serif" fontSize="28" fontWeight="800" fill="#0769AD" letterSpacing="-0.5">jQuery</text>
      </svg>
    )
  },
  {
    name: 'Prada',
    svg: (
      <svg height="45" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="95" y="44" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="34" fontWeight="900" fill="#000000" letterSpacing="5">PRADA</text>
      </svg>
    )
  }
];

export default function PartnerLogos() {
  const [partnerItems, setPartnerItems] = useState<any[]>(PARTNERS_DATA.length > 0 ? PARTNERS_DATA : brandLogos);

  useEffect(() => {
    fetchSectionItemsApi('partners').then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        syncPartnersDataFromApi(res);
        setPartnerItems(res);
      }
    });
  }, []);

  const displayList = partnerItems.length > 0 ? partnerItems : brandLogos;
  const duplicatedLogos = [...displayList, ...displayList, ...displayList];

  return (
    <section className="partner-logos-section">
      <div className="partner-logos-header">
        <div className="partner-logos-title">
          <ShieldCheck size={16} color="#1E4A3D" /> ĐỐI TÁC DOANH NGHIỆP & THƯƠNG HIỆU ĐỒNG HÀNH
        </div>
      </div>

      {/* Marquee Track */}
      <div className="partner-logos-marquee-wrap">
        <div className="partner-logos-fade-left" />
        <div className="partner-logos-fade-right" />

        <div className="partner-logos-track-wrap">
          <div className="partner-logos-track-overflow">
            <div className="infinite-slider-track">
              {duplicatedLogos.map((brand, idx) => (
                <div key={idx} className="partner-logos-item">
                  {brand.svg ? brand.svg : brand.name || brand.logoText}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
