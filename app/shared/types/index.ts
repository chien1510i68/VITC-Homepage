/**
 * Shared TypeScript Type Definitions
 * Common types used across the entire application
 */

import { ReactNode } from 'react';

// ============================================================================
// UI Component Types
// ============================================================================

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  autoPlay?: boolean;
  interval?: number;
  visibleCount?: 1 | 3 | 5;
  showNavigation?: boolean;
  showIndicators?: boolean;
  className?: string;
  onSlideChange?: (index: number) => void;
}

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning';
  title: string | ReactNode;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isLoading?: boolean;
  variant?: 'default' | 'large' | 'inline';
  className?: string;
}

export interface TabOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
  count?: number;
}

export interface TabButtonsProps<T extends string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export interface LoadingStateProps {
  message?: string;
  variant?: 'section' | 'inline' | 'fullscreen';
  className?: string;
}

export interface ErrorToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
  variant?: 'error' | 'warning' | 'info' | 'success';
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary';
  className?: string;
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

// ============================================================================
// Page-specific Types
// ============================================================================

export interface UtilityItem {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
  color: string;
}

export interface ServiceItem {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export interface ComingSoonFeature {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

export type SearchType = 'exam' | 'certificate' | 'score';

export interface SearchState {
  value: string;
  type: SearchType;
  results: any[];
  isLoading: boolean;
  hasSearched: boolean;
  error?: string;
}

// ============================================================================
// Form Types
// ============================================================================

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  program: string;
}

export interface ContactFormData extends ConsultationFormData {
  message: string;
  subject?: string;
}

// ============================================================================
// Layout Types
// ============================================================================

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'white';
  padding?: 'sm' | 'md' | 'lg';
}
