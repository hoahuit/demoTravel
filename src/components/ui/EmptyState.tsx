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
    <div
      style={{
        padding: '60px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        border: transparent ? 'none' : '1px dashed rgba(6, 27, 14, 0.12)',
        margin: '20px 0',
        width: '100%'
      }}
    >
      {icon && (
        <div style={{ marginBottom: '16px', color: '#525a54' }}>
          {icon}
        </div>
      )}

      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '22px',
          fontWeight: 600,
          color: '#081f13',
          margin: '0 0 8px 0',
          lineHeight: 1.3
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '14px',
          color: '#525a54',
          maxWidth: '460px',
          margin: '0 0 20px 0',
          lineHeight: 1.6
        }}
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          style={{
            backgroundColor: '#081f13',
            color: '#ffffff',
            border: 'none',
            borderRadius: '999px',
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(8, 31, 19, 0.15)',
            transition: 'all 0.2s ease'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
