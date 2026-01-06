/**
 * API Response Types
 * Generic API response structures and utility types
 */

/**
 * Generic API response wrapper
 * @template T - The type of data returned in the response
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Backend API Response Format
 * Matches the Java backend response structure
 * @template T - The type of data returned in the response
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
 * @template T - The type of items in the list
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

/**
 * Course Filter Request Parameters
 * Used for POST /api/courses/filter
 */
export interface CourseFilterRequest {
  id?: string;
  courseCode?: string;
  slug?: string;
  categoryCode?: string;
  level?: string;
  subject?: string;
  status?: string;
  page?: number;
  size?: number;
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
  categoryCode?: string;
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
  syllabus?: Array<{ module: string; title: string; hours: number }>;
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

/**
 * Timeline item for about/history sections
 */
export interface AboutTimeline {
  id: number;
  image: string;
  title: string;
  description: string;
  year?: string;
}

/**
 * Lookup result for exam/certificate search
 */
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

/**
 * Pagination metadata for list endpoints
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
