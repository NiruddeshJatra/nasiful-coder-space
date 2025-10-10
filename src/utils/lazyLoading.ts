/**
 * Lazy loading utilities for performance optimization
 */

import React, { lazy, ComponentType, LazyExoticComponent } from 'react';

// Intersection Observer for lazy loading components
export class LazyComponentLoader {
  private static observer: IntersectionObserver | null = null;
  private static callbacks = new Map<Element, () => void>();

  static init() {
    if (typeof window === 'undefined' || this.observer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback();
              this.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Load components 50px before they come into view
        threshold: 0.1
      }
    );
  }

  static observe(element: Element, callback: () => void) {
    this.init();
    if (!this.observer) return;

    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  static unobserve(element: Element) {
    if (!this.observer) return;

    this.observer.unobserve(element);
    this.callbacks.delete(element);
  }

  static disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.callbacks.clear();
      this.observer = null;
    }
  }
}

// Enhanced lazy loading with error boundaries and loading states
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType
): LazyExoticComponent<T> => {
  return lazy(async () => {
    try {
      // Add artificial delay on slow connections for better UX
      const connection = (navigator as any).connection;
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const module = await importFunc();
      return module;
    } catch (error) {
      console.warn('Failed to load component:', error);

      // Return fallback component if available
      if (fallback) {
        return { default: fallback as T };
      }

      // Return minimal error component
      const ErrorComponent = () => React.createElement('div',
        { className: 'p-4 text-center text-gray-500' },
        'Failed to load component'
      );

      return { default: ErrorComponent as unknown as T };
    }
  });
};

// Memory-efficient component preloader
export class ComponentPreloader {
  private static preloadedComponents = new Set<string>();
  private static preloadPromises = new Map<string, Promise<any>>();

  static preload(componentName: string, importFunc: () => Promise<any>) {
    if (this.preloadedComponents.has(componentName)) {
      return this.preloadPromises.get(componentName);
    }

    const promise = importFunc().then((module) => {
      this.preloadedComponents.add(componentName);
      return module;
    }).catch((error) => {
      console.warn(`Failed to preload component ${componentName}:`, error);
      throw error;
    });

    this.preloadPromises.set(componentName, promise);
    return promise;
  }

  static isPreloaded(componentName: string): boolean {
    return this.preloadedComponents.has(componentName);
  }

  static clearCache() {
    this.preloadedComponents.clear();
    this.preloadPromises.clear();
  }
}

// Adaptive loading based on device capabilities
export const shouldLazyLoad = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Don't lazy load on high-end devices with good connections
  const connection = (navigator as any).connection;
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency || 2;

  // High-end device detection
  const isHighEnd = cores >= 4 && (!memory || memory >= 4);
  const isFastConnection = !connection ||
    (connection.effectiveType === '4g' && connection.downlink >= 10);

  return !(isHighEnd && isFastConnection);
};

// Resource hints for better loading performance
export const addResourceHints = (urls: string[], type: 'preload' | 'prefetch' = 'prefetch') => {
  if (typeof document === 'undefined') return;

  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = type;
    link.href = url;

    if (type === 'preload') {
      link.as = 'script';
    }

    document.head.appendChild(link);
  });
};

// Memory usage monitoring for lazy loading decisions
export const getMemoryPressure = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'low';

  const memory = (performance as any).memory;
  if (!memory) return 'low';

  const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

  if (usage > 0.8) return 'high';
  if (usage > 0.6) return 'medium';
  return 'low';
};