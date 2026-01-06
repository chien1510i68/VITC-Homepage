"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { api, Program } from '@/lib/api';
import { STYLES, SECTION_CONFIG } from '../constants';
import type { SectionHeaderProps, ProgramDetailProps, ProgramListProps } from '../types';

// Section Header Component
function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className={STYLES.loadingState}>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>
  );
}

// Program Detail Component
function ProgramDetail({ program }: ProgramDetailProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-48 md:h-64 lg:h-72 overflow-hidden group">
        {program.image ? (
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">{program.title.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 flex-1">
            {program.title}
          </h3>
          {program.price && (
            <div className="ml-4 text-right">
              <div className="text-2xl font-bold text-blue-600">{program.price}</div>
            </div>
          )}
        </div>
        
        {/* Short Description */}
        {program.description && (
          <p className="text-gray-600 leading-relaxed mb-3">
            {program.description}
          </p>
        )}
        
        {/* Highlights */}
        {program.highlights && program.highlights.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Điểm nổi bật:</h4>
            <div className="flex flex-wrap gap-2">
              {program.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Info Bar */}
        <div className="flex flex-wrap gap-3 py-3 mb-3 border-y border-gray-200">
          {program.duration && (
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{program.duration}</span>
            </div>
          )}
          {program.level && (
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>{program.level}</span>
            </div>
          )}
          {program.students && (
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{program.students}</span>
            </div>
          )}
          {program.rating && (
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{program.rating}</span>
            </div>
          )}
        </div>

        {/* Full Description HTML - Giới hạn 3-4 dòng */}
        {program.fullDescription && (
          <div className="mb-3">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Mô tả chi tiết</h4>
            <div 
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed line-clamp-4"
              dangerouslySetInnerHTML={{ __html: program.fullDescription }}
            />
          </div>
        )}

        {/* Button Xem Chi Tiết */}
        <div className="mt-3">
          <Link 
            href={`/khoa-hoc/${program.id}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

// Program List Component
function ProgramList({ programs, selectedProgram, onProgramSelect }: ProgramListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h4 className="text-xl font-bold text-gray-900 mb-4">Danh sách khóa học</h4>
      <div className="space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-auto custom-scrollbar">
        {programs.map((program) => (
          <div
            key={program.id}
            onClick={() => onProgramSelect(program)}
            className={`w-full rounded-lg transition-all cursor-pointer ${
              selectedProgram?.id === program.id
                ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex gap-2 p-2">
              {/* Ảnh 30% bên trái */}
              <div className="w-[30%] flex-shrink-0">
                <div className="relative w-full pb-[75%] rounded-lg overflow-hidden">
                  {program.image ? (
                    <img
                      src={program.image}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{program.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nội dung 70% bên phải */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  {/* Title 1 dòng */}
                  <h5 className="font-semibold text-gray-900 mb-0.5 line-clamp-1">
                    {program.title}
                  </h5>
                  {/* Mô tả 2 dòng */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                    {program.description || program.category || 'Khóa học chất lượng cao'}
                  </p>
                </div>

                {/* Button xem chi tiết dưới cùng bên trái */}
                <div>
                  <Link
                    href={`/khoa-hoc/${program.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex text-right items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Section Component
export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoading(true);
      try {
        // Gọi API lấy khóa học tin học với categoryCode = IT
        const data = await api.getCoursesByCategory('IT', 0, 50);
        setPrograms(data);
        if (data && data.length > 0) {
          setSelectedProgram(data[0] || null);
        }
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!selectedProgram || programs.length === 0) {
    return null;
  }

  return (
    <motion.section 
      className={STYLES.section} 
      id="programs"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={STYLES.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionHeader 
            title={SECTION_CONFIG.title}
            subtitle={SECTION_CONFIG.subtitle}
          />
        </motion.div>

        <motion.div 
          className={STYLES.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                duration: 0.6
              }
            }
          }}
        >
          <motion.div
            className="lg:col-span-8 xl:col-span-7"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProgramDetail program={selectedProgram} />
          </motion.div>
          <motion.div
            className="lg:col-span-4 xl:col-span-5"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProgramList 
              programs={programs}
              selectedProgram={selectedProgram}
              onProgramSelect={handleProgramSelect}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `
      }} />
    </motion.section>
  );
}
