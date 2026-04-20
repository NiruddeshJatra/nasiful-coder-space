import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MatrixConfig {
  fontSize: number;
  animationSpeed: number;
  particleDensity: number;
  opacity: number;
}

const KATAKANA = Array.from({ length: 59 }, (_, i) =>
  String.fromCodePoint(0xff65 + i)
);
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const CHARS: string[] = [...KATAKANA, ...DIGITS];

const HEAD_COLOR = "#CFFFCF";
const TRAIL_BRIGHT = { r: 0, g: 255, b: 102 };
const TRAIL_DIM = { r: 0, g: 51, b: 17 };
const TRAIL_FADE_RGBA = "rgba(10, 14, 10, 0.08)";

interface Drop {
  y: number;
  speed: number;
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const { prefersReducedMotion } = useReducedMotion();
  const [config] = useState<MatrixConfig>({
    fontSize: 14,
    animationSpeed: 33,
    particleDensity: 1,
    opacity: 0.35,
  });
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const scrollContainer = container.closest(".editor-smooth-scroll");
      if (!scrollContainer) return;

      const scrollRect = scrollContainer.getBoundingClientRect();
      const scrollHeight = scrollContainer.scrollHeight;

      canvas.width = scrollRect.width * dpr;
      canvas.height = scrollHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${scrollRect.width}px`;
      canvas.style.height = `${scrollHeight}px`;

      setContentHeight(scrollHeight);
    };

    updateCanvasSize();

    const actualColumns = Math.floor(
      canvas.width / window.devicePixelRatio / config.fontSize
    );
    const maxColumns = Math.floor(actualColumns * config.particleDensity);

    const drops: Drop[] = [];
    for (let i = 0; i < maxColumns; i++) {
      drops.push({
        y: Math.random() * -100,
        speed: 0.5 + Math.random() * 1,
      });
    }

    const pickChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const drawMirroredGlyph = (char: string, x: number, y: number) => {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.fillText(char, -x - config.fontSize, y);
      ctx.restore();
    };

    let lastTime = 0;

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < config.animationSpeed) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;

      ctx.fillStyle = TRAIL_FADE_RGBA;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `${config.fontSize}px "JetBrains Mono", "Fira Code", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * config.fontSize;
        const y = drop.y * config.fontSize;

        // White lead character
        ctx.fillStyle = HEAD_COLOR;
        drawMirroredGlyph(pickChar(), x, y);

        // Green trail, dimming with distance from head
        for (let j = 1; j < 10; j++) {
          const trailY = y - j * config.fontSize;
          if (trailY < 0) break;
          const t = j / 10;
          const r = Math.round(TRAIL_BRIGHT.r + (TRAIL_DIM.r - TRAIL_BRIGHT.r) * t);
          const g = Math.round(TRAIL_BRIGHT.g + (TRAIL_DIM.g - TRAIL_BRIGHT.g) * t);
          const b = Math.round(TRAIL_BRIGHT.b + (TRAIL_DIM.b - TRAIL_BRIGHT.b) * t);
          const a = Math.max(0, 0.85 - j * 0.08);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          drawMirroredGlyph(pickChar(), x, trailY);
        }

        // Occasional mid-fall mutation flicker
        if (Math.random() > 0.985 && y > 0 && y < canvasHeight) {
          ctx.fillStyle = "rgba(0, 255, 102, 0.35)";
          const flickerY = y - Math.floor(Math.random() * 8) * config.fontSize;
          drawMirroredGlyph(pickChar(), x, flickerY);
        }

        drop.y += drop.speed;

        if (drop.y * config.fontSize > canvasHeight + 100) {
          drop.y = Math.random() * -20;
          drop.speed = 0.5 + Math.random() * 1;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (
          entry.target === container ||
          entry.target.closest(".editor-smooth-scroll")
        ) {
          updateCanvasSize();
          const newActualColumns = Math.floor(
            canvas.width / window.devicePixelRatio / config.fontSize
          );
          const newMaxColumns = Math.floor(
            newActualColumns * config.particleDensity
          );
          while (drops.length < newMaxColumns) {
            drops.push({
              y: Math.random() * -100,
              speed: 0.5 + Math.random() * 1,
            });
          }
          drops.length = newMaxColumns;
        }
      }
    });

    resizeObserver.observe(container);
    const scrollContainer = container.closest(".editor-smooth-scroll");
    if (scrollContainer) resizeObserver.observe(scrollContainer);

    const mutationObserver = new MutationObserver(() => updateCanvasSize());
    if (scrollContainer) {
      mutationObserver.observe(scrollContainer, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [config, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-green-950/30 via-black to-black"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ height: contentHeight || "100vh" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          opacity: Math.max(config.opacity, 0.25),
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default MatrixBackground;
