import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const LAYERS = [
  { id: 'reg', bn: 'Register', en: 'Register', width: 26, size: '~few hundred bytes', speed: '1 cycle' },
  { id: 'l1', bn: 'L1 Cache', en: 'L1 Cache', width: 38, size: '32-64 KB', speed: '1-2 cycles' },
  { id: 'l2', bn: 'L2 Cache', en: 'L2 Cache', width: 50, size: '256 KB - 1 MB', speed: '3-10 cycles' },
  { id: 'l3', bn: 'L3 Cache', en: 'L3 Cache', width: 64, size: '4-64 MB', speed: '10-30 cycles' },
  { id: 'ram', bn: 'RAM', en: 'RAM', width: 82, size: '8-32 GB', speed: '100-300 cycles' },
  { id: 'disk', bn: 'SSD / HDD', en: 'SSD / HDD', width: 100, size: '256 GB - many TB', speed: '100,000+ cycles' },
] as const;

export function MemoryPyramid() {
  const { bn } = useLang();
  const [sel, setSel] = useState<(typeof LAYERS)[number]['id']>('l1');
  const active = LAYERS.find((l) => l.id === sel)!;

  return (
    <>
      <Instrument bnTitle="THE PYRAMID" enTitle="THE PYRAMID">
        <div className="flex flex-col items-center gap-[6px] py-5 px-4">
          {LAYERS.map((l) => {
            const isActive = l.id === sel;
            return (
              <button
                key={l.id}
                onClick={() => setSel(l.id)}
                className="well-focus font-mono text-[12px]"
                style={{
                  width: `${l.width}%`,
                  padding: '9px 0',
                  cursor: 'pointer',
                  border: `1px solid ${isActive ? '#00d26a' : '#3a5847'}`,
                  background: isActive ? '#16402a' : '#1b231b',
                  color: isActive ? '#00d26a' : '#8aa893',
                  textShadow: isActive ? '0 0 8px rgba(0,210,106,0.5)' : 'none',
                }}
              >
                {bn ? l.bn : l.en}
              </button>
            );
          })}
        </div>
        <div
          className="flex flex-wrap gap-x-6 gap-y-1 px-4 pb-4 font-mono text-[12px]"
          style={{ borderTop: '1px solid #2e392e', paddingTop: 12, color: '#8aa893' }}
        >
          <span>{bn ? 'আকার' : 'size'}: <span style={{ color: '#00d26a' }}>{active.size}</span></span>
          <span>{bn ? 'গতি' : 'speed'}: <span style={{ color: '#00d26a' }}>{active.speed}</span></span>
        </div>
      </Instrument>
      <Caption
        bn="ওপর থেকে নিচে — ছোট থেকে বড়, দ্রুত থেকে ধীর, দামি থেকে সস্তা।"
        en="Top to bottom — small to big, fast to slow, expensive to cheap."
      />
    </>
  );
}
