'use client';

import React from 'react';
import { InstructorCardProps } from './types';
import { DEFAULT_PROPS, SIZE_STYLES } from './constants';
import { ImageWithFallback } from '../ImageWithFallback';

/**
 * InstructorCard Component
 * 
 * Displays instructor information in a card with avatar, name, and specialty
 * 
 * @example
 * ```tsx
 * <InstructorCard
 *   instructor={{
 *     id: '1',
 *     name: 'Nguyễn Văn A',
 *     image: '/instructors/nva.jpg',
 *     specialty: 'Chuyên gia lập trình',
 *     degree: 'Thạc sĩ CNTT',
 *   }}
 *   onClick={() => console.log('Clicked')}
 * />
 * ```
 */
export function InstructorCard({ 
  instructor,
  onClick,
  delay = DEFAULT_PROPS.delay,
  size = DEFAULT_PROPS.size,
  showDegree = DEFAULT_PROPS.showDegree,
  className = DEFAULT_PROPS.className,
}: InstructorCardProps) {
  const styles = SIZE_STYLES[size];
  const isClickable = !!onClick;

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `${instructor.name} - ${instructor.specialty}` : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      className={`
        group bg-white rounded-3xl shadow-md hover:shadow-2xl 
        transition-transform motion-reduce:transition-none duration-300 
        hover:-translate-y-1 
        ${isClickable ? 'focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 cursor-pointer' : ''}
        overflow-hidden border border-slate-100 h-full
        ${className}
      `}
    >
      {/* Circular Avatar */}
      <div className="flex justify-center mt-6">
        <div className={`
          ${styles.avatar} rounded-full overflow-hidden 
          ring-2 ring-slate-100 group-hover:ring-sky-600 
          transition-all motion-reduce:transition-none duration-300
        `}>
          <ImageWithFallback
            src={instructor.image}
            alt={instructor.name}
            width={parseInt(styles.avatar.split('w-')[1] || '32') * 4}
            height={parseInt(styles.avatar.split('h-')[1] || '32') * 4}
            className="object-cover w-full h-full"
            sizes={`${parseInt(styles.avatar.split('w-')[1] || '32') * 4}px`}
            fallbackSrc="https://placehold.co/400x400/8b5cf6/ffffff?text=Giảng+viên"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`${styles.padding} text-center space-y-1`}>
        <h4 className={`font-semibold text-slate-900 ${styles.nameSize} leading-tight`}>
          {instructor.name}
        </h4>
        
        {showDegree && instructor.degree && (
          <div className={`${styles.degreeSize} text-slate-500`}>
            {instructor.degree}
          </div>
        )}
        
        <p className={`${styles.specialtySize} text-slate-600 leading-snug line-clamp-2 mt-1`}>
          {instructor.specialty}
        </p>
      </div>
    </div>
  );
}
