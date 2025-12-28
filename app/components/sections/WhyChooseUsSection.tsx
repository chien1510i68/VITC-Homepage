'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { brandColors } from '@/lib/brandColors';

// Icon components for better performance and consistency
const CheckBadgeIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
  </svg>
);

const ComputerDesktopIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6a2 2 0 00-2 2v6.001" />
  </svg>
);

const reasons = [
  {
    icon: <AcademicCapIcon />,
    title: "Giảng viên chuyên môn cao từ VNUA",
    description: "Đội ngũ giảng viên giàu kinh nghiệm và chuyên môn sâu"
  },
  {
    icon: <CheckBadgeIcon />,
    title: "Chứng chỉ được công nhận rộng rãi",
    description: "Chứng chỉ có giá trị pháp lý, được các doanh nghiệp và tổ chức tin tưởng"
  },
  {
    icon: <ComputerDesktopIcon />,
    title: "Phòng máy hiện đại, điều hòa",
    description: "Cơ sở vật chất đầy đủ, máy móc hiện đại, môi trường học tập thoải mái"
  },
  {
    icon: <ClockIcon />,
    title: "Lịch học linh hoạt",
    description: "Đa dạng ca học: sáng, chiều, tối và cuối tuần phù hợp với lịch làm việc"
  },
  {
    icon: <BriefcaseIcon />,
    title: "Hỗ trợ việc làm sau khóa học",
    description: "Tư vấn nghề nghiệp và kết nối với các nhà tuyển dụng uy tín"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center"
        >
          {/* Left Column - Image/Video */}
          <motion.div variants={itemVariants} className="relative order-2 lg:order-1">
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl bg-white/80 backdrop-blur-sm p-3 sm:p-4">
              <div className="relative aspect-video rounded-lg lg:rounded-xl overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="VISC - Cơ sở vật chất hiện đại"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                />
                {/* Play button overlay for video */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-slate-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-2 sm:p-3 lg:p-4 border border-gray-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center"
                       style={{ background: brandColors.gradients.primary }}>
                    <span className="font-bold text-sm sm:text-base lg:text-lg" style={{ color: brandColors.textLight }}>15+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm lg:text-base">Năm kinh nghiệm</p>
                    <p className="text-xs sm:text-sm text-slate-600">Đào tạo học viên</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-2 sm:p-3 lg:p-4 border border-gray-200">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center"
                       style={{ background: brandColors.gradients.secondary }}>
                    <span className="font-bold text-sm sm:text-base lg:text-lg" style={{ color: brandColors.textLight }}>5K+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs sm:text-sm lg:text-base">Học viên</p>
                    <p className="text-xs sm:text-sm text-slate-600">Tin tưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Reasons */}
          <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <motion.h2 
                variants={itemVariants}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-black leading-tight"
                style={{ color: brandColors.textDark }}
              >
                Tại sao chọn{' '}
                <span className="text-transparent bg-clip-text"
                      style={{ background: brandColors.gradients.primary, WebkitBackgroundClip: 'text' }}>
                  VISC
                </span>
                ?
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Chúng tôi cam kết mang đến chất lượng đào tạo tốt nhất với đội ngũ chuyên nghiệp 
                và cơ sở vật chất hiện đại.
              </motion.p>
            </div>

            <motion.div variants={containerVariants} className="space-y-3 sm:space-y-4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-md hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 border border-slate-100/50 hover:border-gray-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md lg:shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                       style={{ background: brandColors.gradients.primary, color: brandColors.textLight }}>
                    <div className="w-5 h-5 sm:w-6 sm:h-6">{reason.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 transition-colors duration-300 line-clamp-2"
                        style={{ color: brandColors.textDark }}
                        onMouseEnter={(e) => e.currentTarget.style.color = brandColors.primary}
                        onMouseLeave={(e) => e.currentTarget.style.color = brandColors.textDark}>
                      {reason.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 sm:pt-6 text-center lg:text-left">
              <button className="group inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center lg:justify-start"
                      style={{ 
                        background: brandColors.gradients.primary,
                        color: brandColors.textLight
                      }}>
                <span>Tìm hiểu thêm về VITC</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;