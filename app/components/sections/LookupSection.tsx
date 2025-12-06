"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Download, Award, Calendar } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';
import { api, LookupResult } from '@/lib/api';

export default function LookupSection() {
  const [lookupType, setLookupType] = useState<'score' | 'certificate'>('score');
  const [cccd, setCccd] = useState('');
  const [certificateType, setCertificateType] = useState('all');
  const [results, setResults] = useState<LookupResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!cccd.trim()) return;
    
    setIsLoading(true);
    setHasSearched(false);
    
    try {
      let data: LookupResult[];
      if (lookupType === 'score') {
        data = await api.lookupExamResults(cccd);
      } else {
        data = await api.lookupCertificate(cccd);
      }
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCccd('');
    setCertificateType('all');
    setResults([]);
    setHasSearched(false);
  };

  const handleDownloadCertificate = (certificateId: string) => {
    // Handle certificate download
    alert(`Tải chứng chỉ ${certificateId}`);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50" id="tra-cuu">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            Tra cứu thông tin
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Tra cứu điểm thi & Chứng chỉ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tra cứu kết quả thi và tải chứng chỉ của bạn một cách nhanh chóng
          </p>
        </div>

        {/* Lookup Type Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setLookupType('score')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              lookupType === 'score'
                ? `${TAILWIND_COLORS.bgPrimary} text-white`
                : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Tra cứu điểm thi
            </div>
          </button>
          <button
            onClick={() => setLookupType('certificate')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              lookupType === 'certificate'
                ? `${TAILWIND_COLORS.bgPrimary} text-white`
                : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Tra cứu chứng chỉ
            </div>
          </button>
        </div>

        {/* Filter Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* CCCD - Always show */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CCCD/CMND/MSV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
                placeholder="Nhập số CCCD/CMND/MSV"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            {/* Show certificate type dropdown only for certificate lookup */}
            {lookupType === 'certificate' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại chứng chỉ
                </label>
                <select
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">Chọn loại chứng chỉ</option>
                  <option value="basic">Cơ bản</option>
                  <option value="advanced">Nâng cao</option>
                  <option value="standard">Chuẩn đầu ra tin học</option>
                </select>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-end gap-2">
              <Button
                onClick={handleSearch}
                className={`flex-1 ${TAILWIND_COLORS.bgPrimary} ${TAILWIND_COLORS.bgPrimaryHover} text-white font-semibold`}
                disabled={isLoading || !cccd.trim()}
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? 'Đang tìm kiếm...' : 'Tra cứu'}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-4"
                disabled={isLoading}
              >
                Đặt lại
              </Button>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Hướng dẫn:</strong> {lookupType === 'score' 
                ? 'Nhập số CCCD/CMND/MSV để tra cứu kết quả thi của bạn.' 
                : 'Nhập số CCCD/CMND/MSV (bắt buộc) và chọn loại chứng chỉ để tra cứu thông tin chứng chỉ của bạn.'}
            </p>
          </div>
        </div>

        {/* Results Table */}
        {hasSearched && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className={`${TAILWIND_COLORS.bgPrimary} px-6 py-4`}>
              <h3 className="text-white font-semibold text-lg">
                Kết quả tra cứu ({results.length} kết quả)
              </h3>
            </div>

            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">#</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Họ tên</th>
                      {lookupType === 'score' ? (
                        <>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">CMND/MSV</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Ngày sinh</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Nơi sinh</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Điểm lý thuyết</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Điểm thực hành</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Điểm TB</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Kết quả</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Ngày thi</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Kỳ thi</th>
                        </>
                      ) : (
                        <>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Ngày sinh</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Nơi sinh</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Số vào sổ</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Điểm lý thuyết</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Điểm thực hành</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Ngày cấp</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Loại chứng chỉ</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.map((result, index) => (
                      <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                          {result.studentName}
                        </td>
                        {lookupType === 'score' ? (
                          <>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {result.cccd}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {new Date(result.birthDate).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {result.birthPlace}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                              {result.theoryScore}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                              {result.practiceScore}
                            </td>
                            <td className="px-4 py-3 text-center text-sm">
                              <span className={`font-bold ${result.finalScore >= 80 ? TAILWIND_COLORS.textPrimary : result.finalScore >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
                                {result.finalScore}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                result.result === 'Đạt' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {result.result}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {new Date(result.examDate).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {new Date(result.issueDate).toLocaleDateString('vi-VN')}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {new Date(result.birthDate).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {result.birthPlace}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                              {result.entryNumber}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                              {result.theoryScore}
                            </td>
                            <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                              {result.practiceScore}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {new Date(result.issueDate).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {result.certificateType}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy kết quả
                </h4>
                <p className="text-gray-600">
                  Vui lòng kiểm tra lại thông tin tra cứu và thử lại
                </p>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Bạn cần hỗ trợ? Liên hệ hotline: <a href="tel:0123456789" className={`font-semibold ${TAILWIND_COLORS.textPrimary}`}>0123 456 789</a> hoặc email: <a href="mailto:support@vitc.edu.vn" className={`font-semibold ${TAILWIND_COLORS.textPrimary}`}>support@vitc.edu.vn</a>
          </p>
        </div>
      </div>
    </section>
  );
}
