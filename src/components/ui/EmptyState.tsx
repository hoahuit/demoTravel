import React from 'react';

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
      <style>{`
        .empty-state-wrapper {
          padding: 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          margin: 20px 0;
          width: 100%;
        }
        .empty-state-wrapper--transparent {
          background-color: transparent;
          border: none;
        }
        .empty-state-wrapper--bordered {
          background-color: rgba(255, 255, 255, 0.6);
          border: 1px dashed rgba(6, 27, 14, 0.12);
        }
        .empty-state-icon {
          margin-bottom: 16px;
          color: #525a54;
        }
        .empty-state-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          color: #081f13;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .empty-state-desc {
          font-size: 14px;
          color: #525a54;
          max-width: 460px;
          margin: 0 0 20px 0;
          line-height: 1.6;
        }
        .empty-state-btn {
          background-color: #081f13;
          color: #ffffff;
          border: none;
          border-radius: 999px;
          padding: 10px 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(8, 31, 19, 0.15);
          transition: all 0.2s ease;
        }
      `}</style>

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
