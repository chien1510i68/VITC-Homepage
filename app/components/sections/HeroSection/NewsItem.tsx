'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types/news';

interface NewsItemProps {
  news: NewsArticle;
}

/**
 * NewsItem Component
 * Responsibility: Display individual news item with image and title
 */
export function NewsItem({ news }: NewsItemProps) {
  return (
    <Link
      href={`/tin-tuc-thong-bao/${news.id}`}
      className="group flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-green-50 transition-all duration-300 border border-gray-200 hover:border-green-300 hover:shadow-md"
    >
      {/* Image - Fixed Height */}
      <div className="flex-shrink-0">
        <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gray-100">
          <Image
            src={news.image || '/images/news/default-news.jpg'}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        </div>
      </div>

      {/* Title - Rest of space */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
          {news.title}
        </h4>
      </div>
    </Link>
  );
}
