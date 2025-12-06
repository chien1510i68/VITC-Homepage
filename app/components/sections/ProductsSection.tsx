"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, GraduationCap } from 'lucide-react';
import { TAILWIND_COLORS } from '@/lib/colors';

const products = [
  {
    title: 'Phần mềm quản lý dự án',
    description: 'Giải pháp quản lý dự án toàn diện với tính năng theo dõi tiến độ, phân công công việc và báo cáo chi tiết',
    image: '/products/product-1.jpg',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    features: ['Quản lý task', 'Theo dõi tiến độ', 'Báo cáo tự động'],
  },
  {
    title: 'Ứng dụng hỗ trợ học tập',
    description: 'Nền tảng học tập trực tuyến với công nghệ AI giúp cá nhân hóa trải nghiệm học tập cho mỗi học viên',
    image: '/products/product-2.jpg',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    features: ['Học tập AI', 'Video tương tác', 'Theo dõi tiến trình'],
  },
  {
    title: 'Nền tảng đào tạo trực tuyến',
    description: 'Hệ thống quản lý đào tạo LMS đầy đủ tính năng cho tổ chức, doanh nghiệp và trường học',
    image: '/products/product-3.jpg',
    icon: GraduationCap,
    color: 'from-green-500 to-emerald-500',
    features: ['Quản lý khóa học', 'Bài thi online', 'Chứng chỉ số'],
  },
];

export default function ProductsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-20 right-20 w-72 h-72 bg-gradient-to-br ${TAILWIND_COLORS.bgPrimary} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimaryLight} ${TAILWIND_COLORS.textPrimaryDark} px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-fade-in-up`}>
            Sản phẩm công nghệ
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 animate-fade-in-up animation-delay-100">
            Giải pháp số hóa toàn diện
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Các sản phẩm công nghệ được phát triển bởi VITC, tối ưu hóa quy trình làm việc và nâng cao hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                <Card className={`h-full border-2 transition-all duration-500 overflow-hidden ${
                  hoveredIndex === index 
                    ? `${TAILWIND_COLORS.borderPrimary} translate-y-[-8px] border-opacity-100` 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  {/* Image Section with Icon Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-90`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
                      }`}>
                        <Icon className="w-24 h-24 text-white opacity-80" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className={`text-xl mb-2 transition-colors duration-300 ${
                      hoveredIndex === index ? TAILWIND_COLORS.textPrimary : 'text-gray-900'
                    }`}>
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Features List */}
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center gap-2 text-sm text-gray-700 transition-all duration-300 ${
                            hoveredIndex === index 
                              ? 'translate-x-2 opacity-100' 
                              : 'translate-x-0 opacity-70'
                          }`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${TAILWIND_COLORS.bgPrimary}`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <button 
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                        hoveredIndex === index 
                          ? `${TAILWIND_COLORS.bgPrimary} text-white` 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>Tìm hiểu thêm</span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                        hoveredIndex === index ? 'translate-x-1' : 'translate-x-0'
                      }`} />
                    </button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
