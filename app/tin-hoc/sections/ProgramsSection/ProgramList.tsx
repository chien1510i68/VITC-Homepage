"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { ProgramListProps } from './types';
import { SECTION_CONFIG } from './constants';
import ProgramCard from './ProgramCard';

export default function ProgramList({ programs, selectedProgram, onProgramSelect }: ProgramListProps) {
  return (
    <div>
      <motion.div 
        className="sticky top-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm h-[700px] flex flex-col">
          {/* List Header */}
          <motion.div 
            className={`p-4 border-b border-gray-200 bg-gradient-to-r ${TAILWIND_COLORS.gradientLight} flex-shrink-0`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="font-bold text-gray-900 text-lg">Danh sách khóa học</h3>
            <p className="text-sm text-gray-600 mt-1">{programs.length} khóa học</p>
          </motion.div>
          
          {/* Scrollable Programs List */}
          <motion.div 
            className="overflow-y-auto custom-scrollbar flex-grow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProgramCard
                  program={program}
                  isSelected={selectedProgram?.id === program.id}
                  onSelect={onProgramSelect}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* View All CTA */}
          <motion.div 
            className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Button 
              variant="link" 
              className={`w-full ${TAILWIND_COLORS.textPrimary} font-semibold cursor-pointer`} 
              asChild
            >
              <a href={SECTION_CONFIG.ctaLink}>
                {SECTION_CONFIG.ctaText}
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}