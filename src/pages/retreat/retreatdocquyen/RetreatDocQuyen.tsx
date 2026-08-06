import React from 'react';
import ToursPage from '../../../components/ToursPage';

interface RetreatDocQuyenProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export default function RetreatDocQuyen({ onNavigate, onOpenBooking }: RetreatDocQuyenProps) {
  return (
    <ToursPage
      currentPath="/retreat/docquyen"
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
    />
  );
}
