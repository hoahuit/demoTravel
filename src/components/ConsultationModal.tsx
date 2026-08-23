import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp, X, CheckCircle2, ArrowRight, Sparkles, Compass, PhoneCall } from 'lucide-react';
import { saveSectionItemApi } from '../services/apiService';

export interface ConsultationModalProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
  initialTab?: 'consultation' | 'custom_tour';
  selectedTour?: {
    title?: string;
    city?: string;
    duration?: string;
  } | null;
  initialDestination?: string;
}

interface ConsultFormData {
  name: string;
  phone: string;
  email: string;
  tour: string;
  message: string;
  preferredTime: string;
}

interface CustomTourFormData {
  name: string;
  phone: string;
  guestCount: string;
  destination: string;
  region: string;
  notes: string;
}

export default function ConsultationModal({
  externalOpen,
  onExternalClose,
  initialTab = 'consultation',
  selectedTour,
  initialDestination
}: ConsultationModalProps) {
  const [activeTab, setActiveTab] = useState<'consultation' | 'custom_tour'>(initialTab);
  const [showFloating, setShowFloating] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (externalOpen !== undefined) {
      setModalOpen(externalOpen);
    }
  }, [externalOpen]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const isOpen = Boolean(externalOpen || modalOpen);

  // Background Scroll Lock
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalBodyOverflow || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
      };
    }
  }, [isOpen]);

  const defaultTourTitle = selectedTour?.title || '';

  // Tab 1: Form Tư Vấn Nhanh
  const [formData, setFormData] = useState<ConsultFormData>({
    name: '',
    phone: '',
    email: '',
    tour: defaultTourTitle,
    message: '',
    preferredTime: 'morning'
  });

  // Tab 2: Form Thiết Kế Lịch Trình Riêng
  const [customData, setCustomData] = useState<CustomTourFormData>({
    name: '',
    phone: '',
    guestCount: '2 người',
    destination: initialDestination || '',
    region: 'Miền Trung',
    notes: ''
  });

  useEffect(() => {
    if (selectedTour?.title) {
      setFormData(prev => ({ ...prev, tour: selectedTour.title || prev.tour }));
    }
  }, [selectedTour]);

  useEffect(() => {
    if (initialDestination) {
      setCustomData(prev => ({ ...prev, destination: initialDestination }));
    }
  }, [initialDestination]);

  // Floating button scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }

    setLoading(true);

    try {
      const timeMapping: Record<string, string> = {
        morning: 'Sáng (8h - 12h)',
        afternoon: 'Chiều (13h30 - 17h30)',
        evening: 'Tối (18h - 21h)',
        anytime: 'Bất kỳ lúc nào'
      };

      await saveSectionItemApi('consultations', 'create', {
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim() || '',
        preferredCallTime: timeMapping[formData.preferredTime] || formData.preferredTime || 'Sáng (8h - 12h)',
        tourName: formData.tour || 'Yêu cầu tư vấn chung',
        note: formData.message.trim() || '--',
        status: 'Chưa tư vấn',
        createdAt: new Date().toISOString()
      });

      setSubmitted(true);
    } catch (err) {
      console.warn('Lưu lịch hẹn tư vấn vào API backend:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customData.name.trim() || !customData.phone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }

    setLoading(true);

    try {
      const targetPlace = customData.destination.trim() || customData.region;
      const noteContent = `[THIẾT KẾ LỊCH TRÌNH RIÊNG]
- Vùng miền: ${customData.region}
- Điểm đến mong muốn: ${customData.destination.trim() || 'Theo tư vấn của 4U'}
- Số lượng khách: ${customData.guestCount}
- Nhu cầu cụ thể: ${customData.notes.trim() || 'Không có'}`;

      await saveSectionItemApi('consultations', 'create', {
        customerName: customData.name.trim(),
        customerPhone: customData.phone.trim(),
        tour: `Thiết kế lịch trình riêng: ${targetPlace}`,
        tourName: `Thiết kế lịch trình riêng: ${targetPlace}`,
        message: noteContent,
        note: noteContent,
        preferredTime: 'Bất kỳ lúc nào',
        preferredCallTime: 'Bất kỳ lúc nào',
        status: 'Chưa tư vấn',
        createdAt: new Date().toISOString()
      });

      setSubmitted(true);
    } catch (err) {
      console.warn('Lưu yêu cầu thiết kế lịch trình vào API backend:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setModalOpen(false);
    setSubmitted(false);
    if (onExternalClose) onExternalClose();
    setFormData({
      name: '',
      phone: '',
      email: '',
      tour: defaultTourTitle,
      message: '',
      preferredTime: 'morning'
    });
    setCustomData({
      name: '',
      phone: '',
      guestCount: '2 người',
      destination: initialDestination || '',
      region: 'Miền Trung',
      notes: ''
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      {/* ── FLOATING ACTION BUTTONS ── */}
      {showFloating && (
        <div style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9990,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center'
        }}>
          {/* Consultation Floating Button */}
          <button
            onClick={openModal}
            aria-label="Nhận Tư Vấn 1:1"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#1E4A3D',
              color: '#ffffff',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(30, 74, 61, 0.4), 0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.3s cubic-bezier(.22,.61,.36,1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = '#10201B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#1E4A3D';
            }}
          >
            <MessageCircle size={24} />
            <span style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid #ffffff'
            }} />
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(229, 239, 232, 0.95)',
              color: '#10201B',
              border: '1px solid rgba(16, 32, 27, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(229, 239, 232, 0.95)';
            }}
          >
            <ChevronUp size={20} />
          </button>
        </div>
      )}

      {/* ── CONSULTATION & CUSTOM TOUR MODAL (2-IN-1 SMART MODAL) ── */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(16, 32, 27, 0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '30px 16px',
            boxSizing: 'border-box',
            overflowY: 'auto'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetAndClose();
            }
          }}
        >
          <style>{`
            .consult-journey-input {
              border: none;
              border-bottom: 1.5px solid #10201B;
              background: transparent;
              border-radius: 0;
              padding: 8px 0;
              width: 100%;
              color: #10201B;
              font-family: 'Work Sans', 'Plus Jakarta Sans', sans-serif;
              font-size: 15px;
              outline: none;
              transition: border-color 0.2s ease;
              box-sizing: border-box;
            }
            .consult-journey-input:focus {
              border-bottom-color: #006d36;
            }
            .consult-journey-label {
              display: block;
              font-family: 'Work Sans', sans-serif;
              font-size: 11px;
              color: #405246;
              text-transform: uppercase;
              letter-spacing: 0.14em;
              font-weight: 700;
              margin-bottom: 4px;
            }
            @media (max-width: 640px) {
              .consult-modal-container {
                width: calc(100vw - 20px) !important;
                min-width: calc(100vw - 20px) !important;
                max-height: calc(100vh - 24px) !important;
                border-radius: 16px !important;
              }
              .consult-header-wrapper {
                padding: 48px 18px 12px !important;
              }
              .consult-body-wrapper {
                padding: 16px 18px !important;
              }
              .consult-footer-wrapper {
                padding: 12px 18px !important;
              }
              .consult-tab-btn {
                padding: 8px 6px !important;
                font-size: 11.5px !important;
              }
            }
          `}</style>

          {/* MODAL CONTAINER (Fixed 650px Height) */}
          <div
            className="consult-modal-container"
            style={{
              backgroundColor: '#e5efe8',
              color: '#10201B',
              width: '100%',
              maxWidth: '680px',
              minWidth: 'min(680px, calc(100vw - 32px))',
              height: '650px',
              maxHeight: 'min(650px, calc(100vh - 40px))',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 80px rgba(16, 32, 27, 0.45)',
              position: 'relative',
              borderRadius: '18px',
              border: '1px solid rgba(16, 32, 27, 0.12)',
              fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
              margin: 'auto',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button X (Red Background) */}
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '14px',
                right: '16px',
                zIndex: 50,
                background: '#ef4444',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#ef4444';
              }}
            >
              <X size={16} color="#ffffff" strokeWidth={2.5} />
            </button>

            {!submitted ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                {/* ── SMART 2-TAB SWITCHER & TOP HEADER ── */}
                <div className="consult-header-wrapper" style={{ padding: '56px 32px 14px', borderBottom: '1px solid rgba(16, 32, 27, 0.12)', width: '100%', boxSizing: 'border-box', flexShrink: 0 }}>
                  {/* Tab Switcher (100% Full Width - 50% / 50% strictly equal) */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                    backgroundColor: 'rgba(16, 32, 27, 0.08)',
                    borderRadius: '999px',
                    padding: '4px',
                    gap: '4px',
                    boxSizing: 'border-box',
                    marginBottom: '14px'
                  }}>
                    <button
                      type="button"
                      onClick={() => setActiveTab('consultation')}
                      className="consult-tab-btn"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: activeTab === 'consultation' ? '#1E4A3D' : 'transparent',
                        color: activeTab === 'consultation' ? '#ffffff' : '#405246',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '7px',
                        transition: 'background-color 0.2s ease, color 0.2s ease',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box'
                      }}
                    >
                      <PhoneCall size={15} />
                      <span>Tư Vấn Nhanh 1:1</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('custom_tour')}
                      className="consult-tab-btn"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: activeTab === 'custom_tour' ? '#1E4A3D' : 'transparent',
                        color: activeTab === 'custom_tour' ? '#ffffff' : '#405246',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '7px',
                        transition: 'background-color 0.2s ease, color 0.2s ease',
                        whiteSpace: 'nowrap',
                        boxSizing: 'border-box'
                      }}
                    >
                      <Compass size={15} />
                      <span>Thiết Kế Lịch Trình Riêng</span>
                    </button>
                  </div>

                  {activeTab === 'consultation' ? (
                    <div>
                      <h2 style={{
                        fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(22px, 2.6vw, 26px)',
                        fontWeight: 400,
                        color: '#10201B',
                        margin: '0 0 4px 0',
                        lineHeight: 1.2
                      }}>
                        Đăng Ký Nhận Tư Vấn 1:1
                      </h2>
                      <p style={{ fontSize: '13px', color: '#405246', margin: 0, lineHeight: 1.4 }}>
                        Chuyên gia tư vấn 4U sẽ liên hệ giải đáp chi tiết các gói Retreat có sẵn theo khung giờ bạn chọn.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 style={{
                        fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(22px, 2.6vw, 26px)',
                        fontWeight: 400,
                        color: '#10201B',
                        margin: '0 0 4px 0',
                        lineHeight: 1.2
                      }}>
                        May Đo Lịch Trình Riêng
                      </h2>
                      <p style={{ fontSize: '13px', color: '#405246', margin: 0, lineHeight: 1.4 }}>
                        Thiết kế chuyến đi độc bản theo số lượng khách, điểm đến và phong cách tĩnh dưỡng riêng của bạn.
                      </p>
                    </div>
                  )}
                </div>

                {/* ── TAB 1: FORM TƯ VẤN NHANH ── */}
                {activeTab === 'consultation' && (
                  <form onSubmit={handleConsultSubmit} style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, boxSizing: 'border-box' }}>
                    <div className="consult-body-wrapper" style={{ padding: '20px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', boxSizing: 'border-box' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px 24px', width: '100%', boxSizing: 'border-box' }}>
                        <div>
                          <label className="consult-journey-label">Họ và tên *</label>
                          <input
                            type="text"
                            className="consult-journey-input"
                            placeholder="Nguyễn Văn A"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="consult-journey-label">Số điện thoại / Zalo *</label>
                          <input
                            type="tel"
                            className="consult-journey-input"
                            placeholder="0912 345 678"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px 24px', width: '100%', boxSizing: 'border-box' }}>
                        <div>
                          <label className="consult-journey-label">Email liên hệ</label>
                          <input
                            type="email"
                            className="consult-journey-input"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="consult-journey-label">Tour / Điểm đến quan tâm</label>
                          <input
                            type="text"
                            className="consult-journey-input"
                            placeholder="Ví dụ: Hội An, Yên Tử, Đà Lạt..."
                            value={formData.tour}
                            onChange={e => setFormData({ ...formData, tour: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="consult-journey-label">Khung giờ bạn thuận tiện nhận cuộc gọi</label>
                        <select
                          className="consult-journey-input"
                          value={formData.preferredTime}
                          onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <option value="morning">Sáng (8h00 - 12h00)</option>
                          <option value="afternoon">Chiều (13h30 - 17h30)</option>
                          <option value="evening">Tối (18h00 - 21h00)</option>
                          <option value="anytime">Bất kỳ lúc nào thuận tiện</option>
                        </select>
                      </div>

                      <div>
                        <label className="consult-journey-label">Lời nhắn / Yêu cầu đặc biệt</label>
                        <textarea
                          rows={2}
                          className="consult-journey-input"
                          style={{ resize: 'none' }}
                          placeholder="Chia sẻ thêm về mong muốn chuyến đi..."
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    <div
                      className="consult-footer-wrapper"
                      style={{
                        backgroundColor: '#e5efe8',
                        borderTop: '1px solid rgba(16, 32, 27, 0.12)',
                        padding: '14px 32px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                        flexShrink: 0
                      }}
                    >
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          backgroundColor: '#1E4A3D',
                          color: '#ffffff',
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '12px 28px',
                          border: 'none',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderRadius: '6px',
                          boxShadow: '0 8px 24px rgba(30, 74, 61, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span>{loading ? 'Đang Gửi...' : 'Gửi Yêu Cầu Tư Vấn'}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </form>
                )}

                {/* ── TAB 2: FORM THIẾT KẾ RIÊNG ── */}
                {activeTab === 'custom_tour' && (
                  <form onSubmit={handleCustomSubmit} style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, boxSizing: 'border-box' }}>
                    <div className="consult-body-wrapper" style={{ padding: '20px 32px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', boxSizing: 'border-box' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px 24px', width: '100%', boxSizing: 'border-box' }}>
                        <div>
                          <label className="consult-journey-label">Họ và tên *</label>
                          <input
                            type="text"
                            className="consult-journey-input"
                            placeholder="Nguyễn Văn A"
                            required
                            value={customData.name}
                            onChange={e => setCustomData({ ...customData, name: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="consult-journey-label">Số điện thoại / Zalo *</label>
                          <input
                            type="tel"
                            className="consult-journey-input"
                            placeholder="0912 345 678"
                            required
                            value={customData.phone}
                            onChange={e => setCustomData({ ...customData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px 24px', width: '100%', boxSizing: 'border-box' }}>
                        <div>
                          <label className="consult-journey-label">Vùng miền mong muốn</label>
                          <select
                            className="consult-journey-input"
                            value={customData.region}
                            onChange={e => setCustomData({ ...customData, region: e.target.value })}
                            style={{ backgroundColor: 'transparent' }}
                          >
                            <option value="Miền Bắc">Miền Bắc (Hạ Long, Sa Pa, Yên Tử...)</option>
                            <option value="Miền Trung">Miền Trung (Hội An, Huế, Quy Nhơn...)</option>
                            <option value="Tây Nguyên & Cao Nguyên">Tây Nguyên / Cao Nguyên (Đà Lạt, Măng Đen...)</option>
                            <option value="Miền Nam & Biển Đảo">Miền Nam & Biển Đảo (Phú Quốc, Côn Đảo...)</option>
                          </select>
                        </div>

                        <div>
                          <label className="consult-journey-label">Số lượng thành viên</label>
                          <select
                            className="consult-journey-input"
                            value={customData.guestCount}
                            onChange={e => setCustomData({ ...customData, guestCount: e.target.value })}
                            style={{ backgroundColor: 'transparent' }}
                          >
                            <option value="Cá nhân 1 người">Cá nhân (1 người)</option>
                            <option value="Cặp đôi 2 người">Cặp đôi (2 người)</option>
                            <option value="Gia đình 3-5 người">Gia đình (3 - 5 người)</option>
                            <option value="Nhóm bạn 6-10 người">Nhóm bạn (6 - 10 người)</option>
                            <option value="Doanh nghiệp >10 người">Doanh nghiệp / Đoàn thể (trên 10 người)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="consult-journey-label">Điểm đến cụ thể (Nếu đã có định hướng)</label>
                        <input
                          type="text"
                          className="consult-journey-input"
                          placeholder="Ví dụ: Sa Pa, Đà Lạt, Hội An hoặc 'Nhờ 4U gợi ý'..."
                          value={customData.destination}
                          onChange={e => setCustomData({ ...customData, destination: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="consult-journey-label">Nhu cầu cụ thể & Ghi chú hành trình</label>
                        <textarea
                          rows={2}
                          className="consult-journey-input"
                          style={{ resize: 'none' }}
                          placeholder="Ví dụ: Cần không gian thiền định yên tĩnh, resort ven biển 5 sao, ăn chay thực dưỡng..."
                          value={customData.notes}
                          onChange={e => setCustomData({ ...customData, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    <div
                      className="consult-footer-wrapper"
                      style={{
                        backgroundColor: '#e5efe8',
                        borderTop: '1px solid rgba(16, 32, 27, 0.12)',
                        padding: '14px 32px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                        flexShrink: 0
                      }}
                    >
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          backgroundColor: '#1E4A3D',
                          color: '#ffffff',
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '12px 28px',
                          border: 'none',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderRadius: '6px',
                          boxShadow: '0 8px 24px rgba(30, 74, 61, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span>{loading ? 'Đang Gửi...' : 'Gửi Yêu Cầu May Đo Lịch Trình'}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* SUCCESS SCREEN */
              <div style={{ padding: '50px 36px', textAlign: 'center', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                <button
                  type="button"
                  onClick={resetAndClose}
                  aria-label="Đóng"
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '16px',
                    zIndex: 50,
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(239, 68, 68, 0.4)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.backgroundColor = '#dc2626';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = '#ef4444';
                  }}
                >
                  <X size={16} color="#ffffff" strokeWidth={2.5} />
                </button>

                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#1E4A3D',
                    color: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 10px 25px rgba(30,74,61,0.3)'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>

                <h2
                  style={{
                    fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                    fontSize: '28px',
                    fontWeight: 400,
                    color: '#10201B',
                    margin: '0 0 10px 0'
                  }}
                >
                  {activeTab === 'custom_tour' ? 'Tiếp Nhận Lịch Trình Thành Công' : 'Đăng Ký Tư Vấn Thành Công'}
                </h2>

                <p
                  style={{
                    fontSize: '14.5px',
                    color: '#405246',
                    maxWidth: '480px',
                    margin: '0 auto 24px auto',
                    lineHeight: 1.6
                  }}
                >
                  Cảm ơn quý khách <strong style={{ color: '#10201B' }}>{activeTab === 'custom_tour' ? customData.name : formData.name}</strong>. Đội ngũ chuyên gia 4U Wellness Retreat sẽ liên hệ qua SĐT <strong style={{ color: '#10201B' }}>{activeTab === 'custom_tour' ? customData.phone : formData.phone}</strong> trong thời gian sớm nhất!
                </p>

                <button
                  type="button"
                  onClick={resetAndClose}
                  style={{
                    backgroundColor: '#1E4A3D',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 28px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Hoàn Tất & Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
