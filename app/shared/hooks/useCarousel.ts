'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UseCarouselOptions {
  itemsCount: number;
  autoPlay?: boolean;
  interval?: number;
  initialIndex?: number;
}

export interface UseCarouselReturn {
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

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemsCount);
    setProgress(0);
  }, [itemsCount]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
    setProgress(0);
  }, [itemsCount]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < itemsCount) {
      setCurrentIndex(index);
      setProgress(0);
    }
  }, [itemsCount]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || itemsCount <= 1) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + (100 / (interval / 50));
        if (nextProgress >= 100) {
          next();
          return 0;
        }
        return nextProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
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
