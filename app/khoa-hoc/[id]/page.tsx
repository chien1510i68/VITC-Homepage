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
        const data = await api.getProgramById(programId);
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
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} rounded-full blur-3xl`}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/khoa-hoc"
              className={`inline-flex items-center gap-2 mb-6 ${TAILWIND_COLORS.textPrimary} hover:${TAILWIND_COLORS.textPrimaryDark} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại danh sách khóa học</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                  {program.category}
                </div>
                {program.isHot && (
                  <span className="ml-3 inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                    Nổi bật
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 mt-4">
                  {program.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  {program.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{program.rating}</span>
                    <span className="text-gray-400">({program.students} học viên)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{program.level}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-lg px-8`}>
                    Đăng ký ngay
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8">
                    Tư vấn miễn phí
                  </Button>
                </div>
              </div>

              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
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
                  <p className="text-gray-700 leading-relaxed">
                    {program.fullDescription}
                  </p>
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
                      <p className="text-gray-700 mb-4">{program.instructor.bio}</p>
                      
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
                    {program.benefits && program.benefits.length > 0 && (
                    <ul className="space-y-3">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Award className={`w-4 h-4 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{benefit}</span>
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
