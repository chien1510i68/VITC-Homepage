'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FeaturedNewsCard } from './FeaturedNewsCard';
import { NewsListItem } from './NewsListItem';
import { NewsArticle } from './types';

interface NewsGridProps {
  articles: NewsArticle[];
  maxItems?: number;
  loading?: boolean;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, maxItems = 6, loading = false }) => {
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, maxItems);

  return (
    <div className="lg:col-span-3">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Tin tức mới nhất
          </h3>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 animate-pulse bg-gray-100 rounded-lg h-96"></div>
          <div className="md:col-span-2 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-lg h-20"></div>
            ))}
          </div>
        </div>
      )}

      {/* News Layout: Featured + List */}
      {!loading && articles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            {/* Left: Featured News (60%) */}
            <div className="md:col-span-3">
              {featuredArticle && <FeaturedNewsCard article={featuredArticle} />}
            </div>

            {/* Right: News List (40%) */}
            <div className="md:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full">
                <h4 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Bài viết khác
                </h4>
                <div className="space-y-0">
                  {sideArticles.map((article, index) => (
                    <NewsListItem key={article.id} article={article} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              href="/tin-tuc-thong-bao"
              className="inline-flex items-center gap-2 text-sm font-semibold group transition-colors duration-200 text-yellow-600 hover:text-yellow-700 cursor-pointer"
            >
              <span>Xem tất cả tin tức</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </>
      )}

      {/* No Data State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Chưa có tin tức nào</p>
        </div>
      )}
    </div>
  );
};
