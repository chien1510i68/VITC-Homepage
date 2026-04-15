'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { getExams, ExamListItem } from '@/lib/api/exams';
import { useRouter } from 'next/navigation';
import AuthChoiceModal from './components/AuthChoiceModal';

export default function ThiThuPage() {
  const router = useRouter();
  const [exams, setExams] = useState<ExamListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingExamId, setPendingExamId] = useState<string | null>(null);

  useEffect(() => {
    async function loadExams() {
      try {
        const response = await getExams();
        if (response.success && response.data) {
          // Lọc bỏ các exam có id null/undefined để tránh lỗi key trùng
          const validExams = response.data.filter(exam => exam.id != null);
          setExams(validExams);
        }
      } catch (error) {
        console.error('Failed to load exams:', error);
      } finally {
        setLoading(false);
      }
    }
    loadExams();
  }, []);

  const handleEnterExam = (examId: string) => {
    setPendingExamId(examId);
    setShowAuthModal(true);
  };

  const handleSkipAuth = () => {
    if (pendingExamId) {
      sessionStorage.setItem(`exam_refreshing_${pendingExamId}`, 'true');
      router.push(`/thi-thu/${pendingExamId}`);
    }
    setShowAuthModal(false);
  };

  const handleLoginSuccess = () => {
    if (pendingExamId) {
      sessionStorage.setItem(`exam_refreshing_${pendingExamId}`, 'true');
      router.push(`/thi-thu/${pendingExamId}`);
    }
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      <Header />
      
      <main className="flex-1 w-[90vw] mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#07314e] mb-4 uppercase tracking-wider">
            Hệ thống thi thử trực tuyến
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Luyện tập kiến thức với các đề thi bám sát chương trình đào tạo. 
            Đăng nhập để làm đầy đủ câu hỏi và lưu lại lịch sử lượt thi.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-blue-900 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-gray-200 shadow-sm overflow-hidden rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#07314e] text-white">
                    <tr>
                      <th className="text-left py-4 px-6 font-bold uppercase text-xs tracking-wider">Tên bài thi</th>
                      <th className="text-center py-4 px-6 font-bold uppercase text-xs tracking-wider">Thời gian</th>
                      <th className="text-center py-4 px-6 font-bold uppercase text-xs tracking-wider">Số câu hỏi</th>
                      <th className="text-center py-4 px-6 font-bold uppercase text-xs tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {exams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-6">
                          <div className="font-bold text-gray-900 text-base">{exam.title}</div>
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {exam.description || 'Đề thi trắc nghiệm đánh giá kiến thức chuyên môn.'}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-center text-gray-700 font-semibold">{exam.duration} phút</td>
                        <td className="py-5 px-6 text-center text-gray-700 font-semibold">{exam.totalQuestions} câu</td>
                        <td className="py-5 px-6 text-center">
                          <button 
                            onClick={() => handleEnterExam(exam.id)}
                            className="inline-block px-8 py-2.5 bg-[#07314e] text-white font-bold text-xs hover:bg-[#0a456e] transition-colors rounded-lg uppercase tracking-wider"
                          >
                            Vào thi
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="md:hidden space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="bg-white p-5 border border-gray-200 shadow-sm rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight flex-1 pr-4">{exam.title}</h3>
                    <span className="bg-blue-50 text-[#07314e] text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter shrink-0">
                      {exam.duration} phút
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-5 line-clamp-2">
                    {exam.description || 'Đề thi trắc nghiệm đánh giá kiến thức chuyên môn.'}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 font-medium">
                      <span className="text-[#07314e] font-bold">{exam.totalQuestions}</span> câu hỏi
                    </div>
                    <button 
                      onClick={() => handleEnterExam(exam.id)}
                      className="px-6 py-2.5 bg-[#07314e] text-white font-bold text-xs rounded-lg uppercase tracking-widest shadow-lg shadow-blue-900/10"
                    >
                      Vào thi ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {exams.length === 0 && (
              <div className="py-20 text-center bg-white border border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-500">Hiện đang cập nhật dữ liệu đề thi...</p>
              </div>
            )}
          </>
        )}
      </main>

      {showAuthModal && (
        <AuthChoiceModal 
          onLoginSuccess={handleLoginSuccess}
          onSkip={handleSkipAuth}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}
