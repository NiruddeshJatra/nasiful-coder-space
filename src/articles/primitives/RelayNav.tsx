import { useState, type ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';
import { SERIES_HUB_PATH, SERIES_TITLE } from '../manifest';

interface NavCard {
  label: { bn: string; en: string };
  title: string;
  href: string;
  variant: 'hub' | 'next';
}

interface RelayNavProps {
  bridge?: { bn: ReactNode; en: ReactNode };
  hub: NavCard;
  next: NavCard;
}

/** Every article's back-to-hub card is identical — defined once, here. */
export const SERIES_HUB_CARD: NavCard = {
  label: { bn: 'সিরিজ hub', en: 'series hub' },
  title: SERIES_TITLE,
  href: SERIES_HUB_PATH,
  variant: 'hub',
};

export function RelayNav({ bridge, hub, next }: RelayNavProps) {
  const { bn } = useLang();
  const [batonHover, setBatonHover] = useState(false);

  const hubCard = (
    <a
      href={hub.href}
      className="flex-1 min-w-[200px] no-underline text-ink-muted block hover:border-machine-green transition-colors"
      style={{ border: '1px solid #c9bda0', padding: '16px 18px' }}
    >
      <div className="font-mono text-[11px] mb-[6px]" style={{ letterSpacing: '0.08em' }}>
        ◀ {bn ? hub.label.bn : hub.label.en}
      </div>
      <div className="font-body text-[15px] text-ink">{hub.title}</div>
    </a>
  );

  const nextCard = (
    <a
      href={next.href}
      onMouseEnter={() => setBatonHover(true)}
      onMouseLeave={() => setBatonHover(false)}
      className="flex-[2] min-w-[260px] no-underline block relative overflow-hidden"
      style={{
        border: '1px solid #26241C',
        background: 'rgba(255,252,243,0.65)',
        padding: '16px 18px',
      }}
    >
      <div
        className="font-mono text-[11px] text-machine-green mb-[6px]"
        style={{ letterSpacing: '0.08em' }}
      >
        {bn ? next.label.bn : next.label.en} ▶
      </div>
      <div className="font-body text-[16.5px] text-ink">{bn ? next.title : next.title}</div>
      {/* Baton animation bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          background: '#00d26a',
          width: batonHover ? '100%' : '0%',
          transition: 'width 0.45s ease',
          boxShadow: '0 0 8px rgba(0,210,106,0.7)',
        }}
      />
    </a>
  );

  return (
    <nav
      data-role="relay"
      className="mt-[56px] pt-6"
      style={{ borderTop: '1px solid #c9bda0' }}
    >
      {bridge && (
        <p
          className="font-body text-[16px] leading-[1.9] mb-5"
          style={{ color: '#3c382b' }}
          {...(bn ? { lang: 'bn' } : {})}
        >
          {bn ? bridge.bn : bridge.en}
        </p>
      )}
      <div className="flex gap-4 items-stretch flex-wrap">
        {hubCard}
        {nextCard}
      </div>
    </nav>
  );
}
