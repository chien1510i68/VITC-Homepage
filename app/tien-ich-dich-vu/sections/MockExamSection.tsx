'use client';

import { motion } from 'framer-motion';
import { Monitor, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';

const MOCK_EXAMS = [
  {
    title: 'UDCNTT Cơ bản',
    description: 'Bài thi thử theo chuẩn thông tư 03/2014/TT-BTTTT của Bộ Thông tin và Truyền thông.',
    questions: 30,
    time: 30,
    icon: Monitor,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    link: 'https://elearning.visc.edu.vn'
  },
  {
    title: 'UDCNTT Nâng cao',
    description: 'Nâng cao kỹ năng tin học văn phòng với các module chuyên sâu về Excel và PowerPoint.',
    questions: 30,
    time: 30,
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    link: 'https://elearning.visc.edu.vn'
  },
  {
    title: 'Kỹ năng mềm',
    description: 'Các bài trắc nghiệm đánh giá kiến thức về kỹ năng giao tiếp, làm việc nhóm và thuyết trình.',
    questions: 20,
    time: 20,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100',
    link: 'https://elearning.visc.edu.vn'
  }
];

export default function MockExamSection() {
  return (
    <section id="thi-thu" className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-orange-700">Luyện tập & Đánh giá</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Hệ thống <span className={`${TAILWIND_COLORS.textPrimary}`}>thi thử Online</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Làm quen với cấu trúc đề thi, rèn luyện kỹ năng và đánh giá năng lực của mình 
            trước khi bước vào kỳ thi chính thức. Hoàn toàn miễn phí cho học viên.
          </motion.p>
        </div>

        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_EXAMS.map((exam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative p-8 rounded-3xl bg-white border ${exam.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 ${exam.bgColor} ${exam.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <exam.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{exam.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                {exam.description}
              </p>
              
              <div className="flex items-center gap-6 mb-8 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{exam.questions} câu hỏi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span>{exam.time} phút</span>
                </div>
              </div>
              
              <a 
                href={exam.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold transition-all duration-300 
                  ${TAILWIND_COLORS.bgPrimary} text-white shadow-lg shadow-green-100 hover:shadow-green-200 group-hover:translate-x-1`}
              >
                Bắt đầu làm bài
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`mt-16 p-8 rounded-3xl ${TAILWIND_COLORS.bgPrimary} text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-2xl font-bold mb-2">Bạn đã sẵn sàng cho kỳ thi?</h4>
            <p className="text-white/80">Truy cập hệ thống Elearning để ôn tập đầy đủ các kiến thức và bài tập.</p>
          </div>
          
          <a 
            href="https://elearning.visc.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-xl"
          >
            Hệ thống Elearning
          </a>
        </motion.div>
      </div>
    </section>
  );
}
