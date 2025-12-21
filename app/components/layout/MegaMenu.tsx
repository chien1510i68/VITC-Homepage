'use client';

import type { CourseSchedule } from '@/lib/api/types';
import { CourseCategories } from './mega-menu/CourseCategories';
import { FeaturedCourses } from './mega-menu/FeaturedCourses';
import { PromotionsBanner } from './mega-menu/PromotionsBanner';

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  courses: CourseSchedule[];
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave, courses }: MegaMenuProps) {
  if (!isOpen) return null;

  // Group courses by subject
  const groupedCourses = courses.reduce((acc, course) => {
    const subject = course.subject || 'Khác';
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(course);
    return acc;
  }, {} as Record<string, CourseSchedule[]>);

  // Featured courses
  const featuredCourses = [
    courses.find(c => c.className === 'ICDL2501'),
    courses.find(c => c.className === 'WEB2501'),
  ].filter((course): course is CourseSchedule => course !== undefined);

  return (
    <div
      className="fixed left-0 right-0 top-16 z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Content Container with opacity and blur */}
      <div className="relative bg-gray/10 backdrop-blur-lg border-b border-gray-200 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Column - Course Categories */}
            <CourseCategories groupedCourses={groupedCourses} />

            {/* Right Column - Featured Courses & Promotions */}
            <div className="lg:col-span-3">
              <FeaturedCourses courses={featuredCourses} />
              <PromotionsBanner />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
