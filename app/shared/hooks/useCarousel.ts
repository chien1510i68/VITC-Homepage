import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
  totalSlides: number;
  autoPlayInterval?: number;
  initialSlide?: number;
}

interface UseCarouselReturn {
  currentSlide: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

export function useCarousel({
  totalSlides,
  autoPlayInterval = 5000,
  initialSlide = 0,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, nextSlide]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
