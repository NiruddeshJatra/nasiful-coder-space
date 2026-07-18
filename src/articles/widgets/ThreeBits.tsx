import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

export function ThreeBits() {
  const { bn, num, bd } = useLang();
  const [bits, setBits] = useState([1, 0, 1]);
  const value = bits[0] * 4 + bits[1] * 2 + bits[2] * 1;
  const is5 = value === 5;

  const toggle = (i: number) => setBits((b) => b.map((v, j) => (j === i ? (v ? 0 : 1) : v)));

  const weights = [4, 2, 1];
  const labels = ['×4', '×2', '×1'];

  const cellBtn = (v: number, i: number): React.CSSProperties => ({
    width: 72, height: 72, fontFamily: "'Departure Mono', monospace", fontSize: 28,
    background: v ? 'rgba(0,210,106,0.18)' : '#1b231b',
    color: v ? '#00d26a' : '#55695a',
    border: `2px solid ${v ? '#00753f' : '#3a5847'}`,
    cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 2,
    boxShadow: v ? '0 0 12px rgba(0,210,106,0.2)' : 'none',
    transition: 'all 0.15s ease',
  });

  const weightLbl = (i: number): React.CSSProperties => ({
    fontSize: 10, color: bits[i] ? 'rgba(0,210,106,0.7)' : '#3a5847',
    fontFamily: "'Departure Mono', monospace",
  });

  const eqParts = bits.map((v, i) => `${num(v)}×${num(weights[i])}`);
  const eqStr = eqParts.join(' + ') + ' = ' + (bn ? bd(String(value)) : value);

  return (
    <>
      <Instrument
        bnTitle="THREE BITS"
        enTitle="THREE BITS"
      >
        <div className="flex flex-col items-center gap-5 py-6 px-4">
          {/* Bit cells */}
          <div className="flex gap-4">
            {bits.map((v, i) => (
              <button key={i} onClick={() => toggle(i)} style={cellBtn(v, i)} className="well-focus" aria-label={`bit ${i} = ${v}`}>
                <span>{num(v)}</span>
                <span style={weightLbl(i)}>{labels[i]}</span>
              </button>
            ))}
          </div>

          {/* Equation line */}
          <div className="font-mono text-[13px]" style={{ color: '#8aa893', letterSpacing: '0.04em' }}>
            {eqStr}
          </div>

          {/* Badge */}
          <div
            className="font-mono text-[12px] px-4 py-[6px]"
            style={{
              border: `1.5px dashed ${is5 ? '#00d26a' : '#3a5847'}`,
              color: is5 ? '#00d26a' : '#55695a',
              letterSpacing: '0.06em',
              transition: 'all 0.2s ease',
            }}
          >
            {is5
              ? `x = ${bn ? 'পাঁচ' : 'five'} ✓`
              : `x = ${bn ? bd(String(value)) : value}`}
          </div>

          {is5 && (
            <div className="font-mono text-[11px] text-center" style={{ color: 'rgba(0,210,106,0.6)' }}>
              {bn ? '১০১ = ৫ — প্রোগ্রাম যা দেখে, তাই!' : '101 = 5 — exactly what the program sees!'}
            </div>
          )}
        </div>
      </Instrument>
      <Caption
        bn="৩টা bit, ২³ = ৮টা সম্ভাব্য state। ১০১ মানে ৫ — কম্পিউটার ঠিক এভাবেই গোনে।"
        en="3 bits, 2³ = 8 possible states. 101 means 5 — exactly how the computer counts."
      />
    </>
  );
}
