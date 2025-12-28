import React from 'react';
import { FilterButtonsProps } from './types';
import { DEFAULT_PROPS, BUTTON_STYLES, SIZE_STYLES } from './constants';

/**
 * FilterButtons Component
 * 
 * Reusable filter button group with active state management
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const filters = [
 *   { id: 'all', label: 'Tất cả', count: 10 },
 *   { id: 'tech', label: 'Công nghệ', count: 5 },
 * ];
 * 
 * <FilterButtons
 *   filters={filters}
 *   activeFilter={activeFilter}
 *   onChange={setActiveFilter}
 * />
 * ```
 */
export function FilterButtons<T extends string = string>({ 
  filters, 
  activeFilter, 
  onChange,
  className = DEFAULT_PROPS.className,
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
}: FilterButtonsProps<T>) {
  const styles = BUTTON_STYLES[variant];
  const sizeClass = SIZE_STYLES[size];

  return (
    <div className={`flex gap-2 overflow-x-auto pb-1 ${className}`}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
            aria-label={`Filter by ${filter.label}`}
            className={`
              flex items-center gap-2 rounded-full font-medium 
              transition-all duration-200 cursor-pointer whitespace-nowrap
              ${sizeClass}
              ${isActive ? styles.active : styles.inactive}
            `}
          >
            <span 
              className={`w-2 h-2 rounded-full ${
                isActive ? styles.dot.active : styles.dot.inactive
              }`} 
              aria-hidden="true"
            />
            <span>{filter.label}</span>
            {filter.count !== undefined && (
              <span className="ml-1 text-xs opacity-70">({filter.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
