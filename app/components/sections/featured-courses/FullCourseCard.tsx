import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CourseCardData } from '@/data/courses';
import { getBadgeStyles } from './utils';

interface FullCourseCardProps {
  course: CourseCardData;
  index: number;
}

export function FullCourseCard({ course, index }: FullCourseCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative cursor-pointer"
    >
      {/* Card */}
      <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
        
        {/* Image & Badge */}
        <div className="relative h-48 overflow-hidden bg-green-50">
          {!imageError ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
              <div className="text-green-600">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Badge */}
          {course.badge && (
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold ${getBadgeStyles(course.badge.type)}`}>
              {course.badge.text}
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl font-bold text-green-600">
            {course.price === 'Miễn phí' ? 'Miễn phí' : course.price}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="text-sm text-green-600 font-semibold mb-2 bg-green-50 inline-block px-3 py-1 rounded-lg">
            {course.category}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {course.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1.5" />
                {course.studentCount}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {course.category}
            </div>
            
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white group/btn"
              size="sm"
            >
              Xem chi tiết
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}