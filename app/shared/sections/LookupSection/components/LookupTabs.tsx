/**
 * LookupTabs - Tab navigation component for lookup types
 */

"use client";

import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { LookupType } from '../types';

interface LookupTabsProps {
  lookupType: LookupType;
  setLookupType: (type: LookupType) => void;
  showScoreTab: boolean;
  showCertificateTab: boolean;
}

export const LookupTabs = ({ 
  lookupType, 
  setLookupType, 
  showScoreTab, 
  showCertificateTab 
}: LookupTabsProps) => {
  const tabs = [
    {
      id: 'score' as LookupType,
      label: 'Tra cứu điểm thi',
      icon: Award,
      show: showScoreTab
    },
    {
      id: 'certificate' as LookupType,
      label: 'Tra cứu chứng chỉ',
      icon: Download,
      show: showCertificateTab
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4"
    >
      {tabs.map((tab, index) => {
        if (!tab.show) return null;
        
        const Icon = tab.icon;
        const isActive = lookupType === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLookupType(tab.id)}
            className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
              isActive
                ? `${TAILWIND_COLORS.bgPrimary} text-white shadow-lg`
                : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">{tab.label}</span>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};