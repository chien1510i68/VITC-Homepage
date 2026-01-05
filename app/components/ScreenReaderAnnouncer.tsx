/**
 * Screen Reader Live Region Component
 * 
 * Global component for announcing dynamic content changes to screen readers
 * Should be included once in the root layout
 */

'use client';

export default function ScreenReaderAnnouncer() {
  return (
    <div
      id="screen-reader-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
}
