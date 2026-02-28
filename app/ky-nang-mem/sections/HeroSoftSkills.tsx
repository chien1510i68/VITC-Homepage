"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCarousel } from '../hooks';
import { CarouselIndicators, StatGrid } from '../components';
import { CarouselNavigation } from '@/app/shared/components';
import { Button } from '@/components/ui/button';
import { HERO_STATS } from '../constants/hero';
import { CourseRegistrationModal, useCourseRegistration } from '@/app/components/course-registration';
import { fetchActiveSlidesByType } from '@/lib/api';
import type { BackendSlide } from '@/types/api';

export default function HeroSoftSkills() {
  const [isVisible, setIsVisible] = useState(false);
  const [slides, setSlides] = useState<BackendSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel({
    totalSlides: slides.length || 1,
    autoPlayInterval: 5000,
  });
  const { isOpen, selectedCourseId, openModal, closeModal } = useCourseRegistration();

  // Fetch slides from API
  useEffect(() => {
    async function loadSlides() {
      try {
        setIsLoading(true);
        const data = await fetchActiveSlidesByType('SOFT_SKILLS');
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (error) {
        console.error('Failed to load slides:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSlides();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 py-12 lg:py-20">

          {/* Left Content - 50% */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="max-w-xl">
              {/* Small label */}
              <div
                className={`inline-block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400 font-bold">
                  Đào tạo kỹ năng mềm
                </span>
              </div>

              {/* Main headline */}
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.05] mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{
                  transitionDelay: '100ms',
                  letterSpacing: '-0.03em'
                }}
              >
                Phát triển
                <br />
                <span className="font-normal text-green-600">kỹ năng mềm</span>
              </h1>

              {/* Description */}
              <p
                className={`text-base text-gray-500 leading-relaxed mb-10 max-w-md transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: '200ms' }}
              >
                Nâng tầm sự nghiệp với phương pháp đào tạo hiện đại,
                giảng viên giàu kinh nghiệm và môi trường học tập chuyên nghiệp.
              </p>

              {/* CTA Buttons - Green background, White text */}
              <div
                className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: '300ms' }}
              >
                <Button className="px-8 py-3 bg-green-600 text-white text-sm font-semibold hover:bg-green-700 rounded-full shadow-lg shadow-green-100 transition-all">
                  Tìm hiểu thêm
                </Button>
                <Button
                  onClick={() => openModal()}
                  className="px-8 py-3 bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 rounded-full shadow-lg shadow-slate-100 transition-all"
                >
                  Đăng ký ngay
                </Button>
              </div>

              {/* Stats - Horizontal layout */}
              <div
                className={`mt-16 pt-10 border-t border-gray-100 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                style={{ transitionDelay: '400ms' }}
              >
                <StatGrid stats={HERO_STATS} columns={3} className="gap-12" />
              </div>
            </div>
          </div>

          {/* Right Image - 50% */}
          <div className="flex items-center order-1 lg:order-2">
            <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-green-900/5">
              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-green-600 text-xs font-medium tracking-widest">
                    <div className="animate-pulse">LOADING...</div>
                  </div>
                </div>
              )}

              {/* Images */}
              {!isLoading && slides.map((slide, index) => {
                const cleanImageUrl = slide.imageUrl?.split('?')[0] || slide.imageUrl;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <Image
                      src={cleanImageUrl}
                      alt={slide.content || `Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      unoptimized
                      quality={100}
                    />
                  </div>
                );
              })}

              {/* Navigation */}
              {!isLoading && slides.length > 0 && (
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 z-10">
                  <CarouselNavigation
                    onPrevious={prevSlide}
                    onNext={nextSlide}
                    canScrollLeft={true}
                    canScrollRight={true}
                    variant="minimal"
                  />

                  <CarouselIndicators
                    total={slides.length}
                    current={currentSlide}
                    onSelect={goToSlide}
                    variant="lines"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <CourseRegistrationModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultCourseId={selectedCourseId}
      />

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
