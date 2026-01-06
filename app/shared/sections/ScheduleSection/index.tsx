"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { ScheduleSectionProps, Schedule } from './types';
import { DEFAULT_PROPS, COLUMN_HEADERS } from './constants';
import * as api from '@/lib/api';

/**
 * ScheduleSection Component
 * 
 * Displays a table of class schedules with filtering and CTA
 * Fetches data from API by default
 * 
 * @example
 * ```tsx
 * // Basic usage with API data
 * <ScheduleSection />
 * 
 * // Custom title
 * <ScheduleSection
 *   title="Lịch học Kỹ năng mềm"
 *   ctaLink="/ky-nang-mem"
 * />
 * ```
 */
export default function ScheduleSection({
  title = DEFAULT_PROPS.title,
  subtitle = DEFAULT_PROPS.subtitle,
  sectionId = DEFAULT_PROPS.sectionId,
  badge,
  ctaText = DEFAULT_PROPS.ctaText,
  ctaLink = DEFAULT_PROPS.ctaLink,
  showCta = DEFAULT_PROPS.showCta,
  bgClassName = DEFAULT_PROPS.bgClassName,
  columns = DEFAULT_PROPS.columns,
}: ScheduleSectionProps = {}) {
  
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setIsLoading(true);
        const result = await api.getCourseSchedules({ page: 0, size: 10 });
        
        // Convert API data to Schedule format
        const formattedSchedules: Schedule[] = result.data.map(cls => ({
          id: cls.id,
          className: cls.code || cls.className,
          time: cls.schedule || cls.time,
          startDate: cls.startDate,
          location: cls.location,
          subject: cls.courseName || cls.subject,
          status: cls.status === 'OPEN' ? 'Sắp khai giảng' : 'Đang học',
        }));
        
        setSchedules(formattedSchedules);
      } catch (error) {
        console.error('❌ Failed to load schedules:', error);
        setSchedules([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedules();
  }, []);
  
  /**
   * Format date string to Vietnamese locale
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`py-8 md:py-12 lg:py-16 ${bgClassName}`}
      id={sectionId}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-block px-4 py-2 rounded-full ${TAILWIND_COLORS.bgPrimary} text-white text-sm font-semibold mb-4`}
            >
              {badge}
            </motion.span>
          )}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 md:mb-4 leading-tight"
          >
            {title}
          </motion.h2>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600">Chưa có lịch khai giảng nào</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="-mx-3 sm:mx-0 overflow-x-auto"
          >
          <motion.table
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full min-w-[640px] border-collapse bg-white rounded-none sm:rounded-lg overflow-hidden shadow-sm"
          >
            <motion.thead
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <tr className={`${TAILWIND_COLORS.bgPrimary} text-white`}>
                {columns.className && (
                  <th className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-xs sm:text-sm">
                    {COLUMN_HEADERS.className}
                  </th>
                )}
                {columns.time && (
                  <th className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-xs sm:text-sm">
                    {COLUMN_HEADERS.time}
                  </th>
                )}
                {columns.startDate && (
                  <th className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-xs sm:text-sm">
                    {COLUMN_HEADERS.startDate}
                  </th>
                )}
                {columns.location && (
                  <th className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-xs sm:text-sm">
                    {COLUMN_HEADERS.location}
                  </th>
                )}
                {columns.subject && (
                  <th className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-xs sm:text-sm">
                    {COLUMN_HEADERS.subject}
                  </th>
                )}
              </tr>
            </motion.thead>
            
            <tbody className="divide-y divide-gray-200">
              {schedules.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <td 
                    colSpan={Object.values(columns).filter(Boolean).length} 
                    className="px-2 sm:px-4 md:px-6 py-8 md:py-12 text-center text-gray-500 text-sm md:text-base"
                  >
                    Chưa có lịch khai giảng
                  </td>
                </motion.tr>
              ) : (
                schedules.map((schedule, index) => (
                  <motion.tr
                    key={schedule.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                    whileHover={{ 
                      backgroundColor: '#f9fafb',
                      transition: { duration: 0.2 }
                    }}
                    className="transition-colors cursor-pointer"
                  >
                    {columns.className && (
                      <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 font-semibold text-gray-900 text-xs sm:text-sm">
                        {schedule.className}
                      </td>
                    )}
                    {columns.time && (
                      <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs sm:text-sm">
                        {schedule.time}
                      </td>
                    )}
                    {columns.startDate && (
                      <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs sm:text-sm">
                        {formatDate(schedule.startDate)}
                      </td>
                    )}
                    {columns.location && (
                      <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs sm:text-sm">
                        {schedule.location}
                      </td>
                    )}
                    {columns.subject && (
                      <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-gray-900 text-xs sm:text-sm">
                        {schedule.subject}
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </motion.table>
          </motion.div>
        )}

        {/* CTA Button */}
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-6 md:mt-8 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="lg"
                className={`border-2 ${TAILWIND_COLORS.borderPrimary} ${TAILWIND_COLORS.textPrimary} hover:bg-green-50 font-semibold transition-all duration-300 w-full sm:w-auto text-sm md:text-base`}
                asChild
              >
                <a href={ctaLink}>
                  {ctaText}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
