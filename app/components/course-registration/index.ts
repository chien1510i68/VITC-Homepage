/**
 * Course Registration Module - Main Export
 * 
 * Export all public components, hooks, and types for easy import
 * 
 * @module app/components/course-registration
 */

// Components
export { default as CourseRegistrationModal } from './CourseRegistrationModal';

// Hooks
export { useCourseRegistration } from './hooks';

// Types
export type { 
  CourseRegistrationFormData,
  CourseRegistrationFormErrors,
  CourseRegistrationFormState 
} from './types';

// Utils
export { 
  validateFormData,
  validateEmail,
  validatePhoneNumber,
  validateDOB,
  getMaxDOBDate 
} from './utils';
