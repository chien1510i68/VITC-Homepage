'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, TrendingUp, Bell } from 'lucide-react';
import { SAMPLE_NEWS as GLOBAL_NEWS } from '@/lib/newsData';

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
  // Lấy 4 tin tức đầu tiên cho phần thông báo quan trọng
  const importantNews = GLOBAL_NEWS.slice(0, 4);
  
  // Lấy 4 tin tức tiếp theo cho phần đọc nhiều nhất
  const popularNews = GLOBAL_NEWS.slice(4, 8);

  return (
    <section id="news" className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tin tức — Thông báo
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Danh sách sinh viên đủ điều kiện cấp chứng chỉ và các thông báo liên quan
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Important Announcements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-bold text-gray-900">Thông báo quan trọng</h3>
            </div>
            
            <div className="space-y-4">
              {importantNews.map((item, idx) => (
                <Link 
                  key={item.id} 
                  href={`/tin-tuc-thong-bao/${item.id || item.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(item.date || '')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Most Read Articles */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-bold text-gray-900">Tin tức đọc nhiều nhất</h3>
            </div>
            
            <div className="space-y-4">
              {popularNews.map((item, idx) => (
                <Link 
                  key={item.id} 
                  href={`/tin-tuc-thong-bao/${item.id || item.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex gap-4 p-4">
                    {/* Ranking Number */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{idx + 1}</span>
                    </div>

                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
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
        <div className="text-center mt-12">
          <Link 
            href="/tin-tuc-thong-bao"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Xem thêm tin tức
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
