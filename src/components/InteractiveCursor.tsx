import { useState, useEffect } from "react";

const InteractiveCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      <div 
        className="fixed w-4 h-4 rounded-full bg-cyan-400 pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: position.x - 8,
          top: position.y - 8,
        }}
      />
      <div 
        className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-50 transition-all duration-300"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          opacity: 0.5,
        }}
      />
    </>
  );
};

export default InteractiveCursor;
