'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CompactNewsCard } from './CompactNewsCard';
import { NewsArticle } from './types';

interface NewsGridProps {
  articles: NewsArticle[];
  maxItems?: number;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, maxItems = 6 }) => {
  const displayedArticles = articles.slice(0, maxItems);

  return (
    <div className="lg:col-span-3">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <div className="flex items-center gap-2 mb-4">
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

      {/* Compact News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {displayedArticles.map((article, index) => (
          <CompactNewsCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center pt-2"
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
    </div>
  );
};
