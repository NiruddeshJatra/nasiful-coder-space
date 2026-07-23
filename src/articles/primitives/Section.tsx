import { type ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';

interface SectionProps {
  num: string;
  bnH2: string;
  enH2: string;
  children: ReactNode;
}

export function Section({ num, bnH2, enH2, children }: SectionProps) {
  const { bn } = useLang();

  return (
    <section
      data-trace-edge="true"
      data-role="section"
      className="mt-[52px]"
    >
      {/* Header device: number + rising-edge SVG + hairline */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="font-mono text-[12.5px] text-machine-green"
          style={{ letterSpacing: '0.06em' }}
        >
          {num}
        </span>
        <svg width="34" height="18" viewBox="0 0 34 18" aria-hidden="true">
          <path d="M0 15 H12 V3 H34" fill="none" stroke="#00753F" strokeWidth="2" />
        </svg>
        <div className="flex-1 h-px bg-rule" />
      </div>

      {/* Section title */}
      {bn ? (
        <h2
          lang="bn"
          className="font-body text-[28px] leading-[1.35] mb-4 mt-0"
          style={{ fontWeight: 900 }}
        >
          {bnH2}
        </h2>
      ) : (
        <h2
          className="font-display font-bold text-[29px] leading-[1.25] mb-4 mt-0"
        >
          {enH2}
        </h2>
      )}

      {children}
    </section>
  );
}
