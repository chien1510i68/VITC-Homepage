import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '../types';
import { getSafeImageUrl, getFallbackImage } from '../utils/imageUtils';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface CourseCardProps {
  course: Course;
  onRegisterClick?: () => void;
}

export default function CourseCard({ course, onRegisterClick }: CourseCardProps) {

  return (
    <article
      role="article"
      aria-labelledby={`course-${course.id}-title`}
      className="group bg-white rounded-2xl border border-slate-100 hover:shadow-2xl transition-transform duration-200 motion-reduce:transition-none hover:-translate-y-2 p-0 overflow-hidden w-full"
    >
      <div className="relative h-40 sm:h-44 lg:h-36 w-full">
        <ImageWithFallback
          src={getSafeImageUrl(course.image, 'course')} 
          alt={course.title} 
          fill 
          className="object-cover" 
          sizes="(max-width: 1024px) 100vw, 33vw"
          fallbackSrc={getFallbackImage('course')}
        />
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
            <Link href={`/khoa-hoc/${course.id}`}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Xem chi tiết ${course.title}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-green-600 hover:border-green-600 px-2 py-1"
              >
                <span>Chi tiết</span>
                {/* <ArrowRight className="w-3 h-3" /> */}
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRegisterClick}
              aria-label={`Đăng ký ${course.title}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-white hover:bg-green-600 px-3 py-1"
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
