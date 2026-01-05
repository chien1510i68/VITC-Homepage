// Course Schedules API
import { CourseSchedule } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockCourseSchedules } from './mockData';

/**
 * Get all course schedules
 * Falls back to mock data if API fails
 */
export async function getCourseSchedules(): Promise<CourseSchedule[]> {
  try {
    const response = await fetchWithTimeout<CourseSchedule[]>(`${API_BASE_URL}/schedules`);
    
    if (response.success && response.data) {
      console.log('✅ Course schedules loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock schedule data:', response.error);
    return mockCourseSchedules;
  } catch (error) {
    console.error('❌ Error fetching schedules:', error);
    return mockCourseSchedules;
  }
}
