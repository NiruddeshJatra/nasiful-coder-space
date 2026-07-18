import { useState, type ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';

interface DeeperProps {
  bnLabel: string;
  enLabel: string;
  children: ReactNode;
}

export function Deeper({ bnLabel, enLabel, children }: DeeperProps) {
  const [open, setOpen] = useState(false);
  const { bn } = useLang();
  const label = bn ? bnLabel : enLabel;

  return (
    <div
      data-role="deeper"
      className="my-[6px] mb-5"
      style={{ border: '1px solid #c9bda0' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left bg-transparent border-none cursor-pointer px-4 py-3 font-mono text-[12.5px] text-machine-green flex items-center gap-2"
        style={{ outline: 'none' }}
      >
        <span>{open ? '▾' : '▸'}</span>
        <span>{label}</span>
      </button>
      {open && (
        <div
          className="px-4 pb-4 text-[15px] leading-[1.85] text-ink-body font-body"
          style={{ borderTop: '1px dashed #c9bda0' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
