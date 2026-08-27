import React from 'react';
import ToursPage from '../../../components/ToursPage';
import './RetreatHot.css';

interface RetreatHotProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
  currentPath?: string;
}

export default function RetreatHot({ onNavigate, onOpenBooking, currentPath = '/retreat/retreathot' }: RetreatHotProps) {
  return (
    <ToursPage
      currentPath={currentPath}
      onNavigate={onNavigate}
      onOpenBooking={onOpenBooking}
    />
  );
}
