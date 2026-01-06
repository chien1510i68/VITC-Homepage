// Course data for featured courses section
import { Course as CourseData } from '@/data/courses';

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

// Helper function to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price).replace('₫', 'đ');
};

// Helper function to extract description from HTML
const extractDescription = (html: string = ''): string => {
  // Remove HTML tags and get first 100 characters
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > 100 ? text.substring(0, 100) + '...' : text;
};

// Convert Course data to simple Course format
export const convertCourse = (course: CourseData): Course => ({
  id: course.id,
  title: course.title,
  description: extractDescription(course.descriptionHtml),
  image: course.thumbnailUrl || "data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f1f5f9'/%3e%3ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='system-ui' font-size='16'%3eCourse%3c/text%3e%3c/svg%3e",
  price: formatPrice(course.price)
});

// Default empty arrays - will be populated from API
export const softSkillsCourses: Course[] = [];
export const computerCourses: Course[] = [];

