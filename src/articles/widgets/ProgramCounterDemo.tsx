import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const ROWS = [
  { addr: '0x004', bits: '0001001010011', idleBn: 'শুধু bit', idleEn: 'just bits' },
  { addr: '0x008', bits: '0000000000010', idleBn: 'শুধু bit (মান: ২)', idleEn: 'just bits (value: 2)' },
  { addr: '0x00C', bits: '0000000000011', idleBn: 'শুধু bit (মান: ৩)', idleEn: 'just bits (value: 3)' },
];

const NARR_BN = [
  'PC 0x004-কে point করছে — CPU এই bit-গুলোকেই instruction হিসেবে fetch করবে।',
  'PC এখন 0x008-এ। যে bit-গুলো একটু আগে "সংখ্যা ২" ছিল, PC point করা মাত্র সেগুলোই instruction হিসেবে treat হবে!',
  '0x00C-ও তাই। instruction না data — এটা bit-এর গায়ে লেখা নেই; PC কোথায় point করছে, সেটাই সব।',
];

const NARR_EN = [
  'The PC points at 0x004 — the CPU will fetch exactly these bits as an instruction.',
  'The PC is now at 0x008. The bits that were "the number 2" a moment ago get treated as an instruction the instant the PC points here!',
  "Same for 0x00C. Instruction vs data isn't written on the bits — where the PC points is everything.",
];

export function ProgramCounterDemo() {
  const { bn } = useLang();
  const [pos, setPos] = useState(0);

  const bitStyle = (active: boolean): CSSProperties => ({
    fontFamily: "'Departure Mono',monospace",
    fontSize: 12.5,
    letterSpacing: '0.1em',
    padding: '7px 10px',
    border: `1px solid ${active ? '#00d26a' : '#33473a'}`,
    background: active ? '#16402a' : '#1b231b',
    color: active ? '#00d26a' : '#55695a',
  });

  return (
    <>
      <Instrument
        bnTitle="যন্ত্র ০২ — THE POINTER"
        enTitle="INSTRUMENT 02 — THE POINTER"
        control={
          <button
            onClick={() => setPos(p => (p + 1) % ROWS.length)}
            className="well-focus"
            style={{
              fontFamily: "'Departure Mono',monospace",
              fontSize: 12,
              background: 'none',
              border: '1px solid #3a5847',
              color: '#00d26a',
              padding: '6px 14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            PC++ ▶
          </button>
        }
      >
        <div style={{ padding: '18px 16px 8px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 430 }}>
            {ROWS.map((r, i) => {
              const active = i === pos;
              return (
                <div key={r.addr} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "'Departure Mono',monospace",
                      fontSize: 12,
                      color: '#00d26a',
                      width: 44,
                      textShadow: '0 0 8px rgba(0,210,106,0.5)',
                      visibility: active ? 'visible' : 'hidden',
                    }}
                  >
                    PC ▶
                  </span>
                  <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12.5, color: '#6c8873', width: 48 }}>
                    {r.addr}
                  </span>
                  <span style={bitStyle(active)}>{r.bits}</span>
                  <span
                    style={{
                      fontFamily: "'Departure Mono',monospace",
                      fontSize: 11,
                      color: active ? '#00d26a' : '#55695a',
                    }}
                  >
                    {active ? 'instruction!' : bn ? r.idleBn : r.idleEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, color: '#8aa893', padding: '10px 16px 16px' }}>
          {bn ? NARR_BN[pos] : NARR_EN[pos]}
        </div>
      </Instrument>
      <Caption
        bn='মেমোরির কোনো ঘরে "আমি instruction" লেখা নেই — Program Counter যাকে point করে, সে-ই instruction।'
        en='No memory cell is labeled "I am an instruction" — whatever the Program Counter points at becomes one.'
      />
    </>
  );
}
