'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../index.css';
import './elegant-carousel.css';

export interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

export const defaultSlides: SlideData[] = [
  {
    title: 'Bình Yên Venice',
    subtitle: 'Hành Trình Hoàng Hôn Di Sản',
    description:
      'Nơi kiến trúc cổ kính hòa cùng ánh chiều tà rực rỡ — bức tranh màu đất nung nồng ấm và kênh đào thơ mộng lấp lánh lúc hoàng hôn.',
    accent: '#C4956A',
    imageUrl:
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1920&q=80',
  },
  {
    title: 'Tĩnh Lặng Bắc Âu',
    subtitle: 'Vẻ Đẹp Nguyên Sơ Fjord',
    description:
      'Cảm nhận sự tĩnh lặng vô tận của những vịnh hẹp Na Uy — không gian khoáng đạt, tĩnh mịch và sức mạnh dịu êm của thiên nhiên.',
    accent: '#8BA7B8',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
  },
  {
    title: 'Thiền Định Kyoto',
    subtitle: 'Khu Vườn Cổ Kính',
    description:
      'Lối đi phủ rêu xanh và rặng trúc rợp bóng — bản tình ca thiền định tôn vinh vẻ đẹp tối giản và tinh tế của nghệ thuật Nhật Bản.',
    accent: '#7A9E7E',
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80',
  },
  {
    title: 'Bình Minh Sahara',
    subtitle: 'Hành Trình Sa Mạc Vàng',
    description:
      'Sa mạc thức giấc trong ánh bình minh — những dải cát rát vàng trải dài bất tận được chạm khắc bởi thời gian và gió ngàn.',
    accent: '#D4A955',
    imageUrl:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80',
  },
];

interface ElegantCarouselProps {
  slides?: SlideData[];
}

export default function ElegantCarousel({ slides = defaultSlides }: ElegantCarouselProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % activeSlides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide, activeSlides.length]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + activeSlides.length) % activeSlides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide, activeSlides.length]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <div
      className="carousel-root"
      style={{ '--slide-accent': currentSlide.accent } as React.CSSProperties}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambient glow */}
      <div className="carousel-bg-glow" />

      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(activeSlides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.description}
            </p>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="carousel-image"
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" />
          <div className="carousel-frame-corner carousel-frame-corner--br" />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar">
        {activeSlides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  '--progress-w': index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%'
                } as React.CSSProperties}
              />
            </div>
            <span className="carousel-progress-label">
              {slide.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
