'use client';

/**
 * Course Registration Modal
 * 
 * Modal component for course registration with backdrop and close functionality
 * 
 * @module app/components/course-registration
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CourseRegistrationFormData, CourseRegistrationFormErrors, CourseRegistrationFormState } from './types';
import { validateFormData, getMaxDOBDate } from './utils/validation';
import { fetchCoursesBasicInfo, submitCourseRegistration } from '@/lib/api/registration';
import { CourseBasicInfo } from '@/lib/api/types';

const initialFormData: CourseRegistrationFormData = {
  username: '',
  email: '',
  phoneNumber: '',
  courseId: '',
  courseType: '',
  dob: '',
  address: '',
  note: '',
};

const initialFormState: CourseRegistrationFormState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
  courses: [],
  isLoadingCourses: true,
};

interface CourseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseId?: string;
}

export default function CourseRegistrationModal({ 
  isOpen, 
  onClose,
  defaultCourseId 
}: CourseRegistrationModalProps) {
  const [formData, setFormData] = useState<CourseRegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<CourseRegistrationFormErrors>({});
  const [formState, setFormState] = useState<CourseRegistrationFormState>(initialFormState);

  // Fetch courses on component mount
  useEffect(() => {
    if (isOpen) {
      loadCourses();
    }
  }, [isOpen]);

  // Set default course when available
  useEffect(() => {
    if (defaultCourseId && formState.courses.length > 0) {
      const course = formState.courses.find(c => c.id === defaultCourseId);
      if (course) {
        setFormData(prev => ({
          ...prev,
          courseId: course.id,
          courseType: course.type || '',
        }));
      }
    }
  }, [defaultCourseId, formState.courses]);

  /**
   * Load courses from API
   */
  const loadCourses = async () => {
    setFormState(prev => ({ ...prev, isLoadingCourses: true }));
    
    const result = await fetchCoursesBasicInfo();
    
    if (result.success && result.data) {
      setFormState(prev => ({
        ...prev,
        courses: result.data || [],
        isLoadingCourses: false,
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        error: result.error || 'Không thể tải danh sách khóa học',
        isLoadingCourses: false,
      }));
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name as keyof CourseRegistrationFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle course selection
   */
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = e.target.value;
    const selectedCourse = formState.courses.find(c => c.id === courseId);
    
    setFormData(prev => ({
      ...prev,
      courseId,
      courseType: selectedCourse?.type || '',
    }));
    
    // Clear error
    if (errors.courseId) {
      setErrors(prev => ({
        ...prev,
        courseId: undefined,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateFormData(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Submit form
    setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    const result = await submitCourseRegistration({
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      course: formData.courseId,
      type: formData.courseType,
      dob: formData.dob,
      address: formData.address,
      note: formData.note || '',
    });
    
    if (result.success && result.data?.isRegistered) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        error: null,
      }));
      
      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData(initialFormData);
        setErrors({});
        setFormState(prev => ({ ...prev, isSuccess: false }));
        onClose();
      }, 2000);
    } else {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        error: result.error || 'Đăng ký không thành công',
      }));
    }
  };

  /**
   * Handle close modal
   */
  const handleClose = useCallback(() => {
    if (!formState.isSubmitting) {
      setFormData(initialFormData);
      setErrors({});
      setFormState(prev => ({ ...prev, error: null, isSuccess: false }));
      onClose();
    }
  }, [formState.isSubmitting, onClose]);

  /**
   * Handle backdrop click
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  /**
   * Prevent scroll when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Group courses by type
  const coursesByType = formState.courses.reduce((acc, course) => {
    const type = course.type || 'OTHER';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(course);
    return acc;
  }, {} as Record<string, CourseBasicInfo[]>);

  const typeLabels: Record<string, string> = {
    IT: 'Tin học',
    SOFT_SKILLS: 'Kỹ năng mềm',
    OTHER: 'Khác',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={formState.isSubmitting}
          className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Đóng"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white pr-8">Đăng ký Khóa học</h2>
          <p className="text-green-100 mt-2">Điền thông tin để đăng ký khóa học bạn quan tâm</p>
        </div>

        {/* Success Message */}
        {formState.isSuccess && (
          <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3 flex-1">
                <h3 className="text-green-800 font-semibold">Đăng ký thành công!</h3>
                <p className="text-green-700 mt-1 text-sm">
                  Chúng tôi đã nhận được đăng ký của bạn. Nhân viên tư vấn sẽ liên hệ với bạn trong thời gian sớm nhất.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {formState.error && (
          <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <h3 className="text-red-800 font-semibold">Có lỗi xảy ra</h3>
                <p className="text-red-700 mt-1 text-sm">{formState.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {/* Course Selection */}
          <div>
            <label htmlFor="courseId" className="block text-sm font-semibold text-gray-700 mb-2">
              Khóa học <span className="text-red-500">*</span>
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleCourseChange}
              disabled={formState.isLoadingCourses}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.courseId ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } ${formState.isLoadingCourses ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            >
              <option value="">
                {formState.isLoadingCourses ? 'Đang tải...' : '-- Chọn khóa học --'}
              </option>
              {Object.entries(coursesByType).map(([type, courses]) => (
                <optgroup key={type} label={typeLabels[type] || type}>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title} ({course.courseCode})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.courseId && (
              <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
            )}
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Nguyễn Văn A"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-2">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                max={getMaxDOBDate()}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.dob ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.dob && (
                <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="0912345678"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows={3}
              placeholder="Thông tin bổ sung hoặc yêu cầu đặc biệt..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all transform ${
                formState.isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {formState.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </span>
              ) : (
                'Đăng ký ngay'
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 text-center">
            Bằng cách đăng ký, bạn đồng ý với Chính sách bảo mật và Điều khoản sử dụng của chúng tôi.
          </p>
        </form>
      </div>
    </div>
  );
}
