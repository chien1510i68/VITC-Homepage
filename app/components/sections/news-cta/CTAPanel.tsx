'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ConsultationForm } from './ConsultationForm';
import { HotlineBox } from './HotlineBox';

type CTAMode = 'consultation' | 'hotline';

interface CTAPanelProps {
  defaultMode?: CTAMode;
}

export const CTAPanel: React.FC<CTAPanelProps> = ({ defaultMode = 'consultation' }) => {
  const [activeMode, setActiveMode] = useState<CTAMode>(defaultMode);

  const handleModeChange = (mode: CTAMode) => {
    setActiveMode(mode);
  };

  return (
    <div className="lg:col-span-2 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg sticky top-8"
      >
        {/* Toggle Buttons */}
        <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => handleModeChange('consultation')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeMode === 'consultation'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-slate-800'
            }`}
          >
            Đăng ký tư vấn
          </button>
          <button
            onClick={() => handleModeChange('hotline')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeMode === 'hotline'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-slate-800'
            }`}
          >
            Hotline 24/7
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[350px]">
          {activeMode === 'consultation' ? (
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Nhận tư vấn miễn phí
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                Để lại thông tin để được tư vấn khóa học phù hợp nhất
              </p>
              <ConsultationForm />
            </div>
          ) : (
            <HotlineBox />
          )}
        </div>
      </motion.div>
    </div>
  );
};
