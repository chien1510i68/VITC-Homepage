import { useState, useEffect } from 'react';
import * as api from '@/lib/api';
import type { NewsArticle } from '@/types/news';

interface UseFeaturedNewsOptions {
  limit?: number;
}

interface UseFeaturedNewsReturn {
  news: NewsArticle[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch featured news for homepage
 * Responsibility: Data fetching and state management for news
 */
export function useFeaturedNews(options: UseFeaturedNewsOptions = {}): UseFeaturedNewsReturn {
  const { limit = 4 } = options;

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.getNews({
          page: 0,
          size: limit
        });

        setNews(response.data || []);
      } catch (err) {
        console.error('❌ Failed to load featured news:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [limit]);

  return { news, isLoading, error };
}
