export interface PartnerItem {
  id: string;
  name: string;
  category: 'Airline' | 'Hotel' | 'Cruise' | 'Insurance' | 'Bank' | 'TourismBoard';
  logoText: string;
}

// 3 SAMPLE PARTNERS
export const PARTNERS_DATA: PartnerItem[] = [
  { id: 'p-1', name: 'Vietnam Airlines', category: 'Airline', logoText: 'VIETNAM AIRLINES' },
  { id: 'p-2', name: 'Hoshinoya Resorts', category: 'Hotel', logoText: 'HOSHINOYA LUXURY' },
  { id: 'p-3', name: 'The Ritz-Carlton', category: 'Hotel', logoText: 'THE RITZ-CARLTON' }
];
