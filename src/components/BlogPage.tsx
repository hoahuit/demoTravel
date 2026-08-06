import React, { useState } from 'react';
import { BLOGS_DATA, BlogArticle } from '../data/blogsData';
import { BookOpen, Clock, Calendar, ArrowRight, User, Share2, Tag, ChevronRight } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedArticle = BLOGS_DATA.find(b => b.slug === selectedSlug);

  if (selectedArticle) {
    return (
      <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        {/* Article Header */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={() => setSelectedSlug(null)}
            style={{ background: '#f1f5f9', border: 'none', padding: '8px 18px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: '#475569', marginBottom: '24px' }}
          >
            ← Trở về danh sách bài viết
          </button>
          
          <span style={{ display: 'inline-block', background: 'rgba(0,109,54,0.1)', color: '#006d36', fontSize: '12px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            {selectedArticle.category} MAGAZINE
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {selectedArticle.title}
          </h1>
          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, margin: '0 0 24px 0', fontWeight: 500 }}>
            {selectedArticle.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '16px 0', marginBottom: '32px' }}>
            <img src={selectedArticle.author.avatar} alt={selectedArticle.author.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>{selectedArticle.author.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{selectedArticle.author.role} • {selectedArticle.publishedDate} • {selectedArticle.readTime}</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div style={{ maxWidth: '1100px', margin: '0 auto 40px', padding: '0 24px' }}>
          <img src={selectedArticle.heroImage} alt={selectedArticle.title} style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '24px' }} />
        </div>

        {/* Article Body */}
        <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px', fontSize: '17px', lineHeight: 1.8, color: '#334155' }}>
          {/* Table of Contents */}
          <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px 32px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px 0', color: '#0f172a' }}>📌 Mục Lục Bài Viết</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedArticle.tableOfContents.map((toc, idx) => (
                <li key={idx} style={{ fontSize: '15px', color: '#006d36', fontWeight: 600 }}>{toc}</li>
              ))}
            </ul>
          </div>

          <p style={{ fontWeight: 500, fontSize: '18px', color: '#1e293b', marginBottom: '32px' }}>
            {selectedArticle.introduction}
          </p>

          {/* Sections */}
          {selectedArticle.sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', lineHeight: 1.3 }}>
                {sec.title}
              </h2>
              <p style={{ marginBottom: '20px' }}>{sec.text}</p>
              {sec.image && (
                <div style={{ margin: '24px 0' }}>
                  <img src={sec.image} alt={sec.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '20px' }} />
                  {sec.imageCaption && (
                    <div style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '8px', fontStyle: 'italic' }}>
                      {sec.imageCaption}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div style={{ background: 'rgba(0,109,54,0.05)', borderRadius: '20px', padding: '28px 32px', borderLeft: '4px solid #006d36', marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#006d36', margin: '0 0 8px 0' }}>💡 Lời Kết</h3>
            <p style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{selectedArticle.conclusion}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=2560&auto=format&fit=crop"
          alt="Blog"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid rgba(52, 211, 153, 0.4)', backdropFilter: 'blur(8px)', color: '#4ade80', fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px' }}>
            4U TRAVEL MAGAZINE • CẨM NANG DÀNH CHO BẠN
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, margin: '0 0 16px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tạp Chí Du Lịch & Nghệ Thuật Sống
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', opacity: 0.92, margin: 0 }}>
            Những góc nhìn độc bản, kinh nghiệm lữ hành thượng lưu & phương pháp phục hồi Thân Tâm Trí
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <div style={{ maxWidth: '1280px', margin: '48px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '32px' }}>
          {BLOGS_DATA.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedSlug(article.slug)}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                <img src={article.heroImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#006d36', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '5px 14px', borderRadius: '999px' }}>
                  {article.category}
                </span>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px', display: 'flex', gap: '12px' }}>
                  <span>📅 {article.publishedDate}</span>
                  <span>⏱️ {article.readTime}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.subtitle}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <img src={article.author.avatar} alt={article.author.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>{article.author.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
