/**
 * Form Validation Utilities for Course Registration
 * 
 * @module app/components/course-registration/utils
 */

import { CourseRegistrationFormData, CourseRegistrationFormErrors } from '../types';

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex (Vietnamese phone format)
 */
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  return PHONE_REGEX.test(phone);
}

/**
 * Validate date of birth (must be at least 6 years old)
 */
export function validateDOB(dob: string): boolean {
  if (!dob) return false;
  
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 6;
  }
  
  return age >= 6;
}

/**
 * Validate entire form data
 */
export function validateFormData(data: CourseRegistrationFormData): CourseRegistrationFormErrors {
  const errors: CourseRegistrationFormErrors = {};
  
  // Username validation
  if (!data.username.trim()) {
    errors.username = 'Vui lòng nhập họ và tên';
  } else if (data.username.trim().length < 2) {
    errors.username = 'Họ và tên phải có ít nhất 2 ký tự';
  }
  
  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Email không hợp lệ';
  }
  
  // Phone number validation
  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = 'Vui lòng nhập số điện thoại';
  } else if (!validatePhoneNumber(data.phoneNumber)) {
    errors.phoneNumber = 'Số điện thoại không hợp lệ';
  }
  
  // Course validation
  if (!data.courseId) {
    errors.courseId = 'Vui lòng chọn khóa học';
  }
  
  // Date of birth validation
  if (!data.dob) {
    errors.dob = 'Vui lòng nhập ngày sinh';
  } else if (!validateDOB(data.dob)) {
    errors.dob = 'Bạn phải đủ 6 tuổi trở lên';
  }
  
  // Address validation
  if (!data.address.trim()) {
    errors.address = 'Vui lòng nhập địa chỉ';
  } else if (data.address.trim().length < 10) {
    errors.address = 'Địa chỉ phải có ít nhất 10 ký tự';
  }
  
  return errors;
}

/**
 * Format date to YYYY-MM-DD for API
 */
export function formatDateForAPI(date: string): string {
  return date;
}

/**
 * Get max date for DOB input (6 years ago from today)
 */
export function getMaxDOBDate(): string {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 6);
  const isoString = today.toISOString().split('T');
  return isoString[0] || '';
}
