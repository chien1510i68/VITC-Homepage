/**
 * Environment Variables Validation
 * 
 * This module validates and provides type-safe access to environment variables
 * using Zod schema validation. It ensures all required environment variables
 * are present and have valid values at build/runtime.
 * 
 * @module lib/env
 */

import { z } from 'zod';

/**
 * Schema for client-side (public) environment variables
 * These are exposed to the browser and must be prefixed with NEXT_PUBLIC_
 */
const clientSchema = z.object({
  // API Configuration
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:8080/api/v1'),
  NEXT_PUBLIC_API_TIMEOUT: z.coerce.number().positive().default(10000),
  NEXT_PUBLIC_USE_MOCK_FALLBACK: z
    .enum(['true', 'false'])
    .default('true')
    .transform((val) => val === 'true'),

  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('VITC - Trung tâm Tin học'),
  NEXT_PUBLIC_SITE_DESCRIPTION: z
    .string()
    .default('Trung tâm đào tạo Tin học hàng đầu Việt Nam'),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().default('contact@vitc.edu.vn'),
  NEXT_PUBLIC_CONTACT_PHONE: z.string().default('024-1234-5678'),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_SENTRY: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_USE_MOCK_DATA: z
    .enum(['true', 'false'])
    .default('true')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_BETA_FEATURES: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),

  // Analytics & Monitoring (Optional)
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),

  // Third-party Services (Optional)
  NEXT_PUBLIC_FB_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_ZALO_OA_ID: z.string().optional(),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),

  // Image & Media (Optional)
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().optional(),
});

/**
 * Schema for server-side environment variables
 * These are only available on the server and should NOT be prefixed with NEXT_PUBLIC_
 */
const serverSchema = z.object({
  // Build Configuration
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  GENERATE_SOURCEMAP: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  ANALYZE: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),

  // Security (Optional in development)
  API_SECRET_KEY: z.string().min(32).optional(),
  JWT_SECRET: z.string().min(32).optional(),

  // Database (Optional)
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),

  // Email Service (Optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  SENDGRID_API_KEY: z.string().optional(),
});

/**
 * Combined schema for all environment variables
 */
const envSchema = clientSchema.merge(serverSchema);

/**
 * Validate and parse environment variables
 * This will throw an error if validation fails
 */
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      console.error(JSON.stringify(error.format(), null, 2));
      throw new Error('Invalid environment variables. Check the console for details.');
    }
    throw error;
  }
};

/**
 * Validated and type-safe environment variables
 * 
 * @example
 * ```typescript
 * import { env } from '@/lib/env';
 * 
 * // Type-safe access with autocomplete
 * const apiUrl = env.NEXT_PUBLIC_API_BASE_URL;
 * const isAnalyticsEnabled = env.NEXT_PUBLIC_ENABLE_ANALYTICS;
 * ```
 */
export const env = parseEnv();

/**
 * Type definition for environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Helper function to check if running in production
 */
export const isProduction = () => env.NODE_ENV === 'production';

/**
 * Helper function to check if running in development
 */
export const isDevelopment = () => env.NODE_ENV === 'development';

/**
 * Helper function to check if running in test mode
 */
export const isTest = () => env.NODE_ENV === 'test';

/**
 * Helper to get the current site URL based on environment
 */
export const getSiteUrl = () => {
  if (isProduction()) {
    return env.NEXT_PUBLIC_SITE_URL.replace('localhost:3000', 'vitc.edu.vn');
  }
  return env.NEXT_PUBLIC_SITE_URL;
};

/**
 * Helper to check if a feature is enabled
 * @param feature - The feature flag to check
 */
export const isFeatureEnabled = (
  feature: keyof Pick<
    Env,
    | 'NEXT_PUBLIC_ENABLE_ANALYTICS'
    | 'NEXT_PUBLIC_ENABLE_SENTRY'
    | 'NEXT_PUBLIC_USE_MOCK_DATA'
    | 'NEXT_PUBLIC_ENABLE_BETA_FEATURES'
  >
): boolean => {
  return env[feature] === true;
};
