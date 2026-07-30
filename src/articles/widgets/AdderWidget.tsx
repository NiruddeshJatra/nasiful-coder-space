import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';
import { SegmentedToggle } from '../primitives/SegmentedToggle';

type Mode = 'half' | 'full' | 'ripple';

const ON = '#00d26a';
const DIM = '#3a5847';
const TEXT_DIM = '#6c8873';
const TEXT_LIT = '#8aa893';

const wc = (v: number) => (v ? ON : DIM);

const btnStyle = (v: number): React.CSSProperties => ({
  fontFamily: "'Departure Mono',monospace",
  fontSize: 12.5,
  padding: '7px 14px',
  cursor: 'pointer',
  background: v ? '#16402a' : 'none',
  color: v ? ON : TEXT_LIT,
  border: `1px solid ${v ? ON : DIM}`,
  minWidth: 72,
});

function HalfAdder({ a, b }: { a: number; b: number }) {
  const sum = a ^ b;
  const carry = a & b;
  return (
    <svg
      viewBox="0 0 340 190"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      aria-label="half adder: A and B feed an XOR gate (Sum) and AND gate (Carry)"
    >
      {/* Input A */}
      <path d="M30 55 H80" stroke={wc(a)} strokeWidth={2} fill="none" />
      <path d="M80 55 V45 H128 M80 55 V125 H128" stroke={wc(a)} strokeWidth={2} fill="none" />
      <circle cx={80} cy={55} r={2.5} fill={wc(a)} />
      {/* Input B */}
      <path d="M30 135 H60" stroke={wc(b)} strokeWidth={2} fill="none" />
      <path d="M60 135 V65 H128 M60 135 V145 H128" stroke={wc(b)} strokeWidth={2} fill="none" />
      <circle cx={60} cy={135} r={2.5} fill={wc(b)} />
      <text x={14} y={59} fill={TEXT_LIT} fontSize={12} fontFamily="Departure Mono,monospace">A</text>
      <text x={14} y={139} fill={TEXT_LIT} fontSize={12} fontFamily="Departure Mono,monospace">B</text>
      {/* XOR gate */}
      <path d="M134 38 Q148 55 134 72 Q166 72 186 55 Q166 38 134 38" fill="none" stroke={wc(sum)} strokeWidth={2.5} />
      <path d="M126 38 Q140 55 126 72" fill="none" stroke={wc(sum)} strokeWidth={2.5} />
      <text x={148} y={59} fill={wc(sum)} fontSize={9} fontFamily="Departure Mono,monospace">XOR</text>
      {/* AND gate */}
      <path d="M134 118 H158 A17 17 0 0 1 158 152 H134 Z" fill="none" stroke={wc(carry)} strokeWidth={2.5} />
      <text x={138} y={139} fill={wc(carry)} fontSize={9} fontFamily="Departure Mono,monospace">AND</text>
      {/* Output wires */}
      <path d="M186 55 H280" stroke={wc(sum)} strokeWidth={2} fill="none" strokeDasharray={sum ? '6 4' : undefined} />
      <path d="M175 135 H280" stroke={wc(carry)} strokeWidth={2} fill="none" strokeDasharray={carry ? '6 4' : undefined} />
      {/* Lamps */}
      <circle cx={293} cy={55} r={11} fill={sum ? 'rgba(0,210,106,0.18)' : '#1a2a1a'} stroke={wc(sum)} strokeWidth={2} />
      <circle cx={293} cy={135} r={11} fill={carry ? 'rgba(0,210,106,0.18)' : '#1a2a1a'} stroke={wc(carry)} strokeWidth={2} />
      <text x={293} y={32} fill={TEXT_DIM} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">Sum</text>
      <text x={293} y={169} fill={TEXT_DIM} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">Carry</text>
      <text x={293} y={59} fill={wc(sum)} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">{sum}</text>
      <text x={293} y={139} fill={wc(carry)} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">{carry}</text>
    </svg>
  );
}

