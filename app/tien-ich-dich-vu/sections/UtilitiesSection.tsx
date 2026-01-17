"use client";

import { TAILWIND_COLORS } from '@/lib/colors';
import { useAutoCarousel } from '../hooks/useAutoCarousel';
import { UTILITIES } from '../constants';
import { UtilityCard, CarouselNavigation } from '../components';

export function UtilitiesSection() {
  const { currentIndex, handlePrevious, handleNext } = useAutoCarousel({
    totalItems: UTILITIES.length,
    autoPlayInterval: 3000,
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-block ${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
            Tiện ích
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Các tiện ích hỗ trợ học viên
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tra cứu thông tin, tải tài liệu và sử dụng các công cụ hỗ trợ học tập
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-8">
          <CarouselNavigation 
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          {/* Cards Container */}
          <div className="relative flex items-center justify-center h-[450px] md:h-[500px] overflow-hidden">
            {UTILITIES.map((utility, relativeIndex) => {
              const actualIndex = (relativeIndex - currentIndex + UTILITIES.length) % UTILITIES.length;
              const position = actualIndex - 1;
              const isCenter = position === 0;

              return (
                <UtilityCard
                  key={utility.id}
                  utility={utility}
                  isCenter={isCenter}
                  position={position}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
