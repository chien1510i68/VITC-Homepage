"use client";

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, BookOpen, Star, CheckCircle, ArrowLeft, Award, TrendingUp, GraduationCap } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api, Program } from '@/lib/api';

export default function ChiTietKhoaHocPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const programId = parseInt(id);
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgram = async () => {
      setIsLoading(true);
      try {
        const data = await api.getCourseById(programId);
        setProgram(data);
        if (!data) {
          notFound();
        }
      } catch (error) {
        console.error('Error loading program:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadProgram();
  }, [programId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Đang tải thông tin khóa học...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!program) {
    notFound();
  }

  const instructor = typeof program.instructor === 'string' 
    ? { name: program.instructor } 
    : program.instructor;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner - Modern Elegant Professional */}
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-900 via-green-800 to-green-900 bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {program.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-green-800/80 leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl shadow-green-600/30 hover:shadow-2xl hover:shadow-green-600/40 transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold group"
                  >
                    <span>Đăng ký ngay</span>
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
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
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Giới thiệu khóa học</h2>
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: program.fullDescription || '' }}
                  />
                </div>

                {/* Highlights */}
                {program.highlights && program.highlights.length > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Điểm nổi bật</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {program.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* What you'll learn */}
                {program.syllabus && program.syllabus.length > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bạn sẽ học được gì?</h2>
                  <div className="space-y-4">
                    {program.syllabus.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${TAILWIND_COLORS.bgPrimary} text-white rounded-lg flex items-center justify-center font-semibold`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.module}</div>
                            <div className="text-sm text-gray-600">{item.title}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.hours}h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* Instructor Info - Moved below What you'll learn */}
                {typeof program.instructor !== 'string' && program.instructor && (
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
                              <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                      )}

                      {program.instructor.achievements && program.instructor.achievements.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-2">Thành tích:</div>
                        <ul className="space-y-1">
                          {program.instructor.achievements.map((achievement, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
                )}

                {/* Requirements */}
                {program.requirements && program.requirements.length > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Yêu cầu</h2>
                  <ul className="space-y-3">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`w-2 h-2 ${TAILWIND_COLORS.bgPrimary} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-600 mb-2">Học phí</div>
                    <div className={`text-4xl font-bold ${TAILWIND_COLORS.textPrimary} mb-4`}>
                      {program.price}
                    </div>
                    <Button size="lg" className={`w-full ${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-lg mb-3`}>
                      Đăng ký ngay
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      Tư vấn miễn phí
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Quyền lợi học viên</h3>
                    {program.benefits && program.benefits.length > 0 ? (
                    <ul className="space-y-3">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Award className={`w-4 h-4 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    ) : (
                      <div className="text-sm text-gray-600">Thông tin đang được cập nhật</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
