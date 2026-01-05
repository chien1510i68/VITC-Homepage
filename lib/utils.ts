import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * 
 * Combines multiple class values and resolves conflicts using tailwind-merge.
 * This is useful for creating component variants and allowing className overrides.
 * 
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string with conflicts resolved
 * 
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500') // 'px-4 py-2 bg-blue-500'
 * 
 * // Conditional classes
 * cn('base-class', isActive && 'active-class') // 'base-class active-class' (if isActive is true)
 * 
 * // Resolving conflicts (later classes win)
 * cn('p-4', 'p-6') // 'p-6'
 * 
 * // Component with className override
 * <div className={cn('default-classes', className)} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
