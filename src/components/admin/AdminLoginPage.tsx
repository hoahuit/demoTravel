import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminLoginPage.css';

interface AdminLoginPageProps {
  onNavigateHome?: () => void;
}

export default function AdminLoginPage({ onNavigateHome }: AdminLoginPageProps) {
  const { login, loginOffline } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await login(usernameOrEmail.trim(), password);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-viewport">
      <div className="admin-login-layout-container">
        {/* ─────────────────────────────────────────────────────────────
            LEFT HERO SHOWCASE PANEL (Brand Atmosphere & Official Logo)
        ───────────────────────────────────────────────────────────── */}
        <div className="admin-login-hero-panel">
          <div className="admin-login-hero-bg" />
          <div className="admin-login-hero-overlay" />

          <div className="admin-login-hero-content">
            <div>

              <h2 className="admin-login-hero-title">
                Hệ Thống Quản Trị
              </h2>

              <p className="admin-login-hero-desc">
                Nền tảng vận hành tập trung dành cho ban quản trị, chuyên gia thiết kế lộ trình và đội ngũ điều hành cao cấp.
              </p>
            </div>

            {/* Official 4U Brand Logo */}
            <div className="admin-login-hero-logo-box">
              <img
                src="/Logo-4U-Wellness.png"
                alt="4U Wellness Logo"
                className="admin-login-hero-logo-img"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT LOGIN FORM PANEL
        ───────────────────────────────────────────────────────────── */}
        <div className="admin-login-form-panel">
          <div>
            <div className="admin-login-header-section">
              <h1 className="admin-login-title">
                Đăng Nhập Quản Trị
              </h1>
              <p className="admin-login-subtitle">
                Nhập thông tin tài khoản được cấp phép để truy cập hệ thống.
              </p>
            </div>

            {errorMessage && (
              <div className="admin-login-error-alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-login-form">
              {/* Field: Username / Email */}
              <div className="admin-login-field-group">
                <label className="admin-login-label">
                  Tên đăng nhập hoặc Email
                </label>
                <div className="admin-login-input-wrapper">
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập hoặc email..."
                    value={usernameOrEmail}
                    onChange={(e) => {
                      setUsernameOrEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    autoFocus
                    required
                    className="admin-login-input"
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div className="admin-login-field-group">
                <label className="admin-login-label">
                  Mật khẩu
                </label>
                <div className="admin-login-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    required
                    className="admin-login-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="admin-login-eye-btn"
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Session & Support */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#0f766e', cursor: 'pointer' }}
                  />
                  <span>Ghi nhớ phiên đăng nhập</span>
                </label>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="admin-login-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="admin-login-spinner" />
                    <span>Đang xác thực...</span>
                  </>
                ) : (
                  <span>Đăng Nhập Vào Hệ Thống</span>
                )}
              </button>

              {/* Quick Offline Login Helper */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage('');
                    loginOffline('superadmin');
                  }}
                  style={{
                    background: 'rgba(15, 118, 110, 0.08)',
                    color: '#0f766e',
                    border: '1px dashed #0f766e',
                    borderRadius: '8px',
                    padding: '9px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  ⚡ Đăng Nhập Nhanh (Chế độ Local Offline)
                </button>
              </div>
            </form>
          </div>

          {/* Footer Back Link & Security Notice */}
          <div>
            <div className="admin-login-footer-meta">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateHome) {
                    onNavigateHome();
                  } else {
                    window.location.pathname = '/';
                  }
                }}
                className="admin-login-back-btn"
                style={{ cursor: 'pointer' }}
              >
                ← Trở về website 4U Retreat
              </button>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <ShieldCheck size={14} color="#10b981" />
                Mã hóa SSL 256-bit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
