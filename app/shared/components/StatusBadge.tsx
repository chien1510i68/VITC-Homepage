import React from 'react';
import { StatusBadgeProps } from '../types';
import { cn } from '@/lib/utils';

const VARIANT_CLASSES = {
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  primary: 'bg-sky-100 text-sky-700 border-sky-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
} as const;

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'default',
  className,
}) => {
  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border',
      VARIANT_CLASSES[variant],
      className
    )}>
      <span className={cn(
        'w-2 h-2 rounded-full',
        variant === 'success' && 'bg-green-500',
        variant === 'warning' && 'bg-yellow-500',
        variant === 'error' && 'bg-red-500',
        variant === 'info' && 'bg-blue-500',
        variant === 'primary' && 'bg-sky-500',
        variant === 'default' && 'bg-gray-500'
      )} />
      {status}
    </span>
  );
};
