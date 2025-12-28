import { Schedule, ScheduleSectionProps } from './types';

/**
 * Default schedule data for VISC
 */
export const DEFAULT_SCHEDULES: Schedule[] = [
  {
    id: 'UD2527',
    className: 'UD2527',
    time: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '2025-11-29',
    location: 'Ms.Teams',
    subject: 'Chuẩn đầu ra Tin học VNUA',
    status: 'Sắp khai giảng',
  },
  {
    id: 'UDCB2526',
    className: 'UDCB2526',
    time: 'Sáng: 08h00 - 11h30 Chiều: 13h00 - 17h00',
    startDate: '2025-11-16',
    location: 'Ms.Teams',
    subject: 'Ứng dụng CNTT cơ bản & Nâng Cao',
    status: 'Sắp khai giảng',
  },
  {
    id: 'ICDL2513',
    className: 'ICDL2513',
    time: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '2025-11-11',
    location: 'Ms.Teams',
    subject: 'Chứng chỉ Quốc tế ICDL',
    status: 'Đang học',
  },
  {
    id: 'ICDL2514',
    className: 'ICDL2514',
    time: 'Thứ 2/4/6 (18:00 - 20:30)',
    startDate: '2025-11-28',
    location: 'Ms.Teams',
    subject: 'Chứng chỉ Quốc tế ICDL',
    status: 'Sắp khai giảng',
  },
  {
    id: 'UD2526',
    className: 'UD2526',
    time: 'Thứ 2/4/6 (18:00 - 20:30)',
    startDate: '2025-11-17',
    location: 'Ms.Teams',
    subject: 'Chuẩn đầu ra Tin học VNUA',
    status: 'Sắp khai giảng',
  },
  {
    id: 'UD2525',
    className: 'UD2525',
    time: 'Thứ 3/5/7 (18:00 - 20:30)',
    startDate: '2025-11-06',
    location: 'Ms.Teams',
    subject: 'Chuẩn đầu ra Tin học VNUA',
    status: 'Đang học',
  },
];

/**
 * Default props for ScheduleSection
 */
export const DEFAULT_PROPS: Required<Omit<ScheduleSectionProps, 'badge'>> = {
  title: 'Lịch khai giảng',
  subtitle: 'Tra cứu lịch khai giảng và đăng ký lớp học phù hợp với thời gian của bạn',
  sectionId: 'lich-khai-giang',
  schedules: DEFAULT_SCHEDULES,
  ctaText: 'Xem tất cả lịch khai giảng →',
  ctaLink: '/khoa-hoc',
  showCta: true,
  bgClassName: 'bg-white',
  columns: {
    className: true,
    time: true,
    startDate: true,
    location: true,
    subject: true,
  },
};

/**
 * Table column headers
 */
export const COLUMN_HEADERS = {
  className: 'Lớp',
  time: 'Thời gian',
  startDate: 'Ngày khai giảng',
  location: 'Địa điểm học',
  subject: 'Môn học',
} as const;
