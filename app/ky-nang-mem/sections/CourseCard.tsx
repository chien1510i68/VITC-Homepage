import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onRegisterClick?: () => void;
}

// Map ky-nang-mem course ID to actual course ID in courses.ts
const courseIdMap: Record<number, string> = {
  1: '101', // Kỹ năng giao tiếp
  2: '102', // Kỹ năng làm việc nhóm
  3: '103', // Kỹ năng quản lý bản thân
  4: '104', // Kỹ năng tìm kiếm việc làm
  5: '105', // Kỹ năng hội nhập quốc tế
  6: '106', // Kỹ năng giải quyết vấn đề
  7: '111', // Tư duy sáng tạo
  8: '113', // Kỹ năng thuyết trình
  9: '109', // Kỹ năng quản lý dự án
  10: '108', // Kỹ năng quản lý thời gian
  11: '114', // Kỹ năng bán hàng online
  12: '116', // Kỹ năng tổ chức công việc hiệu quả
};

export default function CourseCard({ course, onRegisterClick }: CourseCardProps) {
  const actualCourseId = courseIdMap[course.id] || course.id.toString();

  return (
    <article
      role="article"
      aria-labelledby={`course-${course.id}-title`}
      className="group bg-gradient-to-br from-white/60 to-white/40 dark:from-slate-800/40 dark:to-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-100 hover:shadow-2xl transition-transform duration-200 motion-reduce:transition-none hover:-translate-y-2 p-0 overflow-hidden w-full"
    >
      <div className="relative h-40 sm:h-44 lg:h-36 w-full">
        {course.image ? (
          <Image src={course.image} alt={course.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-emerald-300 to-emerald-500" />
        )}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/85 text-slate-900">{course.level || 'Cơ bản'}</div>
      </div>

      <div className="p-4 sm:p-5">
        <h4 id={`course-${course.id}-title`} className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2">
          {course.title}
        </h4>

        {course.excerpt ? (
          <p className="mt-2 text-xs text-slate-600 line-clamp-2">{course.excerpt}</p>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">{course.duration || '2 buổi'}</span>
            {/* <span className="hidden sm:inline-block px-2 py-1 text-xs bg-slate-100 rounded-full text-slate-700">{course.category}</span> */}
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/khoa-hoc/${actualCourseId}`}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label={`Xem chi tiết ${course.title}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-sky-600 hover:border-sky-600 px-2 py-1"
              >
                <span>Chi tiết</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRegisterClick}
              aria-label={`Đăng ký ${course.title}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-white hover:bg-sky-600 px-3 py-1"
            >
              <span>Đăng ký</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
