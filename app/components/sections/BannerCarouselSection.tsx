"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { fetchActiveSlidesByType } from '@/lib/api';
import type { BackendSlide } from '@/types/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Banner configuration constants
const BANNER_CONFIG = {
  WIDTH: 1360,
  HEIGHT: 450,
  ASPECT_RATIO: 1360 / 380,
  AUTOPLAY_DELAY: 5000,
} as const;

interface BannerCarouselSectionProps {
  autoPlayDelay?: number;
  className?: string;
}

/**
 * Normalize image URL to handle various backend URL formats
 */
const normalizeImageUrl = (url: string | undefined): string => {
  if (!url) return '/images/placeholder-banner.jpg';

  try {
    const cleanUrl = url.split('?')[0] ?? url;
    
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      return cleanUrl;
    }
    
    return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
  } catch (error) {
    console.error('Error normalizing image URL:', error);
    return '/images/placeholder-banner.jpg';
  }
};

/**
 * BannerCarouselSection Component
 * 
 * Displays a full-width responsive banner carousel optimized for 1360x540px images
 * - No padding/letterboxing
 * - Responsive scaling maintaining aspect ratio
 * - Auto-play with smooth transitions
 */
export default function BannerCarouselSection({
  autoPlayDelay = BANNER_CONFIG.AUTOPLAY_DELAY,
  className = '',
}: BannerCarouselSectionProps) {
  const [banners, setBanners] = useState<BackendSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await fetchActiveSlidesByType('BANNER');
        if (data?.length > 0) {
          setBanners(data);
        }
      } catch (error) {
        console.error('Failed to load banner slides:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();
  }, []);

  const handleImageError = (bannerId: string) => {
    console.error(`Failed to load banner image: ${bannerId}`);
    setImageErrors((prev) => new Set(prev).add(bannerId));
  };

  // Loading state
  if (isLoading) {
    return (
      <section className={`relative w-full overflow-hidden ${className}`}>
        <div 
          className="w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200"
          style={{ height: `calc(100vw / ${BANNER_CONFIG.ASPECT_RATIO})`, maxHeight: `${BANNER_CONFIG.HEIGHT}px` }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-slate-600">Đang tải banner...</span>
          </div>
        </div>
      </section>
    );
  }

  // No banners available
  if (banners.length === 0) {
    return null;
  }

  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={banners.length > 1}
        autoplay={{
          delay: autoPlayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        style={{ 
          height: `calc(100vw / ${BANNER_CONFIG.ASPECT_RATIO})`,
          maxHeight: `${BANNER_CONFIG.HEIGHT}px`,
        }}
        className="w-full"
      >
        {banners.map((banner, index) => {
          const imageUrl = normalizeImageUrl(banner.imageUrl);
          const hasError = imageErrors.has(banner.id);

          return (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                {!hasError ? (
                  <Image
                    src={imageUrl}
                    alt={banner.content || `Banner slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                    className="object-fill"
                    onError={() => handleImageError(banner.id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                    <div className="text-center text-slate-500">
                      <svg 
                        className="w-16 h-16 mx-auto mb-3 opacity-50" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                      </svg>
                      <p className="text-sm font-medium">Không thể tải banner</p>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Swiper Custom Styles */}
      <style jsx global>{`
        /* Navigation Buttons */
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
        }

        /* Hide navigation on mobile */
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }

        /* Pagination Bullets */
        .swiper-pagination {
          bottom: 16px !important;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 28px;
          border-radius: 5px;
          background: white;
        }
      `}</style>
    </section>
  );
}
