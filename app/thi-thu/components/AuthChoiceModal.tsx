'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthChoiceModalProps {
  onLoginSuccess: () => void;
  onSkip: () => void;
  onClose?: () => void;
}

export default function AuthChoiceModal({ onLoginSuccess, onSkip, onClose }: AuthChoiceModalProps) {
  const [view, setView] = useState<'choice' | 'login' | 'register' | 'confirm_account'>('choice');
  const [currentUser, setCurrentUser] = useState<{username: string} | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setView('confirm_account');
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="bg-white w-full max-w-[400px] p-6 md:p-8 shadow-2xl relative overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#07314e]"></div>
          
          {view === 'confirm_account' ? (
            <>
              <h2 className="text-2xl font-bold text-[#07314e] mb-2 uppercase tracking-tight">Xác nhận tài khoản</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Bạn đang đăng nhập với tài khoản: <span className="font-bold text-[#07314e] underline">{currentUser?.username}</span>. 
                Vui lòng chọn tài khoản bạn muốn sử dụng để thi.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={onLoginSuccess}
                  className="w-full py-4 bg-[#07314e] text-white font-bold hover:bg-[#0a456e] transition-colors uppercase text-sm tracking-wide rounded-lg"
                >
                  Tiếp tục thi với tài khoản này
                </button>
                
                <button 
                  onClick={() => setView('login')}
                  className="w-full py-4 border-2 border-[#07314e] text-[#07314e] font-bold hover:bg-gray-50 transition-colors uppercase text-sm tracking-wide rounded-lg"
                >
                  Thi bằng tài khoản khác
                </button>
                
                <button 
                  onClick={onClose}
                  className="w-full py-2 text-gray-400 font-medium hover:text-gray-600 transition-colors text-xs text-center"
                >
                  Hủy thao tác
                </button>
              </div>
            </>
          ) : view === 'choice' ? (
            <>
              <h2 className="text-2xl font-bold text-[#07314e] mb-2 uppercase tracking-tight">Kỳ thi yêu cầu định danh</h2>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                Đăng nhập để làm đề thi đầy đủ câu hỏi và lưu lại lịch sử học tập. 
                Nếu chọn "Làm bài với tư cách Khách", bạn chỉ có thể xem 50% nội dung đề thi.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setView('login')}
                  className="w-full py-4 bg-[#07314e] text-white font-bold hover:bg-[#0a456e] transition-colors uppercase text-sm tracking-wide rounded-lg"
                >
                  Đăng nhập tài khoản
                </button>
                
                <button 
                  onClick={() => setView('register')}
                  className="w-full py-4 border-2 border-[#07314e] text-[#07314e] font-bold hover:bg-gray-50 transition-colors uppercase text-sm tracking-wide rounded-lg"
                >
                  Đăng ký mới
                </button>
                
                <button 
                  onClick={onSkip}
                  className="w-full py-4 text-gray-500 font-semibold hover:text-gray-800 transition-colors text-sm underline underline-offset-4"
                >
                  Bỏ qua và vào thi ngay (Chế độ Khách)
                </button>
              </div>
            </>
          ) : view === 'login' ? (
            <LoginForm 
              onSuccess={onLoginSuccess} 
              onBack={() => setView(currentUser ? 'confirm_account' : 'choice')} 
            />
          ) : (
            <RegisterForm 
              onSuccess={onLoginSuccess} 
              onBack={() => setView(currentUser ? 'confirm_account' : 'choice')} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
