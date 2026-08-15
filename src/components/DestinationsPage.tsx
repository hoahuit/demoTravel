import React, { useState, useEffect } from 'react';
import { DESTINATIONS_DATA, syncDestinationsDataFromApi, Destination } from '../data/destinationsData';
import { fetchSectionItemsApi, getImageUrl } from '../services/apiService';
import { MapPin, Compass, ArrowRight, Camera, Star } from 'lucide-react';


interface DestinationsPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
}

export default function DestinationsPage({ onNavigate, onOpenBooking }: DestinationsPageProps) {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS_DATA);

  useEffect(() => {
    fetchSectionItemsApi('destinations').then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncDestinationsDataFromApi(data);
        setDestinations([...data]);
      }
    });
  }, []);

  const [activeRegion, setActiveRegion] = useState<string>('All');

  const regions = ['All', 'Đông Nam Á', 'Đông Bắc Á', 'Châu Âu'];

  const filteredDestinations = destinations.filter(dest =>
    activeRegion === 'All' || dest.region === activeRegion
  );

  return (
    <div style={{ background: '#0f1711', color: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '380px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?q=85&w=2560&auto=format&fit=crop"
          alt="Destinations"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,17,0.4) 0%, rgba(15,23,17,0.85) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '840px', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', backdropFilter: 'blur(8px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, letterSpacing: '0.16em', padding: '6px 20px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            DESTINATIONS GALLERY • DANH THẮNG NỔI TIẾNG
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.8vw, 60px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Khám Phá Các Điểm Đến Tuyệt Mỹ Thế Giới
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', opacity: 0.9, margin: 0 }}>
            Từ đỉnh núi tuyết phủ Thụy Sĩ đến sắc thu lá phong Kyoto & vịnh Hạ Long di sản
          </p>
        </div>
      </section>

      {/* Region Filter Chips */}
      <div style={{ maxWidth: '1440px', margin: '32px auto 0', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {regions.map(reg => (
          <button
            key={reg}
            onClick={() => setActiveRegion(reg)}
            style={{
              padding: '10px 24px',
              borderRadius: '999px',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              background: activeRegion === reg ? '#006d36' : 'rgba(255,255,255,0.08)',
              color: activeRegion === reg ? '#ffffff' : '#cbd5e1',
              boxShadow: activeRegion === reg ? '0 4px 16px rgba(0,109,54,0.4)' : 'none'
            }}
          >
            {reg === 'All' ? '🌐 Tất Cả Khu Vực' : reg}
          </button>
        ))}
      </div>

      {/* Destination Grid */}
      <div style={{ maxWidth: '1440px', margin: '40px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
          {filteredDestinations.map(dest => (
            <div
              key={dest.slug}
              onClick={() => onNavigate(`/tours?country=${encodeURIComponent(dest.country)}`)}
              style={{
                background: '#162219',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, boxShadow 0.35s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
                <img src={getImageUrl(dest.heroImage)} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />

                <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#006d36', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '5px 14px', borderRadius: '999px', textTransform: 'uppercase' }}>
                  {dest.region}
                </div>
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, padding: '6px 14px', borderRadius: '999px' }}>
                  {dest.tourCount} Hành Trình Độc Bản
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>{dest.name}</h3>
                  <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 16px 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {dest.overview}
                  </p>
                </div>

                <div>
                  {/* Attractions pills */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {dest.popularAttractions.map((att, aIdx) => (
                      <span key={aIdx} style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        📍 {att.name}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>🗓️ Mùa đẹp nhất: <strong style={{ color: '#4ade80' }}>{dest.bestTime}</strong></span>
                    <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Xem Tour <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

