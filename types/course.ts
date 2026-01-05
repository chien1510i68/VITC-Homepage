/**
 * Course Related Types
 * Centralized type definitions for courses, programs, and schedules
 */

/**
 * Course program information
 */
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

/**
 * Detailed instructor information embedded in course
 */
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

/**
 * Course syllabus module structure
 */
export interface SyllabusModule {
  module: string;
  title: string;
  hours: number;
}

/**
 * Course schedule for upcoming classes
 */
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
