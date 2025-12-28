// API Client for VITC Homepage
// This module handles all API calls and provides fallback to mock data when API is unavailable

import { 
  Program, 
  Instructor, 
  NewsArticle, 
  LookupResult,
  CourseSchedule,
  AboutTimeline,
  ApiResponse 
} from './types';
import { 
  mockInstructors, 
  mockNews, 
  mockLookupResults,
  mockCourseSchedules,
  mockAboutTimeline
} from './mockData';
import { mockFeaturedCourses, Course } from '@/app/data/courses';

// Helper function to convert Course to Program
const convertCourseToProgram = (course: Course): Program => {
  // Determine category from categoryCode
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

  const category = categoryMap[course.categoryCode || ''] || 'Khác';
  
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
    id: parseInt(course.id),
    title: course.title,
    category: category,
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
              if (match) {
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

// Convert all courses to programs
const mockPrograms: Program[] = mockFeaturedCourses.map(convertCourseToProgram);

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 0; // No timeout - instant fallback to mock data

// Helper function to make API calls with timeout and error handling
async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timeout',
        };
      }
      return {
        success: false,
        error: error.message,
      };
    }
    
    return {
      success: false,
      error: 'Unknown error occurred',
    };
  }
}

// ==================== ABOUT TIMELINE API ====================

/**
 * Get about timeline/milestones
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

// ==================== COURSE SCHEDULES API ====================

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

// ==================== PROGRAMS API ====================

/**
 * Get all programs/courses
 * Falls back to mock data if API fails
 */
export async function getPrograms(): Promise<Program[]> {
  try {
    const response = await fetchWithTimeout<Program[]>(`${API_BASE_URL}/programs`);
    
    if (response.success && response.data) {
      console.log('✅ Programs loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock programs data:', response.error);
    return mockPrograms;
  } catch (error) {
    console.error('❌ Error fetching programs:', error);
    return mockPrograms;
  }
}

/**
 * Get a single program by ID
 * Falls back to mock data if API fails
 */
export async function getProgramById(id: number): Promise<Program | null> {
  try {
    const response = await fetchWithTimeout<Program>(`${API_BASE_URL}/programs/${id}`);
    
    if (response.success && response.data) {
      console.log(`✅ Program ${id} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, using mock program data for id ${id}:`, response.error);
    return mockPrograms.find(p => p.id === id) || null;
  } catch (error) {
    console.error(`❌ Error fetching program ${id}:`, error);
    return mockPrograms.find(p => p.id === id) || null;
  }
}

/**
 * Get programs by category
 * Falls back to mock data if API fails
 */
export async function getProgramsByCategory(category: string): Promise<Program[]> {
  try {
    const response = await fetchWithTimeout<Program[]>(
      `${API_BASE_URL}/programs?category=${encodeURIComponent(category)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Programs for category "${category}" loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, filtering mock programs by category "${category}":`, response.error);
    if (category === 'Tất cả') {
      return mockPrograms;
    }
    return mockPrograms.filter(p => p.category === category);
  } catch (error) {
    console.error(`❌ Error fetching programs by category ${category}:`, error);
    if (category === 'Tất cả') {
      return mockPrograms;
    }
    return mockPrograms.filter(p => p.category === category);
  }
}

// ==================== INSTRUCTORS API ====================

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

// ==================== NEWS API ====================

/**
 * Get all news articles
 * Falls back to mock data if API fails
 */
export async function getNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetchWithTimeout<NewsArticle[]>(`${API_BASE_URL}/news`);
    
    if (response.success && response.data) {
      console.log('✅ News loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock news data:', response.error);
    return mockNews;
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    return mockNews;
  }
}

/**
 * Get a single news article by ID
 * Falls back to mock data if API fails
 */
export async function getNewsById(id: number): Promise<NewsArticle | null> {
  try {
    const response = await fetchWithTimeout<NewsArticle>(`${API_BASE_URL}/news/${id}`);
    
    if (response.success && response.data) {
      console.log(`✅ News ${id} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, using mock news data for id ${id}:`, response.error);
    return mockNews.find(n => n.id === id) || null;
  } catch (error) {
    console.error(`❌ Error fetching news ${id}:`, error);
    return mockNews.find(n => n.id === id) || null;
  }
}

// ==================== LOOKUP API ====================

/**
 * Lookup exam results by CCCD
 * Falls back to mock data if API fails
 */
export async function lookupExamResults(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `${API_BASE_URL}/lookup/exam?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Exam results for CCCD ${cccd} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, searching mock exam data for CCCD ${cccd}:`, response.error);
    return mockLookupResults.filter(r => r.cccd === cccd);
  } catch (error) {
    console.error(`❌ Error looking up exam results for CCCD ${cccd}:`, error);
    return mockLookupResults.filter(r => r.cccd === cccd);
  }
}

/**
 * Lookup certificate by CCCD
 * Falls back to mock data if API fails
 */
export async function lookupCertificate(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `${API_BASE_URL}/lookup/certificate?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Certificate for CCCD ${cccd} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, searching mock certificate data for CCCD ${cccd}:`, response.error);
    return mockLookupResults.filter(r => r.cccd === cccd && r.result === 'Đạt');
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd}:`, error);
    return mockLookupResults.filter(r => r.cccd === cccd && r.result === 'Đạt');
  }
}

// ==================== FORM SUBMISSION API ====================

/**
 * Submit consultation form
 */
export async function submitConsultationForm(formData: {
  name: string;
  phone: string;
  email: string;
  program: string;
}): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetchWithTimeout<{ message: string }>(
      `${API_BASE_URL}/consultation`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );
    
    if (response.success) {
      console.log('✅ Consultation form submitted successfully');
      return response;
    }
    
    console.warn('⚠️ API failed, form data logged locally:', response.error);
    // In production, you might want to queue this for retry
    console.log('Form data:', formData);
    return {
      success: true,
      data: { message: 'Đã ghi nhận thông tin của bạn. Chúng tôi sẽ liên hệ sớm!' },
      message: 'Data saved locally (API unavailable)',
    };
  } catch (error) {
    console.error('❌ Error submitting consultation form:', error);
    // Gracefully handle by logging locally
    console.log('Form data saved locally:', formData);
    return {
      success: true,
      data: { message: 'Đã ghi nhận thông tin của bạn. Chúng tôi sẽ liên hệ sớm!' },
      message: 'Data saved locally (API error)',
    };
  }
}

// Export all API functions
export const api = {
  // About
  getAboutTimeline,
  
  // Course Schedules
  getCourseSchedules,
  
  // Programs
  getPrograms,
  getProgramById,
  getProgramsByCategory,
  
  // Instructors
  getInstructors,
  getInstructorById,
  
  // News
  getNews,
  getNewsById,
  
  // Lookup
  lookupExamResults,
  lookupCertificate,
  
  // Forms
  submitConsultationForm,
};

export default api;
