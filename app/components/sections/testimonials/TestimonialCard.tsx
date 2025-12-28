import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from './data';
import { StarRating } from './StarRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isActive: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  index, 
  isActive 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7,
        x: 0,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl border border-gray-100 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300">
        {/* Quote Icon */}
        <div className="absolute -top-3 sm:-top-4 left-4 sm:left-6 lg:left-8">
          <div className="bg-green-600 text-white p-2 sm:p-3 rounded-full">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
        </div>

        {/* Quote Text */}
        <div className="mb-4 sm:mb-6 pt-3 sm:pt-4">
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic line-clamp-4 sm:line-clamp-none">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Rating */}
        <div className="mb-4 sm:mb-6">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Author Info */}
        <div className="flex items-center">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 sm:border-4 border-green-100 flex-shrink-0">
            {!imageError ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm sm:text-base lg:text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3 sm:ml-4 min-w-0 flex-1">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{testimonial.name}</h4>
            <p className="text-green-600 font-medium text-xs sm:text-sm lg:text-base truncate">{testimonial.course}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};