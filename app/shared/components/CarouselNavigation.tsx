'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  variant?: 'default' | 'minimal';
}

export function CarouselNavigation({
  onPrevious,
  onNext,
  canScrollLeft,
  canScrollRight,
  variant = 'default',
}: CarouselNavigationProps) {
  if (variant === 'minimal') {
    return (
      <div className="flex gap-4">
        <button
          onClick={onPrevious}
          disabled={!canScrollLeft}
          aria-label="Trước"
          className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
        </button>

        <button
          onClick={onNext}
          disabled={!canScrollRight}
          aria-label="Sau"
          className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onPrevious}
        disabled={!canScrollLeft}
        className={`p-2 rounded-lg border-2 transition-all duration-200 ${
          canScrollLeft
            ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white cursor-pointer'
            : 'border-slate-200 text-slate-300 cursor-not-allowed'
        }`}
        aria-label="Trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!canScrollRight}
        className={`p-2 rounded-lg border-2 transition-all duration-200 ${
          canScrollRight
            ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white cursor-pointer'
            : 'border-slate-200 text-slate-300 cursor-not-allowed'
        }`}
        aria-label="Sau"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
