/**
 * News & Announcements Types
 * Type definitions for news articles and announcements
 */

/**
 * News Category from backend
 */
export interface NewsCategory {
  id: string;
  code: string;
  name: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Backend News Model
 * Matches the Java backend News entity
 */
export interface BackendNews {
  id: string;
  title: string;
  summary?: string;
  contentHtml?: string;
  imageUrl?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  type?: string; // Danh mục nội dung: IT, SOFT_SKILLS, etc.
  category: 'NEWS' | 'ANNOUNCEMENT' | 'EVENT'; // Loại bài viết
  slug?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

/**
 * Frontend News Article Display Model
 */
export interface NewsArticle {
  id: number | string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: 'NEWS' | 'ANNOUNCEMENT' | 'EVENT'; // Loại bài viết
  type?: string; // Danh mục nội dung: IT, SOFT_SKILLS
  slug?: string;
  content?: string;
}
