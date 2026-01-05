/**
 * Instructor Related Types
 * Type definitions for instructor profiles and information
 */

/**
 * Instructor profile information
 */
export interface Instructor {
  id: number;
  name: string;
  title: string;
  experience: string;
  students: string;
  courses: number;
  image: string;
  specialty: string;
}
