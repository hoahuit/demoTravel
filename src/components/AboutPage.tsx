import React from 'react';
import { ABOUT_DATA } from '../data/aboutData';
import { TEAM_DATA } from '../data/teamData';
import { PARTNERS_DATA } from '../data/partnersData';
import { ShieldCheck, Award, Globe, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop"
          alt="About Us"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '840px', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', backdropFilter: 'blur(8px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            ABOUT 4U TOURS • HÀNH TRÌNH 14 NĂM
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {ABOUT_DATA.companyName}
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', opacity: 0.92, margin: 0 }}>
            {ABOUT_DATA.tagline}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ maxWidth: '1280px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 40px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {ABOUT_DATA.stats.map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#006d36', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Story & Vision */}
      <div style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 24px' }}>
        <div style={{ background: '#ffffff', borderRadius: '28px', padding: '48px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Câu Chuyện Thương Hiệu</h2>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.8, marginBottom: '32px' }}>
            {ABOUT_DATA.story}
          </p>
          <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '32px', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#006d36', marginBottom: '8px' }}>👁️ Tầm Nhìn</h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{ABOUT_DATA.vision}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#006d36', marginBottom: '8px' }}>🎯 Sứ Mệnh</h3>
              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{ABOUT_DATA.mission}</p>
            </div>
          </div>
        </div>

        {/* Executive Team */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: '#006d36', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>LEADERSHIP TEAM</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: '8px 0 0 0' }}>Đội Ngũ Ban Điều Hành & Chuyên Gia</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {TEAM_DATA.map(member => (
              <div key={member.id} style={{ background: '#ffffff', borderRadius: '24px', padding: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <img src={member.portrait} alt={member.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>{member.name}</h3>
                <div style={{ fontSize: '13px', color: '#006d36', fontWeight: 700, marginBottom: '12px' }}>{member.role}</div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Offices */}
        <div style={{ background: '#ffffff', borderRadius: '28px', padding: '48px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', textAlign: 'center' }}>Văn Phòng Đại Diện Quốc Tế</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {ABOUT_DATA.offices.map((off, idx) => (
              <div key={idx} style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>{off.city}</h3>
                <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 8px 0', lineHeight: 1.5 }}>📍 {off.address}</p>
                <p style={{ fontSize: '13px', color: '#006d36', fontWeight: 700, margin: '0 0 4px 0' }}>📞 {off.phone}</p>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>✉️ {off.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
