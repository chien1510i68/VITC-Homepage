import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Return type for useScrollable hook
 */
export interface UseScrollableReturn {
  /** Ref to attach to scrollable element */
  scrollRef: React.RefObject<HTMLDivElement | null>;
  
  /** Can scroll left */
  canScrollLeft: boolean;
  
  /** Can scroll right */
  canScrollRight: boolean;
  
  /** Scroll left by scrollAmount */
  scrollLeft: () => void;
  
  /** Scroll right by scrollAmount */
  scrollRight: () => void;
}

/**
 * useScrollable Hook
 * 
 * Manages horizontal scrolling with left/right controls
 * 
 * @param scrollAmount - Pixels to scroll per action (default: 400)
 * 
 * @example
 * ```tsx
 * const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useScrollable(300);
 * 
 * <div>
 *   <button onClick={scrollLeft} disabled={!canScrollLeft}>←</button>
 *   <div ref={scrollRef} className="overflow-x-auto">
 *     {items.map(item => <div key={item.id}>{item.name}</div>)}
 *   </div>
 *   <button onClick={scrollRight} disabled={!canScrollRight}>→</button>
 * </div>
 * ```
 */
export function useScrollable(scrollAmount = 400): UseScrollableReturn {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scrollLeftFn = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [scrollAmount]);

  const scrollRightFn = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [scrollAmount]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkScroll();
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [checkScroll]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft: scrollLeftFn,
    scrollRight: scrollRightFn,
  };
}
