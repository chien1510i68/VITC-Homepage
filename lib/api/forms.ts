// Forms Submission API
import { ApiResponse } from './types';

/**
 * Submit consultation form
 * Uses Next.js API route to avoid CORS issues
 */
export async function submitConsultationForm(formData: {
  name: string;
  phone: string;
  email: string;
  program: string;
  type?: string; // Course type (IT, SOFT_SKILLS, etc.)
}): Promise<ApiResponse<{ message: string }>> {
  const url = '/api/consultation';
  
  // Transform to match backend expected format
  const requestBody = {
    username: formData.name,
    phoneNumber: formData.phone,
    email: formData.email,
    course: formData.program,
    type: formData.type || '', // Include course type
    note: '',
    action: 'TU_VAN'
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      console.error('❌ Error response:', errorData);
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success || result.status === 'success') {
      return {
        success: true,
        data: result.data || { message: 'Gửi thành công' },
        message: result.message || 'Gửi thành công'
      };
    }
    
    throw new Error(result.message || 'Invalid response format');
  } catch (error) {
    console.error('❌ Error submitting consultation form:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

/**
 * Submit course registration form
 * Uses Next.js API route to avoid CORS issues
 * API: POST /api/registrations -> proxies to backend /api/v1/register/
 * Response: { isRegistered: boolean }
 */
export async function submitCourseRegistration(formData: {
  username: string;
  email: string;
  phoneNumber: string;
  course: string;
  type: string;
  dob: string;
  address: string;
  note: string;
}): Promise<ApiResponse<{ isRegistered: boolean }>> {
  // Use Next.js API route instead of direct backend call
  const url = '/api/registrations';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    // Handle success case
    if (response.ok && result.isRegistered === true) {
      return {
        success: true,
        data: { isRegistered: true },
        message: 'Đăng ký thành công'
      };
    }
    
    // Handle duplicate phone number (409 Conflict)
    if (response.status === 409 || result.isRegistered === false) {
      console.warn('⚠️ Duplicate registration detected');
      const error: any = new Error(result.error || 'Số điện thoại này đã được đăng ký trước đó');
      error.code = result.code;
      error.details = result.details;
      error.backendError = result.backendError;
      throw error;
    }
    
    // Handle other errors
    if (!response.ok) {
      console.error('❌ Error response:', result);
      const error: any = new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
      error.code = result.code;
      error.details = result.details;
      error.backendError = result.backendError;
      throw error;
    }
    
    throw new Error('Registration failed');
  } catch (error) {
    console.error('❌ Error submitting course registration:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}
