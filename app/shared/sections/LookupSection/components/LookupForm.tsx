/**
 * LookupForm - Form component for search inputs and filters
 */

"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { LookupType } from '../types';
import { HELP_TEXT } from '../constants';

interface LookupFormProps {
  lookupType: LookupType;
  cccd: string;
  setCccd: (value: string) => void;
  isLoading: boolean;
  onSearch: () => void;
  onReset: () => void;
}

export const LookupForm = ({
  lookupType,
  cccd,
  setCccd,
  isLoading,
  onSearch,
  onReset
}: LookupFormProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* CCCD Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4"
        >
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            CCCD/CMND/MSV <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập số CCCD/CMND/MSV"
              className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
              required
            />
            <div className="flex gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  onClick={onSearch}
                  className={`${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-white font-semibold px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base h-auto transition-all duration-300 w-full sm:w-auto`}
                  disabled={isLoading || !cccd.trim()}
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
                  <span className="hidden sm:inline">{isLoading ? 'Đang tìm...' : 'Tra cứu'}</span>
                  <span className="sm:hidden">{isLoading ? 'Tìm' : 'Tìm'}</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base h-auto border-gray-300 hover:border-gray-400 transition-all duration-300 w-full sm:w-auto"
                  disabled={isLoading}
                >
                  Đặt lại
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4"
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </motion.svg>
            <p className="text-xs sm:text-sm text-gray-700">
              <strong className="text-blue-800">Hướng dẫn:</strong> {HELP_TEXT[lookupType]}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};