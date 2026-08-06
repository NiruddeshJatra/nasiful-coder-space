import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const CELL_COUNT = 32;
const LINE_SIZE = 4;
const LINE_COUNT = CELL_COUNT / LINE_SIZE;

type Status = { kind: 'hit' | 'miss'; addr: number } | null;

export function CacheLineLocality() {
  const { bn, num } = useLang();
  const [cachedLines, setCachedLines] = useState<Set<number>>(new Set());
  const [status, setStatus] = useState<Status>(null);

  const access = (addr: number) => {
    const line = Math.floor(addr / LINE_SIZE);
    if (cachedLines.has(line)) {
      setStatus({ kind: 'hit', addr });
    } else {
      setCachedLines((s) => new Set(s).add(line));
      setStatus({ kind: 'miss', addr });
    }
  };

  const reset = () => { setCachedLines(new Set()); setStatus(null); };

  const cellStyle = (i: number): CSSProperties => {
    const line = Math.floor(i / LINE_SIZE);
    const isCached = cachedLines.has(line);
    const isLast = status?.addr === i;
    return {
      width: 22, height: 28, fontFamily: "'Departure Mono', monospace", fontSize: 10, cursor: 'pointer',
      border: `1px solid ${isLast ? '#00d26a' : isCached ? '#00753f' : '#3a5847'}`,
      background: isLast ? '#16402a' : isCached ? 'rgba(0,117,63,0.35)' : '#1b231b',
      color: isCached ? '#00d26a' : '#55695a',
      borderRight: (i + 1) % LINE_SIZE === 0 ? '1px solid #6c8873' : undefined,
    };
  };

  const control = (
    <button
      onClick={reset}
      className="well-focus font-mono text-[11px]"
      style={{ background: 'none', border: '1px solid #3a5847', color: '#8aa893', padding: '5px 12px', cursor: 'pointer' }}
    >
      {bn ? 'cache খালি করো' : 'reset cache'}
    </button>
  );

  return (
    <>
      <Instrument bnTitle="ARRAY ACCESS & THE CACHE LINE" enTitle="ARRAY ACCESS & THE CACHE LINE" control={control}>
        <div className="flex flex-col gap-[14px] py-[18px] px-4">
          <div className="flex flex-wrap gap-0" style={{ borderLeft: '1px solid #6c8873' }}>
            {Array.from({ length: CELL_COUNT }, (_, i) => (
              <button key={i} onClick={() => access(i)} style={cellStyle(i)} className="well-focus" aria-label={`address ${i}`}>
                {num(i)}
              </button>
            ))}
          </div>
          <div className="font-mono text-[11.5px]" style={{ color: '#6c8873' }}>
            {bn
              ? `${num(LINE_SIZE)}টা করে cell একসাথে ${num(LINE_COUNT)}টা cache line গঠন করে।`
              : `Every ${num(LINE_SIZE)} cells form one of ${num(LINE_COUNT)} cache lines.`}
          </div>
          {status && (
            <div
              className="font-mono text-[13px]"
              style={{ color: status.kind === 'hit' ? '#00d26a' : '#ff9f5a', border: `1px dashed ${status.kind === 'hit' ? '#00d26a' : '#ff9f5a'}`, padding: '6px 12px', width: 'fit-content' }}
            >
              {status.kind === 'hit'
                ? (bn ? `address ${num(status.addr)} — HIT (আগেই cache-এ ছিল)` : `address ${num(status.addr)} — HIT (already in cache)`)
                : (bn ? `address ${num(status.addr)} — MISS (পুরো ৪-cell line RAM থেকে টেনে আনা হলো)` : `address ${num(status.addr)} — MISS (pulled the whole 4-cell line from RAM)`)}
            </div>
          )}
        </div>
      </Instrument>
      <Caption
        bn="একটা address চাইলে পুরো line-টাই cache-এ চলে আসে (spatial locality)। সেই line-এর ভেতরের বাকি address পরে চাইলে সেটা HIT — RAM-এ যেতে হয় না।"
        en="Request one address and the whole line rides along (spatial locality). Ask for a neighbor in that same line later and it's a HIT — no trip to RAM needed."
      />
    </>
  );
}
