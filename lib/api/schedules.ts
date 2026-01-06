// Course Schedules API
import { CourseSchedule } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Get all course schedules (classes)
 * Maps backend Class API to frontend CourseSchedule format
 * 
 * @param options - Pagination options {page, size}
 */
export async function getCourseSchedules(options: { page?: number; size?: number } = {}): Promise<{ data: CourseSchedule[]; total: number }> {
  const { page = 0, size = 100 } = options;
  const url = '/backend-api/classes/filter';
  
  console.log('🔵 Calling Schedules API:', url);
  console.log('📦 Request body:', { status: 'OPEN', page, size });
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        status: 'OPEN',
        page: page,
        size: size
      })
    });
    
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ Response data:', JSON.stringify(result, null, 2));
    
    if (result.success && result.data) {
      console.log('✅ Course schedules loaded from API');
      // API có thể trả về array trực tiếp hoặc {items, total} hoặc {data, total}
      const classes = Array.isArray(result.data) 
        ? result.data 
        : (result.data.data || result.data.items || []);
      
      const total = result.data.total || classes.length;
      console.log(`📊 Found ${classes.length} classes, total: ${total}`);
      
      // Map backend Class to frontend CourseSchedule
      const schedules = classes.map((cls: any) => ({
        id: cls.id,
        className: cls.code || cls.name, // Hiển thị code (mã lớp) thay vì name
        courseCode: cls.code,
        courseName: cls.courseName,
        startDate: cls.startDate,
        schedule: cls.schedule || 'Liên hệ',
        instructor: cls.instructorName || 'TBA',
        status: cls.status,
        seats: cls.maxStudents,
        seatsAvailable: cls.maxStudents - (cls.currentStudents || 0),
        location: cls.location || 'Chưa xác định'
      }));
      
      console.log('✅ Mapped schedules:', schedules);
      return { data: schedules, total };
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error fetching schedules:', error);
    throw error;
  }
}
