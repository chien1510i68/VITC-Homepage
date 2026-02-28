'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, TrendingUp, Bell } from 'lucide-react';
import type { NewsArticle } from '@/types/news';
import { getSafeImageUrl, getFallbackImage } from '../utils/imageUtils';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { apiFetch } from '@/lib/api/base';

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export default function NewsSection() {
  const [announcements, setAnnouncements] = useState<NewsArticle[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        // Gọi API với type SOFT_SKILLS
        const response = await apiFetch('/api/v1/news/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 0,
            type: 'SOFT_SKILLS',
            size: 20
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const allArticles = result.data;

          // Phân loại theo type: ANNOUNCEMENT (thông báo) và NEWS (tin tức)
          // CHỈ lấy các bài viết đã PUBLISHED
          const announcementItems = allArticles
            .filter((item: any) => item.type === 'ANNOUNCEMENT' && item.status === 'PUBLISHED')
            .map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.summary || '',
              date: item.createdAt,
              image: item.imageUrl || '',
              category: item.type
            }))
            .slice(0, 6); // Lấy 6 thông báo mới nhất

          const newsItems = allArticles
            .filter((item: any) => item.type === 'NEWS' && item.status === 'PUBLISHED')
            .map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.summary || '',
              date: item.createdAt,
              image: item.imageUrl || '',
              category: item.type
            }))
            .slice(0, 6); // Lấy 6 tin tức mới nhất

          setAnnouncements(announcementItems);
          setNews(newsItems);
        }
      } catch (error) {
        console.error('Error loading news:', error);
        setAnnouncements([]);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadNews();
  }, []);

  // Sử dụng announcements cho cột trái và news cho cột phải
  const importantNews = announcements;
  const popularNews = news;

  if (isLoading) {
    return (
      <section id="news" className="py-16 bg-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải tin tức...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-10 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Tin tức — Thông báo
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Danh sách sinh viên đủ điều kiện cấp chứng chỉ và các thông báo liên quan
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Important Announcements (ANNOUNCEMENT type) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-red-500" />
              <h3 className="text-lg font-bold text-gray-900">Thông báo</h3>
            </div>

            <div className="space-y-2">
              {importantNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/tin-tuc-thong-bao/${item.id || item.slug}`}
                  className="block bg-white rounded-lg border border-slate-100 hover:border-green-200 shadow-sm hover:shadow transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex gap-3 p-2">
                    {/* Image */}
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-green-50">
                      <ImageWithFallback
                        src={getSafeImageUrl(item.image, 'announcement')}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        fallbackSrc={getFallbackImage('announcement')}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mb-0.5 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1 mb-1">
                        {item.description}
                      </p>
                      <div className="flex items-center text-[10px] text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(item.date || '')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - News (NEWS type) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <h3 className="text-lg font-bold text-gray-900">Tin tức</h3>
            </div>

            <div className="space-y-2">
              {popularNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/tin-tuc-thong-bao/${item.id || item.slug}`}
                  className="block bg-white rounded-lg border border-slate-100 hover:border-green-200 shadow-sm hover:shadow transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex gap-3 p-2">
                    {/* Image */}
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-green-50">
                      <ImageWithFallback
                        src={getSafeImageUrl(item.image, 'news')}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        fallbackSrc={getFallbackImage('news')}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mb-0.5 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1 mb-1">
                        {item.description}
                      </p>
                      <div className="flex items-center text-[10px] text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(item.date || '')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <Link
            href="/tin-tuc-thong-bao"
            className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white text-xs font-semibold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Xem thêm tin tức
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
