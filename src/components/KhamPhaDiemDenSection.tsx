import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { DESTINATIONS_DATA, syncDestinationsDataFromApi, Destination } from '../data/destinationsData';
import { fetchSectionItemsApi, getImageUrl } from '../services/apiService';
import { ArrowRight } from 'lucide-react';

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
      style={{
        background: '#e5efe8',
        color: '#10201B',
        fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid rgba(16, 32, 27, 0.06)'
      }}
    >
      <style>{`
        /* ETHEREAL LUXURY TYPOGRAPHY & HOVER */
        .zannier-title-italic {
          font-family: 'Libre Caslon Text', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 400;
        }

        .hover-lift {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }

        .zannier-img-zoom {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        }
        .zannier-card:hover .zannier-img-zoom {
          transform: scale(1.04);
        }

        .zannier-underline-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #10201B;
          text-decoration: none;
          border-bottom: 1.5px solid #10201B;
          padding-bottom: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .zannier-card:hover .zannier-underline-link,
        .zannier-underline-link:hover {
          color: #006d36;
          border-bottom-color: #006d36;
          letter-spacing: 0.18em;
        }

        @media (max-width: 900px) {
          .zannier-grid-2col {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .zannier-stagger-col {
            margin-top: 0 !important;
          }
          .zannier-container {
            padding: 0 20px !important;
          }
          .zannier-hero-inner {
            padding: 0 20px 48px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1: HERO (CINEMATIC SUNSET VILLA PANORAMA)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          paddingBottom: '64px'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=85&w=2560&auto=format&fit=crop"
            alt="Zannier Retreat Sanctuary"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.9)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(16,32,27,0.35) 0%, rgba(16,32,27,0.1) 40%, rgba(229,239,232,0.96) 100%)'
            }}
          />
        </div>

        <ScrollReveal>
          <div
            className="zannier-hero-inner"
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              maxWidth: '900px',
              padding: '0 32px'
            }}
          >
            <h1
              className="zannier-title-italic"
              style={{
                fontSize: 'clamp(42px, 5.5vw, 68px)',
                color: '#10201B',
                lineHeight: 1.15,
                margin: '0 0 20px 0',
                letterSpacing: '-0.02em'
              }}
            >
              Độc Bản Từng Điểm Đến.<br />Hội Tụ Trọn Tinh Hoa
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                color: '#405246',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6,
                fontWeight: 400
              }}
            >
              Hành trình tĩnh dưỡng độc bản qua những miền di sản và danh thắng kỳ vĩ của Việt Nam — nơi kiến tạo những khoảnh khắc chữa lành sâu sắc.
            </p>
          </div>
        </ScrollReveal>
      </div>


      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER (100% FULL WIDTH EDGE-TO-EDGE)
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="zannier-container"
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0',
          padding: '0 48px',
          boxSizing: 'border-box'
        }}
      >

        {/* ──────────────────────────────────────────────────────────────
            SECTION 2: "THIẾT KẾ ĐỂ ĐÁNH THỨC TÂM HỒN" (TEXT LEFT, DESERT RIGHT)
        ────────────────────────────────────────────────────────────── */}
        <div style={{ padding: '120px 0 140px' }}>
          <ScrollReveal>
            <div
              className="zannier-grid-2col"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.25fr',
                gap: '64px',
                alignItems: 'center'
              }}
            >
              <div>
                <h2
                  className="zannier-title-italic"
                  style={{
                    fontSize: 'clamp(32px, 3.6vw, 48px)',
                    color: '#10201B',
                    lineHeight: 1.2,
                    margin: '0 0 28px 0'
                  }}
                >
                  Thiết Kế Để Đánh Thức Tâm Hồn
                </h2>

                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.75,
                    color: '#405246',
                    margin: 0,
                    fontWeight: 400
                  }}
                >
                  Kể từ khi khởi dựng những hành trình tĩnh dưỡng đầu tiên, đội ngũ nghệ nhân của 4U đã chu du khắp các miền danh thắng để kiến tạo nên những không gian nghỉ dưỡng độc bản. Từ non cao Hoàng Liên Sơn, vịnh ngọc Hạ Long đến miệt vườn sông nước Cửu Long. Nơi thiên nhiên nguyên sơ, di sản văn hóa truyền thống và tinh thần chăm sóc Thân - Tâm - Trí hòa quyện làm một.
                </p>
              </div>

              <div className="hover-lift" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 16px 45px rgba(16,32,27,0.1)' }}>
                <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=85&w=1600&auto=format&fit=crop"
                    alt="Thiết kế để đánh thức tâm hồn"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>


        {/* ──────────────────────────────────────────────────────────────
            COLLECTION PAIR 1 (DESTINATION 1 & 2: STAGGERED 2-COLUMN)
        ────────────────────────────────────────────────────────────── */}
        <div style={{ paddingBottom: '140px' }}>
          <div
            className="zannier-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 48px'
            }}
          >
            {/* Property 1 (Left - Vịnh Hạ Long) */}
            {(() => {
              const d = getDest(0);
              return (
                <ScrollReveal>
                  <div
                    className="zannier-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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
                    style={{
                      cursor: 'pointer',
                      marginTop: '96px'
                    }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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
            <div style={{ paddingBottom: '140px' }}>
              <ScrollReveal>
                <div
                  className="zannier-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDestinationClick(d)}
                >
                  <div
                    className="hover-lift"
                    style={{
                      width: '100%',
                      height: 'clamp(380px, 65vh, 680px)',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      marginBottom: '32px',
                      boxShadow: '0 20px 55px rgba(16,32,27,0.1)'
                    }}
                  >
                    <img
                      className="zannier-img-zoom"
                      src={getImageUrl(d.heroImage)}
                      alt={d.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#527059',
                        marginBottom: '14px'
                      }}
                    >
                      {d.region}, {d.country}
                    </span>

                    <h2
                      className="zannier-title-italic"
                      style={{
                        fontSize: 'clamp(32px, 3.8vw, 48px)',
                        color: '#10201B',
                        margin: '0 0 16px 0',
                        lineHeight: 1.2
                      }}
                    >
                      {d.name}
                    </h2>

                    <p
                      style={{
                        fontSize: '15.5px',
                        lineHeight: 1.7,
                        color: '#405246',
                        margin: '0 auto 24px auto',
                        fontWeight: 400
                      }}
                    >
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
        <div style={{ paddingBottom: '140px' }}>
          <div
            className="zannier-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 48px'
            }}
          >
            {/* Property 3 (Đà Lạt) */}
            {(() => {
              const d = getDest(3);
              return (
                <ScrollReveal>
                  <div
                    className="zannier-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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
                    style={{
                      cursor: 'pointer',
                      marginTop: '96px'
                    }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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
            GRAND FEATURE 2 (DESTINATION 6: FULL WIDTH PANORAMA - YÊN TỬ)
        ────────────────────────────────────────────────────────────── */}
        {(() => {
          const d = getDest(4); // Yên Tử
          return (
            <div style={{ paddingBottom: '140px' }}>
              <ScrollReveal>
                <div
                  className="zannier-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDestinationClick(d)}
                >
                  <div
                    className="hover-lift"
                    style={{
                      width: '100%',
                      height: 'clamp(380px, 65vh, 680px)',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      marginBottom: '32px',
                      boxShadow: '0 20px 55px rgba(16,32,27,0.1)'
                    }}
                  >
                    <img
                      className="zannier-img-zoom"
                      src={getImageUrl(d.heroImage)}
                      alt={d.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#527059',
                        marginBottom: '14px'
                      }}
                    >
                      {d.region}, {d.country}
                    </span>

                    <h2
                      className="zannier-title-italic"
                      style={{
                        fontSize: 'clamp(32px, 3.8vw, 48px)',
                        color: '#10201B',
                        margin: '0 0 16px 0',
                        lineHeight: 1.2
                      }}
                    >
                      {d.name}
                    </h2>

                    <p
                      style={{
                        fontSize: '15.5px',
                        lineHeight: 1.7,
                        color: '#405246',
                        margin: '0 auto 24px auto',
                        fontWeight: 400
                      }}
                    >
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
            COLLECTION PAIR 3 (DESTINATION 7 & 8: SA PA & NINH BÌNH)
        ────────────────────────────────────────────────────────────── */}
        <div style={{ paddingBottom: '140px' }}>
          <div
            className="zannier-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 48px'
            }}
          >
            {/* Property 5 (Sa Pa) */}
            {(() => {
              const d = getDest(6);
              return (
                <ScrollReveal>
                  <div
                    className="zannier-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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

            {/* Property 6 (Ninh Bình: Staggered Down) */}
            {(() => {
              const d = getDest(7);
              return (
                <ScrollReveal delay={120}>
                  <div
                    className="zannier-card zannier-stagger-col"
                    style={{
                      cursor: 'pointer',
                      marginTop: '96px'
                    }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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
            COLLECTION PAIR 4 (DESTINATION 9 & 10: HÀ GIANG & TIỀN GIANG)
        ────────────────────────────────────────────────────────────── */}
        <div style={{ paddingBottom: '100px' }}>
          <div
            className="zannier-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px 48px'
            }}
          >
            {/* Property 7 (Hà Giang) */}
            {(() => {
              const d = getDest(8);
              return (
                <ScrollReveal>
                  <div
                    className="zannier-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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

            {/* Property 8 (Tiền Giang: Staggered Down) */}
            {(() => {
              const d = getDest(2);
              return (
                <ScrollReveal delay={120}>
                  <div
                    className="zannier-card zannier-stagger-col"
                    style={{
                      cursor: 'pointer',
                      marginTop: '96px'
                    }}
                    onClick={() => handleDestinationClick(d)}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        boxShadow: '0 14px 40px rgba(16,32,27,0.08)'
                      }}
                    >
                      <img
                        className="zannier-img-zoom"
                        src={getImageUrl(d.heroImage)}
                        alt={d.name}
                      />
                    </div>

                    <div style={{ padding: '0 4px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#527059',
                          marginBottom: '12px'
                        }}
                      >
                        {d.region}, {d.country}
                      </span>

                      <h3
                        className="zannier-title-italic"
                        style={{
                          fontSize: '32px',
                          color: '#10201B',
                          margin: '0 0 14px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {d.name}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: '#405246',
                          margin: '0 0 20px 0',
                          fontWeight: 400,
                          maxWidth: '460px'
                        }}
                      >
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
          <div style={{ textAlign: 'center', paddingBottom: '120px' }}>
            <button
              onClick={() => {
                if (onOpenCustomTour) onOpenCustomTour('Việt Nam');
                else if (onNavigate) onNavigate('/destinations');
                else if (onOpenBooking) onOpenBooking();
              }}
              style={{
                background: '#1E4A3D',
                color: '#ffffff',
                border: 'none',
                padding: '16px 42px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(30, 74, 61, 0.25)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Thiết kế lịch trình cho 20+ điểm đến</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
