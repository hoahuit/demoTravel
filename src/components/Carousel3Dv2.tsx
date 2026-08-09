import React, { useState, useEffect } from "react";
import { ChevronRight, Sparkles, MapPin, Clock } from "lucide-react";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { TOURS_DATA, TourPackage } from "../data/toursData";

const getImageUrl = (url: string) => {
  if (!url) return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
  return `http://localhost:3001${url.startsWith('/') ? '' : '/'}${url}`;
};

export interface Carousel3Dv2Props {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function Carousel3Dv2({ onOpenBooking, onNavigate }: Carousel3Dv2Props) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);
  const [activeTourIndex, setActiveTourIndex] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:3001/tours")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTours(data);
        }
      })
      .catch(() => { });
  }, []);

  // Filter featured / exclusive / hot tours for 3D Slider display
  const displayTours = tours.filter(t => t.isExclusive || t.isHot || t.isFeatured);
  const carouselTours = displayTours.length > 0 ? displayTours : tours;

  const slides: CoverflowSlide[] = carouselTours.map((tour) => ({
    src: getImageUrl(tour.heroImage),
    alt: tour.title,
    title: tour.title,
    subtitle: `${tour.city} • ${tour.category}`,
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
  }));

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
        <div
          style={{
            margin: '20px auto 0',
            background: 'transparent',
            padding: '12px 16px',
            border: 'none',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(45, 90, 54, 0.12)', color: '#1e4a3d', fontSize: '11px', fontWeight: 800, padding: '3px 12px', borderRadius: '999px', textTransform: 'uppercase' }}>
                {activeTour.category || "Retreat"}
              </span>
              <span style={{ fontSize: '12px', color: '#527059', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#006d36" /> {activeTour.city}
              </span>
              <span style={{ fontSize: '12px', color: '#527059', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} color="#006d36" /> {activeTour.duration}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142619', margin: '0 0 4px 0', lineHeight: 1.3 }}>
              {activeTour.title}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#525a54', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {activeTour.subtitle || activeTour.highlights?.[0] || "Hành trình tĩnh dưỡng giữa thiên nhiên kiệt tác."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Giá trọn gói từ</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#006d36' }}>
                {activeTour.price ? activeTour.price.toLocaleString("vi-VN") : "3.450.000"} VNĐ
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(`/sanpham/${activeTour.slug}`);
                  }
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  color: '#081f13',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: '1px solid rgba(8, 31, 19, 0.12)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Xem Chi Tiết
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenBooking) {
                    onOpenBooking({
                      title: activeTour.title,
                      price: activeTour.price,
                      city: activeTour.city,
                      duration: activeTour.duration,
                    });
                  }
                }}
                style={{
                  padding: '9px 20px',
                  borderRadius: '12px',
                  background: '#1e4a3d',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 14px rgba(30, 74, 61, 0.25)'
                }}
              >
                Nhận Tư Vấn <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
