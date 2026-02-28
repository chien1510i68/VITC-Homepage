'use client';

import { motion } from 'framer-motion';

const achievements = [
  {
    number: '10,000',
    suffix: '+',
    label: 'Học viên'
  },
  {
    number: '50',
    suffix: '+',
    label: 'Khóa học'
  },
  {
    number: '15',
    suffix: '+',
    label: 'Năm kinh nghiệm'
  },
  {
    number: '4.8',
    suffix: '/5',
    label: 'Đánh giá'
  }
];

export const AchievementsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Thành tựu nổi bật
        </h3>
      </div>

        {/* Stats Grid - Horizontal */}
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
              }}
              className="text-center"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300">
                {/* Number */}
                <div className="flex items-baseline justify-center gap-0.5 mb-1">
                  <span className="text-2xl font-bold text-green-600">
                    {item.number}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    {item.suffix}
                  </span>
                </div>
                
                {/* Label */}
                <div className="text-xs font-medium text-gray-700">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
  );
};
