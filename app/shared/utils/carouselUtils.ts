/**
 * Carousel utility functions
 */

export interface TransformConfig {
  translateX: number;
  scale: number;
  zIndex: number;
  opacity: number;
}

/**
 * Calculate transform properties for carousel items based on position
 */
export function calculateTransform(
  position: number,
  visibleCount: 1 | 3 | 5 = 1
): TransformConfig {
  const isCenter = position === 0;
  
  if (visibleCount === 1) {
    // Single item view - simple fade
    return {
      translateX: position * 100,
      scale: isCenter ? 1 : 0.8,
      zIndex: isCenter ? 10 : 1,
      opacity: isCenter ? 1 : 0,
    };
  }

  if (visibleCount === 3) {
    // 3-item view
    if (isCenter) {
      return { translateX: 0, scale: 1, zIndex: 10, opacity: 1 };
    }
    
    if (Math.abs(position) === 1) {
      return {
        translateX: position * 110,
        scale: 0.85,
        zIndex: 5,
        opacity: 0.7,
      };
    }
    
    return {
      translateX: position * 120,
      scale: 0.7,
      zIndex: 1,
      opacity: 0,
    };
  }

  // 5-item view
  if (isCenter) {
    return { translateX: 0, scale: 1, zIndex: 10, opacity: 1 };
  }
  
  if (Math.abs(position) === 1) {
    return {
      translateX: position * 120,
      scale: 0.85,
      zIndex: 5,
      opacity: 0.5,
    };
  }
  
  if (Math.abs(position) === 2) {
    return {
      translateX: position * 140,
      scale: 0.75,
      zIndex: 1,
      opacity: 0.3,
    };
  }
  
  return {
    translateX: position * 160,
    scale: 0.6,
    zIndex: 0,
    opacity: 0,
  };
}

/**
 * Get visible items for a carousel based on current index and visible count
 */
export function getVisibleItems<T>(
  items: T[],
  currentIndex: number,
  visibleCount: 1 | 3 | 5 = 1
): Array<{ item: T; position: number; originalIndex: number }> {
  const total = items.length;
  const halfVisible = Math.floor(visibleCount / 2);
  const result: Array<{ item: T; position: number; originalIndex: number }> = [];

  for (let i = -halfVisible; i <= halfVisible; i++) {
    const index = (currentIndex + i + total) % total;
    result.push({
      item: items[index],
      position: i,
      originalIndex: index,
    });
  }

  return result;
}

/**
 * Calculate progress percentage for auto-play indicator
 */
export function calculateProgress(
  startTime: number,
  currentTime: number,
  duration: number
): number {
  const elapsed = currentTime - startTime;
  return Math.min((elapsed / duration) * 100, 100);
}
