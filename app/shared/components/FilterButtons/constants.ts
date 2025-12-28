import { FilterButtonsProps } from './types';

/**
 * Default props for FilterButtons component
 */
export const DEFAULT_PROPS = {
  variant: 'gradient' as const,
  size: 'md' as const,
  className: '',
};

/**
 * Style variants for filter buttons
 */
export const BUTTON_STYLES = {
  gradient: {
    active: 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow-md',
    inactive: 'bg-white text-slate-700 border border-slate-200 hover:border-sky-600 hover:text-sky-600',
    dot: {
      active: 'bg-white/80',
      inactive: 'bg-slate-200',
    },
  },
  solid: {
    active: 'bg-green-600 text-white shadow-md',
    inactive: 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600',
    dot: {
      active: 'bg-white',
      inactive: 'bg-gray-400',
    },
  },
  outline: {
    active: 'bg-green-50 border-2 border-green-600 text-green-700 font-semibold',
    inactive: 'bg-white border border-gray-300 text-gray-700 hover:border-green-500',
    dot: {
      active: 'bg-green-600',
      inactive: 'bg-gray-300',
    },
  },
} as const;

/**
 * Size variants for filter buttons
 */
export const SIZE_STYLES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
} as const;
