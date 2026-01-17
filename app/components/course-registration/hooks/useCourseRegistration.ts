'use client';

/**
 * Course Registration Hook
 * 
 * Hook to manage course registration modal state
 * 
 * @module app/components/course-registration/hooks
 */

import { useState, useCallback } from 'react';

interface UseCourseRegistrationReturn {
  isOpen: boolean;
  selectedCourseId: string | undefined;
  openModal: (courseId?: string) => void;
  closeModal: () => void;
}

export function useCourseRegistration(): UseCourseRegistrationReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  const openModal = useCallback((courseId?: string) => {
    setSelectedCourseId(courseId);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Clear selected course after modal closes
    setTimeout(() => setSelectedCourseId(undefined), 300);
  }, []);

  return {
    isOpen,
    selectedCourseId,
    openModal,
    closeModal,
  };
}
