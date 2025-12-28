'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseConsultationPopupOptions {
  delayTime?: number; // Time in milliseconds before showing popup (default: 30s)
  exitIntentEnabled?: boolean; // Enable exit intent detection
  showOnce?: boolean; // Show only once per session
}

export const useConsultationPopup = (options: UseConsultationPopupOptions = {}) => {
  const {
    delayTime = 30000, // 30 seconds
    exitIntentEnabled = true,
    showOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Check if popup has been shown before (using localStorage for persistence)
  useEffect(() => {
    if (showOnce) {
      const hasShownBefore = localStorage.getItem('consultation-popup-shown');
      if (hasShownBefore) {
        setHasShown(true);
      }
    }
  }, [showOnce]);

  // Exit intent detection
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (hasShown) return;
    
    // Check if mouse is leaving from the top of the viewport
    if (e.clientY <= 0) {
      setIsVisible(true);
      if (showOnce) {
        setHasShown(true);
        localStorage.setItem('consultation-popup-shown', 'true');
      }
    }
  }, [hasShown, showOnce]);

  // Timer-based popup
  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      if (showOnce) {
        setHasShown(true);
        localStorage.setItem('consultation-popup-shown', 'true');
      }
    }, delayTime);

    return () => clearTimeout(timer);
  }, [delayTime, hasShown, showOnce]);

  // Exit intent listener
  useEffect(() => {
    if (!exitIntentEnabled || hasShown) return;

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitIntentEnabled, handleMouseLeave, hasShown]);

  // Mobile exit intent (when user scrolls to top rapidly)
  useEffect(() => {
    if (!exitIntentEnabled || hasShown) return;

    let lastScrollTop = 0;
    let scrollingUp = false;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop < lastScrollTop) {
        scrollingUp = true;
      } else {
        scrollingUp = false;
      }
      
      // If user scrolls to very top quickly, show popup
      if (scrollTop === 0 && scrollingUp && lastScrollTop > 100) {
        setIsVisible(true);
        if (showOnce) {
          setHasShown(true);
          localStorage.setItem('consultation-popup-shown', 'true');
        }
      }
      
      lastScrollTop = scrollTop;
    };

    // Only on mobile devices
    if (window.innerWidth <= 768) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [exitIntentEnabled, hasShown, showOnce]);

  const closePopup = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showPopup = useCallback(() => {
    if (!hasShown) {
      setIsVisible(true);
      if (showOnce) {
        setHasShown(true);
        localStorage.setItem('consultation-popup-shown', 'true');
      }
    }
  }, [hasShown, showOnce]);

  // Reset function for testing
  const resetPopup = useCallback(() => {
    setHasShown(false);
    setIsVisible(false);
    localStorage.removeItem('consultation-popup-shown');
  }, []);

  return {
    isVisible,
    closePopup,
    showPopup,
    resetPopup,
    hasShown
  };
};