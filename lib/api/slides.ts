import { API_BASE_URL } from './base';
import { BackendSlide, SlideFilterRequest } from '@/types/api';

/**
 * Fetch slides from backend with filters
 * POST /api/v1/slides/filter
 */
export async function fetchSlides(
  filters: SlideFilterRequest = {}
): Promise<BackendSlide[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/slides/filter`, {
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
      // Sort by orderIndex ascending
      return result.data.sort((a: BackendSlide, b: BackendSlide) => 
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
  type: 'IT' | 'SOFT_SKILLS' | 'HOME'
): Promise<BackendSlide[]> {
  return fetchSlides({ type, status: 'ACTIVE' });
}
