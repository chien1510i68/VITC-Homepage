/**
 * LookupResults - Results table component for displaying search results
 */

"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TAILWIND_COLORS } from '@/lib/colors';
import { LookupResult } from '@/lib/api';
import { LookupType, CertificateType } from '../types';

interface LookupResultsProps {
  results: LookupResult[];
  hasSearched: boolean;
  lookupType: LookupType;
  certificateType?: CertificateType;
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export const LookupResults = ({ 
  results, 
  hasSearched, 
  lookupType, 
  certificateType,
  totalItems = 0,
  currentPage = 0,
  pageSize = 30,
  onPageChange
}: LookupResultsProps) => {
  // Don't render anything if user hasn't performed a search yet
  if (!hasSearched) {
    return null;
  }

  // Check if current certificate type is "Chuẩn đầu ra KNM"
  const isKNMType = certificateType === 'Chuẩn đầu ra KNM' || 
                   (results.length > 0 && results.some(r => r.certificateType === 'Chuẩn đầu ra KNM'));

  const totalPages = Math.ceil(totalItems / pageSize);
  const showPagination = totalPages > 1;

  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden"
        key={`results-${lookupType}-${hasSearched}-${currentPage}`} // Force re-render on page change
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`${TAILWIND_COLORS.bgPrimary} px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center`}
        >
          <h3 className="text-white font-semibold text-base sm:text-lg">
            Kết quả tra cứu {totalItems > 0 ? `(Tổng ${totalItems} kết quả)` : `(${results.length} kết quả)`}
          </h3>
          {totalItems > 0 && (
            <span className="text-white/80 text-xs sm:text-sm">
              Trang {currentPage + 1} / {totalPages}
            </span>
          )}
        </motion.div>

        {results.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="overflow-x-auto -mx-4 sm:mx-0"
            >
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">#</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Họ tên</th>
                    {lookupType === 'score' ? (
                      <>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">CMND/MSV</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Ngày sinh</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Nơi sinh</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">Điểm LT</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">Điểm TH</th>

                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">Kết quả</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Ngày thi</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Kỳ thi</th>
                      </>
                    ) : (
                      <>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Ngày sinh</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Nơi sinh</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Số vào sổ</th>
                        {!isKNMType && (
                          <>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">Xếp loại LT</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">Xếp loại TH</th>
                          </>
                        )}
                        {isKNMType && (
                          <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-700">Xếp loại</th>
                        )}
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Ngày cấp</th>
                        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-700">Loại CC</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <motion.tr
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ backgroundColor: '#f9fafb', transition: { duration: 0.2 } }}
                      className="transition-colors"
                    >
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-gray-700">
                        {lookupType === 'certificate' ? (currentPage * pageSize) + index + 1 : index + 1}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 font-medium">{result.studentName}</td>
                      {lookupType === 'score' ? (
                        <>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{result.cccd}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{result.birthDate || '-'}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{result.birthPlace}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">{result.theoryScore}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">{result.practiceScore}</td>

                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.4, delay: 0.6 }}
                              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-semibold whitespace-nowrap ${result.result === 'Đạt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                            >
                              {result.result}
                            </motion.span>
                          </td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{result.examDate || '-'}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{result.issueDate || '-'}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{result.birthDate || '-'}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{result.birthPlace}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 font-medium">{result.entryNumber}</td>
                          {!isKNMType && (
                            <>
                              <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">{result.theoryScore}</td>
                              <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-900">{result.practiceScore}</td>
                            </>
                          )}
                          {isKNMType && (
                            <td className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm">
                              <motion.span
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-semibold whitespace-nowrap bg-blue-100 text-blue-700"
                              >
                                {result.xepLoai || '-'}
                              </motion.span>
                            </td>
                          )}
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{result.issueDate || '-'}</td>
                          <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700">{result.certificateType}</td>
                        </>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Pagination UI */}
            {showPagination && (
              <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                  Hiển thị <span className="font-semibold">{currentPage * pageSize + 1}</span> - <span className="font-semibold">{Math.min((currentPage + 1) * pageSize, totalItems)}</span> trong tổng số <span className="font-semibold">{totalItems}</span> kết quả
                </div>
                <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="p-1 sm:px-2 sm:py-1 h-8 w-8 sm:w-auto"
                  >
                    <ChevronLeft className="w-4 h-4 mr-0 sm:mr-1" />
                    <span className="hidden sm:inline">Trước</span>
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      // Only show current page, first, last, and neighbors
                      if (
                        i === 0 || 
                        i === totalPages - 1 || 
                        (i >= currentPage - 1 && i <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={i}
                            variant={currentPage === i ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange?.(i)}
                            className={`h-8 w-8 text-xs p-0 ${currentPage === i ? TAILWIND_COLORS.bgPrimary : ''}`}
                          >
                            {i + 1}
                          </Button>
                        );
                      } else if (
                        (i === 1 && currentPage > 2) || 
                        (i === totalPages - 2 && currentPage < totalPages - 3)
                      ) {
                        return <span key={i} className="text-gray-400 px-1 text-xs">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="p-1 sm:px-2 sm:py-1 h-8 w-8 sm:w-auto"
                  >
                    <span className="hidden sm:inline">Sau</span>
                    <ChevronRight className="w-4 h-4 ml-0 sm:ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-8 sm:p-12 text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-gray-400 mb-4"
            >
              <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </motion.div>
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="text-base sm:text-lg font-semibold text-gray-900 mb-2"
            >
              Không tìm thấy kết quả
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-sm sm:text-base text-gray-600"
            >
              Vui lòng kiểm tra lại thông tin tra cứu và thử lại
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};