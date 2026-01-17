/**
 * CertificateTable Component - Displays certificate search results in a table
 * @module shared/sections/CertificateLookupSection/components
 */

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CertificateResponse } from '@/lib/api';
import { TAILWIND_COLORS } from '@/lib/colors';
import { GradeBadge } from './GradeBadge';

interface CertificateTableProps {
  results: CertificateResponse[];
  cccd: string;
  onReset: () => void;
}

/**
 * CertificateTable Component
 * Responsible for displaying certificate results in table format only
 */
export function CertificateTable({ results, cccd, onReset }: CertificateTableProps) {
  if (results.length === 0) return null;

  // Debug: log the actual data
  console.log('🔍 CertificateTable results:', results);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden"
    >
      {/* Results Header */}
      <div className={`${TAILWIND_COLORS.bgPrimary} px-6 py-4 flex items-center justify-between`}>
        <h3 className="text-xl font-bold text-white">
          DANH SÁCH TRA CỨU CHỨNG CHỈ
        </h3>
        <button
          onClick={onReset}
          className="text-white hover:text-gray-200 transition-colors"
          aria-label="Đóng kết quả"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Họ tên</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Ngày sinh</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Địa chỉ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">CCCD</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Loại chứng chỉ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Số hiệu</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Vào sổ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Ngày cấp</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm LT</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Điểm TH</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={result.id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{result.username}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.dob || '-'}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap max-w-xs truncate" title={result.address}>
                  {result.address || '-'}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.identifyNumber || '-'}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.loaiChungChi || '-'}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.soHieu || '-'}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.vaoSo || '-'}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{result.ngayCap || '-'}</td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {result.diemLtThcb
                    || '-'}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {result.diemThUdnc || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Tìm thấy <strong className={TAILWIND_COLORS.textPrimary}>{results.length}</strong> kết quả cho số CCCD/CMND: <strong>{cccd}</strong>
        </p>
      </div>
    </motion.div>
  );
}
