interface FormData {
  name: string;
  phone: string;
  course: string;
}

export interface CourseOption {
  value: string;
  label: string;
}

export interface ConsultationPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export const courseOptions: CourseOption[] = [
  { value: '', label: 'Chọn khóa học quan tâm' },
  { value: 'tin-hoc-van-phong', label: 'Tin học văn phòng' },
  { value: 'ke-toan-may-tinh', label: 'Kế toán trên máy tính' },
  { value: 'thiet-ke-do-hoa', label: 'Thiết kế đồ họa' },
  { value: 'ung-dung-cntt', label: 'Ứng dụng CNTT' },
  { value: 'lap-trinh-web', label: 'Lập trình Web' },
  { value: 'khac', label: 'Khóa học khác' }
];

export type { FormData };