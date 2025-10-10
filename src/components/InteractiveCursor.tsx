import { useState, useEffect, useRef } from "react";
import { throttle, getOptimalAnimationDuration } from "@/utils/performance";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const InteractiveCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, getAnimationDuration } = useReducedMotion();
  
  useEffect(() => {
    // Hide cursor on mobile devices or if user prefers reduced motion
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile || prefersReducedMotion) {
      return;
    }

    // Throttled mouse move handler for better performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      setIsVisible(true);
      
      // Use transform instead of changing left/top for better performance
      if (innerCursorRef.current) {
        innerCursorRef.current.style.transform = `translate3d(${newPosition.x - 8}px, ${newPosition.y - 8}px, 0)`;
      }
      
      if (outerCursorRef.current) {
        outerCursorRef.current.style.transform = `translate3d(${newPosition.x - 16}px, ${newPosition.y - 16}px, 0)`;
      }
    }, 16); // ~60fps throttling
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Don't render on mobile or if not visible
  const isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isMobile || !isVisible || prefersReducedMotion) return null;
  
  const innerAnimationDuration = getAnimationDuration(getOptimalAnimationDuration(100), 0);
  const outerAnimationDuration = getAnimationDuration(getOptimalAnimationDuration(300), 0);
  
  return (
    <>
      <div 
        ref={innerCursorRef}
        className="fixed w-4 h-4 rounded-full bg-cyan-400 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0)`,
          willChange: 'transform',
          transition: `transform ${innerAnimationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        }}
      />
      <div 
        ref={outerCursorRef}
        className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
          opacity: 0.5,
          willChange: 'transform',
          transition: `transform ${outerAnimationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        }}
      />
    </>
  );
};

export default InteractiveCursor;
