import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { Star, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import EmptyState from './ui/EmptyState';
import './KhongTheBoLoSection.css';

export interface KhongTheBoLoSectionProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function KhongTheBoLoSection({ onOpenBooking, onNavigate }: KhongTheBoLoSectionProps) {
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

  // Tours assigned to "Không Thể Bỏ Lỡ" (isHot = true or category 'khong-the-bo-lo' / 'hot')
  const unmissableTours = tours.filter((tour) =>
    tour.isHot === true ||
    (Array.isArray(tour.categories) && (tour.categories.includes('khong-the-bo-lo') || tour.categories.includes('hot')))
  );
  const visibleTours = showAll ? unmissableTours : unmissableTours.slice(0, 4);

  return (
    <section
      id="khong-the-bo-lo"
      className="ktbl-section-root"
    >
      {/* ── 100% FULL WIDTH CONTAINER ── */}
      <div className="ktbl-full-container">

        {/* ── 1. SECTION HEADER (DESTINATION FORMAT) ── */}
        <ScrollReveal>
          <div className="ktbl-header-row">
            <div>
              <span className="ktbl-subtitle-tag">
                Signature Retreats 2026
              </span>
              <h2 className="ktbl-title-serif">
                Trải Nghiệm Retreat Không Thể Bỏ Lỡ
              </h2>
            </div>

            <p className="ktbl-header-desc">
              Tuyển tập những hành trình được tinh tuyển khắt khe, kết hợp nghệ thuật trị liệu thiên nhiên và dịch vụ chuẩn mực.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL 2-COLUMN GRID (AS DESTINATION STYLE) ── */}
        {unmissableTours.length === 0 ? (
          <EmptyState
            title="Chưa có tour nổi bật"
            description="Hiện tại chưa có tour nào phù hợp ở mục Trải nghiệm không thể bỏ lỡ. Hãy quay lại sau để cập nhật mới nhất!"
            transparent={true}
          />
        ) : (
          <div className="ktbl-editorial-grid">
            {visibleTours.map((tour, index) => {
              const heroImg = getImageUrl(tour.heroImage);
              const priceText = tour.price ? `${tour.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ';
              const highlights = Array.isArray(tour.highlights) ? tour.highlights.slice(0, 2) : [];

              return (
                <ScrollReveal key={tour.id || tour.slug || index} delay={index * 100}>
                  <div
                    className="ktbl-editorial-card"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(`/tour/${tour.slug}`);
                      } else if (onOpenBooking) {
                        onOpenBooking(tour);
                      }
                    }}
                  >
                    {/* Photo Frame */}
                    <div className="ktbl-editorial-img-wrap">
                      <img src={heroImg} alt={tour.title} loading="lazy" />

                      {/* Top Badges */}
                      <div className="ktbl-badge-special">
                        <Sparkles size={13} color="#facc15" />
                        <span>Đặc Tuyển</span>
                      </div>

                      {/* Top Right Category Tag */}
                      <div className="ktbl-badge-hot">
                        Không Thể Bỏ Lỡ
                      </div>
                    </div>

                    {/* Meta Label */}
                    <div className="ktbl-card-meta">
                      <span className="ktbl-card-meta-text">
                        {tour.city || 'Việt Nam'} • {tour.duration || 'Nghỉ Dưỡng'}
                      </span>
                    </div>

                    {/* Title Serif */}
                    <h3 className="ktbl-card-title">
                      {tour.title}
                    </h3>

                    {/* Description */}
                    <p className="ktbl-card-desc">
                      {tour.subtitle || 'Hành trình được chăm chút tỉ mỉ từ không gian lưu trú đến các liệu trình chữa lành nguyên bản.'}
                    </p>

                    {/* Highlights chips */}
                    {highlights.length > 0 && (
                      <div className="ktbl-highlights-row">
                        {highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="ktbl-highlight-chip"
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom: Price & Underline Action */}
                    <div className="ktbl-card-action-bar">
                      <div>
                        <span className="ktbl-price-label">
                          Giá trải nghiệm
                        </span>
                        <span className="ktbl-price-val">
                          {priceText}
                        </span>
                      </div>

                      <span className="ktbl-editorial-link">
                        <span>Khám phá ngay</span>
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
        {unmissableTours.length > 4 && (
          <ScrollReveal>
            <div className="ktbl-btn-center">
              <button
                className="ktbl-editorial-btn-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu Gọn Lịch Trình' : `Xem Thêm Tất Cả (${unmissableTours.length})`}</span>
                <ChevronDown
                  size={15}
                  className={`ktbl-chevron-icon ${showAll ? 'is-open' : ''}`}
                />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
