/**
 * Ky-nang-mem component exports
 * Re-exports shared components from app/shared and local domain-specific components
 */

// Shared components from app/shared/components
export { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Button,
  Badge,
  Container,
  FilterButtons,
  InstructorCard,
  EmptyState
} from '@/app/shared/components';

export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  ButtonProps,
  BadgeProps,
  ContainerProps,
  FilterButtonsProps,
  InstructorCardProps
} from '@/app/shared/components';

// Local domain-specific components
export { SectionHeader } from './SectionHeader';
export { AnimatedSection } from './AnimatedSection';
export { FeatureIcon } from './FeatureIcon';
export { InstructorCarousel } from './InstructorCarousel';
export { LeaderCard } from './LeaderCard';
export { MemoizedInstructorCard, MemoizedLeaderCard, MemoizedButton } from './Memoized';

// Shared-but-reexported for convenience in this module
export { ImageWithFallback, StatGrid, StatItem, CarouselIndicators, CarouselNavigation } from '@/app/shared/components';
export type { ImageWithFallbackProps } from '@/app/shared/components';


