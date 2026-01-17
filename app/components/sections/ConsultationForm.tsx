'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseBasicInfo } from '@/lib/api/types';
import { submitConsultation } from '@/lib/api/consultation';
import { getCoursesFromCache, saveCoursesToCache } from '@/lib/cache/coursesCache';

// Validation regex
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  program?: string;
}

export default function ConsultationForm() {
  const [courses, setCourses] = useState<CourseBasicInfo[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load courses on mount with cache
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      // Try cache first
      const cached = getCoursesFromCache();
      if (cached) {
        setCourses(cached);
        setIsLoadingCourses(false);
        return;
      }

      // If no cache, fetch from API
      setIsLoadingCourses(true);
      const response = await fetch('/api/courses/basic-info');
      const result = await response.json();
      
      if (result.success && result.data) {
        setCourses(result.data);
        saveCoursesToCache(result.data);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    // Email validation (optional but must be valid if provided)
    if (formData.email && !EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Program validation
    if (!formData.program) {
      newErrors.program = 'Vui lòng chọn chương trình';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Get selected course info
    const selectedCourse = courses.find(c => c.id === formData.program);
    
    // Submit to API
    const result = await submitConsultation({
      username: formData.name,
      email: formData.email || '',
      phoneNumber: formData.phone,
      course: formData.program,
      type: selectedCourse?.type || '',
      note: '',
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        program: '',
      });
      setErrors({});
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } else {
      setSubmitError(result.error || 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-4 tracking-wider">
        Nhận đăng ký tư vấn
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Đăng ký tư vấn</CardTitle>
            <CardDescription>
              Để lại thông tin để được tư vấn chi tiết về chương trình học
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <h3 className="text-green-800 font-semibold">Gửi yêu cầu thành công!</h3>
                    <p className="text-green-700 text-sm mt-1">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <h3 className="text-red-800 font-semibold">Có lỗi xảy ra</h3>
                    <p className="text-red-700 text-sm mt-1">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  required
                  className={errors.name ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912345678"
                  required
                  className={errors.phone ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={errors.email ? 'border-red-300 bg-red-50' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                  Chương trình quan tâm <span className="text-red-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.program ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  disabled={isLoadingCourses}
                >
                  <option value="">
                    {isLoadingCourses ? 'Đang tải...' : 'Chọn chương trình'}
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} {course.courseCode ? `(${course.courseCode})` : ''}
                    </option>
                  ))}
                </select>
                {errors.program && (
                  <p className="mt-1 text-sm text-red-600">{errors.program}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
