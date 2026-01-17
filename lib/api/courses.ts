/**
 * Courses API Module
 * 
 * Provides functions for fetching and managing course/program data
 * from the backend API with automatic fallback to mock data.
 * 
 * @module lib/api/courses
 */

import { Program, CourseBasicInfo, ApiResponse } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockFeaturedCourses, Course } from '@/data/courses';

/**
 * Converts a Course object from the API to a Program object
 * 
 * @param course - The course object from the API
 * @returns Converted Program object
 * @internal
 */
const convertCourseToProgram = (course: Course): Program => {
  // Determine category from type
  const categoryMap: Record<string, string> = {
    'OFFICE': 'Tin học văn phòng',
    'PROGRAMMING': 'Lập trình',
    'SOFTSKILLS': 'Kỹ năng mềm',
    'MARKETING': 'Digital Marketing',
    'ANALYSIS': 'Phân tích dữ liệu',
    'GIS': 'GIS',
    'CAD': 'Thiết kế kỹ thuật',
    'DESIGN': 'Thiết kế',
    'MANAGEMENT': 'Quản lý'
  };

  const category = categoryMap[course.type || ''] || 'Khác';
  
  // Format price
  const priceFormatted = course.price > 0 
    ? `${course.price.toLocaleString('vi-VN')}đ` 
    : 'Liên hệ';

  // Calculate duration and sessions
  const durationHours = course.duration || 0;
  const durationText = durationHours > 0 ? `${durationHours} giờ` : 'Liên hệ';
  const sessionsText = durationHours > 0 
    ? `${Math.ceil(durationHours / 20)} tháng` 
    : 'Liên hệ';

  return {
    id: course.id, // Keep as string (UUID)
    title: course.title,
    category: category,
    type: course.type,
    description: course.descriptionHtml?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '',
    fullDescription: course.descriptionHtml || '',
    image: course.thumbnailUrl || 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
    duration: durationText,
    students: '100+',
    sessions: sessionsText,
    level: course.level || 'Cơ bản',
    rating: 4.8,
    price: priceFormatted,
    completionRate: '95%',
    highlights: course.highlights || [],
    instructor: course.instructor ? {
      name: course.instructor.username,
      title: 'Giảng viên chính - Chuyên gia ICDL',
      bio: course.instructor.description,
      experience: '8+ năm',
      students: '2500+',
      courses: 12,
      rating: 4.9,
      specialties: ['ICDL', 'Microsoft Office', 'Tin học quốc tế'],
      education: ['Thạc sĩ CNTT - ĐH Quốc gia HN', 'Chứng chỉ giảng viên ICDL'],
      achievements: ['ICDL Certified Trainer', 'Giảng viên xuất sắc 2021', '2500+ học viên đạt chứng chỉ'],
      image: course.instructor.avatarUrl
    } : {
      name: 'Giảng viên VITC',
      title: 'Giảng viên',
      bio: '',
      experience: '5+ năm',
      students: '500+',
      courses: 5,
      rating: 4.8,
      specialties: [course.subject || ''],
      education: [],
      achievements: []
    },
    isHot: parseInt(course.id) <= 6,
    syllabus: course.syllabus || [],
    requirements: course.requirements || [],
    benefits: course.benefitsHtml 
      ? (() => {
          // Try to parse <li> items first
          const liItems = course.benefitsHtml
            .replace(/<ul[^>]*>/gi, '')
            .replace(/<\/ul>/gi, '')
            .match(/<li[^>]*>(.*?)<\/li>/gi)
            ?.map(item => item.replace(/<\/?li[^>]*>/gi, '').trim())
            .filter(item => item.length > 0);
          
          if (liItems && liItems.length > 0) {
            return liItems;
          }
          
          // If no <li> items, try to parse <p> items with <strong> tags
          const pItems = course.benefitsHtml
            .match(/<p[^>]*>.*?<\/p>/gi)
            ?.map(item => {
              // Extract content after <strong> tag
              const match = item.match(/<strong[^>]*>(.*?)<\/strong>\s*:?\s*(.*?)<\/p>/i);
              if (match && match[1] && match[2]) {
                return `${match[1]}: ${match[2].replace(/<[^>]*>/g, '').trim()}`;
              }
              return item.replace(/<[^>]*>/g, '').trim();
            })
            .filter(item => item.length > 0);
          
          return pItems || [];
        })()
      : []
  };
};

// Convert all courses to programs as mock data
const mockPrograms: Program[] = mockFeaturedCourses.map(convertCourseToProgram);

