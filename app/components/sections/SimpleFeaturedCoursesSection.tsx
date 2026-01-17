'use client';

import { useState, useEffect } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  
  // Lưu tất cả khóa học để filter
  const [allSoftSkills, setAllSoftSkills] = useState<Course[]>([]);
  const [allComputer, setAllComputer] = useState<Course[]>([]);

  // Load courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const courses = await CourseService.getFeaturedCourses(20);
        
        // Filter soft skills courses (backend uses SOFT_SKILLS with underscore)
        const softSkills = courses
          .filter(course => course.type === 'SOFT_SKILLS')
          .map(convertCourse);
        
        // Filter computer courses (OFFICE, PROGRAMMING, IT)
        const computer = courses
          .filter(course => 
            course.type === 'OFFICE' || 
            course.type === 'PROGRAMMING' ||
            course.type === 'IT'
          )
          .map(convertCourse);
        
        // Lưu tất cả courses để filter
        setAllSoftSkills(softSkills);
        setAllComputer(computer);
        
        setSoftSkillsCourses(softSkills);
        setComputerCourses(computer);
      } catch (error) {
        console.error('❌ Error loading featured courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter courses khi debounced search query thay đổi
  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') {
      setSoftSkillsCourses(allSoftSkills);
      setComputerCourses(allComputer);
    } else {
      const query = debouncedSearchQuery.toLowerCase();
      const filteredSoftSkills = allSoftSkills.filter(course =>
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query)
      );
      const filteredComputer = allComputer.filter(course =>
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query)
      );
      setSoftSkillsCourses(filteredSoftSkills);
      setComputerCourses(filteredComputer);
    }
  }, [debouncedSearchQuery, allSoftSkills, allComputer]);

  // Reset search function
  const handleResetSearch = () => {
    setSearchQuery('');
    setDebouncedSearchQuery('');
  };

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

  // Nếu không có khóa học nào ban đầu, hiển thị thông báo
  if (allSoftSkills.length === 0 && allComputer.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <SectionHeader 
            title="Khóa Học Nổi Bật"
            description="Đang cập nhật khóa học mới"
          />
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">Chưa có khóa học nào được hiển thị</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <SectionHeader 
          title="Khóa Học Nổi Bật"
          description="Các khóa học được đánh giá cao nhất với chương trình cập nhật và thực tế"
        />

        {/* Search Filter */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm khóa học theo tên..."
              className="w-full px-5 py-3.5 pl-12 pr-12 rounded-2xl border-2 border-green-200 
                       focus:border-green-500 focus:ring-4 focus:ring-green-100 
                       outline-none transition-all duration-300 
                       text-gray-700 placeholder-gray-400
                       shadow-sm hover:shadow-md bg-white/80 backdrop-blur-sm"
            />
            {/* Search Icon */}
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 
                         flex items-center justify-center rounded-full 
                         bg-gray-200 hover:bg-gray-300 transition-colors
                         text-gray-600 hover:text-gray-800"
                aria-label="Xóa tìm kiếm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {/* Search Results Count */}
          {debouncedSearchQuery && (
            <p className="mt-3 text-sm text-gray-600 text-center">
              Tìm thấy <span className="font-semibold text-green-600">
                {softSkillsCourses.length + computerCourses.length}
              </span> khóa học
            </p>
          )}
        </div>

        {/* No results message with reload button */}
        {debouncedSearchQuery && softSkillsCourses.length === 0 && computerCourses.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="mb-6">
              <svg 
                className="w-16 h-16 mx-auto text-gray-300 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Không tìm thấy khóa học
              </h3>
              <p className="text-gray-500 mb-6">
                Không có khóa học nào phù hợp với từ khóa &quot;{debouncedSearchQuery}&quot;
              </p>
            </div>
            <button
              onClick={handleResetSearch}
              className="inline-flex items-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-green-600 to-emerald-600 
                       text-white font-medium rounded-xl
                       hover:from-green-700 hover:to-emerald-700
                       transform hover:scale-105 transition-all duration-300
                       shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Tải lại danh sách
            </button>
          </div>
        )}

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
