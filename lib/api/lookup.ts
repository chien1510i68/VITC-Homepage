// Lookup Services API
import { LookupResult } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Lookup exam results by CCCD
 */
export async function lookupExamResults(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `/backend-api/v1/lookup/exam?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Exam results for CCCD ${cccd} loaded from API`);
      return response.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error looking up exam results for CCCD ${cccd}:`, error);
    throw error;
  }
}

/**
 * Lookup certificate by CCCD
 */
export async function lookupCertificate(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `/backend-api/v1/lookup/certificate?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Certificate for CCCD ${cccd} loaded from API`);
      return response.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd}:`, error);
    throw error;
  }
}
