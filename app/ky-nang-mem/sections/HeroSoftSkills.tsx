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
    <section className="relative w-full min-h-screen bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 min-h-screen py-16 lg:py-20">
          
          {/* Left Content - 5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <div className="max-w-lg">
              {/* Small label */}
              <div 
                className={`inline-block mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-xs tracking-[0.2em] uppercase text-gray-400 font-medium">
                  Đào tạo kỹ năng mềm
                </span>
              </div>

              {/* Main headline */}
              <h1 
                className={`text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-[1.1] mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: '100ms',
                  letterSpacing: '-0.02em'
                }}
              >
                Phát triển
                <br />
                <span className="font-normal">kỹ năng mềm</span>
              </h1>

              {/* Description */}
              <p 
                className={`text-base text-gray-500 leading-relaxed mb-12 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                Nâng tầm sự nghiệp với phương pháp đào tạo hiện đại, 
                giảng viên giàu kinh nghiệm và môi trường học tập chuyên nghiệp.
              </p>

              {/* CTA Button */}
              <div 
                className={`flex items-center gap-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <Button className="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800">
                  Tìm hiểu thêm
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => openModal()}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  Đăng ký ngay
                  <span className="text-lg">→</span>
                </Button>
              </div>

              {/* Stats - Simple minimal */}
              <div 
                className={`mt-16 pt-8 border-t border-gray-200 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <StatGrid stats={HERO_STATS} />
              </div>
            </div>
          </div>

          {/* Right Image - 7 columns */}
          <div className="lg:col-span-7 flex items-center order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-sm overflow-hidden">
              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-gray-400 text-sm">Loading...</div>
                </div>
              )}
              
              {/* Images */}
              {!isLoading && slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={slide.content || `Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
              ))}

              {/* Minimal Navigation - Bottom */}
              {!isLoading && slides.length > 0 && (
                <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-10">
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
