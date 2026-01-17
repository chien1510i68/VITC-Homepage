import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCarouselOptions {
  itemsCount: number;
  autoPlay?: boolean;
  interval?: number;
  initialIndex?: number;
}

interface UseCarouselReturn {
  currentIndex: number;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (value: boolean) => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  progress: number;
}

export function useCarousel({
  itemsCount,
  autoPlay = true,
  interval = 5000,
  initialIndex = 0,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemsCount);
    setProgress(0);
  }, [itemsCount]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
    setProgress(0);
  }, [itemsCount]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || itemsCount <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed % interval) / interval;
      setProgress(newProgress);
      
      if (elapsed >= interval) {
        next();
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying, interval, itemsCount, next]);

  return {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    next,
    prev,
    goTo,
    progress,
  };
}
