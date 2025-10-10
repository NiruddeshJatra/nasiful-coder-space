import { useEffect, useRef, useState } from "react";
import { getPerformanceMonitor, debounce } from "@/utils/performance";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MatrixConfig {
  fontSize: number;
  animationSpeed: number;
  particleDensity: number;
  opacity: number;
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { prefersReducedMotion } = useReducedMotion();
  const [config, setConfig] = useState<MatrixConfig>({
    fontSize: 14,
    animationSpeed: 33,
    particleDensity: 1,
    opacity: 0.1
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if user prefers reduced motion
    if (prefersReducedMotion) {
      canvas.style.display = 'none';
      return;
    }

    // Performance monitoring setup
    const performanceMonitor = getPerformanceMonitor();
    
    const updateConfig = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const fps = performanceMonitor.getCurrentFPS();
      
      // Adaptive configuration based on device and performance
      let newConfig: MatrixConfig;
      
      if (isMobile) {
        // Significantly reduced complexity for mobile
        newConfig = {
          fontSize: 16,
          animationSpeed: fps < 30 ? 100 : 66, // Slower animation on low-end devices
          particleDensity: fps < 30 ? 0.3 : 0.5, // Fewer particles
          opacity: 0.05 // Lower opacity
        };
      } else if (isTablet) {
        // Moderate complexity for tablets
        newConfig = {
          fontSize: 14,
          animationSpeed: fps < 30 ? 66 : 50,
          particleDensity: fps < 30 ? 0.5 : 0.7,
          opacity: 0.08
        };
      } else {
        // Full complexity for desktop
        newConfig = {
          fontSize: 14,
          animationSpeed: fps < 30 ? 50 : 33,
          particleDensity: fps < 30 ? 0.7 : 1,
          opacity: 0.1
        };
      }
      
      setConfig(newConfig);
    };

    // Initial config update
    updateConfig();

    // Subscribe to performance changes
    const unsubscribe = performanceMonitor.subscribe((metrics) => {
      // Adjust config if FPS drops significantly
      if (metrics.fps < 20) {
        setConfig(prev => ({
          ...prev,
          animationSpeed: Math.max(prev.animationSpeed * 1.5, 100),
          particleDensity: Math.max(prev.particleDensity * 0.7, 0.2)
        }));
      }
    });

    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/';
    const actualColumns = Math.floor((canvas.width / window.devicePixelRatio) / config.fontSize);
    const maxColumns = Math.floor(actualColumns * config.particleDensity);
    const drops: number[] = Array(maxColumns).fill(1);
    
    let lastTime = 0;
    
    const draw = (currentTime: number) => {
      // Throttle animation based on config
      if (currentTime - lastTime < config.animationSpeed) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = currentTime;
      
      // Use hardware-accelerated compositing
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(0, 0, 0, ${config.opacity * 2})`;
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      ctx.fillStyle = '#0f0';
      ctx.font = config.fontSize + 'px monospace';
      ctx.globalCompositeOperation = 'lighter';
      
      // Batch character rendering for better performance
      ctx.beginPath();
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * (config.fontSize * (actualColumns / maxColumns));
        const y = drops[i] * config.fontSize;
        
        ctx.fillText(text, x, y);
        
        if (drops[i] * config.fontSize > (canvas.height / window.devicePixelRatio) && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    animationRef.current = requestAnimationFrame(draw);
    
    // Debounced resize handler
    const handleResize = debounce(() => {
      updateCanvasSize();
      // Recalculate drops array for new canvas size
      const newActualColumns = Math.floor((canvas.width / window.devicePixelRatio) / config.fontSize);
      const newMaxColumns = Math.floor(newActualColumns * config.particleDensity);
      drops.length = newMaxColumns;
      drops.fill(1);
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [config]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: config.opacity,
        willChange: 'transform',
        transform: 'translate3d(0,0,0)' // Force hardware acceleration
      }} 
    />
  );
};

export default MatrixBackground;
