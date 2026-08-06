import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';
import { SegmentedToggle } from '../primitives/SegmentedToggle';

type Mode = 'sram' | 'dram';

const useReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function SRAMvsDRAM() {
  const { bn } = useLang();
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>('dram');
  const [charge, setCharge] = useState(100);
  const [refreshes, setRefreshes] = useState(0);

  useEffect(() => {
    if (mode !== 'dram' || reduced) { setCharge(100); return; }
    setCharge(100);
    setRefreshes(0);
    const iv = setInterval(() => {
      setCharge((c) => {
        const next = c - 4;
        if (next <= 0) { setRefreshes((r) => r + 1); return 100; }
        return next;
      });
    }, 90);
    return () => clearInterval(iv);
  }, [mode, reduced]);

  const control = (
    <SegmentedToggle
      value={mode}
      onChange={setMode}
      options={[
        { value: 'sram', label: 'SRAM' },
        { value: 'dram', label: 'DRAM' },
      ]}
    />
  );

  return (
    <>
      <Instrument bnTitle="SRAM vs DRAM" enTitle="SRAM vs DRAM" control={control}>
        <div className="flex flex-col items-center gap-[14px] py-[22px] px-4">
          <div className="font-mono text-[11.5px]" style={{ color: '#6c8873' }}>
            {mode === 'sram'
              ? (bn ? '6-transistor flip-flop — যতক্ষণ current আছে, ততক্ষণ state স্থির' : '6-transistor flip-flop — state stays put as long as current flows')
              : (bn ? '1-transistor + capacitor — চার্জ ফুটো হয়, তাই বারবার refresh লাগে' : '1-transistor + capacitor — charge leaks, so it needs constant refreshing')}
          </div>
          <div style={{ width: 220, height: 28, border: '1px solid #3a5847', background: '#1b231b', position: 'relative' }}>
            <div
              style={{
                height: '100%', width: `${charge}%`,
                background: mode === 'sram' ? '#00d26a' : charge < 25 ? '#ff6b6b' : '#00d26a',
                transition: mode === 'sram' ? 'none' : 'width 90ms linear, background 200ms',
              }}
            />
          </div>
          <div className="font-mono text-[12px]" style={{ color: '#8aa893' }}>
            {mode === 'sram'
              ? (bn ? 'charge: স্থির ১০০%' : 'charge: steady 100%')
              : (bn ? `charge: ${Math.round(charge)}% · refresh হয়েছে ${refreshes} বার` : `charge: ${Math.round(charge)}% · refreshed ${refreshes}×`)}
          </div>
          <div className="flex gap-6 font-mono text-[11.5px]" style={{ color: '#6c8873' }}>
            <span>{bn ? 'transistor/bit' : 'transistors/bit'}: <span style={{ color: '#00d26a' }}>{mode === 'sram' ? '6' : '1 + capacitor'}</span></span>
            <span>{bn ? 'ব্যবহার' : 'used for'}: <span style={{ color: '#00d26a' }}>{mode === 'sram' ? (bn ? 'CPU cache' : 'CPU cache') : (bn ? 'Main RAM' : 'Main RAM')}</span></span>
          </div>
        </div>
      </Instrument>
      <Caption
        bn="SRAM-এর flip-flop নিজে থেকেই state ধরে রাখে — দ্রুত কিন্তু ব্যয়বহুল। DRAM-এর capacitor ফুটো করে, তাই বারবার refresh লাগে — সস্তা কিন্তু ধীর।"
        en="SRAM's flip-flop holds its own state — fast but expensive. DRAM's capacitor leaks, so it needs constant refreshing — cheap but slower."
      />
    </>
  );
}
