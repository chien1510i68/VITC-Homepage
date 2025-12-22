'use client';

import React from 'react';
import { TabButtonsProps, TabOption } from '../types';
import { cn } from '@/lib/utils';

const VARIANT_STYLES = {
  default: {
    container: 'flex gap-2 overflow-x-auto pb-1',
    button: {
      base: 'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap',
      active: 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow-md',
      inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-sky-600 hover:text-sky-600',
    },
  },
  pills: {
    container: 'flex gap-2 overflow-x-auto pb-1',
    button: {
      base: 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap',
      active: 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow-md border-transparent',
      inactive: 'bg-white text-gray-700 border border-gray-200 hover:border-sky-600 hover:text-sky-600',
    },
  },
  underline: {
    container: 'flex gap-6 border-b border-gray-200 overflow-x-auto',
    button: {
      base: 'relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
      active: 'text-sky-600',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
  },
} as const;

export function TabButtons<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className,
}: TabButtonsProps<T>) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div className={cn(styles.container, className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              styles.button.base,
              isActive ? styles.button.active : styles.button.inactive
            )}
            aria-pressed={isActive}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(
                'ml-1 text-xs',
                isActive ? 'text-white/80' : 'text-gray-400'
              )}>
                ({tab.count})
              </span>
            )}
            
            {/* Underline indicator for underline variant */}
            {variant === 'underline' && isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />
            )}
            
            {/* Dot indicator for other variants */}
            {variant !== 'underline' && (
              <span className={cn(
                'w-2 h-2 rounded-full',
                isActive ? 'bg-white/80' : 'bg-gray-200'
              )} />
            )}
          </button>
        );
      })}
    </div>
  );
}
