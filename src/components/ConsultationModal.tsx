import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronUp, X, CheckCircle2, ArrowRight, Sparkles, Compass, PhoneCall } from 'lucide-react';
import { saveSectionItemApi } from '../services/apiService';
import './ConsultationModal.css';

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
      await saveSectionItemApi('custom-tours', 'create', {
        requestCode: `CTR-${Date.now().toString().slice(-6)}`,
        customerName: customData.name.trim(),
        customerPhone: customData.phone.trim(),
        destination: targetPlace,
        numberOfGuests: Number(customData.guestCount) || 2,
        specialRequests: customData.notes.trim() || '',
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
        <div className="consultation-floating-wrap">
          {/* Consultation Floating Button */}
          <button
            onClick={openModal}
            aria-label="Nhận Tư Vấn 1:1"
            className="consultation-float-btn"
          >
            <MessageCircle size={24} />
            <span className="consultation-float-badge" />
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="consultation-scrolltop-btn"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      )}

      {/* ── CONSULTATION & CUSTOM TOUR MODAL (2-IN-1 SMART MODAL) ── */}
      {isOpen && (
        <div
          className="consultation-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetAndClose();
            }
          }}
        >
          {/* MODAL CONTAINER (Fixed 650px Height) */}
          <div
            className="consultation-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button X (Red Background) */}
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Đóng"
              className="consultation-close-btn"
            >
              <X size={16} color="#ffffff" strokeWidth={2.5} />
            </button>

            {!submitted ? (
              <div className="consultation-modal-content">
                {/* ── SMART 2-TAB SWITCHER & TOP HEADER ── */}
                <div className="consultation-header">
                  {/* Tab Switcher (100% Full Width - 50% / 50% strictly equal) */}
                  <div className="consultation-tab-switcher">
                    <button
                      type="button"
                      onClick={() => setActiveTab('consultation')}
                      className={`consultation-tab-btn ${activeTab === 'consultation' ? 'active' : ''}`}
                    >
                      <PhoneCall size={15} />
                      <span>Tư Vấn Nhanh 1:1</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('custom_tour')}
                      className={`consultation-tab-btn ${activeTab === 'custom_tour' ? 'active' : ''}`}
                    >
                      <Compass size={15} />
                      <span>Thiết Kế Lịch Trình Riêng</span>
                    </button>
                  </div>

                  {activeTab === 'consultation' ? (
                    <div>
                      <h2 className="consultation-header-title">
                        Đăng Ký Nhận Tư Vấn 1:1
                      </h2>
                      <p className="consultation-header-desc">
                        Chuyên gia tư vấn 4U sẽ liên hệ giải đáp chi tiết các gói Retreat có sẵn theo khung giờ bạn chọn.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="consultation-header-title">
                        May Đo Lịch Trình Riêng
                      </h2>
                      <p className="consultation-header-desc">
                        Thiết kế chuyến đi độc bản theo số lượng khách, điểm đến và phong cách tĩnh dưỡng riêng của bạn.
                      </p>
                    </div>
                  )}
                </div>

                {/* ── TAB 1: FORM TƯ VẤN NHANH ── */}
                {activeTab === 'consultation' && (
                  <form onSubmit={handleConsultSubmit} className="consultation-form-root">
                    <div className="consultation-form-body">
                      <div className="consultation-grid-row">
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

                      <div className="consultation-grid-row">
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
                        <label className="consult-journey-label">Khung giờ tiện nhận cuộc gọi</label>
                        <select
                          className="consult-journey-input"
                          value={formData.preferredTime}
                          onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
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
                          placeholder="Chia sẻ thêm về mong muốn chuyến đi..."
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="consultation-form-footer">
                      <button
                        type="submit"
                        disabled={loading}
                        className="consultation-submit-btn"
                      >
                        <span>{loading ? 'Đang Gửi...' : 'Gửi Yêu Cầu Tư Vấn'}</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </form>
                )}

                {/* ── TAB 2: FORM THIẾT KẾ RIÊNG ── */}
                {activeTab === 'custom_tour' && (
                  <form onSubmit={handleCustomSubmit} className="consultation-form-root">
                    <div className="consultation-form-body">
                      <div className="consultation-grid-row">
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

                      <div className="consultation-grid-row">
                        <div>
                          <label className="consult-journey-label">Vùng miền mong muốn</label>
                          <select
                            className="consult-journey-input"
                            value={customData.region}
                            onChange={e => setCustomData({ ...customData, region: e.target.value })}
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
                          placeholder="Ví dụ: Cần không gian thiền định yên tĩnh, resort ven biển 5 sao, ăn chay thực dưỡng..."
                          value={customData.notes}
                          onChange={e => setCustomData({ ...customData, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="consultation-form-footer">
                      <button
                        type="submit"
                        disabled={loading}
                        className="consultation-submit-btn"
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
              <div className="consultation-success-root">
                <button
                  type="button"
                  onClick={resetAndClose}
                  aria-label="Đóng"
                  className="consultation-close-btn"
                >
                  <X size={16} color="#ffffff" strokeWidth={2.5} />
                </button>

                <div className="consultation-success-icon-box">
                  <CheckCircle2 size={32} />
                </div>

                <h2 className="consultation-success-title">
                  {activeTab === 'custom_tour' ? 'Tiếp Nhận Lịch Trình Thành Công' : 'Đăng Ký Tư Vấn Thành Công'}
                </h2>

                <p className="consultation-success-desc">
                  Cảm ơn quý khách <strong style={{ color: '#10201B' }}>{activeTab === 'custom_tour' ? customData.name : formData.name}</strong>. Đội ngũ chuyên gia 4U Wellness Retreat sẽ liên hệ qua SĐT <strong style={{ color: '#10201B' }}>{activeTab === 'custom_tour' ? customData.phone : formData.phone}</strong> trong thời gian sớm nhất!
                </p>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="consultation-success-btn"
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
