import { ViewportConfig, LayoutMode } from '../hooks/useViewport';

// Default responsive configuration
export const DEFAULT_RESPONSIVE_CONFIG: ViewportConfig = {
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

// CSS custom properties for responsive design
export const CSS_VARIABLES = {
  // Mobile terminal heights
  '--mobile-terminal-collapsed': '60px',
  '--mobile-terminal-expanded': '60vh',
  '--mobile-terminal-min': '300px',
  '--mobile-terminal-max': '80vh',
  
  // Navigation drawer width
  '--mobile-nav-width': '320px',
  '--mobile-nav-max-width': '80vw',
  
  // Animation durations
  '--transition-layout': '300ms',
  '--transition-drawer': '250ms',
  '--transition-terminal': '200ms',
  '--transition-fade': '150ms',
  
  // Touch target sizes
  '--touch-target-min': '44px',
  '--touch-target-comfortable': '48px',
  
  // Responsive spacing
  '--spacing-mobile': '1rem',
  '--spacing-tablet': '1.5rem',
  '--spacing-desktop': '2rem'
} as const;

// Tailwind responsive classes mapping
export const RESPONSIVE_CLASSES = {
  // Layout containers
  singlePanel: 'flex flex-col h-screen',
  dualPanel: 'flex flex-col lg:flex-row h-screen',
  threePanel: 'flex flex-col h-screen',
  
  // Navigation states
  mobileNavHidden: 'fixed inset-y-0 left-0 w-80 max-w-[80vw] transform -translate-x-full transition-transform duration-250',
  mobileNavVisible: 'fixed inset-y-0 left-0 w-80 max-w-[80vw] transform translate-x-0 transition-transform duration-250',
  desktopNav: 'w-48 border-r border-border',
  
  // Terminal states
  mobileTerminalCollapsed: 'fixed bottom-0 left-0 right-0 h-15 transform translate-y-0 transition-transform duration-200',
  mobileTerminalExpanded: 'fixed bottom-0 left-0 right-0 h-[60vh] min-h-[300px] max-h-[80vh] transform translate-y-0 transition-transform duration-200',
  mobileTerminalHidden: 'fixed bottom-0 left-0 right-0 transform translate-y-full transition-transform duration-200',
  desktopTerminal: 'border-t border-border relative',
  
  // Overlay
  overlayVisible: 'fixed inset-0 bg-black/50 backdrop-blur-sm opacity-100 transition-opacity duration-150',
  overlayHidden: 'fixed inset-0 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-150',
  
  // Touch targets
  touchTarget: 'min-h-[44px] min-w-[44px]',
  touchTargetComfortable: 'min-h-[48px] min-w-[48px]',
  
  // Responsive text
  textMobile: 'text-sm',
  textTablet: 'text-base',
  textDesktop: 'text-base',
  
  // Responsive padding
  paddingMobile: 'p-4',
  paddingTablet: 'p-5',
  paddingDesktop: 'p-6',
  
  // Responsive grids
  gridMobile: 'grid-cols-1',
  gridTablet: 'grid-cols-1 md:grid-cols-2',
  gridDesktop: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
} as const;

// Media queries for CSS-in-JS solutions
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${DEFAULT_RESPONSIVE_CONFIG.breakpoints.mobile - 1}px)`,
  tablet: `(min-width: ${DEFAULT_RESPONSIVE_CONFIG.breakpoints.mobile}px) and (max-width: ${DEFAULT_RESPONSIVE_CONFIG.breakpoints.tablet - 1}px)`,
  desktop: `(min-width: ${DEFAULT_RESPONSIVE_CONFIG.breakpoints.desktop}px)`,
  landscape: '(orientation: landscape)',
  portrait: '(orientation: portrait)',
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)'
} as const;
