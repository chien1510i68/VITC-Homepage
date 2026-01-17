'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThuVienSectionProps, LibraryItem } from './types';

const TYPE_LABELS = {
  document: 'Tài liệu',
  slide: 'Slide',
  video: 'Video'
} as const;

const TYPE_COLORS = {
  document: 'bg-green-100 text-green-700',
  slide: 'bg-emerald-100 text-emerald-700',
  video: 'bg-violet-100 text-violet-700'
} as const;

// Placeholder image - using existing asset
const PLACEHOLDER_IMAGE = '/images/thu-vien/document-image.avif';

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

// Document Card Component
function DocumentCard({ item }: { item: LibraryItem }) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = imageError || !item.image ? PLACEHOLDER_IMAGE : item.image;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden cursor-pointer">
      <a href={item.url} target="_blank" rel="noreferrer" className="block">
        <div className="relative h-40 sm:h-44 bg-slate-100 overflow-hidden">
          <Image
            src={imageSrc}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
          {item.type && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${TYPE_COLORS[item.type]}`}>
                {TYPE_LABELS[item.type]}
              </span>
            </div>
          )}
        </div>
      </a>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="mb-2 sm:mb-3">
          <a 
            href={item.url} 
            target="_blank" 
            rel="noreferrer" 
            className="text-base sm:text-lg font-semibold text-slate-900 hover:text-green-600 line-clamp-2"
          >
            {item.title}
          </a>
        </div>

        {item.excerpt && (
          <div className="flex-1 mb-2 sm:mb-3">
            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">{item.excerpt}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto">
          <span className="text-slate-500 text-xs sm:text-sm">{formatDate(item.date || '')}</span>
          {item.fileUrl && (
            <a 
              href={item.fileUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-slate-700 hover:bg-slate-100 focus:ring-slate-500 px-3 py-1.5 text-xs sm:text-sm min-h-[36px] cursor-pointer w-full sm:w-auto"
            >
              Tải xuống
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ThuVienSection({
  title = 'Tài liệu & Thư viện',
  description = 'Tổng hợp tài liệu, slide, và video hỗ trợ học tập kỹ năng mềm',
  label = 'Thư viện',
  items = [],
  maxItems = 6,
  className = '',
  id,
  showViewAll = true,
  viewAllLink = '/thu-vien',
}: ThuVienSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const displayItems = items.slice(0, maxItems);

  return (
    <section
      ref={sectionRef}
      id={id || undefined}
      className={`py-8 sm:py-10 md:py-12 lg:py-16 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {label}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 px-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {displayItems.map((item) => (
            <DocumentCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && displayItems.length > 0 && (
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Xem tất cả tài liệu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

