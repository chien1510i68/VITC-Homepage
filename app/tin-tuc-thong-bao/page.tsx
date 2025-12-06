'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  category: 'news' | 'announcement';
}

// Mock data - replace with API calls later
const mockData: NewsItem[] = [
  {
    id: 1,
    title: 'Thông báo tuyển sinh khóa học lập trình Java Spring Boot 2024',
    date: '2024-12-05',
    description: 'Trung tâm VITC thông báo tuyển sinh khóa học lập trình Java Spring Boot dành cho người mới bắt đầu và có kinh nghiệm...',
    category: 'announcement',
  },
  {
    id: 2,
    title: 'Thông báo lịch nghỉ lễ Quốc khánh 2/9',
    date: '2024-12-04',
    description: 'Trung tâm VITC thông báo lịch nghỉ lễ Quốc khánh 2/9/2024. Các lớp học sẽ được bù vào thời gian...',
    category: 'announcement',
  },
  {
    id: 3,
    title: 'Khai giảng lớp React Native - Lập trình ứng dụng di động',
    date: '2024-12-03',
    description: 'Lớp học React Native sẽ khai giảng vào ngày 15/12/2024. Đăng ký ngay để nhận ưu đãi học phí...',
    category: 'announcement',
  },
  {
    id: 4,
    title: 'Sinh viên VITC đạt giải nhất cuộc thi lập trình toàn quốc',
    date: '2024-12-02',
    description: 'Chúc mừng sinh viên Nguyễn Văn A đã đạt giải nhất cuộc thi lập trình toàn quốc với dự án AI ứng dụng trong y tế...',
    category: 'news',
  },
  {
    id: 5,
    title: 'VITC ký kết hợp tác với các doanh nghiệp IT hàng đầu',
    date: '2024-12-01',
    description: 'Trung tâm VITC đã ký kết hợp tác với 10 doanh nghiệp IT hàng đầu tại Việt Nam nhằm tạo cơ hội việc làm cho học viên...',
    category: 'news',
  },
  {
    id: 6,
    title: 'Workshop: Xu hướng công nghệ 2024 và cơ hội nghề nghiệp',
    date: '2024-11-30',
    description: 'Hội thảo về xu hướng công nghệ và cơ hội nghề nghiệp sẽ diễn ra vào cuối tháng 12. Tham gia để cập nhật kiến thức mới nhất...',
    category: 'news',
  },
  {
    id: 7,
    title: 'Học viên VITC nhận offer từ công ty Fortune 500',
    date: '2024-11-28',
    description: 'Chúc mừng học viên Trần Thị B đã nhận được offer làm việc tại công ty Fortune 500 với mức lương khởi điểm hấp dẫn...',
    category: 'news',
  },
  {
    id: 8,
    title: 'Cập nhật chương trình học mới: DevOps & Cloud Computing',
    date: '2024-11-25',
    description: 'VITC ra mắt chương trình đào tạo DevOps và Cloud Computing với nội dung cập nhật theo chuẩn quốc tế...',
    category: 'news',
  },
];

export default function NewsAnnouncementsPage() {
  const announcements = mockData.filter(item => item.category === 'announcement');
  const news = mockData.filter(item => item.category === 'news');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">{announcements.map((item) => (
                <Card key={item.id} className="p-2.5 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors flex-1 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(item.date)}
                  </div>
                  <p className="text-gray-600 text-xs leading-tight line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-1.5">
                    <Link 
                      href={`/tin-tuc-thong-bao/${item.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
                    >
                      Xem chi tiết
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
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

            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">{news.map((item) => (
                <Card key={item.id} className="p-2.5 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
                  <h3 className="text-xs font-semibold text-gray-900 hover:text-green-600 transition-colors mb-0.5 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mb-0.5">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(item.date)}
                  </div>
                  <p className="text-gray-600 text-xs leading-tight line-clamp-2 mb-1">
                    {item.description}
                  </p>
                  <Link 
                    href={`/tin-tuc-thong-bao/${item.id}`}
                    className="text-green-600 hover:text-green-700 font-medium text-xs inline-flex items-center"
                  >
                    Đọc thêm
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
        </div>
      </main>
      
      <Footer />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
