import { useEffect, useState, RefObject } from 'react';

/**
 * Options for useIntersectionObserver hook
 */
export interface UseIntersectionObserverOptions {
  /** Intersection threshold (0-1) */
  threshold?: number;
  
  /** Root margin for observer */
  rootMargin?: string;
  
  /** Trigger only once */
  triggerOnce?: boolean;
}

/**
 * useIntersectionObserver Hook
 * 
 * Detects when an element enters the viewport using Intersection Observer API
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
 * 
 * <div ref={ref} className={isVisible ? 'fade-in' : 'fade-out'}>
 *   Content
 * </div>
 * ```
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isVisible;
}
