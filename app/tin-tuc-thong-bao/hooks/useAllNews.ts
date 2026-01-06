/**
 * Custom hook for fetching all news
 * Single Responsibility: Manage news data fetching state
 */

import { useState, useEffect } from 'react';
import type { TypedNewsArticle } from '../utils/newsFilter';

interface UseAllNewsReturn {
  allNews: TypedNewsArticle[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetch all news articles without category filter
 */
export function useAllNews(): UseAllNewsReturn {
  const [allNews, setAllNews] = useState<TypedNewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/backend-api/v1/news/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 0,
            size: 50
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          const articles = result.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.summary || '',
            date: item.createdAt,
            image: item.imageUrl || '',
            category: item.category,
            type: item.type,
            slug: item.slug || ''
          }));
          setAllNews(articles);
        }
      } catch (err) {
        console.error('Error loading news:', err);
        setError('Không thể tải tin tức. Vui lòng kiểm tra kết nối API.');
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  return { allNews, isLoading, error };
}
