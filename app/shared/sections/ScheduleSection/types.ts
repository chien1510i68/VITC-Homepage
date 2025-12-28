/**
 * ScheduleSection Types
 * 
 * Type definitions for the schedule table section component
 */

/**
 * Represents a single schedule/class entry
 */
export interface Schedule {
  /** Unique identifier */
  id: string;
  
  /** Class name/code displayed in the table */
  className: string;
  
  /** Time schedule (e.g., "Thứ 2/4/6 (18:00 - 20:30)") */
  time: string;
  
  /** Start date in YYYY-MM-DD format */
  startDate: string;
  
  /** Location/venue (e.g., "Ms.Teams", "Phòng 101") */
  location: string;
  
  /** Subject/course name */
  subject: string;
  
  /** Current status (e.g., "Sắp khai giảng", "Đang học") */
  status?: string;
}

/**
 * Props for the ScheduleSection component
 */
export interface ScheduleSectionProps {
  /** Section title */
  title?: string;
  
  /** Section subtitle/description */
  subtitle?: string;
  
  /** Unique ID for anchor links */
  sectionId?: string;
  
  /** Badge text (optional, displayed above title) */
  badge?: string;
  
  /** Array of schedule data to display */
  schedules?: Schedule[];
  
  /** CTA button text */
  ctaText?: string;
  
  /** CTA button link */
  ctaLink?: string;
  
  /** Show/hide the CTA button */
  showCta?: boolean;
  
  /** Custom CSS class for section background */
  bgClassName?: string;
  
  /** Custom table columns configuration */
  columns?: {
    className?: boolean;
    time?: boolean;
    startDate?: boolean;
    location?: boolean;
    subject?: boolean;
  };
}
