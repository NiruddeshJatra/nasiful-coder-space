import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const ON = '#00d26a';
const flowAnim = { animation: 'flow 0.7s linear infinite' };

const STAGES = [
  { x: 30, label: 'FETCH', note: 'IR ← mem[PC]; PC++' },
  { x: 147, label: 'DECODE', note: 'CU reads opcode' },
  { x: 264, label: 'EXECUTE', note: 'ALU + bus commit' },
];

export function InstructionCycleLoop() {
  return (
    <>
      <Instrument bnTitle="চিত্র ০১ — THE LOOP" enTitle="FIGURE 01 — THE LOOP">
        <svg
          viewBox="0 0 380 150"
          style={{ display: 'block', width: '100%', height: 'auto' }}
          aria-label="the instruction cycle loop: fetch feeds decode, decode feeds execute, and execute loops back to fetch"
        >
          {STAGES.map(s => (
            <g key={s.label}>
              <rect x={s.x} y={55} width={86} height={40} fill="none" stroke={ON} strokeWidth={2} />
              <text x={s.x + 43} y={79} fill={ON} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">
                {s.label}
              </text>
              <text x={s.x + 43} y={120} fill="#6c8873" fontSize={8} fontFamily="Departure Mono,monospace" textAnchor="middle">
                {s.note}
              </text>
            </g>
          ))}

          {/* Fetch → Decode → Execute, then back around the top to Fetch */}
          <path d="M116 75 H147" stroke={ON} strokeWidth={2} fill="none" strokeDasharray="6 6" style={flowAnim} />
          <path d="M233 75 H264" stroke={ON} strokeWidth={2} fill="none" strokeDasharray="6 6" style={flowAnim} />
          <path d="M307 55 V28 H73 V55" stroke={ON} strokeWidth={2} fill="none" strokeDasharray="6 6" style={flowAnim} />

          {/* Arrowheads */}
          <path d="M69 50 L73 56 L77 50 Z" fill={ON} />
          <path d="M141 71 L147 75 L141 79 Z" fill={ON} />
          <path d="M258 71 L264 75 L258 79 Z" fill={ON} />
        </svg>
      </Instrument>
      <Caption
        bn="Fetch → Decode → Execute → আবার Fetch — যতক্ষণ পাওয়ার আছে, এই লুপ থামে না।"
        en="Fetch → Decode → Execute → Fetch again — as long as there's power, this loop never stops."
      />
    </>
  );
}
