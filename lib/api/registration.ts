/**
 * Registration API Module
 * 
 * Provides functions for course registration operations
 * Uses Next.js API routes to avoid CORS issues
 * 
 * @module lib/api/registration
 */

import { ApiResponse, CourseBasicInfo } from './types';
import { getCoursesFromCache, saveCoursesToCache } from '@/lib/cache/coursesCache';

/**
 * Course Registration Request
 */
export interface CourseRegistrationRequest {
  username: string;
  email: string;
  phoneNumber: string;
  course: string;
  type: string;
  dob: string;
  address: string;
  note?: string;
  action: 'DANG_KY';
}

/**
 * Course Registration Response - Success
 */
export interface CourseRegistrationResponse {
  isRegistered: boolean;
}

/**
 * Course Registration Response - Error
 */
export interface CourseRegistrationError {
  code: string;
  message: string;
  path: string;
  timestamp: string;
  details?: any;
  serviceClass?: string;
  serviceMethod?: string;
}

/**
 * Courses Basic Info Response
 */
export interface CoursesBasicInfoResponse {
  success: boolean;
  message: string | null;
  data: CourseBasicInfo[];
}

/**
 * Fetch all courses basic information
 * Uses sessionStorage cache to avoid redundant API calls
 * Endpoint: GET /api/courses/basic-info (Next.js API route)
 */
export async function fetchCoursesBasicInfo(): Promise<ApiResponse<CourseBasicInfo[]>> {
  // Try to get from cache first
  const cached = getCoursesFromCache();
  if (cached) {
    console.log('✅ Using cached courses data');
    return {
      success: true,
      data: cached,
      message: 'From cache',
    };
  }

  // If no cache, fetch from API
  const url = '/api/courses/basic-info'; // Next.js API route
  
  console.log('📤 Fetching courses basic info from API');
  console.log('🔗 Endpoint:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error('❌ Error response:', errorData);
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result: CoursesBasicInfoResponse = await response.json();
    console.log('✅ Response data:', JSON.stringify(result, null, 2));
    
    if (result.success && result.data) {
      console.log(`✅ Fetched ${result.data.length} courses`);
      // Save to cache for future use
      saveCoursesToCache(result.data);
      return {
        success: true,
        data: result.data,
        message: result.message || 'Success',
      };
    }
    
    throw new Error(result.message || 'Invalid response format');
  } catch (error) {
    console.error('❌ Error fetching courses:', error);
    return {
      success: false,
      data: [] as CourseBasicInfo[],
      error: error instanceof Error ? error.message : 'Failed to fetch courses',
    };
  }
}

/**
 * Submit course registration
 * Endpoint: POST /api/registrations (Next.js API route)
 */
export async function submitCourseRegistration(
  formData: Omit<CourseRegistrationRequest, 'action'>
): Promise<ApiResponse<CourseRegistrationResponse>> {
  const url = '/api/registrations'; // Next.js API route
  
  const requestData: CourseRegistrationRequest = {
    ...formData,
    action: 'DANG_KY',
  };
  
  console.log('📤 Submitting course registration');
  console.log('🔗 Endpoint:', url);
  console.log('📦 Request body:', JSON.stringify(requestData, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    console.log('📡 Response status:', response.status, response.statusText);
    
    const result = await response.json();
    console.log('📦 Response data:', JSON.stringify(result, null, 2));
    
    if (!response.ok) {
      console.error('❌ Registration failed:', result);
      return {
        success: false,
        data: { isRegistered: false },
        error: result.error || result.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    
    if (result.isRegistered) {
      console.log('✅ Course registration successful');
      return {
        success: true,
        data: result,
        message: 'Đăng ký khóa học thành công',
      };
    }
    
    throw new Error('Registration failed');
  } catch (error) {
    console.error('❌ Error submitting registration:', error);
    return {
      success: false,
      data: { isRegistered: false },
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi đăng ký',
    };
  }
}
