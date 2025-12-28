/**
 * FilterButtons Types
 */

/**
 * Generic filter configuration
 */
export interface Filter<T extends string = string> {
  /** Unique filter identifier */
  id: T;
  
  /** Display label */
  label: string;
  
  /** Optional count badge */
  count?: number;
}

/**
 * Props for FilterButtons component
 */
export interface FilterButtonsProps<T extends string = string> {
  /** Array of filter options */
  filters: Filter<T>[];
  
  /** Currently active filter ID */
  activeFilter: T;
  
  /** Callback when filter changes */
  onChange: (filter: T) => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Visual style variant */
  variant?: 'gradient' | 'solid' | 'outline';
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}
