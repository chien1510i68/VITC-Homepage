/**
 * LookupHeader - Header component for lookup section
 */

"use client";

import { motion } from 'framer-motion';
import { TAILWIND_COLORS } from '@/lib/colors';

interface LookupHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
}

export const LookupHeader = ({ title, subtitle, badge }: LookupHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`inline-block ${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4`}
      >
        {badge}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4"
      >
        {title}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};