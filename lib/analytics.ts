/**
 * Analytics Integration Module
 * 
 * Provides unified interface for tracking analytics events across
 * multiple platforms (Google Analytics, Vercel Analytics, etc.)
 * 
 * @module lib/analytics
 */

import { env } from './env';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Event parameters for analytics tracking
 */
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Page view parameters
 */
export interface PageViewEvent {
  path: string;
  title?: string;
  referrer?: string;
}

/**
 * Check if analytics is enabled and available
 */
export const isAnalyticsEnabled = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    env.NEXT_PUBLIC_ENABLE_ANALYTICS === true &&
    !!env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  );
};

/**
 * Initialize Google Analytics
 * Should be called once in the app root
 */
export const initializeAnalytics = (): void => {
  if (!isAnalyticsEnabled()) {
    console.log('Analytics disabled or not configured');
    return;
  }

  const measurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  // Load GA script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send manually
  });

  console.log('Google Analytics initialized:', measurementId);
};

/**
 * Track a page view
 * 
 * @param event - Page view event data
 * 
 * @example
 * ```typescript
 * trackPageView({
 *   path: '/courses',
 *   title: 'Courses Page'
 * });
 * ```
 */
export const trackPageView = (event: PageViewEvent): void => {
  if (!isAnalyticsEnabled()) return;

  const { path, title, referrer } = event;

  // Google Analytics
  if (window.gtag) {
    window.gtag('config', env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: path,
      page_title: title,
      page_referrer: referrer,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Page View:', { path, title });
  }
};

/**
 * Track a custom event
 * 
 * @param event - Analytics event data
 * 
 * @example
 * ```typescript
 * trackEvent({
 *   action: 'click',
 *   category: 'Course',
 *   label: 'Enroll Button',
 *   value: 1
 * });
 * ```
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isAnalyticsEnabled()) return;

  const { action, category, label, value, ...otherParams } = event;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...otherParams,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Event:', { action, category, label, value });
  }
};

/**
 * Track course enrollment
 */
export const trackCourseEnrollment = (courseId: string, courseName: string): void => {
  trackEvent({
    action: 'enroll',
    category: 'Course',
    label: courseName,
    course_id: courseId,
  });
};

/**
 * Track course view
 */
export const trackCourseView = (courseId: string, courseName: string): void => {
  trackEvent({
    action: 'view',
    category: 'Course',
    label: courseName,
    course_id: courseId,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultCount: number): void => {
  trackEvent({
    action: 'search',
    category: 'Search',
    label: searchTerm,
    value: resultCount,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmission = (formName: string, success: boolean): void => {
  trackEvent({
    action: success ? 'submit_success' : 'submit_error',
    category: 'Form',
    label: formName,
    value: success ? 1 : 0,
  });
};

/**
 * Track download
 */
export const trackDownload = (fileName: string, fileType: string): void => {
  trackEvent({
    action: 'download',
    category: 'File',
    label: fileName,
    file_type: fileType,
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, label?: string): void => {
  trackEvent({
    action: 'click',
    category: 'Outbound Link',
    label: label || url,
    url: url,
  });
};

/**
 * Track social share
 */
export const trackSocialShare = (platform: string, contentType: string): void => {
  trackEvent({
    action: 'share',
    category: 'Social',
    label: platform,
    content_type: contentType,
  });
};

/**
 * Track video play
 */
export const trackVideoPlay = (videoTitle: string, videoUrl: string): void => {
  trackEvent({
    action: 'play',
    category: 'Video',
    label: videoTitle,
    video_url: videoUrl,
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorType: string): void => {
  trackEvent({
    action: 'error',
    category: 'Error',
    label: errorMessage,
    error_type: errorType,
  });
};

/**
 * Set user properties
 */
export const setUserProperties = (properties: Record<string, any>): void => {
  if (!isAnalyticsEnabled()) return;

  if (window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

/**
 * Set user ID for tracking across devices
 */
export const setUserId = (userId: string): void => {
  if (!isAnalyticsEnabled()) return;

  if (window.gtag) {
    window.gtag('config', env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      user_id: userId,
    });
  }
};
