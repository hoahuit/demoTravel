export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  portrait: string;
  bio: string;
  experienceYears: number;
  languages: string[];
  certificates: string[];
}

// 3 SAMPLE TEAM MEMBERS
export const TEAM_DATA: TeamMember[] = [
  {
    id: 'm-1',
    name: 'Ông Trần Vũ Hoàng',
    role: 'Chủ Tịch & Tổng Giám Đốc (Founder & CEO)',
    department: 'Ban Điều Hành Global',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    bio: 'Hơn 20 năm kinh nghiệm kiến tạo các dịch vụ lữ hành xa xỉ quốc tế. Tiên phong mang mô hình Wellness Retreat đỉnh cao về Việt Nam.',
    experienceYears: 20,
    languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Pháp'],
    certificates: ['WTM Luxury Travel Leader 2024', 'IATA Master Certified Specialist']
  },
  {
    id: 'm-2',
    name: 'Bà Lê Khánh Hà',
    role: 'Giám Đốc Trải Nghiệm Khách Hàng (Chief Experience Officer)',
    department: 'Quản Lý Chất Lượng Dịch Vụ',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    bio: 'Chuyên gia xây dựng trải nghiệm khách hàng tiêu chuẩn 5-star Concierge với hơn 15 năm làm việc tại các tập đoàn nghỉ dưỡng hàng đầu.',
    experienceYears: 15,
    languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Nhật'],
    certificates: ['Certified Luxury Travel Designer (CLTD)']
  },
  {
    id: 'm-3',
    name: 'Bà Nguyễn Mai Phương',
    role: 'Master Thiền & Cố Vấn Wellness',
    department: 'Retreat & Chăm Sóc Thân Tâm',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    bio: 'Được đào tạo 8 năm tại Himalaya và Kyoto về nghệ thuật Thiền định, Trị liệu Chuông Xoay và Dinh dưỡng Thực dưỡng Hữu cơ.',
    experienceYears: 12,
    languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Phạn'],
    certificates: ['Sound Therapy Master Certified']
  }
];
