import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const STAGES = [
  { bnLabel: "keyboard-এ 'A' চাপা হলো", enLabel: "you press 'A'", mode: 'HW' },
  { bnLabel: 'keyboard controller CPU-কে interrupt পাঠায়', enLabel: 'keyboard controller interrupts the CPU', mode: 'HW' },
  { bnLabel: 'CPU থামে, interrupt handler-এ লাফ দেয়', enLabel: 'CPU pauses, jumps to the interrupt handler', mode: 'K' },
  { bnLabel: 'kernel mode: keyboard driver জাগে', enLabel: 'kernel mode: keyboard driver wakes', mode: 'K' },
  { bnLabel: "driver scancode পড়ে বোঝে 'A'", enLabel: "driver decodes the scancode as 'A'", mode: 'K' },
  { bnLabel: 'event active window-এর queue-তে যায়', enLabel: "event dropped into the active window's queue", mode: 'K' },
  { bnLabel: 'scheduler: editor-কে CPU দেবে?', enLabel: 'scheduler: give the CPU to the editor?', mode: 'K' },
  { bnLabel: 'context switch → text editor', enLabel: 'context switch → text editor', mode: 'K' },
  { bnLabel: "editor জাগে, read() ফিরে 'A' দেয়", enLabel: "editor wakes, read() returns 'A'", mode: 'U' },
  { bnLabel: "syscall: 'A' screen-এ আঁকো", enLabel: "syscall: draw 'A' on screen", mode: 'K' },
  { bnLabel: "GPU framebuffer update → 'A' দৃশ্যমান", enLabel: "GPU updates framebuffer → 'A' visible", mode: 'HW' },
] as const;

const modeCol = (m: string) => m === 'K' ? '#00d26a' : m === 'U' ? '#8ab89c' : '#e0c264';

export function KeypressRelay() {
  const { bn, num } = useLang();
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const MAX = STAGES.length - 1;

  const doStep = () => {
    setStep((s) => {
      if (s >= MAX) { stopRun(); return s; }
      return s + 1;
    });
  };

  const stopRun = () => {
    if (ivRef.current) { clearInterval(ivRef.current); ivRef.current = null; }
    setRunning(false);
  };

  const toggleRun = () => {
    if (running) { stopRun(); return; }
    if (step >= MAX) return;
    setRunning(true);
    ivRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= MAX) { stopRun(); return s; }
        return s + 1;
      });
    }, 620);
  };

  const reset = () => { stopRun(); setStep(0); };

  useEffect(() => () => { if (ivRef.current) clearInterval(ivRef.current); }, []);

  useEffect(() => { if (step >= MAX) stopRun(); }, [step]);

  const shown = step >= 8;
  const cs = step >= 7 ? 1 : 0;

  const csLabel = bn ? `context switch: ${num(cs)}` : `context switches: ${cs}`;
  const csControl = <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10.5, color: '#8aa893', whiteSpace: 'nowrap' }}>{csLabel}</span>;

  const narrText = bn
    ? `badge: ■ kernel · ■ user · ■ hardware। ধাপ ${num(Math.min(step, MAX))}/${num(MAX)}`
    : `badge: K kernel · U user · HW hardware. step ${Math.min(step, MAX)}/${MAX}`;

  return (
    <>
      <Instrument
        bnTitle="যন্ত্র ০৬ — THE RELAY ('A' → screen)"
        enTitle="INSTRUMENT 06 — THE RELAY ('A' → screen)"
        control={csControl}
      >
        <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Stages list */}
          <div style={{ flex: 2, minWidth: 230, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {STAGES.map((st, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderLeft: `2px solid ${active ? '#00d26a' : done ? '#2e392e' : 'transparent'}`, background: active ? 'rgba(0,210,106,0.08)' : 'none' }}>
                  <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9, minWidth: 26, color: active ? modeCol(st.mode) : done ? '#4a5a4e' : '#3a4a3e', border: `1px solid ${active ? modeCol(st.mode) : done ? '#4a5a4e' : '#3a4a3e'}`, textAlign: 'center', padding: '1px 0' }}>{st.mode}</span>
                  <span style={{ fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: 12.5, color: active ? '#cfe8d8' : done ? '#8aa893' : '#55695a' }}>{bn ? st.bnLabel : st.enLabel}</span>
                </div>
              );
            })}
          </div>
          {/* Screen preview */}
          <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'sticky', top: 12 }}>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 9.5, color: '#6c8873', letterSpacing: '0.08em' }}>SCREEN</div>
            <div style={{ width: 96, height: 72, border: '1px solid #3a5847', background: '#12180f', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 40, color: shown ? '#00d26a' : '#2e392e', textShadow: shown ? '0 0 14px rgba(0,210,106,0.6)' : 'none' }}>
                {shown ? 'A' : step >= 1 ? '█' : ''}
              </span>
            </div>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: '#8aa893', textAlign: 'center', lineHeight: 1.6 }}>
              {shown ? (bn ? "'A' এখন দৃশ্যমান" : "'A' now visible") : (bn ? 'অপেক্ষায়…' : 'waiting…')}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderTop: '1px solid #2e392e', flexWrap: 'wrap' }}>
          <button onClick={doStep} disabled={step >= MAX} style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, background: 'none', border: '1px solid #3a5847', color: '#00d26a', padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap', opacity: step >= MAX ? 0.4 : 1 }}>step ▶</button>
          <button onClick={toggleRun} disabled={step >= MAX} style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, background: 'none', border: '1px solid #3a5847', color: '#00d26a', padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap', opacity: step >= MAX ? 0.4 : 1 }}>{running ? '⏸ pause' : 'run ▶▶'}</button>
          <button onClick={reset} style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, background: 'none', border: '1px solid #3a5847', color: '#6c8873', padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>↺ reset</button>
          <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#8aa893', flex: 1, minWidth: 160 }}>{narrText}</span>
        </div>
      </Instrument>
      <Caption
        bn="একটা keypress: hardware interrupt, kernel-এ ঢোকা, driver, scheduler-এর সিদ্ধান্ত, context switch, দুটো system call — সব মিলিয়ে কয়েক ডজন ধাপ, আর মাঝে OS conducting।"
        en="One keypress: a hardware interrupt, entering the kernel, a driver, the scheduler's decision, a context switch, two system calls — dozens of steps, the OS conducting throughout."
      />
    </>
  );
}
