import React, { useState, useEffect } from 'react';
import {
  X,
  Compass,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import { createTourApi } from '../services/apiService';

export interface CustomerTourDesignerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  onSuccess?: () => void;
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: string;
}

export default function CustomerTourDesignerDrawer({
  isOpen,
  onClose,
  initialDestination = '',
  onSuccess
}: CustomerTourDesignerDrawerProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdTourCode, setCreatedTourCode] = useState<string>('');

  // Form states - Khởi tạo sạch sẽ, không gán giá trị mặc định giả định
  const [title, setTitle] = useState<string>('');
  const [city, setCity] = useState<string>(initialDestination || '');
  const [duration, setDuration] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('');
  const [budgetPerPerson, setBudgetPerPerson] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Contact info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  // Itinerary Builder - Khởi tạo 1 ngày đầu tiên trống
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([
    {
      dayNumber: 1,
      title: '',
      activities: ''
    }
  ]);

  useEffect(() => {
    if (initialDestination) {
      setCity(initialDestination);
    }
  }, [initialDestination]);

  // Lock body scroll khi Drawer mở
  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow || '';
        document.documentElement.style.overflow = prevHtmlOverflow || '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Nhận text ngân sách tự do (hỗ trợ nhập nhiều loại tiền tệ: $, USD, VNĐ...)
  const handleBudgetChange = (val: string) => {
    setBudgetPerPerson(val);
  };

  const handleAddDay = () => {
    const nextDay = itineraryDays.length + 1;
    setItineraryDays(prev => [
      ...prev,
      {
        dayNumber: nextDay,
        title: '',
        activities: ''
      }
    ]);
  };

  const handleRemoveDay = (index: number) => {
    if (itineraryDays.length <= 1) {
      alert('Lịch trình tối thiểu phải có 1 ngày!');
      return;
    }
    const updated = itineraryDays.filter((_, i) => i !== index).map((day, idx) => ({
      ...day,
      dayNumber: idx + 1
    }));
    setItineraryDays(updated);
  };

  const handleUpdateDay = (index: number, field: keyof ItineraryDay, value: string) => {
    const updated = [...itineraryDays];
    updated[index] = { ...updated[index], [field]: value };
    setItineraryDays(updated);
  };

  const generateSlug = (text: string) => {
    const base = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    return `${base || 'custom-tour'}-${Date.now().toString().slice(-6)}`;
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Vui lòng đặt tên cho chuyến đi của bạn!');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Email để ban chuyên gia 4U liên hệ phê duyệt!');
      return;
    }

    setLoading(true);

    try {
      const parsedPrice = parseInt(budgetPerPerson.replace(/\D/g, ''), 10) || 0;
      const autoSlug = generateSlug(title);

      const defaultHeroImages = [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&q=80',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80'
      ];
      const randomHero = defaultHeroImages[Math.floor(Math.random() * defaultHeroImages.length)];

      // Khách tạo gì thì hiển thị nấy, nếu chưa nhập thì để '--'
      const formattedItinerary = itineraryDays.map(item => ({
        day: item.dayNumber,
        title: item.title.trim() || `Ngày ${item.dayNumber}`,
        description: item.activities.trim() || '--',
        activities: item.activities.trim() ? [item.activities.trim()] : ['--']
      }));

      // Highlights: Chỉ gồm những mục khách thực sự đã nhập
      const rawHighlights: string[] = [];
      if (city.trim()) rawHighlights.push(`Điểm đến: ${city.trim()}`);
      if (duration.trim()) rawHighlights.push(`Thời lượng: ${duration.trim()}`);
      if (guestCount.trim()) rawHighlights.push(`Quy mô đoàn: ${guestCount.trim()}`);
      if (specialNotes.trim()) rawHighlights.push(`Yêu cầu riêng: ${specialNotes.trim()}`);
      const validHighlights = rawHighlights.length > 0 ? rawHighlights : ['--'];

      const newTourPayload = {
        title: title.trim(),
        slug: autoSlug,
        subtitle: customerName.trim()
          ? `Tour đặt riêng bởi ${customerName.trim()}${customerPhone.trim() ? ` (${customerPhone.trim()})` : ''}`
          : '--',
        category: 'Retreat',
        categories: ['Retreat', 'retreat-khach-hang', 'custom-tour'],
        city: city.trim() || '--',
        country: 'Việt Nam',
        duration: duration.trim() || '--',
        durationDays: itineraryDays.length,
        price: parsedPrice,
        originalPrice: parsedPrice,
        heroImage: randomHero,
        isCustomer: true,           // 👤 Đánh dấu Tour do khách hàng đặt riêng
        isAdminApproved: false,      // 🛡️ Mặc định chờ Admin duyệt mới xuất bản lên Website
        departureDates: departureDate ? [departureDate] : ['--'],
        itinerary: formattedItinerary,
        highlights: validHighlights,
        notes: [
          `Khách hàng: ${customerName.trim() || '--'}`,
          `Số điện thoại: ${customerPhone.trim() || '--'}`,
          `Email: ${customerEmail.trim() || '--'}`,
          `Ngân sách ước tính: ${budgetPerPerson.trim() || '--'}`,
          `Yêu cầu riêng: ${specialNotes.trim() || '--'}`
        ],
        rating: 5.0,
        reviewsCount: 0
      };

      await createTourApi(newTourPayload);
      setCreatedTourCode(autoSlug.toUpperCase());
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('[CustomerTourDesignerDrawer] Error saving custom tour:', err);
      alert(`Không thể tạo tour: ${err?.message || 'Có lỗi xảy ra, vui lòng thử lại sau!'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(8, 31, 19, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'background-color 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetAndClose();
        }
      }}
    >
      <style>{`
        @keyframes drawerSlideIn {
          from {
            transform: translateX(100%);
            opacity: 0.7;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .luxury-drawer-container {
          animation: drawerSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .luxury-input-field {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          background-color: #ffffff;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .luxury-input-field:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
        }
        .luxury-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 700;
          color: #10201B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 7px;
        }
        .luxury-card-section {
          background-color: #ffffff;
          border: 1px solid rgba(16, 32, 27, 0.08);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 10px rgba(8, 31, 19, 0.03);
          box-sizing: border-box;
        }
        .luxury-tag-button {
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          padding: 4px 11px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }
        .luxury-tag-button:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }
        .luxury-tag-button.active {
          background-color: #dcfce7;
          color: #15803d;
          border-color: #86efac;
          font-weight: 700;
        }
      `}</style>

      {/* DRAWER PANEL */}
      <div
        className="luxury-drawer-container"
        style={{
          width: '100%',
          maxWidth: '780px',
          height: '100vh',
          backgroundColor: '#f8faf9',
          color: '#10201B',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-12px 0 50px rgba(8, 31, 19, 0.25)',
          position: 'relative',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── STICKY TOP HEADER ── */}
        <div
          style={{
            padding: '20px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(16, 32, 27, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexShrink: 0,
            zIndex: 20
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#059669',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                4U RETREAT • TAILOR-MADE STUDIO
              </span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                Thiết Kế Độc Bản
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(22px, 2.8vw, 26px)',
                fontWeight: 700,
                color: '#081f13',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              May Đo Hành Trình Tĩnh Dưỡng
            </h2>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Đóng bảng thiết kế"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.borderColor = '#fca5a5';
              e.currentTarget.style.color = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#334155';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── DRAWER CONTENT AREA (SCROLLABLE) ── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 32px 100px 32px',
            boxSizing: 'border-box'
          }}
        >
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 24px rgba(22, 163, 74, 0.18)'
                }}
              >
                <CheckCircle2 size={44} />
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#059669',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                Bản thiết kế đã được tiếp nhận
              </span>

              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#081f13',
                  margin: '0 0 16px 0',
                  lineHeight: 1.3
                }}
              >
                Hành Trình Độc Bản Của Bạn Đang Chờ Phê Duyệt!
              </h3>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  maxWidth: '520px',
                  width: '100%',
                  margin: '0 auto 24px auto',
                  textAlign: 'left',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
                  <strong>Mã Tour Thiết Kế:</strong> <code style={{ color: '#0f766e', fontWeight: 700, backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' }}>{createdTourCode}</code>
                </div>
                <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
                  <strong>Tên Tour:</strong> {title}
                </div>
                <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
                  <strong>Ngân sách ước tính:</strong> {budgetPerPerson.trim() || '--'}
                </div>
                <div style={{ fontSize: '13.5px', color: '#475569' }}>
                  <strong>Trạng thái:</strong> <span style={{ color: '#d97706', fontWeight: 700 }}>⏳ Đã lưu vào danh sách Tour (Chờ Admin phê duyệt xuất bản)</span>
                </div>
              </div>

              <p
                style={{
                  fontSize: '14.5px',
                  color: '#525a54',
                  maxWidth: '520px',
                  lineHeight: 1.65,
                  margin: '0 0 32px 0'
                }}
              >
                Bản thiết kế của bạn đã được ghi nhận trực tiếp vào hệ thống. Ban cố vấn tĩnh dưỡng 4U sẽ liên hệ qua số điện thoại <strong>{customerPhone}</strong> để hoàn thiện chi tiết và duyệt xuất bản lên website.
              </p>

              <button
                type="button"
                onClick={resetAndClose}
                style={{
                  backgroundColor: '#081f13',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '13px 32px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(8, 31, 19, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>Đóng Bảng Thiết Kế</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* ── FORM SECTIONS ── */
            <form id="customer-tour-designer-drawer-form" onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* BANNER THÔNG BÁO QUY TRÌNH & NGUYÊN TẮC NHẬP GÌ HIỂN THỊ NẤY */}
                <div
                  style={{
                    backgroundColor: '#f0fdf4',
                    border: '1.5px solid #86efac',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    boxShadow: '0 2px 8px rgba(22, 101, 52, 0.05)'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#15803d',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 800,
                        color: '#14532d',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '4px'
                      }}
                    >
                      Chế độ Tự Thiết Kế Tour Độc Bản
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '13px',
                        lineHeight: 1.6,
                        color: '#166534'
                      }}
                    >
                      Bạn nhập thông tin gì thì hệ thống sẽ hiển thị đúng nội dung đó (những mục chưa nhập sẽ hiển thị <strong>--</strong>). Sau khi Admin xem xét và duyệt, tour sẽ được xuất bản lên website!
                    </p>
                  </div>
                </div>

                {/* KHU VỰC 1: TÊN & Ý NIỆM TOUR */}
                <div className="luxury-card-section">
                  <div style={{ marginBottom: '16px' }}>
                    <label className="luxury-label" style={{ fontSize: '13px' }}>
                      <Sparkles size={15} color="#059669" />
                      <span>Tên Chuyến Đi Tĩnh Dưỡng Của Bạn *</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="luxury-input-field"
                      style={{ fontSize: '15.5px', fontWeight: 600, padding: '13px 16px' }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ví dụ: Kỳ nghỉ dưỡng phục hồi năng lượng tại Hội An 3N2Đ..."
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div>
                      <label className="luxury-label">
                        <MapPin size={14} color="#059669" />
                        <span>Điểm Đến / Thành Phố</span>
                      </label>
                      <input
                        type="text"
                        className="luxury-input-field"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ví dụ: Sa Pa, Đà Lạt, Huế, Phú Quốc..."
                      />
                    </div>

                    <div>
                      <label className="luxury-label">
                        <Clock size={14} color="#059669" />
                        <span>Thời Lượng Mong Muốn</span>
                      </label>
                      <input
                        type="text"
                        className="luxury-input-field"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Ví dụ: 3 Ngày 2 Đêm (chưa nhập: --)"
                      />
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '7px' }}>
                        {['2 Ngày 1 Đêm', '3 Ngày 2 Đêm', '4 Ngày 3 Đêm', '5 Ngày 4 Đêm'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`luxury-tag-button ${duration === opt ? 'active' : ''}`}
                            onClick={() => setDuration(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* KHU VỰC 2: KẾ HOẠCH & NGÂN SÁCH */}
                <div className="luxury-card-section">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label className="luxury-label">
                        <Users size={14} color="#059669" />
                        <span>Quy Mô / Số Khách</span>
                      </label>
                      <input
                        type="text"
                        className="luxury-input-field"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="Ví dụ: 2 người (Cặp đôi), 4 người..."
                      />
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '7px' }}>
                        {['1 người (Solo)', '2 người (Cặp đôi)', 'Gia đình (3 - 5)', 'Nhóm bạn (6 - 10)'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`luxury-tag-button ${guestCount === opt ? 'active' : ''}`}
                            onClick={() => setGuestCount(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="luxury-label">
                        <DollarSign size={14} color="#059669" />
                        <span>Ngân Sách Ước Tính / Khách</span>
                      </label>
                      <input
                        type="text"
                        className="luxury-input-field"
                        value={budgetPerPerson}
                        onChange={(e) => handleBudgetChange(e.target.value)}
                        placeholder="Ví dụ: 8.500.000 VNĐ, $500, 1.000 USD... (để trống: --)"
                      />
                      <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '5px' }}>
                        {budgetPerPerson.trim() ? `Dự kiến: ${budgetPerPerson.trim()}` : 'Chưa nhập sẽ hiển thị: --'}
                      </span>
                    </div>

                    <div>
                      <label className="luxury-label">
                        <Calendar size={14} color="#059669" />
                        <span>Ngày Khởi Hành Dự Kiến</span>
                      </label>
                      <input
                        type="date"
                        className="luxury-input-field"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                      />
                      <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '5px' }}>
                        {departureDate ? `Ngày: ${departureDate}` : 'Chưa chọn sẽ hiển thị: --'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KHU VỰC 3: LỊCH TRÌNH TỪNG NGÀY (TIMELINE BUILDER) */}
                <div className="luxury-card-section" style={{ backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#081f13', fontWeight: 800 }}>
                        Lịch Trình Chi Tiết Từng Ngày
                      </h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#64748b' }}>
                        Khách nhập tiêu đề và hoạt động gì thì hiển thị nấy (chưa nhập sẽ hiển thị <code>--</code>).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddDay}
                      style={{
                        backgroundColor: '#f0fdf4',
                        color: '#15803d',
                        border: '1.5px solid #86efac',
                        borderRadius: '8px',
                        padding: '7px 14px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dcfce7';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0fdf4';
                      }}
                    >
                      <Plus size={14} />
                      <span>+ Thêm Ngày</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {itineraryDays.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: '#fafaf9',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '16px 18px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                            <span
                              style={{
                                backgroundColor: '#10201B',
                                color: '#ffffff',
                                fontSize: '11px',
                                fontWeight: 800,
                                padding: '4px 9px',
                                borderRadius: '6px',
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.05em'
                              }}
                            >
                              NGÀY {item.dayNumber < 10 ? `0${item.dayNumber}` : item.dayNumber}
                            </span>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleUpdateDay(index, 'title', e.target.value)}
                              placeholder={`Tiêu đề Ngày ${item.dayNumber} (chưa nhập sẽ hiển thị: Ngày ${item.dayNumber})`}
                              style={{
                                flex: 1,
                                padding: '7px 12px',
                                border: '1px solid #cbd5e1',
                                borderRadius: '8px',
                                fontSize: '13.5px',
                                fontWeight: 600,
                                color: '#0f172a',
                                outline: 'none',
                                backgroundColor: '#ffffff'
                              }}
                            />
                          </div>

                          {itineraryDays.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveDay(index)}
                              title="Xóa ngày này"
                              style={{
                                backgroundColor: '#fff1f2',
                                color: '#be123c',
                                border: '1px solid #fecdd3',
                                borderRadius: '8px',
                                padding: '7px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <textarea
                          rows={2}
                          value={item.activities}
                          onChange={(e) => handleUpdateDay(index, 'activities', e.target.value)}
                          placeholder="Mô tả các hoạt động, địa điểm hoặc trải nghiệm tĩnh dưỡng mong muốn trong ngày này (chưa nhập sẽ hiển thị: --)..."
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '13px',
                            color: '#334155',
                            outline: 'none',
                            resize: 'vertical',
                            boxSizing: 'border-box',
                            backgroundColor: '#ffffff',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* KHU VỰC 4: THÔNG TIN LIÊN HỆ */}
                <div className="luxury-card-section">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <ShieldCheck size={18} color="#059669" />
                    <h4 style={{ margin: 0, fontSize: '14.5px', color: '#081f13', fontWeight: 800 }}>
                      Thông Tin Người Đặt Chuyến Đi *
                    </h4>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label className="luxury-label">Họ và Tên *</label>
                      <input
                        type="text"
                        required
                        className="luxury-input-field"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>

                    <div>
                      <label className="luxury-label">Số Điện Thoại / Zalo *</label>
                      <input
                        type="tel"
                        required
                        className="luxury-input-field"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0912 345 678"
                      />
                    </div>

                    <div>
                      <label className="luxury-label">Email Xác Nhận *</label>
                      <input
                        type="email"
                        required
                        className="luxury-input-field"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="luxury-label">Ghi Chú & Yêu Cầu Đặc Biệt (Chưa nhập: --)</label>
                    <textarea
                      rows={2}
                      className="luxury-input-field"
                      style={{ resize: 'none' }}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Ví dụ: Ăn chay thực dưỡng, resort ven biển riêng tư, xe đưa đón riêng..."
                    />
                  </div>
                </div>

              </div>
            </form>
          )}
        </div>

        {/* ── STICKY BOTTOM ACTION BAR ── */}
        {!submitted && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px 32px',
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(16, 32, 27, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              zIndex: 30
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                Hành trình: <strong style={{ color: '#0f172a' }}>{itineraryDays.length} Ngày</strong> • Điểm đến: <strong style={{ color: '#0f172a' }}>{city.trim() || '--'}</strong>
              </span>
              <span style={{ fontSize: '13px', color: '#059669', fontWeight: 700 }}>
                {budgetPerPerson.trim() ? `Ngân sách: ${budgetPerPerson.trim()}` : 'Ngân sách: --'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={resetAndClose}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '11px 20px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Hủy Bỏ
              </button>

              <button
                type="submit"
                form="customer-tour-designer-drawer-form"
                disabled={loading}
                style={{
                  backgroundColor: '#081f13',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 28px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(8, 31, 19, 0.25)',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <Send size={15} />
                <span>{loading ? 'Đang Khởi Tạo...' : 'Tạo Tour & Gửi Ban Phê Duyệt 4U'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
