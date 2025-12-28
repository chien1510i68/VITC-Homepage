/**
 * LookupSection Type Definitions
 * @module shared/sections/LookupSection
 */

/**
 * Props for LookupSection component
 * @interface LookupSectionProps
 */
export interface LookupSectionProps {
  /**
   * Section title
   * @default "Tra cứu điểm thi & Chứng chỉ"
   */
  title?: string;

  /**
   * Section subtitle/description
   * @default "Tra cứu kết quả thi và tải chứng chỉ của bạn một cách nhanh chóng"
   */
  subtitle?: string;

  /**
   * HTML id for section (for anchor links)
   * @default "tra-cuu"
   */
  sectionId?: string;

  /**
   * Badge text displayed above title
   * @default "Tra cứu thông tin"
   */
  badge?: string;

  /**
   * Show score lookup tab
   * @default true
   */
  showScoreTab?: boolean;

  /**
   * Show certificate lookup tab
   * @default true
   */
  showCertificateTab?: boolean;

  /**
   * Contact email for support
   * @default "support@visc.edu.vn"
   */
  contactEmail?: string;

  /**
   * Contact phone for support
   * @default "0123456789"
   */
  contactPhone?: string;

  /**
   * Custom CSS classes
   */
  className?: string;

  /**
   * Callback when search is performed
   */
  onSearch?: (type: 'score' | 'certificate', query: string) => void;
}

/**
 * Lookup type enum
 */
export type LookupType = 'score' | 'certificate';

/**
 * Certificate type options
 */
export type CertificateType = 'all' | 'basic' | 'advanced' | 'standard';
