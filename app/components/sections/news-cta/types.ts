// Types for news components
export interface NewsArticle {
  id: number | string;
  title: string;
  date: string;
  thumbnail: string;
  excerpt: string;
  slug: string;
}

export interface CourseOption {
  value: string;
  label: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}