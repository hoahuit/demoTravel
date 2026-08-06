export interface CustomerReviewItem {
  id: string;
  name: string;
  country: string;
  occupation: string;
  avatar: string;
  rating: number;
  visitedTour: string;
  travelDate: string;
  comment: string;
  images?: string[];
}

// 3 SAMPLE TESTIMONIAL ITEMS
export const TESTIMONIALS_DATA: CustomerReviewItem[] = [
  {
    id: 't-1',
    name: 'Bác sĩ Nguyễn Minh Tâm',
    country: 'Việt Nam',
    occupation: 'Bác sĩ Trưởng Khoa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    visitedTour: 'Retreat Chữa Lành Cát Tiên 3N2Đ',
    travelDate: 'Tháng 7/2026',
    comment: 'Là người làm việc áp lực cao, tôi thật sự tìm thấy sự lắng đọng kỳ diệu sau 3 ngày thiền và tắm rừng tại Cát Tiên. Dịch vụ của 4U Tours tinh tế đến từng chi tiết nhỏ!',
    images: ['https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop']
  },
  {
    id: 't-2',
    name: 'Doanh Nhân Robert Chen',
    country: 'Singapore',
    occupation: 'CEO Công ty Công Nghệ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    visitedTour: 'Nhật Bản Luxury: Mùa Thu Kyoto 6N5Đ',
    travelDate: 'Tháng 11/2025',
    comment: 'Chuyến đi vượt ngoài sự mong đợi của gia đình tôi. Khách sạn Hoshinoya Kyoto quá đẳng cấp, bữa ăn Michelin tinh tế và HDV am hiểu văn hóa sâu sắc.',
    images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop']
  },
  {
    id: 't-3',
    name: 'Chuyên Gia Sophie Dupont',
    country: 'Pháp',
    occupation: 'Nhiếp Ảnh Gia',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    visitedTour: 'Thụy Sĩ: Chinh Phục Alps 8N7Đ',
    travelDate: 'Tháng 10/2025',
    comment: 'Lần đầu tiên tôi trải nghiệm một công ty lữ hành chu đáo và tỉ mỉ đến vậy. Tàu Glacier Express ngắm thung lũng tuyết phủ là góc ảnh đẹp nhất sự nghiệp của tôi!',
    images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=400&auto=format&fit=crop']
  }
];
