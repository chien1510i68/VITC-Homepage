// API Client for VITC Homepage
// This file is kept for backward compatibility
// New code should import from specific modules or use the unified 'api' object

// Re-export everything from the modular API files
export * from './base';
export * from './courses';
export * from './instructors';
export * from './news';
export * from './schedules';
export * from './about';
export * from './lookup';
export * from './forms';
export * from './types';

// Export unified API object
import { api } from './index';
export default api;
