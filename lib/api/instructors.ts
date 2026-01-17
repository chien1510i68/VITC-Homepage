// Instructors API
import { Instructor } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Backend User Response
 */
interface BackendUser {
  username: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  description: string | null;
  address: string | null;
  gender: 'MALE' | 'FEMALE' | null;
}

/**
 * Convert Backend User to Instructor
 */
function convertUserToInstructor(user: BackendUser, index: number): Instructor {
  return {
    id: `${user.email}-${index}` as any, // Use email + index for unique key
    name: user.username,
    title: 'Giảng viên Tin học',
    experience: '5+ năm',
    students: '500+',
    courses: 5,
    image: user.avatarUrl && user.avatarUrl.trim() !== '' && user.avatarUrl !== 'acc' 
      ? user.avatarUrl 
      : '/images/thu-vien/user.avif',
    specialty: user.description || 'Tin học văn phòng, Lập trình',
  };
}

/**
 * Get all instructors
 * Endpoint: GET /api/v1/users/type/{type}
 */
export async function getInstructors(type: string = 'IT'): Promise<Instructor[]> {
  try {
    const response = await fetch(`/backend-api/users/type/${type}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data && Array.isArray(result.data)) {
      console.log('✅ Instructors loaded from API');
      return result.data.map((user: BackendUser, index: number) => 
        convertUserToInstructor(user, index)
      );
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
    const response = await fetchWithTimeout<Instructor>(`/backend-api/instructors/${id}`);
    
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
