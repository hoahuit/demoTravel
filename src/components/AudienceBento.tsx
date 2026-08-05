import React from 'react';
// import { CircularGallery, GalleryItem } from './ui/circular-gallery';
import Carousel3D from './Carousel3D';

export default function AudienceBento() {
  // const galleryData: GalleryItem[] = [
  //   {
  //     common: 'Solo Travelers',
  //     binomial: 'Inbound & Independent Explorers',
  //     photo: {
  //       url: '/images/tour_3.png',
  //       fallback: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=1000&auto=format&fit=crop',
  //       text: 'Solo traveler trekking in Sapa',
  //       pos: '50% 35%',
  //       by: '4U Independent Journey'
  //     }
  //   },
  //   {
  //     common: 'Couples',
  //     binomial: 'Romance & Sunset Coastal Retreats',
  //     photo: {
  //       url: '/images/tour_2.png',
  //       fallback: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop',
  //       text: 'Couples walking in Hoi An ancient town',
  //       pos: '50% 50%',
  //       by: '4U Romantic Getaway'
  //     }
  //   },
  //   {
  //     common: 'Families',
  //     binomial: 'Cozy Stays & Safe Private Van',
  //     photo: {
  //       url: '/images/tour_1.png',
  //       fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
  //       text: 'Family island hopping in Phu Quoc',
  //       pos: '50% 60%',
  //       by: '4U Family Adventure'
  //     }
  //   },
  //   {
  //     common: 'Expats & Small Groups',
  //     binomial: 'Weekend Escapes & Tailored Itineraries',
  //     photo: {
  //       url: '/images/dest_danang.png',
  //       fallback: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop',
  //       text: 'Small group tour in Da Nang',
  //       pos: '50% 40%',
  //       by: '4U Expat Collection'
  //     }
  //   },
  //   {
  //     common: 'Wellness Seekers',
  //     binomial: 'Tranquility & Organic Healing Retreats',
  //     photo: {
  //       url: '/images/dest_dalat.png',
  //       fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
  //       text: 'Healing retreat in Da Lat highlands',
  //       pos: '50% 50%',
  //       by: '4U Healing Retreat'
  //     }
  //   },
  //   {
  //     common: 'Culture Lovers',
  //     binomial: 'Off The Beaten Track Heritage Gems',
  //     photo: {
  //       url: '/images/dest_halong.png',
  //       fallback: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop',
  //       text: 'Ha Long Bay junk boat cruise',
  //       pos: '50% 50%',
  //       by: '4U Heritage Experience'
  //     }
  //   }
  // ];

  return (
    <section className="audience-section" style={{ background: '#f5f5f7', overflow: 'hidden', position: 'relative', zIndex: 5, padding: '80px 0 100px 0' }} id="audience">
      <div className="apple-container">

        {/* HEADING BLOCK */}
        <div className="audience-heading-block" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="apple-section-title" style={{ color: '#142619' }}>
            Dành Riêng Cho Ai Tìm Về <span style={{ color: '#2d5a36' }}>4U Retreat</span>?
          </h2>

          <p className="apple-subtitle" style={{ maxWidth: '620px', margin: '10px auto 0', fontSize: '1.05rem', color: '#527059' }}>
            Hành trình được thiết kế may đo cho từng cá nhân, gia đình & nhóm bạn khao khát kết nối sâu sắc cùng thiên nhiên.
          </p>
        </div>

        {/* 3D COVERFLOW CAROUSEL — tạm comment */}
        {/* <div className="carousel-wrapper" style={{ position: 'relative', width: '100%', paddingTop: '20px', paddingBottom: '40px' }}>
          <CircularGallery items={galleryData} radius={480} autoRotateSpeed={0.015} />
        </div> */}

      </div>

      {/* NEW 3D CAROUSEL COMPONENT — FULL SCREEN WIDTH */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Carousel3D />
      </div>
    </section>
  );
}
