'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Users, Laptop } from 'lucide-react';
import CourseService from '@/lib/services/CourseService';
import { convertCourse, type Course } from './simple-featured-courses';

/**
 * CourseCard Component
 */
function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/khoa-hoc/${course.id}`}
      className="group flex gap-2 p-2 rounded-lg hover:bg-green-50 transition-all duration-300 border border-gray-200 hover:border-green-300 hover:shadow-md"
    >
      {/* Image - 20% */}
      <div className="w-[20%] flex-shrink-0">
        <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-100">
          <Image
            src={course.image || '/images/courses/default-course.jpg'}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 20vw, 10vw"
          />
        </div>
      </div>

      {/* Title & Description - 80% */}
      <div className="w-[80%] flex flex-col justify-center gap-1">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1 leading-tight">
          {course.title}
        </h3>
        {course.description && (
          <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
            {course.description}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * SimpleFeaturedCoursesSection Component
 * Responsibility: Display featured courses in two-column layout
 */
export default function SimpleFeaturedCoursesSection() {
  const [allSoftSkills, setAllSoftSkills] = useState<Course[]>([]);
  const [allComputer, setAllComputer] = useState<Course[]>([]);
  const [softSkillsCourses, setSoftSkillsCourses] = useState<Course[]>([]);
  const [computerCourses, setComputerCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const courses = await CourseService.getFeaturedCourses(20);

        // Filter soft skills courses
        const softSkills = courses
          .filter(course => course.type === 'SOFT_SKILLS')
          .map(convertCourse)
          .slice(0, 3); // Limit to 5 courses

        // Filter computer courses
        const computer = courses
          .filter(course =>
            course.type === 'OFFICE' ||
            course.type === 'PROGRAMMING' ||
            course.type === 'IT'
          )
          .map(convertCourse)
          .slice(0, 3); // Limit to 5 courses

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

  // Filter courses based on debounced search query
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

  if (isLoading) {
    return (
      <section className="py-0 md:py-0 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chương trình đào tạo
            </h2>
            <p className="text-gray-600">Đang tải chương trình đào tạo...</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pB-2 md:py-2 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chương trình đào tạo
          </h2>
          {/* <p className="text-gray-600 max-w-2xl mx-auto">
            Các khóa học được đánh giá cao nhất với chương trình cập nhật và thực tế
          </p> */}
        </div>

        {/* Search Filter */}
        {/* <div className="max-w-2xl mx-auto mb-8">
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
          {debouncedSearchQuery && (
            <p className="mt-3 text-sm text-gray-600 text-center">
              Tìm thấy <span className="font-semibold text-green-600">
                {softSkillsCourses.length + computerCourses.length}
              </span> khóa học
            </p>
          )}
        </div> */}

        {/* No results message */}
        {/* {debouncedSearchQuery && softSkillsCourses.length === 0 && computerCourses.length === 0 && (
          <div className="text-center py-12 px-4">
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
            <button
              onClick={() => setSearchQuery('')}
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
        )} */}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb">

          {/* Left: Soft Skills */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-green-600">KỸ NĂNG MỀM</h3>
            </div>

            {softSkillsCourses.length > 0 ? (
              <div className="space-y-2">
                {softSkillsCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Chưa có khóa học nào</p>
              </div>
            )}

            {/* <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/ky-nang-mem"
                className="flex items-center justify-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                Xem tất cả kỹ năng mềm
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div> */}
          </div>

          {/* Right: Computer Courses */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-green-600">TIN HỌC</h3>
            </div>

            {computerCourses.length > 0 ? (
              <div className="space-y-2">
                {computerCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Laptop className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Chưa có khóa học nào</p>
              </div>
            )}

            {/* <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/tin-hoc"
                className="flex items-center justify-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Xem tất cả tin học
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div> */}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-5">
          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <GraduationCap className="w-5 h-5" />
            Xem tất cả khóa học
          </Link>
        </div>
      </div>
    </section>
  );
}
