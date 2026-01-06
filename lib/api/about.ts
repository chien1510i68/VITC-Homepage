// About/Timeline API
import { AboutTimeline } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Get about timeline data
 */
export async function getAboutTimeline(): Promise<AboutTimeline[]> {
  try {
    const response = await fetchWithTimeout<AboutTimeline[]>(`/backend-api/v1/about/timeline`);
    
    if (response.success && response.data) {
      console.log('✅ About timeline loaded from API');
      return response.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error fetching about timeline:', error);
    throw error;
  }
}
