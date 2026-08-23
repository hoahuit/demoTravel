import React, { useState, useEffect } from "react";
import { ChevronRight, Sparkles, MapPin, Clock } from "lucide-react";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from "../data/toursData";
import { fetchToursApi, getImageUrl } from "../services/apiService";

export interface Carousel3Dv2Props {
  onOpenBooking?: (tourData?: any) => void;
  onNavigate?: (path: string) => void;
}

export default function Carousel3Dv2({ onOpenBooking, onNavigate }: Carousel3Dv2Props) {
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
      subtitle: `${tour.city.toUpperCase()} • ${formatCategoryTag(tour.category)}`,
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
      <div className="my-2" style={{ width: '100%', overflow: 'hidden' }}>
        <CoverflowCarousel
          slides={slides}
          rotate={32}
          depth={0.55}
          perspective={2.6}
          cardWidth="clamp(240px, 68vw, 330px)"
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
            maxWidth: '1200px',
            background: 'transparent',
            padding: '12px 16px',
            border: 'none',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ flex: '1 1 280px', minWidth: '240px' }}>
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

            <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 800, color: '#142619', margin: '0 0 4px 0', lineHeight: 1.3 }}>
              {activeTour.title}
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#525a54', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.5 }}>
              {activeTour.subtitle || activeTour.highlights?.[0] || "Hành trình tĩnh dưỡng giữa thiên nhiên kiệt tác."}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '10.5px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Giá trọn gói từ</div>
              <div style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 800, color: '#006d36' }}>
                {activeTour.price ? activeTour.price.toLocaleString("vi-VN") : "3.450.000"} VNĐ
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(`/sanpham/${activeTour.slug}`);
                  }
                }}
                style={{
                  padding: '9px 16px',
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
                  padding: '9px 18px',
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
