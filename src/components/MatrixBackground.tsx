import { useEffect, useRef, useState } from "react";
import { getPerformanceMonitor, debounce } from "@/utils/performance";
import { Z_INDEX } from "@/utils/responsive";

interface MatrixConfig {
  fontSize: number;
  animationSpeed: number;
  particleDensity: number;
  opacity: number;
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [config, setConfig] = useState<MatrixConfig>({
    fontSize: 14,
    animationSpeed: 33,
    particleDensity: 1,
    opacity: 0.3
  });
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Function to update canvas size based on scroll container
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Get the scroll container (editor content area)
      const scrollContainer = container.closest('.editor-smooth-scroll');
      if (!scrollContainer) return;
      
      const scrollRect = scrollContainer.getBoundingClientRect();
      const scrollHeight = scrollContainer.scrollHeight;
      
      // Use the full scrollable height, not just viewport height
      canvas.width = scrollRect.width * dpr;
      canvas.height = scrollHeight * dpr;

      ctx.scale(dpr, dpr);
      
      // Set CSS size to match scroll container
      canvas.style.width = `${scrollRect.width}px`;
      canvas.style.height = `${scrollHeight}px`;
      
      setContentHeight(scrollHeight);
    };

    updateCanvasSize();

    // Japanese Katakana characters + numbers for authentic Matrix look
    const chars = 'ãƒãƒ„ã‚½ãƒœãƒ¯ã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½ã‚¿ãƒã‚¿ãƒ†ãƒˆãƒŠãƒ‹ãƒŒãƒã‚¯ãƒã‚·ãƒ•ãƒ˜ãƒ›ãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ¤ãƒ¦ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const actualColumns = Math.floor((canvas.width / window.devicePixelRatio) / config.fontSize);
    const maxColumns = Math.floor(actualColumns * config.particleDensity);
    
    // Initialize drops with random starting positions and speeds
    const drops: { y: number; speed: number; chars: string[] }[] = [];
    for (let i = 0; i < maxColumns; i++) {
      drops.push({
        y: Math.random() * -100, // Start above canvas
        speed: 0.5 + Math.random() * 1, // Varying speeds
        chars: [] // Store previous characters for trail effect
      });
    }

    let lastTime = 0;

    const draw = (currentTime: number) => {
      // Throttle animation based on config
      if (currentTime - lastTime < config.animationSpeed) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      lastTime = currentTime;

      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;

      // Fade effect for trails (stronger fade for better text visibility)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `${config.fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * config.fontSize;
        const y = drop.y * config.fontSize;

        // Draw the bright head of the trail (much more subtle)
        const headChar = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Reduced from 0.8
        ctx.fillText(headChar, x, y);

        // Draw the green trail behind it (very subtle)
        for (let j = 1; j < 8; j++) {
          const trailY = y - (j * config.fontSize);
          if (trailY > 0) {
            const brightness = Math.max(0, 150 - (j * 25)); // Reduced from 200
            const opacity = Math.max(0, 0.3 - (j * 0.05)); // Reduced from 0.6
            ctx.fillStyle = `rgba(0, ${brightness}, 0, ${opacity})`;
            const trailChar = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(trailChar, x, trailY);
          }
        }

        // Randomly change characters in the trail for that "glitchy" effect (very rare and subtle)
        if (Math.random() > 0.99 && y > 0 && y < canvasHeight) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.2)'; // Much more subtle
          const randomChar = chars[Math.floor(Math.random() * chars.length)];
          const randomTrailPos = y - (Math.floor(Math.random() * 8) * config.fontSize);
          ctx.fillText(randomChar, x, randomTrailPos);
        }

        // Move drop down
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y * config.fontSize > canvasHeight + 100) {
          drop.y = Math.random() * -20; // Random start position above canvas
          drop.speed = 0.5 + Math.random() * 1; // Random speed
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    // Use ResizeObserver and MutationObserver to track content changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === container || entry.target.closest('.editor-smooth-scroll')) {
          updateCanvasSize();
          // Recalculate drops array for new canvas size
          const newActualColumns = Math.floor((canvas.width / window.devicePixelRatio) / config.fontSize);
          const newMaxColumns = Math.floor(newActualColumns * config.particleDensity);
          
          // Adjust drops array
          while (drops.length < newMaxColumns) {
            drops.push({
              y: Math.random() * -100,
              speed: 0.5 + Math.random() * 1,
              chars: []
            });
          }
          drops.length = newMaxColumns;
        }
      }
    });

    // Observe both the container and the scroll container
    resizeObserver.observe(container);
    const scrollContainer = container.closest('.editor-smooth-scroll');
    if (scrollContainer) {
      resizeObserver.observe(scrollContainer);
    }

    // Also observe content changes that might affect scroll height
    const mutationObserver = new MutationObserver(() => {
      updateCanvasSize();
    });

    if (scrollContainer) {
      mutationObserver.observe(scrollContainer, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [config]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ height: contentHeight || '100vh' }}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          opacity: Math.max(config.opacity, 0.25),
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          zIndex: 0
        }}
      />
    </div>
  );
};

export default MatrixBackground;
