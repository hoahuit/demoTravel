import React from 'react';

export interface TourCardSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

export default function TourCardSkeleton({ count = 2, columns = 2 }: TourCardSkeletonProps) {
  const cards = Array.from({ length: count });

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns === 2 ? 'repeat(2, 1fr)' : `repeat(${columns}, 1fr)`,
    gap: '40px 32px',
    width: '100%',
  };

  return (
    <div style={gridStyle} className="tour-skeleton-grid" aria-busy="true" aria-label="Đang tải dữ liệu hành trình...">
      {cards.map((_, idx) => (
        <div key={idx} className="tour-skeleton-card">
          <div className="tour-skeleton-img-wrap">
            <div className="smart-img-skeleton" />
          </div>
          <div className="tour-skeleton-content">
            <div className="tour-skeleton-shimmer-bar tour-skeleton-bar-title" />
            <div className="tour-skeleton-shimmer-bar tour-skeleton-bar-sub" />
            <div className="tour-skeleton-shimmer-bar tour-skeleton-bar-meta" />
            <div className="tour-skeleton-shimmer-bar tour-skeleton-bar-price" />
          </div>
        </div>
      ))}
    </div>
  );
}
