import React from 'react';
import './AdminAnalyticsManager.css';

export default function AdminAnalyticsManager() {
  return (
    <div className="serene-container-inner">
      <div className="admin-analytics-header">
        <p className="admin-analytics-tag">
          Báo Cáo Hoạt Động
        </p>
        <h1 className="admin-analytics-title">
          Thống Kê & Hiệu Suất Doanh Thu
        </h1>
      </div>

      <div className="admin-analytics-grid">
        <div className="admin-analytics-card">
          <p className="admin-analytics-card-label">Tổng Doanh Thu Tháng</p>
          <p className="admin-analytics-card-val revenue">425.000.000 ₫</p>
        </div>
        <div className="admin-analytics-card">
          <p className="admin-analytics-card-label">Lượt Đặt Tour Thành Công</p>
          <p className="admin-analytics-card-val bookings">68 Đơn</p>
        </div>
        <div className="admin-analytics-card">
          <p className="admin-analytics-card-label">Khách Hàng Hài Lòng</p>
          <p className="admin-analytics-card-val satisfaction">99,4 %</p>
        </div>
        <div className="admin-analytics-card">
          <p className="admin-analytics-card-label">Tỷ Lệ Lấp Đầy Chỗ</p>
          <p className="admin-analytics-card-val occupancy">92 %</p>
        </div>
      </div>
    </div>
  );
}
