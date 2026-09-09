import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

type Layer = 'HW' | 'K' | 'U';

const STAGES: { bn: string; en: string; layer: Layer; ms: number }[] = [
  { bn: "'A' চাপলেন — switch-এর contact লাগল", en: "you press 'A' — the switch contacts close", layer: 'HW', ms: 0 },
  { bn: 'keyboard chip scan করে byte 0x04 বানায়, USB-তে পাঠায়', en: 'keyboard chip scans, makes byte 0x04, sends over USB', layer: 'HW', ms: 2 },
  { bn: 'USB controller পায়, একটা interrupt তোলে', en: 'USB controller receives it, raises an interrupt', layer: 'HW', ms: 3 },
  { bn: 'CPU state save করে, kernel mode-এ যায়', en: 'CPU saves its state, switches to kernel mode', layer: 'K', ms: 4 },
  { bn: 'interrupt handler USB থেকে scancode পড়ে', en: 'interrupt handler reads the scancode from USB', layer: 'K', ms: 5 },
  { bn: "keyboard driver বোঝে — 'A'", en: "keyboard driver decodes it as 'A'", layer: 'K', ms: 6 },
  { bn: 'OS event-টা focused window (VS Code)-এর queue-তে রাখে', en: "OS drops the event in the focused window's queue (VS Code)", layer: 'K', ms: 7 },
  { bn: 'scheduler ঠিক করে — VS Code-কে জাগাও', en: 'scheduler decides — wake VS Code', layer: 'K', ms: 8 },
  { bn: 'context switch: Chrome→VS Code, page table বদলায়', en: 'context switch: Chrome→VS Code, page tables swap', layer: 'K', ms: 10 },
  { bn: "user mode-এ ফিরে read() 'A' ফেরত দেয়", en: "back in user mode, read() returns 'A'", layer: 'U', ms: 11 },
  { bn: 'JIT-compiled handler চলে — "cursor-এ A লেখো"', en: 'JIT-compiled handler runs — "write A at cursor"', layer: 'U', ms: 12 },
  { bn: "font system 'A'-কে pixel-এ rasterize করে", en: "font system rasterizes 'A' into pixels", layer: 'U', ms: 14 },
  { bn: 'syscall → compositor → framebuffer (VRAM)', en: 'syscall → compositor → framebuffer (VRAM)', layer: 'K', ms: 16 },
  { bn: 'GPU cable দিয়ে voltage পাঠায় monitor-এ', en: 'GPU sends voltage down the cable to the monitor', layer: 'HW', ms: 18 },
  { bn: "pixel জ্বলে উঠল — photon চোখে পড়ল, 'A' দেখলেন", en: "pixels light up — photons hit your eye, you see 'A'", layer: 'HW', ms: 20 },
];

const LAST = STAGES.length - 1;
const TOTAL_MS = STAGES[LAST].ms;

const LAYERS: { id: Layer; label: string }[] = [
  { id: 'HW', label: 'HW' },
  { id: 'K', label: 'KERNEL' },
  { id: 'U', label: 'USER' },
];

const layerCol = (l: Layer) => (l === 'K' ? '#00d26a' : l === 'U' ? '#8ab89c' : '#e0c264');

/** Mode flips accumulate as the relay crosses the user/kernel boundary. */
const modeFlips = (k: number) => (k < 3 ? 0 : k < 9 ? 1 : k < 12 ? 2 : 3);

