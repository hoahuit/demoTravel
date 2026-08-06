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

  const featArticle = BLOGS_DATA[0];
  const moreArticles = BLOGS_DATA.slice(1);

  return (
    <div style={{ background: '#ffffff', color: '#09090b', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', fontFamily: "'Be Vietnam Pro', 'Plus Jakarta Sans', sans-serif", width: '100%' }}>
      <main style={{ width: '90%', maxWidth: '90vw', margin: '0 auto', padding: '0' }}>
        {/* SECTION 1: HEADER */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px', marginBottom: '48px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
            <h1 style={{ fontSize: 'clamp(56px, 8vw, 104px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, margin: 0 }}>
              Blog.
            </h1>
            <p style={{ fontSize: '20px', color: '#525252', margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
              Tạp chí trải nghiệm 4U Retreats • Góc nhìn độc bản & cẩm nang phục hồi Thân Tâm Trí.
            </p>
          </div>
        </section>

        {/* SECTION 2: FEATURED POST */}
        {featArticle && (
          <section style={{ marginBottom: '80px', width: '100%' }}>
            <div style={{ marginBottom: '32px', width: '100%' }}>
              <div
                onClick={() => setSelectedSlug(featArticle.slug)}
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', width: '100%' }}
              >
                <img
                  src={featArticle.heroImage}
                  alt={featArticle.title}
                  style={{
                    width: '100%',
                    maxHeight: '68vh',
                    minHeight: '380px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'box-shadow 0.2s ease, transform 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px 48px', marginBottom: '64px' }}>
              <div>
                <h3
                  onClick={() => setSelectedSlug(featArticle.slug)}
                  style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px 0', cursor: 'pointer', color: '#1E4A3D' }}
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
                <p style={{ fontSize: '18px', lineHeight: 1.625, color: '#404040', marginBottom: '24px' }}>
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
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a' }}>
                    {featArticle.author.name}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: MORE POSTS */}
        {moreArticles.length > 0 && (
          <section>
            <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '48px', color: '#1E4A3D' }}>
              More Posts
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '56px 40px', width: '100%' }}>
              {moreArticles.map(article => (
                <article key={article.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px' }}>
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
                    style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.25, margin: '0 0 12px 0', cursor: 'pointer', color: '#1E4A3D' }}
                  >
                    <span style={{ textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                      {article.title}
                    </span>
                  </h3>

                  <div style={{ fontSize: '16px', color: '#737373', marginBottom: '16px' }}>
                    <time>{article.publishedDate}</time> • {article.readTime}
                  </div>

                  <p style={{ fontSize: '18px', lineHeight: 1.625, color: '#404040', marginBottom: '24px', flex: 1 }}>
                    {article.subtitle}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '16px', width: '48px', height: '48px' }}>
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a' }}>
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
      <section style={{ borderTop: '1px solid #e5e5e5', backgroundColor: '#ffffff', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '672px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '16px' }}>
            Stay Updated
          </h2>
          <p style={{ fontSize: '18px', color: '#525252', marginBottom: '32px' }}>
            Subscribe to our newsletter to get the latest posts delivered straight to your inbox.
          </p>

          <form onSubmit={e => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký!'); }} style={{ maxWidth: '448px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                style={{ flex: 1, height: '40px', borderRadius: '6px', border: '1px solid #d4d4d4', padding: '0 12px', fontSize: '14px', outline: 'none' }}
              />
              <button
                type="submit"
                style={{ height: '40px', padding: '0 24px', borderRadius: '6px', background: '#09090b', color: '#ffffff', fontWeight: 500, fontSize: '14px', border: 'none', cursor: 'pointer' }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

