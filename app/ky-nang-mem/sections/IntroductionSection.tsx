'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks';
import { SectionHeader } from '../components';
import { INTRODUCTION_SECTIONS } from '../constants/introduction';

export default function IntroductionSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };


  return (
    <section 
      ref={sectionRef}
      className="bg-white py-20 lg:py-32"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="mb-32">
          <SectionHeader
            label="Giới thiệu"
            title={
              <>
                Trung tâm đào tạo<br />
                <span className="text-sky-600">Kỹ năng mềm</span>
              </>
            }
            description="Trung tâm đào tạo kỹ năng mềm (CSST) là đơn vị đào tạo trực thuộc Học Viện Nông nghiệp Việt Nam, có tài khoản, con dấu riêng."
            align="center"
          />
        </div>

        {/* Alternating Sections */}
        <div className="space-y-32">
          {INTRODUCTION_SECTIONS.map((section, index) => {
            const isExpanded = expandedId === section.id;
            const isLeft = section.imagePosition === 'left';
            const delay = index * 100;

            return (
              <div
                key={section.id}
                className={`grid grid-cols-1 lg:grid-cols-20 gap-12 lg:gap-16 items-start transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Image Section - 55% (11 columns) */}
                <div 
                  className={`lg:col-span-11 ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className={`group relative overflow-hidden bg-slate-100 rounded-lg transition-all duration-700 ${
                    isExpanded ? 'aspect-[4/5]' : 'h-[50vh]'
                  }`}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Content Section - 45% (9 columns) */}
                <div 
                  className={`lg:col-span-9 ${
                    isLeft ? 'lg:order-2' : 'lg:order-1'
                  } flex flex-col justify-between ${
                    isExpanded ? '' : 'max-h-[50vh] overflow-hidden'
                  }`}
                >
                  {/* Title */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-black text-slate-200">
                        0{section.id}
                      </span>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                      {section.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-700 leading-relaxed text-base">
                      {section.description}
                    </p>

                    {/* Expanded Content */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-slate-600 leading-relaxed text-sm pt-4 border-t border-slate-200">
                        {section.fullContent}
                      </p>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => toggleExpand(section.id)}
                    className="group mt-8 inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-sky-600 transition-colors duration-200 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-32 text-center transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-4 bg-slate-900 hover:bg-sky-600 text-white font-semibold transition-colors duration-200 cursor-pointer">
              <span className="flex items-center gap-2">
                Đăng ký ngay
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            
            <button className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-colors duration-200 cursor-pointer">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
