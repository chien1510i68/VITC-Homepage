// News API
import { NewsArticle } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockNews } from './mockData';

/**
 * Get all news articles
 * Falls back to mock data if API fails
 */
export async function getNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetchWithTimeout<NewsArticle[]>(`${API_BASE_URL}/news`);
    
    if (response.success && response.data) {
      console.log('✅ News loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock news data:', response.error);
    return mockNews;
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    return mockNews;
  }
}

/**
 * Get a single news article by ID
 * Falls back to mock data if API fails
 */
export async function getNewsById(id: number): Promise<NewsArticle | null> {
  try {
    const response = await fetchWithTimeout<NewsArticle>(`${API_BASE_URL}/news/${id}`);
    
    if (response.success && response.data) {
      console.log(`✅ News ${id} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, using mock news data for id ${id}:`, response.error);
    return mockNews.find(n => n.id === id) || null;
  } catch (error) {
    console.error(`❌ Error fetching news ${id}:`, error);
    return mockNews.find(n => n.id === id) || null;
  }
}
