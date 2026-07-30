import { useRef, useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

export function ClockVisualizer() {
  const { bn } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const [ghz, setGhz] = useState(3);

  const ghzRef = useRef(ghz);
  ghzRef.current = ghz;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth || 400;
      canvas.width = w * dpr;
      canvas.height = 150 * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const w = canvas.clientWidth || 400;
      const h = 150;
      const currentGhz = ghzRef.current;
      const period = 300 / currentGhz;
      const hiY = 32, loY = h - 32;
      const unstable = currentGhz >= 5;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#1b231b';
      ctx.fillRect(0, 0, w, h);

      // Guide lines
      ctx.strokeStyle = 'rgba(140,170,140,0.15)';
      ctx.lineWidth = 1;
      [hiY, loY].forEach(y => {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      });

      ctx.font = '10px "Departure Mono", monospace';
      ctx.fillStyle = '#6c8873';
      ctx.fillText('1 · HIGH', 8, hiY - 8);
      ctx.fillText('0 · LOW', 8, loY + 16);

      // Draw waveform
      ctx.lineWidth = 2;
      let prevY: number | null = null;
      let prevCol: string | null = null;

      for (let x = 0; x <= w; x += 2) {
        const t = x + offsetRef.current;
        const cyc = Math.floor(t / period);
        const phase = (t % period) / period;

        let col: string;
        let y: number;

        if (unstable && (cyc % 4 === 2)) {
          // corrupted cycle: erratic
          const noise = (Math.sin(t * 0.8) + Math.cos(t * 1.3)) * 15;
          const midY = (hiY + loY) / 2;
          y = midY + noise;
          col = '#b87c2a';
        } else {
          const high = phase < 0.5;
          y = high ? hiY : loY;
          col = high ? '#00d26a' : '#3a5847';
        }

        if (prevY === null || prevCol === null) {
          ctx.beginPath();
          ctx.strokeStyle = col;
          ctx.moveTo(x, y);
        } else if (col !== prevCol) {
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = col;
          ctx.moveTo(x, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = col;
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        prevY = y;
        prevCol = col;
      }
      ctx.stroke();

      // Scroll offset
      offsetRef.current += currentGhz * 0.5;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const unstable = ghz >= 5;
  const statusBn = unstable ? 'অস্থির — circuit অতিরিক্ত গরম' : `স্থিতিশীল — ${ghz} GHz`;
  const statusEn = unstable ? 'unstable — circuit overheating' : `stable — ${ghz} GHz`;
  const statusCol = unstable ? '#b87c2a' : '#00d26a';

  const readBn = `প্রতি সেকেন্ডে ${(ghz * 1e9).toLocaleString('bn-BD')} বার pulse — প্রতিটা flip-flop এই তালে নতুন value save করে।`;
  const readEn = `${ghz} × 10⁹ pulses per second — every flip-flop saves its new value on each tick.`;

  return (
    <>
      <Instrument
        bnTitle="clock oscillator"
        enTitle="clock oscillator"
        control={
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: statusCol, whiteSpace: 'nowrap' }}>
            {bn ? statusBn : statusEn}
          </span>
        }
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: 150 }}
          aria-label="animated clock waveform"
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: '1px solid #2e392e' }}>
          <label
            htmlFor="ghz-slider"
            style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#6c8873', whiteSpace: 'nowrap' }}
          >
            GHz
          </label>
          <input
            id="ghz-slider"
            type="range"
            min={1}
            max={6}
            step={0.5}
            value={ghz}
            onChange={e => setGhz(Number(e.target.value))}
            style={{ flex: 1, accentColor: '#00d26a', cursor: 'ew-resize' }}
            aria-label="clock speed in GHz"
          />
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#00d26a', width: 80, textAlign: 'right' }}>
            {ghz.toFixed(1)} GHz
          </span>
        </div>
        <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#8aa893', padding: '0 14px 12px' }}>
          {bn ? readBn : readEn}
        </div>
      </Instrument>
      <Caption
        bn="slider দিয়ে clock speed বাড়ান। ৫ GHz-এর উপরে circuit অস্থির হয়ে পড়ে।"
        en="Drag the slider to change clock speed. Above 5 GHz the circuit becomes unstable."
      />
    </>
  );
}
