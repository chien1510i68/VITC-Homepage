"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { ProgramCardProps } from './types';
import { ANIMATION_CONFIG } from './constants';

export default function ProgramCard({ program, isSelected, onSelect }: ProgramCardProps) {
  const handleClick = () => {
    onSelect(program);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`w-full p-4 border-b border-gray-100 text-left cursor-pointer ${
        isSelected ? `${TAILWIND_COLORS.bgPrimaryLightest} border-l-4 ${TAILWIND_COLORS.borderPrimary}` : ''
      }`}
      whileHover={{ 
        backgroundColor: isSelected ? undefined : "rgb(249 250 251)",
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex gap-3">
        <motion.div 
          className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
              {program.title}
            </h4>
            {program.isHot && (
              <span className="text-xs font-semibold text-orange-500">HOT</span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-gray-700">{program.rating}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {program.students}
            </span>
            <span>•</span>
            <span>{program.duration}</span>
          </div>
          <div className={`mt-2 font-bold ${TAILWIND_COLORS.textPrimary} text-sm`}>
            {program.price}
          </div>
        </div>
      </div>
    </motion.button>
  );
}