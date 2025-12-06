// API Types for VITC Homepage

export interface Program {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  image: string;
  duration: string;
  students: string;
  sessions: string;
  level: string;
  rating: number;
  price: string;
  completionRate: string;
  highlights: string[];
  instructor: string | InstructorDetail;
  isHot?: boolean;
  syllabus?: SyllabusModule[];
  requirements?: string[];
  benefits?: string[];
}

export interface InstructorDetail {
  name: string;
  title: string;
  bio: string;
  experience: string;
  students: string;
  courses: number;
  rating: number;
  specialties: string[];
  education: string[];
  achievements: string[];
  image?: string;
}

export interface SyllabusModule {
  module: string;
  title: string;
  hours: number;
}

export interface Instructor {
  id: number;
  name: string;
  title: string;
  experience: string;
  students: string;
  courses: number;
  image: string;
  specialty: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

export interface CourseSchedule {
  id: number;
  className: string;
  courseName: string;
  subject: string;
  schedule: string;
  startDate: string;
  location: string;
  status?: 'Sắp khai giảng' | 'Đang tuyển sinh' | 'Đã đầy';
}

export interface AboutTimeline {
  id: number;
  image: string;
  title: string;
  description: string;
  year?: string;
}

export interface LookupResult {
  id: string;
  studentName: string;
  cccd: string;
  entryNumber: string;
  birthDate: string;
  birthPlace: string;
  courseName: string;
  certificateType: string;
  theoryScore: number;
  practiceScore: number;
  finalScore: number;
  result: string;
  examDate: string;
  issueDate: string;
  certificateId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
