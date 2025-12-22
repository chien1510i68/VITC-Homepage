'use client';

import React, { useRef } from 'react';
import { CarouselProps } from '../types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useCarousel } from '../hooks';

export function Carousel<T>({
  items,
  renderItem,
  autoPlay = true,
  interval = 5000,
  showNavigation = true,
  showIndicators = true,
  className,
}: CarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    next,
    prev,
    goTo,
    progress,
  } = useCarousel({
    itemsCount: items.length,
    autoPlay,
    interval,
  });

  const handlePrev = () => {
    setIsAutoPlaying(false);
    prev();
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    next();
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoPlaying(false);
    goTo(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="relative w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full"
              style={{ width: '100%' }}
            >
              {renderItem(item, index, index === currentIndex)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      {showNavigation && items.length > 1 && (
        <>
          {/* Previous button */}
          <button
            onClick={handlePrev}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 md:w-12 md:h-12 rounded-full',
              'bg-white/90 backdrop-blur-sm shadow-lg',
              'flex items-center justify-center',
              'text-gray-700 hover:text-sky-600',
              'transition-all hover:scale-110',
              'group'
            )}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 md:w-12 md:h-12 rounded-full',
              'bg-white/90 backdrop-blur-sm shadow-lg',
              'flex items-center justify-center',
              'text-gray-700 hover:text-sky-600',
              'transition-all hover:scale-110',
              'group'
            )}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </button>

          {/* Auto-play toggle */}
          <button
            onClick={toggleAutoPlay}
            className={cn(
              'absolute bottom-4 left-4 z-10',
              'w-8 h-8 md:w-10 md:h-10 rounded-full',
              'bg-white/90 backdrop-blur-sm shadow-lg',
              'flex items-center justify-center',
              'text-gray-700 hover:text-sky-600',
              'transition-all hover:scale-110'
            )}
            aria-label={isAutoPlaying ? 'Pause' : 'Play'}
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={cn(
                'relative h-2 rounded-full transition-all overflow-hidden',
                currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress bar for current slide */}
              {currentIndex === index && isAutoPlaying && (
                <div
                  className="absolute inset-0 bg-sky-600 origin-left"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: 'transform 50ms linear',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
