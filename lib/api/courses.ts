// Courses API
import { Program } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockFeaturedCourses, Course } from '@/data/courses';

// Helper function to convert Course to Program
const convertCourseToProgram = (course: Course): Program => {
  // Determine category from categoryCode
  const categoryMap: Record<string, string> = {
    'OFFICE': 'Tin học văn phòng',
    'PROGRAMMING': 'Lập trình',
    'SOFTSKILLS': 'Kỹ năng mềm',
    'MARKETING': 'Digital Marketing',
    'ANALYSIS': 'Phân tích dữ liệu',
    'GIS': 'GIS',
    'CAD': 'Thiết kế kỹ thuật',
    'DESIGN': 'Thiết kế',
    'MANAGEMENT': 'Quản lý'
  };

  const category = categoryMap[course.categoryCode || ''] || 'Khác';
  
  // Format price
  const priceFormatted = course.price > 0 
    ? `${course.price.toLocaleString('vi-VN')}đ` 
    : 'Liên hệ';

  // Calculate duration and sessions
  const durationHours = course.duration || 0;
  const durationText = durationHours > 0 ? `${durationHours} giờ` : 'Liên hệ';
  const sessionsText = durationHours > 0 
    ? `${Math.ceil(durationHours / 20)} tháng` 
    : 'Liên hệ';

  return {
    id: parseInt(course.id),
    title: course.title,
    category: category,
    description: course.descriptionHtml?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '',
    fullDescription: course.descriptionHtml || '',
    image: course.thumbnailUrl || 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
    duration: durationText,
    students: '100+',
    sessions: sessionsText,
    level: course.level || 'Cơ bản',
    rating: 4.8,
    price: priceFormatted,
    completionRate: '95%',
    highlights: course.highlights || [],
    instructor: course.instructor ? {
      name: course.instructor.username,
      title: 'Giảng viên chính - Chuyên gia ICDL',
      bio: course.instructor.description,
      experience: '8+ năm',
      students: '2500+',
      courses: 12,
      rating: 4.9,
      specialties: ['ICDL', 'Microsoft Office', 'Tin học quốc tế'],
      education: ['Thạc sĩ CNTT - ĐH Quốc gia HN', 'Chứng chỉ giảng viên ICDL'],
      achievements: ['ICDL Certified Trainer', 'Giảng viên xuất sắc 2021', '2500+ học viên đạt chứng chỉ'],
      image: course.instructor.avatarUrl
    } : {
      name: 'Giảng viên VITC',
      title: 'Giảng viên',
      bio: '',
      experience: '5+ năm',
      students: '500+',
      courses: 5,
      rating: 4.8,
      specialties: [course.subject || ''],
      education: [],
      achievements: []
    },
    isHot: parseInt(course.id) <= 6,
    syllabus: course.syllabus || [],
    requirements: course.requirements || [],
    benefits: course.benefitsHtml 
      ? (() => {
          // Try to parse <li> items first
          const liItems = course.benefitsHtml
            .replace(/<ul[^>]*>/gi, '')
            .replace(/<\/ul>/gi, '')
            .match(/<li[^>]*>(.*?)<\/li>/gi)
            ?.map(item => item.replace(/<\/?li[^>]*>/gi, '').trim())
            .filter(item => item.length > 0);
          
          if (liItems && liItems.length > 0) {
            return liItems;
          }
          
          // If no <li> items, try to parse <p> items with <strong> tags
          const pItems = course.benefitsHtml
            .match(/<p[^>]*>.*?<\/p>/gi)
            ?.map(item => {
              // Extract content after <strong> tag
              const match = item.match(/<strong[^>]*>(.*?)<\/strong>\s*:?\s*(.*?)<\/p>/i);
              if (match) {
                return `${match[1]}: ${match[2].replace(/<[^>]*>/g, '').trim()}`;
              }
              return item.replace(/<[^>]*>/g, '').trim();
            })
            .filter(item => item.length > 0);
          
          return pItems || [];
        })()
      : []
  };
};

// Convert all courses to programs as mock data
const mockPrograms: Program[] = mockFeaturedCourses.map(convertCourseToProgram);

/**
 * Get all courses
 * Falls back to mock data if API fails
 */
export async function getCourses(): Promise<Program[]> {
  try {
    const response = await fetchWithTimeout<Program[]>(`${API_BASE_URL}/courses`);
    
    if (response.success && response.data) {
      console.log('✅ Courses loaded from API');
      return response.data;
    }
    
    console.warn('⚠️ API failed, using mock courses data:', response.error);
    return mockPrograms;
  } catch (error) {
    console.error('❌ Error fetching courses:', error);
    return mockPrograms;
  }
}

/**
 * Get a single course by ID
 * Falls back to mock data if API fails
 */
export async function getCourseById(id: number): Promise<Program | null> {
  try {
    const response = await fetchWithTimeout<Program>(`${API_BASE_URL}/courses/${id}`);
    
    if (response.success && response.data) {
      console.log(`✅ Course ${id} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, using mock course data for id ${id}:`, response.error);
    return mockPrograms.find(p => p.id === id) || null;
  } catch (error) {
    console.error(`❌ Error fetching course ${id}:`, error);
    return mockPrograms.find(p => p.id === id) || null;
  }
}

/**
 * Get courses by category
 * Falls back to mock data if API fails
 */
export async function getCoursesByCategory(category: string): Promise<Program[]> {
  try {
    const response = await fetchWithTimeout<Program[]>(
      `${API_BASE_URL}/courses?category=${encodeURIComponent(category)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Courses for category "${category}" loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, filtering mock courses by category "${category}":`, response.error);
    if (category === 'Tất cả') {
      return mockPrograms;
    }
    return mockPrograms.filter(p => p.category === category);
  } catch (error) {
    console.error(`❌ Error fetching courses by category ${category}:`, error);
    if (category === 'Tất cả') {
      return mockPrograms;
    }
    return mockPrograms.filter(p => p.category === category);
  }
}
