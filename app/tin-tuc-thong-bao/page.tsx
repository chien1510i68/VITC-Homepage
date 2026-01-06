/**
 * News and Announcements Page
 * Single Responsibility: Orchestrate news display
 */

'use client';

import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useAllNews } from './hooks/useAllNews';
import { filterAnnouncements, filterNews } from './utils/newsFilter';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { AnnouncementsList } from './components/AnnouncementsList';
import { NewsList } from './components/NewsList';

export default function NewsAnnouncementsPage() {
  const { allNews, isLoading, error } = useAllNews();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const announcements = filterAnnouncements(allNews);
  const news = filterNews(allNews);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tin tức - Thông báo
          </h1>
          <p className="text-base text-gray-600">
            Cập nhật thông tin mới nhất về hoạt động và tin tức của VITC
          </p>
        </div>

        {/* Layout: Announcements (2/3) and News (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Left Section - Announcements (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Thông báo
              </h2>
            </div>
            <AnnouncementsList announcements={announcements} />
          </div>

          {/* Right Section - News (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Tin tức
              </h2>
            </div>
            <NewsList news={news} />
          </div>
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
