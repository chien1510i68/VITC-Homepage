"use client";

import { motion } from 'framer-motion';
import { Sparkles, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useFeaturedNews } from '@/app/hooks/useFeaturedNews';
import { VideoPlayer } from './VideoPlayer';
import { NewsItem } from './NewsItem';

/**
 * HeroSection Component
 * Responsibility: Compose and layout hero section with news and video
 */
export default function HeroSection() {
  const { news, isLoading } = useFeaturedNews({ limit: 4 });

  return (
    <section className="relative bg-white py-2 md:py-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Tin tức nổi bật</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Cập nhật mới nhất từ VISC
          </h2>
        </motion.div> */}

        {/* Main Content: 70% News | 30% Video */}
        <div className="grid lg:grid-cols-[70%_30%] gap-8">

          {/* Left: News List (70%) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Tin tức & Thông báo</h3>
            </div>

            {isLoading ? (
              <div className="space-y-4 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse p-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : news.length > 0 ? (
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-min">
                  {news.map((item) => (
                    <NewsItem key={item.id} news={item} />
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Link
                    href="/tin-tuc-thong-bao"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                  >
                    <span>Xem tất cả tin tức</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Chưa có tin tức nào</p>
              </div>
            )}
          </motion.div>

          {/* Right: Video (30%) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              {/* <h3 className="text-lg font-bold text-gray-900 mb-4">Video giới thiệu</h3> */}
              <VideoPlayer />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
