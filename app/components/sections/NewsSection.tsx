"use client";

import { useEffect, useState } from 'react';
import { api, NewsArticle } from '@/lib/api';
import SharedNewsSection from '@/app/shared/sections/NewsSection';

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const result = await api.getNews();
        setNews(result.data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <SharedNewsSection
      variant="horizontal-scroll"
      news={news}
      isLoading={isLoading}
      maxItems={6}
    />
  );
}
