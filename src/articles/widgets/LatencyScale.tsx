import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const ROWS = [
  { id: 'reg', bn: 'Register', en: 'Register', scaledBn: '১ সেকেন্ড', scaledEn: '1 second', real: '~0.5 ns', seconds: 1 },
  { id: 'l1', bn: 'L1 Cache', en: 'L1 Cache', scaledBn: '৩-৪ সেকেন্ড', scaledEn: '3-4 seconds', real: '~1-2 ns', seconds: 3.5 },
  { id: 'l2', bn: 'L2 Cache', en: 'L2 Cache', scaledBn: '১৫ সেকেন্ড', scaledEn: '15 seconds', real: '~4-5 ns', seconds: 15 },
  { id: 'l3', bn: 'L3 Cache', en: 'L3 Cache', scaledBn: '৪৫ সেকেন্ড', scaledEn: '45 seconds', real: '~15-20 ns', seconds: 45 },
  { id: 'ram', bn: 'RAM (DRAM)', en: 'RAM (DRAM)', scaledBn: '৫-৭ মিনিট', scaledEn: '5-7 minutes', real: '~60-100 ns', seconds: 360 },
  { id: 'ssd', bn: 'NVMe SSD', en: 'NVMe SSD', scaledBn: '১.৫-২ দিন', scaledEn: '1.5-2 days', real: '~50-100 µs', seconds: 151200 },
  { id: 'hdd', bn: 'Mechanical HDD', en: 'Mechanical HDD', scaledBn: '২-৪ মাস', scaledEn: '2-4 months', real: '~5-10 ms', seconds: 7776000 },
];

const MAX_LOG = Math.log10(ROWS[ROWS.length - 1].seconds + 1);

export function LatencyScale() {
  const { bn } = useLang();
  const [sel, setSel] = useState('ram');

  return (
    <>
      <Instrument bnTitle="IF REGISTER = 1 SECOND" enTitle="IF REGISTER = 1 SECOND">
        <div className="flex flex-col gap-[10px] py-4 px-4">
          {ROWS.map((r) => {
            const isActive = r.id === sel;
            const widthPct = Math.max(2, (Math.log10(r.seconds + 1) / MAX_LOG) * 100);
            return (
              <button
                key={r.id}
                onClick={() => setSel(r.id)}
                className="well-focus"
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
              >
                <span className="font-mono text-[11px]" style={{ color: isActive ? '#00d26a' : '#6c8873', width: 92, flexShrink: 0 }}>
                  {bn ? r.bn : r.en}
                </span>
                <span style={{ flex: 1, height: 12, background: '#1b231b', border: '1px solid #2e392e', position: 'relative' }}>
                  <span
                    style={{
                      display: 'block', height: '100%', width: `${widthPct}%`,
                      background: isActive ? '#00d26a' : '#33473a',
                      boxShadow: isActive ? '0 0 8px rgba(0,210,106,0.5)' : 'none',
                    }}
                  />
                </span>
                <span className="font-mono text-[11px]" style={{ color: isActive ? '#00d26a' : '#8aa893', width: 96, textAlign: 'right', flexShrink: 0 }}>
                  {bn ? r.scaledBn : r.scaledEn}
                </span>
              </button>
            );
          })}
        </div>
        <div className="font-mono text-[12px] px-4 pb-4" style={{ color: '#8aa893', borderTop: '1px solid #2e392e', paddingTop: 12 }}>
          {bn ? 'বাস্তব hardware latency: ' : 'real hardware latency: '}
          <span style={{ color: '#00d26a' }}>{ROWS.find((r) => r.id === sel)!.real}</span>
        </div>
      </Instrument>
      <Caption
        bn="Register access ১ সেকেন্ড ধরলে, RAM ৫-৭ মিনিট আর HDD ২-৪ মাস দূরে। bar-টা log scale-এ আঁকা — নাহলে বাকিগুলো screen-এই ধরত না।"
        en="Scale register access to 1 second, and RAM sits 5-7 minutes away, HDD 2-4 months. The bars are log-scaled — otherwise nothing else would fit on screen."
      />
    </>
  );
}
