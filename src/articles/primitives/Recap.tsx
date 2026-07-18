import { type ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';

interface RecapProps {
  children: ReactNode;
}

export function Recap({ children }: RecapProps) {
  const { bn } = useLang();
  const header = bn ? '// এই আর্টিকেলে কী শিখলাম' : '// what we learned in this article';

  return (
    <div
      data-role="recap"
      className="mt-2"
      style={{ border: '1px solid #c9bda0', padding: '20px 24px' }}
    >
      <div
        className="font-mono text-[11.5px] text-machine-green mb-3"
        style={{ letterSpacing: '0.08em' }}
      >
        {header}
      </div>
      <ul
        className="font-body text-[16px] leading-[1.9] m-0 pl-5 text-ink-body"
        {...(bn ? { lang: 'bn' } : {})}
      >
        {children}
      </ul>
    </div>
  );
}
