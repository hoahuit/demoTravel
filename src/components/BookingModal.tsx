import React, { useState, useEffect } from 'react';
import { ChevronUp, Calendar, CheckCircle2 } from 'lucide-react';
import './BookingModal.css';

export interface BookingModalProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

interface FormDataState {
  name: string;
  phone: string;
  tour: string;
}

export default function BookingModal({ externalOpen, onExternalClose }: BookingModalProps) {
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

  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    phone: '',
    tour: 'thantamtri'
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
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
      tour: 'thantamtri'
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
        <div className="fixed bottom-7 right-7 z-[9990] flex flex-col gap-3 items-center">
          <button
            onClick={openModal}
            aria-label="Open Booking Modal"
            className="w-13 h-13 rounded-full bg-[#1E4A3D] hover:bg-[#10201B] text-[#EAF0E7] border border-[#B7C9AE]/30 cursor-pointer flex items-center justify-center shadow-2xl hover:scale-110 transition-all relative"
          >
            <Calendar size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#8CA366] border-2 border-[#10201B]" />
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="w-12 h-12 rounded-full bg-[#0C2620] text-[#EAF0E7] border border-white/10 cursor-pointer flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#10201B] transition-all"
          >
            <ChevronUp size={22} />
          </button>
        </div>
      )}

      {/* BOOKING MODAL OVERLAY */}
      {isOpen && (
        <div
          className="bm-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
        >
          <div className="bm-modal">
            {/* Close Button */}
            <button className="bm-close-btn" onClick={resetAndClose} aria-label="Đóng">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M4 4l12 12M16 4L4 16" />
              </svg>
            </button>

            {!submitted ? (
              <>
                {/* LEFT PANEL: BENEFITS */}
                <div className="bm-panel-left">
                  <span className="bm-panel-eyebrow">Quyền Lợi Tư Vấn 1:1</span>
                  <h3>Đồng hành cùng bạn từ những bước đầu tiên</h3>
                  <ul className="bm-perk-list">
                    <li>
                      <span className="bm-check">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </span>
                      Tư vấn may đo lịch trình nghỉ dưỡng riêng biệt
                    </li>
                    <li>
                      <span className="bm-check">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </span>
                      Đưa đón VIP bằng xe Limousine tận nơi
                    </li>
                    <li>
                      <span className="bm-check">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </span>
                      Ưu đãi tốt nhất dành cho nhóm & gia đình
                    </li>
                    <li>
                      <span className="bm-check">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </span>
                      Hỗ trợ xếp chỗ & hoàn hủy linh hoạt 24/7
                    </li>
                  </ul>

                  <div className="bm-hotline-box">
                    <span className="bm-mono">Hotline tư vấn nhanh 24/7</span>
                    <a href="tel:0764886877" className="bm-number">
                      <span className="bm-pulse-dot" />
                      0764.886.877
                    </a>
                  </div>
                </div>

                {/* RIGHT PANEL: FORM */}
                <div className="bm-panel-right">
                  <div className="bm-form-head">
                    <h2>Đăng Ký Tư Vấn Tour</h2>
                    <p>Để lại thông tin để chuyên gia 4U Tours hỗ trợ xếp lịch trình nghỉ dưỡng riêng cho bạn.</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="bm-field">
                      <label htmlFor="fullName">
                        Họ & Tên <span className="bm-req">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Ví dụ: Nguyễn Văn A"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="bm-field">
                      <label htmlFor="phone">
                        Số Điện Thoại / Zalo <span className="bm-req">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Ví dụ: 0901 234 567"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="bm-field">
                      <label htmlFor="tourSelect">
                        Tour / Gói Retreat Cần Tư Vấn <span className="bm-req">*</span>
                      </label>
                      <select
                        id="tourSelect"
                        required
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                      >
                        <option value="thantamtri">Retreat Chữa Lành Thân Tâm Trí (Nam Cát Tiên)</option>
                        <option value="phuquoc">Retreat Hoàng Hôn Phú Quốc</option>
                        <option value="dalat">Retreat Sương Sớm Đà Lạt</option>
                        <option value="custom">Tôi chưa chắc — cần tư vấn thêm</option>
                      </select>
                    </div>

                    <button type="submit" className="bm-submit-btn">
                      Gửi Yêu Cầu Tư Vấn Ngay
                      <svg viewBox="0 0 20 20" fill="none">
                        <path d="M4 10h12M11 5l5 5-5 5" />
                      </svg>
                    </button>

                    <div className="bm-form-note">
                      <svg viewBox="0 0 20 20" fill="none">
                        <path d="M10 2l7 3v5c0 4.5-3 7.5-7 8-4-.5-7-3.5-7-8V5l7-3z" />
                      </svg>
                      Thông tin của bạn được bảo mật tuyệt đối
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div style={{ padding: '60px 40px', textAlign: 'center', gridColumn: 'span 2' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(140, 163, 102, 0.2)',
                    border: '2px solid #8CA366',
                    color: '#1E4A3D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  <CheckCircle2 size={36} color="#1E4A3D" />
                </div>

                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '28px',
                    color: '#10201B',
                    marginBottom: '10px'
                  }}
                >
                  Đã Gửi Yêu Cầu Tư Vấn!
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(16, 32, 27, 0.7)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 28px' }}>
                  Cảm ơn <strong>{formData.name}</strong>. Chuyên gia 4U Tours sẽ liên hệ qua SĐT <strong>{formData.phone}</strong> trong ít phút để xếp lịch trình demo cho bạn.
                </p>

                <button
                  onClick={resetAndClose}
                  className="bm-submit-btn"
                  style={{ maxWidth: '280px', margin: '0 auto' }}
                >
                  Hoàn Tất & Đóng Cửa Sổ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
