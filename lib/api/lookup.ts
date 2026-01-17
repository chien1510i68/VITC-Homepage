// Lookup Services API
import { LookupResult, CertificateResponse } from './types';
import { fetchWithTimeout, API_BASE_URL } from './base';

/**
 * Lookup exam results by CCCD (old endpoint - deprecated)
 */
export async function lookupExamResults(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetchWithTimeout<LookupResult[]>(
      `/backend-api/certificates/cccd/?cccd=${encodeURIComponent(cccd)}`
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
 * Lookup exam results by CCCD using new Spring Boot API
 * Calls: /results/cccd/{cccd}
 * Response format: { success: true, message: null, data: [...] }
 */
export async function lookupExamResultsByCCCD(cccd: string): Promise<LookupResult[]> {
  try {
    const response = await fetch(`/backend-api/results/cccd/${encodeURIComponent(cccd)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Handle the new response format: { success: true, message: null, data: [...] }
    if (result.success && result.data) {
      console.log(`✅ Exam results for CCCD ${cccd} loaded from Spring Boot API`);
      // Convert ExamResultResponse to LookupResult format
      const lookupResults: LookupResult[] = result.data.map((exam: any) => ({
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
      return lookupResults;
    }
    
    // If success is false, throw error with message
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch exam results');
    }
    
    // Return empty array if no data
    return [];
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
    // Call new API endpoint
    const response = await fetch(`/backend-api/certificates/cccd/${cccd}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      console.log(`✅ Certificate for CCCD ${cccd} loaded from API`);
      // Convert CertificateResponse to LookupResult format
      const lookupResults: LookupResult[] = result.data.map((cert: CertificateResponse) => ({
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
      return lookupResults;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd}:`, error);
    throw error;
  }
}

/**
 * Lookup certificate by CCCD using new Spring Boot API
 * Calls: certificates/cccd/{cccd}
 * Response format: { success: true, message: null, data: [...] }
 */
export async function lookupCertificateByCCCD(cccd: string): Promise<CertificateResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/certificates/cccd/${encodeURIComponent(cccd)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Handle the new response format: { success: true, message: null, data: [...] }
    if (result.success && result.data) {
      console.log(`✅ Certificate for CCCD ${cccd} loaded from Spring Boot API`);
      return Array.isArray(result.data) ? result.data : [result.data];
    }
    
    // If success is false, throw error with message
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch certificate');
    }
    
    // Return empty array if no data
    return [];
  } catch (error) {
    console.error(`❌ Error looking up certificate for CCCD ${cccd}:`, error);
    throw error;
  }
}
