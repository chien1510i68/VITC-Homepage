// Base API utilities and configuration
import { ApiResponse } from './types';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
export const API_TIMEOUT = 10000; // 10 seconds timeout
const SERVER_API_BASE_URL = process.env.API_INTERNAL_URL || API_BASE_URL;
const CLIENT_PROXY_BASE_PATH = '/backend-api';

function normalizePath(path: string): string {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Resolve an API URL that works in both browser and server contexts.
 *
 * - In the browser, keep requests same-origin by using only the base pathname
 *   (e.g. NEXT_PUBLIC_API_URL=https://visc.vnua.edu.vn/api-service -> /api-service).
 * - On the server (SSR / route handlers / metadata routes), use an absolute upstream URL.
 */
export function resolveApiUrl(input: string): string {
  if (!input) {
    // Browser calls should always go through the same-origin proxy.
    if (typeof window !== 'undefined') return CLIENT_PROXY_BASE_PATH;
    return (SERVER_API_BASE_URL || API_BASE_URL);
  }
  if (/^https?:\/\//i.test(input)) return input;

  const path = normalizePath(input);

  const baseRaw = (typeof window === 'undefined' ? (SERVER_API_BASE_URL || API_BASE_URL) : API_BASE_URL) || '';
  const baseTrimmed = baseRaw.replace(/\/$/, '');

  // Server-side: Node fetch requires absolute URLs.
  if (typeof window === 'undefined') {
    // If someone configured a relative base (e.g. /api-service), fall back to site origin.
    if (!/^https?:\/\//i.test(baseTrimmed)) {
      const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const abs = new URL(`${normalizePath(baseTrimmed)}${path}`, site);
      return abs.toString();
    }
    return `${baseTrimmed}${path}`;
  }

  // Client-side: always same-origin via proxy to avoid CORS + env build-time issues.
  // Any relative API call (e.g. /api/v1/...) becomes /backend-api/api/v1/... and is
  // forwarded by app/backend-api/[...path]/route.ts using runtime env vars.
  if (path === CLIENT_PROXY_BASE_PATH || path.startsWith(`${CLIENT_PROXY_BASE_PATH}/`)) return path;
  return `${CLIENT_PROXY_BASE_PATH}${path}`;
}

export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
  return fetch(resolveApiUrl(input), init);
}

/**
 * Helper function to make API calls with timeout and error handling
 * Updated to match backend response format: { status: "success", data: {...} }
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout: number = API_TIMEOUT
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resolveApiUrl(url), {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        data: null as any,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const result = await response.json();
    
    // Check backend response format - can be either:
    // { success: true, data: {...} } or { status: "success", data: {...} }
    if (result.success === true || result.status === 'success') {
      return {
        success: true,
        data: result.data,
        message: result.message || 'Success',
      };
    } else {
      return {
        success: false,
        data: null as any,
        error: result.message || result.error || 'Unknown error',
      };
    }
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          data: null as any,
          error: 'Request timeout',
        };
      }
      return {
        success: false,
        data: null as any,
        error: error.message,
      };
    }
    
    return {
      success: false,
      data: null as any,
      error: 'Unknown error occurred',
    };
  }
}
