'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeader, NewsGrid, CTAPanel } from './news-cta';
import { NewsArticle } from './news-cta/types';
import { convertNewsArticle } from './news-cta/data';
import * as api from '@/lib/api';

/**
 * News & CTA Section Component
 * 
 * Responsibility: Layout orchestration and composition of news and consultation sections.
 * Follows SRP by delegating specific concerns to focused child components:
 * - SectionHeader: Handles section title and description display
 * - NewsGrid: Manages news articles display and navigation
 * - CTAPanel: Handles consultation form and hotline functionality
 * 
 * Data: Loads real news data from backend API
 */
const NewsCTASection = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const result = await api.getNews({
          page: 0,
          size: 6
        });
        
        const convertedNews = result.data.map(convertNewsArticle);
        setNewsArticles(convertedNews);
      } catch (error) {
        console.error('❌ Failed to load news:', error);
        setNewsArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Tin Tức & Tư Vấn"
          description="Cập nhật thông tin mới nhất và nhận tư vấn miễn phí từ chuyên viên"
        />

        <div className="grid lg:grid-cols-5 gap-6">
          <NewsGrid 
            articles={newsArticles}
            maxItems={6}
            loading={loading}
          />
          
          <CTAPanel 
            defaultMode="consultation"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsCTASection;