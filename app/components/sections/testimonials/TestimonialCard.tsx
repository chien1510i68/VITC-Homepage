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
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 shadow-md sm:shadow-lg border border-gray-100 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300">
        {/* Quote Icon */}
        <div className="absolute -top-2.5 sm:-top-3.5 left-3 sm:left-5 lg:left-6">
          <div className="bg-green-600 text-white p-1.5 sm:p-2.5 rounded-full">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
          </div>
        </div>

        {/* Quote Text */}
        <div className="mb-3 sm:mb-4 pt-2 sm:pt-3">
          <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed italic line-clamp-4 sm:line-clamp-none">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Rating */}
        <div className="mb-3 sm:mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Author Info */}
        <div className="flex items-center">
          <div className="relative w-8 h-8 sm:w-10 h-10 lg:w-12 h-12 rounded-full overflow-hidden border border-green-100 flex-shrink-0">
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
                <span className="text-green-600 font-bold text-xs sm:text-sm lg:text-base">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-2 sm:ml-3 min-w-0 flex-1">
            <h4 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base truncate">{testimonial.name}</h4>
            <p className="text-green-600 font-medium text-[10px] sm:text-xs lg:text-sm truncate">{testimonial.course}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};