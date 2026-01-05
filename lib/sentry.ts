/**
 * Sentry Configuration and Error Tracking
 * 
 * Centralized error tracking and monitoring using Sentry
 * Note: Run `npx @sentry/wizard@latest -i nextjs` to complete setup
 * 
 * @module lib/sentry
 */

import { env } from './env';

/**
 * Error severity levels
 */
export type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

/**
 * Custom error context
 */
export interface ErrorContext {
  user?: {
    id?: string;
    email?: string;
    username?: string;
  };
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level?: ErrorSeverity;
}

/**
 * Check if Sentry is enabled
 */
export const isSentryEnabled = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    env.NEXT_PUBLIC_ENABLE_SENTRY === true &&
    !!env.NEXT_PUBLIC_SENTRY_DSN
  );
};

/**
 * Capture an exception with Sentry
 * 
 * @param error - Error object to capture
 * @param context - Additional context
 * 
 * @example
 * ```typescript
 * try {
 *   await fetchData();
 * } catch (error) {
 *   captureException(error, {
 *     tags: { feature: 'courses' },
 *     extra: { courseId: 123 }
 *   });
 * }
 * ```
 */
export const captureException = (
  error: Error | unknown,
  context?: ErrorContext
): void => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('🔴 Captured Error:', error);
    if (context) {
      console.error('Context:', context);
    }
  }

  // TODO: Send to Sentry when installed
  // import * as Sentry from '@sentry/nextjs';
  // if (isSentryEnabled()) {
  //   Sentry.captureException(error, {
  //     tags: context?.tags,
  //     extra: context?.extra,
  //     level: context?.level || 'error',
  //     user: context?.user,
  //   });
  // }
};

/**
 * Capture a message with Sentry
 * 
 * @param message - Message to capture
 * @param level - Severity level
 * @param context - Additional context
 * 
 * @example
 * ```typescript
 * captureMessage('API rate limit reached', 'warning', {
 *   tags: { endpoint: '/api/courses' }
 * });
 * ```
 */
export const captureMessage = (
  message: string,
  level: ErrorSeverity = 'info',
  context?: ErrorContext
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📝 Captured Message [${level}]:`, message);
    if (context) {
      console.log('Context:', context);
    }
  }

  // TODO: Send to Sentry when installed
  // import * as Sentry from '@sentry/nextjs';
  // if (isSentryEnabled()) {
  //   Sentry.captureMessage(message, {
  //     level,
  //     tags: context?.tags,
  //     extra: context?.extra,
  //     user: context?.user,
  //   });
  // }
};

/**
 * Set user context for error tracking
 */
export const setUserContext = (user: {
  id?: string;
  email?: string;
  username?: string;
}): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('👤 User context set:', user);
  }

  // TODO: Set in Sentry when installed
  // import * as Sentry from '@sentry/nextjs';
  // if (isSentryEnabled()) {
  //   Sentry.setUser(user);
  // }
};

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (
  message: string,
  data?: Record<string, any>,
  level: ErrorSeverity = 'info'
): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🍞 Breadcrumb [${level}]:`, message, data);
  }

  // TODO: Add to Sentry when installed
  // import * as Sentry from '@sentry/nextjs';
  // if (isSentryEnabled()) {
  //   Sentry.addBreadcrumb({
  //     message,
  //     data,
  //     level,
  //   });
  // }
};

/**
 * Track performance
 */
export const startTransaction = (name: string, _op: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(`⏱️ ${name}`);
  }

  // TODO: Start transaction in Sentry when installed
  // import * as Sentry from '@sentry/nextjs';
  // if (isSentryEnabled()) {
  //   return Sentry.startTransaction({ name, op });
  // }
  
  return {
    finish: () => {
      if (process.env.NODE_ENV === 'development') {
        console.timeEnd(`⏱️ ${name}`);
      }
    },
  };
};

/**
 * Installation instructions
 */
export const SENTRY_SETUP_INSTRUCTIONS = `
To complete Sentry setup:

1. Install Sentry SDK:
   npm install --save @sentry/nextjs

2. Run Sentry wizard:
   npx @sentry/wizard@latest -i nextjs

3. Configure environment variables:
   NEXT_PUBLIC_SENTRY_DSN=your-dsn-here
   NEXT_PUBLIC_ENABLE_SENTRY=true

4. Uncomment Sentry code in this file (lib/sentry.ts)

5. The wizard will create:
   - sentry.client.config.ts
   - sentry.server.config.ts
   - sentry.edge.config.ts
   - Updates to next.config.ts

For more info: https://docs.sentry.io/platforms/javascript/guides/nextjs/
`;
