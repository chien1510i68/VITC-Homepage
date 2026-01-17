import { useState, useEffect, useCallback } from 'react';

interface UseAutoCarouselProps {
  totalItems: number;
  autoPlayInterval?: number;
}

export function useAutoCarousel({ 
  totalItems, 
  autoPlayInterval = 3000 
}: UseAutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (totalItems === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [totalItems, autoPlayInterval]);

  return {
    currentIndex,
    handlePrevious,
    handleNext,
  };
}
