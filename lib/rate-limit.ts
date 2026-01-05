/**
 * Rate Limiting Utilities
 * 
 * Simple in-memory rate limiting for API routes
 * For production, consider using Redis-based rate limiting
 * 
 * @module lib/rate-limit
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

/**
 * In-memory store for rate limiting
 * Key format: `${identifier}:${endpoint}`
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed
   */
  maxRequests: number;
  
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  
  /**
   * Custom message when rate limit is exceeded
   */
  message?: string;
}

/**
 * Default rate limit configurations
 */
export const rateLimitConfigs = {
  /**
   * API endpoints - 100 requests per 15 minutes
   */
  api: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  
  /**
   * Form submissions - 5 requests per 15 minutes
   */
  formSubmission: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
  },
  
  /**
   * Search queries - 30 requests per minute
   */
  search: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
  },
  
  /**
   * Certificate lookup - 10 requests per minute
   */
  certificateLookup: {
    maxRequests: 10,
    windowMs: 60 * 1000,
    message: 'Vui lòng đợi một chút trước khi tra cứu tiếp.',
  },
  
  /**
   * Strict rate limit for authentication - 5 requests per hour
   */
  auth: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau 1 giờ.',
  },
} as const;

/**
 * Rate limit result
 */
export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  success: boolean;
  
  /**
   * Remaining requests in the current window
   */
  remaining: number;
  
  /**
   * Time when the rate limit resets (Unix timestamp)
   */
  reset: number;
  
  /**
   * Error message if rate limit exceeded
   */
  message?: string;
}

/**
 * Check if a request should be rate limited
 * 
 * @param identifier - Unique identifier for the client (IP, user ID, etc.)
 * @param endpoint - API endpoint or action being rate limited
 * @param config - Rate limit configuration
 * @returns Rate limit result
 * 
 * @example
 * ```typescript
 * const result = checkRateLimit(
 *   request.headers.get('x-forwarded-for') || 'unknown',
 *   'contact-form',
 *   rateLimitConfigs.formSubmission
 * );
 * 
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: result.message },
 *     { status: 429 }
 *   );
 * }
 * ```
 */
export function checkRateLimit(
  identifier: string,
  endpoint: string,
  config: RateLimitConfig
): RateLimitResult {
  const key = `${identifier}:${endpoint}`;
  const now = Date.now();
  
  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  
  // Reset if window has passed
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
  }
  
  // Increment count
  entry.count++;
  
  // Check if limit exceeded
  if (entry.count > config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      reset: entry.resetTime,
      message: config.message || 'Too many requests. Please try again later.',
    };
  }
  
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Clean up expired rate limit entries
 * Should be called periodically to prevent memory leaks
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get rate limit headers for HTTP response
 * 
 * @param result - Rate limit result
 * @returns Headers object
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}

/**
 * Extract client identifier from Next.js request
 * Uses x-forwarded-for header or fallback to 'unknown'
 * 
 * @param request - Next.js request object
 * @returns Client identifier
 */
export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  return forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';
}

/**
 * Higher-order function to wrap API routes with rate limiting
 * 
 * @param handler - API route handler
 * @param config - Rate limit configuration
 * @returns Wrapped handler with rate limiting
 * 
 * @example
 * ```typescript
 * export const POST = withRateLimit(
 *   async (request) => {
 *     // Your handler code
 *     return NextResponse.json({ success: true });
 *   },
 *   rateLimitConfigs.formSubmission
 * );
 * ```
 */
export function withRateLimit(
  handler: (request: Request) => Promise<Response>,
  config: RateLimitConfig,
  endpoint?: string
) {
  return async (request: Request): Promise<Response> => {
    const identifier = getClientIdentifier(request);
    const endpointName = endpoint || new URL(request.url).pathname;
    
    const rateLimitResult = checkRateLimit(identifier, endpointName, config);
    
    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          error: rateLimitResult.message,
          retryAfter: new Date(rateLimitResult.reset).toISOString(),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...getRateLimitHeaders(rateLimitResult),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    
    // Execute handler and add rate limit headers to response
    const response = await handler(request);
    const headers = new Headers(response.headers);
    
    Object.entries(getRateLimitHeaders(rateLimitResult)).forEach(([key, value]) => {
      headers.set(key, value);
    });
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };
}

// Cleanup expired entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
