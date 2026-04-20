/**
 * Lazy-loaded components for performance optimization
 */

import { Suspense, ComponentType } from 'react';
import { createLazyComponent, shouldLazyLoad } from '@/utils/lazyLoading';

// Loading fallback component
const LoadingFallback = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-800/20 rounded ${className}`}>
    <div className="h-full w-full bg-gradient-to-r from-gray-800/10 to-gray-700/10" />
  </div>
);

// Lazy load MatrixBackground for better initial load performance
export const LazyMatrixBackground = createLazyComponent(
  () => import('./MatrixBackground'),
  () => <div className="fixed inset-0 bg-black/5 pointer-events-none z-0" />
);

// Lazy load Terminal for mobile (can be loaded when needed)
export const LazyTerminal = createLazyComponent(
  () => import('./Terminal'),
  () => (
    <LoadingFallback className="h-full w-full flex items-center justify-center">
      <span className="text-green-400 font-mono">Loading terminal...</span>
    </LoadingFallback>
  )
);

// Lazy load ResponsiveTerminal
export const LazyResponsiveTerminal = createLazyComponent(
  () => import('./ResponsiveTerminal'),
  () => (
    <LoadingFallback className="h-56 border-t border-border">
      <div className="flex items-center justify-center h-full">
        <span className="text-green-400 font-mono text-sm">Loading terminal...</span>
      </div>
    </LoadingFallback>
  )
);

// Wrapper component that decides whether to lazy load or not
interface ConditionalLazyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  condition?: boolean;
}

export const ConditionalLazy: React.FC<ConditionalLazyProps> = ({ 
  children, 
  fallback = <LoadingFallback />,
  condition = shouldLazyLoad()
}) => {
  if (!condition) {
    return <>{children}</>;
  }

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Higher-order component for lazy loading
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: ComponentType
) => {
  const LazyComponent = createLazyComponent(
    () => Promise.resolve({ default: Component }),
    fallback
  );

  return (props: P) => (
    <ConditionalLazy>
      <LazyComponent {...props} />
    </ConditionalLazy>
  );
};

// Performance-optimized component wrapper
interface PerformanceWrapperProps {
  children: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
  className?: string;
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({
  children,
  priority,
  className = ''
}) => {
  const shouldDefer = priority === 'low' && shouldLazyLoad();

  if (shouldDefer) {
    return (
      <ConditionalLazy fallback={<LoadingFallback className={className} />}>
        <div className={className}>{children}</div>
      </ConditionalLazy>
    );
  }

  return <div className={className}>{children}</div>;
};