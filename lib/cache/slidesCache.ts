/**
 * Slides Cache Utility
 * Manages caching of slides data in sessionStorage with fallback to localStorage
 */

import type { BackendSlide } from '@/types/api';

const SLIDE_CACHE_PREFIX = 'slides_cache_';
const FALLBACK_CACHE_PREFIX = 'slides_fallback_'; // Fallback for privacy mode
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

interface CachedSlides {
  data: BackendSlide[];
  timestamp: number;
}

/**
 * Get slides from cache or return null if expired/not found
 * Tries sessionStorage first, falls back to localStorage
 */
export function getSlidesFromCache(type: string): BackendSlide[] | null {
  if (typeof window === 'undefined') return null;

  try {
    // 1️⃣ Try sessionStorage first
    const cached = sessionStorage.getItem(`${SLIDE_CACHE_PREFIX}${type}`);
    if (cached) {
      const { data, timestamp }: CachedSlides = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp < CACHE_DURATION) {
        console.log(`📦 Cache HIT (sessionStorage): ${type} | ${data.length} items | Age: ${Math.round((now - timestamp) / 1000)}s`);
        return data;
      }
    }

    // 2️⃣ Fallback to localStorage if sessionStorage unavailable or expired
    const fallback = localStorage.getItem(`${FALLBACK_CACHE_PREFIX}${type}`);
    if (fallback) {
      const { data, timestamp }: CachedSlides = JSON.parse(fallback);
      const now = Date.now();

      if (now - timestamp < CACHE_DURATION) {
        console.log(`📦 Cache HIT (localStorage fallback): ${type} | ${data.length} items`);
        return data;
      }
    }

    console.log(`❌ Cache MISS or EXPIRED: ${type}`);
    return null;
  } catch (error) {
    console.warn(`⚠️ Cache read error for ${type}:`, error);
    return null;
  }
}

/**
 * Save slides to cache with fallback strategy
 */
export function saveSlidesToCache(type: string, data: BackendSlide[]): void {
  if (typeof window === 'undefined') return;

  const cacheData: CachedSlides = {
    data,
    timestamp: Date.now(),
  };

  // Try sessionStorage first
  try {
    sessionStorage.setItem(`${SLIDE_CACHE_PREFIX}${type}`, JSON.stringify(cacheData));
    console.log(`✅ Cache SAVED (sessionStorage): ${type} | ${data.length} items`);
    return;
  } catch (error) {
    console.warn(`⚠️ sessionStorage failed for ${type}, trying localStorage...`, error);
  }

  // Fallback to localStorage
  try {
    localStorage.setItem(`${FALLBACK_CACHE_PREFIX}${type}`, JSON.stringify(cacheData));
    console.log(`✅ Cache SAVED (localStorage fallback): ${type} | ${data.length} items`);
  } catch (error) {
    console.error(`❌ Cache save FAILED (both storage) for ${type}:`, error);
  }
}

/**
 * Clear specific slide cache
 */
export function clearSlidesCache(type: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(`${SLIDE_CACHE_PREFIX}${type}`);
}
