'use client';

import React, { useEffect } from 'react';
import { ErrorToastProps } from '../types';
import { cn } from '@/lib/utils';
import { X, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const VARIANT_CONFIG = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-800',
    icon: AlertCircle,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-800',
    icon: AlertTriangle,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-800',
    icon: Info,
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-800',
    icon: CheckCircle,
  },
} as const;

const POSITION_CLASSES = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
} as const;

export const ErrorToast: React.FC<ErrorToastProps> = ({
  message,
  duration = 5000,
  onClose,
  variant = 'error',
  position = 'top-right',
}) => {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={cn(
      'fixed z-50 animate-in slide-in-from-top-5 fade-in duration-300',
      POSITION_CLASSES[position]
    )}>
      <div className={cn(
        'flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 max-w-md',
        config.bg,
        config.border
      )}>
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.text)} />
        
        <p className={cn('flex-1 text-sm font-medium', config.text)}>
          {message}
        </p>
        
        <button
          onClick={onClose}
          className={cn(
            'flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors',
            config.text
          )}
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
