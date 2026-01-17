"use client";

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { TAILWIND_COLORS } from '@/lib/colors';

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Minimalist background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Subtle gradient orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute -top-20 -right-20 w-96 h-96 ${TAILWIND_COLORS.bgPrimary} rounded-full blur-3xl`}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.04, 0.02]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-5">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-12 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Trang chủ</span>
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className={`flex items-center gap-2 ${TAILWIND_COLORS.bgPrimary}/10 border ${TAILWIND_COLORS.borderPrimary} ${TAILWIND_COLORS.textPrimary} px-4 py-2 rounded-full`}>
              <Sparkles className={`w-4 h-4 ${TAILWIND_COLORS.textPrimary}`} />
              <span className="text-sm font-semibold">Tiện ích & Dịch vụ</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight"
          >
            Tiện ích và Dịch vụ
            <br />
            <span className={TAILWIND_COLORS.textPrimary}>
              VITC
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed"
          >
            Hỗ trợ toàn diện cho học viên với các tiện ích tra cứu và dịch vụ chất lượng
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`h-1 ${TAILWIND_COLORS.bgPrimary} rounded-full mt-8`}
          />
        </div>
      </div>
    </section>
  );
}
