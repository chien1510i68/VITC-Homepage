/**
 * Announcements List Component
 * Single Responsibility: Render announcements list
 */

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { TypedNewsArticle } from '../utils/newsFilter';
import { formatDate } from '../utils/newsFilter';

interface AnnouncementsListProps {
  announcements: TypedNewsArticle[];
}

export function AnnouncementsList({ announcements }: AnnouncementsListProps) {
  if (announcements.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Chưa có thông báo nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
      {announcements.map((item) => (
        <Card 
          key={item.id} 
          className="p-2.5 gap-2 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
        >
          {/* Title - 1 line */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-1">
            {item.title}
          </h3>
          
          {/* Description - 2 lines */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-1.5">
            {item.description}
          </p>
          
          {/* Bottom row: Date (left) and Button (right) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(item.date)}</span>
            </div>
            
            <Link 
              href={`/tin-tuc-thong-bao/${item.id}`}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              Xem chi tiết
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
