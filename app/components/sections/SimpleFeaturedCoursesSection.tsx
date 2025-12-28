'use client';

import React from 'react';
import Link from 'next/link';
import { 
  SectionHeader, 
  CourseRow, 
  CTAButton, 
  Styles,
  softSkillsCourses,
  computerCourses
} from './simple-featured-courses';

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
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader 
          title="Khóa Học Nổi Bật"
          description="Các khóa học được đánh giá cao nhất với chương trình cập nhật và thực tế"
        />

        <CourseRow 
          title="Khóa học Kỹ năng mềm"
          courses={softSkillsCourses}
          direction="right"
        />
        
        <CourseRow 
          title="Khóa học Tin học"
          courses={computerCourses}
          direction="left"
        />
        
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
