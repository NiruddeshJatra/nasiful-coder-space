import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const useReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Station = { big: string; small: string };

export function ProtagonistDisguises() {
  const { bn } = useLang();
  const reduced = useReducedMotion();

  const stations: Station[] = [
    { big: bn ? 'x = ৫' : 'x = 5', small: bn ? 'আপনার কোড' : 'your code' },
    { big: '101', small: 'binary' },
    { big: '▯▮▯', small: bn ? 'memory কোষ' : 'memory cells' },
    { big: '⎍⎍⎍', small: 'voltage' },
    { big: bn ? '"৫"' : '"5"', small: bn ? 'screen-এ' : 'on screen' },
  ];

  return (
    <>
      <Instrument bnTitle="PROTAGONIST DISGUISES" enTitle="PROTAGONIST DISGUISES">
        <div style={{ padding: '24px 14px', position: 'relative' }}>
          {/* Absolute track line behind the cards */}
          <svg
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 600 2"
            style={{ position: 'absolute', left: 14, top: '50%', width: 'calc(100% - 28px)', height: 2, display: 'block' }}
          >
            <line x1="0" y1="1" x2="600" y2="1" stroke="#33473a" strokeWidth="2" />
            {!reduced && (
              <line
                x1="0" y1="1" x2="600" y2="1"
                stroke="#00d26a" strokeWidth="2" strokeDasharray="6 10"
                style={{ animation: 'flow 1.2s linear infinite' }}
              />
            )}
          </svg>
          {/* Station cards */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 8, overflowX: 'auto' }}>
            {stations.map((s, i) => (
              <div
                key={i}
                style={{ flex: 'none', width: 96, background: '#1b231b', border: '1.5px solid #3a5847', padding: '9px 4px', textAlign: 'center' }}
              >
                <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 13, color: '#00d26a' }}>{s.big}</div>
                <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9.5, color: '#6c8873', marginTop: 4 }}>{s.small}</div>
              </div>
            ))}
          </div>
        </div>
      </Instrument>
      <Caption
        bn="একই information, পাঁচটা রূপ — series জুড়ে আমরা এর পিছু নেব।"
        en="The same information, five disguises — we tail it across the series."
      />
    </>
  );
}
