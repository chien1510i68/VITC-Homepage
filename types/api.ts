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

/**
 * Paginated API response
 * @template T - The type of items in the paginated list
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: PaginationMeta;
}
