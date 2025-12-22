'use client';

import { useState, useCallback } from 'react';
import { SearchState, SearchType } from '../types';

export interface UseSearchOptions<T = any> {
  initialType?: SearchType;
  onSearch: (value: string, type: SearchType) => Promise<T[]>;
  onError?: (error: Error) => void;
}

export interface UseSearchReturn<T = any> {
  state: SearchState;
  setValue: (value: string) => void;
  setType: (type: SearchType) => void;
  search: () => Promise<void>;
  clear: () => void;
  clearError: () => void;
}

export function useSearch<T = any>({
  initialType = 'exam',
  onSearch,
  onError,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [state, setState] = useState<SearchState>({
    value: '',
    type: initialType,
    results: [],
    isLoading: false,
    hasSearched: false,
    error: undefined,
  });

  const setValue = useCallback((value: string) => {
    setState((prev) => ({ ...prev, value, error: undefined }));
  }, []);

  const setType = useCallback((type: SearchType) => {
    setState((prev) => ({ ...prev, type, error: undefined }));
  }, []);

  const search = useCallback(async () => {
    if (!state.value.trim()) {
      setState((prev) => ({
        ...prev,
        error: 'Vui lòng nhập từ khóa tìm kiếm',
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined,
    }));

    try {
      const results = await onSearch(state.value, state.type);
      
      setState((prev) => ({
        ...prev,
        results,
        isLoading: false,
        hasSearched: true,
        error: results.length === 0 ? 'Không tìm thấy kết quả' : undefined,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tìm kiếm';
      
      setState((prev) => ({
        ...prev,
        results: [],
        isLoading: false,
        hasSearched: true,
        error: errorMessage,
      }));

      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  }, [state.value, state.type, onSearch, onError]);

  const clear = useCallback(() => {
    setState({
      value: '',
      type: initialType,
      results: [],
      isLoading: false,
      hasSearched: false,
      error: undefined,
    });
  }, [initialType]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: undefined }));
  }, []);

  return {
    state,
    setValue,
    setType,
    search,
    clear,
    clearError,
  };
}
