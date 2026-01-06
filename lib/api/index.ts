// Main API exports for VITC Homepage
// Import from this file in your components

// Export types
export * from './types';
export * from './mockData';

// Export base utilities
export * from './base';

// Export API functions by domain
export * from './courses';
export * from './instructors';
export * from './news';
export * from './schedules';
export * from './about';
export * from './lookup';
export * from './forms';

// Export unified API object for backward compatibility
import { 
  getCourses, 
  getCourseById, 
  getCoursesByCategory,
  getFeaturedCourses,
  searchCourses,
  getCourseBySlug,
  type CourseSearchParams
} from './courses';
import { getInstructors, getInstructorById } from './instructors';
import { 
  getNews, 
  getNewsById, 
  getNewsByCategory,
  searchNews,
  getNewsBySlug
} from './news';
import { getCourseSchedules } from './schedules';
import { getAboutTimeline } from './about';
import { lookupExamResults, lookupCertificate } from './lookup';
import { submitConsultationForm } from './forms';

export const api = {
  // About
  getAboutTimeline,
  
  // Course Schedules
  getCourseSchedules,
  
  // Courses
  getCourses,
  getCourseById,
  getCoursesByCategory,
  getFeaturedCourses,
  searchCourses,
  getCourseBySlug,
  
  // Instructors
  getInstructors,
  getInstructorById,
  
  // News
  getNews,
  getNewsById,
  getNewsByCategory,
  searchNews,
  getNewsBySlug,
  
  // Lookup
  lookupExamResults,
  lookupCertificate,
  
  // Forms
  submitConsultationForm,
};

export default api;
