import { useState, useEffect } from 'react';

/**
 * Hook to detect and respond to user's reduced motion preferences
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    prefersReducedMotion,
    // Helper functions for conditional animations
    getAnimationDuration: (normalMs: number, reducedMs: number = 0) => 
      prefersReducedMotion ? reducedMs : normalMs,
    
    getTransitionClass: (normalClass: string, reducedClass: string = '') =>
      prefersReducedMotion ? reducedClass : normalClass,
    
    shouldAnimate: () => !prefersReducedMotion
  };
};