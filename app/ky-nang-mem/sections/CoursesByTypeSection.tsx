"use client";

import { useMemo, useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import type { CourseCategory, Course } from '../types';
import * as api from '@/lib/api';
import { CourseRegistrationModal, useCourseRegistration } from '@/app/components/course-registration';

export default function CoursesByTypeSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, selectedCourseId, openModal, closeModal } = useCourseRegistration();

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
          category: 'Kỹ năng mềm' as CourseCategory,
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

  const filteredCourses = useMemo(() => {
    if (searchTerm.trim() === '') return allCourses;
    return allCourses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.excerpt?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }, [allCourses, searchTerm]);

  return (
    <section id="courses" className="py-10 lg:py-16 bg-slate-50/50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="mb-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900">Khóa học kỹ năng mềm</h3>
          <p className="mt-2 text-sm text-slate-500">Khám phá các khóa học giúp bạn phát triển bản thân và sự nghiệp</p>
        </div>

        {/* Search Filter - Simplified */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.slice(0, 4).map((course) => (
                <div key={course.id} className="transition-all duration-300">
                  <CourseCard course={course} onRegisterClick={() => openModal(String(course.id))} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <a
                href="/khoa-hoc"
                className="inline-flex items-center gap-2 px-8 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
              >
                Xem tất cả khóa học
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </>
        )}

        {/* Registration Modal */}
        <CourseRegistrationModal
          isOpen={isOpen}
          onClose={closeModal}
          defaultCourseId={selectedCourseId}
        />
      </div>
    </section>
  );
}
