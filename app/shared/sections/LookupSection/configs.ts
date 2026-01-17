/**
 * LookupSection Configurations
 * Predefined configurations for different pages using LookupSection
 */

import { LookupSectionProps } from './types';

/**
 * Configuration for Tin Hoc (Computer Science) page
 */
export const TIN_HOC_LOOKUP_CONFIG: Partial<LookupSectionProps> = {
  sectionId: 'tra-cuu-tin-hoc',
  contactEmail: 'tinhoc@visc.edu.vn',
  contactPhone: '0123456789',
  title: 'Tra cứu điểm thi & Chứng chỉ',
  subtitle: 'Tra cứu kết quả thi và chứng chỉ Tin học của bạn một cách nhanh chóng',
  badge: 'Tra cứu thông tin',
  showScoreTab: true,
  showCertificateTab: true,
};

/**
 * Configuration for Tien Ich Dich Vu (Utilities & Services) page
 */
export const TIEN_ICH_LOOKUP_CONFIG: Partial<LookupSectionProps> = {
  sectionId: 'tra-cuu-thong-tin',
  contactEmail: 'support@vitc.edu.vn',
  contactPhone: '0123456789',
  title: 'Tra cứu điểm thi & Chứng chỉ',
  subtitle: 'Tra cứu kết quả thi và chứng chỉ của bạn một cách nhanh chóng',
  badge: 'Tra cứu thông tin',
  showScoreTab: true,
  showCertificateTab: true,
};

/**
 * Configuration for Ky Nang Mem (Soft Skills) page
 */
export const KY_NANG_MEM_LOOKUP_CONFIG: Partial<LookupSectionProps> = {
  sectionId: 'tra-cuu-ky-nang-mem',
  contactEmail: 'kynanmem@vitc.edu.vn',
  contactPhone: '0123456789',
  title: 'Tra cứu điểm thi & Chứng chỉ Kỹ năng mềm',
  subtitle: 'Tra cứu kết quả thi và chứng chỉ Kỹ năng mềm của bạn',
  badge: 'Tra cứu thông tin',
  showScoreTab: true,
  showCertificateTab: true,
};
