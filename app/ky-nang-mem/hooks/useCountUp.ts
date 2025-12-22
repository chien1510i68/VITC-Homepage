import { useState, useEffect, useCallback } from 'react';

interface UseCountUpOptions {
  targets: number[];
  duration?: number;
  startOnMount?: boolean;
}

interface UseCountUpReturn {
  counts: number[];
  start: () => void;
  reset: () => void;
}

const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

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
    setCounts(targets.map(() => 0));
    setHasStarted(false);
  }, [targets]);

  useEffect(() => {
    if (startOnMount && !hasStarted) {
      start();
    }
  }, [startOnMount, start, hasStarted]);

  return { counts, start, reset };
}
