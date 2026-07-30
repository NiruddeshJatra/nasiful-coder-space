import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const ON = '#00d26a';
const DIM = '#3a5847';
const TEXT_DIM = '#6c8873';
const TEXT_LIT = '#8aa893';
const ACTIVE = '#00d26a';
const IDLE = '#8aa893';

const wc = (active: boolean) => (active ? ON : DIM);

interface Step {
  bn: string;
  en: string;
  // which components are active
  regA: boolean;
  regB: boolean;
  mux: boolean;
  wireIn: boolean;
  alu: boolean;
  wireOut: boolean;
  decoder: boolean;
  wireDec: boolean;
  regC: boolean;
  aluVal: string;
  cVal: string;
}

const STEPS: Step[] = [
  {
    bn: 'Register A-তে ২ (0010) আর Register B-তে ৩ (0011) voltage হিসেবে জমা আছে।',
    en: 'Register A holds 2 (0010) and Register B holds 3 (0011) as static voltage patterns.',
    regA: true, regB: true, mux: false, wireIn: false,
    alu: false, wireOut: false, decoder: false, wireDec: false, regC: false,
    aluVal: '', cVal: '?',
  },
  {
    bn: 'Clock Tick ১: Multiplexer চালু হলো — Register A ও B-র ডেটা ALU-র দিকে রওনা হলো।',
    en: 'Clock Tick 1: Multiplexer fires — data from Register A and B races toward the ALU.',
    regA: true, regB: true, mux: true, wireIn: true,
    alu: false, wireOut: false, decoder: false, wireDec: false, regC: false,
    aluVal: '...', cVal: '?',
  },
  {
    bn: 'ALU-র logic gate-গুলো মুহূর্তের মধ্যে ২+৩ = ৫ (0101) হিসাব করে ফেলল।',
    en: 'ALU logic gates settle: 2+3 = 5 (0101) in under a nanosecond.',
    regA: true, regB: true, mux: true, wireIn: false,
    alu: true, wireOut: true, decoder: false, wireDec: false, regC: false,
    aluVal: '5 · 0101', cVal: '?',
  },
  {
    bn: 'Clock Tick ২: Decoder Register C-এর দরজা খুলল। ৫ ফ্লিপ-ফ্লপে জমা হয়ে গেল।',
    en: 'Clock Tick 2: Decoder unlocks Register C. Voltage for 5 settles into its flip-flops.',
    regA: true, regB: true, mux: false, wireIn: false,
    alu: true, wireOut: true, decoder: true, wireDec: true, regC: true,
    aluVal: '5 · 0101', cVal: '5 · 0101',
  },
];

const TOTAL = STEPS.length;

