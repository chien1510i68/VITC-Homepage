'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '../hooks';
import { SectionHeader } from '../components';
import { INTRODUCTION_SECTIONS } from '../constants/introduction';
import { CourseRegistrationModal, useCourseRegistration } from '@/app/components/course-registration';

export default function IntroductionSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const { isOpen, selectedCourseId, openModal, closeModal } = useCourseRegistration();

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };


  return (
    <section
      ref={sectionRef}
      className="bg-white py-6 lg:py-10"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">

        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <SectionHeader
            label="Giới thiệu"
            title={
              <>
                Trung tâm đào tạo<br />
                <span className="text-green-600">Kỹ năng mềm</span>
              </>
            }
            description="Trung tâm đào tạo kỹ năng mềm (CSST) là đơn vị đào tạo trực thuộc Học Viện Nông nghiệp Việt Nam, có tài khoản, con dấu riêng."
            align="center"
          />
        </div>

        {/* Alternating Sections */}
        <div className="space-y-8 lg:space-y-12">
          {INTRODUCTION_SECTIONS.map((section, index) => {
            const isExpanded = expandedId === section.id;
            const isLeft = section.imagePosition === 'left';
            const delay = index * 100;

            return (
              <div
                key={section.id}
                className={`grid grid-cols-1 lg:grid-cols-20 gap-8 lg:gap-12 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Image Section - 55% (11 columns) */}
                <div
                  className={`lg:col-span-11 ${isLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  <div className={`group relative overflow-hidden bg-slate-100 rounded-2xl transition-all duration-700 ${isExpanded ? 'aspect-[16/10]' : 'h-[300px] lg:h-[350px]'
                    }`}>
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Content Section - 45% (9 columns) */}
                <div
                  className={`lg:col-span-9 ${isLeft ? 'lg:order-2' : 'lg:order-1'
                    } flex flex-col justify-center`}
                >
                  {/* Title */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-slate-100">
                        0{section.id}
                      </span>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-slate-900">
                      {section.title}
                    </h3>

                    {/* Description - Clamped to 3 lines */}
                    <div className="relative">
                      <p className={`text-sm sm:text-base text-slate-600 leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'
                        }`}>
                        {section.description}
                      </p>
                    </div>

                    {/* Expanded Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-4 border-t border-slate-100">
                        {section.fullContent}
                      </p>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => toggleExpand(section.id)}
                    className="group mt-2 px-0 inline-flex items-center gap-1 text-green-600 font-semibold hover:bg-transparent min-h-[32px] cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm">{isExpanded ? 'Thu gọn' : 'Xem thêm'}</span>
                    <ChevronDown
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-8 lg:mt-12 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <div className="inline-flex items-center gap-4">
            <Button
              type="button"
              onClick={() => openModal()}
              className="px-6 py-2 bg-slate-900 hover:bg-green-600 text-white text-xs font-semibold rounded-full w-full sm:w-auto"
            >
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <CourseRegistrationModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultCourseId={selectedCourseId}
      />
    </section>
  );
}
