import { useRef, useCallback, useEffect } from 'react';
import { TOUCH_CONFIG } from '../utils/responsive';

export interface TouchGestureHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
}

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

export const useTouchGestures = (
  elementRef: React.RefObject<HTMLElement>,
  handlers: TouchGestureHandlers
) => {
  const touchStartRef = useRef<TouchPoint | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    };

    isLongPressRef.current = false;

    // Start long press timer
    if (handlers.onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        handlers.onLongPress?.();
      }, TOUCH_CONFIG.longPressTimeout);
    }
  }, [handlers]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = event.touches[0];
    if (!touch) return;

    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // Cancel long press if finger moves too much
    if ((deltaX > TOUCH_CONFIG.dragThreshold || deltaY > TOUCH_CONFIG.dragThreshold) && longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!touchStartRef.current) return;

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Don't process tap if it was a long press
    if (isLongPressRef.current) {
      touchStartRef.current = null;
      return;
    }

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.timestamp;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check for swipe gestures
    if (absDeltaX > TOUCH_CONFIG.swipeThreshold || absDeltaY > TOUCH_CONFIG.swipeThreshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.();
        } else {
          handlers.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.();
        } else {
          handlers.onSwipeUp?.();
        }
      }
    } else if (
      absDeltaX < TOUCH_CONFIG.dragThreshold &&
      absDeltaY < TOUCH_CONFIG.dragThreshold &&
      deltaTime < TOUCH_CONFIG.tapTimeout
    ) {
      // Tap gesture
      handlers.onTap?.();
    }

    touchStartRef.current = null;
  }, [handlers]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add passive listeners for better performance
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      // Cleanup timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    // Expose refs for manual cleanup if needed
    touchStartRef,
    longPressTimerRef
  };
};
