'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CourseCard } from './CourseCard';
import { NavigationButtons } from './NavigationButtons';
import { Course } from './data';

interface CourseRowProps {
  title: string;
  courses: Course[];
  direction?: 'left' | 'right';
}

/**
 * CourseRow Component
 * 
 * Responsibility: Manage a row of courses with manual scroll navigation
 * - Desktop & Mobile/Tablet: Manual scroll with navigation buttons
 */
export const CourseRow: React.FC<CourseRowProps> = ({ title, courses, direction = 'left' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check if desktop (lg breakpoint = 1024px)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);
  
  // Check scroll position to enable/disable buttons
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };
  
  // Manual scroll functions
  const handleScrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = isDesktop ? 320 + 24 : 288; // lg:w-80 + gap or w-72
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };
  
  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = isDesktop ? 320 + 24 : 288; // lg:w-80 + gap or w-72
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };
  
  // Scroll tracking for all devices
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => checkScrollPosition();
    container.addEventListener('scroll', handleScroll);
    checkScrollPosition(); // Initial check
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mb-8 md:mb-12">
      {/* Section Title with Navigation */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-2 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="w-20 h-1 bg-green-600 rounded-full"></div>
        </motion.div>
        
        <NavigationButtons
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScrollLeft={handleScrollLeft}
          onScrollRight={handleScrollRight}
          isVisible={true} // Show on all devices
        />
      </div>

      {/* Scrolling Courses Container */}
      <div className="relative overflow-hidden">
        {/* Manual scroll for all devices */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-3 sm:space-x-4 lg:space-x-6 px-2 sm:px-0 overflow-x-auto scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};