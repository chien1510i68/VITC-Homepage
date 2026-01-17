interface FormData {
  name: string;
  phone: string;
  course: string;
}

export interface ConsultationPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export type { FormData };