/**
 * Get all courses with pagination
 * Falls back to mock data if API fails
 * 
 * API Endpoint: POST /api/v1/courses/filter
 * Response format: { status: "success", data: { items: [...], total: number } }
 */
export async function getCourses(page = 0, size = 10): Promise<Program[]> {
  try {
    const response = await fetch(`/backend-api/courses/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        // status: 'ACTIVE',
        page, 
        size 
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log('✅ Courses loaded from API');
      // Backend trả về data.data hoặc data.items
      const items = result.data.data || result.data.items || [];
      return items.map(convertCourseToProgram);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error fetching courses:', error);
    throw error;
  }
}

/**
 * Get a single course by ID
 * Falls back to mock data if API fails
 * 
 * API Endpoint: GET /api/courses/{id}
 * Response format: { status: "success", data: {...} }
 */
export async function getCourseById(id: number | string): Promise<Program | null> {
  try {
    const response = await fetch(`/backend-api/courses/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log(`✅ Course ${id} loaded from API`);
      return convertCourseToProgram(result.data);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error fetching course ${id}:`, error);
    return null;
  }
}

/**
 * Get courses by type
 * Falls back to mock data if API fails
 * 
 * API Endpoint: POST /api/v1/courses/filter
 * Response format: { status: "success", data: { items: [...], total: number } }
 */
export async function getCoursesByCategory(type: string, page = 0, size = 20): Promise<Program[]> {
  try {
    const response = await fetch(`/backend-api/courses/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        type,
        // status: 'ACTIVE',
        page,
        size
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log(`✅ Courses for type "${type}" loaded from API`);
      const items = result.data.data || result.data.items || [];
      return items.map(convertCourseToProgram);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error fetching courses by type ${type}:`, error);
    throw error;
  }
}

/**
 * Get featured courses for homepage
 * Falls back to mock data if API fails
 * 
 * API Endpoint: POST /api/v1/courses/filter (filtering featured courses)
 * Can also use dedicated endpoint if available in future
 * Response format: { status: "success", data: { items: [...], total: number } }
 */
export async function getFeaturedCourses(limit = 6): Promise<Program[]> {
  try {
    const response = await fetch(`/backend-api/courses/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        // status: 'ACTIVE',
        page: 0,
        size: limit
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log('✅ Featured courses loaded from API');
      const items = result.data.data || result.data.items || [];
      return items.map(convertCourseToProgram).slice(0, limit);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error fetching featured courses:', error);
    throw error;
  }
}

/**
 * Search courses by keyword and filters
 * Falls back to mock data if API fails
 * 
 * API Endpoint: POST /api/v1/courses/filter
 * Response format: { status: "success", data: { items: [...], total: number } }
 */
export interface CourseSearchParams {
  keyword?: string;
  type?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

export async function searchCourses(params: CourseSearchParams): Promise<Program[]> {
  try {
    const response = await fetch(`/backend-api/courses/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...params,
        // status: 'ACTIVE',
        page: params.page || 0,
        size: params.size || 10
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log('✅ Search results loaded from API');
      const items = result.data.data || result.data.items || [];
      return items.map(convertCourseToProgram);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error searching courses:', error);
    throw error;
  }
}

/**
 * Get course by slug
 * Falls back to mock data if API fails
 * 
 * API Endpoint: POST /api/v1/courses/filter with slug parameter
 * Response format: { status: "success", data: { items: [...], total: number } }
 */
export async function getCourseBySlug(slug: string): Promise<Program | null> {
  try {
    const response = await fetch(`/backend-api/courses/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        slug,
        // status: 'ACTIVE',
        page: 0,
        size: 1
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    if (result.success && result.data) {
      console.log(`✅ Course with slug "${slug}" loaded from API`);
      const items = result.data.data || result.data.items || [];
      if (items.length > 0) {
        return convertCourseToProgram(items[0]);
      }
    }
    
    throw new Error('Course not found');
  } catch (error) {
    console.error(`❌ Error fetching course by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get basic course information (id, title, courseCode)
 * Used for dropdowns and selection lists
 * 
 * API Endpoint: GET /api/v1/courses/basic-info
 * Response format: { success: true, message: null, data: [...] }
 */
export async function getCoursesBasicInfo(): Promise<CourseBasicInfo[]> {
  try {
    const response = await fetch('/backend-api/courses/basic-info');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result: ApiResponse<CourseBasicInfo[]> = await response.json();
    
    if (result.success && result.data) {
      console.log('✅ Courses basic info loaded from API');
      return result.data;
    }
    
    throw new Error(result.message || 'Failed to fetch courses basic info');
  } catch (error) {
    console.error('❌ Error fetching courses basic info:', error);
    throw error;
  }
}

