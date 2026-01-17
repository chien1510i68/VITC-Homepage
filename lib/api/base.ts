// Base API utilities and configuration
import { ApiResponse } from './types';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
export const API_TIMEOUT = 10000; // 10 seconds timeout

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
    const response = await fetch(url, {
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
    
    console.log('🔍 API Response:', { url, result });
    
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
