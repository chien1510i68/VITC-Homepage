'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
}

/**
 * SectionHeader Component
 * 
 * Responsibility: Display the section title and description with animation.
 * Handles the main heading and subtitle for the featured courses section.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 md:mb-12"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
        {description}
      </p>
    </motion.div>
  );
};
