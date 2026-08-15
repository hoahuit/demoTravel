import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveSectionItemApi } from '../services/apiService';

export interface ConsultationModalProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
  selectedTour?: {
    title?: string;
    city?: string;
    duration?: string;
  } | null;
}

interface ConsultFormData {
  name: string;
  phone: string;
  email: string;
  tour: string;
  message: string;
  preferredTime: string;
}

export default function ConsultationModal({ externalOpen, onExternalClose, selectedTour }: ConsultationModalProps) {
  const [showFloating, setShowFloating] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (externalOpen !== undefined) {
      setModalOpen(externalOpen);
    }
  }, [externalOpen]);

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

  const [formData, setFormData] = useState<ConsultFormData>({
    name: '',
    phone: '',
    email: '',
    tour: defaultTourTitle,
    message: '',
    preferredTime: 'morning'
  });

  useEffect(() => {
    if (selectedTour?.title) {
      setFormData(prev => ({ ...prev, tour: selectedTour.title || prev.tour }));
    }
  }, [selectedTour]);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

      {/* ── CONSULTATION MODAL (NO IMAGE - SAGE GREEN CONCEPT) ── */}
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
            padding: '40px 16px',
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
          `}</style>

          {/* MODAL CONTAINER */}
          <div
            style={{
              backgroundColor: '#e5efe8',
              color: '#10201B',
              width: '100%',
              maxWidth: '680px',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              boxShadow: '0 25px 80px rgba(16, 32, 27, 0.45)',
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid rgba(16, 32, 27, 0.12)',
              fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={resetAndClose}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(229, 239, 232, 0.9)',
                border: '1px solid rgba(16, 32, 27, 0.15)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 30,
                boxShadow: '0 4px 12px rgba(16, 32, 27, 0.15)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <X size={18} color="#10201B" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Header Title (No image) */}
                <div style={{ padding: '36px 40px 24px', borderBottom: '1px solid rgba(16, 32, 27, 0.12)' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#527059',
                    display: 'block',
                    marginBottom: '6px'
                  }}>
                    Exclusive 1:1 Sanctuary Advisory
                  </span>

                  <h2 style={{
                    fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(28px, 3.5vw, 36px)',
                    fontWeight: 400,
                    color: '#10201B',
                    margin: '0 0 8px 0',
                    lineHeight: 1.15
                  }}>
                    Đăng Ký Nhận Tư Vấn 1:1
                  </h2>

                  <p style={{
                    fontSize: '14.5px',
                    color: '#405246',
                    margin: 0,
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}>
                    Chuyên gia tư vấn 4U sẽ liên hệ để giải đáp chi tiết và may đo hành trình tĩnh dưỡng theo đúng nhu cầu của bạn.
                  </p>
                </div>

                {/* ── STRICT ORIGINAL FIELDS ONLY (UNDERLINE CONCEPT) ── */}
                <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  
                  {/* Họ tên & Số điện thoại */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px 32px' }}>
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

                  {/* Email & Tour quan tâm */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px 32px' }}>
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
                        placeholder="Ví dụ: Hội An, Vịnh Hạ Long, Yên Tử..."
                        value={formData.tour}
                        onChange={e => setFormData({ ...formData, tour: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Khung giờ nhận cuộc gọi */}
                  <div>
                    <label className="consult-journey-label">Khung giờ thuận tiện nhận cuộc gọi</label>
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

                  {/* Lời nhắn / Ghi chú */}
                  <div>
                    <label className="consult-journey-label">Lời nhắn / Yêu cầu đặc biệt</label>
                    <textarea
                      rows={3}
                      className="consult-journey-input"
                      style={{ resize: 'none' }}
                      placeholder="Chia sẻ số lượng thành viên, thời gian dự kiến hoặc mong muốn đặc biệt của bạn..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                </div>

                {/* ── MODAL STICKY FOOTER ── */}
                <div
                  style={{
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 20,
                    backgroundColor: '#e5efe8',
                    borderTop: '1px solid rgba(16, 32, 27, 0.12)',
                    padding: '20px 40px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: '#1E4A3D',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px 32px',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '6px',
                      boxShadow: '0 8px 24px rgba(30, 74, 61, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.backgroundColor = '#10201B')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.backgroundColor = '#1E4A3D')}
                  >
                    <span>{loading ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Tư Vấn 1:1'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : (
              /* SUCCESS SCREEN */
              <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#1E4A3D',
                    color: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    boxShadow: '0 10px 25px rgba(30,74,61,0.3)'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>

                <h2
                  style={{
                    fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                    fontSize: '30px',
                    fontWeight: 400,
                    color: '#10201B',
                    margin: '0 0 12px 0'
                  }}
                >
                  Đăng Ký Tư Vấn Thành Công
                </h2>

                <p
                  style={{
                    fontSize: '15px',
                    color: '#405246',
                    maxWidth: '520px',
                    margin: '0 auto 28px auto',
                    lineHeight: 1.7
                  }}
                >
                  Cảm ơn quý khách <strong style={{ color: '#10201B' }}>{formData.name}</strong>. Chuyên gia tư vấn của 4U sẽ liên hệ qua SĐT <strong style={{ color: '#10201B' }}>{formData.phone}</strong> vào khung giờ quý khách đã chọn.
                </p>

                <button
                  type="button"
                  onClick={resetAndClose}
                  style={{
                    backgroundColor: '#1E4A3D',
                    color: '#ffffff',
                    border: 'none',
                    padding: '13px 32px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
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
