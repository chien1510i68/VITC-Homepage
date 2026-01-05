'use client';

import React from 'react';
import { EmptyStateProps } from '../types';
import { cn } from '@/lib/utils';
import { FileQuestion, Search, AlertCircle, Info } from 'lucide-react';

const VARIANT_CONFIG = {
  'no-results': {
    icon: Search,
    iconColor: 'text-gray-400',
    title: 'Không tìm thấy kết quả',
    description: 'Vui lòng thử lại với từ khóa khác',
  },
  'no-data': {
    icon: FileQuestion,
    iconColor: 'text-gray-400',
    title: 'Chưa có dữ liệu',
    description: 'Hiện tại chưa có dữ liệu để hiển thị',
  },
  'error': {
    icon: AlertCircle,
    iconColor: 'text-red-400',
    title: 'Có lỗi xảy ra',
    description: 'Vui lòng thử lại sau',
  },
  'coming-soon': {
    icon: Info,
    iconColor: 'text-blue-400',
    title: 'Sắp ra mắt',
    description: 'Tính năng này đang được phát triển',
  },
} as const;

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'no-data',
  title,
  description,
  action,
  className,
}) => {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className={cn('mb-4 p-4 bg-gray-50 rounded-full', config.iconColor)}>
        <Icon className="w-12 h-12" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title || config.title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description || config.description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
