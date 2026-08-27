import React, { useEffect, useState } from 'react';
import { SERVICES_DATA, syncServicesDataFromApi, TravelService } from '../data/servicesData';
import { fetchSectionItemsApi, getImageUrl } from '../services/apiService';
import { ShieldCheck, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import './ServicesPage.css';


interface ServicesPageProps {
  onOpenBooking: () => void;
}

export default function ServicesPage({ onOpenBooking }: ServicesPageProps) {
  const [services, setServices] = useState<TravelService[]>(SERVICES_DATA);

  useEffect(() => {
    fetchSectionItemsApi('services').then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        syncServicesDataFromApi(data);
        setServices([...data]);
      }
    });
  }, []);

  return (
    <div className="services-page-root">
      {/* Hero */}
      <section className="services-hero">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=2560&auto=format&fit=crop"
          alt="Services"
          className="services-hero-img"
        />
        <div className="services-hero-overlay" />
        <div className="services-hero-content">
          <span className="services-badge">
            LUXURY SERVICES • ĐẲNG CẤP THƯỢNG LƯU
          </span>
          <h1 className="services-headline">
            Dịch Vụ Lữ Hành & Chăm Sóc VIP
          </h1>
          <p className="services-subheadline">
            Visa VIP cam kết đậu 99.9%, Chuyên cơ Private Jet, Limousine đón tận nhà & Bảo hiểm cao cấp
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="services-list-container">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              className={`service-card ${isEven ? 'even' : 'odd'}`}
            >
              <div className={`service-img-wrap ${isEven ? 'service-order-first' : 'service-order-last'}`}>
                <img
                  src={getImageUrl(service.heroImage)}
                  alt={service.title}
                  className="service-hero-img"
                />
              </div>
              <div className={isEven ? 'service-order-last' : 'service-order-first'}>
                <span className="service-tag">
                  4U VIP SERVICE
                </span>
                <h2 className="service-title">
                  {service.title}
                </h2>
                <p className="service-description">
                  {service.description}
                </p>
                <div className="service-features-grid">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="service-feature-item">
                      <CheckCircle2 size={16} className="service-feature-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onOpenBooking}
                  className="service-cta-btn"
                >
                  <span>Tư Vấn & Đăng Ký Dịch Vụ</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
