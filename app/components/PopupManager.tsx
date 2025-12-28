'use client';

import React, { useEffect } from 'react';
import ConsultationPopup from './ui/ConsultationPopup';
import { useConsultationPopup } from '../hooks/useConsultationPopup';

const PopupManager: React.FC = () => {
  const { isVisible, closePopup, showPopup, resetPopup } = useConsultationPopup({
    delayTime: 30000, // 30 seconds
    exitIntentEnabled: true,
    showOnce: true
  });

  // Debug mode - press Ctrl+Shift+P to trigger popup (for testing)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        resetPopup(); // Reset first
        setTimeout(() => showPopup(), 100); // Then show
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPopup, resetPopup]);

  return (
    <ConsultationPopup 
      isVisible={isVisible} 
      onClose={closePopup} 
    />
  );
};

export default PopupManager;