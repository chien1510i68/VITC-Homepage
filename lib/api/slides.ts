import { apiFetch } from './base';
import { BackendSlide, SlideFilterRequest } from '@/types/api';

/**
 * Fetch slides from backend with filters
 * POST /api/v1/slides/filter
 */
export async function fetchSlides(
  filters: SlideFilterRequest = {}
): Promise<BackendSlide[]> {
  try {
    const response = await apiFetch('/api/v1/slides/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
      cache: 'no-store', // Always get fresh data for slides
    });

    if (!response.ok) {
      console.error('Failed to fetch slides:', response.statusText);
      return [];
    }

    const result = await response.json();

    // Handle backend response format: { success: true, data: [...] }
    if (result.success && Array.isArray(result.data)) {
      let filteredData = result.data;
      
      // Client-side defensive filtering by status if requested
      if (filters.status) {
        filteredData = filteredData.filter((slide: BackendSlide) => slide.status === filters.status);
      }

      // Sort by orderIndex ascending
      return filteredData.sort((a: BackendSlide, b: BackendSlide) => 
        a.orderIndex - b.orderIndex
      );
    }

    console.error('Invalid slides response format:', result);
    return [];
  } catch (error) {
    console.error('Error fetching slides:', error);
    return [];
  }
}

import { getSlidesFromCache, saveSlidesToCache } from '@/lib/cache/slidesCache';

// Memory cache for ongoing requests to prevent duplicates
const ongoingRequests = new Map<string, Promise<BackendSlide[]>>();

/**
 * Fetch active slides for a specific type with caching and deduplication
 */
export async function fetchActiveSlidesByType(
  type: 'IT' | 'SOFT_SKILLS' | 'HOME' | 'BANNER' | 'IT-KM'
): Promise<BackendSlide[]> {
  // SSR check - no cache on server
  if (typeof window === 'undefined') {
    console.log(`🖥️ Server-side fetch for ${type}`);
    return fetchSlides({ type, status: 'ACTIVE' });
  }

  // 1. Try to get from cache first for instant UI response
  const cachedData = getSlidesFromCache(type);

  if (cachedData && cachedData.length > 0) {
    // Return cached data immediately and DON'T call API if fresh
    console.log(`⚡ fetchActiveSlidesByType('${type}'): Using cached data (${cachedData.length} items)`);
    return cachedData;
  }

  // 2. If no cache, check if there's already an active request for this type
  if (ongoingRequests.has(type)) {
    console.log(`⏳ fetchActiveSlidesByType('${type}'): Waiting for ongoing request...`);
    return ongoingRequests.get(type)!;
  }

  // 3. Fire new request
  console.log(`🚀 fetchActiveSlidesByType('${type}'): Fetching from API...`);
  const requestPromise = (async () => {
    try {
      const data = await fetchSlides({ type, status: 'ACTIVE' });
      saveSlidesToCache(type, data);
      console.log(`✅ fetchActiveSlidesByType('${type}'): Fetched ${data.length} items from API & saved to cache`);
      return data;
    } catch (error) {
      console.error(`❌ fetchActiveSlidesByType('${type}'): Error fetching slides`, error);
      return [];
    } finally {
      // Clean up deduplication map
      console.log(`🧹 fetchActiveSlidesByType('${type}'): Cleaned up ongoing request`);
      ongoingRequests.delete(type);
    }
  })();

  ongoingRequests.set(type, requestPromise);
  return requestPromise;
}
