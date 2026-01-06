import { NewsArticle } from './types';
import { NewsArticle as BackendNewsArticle } from '@/types/news';

/**
 * Convert backend news to local NewsArticle format for news-cta section
 */
export function convertNewsArticle(backendNews: BackendNewsArticle): NewsArticle {
  return {
    id: backendNews.id,
    title: backendNews.title,
    date: new Date(backendNews.date).toLocaleDateString('vi-VN'),
    thumbnail: backendNews.image || '/images/news/default-news.jpg',
    excerpt: backendNews.description || '',
    slug: backendNews.slug || ''
  };
}

export const courseOptions = [
  { value: '', label: 'Chọn khóa học quan tâm' },
  { value: 'tin-hoc-van-phong', label: 'Tin học văn phòng' },
  { value: 'ke-toan-may-tinh', label: 'Kế toán trên máy tính' },
  { value: 'thiet-ke-do-hoa', label: 'Thiết kế đồ họa' },
  { value: 'ung-dung-cntt', label: 'Ứng dụng CNTT' },
  { value: 'lap-trinh-web', label: 'Lập trình Web' },
  { value: 'khac', label: 'Khóa học khác' }
];