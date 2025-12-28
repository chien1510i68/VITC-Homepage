import { useState, useEffect, useCallback } from 'react';

/**
 * Options for useCountUp hook
 */
export interface UseCountUpOptions {
  /** Target numbers to count up to */
  targets: number[];
  
  /** Animation duration in milliseconds */
  duration?: number;
  
  /** Start animation on mount */
  startOnMount?: boolean;
}

/**
 * Return type for useCountUp hook
 */
export interface UseCountUpReturn {
  /** Current count values */
  counts: number[];
  
  /** Start the animation */
  start: () => void;
  
  /** Reset to zero */
  reset: () => void;
}

/**
 * Easing function for smooth animation
 */
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

/**
 * useCountUp Hook
 * 
 * Animates numbers from 0 to target values with easing
 * 
 * @example
 * ```tsx
 * const { counts, start } = useCountUp({
 *   targets: [100, 200, 300],
 *   duration: 2000,
 * });
 * 
 * const isVisible = useIntersectionObserver(ref);
 * 
 * useEffect(() => {
 *   if (isVisible) start();
 * }, [isVisible]);
 * 
 * <div>Students: {counts[0]}</div>
 * <div>Courses: {counts[1]}</div>
 * ```
 */
export function useCountUp({
  targets,
  duration = 1500,
  startOnMount = false,
}: UseCountUpOptions): UseCountUpReturn {
  const [counts, setCounts] = useState<number[]>(targets.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = easeOutQuart(frame / totalFrames);

      setCounts(targets.map((target) => Math.floor(target * progress)));

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setCounts(targets);
      }
    };

    requestAnimationFrame(animate);
  }, [targets, duration, hasStarted]);

  const reset = useCallback(() => {
    setHasStarted(false);
    setCounts(targets.map(() => 0));
  }, [targets]);

  useEffect(() => {
    if (startOnMount) {
      start();
    }
  }, [startOnMount, start]);

  return { counts, start, reset };
}
