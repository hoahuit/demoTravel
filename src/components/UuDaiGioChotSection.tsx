import React, { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { Star, ArrowRight, ChevronDown, Clock, Flame } from 'lucide-react';
import EmptyState from './ui/EmptyState';
import './UuDaiGioChotSection.css';

export interface UuDaiGioChotSectionProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function UuDaiGioChotSection({ onOpenBooking, onNavigate }: UuDaiGioChotSectionProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 4,
    minutes: 59,
    seconds: 50
  });

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter tours for Ưu Đãi Giờ Chót (isPromotion = true, discount, or category 'uu-dai-gio-chot' / 'last-minute')
  const promoTours = tours.filter((tour) =>
    tour.isPromotion === true ||
    (Array.isArray(tour.categories) && (tour.categories.includes('uu-dai-gio-chot') || tour.categories.includes('last-minute'))) ||
    ((tour.originalPrice || 0) > (tour.price || 0))
  );

  const visiblePromoTours = showAll ? promoTours : promoTours.slice(0, 4);
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <section id="uu-dai-gio-chot" className="udgc-section-root">
      {/* ── 100% FULL WIDTH CONTAINER ── */}
      <div className="udgc-full-container">

        {/* ── 1. SECTION HEADER WITH DESTINATION COUNTDOWN TIMER ── */}
        <ScrollReveal>
          <div className="udgc-header">
            <div>
              <span className="udgc-badge">
                Limited Sanctuary Offers
              </span>
              <h2 className="udgc-title">
                Ưu Đãi Giờ Chót
              </h2>
            </div>

            {/* MINIMALIST LUXURY COUNTDOWN TIMER */}
            <div className="udgc-timer-wrap">
              <div className="udgc-timer-label-box">
                <Clock size={16} color="#10201B" />
                <span className="udgc-timer-label">
                  Ưu đãi kết thúc sau:
                </span>
              </div>

              <div className="udgc-timer-digits">
                <div className="udgc-timer-block">
                  {formatNumber(timeLeft.hours)}h
                </div>
                <span className="udgc-timer-colon">:</span>
                <div className="udgc-timer-block">
                  {formatNumber(timeLeft.minutes)}m
                </div>
                <span className="udgc-timer-colon">:</span>
                <div className="udgc-timer-block dark">
                  {formatNumber(timeLeft.seconds)}s
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL 2-COLUMN GRID (AS DESTINATION STYLE) ── */}
        {promoTours.length === 0 ? (
          <EmptyState
            title="Chưa có tour ưu đãi giờ chót"
            description="Hiện tại chưa có tour nào có khuyến mãi giờ chót. Hãy quay lại sau để săn ưu đãi hấp dẫn!"
            transparent={true}
          />
        ) : (
          <div className="udgc-editorial-grid">
            {visiblePromoTours.map((tour, index) => {
              const heroImg = getImageUrl(tour.heroImage);
              const priceVal = tour.price || 0;
              const origVal = tour.originalPrice || 0;
              const hasDiscount = origVal > priceVal;
              const discountPercent = hasDiscount ? Math.round(((origVal - priceVal) / origVal) * 100) : 0;

              return (
                <ScrollReveal key={tour.id || tour.slug || index} delay={index * 100}>
                  <div
                    className="udgc-editorial-card"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/tour/${tour.slug}`);
                      } else if (onOpenBooking) {
                        onOpenBooking(tour);
                      }
                    }}
                  >
                    {/* Photo Frame */}
                    <div className="udgc-editorial-img-wrap">
                      <img src={heroImg} alt={tour.title} loading="lazy" />

                      {/* Top Badges */}
                      <div className="udgc-badges-top-left">
                        {hasDiscount && (
                          <div className="udgc-discount-badge">
                            <Flame size={13} />
                            <span>Giảm {discountPercent}%</span>
                          </div>
                        )}

                        <div className="udgc-flash-badge">
                          Giờ Chót
                        </div>
                      </div>

                      {/* Top Right Category Tag */}
                      <div className="udgc-cat-badge-top-right">
                        Ưu Đãi Giờ Chót
                      </div>
                    </div>

                    {/* Meta Label */}
                    <div className="udgc-card-meta">
                      <span className="udgc-card-meta-text">
                        {tour.city || 'Việt Nam'} • {tour.duration || 'Nghỉ Dưỡng'}
                      </span>
                    </div>

                    {/* Title Serif */}
                    <h3 className="udgc-card-title">
                      {tour.title}
                    </h3>

                    {/* Description */}
                    <p className="udgc-card-desc">
                      {tour.subtitle || 'Cơ hội trải nghiệm kỳ nghỉ dưỡng thượng lưu với mức giá đặc quyền giới hạn trong ngày.'}
                    </p>

                    {/* Bottom: Price & Underline Action */}
                    <div className="udgc-card-bottom">
                      <div>
                        {hasDiscount && (
                          <span className="udgc-orig-price">
                            {origVal.toLocaleString('vi-VN')} ₫
                          </span>
                        )}
                        <span className={`udgc-current-price ${hasDiscount ? 'discount' : ''}`}>
                          {priceVal ? `${priceVal.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
                        </span>
                      </div>

                      <span className="udgc-editorial-link">
                        <span>Nhận ưu đãi ngay</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* ── 3. VIEW ALL / COLLAPSE BUTTON ── */}
        {promoTours.length > 4 && (
          <ScrollReveal>
            <div className="udgc-actions-center">
              <button
                className="udgc-editorial-btn-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu Gọn Lịch Trình' : `Xem Thêm Tất Cả (${promoTours.length})`}</span>
                <ChevronDown
                  size={15}
                  className={`udgc-chevron-icon ${showAll ? 'rotate' : ''}`}
                />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
