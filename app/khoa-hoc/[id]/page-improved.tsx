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
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải thông tin khóa học...</p>
          </div>
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
        {/* Hero Section - Improved */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-purple-900 to-gray-900 text-white overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 mb-8 text-gray-300 hover:text-white transition-all hover:gap-3 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span>Quay lại danh sách khóa học</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-wrap gap-3 items-center">
                  <div className={`inline-flex items-center gap-2 ${TAILWIND_COLORS.bgPrimary} text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg`}>
                    <BookOpen className="w-4 h-4" />
                    {program.category}
                  </div>
                  {program.isHot && (
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      <Star className="w-4 h-4 fill-current" />
                      Nổi bật
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {program.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  {program.description}
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-2xl font-bold">{program.rating}</span>
                    </div>
                    <div className="text-xs text-gray-400">{program.students} đánh giá</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-2xl font-bold">{program.duration.split(' ')[0]}</span>
                    </div>
                    <div className="text-xs text-gray-400">Thời lượng</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-lg font-bold">{program.level}</span>
                    </div>
                    <div className="text-xs text-gray-400">Cấp độ</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-lg px-8 py-6 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105`}>
                    <Users className="w-5 h-5 mr-2" />
                    Đăng ký ngay
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-md shadow-xl transition-all hover:scale-105">
                    <Calendar className="w-5 h-5 mr-2" />
                    Tư vấn miễn phí
                  </Button>
                </div>
              </div>

              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-delay group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 z-10 group-hover:opacity-0 transition-opacity"></div>
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section - Improved */}
        <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${TAILWIND_COLORS.bgPrimary} rounded-xl flex items-center justify-center`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Giới thiệu khóa học</h2>
                  </div>
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: program.fullDescription || '' }}
                  />
                </div>

                {/* Highlights */}
                {program.highlights && program.highlights.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
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

                {/* Syllabus */}
                {program.syllabus && program.syllabus.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-12 h-12 ${TAILWIND_COLORS.bgPrimary} rounded-xl flex items-center justify-center shadow-lg`}>
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Nội dung khóa học</h2>
                  </div>
                  <div className="space-y-3 relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-blue-200"></div>
                    
                    {program.syllabus.map((item, index) => (
                      <div key={index} className="relative flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all group border border-gray-100 hover:border-blue-200">
                        <div className={`relative z-10 w-12 h-12 ${TAILWIND_COLORS.bgPrimary} text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{item.module}</div>
                          <div className="text-sm text-gray-600">{item.title}</div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg text-sm font-semibold text-blue-700">
                          <Clock className="w-4 h-4" />
                          {item.hours}h
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {/* Instructor */}
                {typeof program.instructor !== 'string' && program.instructor && (
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Giảng viên</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-xl shadow-md">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-200 ring-4 ring-blue-100">
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {program.instructor.name}
                      </h3>
                      <p className={`${TAILWIND_COLORS.textPrimary} font-semibold text-lg mb-3`}>
                        {program.instructor.title}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">{program.instructor.bio}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-blue-700">{program.instructor.experience}</div>
                          <div className="text-xs text-blue-600 font-medium">Kinh nghiệm</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-green-700">{program.instructor.students}</div>
                          <div className="text-xs text-green-600 font-medium">Học viên</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-purple-700">{program.instructor.courses}</div>
                          <div className="text-xs text-purple-600 font-medium">Khóa học</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                          <div className="text-2xl font-bold text-orange-700">{program.instructor.rating}</div>
                          <div className="text-xs text-orange-600 font-medium">Đánh giá</div>
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
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Yêu cầu đầu vào</h2>
                  </div>
                  <ul className="space-y-3">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                        <div className={`w-6 h-6 ${TAILWIND_COLORS.bgPrimary} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 font-medium">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 sticky top-24 shadow-2xl border border-blue-100">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-600 mb-3 bg-white px-4 py-2 rounded-full">
                      <TrendingUp className="w-4 h-4" />
                      Học phí ưu đãi
                    </div>
                    <div className="relative">
                      <div className={`text-5xl font-bold bg-gradient-to-r ${TAILWIND_COLORS.textPrimary} to-purple-600 bg-clip-text text-transparent mb-6`}>
                        {program.price}
                      </div>
                      {program.isHot && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
                          HOT
                        </div>
                      )}
                    </div>
                    <Button size="lg" className={`w-full ${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-lg mb-3 py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all`}>
                      <Users className="w-5 h-5 mr-2" />
                      Đăng ký ngay
                    </Button>
                    <Button size="lg" variant="outline" className="w-full py-6 border-2 hover:bg-blue-50 transition-all hover:scale-105">
                      <Calendar className="w-5 h-5 mr-2" />
                      Tư vấn miễn phí
                    </Button>
                  </div>

                  <div className="border-t-2 border-blue-200 pt-6">
                    <div className="flex items-center gap-2 mb-5">
                      <Award className="w-6 h-6 text-yellow-500" />
                      <h3 className="font-bold text-gray-900 text-lg">Quyền lợi học viên</h3>
                    </div>
                    {program.benefits && program.benefits.length > 0 && (
                    <ul className="space-y-3">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm p-3 bg-white rounded-xl hover:shadow-md transition-all group">
                          <CheckCircle className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
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
