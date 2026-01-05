/**
 * Skip to Content Link Component
 * 
 * Accessibility feature that allows keyboard users to skip navigation
 * and go directly to main content
 */

import Link from 'next/link';

export default function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
    >
      Bỏ qua đến nội dung chính
    </Link>
  );
}
