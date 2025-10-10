import { LayoutMode } from '../hooks/useViewport';

// Responsive breakpoint constants
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1024
} as const;

// Touch interaction configuration
export const TOUCH_CONFIG = {
  swipeThreshold: 50,      // Minimum distance for swipe gesture
  tapTimeout: 300,         // Maximum time for tap gesture
  longPressTimeout: 500,   // Minimum time for long press
  dragThreshold: 10        // Minimum distance to start drag
} as const;

// Animation durations for responsive transitions
export const ANIMATION_DURATIONS = {
  layoutTransition: 300,
  drawerSlide: 250,
  terminalExpand: 200,
  fadeTransition: 150
} as const;

// Z-index layers for responsive components
export const Z_INDEX = {
  background: 0,
  content: 10,
  header: 20,
  navigation: 30,
  terminal: 25,
  overlay: 40,
  modal: 50
} as const;

/**
 * Get responsive class names based on layout mode
 */
export const getLayoutClasses = (layoutMode: LayoutMode): string => {
  switch (layoutMode) {
    case LayoutMode.SINGLE_PANEL:
      return 'flex flex-col h-screen';
    case LayoutMode.DUAL_PANEL:
      return 'flex flex-col lg:flex-row h-screen';
    case LayoutMode.THREE_PANEL:
      return 'flex flex-col h-screen';
    default:
      return 'flex flex-col h-screen';
  }
};

/**
 * Get responsive terminal classes based on device type
 */
export const getTerminalClasses = (isMobile: boolean, isExpanded: boolean): string => {
  if (isMobile) {
    return `fixed bottom-0 left-0 right-0 transition-transform duration-${ANIMATION_DURATIONS.terminalExpand} ${
      isExpanded ? 'translate-y-0' : 'translate-y-full'
    }`;
  }
  return 'border-t border-border relative';
};

/**
 * Get responsive navigation classes
 */
export const getNavigationClasses = (isMobile: boolean, isOpen: boolean): string => {
  if (isMobile) {
    return `fixed inset-y-0 left-0 w-80 max-w-[80vw] transform transition-transform duration-${ANIMATION_DURATIONS.drawerSlide} ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`;
  }
  return 'w-48 border-r border-border';
};

/**
 * Get responsive overlay classes
 */
export const getOverlayClasses = (isVisible: boolean): string => {
  return `fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-${ANIMATION_DURATIONS.fadeTransition} ${
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;
};

/**
 * Check if device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get optimal terminal height for mobile devices
 */
export const getMobileTerminalHeight = (viewportHeight: number, isExpanded: boolean): string => {
  if (!isExpanded) return '60px'; // Collapsed height showing just the header
  
  // Expanded height should be 60% of viewport height, but at least 300px and at most 80%
  const minHeight = 300;
  const maxHeight = viewportHeight * 0.8;
  const preferredHeight = viewportHeight * 0.6;
  
  const height = Math.max(minHeight, Math.min(maxHeight, preferredHeight));
  return `${height}px`;
};

/**
 * Get responsive font sizes for different screen sizes
 */
export const getResponsiveFontSize = (isMobile: boolean, isTablet: boolean): string => {
  if (isMobile) return 'text-sm';
  if (isTablet) return 'text-base';
  return 'text-base';
};

/**
 * Get responsive padding classes
 */
export const getResponsivePadding = (isMobile: boolean): string => {
  return isMobile ? 'p-4' : 'p-6';
};

/**
 * Get responsive grid columns for content layout
 */
export const getResponsiveGridCols = (isMobile: boolean, isTablet: boolean): string => {
  if (isMobile) return 'grid-cols-1';
  if (isTablet) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll and resize events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
