/**
 * useCertificateLookup Hook - Manages certificate lookup logic
 * @module shared/sections/CertificateLookupSection/hooks
 */

import { useState } from 'react';
import { api, CertificateResponse } from '@/lib/api';

interface UseCertificateLookupReturn {
  cccd: string;
  results: CertificateResponse[];
  hasSearched: boolean;
  isLoading: boolean;
  errorMessage: string;
  setCccd: (value: string) => void;
  setErrorMessage: (message: string) => void;
  handleSearch: () => Promise<void>;
  handleReset: () => void;
}

/**
 * useCertificateLookup Hook
 * Responsible for managing certificate lookup state and business logic only
 */
export function useCertificateLookup(onSearch?: (cccd: string) => void): UseCertificateLookupReturn {
  const [cccd, setCccd] = useState('');
  const [results, setResults] = useState<CertificateResponse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (!cccd.trim()) {
      setErrorMessage('Vui lòng nhập số CCCD/CMND');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    setHasSearched(false);
    setErrorMessage('');
    
    try {
      const data = await api.lookupCertificateByCCCD(cccd);
      console.log('📋 Certificate data received:', data);
      
      setResults(data);
      setHasSearched(true);
      
      if (data.length === 0) {
        setErrorMessage('Không tìm thấy thông tin chứng chỉ với số CCCD/CMND này');
        setTimeout(() => setErrorMessage(''), 5000);
      }
      
      // Call callback if provided
      onSearch?.(cccd);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
      setHasSearched(true);
      setErrorMessage('Có lỗi xảy ra khi tra cứu. Vui lòng thử lại sau');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCccd('');
    setResults([]);
    setHasSearched(false);
    setErrorMessage('');
  };

  return {
    cccd,
    results,
    hasSearched,
    isLoading,
    errorMessage,
    setCccd,
    setErrorMessage,
    handleSearch,
    handleReset,
  };
}
