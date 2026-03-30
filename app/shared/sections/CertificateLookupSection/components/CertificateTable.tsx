import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CertificateResponse } from '@/lib/api';
import { TAILWIND_COLORS } from '@/lib/colors';
import { Button } from '@/components/ui/button';

interface CertificateTableProps {
  results: CertificateResponse[];
  cccd: string;
  onReset: () => void;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

/**
 * CertificateTable Component
 * Responsible for displaying certificate results in table format only
 */
export function CertificateTable({ 
  results, 
  cccd, 
  onReset,
  page = 0,
  pageSize = 30,
  total = 0,
  onPageChange
}: CertificateTableProps) {
  if (results.length === 0) return null;

  const totalPages = Math.ceil(total / pageSize);

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
          DANH SÁCH TRA CỨU CHỨNG CHỈ {total > 0 && `(Tổng ${total} kết quả)`}
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
                <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{ (page * pageSize) + index + 1}</td>
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
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          Hiển thị <span className="font-semibold">{ (page * pageSize) + 1 }</span> - <span className="font-semibold">{ Math.min((page + 1) * pageSize, total) }</span> trong tổng số <strong className={TAILWIND_COLORS.textPrimary}>{total}</strong> kết quả cho số CCCD/CMND: <strong>{cccd}</strong>
        </p>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Trước
            </Button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                if (i === 0 || i === totalPages - 1 || (i >= page - 1 && i <= page + 1)) {
                  return (
                    <Button
                      key={i}
                      variant={page === i ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onPageChange?.(i)}
                      className={`h-8 w-8 p-0 ${page === i ? TAILWIND_COLORS.bgPrimary : ''}`}
                    >
                      {i + 1}
                    </Button>
                  );
                } else if ((i === 1 && page > 2) || (i === totalPages - 2 && page < totalPages - 3)) {
                  return <span key={i} className="text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page === totalPages - 1}
            >
              Sau
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
