/**
 * LookupSection Constants
 * Default values and configuration for the LookupSection component
 */

import { LookupSectionProps } from './types';

/**
 * Default props for LookupSection
 */
export const DEFAULT_PROPS: Required<Omit<LookupSectionProps, 'className' | 'onSearch'>> = {
  title: 'Tra cứu điểm thi & Chứng chỉ',
  subtitle: 'Tra cứu kết quả thi và tải chứng chỉ của bạn một cách nhanh chóng',
  sectionId: 'tra-cuu',
  badge: 'Tra cứu thông tin',
  showScoreTab: true,
  showCertificateTab: true,
  contactEmail: 'support@visc.edu.vn',
  contactPhone: '0123456789',
};

/**
 * Certificate type options for dropdown
 */
export const CERTIFICATE_TYPES = [
  { value: 'all', label: 'Tất cả loại chứng chỉ' },
  { value: 'Chứng chỉ UDCNTT cơ bản TT 03 của Bộ TT&TT', label: 'UDCNTT Cơ bản' },
  { value: 'Chứng chỉ UDCNTT nâng cao TT 03 của Bộ TT&TT', label: 'UDCNTT Nâng cao' },
  { value: 'Chuẩn đầu ra Tin học', label: 'Chuẩn đầu ra Tin học' },
  { value: 'Chuẩn đầu ra KNM', label: 'Chuẩn đầu ra KNM' },
] as const;

/**
 * Help text for each lookup type
 */
export const HELP_TEXT = {
  score: 'Nhập số CCCD/CMND/MSV để tra cứu kết quả thi của bạn. Bấm Enter hoặc click nút "Tra cứu" để tìm kiếm.',
  certificate: 'Nhập số CCCD/CMND/MSV để tra cứu chứng chỉ. Bạn có thể lọc thêm theo loại chứng chỉ để kết quả chính xác hơn.',
} as const;
