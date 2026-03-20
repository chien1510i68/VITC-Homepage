'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { fetchActiveSlidesByType } from '@/lib/api';
import type { BackendSlide } from '@/types/api';

import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PromotionsBannerProps {
  onOpen: () => void;
}

export function PromotionsBanner({ onOpen }: PromotionsBannerProps) {
  const [slides, setSlides] = useState<BackendSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSlides() {
      try {
        setIsLoading(true);
        const data = await fetchActiveSlidesByType('IT-KM');
        setSlides(data || []);
      } catch (error) {
        console.error('Failed to load IT-KM slides:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSlides();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-4 h-32 flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      {(slides.length === 1 && slides[0]) ? (() => {
        const slide = slides[0];
        return (
          <div className="relative w-full aspect-[16/4.5] overflow-hidden rounded-xl shadow-md group">
            <Image
              src={slide.imageUrl}
              alt={slide.content || 'Promotion'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            {slide.content && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-bold text-sm">{slide.content}</p>
              </div>
            )}
          </div>
        );
      })() : (
        <div className="relative w-full aspect-[16/4.5] overflow-hidden rounded-xl shadow-md bg-white group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.content || 'Promotion'}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {slide.content && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white font-bold text-sm">{slide.content}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .swiper-button-next, .swiper-button-prev {
              color: white;
              background: rgba(0, 0, 0, 0.2);
              width: 32px;
              height: 32px;
              border-radius: 50%;
              backdrop-filter: blur(4px);
              opacity: 0;
              transition: all 0.3s ease;
            }
            .group:hover .swiper-button-next,
            .group:hover .swiper-button-prev {
              opacity: 1;
            }
            .swiper-button-next:after, .swiper-button-prev:after {
              font-size: 14px;
              font-weight: bold;
            }
            .swiper-pagination-bullet-active {
              background: white !important;
            }
          `}</style>
        </div>
      )}

      {/* Registration Button */}
      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => onOpen()}
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-5 rounded-full shadow-lg shadow-green-100 hover:shadow-green-200 transition-all hover:-translate-y-0.5"
        >
          ĐĂNG KÝ NGAY
        </Button>
      </div>
    </div>
  );
}
