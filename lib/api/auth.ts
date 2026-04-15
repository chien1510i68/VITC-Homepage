import { fetchWithTimeout } from './base';
import { ApiResponse } from './types';

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface UserData {
  accessToken: string;
  refreshToken: string;
  type: string | null;
  username: string;
  email: string;
  role: string;
  userId: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  phoneNumber?: string;
  password: string;
  fullName?: string;
}

/**
 * Login API
 */
export async function login(req: LoginRequest): Promise<ApiResponse<UserData>> {
  return fetchWithTimeout<UserData>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

/**
 * Register API
 */
export async function register(req: RegisterRequest): Promise<ApiResponse<UserData>> {
  return fetchWithTimeout<UserData>('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}
