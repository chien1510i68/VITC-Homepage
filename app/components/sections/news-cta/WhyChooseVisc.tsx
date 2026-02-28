'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Monitor, Clock, Briefcase } from 'lucide-react';

const reasons = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Giảng viên chuyên môn cao từ VNUA",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Chứng chỉ được công nhận rộng rãi",
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: "Phòng máy hiện đại, điều hòa",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Lịch học linh hoạt",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Hỗ trợ việc làm sau khóa học",
  }
];

export const WhyChooseVisc = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Tại sao chọn <span className="text-green-600">VISC</span>?
        </h3>
      </div>

      {/* Reasons List */}
      <div className="space-y-3">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-green-50 hover:border-green-200 border border-gray-200 transition-all duration-300 group"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              {reason.icon}
            </div>
            <p className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors">
              {reason.title}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};