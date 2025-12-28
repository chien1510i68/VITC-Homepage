/**
 * InstructorCard Types
 */

/**
 * Instructor data interface
 */
export interface Instructor {
  /** Unique identifier */
  id: string | number;
  
  /** Full name */
  name: string;
  
  /** Profile image URL */
  image: string;
  
  /** Area of expertise/specialty */
  specialty: string;
  
  /** Academic degree (optional) */
  degree?: string;
  
  /** Additional bio/description (optional) */
  bio?: string;
  
  /** Years of experience (optional) */
  experience?: number;
}

/**
 * Props for InstructorCard component
 */
export interface InstructorCardProps {
  /** Instructor data */
  instructor: Instructor;
  
  /** Click handler (optional) */
  onClick?: () => void;
  
  /** Animation delay in milliseconds */
  delay?: number;
  
  /** Card size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Show/hide degree */
  showDegree?: boolean;
  
  /** Custom className */
  className?: string;
}
