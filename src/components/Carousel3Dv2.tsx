import React, { useState, useEffect } from "react";
import { ChevronRight, Sparkles, MapPin, Clock } from "lucide-react";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from "../data/toursData";
import { fetchToursApi, getImageUrl } from "../services/apiService";
import './Carousel3Dv2.css';

export interface Carousel3Dv2Props {
  onOpenBooking?: (tourData?: any) => void;
  onOpenConsultation?: (tab?: 'consultation' | 'custom_tour', tourOrDest?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function Carousel3Dv2({ onOpenBooking, onOpenConsultation, onNavigate }: Carousel3Dv2Props) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);
  const [activeTourIndex, setActiveTourIndex] = useState<number>(0);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  // Helper to format category tags cleanly in Vietnamese
  const formatCategoryTag = (cat?: string) => {
    if (!cat) return 'ĐỘC QUYỀN';
    const lower = cat.toLowerCase();
    if (lower.includes('doc-quyen') || lower.includes('docquyen') || lower.includes('exclusive')) {
      return 'ĐỘC QUYỀN';
    }
    if (lower.includes('nature') || lower.includes('thien-nhien')) return 'THIÊN NHIÊN';
    if (lower.includes('heritage') || lower.includes('di-san')) return 'DI SẢN';
    if (lower.includes('luxury') || lower.includes('cao-cap')) return 'NGHỈ DƯỠNG';
    if (lower.includes('wellness') || lower.includes('healing')) return 'CHỮA LÀNH';
    return cat.toUpperCase();
  };

  // Tours assigned to "Retreats Độc Quyền" or with isExclusive = true appear here.
  const carouselTours = tours.filter((tour) =>
    (Array.isArray(tour.categories) && tour.categories.includes('doc-quyen')) ||
    tour.isExclusive === true
  );

  const slides: CoverflowSlide[] = carouselTours.map((tour) => {
    let cleanHero = tour.heroImage;
    if (!cleanHero || cleanHero.includes('photo-1540555700478-4be289fbecef')) {
      cleanHero = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&auto=format&fit=crop&q=85';
    }

    return {
      src: getImageUrl(cleanHero),
      alt: tour.title,
      title: tour.title,
      subtitle: `${tour.city.toUpperCase()} • ${formatCategoryTag((tour.categories && tour.categories[0]) || tour.category)}`,
      badge: 'Độc quyền',
      isExclusive: true,
      meta: [
        { label: "Thời lượng", value: tour.duration || "3 Ngày 2 Đêm" },
        { label: "Giá trọn gói", value: `${tour.price ? tour.price.toLocaleString("vi-VN") : "3.450.000"} VNĐ` },
        { label: "Phương tiện", value: tour.transportation || "Xe VIP Limousine 4U" },
      ],
      onClick: () => {
        if (onNavigate) {
          onNavigate(`/sanpham/${tour.slug}`);
        }
      },
    };
  });

  const activeTour = carouselTours[activeTourIndex] || carouselTours[0];

  return (
    <div className="w-full bg-transparent text-[#142619]">
      {/* 3D Coverflow Carousel Component */}
      <div className="my-2">
        <CoverflowCarousel
          slides={slides}
          rotate={32}
          depth={0.55}
          perspective={2.6}
          cardWidth="clamp(220px, 25vw, 330px)"
          gap={0.06}
          loop={true}
          showCaption={false}
          showNavigation={true}
          showPagination={true}
          onSelectSlide={(index) => setActiveTourIndex(index)}
        />
      </div>

      {/* Active Selected Tour Details Card */}
      {activeTour && (
        <div className="c3d2-detail-bar">
          <div className="c3d2-info-col">
            <div className="c3d2-meta-row">
              <span className="c3d2-category-pill">
                {activeTour.category || "Retreat"}
              </span>
              <span className="c3d2-meta-item">
                <MapPin size={14} color="#006d36" /> {activeTour.city}
              </span>
              <span className="c3d2-meta-item">
                <Clock size={14} color="#006d36" /> {activeTour.duration}
              </span>
            </div>

            <h3 className="c3d2-tour-title">
              {activeTour.title}
            </h3>

            <p className="c3d2-tour-desc">
              {activeTour.subtitle || activeTour.highlights?.[0] || "Hành trình tĩnh dưỡng giữa thiên nhiên kiệt tác."}
            </p>
          </div>

          <div className="c3d2-actions-wrap">
            <div className="c3d2-price-box">
              <div className="c3d2-price-label">Giá trọn gói từ</div>
              <div className="c3d2-price-val">
                {activeTour.price ? activeTour.price.toLocaleString("vi-VN") : "3.450.000"} VNĐ
              </div>
            </div>

            <div className="c3d2-buttons-group">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(`/sanpham/${activeTour.slug}`);
                  }
                }}
                className="c3d2-btn-secondary"
              >
                Xem Chi Tiết
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation('consultation', activeTour.title || activeTour.city);
                  } else if (onOpenBooking) {
                    onOpenBooking({
                      title: activeTour.title,
                      price: activeTour.price,
                      city: activeTour.city,
                      duration: activeTour.duration,
                    });
                  }
                }}
                className="c3d2-btn-primary"
              >
                <span>Tư Vấn Ngay</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
