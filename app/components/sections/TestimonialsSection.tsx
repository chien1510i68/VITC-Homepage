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
    <section className="py-1 sm:py-2 lg:py-2 xl:py-2 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            Học Viên Nói Gì Về VISC
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto px-4">
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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6 lg:mt-8"
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1">50,000+</div>
            <div className="text-xs sm:text-sm text-gray-600">Học viên tin tưởng</div>
          </div>
          <div className="text-center p-2 sm:p-0 border-t sm:border-t-0 border-gray-100">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 pt-2 sm:pt-0">4.8/5</div>
            <div className="text-xs sm:text-sm text-gray-600">Đánh giá tích cực</div>
          </div>
          <div className="text-center p-2 sm:p-0 border-t sm:border-t-0 border-gray-100">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 pt-2 sm:pt-0">95%</div>
            <div className="text-xs sm:text-sm text-gray-600">Hoàn thành khóa học</div>
          </div>
        </motion.div>

        {/* Feedback Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-6 sm:mt-8 lg:mt-10"
        >
          <a
            href="/lien-he"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Gửi ý kiến phản hồi
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;