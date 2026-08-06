import React from 'react';
import { PROMOTIONS_DATA } from '../data/promotionsData';
import { Tag, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface PromotionsPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function PromotionsPage({ onNavigate, onOpenBooking }: PromotionsPageProps) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=85&w=2560&auto=format&fit=crop"
          alt="Promotions"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.25)', border: '1px solid rgba(239, 68, 68, 0.5)', backdropFilter: 'blur(8px)', color: '#fca5a5', fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            SPECIAL DEALS • CƠ HỘI ĐỘC QUYỀN
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ưu Đãi Đặc Biệt & Flash Sale
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', opacity: 0.92, margin: 0 }}>
            Đăng ký tour sớm nhận ưu đãi giảm trực tiếp lên đến 25% & miễn phí Visa VIP
          </p>
        </div>
      </section>

      {/* Promotions List */}
      <div style={{ maxWidth: '1280px', margin: '48px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
          {PROMOTIONS_DATA.map(promo => (
            <div
              key={promo.id}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                <img src={promo.bannerImage} alt={promo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#ef4444', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}>
                  {promo.discountBadge}
                </span>
                <span style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '5px 14px', borderRadius: '999px' }}>
                  Mã: <strong style={{ color: '#4ade80' }}>{promo.code}</strong>
                </span>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', lineHeight: 1.35 }}>
                    {promo.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                    {promo.subtitle}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                    ⏰ Hạn ưu đãi: <strong>{promo.expiryDate}</strong>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    style={{ width: '100%', background: '#006d36', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>Áp Dụng Khuyến Mãi Ngay</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
