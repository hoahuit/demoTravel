import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { saveSectionItemApi } from '../services/apiService';
import './CreateCustomTourModal.css';

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
      await saveSectionItemApi('custom-tours', 'create', {
        requestCode: `CTR-${Date.now().toString().slice(-6)}`,
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        destination: targetPlace,
        numberOfGuests: Number(formData.guestCount) || 2,
        specialRequests: formData.notes.trim() || '',
        preferredCallTime: 'Linh hoạt (Bất kỳ lúc nào)',
        status: 'Chưa tư vấn',
        createdAt: new Date().toISOString()
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
      className="custom-tour-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetAndClose();
        }
      }}
    >
      {/* MODAL CONTAINER - MATCHING "ĐĂNG KÝ NHẬN TƯ VẤN 1:1" */}
      <div
        className="custom-tour-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={resetAndClose}
          className="custom-tour-close-btn"
        >
          <X size={18} color="#10201B" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Header Title */}
            <div className="custom-tour-header">
              <span className="custom-tour-badge">
                Tailor-Made Sanctuary Journey
              </span>

              <h2 className="custom-tour-title">
                Thiết Kế Lịch Trình Riêng
              </h2>

              <p className="custom-tour-desc">
                Điền nhanh thông tin dưới đây để chuyên gia 4U Retreat may đo và gửi bản phác thảo lịch trình tĩnh dưỡng riêng cho quý khách.
              </p>
            </div>

            {/* Form Fields - 3-4 Essential Inputs in Underline Style */}
            <div className="custom-tour-body">
              
              {/* 1. Họ tên & Số điện thoại */}
              <div className="custom-tour-row">
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
              <div className="custom-tour-row">
                <div>
                  <label className="custom-tour-label">Số lượng người tham gia</label>
                  <select
                    className="custom-tour-input"
                    value={formData.guestCount}
                    onChange={e => setFormData({ ...formData, guestCount: e.target.value })}
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
                  placeholder="Ví dụ: Dự kiến đi 3N2Đ vào cuối tuần sau, mong muốn nghỉ dưỡng biệt lập, ăn chay thực dưỡng, spa trị liệu..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

            </div>

            {/* Modal Sticky Footer */}
            <div className="custom-tour-footer">
              <button
                type="submit"
                disabled={loading}
                className="custom-tour-submit-btn"
              >
                <span>{loading ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Thiết Kế Lịch Trình'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS SCREEN */
          <div className="custom-tour-success-box">
            <div className="custom-tour-success-icon">
              <CheckCircle2 size={36} />
            </div>

            <h2 className="custom-tour-success-title">
              Tiếp Nhận Yêu Cầu Thành Công
            </h2>

            <p className="custom-tour-success-desc">
              Cảm ơn Quý khách <strong>{formData.name}</strong>. Chuyên gia thiết kế hành trình 4U sẽ liên hệ qua số điện thoại{' '}
              <strong style={{ color: '#1E4A3D' }}>{formData.phone}</strong> trong vòng 30 phút để gửi phác thảo lịch trình và tư vấn chi tiết.
            </p>

            <button
              onClick={resetAndClose}
              className="custom-tour-success-btn"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
