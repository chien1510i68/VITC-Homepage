'use client';

import React, { useState } from 'react';
import { register } from '@/lib/api/auth';

interface RegisterFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function RegisterForm({ onSuccess, onBack }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    fullName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await register(formData);
      if (response.success && response.data) {
        // Store tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Clear session storage to ensure new user has fresh exam state
        sessionStorage.clear();
        
        onSuccess();
      } else {
        setError(response.error || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      console.error('Registration error:', err);
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

      <h2 className="text-2xl font-bold text-[#07314e] mb-2 uppercase tracking-tight">Đăng ký tài khoản</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Vui lòng điền thông tin bên dưới để tạo tài khoản mới.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Tài khoản <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
              placeholder="user01"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Số điện thoại</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
              placeholder="0901234567"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
            placeholder="test@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#07314e] uppercase mb-1 px-1">Mật khẩu <span className="text-red-500">*</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#07314e] focus:bg-white outline-none transition-all text-sm rounded-lg"
            placeholder="••••••••"
            required
            minLength={6}
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
          {isLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
        </button>
      </form>
    </div>
  );
}
