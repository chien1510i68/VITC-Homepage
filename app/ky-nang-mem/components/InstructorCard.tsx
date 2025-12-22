import React from 'react';
import Image from 'next/image';
import type { Instructor } from '../types';

interface InstructorCardProps {
  instructor: Instructor;
  onClick?: () => void;
  delay?: number;
}

export function InstructorCard({ instructor, onClick }: InstructorCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${instructor.name} - ${instructor.specialty}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-transform motion-reduce:transition-none duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 overflow-hidden border border-slate-100 cursor-pointer h-full"
    >
      {/* Circular avatar */}
      <div className="flex justify-center mt-6">
        <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-sky-600 transition-all motion-reduce:transition-none duration-300">
          <Image
            src={instructor.image}
            alt={instructor.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
            sizes="112px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-center space-y-1">
        <h4 className="font-semibold text-slate-900 text-base leading-tight">
          {instructor.name}
        </h4>
        {instructor.degree && (
          <div className="text-xs text-slate-500">{instructor.degree}</div>
        )}
        <p className="text-sm text-slate-600 leading-snug line-clamp-2 mt-1">
          {instructor.specialty}
        </p>
      </div>
    </div>
  );
}
