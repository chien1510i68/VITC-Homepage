'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  SectionHeader, 
  CourseRow, 
  CTAButton, 
  Styles,
  convertCourse,
  type Course
} from './simple-featured-courses';
import CourseService from '@/lib/services/CourseService';

/**
 * SimpleFeaturedCoursesSection Component
 * 
 * Responsibility: Layout orchestration and composition of the featured courses section.
 * Follows SRP by delegating specific concerns to focused child components:
 * - SectionHeader: Handles section title and description display
 * - CourseRow: Manages course carousel with auto-scrolling and navigation
 * - CTAButton: Handles call-to-action functionality
 * - Styles: Provides necessary CSS styles
 */
export default function SimpleFeaturedCoursesSection() {
  const [softSkillsCourses, setSoftSkillsCourses] = useState<Course[]>([]);
  const [computerCourses, setComputerCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const courses = await CourseService.getFeaturedCourses(20);
        
        // Filter soft skills courses
        const softSkills = courses
          .filter(course => course.categoryCode === 'SOFTSKILLS')
          .map(convertCourse);
        
        // Filter computer courses (OFFICE, PROGRAMMING)
        const computer = courses
          .filter(course => course.categoryCode === 'OFFICE' || course.categoryCode === 'PROGRAMMING')
          .map(convertCourse);
        
        setSoftSkillsCourses(softSkills);
        setComputerCourses(computer);
      } catch (error) {
        console.error('❌ Error loading featured courses:', error);
        // Giữ mảng rỗng - component sẽ không hiển thị sections
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader 
            title="Khóa Học Nổi Bật"
            description="Đang tải khóa học..."
          />
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Nếu không có khóa học nào, không hiển thị section
  if (softSkillsCourses.length === 0 && computerCourses.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader 
          title="Khóa Học Nổi Bật"
          description="Các khóa học được đánh giá cao nhất với chương trình cập nhật và thực tế"
        />

        {softSkillsCourses.length > 0 && (
          <CourseRow 
            title="Khóa học Kỹ năng mềm"
            courses={softSkillsCourses}
            direction="right"
          />
        )}
        
        {computerCourses.length > 0 && (
          <CourseRow 
            title="Khóa học Tin học"
            courses={computerCourses}
            direction="left"
          />
        )}
        
        <div className="flex justify-end mt-8 md:mt-12 px-4">
          <Link href="/khoa-hoc">
            <CTAButton />
          </Link>
        </div>
      </div>

      <Styles />
    </section>
  );
}
