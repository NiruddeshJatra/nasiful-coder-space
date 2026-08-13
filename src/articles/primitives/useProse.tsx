import type { CSSProperties, ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';

/** Ink-green, used for in-prose links back to sibling articles. */
export const LINK: CSSProperties = { color: '#00753F' };

/** Inline monospace run — file names, identifiers, short code fragments. */
export const mono = (s: string) => (
  <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>{s}</span>
);

/** Dark scope-well block for terminal transcripts and hex dumps. */
export const WELL: CSSProperties = {
  background: '#232b23', border: '1px solid #4a493a', padding: '11px 14px', margin: '0 0 16px',
  fontFamily: "'Departure Mono',monospace", fontSize: 12.5, color: '#cfe8d8', overflowX: 'auto',
};

/**
 * Shared prose builders for article content modules. The body font follows the
 * BN/EN toggle, so every block has to read `useLang()` — hence a hook rather
 * than plain constants.
 */
export function useProse() {
  const { bn } = useLang();

  const body: CSSProperties = bn
    ? { fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }
    : { fontFamily: "'Anek Latin',sans-serif" };

  /** Body paragraph. */
  const p = (s: ReactNode) => <p style={{ margin: '0 0 16px', ...body }}>{s}</p>;

  /** Paragraph that introduces a list — tighter bottom margin. */
  const lead = (s: ReactNode) => <p style={{ margin: '0 0 8px', ...body }}>{s}</p>;

  const ul = (items: ReactNode[]) => (
    <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...body }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 8 }}>{item}</li>)}
    </ul>
  );

  const ol = (items: ReactNode[]) => (
    <ol style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...body }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
    </ol>
  );

  /** Aged-paper callout with a monospace `// label` header. */
  const box = (label: string, children: ReactNode) => (
    <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.65)', padding: '14px 18px', margin: '0 0 16px' }}>
      <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#00753F', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</div>
      <div style={{ margin: 0, fontSize: 15.5, ...body }}>{children}</div>
    </div>
  );

  /** Shell transcript line, prefixed with a dim `$`. */
  const shell = (cmd: string) => (
    <div style={WELL}><span style={{ color: '#6c8873' }}>$</span> {cmd}</div>
  );

  return { bn, body, p, lead, ul, ol, box, shell };
}
