import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';
import { MEMORY_LAYERS, type MemoryLayerId } from '../data/memoryLayers';

// Presentational-only funnel widths, parallel to MEMORY_LAYERS order — not
// hierarchy data, just how wide each row renders (small at top, big at bottom).
const WIDTH_PCT: Record<MemoryLayerId, number> = { reg: 26, l1: 38, l2: 50, l3: 64, ram: 82, disk: 100 };

export function MemoryPyramid() {
  const { bn } = useLang();
  const [sel, setSel] = useState<MemoryLayerId>('l1');
  const active = MEMORY_LAYERS.find((l) => l.id === sel)!;

  return (
    <>
      <Instrument bnTitle="THE PYRAMID" enTitle="THE PYRAMID">
        <div className="flex flex-col items-center gap-[6px] py-5 px-4">
          {MEMORY_LAYERS.map((l) => {
            const isActive = l.id === sel;
            return (
              <button
                key={l.id}
                onClick={() => setSel(l.id)}
                className="well-focus font-mono text-[12px]"
                style={{
                  width: `${WIDTH_PCT[l.id]}%`,
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
          <span>{bn ? 'গতি' : 'speed'}: <span style={{ color: '#00d26a' }}>{active.speedLabel}</span></span>
        </div>
      </Instrument>
      <Caption
        bn="ওপর থেকে নিচে — ছোট থেকে বড়, দ্রুত থেকে ধীর, দামি থেকে সস্তা।"
        en="Top to bottom — small to big, fast to slow, expensive to cheap."
      />
    </>
  );
}
