import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { CourseCardData } from '@/data/courses';
import { getBadgeStyles } from './utils';

interface CompactCourseCardProps {
  course: CourseCardData;
  index: number;
}

export function CompactCourseCard({ course, index }: CompactCourseCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative cursor-pointer flex-shrink-0 w-72"
    >
      {/* Card */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        
        {/* Compact Image & Badge */}
        <div className="relative h-32 overflow-hidden bg-green-50">
          {!imageError ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
              <div className="text-green-600">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Badge */}
          {course.badge && (
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${getBadgeStyles(course.badge.type)}`}>
              {course.badge.text}
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-green-600">
            {course.price === 'Miễn phí' ? 'Miễn phí' : course.price}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Category */}
          <div className="text-xs text-green-600 font-medium mb-1 bg-green-50 inline-block px-2 py-0.5 rounded">
            {course.category}
          </div>
          
          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {course.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {course.studentCount}
              </div>
            </div>
          </div>

          {/* Rating & CTA */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {course.category}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              Xem chi tiết
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}