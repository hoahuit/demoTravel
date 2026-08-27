import React, { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastContextValue {
  showToast: (type: ToastType, message: string, title?: string, duration?: number) => void;
  show: (message: string, type?: ToastType) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning?: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    // Return a safe fallback dummy if used outside ToastProvider
    return {
      showToast: () => {},
      show: () => {},
      success: () => {},
      error: () => {},
      info: () => {}
    };
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

  const show = useCallback((message: string, type: ToastType = 'info') => {
    showToast(type, message);
  }, [showToast]);

  const success = useCallback((message: string, title?: string) => showToast('success', message, title), [showToast]);
  const error = useCallback((message: string, title?: string) => showToast('error', message, title, 6000), [showToast]);
  const info = useCallback((message: string, title?: string) => showToast('info', message, title), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, show, success, error, info }}>
      {children}
      {/* Floating Toast Notification Container */}
      <div className="toast-container-floating">
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
  const isWarning = toast.type === 'warning';

  const typeClass = isError ? 'error' : isSuccess ? 'success' : isWarning ? 'warning' : 'info';
  const iconName = isError ? 'error' : isSuccess ? 'check_circle' : isWarning ? 'warning' : 'info';
  const defaultTitle = isError ? 'Thất bại / Error' : isSuccess ? 'Thành công / Success' : isWarning ? 'Lưu ý / Notice' : 'Thông báo / Notice';

  return (
    <div className={`toast-card ${typeClass}`}>
      <span className={`material-symbols-outlined toast-icon ${typeClass}`}>
        {iconName}
      </span>

      <div className="toast-content-body">
        <div className="toast-title">
          {toast.title || defaultTitle}
        </div>
        <div className={`toast-msg ${typeClass}`}>
          {toast.message}
        </div>
      </div>

      <button
        onClick={onClose}
        className="toast-close-btn"
        aria-label="Close Toast"
      >
        <span className="material-symbols-outlined toast-close-icon">
          close
        </span>
      </button>
    </div>
  );
};
