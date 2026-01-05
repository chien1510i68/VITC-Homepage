/**
 * Internationalization (i18n) Utilities
 * 
 * Preparation for multi-language support
 * Currently supports Vietnamese (vi) with structure ready for English (en)
 * 
 * @module lib/i18n
 */

/**
 * Supported locales
 */
export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];

/**
 * Default locale
 */
export const defaultLocale: Locale = 'vi';

/**
 * Locale names for display
 */
export const localeNames: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
};

/**
 * Locale metadata
 */
export const localeMetadata: Record<Locale, {
  code: string;
  direction: 'ltr' | 'rtl';
  currency: string;
  dateFormat: string;
}> = {
  vi: {
    code: 'vi-VN',
    direction: 'ltr',
    currency: 'VND',
    dateFormat: 'DD/MM/YYYY',
  },
  en: {
    code: 'en-US',
    direction: 'ltr',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
  },
};

/**
 * Check if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from string with fallback
 */
export function getLocale(locale?: string): Locale {
  if (!locale) return defaultLocale;
  return isValidLocale(locale) ? locale : defaultLocale;
}

/**
 * Dictionary type for translations
 */
export type Dictionary = {
  [key: string]: string | Dictionary;
};

/**
 * Translation keys structure
 * Add new keys here as the application grows
 */
export interface Translations {
  common: {
    home: string;
    about: string;
    courses: string;
    news: string;
    contact: string;
    register: string;
    login: string;
    logout: string;
    search: string;
    viewMore: string;
    viewAll: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
  };
  navigation: {
    skipToContent: string;
    mainMenu: string;
    footer: string;
    breadcrumb: string;
  };
  courses: {
    title: string;
    featured: string;
    upcoming: string;
    duration: string;
    startDate: string;
    instructor: string;
    register: string;
    details: string;
    curriculum: string;
    schedule: string;
  };
  forms: {
    name: string;
    email: string;
    phone: string;
    message: string;
    subject: string;
    submit: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    success: string;
    error: string;
  };
  errors: {
    notFound: string;
    serverError: string;
    unauthorized: string;
    forbidden: string;
    validationError: string;
  };
}

/**
 * Vietnamese translations (current)
 */
export const vi: Translations = {
  common: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    courses: 'Khóa học',
    news: 'Tin tức',
    contact: 'Liên hệ',
    register: 'Đăng ký',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    search: 'Tìm kiếm',
    viewMore: 'Xem thêm',
    viewAll: 'Xem tất cả',
    loading: 'Đang tải...',
    error: 'Lỗi',
    success: 'Thành công',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước đó',
  },
  navigation: {
    skipToContent: 'Bỏ qua đến nội dung chính',
    mainMenu: 'Menu chính',
    footer: 'Thông tin liên hệ',
    breadcrumb: 'Breadcrumb',
  },
  courses: {
    title: 'Khóa học',
    featured: 'Khóa học nổi bật',
    upcoming: 'Sắp khai giảng',
    duration: 'Thời lượng',
    startDate: 'Ngày bắt đầu',
    instructor: 'Giảng viên',
    register: 'Đăng ký học',
    details: 'Chi tiết khóa học',
    curriculum: 'Chương trình học',
    schedule: 'Lịch học',
  },
  forms: {
    name: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    message: 'Nội dung',
    subject: 'Tiêu đề',
    submit: 'Gửi',
    required: 'Trường này là bắt buộc',
    invalidEmail: 'Email không hợp lệ',
    invalidPhone: 'Số điện thoại không hợp lệ',
    success: 'Gửi thành công',
    error: 'Có lỗi xảy ra. Vui lòng thử lại.',
  },
  errors: {
    notFound: 'Không tìm thấy trang',
    serverError: 'Lỗi máy chủ',
    unauthorized: 'Chưa đăng nhập',
    forbidden: 'Không có quyền truy cập',
    validationError: 'Dữ liệu không hợp lệ',
  },
};

/**
 * English translations (placeholder for future)
 */
export const en: Translations = {
  common: {
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    news: 'News',
    contact: 'Contact',
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
    search: 'Search',
    viewMore: 'View more',
    viewAll: 'View all',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
  },
  navigation: {
    skipToContent: 'Skip to main content',
    mainMenu: 'Main menu',
    footer: 'Contact information',
    breadcrumb: 'Breadcrumb',
  },
  courses: {
    title: 'Courses',
    featured: 'Featured courses',
    upcoming: 'Upcoming',
    duration: 'Duration',
    startDate: 'Start date',
    instructor: 'Instructor',
    register: 'Register',
    details: 'Course details',
    curriculum: 'Curriculum',
    schedule: 'Schedule',
  },
  forms: {
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    subject: 'Subject',
    submit: 'Submit',
    required: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone number',
    success: 'Submitted successfully',
    error: 'An error occurred. Please try again.',
  },
  errors: {
    notFound: 'Page not found',
    serverError: 'Server error',
    unauthorized: 'Not logged in',
    forbidden: 'Access denied',
    validationError: 'Invalid data',
  },
};

/**
 * All translations
 */
export const translations: Record<Locale, Translations> = {
  vi,
  en,
};

/**
 * Get translation by key path
 * 
 * @param locale - Current locale
 * @param key - Translation key path (e.g., 'common.home')
 * @returns Translated string
 * 
 * @example
 * ```typescript
 * const homeText = getTranslation('vi', 'common.home');
 * // Returns: 'Trang chủ'
 * ```
 */
export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Create a translation function for a specific locale
 * 
 * @param locale - Locale to use
 * @returns Translation function
 * 
 * @example
 * ```typescript
 * const t = createTranslator('vi');
 * console.log(t('common.home')); // 'Trang chủ'
 * ```
 */
export function createTranslator(locale: Locale) {
  return (key: string) => getTranslation(locale, key);
}

/**
 * Format number according to locale
 */
export function formatNumber(
  value: number,
  locale: Locale = defaultLocale,
  options?: Intl.NumberFormatOptions
): string {
  const localeCode = localeMetadata[locale].code;
  return new Intl.NumberFormat(localeCode, options).format(value);
}

/**
 * Format currency according to locale
 */
export function formatCurrency(
  value: number,
  locale: Locale = defaultLocale
): string {
  const { code, currency } = localeMetadata[locale];
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Format date according to locale
 */
export function formatDate(
  date: Date,
  locale: Locale = defaultLocale,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeCode = localeMetadata[locale].code;
  return new Intl.DateTimeFormat(localeCode, options).format(date);
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(
  date: Date,
  locale: Locale = defaultLocale
): string {
  const localeCode = localeMetadata[locale].code;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(localeCode, { numeric: 'auto' });
  
  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];
  
  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds) {
      const value = Math.floor(diffInSeconds / seconds);
      return rtf.format(-value, unit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * Get text direction for locale
 */
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return localeMetadata[locale].direction;
}

/**
 * Hook-like function for using translations in components
 * (Will be converted to actual React hook when needed)
 * 
 * @example
 * ```typescript
 * const t = useTranslations('vi');
 * <h1>{t('common.home')}</h1>
 * ```
 */
export function useTranslations(locale: Locale = defaultLocale) {
  return createTranslator(locale);
}
