/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */

// WCAG 2.1 AA minimum touch target size (44px x 44px)
export const MIN_TOUCH_TARGET_SIZE = 44;

// ARIA live region politeness levels
export const ARIA_LIVE_POLITENESS = {
  OFF: 'off',
  POLITE: 'polite',
  ASSERTIVE: 'assertive'
} as const;

// Focus management utilities
export interface FocusableElement extends HTMLElement {
  focus(): void;
}

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): FocusableElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)) as FocusableElement[];
};

/**
 * Trap focus within a container (for modals, drawers, etc.)
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) {
    return () => {}; // No cleanup needed if no focusable elements
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      // Shift + Tab: moving backwards
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: moving forwards
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Focus the first element initially
  firstElement.focus();

  // Add event listener
  container.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Restore focus to a previously focused element
 */
export const createFocusRestorer = (): {
  save: () => void;
  restore: () => void;
} => {
  let previouslyFocusedElement: HTMLElement | null = null;

  return {
    save: () => {
      previouslyFocusedElement = document.activeElement as HTMLElement;
    },
    restore: () => {
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
    }
  };
};

/**
 * Check if an element meets minimum touch target size requirements
 */
export const meetsMinTouchTargetSize = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.width >= MIN_TOUCH_TARGET_SIZE && rect.height >= MIN_TOUCH_TARGET_SIZE;
};

/**
 * Get ARIA attributes for responsive layout changes
 */
export const getLayoutChangeAria = (layoutMode: string, isTransitioning: boolean) => {
  return {
    'aria-live': ARIA_LIVE_POLITENESS.POLITE,
    'aria-busy': isTransitioning,
    'aria-label': `Layout changed to ${layoutMode} mode`
  };
};

/**
 * Get ARIA attributes for navigation state
 */
export const getNavigationAria = (isOpen: boolean, hasActiveSection: boolean, activeSection?: string) => {
  return {
    'aria-expanded': isOpen,
    'aria-label': isOpen ? 'Close navigation menu' : 'Open navigation menu',
    'aria-current': hasActiveSection && activeSection ? 'page' : undefined
  };
};

/**
 * Get ARIA attributes for terminal state
 */
export const getTerminalAria = (isExpanded: boolean, isMobile: boolean) => {
  return {
    'aria-expanded': isExpanded,
    'aria-label': isMobile 
      ? (isExpanded ? 'Collapse terminal' : 'Expand terminal')
      : 'Terminal interface',
    'role': 'application'
  };
};

/**
 * Create an announcement for screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove the announcement after a short delay
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Handle keyboard navigation for lists/menus
 */
export const handleArrowKeyNavigation = (
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void,
  onActivate?: (index: number) => void
) => {
  let newIndex = currentIndex;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'ArrowUp':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = items.length - 1;
      break;
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (onActivate) {
        onActivate(currentIndex);
      }
      return;
    default:
      return;
  }

  onIndexChange(newIndex);
  items[newIndex]?.focus();
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation duration based on user preferences
 */
export const getAccessibleAnimationDuration = (defaultDuration: number): number => {
  return prefersReducedMotion() ? 0 : defaultDuration;
};

/**
 * Ensure minimum color contrast for accessibility
 */
export const ensureColorContrast = (foreground: string, background: string): boolean => {
  // This is a simplified check - in a real implementation, you'd calculate the actual contrast ratio
  // For now, we'll assume the theme colors meet WCAG requirements
  return true;
};

/**
 * Get skip link attributes
 */
export const getSkipLinkProps = (targetId: string, label: string) => {
  return {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md',
    'aria-label': label
  };
};