import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Heart,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Plus,
  Trash2,
  Image as ImageIcon,
  Building,
  Plane,
  Car,
  FileText,
  Clock,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { createTourApi } from '../services/apiService';

interface CreateCustomTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample presets for optional quick image selection
const PRESET_IMAGES = [
  { name: 'Đà Lạt Rừng Thông', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200' },
  { name: 'Vịnh Hạ Long 5*', url: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200' },
  { name: 'Phú Quốc Biển Xanh', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200' },
  { name: 'Sapa Ruộng Bậc Thang', url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200' },
  { name: 'Hội An Đèn Lồng', url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200' },
  { name: 'Ninh Bình Non Nước', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200' },
];

export default function CreateCustomTourModal({ isOpen, onClose }: CreateCustomTourModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'logistics' | 'highlights' | 'itinerary' | 'media'>('info');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Clean Form State WITHOUT ANY HARDCODED PRE-FILLED DEFAULT TEXT
  const [formData, setFormData] = useState({
    // 1. Contact & Customer info
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    adultsCount: 1,
    childrenCount: 0,

    // 2. Basic Tour Details
    title: '',
    subtitle: '',
    category: 'Custom Retreat',
    country: 'Việt Nam',
    city: 'Đà Lạt',
    duration: '3 Ngày 2 Đêm',
    durationDays: 3,
    price: '',
    originalPrice: '',
    childPrice: '',
    infantPrice: '',

    // 3. Transportation & Resort
    airline: '',
    hotel: '',
    transportation: '',
    departureDates: [] as string[],

    // 4. Highlights & Included/Excluded
    highlights: [] as string[],
    included: [] as string[],
    excluded: [] as string[],

    // 5. Daily Itinerary (Array of Days)
    itinerary: [] as Array<{ day: number; title: string; description: string; image: string; activities: string[] }>,

    // 6. Media & Notes
    heroImage: '',
    gallery: [] as string[],
    specialRequirements: '',
  });

  if (!isOpen) return null;

  // Helper functions to manage dynamic array items
  const handleAddArrayItem = (field: 'highlights' | 'included' | 'excluded' | 'departureDates' | 'gallery', defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const handleUpdateArrayItem = (field: 'highlights' | 'included' | 'excluded' | 'departureDates' | 'gallery', index: number, value: string) => {
    setFormData(prev => {
      const copy = [...prev[field]];
      copy[index] = value;
      return { ...prev, [field]: copy };
    });
  };

  const handleRemoveArrayItem = (field: 'highlights' | 'included' | 'excluded' | 'departureDates' | 'gallery', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Itinerary Handlers
  const handleAddItineraryDay = () => {
    setFormData(prev => {
      const nextDayNum = prev.itinerary.length + 1;
      return {
        ...prev,
        itinerary: [
          ...prev.itinerary,
          {
            day: nextDayNum,
            title: ``,
            description: '',
            image: '',
            activities: []
          }
        ]
      };
    });
  };

  const handleUpdateItineraryDay = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const copy = [...prev.itinerary];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, itinerary: copy };
    });
  };

  const handleRemoveItineraryDay = (index: number) => {
    setFormData(prev => {
      const copy = prev.itinerary.filter((_, i) => i !== index).map((dayObj, i) => ({
        ...dayObj,
        day: i + 1
      }));
      return { ...prev, itinerary: copy };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại / Zalo để khởi tạo lịch trình.');
      setActiveTab('info');
      return;
    }

    setLoading(true);

    try {
      const slug = `tour-custom-${Date.now()}`;
      
      // Strict Check: No default pre-filled string fallbacks! Blank fields default strictly to '--'
      const tourTitle = formData.title.trim() || `Retreat Riêng Tôi - ${formData.city} (${formData.duration})`;
      const tourSubtitle = formData.subtitle.trim() || '--';

      const notesList = [
        `Khách hàng: ${formData.customerName.trim()}`,
        `SĐT/Zalo: ${formData.customerPhone.trim()}`,
        `Email: ${formData.customerEmail.trim() || '--'}`,
        `Số lượng: ${formData.adultsCount} người lớn, ${formData.childrenCount} trẻ em`,
        `Ghi chú đặc biệt: ${formData.specialRequirements.trim() || '--'}`
      ];

      const cleanHighlights = formData.highlights.filter(h => h.trim());
      const cleanIncluded = formData.included.filter(i => i.trim());
      const cleanExcluded = formData.excluded.filter(e => e.trim());
      const cleanDepartureDates = formData.departureDates.filter(d => d.trim());
      const cleanGallery = formData.gallery.filter(g => g.trim());

      const tourPayload: any = {
        slug,
        title: tourTitle,
        subtitle: tourSubtitle,
        category: formData.category || 'Custom Retreat',
        categories: [formData.category || 'Custom Retreat', 'Doc-Quyen', 'Custom Retreat'],
        country: formData.country || 'Việt Nam',
        city: formData.city || 'Đà Lạt',
        duration: formData.duration || '3 Ngày 2 Đêm',
        durationDays: Number(formData.durationDays) || 3,
        price: Number(formData.price) || 0,
        originalPrice: Number(formData.originalPrice) || Number(formData.price) || 0,
        childPrice: Number(formData.childPrice) || 0,
        infantPrice: Number(formData.infantPrice) || 0,
        airline: formData.airline.trim() || '--',
        hotel: formData.hotel.trim() || '--',
        transportation: formData.transportation.trim() || '--',
        departureDates: cleanDepartureDates.length > 0 ? cleanDepartureDates : ['--'],
        highlights: cleanHighlights.length > 0 ? cleanHighlights : ['--'],
        included: cleanIncluded.length > 0 ? cleanIncluded : ['--'],
        excluded: cleanExcluded.length > 0 ? cleanExcluded : ['--'],
        notes: notesList,
        itinerary: formData.itinerary.map(day => ({
          ...day,
          title: day.title.trim() || `--`,
          description: day.description.trim() || '--',
          image: day.image.trim() || '',
        })),
        heroImage: formData.heroImage.trim() || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200',
        gallery: cleanGallery,
        isCustomer: true,
        isAdminApproved: false,
        rating: 5.0,
        reviewsCount: 1,
      };

      await createTourApi(tourPayload);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lỗi khởi tạo tour custom:', err);
      alert(`Đã xảy ra lỗi khi tạo tour: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setActiveTab('info');
    setFormData({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      adultsCount: 1,
      childrenCount: 0,
      title: '',
      subtitle: '',
      category: 'Custom Retreat',
      country: 'Việt Nam',
      city: 'Đà Lạt',
      duration: '3 Ngày 2 Đêm',
      durationDays: 3,
      price: '',
      originalPrice: '',
      childPrice: '',
      infantPrice: '',
      airline: '',
      hotel: '',
      transportation: '',
      departureDates: [],
      highlights: [],
      included: [],
      excluded: [],
      itinerary: [],
      heroImage: '',
      gallery: [],
      specialRequirements: '',
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(3, 10, 6, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          backgroundColor: '#0c1611',
          color: '#ffffff',
          borderRadius: '28px',
          border: '1px solid rgba(74, 222, 128, 0.25)',
          boxShadow: '0 30px 80px -15px rgba(0,0,0,0.9), 0 0 50px rgba(74, 222, 128, 0.15)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: 'rgba(74, 222, 128, 0.15)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4ade80',
              }}
            >
              <Sparkles size={24} />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', margin: 0, fontWeight: 700, color: '#ffffff' }}>
                Tạo Lịch Trình Tour Độc Bản Cho Riêng Tôi
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>
                Tự do nhập thông tin tour (Trường để trống sẽ mặc định hiển thị --)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Tab Navigation Menu */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 24px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'info', label: '1. Thông Tin & Điểm Đến', icon: MapPin },
                { id: 'logistics', label: '2. Resort & Phương Tiện', icon: Building },
                { id: 'highlights', label: '3. Nổi Bật & Dịch Vụ', icon: Heart },
                { id: 'itinerary', label: '4. Lịch Trình Từng Ngày', icon: Calendar },
                { id: 'media', label: '5. Hình Ảnh & Ghi Chú', icon: ImageIcon },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#ffffff' : '#94a3b8',
                      backgroundColor: isActive ? 'rgba(74, 222, 128, 0.2)' : 'transparent',
                      border: isActive ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={16} style={{ color: isActive ? '#4ade80' : 'inherit' }} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Form Content Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {/* TAB 1: INFO & CUSTOMER */}
              {activeTab === 'info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ backgroundColor: 'rgba(74, 222, 128, 0.05)', border: '1px solid rgba(74, 222, 128, 0.15)', borderRadius: '16px', padding: '16px 20px' }}>
                    <h3 style={{ fontSize: '15px', color: '#4ade80', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={18} /> Thông Tin Người Yêu Cầu
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Họ & Tên Khách Hàng *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A..."
                          value={formData.customerName}
                          onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Số Điện Thoại / Zalo *</label>
                        <input
                          type="text"
                          required
                          placeholder="090 123 4567..."
                          value={formData.customerPhone}
                          onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Email (Tùy chọn)</label>
                        <input
                          type="email"
                          placeholder="Để trống sẽ hiển thị --"
                          value={formData.customerEmail}
                          onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={18} style={{ color: '#4ade80' }} /> Thông Tin Tour Tổng Quan
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Tên Lịch Trình Tour</label>
                        <input
                          type="text"
                          placeholder="vd: Retreat Tĩnh Tại & Thiền Định (Để trống sẽ tự tạo tên theo điểm đến)"
                          value={formData.title}
                          onChange={e => setFormData({ ...formData, title: e.target.value })}
                          style={{ width: '100%', padding: '11px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Khẩu Hiệu / Điểm Nhấn Ngắn</label>
                        <input
                          type="text"
                          placeholder="Để trống sẽ hiển thị --"
                          value={formData.subtitle}
                          onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Điểm Đến (Thành phố)</label>
                          <select
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0d1710', color: '#fff', fontSize: '14px', outline: 'none' }}
                          >
                            {['Đà Lạt', 'Vịnh Hạ Long', 'Phú Quốc', 'Sapa', 'Hội An', 'Nha Trang', 'Ninh Bình', 'Quy Nhơn', 'Côn Đảo', 'Huế'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Thời Lượng</label>
                          <select
                            value={formData.duration}
                            onChange={e => {
                              const dur = e.target.value;
                              const days = parseInt(dur) || 3;
                              setFormData({ ...formData, duration: dur, durationDays: days });
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0d1710', color: '#fff', fontSize: '14px', outline: 'none' }}
                          >
                            {['2 Ngày 1 Đêm', '3 Ngày 2 Đêm', '4 Ngày 3 Đêm', '5 Ngày 4 Đêm', '7 Ngày 6 Đêm'].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Thể Loại Tour</label>
                          <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0d1710', color: '#fff', fontSize: '14px', outline: 'none' }}
                          >
                            {['Custom Retreat', 'Luxury', 'Chữa Lành', 'Bảo Tồn', 'Thiên Nhiên', 'Gia Đình'].map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Số Người Lớn</label>
                          <input
                            type="number"
                            min="1"
                            max="50"
                            value={formData.adultsCount}
                            onChange={e => setFormData({ ...formData, adultsCount: Number(e.target.value) })}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Số Trẻ Em</label>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={formData.childrenCount}
                            onChange={e => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: LOGISTICS & PRICING */}
              {activeTab === 'logistics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building size={18} style={{ color: '#4ade80' }} /> Lưu Trú & Phương Tiện Di Chuyển
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Tên Khách Sạn / Resort 5 Sao</label>
                        <input
                          type="text"
                          placeholder="Để trống sẽ hiển thị --"
                          value={formData.hotel}
                          onChange={e => setFormData({ ...formData, hotel: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Vé Máy Bay / Hãng Bay</label>
                          <input
                            type="text"
                            placeholder="Để trống sẽ hiển thị --"
                            value={formData.airline}
                            onChange={e => setFormData({ ...formData, airline: e.target.value })}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Phương Tiện Đi Lại Tại Điểm Đến</label>
                          <input
                            type="text"
                            placeholder="Để trống sẽ hiển thị --"
                            value={formData.transportation}
                            onChange={e => setFormData({ ...formData, transportation: e.target.value })}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign size={18} style={{ color: '#4ade80' }} /> Bảng Giá Ngân Sách Dự Kiến (VNĐ)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Giá Người Lớn (VNĐ)</label>
                        <input
                          type="number"
                          step="100000"
                          placeholder="Chưa nhập (hiển thị --)"
                          value={formData.price}
                          onChange={e => setFormData({ ...formData, price: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.3)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#4ade80', fontSize: '15px', fontWeight: 700, outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Giá Niêm Yết Gốc (VNĐ)</label>
                        <input
                          type="number"
                          step="100000"
                          placeholder="Chưa nhập (hiển thị --)"
                          value={formData.originalPrice}
                          onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Giá Trẻ Em (VNĐ)</label>
                        <input
                          type="number"
                          step="100000"
                          placeholder="Chưa nhập (hiển thị --)"
                          value={formData.childPrice}
                          onChange={e => setFormData({ ...formData, childPrice: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: HIGHLIGHTS & INCLUDED/EXCLUDED */}
              {activeTab === 'highlights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Highlights List */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '15px', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Heart size={18} style={{ color: '#4ade80' }} /> Điểm Nổi Bật / Trải Nghiệm Đặc Quyền
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem('highlights')}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', backgroundColor: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        <Plus size={14} /> Thêm Điểm Nổi Bật
                      </button>
                    </div>
                    {formData.highlights.length === 0 ? (
                      <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', padding: '12px', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                        Chưa có mục nào (Nếu để trống sẽ hiển thị -- khi xem chi tiết)
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {formData.highlights.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                              type="text"
                              value={item}
                              onChange={e => handleUpdateArrayItem('highlights', idx, e.target.value)}
                              placeholder={`Nhập nội dung... (để trống sẽ bỏ qua)`}
                              style={{ flex: 1, padding: '9px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '13px', outline: 'none' }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('highlights', idx)}
                              style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.15)', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Included List */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '15px', color: '#4ade80', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={18} /> Dịch Vụ Bao Gồm (Included)
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleAddArrayItem('included')}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', backgroundColor: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        <Plus size={14} /> Thêm Dịch Vụ
                      </button>
                    </div>
                    {formData.included.length === 0 ? (
                      <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', padding: '12px', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                        Chưa có mục nào (Nếu để trống sẽ hiển thị -- khi xem chi tiết)
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {formData.included.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                              type="text"
                              value={item}
                              onChange={e => handleUpdateArrayItem('included', idx, e.target.value)}
                              placeholder={`Dịch vụ bao gồm ${idx + 1}...`}
                              style={{ flex: 1, padding: '9px 14px', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.2)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '13px', outline: 'none' }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('included', idx)}
                              style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.15)', border: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: DETAILED ITINERARY */}
              {activeTab === 'itinerary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                        Lịch Trình Chi Tiết Từng Ngày ({formData.itinerary.length} Ngày)
                      </h3>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                        Thêm các ngày để soạn lịch trình (Để trống tiêu đề ngày sẽ hiển thị --)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddItineraryDay}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', backgroundColor: '#4ade80', color: '#09140d', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                    >
                      <Plus size={16} /> Thêm Ngày Mới
                    </button>
                  </div>

                  {formData.itinerary.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '16px', color: '#94a3b8', fontSize: '14px' }}>
                      Chưa có ngày lịch trình nào được khởi tạo. Nhấn nút <strong>"Thêm Ngày Mới"</strong> ở trên để thêm lịch trình từng ngày.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {formData.itinerary.map((dayObj, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '18px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px',
                            position: 'relative',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 800, color: '#4ade80', backgroundColor: 'rgba(74,222,128,0.15)', padding: '4px 12px', borderRadius: '20px' }}>
                              Ngày {dayObj.day}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItineraryDay(idx)}
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.15)', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer' }}
                            >
                              <Trash2 size={14} /> Xóa Ngày Này
                            </button>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Tiêu Đề Ngày {dayObj.day}</label>
                            <input
                              type="text"
                              value={dayObj.title}
                              onChange={e => handleUpdateItineraryDay(idx, 'title', e.target.value)}
                              placeholder="Để trống sẽ hiển thị --"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Mô Tả Tổng Quan Hoạt Động Trong Ngày</label>
                            <textarea
                              rows={2}
                              value={dayObj.description}
                              onChange={e => handleUpdateItineraryDay(idx, 'description', e.target.value)}
                              placeholder="Để trống sẽ hiển thị --"
                              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: MEDIA & NOTES */}
              {activeTab === 'media' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ImageIcon size={18} style={{ color: '#4ade80' }} /> Ảnh Bìa (Hero Image URL)
                    </h3>
                    <input
                      type="text"
                      value={formData.heroImage}
                      onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                      placeholder="Nhập URL ảnh hoặc chọn mẫu bên dưới..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '13px', outline: 'none', marginBottom: '12px' }}
                    />

                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Gợi ý mẫu ảnh đẹp:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                      {PRESET_IMAGES.map((preset, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => setFormData({ ...formData, heroImage: preset.url })}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: formData.heroImage === preset.url ? '2px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
                            position: 'relative',
                            height: '75px',
                          }}
                        >
                          <img src={preset.url} alt={preset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '4px 6px', display: 'flex', alignItems: 'flex-end', fontSize: '10px', fontWeight: 600, color: '#fff' }}>
                            {preset.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={18} style={{ color: '#4ade80' }} /> Yêu Cầu Ghi Chú Đặc Biệt Khác
                    </h3>
                    <textarea
                      rows={3}
                      value={formData.specialRequirements}
                      onChange={e => setFormData({ ...formData, specialRequirements: e.target.value })}
                      placeholder="Để trống sẽ hiển thị --"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div
              style={{
                padding: '16px 28px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                {activeTab !== 'info' && (
                  <button
                    type="button"
                    onClick={() => {
                      const tabs = ['info', 'logistics', 'highlights', 'itinerary', 'media'];
                      const currIdx = tabs.indexOf(activeTab);
                      if (currIdx > 0) setActiveTab(tabs[currIdx - 1] as any);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: 'none', color: '#cbd5e1', fontSize: '13px', cursor: 'pointer' }}
                  >
                    <ChevronLeft size={16} /> Quay Lại
                  </button>
                )}
                {activeTab !== 'media' && (
                  <button
                    type="button"
                    onClick={() => {
                      const tabs = ['info', 'logistics', 'highlights', 'itinerary', 'media'];
                      const currIdx = tabs.indexOf(activeTab);
                      if (currIdx < tabs.length - 1) setActiveTab(tabs[currIdx + 1] as any);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '12px', backgroundColor: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)', color: '#4ade80', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Tiếp Theo <ChevronRight size={16} />
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                    color: '#051f11',
                    fontSize: '14px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: '0 10px 25px -5px rgba(74, 222, 128, 0.4)',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    'Đang khởi tạo Tour...'
                  ) : (
                    <>
                      <Send size={16} /> Khởi Tạo Lịch Trình Ngay
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Success Modal */
          <div style={{ padding: '48px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(74,222,128,0.2)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff', margin: '0 0 8px 0' }}>
                Đã Khởi Tạo Lịch Trình Thành Công!
              </h3>
              <p style={{ fontSize: '14px', color: '#cbd5e1', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6' }}>
                Yêu cầu lịch trình cá nhân hóa cho <strong style={{ color: '#4ade80' }}>{formData.customerName}</strong> tại <strong style={{ color: '#ffffff' }}>{formData.city}</strong> đã được lưu thành công. Đội ngũ chuyên gia 4U sẽ hoàn thiện chi tiết và liên hệ lại với bạn qua SĐT <strong style={{ color: '#4ade80' }}>{formData.customerPhone}</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#4ade80', color: '#09140d', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(74, 222, 128, 0.4)' }}
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
