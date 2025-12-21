"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop',
];

export default function HeroSoftSkills() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

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
                <button className="px-8 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                  Tìm hiểu thêm
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2">
                  Đăng ký ngay
                  <span className="text-lg">→</span>
                </button>
              </div>

              {/* Stats - Simple minimal */}
              <div 
                className={`mt-16 pt-8 border-t border-gray-200 grid grid-cols-3 gap-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div>
                  <div className="text-2xl font-light text-gray-900 mb-1">10K+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Học viên</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900 mb-1">50+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Khóa học</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-gray-900 mb-1">95%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Hài lòng</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - 7 columns */}
          <div className="lg:col-span-7 flex items-center order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-sm overflow-hidden">
              {/* Images */}
              {CAROUSEL_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
              ))}

              {/* Minimal Navigation - Bottom */}
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-10">
                {/* Arrow buttons - minimal */}
                <button
                  onClick={handlePrevious}
                  aria-label="Previous"
                  className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2">
                  {CAROUSEL_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className="group p-1"
                    >
                      <div 
                        className={`h-0.5 transition-all duration-300 ${
                          index === currentSlide 
                            ? 'w-8 bg-white' 
                            : 'w-4 bg-white/50 group-hover:bg-white/80'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  aria-label="Next"
                  className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200"
                >
                  <ChevronRight className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
