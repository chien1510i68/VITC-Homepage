/**
 * Courses Cache Utility
 * Manages caching of courses basic info in sessionStorage
 */

import type { CourseBasicInfo } from '@/lib/api/types';

const CACHE_KEY = 'courses_basic_info_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: CourseBasicInfo[];
  timestamp: number;
}

/**
 * Get courses from cache or return null if expired/not found
 */
export function getCoursesFromCache(): CourseBasicInfo[] | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CachedData = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      console.log('✅ Using cached courses data');
      return data;
    } else {
      console.log('⏰ Cache expired, removing old data');
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
  } catch (error) {
    console.error('❌ Error reading courses cache:', error);
    return null;
  }
}

/**
 * Save courses to cache
 */
export function saveCoursesToCache(courses: CourseBasicInfo[]): void {
  try {
    const cacheData: CachedData = {
      data: courses,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('✅ Courses saved to cache');
  } catch (error) {
    console.error('❌ Error saving courses to cache:', error);
  }
}

/**
 * Clear courses cache
 */
export function clearCoursesCache(): void {
  sessionStorage.removeItem(CACHE_KEY);
}
