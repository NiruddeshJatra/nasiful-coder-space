import { createPortal } from 'react-dom';
import { useTerm } from '../context/TermContext';
import { useLang } from '../context/LanguageContext';

interface TermProps {
  id: string;
  children: React.ReactNode;
}

export function Term({ id, children }: TermProps) {
  const { openTerm, closeTerm } = useTerm();

  return (
    <span
      role="button"
      tabIndex={0}
      data-term={id}
      onMouseEnter={(e) => {
        if (window.innerWidth >= 720) openTerm(id, e.currentTarget);
      }}
      onMouseLeave={closeTerm}
      onClick={(e) => openTerm(id, e.currentTarget)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openTerm(id, e.currentTarget); }}
      className="font-mono text-machine-green cursor-help"
      style={{ fontSize: '0.85em', borderBottom: '1px dashed #00753F', padding: '0 2px' }}
    >
      {children}
    </span>
  );
}

export function TermPopup() {
  const { activeTerm, isMobile, tipPos, closeTerm, onTipEnter, def } = useTerm();
  const { lang } = useLang();

  if (!activeTerm || !def) return null;

  const body = lang === 'bn' ? def.bn : def.en;

  const cardStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
        background: '#232b23', borderTop: '2px solid #00d26a',
        padding: '18px 20px 26px', boxShadow: '0 -8px 30px rgba(0,0,0,0.35)',
      }
    : {
        position: 'fixed', left: Math.max(12, tipPos.x), top: tipPos.y, zIndex: 60,
        width: 420, maxWidth: 'calc(100vw - 24px)', maxHeight: '60vh', overflowY: 'auto' as const,
        background: '#232b23', border: '1px solid #3a5847',
        padding: '14px 16px', boxShadow: '0 10px 30px rgba(20,18,10,0.35)',
      };

  return createPortal(
    <div
      role="tooltip"
      style={cardStyle}
      onMouseEnter={onTipEnter}
      onMouseLeave={closeTerm}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[12px] text-machine-phosphor" style={{ letterSpacing: '0.06em' }}>
          {def.term}
        </span>
        <button
          onClick={closeTerm}
          className="well-focus bg-transparent border-none text-well-text text-lg cursor-pointer leading-none px-1"
        >
          ×
        </button>
      </div>
      <p
        className="font-body text-[14.5px] leading-[1.8] m-0"
        style={{ color: '#cfe8d8' }}
        {...(lang === 'bn' ? { lang: 'bn' } : {})}
      >
        {body}
      </p>
    </div>,
    document.body,
  );
}
