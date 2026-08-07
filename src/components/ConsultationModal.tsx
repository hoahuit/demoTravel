import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp, X } from 'lucide-react';

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

  useEffect(() => {
    if (externalOpen !== undefined) {
      setModalOpen(externalOpen);
      if (externalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }, [externalOpen]);

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

  // Floating buttons scroll listener
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setModalOpen(false);
    setSubmitted(false);
    document.body.style.overflow = '';
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
    document.body.style.overflow = 'hidden';
  };

  const isOpen = Boolean(externalOpen || modalOpen);

  return (
    <>
      {/* FLOATING ACTION BUTTONS */}
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
            aria-label="Nhận Tư Vấn"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
              color: '#062c23',
              border: '2px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.3s cubic-bezier(.22,.61,.36,1)',
              position: 'relative',
              fontWeight: 700,
              fontSize: '13px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.12)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(34, 197, 94, 0.55), 0 6px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(34, 197, 94, 0.4), 0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            <MessageCircle size={22} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ef4444',
              border: '2px solid #ffffff',
              animation: 'cmPulse 2s ease-in-out infinite'
            }} />
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0C2620',
              color: '#EAF0E7',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = '#10201B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#0C2620';
            }}
          >
            <ChevronUp size={22} />
          </button>
        </div>
      )}

      {/* CONSULTATION MODAL OVERLAY */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10005,
            background: 'rgba(10, 20, 17, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'cmFadeIn 0.3s ease forwards'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
        >
          <div
            style={{
              width: '92vw',
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 40px 90px -20px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              animation: 'cmSlide 0.4s cubic-bezier(.22,.61,.36,1) forwards'
            }}
          >
            {/* Close Button (Vibrant Red) */}
            <button
              onClick={resetAndClose}
              aria-label="Đóng"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ef4444',
                color: '#ffffff',
                border: '2px solid rgba(255,255,255,0.8)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.45)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.12)';
                e.currentTarget.style.background = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#ef4444';
              }}
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {!submitted ? (
              <>
                {/* HEADER SECTION */}
                <div style={{
                  background: 'linear-gradient(135deg, #062c23 0%, #1E4A3D 50%, #0C2620 100%)',
                  padding: '40px 36px 32px',
                  borderRadius: '24px 24px 0 0',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Decorative circles */}
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'rgba(74, 222, 128, 0.08)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(74, 222, 128, 0.06)',
                    pointerEvents: 'none'
                  }} />

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(74, 222, 128, 0.15)',
                    border: '1px solid rgba(74, 222, 128, 0.3)',
                    padding: '5px 14px',
                    borderRadius: '999px',
                    marginBottom: '16px'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      color: '#4ade80'
                    }}>
                      TƯ VẤN MIỄN PHÍ
                    </span>
                  </div>

                  <h2 style={{
                    fontSize: '30px',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: '0 0 10px 0',
                    lineHeight: 1.2
                  }}>
                    Đăng Ký Nhận Tư Vấn{' '}
                    <span style={{
                      fontStyle: 'italic',
                      background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>1:1</span>
                  </h2>

                  <p style={{
                    fontSize: '17px',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    Để lại thông tin, chuyên gia 4U Wellness sẽ liên hệ tư vấn lộ trình Retreat phù hợp nhất cho bạn.
                  </p>
                </div>

                {/* FORM SECTION */}
                <div style={{ padding: '32px 36px 36px' }}>
                  <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="cm-name" style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        color: '#1E4A3D',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '8px'
                      }}>
                        Họ & Tên <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        id="cm-name"
                        type="text"
                        placeholder="Ví dụ: Nguyễn Văn A"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          background: '#f8faf9',
                          border: '1px solid rgba(30,74,61,0.15)',
                          borderRadius: '12px',
                          fontSize: '14px',
                          color: '#0f172a',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box' as const
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#22c55e';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.12)';
                          e.currentTarget.style.background = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(30,74,61,0.15)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.background = '#f8faf9';
                        }}
                      />
                    </div>

                    {/* Phone & Preferred Time Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                      <div>
                        <label htmlFor="cm-phone" style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase' as const,
                          color: '#1E4A3D',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '8px'
                        }}>
                          SĐT / Zalo <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          id="cm-phone"
                          type="tel"
                          placeholder="0901 234 567"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            background: '#f8faf9',
                            border: '1px solid rgba(30,74,61,0.15)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box' as const
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = '#22c55e';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.12)';
                            e.currentTarget.style.background = '#ffffff';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(30,74,61,0.15)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.background = '#f8faf9';
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="cm-time" style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase' as const,
                          color: '#1E4A3D',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginBottom: '8px'
                        }}>
                          Thời Gian Tiện Gọi
                        </label>
                        <select
                          id="cm-time"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            background: '#f8faf9',
                            border: '1px solid rgba(30,74,61,0.15)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            color: '#0f172a',
                            outline: 'none',
                            appearance: 'none' as const,
                            cursor: 'pointer',
                            boxSizing: 'border-box' as const,
                            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%231E4A3D' stroke-width='1.6'><path d='M5 8l5 5 5-5'/></svg>\")",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 14px center',
                            backgroundSize: '16px',
                            paddingRight: '38px'
                          }}
                        >
                          <option value="morning">Sáng (8h - 12h)</option>
                          <option value="afternoon">Chiều (13h - 17h)</option>
                          <option value="evening">Tối (18h - 21h)</option>
                          <option value="anytime">Bất kỳ lúc nào</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: 'none',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
                        color: '#062c23',
                        fontSize: '15px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.3s cubic-bezier(.22,.61,.36,1)',
                        boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.45)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.3)';
                      }}
                    >
                      Gửi Yêu Cầu Tư Vấn Miễn Phí
                    </button>

                    {/* Trust badges */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '16px',
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                      Thông tin bảo mật 100% • Tư vấn hoàn toàn miễn phí
                    </div>
                  </form>

                  {/* Hotline quick contact */}
                  <div style={{
                    marginTop: '24px',
                    background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap' as const
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E4A3D', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '4px' }}>
                        Hoặc gọi ngay Hotline
                      </div>
                      <div style={{ fontSize: '14px', color: '#475569' }}>
                        Chuyên gia tư vấn trực tuyến 24/7
                      </div>
                    </div>
                    <a
                      href="tel:0764886877"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: '#1E4A3D',
                        color: '#ffffff',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        fontSize: '15px',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap' as const
                      }}
                    >
                      0764.886.877
                    </a>
                  </div>
                </div>
              </>
            ) : (
              /* SUCCESS VIEW */
              <div style={{ padding: '60px 40px', textAlign: 'center' as const }}>
                <h3 style={{
                  fontSize: '30px',
                  color: '#0f172a',
                  marginBottom: '12px',
                  fontWeight: 800
                }}>
                  Đã Ghi Nhận Thành Công!
                </h3>

                <p style={{
                  fontSize: '17px',
                  color: '#475569',
                  lineHeight: 1.7,
                  maxWidth: '440px',
                  margin: '0 auto 12px'
                }}>
                  Cảm ơn <strong>{formData.name}</strong>! Chuyên gia tư vấn 4U Wellness sẽ liên hệ bạn qua số <strong>{formData.phone}</strong> trong thời gian sớm nhất.
                </p>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  color: '#166534',
                  fontWeight: 600,
                  marginBottom: '32px'
                }}>
                  Thời gian phản hồi: Trong vòng 30 phút
                </div>

                <br />

                <button
                  onClick={resetAndClose}
                  style={{
                    padding: '14px 40px',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: '#1E4A3D',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: 'all 0.2s ease',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0C2620';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1E4A3D';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Đóng Cửa Sổ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes cmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cmSlide {
          from { transform: translateY(24px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes cmPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes cmBounce {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 640px) {
          #cm-phone, #cm-email, #cm-tour, #cm-time {
            font-size: 13px !important;
          }
        }
      `}</style>
    </>
  );
}
