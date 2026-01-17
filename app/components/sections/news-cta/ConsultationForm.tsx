import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ConsultationFormData } from "./types";
import { brandColors } from "@/lib/brandColors";
import { CourseBasicInfo } from "@/lib/api/types";
import { submitConsultation } from "@/lib/api/consultation";
import { getCoursesFromCache, saveCoursesToCache } from "@/lib/cache/coursesCache";

// Validation regex
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
}

export const ConsultationForm = () => {
  const [courses, setCourses] = useState<CourseBasicInfo[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
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
    
    // Course validation
    if (!formData.course) {
      newErrors.course = 'Vui lòng chọn khóa học';
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
    const selectedCourse = courses.find(c => c.id === formData.course);
    
    // Submit to API
    const result = await submitConsultation({
      username: formData.name,
      email: formData.email || '',
      phoneNumber: formData.phone,
      course: formData.course,
      type: selectedCourse?.type || '',
      note: formData.message || '',
    });
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: '',
        message: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Success Message */}
      {isSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-2">
              <p className="text-green-800 text-sm font-medium">Gửi yêu cầu thành công!</p>
              <p className="text-green-700 text-xs mt-1">Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="ml-2 text-red-800 text-sm">{submitError}</p>
          </div>
        </div>
      )}

      <div>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên *"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại *"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
            errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
            errors.course ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
          disabled={isLoadingCourses}
        >
          <option value="">
            {isLoadingCourses ? 'Đang tải...' : 'Chọn chương trình học quan tâm *'}
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title} {course.courseCode ? `(${course.courseCode})` : ''}
            </option>
          ))}
        </select>
        {errors.course && (
          <p className="mt-1 text-sm text-red-600">{errors.course}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Lời nhắn (tùy chọn)"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
          style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 text-white font-semibold rounded-lg transition-all flex items-center justify-center disabled:opacity-50"
        style={{ backgroundColor: brandColors.primary }}
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
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Đăng ký tư vấn
          </>
        )}
      </motion.button>

      <p className="text-xs text-gray-500 text-center">
        Bằng việc đăng ký, bạn đồng ý với{' '}
        <a href="#" className="text-green-600 hover:underline">
          Điều khoản sử dụng
        </a>{' '}
        và{' '}
        <a href="#" className="text-green-600 hover:underline">
          Chính sách bảo mật
        </a>
      </p>
    </motion.form>
  );
};