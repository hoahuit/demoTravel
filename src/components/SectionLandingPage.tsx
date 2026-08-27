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

  const getCardGridClass = (count: number) => {
    if (count === 6) return 'y3d-cards-grid y3d-cards-grid-6';
    if (count === 5) return 'y3d-cards-grid y3d-cards-grid-5';
    if (count === 4) return 'y3d-cards-grid y3d-cards-grid-4';
    if (count === 3) return 'y3d-cards-grid y3d-cards-grid-3';
    if (count === 2) return 'y3d-cards-grid y3d-cards-grid-2';
    return 'y3d-cards-grid';
  };

  return (
    <div className="y3d-root yoga3d-landing-container">
      {/* ── 1. HERO SECTION ── */}
      <section className="y3d-hero-banner">
        <div className="y3d-hero-content">
          <div className="y3d-badge-pill">
            <Sparkles size={18} />
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
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="y3d-hero-subinfo">
            {hero.subInfo}
          </div>
        </div>
      </section>

      {/* ── 2. SECTION: CƠ THỂ ĐANG GỬI TÍN HIỆU ── */}
      <section id="signals" className="y3d-section y3d-section-alt">
        <div className="y3d-container">
          <div className="y3d-section-header">
            <span className="y3d-eyebrow">{signals.eyebrow}</span>
            <h2 className="y3d-section-heading">
              {signals.heading}
            </h2>
            <p className="y3d-section-desc">
              {signals.description}
            </p>
          </div>

          <div className={getCardGridClass(signals.items.length)}>
            {signals.items.map((item, idx) => (
              <article key={idx} className="y3d-card-soft">
                <div className="y3d-icon-tile">
                  <Activity size={28} />
                </div>
                <h3 className="y3d-card-title">
                  {item.title}
                </h3>
                <p className="y3d-card-desc">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SECTION: GIỚI THIỆU KHÁI NIỆM & HÌNH ẢNH ── */}
      <section id="about-3d" className="y3d-section">
        <div className="y3d-container">
          <div className="y3d-about-grid">
            <div className="y3d-about-content">
              <span className="y3d-eyebrow">{about.eyebrow}</span>
              <h2 className="y3d-about-heading">
                {about.heading}
              </h2>
              <p className="y3d-about-desc">
                {about.para1}
              </p>
              <p className="y3d-about-desc">
                {about.para2}
              </p>
            </div>

            <div className="y3d-image-frame">
              <img
                src={about.image || '/images/yoga-practice-guide.jpg'}
                alt="Chuyên gia hướng dẫn phương pháp cho học viên"
                loading="lazy"
                width="1920"
                height="1080"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION: 3 ĐIỂM VÀNG (METHOD) ── */}
      <section id="method" className="y3d-section y3d-section-alt">
        <div className="y3d-container">
          <div className="y3d-section-header">
            <span className="y3d-eyebrow">{method.eyebrow}</span>
            <h2 className="y3d-section-heading">
              {method.heading}
            </h2>
            <p className="y3d-section-desc">
              {method.description}
            </p>
          </div>

          <div className={getCardGridClass(method.items.length)}>
            {method.items.map((item, idx) => (
              <article key={idx} className="y3d-card-soft text-center flex flex-col items-center">
                <div className="y3d-point-tag">
                  {item.point}
                </div>
                <div className="y3d-icon-tile">
                  {idx === 0 ? <Activity size={28} /> : idx === 1 ? <Wind size={28} /> : <Sparkles size={28} />}
                </div>
                <h3 className="y3d-card-title">
                  {item.title}
                </h3>
                <div className="y3d-italic-sage">
                  {item.sanskrit}
                </div>
                <p className="y3d-card-desc">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SECTION: 21 NGÀY LIÊN TỤC SẼ THAY ĐỔI ĐIỀU GÌ (BENEFITS) ── */}
      <section id="benefits" className="y3d-section">
        <div className="y3d-container">
          <div className="y3d-section-header">
            <span className="y3d-eyebrow">{benefits.eyebrow}</span>
            <h2 className="y3d-section-heading">
              {benefits.heading}
            </h2>
            <p className="y3d-section-desc">
              {benefits.description}
            </p>
          </div>

          <div className={getCardGridClass(benefits.items.length)}>
            {benefits.items.map((item, idx) => (
              <article key={idx} className="y3d-card-soft text-center flex flex-col items-center">
                <div className="y3d-icon-tile">
                  {idx === 0 ? <Sun size={28} /> : idx === 1 ? <Heart size={28} /> : idx === 2 ? <Dumbbell size={28} /> : idx === 3 ? <Zap size={28} /> : idx === 4 ? <Brain size={28} /> : <Leaf size={28} />}
                </div>
                <h3 className="y3d-card-title">
                  {item.title}
                </h3>
                <p className="y3d-card-desc">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SECTION: VÌ SAO TIN TƯỞNG (LUXURY BENTO & EDITORIAL TRUST SECTION) ── */}
      <section id="trust" className="y3d-section y3d-section-alt">
        <div className="y3d-container">
          <div className="y3d-section-header">
            <span className="y3d-eyebrow">{trust.eyebrow}</span>
            <h2 className="y3d-section-heading">
              {trust.heading}
            </h2>
            <p className="y3d-section-desc">
              {trust.description}
            </p>
          </div>

          {/* 1. Unified Sleek Stats Strip */}
          <div className="y3d-stats-strip">
            {trust.stats.map((stat, idx) => (
              <div key={idx} className="y3d-stat-box">
                <div className="y3d-stat-icon-wrap">
                  {idx === 0 ? <CalendarDays size={30} /> : idx === 1 ? <Clock size={30} /> : idx === 2 ? <Globe size={30} /> : <Landmark size={30} />}
                </div>
                <div className="y3d-stat-number">{stat.number}</div>
                <div className="y3d-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 2. Feature Cards (4 items -> 2 rows x 2 items) */}
          <div className={getCardGridClass(trust.features.length)} style={{ marginBottom: '36px' }}>
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

          {/* 3. 2 Master Profile Editorial Cards (1 row x 2 items) */}
          <div className="y3d-cards-grid y3d-cards-grid-2">
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

      {/* ── 7. SECTION: QUY TRÌNH ĐƠN GIẢN (STEPS: 4 items -> 2 rows x 2 items) ── */}
      <section className="y3d-section">
        <div className="y3d-container">
          <div className="y3d-section-header">
            <span className="y3d-eyebrow">{steps.eyebrow}</span>
            <h2 className="y3d-section-heading">
              {steps.heading}
            </h2>
          </div>

          <div className={getCardGridClass(steps.items.length)}>
            {steps.items.map((stepItem, idx) => (
              <div key={idx} className="y3d-step-card">
                <span className="y3d-step-number">{stepItem.step}</span>
                <div className="y3d-step-icon-wrap">
                  {idx === 0 ? <FileText size={28} /> : idx === 1 ? <Video size={28} /> : idx === 2 ? <Calendar size={28} /> : <PlayCircle size={28} />}
                </div>
                <h4>{stepItem.title}</h4>
                <p>{stepItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SECTION: FAQ (CÂU HỎI THƯỜNG GẶP) ── */}
      <section id="faq" className="y3d-section y3d-section-alt">
        <div className="y3d-container">
          <div className="y3d-section-header">
            <span className="y3d-eyebrow">{faq.eyebrow}</span>
            <h2 className="y3d-section-heading">
              {faq.heading}
            </h2>
          </div>

          <div className="y3d-faq-list">
            {faq.items.map((faqItem, idx) => (
              <div key={idx} className="y3d-faq-item">
                <button
                  type="button"
                  className="y3d-faq-question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faqItem.question}</span>
                  <ChevronDown
                    size={22}
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
    </div>
  );
}
