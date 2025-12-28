"use client";

import { useMemo, useState } from 'react';
import CourseCard from './CourseCard';
import ConsultationPopup from '@/app/components/ui/ConsultationPopup';
import { ALL_COURSES, COURSE_CATEGORIES } from '../constants/courses';
import type { CourseCategory } from '../types';
import { Button } from '@/components/ui/button';

export default function CoursesByTypeSection() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('Tất cả');
  const [showPopup, setShowPopup] = useState(false);

  const handleRegisterClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'Tất cả') return ALL_COURSES;
    return ALL_COURSES.filter((course) => course.category === activeCategory);
  }, [activeCategory]);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="transition-all duration-300">
              <CourseCard course={course} onRegisterClick={handleRegisterClick} />
            </div>
          ))}
        </div>
      </div>

      <ConsultationPopup 
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </section>
  );
}
