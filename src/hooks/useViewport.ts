import { useState, useEffect } from 'react';
import { debounce, throttle } from '@/utils/performance';

export interface ViewportConfig {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  layouts: {
    mobile: LayoutMode;
    tablet: LayoutMode;
    desktop: LayoutMode;
  };
}

export enum LayoutMode {
  SINGLE_PANEL = 'single',
  DUAL_PANEL = 'dual',
  THREE_PANEL = 'three'
}

export interface ViewportState {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  layoutMode: LayoutMode;
}

const DEFAULT_CONFIG: ViewportConfig = {
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1024
  },
  layouts: {
    mobile: LayoutMode.SINGLE_PANEL,
    tablet: LayoutMode.DUAL_PANEL,
    desktop: LayoutMode.THREE_PANEL
  }
};

export const useViewport = (config: ViewportConfig = DEFAULT_CONFIG) => {
  const [viewport, setViewport] = useState<ViewportState>(() => {
    // Initialize with safe defaults for SSR
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        layoutMode: LayoutMode.THREE_PANEL
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < config.breakpoints.mobile;
    const isTablet = width >= config.breakpoints.mobile && width < config.breakpoints.tablet;
    const isDesktop = width >= config.breakpoints.desktop;
    const orientation = width > height ? 'landscape' : 'portrait';
    
    let layoutMode: LayoutMode;
    if (isMobile) {
      layoutMode = config.layouts.mobile;
    } else if (isTablet) {
      layoutMode = config.layouts.tablet;
    } else {
      layoutMode = config.layouts.desktop;
    }

    return {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      orientation,
      layoutMode
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < config.breakpoints.mobile;
      const isTablet = width >= config.breakpoints.mobile && width < config.breakpoints.tablet;
      const isDesktop = width >= config.breakpoints.desktop;
      const orientation = width > height ? 'landscape' : 'portrait';
      
      let layoutMode: LayoutMode;
      if (isMobile) {
        layoutMode = config.layouts.mobile;
      } else if (isTablet) {
        layoutMode = config.layouts.tablet;
      } else {
        layoutMode = config.layouts.desktop;
      }

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        layoutMode
      });
    };

    // Use optimized debounce for resize events
    const debouncedHandleResize = debounce(handleResize, 100);
    
    // Use throttle for orientation changes (they can fire rapidly)
    const throttledHandleOrientation = throttle(handleResize, 200);

    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('orientationchange', throttledHandleOrientation);

    // Initial call to set correct values
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      window.removeEventListener('orientationchange', throttledHandleOrientation);
    };
  }, [config]);

  return viewport;
};
