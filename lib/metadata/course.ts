/**
 * Metadata utilities for course pages
 */

import { Metadata } from 'next';
import { getCourseById } from '@/lib/api/courses';
import { siteConfig } from '@/config/site.config';

export async function generateCourseMetadata(
  id: string
): Promise<Metadata> {
  try {
    const course = await getCourseById(parseInt(id));
    
    if (!course) {
      return {
        title: 'Không tìm thấy khóa học',
        description: 'Khóa học bạn đang tìm kiếm không tồn tại.',
      };
    }

    const title = `${course.title} - Khóa học ${course.category}`;
    const description = course.description || siteConfig.description;
    const url = `${siteConfig.url}/khoa-hoc/${id}`;

    return {
      title,
      description,
      keywords: [
        course.title,
        course.category,
        course.level,
        'khóa học',
        'đào tạo',
        ...course.highlights || [],
      ],
      openGraph: {
        title,
        description,
        url,
        type: 'website',
        images: [
          {
            url: course.image,
            width: 1200,
            height: 630,
            alt: course.title,
          },
        ],
        siteName: siteConfig.name,
        locale: 'vi_VN',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [course.image],
      },
      alternates: {
        canonical: url,
      },
      // Structured Data (JSON-LD) will be added in the page component
    };
  } catch (error) {
    console.error('Error generating course metadata:', error);
    return {
      title: 'Khóa học - VITC',
      description: siteConfig.description,
    };
  }
}

/**
 * Generate JSON-LD structured data for course
 */
export function generateCourseStructuredData(course: any) {
  const instructor = typeof course.instructor === 'string' 
    ? { name: course.instructor }
    : course.instructor;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'VITC',
      sameAs: siteConfig.url,
    },
    instructor: instructor ? {
      '@type': 'Person',
      name: instructor.name,
      description: instructor.title || '',
    } : undefined,
    image: course.image,
    aggregateRating: course.rating ? {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      ratingCount: parseInt(course.students) || 100,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: course.price.replace(/[^\d]/g, '') || '0',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
    coursePrerequisites: course.requirements?.join(', '),
    educationalLevel: course.level,
    timeRequired: course.duration,
  };
}
