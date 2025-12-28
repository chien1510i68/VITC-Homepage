import { InstructorCardProps } from './types';

/**
 * Default props for InstructorCard
 */
export const DEFAULT_PROPS = {
  size: 'md' as const,
  showDegree: true,
  className: '',
  delay: 0,
};

/**
 * Size variants for instructor cards
 */
export const SIZE_STYLES = {
  sm: {
    avatar: 'w-20 h-20',
    padding: 'p-4',
    nameSize: 'text-sm',
    specialtySize: 'text-xs',
    degreeSize: 'text-xs',
  },
  md: {
    avatar: 'w-28 h-28',
    padding: 'p-5',
    nameSize: 'text-base',
    specialtySize: 'text-sm',
    degreeSize: 'text-xs',
  },
  lg: {
    avatar: 'w-36 h-36',
    padding: 'p-6',
    nameSize: 'text-lg',
    specialtySize: 'text-base',
    degreeSize: 'text-sm',
  },
} as const;
