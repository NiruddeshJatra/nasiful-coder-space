import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

/** The letter 'A' sampled onto two different pixel grids. */
const COARSE = ['..#..', '.#.#.', '#...#', '#####', '#...#', '#...#', '#...#'];
const FINE = [
  '....#....', '...#.#...', '...#.#...', '..#...#..', '..#...#..',
  '..#####..', '.#.....#.', '.#.....#.', '#.......#', '#.......#', '#.......#',
];

type Size = 'coarse' | 'fine';

export function Rasterize() {
  const { bn, num } = useLang();
  const [size, setSize] = useState<Size>('coarse');
  const [on, setOn] = useState(false);

  const fine = size === 'fine';
  const grid = fine ? FINE : COARSE;
  const cols = grid[0].length;
  const cell = fine ? 8 : 12;
  const total = grid.length * cols;
  const onCount = grid.join('').split('').filter((ch) => ch === '#').length;

  const seg = (active: boolean): React.CSSProperties => ({
    background: active ? '#16402a' : 'none',
    color: active ? '#00d26a' : '#6c8873',
    border: 'none', padding: '5px 12px', cursor: 'pointer',
    fontFamily: "'Departure Mono',monospace", fontSize: 11,
  });

  return (
    <>
      <Instrument
        bnTitle="যন্ত্র ০২ — RASTERIZE"
        enTitle="INSTRUMENT 02 — RASTERIZE"
        control={
          <div style={{ display: 'flex', border: '1px solid #3a5847' }}>
            <button onClick={() => { setSize('coarse'); setOn(false); }} style={seg(!fine)}>{bn ? 'ছোট' : 'small'}</button>
            <button onClick={() => { setSize('fine'); setOn(false); }} style={seg(fine)}>{bn ? 'বড়' : 'large'}</button>
          </div>
        }
      >
        <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {/* Vector side */}
          <div style={{ flex: 'none', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9, color: '#6c8873', letterSpacing: '0.06em', marginBottom: 6 }}>
              {bn ? 'VECTOR (font)' : 'VECTOR (font)'}
            </div>
            <svg width="96" height="112" viewBox="0 0 96 112" aria-label={bn ? 'vector আকৃতির A' : "vector outline of the letter A"} role="img">
              <path
                d="M48 12 L84 100 L68 100 L60 76 L36 76 L28 100 L12 100 Z M41 62 L55 62 L48 38 Z"
                fill="none"
                stroke="#8aa893"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 18, color: on ? '#00d26a' : '#3a5847' }}>→</div>

          {/* Raster side */}
          <div style={{ flex: 'none', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9, color: '#6c8873', letterSpacing: '0.06em', marginBottom: 6 }}>
              {bn ? 'PIXEL (screen)' : 'PIXEL (screen)'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 1, justifyContent: 'center' }}>
              {grid.flatMap((rowStr, r) =>
                rowStr.split('').map((ch, c) => {
                  const lit = on && ch === '#';
                  return (
                    <span
                      key={`${r}-${c}`}
                      style={{
                        width: cell, height: cell, display: 'block', boxSizing: 'border-box',
                        background: lit ? '#00d26a' : '#161d15',
                        border: `1px solid ${lit ? '#00d26a' : '#232b21'}`,
                        boxShadow: lit ? '0 0 4px rgba(0,210,106,0.5)' : 'none',
                      }}
                    />
                  );
                }),
              )}
            </div>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: on ? '#00d26a' : '#8aa893', marginTop: 8 }}>
              {on
                ? (bn ? `${num(onCount)}/${num(total)} pixel on` : `${onCount}/${total} pixels on`)
                : (bn ? `${num(total)} pixel grid` : `${total}-pixel grid`)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderTop: '1px solid #2e392e', flexWrap: 'wrap' }}>
          <button
            onClick={() => setOn((v) => !v)}
            style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, background: 'none', border: '1px solid #3a5847', color: '#00d26a', padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {on ? (bn ? '↺ vector দেখাও' : '↺ show vector') : (bn ? 'rasterize ▶' : 'rasterize ▶')}
          </button>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#8aa893', flex: 1, minWidth: 180 }}>
            {on
              ? (bn
                ? `মসৃণ vector এখন ${num(cols)}×${num(grid.length)} grid-এ ভাঙা — ${fine ? 'বড় size, বেশি pixel, কিনারা মসৃণ।' : 'ছোট size, কম pixel, কিনারা খাঁজকাটা।'}`
                : `the smooth vector is now broken into a ${cols}×${grid.length} grid — ${fine ? 'larger size, more pixels, smoother edges.' : 'small size, few pixels, jagged edges.'}`)
              : (bn
                ? 'বাঁয়ে মসৃণ vector A। "rasterize" চাপুন — screen-এর জন্য pixel-এ ভাঙবে।'
                : 'A smooth vector A on the left. Hit "rasterize" — it breaks into pixels for the screen.')}
          </span>
        </div>
      </Instrument>
      <Caption
        bn="Font-এ অক্ষর থাকে মসৃণ vector curve হিসেবে, কিন্তু screen বোঝে শুধু pixel। Rasterization সেই curve-কে current size-এর pixel grid-এ ভাঙে — size যত বড়, pixel তত বেশি, অক্ষর তত পরিষ্কার।"
        en="A font stores letters as smooth vector curves, but a screen only understands pixels. Rasterization breaks the curve into a pixel grid at the current size — the bigger the size, the more pixels, the crisper the letter."
      />
    </>
  );
}
