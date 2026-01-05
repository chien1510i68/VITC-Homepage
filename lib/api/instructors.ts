// Instructors API
import { Instructor } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockInstructors } from './mockData';

/**
 * Get all instructors
 * Falls back to mock data if API fails
 */
export async function getInstructors(): Promise<Instructor[]> {
  try {
    const response = await fetchWithTimeout<Instructor[]>(`${API_BASE_URL}/instructors`);
    
    if (response.success && response.data) {
      console.log('✅ Instructors loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock instructors data:', response.error);
    return mockInstructors;
  } catch (error) {
    console.error('❌ Error fetching instructors:', error);
    return mockInstructors;
  }
}

/**
 * Get a single instructor by ID
 * Falls back to mock data if API fails
 */
export async function getInstructorById(id: number): Promise<Instructor | null> {
  try {
    const response = await fetchWithTimeout<Instructor>(`${API_BASE_URL}/instructors/${id}`);
    
    if (response.success && response.data) {
      console.log(`✅ Instructor ${id} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, using mock instructor data for id ${id}:`, response.error);
    return mockInstructors.find(i => i.id === id) || null;
  } catch (error) {
    console.error(`❌ Error fetching instructor ${id}:`, error);
    return mockInstructors.find(i => i.id === id) || null;
  }
}
