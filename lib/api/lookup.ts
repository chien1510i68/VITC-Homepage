// Lookup Services API
import { LookupResult } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';
import { mockLookupResults } from './mockData';

/**
 * Lookup exam results by CCCD
 * Falls back to mock data if API fails
 */
export async function lookupExamResults(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `${API_BASE_URL}/lookup/exam?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Exam results for CCCD ${cccd} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, searching mock exam data for CCCD ${cccd}:`, response.error);
    return mockLookupResults.filter(r => r.cccd === cccd);
  } catch (error) {
    console.error(`❌ Error looking up exam results for CCCD ${cccd}:`, error);
    return mockLookupResults.filter(r => r.cccd === cccd);
  }
}

/**
 * Lookup certificate by CCCD
 * Falls back to mock data if API fails
 */
export async function lookupCertificate(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `${API_BASE_URL}/lookup/certificate?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      console.log(`✅ Certificate for CCCD ${cccd} loaded from API`);
      return response.data;
    }
    
    console.warn(`⚠️ API failed, searching mock certificate data for CCCD ${cccd}:`, response.error);
    return mockLookupResults.filter(r => r.cccd === cccd && r.result === 'Đạt');
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd}:`, error);
    return mockLookupResults.filter(r => r.cccd === cccd && r.result === 'Đạt');
  }
}
