import React, { useState, useEffect } from 'react';
import './BookingModal.css';
import { QrCode, ShieldCheck, CheckCircle, X } from 'lucide-react';

export interface BookingModalProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
  selectedTour?: {
    title?: string;
    price?: number;
    city?: string;
    slug?: string;
    duration?: string;
    selectedDate?: string;
    guests?: any;
  } | null;
}

interface OrderFormState {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

export default function BookingModal({ externalOpen, onExternalClose, selectedTour }: BookingModalProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hasTransferred, setHasTransferred] = useState<boolean>(false);

  useEffect(() => {
    if (externalOpen !== undefined) {
      setModalOpen(externalOpen);
    }
  }, [externalOpen]);

  const isOpen = Boolean(externalOpen || modalOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const defaultTourTitle = selectedTour?.title || 'Retreat May Đo Tĩnh Dưỡng Độc Bản';

  const parsePrice = (priceVal: any): number => {
    if (typeof priceVal === 'number' && !isNaN(priceVal)) return priceVal;
    if (typeof priceVal === 'string') {
      const cleaned = priceVal.replace(/\D/g, '');
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 1850000;
  };

  const tourPriceVND = parsePrice(selectedTour?.price);

  const [orderForm, setOrderForm] = useState<OrderFormState>({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  });

  const formatVnd = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const resetAndClose = () => {
    setModalOpen(false);
    setSubmitted(false);
    setHasTransferred(false);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (onExternalClose) onExternalClose();
    setOrderForm({
      fullName: '',
      phone: '',
      address: '',
      notes: '',
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.fullName.trim() || !orderForm.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }

    try {
      const currentBookings = JSON.parse(localStorage.getItem('4u_tour_bookings') || '[]');
      currentBookings.push({
        id: 'BK-' + Date.now(),
        tour: defaultTourTitle,
        price: tourPriceVND,
        customer: orderForm,
        hasTransferred,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('4u_tour_bookings', JSON.stringify(currentBookings));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  const cleanPhone = orderForm.phone ? orderForm.phone.replace(/\s+/g, '') : 'TOUR';

  return (
    <>
      {isOpen && (
        <div
          className="bm-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndClose();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(10px, 2vh, 20px)',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: 'clamp(20px, 3vh, 32px) clamp(18px, 3vw, 30px)',
              position: 'relative',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.35)',
              fontFamily: "'Work Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              color: '#191c1d',
              maxHeight: '96vh',
              overflowY: 'auto',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'clamp(10px, 1.6vh, 18px)'
            }}
          >
            {/* Close Button X */}
            <button
              onClick={resetAndClose}
              type="button"
              style={{
                position: 'absolute',
                top: 'clamp(14px, 2vh, 20px)',
                right: 'clamp(14px, 2vw, 20px)',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#4b5563',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
                e.currentTarget.style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#4b5563';
              }}
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.4vh, 16px)', margin: 0 }}>
                {/* Header Title */}
                <div>
                  <h2 style={{ fontSize: 'clamp(20px, 2.6vh, 24px)', fontWeight: 800, color: '#111827', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                    Xác nhận đơn hàng
                  </h2>
                  <p style={{ fontSize: 'clamp(12px, 1.5vh, 13.5px)', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                    Vui lòng cung cấp thông tin để 4U giao hàng tận nơi cho bạn.
                  </p>
                </div>

                {/* 2-Column Responsive Inputs: Họ và tên + Số điện thoại */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(8px, 1.2vh, 14px)' }}>
                  {/* Họ và tên */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={orderForm.fullName}
                      onChange={(e) => setOrderForm({ ...orderForm, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 'clamp(8px, 1.2vh, 11px) 12px',
                        borderRadius: '6px',
                        border: '1px solid #bec9c2',
                        fontSize: '13.5px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                  </div>

                  {/* Số điện thoại */}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                      Số điện thoại nhận hàng *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0987 654 321"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 'clamp(8px, 1.2vh, 11px) 12px',
                        borderRadius: '6px',
                        border: '1px solid #bec9c2',
                        fontSize: '13.5px',
                        boxSizing: 'border-box',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Địa chỉ */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                    Địa chỉ nhận hàng chi tiết
                  </label>
                  <input
                    type="text"
                    placeholder="Số nhà, Tên đường, Phường/Xã, Tỉnh/Thành"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 'clamp(8px, 1.2vh, 11px) 12px',
                      borderRadius: '6px',
                      border: '1px solid #bec9c2',
                      fontSize: '13.5px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Ghi chú */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#191c1d', marginBottom: '5px' }}>
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ghi chú thêm về thời gian nhận hàng hoặc đóng gói..."
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 'clamp(7px, 1vh, 10px) 12px',
                      borderRadius: '6px',
                      border: '1px solid #bec9c2',
                      fontSize: '13.5px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Price Summary Box */}
                <div style={{ backgroundColor: '#f8f9fa', padding: 'clamp(10px, 1.5vh, 14px) 16px', borderRadius: '6px', border: '1px solid #edeeef' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: '#555f6d', marginBottom: '3px' }}>
                    <span>Tổng số lượng:</span>
                    <strong>1 sản phẩm</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(15px, 2vh, 17px)', fontWeight: 700, color: '#004532' }}>
                    <span>Tổng thanh toán:</span>
                    <span>{formatVnd(tourPriceVND)}</span>
                  </div>
                </div>

                {/* QR Code VietQR Section */}
                <div
                  style={{
                    backgroundColor: '#f4f7f5',
                    border: '1px solid #cce3d4',
                    borderRadius: '12px',
                    padding: 'clamp(10px, 1.5vh, 14px) 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(6px, 1vh, 10px)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <QrCode size={18} style={{ color: '#065f46' }} />
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#081f13', textTransform: 'uppercase' }}>
                        QUÉT MÃ QR CHUYỂN KHOẢN NHANH
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#dcfce7',
                        color: '#15803d',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        border: '1px solid #bbf7d0'
                      }}
                    >
                      VietQR 24/7
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* QR Image */}
                    <div
                      style={{
                        width: 'clamp(100px, 13vh, 120px)',
                        height: 'clamp(100px, 13vh, 120px)',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={`https://api.vietqr.io/image/970422-0987654321-compact.png?amount=${tourPriceVND}&addInfo=${encodeURIComponent('4U ' + cleanPhone)}&accountName=4U%20WELLNESS%20RETREAT`}
                        alt="Mã QR Chuyển Khoản"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Bank Transfer Info */}
                    <div style={{ flex: 1, minWidth: '170px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div>
                        <span style={{ color: '#64748b' }}>Ngân hàng:</span>{' '}
                        <strong style={{ color: '#081f13' }}>MB Bank (Quân Đội)</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Số tài khoản:</span>{' '}
                        <strong style={{ color: '#065f46', fontFamily: 'monospace', fontSize: '13px' }}>0987 654 321</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>{' '}
                        <strong style={{ color: '#081f13' }}>4U WELLNESS & RETREAT</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Số tiền:</span>{' '}
                        <strong style={{ color: '#065f46', fontSize: '13px' }}>{formatVnd(tourPriceVND)}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Nội dung CK:</span>{' '}
                        <code style={{ backgroundColor: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 700, color: '#081f13' }}>
                          4U {cleanPhone}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Button to confirm transfer */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextState = !hasTransferred;
                      setHasTransferred(nextState);
                      const transferTag = `[ĐÃ CHUYỂN KHOẢN QR ${formatVnd(tourPriceVND)}]`;
                      if (nextState) {
                        if (!orderForm.notes.includes(transferTag)) {
                          setOrderForm((prev) => ({
                            ...prev,
                            notes: prev.notes ? `${prev.notes} - ${transferTag}` : transferTag
                          }));
                        }
                      } else {
                        setOrderForm((prev) => ({
                          ...prev,
                          notes: prev.notes.replace(` - ${transferTag}`, '').replace(transferTag, '').trim()
                        }));
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: 'clamp(7px, 1.1vh, 10px) 12px',
                      borderRadius: '8px',
                      border: hasTransferred ? '2px solid #059669' : '1px solid #94a3b8',
                      backgroundColor: hasTransferred ? '#ecfdf5' : '#ffffff',
                      color: hasTransferred ? '#065f46' : '#1e293b',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      marginTop: '2px'
                    }}
                  >
                    {hasTransferred ? (
                      <>
                        <CheckCircle size={15} style={{ color: '#059669' }} />
                        <span>ĐÃ XÁC NHẬN: BẠN ĐÃ CHUYỂN KHOẢN THÀNH CÔNG!</span>
                      </>
                    ) : (
                      <>
                        <span>💳</span>
                        <span>👉 Bấm vào đây sau khi bạn ĐÃ CHUYỂN TIỀN</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: 'clamp(11px, 1.6vh, 14px) 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#004532',
                    color: '#ffffff',
                    fontSize: 'clamp(13.5px, 1.6vh, 15px)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(0, 69, 50, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005a41')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#004532')}
                >
                  <ShieldCheck size={18} />
                  <span>Hoàn tất đặt hàng</span>
                </button>
              </form>
            ) : (
              /* Success confirmation */
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <CheckCircle size={36} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>
                  Đặt Hàng Thành Công!
                </h3>
                <p style={{ fontSize: '13.5px', color: '#4b5563', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                  Cảm ơn <strong>{orderForm.fullName}</strong>. Đơn hàng của bạn đã được tiếp nhận. Đội ngũ 4U Wellness sẽ liên hệ xác nhận trong ít phút!
                </p>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'left',
                    fontSize: '12.5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginBottom: '20px'
                  }}
                >
                  <div>
                    <span style={{ color: '#64748b' }}>Sản phẩm / Gói:</span>{' '}
                    <strong style={{ color: '#0f172a' }}>{defaultTourTitle}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Tổng tiền:</span>{' '}
                    <strong style={{ color: '#004532', fontSize: '14px' }}>{formatVnd(tourPriceVND)}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Số điện thoại:</span>{' '}
                    <strong style={{ color: '#0f172a' }}>{orderForm.phone}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetAndClose}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#004532',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Đóng & Hoàn Tất
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
