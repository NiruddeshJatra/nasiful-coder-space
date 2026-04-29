import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { onMatrix } from "@/lib/matrixSignals";

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
    animationSpeed: 50,
    particleDensity: 0.6,
    opacity: 0.25,
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
        speed: 0.3 + Math.random() * 0.6,
      });
    }

    const pickChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    // Reactive signals: decay values per frame
    let typeBoost = 0;      // 0..1, spikes on each keystroke then decays
    let focusBoost = 0;     // 0..1, eased toward 1 when terminal focused
    let focusTarget = 0;
    let scrollBoost = 0;    // 0..1, from scroll velocity
    let lastScrollTop = 0;
    let lastScrollTime = performance.now();

    const unsubType = onMatrix("type", () => {
      typeBoost = Math.min(1, typeBoost + 0.6);
    });
    const unsubFocusOn = onMatrix("focus-on", () => {
      focusTarget = 1;
    });
    const unsubFocusOff = onMatrix("focus-off", () => {
      focusTarget = 0;
    });

    const scrollEl = container.closest(".editor-smooth-scroll") as HTMLElement | null;
    const onScroll = () => {
      if (!scrollEl) return;
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime);
      const dy = Math.abs(scrollEl.scrollTop - lastScrollTop);
      const velocity = dy / dt; // px per ms
      scrollBoost = Math.min(1, scrollBoost + velocity * 0.04);
      lastScrollTop = scrollEl.scrollTop;
      lastScrollTime = now;
    };
    scrollEl?.addEventListener("scroll", onScroll, { passive: true });

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

      // Decay reactive signals
      typeBoost = Math.max(0, typeBoost - 0.04);
      focusBoost += (focusTarget - focusBoost) * 0.08;
      scrollBoost = Math.max(0, scrollBoost - 0.05);

      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;

      // Typing & focus reduce fade alpha → denser trails
      const fadeAlpha = Math.max(0.08, 0.18 - typeBoost * 0.06 - focusBoost * 0.03);
      ctx.fillStyle = `rgba(10, 14, 10, ${fadeAlpha})`;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `${config.fontSize}px "JetBrains Mono", "Fira Code", monospace`;
      ctx.textBaseline = "top";

      // Focus → slight cyan-green shift on head glyph
      const headColor = focusBoost > 0.05
        ? `rgb(${Math.round(207 - focusBoost * 60)}, 255, ${Math.round(207 + focusBoost * 30)})`
        : HEAD_COLOR;

      const speedMul = 1 + scrollBoost * 1.2 + typeBoost * 0.3;
      const flickerProb = 0.985 - typeBoost * 0.04 - focusBoost * 0.01;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * config.fontSize;
        const y = drop.y * config.fontSize;

        ctx.fillStyle = headColor;
        drawMirroredGlyph(pickChar(), x, y);

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

        if (Math.random() > flickerProb && y > 0 && y < canvasHeight) {
          ctx.fillStyle = "rgba(0, 255, 102, 0.35)";
          const flickerY = y - Math.floor(Math.random() * 8) * config.fontSize;
          drawMirroredGlyph(pickChar(), x, flickerY);
        }

        drop.y += drop.speed * speedMul;

        if (drop.y * config.fontSize > canvasHeight + 100) {
          drop.y = Math.random() * -20;
          drop.speed = 0.3 + Math.random() * 0.6;
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
              speed: 0.3 + Math.random() * 0.6,
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
      scrollEl?.removeEventListener("scroll", onScroll);
      unsubType();
      unsubFocusOn();
      unsubFocusOff();
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
