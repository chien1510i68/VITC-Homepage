/**
 * Centralized Type Definitions
 * Re-export all types for easy importing throughout the application
 * 
 * @example
 * ```typescript
 * // Instead of multiple imports:
 * import { Program } from '@/types/course';
 * import { Instructor } from '@/types/instructor';
 * 
 * // You can do:
 * import { Program, Instructor } from '@/types';
 * ```
 */

// Course related types
export type {
  Program,
  InstructorDetail,
  SyllabusModule,
  CourseSchedule,
} from './course';

// Instructor types
export type { Instructor } from './instructor';

// News types
export type { NewsArticle } from './news';

// API types
export type {
  ApiResponse,
  AboutTimeline,
  LookupResult,
  PaginationMeta,
  PaginatedResponse,
} from './api';

// Component types
export type {
  ButtonVariant,
  ComponentSize,
  BaseComponentProps,
  LoadingProps,
  ErrorProps,
  EmptyStateVariant,
  FilterOption,
  TabOption,
  ActionButton,
  CardHoverEffect,
  AnimationDelay,
} from './components';
