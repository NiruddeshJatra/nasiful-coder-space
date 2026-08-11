import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

type Proc = 'chrome' | 'vscode';

const MAPS: Record<Proc, { map: string; phys: string; cellIdx: number }> = {
  chrome: { map: '0x100 → 0x842', phys: 'phys 0x842E0', cellIdx: 2 },
  vscode: { map: '0x100 → 0xB08', phys: 'phys 0xB0840', cellIdx: 7 },
};

const segBtn = (on: boolean): React.CSSProperties => ({
  background: on ? '#16402a' : 'none',
  color: on ? '#00d26a' : '#6c8873',
  border: 'none',
  padding: '5px 12px',
  cursor: 'pointer',
  fontFamily: "'Departure Mono',monospace",
  fontSize: 11,
});

export function MMUTranslator() {
  const { bn } = useLang();
  const [proc, setProc] = useState<Proc>('chrome');
  const info = MAPS[proc];

  const arrowStyle: React.CSSProperties = {
    width: 28,
    height: 2,
    flex: 'none',
    backgroundImage: 'linear-gradient(90deg, #00d26a 50%, transparent 50%)',
    backgroundSize: '8px 2px',
  };

  const procControl = (
    <div style={{ display: 'flex', border: '1px solid #3a5847' }}>
      <button style={segBtn(proc === 'chrome')} onClick={() => setProc('chrome')}>chrome</button>
      <button style={segBtn(proc === 'vscode')} onClick={() => setProc('vscode')}>vs code</button>
    </div>
  );

  const narrText = bn
    ? (proc === 'chrome'
        ? 'chrome-এর "0x100" আসলে physical 0x842E0-তে।'
        : 'vs code-এর একই "0x100" আসলে সম্পূর্ণ ভিন্ন physical 0xB0840-তে।') + ' একই virtual address, ভিন্ন আসল জায়গা।'
    : (proc === 'chrome'
        ? "chrome's \"0x100\" really lives at physical 0x842E0."
        : 'vs code\'s same "0x100" really lives at a completely different physical 0xB0840.') + ' Same virtual address, different real location.';

  return (
    <>
      <Instrument bnTitle="যন্ত্র ০৪ — THE TRANSLATOR" enTitle="INSTRUMENT 04 — THE TRANSLATOR" control={procControl}>
        <div style={{ padding: '20px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Process box */}
          <div style={{ border: '1px solid #00d26a', background: '#16402a', padding: '10px 12px', fontFamily: "'Departure Mono',monospace", textAlign: 'center', minWidth: 96 }}>
            <div style={{ fontSize: 9.5, color: '#8aa893', letterSpacing: '0.06em' }}>{proc}</div>
            <div style={{ fontSize: 12, color: '#00d26a', marginTop: 4 }}>vaddr 0x100</div>
          </div>
          <div style={arrowStyle} />
          {/* MMU box */}
          <div style={{ border: '1px solid #3a5847', background: '#1b231b', padding: '10px 12px', fontFamily: "'Departure Mono',monospace", textAlign: 'center', minWidth: 104 }}>
            <div style={{ fontSize: 9.5, color: '#6c8873', letterSpacing: '0.06em' }}>MMU</div>
            <div style={{ fontSize: 10, color: '#8aa893', marginTop: 4 }}>page table</div>
            <div style={{ fontSize: 10, color: '#8aa893' }}>{info.map}</div>
          </div>
          <div style={arrowStyle} />
          {/* Physical RAM */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }} aria-label="physical RAM cells">
            <div style={{ fontSize: 9.5, color: '#6c8873', fontFamily: "'Departure Mono',monospace", letterSpacing: '0.06em', textAlign: 'center' }}>PHYSICAL RAM</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 20px)', gap: 3 }}>
              {Array.from({ length: 10 }, (_, i) => {
                const on = i === info.cellIdx;
                return (
                  <span key={i} style={{ width: 20, height: 20, display: 'block', boxSizing: 'border-box', border: `1px solid ${on ? '#00d26a' : '#2e392e'}`, background: on ? '#16402a' : '#1b231b', boxShadow: on ? '0 0 8px rgba(0,210,106,0.5)' : 'none' }} />
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: '#00d26a', fontFamily: "'Departure Mono',monospace", textAlign: 'center', marginTop: 2 }}>{info.phys}</div>
          </div>
        </div>
        <div style={{ padding: '6px 16px 14px', fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#8aa893', textAlign: 'center' }}>{narrText}</div>
      </Instrument>
      <Caption
        bn="দুই process একই virtual address 0x100 ব্যবহার করে, কিন্তু MMU + page table তাদের RAM-এর ভিন্ন cell-এ পাঠায়। এটাই isolation।"
        en="Both processes use virtual address 0x100, but the MMU + page table route them to different RAM cells. That is isolation."
      />
    </>
  );
}
