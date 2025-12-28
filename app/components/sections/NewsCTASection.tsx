'use client';

import React from 'react';
import { SectionHeader, NewsGrid, CTAPanel, newsArticles } from './news-cta';

/**
 * News & CTA Section Component
 * 
 * Responsibility: Layout orchestration and composition of news and consultation sections.
 * Follows SRP by delegating specific concerns to focused child components:
 * - SectionHeader: Handles section title and description display
 * - NewsGrid: Manages news articles display and navigation
 * - CTAPanel: Handles consultation form and hotline functionality
 */
const NewsCTASection = () => {
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