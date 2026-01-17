/**
 * News filtering utilities
 * Single Responsibility: Filter news by type
 */

import type { NewsArticle } from '@/types/news';

export interface TypedNewsArticle extends NewsArticle {
  category: 'NEWS' | 'ANNOUNCEMENT' | 'EVENT';
  type?: string; // IT, SOFT_SKILLS
}

/**
 * Filter news articles by ANNOUNCEMENT category
 */
export function filterAnnouncements(articles: TypedNewsArticle[]): TypedNewsArticle[] {
  return articles.filter((item) => item.category === 'ANNOUNCEMENT');
}

/**
 * Filter news articles by NEWS category
 */
export function filterNews(articles: TypedNewsArticle[]): TypedNewsArticle[] {
  return articles.filter((item) => item.category === 'NEWS');
}

/**
 * Format date to Vietnamese locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
}
