import React from 'react';
import ToursPage from '../../../components/ToursPage';

interface KhongTheBoLoProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function KhongTheBoLo({ onNavigate, onOpenBooking }: KhongTheBoLoProps) {
  return (
    <ToursPage
      currentPath="/retreat/khongthebolo"
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
    />
  );
}
