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
      `/backend-api/v1/consultation`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );
    
    if (response.success) {
      console.log('✅ Consultation form submitted successfully');
      return response;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('❌ Error submitting consultation form:', error);
    throw error;
  }
}
