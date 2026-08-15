import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { createTourApi } from '../services/apiService';
import { DESTINATIONS_DATA, Destination } from '../data/destinationsData';

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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDestName, setSelectedDestName] = useState<string>(initialDestination || 'Phú Yên');

  // Find matching destination or default
  const currentDest: Destination = DESTINATIONS_DATA.find(
    d =>
      d.name.toLowerCase() === selectedDestName.toLowerCase() ||
      d.slug.toLowerCase() === selectedDestName.toLowerCase() ||
      selectedDestName.toLowerCase().includes(d.name.toLowerCase())
  ) || DESTINATIONS_DATA[0];

  // Form State
  const [formData, setFormData] = useState({
    // 1. Customer contact
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    adultsCount: 2,
    childrenCount: 0,

    // 2. General Information
    title: '',
    slug: '',
    subtitle: '',
    category: 'Custom Retreat',
    categoriesText: 'Nature, Wellness, Heritage',
    country: 'Việt Nam',
    city: '',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,

    // 3. Pricing & Logistics
    price: 35000000,
    originalPrice: 40000000,
    childPrice: 15000000,
    infantPrice: 0,
    airline: 'Vietnam Airlines (Business Class)',
    hotel: '',
    transportation: 'Xe Limousine riêng đưa đón',

    // 4. Dynamic Lists
    highlights: [
      'Ăn tối riêng tư trên bãi biển lúc hoàng hôn',
      'Liệu trình spa trị liệu thảo mộc 60 phút'
    ],
    included: [
      'Vé máy bay khứ hồi theo tiêu chuẩn',
      'Resort cao cấp bao gồm bữa sáng hàng ngày',
      'Xe riêng đưa đón xuyên suốt hành trình'
    ],
    excluded: [
      'Chi phí cá nhân ngoài chương trình',
      'Đồ uống có cồn ngoài thực đơn phục vụ'
    ],

    // 5. Itinerary Days
    itinerary: [
      {
        day: 1,
        title: 'Đến nơi & Check-in Nghỉ Dưỡng',
        description: 'Xe đón quý khách tại sân bay/điểm hẹn và di chuyển về resort nhận phòng.',
        activitiesText: 'Đón sân bay, Nhận phòng villa, Ăn tối thực dưỡng tại nhà hàng Làng Chai'
      },
      {
        day: 2,
        title: 'Tĩnh Dưỡng & Khám Phá Trọn Vẹn',
        description: 'Thưởng thức bữa sáng bên bờ biển và tham gia các liệu trình chăm sóc Thân - Tâm - Trí.',
        activitiesText: 'Yoga sáng bình minh, Trải nghiệm spa thảo mộc, Thưởng trà hoàng hôn'
      }
    ]
  });

  // Switch destination handler
  const handleDestinationChange = (destName: string) => {
    setSelectedDestName(destName);
    const found = DESTINATIONS_DATA.find(
      d => d.name.toLowerCase() === destName.toLowerCase()
    ) || DESTINATIONS_DATA[0];

    setFormData(prev => ({
      ...prev,
      city: found.name,
      country: found.country || 'Việt Nam',
      title: `Trải nghiệm độc bản tại ${found.name}`,
      slug: `trai-nghiem-doc-ban-${found.slug}-${Date.now().toString().slice(-4)}`,
      subtitle: found.overview || `Hòa mình vào không gian tĩnh dưỡng nguyên bản tại ${found.name}.`,
      hotel: `${found.name} Luxury Sanctuary Resort & Villa`
    }));
  };

  // Lock background scrolling and populate data when modal opens or destination changes
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const initialName = initialDestination || 'Phú Yên';
      setSelectedDestName(initialName);

      const found = DESTINATIONS_DATA.find(
        d =>
          d.name.toLowerCase() === initialName.toLowerCase() ||
          d.slug.toLowerCase() === initialName.toLowerCase() ||
          initialName.toLowerCase().includes(d.name.toLowerCase())
      ) || DESTINATIONS_DATA[0];

      setFormData(prev => ({
        ...prev,
        city: found.name,
        country: found.country || 'Việt Nam',
        title: `Trải nghiệm độc bản tại ${found.name}`,
        slug: `trai-nghiem-doc-ban-${found.slug}-${Date.now().toString().slice(-4)}`,
        subtitle: found.overview || `Hòa mình vào không gian tĩnh dưỡng nguyên bản tại ${found.name}.`,
        hotel: `${found.name} Luxury Sanctuary Resort & Villa`
      }));

      return () => {
        document.body.style.overflow = originalBodyOverflow || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
      };
    }
  }, [isOpen, initialDestination]);

  if (!isOpen) return null;

  // Handlers for dynamic lists
  const handleAddHighlight = () => {
    setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
  };

  const handleUpdateHighlight = (index: number, val: string) => {
    setFormData(prev => {
      const copy = [...prev.highlights];
      copy[index] = val;
      return { ...prev, highlights: copy };
    });
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleAddIncluded = () => {
    setFormData(prev => ({ ...prev, included: [...prev.included, ''] }));
  };

  const handleUpdateIncluded = (index: number, val: string) => {
    setFormData(prev => {
      const copy = [...prev.included];
      copy[index] = val;
      return { ...prev, included: copy };
    });
  };

  const handleRemoveIncluded = (index: number) => {
    setFormData(prev => ({
      ...prev,
      included: prev.included.filter((_, i) => i !== index)
    }));
  };

  // Handlers for Itinerary Days
  const handleAddDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: `Ngày ${prev.itinerary.length + 1}: Trải Nghiệm Mới`,
          description: 'Các hoạt động khám phá và phục hồi năng lượng.',
          activitiesText: 'Bữa sáng dinh dưỡng, Hoạt động thư giãn tự do, Tiễn đoàn'
        }
      ]
    }));
  };

  const handleUpdateDay = (index: number, field: string, val: string) => {
    setFormData(prev => {
      const copy = [...prev.itinerary];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, itinerary: copy };
    });
  };

  const handleRemoveDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((item, idx) => ({ ...item, day: idx + 1 }))
    }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại / Zalo để khởi tạo lịch trình.');
      return;
    }

    setLoading(true);

    try {
      const categoriesArray = formData.categoriesText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const notesList = [
        `Khách hàng: ${formData.customerName.trim()}`,
        `SĐT/Zalo: ${formData.customerPhone.trim()}`,
        `Email: ${formData.customerEmail.trim() || '--'}`,
        `Số lượng: ${formData.adultsCount} người lớn, ${formData.childrenCount} trẻ em`
      ];

      const cleanHighlights = formData.highlights.filter(h => h.trim());
      const cleanIncluded = formData.included.filter(i => i.trim());
      const cleanExcluded = formData.excluded.filter(e => e.trim());

      const formattedItinerary = formData.itinerary.map(item => ({
        day: item.day,
        title: item.title.trim() || `Ngày ${item.day}`,
        description: item.description.trim() || '--',
        image: '',
        activities: item.activitiesText
          ? item.activitiesText.split(',').map(a => a.trim()).filter(Boolean)
          : []
      }));

      const tourPayload: any = {
        slug: formData.slug.trim() || `tour-custom-${Date.now()}`,
        title: formData.title.trim() || `Retreat ${formData.city}`,
        subtitle: formData.subtitle.trim() || '--',
        category: formData.category || 'Custom Retreat',
        categories: categoriesArray.length > 0 ? categoriesArray : ['Custom Retreat', 'Doc-Quyen'],
        country: formData.country || 'Việt Nam',
        city: formData.city || currentDest.name,
        duration: formData.duration || '3 Ngày 2 Đêm',
        durationDays: Number(formData.durationDays) || 3,
        price: Number(formData.price) || 0,
        originalPrice: Number(formData.originalPrice) || Number(formData.price) || 0,
        childPrice: Number(formData.childPrice) || 0,
        infantPrice: Number(formData.infantPrice) || 0,
        airline: formData.airline.trim() || '--',
        hotel: formData.hotel.trim() || '--',
        transportation: formData.transportation.trim() || '--',
        departureDates: ['2026-09-15', '2026-10-01'],
        highlights: cleanHighlights.length > 0 ? cleanHighlights : ['--'],
        included: cleanIncluded.length > 0 ? cleanIncluded : ['--'],
        excluded: cleanExcluded.length > 0 ? cleanExcluded : ['--'],
        notes: notesList,
        itinerary: formattedItinerary,
        heroImage: currentDest.heroImage || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600',
        gallery: [currentDest.heroImage],
        isCustomer: true,
        isAdminApproved: false,
        rating: 5.0,
        reviewsCount: 1
      };

      await createTourApi(tourPayload);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lỗi lưu lịch trình tour custom:', err);
      alert(`Đã xảy ra lỗi khi tạo lịch trình: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
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
          handleResetAndClose();
        }
      }}
    >
      <style>{`
        .custom-journey-input {
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
        .custom-journey-input:focus {
          border-bottom-color: #006d36;
        }
        .custom-journey-label {
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

      {/* MODAL CONTAINER (MATCHING EXACT SAGE GREEN #e5efe8 CONCEPT) */}
      <div
        style={{
          backgroundColor: '#e5efe8',
          color: '#10201B',
          width: '100%',
          maxWidth: '920px',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          boxShadow: '0 25px 80px rgba(16, 32, 27, 0.45)',
          position: 'relative',
          borderRadius: '16px',
          border: '1px solid rgba(16, 32, 27, 0.1)',
          fontFamily: "'Work Sans', 'Plus Jakarta Sans', sans-serif",
          margin: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(229, 239, 232, 0.9)',
            border: '1px solid rgba(16, 32, 27, 0.15)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
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
          <X size={20} color="#10201B" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* ── MODAL HEADER BANNER (ASPECT 21/9) ── */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '21 / 9', overflow: 'hidden' }}>
              <img
                src={currentDest.heroImage}
                alt={currentDest.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(16,32,27,0.15) 0%, rgba(229,239,232,0.96) 100%)'
                }}
              />
            </div>

            {/* Header Content Details & Destination Selector */}
            <div style={{ padding: '0 48px 32px', borderBottom: '1px solid rgba(16, 32, 27, 0.12)', marginTop: '-24px', position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#527059',
                  display: 'block'
                }}>
                  Thiết Kế Lịch Trình Riêng
                </span>

                {/* DESTINATION QUICK SELECTOR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color="#10201B" />
                  <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#10201B' }}>
                    Chọn Điểm Đến:
                  </span>
                  <select
                    value={selectedDestName}
                    onChange={e => handleDestinationChange(e.target.value)}
                    style={{
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#d8e5dc',
                      border: '1.5px solid #10201B',
                      borderRadius: '6px',
                      color: '#10201B',
                      cursor: 'pointer',
                      outline: 'none',
                      fontFamily: "'Work Sans', sans-serif"
                    }}
                  >
                    {DESTINATIONS_DATA.map((dest) => (
                      <option key={dest.slug} value={dest.name}>
                        {dest.name} ({dest.region})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <h2 style={{
                fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 46px)',
                fontWeight: 400,
                color: '#10201B',
                margin: '4px 0 6px 0',
                lineHeight: 1.15
              }}>
                {currentDest.name}
              </h2>

              <p style={{
                fontSize: '16px',
                color: '#405246',
                margin: 0,
                fontWeight: 500
              }}>
                {currentDest.region}, {currentDest.country}
              </p>
            </div>

            {/* ── MODAL FORM BODY ── */}
            <div style={{ padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: '48px' }}>

              {/* 1. CUSTOMER CONTACT INFO */}
              <div>
                <h3 style={{
                  fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#10201B',
                  margin: '0 0 24px 0',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(16, 32, 27, 0.12)'
                }}>
                  Thông Tin Khách Hàng (Customer Details)
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px 32px' }}>
                  <div>
                    <label className="custom-journey-label">Họ và tên quý khách *</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      placeholder="Nguyễn Văn A"
                      required
                      value={formData.customerName}
                      onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      className="custom-journey-input"
                      placeholder="0912 345 678"
                      required
                      value={formData.customerPhone}
                      onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Email liên hệ</label>
                    <input
                      type="email"
                      className="custom-journey-input"
                      placeholder="email@example.com"
                      value={formData.customerEmail}
                      onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Số lượng khách (Người lớn / Trẻ em)</label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <input
                        type="number"
                        min="1"
                        className="custom-journey-input"
                        title="Người lớn"
                        value={formData.adultsCount}
                        onChange={e => setFormData({ ...formData, adultsCount: Number(e.target.value) })}
                      />
                      <input
                        type="number"
                        min="0"
                        className="custom-journey-input"
                        title="Trẻ em"
                        value={formData.childrenCount}
                        onChange={e => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. GENERAL INFORMATION */}
              <div>
                <h3 style={{
                  fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#10201B',
                  margin: '0 0 24px 0',
                  paddingBottom: '12px',
                  borderBottom: '1px solid rgba(16, 32, 27, 0.12)'
                }}>
                  General Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px 32px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="custom-journey-label">Tên hành trình (Title)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Slug</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.slug}
                      onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 3' }}>
                    <label className="custom-journey-label">Tiêu đề phụ (Subtitle)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.subtitle}
                      onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Danh mục (Category)</label>
                    <select
                      className="custom-journey-input"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <option value="Custom Retreat">Custom Retreat</option>
                      <option value="Wellness Journey">Wellness Journey</option>
                      <option value="Culinary Exploration">Culinary Exploration</option>
                      <option value="Heritage Sanctuary">Heritage Sanctuary</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="custom-journey-label">Các danh mục phụ (Categories)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.categoriesText}
                      onChange={e => setFormData({ ...formData, categoriesText: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Quốc gia (Country)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Điểm đến / Thành phố (City)</label>
                    <select
                      className="custom-journey-input"
                      value={formData.city}
                      onChange={e => handleDestinationChange(e.target.value)}
                      style={{ backgroundColor: 'transparent' }}
                    >
                      {DESTINATIONS_DATA.map((dest) => (
                        <option key={dest.slug} value={dest.name}>
                          {dest.name} — {dest.region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="custom-journey-label">Thời lượng (Duration)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* 3. HIGHLIGHTS */}
              <div style={{ borderTop: '1px solid rgba(16, 32, 27, 0.12)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} color="#10201B" />
                    <h3 style={{
                      fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#10201B',
                      margin: 0
                    }}>
                      Điểm Nổi Bật / Trải Nghiệm Đặc Quyền
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    style={{
                      background: 'transparent',
                      color: '#10201B',
                      border: '1.5px solid #10201B',
                      padding: '8px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      borderRadius: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#10201B';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#10201B';
                    }}
                  >
                    <Plus size={14} /> Thêm Điểm Nổi Bật
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formData.highlights.map((h, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="text"
                        className="custom-journey-input"
                        value={h}
                        placeholder="Nhập điểm nổi bật trải nghiệm..."
                        onChange={e => handleUpdateHighlight(idx, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', padding: '6px' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ba1a1a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#666'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. INCLUDED SERVICES */}
              <div style={{ borderTop: '1px solid rgba(16, 32, 27, 0.12)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={20} color="#10201B" />
                    <h3 style={{
                      fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#10201B',
                      margin: 0
                    }}>
                      Dịch Vụ Bao Gồm (Included)
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddIncluded}
                    style={{
                      background: 'transparent',
                      color: '#10201B',
                      border: '1.5px solid #10201B',
                      padding: '8px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      borderRadius: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#10201B';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#10201B';
                    }}
                  >
                    <Plus size={14} /> Thêm Dịch Vụ
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formData.included.map((inc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="text"
                        className="custom-journey-input"
                        value={inc}
                        placeholder="Nhập dịch vụ bao gồm..."
                        onChange={e => handleUpdateIncluded(idx, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveIncluded(idx)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', padding: '6px' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ba1a1a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#666'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. PRICING & LOGISTICS */}
              <div style={{ borderTop: '1px solid rgba(16, 32, 27, 0.12)', paddingTop: '32px' }}>
                <h3 style={{
                  fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#10201B',
                  margin: '0 0 24px 0'
                }}>
                  Pricing & Logistics
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px 32px' }}>
                  <div>
                    <label className="custom-journey-label">Giá dự kiến (Price VNĐ)</label>
                    <input
                      type="number"
                      className="custom-journey-input"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Giá gốc (Original Price)</label>
                    <input
                      type="number"
                      className="custom-journey-input"
                      value={formData.originalPrice}
                      onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Giá trẻ em</label>
                    <input
                      type="number"
                      className="custom-journey-input"
                      value={formData.childPrice}
                      onChange={e => setFormData({ ...formData, childPrice: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="custom-journey-label">Giá em bé</label>
                    <input
                      type="number"
                      className="custom-journey-input"
                      value={formData.infantPrice}
                      onChange={e => setFormData({ ...formData, infantPrice: Number(e.target.value) })}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="custom-journey-label">Hàng không (Airline)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.airline}
                      onChange={e => setFormData({ ...formData, airline: e.target.value })}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="custom-journey-label">Khách sạn / Resort (Hotel)</label>
                    <input
                      type="text"
                      className="custom-journey-input"
                      value={formData.hotel}
                      onChange={e => setFormData({ ...formData, hotel: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* 6. ITINERARY DAYS */}
              <div style={{ borderTop: '1px solid rgba(16, 32, 27, 0.12)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{
                    fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#10201B',
                    margin: 0
                  }}>
                    Itinerary Days
                  </h3>

                  <button
                    type="button"
                    onClick={handleAddDay}
                    style={{
                      background: 'transparent',
                      color: '#10201B',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={16} /> Add Day
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {formData.itinerary.map((dayItem, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#d8e5dc',
                        padding: '24px 32px',
                        border: '1px solid rgba(16, 32, 27, 0.15)',
                        borderRadius: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexGrow: 1 }}>
                          <span style={{
                            fontFamily: "'Libre Caslon Text', Georgia, serif",
                            fontSize: '36px',
                            color: '#10201B',
                            opacity: 0.3,
                            fontWeight: 700,
                            lineHeight: 1
                          }}>
                            {String(dayItem.day).padStart(2, '0')}
                          </span>

                          <input
                            type="text"
                            style={{
                              fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                              fontSize: '20px',
                              color: '#10201B',
                              background: 'transparent',
                              border: 'none',
                              borderBottom: '1.5px solid rgba(16,32,27,0.3)',
                              outline: 'none',
                              width: '100%',
                              paddingBottom: '4px'
                            }}
                            value={dayItem.title}
                            onChange={e => handleUpdateDay(idx, 'title', e.target.value)}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveDay(idx)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', padding: '4px' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ba1a1a'}
                          onMouseLeave={e => e.currentTarget.style.color = '#666'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div>
                          <label className="custom-journey-label">Mô tả chi tiết</label>
                          <textarea
                            rows={2}
                            className="custom-journey-input"
                            style={{ resize: 'none' }}
                            value={dayItem.description}
                            onChange={e => handleUpdateDay(idx, 'description', e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="custom-journey-label">Hoạt động chính (Activities, phân tách bằng dấu phẩy)</label>
                          <input
                            type="text"
                            className="custom-journey-input"
                            value={dayItem.activitiesText}
                            onChange={e => handleUpdateDay(idx, 'activitiesText', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── MODAL STICKY FOOTER (CONFIRM & SAVE) ── */}
            <div
              style={{
                position: 'sticky',
                bottom: 0,
                zIndex: 20,
                backgroundColor: '#e5efe8',
                borderTop: '1px solid rgba(16, 32, 27, 0.12)',
                padding: '24px 48px',
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
                  padding: '16px 36px',
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
                <span>{loading ? 'Đang Lưu Lịch Trình...' : 'Confirm & Save'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS SCREEN */
          <div style={{ padding: '80px 48px', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#1E4A3D',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 10px 25px rgba(30,74,61,0.3)'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h2
              style={{
                fontFamily: "'Libre Caslon Text', 'Playfair Display', Georgia, serif",
                fontSize: '36px',
                fontWeight: 400,
                color: '#10201B',
                margin: '0 0 16px 0'
              }}
            >
              Lịch Trình Đã Được Khởi Tạo Thành Công
            </h2>

            <p
              style={{
                fontSize: '16px',
                color: '#405246',
                maxWidth: '600px',
                margin: '0 auto 36px auto',
                lineHeight: 1.7
              }}
            >
              Yêu cầu lịch trình cá nhân hóa cho quý khách <strong style={{ color: '#10201B' }}>{formData.customerName}</strong> tại <strong style={{ color: '#10201B' }}>{formData.city}</strong> đã được lưu thành công trên hệ thống. Đội ngũ chuyên viên của 4U sẽ liên hệ sớm nhất qua SĐT <strong style={{ color: '#10201B' }}>{formData.customerPhone}</strong> để tư vấn chi tiết.
            </p>

            <button
              type="button"
              onClick={handleResetAndClose}
              style={{
                backgroundColor: '#1E4A3D',
                color: '#ffffff',
                border: 'none',
                padding: '14px 36px',
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
  );
}
