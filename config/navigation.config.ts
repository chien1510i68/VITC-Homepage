/**
 * Navigation Configuration
 * Centralized navigation items for the entire application
 */

export interface NavItem {
  name: string;
  href: string;
  hasMegaMenu?: boolean;
  hasSoftSkillsMenu?: boolean;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { 
    name: 'Trang chủ', 
    href: '/' 
  },
  { 
    name: 'Tin học', 
    href: '/tin-hoc', 
    hasMegaMenu: true 
  },
  { 
    name: 'Kỹ năng mềm', 
    href: '/ky-nang-mem', 
    hasSoftSkillsMenu: true 
  },
  { 
    name: 'Tin tức', 
    href: '/tin-tuc-thong-bao' 
  },
  { 
    name: 'Tra cứu chứng chỉ', 
    href: '/tien-ich-dich-vu' 
  },
  { 
    name: 'Liên hệ', 
    href: '/lien-he' 
  },
];

export const LOGO_URL = '/images/logo.jpg';
export const LOGO_ALT = 'VISC Logo';
export const LOGO_WIDTH = 120;
export const LOGO_HEIGHT = 40;

export const SCROLL_CONFIG = {
  hideThreshold: 100,  // Hide header after scrolling this many pixels
  showThreshold: 10,   // Always show header when near top
  debounceDelay: 50,   // Debounce scroll events
} as const;
