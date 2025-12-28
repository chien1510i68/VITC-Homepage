"use client";

import { TAILWIND_COLORS } from '@/lib/colors';
import { STYLES } from './constants';

export default function LoadingState() {
  return (
    <section className={STYLES.loadingState} id="programs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
        <p className="text-gray-600 mt-6">Đang tải chương trình học...</p>
      </div>
    </section>
  );
}