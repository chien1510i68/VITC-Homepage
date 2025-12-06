"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { api, NewsArticle } from '@/lib/api';

export default function NewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const data = await api.getNews();
        setNews(data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  useEffect(() => {
    if (isHovered || news.length === 0) return;

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
  }, [isHovered, news.length]);

  if (isLoading) {
    return (
      <section className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden" id="tin-tuc">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Đang tải tin tức...</p>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden" id="tin-tuc">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            Tin tức & Sự kiện
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Cập nhật mới nhất
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Theo dõi các tin tức, xu hướng và sự kiện mới nhất trong lĩnh vực công nghệ
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Duplicate news for infinite scroll effect */}
          {[...news, ...news].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[340px] group"
            >
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-blue-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 ${TAILWIND_COLORS.bgPrimary} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold text-gray-900 mb-2 line-clamp-2 ${TAILWIND_COLORS.textPrimaryHover} transition-colors`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Read More */}
                  <button className={`flex items-center gap-2 ${TAILWIND_COLORS.textPrimary} font-semibold text-sm group-hover:gap-3 transition-all`}>
                    Đọc thêm
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className={`border-2 ${TAILWIND_COLORS.borderPrimary} ${TAILWIND_COLORS.textPrimary} hover:bg-green-50 font-semibold`}
          >
            <a href="/tin-tuc-thong-bao">
              Xem tất cả tin tức →
            </a>
          </Button>
        </div>
      </div>

      {/* Custom Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
