export interface PromotionItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  discountBadge: string;
  category: 'Flash Sale' | 'Early Bird' | 'Seasonal' | 'Member';
  expiryDate: string;
  bannerImage: string;
  applicableToursSlugs: string[];
  terms: string;
}

export const PROMOTIONS_DATA: PromotionItem[] = [
  {
    id: 'promo-1',
    code: 'FLASH4U2026',
    title: 'Flash Sale Giờ Chót: Retreat Chữa Lành Cát Tiên',
    subtitle: 'Ưu đãi giảm trực tiếp 3.300.000 VNĐ cho 10 suất đăng ký sớm nhất tuần này',
    discountBadge: 'GIẢM 21%',
    category: 'Flash Sale',
    expiryDate: '15/08/2026',
    bannerImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=85&w=1920&auto=format&fit=crop',
    applicableToursSlugs: ['retreat-chua-lanh'],
    terms: 'Áp dụng cho khách hàng thanh toán trọn gói trước ngày 15/08/2026.'
  },
  {
    id: 'promo-2',
    code: 'JAPANAUTUMN',
    title: 'Early Bird Mùa Thu Nhật Bản: Đặt Sớm Tặng 100% Phí Visa VIP',
    subtitle: 'Tặng ngay gói dịch vụ Visa Nhật Bản VIP & đêm nghỉ Ryokan Onsen gia truyền',
    discountBadge: 'TẶNG VISA VIP',
    category: 'Early Bird',
    expiryDate: '30/08/2026',
    bannerImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=85&w=1920&auto=format&fit=crop',
    applicableToursSlugs: ['nhat-ban-fuji-kyoto'],
    terms: 'Áp dụng cho hành trình khởi hành tháng 10 & 11/2026.'
  },
  {
    id: 'promo-3',
    code: 'HONEYMOONBALI',
    title: 'Gói Trăng Mật Xa Xỉ: Tặng Tiệc Đêm Lãng Mạn Bên Bãi Biển Bali',
    subtitle: 'Nâng hạng miễn phí lên Private Pool Villa Ubud cho cặp đôi đăng ký tháng này',
    discountBadge: 'FREE UPGRADE',
    category: 'Seasonal',
    expiryDate: '31/08/2026',
    bannerImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=85&w=1920&auto=format&fit=crop',
    applicableToursSlugs: ['bali-luxury-resort-ubud'],
    terms: 'Áp dụng cho tất cả các cặp đôi đăng ký gói Honeymoon Package.'
  }
];
