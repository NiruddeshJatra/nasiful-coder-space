import { useState, useCallback, useEffect } from 'react';
import { LayoutMode, useViewport } from './useViewport';

export interface NavigationState {
  isMobileMenuOpen: boolean;
  isTerminalExpanded: boolean;
  currentLayout: LayoutMode;
  orientation: 'portrait' | 'landscape';
}

export interface ResponsiveLayoutActions {
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleTerminal: () => void;
  setTerminalExpanded: (expanded: boolean) => void;
}

export const useResponsiveLayout = () => {
  const viewport = useViewport();
  
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isMobileMenuOpen: false,
    isTerminalExpanded: false,
    currentLayout: viewport.layoutMode,
    orientation: viewport.orientation
  });

  // Update layout state when viewport changes
  useEffect(() => {
    setNavigationState(prev => ({
      ...prev,
      currentLayout: viewport.layoutMode,
      orientation: viewport.orientation,
      // Auto-close mobile menu when switching to desktop
      isMobileMenuOpen: viewport.isMobile ? prev.isMobileMenuOpen : false
    }));
  }, [viewport.layoutMode, viewport.orientation, viewport.isMobile]);

  const toggleMobileMenu = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen
    }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      isMobileMenuOpen: false
    }));
  }, []);

  const toggleTerminal = useCallback(() => {
    setNavigationState(prev => ({
      ...prev,
      isTerminalExpanded: !prev.isTerminalExpanded
    }));
  }, []);

  const setTerminalExpanded = useCallback((expanded: boolean) => {
    setNavigationState(prev => ({
      ...prev,
      isTerminalExpanded: expanded
    }));
  }, []);

  // Handle escape key to close mobile menu and terminal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (navigationState.isMobileMenuOpen) {
          closeMobileMenu();
        } else if (navigationState.isTerminalExpanded && viewport.isMobile) {
          setTerminalExpanded(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigationState.isMobileMenuOpen, navigationState.isTerminalExpanded, viewport.isMobile, closeMobileMenu, setTerminalExpanded]);

  const actions: ResponsiveLayoutActions = {
    toggleMobileMenu,
    closeMobileMenu,
    toggleTerminal,
    setTerminalExpanded
  };

  return {
    viewport,
    navigationState,
    actions
  };
};
