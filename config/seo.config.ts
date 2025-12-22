/**
 * SEO and Metadata Configuration
 * Centralized SEO settings for all pages
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export const SITE_CONFIG = {
  name: 'VISC',
  fullName: 'Trung tâm Tin học và Kỹ năng mềm VISC',
  description: 'Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp hàng đầu tại Việt Nam',
  url: 'https://visc.edu.vn',
  ogImage: 'https://visc.edu.vn/og-image.jpg',
} as const;

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'VISC - Trung tâm Tin học và Kỹ năng mềm',
    description: 'Trung tâm đào tạo tin học và kỹ năng mềm chuyên nghiệp với đội ngũ giảng viên giàu kinh nghiệm',
    keywords: ['đào tạo tin học', 'kỹ năng mềm', 'visc', 'chứng chỉ tin học'],
  },
  'tin-hoc': {
    title: 'Tin học - VISC',
    description: 'Trung tâm đào tạo tin học VISC - Khóa học chuyên nghiệp, giảng viên nhiệt tình',
    keywords: ['tin học', 'office', 'word', 'excel', 'powerpoint'],
  },
  'ky-nang-mem': {
    title: 'Kỹ năng mềm - VISC',
    description: 'Đào tạo kỹ năng mềm chuyên nghiệp - Giao tiếp, làm việc nhóm, lãnh đạo',
    keywords: ['kỹ năng mềm', 'soft skills', 'giao tiếp', 'làm việc nhóm'],
  },
  'thu-vien': {
    title: 'Thư viện - VISC',
    description: 'Thư viện tài liệu học tập phong phú - Video, giáo trình, bài tập',
    keywords: ['thư viện', 'tài liệu học tập', 'video bài giảng'],
  },
  'tien-ich-dich-vu': {
    title: 'Tiện ích & Dịch vụ - VISC',
    description: 'Tra cứu chứng chỉ, điểm thi và các dịch vụ hỗ trợ học viên',
    keywords: ['tra cứu chứng chỉ', 'điểm thi', 'dịch vụ'],
  },
  'tin-tuc': {
    title: 'Tin tức - Thông báo - VISC',
    description: 'Tin tức mới nhất và thông báo quan trọng từ VISC',
    keywords: ['tin tức', 'thông báo', 'sự kiện'],
  },
} as const;

export const DEFAULT_KEYWORDS = [
  'visc',
  'đào tạo',
  'tin học',
  'kỹ năng mềm',
  'chứng chỉ',
  'khóa học',
];
