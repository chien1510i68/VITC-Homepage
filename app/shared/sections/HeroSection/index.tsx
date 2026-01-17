'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSectionProps } from './types';
import { DEFAULT_PROPS } from './constants';
import { fetchActiveSlidesByType } from '@/lib/api';
import type { BackendSlide } from '@/types/api';

/**
 * HeroSection Component
 * 
 * Full-width hero carousel with auto-play, navigation, and indicators
 * 
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <HeroSection />
 * 
 * // Custom slides
 * <HeroSection
 *   slides={customSlides}
 *   height="h-screen"
 *   autoPlayInterval={3000}
 * />
 * 
 * // Without navigation
 * <HeroSection
 *   showNavigation={false}
 *   showIndicators={false}
 * />
 * ```
 */
export default function HeroSection({
  slides = DEFAULT_PROPS.slides,
  height = DEFAULT_PROPS.height,
  autoPlayInterval = DEFAULT_PROPS.autoPlayInterval,
  showNavigation = DEFAULT_PROPS.showNavigation,
  showIndicators = DEFAULT_PROPS.showIndicators,
  className = DEFAULT_PROPS.className,
  imageQuality = DEFAULT_PROPS.imageQuality,
  transitionDuration = DEFAULT_PROPS.transitionDuration,
}: HeroSectionProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlayInterval > 0);
  const [apiSlides, setApiSlides] = useState<BackendSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slides from API
  useEffect(() => {
    async function loadSlides() {
      try {
        setIsLoading(true);
        const data = await fetchActiveSlidesByType('IT');
        if (data && data.length > 0) {
          setApiSlides(data);
        }
      } catch (error) {
        console.error('Failed to load hero slides:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSlides();
  }, []);

  // Use API slides if available, otherwise fall back to props/default
  const displaySlides = apiSlides.length > 0 
    ? apiSlides.map(slide => ({
        id: slide.id,
        image: slide.imageUrl,
        title: slide.content || '',
      }))
    : slides;

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || autoPlayInterval === 0 || isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, displaySlides.length, isLoading]);

  /**
   * Navigate to specific slide and pause auto-play
   */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  /**
   * Go to next slide and pause auto-play
   */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    setIsAutoPlaying(false);
  };

  /**
   * Go to previous slide and pause auto-play
   */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className={`relative w-full ${height} overflow-hidden ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      
      {/* Slides */}
      {!isLoading && displaySlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ transitionDuration: `${transitionDuration}ms` }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              fill
              className="object-cover object-center sm:object-center md:object-center"
              priority={index === 0}
              sizes="100vw"
              quality={imageQuality}
            />
          </div>

        </div>
      ))}

      {/* Navigation Arrows */}
      {!isLoading && showNavigation && displaySlides.length > 1 && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 
                       w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                       rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 
                       w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                       rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {!isLoading && showIndicators && displaySlides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5 md:gap-3">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-6 sm:w-7 md:w-8'
                  : 'bg-white/50 hover:bg-white/70 w-2 sm:w-2.5 md:w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
