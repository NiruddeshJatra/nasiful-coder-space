import { useEffect, useState, useCallback } from 'react';

interface TraceState {
  path: string;
  dotX: number;
  dotY: number;
  visible: boolean;
}

function buildTrace(edges: number[], scrollFrac: number, vh: number): TraceState {
  const pad = 40;
  const span = vh - pad * 2;
  let x = 16;
  let d = `M16 0 V${pad}`;
  let dotX = 16;
  const dotY = pad + scrollFrac * span;

  const pts = edges.map((f) => pad + f * span).sort((a, b) => a - b);
  for (const y of pts) {
    const nx = x === 16 ? 30 : 16;
    d += ` V${y.toFixed(1)} H${nx}`;
    if (dotY >= y) dotX = nx;
    x = nx;
  }
  d += ` V${vh}`;

  return { path: d, dotX, dotY, visible: true };
}

export function TraceRail() {
  const [state, setState] = useState<TraceState>({ path: 'M16 0 V800', dotX: 16, dotY: 40, visible: false });
  const [wide, setWide] = useState(false);

  const measure = useCallback(() => {
    const vh = window.innerHeight;
    const isWide = window.innerWidth >= 1060;
    setWide(isWide);
    if (!isWide) return;

    const max = document.documentElement.scrollHeight - vh;
    const edges = Array.from(document.querySelectorAll('[data-trace-edge]')).map((el) =>
      max > 0 ? Math.min(1, ((el as HTMLElement).offsetTop - 100) / max) : 0,
    );
    const scrollFrac = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    setState(buildTrace(edges, scrollFrac, vh));
  }, []);

  useEffect(() => {
    measure();
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        measure();
      });
    };
    const onResize = () => measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [measure]);

  if (!wide) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 'calc(50% - 462px)',
        top: 0,
        bottom: 0,
        width: 48,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      <svg width="48" style={{ height: '100%', display: 'block' }} preserveAspectRatio="none">
        <path d={state.path} fill="none" stroke="#b0a37e" strokeWidth="1.5" />
        <circle cx={state.dotX} cy={state.dotY} r="4" fill="#00975a" />
        <circle cx={state.dotX} cy={state.dotY} r="8" fill="none" stroke="#00975a" strokeOpacity="0.35" />
      </svg>
    </div>
  );
}
