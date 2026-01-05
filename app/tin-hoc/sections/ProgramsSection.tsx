"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
      <div className="relative h-64 md:h-80 overflow-hidden group">
        {program.image ? (
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">{program.name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {program.name}
        </h3>
        
        {program.description && (
          <p className="text-gray-600 leading-relaxed mb-6">
            {program.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-4">
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
        </div>
      </div>
    </div>
  );
}

// Program List Component
function ProgramList({ programs, selectedProgram, onProgramSelect }: ProgramListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
      <h4 className="text-xl font-bold text-gray-900 mb-4">Danh sách khóa học</h4>
      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {programs.map((program) => (
          <button
            key={program.id}
            onClick={() => onProgramSelect(program)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              selectedProgram?.id === program.id
                ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            <h5 className="font-semibold text-gray-900 mb-1">{program.name}</h5>
            {program.category && (
              <p className="text-sm text-gray-600">{program.category}</p>
            )}
          </button>
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
        const data = await api.getCourses();
        setPrograms(data);
        if (data.length > 0) {
          setSelectedProgram(data[0]);
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
