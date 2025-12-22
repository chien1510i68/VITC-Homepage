import React from 'react';
import { LoadingStateProps } from '../types';
import { cn } from '@/lib/utils';

const VARIANT_CLASSES = {
  section: 'py-16 md:py-24',
  inline: 'py-4',
  fullscreen: 'min-h-screen flex items-center justify-center',
} as const;

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Đang tải...',
  variant = 'section',
  className,
}) => {
  return (
    <div className={cn(VARIANT_CLASSES[variant], 'text-center', className)}>
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-sky-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Message */}
        <p className="text-gray-600 text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
};
