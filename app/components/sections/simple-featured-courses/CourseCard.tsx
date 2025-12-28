'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from './data';

interface CourseCardProps {
  course: Course;
  index: number;
}

/**
 * CourseCard Component
 * 
 * Responsibility: Display individual course information with hover effects and animations.
 * Handles course image display, pricing, and call-to-action button.
 */
export const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/khoa-hoc/${course.id}`}>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        className="group relative cursor-pointer flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-80"
      >
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
          {/* Image */}
          <div className="relative h-28 sm:h-32 md:h-36 lg:h-32 overflow-hidden bg-gray-50">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
            
            {/* Price Badge */}
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-semibold">
              {course.price}
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors text-sm sm:text-base">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
              {course.description}
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center group/btn"
            >
              <span className="hidden sm:inline">Xem chi tiết</span>
              <span className="sm:hidden">Chi tiết</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
