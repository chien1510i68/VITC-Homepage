"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api, Program } from '@/lib/api';
import { STYLES, SECTION_CONFIG } from './constants';
import SectionHeader from './SectionHeader';
import ProgramDetail from './ProgramDetail';
import ProgramList from './ProgramList';
import LoadingState from './LoadingState';

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      setIsLoading(true);
      try {
        const data = await api.getPrograms();
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
      <style jsx>{`
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
      `}</style>
    </motion.section>
  );
}