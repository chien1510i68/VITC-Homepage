// Lookup Services API
import { LookupResult, CertificateResponse } from './types';
import { fetchWithTimeout, apiFetch } from './base';

/**
 * Lookup exam results by CCCD (old endpoint - deprecated)
 */
export async function lookupExamResults(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `/api/v1/certificates/cccd/?cccd=${encodeURIComponent(cccd)}`
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error looking up exam results for CCCD ${cccd}:`, error);
    throw error;
  }
}

/**
 * Lookup exam results by CCCD using new Spring Boot API
 * Calls: /results/cccd/{cccd}
 * Response format: { success: true, message: null, data: [...] }
 */
/**
 * Lookup exam results by CCCD using new Spring Boot API with pagination
 * Calls: /api/v1/results/cccd/{cccd}/{page}/{size}
 * Response format: { success: true, message: null, data: { total: 20, items: [...] } }
 */
export async function lookupExamResultsByCCCD(
  cccd: string,
  page: number = 0,
  size: number = 30
): Promise<{ total: number; items: LookupResult[] }> {
  try {
    const response = await apiFetch(`/api/v1/results/cccd/${encodeURIComponent(cccd)}/${page}/${size}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Handle the paginated response format: { success: true, message: null, data: { total: 20, items: [...] } }
    if (result.success && result.data && Array.isArray(result.data.items)) {
      // Map ExamResultResponse to LookupResult format
      const lookupResults: LookupResult[] = result.data.items.map((exam: any) => ({
        id: exam.id,
        studentName: exam.username,
        cccd: exam.identifyNumber,
        entryNumber: '-',
        birthDate: exam.dob,
        birthPlace: exam.address,
        courseName: exam.kyThi || '-',
        certificateType: '-',
        theoryScore: exam.diemLt,
        practiceScore: exam.diemTh,
        finalScore: parseFloat(exam.diemTong) || 0,
        result: exam.ketQua,
        examDate: exam.ngayThi,
        issueDate: exam.kyThi,
        certificateId: '-',
      }));
      
      return {
        total: result.data.total || 0,
        items: lookupResults
      };
    }
    
    // If success is false, throw error with message
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch exam results');
    }
    
    // Return empty results if no data
    return { total: 0, items: [] };
  } catch (error) {
    console.error(`❌ Error looking up exam results for CCCD ${cccd} (page ${page}, size ${size}):`, error);
    throw error;
  }
}

/**
 * Lookup certificate by CCCD with pagination
 * Returns LookupResult format for the UI
 */
export async function lookupCertificate(
  cccd: string,
  page: number = 0,
  size: number = 30
): Promise<{ total: number; items: LookupResult[] }> {
  try {
    // Call new paginated API endpoint
    const response = await apiFetch(`/api/v1/certificates/cccd/${encodeURIComponent(cccd)}/${page}/${size}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data && Array.isArray(result.data.items)) {
      // Convert CertificateResponse to LookupResult format
      const lookupResults: LookupResult[] = result.data.items.map((cert: CertificateResponse) => ({
        id: cert.id,
        studentName: cert.username,
        cccd: cert.identifyNumber,
        entryNumber: cert.vaoSo,
        birthDate: cert.dob,
        birthPlace: cert.address,
        courseName: cert.loaiChungChi,
        certificateType: cert.loaiChungChi,
        theoryScore: cert.diemLtThcb || '-',
        practiceScore: cert.diemThUdnc || '-',
        finalScore: 0,
        result: 'Đạt',
        examDate: cert.ngayCap,
        issueDate: cert.ngayCap,
        certificateId: cert.soHieu,
      }));
      return {
        total: result.data.total || 0,
        items: lookupResults
      };
    }
    
    return { total: 0, items: [] };
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd}:`, error);
    throw error;
  }
}

/**
 * Lookup certificate by CCCD using new Spring Boot API with pagination
 * Calls: /api/v1/certificates/cccd/{cccd}/{page}/{size}
 * Response format: { success: true, message: null, data: { total: 20, items: [...] } }
 */
export async function lookupCertificateByCCCD(
  cccd: string, 
  page: number = 0, 
  size: number = 30
): Promise<{ total: number; items: CertificateResponse[] }> {
  try {
    const response = await apiFetch(`/api/v1/certificates/cccd/${encodeURIComponent(cccd)}/${page}/${size}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Handle the paginated response format: { success: true, message: null, data: { total: 20, items: [...] } }
    if (result.success && result.data) {
      return {
        total: result.data.total || 0,
        items: Array.isArray(result.data.items) ? result.data.items : []
      };
    }
    
    // If success is false, throw error with message
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch certificate');
    }
    
    // Return empty results if no data
    return { total: 0, items: [] };
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd} (page ${page}, size ${size}):`, error);
    throw error;
  }
}
