/**
 * Slides Cache Utility
 * Manages caching of slides data in sessionStorage 
 */

import type { BackendSlide } from '@/types/api';

const SLIDE_CACHE_PREFIX = 'slides_cache_';
const CACHE_DURATION = 1000 * 60 * 10; // 5 minutes

interface CachedSlides {
  data: BackendSlide[];
  timestamp: number;
}

/**
 * Get slides from cache or return null if expired/not found
 */
export function getSlidesFromCache(type: string): BackendSlide[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = sessionStorage.getItem(`${SLIDE_CACHE_PREFIX}${type}`);
    if (!cached) return null;

    const { data, timestamp }: CachedSlides = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }

    // Stale but return null for simple flow or return data for SWR
    // For now, let's keep it simple: return null if expired
    return null;
  } catch (error) {
    console.error(`❌ Error reading slides cache for ${type}:`, error);
    return null;
  }
}

/**
 * Save slides to cache
 */
export function saveSlidesToCache(type: string, data: BackendSlide[]): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheData: CachedSlides = {
      data,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(`${SLIDE_CACHE_PREFIX}${type}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error(`❌ Error saving slides cache for ${type}:`, error);
  }
}

/**
 * Clear specific slide cache
 */
export function clearSlidesCache(type: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(`${SLIDE_CACHE_PREFIX}${type}`);
}
