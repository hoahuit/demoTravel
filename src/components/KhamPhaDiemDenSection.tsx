import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { DESTINATIONS_DATA, syncDestinationsDataFromApi, Destination } from '../data/destinationsData';
import { fetchSectionItemsApi, getImageUrl } from '../services/apiService';
import { ArrowRight, Sparkles } from 'lucide-react';
import './KhamPhaDiemDenSection.css';

export interface KhamPhaDiemDenSectionProps {
  onNavigate?: (path: string) => void;
  onOpenBooking?: (tourData?: any) => void;
  onOpenCustomTour?: (destinationName: string) => void;
}

export default function KhamPhaDiemDenSection({
  onNavigate,
  onOpenBooking,
  onOpenCustomTour
}: KhamPhaDiemDenSectionProps) {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS_DATA);

  useEffect(() => {
    fetchSectionItemsApi('destinations').then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncDestinationsDataFromApi(data);
        setDestinations([...data]);
      }
    });
  }, []);

  // Safe accessor helper
  const getDest = (index: number): Destination => {
    return destinations[index] || DESTINATIONS_DATA[index] || DESTINATIONS_DATA[0];
  };

  const handleDestinationClick = (dest: Destination) => {
    if (onOpenCustomTour) {
      onOpenCustomTour(dest.name);
    } else if (onOpenBooking) {
      onOpenBooking({ city: dest.name, name: `Hành Trình Tĩnh Dưỡng ${dest.name}` });
    } else if (onNavigate) {
      onNavigate(`/tours?city=${encodeURIComponent(dest.name)}`);
    }
  };

  return (
    <section
      id="kham-pha-diem-den"
      className="kpdd-section-root"
    >
      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: HERO (CINEMATIC SUNSET VILLA PANORAMA)
      ══════════════════════════════════════════════════════════════ */}
      <div className="kpdd-hero-wrap">
        <div className="kpdd-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=2560&auto=format&fit=crop"
            alt="Zannier Retreat Sanctuary"
            className="kpdd-hero-bg-img"
          />
          <div className="kpdd-hero-gradient" />
        </div>

        <ScrollReveal>
          <div className="zannier-hero-inner">
            <span className="kpdd-hero-badge">
              <Sparkles size={14} />
              DESTINATIONS COLLECTION • HÀNH TRÌNH DANH THẮNG
            </span>

            <h1 className="zannier-title-italic kpdd-hero-title">
              Độc Bản Từng Điểm Đến.<br />Hội Tụ Trọn Tinh Hoa
            </h1>

            <p className="kpdd-hero-desc">
              Hành trình tĩnh dưỡng độc bản qua những miền di sản và danh thắng kỳ vĩ của Việt Nam — nơi kiến tạo những khoảnh khắc chữa lành sâu sắc.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER (100% FULL WIDTH EDGE-TO-EDGE)
      ══════════════════════════════════════════════════════════════ */}
      <div className="zannier-container">

        {/* ──────────────────────────────────────────────────────────────
            SECTION 2: "THIẾT KẾ ĐỂ ĐÁNH THỨC TÂM HỒN" (TEXT LEFT, DESERT RIGHT)
        ────────────────────────────────────────────────────────────── */}
        <div className="kpdd-intro-wrap">
          <ScrollReveal>
            <div className="zannier-grid-intro">
              <div>
                <h2 className="zannier-title-italic kpdd-intro-title">
                  Thiết Kế Để Đánh Thức Tâm Hồn
                </h2>

                <p className="kpdd-intro-desc">
                  Kể từ khi khởi dựng những hành trình tĩnh dưỡng đầu tiên, đội ngũ nghệ nhân của 4U đã chu du khắp các miền danh thắng để kiến tạo nên những không gian nghỉ dưỡng độc bản. Từ non cao Hoàng Liên Sơn, vịnh ngọc Hạ Long đến miệt vườn sông nước Cửu Long. Nơi thiên nhiên nguyên sơ, di sản văn hóa truyền thống và tinh thần chăm sóc Thân - Tâm - Trí hòa quyện làm một.
                </p>
              </div>

              <div className="hover-lift kpdd-intro-img-card">
                <div className="kpdd-intro-img-box">
                  <img
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=85&w=1600&auto=format&fit=crop"
                    alt="Thiết kế để đánh thức tâm hồn"
                    className="kpdd-intro-img"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ──────────────────────────────────────────────────────────────
            COLLECTION PAIR 1 (DESTINATION 1 & 2: STAGGERED 2-COLUMN)
        ────────────────────────────────────────────────────────────── */}
        <div className="kpdd-pair-wrap">
          <div className="zannier-grid-2col">
            {/* Property 1 (Left - Vịnh Hạ Long) */}
            {(() => {
              const d = getDest(0);
              return (
                <ScrollReveal>
                  <div
                    className="zannier-card"
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div className="hover-lift kpdd-card-img-box">
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div className="kpdd-card-content">
                      <span className="kpdd-card-region">
                        {d.region}, {d.country}
                      </span>

                      <h3 className="zannier-title-italic kpdd-card-title">
                        {d.name}
                      </h3>

                      <p className="kpdd-card-desc">
                        {d.overview}
                      </p>

                      <span className="zannier-underline-link">
                        Thiết kế lịch trình {d.name}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}

            {/* Property 2 (Right - Sóc Trăng: Staggered Down) */}
            {(() => {
              const d = getDest(1);
              return (
                <ScrollReveal delay={120}>
                  <div
                    className="zannier-card zannier-stagger-col"
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div className="hover-lift kpdd-card-img-box">
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div className="kpdd-card-content">
                      <span className="kpdd-card-region">
                        {d.region}, {d.country}
                      </span>

                      <h3 className="zannier-title-italic kpdd-card-title">
                        {d.name}
                      </h3>

                      <p className="kpdd-card-desc">
                        {d.overview}
                      </p>

                      <span className="zannier-underline-link">
                        Thiết kế lịch trình {d.name}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────
            GRAND FEATURE 1 (DESTINATION 3: FULL WIDTH PANORAMA - HỘI AN)
        ────────────────────────────────────────────────────────────── */}
        {(() => {
          const d = getDest(9); // Hội An
          return (
            <div className="kpdd-pair-wrap">
              <ScrollReveal>
                <div
                  className="zannier-card"
                  onClick={() => handleDestinationClick(d)}
                >
                  <div className="hover-lift kpdd-grand-panorama-img-box">
                    <img
                      className="zannier-img-zoom"
                      src={getImageUrl(d.heroImage)}
                      alt={d.name}
                    />
                  </div>

                  <div className="kpdd-grand-content">
                    <span className="kpdd-card-region">
                      {d.region}, {d.country}
                    </span>

                    <h2 className="zannier-title-italic kpdd-grand-title">
                      {d.name}
                    </h2>

                    <p className="kpdd-grand-desc">
                      {d.overview}
                    </p>

                    <span className="zannier-underline-link">
                      Thiết kế lịch trình {d.name}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          );
        })()}

        {/* ──────────────────────────────────────────────────────────────
            COLLECTION PAIR 2 (DESTINATION 4 & 5: STAGGERED 2-COLUMN)
        ────────────────────────────────────────────────────────────── */}
        <div className="kpdd-pair-wrap">
          <div className="zannier-grid-2col">
            {/* Property 3 (Đà Lạt) */}
            {(() => {
              const d = getDest(3);
              return (
                <ScrollReveal>
                  <div
                    className="zannier-card"
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div className="hover-lift kpdd-card-img-box">
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div className="kpdd-card-content">
                      <span className="kpdd-card-region">
                        {d.region}, {d.country}
                      </span>

                      <h3 className="zannier-title-italic kpdd-card-title">
                        {d.name}
                      </h3>

                      <p className="kpdd-card-desc">
                        {d.overview}
                      </p>

                      <span className="zannier-underline-link">
                        Thiết kế lịch trình {d.name}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}

            {/* Property 4 (Phú Quốc: Staggered Down) */}
            {(() => {
              const d = getDest(5);
              return (
                <ScrollReveal delay={120}>
                  <div
                    className="zannier-card zannier-stagger-col"
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div className="hover-lift kpdd-card-img-box">
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div className="kpdd-card-content">
                      <span className="kpdd-card-region">
                        {d.region}, {d.country}
                      </span>

                      <h3 className="zannier-title-italic kpdd-card-title">
                        {d.name}
                      </h3>

                      <p className="kpdd-card-desc">
                        {d.overview}
                      </p>

                      <span className="zannier-underline-link">
                        Thiết kế lịch trình {d.name}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })()}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────
            VIEW ALL 20+ RETREAT DESTINATIONS CTA
        ────────────────────────────────────────────────────────────── */}
        <ScrollReveal delay={100}>
          <div className="kpdd-bottom-cta-wrap">
            <button
              onClick={() => {
                if (onOpenCustomTour) onOpenCustomTour('Việt Nam');
                else if (onNavigate) onNavigate('/diem-den');
                else if (onOpenBooking) onOpenBooking();
              }}
              className="kpdd-btn-all"
            >
              <span>Khám phá toàn bộ 20+ điểm đến retreat</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
