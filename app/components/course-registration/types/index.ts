/**
 * Course Registration Form Types
 * 
 * @module app/components/course-registration/types
 */

import { CourseBasicInfo } from '@/lib/api/types';

/**
 * Form data structure for course registration
 */
export interface CourseRegistrationFormData {
  username: string;
  email: string;
  phoneNumber: string;
  courseId: string;
  courseType: string;
  dob: string;
  address: string;
  note?: string;
}

/**
 * Form validation errors
 */
export interface CourseRegistrationFormErrors {
  username?: string;
  email?: string;
  phoneNumber?: string;
  courseId?: string;
  dob?: string;
  address?: string;
  note?: string;
}

/**
 * Form state for managing UI
 */
export interface CourseRegistrationFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  courses: CourseBasicInfo[];
  isLoadingCourses: boolean;
}
