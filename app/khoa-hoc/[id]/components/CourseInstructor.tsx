import Image from 'next/image';
import { TAILWIND_COLORS } from '@/lib/colors';
import { Program } from '@/lib/api';

interface CourseInstructorProps {
  program: Program;
}

export default function CourseInstructor({ program }: CourseInstructorProps) {
  const instructor = typeof program.instructor === 'string' 
    ? { name: program.instructor } 
    : program.instructor;

  // Only render if instructor has detailed info
  if (typeof program.instructor === 'string' || !program.instructor) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Giảng viên</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-200">
          {program.instructor.image && (
            <Image
              src={program.instructor.image}
              alt={program.instructor.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {program.instructor.name}
          </h3>
          <p className={`${TAILWIND_COLORS.textPrimary} font-medium mb-3`}>
            {program.instructor.title}
          </p>
          <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{__html: program.instructor.bio || ''}} />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">{program.instructor.experience}</div>
              <div className="text-sm text-gray-600">Kinh nghiệm</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{program.instructor.students}</div>
              <div className="text-sm text-gray-600">Học viên</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{program.instructor.courses}</div>
              <div className="text-sm text-gray-600">Khóa học</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{program.instructor.rating}</div>
              <div className="text-sm text-gray-600">Đánh giá</div>
            </div>
          </div>

          {program.instructor.specialties && program.instructor.specialties.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-900 mb-2">Chuyên môn:</div>
            <div className="flex flex-wrap gap-2">
              {program.instructor.specialties.map((specialty, index) => (
                <span key={index} className={`px-3 py-1 ${TAILWIND_COLORS.bgPrimary} text-white rounded-full text-sm`}>
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          )}

          {program.instructor.education && program.instructor.education.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-900 mb-2">Học vấn:</div>
            <ul className="space-y-1">
              {program.instructor.education.map((edu, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  {edu}
                </li>
              ))}
            </ul>
          </div>
          )}

          {program.instructor.achievements && program.instructor.achievements.length > 0 && (
          <div>
            <div className="text-sm font-semibold text-gray-900 mb-2">Thành tựu:</div>
            <ul className="space-y-1">
              {program.instructor.achievements.map((achievement, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}