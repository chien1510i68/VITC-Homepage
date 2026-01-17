import { Course, CourseCardData } from '@/data/courses';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export class CourseService {
  /**
   * Fetch all courses from backend
   */
  static async getAllCourses(): Promise<Course[]> {
    try {
      const response = await fetch('/backend-api/courses/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          status: 'ACTIVE',
          page: 0,
          size: 100
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        return result.data.data || result.data.items || [];
      } else {
        throw new Error(result.message || 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  /**
   * Fetch featured courses (active status only)
   */
  static async getFeaturedCourses(limit: number = 6): Promise<Course[]> {
    try {
      console.log('🔵 CourseService.getFeaturedCourses called with limit:', limit);
      
      const requestBody = {
        status: 'ACTIVE',
        page: 0,
        size: limit
      };
      console.log('🔵 Request body:', requestBody);
      
      const response = await fetch('/backend-api/courses/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('🔵 Response status:', response.status);
      console.log('🔵 Response OK?:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('🔵 Full response data:', JSON.stringify(result, null, 2));
      
      if (result.success && result.data) {
        const items = result.data.data || result.data.items || [];
        return items.filter((course: Course) => course.status === 'ACTIVE');
      } else {
        throw new Error(result.message || 'Failed to fetch featured courses');
      }
    } catch (error) {
      console.error('Error fetching featured courses:', error);
      throw error;
    }
  }

  /**
   * Transform backend Course model to frontend CourseCardData
   */
  static transformToCourseCard(course: Course): CourseCardData {
    // Determine badge based on course data
    const getBadgeInfo = (course: Course) => {
      const now = new Date();
      const createdAt = new Date(course.createdAt);
      const daysDiff = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24));
      
      // New course if created within last 30 days
      if (daysDiff <= 30) {
        return { text: 'Mới ra mắt', type: 'new' as const };
      }
      
      // Hot course based on category or subject
      if (course.subject?.toLowerCase().includes('python') || 
          course.subject?.toLowerCase().includes('javascript') ||
          course.type === 'PROGRAMMING') {
        return { text: 'Đang hot', type: 'hot' as const };
      }
      
      // Default to upcoming
      return { text: 'Sắp khai giảng', type: 'upcoming' as const };
    };

    // Format price
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price).replace('₫', 'đ');
    };

    // Default duration if not provided
    const formatDuration = (duration?: number) => {
      if (!duration) return '80 giờ';
      return `${duration} giờ`;
    };

    // Generate mock data for missing fields
    const mockRating = Math.floor(Math.random() * 0.4 + 4.6); // 4.6 - 5.0
    const mockStudentCount = Math.floor(Math.random() * 1000 + 200); // 200 - 1200
    const mockInstructor = 'ThS. Giảng viên VITC';

    return {
      id: course.id,
      title: course.title,
      thumbnail: course.thumbnailUrl || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
      badge: getBadgeInfo(course),
      duration: formatDuration(course.duration),
      price: formatPrice(course.price),
      studentCount: mockStudentCount,
      description: course.descriptionHtml ? 
        course.descriptionHtml.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 
        'Khóa học chất lượng cao tại VITC',
      category: course.subject || 'Khóa học'
    };
  }
}

export default CourseService;