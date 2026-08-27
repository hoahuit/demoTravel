import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi, getImageUrl } from '../services/apiService';
import { ArrowRight, ChevronDown, Calendar, MapPin } from 'lucide-react';
import EmptyState from './ui/EmptyState';
import './BentoGrid.css';

export interface BentoGridProps {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function BentoGrid({ onOpenBooking, onNavigate }: BentoGridProps) {
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

  // Tours assigned to "Sắp Khởi Hành" (isFeatured = true or category 'sap-khoi-hanh')
  const featuredTours = tours.filter((t) =>
    t.isFeatured === true ||
    (Array.isArray(t.categories) && t.categories.includes('sap-khoi-hanh'))
  );

  const items = featuredTours.map((tour) => ({
    id: tour.id,
    slug: tour.slug,
    image: getImageUrl(tour.heroImage),
    location: tour.city,
    category: (tour.categories && tour.categories[0]) || tour.category || 'Retreat',
    title: tour.title,
    desc: tour.subtitle,
    price: `${tour.price?.toLocaleString('vi-VN')} ₫`,
    departureDates: tour.departureDates?.length ? tour.departureDates.join(' • ') : 'Hàng tuần',
    action: 'Khám phá hành trình',
    tourObj: tour
  }));

  const visibleItems = showAll ? items : items.slice(0, 4);

  return (
    <section id="sap-khoi-hanh" className="bento-grid-section">
      {/* ── 100% FULL WIDTH CONTAINER ── */}
      <div className="dest-full-container">

        {/* ── 1. SECTION HEADER (DESTINATION FORMAT) ── */}
        <ScrollReveal>
          <div className="dest-header-flex">
            <div>
              <span className="dest-eyebrow">
                Upcoming Journeys 2026
              </span>
              <h2 className="dest-heading">
                Sản Phẩm Sắp Khởi Hành
              </h2>
            </div>

            <p className="dest-subdesc">
              Những chuyến đi tĩnh dưỡng gần nhất đã sẵn sàng lịch trình may đo, mang lại không gian tái tạo năng lượng hoàn hảo.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL 2-COLUMN GRID (AS DESTINATION STYLE) ── */}
        {items.length === 0 ? (
          <EmptyState
            title="Chưa có sản phẩm sắp khởi hành"
            description="Hiện tại chưa có tour nào phù hợp ở danh mục Sắp khởi hành. Hãy quay lại sau để cập nhật mới nhất!"
            transparent={true}
          />
        ) : (
          <div className="dest-editorial-grid">
            {visibleItems.map((item, index) => (
              <ScrollReveal key={item.id || index} delay={index * 100}>
                <div
                  className="dest-editorial-card"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(`/tour/${item.slug}`);
                    } else if (onOpenBooking) {
                      onOpenBooking(item.tourObj);
                    }
                  }}
                >
                  {/* Photo Frame */}
                  <div className="dest-editorial-img-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />

                    {/* Minimalist Departure Badge */}
                    <div className="dest-departure-badge">
                      <Calendar size={13} color="#ffffff" />
                      <span>{item.departureDates}</span>
                    </div>

                    {/* Top Right Category Tag */}
                    <div className="dest-category-tag">
                      Sắp Khởi Hành
                    </div>
                  </div>

                  {/* Meta Label */}
                  <div className="dest-card-meta-row">
                    <span className="dest-meta-label">
                      {item.location} • {item.category}
                    </span>
                  </div>

                  {/* Title Serif */}
                  <h3 className="dest-card-title">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="dest-card-desc">
                    {item.desc}
                  </p>

                  {/* Bottom: Price & Underline Action */}
                  <div className="dest-card-bottom-row">
                    <div>
                      <span className="dest-price-label">
                        Giá trải nghiệm
                      </span>
                      <span className="dest-price-val">
                        {item.price}
                      </span>
                    </div>

                    <span className="dest-editorial-link">
                      <span>{item.action}</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* ── 3. VIEW ALL / COLLAPSE BUTTON ── */}
        {items.length > 4 && (
          <ScrollReveal>
            <div className="dest-more-container">
              <button
                className="dest-editorial-btn-more"
                onClick={() => setShowAll(!showAll)}
              >
                <span>{showAll ? 'Thu Gọn Lịch Trình' : `Xem Thêm Tất Cả (${items.length})`}</span>
                <ChevronDown
                  size={15}
                  className={`dest-chevron-icon ${showAll ? 'rotated' : ''}`}
                />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
