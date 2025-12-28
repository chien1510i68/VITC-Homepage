import { useState, useEffect } from 'react';

export function useTestimonialCarousel(totalTestimonials: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalTestimonials]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % totalTestimonials);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const previousTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + totalTestimonials) % totalTestimonials);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return {
    currentIndex,
    goToTestimonial,
    nextTestimonial,
    previousTestimonial,
    isAutoPlaying
  };
}