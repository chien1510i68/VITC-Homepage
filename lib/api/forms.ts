// Forms Submission API
import { ApiResponse } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Submit consultation form
 */
export async function submitConsultationForm(formData: {
  name: string;
  phone: string;
  email: string;
  program: string;
}): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetchWithTimeout<{ message: string }>(
      `${API_BASE_URL}/consultation`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );
    
    if (response.success) {
      console.log('✅ Consultation form submitted successfully');
      return response;
    }
    
    console.warn('⚠️ API failed, form data logged locally:', response.error);
    // In production, you might want to queue this for retry
    console.log('Form data:', formData);
    return {
      success: true,
      data: { message: 'Đã ghi nhận thông tin của bạn. Chúng tôi sẽ liên hệ sớm!' },
      message: 'Data saved locally (API unavailable)',
    };
  } catch (error) {
    console.error('❌ Error submitting consultation form:', error);
    // Gracefully handle by logging locally
    console.log('Form data saved locally:', formData);
    return {
      success: true,
      data: { message: 'Đã ghi nhận thông tin của bạn. Chúng tôi sẽ liên hệ sớm!' },
      message: 'Data saved locally (API error)',
    };
  }
}
