// Type definitions for Soft Skills module
export interface Course {
  id: number;
  title: string;
  category: string;
  excerpt?: string;
  image?: string;
  duration?: string;
  level?: string;
  audience?: string[];
}

export interface NewsItem {
  id?: number | string;
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  image?: string;
  contentHtml?: string;
  slug?: string;
}

export interface LibraryItem {
  id: number | string;
  title: string;
  url: string;
  excerpt?: string;
  date?: string;
  image?: string;
  fileUrl?: string;
  type?: 'document' | 'slide' | 'video';
}

export interface Instructor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  degree?: string;
  title?: string;
}

export interface Leader extends Instructor {
  title: string;
}

export interface Feature {
  icon: 'location' | 'certificate' | 'rating';
  number: string;
  target: number;
  title: string;
  description: string;
}

export interface IntroductionSection {
  id: number;
  title: string;
  description: string;
  fullContent: string;
  image: string;
  imagePosition: 'left' | 'right';
}

export type CourseCategory = 'Tất cả' | 'Bắt buộc' | 'Theo nhu cầu';
export type FilterType = 'all' | 'internal' | 'company' | 'expert';
