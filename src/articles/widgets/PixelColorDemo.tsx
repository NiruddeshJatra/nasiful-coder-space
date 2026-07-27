import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const COLORS = [
  { n: 'white', r: 255, g: 255, b: 255 }, { n: 'red', r: 255, g: 0, b: 0 },
  { n: 'orange', r: 255, g: 128, b: 0 }, { n: 'yellow', r: 255, g: 255, b: 0 },
  { n: 'lime', r: 128, g: 255, b: 0 }, { n: 'green', r: 0, g: 200, b: 0 },
  { n: 'teal', r: 0, g: 160, b: 140 }, { n: 'cyan', r: 0, g: 255, b: 255 },
  { n: 'sky', r: 0, g: 128, b: 255 }, { n: 'blue', r: 0, g: 0, b: 255 },
  { n: 'navy', r: 0, g: 0, b: 128 }, { n: 'purple', r: 128, g: 0, b: 128 },
  { n: 'magenta', r: 255, g: 0, b: 255 }, { n: 'pink', r: 255, g: 128, b: 192 },
  { n: 'brown', r: 128, g: 64, b: 0 }, { n: 'black', r: 0, g: 0, b: 0 },
];

const bin8 = (v: number) => v.toString(2).padStart(8, '0');

export function PixelColorDemo() {
  const { bn, num } = useLang();
  const [sel, setSel] = useState(9);
  const px = COLORS[sel];

  const chan = (v: number) => `${num(v)} → ${bin8(v)}`;

  return (
    <>
      <Instrument bnTitle="PIXEL RGB" enTitle="PIXEL RGB">
        <div className="flex flex-wrap gap-5 py-5 px-4 items-center justify-center">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: 'repeat(4, 40px)', gridAutoRows: 40, background: '#1b231b', padding: 8, border: '1px solid #2e392e' }}
          >
            {COLORS.map((c, i) => (
              <button
                key={c.n}
                aria-label={c.n}
                onClick={() => setSel(i)}
                className="well-focus"
                style={{
                  width: 40, height: 40, cursor: 'pointer', padding: 0,
                  background: `rgb(${c.r},${c.g},${c.b})`,
                  border: i === sel ? '2px solid #00d26a' : '1px solid #2e392e',
                  boxShadow: i === sel ? '0 0 10px rgba(0,210,106,0.6)' : 'none',
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-[7px]" style={{ minWidth: 230 }}>
            <div className="font-mono text-[12px]" style={{ color: '#00d26a' }}>{px.n}</div>
            <div className="font-mono text-[12.5px]" style={{ color: '#ff6b6b' }}>R {chan(px.r)}</div>
            <div className="font-mono text-[12.5px]" style={{ color: '#00d26a' }}>G {chan(px.g)}</div>
            <div className="font-mono text-[12.5px]" style={{ color: '#6ea8ff' }}>B {chan(px.b)}</div>
            <div className="font-mono text-[11px]" style={{ color: '#6c8873', borderTop: '1px solid #2e392e', paddingTop: 7 }}>
              {bin8(px.r)} {bin8(px.g)} {bin8(px.b)} = 24 bit
            </div>
          </div>
        </div>
      </Instrument>
      <Caption
        bn="প্রতিটা pixel আসলে ৩টা সংখ্যা — Red, Green, Blue, প্রতিটা ০-২৫৫। এক pixel-এর রঙ মানেই ২৪ bit।"
        en="Every pixel is really three numbers — Red, Green, Blue, each 0-255. One pixel's color is 24 bits."
      />
    </>
  );
}
