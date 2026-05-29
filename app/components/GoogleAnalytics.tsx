'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeAnalytics, trackPageView } from '@/lib/analytics';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (!pathname) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView({
      path: url,
      title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics component for Next.js App Router
 * Safely wrapped in Suspense to prevent static rendering de-optimization
 */
export default function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}
