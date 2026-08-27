import React from 'react';
import ToursPage from '../../../components/ToursPage';
import './SapKhoiHanh.css';

interface SapKhoiHanhProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function SapKhoiHanh({ onNavigate, onOpenBooking }: SapKhoiHanhProps) {
  return (
    <ToursPage
      currentPath="/retreat/sapkhoihanh"
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
    />
  );
}
