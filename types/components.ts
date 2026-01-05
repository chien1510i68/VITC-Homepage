/**
 * Component Props Types
 * Shared type definitions for React component props
 */

import { ReactNode } from 'react';

/**
 * Common button variant types
 */
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';

/**
 * Common size types for components
 */
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Base component props with children
 */
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Props for components with loading state
 */
export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Props for components with error state
 */
export interface ErrorProps {
  error?: Error | string | null;
  onRetry?: () => void;
}

/**
 * Empty state variant types
 */
export type EmptyStateVariant = 'no-results' | 'no-data' | 'error' | 'coming-soon';

/**
 * Filter button configuration
 */
export interface FilterOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

/**
 * Tab configuration
 */
export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  icon?: ReactNode;
}

/**
 * Action button configuration
 */
export interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
}

/**
 * Card hover effect types
 */
export type CardHoverEffect = 'lift' | 'glow' | 'border' | 'none';

/**
 * Animation delay for staggered animations
 */
export type AnimationDelay = 0 | 100 | 200 | 300 | 400 | 500;
