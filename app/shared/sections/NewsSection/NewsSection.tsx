'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { NewsSectionProps } from './types';

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

function NewsCardHorizontal({ item, index }: { item: any; index: number }) {
  return (
    <div key={`${item.id}-${index}`} className="flex-shrink-0 w-[340px] group">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-300 hover:-translate-y-2 h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <Image
            src={item.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h4>
          {item.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(item.date || '')}
            </span>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Xem thêm <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsCardList({ item, idx }: { item: any; idx: number }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex overflow-hidden cursor-pointer min-h-[128px] sm:min-h-[144px] md:min-h-[160px]">
      {/* Image - Left Side */}
      <div className="relative w-24 sm:w-32 md:w-44 flex-shrink-0 bg-gray-100">
        <Image
          src={item.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 176px"
        />
      </div>

      {/* Content - Right Side */}
      <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col min-w-0 justify-between">
        {/* Title - 1 line on mobile, 2 lines on larger screens */}
        <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2">
          <a href={item.url} target="_blank" rel="noreferrer" className="hover:text-sky-600">
            {item.title}
          </a>
        </h4>

        {/* Description - 1 line on mobile, more on larger screens */}
        {item.excerpt && (
          <p className="text-slate-600 text-xs sm:text-sm mb-2 line-clamp-1 sm:line-clamp-2 md:line-clamp-3">
            {item.excerpt}
          </p>
        )}

        {/* Date and Button - Stacked on mobile, side-by-side on larger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 sm:justify-between">
          {/* Date - 1 line */}
          <span className="text-slate-500 text-xs sm:text-sm flex items-center gap-1 flex-shrink-0">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            {formatDate(item.date || '')}
          </span>
          
          {/* View Details Button */}
          <Link href={`/tin-tuc-thong-bao/${item.id || item.slug}`} className="w-full sm:w-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm w-full sm:w-auto cursor-pointer"
            >
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NewsSection({
  variant = 'horizontal-scroll',
  title = 'Cập nhật mới nhất',
  description = 'Theo dõi các tin tức, xu hướng và sự kiện mới nhất trong lĩnh vực công nghệ',
  label = 'Tin tức & Sự kiện',
  news = [],
  isLoading = false,
  maxItems = 6,
  showViewMore = false,
  viewMoreUrl = '/tin-tuc-thong-bao',
  viewMoreText = 'Xem thêm tin khác →',
  className = '',
  id,
}: NewsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const displayNews = news.slice(0, maxItems);

  // Auto-scroll for horizontal variant
  useEffect(() => {
    if (variant !== 'horizontal-scroll' || isHovered || displayNews.length === 0) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 2;
      }
    };

    const interval = setInterval(scroll, 15);
    return () => clearInterval(interval);
  }, [variant, isHovered, displayNews.length]);

  if (isLoading) {
    return (
      <section className={`py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Đang tải tin tức...</p>
        </div>
      </section>
    );
  }

  if (displayNews.length === 0) {
    return (
      <section className={`py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Không có tin tức nào</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-8 sm:py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden ${className}`}
      id={id || 'tin-tuc'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}>
            {label}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 px-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {description}
          </p>
        </div>

        {/* Content - Horizontal Scroll */}
        {variant === 'horizontal-scroll' && (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: 'smooth' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {[...displayNews, ...displayNews].map((item, index) => (
              <NewsCardHorizontal key={`${item.id}-${index}`} item={item} index={index} />
            ))}
          </div>
        )}

        {/* Content - List */}
        {variant === 'list' && (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              {displayNews.map((item, idx) => (
                <NewsCardList key={item.id} item={item} idx={idx} />
              ))}

              {showViewMore && (
                <div className="mt-4 sm:mt-6 text-center sm:text-left">
                  <Link href={viewMoreUrl} className="text-xs sm:text-sm font-medium text-slate-700 hover:text-sky-600 inline-flex items-center gap-1">
                    {viewMoreText}
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar could be added here */}
            <div className="lg:col-span-3">
              {/* Additional content */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
