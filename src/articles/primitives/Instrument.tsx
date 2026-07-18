import { type ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';

interface InstrumentProps {
  bnTitle: string;
  enTitle: string;
  children: ReactNode;
  control?: ReactNode;
}

export function Instrument({ bnTitle, enTitle, children, control }: InstrumentProps) {
  const { bn } = useLang();
  const title = bn ? bnTitle : enTitle;

  return (
    <figure
      data-role="instrument"
      className="relative my-[26px] mb-2"
      style={{ background: '#232b23', border: '1px solid #4a493a', margin: '26px 0 8px' }}
    >
      {/* Title bar */}
      <div
        className="flex justify-between items-center gap-2 px-[14px] py-[10px]"
        style={{ borderBottom: '1px solid #2e392e' }}
      >
        <span
          className="font-mono text-[11.5px] text-well-text flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ letterSpacing: '0.08em' }}
        >
          {title}
        </span>
        {control && <div className="flex-none">{control}</div>}
      </div>

      {/* Widget body */}
      {children}

      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 scanlines"
        style={{ pointerEvents: 'none' }}
      />
    </figure>
  );
}
