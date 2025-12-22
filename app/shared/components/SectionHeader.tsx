import React from 'react';
import { SectionHeaderProps } from '../types';
import { cn } from '@/lib/utils';

const BADGE_VARIANTS = {
  primary: 'bg-sky-100 text-sky-700',
  secondary: 'bg-emerald-100 text-emerald-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
} as const;

const ALIGNMENT_CLASSES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'primary',
  title,
  description,
  alignment = 'center',
  className,
}) => {
  return (
    <div className={cn(ALIGNMENT_CLASSES[alignment], 'mb-12', className)}>
      {badge && (
        <div className={cn(
          'inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4',
          BADGE_VARIANTS[badgeVariant]
        )}>
          {badge}
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          'text-lg text-gray-600 leading-relaxed',
          alignment === 'center' && 'max-w-3xl mx-auto',
          alignment === 'left' && 'max-w-3xl',
          alignment === 'right' && 'max-w-3xl ml-auto'
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
