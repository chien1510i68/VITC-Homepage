// About/Timeline API
import { AboutTimeline } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockAboutTimeline } from './mockData';

/**
 * Get about timeline data
 * Falls back to mock data if API fails
 */
export async function getAboutTimeline(): Promise<AboutTimeline[]> {
  try {
    const response = await fetchWithTimeout<AboutTimeline[]>(`${API_BASE_URL}/about/timeline`);
    
    if (response.success && response.data) {
      console.log('✅ About timeline loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock about timeline data:', response.error);
    return mockAboutTimeline;
  } catch (error) {
    console.error('❌ Error fetching about timeline:', error);
    return mockAboutTimeline;
  }
}
