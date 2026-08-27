import React, { useEffect, useState } from 'react';
import { TOURS_DATA, syncToursDataFromApi, TourPackage } from '../data/toursData';
import { fetchToursApi } from '../services/apiService';
import './Hero.css';

export interface HeroProps {
  onOpenBooking?: () => void;
  onOpenCustomTour?: () => void;
}

export default function Hero({ onOpenBooking, onOpenCustomTour }: HeroProps = {}) {
  const [tours, setTours] = useState<TourPackage[]>(TOURS_DATA);

  useEffect(() => {
    fetchToursApi().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncToursDataFromApi(data);
        setTours([...data]);
      }
    });
  }, []);

  const currentHeroImage = '/images/hero_destination.jpg';

  return (
    <section className="hero-main-section">
      {/* ── MAIN HERO WRAPPER ── */}
      <div className="hero-tile-wrapper theme-dark">
        {/* ── DESTINATION BACKGROUND IMAGE ── */}
        <div className="hero-image-wrapper">
          <img
            src={currentHeroImage}
            alt="4U Travel Destination"
            className="hero-destination-image is-revealed"
          />
        </div>

        {/* ── SOFT ELEGANT SHADOW BEHIND TEXT ── */}
        <div className="hero-ambient-shadow" />

        {/* ── HERO EDITORIAL CONTENT ── */}
        <div className="hero-editorial-content">
          {/* Micro-Tag */}
          <span className="hero-micro-tag">
            Sa Pa • 3 Ngày 2 Đêm
          </span>

          {/* Main Headline */}
          <h1 className="hero-main-title">
            Trở Về Với{' '}
            <span className="hero-accent-gold">
              Chính Mình
            </span>
          </h1>

          {/* Subhead Paragraph */}
          <p className="hero-subhead-desc">
            “Hương Sắc Mây Ngàn & Tĩnh Tâm Sa Pa” — Nghỉ dưỡng biệt lập trên đỉnh đồi nhìn ra thung lũng Mường Hoa và dãy Hoàng Liên Sơn.. Phục hồi Thân · Tâm · Trí giữa đại ngàn nguyên sơ — nơi bạn buông bỏ âu lo và lắng nghe câu trả lời từ chính tâm hồn mình.
          </p>
        </div>
      </div>
    </section>
  );
}
