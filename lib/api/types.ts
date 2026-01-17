// API Types for VITC Homepage

export interface Program {
  id: number | string; // Support both number and UUID string
  title: string;
  category: string;
  type?: string; // IT, SOFT_SKILLS, etc.
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
 * Course Basic Info - Minimal course information
 * Response from: /courses/basic-info
 */
export interface CourseBasicInfo {
  id: string;
  title: string;
  courseCode: string;
  type?: string; // Course type (IT, SOFT_SKILLS, etc.)
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
  id: number | string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  slug?: string;
  content?: string;
}

/**
 * Backend News Category Model
 */
export interface NewsCategory {
  id: string;
  code: string;
  name: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Backend News Model
 * Matches the Java backend News entity
 */
export interface BackendNews {
  id: string;
  title: string;
  summary?: string;
  contentHtml: string;
  imageUrl?: string;
  categories?: NewsCategory[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  slug?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
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

/**
 * Backend Course Model
 * Matches the Java backend Course entity
 */
export interface BackendCourse {
  id: string;
  courseCode: string;
  title: string;
  slug: string;
  type?: string;
  thumbnailUrl?: string;
  price: number;
  duration?: number;
  level?: string;
  descriptionHtml?: string;
  subject?: string;
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  instructor?: BackendInstructor;
  benefitsHtml?: string;
  highlights?: string[];
  syllabus?: SyllabusModule[];
  requirements?: string[];
}

/**
 * Backend Instructor Model
 * Embedded in Course response
 */
export interface BackendInstructor {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  description?: string;
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
  theoryScore: string | number;
  practiceScore: string | number;
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

/**
 * Backend API Response Format
 * Matches the Java backend response structure
 */
export interface BackendApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  timestamp?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Paginated Response from Backend
 * Used for list endpoints with pagination
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

/**
 * Course Filter Request Parameters
 * Used for POST /api/v1/courses/filter
 */
export interface CourseFilterRequest {
  id?: string;
  courseCode?: string;
  slug?: string;
  type?: string;
  level?: string;
  subject?: string;
  status?: string;
  page?: number;
  size?: number;
}

/**
 * Certificate response from CCCD lookup
 */
export interface CertificateResponse {
  id: string;
  username: string;
  dob: string;
  address: string;
  identifyNumber: string;
  gender: string | null;
  loaiChungChi: string;
  soHieu: string;
  vaoSo: string;
  ngayCap: string;
  diemLtThcb: string;
  diemThUdnc: string;
}

/**
 * Exam Result response from CCCD lookup
 * Response from: /results/cccd/{cccd}
 */
export interface ExamResultResponse {
  id: string;
  username: string;
  dob: string;
  address: string;
  identifyNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  diemLt: string;
  diemTh: string;
  diemTong: string;
  ketQua: string;
  ghiChu: string;
  kyThi: string;
  ngayThi: string;
}
