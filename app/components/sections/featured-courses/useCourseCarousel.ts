import { useState } from 'react';

export function useCourseCarousel() {
  const [activeView, setActiveView] = useState<'all' | 'compact'>('all');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = (element: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = element;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return {
    activeView,
    setActiveView,
    canScrollLeft,
    canScrollRight,
    updateScrollButtons,
    scrollLeft,
    scrollRight
  };
}