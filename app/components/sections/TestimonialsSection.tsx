'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from './testimonials/data';
import { TestimonialCard } from './testimonials/TestimonialCard';
import { CarouselNavigation } from './testimonials/CarouselNavigation';
import { useTestimonialCarousel } from './testimonials/useTestimonialCarousel';

const TestimonialsSection: React.FC = () => {
  const {
    currentIndex,
    goToTestimonial,
    nextTestimonial,
    previousTestimonial
  } = useTestimonialCarousel(testimonials.length);

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Học Viên Nói Gì Về VISC
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Những chia sẻ chân thực từ các học viên đã hoàn thành khóa học tại VISC
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-3 lg:px-4">
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <CarouselNavigation
            currentIndex={currentIndex}
            totalItems={testimonials.length}
            onNext={nextTestimonial}
            onPrevious={previousTestimonial}
            onGoTo={goToTestimonial}
          />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-14 lg:mt-16"
        >
          <div className="text-center p-4 sm:p-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">50,000+</div>
            <div className="text-sm sm:text-base text-gray-600">Học viên đã tin tưởng</div>
          </div>
          <div className="text-center p-4 sm:p-0 border-t sm:border-t-0 border-gray-200">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2 pt-4 sm:pt-0">4.8/5</div>
            <div className="text-sm sm:text-base text-gray-600">Đánh giá tích cực</div>
          </div>
          <div className="text-center p-4 sm:p-0 border-t sm:border-t-0 border-gray-200">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2 pt-4 sm:pt-0">95%</div>
            <div className="text-sm sm:text-base text-gray-600">Học viên hoàn thành khóa học</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;