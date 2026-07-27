import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

type GlyphId = 'a' | 'e' | 'k' | 'p';

const ENC_DATA: Record<GlyphId, { glyph: string; cp: string; bytes: { m: string; p: string }[] }> = {
  a: { glyph: 'A', cp: 'U+0041', bytes: [{ m: '0', p: '1000001' }] },
  e: { glyph: 'é', cp: 'U+00E9', bytes: [{ m: '110', p: '00011' }, { m: '10', p: '101001' }] },
  k: { glyph: 'ক', cp: 'U+0995', bytes: [{ m: '1110', p: '0000' }, { m: '10', p: '100110' }, { m: '10', p: '010101' }] },
  p: { glyph: '🍕', cp: 'U+1F355', bytes: [{ m: '11110', p: '000' }, { m: '10', p: '011111' }, { m: '10', p: '001101' }, { m: '10', p: '010101' }] },
};

export function UnicodeEncodingDemo() {
  const { bn, num } = useLang();
  const [id, setId] = useState<GlyphId>('k');
  const enc = ENC_DATA[id];

  const segG = (active: boolean): React.CSSProperties => ({
    background: active ? '#16402a' : 'none', color: active ? '#00d26a' : '#6c8873',
    border: 'none', padding: '5px 12px', cursor: 'pointer',
    fontFamily: "'Departure Mono', monospace", fontSize: '13px',
  });

  const control = (
    <div className="flex" style={{ border: '1px solid #3a5847' }}>
      {(Object.keys(ENC_DATA) as GlyphId[]).map((k) => (
        <button key={k} style={segG(id === k)} onClick={() => setId(k)} className="well-focus">
          {ENC_DATA[k].glyph}
        </button>
      ))}
    </div>
  );

  const byteCountText = bn
    ? `${num(enc.bytes.length)} byte-এ UTF-8`
    : `UTF-8 in ${enc.bytes.length} byte${enc.bytes.length > 1 ? 's' : ''}`;

  return (
    <>
      <Instrument
        bnTitle="ENCODING GLYPH"
        enTitle="ENCODING GLYPH"
        control={control}
      >
        <div className="flex flex-col items-center gap-2 py-[22px] px-4">
          <div
            className="leading-none"
            style={{ fontFamily: "'Anek Bangla','Bricolage Grotesque',sans-serif", fontSize: 52, color: '#00d26a', textShadow: '0 0 14px rgba(0,210,106,0.45)' }}
          >
            {enc.glyph}
          </div>
          <div className="font-mono text-[12px]" style={{ color: '#6c8873' }}>
            ↓ {bn ? 'Unicode code point' : 'Unicode code point'}
          </div>
          <div className="font-mono text-[16px]" style={{ color: '#8aa893', border: '1px dashed #3a5847', padding: '5px 12px' }}>
            {enc.cp}
          </div>
          <div className="font-mono text-[12px]" style={{ color: '#6c8873' }}>
            ↓ UTF-8
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {enc.bytes.map((b, i) => (
              <span
                key={i}
                className="font-mono text-[14px]"
                style={{ background: '#1b231b', border: '1px solid #2e392e', padding: '7px 9px', letterSpacing: '0.06em' }}
              >
                <span style={{ color: '#00d26a', textShadow: '0 0 8px rgba(0,210,106,0.5)' }}>{b.m}</span>
                <span style={{ color: '#8aa893' }}>{b.p}</span>
              </span>
            ))}
          </div>
          <div className="font-mono text-[11.5px]" style={{ color: '#6c8873' }}>{byteCountText}</div>
        </div>
      </Instrument>
      <Caption
        bn="সবুজ অংশটা 'marker' — কয়টা byte লাগবে সেটা বলে দেয়। বাকিটা payload — actual code point-এর bit।"
        en="The green part is the 'marker' bits — they say how many bytes follow. The rest is payload — the actual code point bits."
      />
    </>
  );
}
