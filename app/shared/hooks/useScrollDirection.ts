'use client';

import { useState, useEffect } from 'react';

export interface UseScrollDirectionOptions {
  hideThreshold?: number;
  showThreshold?: number;
}

export interface UseScrollDirectionReturn {
  isVisible: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
}

export function useScrollDirection({
  hideThreshold = 100,
  showThreshold = 10,
}: UseScrollDirectionOptions = {}): UseScrollDirectionReturn {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      // Show header when scrolling up or near top
      if (currentScrollY < lastScrollY || currentScrollY < showThreshold) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
        setIsVisible(false);
      }
      
      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, hideThreshold, showThreshold]);

  return {
    isVisible,
    scrollY,
    scrollDirection,
  };
}
