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
export * from './documents';
export * from './slides';

// Export unified API object for backward compatibility
import { 
  getCourses, 
  getCourseById, 
  getCoursesByCategory,
  getFeaturedCourses,
  searchCourses,
  getCourseBySlug,
  getCoursesBasicInfo,
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
import { lookupExamResults, lookupCertificate, lookupCertificateByCCCD, lookupExamResultsByCCCD } from './lookup';
import { submitConsultationForm, submitCourseRegistration } from './forms';

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
  getCoursesBasicInfo,
  
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
  lookupExamResultsByCCCD, // New API
  lookupCertificate,
  lookupCertificateByCCCD,
  
  // Forms
  submitConsultationForm,
  submitCourseRegistration,
};

export default api;
