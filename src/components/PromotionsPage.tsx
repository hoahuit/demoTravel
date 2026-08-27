import React, { useEffect, useState } from 'react';
import { PROMOTIONS_DATA, syncPromotionsDataFromApi, PromotionItem } from '../data/promotionsData';
import { fetchSectionItemsApi } from '../services/apiService';
import { Tag, Clock, ArrowRight, Sparkles } from 'lucide-react';
import './PromotionsPage.css';

interface PromotionsPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function PromotionsPage({ onNavigate, onOpenBooking }: PromotionsPageProps) {
  const [promotions, setPromotions] = useState<PromotionItem[]>(PROMOTIONS_DATA);

  useEffect(() => {
    fetchSectionItemsApi('promotions').then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncPromotionsDataFromApi(data);
        setPromotions([...data]);
      }
    });
  }, []);

  return (
    <div className="promotions-page-root">
      {/* Hero */}
      <section className="promotions-hero">
        <img
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=85&w=2560&auto=format&fit=crop"
          alt="Promotions"
          className="promotions-hero-img"
        />
        <div className="promotions-hero-overlay" />
        <div className="promotions-hero-content">
          <span className="promotions-badge">
            SPECIAL DEALS • CƠ HỘI ĐỘC QUYỀN
          </span>
          <h1 className="promotions-headline">
            Ưu Đãi Đặc Biệt & Flash Sale
          </h1>
          <p className="promotions-subheadline">
            Đăng ký tour sớm nhận ưu đãi giảm trực tiếp lên đến 25% & miễn phí Visa VIP
          </p>
        </div>
      </section>

      {/* Promotions List */}
      <div className="promotions-list-container">
        <div className="promotions-grid">
          {promotions.map(promo => (
            <div key={promo.id} className="promotion-card">
              <div className="promotion-banner-wrap">
                <img src={promo.bannerImage} alt={promo.title} className="promotion-banner-img" />
                <span className="promotion-discount-badge">
                  {promo.discountBadge}
                </span>
                <span className="promotion-code-badge">
                  Mã: <strong>{promo.code}</strong>
                </span>
              </div>
              <div className="promotion-content">
                <div>
                  <h3 className="promotion-title">
                    {promo.title}
                  </h3>
                  <p className="promotion-subtitle">
                    {promo.subtitle}
                  </p>
                </div>
                <div>
                  <div className="promotion-expiry">
                    ⏰ Hạn ưu đãi: <strong>{promo.expiryDate}</strong>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="promotion-apply-btn"
                  >
                    <span>Áp Dụng Khuyến Mãi Ngay</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
