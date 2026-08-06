import React from 'react';
import { ABOUT_DATA } from '../data/aboutData';
import { TEAM_DATA } from '../data/teamData';
import { PARTNERS_DATA } from '../data/partnersData';
import { ShieldCheck, Award, Globe, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px', width: '100%', overflowX: 'hidden' }}>
      {/* Hero Full Width */}
      <section style={{ position: 'relative', width: '100%', height: '65vh', minHeight: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop"
          alt="About Us"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px', padding: '0 24px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', backdropFilter: 'blur(8px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            ABOUT 4U TOURS • HÀNH TRÌNH 14 NĂM
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Be Vietnam Pro', 'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}>
            {ABOUT_DATA.companyName}
          </h1>
          <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', opacity: 0.92, margin: 0, lineHeight: 1.6 }}>
            {ABOUT_DATA.tagline}
          </p>
        </div>
      </section>

      {/* Stats Bar 90% Full Width */}
      <div style={{ width: '90%', maxWidth: '90vw', margin: '-40px auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px 48px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {ABOUT_DATA.stats.map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontSize: 'clamp(36px, 3.5vw, 48px)', fontWeight: 800, color: '#006d36', marginBottom: '4px', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content 90% Full Width */}
      <div style={{ width: '90%', maxWidth: '90vw', margin: '64px auto 0' }}>
        {/* Company Story & Vision */}
        <div style={{ background: '#ffffff', borderRadius: '28px', padding: '56px 4vw', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#0f172a', marginBottom: '20px', letterSpacing: '-0.03em' }}>Câu Chuyện Thương Hiệu</h2>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.8, marginBottom: '40px' }}>
            {ABOUT_DATA.story}
          </p>
          <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', display: 'grid', gap: '40px', borderTop: '1px solid #f1f5f9', paddingTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#006d36', marginBottom: '12px' }}>👁️ Tầm Nhìn</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{ABOUT_DATA.vision}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#006d36', marginBottom: '12px' }}>🎯 Sứ Mệnh</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{ABOUT_DATA.mission}</p>
            </div>
          </div>
        </div>

        {/* Executive Team Full Width */}
        <div style={{ marginBottom: '80px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: '#006d36', fontSize: '13px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>LEADERSHIP TEAM</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#0f172a', margin: '8px 0 0 0', letterSpacing: '-0.03em' }}>Đội Ngũ Ban Điều Hành & Chuyên Gia</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', width: '100%' }}>
            {TEAM_DATA.map(member => (
              <div key={member.id} style={{ background: '#ffffff', borderRadius: '24px', padding: '36px 28px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <img src={member.portrait} alt={member.name} style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>{member.name}</h3>
                <div style={{ fontSize: '14px', color: '#006d36', fontWeight: 700, marginBottom: '16px' }}>{member.role}</div>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Offices Full Width */}
        <div style={{ background: '#ffffff', borderRadius: '28px', padding: '56px 4vw', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', width: '100%' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#0f172a', marginBottom: '36px', textAlign: 'center', letterSpacing: '-0.03em' }}>Văn Phòng Đại Diện Quốc Tế</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', width: '100%' }}>
            {ABOUT_DATA.offices.map((off, idx) => (
              <div key={idx} style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px 0' }}>{off.city}</h3>
                <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 10px 0', lineHeight: 1.6 }}>📍 {off.address}</p>
                <p style={{ fontSize: '14px', color: '#006d36', fontWeight: 700, margin: '0 0 6px 0' }}>📞 {off.phone}</p>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>✉️ {off.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
