"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { api, Program } from '@/lib/api';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Star,
  Users,
  Award
} from 'lucide-react';

/**
 * CourseCard Component
 * Modern, clean card for displaying course information
 */
function CourseCard({ course, index, isTall }: { course: Program; index: number; isTall: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] flex-shrink-0 z-0">
        <Image
          src={course.image || '/images/courses/default-course.jpg'}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge with title */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
            {course.title}
          </span>
        </div>
      </div>

      {/* Content for tall cards */}
      {isTall && (
        <div className="p-3 flex flex-col">
          <p className="text-slate-500 text-sm line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-medium">{course.duration}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/**
 * ProgramsSection Component
 * Simplified course display using a clean responsive grid
 */
export default function ProgramsSection() {
  const [courses, setCourses] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      try {
        const data = await api.getCoursesByType('IT', 0, 8);
        setCourses(data);
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="programs">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6"
          >
            <BookOpen className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-widest">Chương trình đào tạo</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight"
          >
            Nâng tầm kỹ năng <span className="text-green-600">Công nghệ</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Hệ thống khóa học tin học chuẩn quốc tế, giúp bạn làm chủ công nghệ và bứt phá sự nghiệp trong kỷ nguyên số.
          </motion.p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="mb-16 mx-2 md:mx-4">
            {/* Mobile: 2 cols */}
            <div className="lg:hidden flex gap-2">
              {[0, 1].map((colIdx) => (
                <div key={colIdx} className="flex-1 flex flex-col gap-2">
                  {[0, 1].map((itemIdx) => (
                    <div key={itemIdx} className="bg-slate-50 rounded-2xl animate-pulse h-[200px]" />
                  ))}
                </div>
              ))}
            </div>
            {/* Tablet: 3 cols */}
            <div className="hidden md:block lg:hidden flex gap-3">
              {[0, 1, 2].map((colIdx) => (
                <div key={colIdx} className="flex-1 flex flex-col gap-3">
                  {[0, 1].map((itemIdx) => (
                    <div key={itemIdx} className="bg-slate-50 rounded-2xl animate-pulse h-[250px]" />
                  ))}
                </div>
              ))}
            </div>
            {/* Desktop: 4 cols */}
            <div className="hidden lg:flex gap-3">
              {[0, 1, 2, 3].map((colIdx) => (
                <div key={colIdx} className="flex-1 flex flex-col gap-3">
                  {[0, 1].map((itemIdx) => (
                    <div key={itemIdx} className="bg-slate-50 rounded-2xl animate-pulse h-[250px]" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : courses.length > 0 ? (
          <div className="mb-16 mx-2 md:mx-4">
            {/* Mobile: 2 cols x 2 rows */}
            <div className="lg:hidden flex gap-2">
              {[0, 1].map((colIdx) => {
                const isReversed = colIdx === 1;
                const colCourses = courses.slice(0, 4).filter((_, i) => i % 2 === colIdx);
                return (
                  <div key={colIdx} className="flex-1 flex flex-col gap-2">
                    {colCourses.map((course, itemIdx) => {
                      const isTall = isReversed ? itemIdx === 1 : itemIdx === 0;
                      return (
                        <CourseCard key={course.id} course={course} index={itemIdx} isTall={isTall} />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* Tablet: 3 cols x 2 rows */}
            <div className="hidden md:block lg:hidden flex gap-3">
              {[0, 1, 2].map((colIdx) => {
                const isReversed = colIdx === 1;
                const colCourses = courses.slice(0, 6).filter((_, i) => i % 3 === colIdx);
                return (
                  <div key={colIdx} className="flex-1 flex flex-col gap-3">
                    {colCourses.map((course, itemIdx) => {
                      const isTall = isReversed ? itemIdx === 1 : itemIdx === 0;
                      return (
                        <CourseCard key={course.id} course={course} index={itemIdx} isTall={isTall} />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* Desktop: 4 cols x 2 rows */}
            <div className="hidden lg:flex gap-3">
              {[0, 1, 2, 3].map((colIdx) => {
                const isReversed = colIdx % 2 === 1;
                const colCourses = courses.slice(0, 8).filter((_, i) => i % 4 === colIdx);
                return (
                  <div key={colIdx} className="flex-1 flex flex-col gap-3">
                    {colCourses.map((course, itemIdx) => {
                      const isTall = isReversed ? itemIdx === 1 : itemIdx === 0;
                      return (
                        <CourseCard key={course.id} course={course} index={itemIdx} isTall={isTall} />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">Hiện chưa có khóa học nào. Vui lòng quay lại sau.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link 
            href="/khoa-hoc"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl shadow-slate-100"
          >
            <span>KHÁM PHÁ TẤT CẢ KHÓA HỌC</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
