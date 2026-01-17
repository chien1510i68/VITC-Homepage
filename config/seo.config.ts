/**
 * SEO and Metadata Configuration
 * Centralized SEO settings for all pages
 * References actual project structure and environment variables
 */

import { siteConfig } from './site.config';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Page-specific metadata based on actual routes in the project
 * Routes structure:
 * - / (homepage)
 * - /tin-hoc (IT training center)
 * - /ky-nang-mem (Soft Skills training center)
 * - /khoa-hoc (Courses listing)
 * - /khoa-hoc/[id] (Course detail)
 * - /thu-vien (Library/Resources)
 * - /tien-ich-dich-vu (Utilities & Services)
 * - /tin-tuc-thong-bao (News & Announcements)
 * - /tin-tuc-thong-bao/[id] (News detail)
 * - /lien-he (Contact)
 */
export const PAGE_METADATA: Record<string, PageMetadata> = {
  // Homepage
  home: {
    title: `${siteConfig.name} - ${siteConfig.fullName}`,
    description: 'Trung tâm Tin học và Kỹ năng mềm VNUA - Đào tạo chuyên nghiệp với chứng chỉ quốc tế ICDL, chuẩn đầu ra Tin học VNUA, và các khóa kỹ năng mềm thiết yếu. Đội ngũ giảng viên giàu kinh nghiệm, cơ sở vật chất hiện đại.',
    keywords: [
      'VISC', 'VITC', 'VNUA',
      'trung tâm tin học VNUA',
      'trung tâm kỹ năng mềm VNUA',
      'đào tạo tin học',
      'đào tạo kỹ năng mềm',
      'chứng chỉ ICDL',
      'chuẩn đầu ra tin học',
    ],
  },

  // IT Training Page
  'tin-hoc': {
    title: 'Trung tâm Tin học - VISC',
    description: 'Các khóa học tin học chuyên nghiệp: Chuẩn đầu ra Tin học VNUA, Chứng chỉ quốc tế ICDL, Tin học văn phòng, Ứng dụng CNTT cơ bản. Giảng viên giàu kinh nghiệm, lịch học linh hoạt.',
    keywords: [
      'tin học VNUA',
      'chuẩn đầu ra tin học',
      'ICDL',
      'tin học văn phòng',
      'Microsoft Office',
      'Word Excel PowerPoint',
      'ứng dụng CNTT',
      'khóa học tin học',
    ],
  },

  // Soft Skills Training Page
  'ky-nang-mem': {
    title: 'Trung tâm Kỹ năng mềm - VISC',
    description: 'Đào tạo kỹ năng mềm thiết yếu: Kỹ năng giao tiếp, làm việc nhóm, tư duy sáng tạo, lãnh đạo, thuyết trình. Phương pháp đào tạo hiện đại, thực hành thực tế.',
    keywords: [
      'kỹ năng mềm VNUA',
      'soft skills',
      'kỹ năng giao tiếp',
      'làm việc nhóm',
      'tư duy sáng tạo',
      'kỹ năng lãnh đạo',
      'kỹ năng thuyết trình',
      'rèn luyện kỹ năng',
    ],
  },

  // Courses Listing
  'khoa-hoc': {
    title: 'Khóa học - VISC',
    description: 'Danh sách các khóa học Tin học và Kỹ năng mềm tại VISC. Thông tin chi tiết về chương trình, học phí, lịch khai giảng và đăng ký học.',
    keywords: [
      'khóa học tin học',
      'khóa học kỹ năng mềm',
      'lịch khai giảng',
      'đăng ký học',
      'học phí',
      'chương trình đào tạo',
    ],
  },

  // Library/Resources
  'thu-vien': {
    title: 'Thư viện - VISC',
    description: 'Thư viện tài liệu học tập: Video bài giảng, giáo trình, tài liệu tham khảo, bài tập thực hành. Phục vụ học viên và người quan tâm.',
    keywords: [
      'thư viện học liệu',
      'tài liệu học tập',
      'video bài giảng',
      'giáo trình tin học',
      'tài liệu tham khảo',
      'bài tập thực hành',
    ],
  },

  // Utilities & Services
  'tien-ich-dich-vu': {
    title: 'Tiện ích & Dịch vụ - VISC',
    description: 'Tra cứu điểm thi, tra cứu chứng chỉ, lịch thi, lịch khai giảng và các dịch vụ hỗ trợ học viên khác.',
    keywords: [
      'tra cứu điểm thi',
      'tra cứu chứng chỉ',
      'lịch thi',
      'lịch khai giảng',
      'dịch vụ học viên',
      'tiện ích VISC',
    ],
  },

  // News & Announcements
  'tin-tuc-thong-bao': {
    title: 'Tin tức - Thông báo - VISC',
    description: 'Tin tức mới nhất, thông báo quan trọng, sự kiện, hoạt động và các thông tin cập nhật từ Trung tâm Tin học và Kỹ năng mềm VNUA.',
    keywords: [
      'tin tức VISC',
      'thông báo',
      'sự kiện',
      'hoạt động',
      'tin tức tin học',
      'tin tức kỹ năng mềm',
    ],
  },

  // Contact Page
  'lien-he': {
    title: 'Liên hệ - VISC',
    description: `Thông tin liên hệ Trung tâm Tin học và Kỹ năng mềm VNUA. Địa chỉ: ${siteConfig.contact.address}, ${siteConfig.contact.fullAddress}. Điện thoại: ${siteConfig.contact.phoneIT} (Tin học), ${siteConfig.contact.phoneSoftSkills} (Kỹ năng mềm). Email: ${siteConfig.contact.email}`,
    keywords: [
      'liên hệ VISC',
      'địa chỉ trung tâm',
      'số điện thoại',
      'email',
      'bản đồ',
      'giờ làm việc',
    ],
  },
} as const;

/**
 * Default keywords for all pages
 */
export const DEFAULT_KEYWORDS = [
  'VISC',
  'VITC',
  'VNUA',
  'Học viện Nông nghiệp Việt Nam',
  'trung tâm tin học',
  'trung tâm kỹ năng mềm',
  'đào tạo tin học',
  'đào tạo kỹ năng mềm',
  'chứng chỉ tin học',
  'khóa học',
  'Hà Nội',
] as const;

/**
 * Generate page title with site name suffix
 */
export function getPageTitle(pageKey: keyof typeof PAGE_METADATA): string {
  const metadata = PAGE_METADATA[pageKey];
  if (!metadata) {
    return siteConfig.fullName;
  }
  return pageKey === 'home' 
    ? metadata.title 
    : `${metadata.title} | ${siteConfig.name}`;
}

/**
 * Merge page keywords with default keywords
 */
export function getPageKeywords(pageKey: keyof typeof PAGE_METADATA): string[] {
  const metadata = PAGE_METADATA[pageKey];
  if (!metadata) {
    return [...DEFAULT_KEYWORDS];
  }
  return [...(metadata.keywords || []), ...DEFAULT_KEYWORDS];
}
