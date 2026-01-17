/**
 * News API Module
 * 
 * Provides functions for fetching and managing news/announcements
 * from the backend API.
 * 
 * @module lib/api/news
 */

import { NewsArticle, BackendNews, NewsCategory } from '@/types/news';
import { API_BASE_URL } from './base';

/**
 * Converts a BackendNews object to a NewsArticle display object
 * 
 * @param news - The news object from the API
 * @returns Converted NewsArticle object
 * @internal
 */
const convertBackendNewsToArticle = (news: BackendNews): NewsArticle => {
  // Map category to Vietnamese
  const categoryMap: Record<string, string> = {
    'NEWS': 'Tin tức',
    'ANNOUNCEMENT': 'Thông báo',
    'EVENT': 'Sự kiện'
  };
  const categoryName = categoryMap[news.category] || 'Tin tức';

  // Strip HTML tags from contentHtml for description
  const description = news.summary || 
    news.contentHtml?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 
    '';

  return {
    id: news.id || 0,
    title: news.title,
    description,
    image: news.imageUrl || 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    date: news.createdAt,
    category: news.category, // NEWS, ANNOUNCEMENT, EVENT
    type: news.type, // IT, SOFT_SKILLS
    slug: news.slug || '',
    content: news.contentHtml || ''
  };
};

/**
 * Get all news articles with pagination
 * 
 * API Endpoint: POST /api/v1/news/filter
 * Response format: { status: "success", data: [...] }
 * 
 * @throws {Error} If API request fails or returns invalid data
 */
/**
 * Get all news articles with pagination
 * 
 * Uses Next.js rewrites to proxy to backend (server-side, no CORS issue)
 * /backend-api/v1/news/filter -> http://localhost:8080/api/v1/news/filter
 * Response format: { success: true, data: { data: [...], total: number } }
 * 
 * @param options - Pagination options {page, size}
 * @throws {Error} If API request fails or returns invalid data
 */
export async function getNews(options: { page?: number; size?: number } = {}): Promise<{ data: NewsArticle[]; total: number }> {
  const { page = 0, size = 10 } = options;
  
  // Use absolute URL for server-side rendering, relative for client
 
  const url = `/backend-api/news/filter`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        page: page,
        size: size
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      return {
        data: result.data.map(convertBackendNewsToArticle),
        total: result.data.length
      };
    }
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    throw error;
  }
}

/**
 * Get a single news article by ID
 * 
 * Calls backend directly: GET /api/v1/news/{id}
 * Response format: { success: true, data: {...} }
 * 
 * @throws {Error} If API request fails or returns invalid data
 */
export async function getNewsById(id: number | string): Promise<NewsArticle | null> {
  try {
    // Use absolute URL for server-side rendering, relative for client
    const baseUrl = typeof window === 'undefined' 
      ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1').replace('/v1', '')
      : '/backend-api';
    const url = `${baseUrl}/news/${id}`;
    
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log(`✅ News ${id} loaded`);
      return convertBackendNewsToArticle(result.data);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error fetching news ${id}:`, error);
    throw error;
  }
}

/**
 * Get news by category
 * 
 * Calls backend directly: POST /api/v1/news/filter
 * 
 * @throws {Error} If API request fails or returns invalid data
 */
export async function getNewsByCategory(categoryId: string, page = 0, size = 10): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`/backend-api/news/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ categories: [categoryId], page, size })
    });
    
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      const newsData = Array.isArray(result.data) ? result.data : [];
      return newsData.map(convertBackendNewsToArticle);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error fetching category ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Search news by title
 * 
 * Calls backend directly: POST /api/v1/news/filter
 * 
 * @throws {Error} If API request fails or returns invalid data
 */
export async function searchNews(keyword: string, page = 0, size = 10): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`/backend-api/news/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ title: keyword, page, size })
    });
    
    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      const newsData = Array.isArray(result.data) ? result.data : [];
      return newsData.map(convertBackendNewsToArticle);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error searching:`, error);
    throw error;
  }
}

/**
 * Get news by slug
 * 
 * Calls backend directly: POST /api/v1/news/filter
 * 
 * @throws {Error} If API request fails or returns invalid data
 */
export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await fetch(`/backend-api/news/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ slug, page: 0, size: 1 })
    });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      const newsData = Array.isArray(result.data) ? result.data : [];
      if (newsData.length > 0) {
        return convertBackendNewsToArticle(newsData[0]);
      }
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching slug ${slug}:`, error);
    throw error;
  }
}
