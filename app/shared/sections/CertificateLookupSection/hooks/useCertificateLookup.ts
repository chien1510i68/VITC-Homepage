/**
 * useCertificateLookup Hook - Manages certificate lookup logic
 * @module shared/sections/CertificateLookupSection/hooks
 */

import { useState, useEffect } from 'react';
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
  page: number;
  setPage: (page: number) => void;
  totalResults: number;
  pageSize: number;
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
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (targetPage: number = 0) => {
    if (!cccd.trim()) {
      setErrorMessage('Vui lòng nhập số CCCD/CMND');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const data = await api.lookupCertificateByCCCD(cccd, targetPage, pageSize);
      
      setResults(data.items);
      setTotalResults(data.total);
      setHasSearched(true);
      
      if (data.items.length === 0) {
        setErrorMessage('Không tìm thấy thông tin chứng chỉ với số CCCD/CMND này');
        setTimeout(() => setErrorMessage(''), 5000);
      }
      
      // Call callback if provided
      onSearch?.(cccd);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
      setTotalResults(0);
      setHasSearched(true);
      setErrorMessage('Có lỗi xảy ra khi tra cứu. Vui lòng thử lại sau');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-run search when page changes
  useEffect(() => {
    if (hasSearched) {
      handleSearch(page);
    }
  }, [page]);

  const handleReset = () => {
    setCccd('');
    setResults([]);
    setTotalResults(0);
    setPage(0);
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
    handleSearch: () => {
      if (page !== 0) setPage(0);
      else handleSearch(0);
      return Promise.resolve();
    },
    handleReset,
    page,
    setPage,
    totalResults,
    pageSize,
  };
}
