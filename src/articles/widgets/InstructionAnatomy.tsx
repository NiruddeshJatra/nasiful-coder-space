import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';
import { SegmentedToggle } from '../primitives/SegmentedToggle';

type Op = 'add' | 'sub' | 'load';

const OP_BITS: Record<Op, string> = { add: '0001', sub: '0010', load: '0011' };
const OP_NAME: Record<Op, string> = { add: 'ADD', sub: 'SUB', load: 'LOAD' };

const REGS = [
  { n: 'A', code: '001' },
  { n: 'B', code: '010' },
  { n: 'C', code: '011' },
];

const ROLE_BN = ['উৎস ১', 'উৎস ২', 'গন্তব্য'];
const ROLE_EN = ['source 1', 'source 2', 'destination'];

const cell = (hot: boolean): CSSProperties => ({
  fontFamily: "'Departure Mono',monospace",
  fontSize: 14,
  width: 24,
  height: 32,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${hot ? '#00d26a' : '#3a5847'}`,
  background: hot ? '#16402a' : '#1b231b',
  color: hot ? '#00d26a' : '#8aa893',
});

export function InstructionAnatomy() {
  const { bn, num } = useLang();
  const [op, setOp] = useState<Op>('add');
  const [regIdx, setRegIdx] = useState([0, 1, 2]);

  const nm = (i: number) => `Reg ${REGS[regIdx[i]].n}`;

  const cycle = (i: number) =>
    setRegIdx(prev => {
      const next = prev.slice();
      next[i] = (next[i] + 1) % REGS.length;
      return next;
    });

  const read =
    op === 'load'
      ? bn
        ? `CPU পড়ছে: LOAD — memory থেকে ডেটা ${nm(2)}-তে`
        : `CPU reads: LOAD — data from memory into ${nm(2)}`
      : `${bn ? 'CPU পড়ছে' : 'CPU reads'}: ${OP_NAME[op]} — ${nm(0)} ${op === 'add' ? '+' : '−'} ${nm(1)} → ${nm(2)}`;

  return (
    <>
      <Instrument
        bnTitle="যন্ত্র ০১ — THE INSTRUCTION"
        enTitle="INSTRUMENT 01 — THE INSTRUCTION"
        control={
          <SegmentedToggle<Op>
            value={op}
            onChange={setOp}
            options={[
              { value: 'add', label: 'ADD' },
              { value: 'sub', label: 'SUB' },
              { value: 'load', label: 'LOAD' },
            ]}
          />
        }
      >
        <div style={{ padding: '20px 16px 14px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Opcode field */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {OP_BITS[op].split('').map((b, i) => (
                  <span key={i} style={cell(true)}>{num(b)}</span>
                ))}
              </div>
              <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: '#00d26a' }}>
                {OP_NAME[op]} · opcode
              </span>
            </div>

            {/* Operand fields */}
            {[0, 1, 2].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => cycle(i)}
                  title={bn ? 'register বদলাতে ক্লিক করুন' : 'click to change register'}
                  aria-label={`${bn ? ROLE_BN[i] : ROLE_EN[i]}: ${nm(i)} — ${bn ? 'বদলাতে ক্লিক করুন' : 'click to change'}`}
                  className="well-focus"
                  style={{ display: 'flex', gap: 2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  {REGS[regIdx[i]].code.split('').map((b, j) => (
                    <span key={j} style={cell(false)}>{num(b)}</span>
                  ))}
                </button>
                <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: '#8aa893' }}>
                  {nm(i)} · {bn ? ROLE_BN[i] : ROLE_EN[i]} ↻
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12.5, color: '#8aa893', textAlign: 'center' }}>
            {read}
          </div>
        </div>
      </Instrument>
      <Caption
        bn="১৩ বিটের কাল্পনিক instruction: প্রথম ৪ বিট opcode (কী করতে হবে), পরের ৩×৩ বিট operand (কার ওপর)। operand-এ ক্লিক করে register বদলান।"
        en="Our imaginary 13-bit instruction: the first 4 bits are the opcode (what to do), the next 3×3 bits are operands (on what). Click an operand to change its register."
      />
    </>
  );
}
