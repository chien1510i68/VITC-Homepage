"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, CheckCircle } from 'lucide-react';
import ConsultationPopup from '@/app/components/ui/ConsultationPopup';
import { TAILWIND_COLORS } from '@/lib/colors';
import { ProgramDetailProps } from './types';
import { ANIMATION_CONFIG } from './constants';

export default function ProgramDetail({ program }: ProgramDetailProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleRegisterClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <motion.div
        key={program.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border-0 shadow-lg h-full min-h-[700px] flex flex-col">
          {/* Featured Image */}
          <motion.div 
            className={`relative h-64 md:h-80 bg-gradient-to-br ${TAILWIND_COLORS.gradientPrimary} overflow-hidden flex-shrink-0`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={program.image}
              alt={program.title}
              fill
            className={`object-cover opacity-90 ${ANIMATION_CONFIG.cardHover}`}
          />
          {program.isHot && (
            <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              Nổi bật
            </div>
          )}
          <div className={`absolute top-4 right-4 ${TAILWIND_COLORS.bgPrimary} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {program.category}
          </div>
        </motion.div>

        <CardContent className="p-6 md:p-8 flex-grow flex flex-col">
          {/* Title and Rating */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-3 py-1 rounded-full text-xs font-semibold`}>
                {program.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-900">{program.rating}</span>
                <span className="text-sm text-gray-500">({program.students})</span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {program.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Nội dung chính</h4>
            <div className="space-y-3">
              {program.highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 ${TAILWIND_COLORS.textPrimary} flex-shrink-0 mt-0.5`} />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor and Price */}
          <div className="flex items-center justify-between py-6 border-t border-gray-200">
            <div>
              <div className="text-sm text-gray-500 mb-1">Giảng viên</div>
              <div className="font-semibold text-gray-900 text-lg">
                {typeof program.instructor === 'string' 
                  ? program.instructor 
                  : program.instructor.name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Học phí</div>
              <div className={`text-2xl font-bold ${TAILWIND_COLORS.textPrimary}`}>{program.price}</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleRegisterClick}
              className={`flex-1 ${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-white py-6 text-base font-semibold cursor-pointer`}
            >
              Đăng ký ngay →
            </Button>
            <Link href={`/khoa-hoc/${program.id}`} className="flex-shrink-0">
              <Button 
                variant="outline" 
                className="px-6 py-6 text-base font-semibold border-2 cursor-pointer w-full"
              >
                Chi tiết
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      </motion.div>

      <ConsultationPopup 
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
}