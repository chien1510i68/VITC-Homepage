import React from 'react';
import { motion } from 'framer-motion';
import { successVariants } from './animations';

interface SuccessStateProps {
  onClose: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = () => {
  return (
    <motion.div
      variants={successVariants}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Đăng ký thành công!
      </h3>
      <p className="text-gray-600 mb-6">
        Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
      </p>
      <div className="text-sm text-gray-500">
        <p>📞 Hotline: 012.345.6789</p>
        <p>⏰ Thời gian liên hệ: 8:00 - 17:00 (T2-T6)</p>
      </div>
    </motion.div>
  );
};