function FullAdder({ a, b, cin }: { a: number; b: number; cin: number }) {
  const s1 = a ^ b;
  const c1 = a & b;
  const sum = s1 ^ cin;
  const c2 = s1 & cin;
  const cout = c1 | c2;
  const wS1 = wc(s1), wC1 = wc(c1), wCin = wc(cin), wSum = wc(sum), wCout = wc(cout);

  return (
    <svg
      viewBox="0 0 370 210"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      aria-label="full adder: two half adders plus an OR gate"
    >
      {/* Inputs */}
      <text x={4} y={49} fill={TEXT_LIT} fontSize={11} fontFamily="Departure Mono,monospace">A</text>
      <text x={4} y={74} fill={TEXT_LIT} fontSize={11} fontFamily="Departure Mono,monospace">B</text>
      <text x={4} y={174} fill={TEXT_LIT} fontSize={10} fontFamily="Departure Mono,monospace">Cin</text>
      {/* A and B to HA1 */}
      <path d="M20 45 H90" stroke={wc(a)} strokeWidth={2} fill="none" />
      <path d="M20 70 H90" stroke={wc(b)} strokeWidth={2} fill="none" />
      {/* HA1 box */}
      <rect x={90} y={30} width={58} height={55} fill="none" stroke={TEXT_LIT} strokeWidth={2} />
      <text x={119} y={62} fill={TEXT_LIT} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">HA1</text>
      {/* HA1 Sum out → HA2 */}
      <path d="M148 45 H195" stroke={wS1} strokeWidth={2} fill="none" strokeDasharray={s1 ? '6 4' : undefined} />
      {/* HA1 Carry out → OR */}
      <path d="M148 75 H168 V130 H262" stroke={wC1} strokeWidth={2} fill="none" strokeDasharray={c1 ? '6 4' : undefined} />
      {/* Cin → HA2 */}
      <path d="M20 170 H175 V68 M175 68 V60 H195" stroke={wCin} strokeWidth={2} fill="none" strokeDasharray={cin ? '6 4' : undefined} />
      {/* HA2 box */}
      <rect x={195} y={30} width={58} height={55} fill="none" stroke={TEXT_LIT} strokeWidth={2} />
      <text x={224} y={62} fill={TEXT_LIT} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">HA2</text>
      {/* HA2 Sum → output */}
      <path d="M253 45 H320" stroke={wSum} strokeWidth={2} fill="none" strokeDasharray={sum ? '6 4' : undefined} />
      {/* HA2 Carry → OR */}
      <path d="M253 75 V150 H262" stroke={wc(c2)} strokeWidth={2} fill="none" strokeDasharray={c2 ? '6 4' : undefined} />
      {/* OR gate */}
      <path d="M262 118 Q274 140 262 162 Q292 162 310 140 Q292 118 262 118" fill="none" stroke={wCout} strokeWidth={2.5} />
      <text x={276} y={144} fill={wCout} fontSize={9} fontFamily="Departure Mono,monospace">OR</text>
      {/* OR → Cout */}
      <path d="M310 140 H320" stroke={wCout} strokeWidth={2} fill="none" strokeDasharray={cout ? '6 4' : undefined} />
      {/* Lamps */}
      <circle cx={333} cy={45} r={11} fill={sum ? 'rgba(0,210,106,0.18)' : '#1a2a1a'} stroke={wSum} strokeWidth={2} />
      <circle cx={333} cy={140} r={11} fill={cout ? 'rgba(0,210,106,0.18)' : '#1a2a1a'} stroke={wCout} strokeWidth={2} />
      <text x={333} y={22} fill={TEXT_DIM} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">Sum</text>
      <text x={333} y={171} fill={TEXT_DIM} fontSize={10} fontFamily="Departure Mono,monospace" textAnchor="middle">Cout</text>
      <text x={333} y={49} fill={wSum} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">{sum}</text>
      <text x={333} y={144} fill={wCout} fontSize={11} fontFamily="Departure Mono,monospace" textAnchor="middle">{cout}</text>
    </svg>
  );
}

function computeRipple(a: number[], b: number[]) {
  const n = a.length;
  const sums: number[] = new Array(n).fill(0);
  const carryIns: number[] = new Array(n + 1).fill(0); // carryIns[n]=0 (cin for LSB)
  for (let i = n - 1; i >= 0; i--) {
    const ci = carryIns[i + 1];
    sums[i] = a[i] ^ b[i] ^ ci;
    carryIns[i] = (a[i] & b[i]) | (b[i] & ci) | (a[i] & ci);
  }
  return { sums, cout: carryIns[0], carryIns };
}

