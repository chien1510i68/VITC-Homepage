import { BookOpen, CheckCircle } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { Program } from '@/lib/api';

interface CourseContentProps {
  program: Program;
}

export default function CourseContent({ program }: CourseContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Course Description */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 ${TAILWIND_COLORS.bgPrimary} rounded-xl flex items-center justify-center shadow-lg`}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Giới thiệu khóa học</h2>
        </div>
        <div 
          className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: program.fullDescription || program.description }}
        />
      </div>

      {/* Course Highlights */}
      {program.highlights && program.highlights.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Điểm nổi bật</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {program.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-all group">
                <CheckCircle className={`w-6 h-6 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                <span className="text-gray-700 font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Curriculum */}
      {program.syllabus && program.syllabus.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Chương trình học</h2>
          <div className="space-y-6 relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-200 via-emerald-200 to-green-200"></div>
            
            {program.syllabus.map((item, index) => (
              <div key={index} className="relative flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all group border border-gray-100 hover:border-green-200">
                <div className={`w-12 h-12 ${TAILWIND_COLORS.bgPrimary} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 relative z-10`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{item.module}</div>
                  <div className="text-gray-600 mb-2">{item.title}</div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg text-sm font-semibold text-green-700">
                  <span>{item.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}