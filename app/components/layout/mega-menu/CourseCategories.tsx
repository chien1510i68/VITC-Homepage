import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import type { CourseSchedule } from '@/lib/api/types';

interface CourseCategoriesProps {
  groupedCourses: Record<string, CourseSchedule[]>;
}

export function CourseCategories({ groupedCourses }: CourseCategoriesProps) {
  return (
    <div className="lg:col-span-1">
      <h3 className={`text-base font-bold ${TAILWIND_COLORS.textPrimary} mb-4 uppercase tracking-wide`}>
        Danh mục khóa học
      </h3>
      <div className="space-y-1">
        {Object.entries(groupedCourses).map(([subject, subjectCourses]) => (
          <div key={subject} className="group">
            <Link
              href={`/tin-hoc?category=${encodeURIComponent(subject)}`}
              className={`block py-2.5 px-3 rounded-md text-sm font-medium transition-all hover:${TAILWIND_COLORS.bgPrimaryLight} hover:${TAILWIND_COLORS.textPrimary} text-gray-700`}
            >
              {subject}
              <span className="ml-2 text-xs text-gray-400">({subjectCourses.length})</span>
            </Link>
          </div>
        ))}
      </div>
      
      {/* View All Link */}
      <Link
        href="/tin-hoc"
        className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${TAILWIND_COLORS.textPrimary} hover:underline`}
      >
        Xem tất cả khóa học
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Quick Action Buttons */}
      <div className="mt-6 space-y-2">
        <Button 
          asChild 
          className={`w-full ${TAILWIND_COLORS.bgPrimary} hover:bg-green-700 text-white text-sm h-9`}
        >
          <Link href="/tin-hoc#lich-khai-giang" className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Lịch khai giảng
          </Link>
        </Button>
        <Button 
          asChild 
          variant="outline"
          className={`w-full border-2 ${TAILWIND_COLORS.borderPrimary} ${TAILWIND_COLORS.textPrimary} hover:${TAILWIND_COLORS.bgPrimaryLight} text-sm h-9`}
        >
          <Link href="/tien-ich-dich-vu" className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Tra cứu chứng chỉ
          </Link>
        </Button>
      </div>
    </div>
  );
}
