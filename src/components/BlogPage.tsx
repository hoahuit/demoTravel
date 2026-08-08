import React, { useState } from 'react';
import { BLOGS_DATA, BlogArticle } from '../data/blogsData';
import { BookOpen, Clock, Calendar, ArrowRight, User, Share2, Tag, ChevronRight, ArrowLeft } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedArticle = BLOGS_DATA.find(b => b.slug === selectedSlug);

  if (selectedArticle) {
    return (
      <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', width: '100%', fontFamily: "'Be Vietnam Pro', 'Plus Jakarta Sans', sans-serif" }}>
        {/* Article Header (Full Screen Width) */}
        <div style={{ width: '100%', padding: '0 48px', boxSizing: 'border-box', marginBottom: '40px' }}>
          <button
            onClick={() => setSelectedSlug(null)}
            style={{ background: '#f1f5f9', border: 'none', padding: '10px 22px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: '#475569', marginBottom: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} /> Trở về danh sách bài viết
          </button>
          
          <div>
            <span style={{ display: 'inline-block', background: 'rgba(0,109,54,0.1)', color: '#006d36', fontSize: '12px', fontWeight: 800, padding: '6px 18px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.08em' }}>
              {selectedArticle.category} MAGAZINE
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, margin: '0 0 20px 0', letterSpacing: '-0.02em' }}>
              {selectedArticle.title}
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#475569', lineHeight: 1.6, margin: '0 0 28px 0', fontWeight: 500 }}>
              {selectedArticle.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '20px 0' }}>
              <img src={selectedArticle.author.avatar} alt={selectedArticle.author.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>{selectedArticle.author.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{selectedArticle.author.role} • {selectedArticle.publishedDate} • {selectedArticle.readTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image (Full Screen Width) */}
        <div style={{ width: '100%', padding: '0 48px', boxSizing: 'border-box', marginBottom: '48px' }}>
          <img src={selectedArticle.heroImage} alt={selectedArticle.title} style={{ width: '100%', height: 'clamp(380px, 60vh, 640px)', objectFit: 'cover', borderRadius: '24px' }} />
        </div>

        {/* Article Body Content (Full Screen Grid Layout) */}
        <div style={{ width: '100%', padding: '0 48px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: '56px', alignItems: 'start' }}>
          
          {/* Left Column: Table of Contents & Info */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 16px 0', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📌 Mục Lục Bài Viết
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedArticle.tableOfContents.map((toc, idx) => (
                  <li key={idx} style={{ fontSize: '14px', color: '#006d36', fontWeight: 600, lineHeight: 1.5 }}>{toc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Full Main Text & Sections */}
          <div style={{ fontSize: '18px', lineHeight: 1.85, color: '#334155' }}>
            <p style={{ fontWeight: 600, fontSize: '20px', color: '#1e293b', marginBottom: '36px', lineHeight: 1.6 }}>
              {selectedArticle.introduction}
            </p>

            {/* Sections */}
            {selectedArticle.sections.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 20px 0', lineHeight: 1.3 }}>
                  {sec.title}
                </h2>
                <p style={{ marginBottom: '24px' }}>{sec.text}</p>
                {sec.image && (
                  <div style={{ margin: '32px 0' }}>
                    <img src={sec.image} alt={sec.title} style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '24px' }} />
                    {sec.imageCaption && (
                      <div style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
                        {sec.imageCaption}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div style={{ background: 'rgba(0,109,54,0.05)', borderRadius: '24px', padding: '32px 36px', borderLeft: '5px solid #006d36', marginTop: '48px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#006d36', margin: '0 0 10px 0' }}>💡 Lời kết</h3>
              <p style={{ margin: 0, fontSize: '17px', color: '#1e293b', lineHeight: 1.7 }}>{selectedArticle.conclusion}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const featArticle = BLOGS_DATA[0];
  const moreArticles = BLOGS_DATA.slice(1);

  return (
    <div style={{ background: '#ffffff', color: '#09090b', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', fontFamily: "'Be Vietnam Pro', 'Plus Jakarta Sans', sans-serif", width: '100%' }}>
      <main style={{ width: '100%', padding: '0 48px', boxSizing: 'border-box' }}>
        {/* SECTION 1: HEADER */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px', marginBottom: '48px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, margin: 0 }}>
              Blog.
            </h1>
            <p style={{ fontSize: '20px', color: '#525252', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
              Tạp chí trải nghiệm 4U Retreats • Góc nhìn độc bản & cẩm nang phục hồi Thân Tâm Trí.
            </p>
          </div>
        </section>

        {/* SECTION 2: FEATURED POST (100% FULL SCREEN WIDTH) */}
        {featArticle && (
          <section style={{ marginBottom: '80px', width: '100%' }}>
            <div style={{ marginBottom: '32px', width: '100%' }}>
              <div
                onClick={() => setSelectedSlug(featArticle.slug)}
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', width: '100%' }}
              >
                <img
                  src={featArticle.heroImage}
                  alt={featArticle.title}
                  style={{
                    width: '100%',
                    maxHeight: '68vh',
                    minHeight: '420px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px 56px', marginBottom: '64px', width: '100%' }}>
              <div>
                <h3
                  onClick={() => setSelectedSlug(featArticle.slug)}
                  style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px 0', cursor: 'pointer', color: '#1E4A3D' }}
                >
                  <span style={{ textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                    {featArticle.title}
                  </span>
                </h3>
                <div style={{ fontSize: '16px', color: '#737373', marginBottom: '16px' }}>
                  <time>{featArticle.publishedDate}</time> • {featArticle.category}
                </div>
              </div>

              <div>
                <p style={{ fontSize: '18px', lineHeight: 1.65, color: '#404040', marginBottom: '24px' }}>
                  {featArticle.subtitle}
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '16px', width: '48px', height: '48px' }}>
                    <img
                      src={featArticle.author.avatar}
                      alt={featArticle.author.name}
                      style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0a0a0a' }}>
                    {featArticle.author.name}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: MORE POSTS (FULL SCREEN GRID) */}
        {moreArticles.length > 0 && (
          <section style={{ width: '100%' }}>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '48px', color: '#1E4A3D' }}>
              More Posts
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '56px 48px', width: '100%' }}>
              {moreArticles.map(article => (
                <article key={article.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div
                    onClick={() => setSelectedSlug(article.slug)}
                    style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', marginBottom: '24px', cursor: 'pointer' }}
                  >
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>

                  <h3
                    onClick={() => setSelectedSlug(article.slug)}
                    style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.25, margin: '0 0 12px 0', cursor: 'pointer', color: '#1E4A3D' }}
                  >
                    <span style={{ textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                      {article.title}
                    </span>
                  </h3>

                  <div style={{ fontSize: '15px', color: '#737373', marginBottom: '14px' }}>
                    <time>{article.publishedDate}</time> • {article.readTime}
                  </div>

                  <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#404040', marginBottom: '24px', flex: 1 }}>
                    {article.subtitle}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '14px', width: '44px', height: '44px' }}>
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a' }}>
                      {article.author.name}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* SECTION 4: STAY UPDATED NEWSLETTER */}
      <section style={{ borderTop: '1px solid #e5e5e5', backgroundColor: '#ffffff', padding: '80px 48px', textAlign: 'center', marginTop: '80px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '672px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '16px' }}>
            Stay Updated
          </h2>
          <p style={{ fontSize: '18px', color: '#525252', marginBottom: '32px' }}>
            Đăng ký nhận tin tức & cẩm nang phục hồi Thân Tâm Trí độc quyền từ 4U Retreats.
          </p>

          <form onSubmit={e => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký!'); }} style={{ maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                style={{ flex: 1, height: '46px', borderRadius: '12px', border: '1px solid #d4d4d4', padding: '0 16px', fontSize: '14px', outline: 'none' }}
              />
              <button
                type="submit"
                style={{ height: '46px', padding: '0 28px', borderRadius: '12px', background: '#1E4A3D', color: '#ffffff', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer' }}
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
