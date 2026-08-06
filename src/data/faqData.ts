export interface FAQItem {
  id: string;
  category: 'Visa & Thủ Tục' | 'Thanh Toán & Hoàn Tiền' | 'Khách Sạn & Chuyến Bay' | 'Bảo Hiểm & Sức Khỏe' | 'Trẻ Em & Người Cao Tuổi';
  question: string;
  answer: string;
}

// 3 SAMPLE FAQ ITEMS
export const FAQ_DATA: FAQItem[] = [
  {
    id: 'f-1',
    category: 'Visa & Thủ Tục',
    question: '4U Tours hỗ trợ dịch vụ Visa VIP cho những quốc gia nào?',
    answer: '4U Tours xử lý trọn gói Visa VIP cho các thị trường: Schengen Châu Âu, Nhật Bản, Mỹ, Úc với cam kết tỷ lệ đậu 99.9%.'
  },
  {
    id: 'f-2',
    category: 'Thanh Toán & Hoàn Tiền',
    question: 'Chính sách hoàn tiền khi hủy tour của 4U Tours như thế nào?',
    answer: '4U Tours áp dụng chính sách linh hoạt: Hủy trước 30 ngày hoàn tiền 100%. Nếu chuyến đi bị ảnh hưởng do lý do bất khả kháng, 4U Tours hoàn trả chi phí theo quy định.'
  },
  {
    id: 'f-3',
    category: 'Khách Sạn & Chuyến Bay',
    question: 'Tiêu chuẩn khách sạn và phương tiện trong gói tour 4U?',
    answer: '100% khách sạn là các thương hiệu 5 sao xa xỉ hoặc Eco Resort cao cấp nhất. Phương tiện di chuyển bằng xe Limousine VIP 9 chỗ độc quyền.'
  }
];
