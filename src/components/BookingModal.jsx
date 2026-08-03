import React, { useState, useEffect } from 'react';
import { ChevronUp, Calendar, X, CheckCircle2 } from 'lucide-react';

export default function BookingModal({ externalOpen, onExternalClose }) {
  const [showFloating, setShowFloating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (externalOpen) {
      setModalOpen(true);
    }
  }, [externalOpen]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: 'thantamtri',
    date: '',
    guests: '2'
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

  const handleSubmit = (e) => {
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
    if (onExternalClose) onExternalClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      tour: 'thantamtri',
      date: '',
      guests: '2'
    });
  };

  return (
    <>
      {/* ── FLOATING ACTION BUTTONS (BOTTOM RIGHT) ── */}
      {showFloating && (
        <div className="fixed bottom-7 right-7 z-[9990] flex flex-col gap-3 items-center">
          <button
            onClick={() => setModalOpen(true)}
            aria-label="Open Booking Modal"
            className="w-13 h-13 rounded-full bg-[#193627] hover:bg-[#254f3a] text-[#adceb9] border border-[#adceb9]/30 cursor-pointer flex items-center justify-center shadow-2xl hover:scale-110 transition-all relative"
          >
            <Calendar size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#4ae183] border-2 border-[#0a1610]" />
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to Top"
            className="w-12 h-12 rounded-full bg-[#0a1610] text-[#d8e6db] border border-white/10 cursor-pointer flex items-center justify-center shadow-xl hover:scale-110 hover:bg-[#16221c] transition-all"
          >
            <ChevronUp size={22} />
          </button>
        </div>
      )}

      {/* ── BOOKING MODAL (PREMIUM ARTISANAL DARK MOSS GREEN) ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[10005] flex justify-center items-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div
            className="premium-modal relative w-full max-w-[1024px] rounded-lg overflow-hidden flex flex-col z-10 text-[#d8e6db] my-auto max-h-[92vh]"
            style={{
              backgroundColor: '#0d2317',
              backgroundImage: 'linear-gradient(180deg, rgba(13, 35, 23, 1) 0%, rgba(8, 22, 14, 1) 100%)',
              boxShadow: '0 30px 80px -20px rgba(0,0,0,0.85)',
              border: '1px solid rgba(173, 206, 185, 0.15)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 bg-white/5 hover:bg-white/15 text-[#adceb9] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors border border-[#adceb9]/20"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <div className="overflow-y-auto w-full custom-scrollbar">
                {/* Header Section */}
                <div className="relative pt-8 sm:pt-10 px-6 sm:px-12 pb-6 text-center border-b border-white/5">
                  <div className="flex items-center justify-center gap-2 mb-3">

                  </div>
                  <h1 className="text-4xl sm:text-5xl font-serif text-[#adceb9] mb-3 tracking-wide" style={{ fontFamily: "'Playfair Display', 'Libre Caslon Text', Georgia, serif" }}>
                    Booking
                  </h1>

                </div>
                {/* Main Content Area */}
                <div className="flex flex-col md:flex-row p-6 sm:p-10 gap-8 lg:gap-12">

                  {/* Left Side: Benefits & Image */}
                  <div className="w-full md:w-5/12 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-[#d8e6db] opacity-90 leading-relaxed">
                        Nhận ngay tư vấn 1:1 trực tiếp từ chuyên gia hành trình 4U Tours để chọn gói Retreat chữa lành và tour độc bản phù hợp nhất:
                      </p>
                      <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#c2c8c2]">
                        <li className="flex items-start">
                          <span className="opacity-80">— Lên lịch tư vấn trực tiếp với chuyên gia hành trình 4U</span>
                        </li>
                        <li className="flex items-start">
                          <span className="opacity-80">— Thiết kế may đo lịch trình nghỉ dưỡng & trải nghiệm chữa lành độc bản</span>
                        </li>
                        <li className="flex items-start">
                          <span className="opacity-80">— Chính sách giữ chỗ an toàn & hoàn hủy linh hoạt</span>
                        </li>
                        <li className="flex items-start">
                          <span className="opacity-80">— Trải nghiệm xe riêng cao cấp đưa đón tận nơi</span>
                        </li>
                        <li className="flex items-start">
                          <span className="opacity-80">— Đội ngũ hỗ trợ 24/7 đồng hành suốt hành trình</span>
                        </li>
                        <li className="flex items-start">
                          <span className="opacity-80">— Độc quyền ưu đãi gói Retreat dành cho nhóm & gia đình</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-auto pt-4">
                      <h3 className="text-xl sm:text-2xl font-serif text-[#adceb9] mb-3" style={{ fontFamily: "'Playfair Display', 'Libre Caslon Text', Georgia, serif" }}>
                        Trải nghiệm độc bản hôm nay!
                      </h3>
                      <div className="relative w-full h-44 rounded overflow-hidden border border-white/10 opacity-90 group shadow-lg">
                        <img
                          alt="Forest Landscape"
                          className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08160e]/95 via-[#08160e]/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
                          <span className="text-[11px] sm:text-xs font-bold text-[#d8e6db] uppercase tracking-wider">
                            4U HEALING RETREAT - BÌNH YÊN TRÊN CAO NGUYÊN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="w-full md:w-7/12 flex flex-col">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full pl-0 md:pl-6">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#adceb9]/80 uppercase tracking-widest" htmlFor="fullName">
                          Họ & Tên đầy đủ *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ví dụ: Nguyễn Văn A"
                          className="glass-input w-full rounded px-4 py-3 text-[#d8e6db] text-sm"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(173, 206, 185, 0.2)',
                            color: '#d8e6db',
                            borderRadius: '4px',
                            padding: '12px 16px'
                          }}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#adceb9]/80 uppercase tracking-widest" htmlFor="email">
                          Email liên hệ
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="contact@example.com"
                          className="glass-input w-full rounded px-4 py-3 text-[#d8e6db] text-sm"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(173, 206, 185, 0.2)',
                            color: '#d8e6db',
                            borderRadius: '4px',
                            padding: '12px 16px'
                          }}
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#adceb9]/80 uppercase tracking-widest" htmlFor="phone">
                          Số điện thoại / Zalo *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+84 901 234 567"
                          className="glass-input w-full rounded px-4 py-3 text-[#d8e6db] text-sm"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(173, 206, 185, 0.2)',
                            color: '#d8e6db',
                            borderRadius: '4px',
                            padding: '12px 16px'
                          }}
                        />
                      </div>

                      {/* Retreat Package Selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#adceb9]/80 uppercase tracking-widest" htmlFor="package">
                          Chọn gói Retreat / Tour
                        </label>
                        <div className="relative">
                          <select
                            id="package"
                            value={formData.tour}
                            onChange={e => setFormData({ ...formData, tour: e.target.value })}
                            className="glass-input w-full rounded px-4 py-3 text-[#d8e6db] text-sm cursor-pointer"
                            style={{
                              backgroundColor: '#0a1610',
                              border: '1px solid rgba(173, 206, 185, 0.2)',
                              color: '#d8e6db',
                              borderRadius: '4px',
                              padding: '12px 16px'
                            }}
                          >
                            <option value="thantamtri">Retreat Chữa lành Thân Tâm Trí</option>
                            <option value="thiennhien">Khám Phá Thiên Nhiên Nguyên Bản</option>
                            <option value="giadinh">Nghỉ Dưỡng Gia Đình Gắn Kết</option>
                            <option value="caonguyen">Bình Yên Trên Cao Nguyên</option>
                          </select>
                        </div>
                      </div>

                      {/* Date & Guests Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#adceb9]/80 uppercase tracking-widest" htmlFor="date">
                            Dự kiến ngày đi
                          </label>
                          <input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                            className="glass-input w-full rounded px-4 py-3 text-[#d8e6db] text-sm cursor-pointer"
                            style={{
                              backgroundColor: '#0a1610',
                              border: '1px solid rgba(173, 206, 185, 0.2)',
                              color: '#d8e6db',
                              borderRadius: '4px',
                              padding: '12px 16px'
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#adceb9]/80 uppercase tracking-widest" htmlFor="guests">
                            Số lượng khách
                          </label>
                          <select
                            id="guests"
                            value={formData.guests}
                            onChange={e => setFormData({ ...formData, guests: e.target.value })}
                            className="glass-input w-full rounded px-4 py-3 text-[#d8e6db] text-sm cursor-pointer"
                            style={{
                              backgroundColor: '#0a1610',
                              border: '1px solid rgba(173, 206, 185, 0.2)',
                              color: '#d8e6db',
                              borderRadius: '4px',
                              padding: '12px 16px'
                            }}
                          >
                            <option value="1">1 Khách</option>
                            <option value="2">2 Khách (Đôi)</option>
                            <option value="3-5">3 - 5 Khách</option>
                            <option value="group">Nhóm / Gia đình (&gt;5)</option>
                          </select>
                        </div>
                      </div>

                      {/* Consent Text & Submit */}
                      <div className="mt-auto pt-4 flex flex-col gap-3 border-t border-white/5">
                        <p className="text-[11px] text-[#c2c8c2]/70 leading-relaxed">
                          Bằng việc gửi thông tin, tôi xác nhận đã đọc chính sách bảo mật của 4U Tours và đồng ý để chuyên gia tư vấn liên hệ qua SĐT/Email để hỗ trợ xếp lịch trình.
                        </p>
                        <button
                          type="submit"
                          className="w-full font-bold py-3.5 px-6 rounded flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest text-xs sm:text-sm cursor-pointer shadow-lg mt-1"
                          style={{
                            backgroundColor: '#193627',
                            color: '#adceb9',
                            border: '1px solid rgba(173, 206, 185, 0.2)'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#254f3a'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#193627'}
                        >
                          BOOK DEMO TOUR NGAY
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            ) : (
              /* Success State */
              <div className="text-center p-8 sm:p-14 my-auto">
                <div className="w-14 h-14 rounded-full bg-[#193627] border-2 border-[#adceb9] text-[#adceb9] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="text-2xl font-serif text-[#adceb9] mb-2" style={{ fontFamily: "'Playfair Display', 'Libre Caslon Text', Georgia, serif" }}>
                  Đã Gửi Yêu Cầu Booking!
                </h3>
                <p className="text-[#d8e6db]/80 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Cảm ơn <strong>{formData.name}</strong>. Chuyên gia 4U Tours sẽ liên hệ qua SĐT <strong>{formData.phone}</strong> trong ít phút để xếp lịch trình demo cho bạn.
                </p>

                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded bg-[#193627] text-[#adceb9] font-bold text-xs uppercase tracking-widest border border-[#adceb9]/20 hover:bg-[#254f3a] transition-all cursor-pointer shadow-sm"
                >
                  Đóng Cửa Sổ
                </button>
              </div>
            )}
          </div>
        </div >
      )
      }
    </>
  );
}
