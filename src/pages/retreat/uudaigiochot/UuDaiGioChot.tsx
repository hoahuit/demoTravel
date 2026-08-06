import React from 'react';
import ToursPage from '../../../components/ToursPage';

interface UuDaiGioChotProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function UuDaiGioChot({ onNavigate, onOpenBooking }: UuDaiGioChotProps) {
  return (
    <ToursPage
      currentPath="/retreat/uudaigiochot"
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
    />
  );
}
