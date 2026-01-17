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
}): Promise<ApiResponse<{ message: string }>> {
  const url = '/api/consultation';
  
  console.log('📤 Submitting consultation form');
  console.log('🔗 Endpoint:', url);
  console.log('📦 Request body:', JSON.stringify(formData, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log('📡 Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      console.error('❌ Error response:', errorData);
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ Response data:', JSON.stringify(result, null, 2));
    
    if (result.success || result.status === 'success') {
      console.log('✅ Consultation form submitted successfully');
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
  
  console.log('📤 Submitting course registration');
  console.log('🔗 Endpoint:', url);
  console.log('📦 Request body:', JSON.stringify(formData, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log('📡 Response status:', response.status, response.statusText);
    
    const result = await response.json();
    console.log('✅ Response data:', JSON.stringify(result, null, 2));
    
    // Handle success case
    if (response.ok && result.isRegistered === true) {
      console.log('✅ Course registration submitted successfully');
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
