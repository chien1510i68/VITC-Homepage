/**
 * Web Vitals Reporting Module
 * 
 * Reports Core Web Vitals metrics to analytics platforms
 * Tracks: LCP, FID, CLS, FCP, TTFB
 * 
 * @module lib/web-vitals
 * 
 * @requires web-vitals
 * Install: npm install web-vitals
 */

// Type definition for web-vitals Metric (when package is installed)
type Metric = {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
};

import { trackEvent } from './analytics';

/**
 * Web Vitals metric names
 */
export type WebVitalMetric = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';

/**
 * Report Web Vital metric to analytics
 * 
 * @param metric - Web Vitals metric data
 * 
 * @example
 * ```typescript
 * import { onCLS, onFID, onLCP } from 'web-vitals';
 * 
 * onCLS(reportWebVitals);
 * onFID(reportWebVitals);
 * onLCP(reportWebVitals);
 * ```
 */
export function reportWebVitals(metric: Metric): void {
  const { name, value, rating, delta, id } = metric;

  // Send to analytics
  trackEvent({
    action: name,
    category: 'Web Vitals',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_rating: rating,
    metric_delta: Math.round(delta),
  });

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📈 Web Vital:', {
      name,
      value: Math.round(value),
      rating,
    });
  }

  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', name, { value, rating });
  }
}

/**
 * Get Web Vitals thresholds for rating
 */
export const WEB_VITALS_THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500, // milliseconds
    needsImprovement: 4000,
  },
  // First Input Delay (FID)
  FID: {
    good: 100, // milliseconds
    needsImprovement: 300,
  },
  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1, // score
    needsImprovement: 0.25,
  },
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800, // milliseconds
    needsImprovement: 3000,
  },
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800, // milliseconds
    needsImprovement: 1800,
  },
  // Interaction to Next Paint (INP)
  INP: {
    good: 200, // milliseconds
    needsImprovement: 500,
  },
} as const;

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  metricName: WebVitalMetric,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName];
  
  if (value <= thresholds.good) {
    return 'good';
  }
  
  if (value <= thresholds.needsImprovement) {
    return 'needs-improvement';
  }
  
  return 'poor';
}

/**
 * Format metric value for display
 */
export function formatMetricValue(metricName: WebVitalMetric, value: number): string {
  if (metricName === 'CLS') {
    return value.toFixed(3);
  }
  
  return `${Math.round(value)}ms`;
}

/**
 * Log Web Vitals summary
 */
export function logWebVitalsSummary(metrics: Record<WebVitalMetric, number>): void {
  console.group('📊 Web Vitals Summary');
  
  Object.entries(metrics).forEach(([name, value]) => {
    const metricName = name as WebVitalMetric;
    const rating = getMetricRating(metricName, value);
    const formatted = formatMetricValue(metricName, value);
    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
    
    console.log(`${emoji} ${name}: ${formatted} (${rating})`);
  });
  
  console.groupEnd();
}