export function CPUDatapath() {
  const { bn } = useLang();
  const [step, setStep] = useState(0);

  const s = STEPS[step];

  const regACol = s.regA ? ON : DIM;
  const regBCol = s.regB ? ON : DIM;
  const muxCol = s.mux ? ON : DIM;
  const wireInCol = wc(s.wireIn);
  const aluCol = s.alu ? ON : DIM;
  const wireOutCol = wc(s.wireOut);
  const decCol = s.decoder ? ON : DIM;
  const wireDecCol = wc(s.wireDec);
  const regCCol = s.regC ? ON : DIM;

  const nextStep = () => setStep(v => (v + 1) % TOTAL);
  const reset = () => setStep(0);

  const nextLabelBn = step === TOTAL - 1 ? '↺ ফিরে শুরুতে' : `পরের step (${step + 1}/${TOTAL - 1}) ▶`;
  const nextLabelEn = step === TOTAL - 1 ? '↺ restart' : `next step (${step + 1}/${TOTAL - 1}) ▶`;

  const btnBase: React.CSSProperties = {
    fontFamily: "'Departure Mono',monospace",
    fontSize: 12,
    background: 'none',
    border: `1px solid ${DIM}`,
    color: ON,
    padding: '7px 14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <Instrument
        bnTitle={`CPU datapath — step ${step + 1}/${TOTAL}`}
        enTitle={`CPU datapath — step ${step + 1}/${TOTAL}`}
        control={
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: ON, whiteSpace: 'nowrap' }}>
            step {step + 1}/{TOTAL}
          </span>
        }
      >
        {/* SVG datapath diagram */}
        <div style={{ position: 'relative' }}>
          <svg
            viewBox="0 0 380 250"
            style={{ display: 'block', width: '100%', height: 'auto' }}
            aria-label="CPU datapath: registers A and B feed the ALU through a multiplexer; result returns to register C through data bus, gated by decoder; shared clock line"
          >
            {/* Register A */}
            <rect x={15} y={20} width={100} height={36} fill="none" stroke={regACol} strokeWidth={2} />
            <text x={65} y={33} fill={TEXT_LIT} fontSize={9} fontFamily="Departure Mono,monospace" textAnchor="middle">Register A</text>
            <text x={65} y={48} fill={regACol} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">2 · 0010</text>

            {/* Register B */}
            <rect x={15} y={90} width={100} height={36} fill="none" stroke={regBCol} strokeWidth={2} />
            <text x={65} y={103} fill={TEXT_LIT} fontSize={9} fontFamily="Departure Mono,monospace" textAnchor="middle">Register B</text>
            <text x={65} y={118} fill={regBCol} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">3 · 0011</text>

            {/* Wires from Registers to MUX */}
            <path d="M115 38 H150" stroke={wireInCol} strokeWidth={2} fill="none"
              strokeDasharray={s.wireIn ? '6 4' : undefined} />
            <path d="M115 108 H150" stroke={wireInCol} strokeWidth={2} fill="none"
              strokeDasharray={s.wireIn ? '6 4' : undefined} />

            {/* MUX trapezoid */}
            <polygon points="150,25 150,145 180,125 180,45" fill="none" stroke={muxCol} strokeWidth={2} />
            <text x={165} y={88} fill={muxCol} fontSize={8} fontFamily="Departure Mono,monospace"
              textAnchor="middle" transform="rotate(-90 165 88)">MUX</text>

            {/* Wires from MUX to ALU */}
            <path d="M180 60 H210" stroke={wireInCol} strokeWidth={2} fill="none"
              strokeDasharray={s.wireIn ? '6 4' : undefined} />
            <path d="M180 120 H210" stroke={wireInCol} strokeWidth={2} fill="none"
              strokeDasharray={s.wireIn ? '6 4' : undefined} />

            {/* ALU pentagon */}
            <polygon points="210,40 210,80 222,90 210,100 210,140 290,115 290,65"
              fill="none" stroke={aluCol} strokeWidth={2.5} />
            <text x={253} y={94} fill={aluCol} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">ALU</text>
            {/* ALU computed value */}
            {s.aluVal && (
              <text x={248} y={80} fill={ON} fontSize={9} fontFamily="Departure Mono,monospace" textAnchor="middle"
                style={{ textShadow: '0 0 8px rgba(0,210,106,0.5)' }}>
                {s.aluVal}
              </text>
            )}

            {/* Data bus (vertical line from ALU output) */}
            <path d="M290 90 H330 V194" stroke={wireOutCol} strokeWidth={2} fill="none"
              strokeDasharray={s.wireOut ? '6 4' : undefined} />
            <text x={344} y={130} fill={TEXT_DIM} fontSize={8} fontFamily="Departure Mono,monospace">bus</text>

            {/* Register C */}
            <rect x={265} y={194} width={100} height={36} fill="none" stroke={regCCol} strokeWidth={2} />
            <text x={315} y={207} fill={TEXT_LIT} fontSize={9} fontFamily="Departure Mono,monospace" textAnchor="middle">Register C</text>
            <text x={315} y={222} fill={regCCol} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">{s.cVal}</text>

            {/* Decoder */}
            <rect x={125} y={194} width={75} height={32} fill="none" stroke={decCol} strokeWidth={2} />
            <text x={162} y={213} fill={decCol} fontSize={9} fontFamily="Departure Mono,monospace" textAnchor="middle">Decoder</text>

            {/* Wire from Decoder to Register C */}
            <path d="M200 210 H265" stroke={wireDecCol} strokeWidth={2} fill="none"
              strokeDasharray={s.wireDec ? '6 4' : undefined} />

            {/* Clock line (dashed, spans all components) */}
            <path d="M15 244 H365 M65 244 V126 M162 244 V226 M250 244 V133 M330 244 V230"
              stroke="#3a5847" strokeWidth={1.5} fill="none" strokeDasharray="3 4" />
            <text x={18} y={239} fill={TEXT_DIM} fontSize={8} fontFamily="Departure Mono,monospace">clock</text>
          </svg>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderTop: `1px solid #2e392e`, flexWrap: 'wrap' }}>
          <button onClick={nextStep} style={btnBase}>
            {bn ? nextLabelBn : nextLabelEn}
          </button>
          {step > 0 && (
            <button onClick={reset} style={{ ...btnBase, color: TEXT_LIT }}>
              ↺ reset
            </button>
          )}
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: TEXT_LIT, flex: 1, minWidth: 180 }}>
            {bn ? s.bn : s.en}
          </span>
        </div>
      </Instrument>
      <Caption
        bn="CPU-র ভেতরের ডেটা ফ্লো: register → MUX → ALU → decoder → register। clock সব synchronize করে।"
        en="CPU internal data flow: register → MUX → ALU → decoder → register. The clock synchronizes everything."
      />
    </>
  );
}
