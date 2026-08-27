import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  transparent?: boolean;
}

export default function EmptyState({
  title = 'Chưa Có Dữ Liệu',
  description = 'Rất tiếc, chưa có thông tin phù hợp với tìm kiếm hoặc bộ lọc của bạn.',
  actionLabel,
  onAction,
  icon,
  transparent = true
}: EmptyStateProps) {
  return (
    <div className={`empty-state-wrapper ${transparent ? 'empty-state-wrapper--transparent' : 'empty-state-wrapper--bordered'}`}>

      {icon && (
        <div className="empty-state-icon">
          {icon}
        </div>
      )}

      <h3 className="empty-state-title">
        {title}
      </h3>

      <p className="empty-state-desc">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="empty-state-btn"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
