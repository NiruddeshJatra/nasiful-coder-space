import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

function fmtCount(n: number, bn: boolean, bdFn: (s: string | number) => string): string {
  if (n <= 0) return bn ? '০' : '0';
  const units = bn
    ? [['লক্ষ কোটি', 1e12], ['হাজার কোটি', 1e10], ['কোটি', 1e7]] as const
    : [['trillion', 1e12], ['billion', 1e9]] as const;
  for (const [u, v] of units) {
    if (n >= v) {
      const x = (n / v).toFixed(1);
      return (bn ? bdFn(x) : x) + ' ' + u;
    }
  }
  return bn ? bdFn(Math.round(n).toLocaleString()) : Math.round(n).toLocaleString();
}

export function Colophon({ skipCounter }: { skipCounter?: boolean } = {}) {
  const { bn, bd } = useLang();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCount((c) => c + 2.1e9 + Math.random() * 1.4e9);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const countStr = fmtCount(count, bn, bd);

  const counterText = bn
    ? `এই পাতা খোলার পর থেকে আপনার device-এ আনুমানিক ${countStr} বার transistor switch হয়েছে।`
    : `~${countStr} transistor switches have happened in your device since you opened this page.`;

  return (
    <div
      data-role="colophon"
      className="mt-9 flex flex-col gap-[10px]"
    >
      {!skipCounter && <div className="font-mono text-[11.5px] text-ink-faint">{counterText}</div>}
      <a
        href="https://niruddeshjatra.space"
        className="font-mono text-[12.5px] text-machine-green no-underline hover:text-machine-green-hover"
      >
        cd ~ &nbsp;# back to terminal
      </a>
    </div>
  );
}
