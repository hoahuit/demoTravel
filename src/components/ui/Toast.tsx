import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, title?: string, duration?: number) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, title?: string, duration: number = 4500) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newToast: ToastItem = { id, type, message, title, duration };

      setToasts((prev) => [newToast, ...prev].slice(0, 5)); // Keep max 5 active toasts

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((message: string, title?: string) => showToast('success', message, title), [showToast]);
  const error = useCallback((message: string, title?: string) => showToast('error', message, title, 6000), [showToast]);
  const info = useCallback((message: string, title?: string) => showToast('info', message, title), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      {/* Floating Toast Notification Container */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '420px',
          width: 'calc(100vw - 48px)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastCard: React.FC<{ toast: ToastItem; onClose: () => void }> = ({ toast, onClose }) => {
  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  const bgColor = isError ? '#180a0a' : isSuccess ? '#041d13' : '#0a192f';
  const borderColor = isError ? 'rgba(239, 68, 68, 0.4)' : isSuccess ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)';
  const iconColor = isError ? '#f87171' : isSuccess ? '#34d399' : '#60a5fa';
  const iconName = isError ? 'error' : isSuccess ? 'check_circle' : 'info';
  const accentBarColor = isError ? '#ef4444' : isSuccess ? '#10b981' : '#3b82f6';
  const defaultTitle = isError ? 'Thất bại / Error' : isSuccess ? 'Thành công / Success' : 'Thông báo / Notice';

  return (
    <div
      style={{
        pointerEvents: 'auto',
        backgroundColor: bgColor,
        color: '#ffffff',
        border: `1px solid ${borderColor}`,
        borderLeft: `5px solid ${accentBarColor}`,
        borderRadius: '12px',
        padding: '14px 18px',
        boxShadow: isError
          ? '0 12px 32px rgba(239, 68, 68, 0.25), 0 4px 12px rgba(0, 0, 0, 0.4)'
          : '0 12px 32px rgba(16, 185, 129, 0.25), 0 4px 12px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'sereneToastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <style>{`
        @keyframes sereneToastSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>

      <span
        className="material-symbols-outlined"
        style={{
          color: iconColor,
          fontSize: '24px',
          marginTop: '2px',
          flexShrink: 0,
        }}
      >
        {iconName}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#f3f4f6',
            letterSpacing: '0.02em',
            marginBottom: '3px',
          }}
        >
          {toast.title || defaultTitle}
        </div>
        <div
          style={{
            fontSize: '13px',
            lineHeight: '1.45',
            color: isError ? '#fecaca' : isSuccess ? '#d1fae5' : '#e0f2fe',
            wordBreak: 'break-word',
            fontWeight: 400,
          }}
        >
          {toast.message}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          cursor: 'pointer',
          padding: '2px',
          marginTop: '0px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
        aria-label="Close Toast"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          close
        </span>
      </button>
    </div>
  );
};
