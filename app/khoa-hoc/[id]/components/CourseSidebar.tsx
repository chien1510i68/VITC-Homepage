'use client';

import { Calendar, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { Program } from '@/lib/api';
import { CourseRegistrationModal, useCourseRegistration } from '@/app/components/course-registration';

interface CourseSidebarProps {
  program: Program;
}

export default function CourseSidebar({ program }: CourseSidebarProps) {
  const { isOpen, openModal, closeModal } = useCourseRegistration();

  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-8 space-y-6">
          {/* Price & CTA Card */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold ${TAILWIND_COLORS.textPrimary} mb-2`}>{program.price}</div>
              <div className="text-gray-600">Học phí toàn khóa</div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => openModal(typeof program.id === 'string' ? program.id : String(program.id))}
                className={`w-full ${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all`}
              >
                Đăng ký ngay
              </Button>
              <Button 
                onClick={() => openModal(typeof program.id === 'string' ? program.id : String(program.id))}
                variant="outline" 
                className="w-full py-6 text-lg font-semibold border-2 hover:border-green-600 hover:text-green-600"
              >
                Tư vấn miễn phí
              </Button>
            </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Học thử miễn phí</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Hỗ trợ trọn đời</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Chứng nhận hoàn thành</span>
            </div>
          </div>
        </div>

        {/* Course Info Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin khóa học</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${TAILWIND_COLORS.bgPrimaryLight} rounded-lg flex items-center justify-center`}>
                <Clock className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary}`} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Thời lượng</div>
                <div className="text-sm text-gray-600">{program.duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${TAILWIND_COLORS.bgPrimaryLight} rounded-lg flex items-center justify-center`}>
                <Users className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary}`} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Học viên</div>
                <div className="text-sm text-gray-600">{program.students} người</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${TAILWIND_COLORS.bgPrimaryLight} rounded-lg flex items-center justify-center`}>
                <Calendar className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary}`} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Lịch học</div>
                <div className="text-sm text-gray-600">{program.sessions || 'Linh hoạt'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${TAILWIND_COLORS.bgPrimaryLight} rounded-lg flex items-center justify-center`}>
                <Award className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary}`} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Cấp độ</div>
                <div className="text-sm text-gray-600">{program.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support Card */}
        <div className={`${TAILWIND_COLORS.bgPrimaryLightest} border-2 ${TAILWIND_COLORS.borderPrimary} rounded-2xl p-6`}>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cần hỗ trợ?</h3>
          <p className="text-gray-700 mb-4">
            Đội ngũ tư vấn sẵn sàng hỗ trợ bạn chọn khóa học phù hợp nhất.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Hotline:</span>
              <span className={TAILWIND_COLORS.textPrimary}>1900 xxxx</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <span className={TAILWIND_COLORS.textPrimary}>support@vitc.edu.vn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
      {/* Course Registration Modal */}
      <CourseRegistrationModal 
        isOpen={isOpen}
        onClose={closeModal}
        defaultCourseId={typeof program.id === 'string' ? program.id : String(program.id)}
      />
    </>
  );
}