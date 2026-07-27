import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';
import { SegmentedToggle } from '../primitives/SegmentedToggle';

type Mode = 'grow' | 'build';

interface PlaceValueBuilderProps {
  /** number of place-value columns in "build" mode */
  buildBits?: number;
  /** decimal value the reader is asked to build in "build" mode */
  target?: number;
}

export function PlaceValueBuilder({ buildBits = 4, target = 13 }: PlaceValueBuilderProps) {
  const { bn, num } = useLang();
  const [mode, setMode] = useState<Mode>('grow');
  const [n, setN] = useState(3);
  const [colBits, setColBits] = useState<number[]>(() => Array(buildBits).fill(0));

  const weights = Array.from({ length: buildBits }, (_, i) => 2 ** (buildBits - 1 - i));

  const combos: string[] = [];
  for (let i = 0; i < 1 << n; i++) combos.push(i.toString(2).padStart(n, '0'));

  const decimal = colBits.reduce((a, b, i) => a + b * weights[i], 0);
  const isTarget = decimal === target;

  const flip = (i: number) => setColBits((b) => b.map((v, j) => (j === i ? (v ? 0 : 1) : v)));

  const cellStyle = (v: number): CSSProperties => ({
    width: 64, height: 64, fontFamily: "'Departure Mono', monospace", fontSize: 26, cursor: 'pointer',
    border: `1px solid ${v ? '#00d26a' : '#3a5847'}`,
    background: v ? '#16402a' : '#1b231b',
    color: v ? '#00d26a' : '#55695a',
    textShadow: v ? '0 0 10px rgba(0,210,106,0.5)' : 'none',
  });

  return (
    <>
      <Instrument
        bnTitle="PLACE VALUE"
        enTitle="PLACE VALUE"
        control={
          <SegmentedToggle
            value={mode}
            onChange={setMode}
            options={[
              { value: 'grow', label: bn ? 'বৃদ্ধি' : 'grow' },
              { value: 'build', label: bn ? 'বানাই' : 'build' },
            ]}
          />
        }
      >
        {mode === 'grow' ? (
          <div className="flex flex-col gap-[14px] py-[18px] px-4">
            <div className="flex items-center gap-[10px] flex-wrap">
              <span className="font-mono text-[11.5px]" style={{ color: '#6c8873' }}>bits</span>
              <SegmentedToggle
                value={n}
                onChange={setN}
                fontSize="12px"
                options={[1, 2, 3, 4].map((v) => ({ value: v, label: num(v) }))}
              />
              <span className="font-mono text-[12.5px]" style={{ color: '#00d26a', textShadow: '0 0 8px rgba(0,210,106,0.4)' }}>
                2{'^'}{num(n)} = {num(1 << n)} {bn ? 'সম্ভাবনা' : 'combos'}
              </span>
            </div>
            <div className="flex flex-wrap gap-[6px]">
              {combos.map((c) => (
                <span key={c} className="font-mono text-[12.5px]" style={{ color: '#8aa893', border: '1px solid #2e392e', background: '#1b231b', padding: '4px 8px' }}>
                  {bn ? c.split('').map((d) => (d === '0' ? '০' : '১')).join('') : c}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-[14px] py-[22px] px-4">
            <div className="flex gap-[14px]">
              {weights.map((w, i) => (
                <div key={w} className="flex flex-col items-center gap-[5px]">
                  <span className="font-mono text-[11px]" style={{ color: '#6c8873' }}>×{num(w)}</span>
                  <button style={cellStyle(colBits[i])} onClick={() => flip(i)} className="well-focus" aria-label={`column ${w}`}>
                    {num(colBits[i])}
                  </button>
                </div>
              ))}
            </div>
            <div className="font-mono text-[14px]" style={{ color: '#8aa893' }}>
              {colBits.map((b, i) => `${num(b)}×${num(weights[i])}`).join(' + ')} = {num(decimal)}
            </div>
            <div
              className="font-mono text-[15px]"
              style={{ color: isTarget ? '#00d26a' : '#55695a', border: `1px dashed ${isTarget ? '#00d26a' : '#55695a'}`, padding: '6px 14px' }}
            >
              {isTarget ? `${bn ? num(target) : target} ${bn ? 'তৈরি ✓' : 'built ✓'}` : `target: ${num(target)}`}
            </div>
          </div>
        )}
      </Instrument>
      <Caption
        bn="প্রতিটা নতুন বিট আগের সবকিছুর সম্ভাবনা দ্বিগুণ করে দেয়। কলামের মান 2-এর power — যোগফল দিয়ে যেকোনো সংখ্যা বানানো যায়।"
        en="Every new bit doubles the possibilities. Column values are powers of 2 — sum the ones you switch on to build any number."
      />
    </>
  );
}
