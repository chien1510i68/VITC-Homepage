/**
 * LookupHelpSection - Help contact information component
 */

"use client";

import { motion } from 'framer-motion';
import { TAILWIND_COLORS } from '@/lib/colors';

interface LookupHelpSectionProps {
  contactPhone: string;
  contactEmail: string;
}

export const LookupHelpSection = ({ contactPhone, contactEmail }: LookupHelpSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-6 sm:mt-8 text-center px-4"
    >
      <p className="text-xs sm:text-sm text-gray-600">
        Bạn cần hỗ trợ? Liên hệ hotline:{' '}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href={`tel:${contactPhone}`}
          className={`font-semibold ${TAILWIND_COLORS.textPrimary} hover:underline transition-colors duration-200 whitespace-nowrap`}
        >
          {contactPhone}
        </motion.a>
        {' '}hoặc email:{' '}
        <motion.a
          whileHover={{ scale: 1.05 }}
          href={`mailto:${contactEmail}`}
          className={`font-semibold ${TAILWIND_COLORS.textPrimary} hover:underline transition-colors duration-200 break-all sm:break-normal`}
        >
          {contactEmail}
        </motion.a>
      </p>
    </motion.div>
  );
};