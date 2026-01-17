/**
 * Shared Section Components
 * These sections can be reused across multiple pages with customization via props
 */

export { default as LookupSection } from './LookupSection';
export { default as CertificateLookupSection } from './CertificateLookupSection';
export { default as ScheduleSection } from './ScheduleSection';
export { default as HeroSection } from './HeroSection';
export { default as NewsSection } from './NewsSection';
export { default as ThuVienSection } from './ThuVienSection';
// export { default as AboutSection } from './AboutSection';
// export { default as InstructorsSection } from './InstructorsSection';
// export { default as ProgramsSection } from './ProgramsSection';
// export { default as PartnersSection } from './PartnersSection';
// export { default as ConsultationForm } from './ConsultationForm';

// Export types
export type { LookupSectionProps, LookupType, CertificateType } from './LookupSection/types';
export type { ScheduleSectionProps, Schedule } from './ScheduleSection/types';
export type { HeroSectionProps, Slide } from './HeroSection/types';
export type { NewsSectionProps, NewsItem, NewsLayout } from './NewsSection';
export type { ThuVienSectionProps, LibraryItem } from './ThuVienSection';

// Export configs
export { 
  TIN_HOC_LOOKUP_CONFIG, 
  TIEN_ICH_LOOKUP_CONFIG, 
  KY_NANG_MEM_LOOKUP_CONFIG 
} from './LookupSection/configs';
// export type { HeroSectionProps } from './HeroSection/types';
