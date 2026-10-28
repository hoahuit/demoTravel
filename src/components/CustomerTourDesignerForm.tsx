import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  DollarSign,
  Clock,
  ShieldCheck,
  Building,
  Car,
  Plane,
  Globe,
  Tag
} from 'lucide-react';
import { createTourApi } from '../services/apiService';

export interface CustomerTourDesignerFormProps {
  initialDestination?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: string;
}

const PRESET_CITIES = [
  'Đà Lạt (Lâm Đồng)',
  'Sa Pa (Lào Cai)',
  'Hội An (Quảng Nam)',
  'Yên Tử (Quảng Ninh)',
  'Ninh Bình (Tràng An)',
  'Phú Quốc (Kiên Giang)',
  'Huế (Thừa Thiên Huế)',
  'Quy Nhơn (Bình Định)',
  'Côn Đảo (Bà Rịa - Vũng Tàu)',
  'Hà Giang (Đồng Văn)',
  'Mộc Châu (Sơn La)',
  'Nha Trang (Khánh Hòa)',
  'Đà Nẵng'
];

export default function CustomerTourDesignerForm({
  initialDestination = '',
  onSuccess,
  onClose
}: CustomerTourDesignerFormProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdTourCode, setCreatedTourCode] = useState<string>('');

  // 1. Tên Tour
  const [title, setTitle] = useState<string>('');

  // 2. Quốc Gia (Country)
  const [country, setCountry] = useState<string>('Việt Nam (Vietnam)');

  // 3. Thành Phố / Điểm Đến (City)
  const [selectedCityOption, setSelectedCityOption] = useState<string>(
    initialDestination && PRESET_CITIES.includes(initialDestination) ? initialDestination : (initialDestination ? 'custom' : '')
  );
  const [customCity, setCustomCity] = useState<string>(
    initialDestination && !PRESET_CITIES.includes(initialDestination) ? initialDestination : ''
  );

  // 4. Phân Vùng Miền (Region)
  const [region, setRegion] = useState<string>('');

  // 5. Thời Lượng
  const [duration, setDuration] = useState<string>('');

  // 6. Lịch Khởi Hành
  const [departureSchedule, setDepartureSchedule] = useState<string>('');

  // 7. Khách Sạn / Resort
  const [hotel, setHotel] = useState<string>('');

  // 8. Phương Tiện Di Chuyển
  const [transportation, setTransportation] = useState<string>('');

  // 9. Hãng Hàng Không
  const [airline, setAirline] = useState<string>('');

  // 10. Ngân Sách Ước Tính / Khách
  const [budgetPerPerson, setBudgetPerPerson] = useState<string>('');

  // 11. Quy mô / Số khách
  const [guestCount, setGuestCount] = useState<string>('');

  // 12. Thông Tin Khách Hàng
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // 13. Lịch Trình Chi Tiết (Itinerary Builder)
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([
    {
      dayNumber: 1,
      title: '',
      activities: ''
    }
  ]);

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

  const getEffectiveCity = () => {
    if (selectedCityOption === 'custom') {
      return customCity.trim();
    }
    return selectedCityOption.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Vui lòng nhập Tên Tour bạn mong muốn thiết kế!');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Email để chuyên viên 4U liên hệ phê duyệt!');
      return;
    }

    setLoading(true);

    try {
      const parsedPrice = parseInt(budgetPerPerson.replace(/\D/g, ''), 10) || 0;
      const autoSlug = generateSlug(title);
      const finalCity = getEffectiveCity();

      // Representative photo
      const defaultHeroImages = [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1600&q=80',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1600&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80'
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
      if (finalCity) rawHighlights.push(`Điểm đến: ${finalCity}`);
      if (duration.trim()) rawHighlights.push(`Thời lượng: ${duration.trim()}`);
      if (hotel.trim()) rawHighlights.push(`Khách sạn / Resort: ${hotel.trim()}`);
      if (transportation.trim()) rawHighlights.push(`Phương tiện: ${transportation.trim()}`);
      if (airline.trim()) rawHighlights.push(`Hàng không: ${airline.trim()}`);
      if (guestCount.trim()) rawHighlights.push(`Số lượng khách: ${guestCount.trim()}`);
      const validHighlights = rawHighlights.length > 0 ? rawHighlights : ['--'];

      const newTourPayload = {
        title: title.trim(),
        slug: autoSlug,
        subtitle: `Tour thiết kế độc bản riêng cho khách hàng ${customerName.trim()}`,
        category: 'Retreat',
        categories: ['Retreat', 'retreat-khach-hang', 'custom-tour'],
        country: country.trim() || 'Việt Nam',
        city: finalCity || '--',
        region: region.trim() || '--',
        duration: duration.trim() || '--',
        durationDays: itineraryDays.length,
        departureDates: departureSchedule.trim() ? [departureSchedule.trim()] : ['--'],
        hotel: hotel.trim() || '--',
        transportation: transportation.trim() || '--',
        airline: airline.trim() || '--',
        price: parsedPrice,
        originalPrice: parsedPrice,
        heroImage: randomHero,
        isCustomer: true,           // 👤 Đánh dấu Tour do khách hàng đặt riêng
        isAdminApproved: false,      // 🛡️ Mặc định chờ Admin duyệt mới xuất bản lên Website
        itinerary: formattedItinerary,
        highlights: validHighlights,
        notes: [
          `Khách hàng: ${customerName.trim() || '--'}`,
          `Số điện thoại: ${customerPhone.trim() || '--'}`,
          `Email: ${customerEmail.trim() || '--'}`,
          `Ngân sách ước tính: ${budgetPerPerson.trim() || '--'}`,
          `Khách sạn mong muốn: ${hotel.trim() || '--'}`,
          `Phương tiện di chuyển: ${transportation.trim() || '--'}`,
          `Hãng hàng không: ${airline.trim() || '--'}`,
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
      console.error('[CustomerTourDesigner] Error saving custom tour:', err);
      alert(`Không thể tạo tour: ${err?.message || 'Có lỗi xảy ra, vui lòng thử lại sau!'}`);
    } finally {
      setLoading(false);
    }
  };

  // MÀN HÌNH THÀNH CÔNG (SUCCESS SCREEN)
  if (submitted) {
    return (
      <div style={{
        padding: '48px 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          backgroundColor: '#dcfce7',
          color: '#15803d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(22, 163, 74, 0.2)'
        }}>
          <CheckCircle2 size={42} />
        </div>

        <span style={{
          fontSize: '26px',
          fontWeight: 800,
          color: '#059669',
          marginBottom: '8px'
        }}>
          Bản thiết kế đã được tiếp nhận
        </span>


        <div style={{
          backgroundColor: 'transparent',
          border: '1px solid rgba(16, 32, 27, 0.15)',
          borderRadius: '14px',
          padding: '20px 24px',
          maxWidth: '580px',
          width: '100%',
          margin: '0 auto 24px auto',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
            <strong>Retreat thiết kế:</strong> <code style={{ color: '#0f766e', fontWeight: 700, backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' }}>{createdTourCode}</code>
          </div>
          <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
            <strong>Tên Retreat:</strong> {title}
          </div>
          <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
            <strong>Điểm Đến & Quốc Gia:</strong> {getEffectiveCity() || '--'} • {country || 'Việt Nam'}
          </div>
          <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
            <strong>Thời Lượng:</strong> {duration || '--'} • <strong>Khởi hành:</strong> {departureSchedule || '--'}
          </div>
          <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
            <strong>Khách Sạn & Phương Tiện:</strong> {hotel || '--'} • {transportation || '--'}
          </div>
          <div style={{ fontSize: '13.5px', color: '#475569', marginBottom: '8px' }}>
            <strong>Ngân sách ước tính:</strong> {budgetPerPerson.trim() || '--'}
          </div>

        </div>

        <p style={{
          fontSize: '14px',
          color: '#525a54',
          maxWidth: '580px',
          width: '100%',
          margin: '0 0 28px 0'
        }}>
          Cảm ơn Quý khách <strong>{customerName}</strong>.4U sẽ liên hệ Quý khách để xác nhận đặt Retreat trong 24 giờ
          .
        </p>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#10201B',
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '12px 32px',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 18px rgba(16, 32, 27, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Đóng Cửa Sổ</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <style>{`
        .custom-designer-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 9px;
          border: 1.5px solid rgba(16, 32, 27, 0.22);
          font-size: 13.5px;
          color: #10201B;
          outline: none;
          background-color: transparent;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .custom-designer-input:focus {
          border-color: #006d36;
          background-color: rgba(255, 255, 255, 0.25);
        }
        .custom-designer-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #10201B;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .custom-designer-card {
          background-color: transparent;
          border: 1px solid rgba(16, 32, 27, 0.12);
          border-radius: 14px;
          padding: 22px 24px;
          box-sizing: border-box;
        }
        .custom-designer-tag-btn {
          background-color: rgba(16, 32, 27, 0.05);
          color: #10201B;
          border: 1px solid rgba(16, 32, 27, 0.15);
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }
        .custom-designer-tag-btn:hover {
          background-color: rgba(16, 32, 27, 0.1);
          color: #10201B;
        }
        .custom-designer-tag-btn.active {
          background-color: #10201B;
          color: #ffffff;
          border-color: #10201B;
          font-weight: 700;
        }
      `}</style>


      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {/* ── KHỐI 1: THÔNG TIN TOUR & ĐỊA ĐIỂM ── */}
        <div className="custom-designer-card">
          <div style={{ marginBottom: '16px' }}>
            <label className="custom-designer-label" style={{ fontSize: '12.5px' }}>
              <Sparkles size={14} color="#059669" />
              <span>Tên Tour *</span>
            </label>
            <input
              type="text"
              required
              className="custom-designer-input"
              style={{ fontSize: '14.5px', fontWeight: 600, padding: '11px 14px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Kỳ nghỉ dưỡng tĩnh dưỡng & phục hồi năng lượng tại Sa Pa 3N2Đ..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {/* Quốc Gia (Country) */}
            <div>
              <label className="custom-designer-label">
                <Globe size={14} color="#059669" />
                <span>Quốc Gia (Country)</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Việt Nam (Vietnam)"
              />
            </div>

            {/* Phân Vùng Miền (Region) */}
            <div>
              <label className="custom-designer-label">
                <Tag size={14} color="#059669" />
                <span>Phân Vùng Miền (Region)</span>
              </label>
              <select
                className="custom-designer-input"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">-- Chọn Vùng Miền (hoặc để trống) --</option>
                <option value="Bắc Bộ">Bắc Bộ (Miền Bắc)</option>
                <option value="Trung Bộ">Trung Bộ (Miền Trung)</option>
                <option value="Nam Bộ">Nam Bộ (Miền Nam)</option>
                <option value="Tây Nguyên">Tây Nguyên</option>
                <option value="Đảo & Vùng Biển">Đảo & Vùng Biển</option>
              </select>
            </div>
          </div>

          {/* Thành Phố / Điểm Đến (City) */}
          <div style={{ marginTop: '16px' }}>
            <label className="custom-designer-label">
              <MapPin size={14} color="#059669" />
              <span>Thành Phố / Điểm Đến (City)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: selectedCityOption === 'custom' ? '1fr 1fr' : '1fr', gap: '12px' }}>
              <select
                className="custom-designer-input"
                value={selectedCityOption}
                onChange={(e) => setSelectedCityOption(e.target.value)}
              >
                <option value="">-- Chọn Điểm Đến Có Sẵn --</option>
                {PRESET_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="custom">✍️ Tự gõ địa danh khác...</option>
              </select>

              {selectedCityOption === 'custom' && (
                <input
                  type="text"
                  autoFocus
                  className="custom-designer-input"
                  placeholder="Gõ tên thành phố / địa danh mong muốn..."
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── KHỐI 2: THỜI LƯỢNG, LỊCH KHỞI HÀNH & NGHỈ DƯỠNG ── */}
        <div className="custom-designer-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>

            {/* Thời Lượng */}
            <div>
              <label className="custom-designer-label">
                <Clock size={14} color="#059669" />
                <span>Thời Lượng (Ví dụ: 3 Ngày 2 Đêm)</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Ví dụ: 3 Ngày 2 Đêm"
              />
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '6px' }}>
                {['2 Ngày 1 Đêm', '3 Ngày 2 Đêm', '4 Ngày 3 Đêm', '5 Ngày 4 Đêm'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`custom-designer-tag-btn ${duration === opt ? 'active' : ''}`}
                    onClick={() => setDuration(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Lịch Khởi Hành */}
            <div>
              <label className="custom-designer-label">
                <Calendar size={14} color="#059669" />
                <span>Lịch Khởi Hành (Ví dụ: Hằng tuần)</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={departureSchedule}
                onChange={(e) => setDepartureSchedule(e.target.value)}
                placeholder="Ví dụ: Hằng tuần, Thứ 6 Hằng Tuần, Ngày 15 Mỗi Tháng"
              />
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '6px' }}>
                {['Hằng tuần', 'Thứ 6 Hằng Tuần', 'Hằng ngày', 'Linh hoạt theo yêu cầu'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`custom-designer-tag-btn ${departureSchedule === opt ? 'active' : ''}`}
                    onClick={() => setDepartureSchedule(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Khách Sạn / Resort */}
            <div>
              <label className="custom-designer-label">
                <Building size={14} color="#059669" />
                <span>Khách Sạn / Resort</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                placeholder="Ví dụ: Edensee Lake Resort & Spa 5 Sao, Legacy Yên Tử..."
              />
            </div>

            {/* Phương Tiện Di Chuyển */}
            <div>
              <label className="custom-designer-label">
                <Car size={14} color="#059669" />
                <span>Phương Tiện Di Chuyển</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
                placeholder="Ví dụ: Xe Limousine VIP 4U 9 chỗ cao cấp"
              />
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '6px' }}>
                {['Xe Limousine VIP 9 chỗ', 'Xe riêng 7 chỗ đưa đón', 'Xe Universe 29 chỗ'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`custom-designer-tag-btn ${transportation === opt ? 'active' : ''}`}
                    onClick={() => setTransportation(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Hãng Hàng Không */}
            <div>
              <label className="custom-designer-label">
                <Plane size={14} color="#059669" />
                <span>Hãng Hàng Không</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                placeholder="Ví dụ: Vietnam Airlines, Bamboo Airways..."
              />
            </div>

            {/* Ngân Sách Ước Tính / Khách */}
            <div>
              <label className="custom-designer-label">
                <DollarSign size={14} color="#059669" />
                <span>Ngân Sách Ước Tính / Khách</span>
              </label>
              <input
                type="text"
                className="custom-designer-input"
                value={budgetPerPerson}
                onChange={(e) => handleBudgetChange(e.target.value)}
                placeholder="Ví dụ: 8.500.000 VNĐ, $500, 1.000 USD... (để trống: --)"
              />
              <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                {budgetPerPerson.trim() ? `Dự kiến: ${budgetPerPerson.trim()}` : 'Chưa nhập sẽ hiển thị: --'}
              </span>
            </div>
          </div>
        </div>

        {/* ── KHỐI 3: LỊCH TRÌNH CHI TIẾT (TIMELINE BUILDER) ── */}
        <div className="custom-designer-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '14.5px', color: '#081f13', fontWeight: 800 }}>
                Lịch Trình Chi Tiết
              </h4>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                Bạn nhập tiêu đề và hoạt động gì thì hiển thị nấy (chưa nhập sẽ hiển thị <code>--</code>).
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
                padding: '6px 13px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dcfce7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
            >
              <Plus size={14} />
              <span>+ Thêm Ngày</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {itineraryDays.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(16, 32, 27, 0.14)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <span
                      style={{
                        backgroundColor: '#10201B',
                        color: '#ffffff',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '5px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      NGÀY {item.dayNumber < 10 ? `0${item.dayNumber}` : item.dayNumber}
                    </span>
                    <input
                      type="text"
                      className="custom-designer-input"
                      style={{ padding: '7px 11px', fontSize: '13px', fontWeight: 600 }}
                      placeholder="Tiêu đề ngày (VD: Đón khách tại sân bay - Nhận phòng Resort...)"
                      value={item.title}
                      onChange={(e) => handleUpdateDay(index, 'title', e.target.value)}
                    />
                  </div>

                  {itineraryDays.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDay(index)}
                      title="Xóa ngày này"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <textarea
                  className="custom-designer-input"
                  rows={2}
                  style={{ resize: 'vertical', fontSize: '12.5px', lineHeight: 1.5 }}
                  placeholder="Mô tả chi tiết các hoạt động, bữa ăn, trải nghiệm thiền dưỡng trong ngày..."
                  value={item.activities}
                  onChange={(e) => handleUpdateDay(index, 'activities', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── KHỐI 4: THÔNG TIN LIÊN HỆ ĐẶT TOUR (ĐỂ ADMIN PHÊ DUYỆT) ── */}
        <div className="custom-designer-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Users size={16} color="#059669" />
            <h4 style={{ margin: 0, fontSize: '14px', color: '#081f13', fontWeight: 800 }}>
              Thông Tin Khách Hàng & Liên Hệ Phê Duyệt
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label className="custom-designer-label">Họ và tên *</label>
              <input
                type="text"
                required
                className="custom-designer-input"
                placeholder="Nguyễn Văn A"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div>
              <label className="custom-designer-label">Số điện thoại / Zalo *</label>
              <input
                type="tel"
                required
                className="custom-designer-input"
                placeholder="0912 345 678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="custom-designer-label">Email liên hệ *</label>
              <input
                type="email"
                required
                className="custom-designer-input"
                placeholder="email@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="custom-designer-label">Số lượng khách</label>
              <input
                type="text"
                className="custom-designer-input"
                placeholder="Ví dụ: 2 người lớn, 1 trẻ em"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label className="custom-designer-label">Ghi chú & Yêu cầu tĩnh dưỡng đặc biệt</label>
            <textarea
              className="custom-designer-input"
              rows={2}
              style={{ resize: 'vertical' }}
              placeholder="Yêu cầu chế độ ăn chay/thực dưỡng, giờ bay mong muốn, không gian riêng tư..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
            />
          </div>
        </div>

        {/* ── NÚT GỬI DUYỆT ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '11px 22px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Hủy Bỏ
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#10201B',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '8px',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(16, 32, 27, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#006d36')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#10201B')}
          >
            <span>{loading ? 'Đang Lưu Tour & Chờ Duyệt...' : 'Lưu Bản Thiết Kế'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
