import React from 'react';

export default function AdminAnalyticsManager() {
  return (
    <div className="serene-container-inner">
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#525a54', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
          Báo Cáo Hoạt Động
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', margin: 0, color: '#081f13', fontWeight: 600 }}>
          Thống Kê & Hiệu Suất Doanh Thu
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
          <p style={{ fontSize: '12px', color: '#525a54', margin: 0 }}>Tổng Doanh Thu Tháng</p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#059669', margin: '6px 0 0 0' }}>425.000.000 ₫</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
          <p style={{ fontSize: '12px', color: '#525a54', margin: 0 }}>Lượt Đặt Tour Thành Công</p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#2563eb', margin: '6px 0 0 0' }}>68 Đơn</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
          <p style={{ fontSize: '12px', color: '#525a54', margin: 0 }}>Khách Hàng Hài Lòng</p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#d97706', margin: '6px 0 0 0' }}>99,4 %</p>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid rgba(6, 27, 14, 0.08)' }}>
          <p style={{ fontSize: '12px', color: '#525a54', margin: 0 }}>Tỷ Lệ Lấp Đầy Chỗ</p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#7c3aed', margin: '6px 0 0 0' }}>92 %</p>
        </div>
      </div>
    </div>
  );
}
