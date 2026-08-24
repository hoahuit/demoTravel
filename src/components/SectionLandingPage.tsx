import React, { useState, useEffect } from 'react';
import './SectionLandingPage.css';
import {
  Sparkles,
  Calendar,
  Clock,
  Globe,
  Landmark,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sun,
  Activity,
  Heart,
  Wind,
  Dumbbell,
  Zap,
  Brain,
  Leaf,
  CalendarDays,
  FileText,
  Video,
  PlayCircle
} from 'lucide-react';
import {
  getLandingSectionTemplateById,
  LandingSectionData,
  DEFAULT_LANDING_SECTION_DATA
} from '../data/landingSectionData';
import { getLandingSectionTemplateByIdApi } from '../services/apiService';

export interface SectionLandingPageProps {
  onOpenBooking?: () => void;
  retreatTitle?: string;
  templateId?: string;
  templateData?: LandingSectionData;
}

export default function SectionLandingPage({
  onOpenBooking,
  retreatTitle,
  templateId,
  templateData
}: SectionLandingPageProps) {
  const [data, setData] = useState<LandingSectionData>(() => {
    if (templateData) return templateData;
    return getLandingSectionTemplateById(templateId).data;
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (templateData) {
      setData(templateData);
      return;
    }

    let isMounted = true;
    // 1. Fast local resolution
    const localTemplate = getLandingSectionTemplateById(templateId);
    if (localTemplate?.data) {
      setData(localTemplate.data);
    }

    // 2. Fetch live from backend API
    const targetId = templateId || 'van-dong-co-vai-gay';
    getLandingSectionTemplateByIdApi(targetId)
      .then((liveTemplate) => {
        if (isMounted && liveTemplate?.data) {
          setData(liveTemplate.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [templateId, templateData]);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const { hero, signals, about, method, benefits, trust, steps, pricing, faq } = data;

  return (
    <div className="yoga3d-landing-container">
      {/* ── 1. HERO SECTION ── */}
      <section className="y3d-hero-banner">
        <div className="y3d-hero-content">
          <div className="y3d-badge-pill">
            <Sparkles size={16} />
            <span>{hero.badge}</span>
          </div>

          <h1 className="y3d-hero-title">
            {hero.title}
            <span className="y3d-hero-title-italic">{hero.titleItalic}</span>
          </h1>

          <p className="y3d-hero-desc">
            {hero.description}
          </p>

          <div className="y3d-hero-actions">
            <button
              onClick={() => onOpenBooking ? onOpenBooking() : undefined}
              className="y3d-btn-primary"
            >
              <span>{hero.ctaText}</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="y3d-hero-subinfo">
            {hero.subInfo}
          </div>
        </div>
      </section>

      {/* ── 2. SECTION: CƠ THỂ ĐANG GỬI TÍN HIỆU ── */}
      <section id="signals" className="py-24 y3d-section y3d-section-alt">
        <div className="container-page y3d-container">
          <div className="max-w-[880px] mx-auto text-center mb-14 y3d-section-header">
            <span className="eyebrow text-base y3d-eyebrow">{signals.eyebrow}</span>
            <h2 className="text-[clamp(28px,4.2vw,52px)] text-balance">
              {signals.heading}
            </h2>
            <p className="text-[17px] text-muted-foreground mt-5 leading-[1.7] text-pretty">
              {signals.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 y3d-grid-2">
            {signals.items.map((item, idx) => (
              <article key={idx} className="card-soft p-8 y3d-card-soft">
                <div className="icon-tile mb-5 y3d-icon-tile">
                  <Activity size={24} />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3 text-balance">
                  {item.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-[1.7] text-pretty">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SECTION: GIỚI THIỆU KHÁI NIỆM & HÌNH ẢNH ── */}
      <section id="about-3d" className="py-24 y3d-section">
        <div className="container-page y3d-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center y3d-grid-2">
            <div>
              <span className="eyebrow text-base y3d-eyebrow">{about.eyebrow}</span>
              <h2 className="text-[clamp(24px,2.8vw,38px)] mb-6 leading-[1.25] text-balance font-bold">
                {about.heading}
              </h2>
              <p className="text-[16px] text-muted-foreground leading-[1.8] mb-5 text-pretty">
                {about.para1}
              </p>
              <p className="text-[16px] text-muted-foreground leading-[1.8] text-pretty">
                {about.para2}
              </p>
            </div>

            <div className="order-first lg:order-last y3d-image-frame">
              <img
                src={about.image || '/images/yoga-practice-guide.jpg'}
                alt="Chuyên gia hướng dẫn phương pháp cho học viên"
                loading="lazy"
                width="1920"
                height="1080"
                className="w-full h-auto rounded-3xl object-cover aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION: 3 ĐIỂM VÀNG (METHOD) ── */}
      <section id="method" className="bg-section-alt py-24 y3d-section y3d-section-alt">
        <div className="container-page y3d-container">
          <div className="max-w-[880px] mx-auto text-center mb-14 y3d-section-header">
            <span className="eyebrow text-base y3d-eyebrow">{method.eyebrow}</span>
            <h2 className="text-[clamp(32px,4.4vw,56px)] text-balance">
              {method.heading}
            </h2>
            <p className="text-[17px] text-muted-foreground mt-5 leading-[1.7] text-pretty">
              {method.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 y3d-grid-3">
            {method.items.map((item, idx) => (
              <article key={idx} className="card-soft p-9 text-center flex flex-col items-center y3d-card-soft">
                <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-800 font-semibold mb-4">
                  {item.point}
                </div>
                <div className="icon-tile mb-6 y3d-icon-tile">
                  {idx === 0 ? <Activity size={24} /> : idx === 1 ? <Wind size={24} /> : <Sparkles size={24} />}
                </div>
                <h3 className="font-serif font-bold text-2xl mb-1 text-balance">
                  {item.title}
                </h3>
                <div className="font-serif italic text-primary mb-4 text-base y3d-italic-sage">
                  {item.sanskrit}
                </div>
                <p className="text-[15px] text-muted-foreground leading-[1.7] text-pretty">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SECTION: 21 NGÀY LIÊN TỤC SẼ THAY ĐỔI ĐIỀU GÌ (BENEFITS) ── */}
      <section id="benefits" className="py-24 y3d-section">
        <div className="container-page y3d-container">
          <div className="max-w-[880px] mx-auto text-center mb-14 y3d-section-header">
            <span className="eyebrow text-base y3d-eyebrow">{benefits.eyebrow}</span>
            <h2 className="text-[clamp(22px,3.6vw,44px)] text-balance">
              {benefits.heading}
            </h2>
            <p className="text-[17px] text-muted-foreground mt-5 leading-[1.7] text-pretty">
              {benefits.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 y3d-grid-6">
            {benefits.items.map((item, idx) => (
              <article key={idx} className="card-soft p-8 text-center flex flex-col items-center y3d-card-soft">
                <div className="icon-tile mb-5 y3d-icon-tile">
                  {idx === 0 ? <Sun size={24} /> : idx === 1 ? <Heart size={24} /> : idx === 2 ? <Dumbbell size={24} /> : idx === 3 ? <Zap size={24} /> : idx === 4 ? <Brain size={24} /> : <Leaf size={24} />}
                </div>
                <h3 className="font-serif font-bold text-[19px] mb-3 text-balance">
                  {item.title}
                </h3>
                <p className="text-[14.5px] text-muted-foreground text-pretty">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SECTION: VÌ SAO TIN TƯỞNG (LUXURY BENTO & EDITORIAL TRUST SECTION) ── */}
      <section id="trust" className="py-24 y3d-section y3d-section-alt">
        <div className="container-page y3d-container">
          <div className="max-w-[880px] mx-auto text-center mb-14 y3d-section-header">
            <span className="eyebrow text-base y3d-eyebrow">{trust.eyebrow}</span>
            <h2 className="text-[clamp(28px,4.2vw,52px)] text-balance">
              {trust.heading}
            </h2>
            <p className="text-[17px] text-muted-foreground mt-5 leading-[1.7] text-pretty">
              {trust.description}
            </p>
          </div>

          {/* 1. Unified Sleek Stats Strip */}
          <div className="y3d-stats-strip">
            {trust.stats.map((stat, idx) => (
              <div key={idx} className="y3d-stat-box">
                <div className="y3d-stat-icon-wrap">
                  {idx === 0 ? <CalendarDays size={26} /> : idx === 1 ? <Clock size={26} /> : idx === 2 ? <Globe size={26} /> : <Landmark size={26} />}
                </div>
                <div className="y3d-stat-number">{stat.number}</div>
                <div className="y3d-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 2. 4 Horizontal Feature Cards */}
          <div className="y3d-feature-grid">
            {trust.features.map((feat, idx) => (
              <div key={idx} className="y3d-feature-card">
                <div className="y3d-feature-icon-badge">
                  <CheckCircle size={22} />
                </div>
                <div className="y3d-feature-content">
                  <h4>{feat.title}</h4>
                  <p>{feat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 3. 2 Master Profile Editorial Cards */}
          <div className="y3d-master-profile-grid">
            <article className="y3d-master-profile-card">
              <div className="y3d-profile-image-wrap">
                <img
                  src={trust.teacher.image || '/images/yoga-teacher-portrait.jpg'}
                  alt={trust.teacher.title}
                  loading="lazy"
                />
              </div>
              <div className="y3d-profile-info">
                <span className="y3d-profile-badge">
                  {trust.teacher.badge}
                </span>
                <h4>{trust.teacher.title}</h4>
                <p>{trust.teacher.bio}</p>
              </div>
            </article>

            <article className="y3d-master-profile-card">
              <div className="y3d-profile-logo-wrap">
                <img src={trust.organization.logo || '/Logo-4U-Wellness.png'} alt="4U Wellness logo" />
              </div>
              <div className="y3d-profile-info">
                <span className="y3d-profile-badge">
                  {trust.organization.badge}
                </span>
                <h4>{trust.organization.title}</h4>
                <p>{trust.organization.bio}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION: QUY TRÌNH ĐƠN GIẢN (STEPS BENTO GRID) ── */}
      <section className="py-24 y3d-section">
        <div className="container-page y3d-container">
          <div className="max-w-[880px] mx-auto text-center mb-14 y3d-section-header">
            <span className="eyebrow text-base y3d-eyebrow">{steps.eyebrow}</span>
            <h2 className="text-[clamp(28px,4.2vw,52px)] text-balance">
              {steps.heading}
            </h2>
          </div>

          <div className="y3d-steps-grid">
            {steps.items.map((stepItem, idx) => (
              <div key={idx} className="y3d-step-card">
                <span className="y3d-step-number">{stepItem.step}</span>
                <div className="y3d-step-icon-wrap">
                  {idx === 0 ? <FileText size={26} /> : idx === 1 ? <Video size={26} /> : idx === 2 ? <Calendar size={26} /> : <PlayCircle size={26} />}
                </div>
                <h4>{stepItem.title}</h4>
                <p>{stepItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SECTION: FAQ (CÂU HỎI THƯỜNG GẶP) ── */}
      <section id="faq" className="py-24 y3d-section y3d-section-alt">
        <div className="container-page y3d-container">
          <div className="max-w-[880px] mx-auto text-center mb-14 y3d-section-header">
            <span className="eyebrow text-base y3d-eyebrow">{faq.eyebrow}</span>
            <h2 className="text-[clamp(28px,4.2vw,52px)] text-balance">
              {faq.heading}
            </h2>
          </div>

          <div className="max-w-[800px] mx-auto flex flex-col gap-4">
            {faq.items.map((faqItem, idx) => (
              <div key={idx} className="y3d-faq-item">
                <button
                  type="button"
                  className="y3d-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faqItem.question}</span>
                  <ChevronDown
                    size={20}
                    className={`y3d-faq-icon ${activeFaq === idx ? 'open' : ''}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="y3d-faq-answer">
                    <p>{faqItem.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. SECTION: CTA BANNER CUỐI TRANG ── */}
      <section className="y3d-cta-banner">
        <div className="y3d-cta-content">
          <span className="y3d-cta-badge">{pricing.eyebrow}</span>
          <h2 className="y3d-cta-title">
            {pricing.heading}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '20px 0' }}>
            <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'rgba(255,255,255,0.6)' }}>
              {pricing.originalPrice}
            </span>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#facc15' }}>
              {pricing.discountedPrice}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '480px', margin: '0 auto 32px', textAlign: 'left' }}>
            {pricing.inclusions.map((inc, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.92)', fontSize: '0.94rem' }}>
                <CheckCircle size={18} style={{ color: '#4ade80', flexShrink: 0 }} />
                <span>{inc}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onOpenBooking ? onOpenBooking() : undefined}
            className="y3d-cta-btn"
          >
            <span>{pricing.ctaText}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
