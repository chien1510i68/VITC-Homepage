/**
 * Image utility functions
 * Single Responsibility: Validate and provide fallback for images
 */

/**
 * Check if image URL is valid (not example.com)
 */
export function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  if (url.includes('example.com')) return false;
  return true;
}

/**
 * Get fallback image URL based on type
 * Uses placeholder service for consistent placeholder images
 */
export function getFallbackImage(type: 'announcement' | 'news' | 'course' | 'instructor' | 'leader'): string {
  if (type === 'announcement') {
    // Red/orange placeholder for announcements
    return 'https://placehold.co/400x400/f59e0b/ffffff?text=Thông+báo';
  }
  if (type === 'course') {
    // Green placeholder for courses
    return 'https://placehold.co/600x400/10b981/ffffff?text=Khóa+học';
  }
  if (type === 'instructor' || type === 'leader') {
    // Purple placeholder for instructors/leaders
    return 'https://placehold.co/400x400/8b5cf6/ffffff?text=Giảng+viên';
  }
  // Blue placeholder for news
  return 'https://placehold.co/400x400/3b82f6/ffffff?text=Tin+tức';
}

/**
 * Get safe image URL with fallback
 */
export function getSafeImageUrl(
  url: string | undefined | null,
  type: 'announcement' | 'news' | 'course' | 'instructor' | 'leader'
): string {
  if (isValidImageUrl(url)) {
    return url!;
  }
  return getFallbackImage(type);
}
