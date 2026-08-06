import React from 'react';
import ToursPage from '../../../components/ToursPage';

interface RetreatHotProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function RetreatHot({ onNavigate, onOpenBooking }: RetreatHotProps) {
  return (
    <ToursPage
      currentPath="/retreat/retreathot"
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
    />
  );
}
