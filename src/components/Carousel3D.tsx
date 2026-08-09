import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from "../data/toursData";
import { fetchToursApi } from "../services/apiService";

interface CardItem {
  id: number;
  slug?: string;
  tag: string;
  title: string;
  subtitle: string;
  footer: string;
  img: string;
  accent: string;
  location: string;
  price: string;
  duration: string;
  transport: string;
  description: string;
}

const STATIC_CARDS: CardItem[] = [];

const RESUME_DELAY = 500;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const ROTATE_SPEED = 0.00022;
const EXPAND_MS = 480;

export interface Carousel3DProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function Carousel3D({ onOpenBooking, onNavigate }: Carousel3DProps) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const CARDS: CardItem[] = useMemo(() => {
    // Filter strictly for Retreats ĐỘC QUYỀN (isExclusive === true)
    const exclusiveTours = tours.filter((t) => t.isExclusive === true);

    if (exclusiveTours.length > 0) {
      return exclusiveTours.map((t, idx) => ({
        id: idx + 1,
        slug: t.slug,
        tag: "RETREAT ĐỘC QUYỀN",
        title: t.title,
        subtitle: `${t.city} • ${t.category}`,
        footer: "4U Wellness Signature",
        img: t.heroImage || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2560&auto=format&fit=crop",
        accent: "#f2b632",
        location: t.city,
        price: `${t.price?.toLocaleString('vi-VN')} ₫`,
        duration: t.duration,
        transport: t.transportation || "Xe Limousine VIP 4U",
        description: t.subtitle || "Hành trình nghỉ dưỡng độc bản may đo độc quyền.",
      }));
    }
    return [];
  }, [tours]);

  const [position, setPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [expandedCard, setExpandedCard] = useState<CardItem | null>(null);
  const [expandPhase, setExpandPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>("closed");
  const [startRect, setStartRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const cardEls = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPaused = useRef<boolean>(false);
  const positionRef = useRef<number>(0);

  const dragStartX = useRef<number>(0);
  const dragStartPos = useRef<number>(0);
  const lastDragX = useRef<number>(0);
  const lastDragTs = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);

  const count = CARDS.length;
  const cardWidth = 440;
  const stepPx = cardWidth * 0.65;

  const tick = useCallback((ts: number) => {
    if (lastTs.current == null) lastTs.current = ts;
    const dt = ts - lastTs.current;
    lastTs.current = ts;

    if (!isPaused.current && !isDraggingRef.current && expandedCard === null) {
      positionRef.current += ROTATE_SPEED * dt;
    }
    setPosition(positionRef.current);
    rafId.current = requestAnimationFrame(tick);
  }, [expandedCard]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  useEffect(() => {
    const onVisibility = () => {
      isPaused.current = document.hidden;
      lastTs.current = null;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const pauseAutoRotate = useCallback(() => {
    isPaused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const resumeAutoRotateSoon = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      lastTs.current = null;
      isPaused.current = false;
    }, RESUME_DELAY);
  }, []);

  const next = () => {
    pauseAutoRotate();
    positionRef.current = Math.round(positionRef.current) + 1;
    setPosition(positionRef.current);
    resumeAutoRotateSoon();
  };

  const prev = () => {
    pauseAutoRotate();
    positionRef.current = Math.round(positionRef.current) - 1;
    setPosition(positionRef.current);
    resumeAutoRotateSoon();
  };

  const openExpanded = (card: CardItem, rect: DOMRect) => {
    pauseAutoRotate();
    setStartRect({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setExpandedCard(card);
    setExpandPhase("opening");

    setTimeout(() => {
      setExpandPhase("open");
    }, 30);
  };

  const closeExpanded = () => {
    setExpandPhase("closing");
    setTimeout(() => {
      setExpandedCard(null);
      setExpandPhase("closed");
      resumeAutoRotateSoon();
    }, EXPAND_MS);
  };

  const goTo = (index: number) => {
    pauseAutoRotate();
    positionRef.current = index;
    setPosition(positionRef.current);
    resumeAutoRotateSoon();
  };

  const onDragStart = (clientX: number) => {
    pauseAutoRotate();
    setIsDragging(true);
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartX.current = clientX;
    dragStartPos.current = positionRef.current;
    lastDragX.current = clientX;
    lastDragTs.current = Date.now();
    velocityRef.current = 0;
  };

  const onDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaFromStart = clientX - dragStartX.current;
    if (Math.abs(deltaFromStart) > 10) {
      hasMovedRef.current = true;
    }
    positionRef.current = dragStartPos.current - deltaFromStart / stepPx;
    setPosition(positionRef.current);

    const now = Date.now();
    const dtMs = Math.max(now - lastDragTs.current, 1);
    const dxPx = clientX - lastDragX.current;
    velocityRef.current = -dxPx / stepPx / dtMs;
    lastDragX.current = clientX;
    lastDragTs.current = now;
  };

  const onDragEnd = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    let v = velocityRef.current;
    const glide = () => {
      v *= 0.92;
      positionRef.current += v * 16;
      setPosition(positionRef.current);
      if (Math.abs(v) > 0.00005) {
        requestAnimationFrame(glide);
      }
    };
    if (Math.abs(v) > 0.0002) glide();
    resumeAutoRotateSoon();
  };

  const handleCardClick = (e: React.MouseEvent, card: CardItem) => {
    if (hasMovedRef.current) return;
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    openExpanded(card, rect);
  };

  return (
    <div style={styles.page}>
      <div
        style={styles.stage}
        onMouseEnter={pauseAutoRotate}
        onMouseLeave={() => !isDraggingRef.current && resumeAutoRotateSoon()}
      >
        <button
          aria-label="Previous"
          style={{ ...styles.navBtn, left: 24 }}
          onClick={prev}
        >
          <ChevronLeft size={22} color="#142619" />
        </button>

        <div
          ref={trackRef}
          style={styles.track}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={() => isDraggingRef.current && onDragEnd()}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          {CARDS.map((card, i) => {
            let offset = i - position;
            offset = ((offset % count) + count) % count;
            if (offset > count / 2) offset -= count;

            const absOffset = Math.abs(offset);
            const isCenter = absOffset < 0.4;

            const translateX = offset * (cardWidth * 0.62);
            const translateZ = -absOffset * 180;
            const rotateY = offset === 0 ? 0 : -offset * 26;
            const scale = Math.max(0.7, 1 - absOffset * 0.14);
            const opacity = absOffset > 2.2 ? 0 : Math.max(0.15, 1 - absOffset * 0.32);
            const zIndex = Math.round(100 - absOffset * 10);

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardEls.current[card.id] = el;
                }}
                style={{
                  ...styles.card,
                  width: cardWidth,
                  transform: `translateX(-50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: expandedCard?.id === card.id && expandPhase !== "closed" ? 0 : opacity,
                  zIndex,
                  transition: isDragging ? "none" : `transform 0.15s linear`,
                  cursor: isDragging ? "grabbing" : "pointer",
                  pointerEvents: absOffset > 2.2 ? "none" : "auto",
                  border: isCenter
                    ? "1px solid rgba(255, 255, 255, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: isCenter
                    ? "0 20px 50px rgba(0, 0, 0, 0.35)"
                    : "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
                onClick={(e) => handleCardClick(e, card)}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  style={styles.cardImg}
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div style={styles.cardOverlay} />
                <div style={styles.cardContent}>
                  <span style={styles.tagPill}>{card.tag}</span>
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardSubtitle}>{card.subtitle}</p>
                  <div style={styles.cardFooter}>
                    <span>{card.footer}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          aria-label="Next"
          style={{ ...styles.navBtn, right: 24 }}
          onClick={next}
        >
          <ChevronRight size={22} color="#142619" />
        </button>
      </div>

      <div style={styles.dots}>
        {CARDS.map((_, i) => {
          const nearest = Math.round(position);
          const activeDot = ((nearest % count) + count) % count === i;
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                ...styles.dot,
                background: activeDot ? "#2d5a36" : "rgba(0,0,0,0.18)",
                width: activeDot ? 20 : 7,
              }}
            />
          );
        })}
      </div>

      {expandedCard && createPortal(
        <ExpandedCard
          card={expandedCard}
          phase={expandPhase}
          startRect={startRect}
          onClose={closeExpanded}
          durationMs={EXPAND_MS}
          onOpenBooking={onOpenBooking}
          onNavigate={onNavigate}
        />,
        document.body
      )}
    </div>
  );
}

function ExpandedCard({
  card,
  phase,
  startRect,
  onClose,
  durationMs,
  onOpenBooking,
  onNavigate,
}: {
  card: CardItem;
  phase: string;
  startRect: { left: number; top: number; width: number; height: number } | null;
  onClose: () => void;
  durationMs: number;
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}) {
  const isOpenPhase = phase === "open";

  // Lock background scroll when modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const targetWidth = Math.min(640, vw > 480 ? vw - 32 : vw - 16);
  const targetHeight = Math.min(680, vh > 480 ? vh - 48 : vh - 24);
  const targetLeft = (vw - targetWidth) / 2;
  const targetTop = Math.max(12, (vh - targetHeight) / 2);

  const rect =
    phase === "open"
      ? { left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight }
      : startRect || { left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 18, 14, 0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 10000,
          opacity: isOpenPhase ? 1 : 0,
          transition: `opacity ${durationMs}ms ease`,
        }}
        onClick={onClose}
      />

      {/* Expanded Modal Box */}
      <div
        style={{
          position: "fixed",
          zIndex: 10001,
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          maxHeight: "calc(100vh - 32px)",
          borderRadius: isOpenPhase ? 22 : 18,
          overflow: "hidden",
          background: "#142619",
          boxShadow: "0 30px 90px rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", sans-serif`,
          transition: `left ${durationMs}ms ${EASING}, top ${durationMs}ms ${EASING}, width ${durationMs}ms ${EASING}, height ${durationMs}ms ${EASING}, border-radius ${durationMs}ms ${EASING}`,
        }}
      >
        {/* Header / Banner Area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 210,
            flexShrink: 0,
            overflow: "hidden",
            background: "#1c3b2e",
          }}
        >
          <img
            src={card.img}
            alt={card.title}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: isOpenPhase ? "scale(1)" : "scale(1.06)",
              transition: `transform ${durationMs + 200}ms ease`,
            }}
          />

          {/* Vignette Gradients */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 50%, rgba(20,38,25,0.95) 100%)",
            }}
          />

          {/* Top Bar Badges & Close Button */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 20,
              right: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#f2b632",
                color: "#1a1a1a",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                padding: "4px 10px",
                borderRadius: 6,
                textTransform: "uppercase",
              }}
            >
              {card.tag}
            </span>

            <button
              onClick={onClose}
              aria-label="Đóng"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.8)",
                background: "#ef4444",
                boxShadow: "0 4px 14px rgba(239, 68, 68, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.12)";
                e.currentTarget.style.background = "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "#ef4444";
              }}
            >
              <X size={18} color="#fff" strokeWidth={2.5} />
            </button>
          </div>

          {/* Title inside Header */}
          <div
            style={{
              position: "absolute",
              left: 24,
              bottom: 18,
              right: 24,
              opacity: isOpenPhase ? 1 : 0,
              transform: isOpenPhase ? "translateY(0)" : "translateY(12px)",
              transition: `opacity ${durationMs * 0.55}ms ease ${isOpenPhase ? durationMs * 0.35 : 0
                }ms, transform ${durationMs * 0.55}ms ease ${isOpenPhase ? durationMs * 0.35 : 0
                }ms`,
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 700,
                margin: "0 0 4px",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
              }}
            >
              {card.title}
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 13.5,
                margin: 0,
              }}
            >
              {card.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div
          style={{
            padding: "24px 28px 24px",
            color: "#fff",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: isOpenPhase ? 1 : 0,
            transform: isOpenPhase ? "translateY(0)" : "translateY(16px)",
            transition: `opacity ${durationMs * 0.55}ms ease ${isOpenPhase ? durationMs * 0.42 : 0
              }ms, transform ${durationMs * 0.55}ms ease ${isOpenPhase ? durationMs * 0.42 : 0
              }ms`,
          }}
        >
          <div>
            {/* Highlights Grid - Auto responsive */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12.5,
                  color: "#d0d0d0",
                }}
              >
                <span>Địa điểm: <strong style={{ color: "#fff", display: "block" }}>{card.location}</strong></span>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12.5,
                  color: "#d0d0d0",
                }}
              >
                <span>Thời gian: <strong style={{ color: "#fff", display: "block" }}>{card.duration}</strong></span>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12.5,
                  color: "#d0d0d0",
                }}
              >
                <span>Phương tiện: <strong style={{ color: "#fff", display: "block" }}>{card.transport}</strong></span>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 12.5,
                  color: "#d0d0d0",
                }}
              >
                <span>Bộ sưu tập: <strong style={{ color: "#fff", display: "block" }}>{card.footer}</strong></span>
              </div>
            </div>

            {/* Description Text */}
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.85)",
                margin: "0 0 16px",
              }}
            >
              {card.description}
            </p>
          </div>

          {/* Action Footer - Mobile Responsive Wrap */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              paddingTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", display: "block" }}>
                Giá trọn gói tham khảo
              </span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#f2b632" }}>
                Chỉ từ {card.price} <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>/ khách</span>
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={onClose}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Đóng
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  if (onNavigate) {
                    onNavigate(`/sanpham/${card?.slug || 'tinh-lang-giua-dai-ngan'}`);
                  }
                }}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#ffffff",
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }}
              >
                🔍 Xem Chi Tiết
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenBooking) {
                    onOpenBooking({
                      title: card?.title || '4U Wellness Retreat',
                      price: card?.price || 6500000,
                      city: card?.tag || 'Retreat'
                    });
                  }
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#2d5a36",
                  color: "#fff",
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#23472a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2d5a36";
                }}
              >
                Đặt Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: 520,
    width: "100%",
    background: "transparent",
    padding: "10px 0 20px",
    fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Plus Jakarta Sans", "Inter", sans-serif`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none",
  },
  stage: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
    height: 580,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    position: "relative",
    width: "100%",
    height: "100%",
    perspective: 1400,
    perspectiveOrigin: "50% 50%",
  },
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: 520,
    borderRadius: 22,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    transformOrigin: "center center",
    marginTop: -260,
    background: "#142619",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.88) 100%)",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "28px 30px",
    color: "#fff",
  },
  tagPill: {
    display: "inline-block",
    background: "#f2b632",
    color: "#1a1a1a",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    padding: "5px 12px",
    borderRadius: 6,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 6px",
    color: "#fff",
    letterSpacing: "-0.01em",
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.88,
    margin: "0 0 14px",
  },
  cardFooter: {
    fontSize: 12.5,
    opacity: 0.85,
    paddingTop: 8,
    borderTop: "1px solid rgba(255,255,255,0.15)",
  },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 200,
  },
  dots: {
    display: "flex",
    gap: 8,
    marginTop: 24,
  },
  dot: {
    height: 7,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    transition: `all 0.4s ${EASING}`,
  },
};
