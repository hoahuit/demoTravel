import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = FAQ_DATA.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=2560&auto=format&fit=crop"
          alt="FAQ"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', backdropFilter: 'blur(8px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            SUPPORT & FAQ • GIẢI ĐÁP THẮC MẮC
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Câu Hỏi Thường Gặp
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', opacity: 0.92, margin: 0 }}>
            Giải đáp 100% thắc mắc về thủ tục Visa, quy trình đặt tour, bảo hiểm & chính sách hủy tour
          </p>
        </div>
      </section>

      {/* FAQ Search & Accordion */}
      <div style={{ maxWidth: '900px', margin: '48px auto 0', padding: '0 24px' }}>
        <div style={{ position: 'relative', marginBottom: '32px' }}>
          <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm (Ví dụ: Visa, Hoàn tiền, Khách sạn...)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '16px 20px 16px 54px', borderRadius: '20px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', background: '#ffffff', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', fontWeight: 500 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredFaqs.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '17px',
                    fontWeight: 800,
                    color: '#0f172a'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} style={{ color: '#006d36', flexShrink: 0 }} />
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: '#64748b'
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{ padding: '0 28px 24px 60px', color: '#475569', fontSize: '15px', lineHeight: 1.7, borderTop: '1px solid #f8fafc', paddingTop: '16px' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
