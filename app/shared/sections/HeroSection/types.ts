/**
 * HeroSection Types
 * 
 * Type definitions for the hero carousel/slider section
 */

/**
 * Represents a single slide in the hero carousel
 */
export interface Slide {
  /** Unique identifier */
  id: number | string;
  
  /** Image URL or path */
  image: string;
  
  /** Slide title (optional) */
  title?: string;
  
  /** Slide description (optional) */
  description?: string;
  
  /** Highlight badge/card (optional) */
  highlight?: {
    title: string;
    content: string;
  };
}

/**
 * Props for the HeroSection component
 */
export interface HeroSectionProps {
  /** Array of slides to display */
  slides?: Slide[];
  
  /** Height of the hero section */
  height?: string;
  
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlayInterval?: number;
  
  /** Show/hide navigation arrows */
  showNavigation?: boolean;
  
  /** Show/hide dot indicators */
  showIndicators?: boolean;
  
  /** Custom CSS class for the section */
  className?: string;
  
  /** Image quality (1-100) */
  imageQuality?: number;
  
  /** Transition duration in milliseconds */
  transitionDuration?: number;
}
