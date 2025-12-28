import { Course, CourseCategory } from '../types';

export const COURSE_CATEGORIES: CourseCategory[] = ['Tất cả', 'Sinh viên HVNN', 'Theo nhu cầu'];

// Core required courses (Sinh viên HVNN)
export const REQUIRED_COURSES: Course[] = [
  {
    id: 1,
    title: 'Kỹ năng giao tiếp',
    category: 'Sinh viên HVNN',
    excerpt: 'Các phương thức giao tiếp và thực hành lắng nghe',
    duration: '2 tín chỉ',
    audience: ['Sinh viên chính quy'],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Kỹ năng làm việc nhóm',
    category: 'Sinh viên HVNN',
    excerpt: 'Kỹ năng hợp tác, phân công và giải quyết xung đột',
    duration: '2 tín chỉ',
    audience: ['Sinh viên chính quy'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Kỹ năng quản lý bản thân',
    category: 'Sinh viên HVNN',
    excerpt: 'Quản lý thời gian, tự học và phát triển năng lực cá nhân',
    duration: '2 tín chỉ',
    audience: ['Sinh viên chính quy'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Kỹ năng tìm kiếm việc làm',
    category: 'Sinh viên HVNN',
    excerpt: 'Chuẩn hóa CV, hồ sơ và kỹ năng phỏng vấn',
    duration: '2 tín chỉ',
    audience: ['Sinh viên chính quy'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Kỹ năng hội nhập quốc tế',
    category: 'Sinh viên HVNN',
    excerpt: 'Chuẩn bị hành trang hội nhập và giao tiếp văn hóa',
    duration: '2 tín chỉ',
    audience: ['Sinh viên chính quy'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Kỹ năng giải quyết vấn đề',
    category: 'Sinh viên HVNN',
    excerpt: 'Phân tích và giải quyết vấn đề thực tế',
    duration: '2 tín chỉ',
    audience: ['Sinh viên chính quy'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  },
];

// On-demand courses (Theo nhu cầu)
export const ON_DEMAND_COURSES: Course[] = [
  {
    id: 7,
    title: 'Tư duy sáng tạo',
    category: 'Theo nhu cầu',
    excerpt: 'Kỹ thuật tư duy sáng tạo và brainstorming',
    duration: '1 buổi',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    title: 'Kỹ năng thuyết trình',
    category: 'Theo nhu cầu',
    excerpt: 'Kỹ năng kể chuyện và trình bày trước đám đông',
    duration: '1 buổi',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Kỹ năng quản lý dự án',
    category: 'Theo nhu cầu',
    excerpt: 'Quy trình và công cụ quản lý dự án cơ bản',
    duration: '2 buổi',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Kỹ năng quản lý thời gian',
    category: 'Theo nhu cầu',
    excerpt: 'Kỹ năng lập kế hoạch thời gian hiệu quả',
    duration: '1 buổi',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Kỹ năng bán hàng online',
    category: 'Theo nhu cầu',
    excerpt: 'Kỹ năng tiếp thị và bán hàng trên nền tảng số',
    duration: '1 buổi',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 12,
    title: 'Kỹ năng tổ chức công việc hiệu quả',
    category: 'Theo nhu cầu',
    excerpt: 'Kỹ thuật sắp xếp và tối ưu công việc',
    duration: '1 buổi',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop',
  },
];

export const ALL_COURSES: Course[] = [...REQUIRED_COURSES, ...ON_DEMAND_COURSES];
