'use client';

/**
 * Custom 404 Not Found Page
 * SEO-friendly and user-friendly 404 page
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';


export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-none">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Không tìm thấy trang
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Có thể bạn quan tâm:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/khoa-hoc">
              <Button variant="outline" size="sm">
                Khóa học
              </Button>
            </Link>
            <Link href="/tin-tuc-thong-bao">
              <Button variant="outline" size="sm">
                Tin tức
              </Button>
            </Link>
            <Link href="/lien-he">
              <Button variant="outline" size="sm">
                Liên hệ
              </Button>
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button className="gap-2 min-w-[160px]">
              <Home className="w-4 h-4" />
              Về trang chủ
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2 min-w-[160px]"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        </div>

        {/* Search Suggestion */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">
            Hoặc tìm kiếm nội dung bạn cần:
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, tin tức..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const query = (e.target as HTMLInputElement).value;
                    if (query.trim()) {
                      window.location.href = `/khoa-hoc?search=${encodeURIComponent(query)}`;
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
