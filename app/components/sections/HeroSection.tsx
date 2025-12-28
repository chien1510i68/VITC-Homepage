"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Users, Award, Calendar, ArrowDown, CheckCircle } from 'lucide-react';

const heroText = [
  "Nâng tầm kỹ năng số",
  "Mở rộng cơ hội nghề nghiệp",
  "Chinh phục công nghệ"
];

const trustStats = [
  { icon: Calendar, value: "15+", label: "năm kinh nghiệm" },
  { icon: Users, value: "10,000+", label: "học viên" },
  { icon: Award, value: "100%", label: "chứng chỉ quốc tế" }
];

const features = [
  "Giảng viên giàu kinh nghiệm",
  "Chương trình cập nhật liên tục", 
  "Hỗ trợ việc làm sau khóa học",
  "Học phí linh hoạt"
];

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroText.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-slate-900/10 to-transparent z-10" />
          
          {/* Placeholder for background video/image */}
          <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-orange-400/10 flex items-center justify-center">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-3/4 h-3/4 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <div className="text-center text-blue-600/30">
                <Play className="w-24 h-24 mx-auto mb-4" />
                <p className="text-lg font-medium">Video học viên đang học</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Animated Headline */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="h-32 flex items-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="block bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 bg-clip-text text-transparent"
                  >
                    {heroText[currentTextIndex]}
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed max-w-2xl"
              >
                Trung tâm Tin học và Kỹ năng mềm VNUA - Nơi đào tạo kỹ năng thiết yếu, kiến tạo tương lai số
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
              >
                Đăng ký học ngay
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Tư vấn miễn phí
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6"
            >
              {trustStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300"
                  >
                    <stat.icon className="w-6 h-6 text-green-600" />
                    <div className="font-bold text-2xl text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Tại sao chọn VITC?
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 group"
                  >
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors duration-200">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-slate-600 text-sm mb-3 font-medium">Khám phá thêm</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer hover:text-green-600 transition-colors duration-200"
          >
            <ArrowDown className="w-6 h-6 text-slate-400 hover:text-green-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-blue-400/10 blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-orange-400/10 blur-xl"
        />
      </div>
    </section>
  );
}