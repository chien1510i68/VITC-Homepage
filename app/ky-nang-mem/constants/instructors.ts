import { Leader, Instructor, FilterType } from '../types';

// Leadership team
export const LEADERSHIP: Leader[] = [
  {
    id: 1,
    name: 'TS. Ngô Trí Dương',
    title: 'Giám đốc Trung tâm',
    specialty: 'Chuyên gia đào tạo kỹ năng mềm & phát triển năng lực sinh viên',
    image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/07/z4436911914682_e6a67684bc3f994c256ee5be5ed30536-e1686891175319.jpg',
  },
  {
    id: 2,
    name: 'ThS. Nguyễn Thị Thu Huyền',
    title: 'Phó Giám đốc Trung tâm',
    specialty: 'Chuyên gia phát triển chương trình đào tạo & quản lý hoạt động',
    image: 'http://trungtamkynangmem.vnua.edu.vn/wp-content/uploads/2019/07/IMG_6596-1.jpg',
  },
];

// Internal instructors
export const INTERNAL_INSTRUCTORS: Instructor[] = [
  { id: 1, name: 'TS. Nguyễn Tất Thắng', degree: 'Tiến sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { id: 2, name: 'ThS. Nguyễn Công Uớc', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
  { id: 3, name: 'ThS. Trần Thị Hà Nghĩa', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
  { id: 4, name: 'ThS. Nguyễn Huyền Thương', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
  { id: 5, name: 'ThS. Trần Thị Thanh Tâm', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
  { id: 6, name: 'ThS. Đỗ Ngọc Bích', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' },
  { id: 7, name: 'ThS. Bùi Thị Hải Yến', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop' },
  { id: 8, name: 'ThS. Lê Thị Kim Thư', degree: 'Thạc sĩ', specialty: 'Sư phạm công nghệ, DLNN', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop' },
  { id: 9, name: 'TS. Mai Thị Phượng', degree: 'Tiến sĩ', specialty: 'Quản trị khách sạn & NH, DLNN', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' },
  { id: 10, name: 'ThS. Đặng Xuân Phi', degree: 'Thạc sĩ', specialty: 'Quản trị khách sạn & NH, DLNN', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
  { id: 11, name: 'TS. Nguyễn Thị Minh Thu', degree: 'Tiến sĩ', specialty: 'Kế hoạch & đầu tư, KT&PTNT', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop' },
  { id: 12, name: 'TS. Đỗ Trường Lâm', degree: 'Tiến sĩ', specialty: 'Kế hoạch & đầu tư, KT&PTNT', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop' },
  { id: 13, name: 'ThS. Trần Hương Giang', degree: 'Thạc sĩ', specialty: 'Kế hoạch & đầu tư, KT&PTNT', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop' },
  { id: 14, name: 'ThS. Vũ Thị Thu Hương', degree: 'Thạc sĩ', specialty: 'Kế hoạch & đầu tư, KT&PTNT', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop' },
  { id: 15, name: 'ThS. Đặng Nam Phương', degree: 'Thạc sĩ', specialty: 'Kế hoạch & đầu tư, KT&PTNT', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop' },
  { id: 16, name: 'TS. Quyền Đình Hà B', degree: 'Tiến sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop' },
  { id: 17, name: 'TS. Nguyễn Thị Thu Phương', degree: 'Tiến sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop' },
  { id: 18, name: 'TS. Trần Mạnh Hải', degree: 'Tiến sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop' },
  { id: 19, name: 'TS. Đỗ Thị Thanh Huyền', degree: 'Tiến sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300&h=300&fit=crop' },
  { id: 20, name: 'ThS. Đỗ Thị Nhài', degree: 'Thạc sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&h=300&fit=crop' },
  { id: 21, name: 'ThS. Bạch Văn Thủy', degree: 'Thạc sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop' },
  { id: 22, name: 'ThS. Nguyễn Thị Phương', degree: 'Thạc sĩ', specialty: 'Phát triển nông thôn, KT&PTNT', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop' },
  { id: 23, name: 'TS. Trần Đức Trí', degree: 'Tiến sĩ', specialty: 'Kinh tế, KT&PTNT', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop' },
  { id: 24, name: 'PGS.TS. Nguyễn Phượng Lê', degree: 'PGS.TS', specialty: 'Kinh tế NN&CS, KT&PTNT', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop' },
  { id: 25, name: 'TS. Lê Thị Thanh Loan', degree: 'Tiến sĩ', specialty: 'Kinh tế NN&CS, KT&PTNT', image: 'https://images.unsplash.com/photo-1502767089025-6572583495f9?w=300&h=300&fit=crop' },
  { id: 26, name: 'TS. Nguyễn Thanh Phong', degree: 'Tiến sĩ', specialty: 'Kinh tế NN&CS, KT&PTNT', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&h=300&fit=crop' },
  { id: 27, name: 'ThS. Phạm Thị Thanh Thúy', degree: 'Thạc sĩ', specialty: 'Kinh tế NN&CS, KT&PTNT', image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop' },
  { id: 28, name: 'TS. Nguyễn Thị Thiêm', degree: 'Tiến sĩ', specialty: 'Kinh tế NN&CS, KT&PTNT', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { id: 29, name: 'TS. Hồ Ngọc Cường', degree: 'Tiến sĩ', specialty: 'KT tài nguyên & MT, KT&PTNT', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
  { id: 30, name: 'TS. Lê Phương Nam', degree: 'Tiến sĩ', specialty: 'KT tài nguyên & MT, KT&PTNT', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
  { id: 31, name: 'TS. Nguyễn Thị Ngọc Thương', degree: 'Tiến sĩ', specialty: 'KT tài nguyên & MT, KT&PTNT', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
  { id: 32, name: 'TS. Nguyễn Thị Hải Ninh', degree: 'Tiến sĩ', specialty: 'KT tài nguyên & MT, KT&PTNT', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
  { id: 33, name: 'TS. Đỗ Thị Diệp', degree: 'Tiến sĩ', specialty: 'KT tài nguyên & MT, KT&PTNT', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' },
  { id: 34, name: 'ThS. Nguyễn Hữu Giáp', degree: 'Thạc sĩ', specialty: 'KT tài nguyên & MT, KT&PTNT', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop' },
  { id: 35, name: 'TS. Nguyễn Văn Hướng', degree: 'Tiến sĩ', specialty: 'Marketing, KT&QTKD', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop' },
  { id: 36, name: 'TS. Vũ Thị Hằng Nga', degree: 'Tiến sĩ', specialty: 'Marketing, KT&QTKD', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' },
  { id: 37, name: 'TS. Nguyễn Thị Minh Khuê', degree: 'Tiến sĩ', specialty: 'Xã hội học, KHXH', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
  { id: 38, name: 'PGS.TS. Nguyễn Thị Diễn', degree: 'PGS.TS', specialty: 'Xã hội học, KHXH', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop' },
  { id: 39, name: 'ThS. Vũ Thị Thu Hà', degree: 'Thạc sĩ', specialty: 'Khoa học chính trị, KHXH', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop' },
];

// Company leaders
export const COMPANY_LEADERS: Instructor[] = [
  { id: 40, name: 'Bà Nguyễn Thị Trà My', specialty: 'Tổng Giám đốc Công ty CP Tập đoàn PAN', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop' },
  { id: 41, name: 'Bà Nguyễn Tâm Trang', specialty: 'Phó Chủ tịch & TGĐ Khối Nhân sự, GREENFEED', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
  { id: 42, name: 'Ông Đinh Cao Khuê', specialty: 'Chủ tịch & TGĐ Công ty CP Thực phẩm XK Đồng Giao', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { id: 43, name: 'Ông Trần Mạnh Báo', specialty: 'Chủ tịch HĐQT & TGĐ Công ty CP ThaiBinh Seed', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
  { id: 44, name: 'Ông Vũ Anh Tuấn', specialty: 'Phó TGĐ cấp cao Công ty CP Chăn nuôi C.P. VN', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
  { id: 45, name: 'Ông Nguyễn Bá Lâm', specialty: 'Giám đốc Công ty CP Đầu tư & Tư vấn Phương Bắc', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop' },
  { id: 46, name: 'Ông Nguyễn Thành Đạt', specialty: 'Phó TGĐ Công ty CP NICOTEX', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop' },
  { id: 47, name: 'Ông Đỗ Văn Hậu', specialty: 'Phó Giám đốc Công ty CP CodeLovers Việt Nam', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&h=300&fit=crop' },
  { id: 48, name: 'Bà Lê Thị Phương Hoa', specialty: 'Giám đốc Đối ngoại & QHCP Công ty TNHH Cargill VN', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' },
  { id: 49, name: 'Bà Lê Huỳnh Thanh Phương', specialty: 'TGĐ Công ty KHCN Dược Mỹ phẩm VNUA', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop' },
  { id: 50, name: 'Ông Akira Kikuchi', specialty: 'Giám đốc Công ty TNHH Điện Stanley Việt Nam', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop' },
];

// Experts and speakers
export const EXPERTS: Instructor[] = [
  { id: 51, name: 'Bà Phạm Bình Hà', specialty: 'Phó Chủ tịch Hiệp hội nhân sự HRA', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' },
  { id: 52, name: 'Bà Lê Hồng Hạnh', specialty: 'Trưởng phòng Nhân sự – BIDV Metlife', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
  { id: 53, name: 'ThS. Nguyễn Thúy Quỳnh', specialty: 'Giảng viên Đại học Sư phạm Hà Nội', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
  { id: 54, name: 'ThS. Đinh Phương Lý', specialty: 'Giám đốc đào tạo TNR Talent', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop' },
  { id: 55, name: 'ThS. Nguyễn Thị Thu Hương', specialty: 'HR Director Truyền hình K+', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop' },
  { id: 56, name: 'ThS. Nguyễn Thị Khánh Minh', specialty: 'Đại sứ quán Úc', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop' },
  { id: 57, name: 'Bà Trịnh Thị Thanh Hương', specialty: 'HR Manager – Phú Thái Mobility', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop' },
  { id: 58, name: 'ThS. Dương Thị Thu Hà', specialty: 'HRBP Vinfast', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop' },
  { id: 59, name: 'ThS. Dương Thị Thúy Hằng', specialty: 'COO Công ty Punch International', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop' },
  { id: 60, name: 'Bà Lê Thanh Huyền', specialty: 'Giám đốc Công ty TNHH huấn luyện Vinskills', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop' },
  { id: 61, name: 'Bà Trương Thị Thu Hương', specialty: 'Giám đốc đào tạo MB Bank', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300&h=300&fit=crop' },
];

// Filter configuration
interface FilterOption {
  id: FilterType;
  label: string;
  count: number;
}

export const INSTRUCTOR_FILTERS: FilterOption[] = [
  { id: 'all', label: 'Tất cả giảng viên', count: INTERNAL_INSTRUCTORS.length + COMPANY_LEADERS.length + EXPERTS.length },
  { id: 'internal', label: 'Giảng viên trong Học viện', count: INTERNAL_INSTRUCTORS.length },
  { id: 'company', label: 'Lãnh đạo doanh nghiệp', count: COMPANY_LEADERS.length },
  { id: 'expert', label: 'Chuyên gia & Diễn giả', count: EXPERTS.length },
];

export const ALL_INSTRUCTORS: Instructor[] = [...INTERNAL_INSTRUCTORS, ...COMPANY_LEADERS, ...EXPERTS];
