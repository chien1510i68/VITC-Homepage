"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, BookOpen, Star, CheckCircle, ArrowLeft, Filter, MapPin } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { api, Program, CourseSchedule } from '@/lib/api';

export default function KhoaHocPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedSubject, setSelectedSubject] = useState('Tất cả');
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoadingPrograms(true);
      try {
        const programsData = await api.getPrograms();
        setPrograms(programsData);
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setIsLoadingPrograms(false);
      }
    };

    const loadSchedules = async () => {
      setIsLoadingSchedules(true);
      try {
        const schedulesData = await api.getCourseSchedules();
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error loading schedules:', error);
      } finally {
        setIsLoadingSchedules(false);
      }
    };

    loadPrograms();
    loadSchedules();
  }, []);

  const categories = ['Tất cả', ...Array.from(new Set(programs.map(p => p.category)))];
  const subjects = ['Tất cả', ...Array.from(new Set(schedules.map(s => s.subject)))];

  const filteredPrograms = selectedCategory === 'Tất cả' 
    ? programs 
    : programs.filter(p => p.category === selectedCategory);

  const filteredSchedules = selectedSubject === 'Tất cả'
    ? schedules
    : schedules.filter(s => s.subject === selectedSubject);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} rounded-full blur-3xl`}></div>
            <div className={`absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-3xl`}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link 
              href="/"
              className={`inline-flex items-center gap-2 mb-8 ${TAILWIND_COLORS.textPrimary} hover:${TAILWIND_COLORS.textPrimaryDark} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại trang chủ</span>
            </Link>

            <div className="max-w-3xl">
              <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                Chương trình đào tạo
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                Khám phá các khóa học tại VITC
              </h1>
              <p className="text-xl text-gray-300">
                Đa dạng chương trình đào tạo từ cơ bản đến nâng cao, phù hợp với mọi đối tượng học viên
              </p>
            </div>
          </div>
        </section>

        {/* Course Schedule Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
                Lịch khai giảng
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lịch khai giảng các khóa học
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Đăng ký ngay để không bỏ lỡ cơ hội học tập
              </p>
            </div>

            {/* Subject Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Lọc theo môn học</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedSubject === subject
                        ? `${TAILWIND_COLORS.bgPrimary} text-white`
                        : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Tìm thấy <strong className={TAILWIND_COLORS.textPrimary}>{filteredSchedules.length}</strong> lớp học
              </p>
            </div>

            {/* Schedule Table */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
              {isLoadingSchedules ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
                  <p className="text-gray-600">Đang tải lịch khai giảng...</p>
                </div>
              ) : filteredSchedules.length === 0 ? (
                <div className="p-12 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Chưa có lịch khai giảng</p>
                </div>
              ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${TAILWIND_COLORS.bgPrimary} text-white`}>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Lớp</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Thời gian</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Ngày khai giảng</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Địa điểm học</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Trạng thái</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSchedules.map((schedule) => (
                      <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{schedule.className}</div>
                          <div className="text-sm text-gray-600">{schedule.courseName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{schedule.schedule}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">{schedule.startDate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{schedule.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            schedule.status === 'Đang tuyển sinh' 
                              ? 'bg-green-100 text-green-800'
                              : schedule.status === 'Sắp khai giảng'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {schedule.status || 'Đang tuyển sinh'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button 
                            size="sm" 
                            className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover}`}
                          >
                            Đăng ký
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          </div>
        </section>

        {/* Filter & Programs Section */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Lọc theo danh mục khóa học</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? `${TAILWIND_COLORS.bgPrimary} text-white`
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Tìm thấy <strong className={TAILWIND_COLORS.textPrimary}>{filteredPrograms.length}</strong> khóa học
              </p>
            </div>

            {/* Programs Grid */}
            {isLoadingPrograms ? (
              <div className="py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600 text-lg">Đang tải khóa học...</p>
              </div>
            ) : filteredPrograms.length === 0 ? (
              <div className="py-20 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Không tìm thấy khóa học nào</p>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <Link key={program.id} href={`/khoa-hoc/${program.id}`}>
                  <Card 
                    className="group overflow-hidden border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer h-full"
                  >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {program.isHot && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        Nổi bật
                      </div>
                    )}
                    <div className={`absolute top-4 right-4 ${TAILWIND_COLORS.bgPrimary} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {program.category}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className={`text-xl mb-2 ${TAILWIND_COLORS.textPrimaryHover} transition-colors`}>
                      {program.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {program.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{program.students}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{program.sessions}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{program.rating}</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className={`text-xl font-bold ${TAILWIND_COLORS.textPrimary}`}>
                        {program.price}
                      </div>
                      <Button size="sm" className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover}`}>
                        Chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
