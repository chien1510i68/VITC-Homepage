/**
 * Loading State Component
 * Single Responsibility: Render loading UI
 */

import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tin tức - Thông báo
            </h1>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải tin tức...</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
