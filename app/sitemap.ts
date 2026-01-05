/**
 * Dynamic Sitemap Generation
 * Automatically generates sitemap.xml for SEO
 */

import { MetadataRoute } from 'next';
import { getCourses } from '@/lib/api/courses';
import { getNews } from '@/lib/api/news';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vitc.edu.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/khoa-hoc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tin-hoc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ky-nang-mem`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tin-tuc-thong-bao`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/thu-vien`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tien-ich-dich-vu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic course pages
  let coursePages: MetadataRoute.Sitemap = [];
  try {
    const courses = await getCourses();
    coursePages = courses.map((course) => ({
      url: `${SITE_URL}/khoa-hoc/${course.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching courses for sitemap:', error);
  }

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const news = await getNews();
    newsPages = news.map((article) => ({
      url: `${SITE_URL}/tin-tuc-thong-bao/${article.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching news for sitemap:', error);
  }

  return [...staticPages, ...coursePages, ...newsPages];
}
