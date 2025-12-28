import { motion } from "framer-motion";
import { useState } from "react";
import { ConsultationFormData } from "./types";
import { courseOptions } from "./data";
import { brandColors } from "@/lib/brandColors";

export const ConsultationForm = () => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      course: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-8 shadow-lg"
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
             style={{ backgroundColor: brandColors.primary }}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Tư vấn miễn phí</h3>
          <p className="text-gray-600 text-sm">Đăng ký nhận tư vấn từ chuyên viên</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên *"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
          />
        </div>

        <div>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
          >
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Lời nhắn (tùy chọn)"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all resize-none"
            style={{ '--tw-ring-color': brandColors.primary } as React.CSSProperties}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 text-white font-semibold rounded-lg transition-all flex items-center justify-center disabled:opacity-50"
          style={{ backgroundColor: brandColors.primary }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang gửi...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Đăng ký tư vấn
            </>
          )}
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Bằng việc đăng ký, bạn đồng ý với{' '}
        <a href="#" className="text-green-600 hover:underline">
          Điều khoản sử dụng
        </a>{' '}
        và{' '}
        <a href="#" className="text-green-600 hover:underline">
          Chính sách bảo mật
        </a>
      </p>
    </motion.form>
  );
};