export function FullRelay() {
  const { bn, num } = useLang();
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setStep((k) => {
        if (k + 1 >= LAST) { setRunning(false); return LAST; }
        return k + 1;
      });
    }, reduced ? 140 : 560);
    return () => clearInterval(iv);
  }, [running, reduced]);

  const cur = STAGES[step];
  const shown = step >= LAST;
  const contextSwitches = step >= 8 ? 1 : 0;

  const btn = (accent: boolean): React.CSSProperties => ({
    fontFamily: "'Departure Mono',monospace", fontSize: 12, background: 'none',
    border: '1px solid #3a5847', color: accent ? '#00d26a' : '#6c8873',
    padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
  });

  return (
    <>
      <Instrument
        bnTitle="যন্ত্র ০৩ — THE RELAY ('A' → screen)"
        enTitle="INSTRUMENT 03 — THE RELAY ('A' → screen)"
        control={
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10.5, color: shown ? '#00d26a' : '#8aa893', whiteSpace: 'nowrap' }}>
            ~{num(cur.ms)}ms / ~{num(TOTAL_MS)}ms
          </span>
        }
      >
        <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Stage list */}
          <div style={{ flex: 2, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {STAGES.map((s, i) => {
              const active = i === step, done = i < step;
              const bc = active ? layerCol(s.layer) : done ? '#4a5a4e' : '#3a4a3e';
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px',
                    borderLeft: `2px solid ${active ? '#00d26a' : done ? '#2e392e' : 'transparent'}`,
                    background: active ? 'rgba(0,210,106,0.08)' : 'none',
                  }}
                >
                  <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9, minWidth: 22, color: bc, border: `1px solid ${bc}`, textAlign: 'center', padding: '1px 0' }}>{s.layer}</span>
                  <span style={{ fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: 12.5, color: active ? '#cfe8d8' : done ? '#8aa893' : '#55695a' }}>
                    {bn ? s.bn : s.en}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Screen + layer indicator */}
          <div style={{ flex: 1, minWidth: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {LAYERS.map((L) => {
                const on = L.id === cur.layer;
                return (
                  <span
                    key={L.id}
                    style={{
                      fontFamily: "'Departure Mono',monospace", fontSize: 8, letterSpacing: '0.04em', padding: '3px 5px',
                      border: `1px solid ${on ? layerCol(L.id) : '#2e392e'}`,
                      color: on ? layerCol(L.id) : '#55695a',
                      background: on ? 'rgba(0,210,106,0.08)' : 'transparent',
                    }}
                  >
                    {L.label}
                  </span>
                );
              })}
            </div>
            <div
              style={{
                width: 108, height: 76, border: '1px solid #3a5847', background: '#161d15',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Departure Mono',monospace", fontSize: 40,
                  color: shown ? '#00d26a' : '#2e392e',
                  textShadow: shown ? '0 0 14px rgba(0,210,106,0.6)' : 'none',
                }}
              >
                {shown ? 'A' : step >= 1 ? '█' : ''}
              </span>
            </div>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9.5, color: '#8aa893', textAlign: 'center', lineHeight: 1.7 }}>
              {bn
                ? `context switch: ${num(contextSwitches)}`
                : `context switches: ${contextSwitches}`}
              <br />
              {bn ? `mode flip: ${num(modeFlips(step))}` : `mode flips: ${modeFlips(step)}`}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderTop: '1px solid #2e392e', flexWrap: 'wrap' }}>
          <button onClick={() => setStep((k) => Math.min(LAST, k + 1))} style={btn(true)}>step ▶</button>
          <button onClick={() => { if (running) setRunning(false); else if (step < LAST) setRunning(true); }} style={btn(true)}>
            {running ? '⏸ pause' : 'run ▶▶'}
          </button>
          <button onClick={() => { setRunning(false); setStep(0); }} style={btn(false)}>↺ reset</button>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#8aa893', flex: 1, minWidth: 180 }}>
            {bn
              ? `HW hardware · K kernel · U user। ধাপ ${num(step + 1)}/${num(STAGES.length)}`
              : `HW hardware · K kernel · U user. step ${step + 1}/${STAGES.length}`}
          </span>
        </div>
      </Instrument>
      <Caption
        bn="এক keypress: keyboard CPU, interrupt, kernel-এ ঢোকা, scheduler, context switch, দুটো system call, JIT, font rasterization, GPU — সব মিলিয়ে ~২০ms-এ কয়েক ডজন ধাপ, আর মাঝে OS conducting।"
        en="One keypress: the keyboard CPU, an interrupt, entering the kernel, the scheduler, a context switch, two system calls, JIT, font rasterization, the GPU — dozens of steps in ~20ms, the OS conducting throughout."
      />
    </>
  );
}
