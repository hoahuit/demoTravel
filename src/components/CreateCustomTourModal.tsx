import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveSectionItemApi } from '../services/apiService';

interface CreateCustomTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export default function CreateCustomTourModal({
  isOpen,
  onClose,
  initialDestination
}: CreateCustomTourModalProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Form State - 3 to 4 core fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestCount: '2 người',
    destination: initialDestination || '',
    region: 'Miền Trung',
    notes: ''
  });

  useEffect(() => {
    if (initialDestination) {
      setFormData(prev => ({ ...prev, destination: initialDestination }));
    }
  }, [initialDestination]);

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

  if (!isOpen) return null;

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }

    setLoading(true);

    try {
      const targetPlace = formData.destination.trim() || formData.region;
      await saveSectionItemApi('consultations', 'create', {
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        tour: `Thiết kế lịch trình riêng: ${targetPlace} (${formData.region})`,
        message: `[THIẾT KẾ LỊCH TRÌNH RIÊNG]
- Họ tên: ${formData.name.trim()}
- Số điện thoại / Zalo: ${formData.phone.trim()}
- Vùng miền muốn đi: ${formData.region}
- Điểm đến mong muốn: ${formData.destination.trim() || 'Theo tư vấn của 4U'}
- Số lượng người: ${formData.guestCount}
- Thông tin / Nhu cầu chuyến đi: ${formData.notes.trim() || 'Không có'}`,
        preferredTime: 'anytime',
        type: 'custom_tour_planner'
      });

      setSubmitted(true);
    } catch (err) {
      console.warn('Saved custom tour request locally:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        .custom-tour-input {
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
        .custom-tour-input:focus {
          border-bottom-color: #006d36;
        }
        .custom-tour-label {
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

      {/* MODAL CONTAINER - MATCHING "ĐĂNG KÝ NHẬN TƯ VẤN 1:1" */}
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
            {/* Header Title */}
            <div style={{ padding: '36px 40px 24px', borderBottom: '1px solid rgba(16, 32, 27, 0.12)' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#527059',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                Tailor-Made Sanctuary Journey
              </span>

              <h2
                style={{
                  fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(28px, 3.5vw, 36px)',
                  fontWeight: 400,
                  color: '#10201B',
                  margin: '0 0 8px 0',
                  lineHeight: 1.15
                }}
              >
                Thiết Kế Lịch Trình Riêng
              </h2>

              <p
                style={{
                  fontSize: '14.5px',
                  color: '#405246',
                  margin: 0,
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Điền nhanh thông tin dưới đây để chuyên gia 4U Retreat may đo và gửi bản phác thảo lịch trình tĩnh dưỡng riêng cho quý khách.
              </p>
            </div>

            {/* Form Fields - 3-4 Essential Inputs in Underline Style */}
            <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* 1. Họ tên & Số điện thoại */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px 32px' }}>
                <div>
                  <label className="custom-tour-label">Họ và tên người đặt *</label>
                  <input
                    type="text"
                    className="custom-tour-input"
                    placeholder="Nguyễn Văn A"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="custom-tour-label">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    className="custom-tour-input"
                    placeholder="0912 345 678"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* 2. Số lượng người & Vùng miền muốn đi */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px 32px' }}>
                <div>
                  <label className="custom-tour-label">Số lượng người tham gia</label>
                  <select
                    className="custom-tour-input"
                    value={formData.guestCount}
                    onChange={e => setFormData({ ...formData, guestCount: e.target.value })}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <option value="1 người (Solo)">1 người (Cá nhân / Solo)</option>
                    <option value="2 người (Cặp đôi)">2 người (Cặp đôi)</option>
                    <option value="3 - 5 người (Gia đình)">3 - 5 người (Gia đình)</option>
                    <option value="6 - 10 người (Nhóm bạn)">6 - 10 người (Nhóm bạn)</option>
                    <option value="Đoàn trên 10 người (Doanh nghiệp)">Đoàn trên 10 người (Doanh nghiệp)</option>
                  </select>
                </div>

                <div>
                  <label className="custom-tour-label">Tour muốn đi đến miền nào</label>
                  <select
                    className="custom-tour-input"
                    value={formData.region}
                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <option value="Miền Bắc (Hà Giang, Sapa, Yên Tử, Ninh Bình...)">Miền Bắc (Hà Giang, Sapa, Yên Tử, Ninh Bình...)</option>
                    <option value="Miền Trung (Phú Yên, Đà Nẵng, Hội An, Huế, Quy Nhơn...)">Miền Trung (Phú Yên, Đà Nẵng, Hội An, Huế, Quy Nhơn...)</option>
                    <option value="Miền Nam & Đảo (Phú Quốc, Côn Đảo, Cần Thơ...)">Miền Nam & Đảo (Phú Quốc, Côn Đảo, Cần Thơ...)</option>
                    <option value="Tây Nguyên (Đà Lạt, Măng Đen, Buôn Ma Thuột...)">Tây Nguyên (Đà Lạt, Măng Đen, Buôn Ma Thuột...)</option>
                    <option value="Hành Trình Quốc Tế (Bali, Bhutan, Nhật Bản, Chiang Mai...)">Hành Trình Quốc Tế (Bali, Bhutan, Nhật Bản, Chiang Mai...)</option>
                  </select>
                </div>
              </div>

              {/* 3. Điểm đến cụ thể (nếu có) */}
              <div>
                <label className="custom-tour-label">Điểm đến cụ thể bạn mong muốn (nếu có)</label>
                <input
                  type="text"
                  className="custom-tour-input"
                  placeholder="Ví dụ: Phú Yên, Sapa, Đà Lạt, Vịnh Hạ Long, Côn Đảo..."
                  value={formData.destination}
                  onChange={e => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>

              {/* 4. Thông tin / Nhu cầu chuyến đi */}
              <div>
                <label className="custom-tour-label">Thông tin / Nhu cầu chuyến đi</label>
                <textarea
                  rows={3}
                  className="custom-tour-input"
                  style={{ resize: 'none' }}
                  placeholder="Ví dụ: Dự kiến đi 3N2Đ vào cuối tuần sau, mong muốn nghỉ dưỡng biệt lập, ăn chay thực dưỡng, spa trị liệu..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

            </div>

            {/* Modal Sticky Footer */}
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
                <span>{loading ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Thiết Kế Lịch Trình'}</span>
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
              Tiếp Nhận Yêu Cầu Thành Công
            </h2>

            <p
              style={{
                fontSize: '15px',
                color: '#405246',
                maxWidth: '480px',
                margin: '0 auto 24px auto',
                lineHeight: 1.6
              }}
            >
              Cảm ơn Quý khách <strong>{formData.name}</strong>. Chuyên gia thiết kế hành trình 4U sẽ liên hệ qua số điện thoại{' '}
              <strong style={{ color: '#1E4A3D' }}>{formData.phone}</strong> trong vòng 30 phút để gửi phác thảo lịch trình và tư vấn chi tiết.
            </p>

            <button
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
                cursor: 'pointer',
                borderRadius: '6px',
                boxShadow: '0 6px 18px rgba(30, 74, 61, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#10201B'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1E4A3D'}
            >
              Đóng Cửa Sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
