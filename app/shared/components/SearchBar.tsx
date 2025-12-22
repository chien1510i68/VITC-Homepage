'use client';

import React from 'react';
import { SearchBarProps } from '../types';
import { cn } from '@/lib/utils';
import { Search, Loader2 } from 'lucide-react';

const VARIANT_STYLES = {
  default: 'h-12',
  large: 'h-14 md:h-16',
  inline: 'h-10',
} as const;

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Nhập từ khóa tìm kiếm...',
  isLoading = false,
  variant = 'default',
  className,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            'w-full pl-12 pr-24 rounded-xl border-2 border-gray-200 focus:border-sky-500 focus:outline-none transition-colors',
            'text-gray-900 placeholder:text-gray-400',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
            VARIANT_STYLES[variant],
            variant === 'large' && 'text-base md:text-lg'
          )}
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'px-4 py-2 rounded-lg',
            'bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-medium',
            'hover:shadow-lg transition-shadow',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variant === 'large' && 'px-6 py-3 text-base'
          )}
        >
          {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </div>
    </form>
  );
};
