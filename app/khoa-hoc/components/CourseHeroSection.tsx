import Link from 'next/link';
import { ArrowLeft, BookOpen, Users, Star } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';

interface CourseHeroSectionProps {
  programsCount: number;
}

export default function CourseHeroSection({ programsCount }: CourseHeroSectionProps) {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Aurora Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-green-400/20 via-emerald-400/15 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/15 via-green-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-green-300/10 to-emerald-300/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1fae5_1px,transparent_1px),linear-gradient(to_bottom,#d1fae5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-green-300/30 rounded-full"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 border-2 border-emerald-300/30 rounded-lg rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-teal-300/30 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link - Premium Design */}
        <Link 
          href="/"
          className="inline-flex items-center gap-3 mb-10 group text-green-800 hover:text-green-600 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại trang chủ</span>
        </Link>

        <div className="max-w-3xl">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            Chương trình đào tạo
          </div>
          
          {/* Main Heading - Elegant Typography with Green Gradient */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            <span className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 bg-clip-text text-transparent">
              Khám phá
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent">
              các khóa học tại VITC
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-green-800/70 leading-relaxed mb-8 max-w-3xl font-inter">
            Đa dạng chương trình đào tạo từ cơ bản đến nâng cao, phù hợp với mọi đối tượng học viên
          </p>

          {/* Stats Cards - Premium Glass Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="bg-white/80 backdrop-blur-md border border-green-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-100 hover:border-green-300 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900">{programsCount}+</p>
                  <p className="text-sm text-green-700 font-medium">Khóa học</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-green-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-100 hover:border-green-300 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900">1000+</p>
                  <p className="text-sm text-green-700 font-medium">Học viên</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-green-200/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-green-100 hover:border-green-300 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900">4.8</p>
                  <p className="text-sm text-green-700 font-medium">Đánh giá</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
