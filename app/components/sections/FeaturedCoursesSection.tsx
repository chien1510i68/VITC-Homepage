'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Course, CourseCardData } from '@/data/courses';
import CourseService from '@/lib/services/CourseService';

// Component imports
import { CompactCourseCard } from './featured-courses/CompactCourseCard';
import { FullCourseCard } from './featured-courses/FullCourseCard';
import { CourseCarouselControls } from './featured-courses/CourseCarouselControls';
import { useCourseCarousel } from './featured-courses/useCourseCarousel';

// Transform Course to CourseCardData
const transformCourseToCardData = (course: Course): CourseCardData => ({
  id: course.id,
  title: course.title,
  thumbnail: course.thumbnailUrl || '/images/courses/default.jpg',
  badge: {
    text: 'Khóa học',
    type: 'new' as const
  },
  duration: `${course.duration || 40} giờ`,
  price: course.price > 0 ? `${course.price.toLocaleString('vi-VN')}đ` : 'Miễn phí',
  studentCount: Math.floor(Math.random() * 500) + 100,
  description: course.descriptionHtml || 'Khóa học chất lượng cao tại VITC',
  category: course.subject || 'Tin học'
});

export default function FeaturedCoursesSection() {
  const {
    activeView,
    setActiveView,
    canScrollLeft,
    canScrollRight,
    updateScrollButtons,
    scrollLeft,
    scrollRight
  } = useCourseCarousel();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [featuredCourses, setFeaturedCourses] = useState<CourseCardData[]>([]);
  const [_isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const courses = await CourseService.getFeaturedCourses();
        const transformedCourses = courses.map(transformCourseToCardData);
        setFeaturedCourses(transformedCourses);
      } catch (error) {
        console.error('Error loading featured courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => updateScrollButtons(container);
      
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => container.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [updateScrollButtons, activeView]);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Khóa Học Nổi Bật
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Các khóa học được đánh giá cao nhất với chương trình cập nhật và thực tế
          </p>

          {/* View Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex bg-white rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setActiveView('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'all'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Tất cả khóa học
              </button>
              <button
                onClick={() => setActiveView('compact')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeView === 'compact'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Xem nhanh
              </button>
            </div>

            {/* Carousel Controls */}
            {activeView === 'compact' && (
              <CourseCarouselControls
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
                onScrollLeft={() => scrollLeft(scrollContainerRef)}
                onScrollRight={() => scrollRight(scrollContainerRef)}
              />
            )}
          </div>
        </motion.div>

        {/* Courses Display */}
        {activeView === 'all' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <FullCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCourses.map((course, index) => (
              <CompactCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white group"
          >
            Xem tất cả khóa học
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}