'use client';

import React, { useState } from 'react';
import { login } from '@/lib/api/auth';

interface LoginFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function LoginForm({ onSuccess, onBack }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({ username, password });
      if (response.success && response.data) {
        // Store tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Clear session storage to ensure new user has fresh exam state
        sessionStorage.clear();
        
        onSuccess();
      } else {
        setError(response.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-[#07314e] mb-6 transition-colors text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại
      </button>

      <h2 className="text-2xl font-bold text-[#07314e] mb-2 uppercase tracking-tight">Đăng nhập</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Vui lòng nhập thông tin tài khoản để tiếp tục.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Tài khoản / Số điện thoại</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
            placeholder="Nhập tài khoản"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#07314e] text-white font-bold hover:bg-[#0a456e] transition-colors uppercase text-sm tracking-wide disabled:bg-gray-400 mt-2 rounded-lg"
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
        </button>
      </form>
    </div>
  );
}
