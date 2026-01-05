/**
 * News & Announcements Types
 * Type definitions for news articles and announcements
 */

/**
 * News article structure
 */
export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}
