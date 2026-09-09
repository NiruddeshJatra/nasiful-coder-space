import { useLang } from '../context/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ARTICLES } from '../manifest';
import { Colophon } from '../primitives/Colophon';

export function SeriesHub() {
  const { bn, bd } = useLang();
  const reduced = useReducedMotion();

  // Derived from the manifest so hub rows can never drift out of sync with
  // what is actually published (they silently did, twice, for legs 06 and 07).
  const data = ARTICLES.map((a) => ({
    bn: a.bnTitle, en: a.enTitle, sub: a.sub, state: a.state, href: a.href,
  }));
  const readCount = ARTICLES.filter((a) => a.state === 'read').length;
  const complete = readCount === ARTICLES.length;

  const seg = (on: boolean): React.CSSProperties => ({
    background: on ? '#26241C' : 'none', color: on ? '#00d26a' : '#26241C',
    border: 'none', padding: '5px 12px', cursor: 'pointer',
    fontFamily: "'Departure Mono',monospace", fontSize: 12,
  });


  // Signal map SVG
  const step = 90, x0 = 80;
  const segPaths = data.map((d, i) => {
    const x = x0 + i * step;
    const lit = d.state === 'read', next = d.state === 'next';
    const col = lit ? '#00975a' : next ? '#8aa876' : '#b8ab87';
    return { path: `M${x} 78 h14 v-36 h26 v36 h${step - 40}`, col, dash: lit ? '6 6' : '4 5', lit };
  });

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>
      {/* Hero */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid #26241C', borderBottom: '1px solid #c9bda0', fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#5c5442', letterSpacing: '0.06em', marginBottom: 26 }}>
          <span style={{ padding: '8px 14px 8px 0', borderRight: '1px solid #c9bda0' }}>SERIES 001</span>
          <span style={{ padding: '8px 14px', borderRight: '1px solid #c9bda0' }}>{bn ? '১টা ভূমিকা + ৮টা পর্ব' : '1 intro + 8 legs'}</span>
          <span style={{ padding: '8px 0 8px 14px' }}>{complete ? (bn ? 'সম্পূর্ণ' : 'complete') : (bn ? 'চলমান' : 'ongoing')}</span>
        </div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1.12, margin: '0 0 12px' }}>The Machine Beneath Your Code</h1>
        {bn ? (
          <p lang="bn" style={{ fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: 18, lineHeight: 1.8, color: '#5c5442', margin: 0, maxWidth: '60ch' }}>
            একটাই চরিত্র — information। <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.9em' }}>x = 5</span> লেখার পর সেই ৫ silicon-এর voltage থেকে screen-এর অক্ষর পর্যন্ত যে পথ পাড়ি দেয় — এই series সেই পথের গল্প।
          </p>
        ) : (
          <p style={{ fontFamily: "'Anek Latin',sans-serif", fontSize: 18, lineHeight: 1.8, color: '#5c5442', margin: 0, maxWidth: '60ch' }}>
            One protagonist — information. After you write <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.9em' }}>x = 5</span>, that 5 travels from voltage in silicon to a character on screen — this series is the story of that road.
          </p>
        )}
        <div aria-hidden="true" style={{ marginTop: 26, borderTop: '1px solid #26241C', borderBottom: '1px solid #26241C', height: 3 }} />
      </div>

      {/* Signal map */}
      <section style={{ marginTop: 44 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#7a7259', letterSpacing: '0.08em' }}>
            {bn ? "SIGNAL MAP — তথ্যের যাত্রাপথ" : "SIGNAL MAP — information's route"}
          </span>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#00753F' }}>
            {bn ? `${bd(readCount)}/${bd(ARTICLES.length)} পড়া হয়েছে` : `${readCount}/${ARTICLES.length} read`}
          </span>
        </div>
        <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.5)', padding: '8px 0 0' }}>
          <svg viewBox="0 0 900 96" style={{ display: 'block', width: '100%', height: 'auto' }} aria-hidden="true">
            <path d="M30 78 H80" stroke="#00975a" strokeWidth="2" fill="none" strokeDasharray="6 6"
              style={!reduced ? { animation: 'flowh 1.2s linear infinite' } : undefined} />
            {segPaths.map((sg, i) => (
              <path key={i} d={sg.path} stroke={sg.col} strokeWidth="2" fill="none" strokeDasharray={sg.dash}
                style={sg.lit && !reduced ? { animation: 'flowh 1.2s linear infinite' } : undefined} />
            ))}
            <circle cx="30" cy="78" r="5" fill="#00975a" />
            <text x="30" y="94" textAnchor="middle" fill="#7a7259" fontSize="10" fontFamily="Departure Mono,monospace">pwr</text>
          </svg>
        </div>
        <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11px', color: '#7a7259', marginTop: 6 }}>
          {bn ? 'প্রতিটা rising edge একটা পর্ব — power-on থেকে screen পর্যন্ত।' : "Every rising edge is one leg — from power-on to screen."}
        </div>
      </section>

      {/* Station list */}
      <section style={{ marginTop: 36, display: 'flex', flexDirection: 'column' }}>
        <a
          href="/writing/the-machine-beneath-your-code"
          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 18, alignItems: 'baseline', border: '1px solid #26241C', background: '#26241C', padding: '18px 20px', marginBottom: 18 }}
        >
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, color: '#00d26a', flexShrink: 0 }}>pwr ●</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: 17, color: '#ECE4D4' }}>
              {/* Title kept in English even in BN mode — series name, not translated */}
              Intro — The Machine Beneath Your Code
            </span>
            <span style={{ display: 'block', fontFamily: "'Departure Mono',monospace", fontSize: 11, color: '#8aa893', marginTop: 4 }}>
              {bn ? "series-র roadmap · এখান থেকে শুরু" : 'the series roadmap · start here'}
            </span>
          </span>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11, color: '#8aa893', flexShrink: 0 }}>power on ⏻</span>
        </a>

        {data.map((d, i) => {
          const lit = d.state === 'read', next = d.state === 'next';
          const numCol = lit ? '#00753F' : next ? '#5c5442' : '#a89a76';
          const tagCol = lit ? '#00753F' : next ? '#5c5442' : '#a89a76';
          const tag = lit ? (bn ? 'পড়া হয়েছে' : 'read') : next ? (bn ? 'পরের পর্ব' : 'up next') : (bn ? 'আসছে' : 'soon');
          const pulse = lit ? '▰' : next ? '▱' : '·';
          const rowStyle: React.CSSProperties = {
            textDecoration: 'none', display: 'flex', gap: 18, alignItems: 'baseline',
            border: `1px solid ${next ? '#26241C' : '#c9bda0'}`,
            borderTop: i === 0 ? `1px solid ${next ? '#26241C' : '#c9bda0'}` : 'none',
            padding: '16px 20px',
            background: lit ? 'rgba(0,151,90,0.05)' : 'transparent',
            opacity: d.state === 'soon' ? 0.75 : 1,
            pointerEvents: d.state === 'soon' ? 'none' : 'auto',
            color: 'inherit',
          };
          return (
            <a key={i} href={d.href} style={rowStyle}>
              <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, color: numCol, flexShrink: 0, width: 70 }}>
                0{i + 1} {pulse}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: 17, color: '#26241C' }}>
                  {bn ? d.bn : d.en}
                </span>
                <span style={{ display: 'block', fontFamily: "'Departure Mono',monospace", fontSize: 11, color: '#7a7259', marginTop: 4 }}>
                  {d.sub}
                </span>
              </span>
              <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11, color: tagCol, flexShrink: 0 }}>{tag}</span>
            </a>
          );
        })}
      </section>

      {/* Future series */}
      <section style={{ marginTop: 56 }}>
        <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#7a7259', letterSpacing: '0.08em', borderTop: '1px solid #c9bda0', paddingTop: 14 }}>
          {bn ? 'ভবিষ্যতের series' : 'FUTURE SERIES'}
        </div>
        <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: '12.5px', color: '#a89a76', marginTop: 10 }}>
          SERIES 002 — ░░░░░░░░░░ <span style={{ color: '#7a7259' }}>{bn ? '(সংকেত এখনো আসেনি)' : '(no signal yet)'}</span>
        </div>
      </section>

      <div style={{ marginTop: 56, borderTop: '1px solid #c9bda0', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Colophon skipCounter />
      </div>
    </main>
  );
}
