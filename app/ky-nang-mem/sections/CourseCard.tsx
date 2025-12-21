import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type Course = {
  id: number;
  title: string;
  category: string;
  excerpt?: string;
  image?: string;
  duration?: string;
  level?: string;
  audience?: string[]; // e.g. ['Sinh viên chính quy', 'Cán bộ']
};

export default function CourseCard({ course }: { course: Course }) {
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
            <span className="hidden sm:inline-block px-2 py-1 text-xs bg-slate-100 rounded-full text-slate-700">{course.category}</span>
          </div>

          <div>
            <button aria-label={`Đăng ký ${course.title}`} className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-white hover:bg-sky-600 px-3 py-1 rounded-md transition-colors duration-200">
              <span>Đăng ký</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
