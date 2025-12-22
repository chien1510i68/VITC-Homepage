'use client';

import { useEffect, useRef } from 'react';

export function useAutoTimeout(callback: () => void, delay: number, deps: any[] = []) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(callback, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { clear };
}
