import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

function wave(t: number) {
  return 0.5 + 0.3 * Math.sin(2 * Math.PI * 2.2 * t) + 0.14 * Math.sin(2 * Math.PI * 5 * t + 1.2);
}

function draw(canvas: HTMLCanvasElement, rate: number) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 400, h = 220;
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const pad = 16;
  const yOf = (v: number) => h - pad - v * (h - pad * 2);
  const xOf = (t: number) => t * w;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#1b231b'; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(140,170,140,0.16)'; ctx.lineWidth = 1;
  [0.25, 0.5, 0.75].forEach((v) => { ctx.beginPath(); ctx.moveTo(0, yOf(v)); ctx.lineTo(w, yOf(v)); ctx.stroke(); });

  ctx.strokeStyle = '#4f7a5f'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x <= w; x += 2) {
    const y = yOf(wave(x / w));
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < rate; i++) {
    const t = (i + 0.5) / rate;
    pts.push({ x: xOf(t), y: yOf(wave(t)) });
  }
  ctx.strokeStyle = 'rgba(0,210,106,0.35)'; ctx.lineWidth = 1;
  pts.forEach((p) => { ctx.beginPath(); ctx.moveTo(p.x, yOf(0)); ctx.lineTo(p.x, p.y); ctx.stroke(); });

  ctx.strokeStyle = '#00d26a'; ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0,210,106,0.6)'; ctx.shadowBlur = 6;
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#00d26a';
  pts.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); });

  const mid = pts[Math.floor(rate / 2)];
  ctx.strokeStyle = '#ff6b6b'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(mid.x, mid.y, 7, 0, Math.PI * 2); ctx.stroke();
}

export function SamplingRateDemo() {
  const { bn, num } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rate, setRate] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    draw(canvas, rate);
    const onResize = () => draw(canvas, rate);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [rate]);

  const midT = (Math.floor(rate / 2) + 0.5) / rate;
  const midByte = Math.round(wave(midT) * 255);

  const readText = bn
    ? `প্রতি সেকেন্ডে ${num(rate)}টা sample। লাল বৃত্তটার মান ≈ ${num(midByte)}/২৫৫`
    : `${num(rate)} samples/sec. The red circle's value ≈ ${num(midByte)}/255`;

  return (
    <>
      <Instrument bnTitle="SAMPLING RATE" enTitle="SAMPLING RATE">
        <canvas ref={canvasRef} style={{ width: '100%', display: 'block', height: 220 }} />
        <div className="flex items-center gap-3 px-[14px] py-3" style={{ borderTop: '1px solid #2e392e' }}>
          <label htmlFor="rate-slider" className="font-mono text-[11.5px] whitespace-nowrap" style={{ color: '#6c8873' }}>
            {bn ? 'rate' : 'rate'}
          </label>
          <input
            id="rate-slider" type="range" min={4} max={48} step={2} value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="flex-1 cursor-ew-resize well-focus" style={{ accentColor: '#00d26a' }}
          />
          <span className="font-mono text-[11.5px] w-[110px] text-right" style={{ color: '#00d26a' }}>
            {num(rate)} Hz
          </span>
        </div>
        <div className="font-mono text-[11.5px] px-[14px] pb-3" style={{ color: '#8aa893' }}>{readText}</div>
      </Instrument>
      <Caption
        bn="rate কম হলে wave-এর আকার হারিয়ে যায়। যথেষ্ট বেশি হলে original wave প্রায় নিখুঁতভাবে reconstruct করা যায়।"
        en="Too low a rate and the wave's shape gets lost. High enough, and the original wave can be reconstructed almost perfectly."
      />
    </>
  );
}
