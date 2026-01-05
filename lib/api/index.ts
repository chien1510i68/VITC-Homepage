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
import { getCourses, getCourseById, getCoursesByCategory } from './courses';
import { getInstructors, getInstructorById } from './instructors';
import { getNews, getNewsById } from './news';
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
  
  // Instructors
  getInstructors,
  getInstructorById,
  
  // News
  getNews,
  getNewsById,
  
  // Lookup
  lookupExamResults,
  lookupCertificate,
  
  // Forms
  submitConsultationForm,
};

export default api;
