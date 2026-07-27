import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

type Pattern = 'flat' | 'noisy';
const PATTERNS: Record<Pattern, string> = {
  flat: 'AAAAAAAAAABBBBBBBBCCCCCC',
  noisy: 'ABCACBABCACBABCACBABCACB',
};
const CH_COL: Record<string, string> = { A: '#00d26a', B: '#8aa893', C: '#6c8873' };
const CH_BG: Record<string, string> = { A: '#16402a', B: '#1b231b', C: '#232b23' };

function tokenize(pat: string) {
  const tokens: { n: number; ch: string }[] = [];
  let run = 1;
  for (let i = 1; i <= pat.length; i++) {
    if (pat[i] === pat[i - 1]) run++;
    else { tokens.push({ n: run, ch: pat[i - 1] }); run = 1; }
  }
  return tokens;
}

export function RLECompressionDemo() {
  const { bn, num } = useLang();
  const [pat, setPat] = useState<Pattern>('flat');
  const chars = PATTERNS[pat];
  const tokens = tokenize(chars);
  const rleBytes = tokens.length * 2;
  const rawBytes = chars.length;
  const win = rleBytes < rawBytes;

  const segG = (active: boolean): React.CSSProperties => ({
    background: active ? '#16402a' : 'none', color: active ? '#00d26a' : '#6c8873',
    border: 'none', padding: '5px 12px', cursor: 'pointer',
    fontFamily: "'Departure Mono', monospace", fontSize: '11.5px',
  });

  const control = (
    <div className="flex" style={{ border: '1px solid #3a5847' }}>
      <button style={segG(pat === 'flat')} onClick={() => setPat('flat')} className="well-focus">
        {bn ? 'সমান' : 'flat'}
      </button>
      <button style={segG(pat === 'noisy')} onClick={() => setPat('noisy')} className="well-focus">
        {bn ? 'বিশৃঙ্খল' : 'noisy'}
      </button>
    </div>
  );

  const barW = Math.min(100, (rleBytes / rawBytes) * 100);

  return (
    <>
      <Instrument bnTitle="RUN-LENGTH ENCODING" enTitle="RUN-LENGTH ENCODING" control={control}>
        <div className="flex flex-col gap-[14px] py-[18px] px-4">
          <div className="flex flex-wrap gap-1">
            {chars.split('').map((ch, i) => (
              <span
                key={i}
                className="font-mono text-[12px] inline-flex items-center justify-center"
                style={{ width: 20, height: 24, color: CH_COL[ch], background: CH_BG[ch], border: '1px solid #2e392e' }}
              >
                {ch}
              </span>
            ))}
          </div>
          <div className="font-mono text-[12px]" style={{ color: '#6c8873' }}>↓ RLE</div>
          <div className="flex flex-wrap gap-[6px]">
            {tokens.map((t, i) => (
              <span key={i} className="font-mono text-[13px]" style={{ color: '#00d26a', border: '1px dashed #3a5847', background: '#1b231b', padding: '5px 10px' }}>
                {num(t.n)}×{t.ch}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center gap-[10px]">
              <span className="font-mono text-[11px]" style={{ color: '#6c8873', width: 52 }}>raw</span>
              <div style={{ height: 10, background: '#33473a', width: '100%' }} />
              <span className="font-mono text-[11px]" style={{ color: '#8aa893' }}>{num(rawBytes)}B</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-mono text-[11px]" style={{ color: '#6c8873', width: 52 }}>rle</span>
              <div style={{ height: 10, background: win ? '#00753f' : '#7a3a3a', width: `${barW}%` }} />
              <span className="font-mono text-[11px]" style={{ color: win ? '#00d26a' : '#ff6b6b' }}>{num(rleBytes)}B</span>
            </div>
          </div>
        </div>
      </Instrument>
      <Caption
        bn="একই জিনিস বারবার এলে RLE ছোট করে দেয়। কিন্তু pattern যদি বিশৃঙ্খল হয়, RLE উল্টো সাইজ বাড়িয়ে দিতে পারে।"
        en="When the same thing repeats, RLE shrinks it. But if the pattern is noisy, RLE can actually make it bigger."
      />
    </>
  );
}
