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

/**
 * Fetch active slides for a specific type
 */
export async function fetchActiveSlidesByType(
  type: 'IT' | 'SOFT_SKILLS' | 'HOME' | 'BANNER' | 'IT-KM'
): Promise<BackendSlide[]> {
  return fetchSlides({ type, status: 'ACTIVE' });
}
