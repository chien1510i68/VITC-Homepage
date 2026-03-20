/**
 * Consultation API Module
 * 
 * Provides functions for consultation form operations
 * Uses Next.js API routes to avoid CORS issues
 * 
 * @module lib/api/consultation
 */

import { ApiResponse } from './types';

/**
 * Consultation Request
 */
export interface ConsultationRequest {
  username: string;
  email: string;
  phoneNumber: string;
  course: string;
  type: string;
  note?: string;
  action: 'TU_VAN';
}

/**
 * Consultation Response
 */
export interface ConsultationResponse {
  success: boolean;
  message?: string;
}

/**
 * Submit consultation request
 * Endpoint: POST /api/consultation (Next.js API route)
 */
export async function submitConsultation(
  formData: Omit<ConsultationRequest, 'action'>
): Promise<ApiResponse<ConsultationResponse>> {
  const url = '/api/consultation'; // Next.js API route
  
  const requestData: ConsultationRequest = {
    ...formData,
    action: 'TU_VAN',
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Consultation request failed:', result);
      return {
        success: false,
        data: { success: false },
        error: result.error || result.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    
    return {
      success: true,
      data: result,
      message: 'Gửi yêu cầu tư vấn thành công',
    };
  } catch (error) {
    console.error('❌ Error submitting consultation:', error);
    return {
      success: false,
      data: { success: false },
      error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi yêu cầu',
    };
  }
}
