'use client';

import { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { getExamDetail, submitExam, ExamDetail, SubmitExamRes } from '@/lib/api/exams';
import AuthChoiceModal from '../components/AuthChoiceModal';
import ResultModal from '../components/ResultModal';
import QuestionGrid from '../components/QuestionGrid';
import ConfirmModal from '../components/ConfirmModal';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ExamSessionPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const STORAGE_KEY = `exam_time_${id}`;
  const ANSWERS_KEY = `exam_answers_${id}`;
  const SUBMITTED_KEY = `exam_submitted_${id}`;
  const STARTED_KEY = `exam_started_${id}`;
  
  const [exam, setExam] = useState<ExamDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Chỉ chạy trên client sau khi mount
  useEffect(() => {
    setIsClient(true);
    
    // Phát hiện F5: Nếu có flag refresh trong sessionStorage cho bài thi này
    const isRefreshing = sessionStorage.getItem(`exam_refreshing_${id}`);
    if (isRefreshing) {
      setShowAuthModal(false);
      loadExam();
      sessionStorage.removeItem(`exam_refreshing_${id}`);
    }
  }, [id]);

  // Đặt flag refresh khi người dùng F5 hoặc tải lại trang
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleBeforeUnload = () => {
      // Chỉ đặt flag nếu modal đang ẩn (user đã chọn skip hoặc đã login)
      if (!showAuthModal) {
        sessionStorage.setItem(`exam_refreshing_${id}`, 'true');
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showAuthModal, id]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [result, setResult] = useState<SubmitExamRes | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ... (rest of helper functions)

  // Khởi tạo timer từ sessionStorage
  const initTimerFromStorage = (durationMinutes: number) => {
    if (typeof window === 'undefined') return durationMinutes * 60;
    
    const storedTime = sessionStorage.getItem(STORAGE_KEY);
    if (storedTime) {
      const startTime = parseInt(storedTime, 10);
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      const totalSeconds = durationMinutes * 60;
      const remaining = totalSeconds - elapsedSeconds;
      return Math.max(0, remaining);
    }
    return durationMinutes * 60;
  };

  // Lưu thời gian bắt đầu vào sessionStorage
  const saveStartTime = (durationMinutes: number) => {
    if (typeof window === 'undefined') return;
    const storedTime = sessionStorage.getItem(STORAGE_KEY);
    if (!storedTime) {
      const startTime = Date.now();
      sessionStorage.setItem(STORAGE_KEY, startTime.toString());
    }
  };

  // Lưu câu trả lời vào sessionStorage
  const saveAnswersToStorage = (answers: Record<string, string>) => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  };

  // Load câu trả lời từ sessionStorage
  const loadAnswersFromStorage = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const stored = sessionStorage.getItem(ANSWERS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {};
      }
    }
    return {};
  };



  // Load saved answers when exam is loaded
  useEffect(() => {
    if (exam && loading === false) {
      const savedAnswers = loadAnswersFromStorage();
      if (Object.keys(savedAnswers).length > 0) {
        setUserAnswers(savedAnswers);
      }
    }
  }, [exam, loading]);

  async function loadExam() {
    setLoading(true);
    setError(null);
    try {
      const response = await getExamDetail(id);
      if (response.success && response.data) {
        // Lọc bỏ các question có id null/undefined
        const validQuestions = (response.data.questions || []).filter(q => q && q.id != null);
        
        // Lọc answers cho mỗi question + tạo id tự động nếu null
        const cleanQuestions = validQuestions.map((q, qIdx) => ({
          ...q,
          answers: (q.answers || []).map((a, aIdx) => ({
            ...a,
            id: a.id || `answer_${qIdx}_${aIdx}` // Tạo id tạm nếu null
          }))
        }));
        
        const cleanExam = {
          ...response.data,
          questions: cleanQuestions,
          totalQuestions: cleanQuestions.length
        };
        
        setExam(cleanExam);
        
        // Đánh dấu đã bắt đầu làm bài (để F5 không hiện modal auth)
        sessionStorage.setItem(STARTED_KEY, 'true');
        
        // Kiểm tra xem đã submit chưa
        const isSubmitted = sessionStorage.getItem(SUBMITTED_KEY) === 'true';
        if (isSubmitted) {
          setTimeLeft(0);
        } else {
          const remainingTime = initTimerFromStorage(cleanExam.duration);
          setTimeLeft(remainingTime);
          if (remainingTime > 0) {
            saveStartTime(cleanExam.duration);
          }
        }
      } else {
        setError(response.error || 'Không thể tải thông tin đề thi.');
        toast.error(response.error || 'Không thể tải thông tin đề thi.');
      }
    } catch (error: any) {
      setError(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      console.error('Failed to load exam:', error);
    } finally {
      setLoading(false);
    }
  }

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (exam && timeLeft > 0 && !result) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && exam && !result && !loading) {
      executeSubmit();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, exam, result, loading]);

  // Cleanup sessionStorage khi rời khỏi trang
  useEffect(() => {
    return () => {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(ANSWERS_KEY);
      sessionStorage.removeItem(SUBMITTED_KEY);
    };
  }, []);

  const handleAnswerChange = (questionId: string, answerId: string) => {
    if (result) return;
    const newAnswers = {
      ...userAnswers,
      [questionId]: answerId,
    };
    setUserAnswers(newAnswers);
    saveAnswersToStorage(newAnswers);
  };

  const jumpToQuestion = (idx: number) => {
    if (!exam || !exam.questions[idx]) return;
    const qId = exam.questions[idx].id;
    const element = questionRefs.current[qId];
    if (element) {
      const offset = 120; // Header + Sticky padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Hàm thực hiện nộp bài thực sự
  const executeSubmit = async () => {
    if (isSubmitting || result) return;
    
    setIsSubmitting(true);
    try {
      const response = await submitExam(id, { answers: userAnswers });
      if (response.success && response.data) {
        setResult(response.data);
        setTimeLeft(0);
        // Đánh dấu đã submit để không restore khi F5
        sessionStorage.setItem(SUBMITTED_KEY, 'true');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Failed to submit exam:', error);
      toast.error('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (isSubmitting || result) return;
    setShowSubmitConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    executeSubmit();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Hiện modal auth nếu chưa started hoặc chưa mount client
  if (!isClient) {
    // Server-side hoặc đang loading - hiện loading để tránh flash
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin h-12 w-12 border-[5px] border-[#07314e] border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (showAuthModal) {
    return (
      <AuthChoiceModal 
        onLoginSuccess={() => {
          setShowAuthModal(false);
          loadExam();
        }} 
        onSkip={() => {
          setShowAuthModal(false);
          loadExam();
        }}
        onClose={() => router.push('/thi-thu')}
      />
    );
  }

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = exam ? (answeredCount / exam.questions.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-inter">
      {/* Hide main header during exam to save space */}
      {/* <Header /> */}
      
      <main className="flex-1 w-[90vw] mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
            <div className="animate-spin h-12 w-12 border-[5px] border-[#07314e] border-t-transparent rounded-full"></div>
            <p className="font-bold text-[#07314e] animate-pulse uppercase tracking-widest text-xs">Đang tải đề thi...</p>
          </div>
        ) : exam ? (
          <div>
            {/* Header Info - Fixed to top-0 */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 mb-6 -mx-4 px-4 shadow-sm">
              {/* Desktop View */}
              <div className="hidden lg:grid grid-cols-10 items-center gap-6">
                {/* Left side: Time, Progress, Submit (2/10) */}
                <div className="col-span-2 flex items-center justify-between border-r border-slate-200 pr-6 h-full min-h-[72px]">
                  <div className="flex flex-col justify-center">
                    <div className={`text-2xl font-black font-mono leading-none ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-[#07314e]'}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                      <span className="text-[#07314e]">{answeredCount}/{exam.questions.length}</span>
                    </div>
                  </div>

                  {!result ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-[#07314e] text-white font-bold uppercase text-[9px] rounded-lg hover:bg-[#0a456e] transition-all shadow-md active:scale-95 disabled:bg-slate-300 ml-2"
                    >
                      {isSubmitting ? '...' : 'Nộp'}
                    </button>
                  ) : (
                    <Link
                      href="/thi-thu"
                      className="px-4 py-2 border border-[#07314e] text-[#07314e] font-bold uppercase text-[9px] rounded-lg hover:bg-slate-50 transition-all font-inter ml-2 text-center"
                    >
                      Thoát
                    </Link>
                  )}
                </div>

                {/* Right side: Question Palette (8/10) - Max 2 rows */}
                <div className="col-span-8 max-h-[76px] overflow-y-auto custom-scrollbar">
                  <QuestionGrid 
                    totalQuestions={exam.questions.length}
                    userAnswers={userAnswers}
                    questionIds={exam.questions.map(q => q.id)}
                    onJumpToQuestion={jumpToQuestion}
                  />
                </div>
              </div>

              {/* Mobile/Tablet View */}
              <div className="lg:hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`text-xl font-black font-mono ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-[#07314e]'}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-[10px] bg-slate-100 px-2 py-1 rounded text-gray-500 font-bold uppercase tracking-tighter">
                      Đã làm: {answeredCount}/{exam.questions.length}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsGridOpen(!isGridOpen)}
                    className="p-2 bg-slate-100 rounded-lg text-[#07314e] hover:bg-slate-200 transition-colors flex items-center gap-1"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-tight ml-1">
                        {isGridOpen ? 'Thu gọn' : 'Bảng câu hỏi'}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2.5} 
                      stroke="currentColor" 
                      className={`w-4 h-4 transition-transform duration-300 ${isGridOpen ? 'rotate-180' : ''}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
                
                {/* Collapsible Grid for Mobile */}
                {isGridOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-100 overflow-y-auto max-h-[40vh] animate-in slide-in-from-top-2 duration-200">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Danh sách câu hỏi</p>
                      <QuestionGrid 
                          totalQuestions={exam.questions.length}
                          userAnswers={userAnswers}
                          questionIds={exam.questions.map(q => q.id)}
                          onJumpToQuestion={(idx) => {
                              jumpToQuestion(idx);
                              setIsGridOpen(false);
                          }}
                      />
                  </div>
                )}
              </div>
            </div>

            {/* Main Area */}
            <div className="space-y-3">
                {exam.questions.map((q, idx) => {
                  const userAnswerId = userAnswers[q.id];

                  return (
                    <div 
                      key={q.id} 
                      ref={el => { questionRefs.current[q.id] = el }}
                      className={`bg-white p-4 border transition-all rounded-lg ${
                        userAnswerId ? 'border-gray-300 bg-gray-50' : 'border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#07314e] text-white text-xs font-bold px-2 py-0.5 rounded">C{idx + 1}</span>
                        <p className="text-base font-semibold text-gray-900 flex-1">
                            {q.content}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.answers.map((a) => {
                              const isSelected = userAnswerId === a.id;
                              
                              let stateStyles = "bg-slate-50 hover:bg-slate-100";
                              if (isSelected) {
                                stateStyles = result ? "bg-slate-200" : "bg-blue-100";
                              } else if (result) {
                                stateStyles = "bg-gray-50 opacity-60 cursor-not-allowed";
                              }

                              return (
                                <label 
                                  key={a.id} 
                                  className={`block px-3 py-2 cursor-pointer transition-all rounded ${stateStyles}`}
                                >
                                  <input 
                                    type="radio" 
                                    name={q.id} 
                                    value={a.id}
                                    checked={isSelected}
                                    onChange={() => handleAnswerChange(q.id, a.id)}
                                    className="hidden"
                                    disabled={!!result}
                                  />
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                                      isSelected ? 'border-[#07314e] bg-[#07314e]' : 'border-slate-300'
                                    }`}>
                                      {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </div>
                                    <span className={`text-sm ${isSelected ? 'text-[#07314e] font-medium' : 'text-slate-600'}`}>
                                        {a.content}
                                    </span>
</div>
                        </label>
                              );
                            })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!result && (
                <div className="mt-4 flex justify-center pb-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#07314e] text-white font-bold uppercase text-sm rounded-lg disabled:bg-slate-300"
                  >
                    {isSubmitting ? 'ĐANG XỬ LÝ...' : 'NỘP BÀI'}
                  </button>
                </div>
              )}

              {result && (
                <Link 
                  href="/thi-thu"
                  className="flex items-center justify-center w-full py-3 border-2 border-[#07314e] text-[#07314e] font-bold uppercase text-sm rounded-lg"
                >
                  Thoát phòng thi
                </Link>
              )}
            </div>
        ) : (
          <div className="text-center py-24 md:py-40 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto px-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase">
              {error ? 'Không thể truy cập bài thi' : 'Không tìm thấy thông tin đề thi'}
            </h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto">
              {error || 'Mã đề thi bạn truy cập không tồn tại hoặc đã bị khóa. Vui lòng quay lại danh sách đề thi chính thức.'}
            </p>
            <Link href="/thi-thu" className="inline-block px-10 py-4 bg-[#07314e] text-white font-black uppercase tracking-widest text-xs rounded-xl hover:shadow-xl transition-all">
                Quay lại danh sách
            </Link>
          </div>
        )}

        {result && (
            <ResultModal 
                correctCount={result.correctCount} 
                totalCount={result.totalCount} 
                score={result.score}
                onClose={() => setResult(null)}
            />
        )}

        <ConfirmModal 
            isOpen={showSubmitConfirm}
            title="Nộp bài thi"
            message="Bạn có chắc chắn muốn hoàn thành và nộp bài làm của mình không? Sau khi nộp, bạn sẽ không thể thay đổi đáp án."
            confirmText="Nộp bài ngay"
            cancelText="Tiếp tục làm bài"
            onConfirm={handleConfirmSubmit}
            onCancel={() => setShowSubmitConfirm(false)}
            isLoading={isSubmitting}
        />
      </main>

      <Footer />
    </div>
  );
}
