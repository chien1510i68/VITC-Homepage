// Instructors API
import { Instructor } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Get all instructors
 */
export async function getInstructors(): Promise<Instructor[]> {
  try {
    const response = await fetchWithTimeout<Instructor[]>(`/backend-api/v1/instructors`);
    
    if (response.success && response.data) {
      console.log('✅ Instructors loaded from API');
      return response.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error fetching instructors:', error);
    throw error;
  }
}

/**
 * Get a single instructor by ID
 */
export async function getInstructorById(id: number): Promise<Instructor | null> {
  try {
    const response = await fetchWithTimeout<Instructor>(`/backend-api/v1/instructors/${id}`);
    
    if (response.success && response.data) {
      console.log(`✅ Instructor ${id} loaded from API`);
      return response.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error fetching instructor ${id}:`, error);
    return null;
  }
}
