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
    <section id="courses" className="py-16 lg:py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-extrabold text-slate-900">Danh sách khóa học</h3>
        </div>

        {/* Search Filter */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
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
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải khóa học...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="transition-all duration-300">
                <CourseCard course={course} onRegisterClick={() => openModal(String(course.id))} />
              </div>
            ))}
          </div>
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
