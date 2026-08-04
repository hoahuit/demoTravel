import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface BrandLogo {
  name: string;
  svg: React.ReactNode;
}

export default function InfiniteSlider() {
  const brandLogos: BrandLogo[] = [
    {
      name: 'Apple Music',
      svg: (
        <svg height="65" viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 32c0-6.8 5.5-10.1 5.8-10.3-3.1-4.6-8.1-5.3-9.8-5.4-4.2-.4-8.2 2.5-10.3 2.5-2.1 0-5.4-2.4-8.8-2.3-4.5.1-8.8 2.6-11.1 6.6-4.8 8.3-1.2 20.5 3.4 27.2 2.3 3.2 4.9 6.9 8.5 6.8 3.4-.1 4.8-2.2 8.9-2.2 4.1 0 5.2 2.2 8.8 2.1 3.7-.1 6-3.3 8.3-6.6 2.6-3.8 3.7-7.5 3.8-7.7-.1-.1-7.3-2.8-7.4-10.9z" fill="#1d1d1f"/>
          <path d="M33.6 11.9c1.9-2.3 3.2-5.5 2.8-8.7-2.7.1-6.1 1.8-8 4.1-1.8 2.1-3.3 5.4-2.9 8.5 3.1.2 6.2-1.6 8.1-3.9z" fill="#1d1d1f"/>
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
          <path d="M22 50L32 30H42L32 50H22Z" fill="#FC4C02" opacity="0.6"/>
          <path d="M12 50L26 20L40 50H30L26 40L22 50H12Z" fill="#FC4C02"/>
          <text x="52" y="43" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="900" fontStyle="italic" fill="#FC4C02" letterSpacing="-1">STRAVA</text>
        </svg>
      )
    },
    {
      name: 'Nintendo',
      svg: (
        <svg height="65" viewBox="0 0 220 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="208" height="40" rx="20" stroke="#E60012" strokeWidth="5" fill="none"/>
          <text x="110" y="41" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="24" fontWeight="900" fill="#E60012" letterSpacing="1">Nintendo</text>
        </svg>
      )
    },
    {
      name: 'jQuery',
      svg: (
        <svg height="65" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 20C18 14 23 11 30 11C37 11 42 14 42 20V45C42 52 35 57 27 57C21 57 16 54 15 49L21 47C22 50 24 51 27 51C32 51 35 48 35 43V36C33 39 29 41 25 41C17 41 12 34 12 26V20H18ZM26 35C30 35 34 32 34 26C34 20 30 17 26 17C22 17 18 20 18 26C18 32 22 35 26 35Z" fill="#0769AD"/>
          <text x="50" y="42" fontFamily="sans-serif" fontSize="28" fontWeight="800" fill="#0769AD" letterSpacing="-0.5">jQuery</text>
        </svg>
      )
    },
    {
      name: 'Prada',
      svg: (
        <svg height="65" viewBox="0 0 190 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="95" y="44" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="36" fontWeight="900" fill="#000000" letterSpacing="6">PRADA</text>
        </svg>
      )
    }
  ];

  const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <div style={{
      width: '100%',
      padding: '40px 0 30px 0',
      background: '#f5f5f7',
      overflow: 'hidden'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: '800',
          textTransform: 'uppercase',
          color: '#86868b',
          letterSpacing: '0.14em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={16} color="#2d5a36" /> ĐỐI TÁC DOANH NGHIỆP & THƯƠNG HIỆU ĐỒNG HÀNH
        </div>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '10px 0'
      }}>
        {/* Left Vignette Fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '160px',
          background: 'linear-gradient(to right, #f5f5f7 30%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'none'
        }} />

        {/* Right Vignette Fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '160px',
          background: 'linear-gradient(to right, transparent 0%, #f5f5f7 70%)',
          zIndex: 10,
          pointerEvents: 'none'
        }} />

        {/* Infinite Slider Track */}
        <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div
              className="infinite-slider-track"
              style={{
                display: 'flex',
                gap: '60px',
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
                    padding: '8px 24px'
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
  );
}
