import { Course, CourseCardData } from '../data/courses';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

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
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
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
      const response = await fetch(`${API_BASE_URL}/courses/featured?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<Course[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data.filter(course => course.status === 'ACTIVE');
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
          course.categoryCode === 'PROGRAMMING') {
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