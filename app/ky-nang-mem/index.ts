/**
 * Kỹ Năng Mềm Module - Public API
 * 
 * This file exports all public APIs from the Kỹ Năng Mềm module
 * enabling easy imports from other parts of the application.
 * 
 * @example
 * ```typescript
 * // Import types
 * import type { Course, Instructor } from '@/app/ky-nang-mem';
 * 
 * // Import components
 * import { Button, Card, SectionHeader } from '@/app/ky-nang-mem';
 * 
 * // Import hooks
 * import { useCarousel, useIntersectionObserver } from '@/app/ky-nang-mem';
 * 
 * // Import utilities
 * import { formatDate, slugify } from '@/app/ky-nang-mem';
 * 
 * // Import constants
 * import { REQUIRED_COURSES, HEADING_1 } from '@/app/ky-nang-mem';
 * ```
 */

// ============================================================================
// Types
// ============================================================================
export type {
  Course,
  NewsItem,
  LibraryItem,
  Instructor,
  Leader,
  Feature,
  IntroductionSection,
  CourseCategory,
  FilterType
} from './types';

// ============================================================================
// Components
// ============================================================================

// Layout Components
export { SectionHeader } from './components/SectionHeader';
export { Container } from '@/app/shared/components';
export { AnimatedSection } from './components/AnimatedSection';

// UI Components
export { Button } from '@/app/shared/components';
export type { ButtonProps } from '@/app/shared/components';

export { Card, CardHeader, CardBody, CardFooter } from '@/app/shared/components';
export type { CardProps } from '@/app/shared/components';

export { Badge } from '@/app/shared/components';
export type { BadgeProps } from '@/app/shared/components';

export { EmptyState } from '@/app/shared/components';

export { ImageWithFallback } from '@/app/shared/components';
export type { ImageWithFallbackProps } from '@/app/shared/components';

// Interactive Components
export { CarouselNavigation, CarouselIndicators } from '@/app/shared/components';
export { FilterButtons } from '@/app/shared/components';
export type { FilterButtonsProps } from '@/app/shared/components';

// Display Components
export { StatGrid, StatItem } from '@/app/shared/components';
export { FeatureIcon } from './components/FeatureIcon';

// Domain Components
export { InstructorCard } from '@/app/shared/components';
export { LeaderCard } from './components/LeaderCard';
export { InstructorCarousel } from './components/InstructorCarousel';

// Performance-Optimized Components
export {
  MemoizedInstructorCard,
  MemoizedLeaderCard,
  MemoizedButton,
  MemoizedBadge,
  MemoizedCard
} from './components/Memoized';

// ============================================================================
// Hooks
// ============================================================================
export { useIntersectionObserver } from './hooks/useIntersectionObserver';
export { useCarousel } from './hooks/useCarousel';
export { useCountUp } from './hooks/useCountUp';
export { useScrollable } from './hooks/useScrollable';

// ============================================================================
// Utilities
// ============================================================================

// Animation utilities
export {
  ANIMATION_DURATIONS,
  TRANSITIONS,
  getTransitionDelay,
  fadeInAnimation
} from './utils/animations';

// Formatters
export {
  truncate,
  capitalize,
  slugify,
  formatNumber,
  formatCurrency,
  formatDate,
  formatRelativeTime
} from './utils/formatters';

// Validators
export {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isEmpty
} from './utils/validators';

// Helpers
export {
  groupBy,
  unique,
  chunk,
  shuffle,
  omit,
  pick
} from './utils/helpers';

// ============================================================================
// Constants - Data
// ============================================================================
export {
  COURSE_CATEGORIES,
  REQUIRED_COURSES,
  ON_DEMAND_COURSES,
  ALL_COURSES
} from './constants/courses';

export {
  LEADERSHIP,
  INTERNAL_INSTRUCTORS,
  COMPANY_LEADERS,
  EXPERTS,
  INSTRUCTOR_FILTERS,
  ALL_INSTRUCTORS
} from './constants/instructors';

export {
  SAMPLE_NEWS,
  NEWS_CATEGORIES
} from './constants/news';

export {
  SAMPLE_LIBRARY,
  LIBRARY_TYPES,
  LIBRARY_SORT_OPTIONS
} from './constants/library';

export { FEATURES } from './constants/features';
export { CAROUSEL_IMAGES, HERO_STATS } from './constants/hero';
export { INTRODUCTION_SECTIONS } from './constants/introduction';

// ============================================================================
// Constants - Design System
// ============================================================================
export {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  FONT_SIZES
} from './constants/styles';

export {
  // Section Padding
  SECTION_PADDING,
  SECTION_PADDING_LG,
  
  // Containers
  CONTAINER_BASE,
  CONTAINER_NARROW,
  CONTAINER_NORMAL,
  CONTAINER_WIDE,
  
  // Typography
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  TEXT_BODY,
  TEXT_SUBTITLE,
  TEXT_MUTED,
  TEXT_LABEL,
  
  // Cards
  CARD_BASE,
  CARD_HOVER,
  CARD_INTERACTIVE,
  
  // Gradients
  GRADIENT_PRIMARY,
  GRADIENT_SECONDARY,
  TEXT_GRADIENT,
  
  // Grids
  GRID_2,
  GRID_3,
  GRID_4,
  
  // Interactive
  FOCUS_RING,
  TRANSITION_DEFAULT,
  TRANSITION_SLOW
} from './constants/classNames';
