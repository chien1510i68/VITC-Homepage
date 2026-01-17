/**
 * Documents API
 * Handles document/library resource operations
 */

import { API_BASE_URL, fetchWithTimeout } from './base';
import type { ApiResponse } from './types';

/**
 * Document Model from Backend
 */
export interface Document {
  id: string;
  title: string;
  slug: string;
  url: string;
  image: string;
  excerpt: string;
  fileUrl: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  createdAt: string;
  createdBy: string;
}

/**
 * Documents Filter Request Parameters
 */
export interface DocumentsFilterRequest {
  page?: number;
  size?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  type?: 'SOFT_SKILLS' | 'IT_SKILLS' | 'OTHER';
}

/**
 * Documents Paginated Response
 */
export interface DocumentsResponse {
  total: number;
  items: Document[];
}

/**
 * Fetch documents with filters
 * POST /api/v1/documents/filter
 */
export async function fetchDocuments(
  request: DocumentsFilterRequest = {}
): Promise<ApiResponse<DocumentsResponse>> {
  const { page = 0, size = 6, type = 'SOFT_SKILLS' } = request;
  
  try {
    const requestBody = { page, size, type };
    console.log('📦 Request body:', requestBody);
    
    const response = await fetchWithTimeout<DocumentsResponse>(
      `${API_BASE_URL}/documents/filter`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }
    );

    return response;
  } catch (error) {
    console.error('❌ Error fetching documents:', error);
    return {
      success: false,
      data: { total: 0, items: [] },
      error: error instanceof Error ? error.message : 'Failed to fetch documents',
    };
  }
}

/**
 * Fetch latest documents
 * Convenience function to get the most recent documents
 */
export async function fetchLatestDocuments(
  limit: number = 6
): Promise<ApiResponse<DocumentsResponse>> {
  return fetchDocuments({ page: 0, size: limit, type: 'SOFT_SKILLS' });
}
