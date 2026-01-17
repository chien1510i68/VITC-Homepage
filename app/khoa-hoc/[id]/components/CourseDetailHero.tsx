'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Clock, GraduationCap, TrendingUp, ArrowLeft, Award } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { Program } from '@/lib/api';
import { CourseRegistrationModal, useCourseRegistration } from '@/app/components/course-registration';

interface CourseDetailHeroProps {
  program: Program;
}

export default function CourseDetailHero({ program }: CourseDetailHeroProps) {
  const { isOpen, openModal, closeModal } = useCourseRegistration();
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50/40 to-green-100/50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs - Green Theme */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-green-500/25 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-600/20 to-teal-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dcfce7_1px,transparent_1px),linear-gradient(to_bottom,#dcfce7_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link 
          href="/khoa-hoc"
          className="inline-flex items-center gap-2 mb-8 group text-green-900 hover:text-green-600 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-md border border-green-100 flex items-center justify-center group-hover:bg-green-50 group-hover:shadow-lg group-hover:border-green-200 transition-all duration-200">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-semibold">Quay lại danh sách khóa học</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category & Hot Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-green-600/30">
                <BookOpen className="w-4 h-4" />
                <span>{program.category}</span>
              </div>
              {program.isHot && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-green-500/40 animate-pulse" style={{ animationDuration: '2s' }}>
                  <TrendingUp className="w-4 h-4" />
                  <span>Nổi bật</span>
                </div>
              )}
            </div>

            {/* Title with Elegant Typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-900 via-green-800 to-green-900 bg-clip-text text-transparent leading-tight">
              {program.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-green-800/80 leading-relaxed max-w-2xl">
              {program.description}
            </p>

            {/* Stats Cards - Glass Morphism */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="group bg-white/80 backdrop-blur-sm border border-green-200/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-green-100 hover:border-green-400/60 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="text-2xl font-bold text-green-900">{program.rating}</span>
                </div>
                <p className="text-sm text-green-700 font-medium">{program.students} học viên</p>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm border border-green-200/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-green-100 hover:border-green-400/60 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-sm text-green-700 font-medium">{program.duration}</p>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm border border-green-200/60 rounded-2xl p-5 hover:shadow-xl hover:shadow-green-100 hover:border-green-400/60 transition-all duration-300 cursor-pointer col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-sm text-green-700 font-medium">{program.level}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg"
                onClick={() => openModal(typeof program.id === 'string' ? program.id : String(program.id))}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl shadow-green-600/30 hover:shadow-2xl hover:shadow-green-600/40 transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold group"
              >
                <span>Đăng ký ngay</span>
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => openModal(typeof program.id === 'string' ? program.id : String(program.id))}
                className="bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-green-600 hover:text-green-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold"
              >
                Tư vấn miễn phí
              </Button>
            </div>
          </div>

          {/* Image Column - Premium Card Design */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Decorative gradient behind - Green Theme */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-3xl blur-2xl opacity-35 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* Main image card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-green-100/60 shadow-2xl p-3">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover - Green Theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-green-200/60">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-slate-900">Chứng nhận</span>
                  </div>
                </div>
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
    </section>
  );
}