'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  isVisible?: boolean;
}

/**
 * NavigationButtons Component
 * 
 * Responsibility: Display and handle manual navigation buttons for course carousel.
 * Manages button states and click handlers for left/right navigation.
 */
export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  isVisible = true
}) => {
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex items-center space-x-2"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={`p-2 rounded-full transition-all duration-200 ${
          canScrollLeft 
            ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={`p-2 rounded-full transition-all duration-200 ${
          canScrollRight 
            ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>
    </motion.div>
  );
};
