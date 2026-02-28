'use client';

import { useState, useEffect } from 'react';
import { SectionHeader, NewsGrid, ConsultationPanel, AchievementsPanel, WhyChooseVisc } from './news-cta';
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
 * - ConsultationPanel: Handles consultation form
 * - AchievementsPanel: Displays achievements
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
    <>
      {/* News Section */}
      {/* <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Tin Tức Mới Nhất"
            description="Cập nhật thông tin và hoạt động của trung tâm"
          />

          <NewsGrid 
            articles={newsArticles}
            maxItems={6}
            loading={loading}
          />
        </div>
      </section> */}

      {/* Consultation & Achievements Section */}
      <section className="py-1 md:py-4 bg-white">
        <div className="container mx-auto px-4">
          {/* <h2 className='text-center pb-6 text-2xl lg:text-3xl font-bold text-gray-900 mb-8'>
            Tư Vấn Học Tập & Thành Tựu Nổi Bật
          </h2> */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Side: Achievements + Why Choose VISC */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <AchievementsPanel />
              <WhyChooseVisc />
            </div>

            {/* Right Side: Consultation Form */}
            <ConsultationPanel />
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsCTASection;