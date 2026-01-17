import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from './types';
import { CourseBasicInfo } from '@/lib/api';

interface ConsultationFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  courses: CourseBasicInfo[];
  isLoadingCourses: boolean;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  courses,
  isLoadingCourses
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên *"
          value={formData.name}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại *"
          value={formData.phone}
          onChange={onChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <select
          name="course"
          value={formData.course}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700"
          disabled={isLoadingCourses}
        >
          <option value="">
            {isLoadingCourses ? 'Đang tải...' : 'Chọn chương trình học quan tâm'}
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title} {course.courseCode ? `(${course.courseCode})` : ''}
            </option>
          ))}
        </select>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
          'Đăng ký ngay'
        )}
      </motion.button>

      <p className="text-xs text-gray-500 text-center">
        Bằng việc đăng ký, bạn đồng ý với{' '}
        <a href="#" className="text-green-600 hover:underline">
          điều khoản sử dụng
        </a>
      </p>
    </form>
  );
};