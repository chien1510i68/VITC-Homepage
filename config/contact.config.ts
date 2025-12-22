/**
 * Contact Information Configuration
 * Centralized contact details used across the application
 */

export const CONTACT_INFO = {
  address: 'Số 1 Giải Phóng, Quận Hai Bà Trưng, Hà Nội',
  phone: '0123456789',
  phoneFormatted: '0123.456.789',
  email: 'info@visc.edu.vn',
  emailSupport: 'support@visc.edu.vn',
  workingHours: 'Thứ 2 - Thứ 7: 8:00 - 17:00',
  website: 'https://visc.edu.vn',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/visc.edu.vn',
  youtube: 'https://youtube.com/@visc',
  zalo: 'https://zalo.me/visc',
} as const;

export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Về VISC',
    links: [
      { title: 'Giới thiệu', href: '/gioi-thieu' },
      { title: 'Đội ngũ giảng viên', href: '/doi-ngu' },
      { title: 'Thành tích', href: '/thanh-tich' },
      { title: 'Liên hệ', href: '/lien-he' },
    ]
  },
  {
    title: 'Khóa học',
    links: [
      { title: 'Tin học văn phòng', href: '/tin-hoc' },
      { title: 'Kỹ năng mềm', href: '/ky-nang-mem' },
      { title: 'Thư viện', href: '/thu-vien' },
      { title: 'Lịch khai giảng', href: '/tin-hoc#schedule' },
    ]
  },
  {
    title: 'Hỗ trợ',
    links: [
      { title: 'Tra cứu chứng chỉ', href: '/tien-ich-dich-vu' },
      { title: 'Tra cứu điểm thi', href: '/tien-ich-dich-vu' },
      { title: 'Tin tức', href: '/tin-tuc-thong-bao' },
      { title: 'Câu hỏi thường gặp', href: '/faq' },
    ]
  },
  {
    title: 'Pháp lý',
    links: [
      { title: 'Điều khoản sử dụng', href: '/terms' },
      { title: 'Chính sách bảo mật', href: '/privacy' },
      { title: 'Chính sách hoàn tiền', href: '/refund' },
      { title: 'Quy chế đào tạo', href: '/regulations' },
    ]
  }
];

export const COPYRIGHT_TEXT = '© 2025 VISC. All rights reserved.';
export const COPYRIGHT_YEAR = new Date().getFullYear();
