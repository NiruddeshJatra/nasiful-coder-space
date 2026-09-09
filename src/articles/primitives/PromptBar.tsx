import { useLang } from '../context/LanguageContext';
import { SERIES_HUB_PATH } from '../manifest';

interface PromptBarProps {
  slug: string;
  hubHref?: string;
  seriesPos?: number;
  totalLegs?: number;
  readCount?: number;
  isHub?: boolean;
}

const DOT_COUNT = 8;

export function PromptBar({
  slug,
  hubHref = SERIES_HUB_PATH,
  seriesPos,
  totalLegs = DOT_COUNT,
  readCount = 1,
  isHub = false,
}: PromptBarProps) {
  const { lang, bn, setLang } = useLang();

  const pathLabel = isHub
    ? '~/writing $'
    : `~/writing/${slug} $`;

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 py-[10px] border-b border-rule"
      style={{ background: 'rgba(238,231,215,0.88)', backdropFilter: 'blur(8px)' }}
    >
      <a
        href={isHub ? 'https://niruddeshjatra.space' : hubHref}
        className="font-mono text-[12.5px] text-ink-muted no-underline whitespace-nowrap overflow-hidden text-ellipsis hover:text-machine-green focus-visible:outline-none"
        style={{ outline: undefined }}
      >
        {pathLabel}
      </a>

      <div className="flex items-center gap-[14px]">
        {!isHub && seriesPos !== undefined && (
          <div aria-label="series position" className="flex items-center gap-[3px]">
            {Array.from({ length: totalLegs }, (_, i) => (
              <span
                key={i}
                className="inline-block w-[7px] h-[7px]"
                style={{
                  background: i < readCount ? '#00975a' : 'none',
                  border: i < readCount ? 'none' : '1px solid #a89a76',
                }}
              />
            ))}
            <span className="font-mono text-[11px] text-ink-faint ml-[5px]">
              {String(seriesPos).padStart(2, '0')}/{String(totalLegs).padStart(2, '0')}
            </span>
          </div>
        )}

        {!isHub && (
          <span className="font-mono text-[11px] text-ink-faint">intro ⏻</span>
        )}

        <div
          role="group"
          aria-label="language"
          className="flex border border-ink font-mono text-[12px]"
        >
          <button
            onClick={() => setLang('bn')}
            className="seg-btn"
            style={{
              background: bn ? '#26241C' : 'none',
              color: bn ? '#00d26a' : '#26241C',
              border: 'none',
              padding: '5px 12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          >
            বাং
          </button>
          <button
            onClick={() => setLang('en')}
            className="seg-btn"
            style={{
              background: !bn ? '#26241C' : 'none',
              color: !bn ? '#00d26a' : '#26241C',
              border: 'none',
              padding: '5px 12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
