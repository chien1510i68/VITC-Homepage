"use client";

import { useMemo, useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import ConsultationPopup from '@/app/components/ui/ConsultationPopup';
import { COURSE_CATEGORIES } from '../constants/courses';
import type { CourseCategory, Course } from '../types';
import { Button } from '@/components/ui/button';
import * as api from '@/lib/api';

export default function CoursesByTypeSection() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('Tất cả');
  const [showPopup, setShowPopup] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        // Gọi API lấy khóa học kỹ năng mềm với categoryCode = SOFT_SKILLS
        const programs = await api.getCoursesByCategory('SOFT_SKILLS', 0, 50);
        
        // Convert sang định dạng Course
        const softSkillsCourses: Course[] = programs.map((program) => ({
          id: program.id,  // Sử dụng UUID thật từ API
          title: program.title,
          category: 'Tất cả' as CourseCategory, // Mặc định, sẽ filter sau
          excerpt: program.description || '',
          duration: program.duration,
          audience: ['Sinh viên', 'Cán bộ', 'Doanh nghiệp'],
          image: program.image
        }));
        
        setAllCourses(softSkillsCourses);
      } catch (error) {
        console.error('❌ Failed to load courses:', error);
        setAllCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleRegisterClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'Tất cả') return allCourses;
    return allCourses.filter((course) => course.category === activeCategory);
  }, [activeCategory, allCourses]);

  return (
    <section id="courses" className="py-16 lg:py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-extrabold text-slate-900">Danh sách khóa học</h3>
        </div>

        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {COURSE_CATEGORIES.map((category) => (
              <Button
                key={category}
                type="button"
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`flex-shrink-0 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-sky-600 to-emerald-600 text-white shadow-md border-0' 
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Conditional banners */}
          {activeCategory !== 'Tất cả' && (
            <div className="mt-4 p-3 rounded-lg text-sm">
              {activeCategory === 'Sinh viên HVNN' ? (
                <div className="bg-amber-50 border border-amber-100 text-amber-800 px-4 py-3 rounded-lg">
                  <strong>Bắt buộc:</strong> Những học phần này là yêu cầu bắt buộc cho sinh viên chính quy của Học viện.
                </div>
              ) : (
                <div className="bg-sky-50 border border-sky-100 text-sky-800 px-4 py-3 rounded-lg">
                  <strong>Theo nhu cầu:</strong> Những khóa học này mở theo nhu cầu — phù hợp cho cán bộ, doanh nghiệp và cộng đồng. Liên hệ để mở lớp theo yêu cầu.
                </div>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải khóa học...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Chưa có khóa học nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="transition-all duration-300">
                <CourseCard course={course} onRegisterClick={handleRegisterClick} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ConsultationPopup 
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </section>
  );
}
