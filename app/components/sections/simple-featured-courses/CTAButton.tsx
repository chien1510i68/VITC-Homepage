'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
}

/**
 * CTAButton Component
 * 
 * Responsibility: Display the main call-to-action button for viewing all courses.
 * Handles button animation and responsive text display.
 */
export const CTAButton: React.FC<CTAButtonProps> = ({ onClick, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={className}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center group cursor-pointer"
      >
        <span>Xem tất cả khóa học</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </motion.div>
  );
};
