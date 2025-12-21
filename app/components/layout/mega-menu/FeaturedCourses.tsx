import Link from 'next/link';
import { TAILWIND_COLORS } from '@/lib/colors';
import type { CourseSchedule } from '@/lib/api/types';

interface FeaturedCoursesProps {
  courses: CourseSchedule[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  return (
    <>
      <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
        Khóa học nổi bật
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/tin-hoc/${course.className}`}
            className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-300"
          >
            {/* Course Image */}
            <div className="relative h-32 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-4xl font-bold ${TAILWIND_COLORS.textPrimary} opacity-10`}>
                  {course.className}
                </div>
              </div>
              {/* HOT Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-0.5 text-xs font-bold ${TAILWIND_COLORS.bgPrimary} text-white rounded-full shadow-md`}>
                  HOT
                </span>
              </div>
              {/* Status Badge */}
              {course.status && (
                <div className="absolute bottom-2 left-2">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full shadow-md ${
                    course.status === 'Đang tuyển sinh' 
                      ? 'bg-green-500 text-white' 
                      : course.status === 'Sắp khai giảng'
                      ? 'bg-blue-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {course.status}
                  </span>
                </div>
              )}
            </div>
            
            {/* Course Info */}
            <div className="p-3">
              <h4 className={`text-sm font-bold text-gray-900 mb-1 group-hover:${TAILWIND_COLORS.textPrimary} transition-colors line-clamp-1`}>
                {course.courseName}
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Mã lớp: <span className="font-semibold">{course.className}</span>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{course.startDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
