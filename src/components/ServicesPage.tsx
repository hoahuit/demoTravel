import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ShieldCheck, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

export default function ServicesPage({ onOpenBooking }: ServicesPageProps) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=2560&auto=format&fit=crop"
          alt="Services"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', backdropFilter: 'blur(8px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            LUXURY SERVICES • ĐẲNG CẤP THƯỢNG LƯU
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Dịch Vụ Lữ Hành & Chăm Sóc VIP
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', opacity: 0.92, margin: 0 }}>
            Visa VIP cam kết đậu 99.9%, Chuyên cơ Private Jet, Limousine đón tận nhà & Bảo hiểm cao cấp
          </p>
        </div>
      </section>

      {/* Services List */}
      <div style={{ maxWidth: '1280px', margin: '48px auto 0', padding: '0 24px' }}>
        {SERVICES_DATA.map((service, index) => (
          <div
            key={service.id}
            style={{
              background: '#ffffff',
              borderRadius: '28px',
              padding: '40px',
              marginBottom: '32px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'grid',
              gridTemplateColumns: index % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
              <img
                src={service.heroImage}
                alt={service.title}
                style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '20px' }}
              />
            </div>
            <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
              <span style={{ color: '#006d36', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                4U VIP SERVICE
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px 0', lineHeight: 1.25 }}>
                {service.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>
                {service.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: '#006d36', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={onOpenBooking}
                style={{ background: '#006d36', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                <span>Tư Vấn & Đăng Ký Dịch Vụ</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
