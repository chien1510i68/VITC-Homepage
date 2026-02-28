"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { fetchActiveSlidesByType } from '@/lib/api';
import type { BackendSlide } from '@/types/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface BannerCarouselSectionProps {
  autoPlayDelay?: number;
  className?: string;
}

/**
 * Normalize image URL to handle various backend URL formats
 * - Removes query parameters that may interfere with Next.js Image Optimizer
 * - Handles relative and absolute URLs
 * - Provides fallback for invalid URLs
 */
function normalizeImageUrl(url: string | undefined): string {
  if (!url) return '/images/placeholder-banner.jpg';

  try {
    // Remove query parameters
    const cleanUrl = url.split('?')[0] ?? url;

    // If it's already a full URL, return as is
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      return cleanUrl;
    }

    // If it's a relative path, ensure it starts with /
    return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
  } catch (error) {
    console.error('Error normalizing image URL:', error);
    return '/images/placeholder-banner.jpg';
  }
}

export default function BannerCarouselSection({
  autoPlayDelay = 5000,
  className = '',
}: BannerCarouselSectionProps) {
  const [banners, setBanners] = useState<BackendSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadBanners() {
      try {
        setIsLoading(true);
        const data = await fetchActiveSlidesByType('BANNER');
        if (data && data.length > 0) {
          setBanners(data);
        }
      } catch (error) {
        console.error('❌ Failed to load banner slides:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBanners();
  }, []);

  const handleImageError = (bannerId: string) => {
    console.error(`❌ Failed to load image for banner: ${bannerId}`);
    setImageErrors(prev => new Set(prev).add(bannerId));
  };

  if (isLoading) {
    return (
      <section className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen ${className}`}>
        <div className="h-[160px] sm:h-[220px] md:h-[280px] lg:h-[380px] xl:h-[420px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-600 font-medium">Đang tải banner...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        autoplay={{
          delay: autoPlayDelay,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={banners.length > 1}
        className="h-[160px] sm:h-[220px] md:h-[280px] lg:h-[380px] xl:h-[420px]"
      >
        {banners.map((banner) => {
          const imageUrl = normalizeImageUrl(banner.imageUrl);
          const hasError = imageErrors.has(banner.id);

          return (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                {/* Background Image */}
                {!hasError && (
                  <Image
                    src={imageUrl}
                    alt={banner.content || `Banner ${banner.id}`}
                    fill
                    className="object-cover md:object-fill"
                    priority={banner.id === banners[0]?.id}
                    unoptimized
                    quality={100}
                    onError={() => handleImageError(banner.id)}
                    sizes="100vw"
                  />
                )}

                {/* Fallback UI khi ảnh lỗi */}
                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="font-medium">Banner không khả dụng</p>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 6px;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