function RippleCarry({ a, b, onToggleA, onToggleB }: {
  a: number[];
  b: number[];
  onToggleA: (i: number) => void;
  onToggleB: (i: number) => void;
}) {
  const { sums, cout, carryIns } = computeRipple(a, b);
  const n = a.length;

  const decA = a.reduce((acc, bit, i) => acc + bit * Math.pow(2, n - 1 - i), 0);
  const decB = b.reduce((acc, bit, i) => acc + bit * Math.pow(2, n - 1 - i), 0);
  const decSum = sums.reduce((acc, bit, i) => acc + bit * Math.pow(2, n - 1 - i), 0);
  const total = decA + decB;

  const bitBtn = (val: number, onClick: () => void): React.CSSProperties => ({
    fontFamily: "'Departure Mono',monospace",
    fontSize: 13,
    padding: '5px 10px',
    cursor: 'pointer',
    background: val ? '#16402a' : 'none',
    color: val ? ON : TEXT_LIT,
    border: `1px solid ${val ? ON : DIM}`,
    width: 36,
  });

  return (
    <div style={{ padding: '18px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Cout */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginRight: 4 }}>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: TEXT_DIM }}>Cout</span>
          <span style={{
            fontFamily: "'Departure Mono',monospace", fontSize: 15,
            color: cout ? ON : DIM,
            border: `1px dashed ${cout ? ON : DIM}`,
            padding: '8px 10px',
          }}>{cout}</span>
        </div>
        {/* 4 columns, MSB first (index 0) → LSB last (index n-1) */}
        {Array.from({ length: n }, (_, i) => {
          const carry = carryIns[i]; // carry flowing into column i from the right
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {/* Carry arrow pointing left (from lower bit to higher) */}
              {i > 0 && (
                <span style={{
                  fontFamily: "'Departure Mono',monospace", fontSize: 13,
                  color: carry ? ON : DIM,
                  alignSelf: 'center',
                  marginTop: 18,
                }}>◀{carry}</span>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <button onClick={() => onToggleA(i)} style={bitBtn(a[i], () => {})} aria-label={`toggle A bit ${n - i}`}>{a[i]}</button>
                <button onClick={() => onToggleB(i)} style={bitBtn(b[i], () => {})} aria-label={`toggle B bit ${n - i}`}>{b[i]}</button>
                <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: TEXT_DIM, border: `1px solid ${DIM}`, padding: '4px 8px' }}>FA</span>
                <span style={{
                  fontFamily: "'Departure Mono',monospace", fontSize: 15,
                  color: sums[i] ? ON : DIM,
                  border: `1px solid ${sums[i] ? ON : DIM}`,
                  padding: '5px 10px',
                }}>{sums[i]}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 14, fontFamily: "'Departure Mono',monospace", fontSize: 13, color: TEXT_LIT, textAlign: 'center' }}>
        {decA} + {decB} = {cout}{sums.join('')}₂ = {total}₁₀
        {cout === 1 && <span style={{ color: ON, marginLeft: 8 }}>← overflow!</span>}
      </div>
    </div>
  );
}

export function AdderWidget() {
  const { bn } = useLang();
  const [mode, setMode] = useState<Mode>('half');

  const [haA, setHaA] = useState(1);
  const [haB, setHaB] = useState(1);

  const [faA, setFaA] = useState(1);
  const [faB, setFaB] = useState(1);
  const [faCin, setFaCin] = useState(1);

  const [rpA, setRpA] = useState([1, 1, 1, 1]);
  const [rpB, setRpB] = useState([0, 0, 0, 1]);

  const haSum = haA ^ haB;
  const haCarry = haA & haB;

  const faS1 = faA ^ faB;
  const faC1 = faA & faB;
  const faSum = faS1 ^ faCin;
  const faC2 = faS1 & faCin;
  const faCout = faC1 | faC2;

  const bnTitles: Record<Mode, string> = {
    half: 'half adder — XOR + AND দিয়ে ১-bit যোগ',
    full: 'full adder — carry in সহ ১-bit যোগ',
    ripple: 'ripple carry adder — ৪টা full adder চেইনে',
  };
  const enTitles: Record<Mode, string> = {
    half: 'half adder — 1-bit addition with XOR + AND',
    full: 'full adder — 1-bit addition with carry in',
    ripple: 'ripple carry adder — 4 full adders chained',
  };

  const bnReadouts: Record<string, string> = {
    half: `Sum = ${haA} XOR ${haB} = ${haSum}  ·  Carry = ${haA} AND ${haB} = ${haCarry}`,
    full: `S1=${faS1}, C1=${faC1}, C2=${faC2}  →  Sum=${faSum}  Cout=${faCout}`,
  };
  const enReadouts: Record<string, string> = {
    half: `Sum = ${haA} XOR ${haB} = ${haSum}  ·  Carry = ${haA} AND ${haB} = ${haCarry}`,
    full: `S1=${faS1}, C1=${faC1}, C2=${faC2}  →  Sum=${faSum}  Cout=${faCout}`,
  };

  const modeOptions = [
    { value: 'half' as Mode, label: 'half' },
    { value: 'full' as Mode, label: 'full' },
    { value: 'ripple' as Mode, label: 'ripple' },
  ];

  return (
    <>
      <Instrument
        bnTitle={bnTitles[mode]}
        enTitle={enTitles[mode]}
        control={<SegmentedToggle options={modeOptions} value={mode} onChange={setMode} />}
      >
        {mode === 'half' && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
                <button onClick={() => setHaA(v => v ^ 1)} style={btnStyle(haA)} aria-label="toggle A">A = {haA}</button>
                <button onClick={() => setHaB(v => v ^ 1)} style={btnStyle(haB)} aria-label="toggle B">B = {haB}</button>
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <HalfAdder a={haA} b={haB} />
              </div>
            </div>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12.5, color: TEXT_LIT, padding: '0 16px 16px' }}>
              {bn ? bnReadouts.half : enReadouts.half}
            </div>
          </>
        )}
        {mode === 'full' && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
                <button onClick={() => setFaA(v => v ^ 1)} style={btnStyle(faA)} aria-label="toggle A">A = {faA}</button>
                <button onClick={() => setFaB(v => v ^ 1)} style={btnStyle(faB)} aria-label="toggle B">B = {faB}</button>
                <button onClick={() => setFaCin(v => v ^ 1)} style={btnStyle(faCin)} aria-label="toggle Cin">Cin = {faCin}</button>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <FullAdder a={faA} b={faB} cin={faCin} />
              </div>
            </div>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12.5, color: TEXT_LIT, padding: '0 16px 16px' }}>
              {bn ? bnReadouts.full : enReadouts.full}
            </div>
          </>
        )}
        {mode === 'ripple' && (
          <RippleCarry
            a={rpA}
            b={rpB}
            onToggleA={(i) => setRpA(prev => prev.map((v, j) => j === i ? v ^ 1 : v))}
            onToggleB={(i) => setRpB(prev => prev.map((v, j) => j === i ? v ^ 1 : v))}
          />
        )}
      </Instrument>
      <Caption
        bn={mode === 'half'
          ? 'Half Adder: XOR আর AND gate জোড়া দিলে binary যোগের প্রথম ধাপ। button চেপে input বদলান।'
          : mode === 'full'
            ? 'Full Adder: দুটো Half Adder + একটা OR gate। Carry In সহ ১-bit যোগ করতে পারে।'
            : 'Ripple Carry Adder: ৪টা Full Adder চেইনে। bit-গুলো click করে যোগ করুন — carry ripple দেখুন।'}
        en={mode === 'half'
          ? 'Half Adder: XOR + AND gates wired together — the first step in binary addition. Click buttons to toggle inputs.'
          : mode === 'full'
            ? 'Full Adder: two Half Adders + one OR gate. Adds 1 bit including a carry-in from a previous stage.'
            : 'Ripple Carry Adder: 4 Full Adders in a chain. Click any bit — watch the carry ripple left.'}
      />
    </>
  );
}
